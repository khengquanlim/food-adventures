import { Component, Input, OnInit } from '@angular/core';
import { DinerUserService } from '../../core/services/dinerUser.service';
import { DinerUser } from '../../core/models/dinerUser.model';

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
  matchedUsers: DinerUser[] = [];
  activeUser: DinerUser | undefined;

  constructor(private userService: DinerUserService) { }

  ngOnInit(): void {
    this.matchedUsers = this.userService.getMatchedDinerUsers();
  }

  showChat(user: DinerUser): void {
    this.activeUser = user;
  }

  hideChat(): void {
    this.activeUser = undefined;
  }
}