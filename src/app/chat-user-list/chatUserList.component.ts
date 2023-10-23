import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DinerUserService } from '../core/services/dinerUser.service';
import { DinerUser } from '../core/models/dinerUser.model';

@Component({
  selector: 'app-chat-user-list',
  templateUrl: './chatUserList.component.html',
  styleUrls: ['./chatUserList.component.css'],
})
export class ChatUserListComponent {
  @Input() dinerUsers: any[] = [];  
  @Input() matchedUserIds: number[] = [];
  @Output() userSelected = new EventEmitter<any>();
  selectedUser: any | null = null;
  filteredDinerUsers: any[] = [];

  constructor() {
  }

  ngOnInit() {
    console.log("dinerUsers", this.dinerUsers)
    this.filterDinerUsersBasedOnMatchedId();
  }

  selectUser(user: any) {
    this.userSelected.emit(user);
  }

  filterDinerUsersBasedOnMatchedId() {
    console.log("?? this.dinerUsers", this.dinerUsers)
    this.filteredDinerUsers = this.dinerUsers.filter((user) =>
      this.matchedUserIds.includes(user.id)
    );
    console.log("?? this.filteredDinerUsers", this.filteredDinerUsers)
  }

}