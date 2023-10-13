import { Component, OnInit } from '@angular/core';
import { Photo } from 'src/app/core/models/photo.model';
import { DinerUserService } from 'src/app/core/services/dinerUser.service';
import { ImageGridComponent } from 'src/app/image-grid/image-grid.component';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private userService : DinerUserService) {}

  user: any = {};
  imageUrls: string[] = [];
  editMode = false;
  numberOfColumns=3;
  selectedFile: File | undefined;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  imageName: any;

  ngOnInit(): void {
    console.log("in user profile");
    this.userService.getUserDetails('username').subscribe((userDetails: any) => {
      console.log("user profile get user details");
      this.user = userDetails;
      
    });

    // Retrieve photo feed from the UserService
    this.userService.getPhotoFeed('username').subscribe(
      (photoFeed: Photo[]) => {
        // Use the map operator to extract image URLs
        console.log("user profile get photo feed");
        this.imageUrls = photoFeed.map(photo => photo.imageUrl);
        console.log("this photo feed = ", this.imageUrls)
      },
      (error) => {
        console.error('Error fetching photo feed:', error);
      }
    );


    console.log("this.user ngoninit = ", this.user);
    
  }
  
  

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

  // onFeedChanged(event: any) {
  //   // Handle file selection
  //   this.selectedFile = event.target.files[0];
  // }

  
  // onFeedUpload(){
  //   if (!this.selectedFile) {
  //     // Handle if no file is selected
  //     console.error('No file selected.');
  //     return;
  //   }

  //   // Create a FormData object to send the file
  //   const formData = new FormData();
  //   formData.append('file', this.selectedFile);

  //   // Call the insertPhoto() method from UserService with the FormData
  //   this.userService.insertPhoto('username', formData).subscribe(
  //     (response: any[]) => { // Explicitly type response as an array
  //       // Photo added successfully, update the photo feed if your API returns the updated feed
  //       this.imageUrls = response.map((photo: any) => photo.imageUrl);
  //     },
  //     (error) => {
  //       // Handle error if the photo upload fails
  //       console.error('Error adding photo:', error);
  //     }
  //   );


  //   // Reset the selected file
  //   this.selectedFile = undefined;
  // }
  

  saveChanges() {}
}