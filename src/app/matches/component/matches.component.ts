import { Component, Input, OnInit } from '@angular/core';
import { DinnerUserService } from '../../core/services/dinerUser.service';
import { RestaurantUser } from '../../core/models/dinerUser.model';

interface ChatMessage {
  sender: string;
  content: string;
}

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  matchedUsers: RestaurantUser[] = [];
  activeUser: RestaurantUser | undefined;

  constructor(private userService: DinnerUserService) { }

  ngOnInit(): void {
    this.matchedUsers = this.userService.getMatchedDinnerUsers();
  }

  showChat(user: RestaurantUser): void {
    this.activeUser = user;
  }

  hideChat(): void {
    this.activeUser = undefined;
  }
}