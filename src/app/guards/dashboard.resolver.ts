import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { MessageService } from '../services/message.service';

export const dashboardResolver: ResolveFn<boolean> = () => {
  const messageService = inject(MessageService);
  messageService.prefetchCurrentUserData();
  return true;
};
