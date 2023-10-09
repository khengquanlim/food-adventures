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
  @Output() userSelected = new EventEmitter<DinerUser>();
  selectedUser: DinerUser | null = null;
  
  selectUser(user: DinerUser) {
    this.userSelected.emit(user);
  }
}