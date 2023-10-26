import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { ActivatedRoute } from '@angular/router';
import { RestaurantUserService } from '../../core/services/restaurantUser.service';

import { DinerUserService } from '../../core/services/dinerUser.service';
import { ChatMessageService } from 'src/app/core/services/chatMessage.service';

@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.css'],
  animations: [
    trigger('swipeAnimation', [
      state('notSwiped', style({ transform: 'translateX(0)' })),
      state('swipedRight', style({ transform: 'translateX(100%)' })),
      state('swipedLeft', style({ transform: 'translateX(-100%)' })),
      state('match', style({ opacity: 0, transform: 'scale(0.5)' })),
      transition('notSwiped <=> swipedLeft', animate('300ms ease-out')),
      transition('notSwiped <=> swipedRight', animate('300ms ease-out')),
      transition('* <=> match', animate('500ms ease-in-out'))
    ]),
  ],
})
export class SwipeComponent implements OnInit {
  isSwiped = false;
  isResetting = false;
  directionOfCard: "left" | 'right' | 'match' | null = null;
  restaurantUser?: any;
  dinerUser: any | undefined;
  matchedDinerUser: any | undefined;
  
  dinerUsers: any[] | undefined;
  restaurantUsers?: any[];
  currentRestaurantUserImages?: any;

  imageBytes: Uint8Array | undefined;

  restaurantProfilePicByte: any;
  restaurantProfilePic: any;
  restaurantFeedImages?: any[];
  currentRestaurantUserImagesUrls: string[] = [];

  userId: any;

  RESTAURANT_USER_TYPE = 'restaurant';
  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantUserService,
    private dinerService: DinerUserService,
    private chatService: ChatMessageService,
    private el: ElementRef, 
    private renderer: Renderer2,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.dinerService.getDinerUserProfileByUserId(this.userId).subscribe(
        (response) => {
          this.dinerUser = response.data;
          this.convertMatchedDinerUserIdListListToNumberList(this.dinerUser);
        }
      )
    });
    this.getAllDinerUserProfile();
    this.getRestaurantUserAllProfileAndImages();
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
  getRestaurantUserAllProfileAndImages(): void {
    this.restaurantService.getAllRestaurantUserProfile().subscribe(
      (response) => {
        this.restaurantUsers = response.data;
        console.log("this.restaurantUser", this.restaurantUsers)
        
        if (this.restaurantUsers) {
          this.convertDinerUserListListToNumberList(this.restaurantUsers);
          this.restaurantUser = this.restaurantUsers[0];
          this.restaurantService.getAllRestaurantUserImagesByUsernameAndUserType(this.restaurantUser.userId, this.RESTAURANT_USER_TYPE).subscribe(
            (response) => {
              this.currentRestaurantUserImages = response.data;
              this.filterRestaurantFeedAndProfileImages(this.currentRestaurantUserImages);
            },
            (error) => {
              console.error('Error fetching data:', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  filterRestaurantFeedAndProfileImages(currentAllRestaurantUserImages: any[]) {
    const currentRestaurantUserFeedImageByteUrls = currentAllRestaurantUserImages.filter((feedImage: { usageType: string; }) => feedImage.usageType === 'feed');
    const restaurantProfilePicByte = currentAllRestaurantUserImages.filter((feedImage: { usageType: string; }) => feedImage.usageType === 'profile');
    this.restaurantProfilePic = this.getImageUrls(restaurantProfilePicByte);
    this.currentRestaurantUserImagesUrls = this.getImageUrls(currentRestaurantUserFeedImageByteUrls);
  }

  convertDinerUserListListToNumberList(restaurantUsers: any[]) {
    for(const restaurantUser of restaurantUsers!) {
      restaurantUser.dinerUserLikeList = this.restaurantService.convertStringToArray(restaurantUser.dinerUserLikeList)
    }
  }
  convertMatchedDinerUserIdListListToNumberList(dinerUser: any) {
    dinerUser.matchedDinerUserIdList = this.restaurantService.convertStringToArray(dinerUser.matchedDinerUserIdList)
    }
  
  buttonPressOnMatchCard(likeOrDislike: any): void { 
    this.isSwiped = true;
    if(likeOrDislike === 'like') {
      this.directionOfCard = 'right';
      console.log("dinerUser", this.dinerUser)
      console.log("this.restaurantUser", this.restaurantUser)
      if (this.restaurantUser) {
        if(this.dinerUser) {
          const isAnotherDinerInUserLikedListAndCurrentUserNeverLikeBeforeCurrentRestaurant = 
          this.restaurantService.compareCurrentDinerUserToRestaurantDinerLikesIdList(this.dinerUser.userId, this.restaurantUser.dinerUserLikeList);
          if(isAnotherDinerInUserLikedListAndCurrentUserNeverLikeBeforeCurrentRestaurant) {          
            this.addDinerUserIdToCurrentRestaurantUserLikeList();
            const anotherDinerUserIdThatMatchedCurrentDinerUser = 
            this.restaurantService.getOtherDinerUserIdFromRestaurantDinerLikesIdList(this.dinerUser, this.restaurantUser.dinerUserLikeList);
            console.log("anotherDinerUserIdThatMatchedCurrentDinerUser", anotherDinerUserIdThatMatchedCurrentDinerUser)
            const isMatchWithNewUser = anotherDinerUserIdThatMatchedCurrentDinerUser === 0 ? false : true;
            console.log("isMatchWithNewUser", isMatchWithNewUser)
            if(isMatchWithNewUser) {
              this.directionOfCard = 'match';
              console.log("match")
              this.matchedDinerUser = this.dinerUsers?.find(dinerUser => dinerUser.userId === anotherDinerUserIdThatMatchedCurrentDinerUser);
              this.addCurrentDinerUserIdToMatchedDinerUserIdList(this.matchedDinerUser, this.dinerUser.userId);
              this.addDinerUserIdToCurrentMatchedDinerUserIdList(anotherDinerUserIdThatMatchedCurrentDinerUser);
              this.chatService.addRestaurantNameAndBookingUrlToMessageDatabase(this.restaurantUser.restaurantName, this.restaurantUser.bookingUrl,
              this.dinerUser.userId, this.restaurantUser.restaurantUserProfileId);
            } else {
              setTimeout(() => {
                this.isResetting = false;
                this.isSwiped = false;
                this.directionOfCard = null;
              }, 500);
              this.getNextRestaurantUser();
          } 
        } else {
            setTimeout(() => {
              this.isResetting = false;
              this.isSwiped = false;
              this.directionOfCard = null;
            }, 500);
            this.getNextRestaurantUser();
          }
        }
      }
    } else if (likeOrDislike === 'dislike') {
      this.directionOfCard = 'left';
      if (this.restaurantUser) {
        this.getNextRestaurantUser();
      }
    }
  }
  addRestaurantNameAndBookingUrlToMessageDatabase(restaurantName: any, bookingUrl: any, senderId: any, receiverId: any) {
    this.chatService.addRestaurantNameAndBookingUrlToMessageDatabase
    (restaurantName, bookingUrl, senderId, receiverId).subscribe(
      (response) => {
        console.log('Update successful:', response);
      },
      (error) => {
        console.error('Update failed:', error);
      }
    );

  }
  addMatchedDinerUserIdToDinerMatchedDinerUserList(dinerUserMatchedDinerUserListJson: string, dinerUserProfileId: number): void {
    this.dinerService.updateDinerUserLikeListByRestaurantUserProfileId
    (dinerUserMatchedDinerUserListJson, dinerUserProfileId).subscribe(
      (response) => {
        console.log('Update successful:', response);
      },
      (error) => {
        console.error('Update failed:', error);
      }
    );
  }

  addDinerUserIdToCurrentRestaurantUserLikeList(): void {
    if(this.restaurantUser.dinerUserLikeList === null) {
      this.restaurantUser.dinerUserLikeList = [];
    } 
    this.restaurantUser.dinerUserLikeList.push(this.dinerUser.userId);
    const restaurantUserNewLikeListJson = JSON.stringify(this.restaurantUser.dinerUserLikeList);
    this.updateDinerUserLikeListByRestaurantUserProfileId(restaurantUserNewLikeListJson, this.restaurantUser.restaurantUserProfileId);
  }

  updateDinerUserLikeListByRestaurantUserProfileId(restaurantUserNewLikeListJson: any, restaurantUserProfileId: any) {
    this.restaurantService.updateDinerUserLikeListByRestaurantUserProfileId(restaurantUserNewLikeListJson, restaurantUserProfileId).subscribe(
      (response) => {
        console.log('Update successful:', response);
      },
      (error) => {
        console.error('Update failed:', error);
      }
    );
  }

  addCurrentDinerUserIdToMatchedDinerUserIdList(matchedDinerUser: any, matchedDinerUserId: number): void {
    console.log("matchedDinerUser", matchedDinerUser)
    let dinerUserNewMatchedDinerUserListJson: any;
    if(matchedDinerUser.matchedDinerUserIdList === null) {
      matchedDinerUser.matchedDinerUserIdList = [];
      console.log("matchedDinerUser", matchedDinerUser.matchedDinerUserIdList)
      matchedDinerUser.matchedDinerUserIdList.push(matchedDinerUserId);
      dinerUserNewMatchedDinerUserListJson = JSON.stringify(matchedDinerUser.matchedDinerUserIdList);
    } else {
      const jsonMatchedDinerUserIdListArray = JSON.parse(matchedDinerUser.matchedDinerUserIdList); // Convert the JSON string to an array
      jsonMatchedDinerUserIdListArray.push(matchedDinerUserId); // Append the value
  
      dinerUserNewMatchedDinerUserListJson = JSON.stringify(jsonMatchedDinerUserIdListArray);
    }
    this.addMatchedDinerUserIdToDinerMatchedDinerUserList(dinerUserNewMatchedDinerUserListJson, matchedDinerUser.userId);
  }
  addDinerUserIdToCurrentMatchedDinerUserIdList(anotherDinerUserIdThatMatchedCurrentDinerUser: number): void {
    if(this.dinerUser.matchedDinerUserIdList === null) {
      this.dinerUser.matchedDinerUserIdList = [];
    } 
    this.dinerUser.matchedDinerUserIdList.push(anotherDinerUserIdThatMatchedCurrentDinerUser);
    const dinerUserNewMatchedDinerUserListJson = JSON.stringify(this.dinerUser.matchedDinerUserIdList);
    this.addMatchedDinerUserIdToDinerMatchedDinerUserList(dinerUserNewMatchedDinerUserListJson, this.dinerUser.userId);
  }

  getNextRestaurantUser(): void {
    this.resetSwipeLocation();
    // ensure dinerUser never like before --> Get NEW restaurant
      console.log("this.restaurantUsers", this.restaurantUsers)
    if(this.restaurantUsers && this.restaurantUsers.length >= 1){
      console.log("..?")
      this.restaurantUsers.shift();
      this.restaurantUser = this.restaurantUsers[0];
      this.restaurantService.getAllRestaurantUserImagesByUsernameAndUserType(this.restaurantUser.userId, this.RESTAURANT_USER_TYPE).subscribe(
        (response) => {
          this.currentRestaurantUserImages = response.data;
          const currentRestaurantUserFeedImageByteUrls = this.currentRestaurantUserImages.filter((feedImage: { usageType: string; }) => feedImage.usageType === 'feed');
          const restaurantProfilePicByte = this.currentRestaurantUserImages.filter((feedImage: { usageType: string; }) => feedImage.usageType === 'profile');
          this.restaurantProfilePic = this.getImageUrls(restaurantProfilePicByte);
          this.currentRestaurantUserImagesUrls = this.getImageUrls(currentRestaurantUserFeedImageByteUrls);
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    }
  }

  resetSwipeLocation() {
    if (this.isSwiped) {
      this.isResetting = true;
      setTimeout(() => {
        this.isResetting = false;
        this.isSwiped = false;
        this.directionOfCard = null;
      }, 500);
    }
  }

  // loadImage(): void {
  //   const imageByte = this.currentRestaurantUserImages[0].imageByte;
  //   const blob = new Blob([imageByte], { type: 'image/jpeg' });
  //   const imageUrl = URL.createObjectURL(blob);
  //   const img = this.el.nativeElement.querySelector('#restaurantImage');
  
  //   if (img) {
  //     this.renderer.setAttribute(img, 'src', imageUrl);
  //   }
  // }

  // displayImage(): any {
  //   if (this.currentRestaurantUserImages.imageByte) {
  //     const arrayBufferView = new Uint8Array(this.currentRestaurantUserImages.imageByte);
  //     const blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
  //     const imageUrl = URL.createObjectURL(blob);
  //     return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  //   }
  //   return '';
  // }
  getImageUrls(images: any[]): string[] {
    if (images && images.length > 0) {
      return images.map((image) => 'data:image/jpeg;base64,' + image.imageByte);
    }
    return [];
  }
  
}