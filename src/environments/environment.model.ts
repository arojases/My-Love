import { LoveUser } from '../app/models/user.interface';

export interface AppEnvironment {
  production: boolean;
  sharedAccessCode: string;
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
  appUsers: LoveUser[];
}
