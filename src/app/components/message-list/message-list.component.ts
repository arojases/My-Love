import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, filter, firstValueFrom, map } from 'rxjs';
import { listAnimation } from '../../animations/romance.animations';
import { LoveMessage } from '../../models/message.interface';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-message-list',
  imports: [AsyncPipe, DatePipe],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css',
  animations: [listAnimation]
})
export class MessageListComponent {
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly vm$ = combineLatest([
    this.messageService.threadMessages$,
    this.authService.user$,
    this.messageService.partner$,
    this.messageService.unreadMessages$
  ]).pipe(
    map(([messages, currentUser, partner, unreadMessages]) => ({
      messages,
      currentUser,
      partner,
      unreadMessages
    }))
  );

  constructor() {
    this.messageService.unreadMessages$
      .pipe(
        filter((messages) => messages.length > 0),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        void this.markUnreadMessagesAsRead();
      });
  }

  protected trackMessage(_: number, message: LoveMessage): string {
    return message.id;
  }

  protected async markUnreadMessagesAsRead(): Promise<void> {
    const unreadMessages = await firstValueFrom(this.messageService.unreadMessages$);

    if (unreadMessages.length) {
      await this.messageService.markMessagesAsRead(unreadMessages);
    }
  }

  protected formatCreatedAt(value: LoveMessage['createdAt']): Date | null {
    if (!value) {
      return null;
    }

    if (value instanceof Date) {
      return value;
    }

    return value.toDate();
  }
}
