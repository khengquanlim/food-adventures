import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { ActivatedRoute } from '@angular/router';
import { RestaurantUserService } from '../../core/services/restaurantUser.service';
import { RestaurantUser } from '../../core/models/restaurantUser.model';

import { DinerUserService } from '../../core/services/dinerUser.service';
import { DinerUser } from '../../core/models/dinerUser.model';

import { ImageGridComponent } from 'src/app/image-grid/image-grid.component';

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
  restaurantUser: RestaurantUser | undefined;
  dinerUser: DinerUser | undefined;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantUserService,
    private dinerService: DinerUserService
  ) { }

  ngOnInit(): void {
      this.restaurantUser = this.restaurantService.getRestaurantUserById();
      this.dinerUser = this.dinerService.getDinerUserById();
  }
  
  buttonPressOnMatchCard(likeOrDislike: any): void { 
    this.isSwiped = true;
    if(likeOrDislike === 'like') {
      this.directionOfCard = 'right';
      if (this.restaurantUser) {
        if(this.dinerUser) {
          const isAnotherDinerInUserLikedList = this.restaurantService.compareCurrentUserToLikedIdList(this.dinerUser.id, this.restaurantUser.likeIdList);
          console.log("isAnotherDinerInUserLikedList", isAnotherDinerInUserLikedList)
          this.restaurantService.likeUser(this.restaurantUser.id, this.dinerUser.id);
          console.log("this.restaurantUser.likeIdList", this.restaurantUser.likeIdList)
          if(isAnotherDinerInUserLikedList) {
            console.log("Match")
            this.directionOfCard = 'match';
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
        this.restaurantService.dislikeUser(this.restaurantUser.id);
        this.getNextRestaurantUser();
      }
    }
  }

  getNextRestaurantUser(): void {
    this.resetSwipeLocation();
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
