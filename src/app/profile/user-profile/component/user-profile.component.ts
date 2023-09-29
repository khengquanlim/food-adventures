import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(
  ) { 
    console.log("this.use.name: ", this.user.name);

  }

  ngOnInit(): void {
    
  }
  editMode = false;


  user: any = {  // Initialize with user data
    name: 'John Doe',
    age: 30,
    gender: 'Male',
    likes: 'Reading, Hiking',
    dislikes: 'Crowded places',
    profilePictureUrl: 'assets/images/ppg.jpg'  // Default profile picture
  };
  profileName="Mary";
  profileAge=36;
  profileGender="Female";

  imageUrls: string[] = [
    'assets/images/avocado.jpeg',
    'assets/images/cake.jpeg',
    'assets/images/crepe.jpeg',
    'assets/images/pancake.jpeg',
    'assets/images/pasta.jpeg',
    'assets/images/potato.jpeg',
    'assets/images/steak.jpeg',
    // Add jpeg image URLs as needed
  ];

  numberOfColumns=3;

  toggleEditMode() {
    this.editMode = !this.editMode;
    console.log("editmode: ", this.editMode);
  }
  onProfilePictureChange(event: any) {
    console.log('File input changed:', event);
    // Implement logic to upload and set the new profile picture
    const file = event.target.files[0];
    // Implement logic to upload the file and set profilePictureUrl
    if (file && file.type.startsWith('image/')) {
      console.log("in true");
      this.user.profilePictureUrl = URL.createObjectURL(file);
  } else {
    console.log('Invalid file type or no file selected.');
  }
    
    
    console.log('File input changed:', event);
  }
  

  saveChanges() {}
}