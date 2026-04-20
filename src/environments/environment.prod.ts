import { LoveUser } from '../app/models/user.interface';
import { AppEnvironment } from './environment.model';

const appUsers: LoveUser[] = [
  {
    id: 'user_you',
    name: 'YOUR_NAME',
    avatar: 'A',
    partnerId: 'user_partner'
  },
  {
    id: 'user_partner',
    name: 'PARTNER_NAME',
    avatar: 'R',
    partnerId: 'user_you'
  }
];

export const environment: AppEnvironment = {
  production: true,
  sharedAccessCode: 'YOUR_SHARED_ACCESS_CODE',
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_PROJECT.firebaseapp.com',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_PROJECT.firebasestorage.app',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID'
  },
  appUsers
};
