import { Timestamp } from 'firebase/firestore';

export type MessageCategory = string;

export interface LoveMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  category: MessageCategory;
  createdAt: Timestamp | Date | null;
  read: boolean;
}
