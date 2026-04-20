import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PREDEFINED_MESSAGE_CATEGORIES, TOTAL_PREDEFINED_MESSAGES } from '../../data/predefined-messages';
import { MessageCategory } from '../../models/message.interface';
import { MessageService } from '../../services/message.service';
import { NotificationService } from '../../services/notification.service';
import { PredefinedMessagesComponent } from '../predefined-messages/predefined-messages.component';

@Component({
  selector: 'app-message-composer',
  imports: [ReactiveFormsModule, PredefinedMessagesComponent],
  templateUrl: './message-composer.component.html',
  styleUrl: './message-composer.component.css'
})
export class MessageComposerComponent {
  private readonly messageService = inject(MessageService);
  private readonly notificationService = inject(NotificationService);

  protected readonly totalPredefinedMessages = TOTAL_PREDEFINED_MESSAGES;
  protected isSending = false;

  protected readonly form = new FormGroup({
    content: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(400)]
    }),
    category: new FormControl<MessageCategory>('Personalizado', {
      nonNullable: true
    })
  });

  protected fillMessage(payload: { content: string; category: MessageCategory }): void {
    this.form.patchValue(payload);
  }

  protected async send(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notificationService.pushToast({
        type: 'warning',
        title: 'Completa el mensaje',
        body: 'Escribe o selecciona un mensaje antes de enviarlo.'
      });
      return;
    }

    try {
      this.isSending = true;
      const content = this.form.controls.content.getRawValue();
      await this.messageService.sendMessage(content, this.resolveCategory(content));
      this.form.reset({ content: '', category: 'Personalizado' });
    } finally {
      this.isSending = false;
    }
  }

  private resolveCategory(content: string): MessageCategory {
    const normalizedContent = content.trim();
    const matchedCategory = PREDEFINED_MESSAGE_CATEGORIES.find((category) =>
      category.messages.includes(normalizedContent)
    );

    return matchedCategory?.title ?? 'Personalizado';
  }
}
