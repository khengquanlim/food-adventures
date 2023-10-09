import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DinerUserService } from '../core/services/dinerUser.service';
import { DinerUser } from '../core/models/dinerUser.model';

@Component({
  selector: 'app-chat-user-list',
  templateUrl: './chatUserList.component.html',
  styleUrls: ['./chatUserList.component.css'],
})
export class ChatUserListComponent {
  @Input() dinerUsers: DinerUser[] = [];  
  @Input() matchedUserIds: number[] = [];
  @Output() userSelected = new EventEmitter<DinerUser>();
  selectedUser: DinerUser | null = null;
  filteredDinerUsers: DinerUser[] = [];

  constructor() {
  }

  ngOnInit() {
    this.filterDinerUsersBasedOnMatchedId();
  }

  selectUser(user: DinerUser) {
    this.userSelected.emit(user);
  }

  filterDinerUsersBasedOnMatchedId() {
    this.filteredDinerUsers = this.dinerUsers.filter((user) =>
      this.matchedUserIds.includes(user.id)
    );
  }

}