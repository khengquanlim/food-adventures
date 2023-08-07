import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../core/services/user.service';
import { User } from './../../core/models/user.model';

@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.css']
})
export class SwipeComponent implements OnInit {
  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = Number(params['id']);
      this.user = this.userService.getUserById(userId);
    });
  }

  like(): void {
    if (this.user) {
      this.userService.likeUser(this.user.id);
      // Fetch the next user after liking
      this.getNextUser();
    }
  }

  dislike(): void {
    if (this.user) {
      this.userService.dislikeUser(this.user.id);
      // Fetch the next user after disliking
      this.getNextUser();
    }
  }

  private getNextUser(): void {
    this.user = this.userService.getCurrentUser();
  }

}
