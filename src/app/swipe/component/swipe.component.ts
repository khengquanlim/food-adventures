import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { ActivatedRoute } from '@angular/router';
import { DinnerUserService } from '../../core/services/dinerUser.service';
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
      transition('notSwiped <=> swipedLeft', animate('300ms ease-out')),
      transition('notSwiped <=> swipedRight', animate('300ms ease-out')),
    ]),
  ],
})
export class SwipeComponent implements OnInit {
  isSwiped = false;
  isResetting = false;
  directionOfCard: "left" | 'right' | null = null;
  dinerUser: DinerUser | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: DinnerUserService
  ) { }

  ngOnInit(): void {
      this.dinerUser = this.userService.getDinnerUserById();
  }
  
  buttonPressOnMatchCard(likeOrDislike: any): void { 
    this.isSwiped = true;
    if(likeOrDislike === 'like') {
      this.directionOfCard = 'right';
      if (this.dinerUser) {
        this.userService.likeUser(this.dinerUser.id);
        this.getNextUser();
      }
    } else if (likeOrDislike === 'dislike') {
      this.directionOfCard = 'left';
      if (this.dinerUser) {
        this.userService.dislikeUser(this.dinerUser.id);
        this.getNextUser();
      }
    }
  }

  private getNextUser(): void {
    this.resetSwipeLocation();
    this.dinerUser = this.userService.getCurrentDinerUser();
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
