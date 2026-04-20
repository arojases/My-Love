import { Component, EventEmitter, Output } from '@angular/core';
import { PREDEFINED_MESSAGE_CATEGORIES } from '../../data/predefined-messages';
import { MessageCategory } from '../../models/message.interface';

@Component({
  selector: 'app-predefined-messages',
  templateUrl: './predefined-messages.component.html',
  styleUrl: './predefined-messages.component.css'
})
export class PredefinedMessagesComponent {
  @Output() readonly selectMessage = new EventEmitter<{
    content: string;
    category: MessageCategory;
  }>();

  protected readonly categories = PREDEFINED_MESSAGE_CATEGORIES;
  protected activeCategory = this.categories[0].title;

  protected setCategory(category: MessageCategory): void {
    this.activeCategory = category;
  }

  protected pickMessage(content: string, category: MessageCategory): void {
    this.selectMessage.emit({ content, category });
  }
}
