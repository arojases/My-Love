import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const serviceWorkerUrl = new URL('sw.js', document.baseURI).toString();

    navigator.serviceWorker.register(serviceWorkerUrl).catch((error) => {
      console.error('MyLove service worker registration error', error);
    });
  });
}

bootstrapApplication(AppComponent, appConfig).catch((error) =>
  console.error('MyLove bootstrap error', error)
);
