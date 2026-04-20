import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toastAnimation } from '../../animations/romance.animations';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notifications',
  imports: [AsyncPipe],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
  animations: [toastAnimation]
})
export class NotificationsComponent {
  private readonly notificationService = inject(NotificationService);

  protected readonly toasts$ = this.notificationService.toasts$;

  protected dismiss(id: number): void {
    this.notificationService.dismissToast(id);
  }
}
