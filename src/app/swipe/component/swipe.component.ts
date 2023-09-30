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
      transition('notSwiped <=> swipedLeft', animate('300ms ease-out')),
      transition('notSwiped <=> swipedRight', animate('300ms ease-out')),
    ]),
  ],
})
export class SwipeComponent implements OnInit {
  isSwiped = false;
  isResetting = false;
  directionOfCard: "left" | 'right' | null = null;
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
      if (this.dinerUser) {
        this.dinerService.likeUser(this.dinerUser.id);
        this.getNextRestaurantUser();
      }
    } else if (likeOrDislike === 'dislike') {
      this.directionOfCard = 'left';
      if (this.dinerUser) {
        this.dinerService.dislikeUser(this.dinerUser.id);
        this.getNextRestaurantUser();
      }
    }
  }

  private getNextRestaurantUser(): void {
    this.resetSwipeLocation();
    this.restaurantUser = this.restaurantService.getCurrentRestaurantUser();
    console.log("this.resutaurantUser", this.restaurantUser)
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
