import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { routeTransition } from './animations/romance.animations';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, RouterOutlet, NotificationsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [routeTransition]
})
export class AppComponent {
  private readonly notificationService = inject(NotificationService);

  protected readonly appName = 'My Love';
  protected readonly hearts$ = this.notificationService.hearts$;

  protected trackHeart(_: number, heart: { id: number }): number {
    return heart.id;
  }
}
