import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../core/services/user.service';
import { User } from './../../core/models/user.model';

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
  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = Number(params['id']);
      this.user = this.userService.getUserById(userId);
      //  Asset 
      if (this.user) {
        this.user.photoUrl = "/assets/debug/user1.jpeg";
      }
    });
  }
  
  buttonPressOnMatchCard(likeOrDislike: any): void { 
    this.isSwiped = true;
    if(likeOrDislike === 'like') {
      this.directionOfCard = 'right';
      if (this.user) {
        this.userService.likeUser(this.user.id);
        this.getNextUser();
      }
    } else if (likeOrDislike === 'dislike') {
      this.directionOfCard = 'left';
      if (this.user) {
        this.userService.dislikeUser(this.user.id);
        this.getNextUser();
      }

    }

  }

  private getNextUser(): void {
    this.resetSwipe();
    this.user = this.userService.getCurrentUser();
  }

  resetSwipe() {
    if (this.isSwiped) {
      this.isResetting = true;
      setTimeout(() => {
        this.isResetting = false;
        this.isSwiped = false;
        this.directionOfCard = null;
      }, 500); // Adjust the timeout duration to match your transition duration
    }
  }

}
