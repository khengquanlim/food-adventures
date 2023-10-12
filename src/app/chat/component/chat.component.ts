import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DinerUserService } from '../../core/services/dinerUser.service';
import { DinerUser } from '../../core/models/dinerUser.model';

interface ChatMessage {
  sender: string;
  content: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnChanges {
  @Input() matchedUser!: User;
  chatMessages: ChatMessage[] = [];
  newMessage: string = '';

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['matchedUser'].currentValue) {
      this.initializeChatMessages();
    }
  }

  initializeChatMessages(): void {
    // Implement logic here to fetch chat messages for the matched user from a service or database
    // For now, we'll use some dummy messages for demonstration purposes
    this.chatMessages = [
      { sender: this.matchedUser.name, content: 'Hello!' },
      { sender: 'You', content: 'Hi there!' },
      { sender: this.matchedUser.name, content: 'How are you?' },
      { sender: 'You', content: "I'm doing great! How about you?" }
    ];
  }

  sendMessage(): void {
    if (this.newMessage.trim() !== '') {
      this.chatMessages.push({ sender: 'You', content: this.newMessage });
      this.newMessage = '';
    }
  }
}