import { Component, OnInit } from '@angular/core';
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

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantUserService,
    private dinerService: DinerUserService
  ) { }

  ngOnInit(): void {
      // this.restaurantUser = this.restaurantService.getRestaurantUserById();
      // this.dinerUser = this.dinerService.getDinerUserById(1);
    this.route.params.subscribe(params => {
      const userId = Number(params['id']);
      this.user = this.dinerService.getDinerUserById(userId);
    });
    this.dinerService.getAllDinerUserProfile().subscribe(
      (response) => {
        this.dinerUsers = response.data; // Assuming the response is an array of users
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
    this.restaurantService.getAllRestaurantUserProfile().subscribe(
      (response) => {
        this.restaurantUsers = response.data; // Assuming the response is an array of users
        console.log("this.restaurantUsers", this.restaurantUsers);
        if(this.restaurantUsers) {
          this.restaurantUser = this.restaurantUsers[0];
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
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
}
