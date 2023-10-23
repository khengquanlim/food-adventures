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

  convertStringToArray(inputString: String): number[] {
    if(inputString === null) {
      return [];
    } else {
      // Remove square brackets and any leading/trailing whitespace
      const cleanedString = inputString.replace(/^\[|\]$/g, '');
    
      // Split the cleaned string by commas
      const stringArray = cleanedString.split(',');
    
      // Parse each element into a number and create a number array
      const numberArray = stringArray.map(element => parseInt(element, 10));
  
      return numberArray;
    }
  }
}