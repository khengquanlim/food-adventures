import { Component, Input, OnInit } from '@angular/core';
import { UserService } from './../../core/services/user.service';
import { User } from './../../core/models/user.model';

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
  matchedUsers: User[] = [];
  activeUser: User | undefined;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // this.matchedUsers = this.userService.getMatchedUsers();
  }

  showChat(user: User): void {
    this.activeUser = user;
  }

  hideChat(): void {
    this.activeUser = undefined;
  }
}