import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { MessageComposerComponent } from '../message-composer/message-composer.component';
import { MessageListComponent } from '../message-list/message-list.component';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe, MessageComposerComponent, MessageListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);

  protected readonly currentUser$ = this.authService.user$;
  protected readonly partner$ = this.messageService.partner$;
  protected readonly threadMessages$ = this.messageService.threadMessages$;
  protected readonly unreadCount$ = this.messageService.unreadCount$;
  protected readonly sentMessages$ = this.messageService.sentMessages$;
  protected readonly receivedMessages$ = this.messageService.receivedMessages$;
  protected readonly stats$ = combineLatest([
    this.messageService.sentMessages$,
    this.messageService.receivedMessages$,
    this.messageService.unreadCount$
  ]).pipe(
    map(([sent, received, unread]) => ({
      sent: sent.length,
      received: received.length,
      unread
    }))
  );

  protected logout(): Promise<void> {
    return this.authService.logout();
  }
}
