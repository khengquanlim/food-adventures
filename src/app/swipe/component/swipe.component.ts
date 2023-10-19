import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { ActivatedRoute } from '@angular/router';
import { RestaurantUserService } from '../../core/services/restaurantUser.service';
import { RestaurantUser } from '../../core/models/restaurantUser.model';

import { DinerUserService } from '../../core/services/dinerUser.service';
import { DinerUser } from '../../core/models/dinerUser.model';
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
  matchedDinerUser: DinerUser | undefined;
  
  user: DinerUser | undefined;
  dinerUsers: any[] | undefined;
  restaurantUsers?: any[];
  currentRestaurantUserImages?: any;

  imageBytes: Uint8Array | undefined;

  restaurantProfilePicByte: any;
  restaurantProfilePic: any;
  restaurantFeedImages?: any[];
  currentRestaurantUserImagesUrls: string[] = [];

  RESTAURANT_USER_TYPE = 'restaurant';
  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantUserService,
    private dinerService: DinerUserService,
    private el: ElementRef, 
    private renderer: Renderer2,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = Number(params['id']);
      this.dinerService.getDinerUserProfileByUserId('sky1001').subscribe(
        (response) => {
          this.dinerUser = response.data;
          this.convertMatchedDinerUserIdListListToNumberList(this.dinerUser);
          console.log("this.dinerUser", this.dinerUser)
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
    //dosomething abt this... refactor
    dinerUser.matchedDinerUserIdList = this.restaurantService.convertStringToArray(dinerUser.matchedDinerUserIdList)
    }
  
  buttonPressOnMatchCard(likeOrDislike: any): void { 
    this.isSwiped = true;
    if(likeOrDislike === 'like') {
      this.directionOfCard = 'right';
      if (this.restaurantUser) {
        if(this.dinerUser) {
          const isAnotherDinerInUserLikedListAndCurrentUserNeverLikeBeforeCurrentRestaurant = 
          this.restaurantService.compareCurrentDinerUserToRestaurantDinerLikesIdList(this.dinerUser.userId, this.restaurantUser.dinerUserLikeList);
          console.log("isAnotherDinerInUserLikedListAndCurrentUserNeverLikeBeforeCurrentRestaurant", isAnotherDinerInUserLikedListAndCurrentUserNeverLikeBeforeCurrentRestaurant)
          this.addDinerUserIdToCurrentRestaurantUserLikeList();
          // this.restaurantService.likeUser(this.restaurantUser.id, this.dinerUser); settle
          // this.dinerService.addRestaurantUserIdTolikeRestaurantUserIdList(this.restaurantUser.id); settle?
          if(isAnotherDinerInUserLikedListAndCurrentUserNeverLikeBeforeCurrentRestaurant) {
            const anotherDinerUserIdThatMatchedCurrentDinerUser = 
            this.restaurantService.getOtherDinerUserIdFromRestaurantDinerLikesIdList(this.dinerUser, this.restaurantUser.dinerUserLikeList);
          //   this.dinerService.addMatchedIdToCurrentDinerUser(anotherDinerUserIdThatMatchedCurrentDinerUser);
          //   this.matchedDinerUser = this.dinerService.getDinerUserById(anotherDinerUserIdThatMatchedCurrentDinerUser);
            
            const isMatchWithNewUser = anotherDinerUserIdThatMatchedCurrentDinerUser === 0 ? false : true;
            console.log("isMatchWithNewUser", isMatchWithNewUser)
            console.log("asdadasdadasdsdad")
            if(isMatchWithNewUser) {
              this.directionOfCard = 'match';
            } else {
              console.log("Come here ???")
              setTimeout(() => {
                this.isResetting = false;
                this.isSwiped = false;
                this.directionOfCard = null;
              }, 500);
              this.addDinerUserIdToCurrentRestaurantUserLikeList();
              this.getNextRestaurantUser();
          } 
        } else {
          //   console.log("Come here ")
          //   setTimeout(() => {
          //     this.isResetting = false;
          //     this.isSwiped = false;
          //     this.directionOfCard = null;
          //   }, 500);
          //   this.getNextRestaurantUser();
          }
        }
      }
    } else if (likeOrDislike === 'dislike') {
      this.directionOfCard = 'left';
      if (this.restaurantUser) {
        this.restaurantService.dislikeUser(this.restaurantUser.restaurantUserId);
        this.getNextRestaurantUser();
      }
    }
  }
  addDinerUserIdToCurrentRestaurantUserLikeList(): void {
    if(this.restaurantUser.dinerUserLikeList === null) {
      this.restaurantUser.dinerUserLikeList = []
      console.log("this.restaurantUser.dinerUserLikeList" , this.restaurantUser.dinerUserLikeList)
    } 
    this.restaurantUser.dinerUserLikeList.push(this.dinerUser.userId);
    console.log("this.restaurantUser.dinerUserLikeList", this.restaurantUser.dinerUserLikeList)
    const restaurantUserNewLikeListJson = JSON.stringify(this.restaurantUser.dinerUserLikeList);
    //Might need to move this somewhere else
    this.restaurantService.updateDinerUserLikeListByRestaurantUserProfileId(restaurantUserNewLikeListJson, this.restaurantUser.restaurantUserProfileId).subscribe(
      (response) => {
        // Handle the success response here if needed
        console.log('Update successful:', response);
      },
      (error) => {
        // Handle any errors that occur during the HTTP request
        console.error('Update failed:', error);
      }
    );
  }

  getNextRestaurantUser(): void {
    this.resetSwipeLocation();
    // ensure dinerUser never like before --> Get NEW restaurant
    if(this.restaurantUsers && this.restaurantUsers.length >= 1){
      this.restaurantUsers.shift();
      this.restaurantUser = this.restaurantUsers[0];
      this.restaurantService.getAllRestaurantUserImagesByUsernameAndUserType(this.restaurantUser.userId, this.RESTAURANT_USER_TYPE).subscribe(
        (response) => {
          this.currentRestaurantUserImages = response.data;
          console.log("this.currentRestaurantUserImages", this.currentRestaurantUserImages)
          console.log("response.data", response.data)
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

  loadImage(): void {
    const imageByte = this.currentRestaurantUserImages[0].imageByte;
    const blob = new Blob([imageByte], { type: 'image/jpeg' });
    const imageUrl = URL.createObjectURL(blob);
  
    // Get a reference to the <img> element by its ID
    const img = this.el.nativeElement.querySelector('#restaurantImage');
  
    if (img) {
      // Use Renderer2 to set the src attribute
      this.renderer.setAttribute(img, 'src', imageUrl);
    }
  }

  displayImage(): any {
    if (this.currentRestaurantUserImages.imageByte) {
      const arrayBufferView = new Uint8Array(this.currentRestaurantUserImages.imageByte);
      const blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
      const imageUrl = URL.createObjectURL(blob);
      return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    }
    return '';
  }
  getImageUrls(images: any[]): string[] {
    if (images && images.length > 0) {
      return images.map((image) => 'data:image/jpeg;base64,' + image.imageByte);
    }
    return [];
  }
  
}
