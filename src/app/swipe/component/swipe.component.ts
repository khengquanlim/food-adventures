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
  dinerUser: DinerUser | undefined;
  matchedDinerUser: DinerUser | undefined;
  
  user: DinerUser | undefined;
  dinerUsers: DinerUser[] | undefined;
  restaurantUsers?: any[];
  currentRestaurantUser?: any;

  imageBytes: Uint8Array | undefined;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantUserService,
    private dinerService: DinerUserService,
    private el: ElementRef, 
    private renderer: Renderer2,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const RESTAURANT_USER_TYPE = 'restaurant';
    this.route.params.subscribe(params => {
      const userId = Number(params['id']);
      this.user = this.dinerService.getDinerUserById(userId);
    });
    this.dinerService.getAllDinerUserProfile().subscribe(
      (response) => {
        this.dinerUsers = response.data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
    
    this.restaurantService.getAllRestaurantUserProfile().subscribe(
      (response) => {
        this.restaurantUsers = response.data;
        console.log("this.restaurantUsers", this.restaurantUsers);
        if(this.restaurantUsers) {
          this.restaurantUser = this.restaurantUsers[0];
          this.restaurantService.getAllRestaurantUserImagesByUsernameAndUserType(this.restaurantUser.userId, RESTAURANT_USER_TYPE).subscribe(
            (response) => {
              console.log("this.restaurantUser", this.restaurantUser);
              console.log("Response.data for image", response.data)
              this.currentRestaurantUser = response.data;
              if (this.currentRestaurantUser && this.currentRestaurantUser.length > 0) {
                this.loadImage();
              }
            },
            (error) => {
              console.error('Error fetching data:', error);
            }
          )
      }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  loadImage(): void {
    console.log("Come here")
    const imageByte = this.currentRestaurantUser[0].imageByte;
    const blob = new Blob([imageByte], { type: 'image/jpeg' });
    const imageUrl = URL.createObjectURL(blob);
  
    // Get a reference to the <img> element by its ID
    const img = this.el.nativeElement.querySelector('#restaurantImage');
  
    console.log("img", img)
    if (img) {
      // Use Renderer2 to set the src attribute
      this.renderer.setAttribute(img, 'src', imageUrl);
    }
  }
  buttonPressOnMatchCard(likeOrDislike: any): void { 
    this.isSwiped = true;
    if(likeOrDislike === 'like') {
      this.directionOfCard = 'right';
      if (this.restaurantUser) {
        if(this.dinerUser) {
          const isAnotherDinerInUserLikedList = 
          this.restaurantService.compareCurrentDinerUserToRestaurantDinerLikesIdList(this.dinerUser.id, this.restaurantUser.dinerLikesIdList);
          
          this.restaurantService.likeUser(this.restaurantUser.id, this.dinerUser);
          this.dinerService.addRestaurantUserIdTolikeRestaurantUserIdList(this.restaurantUser.id);
          if(isAnotherDinerInUserLikedList) {
            const anotherDinerUserIdThatMatchedCurrentDinerUser = 
            this.restaurantService.getOtherDinerUserIdFromRestaurantDinerLikesIdList(this.dinerUser, this.restaurantUser.dinerLikesIdList);
            this.dinerService.addMatchedIdToCurrentDinerUser(anotherDinerUserIdThatMatchedCurrentDinerUser);
            this.matchedDinerUser = this.dinerService.getDinerUserById(anotherDinerUserIdThatMatchedCurrentDinerUser);

            const isMatchWithNewUser = anotherDinerUserIdThatMatchedCurrentDinerUser === 0 ? false : true;
            console.log("Come herasdasd ")
            if(isMatchWithNewUser) {
              this.directionOfCard = 'match';
            } else {
              console.log("Come here ???")
              setTimeout(() => {
                this.isResetting = false;
                this.isSwiped = false;
                this.directionOfCard = null;
              }, 500);
              this.getNextRestaurantUser();
            }
          } else {
            console.log("Come here ")
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
        this.restaurantService.dislikeUser(this.restaurantUser.id);
        this.getNextRestaurantUser();
      }
    }
  }

  getNextRestaurantUser(): void {
    this.resetSwipeLocation();
    // ensure dinerUser never like before --> Get NEW restaurant
    this.restaurantUser = this.restaurantService.getCurrentRestaurantUser();
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

  displayImage(): any {
    if (this.currentRestaurantUser.imageByte) {
      const arrayBufferView = new Uint8Array(this.currentRestaurantUser.imageByte);
      const blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
      const imageUrl = URL.createObjectURL(blob);
      return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    }
    return '';
  }
}
