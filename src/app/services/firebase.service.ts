import { Injectable } from '@angular/core';
import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { Auth, browserSessionPersistence, getAuth, setPersistence } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  readonly app: FirebaseApp;
  readonly auth: Auth;
  readonly firestore: Firestore;

  constructor() {
    this.app = getApps().length ? getApp() : initializeApp(environment.firebase);
    this.auth = getAuth(this.app);
    this.firestore = getFirestore(this.app);
  }

  async configureAuthPersistence(): Promise<void> {
    await setPersistence(this.auth, browserSessionPersistence);
  }
}
