import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {
    
  }
  editMode = false;
  user: any = {  // Initialize with user data
    name: 'John Doe',
    age: 30,
    gender: 'Male',
    likes: 'Reading, Hiking',
    dislikes: 'Crowded places',
    profilePictureUrl: 'assets/default-profile.jpg'  // Default profile picture
  };

  toggleEditMode() {
    this.editMode = !this.editMode;
  }
  onProfilePictureChange(event: any) {
    // Implement logic to upload and set the new profile picture
    const file = event.target.files[0];
    // Implement logic to upload the file and set profilePictureUrl
  }
  

  saveChanges() {}
}