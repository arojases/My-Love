import { Injectable, inject } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
  writeBatch,
  type Query
} from 'firebase/firestore';
import {
  Observable,
  combineLatest,
  distinctUntilChanged,
  firstValueFrom,
  map,
  of,
  shareReplay,
  switchMap,
  tap
} from 'rxjs';
import { LoveMessage, MessageCategory } from '../models/message.interface';
import { LoveUser } from '../models/user.interface';
import { AuthService } from './auth.service';
import { FirebaseService } from './firebase.service';
import { NotificationService } from './notification.service';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private readonly firebaseService = inject(FirebaseService);
  private readonly authService = inject(AuthService);
  private readonly notificationService = inject(NotificationService);

  private readonly messagesCollection = collection(this.firebaseService.firestore, 'messages');

  readonly currentUser$ = this.authService.user$;

  readonly partner$ = this.currentUser$.pipe(
    map((user) => user?.partnerId ?? null),
    distinctUntilChanged(),
    switchMap((partnerId) => {
      if (!partnerId) {
        return of(null);
      }

      return this.observeDocument<LoveUser>(`users/${partnerId}`);
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  readonly threadMessages$ = this.currentUser$.pipe(
    switchMap((user) => {
      if (!user) {
        return of([] as LoveMessage[]);
      }

      return this.observeCollection<LoveMessage>(
        query(this.messagesCollection, orderBy('createdAt', 'desc'))
      ).pipe(
        map((messages) =>
          messages.filter(
            (message) =>
              [user.id, user.partnerId].includes(message.senderId) &&
              [user.id, user.partnerId].includes(message.receiverId)
          )
        )
      );
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  readonly unreadMessages$ = combineLatest([this.threadMessages$, this.currentUser$]).pipe(
    map(([messages, user]) =>
      messages.filter((message) => message.receiverId === user?.id && !message.read)
    )
  );

  readonly unreadCount$ = this.unreadMessages$.pipe(map((messages) => messages.length));

  readonly sentMessages$ = combineLatest([this.threadMessages$, this.currentUser$]).pipe(
    map(([messages, user]) => messages.filter((message) => message.senderId === user?.id))
  );

  readonly receivedMessages$ = combineLatest([this.threadMessages$, this.currentUser$]).pipe(
    map(([messages, user]) => messages.filter((message) => message.receiverId === user?.id))
  );

  bindNotificationWatchers(): void {
    let previousUnreadIds = new Set<string>();

    this.unreadMessages$
      .pipe(
        tap((messages) => {
          const currentUnreadIds = new Set(messages.map((message) => message.id));
          const newMessages = messages.filter((message) => !previousUnreadIds.has(message.id));

          if (newMessages.length > 0) {
            const latest = newMessages[newMessages.length - 1];
            this.notificationService.pushToast({
              type: 'message',
              title: 'Nuevo mensaje de amor',
              body: latest.content
            });
            this.notificationService.spawnHearts();
          }

          previousUnreadIds = currentUnreadIds;
        })
      )
      .subscribe();
  }

  prefetchCurrentUserData(): void {
    void firstValueFrom(this.threadMessages$);
  }

  async sendMessage(content: string, category: MessageCategory): Promise<void> {
    const currentUser = await this.getCurrentUser();
    if (!currentUser) {
      throw new Error('Debes iniciar sesion para enviar mensajes.');
    }

    await addDoc(this.messagesCollection, {
      senderId: currentUser.id,
      receiverId: currentUser.partnerId,
      content: content.trim(),
      category,
      createdAt: serverTimestamp(),
      read: false
    });

    this.notificationService.pushToast({
      type: 'success',
      title: 'Mensaje enviado',
      body: 'Tu detalle romantico ya va en camino.'
    });
    this.notificationService.spawnHearts();
  }

  async markMessagesAsRead(messages: LoveMessage[]): Promise<void> {
    if (!messages.length) {
      return;
    }

    const firestore = this.firebaseService.firestore;
    const batch = writeBatch(firestore);

    messages
      .filter((message) => !message.read)
      .forEach((message) => batch.update(doc(firestore, `messages/${message.id}`), { read: true }));

    await batch.commit();
  }

  private async getCurrentUser(): Promise<LoveUser | null> {
    return firstValueFrom(this.currentUser$);
  }

  private observeDocument<T>(path: string): Observable<T | null> {
    return new Observable<T | null>((subscriber) =>
      onSnapshot(
        doc(this.firebaseService.firestore, path),
        (snapshot) => {
          subscriber.next(
            snapshot.exists() ? ({ id: snapshot.id, ...snapshot.data() } as T) : null
          );
        },
        (error) => subscriber.error(error)
      )
    );
  }

  private observeCollection<T>(targetQuery: Query): Observable<T[]> {
    return new Observable<T[]>((subscriber) =>
      onSnapshot(
        targetQuery,
        (snapshot) => {
          subscriber.next(snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as T)));
        },
        (error) => subscriber.error(error)
      )
    );
  }
}
