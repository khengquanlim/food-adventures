import { Component, ElementRef, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { DinerUserService } from '../../core/services/dinerUser.service';
import { DinerUser } from '../../core/models/dinerUser.model';
import { ChatMessageService } from 'src/app/core/services/chatMessage.service';
import { ChatMessage } from 'src/app/core/models/chatMessage.model';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],  
  animations: [
    trigger('slideIn', [
      state('in', style({ transform: 'translateX(0)' })),
      state('out', style({ transform: 'translateX(100%)' })),
      transition('out => in', animate('300ms ease-in')),
      transition('in => out', animate('300ms ease-out')),
    ]),
  ]
})
export class ChatComponent implements OnInit {
  @ViewChild('chatMessages') chatMessages!: ElementRef;
  @ViewChild('chatMessagesContainer') chatMessagesContainer!: ElementRef;

  selectedUser: DinerUser | null = null;
  messages: ChatMessage[] = [];
  newMessage: string = '';
  currentDinerUser!: DinerUser;
  dinerUsers!: DinerUser[];

  constructor(
    private dinerService: DinerUserService,
    private chatMessageService: ChatMessageService
    ) {}

  ngOnInit(): void {
    this.currentDinerUser = this.dinerService.getCurrentDinerUser();
    this.dinerUsers = this.dinerService.getDinerUsers();
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      if (this.selectedUser) {
        console.log("?")
        // Create a new chat message
        const message: ChatMessage = {
          senderId: this.currentDinerUser.id,
          receiverId: this.selectedUser.id,
          content: this.newMessage,
          timestamp: new Date(),
        };

        this.chatMessageService.addMessage(message);

        this.messages.push(message);

        this.newMessage = '';
        setTimeout(() => {
        this.scrollToBottom();
        });
      }
    }
  } 

  private scrollToBottom() {
    try {
      this.chatMessagesContainer.nativeElement.scrollTop = this.chatMessagesContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
  
  openChatWithUser(user: DinerUser) {
    // Handle user selection and open a chat window with the selected user
    this.selectedUser = user;
    // You can initialize the chat messages for the selected user here
    this.messages = this.chatMessageService.getMessagesForUser(user.id);
    // For example: this.messages = fetchMessagesForUser(user.id);
  }
}