import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DinerUserService } from '../../core/services/dinerUser.service';
import { DinerUser } from '../../core/models/dinerUser.model';
@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.css']
})
export class SwipeComponent implements OnInit {
  user: DinerUser | undefined;
  dinerUsers: DinerUser[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: DinerUserService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = Number(params['id']);
      this.user = this.userService.getDinerUserById(userId);
    });
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.dinerUsers = data; // Assuming the response is an array of users
        console.log("Users", this.dinerUsers);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  like(): void {
    if (this.user) {
      this.userService.likeDinerUser(this.user.id);
      // Fetch the next user after liking
      this.getNextUser();
    }
  }

  dislike(): void {
    if (this.user) {
      this.userService.dislikeDinerUser(this.user.id);
      // Fetch the next user after disliking
      this.getNextUser();
    }
  }

  private getNextUser(): void {
    this.user = this.userService.getCurrentDinerUser();
  }

}
