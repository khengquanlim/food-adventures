import { Component, EventEmitter, Input, Output, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { DinerUserService } from '../core/services/dinerUser.service';
import { DinerUser } from '../core/models/dinerUser.model';

@Component({
  selector: 'app-chat-user-list',
  templateUrl: './chatUserList.component.html',
  styleUrls: ['./chatUserList.component.css'],
})
export class ChatUserListComponent {
  @Input() dinerUsers: any[] = [];  
  @Input() matchedUserIds: number[] = [];
  @Output() userSelected = new EventEmitter<any>();
  selectedUser: any | null = null;
  filteredDinerUsers: any[] = [];

  dinerProfilePicByte: any;
  dinerUser: any;
  dinerProfilePic: any;
  dinerFeedImages?: any[];
  currentDinerUserImagesUrls: string[] = [];
  currentDinerUserImages?: any;
  RESTAURANT_USER_TYPE = 'diner';
  RESTAURANT_USAGE_TYPE = 'profile';

  constructor(
    private dinerService: DinerUserService,
    private el: ElementRef, 
    private renderer: Renderer2
    ) {
  }

  ngOnChanges() {
    this.getDinerUserAllProfileImages();
    this.filterDinerUsersBasedOnMatchedId();
  }

  selectUser(user: any) {
    this.userSelected.emit(user);
  }

  filterDinerUsersBasedOnMatchedId() {
    this.filteredDinerUsers = this.dinerUsers.filter((user) =>
      this.matchedUserIds.includes(user.userId)
    );
  }

  filterDinerProfileImages(currentAllDinerUserImages: any[]) {
    const currentDinerUserFeedImageByteUrls = currentAllDinerUserImages.filter((feedImage: { usageType: string; }) => feedImage.usageType === 'feed');
    const dinerProfilePicByte = this.filteredDinerUsers.filter((feedImage: { usageType: string; }) => feedImage.usageType === 'profile');
  }

  getDinerUserAllProfileImages(): void {
    this.dinerService.getAllDinerUserProfile().subscribe(
      (response) => {
        this.dinerUsers = response.data;
        if (this.dinerUsers) {
          for (const dinerUser of this.filteredDinerUsers) {  
            this.dinerService.getAllDinerUserImagesByUsernameAndUserTypeAndUsageType(
            dinerUser.username,
            this.RESTAURANT_USER_TYPE,
            this.RESTAURANT_USAGE_TYPE
          ).subscribe(
            (response) => {
              const images = response.data;
              if (images.length > 0) {
                dinerUser.profileImage = 'data:image/jpeg;base64,' + images[0].imageByte;
              }
            },
            (error) => {
              console.error(`Error fetching images for user ${dinerUser.username}:`, error);
            }
          );
        }
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  convertDinerUserListListToNumberList(dinerUsers: any[]) {
    for(const dinerUser of dinerUsers!) {
      dinerUser.dinerUserLikeList = this.dinerService.convertStringToArray(dinerUser.dinerUserLikeList)
    }
  }

}