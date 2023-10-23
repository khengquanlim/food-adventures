import { Component, ElementRef, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { DinerUserService } from '../../core/services/dinerUser.service';
import { DinerUser } from '../../core/models/dinerUser.model';
import { ChatMessageService } from 'src/app/core/services/chatMessage.service';
import { ChatMessage } from 'src/app/core/models/chatMessage.model';
import { ActivatedRoute } from '@angular/router';
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

  selectedUser: any | null = null;
  messages: ChatMessage[] = [];
  newMessage: string = '';
  currentDinerUser!: any;
  dinerUsers!: any[];

  constructor(
    private dinerService: DinerUserService,
    private chatMessageService: ChatMessageService,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.getCurrentDinerUser();
    //this.dinerUsers not getting inputed
    this.getAllDinerUserProfile();
  }
  getCurrentDinerUser(): void {
    this.route.params.subscribe(params => {
      const userId = Number(params['id']);
      this.dinerService.getDinerUserProfileByUserId('sky1005').subscribe(
        (response) => {
          this.currentDinerUser = response.data;
          console.log("this.currentDinerUser", this.currentDinerUser)
          this.convertMatchedDinerUserIdListListToNumberList(this.currentDinerUser);
        }
      )
    });
  }
  convertMatchedDinerUserIdListListToNumberList(dinerUser: any) {
    dinerUser.matchedDinerUserIdList = this.chatMessageService.convertStringToArray(dinerUser.matchedDinerUserIdList)
  }
  getAllDinerUserProfile(): void {
    this.dinerService.getAllDinerUserProfile().subscribe(
      (response) => {
        this.dinerUsers = response.data;
        console.log("this.dinerUsers", this.dinerUsers)
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  sendMessage() {
    if (this.newMessage.trim() !== '') {
      if (this.selectedUser) {
        const message: ChatMessage = {
          senderId: this.currentDinerUser.id,
          receiverId: this.selectedUser.id,
          //TODO: Add this.matchedRestaurant.id
          restaurantId: 1,
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
    this.selectedUser = user;
    this.messages = this.chatMessageService.getMessagesForUser(user.id);
  }
}