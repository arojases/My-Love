import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { signInAnonymously, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { LoveUser } from '../models/user.interface';
import { environment } from '../../environments/environment';
import { FirebaseService } from './firebase.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly firebaseService = inject(FirebaseService);
  private readonly router = inject(Router);
  private readonly authReadySubject = new BehaviorSubject(false);
  private readonly userSubject = new BehaviorSubject<LoveUser | null>(null);
  private profileUnsubscribe: (() => void) | null = null;

  readonly authReady$ = this.authReadySubject.asObservable();
  readonly user$ = this.userSubject.asObservable();
  readonly availableUsers = environment.appUsers;

  bindAuthState(): void {
    onAuthStateChanged(this.firebaseService.auth, (firebaseUser) => {
      this.authReadySubject.next(false);
      this.profileUnsubscribe?.();
      this.profileUnsubscribe = null;

      if (!firebaseUser) {
        this.userSubject.next(null);
        this.authReadySubject.next(true);
        return;
      }

      const selectedProfileId = sessionStorage.getItem('my-love-profile-id');
      if (!selectedProfileId) {
        this.userSubject.next(null);
        this.authReadySubject.next(true);
        return;
      }

      const profileRef = doc(this.firebaseService.firestore, `users/${selectedProfileId}`);
      this.profileUnsubscribe = onSnapshot(profileRef, (snapshot) => {
        this.userSubject.next(
          snapshot.exists() ? ({ id: snapshot.id, ...snapshot.data() } as LoveUser) : null
        );
        this.authReadySubject.next(true);
      });
    });
  }

  async loginWithAccess(name: string, accessCode: string): Promise<void> {
    const normalizedCode = accessCode.trim();
    if (normalizedCode !== environment.sharedAccessCode) {
      throw new Error('El codigo compartido no es correcto.');
    }

    const normalizedName = this.normalizeName(name);
    const profile = this.availableUsers.find(
      (item: LoveUser) => this.normalizeName(item.name) === normalizedName
    );

    if (!profile) {
      throw new Error('Ese nombre no coincide con los perfiles configurados.');
    }

    if (!this.firebaseService.auth.currentUser) {
      await signInAnonymously(this.firebaseService.auth);
    }

    const profileRef = doc(this.firebaseService.firestore, `users/${profile.id}`);
    await setDoc(profileRef, profile, { merge: true });

    sessionStorage.setItem('my-love-profile-id', profile.id);
    this.userSubject.next(profile);
    await this.router.navigate(['/dashboard']);
  }

  async logout(): Promise<void> {
    this.profileUnsubscribe?.();
    this.profileUnsubscribe = null;
    await signOut(this.firebaseService.auth);
    sessionStorage.removeItem('my-love-profile-id');
    this.userSubject.next(null);
    await this.router.navigate(['/']);
  }

  private normalizeName(value: string): string {
    return value.trim().toLocaleLowerCase();
  }
}
