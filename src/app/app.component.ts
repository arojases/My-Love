import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { routeTransition } from './animations/romance.animations';
import { NotificationService } from './services/notification.service';
import { PwaService } from './services/pwa.service';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, RouterOutlet, NotificationsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [routeTransition]
})
export class AppComponent {
  private readonly notificationService = inject(NotificationService);
  private readonly pwaService = inject(PwaService);

  protected readonly appName = 'My Love';
  protected readonly hearts$ = this.notificationService.hearts$;
  protected readonly canInstall = this.pwaService.canInstall;
  protected readonly isStandalone = this.pwaService.isStandalone;
  protected readonly showIosHint = this.pwaService.showIosHint;

  constructor() {
    this.pwaService.init();
  }

  protected trackHeart(_: number, heart: { id: number }): number {
    return heart.id;
  }

  protected async installApp(): Promise<void> {
    const accepted = await this.pwaService.install();

    if (accepted) {
      this.notificationService.pushToast({
        type: 'success',
        title: 'App instalada',
        body: 'Ahora puedes abrir My Love desde la pantalla principal.'
      });
    }
  }
}
