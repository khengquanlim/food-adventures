import { Component, ElementRef, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DinerUserService } from '../../core/services/dinerUser.service';
import { DinerUser } from '../../core/models/dinerUser.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  @ViewChild('chatMessages') chatMessages!: ElementRef;

  selectedUser: DinerUser | null = null;
  messages: { sender: string; text: string }[] = [];
  newMessage: string = '';
  dinerUser!: DinerUser;
  dinerUsers!: DinerUser[];

  constructor(
    private dinerService: DinerUserService
    ) {}

  ngOnInit(): void {
    this.dinerUsers = this.dinerService.getDinerUsers();
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messages.push({ sender: 'You', text: this.newMessage });
      this.newMessage = '';
      // Scroll to the bottom of the chat container
      setTimeout(() => {
        this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight;
      });
    }
  }  
  
  openChatWithUser(user: DinerUser) {
    // Handle user selection and open a chat window with the selected user
    this.selectedUser = user;
    // You can initialize the chat messages for the selected user here
    this.messages = [];
    // For example: this.messages = fetchMessagesForUser(user.id);
  }
}