import { LoveUser } from '../app/models/user.interface';
import { AppEnvironment } from './environment.model';

const appUsers: LoveUser[] = [
  {
    id: 'user_you',
    name: 'Ariel',
    avatar: 'A',
    partnerId: 'user_partner'
  },
  {
    id: 'user_partner',
    name: 'Roxana',
    avatar: 'R',
    partnerId: 'user_you'
  }
];

export const environment: AppEnvironment = {
  production: false,
  sharedAccessCode: 'nosotros',
  firebase: {
    apiKey: 'REPLACE_WITH_REAL_API_KEY',
    authDomain: 'REPLACE_WITH_REAL_AUTH_DOMAIN',
    projectId: 'REPLACE_WITH_REAL_PROJECT_ID',
    storageBucket: 'REPLACE_WITH_REAL_STORAGE_BUCKET',
    messagingSenderId: 'REPLACE_WITH_REAL_MESSAGING_SENDER_ID',
    appId: 'REPLACE_WITH_REAL_APP_ID'
  },
  appUsers
};
