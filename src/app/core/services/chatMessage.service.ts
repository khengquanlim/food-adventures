import { Injectable } from '@angular/core';
import { ChatMessage } from '../models/chatMessage.model';

@Injectable({
  providedIn: 'root',
})
export class ChatMessageService {
  private chatMessages: ChatMessage[] = [];

  addMessage(chatMessage: ChatMessage) {
    this.chatMessages.push(chatMessage);
  }

  getMessagesForUser(userId: number): ChatMessage[] {
    return this.chatMessages.filter((chatMessages) => chatMessages.receiverId === userId || chatMessages.senderId === userId);
  }
}