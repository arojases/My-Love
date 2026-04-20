import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { AuthService } from './services/auth.service';
import { FirebaseService } from './services/firebase.service';
import { MessageService } from './services/message.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimationsAsync(),
    provideRouter(
      routes,
      withHashLocation(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    ),
    provideAppInitializer(async () => {
      const firebaseService = inject(FirebaseService);
      const authService = inject(AuthService);
      const messageService = inject(MessageService);
      await firebaseService.configureAuthPersistence();
      authService.bindAuthState();
      messageService.bindNotificationWatchers();
    })
  ]
};
