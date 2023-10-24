import { Component, ElementRef, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { DinerUserService } from '../../core/services/dinerUser.service';
import { ChatMessageService } from 'src/app/core/services/chatMessage.service';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

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

  selectedRestaurantName: any;
  selectedRestaurantBookingUrl: any;
  selectedUser: any | null = null;
  currentMessages: any[] = [];
  allMatchedChatMessages: any[] = [];
  newMessage: string = '';
  currentDinerUser!: any;
  dinerUsers!: any[];

  constructor(
    private dinerService: DinerUserService,
    private chatMessageService: ChatMessageService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
    ) {}

  ngOnInit(): void {
    this.getCurrentDinerUser();
    this.getAllDinerUserProfile();
  }
  getCurrentDinerUser(): void {
    this.route.params.subscribe(params => {
      const userId = Number(params['id']);
      this.dinerService.getDinerUserProfileByUserId('sky1005').subscribe(
        (response) => {
          this.currentDinerUser = response.data;
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
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  getAllMatchedDinerUserChatMessages(): void {
    this.chatMessageService.getAllMatchedDinerUserChatMessages(this.currentDinerUser.userId, this.selectedUser.userId).subscribe(
      (response) => {
        this.allMatchedChatMessages = response.data;
        this.sortChatMessagesByAscendingOrder(this.allMatchedChatMessages);
        const newMessageHeight = this.calculateMessageHeight(this.allMatchedChatMessages[this.allMatchedChatMessages.length - 1]);
        setTimeout(() => {
          this.scrollToBottom(newMessageHeight);
        });
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      if (this.selectedUser) {
        const message: any = {
          senderId: this.currentDinerUser.userId,
          receiverId: this.selectedUser.userId,
          //TODO: Add this.matchedRestaurant.id
          // restaurantId: 1,
          message: this.newMessage,
          createdTs: new Date(),
        }
        this.updateMessageBetweenCurrentUserAndSelectedUser(message);

        this.newMessage = '';
      }
    }
  } 

  updateMessageBetweenCurrentUserAndSelectedUser(message: any): void {
    this.chatMessageService.updateMessageBetweenCurrentUserAndSelectedUser(message.senderId, message.receiverId, message.message).subscribe(
      (response) => {
        const updatedMessages = response;

        if (updatedMessages && updatedMessages.length > 0) {
          this.allMatchedChatMessages = updatedMessages;
          const newMessageHeight = this.calculateMessageHeight(updatedMessages[updatedMessages.length - 1]);

          this.sortChatMessagesByAscendingOrder(this.allMatchedChatMessages);
          this.cd.detectChanges();
          setTimeout(() => {
            this.scrollToBottom(newMessageHeight);
          });

        } else {
          console.log("No messages received.");
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  private calculateMessageHeight(message: any): number {
    return message.message.length * 150; 
  }
  private scrollToBottom(newMessageHeight: number) {
    try {
      this.chatMessagesContainer.nativeElement.scrollTop += newMessageHeight;
    } catch (err) {}
  }
  
  openChatWithUser(user: any) {
    this.selectedUser = user;
    this.getAllMatchedDinerUserChatMessages();
    if(this.allMatchedChatMessages.find(message => message.restaurantName != null)) {
      this.selectedRestaurantName = this.allMatchedChatMessages.find(message => message.restaurantName != null).restaurantName;
    } else {
      this.selectedRestaurantName = "Now";
    }
    if(this.allMatchedChatMessages.find(message => message.bookingUrl != null)) {
      this.selectedRestaurantBookingUrl = this.allMatchedChatMessages.find(message => message.bookingUrl != null).bookingUrl;
    } else {
      this.selectedRestaurantBookingUrl = "www.google.com";
    }
  }
  sortChatMessagesByAscendingOrder(messages: any[]) {
    this.allMatchedChatMessages = messages.sort((a, b) => {
    return a.msgId - b.msgId;
    });
  }
}