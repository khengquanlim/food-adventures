import { Component, OnInit } from '@angular/core';
import { UserUpdateRequest } from 'src/app/core/models/userUpdateRequest.model';
import { DinerUserService } from 'src/app/core/services/dinerUser.service';
import { ImageGridComponent } from 'src/app/image-grid/image-grid.component'; 
import { UserProfilePicRequest } from 'src/app/core/models/userProfilePicRequest.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private userService : DinerUserService) {}

  user: UserUpdateRequest = {};
  newProfilePic:UserProfilePicRequest = {};
  newFeed:UserProfilePicRequest = {};
    
  userDetails: any = {};
  imageUrls: string[] = [];
  profilePic: any;
  feedPic : any;
  userId: any;
  imageToDelete: any; // Initialize the variable
  selectedImages: string[] = [];
  
  editMode = false;
  uploadMode = false;
  deleteMode = false;
  numberOfColumns=3;
  photoChanged = false;
  feedChanged = false;
  deleteChanged = false;
  
  DINER_USER_TYPE = 'diner';
  PROFILE_USAGE_TYPE='profile';
  FEED_USAGE_TYPE ='feed';

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      // Get the user's ID from the route parameters
      //e.g.SUP003
      this.userId = params['userId'];
      console.log("this.userId", this.userId)

    });

    console.log("in user profile");
    this.getUserDetails();
    this.getProfilePic();
    this.getFeed();
  }

    
  

    
  toggleEditMode() {   
    this.editMode = true;
    // console.log("editmode: ", this.editMode);
  }

  toggleUploadMode() {
    this.uploadMode = true;
    // console.log("uploadMode: ", this.uploadMode);
  }

  getUserDetails(){
    this.userService.getUserDetails(this.userId).subscribe((userDetails: any) => {
      // console.log("user profile get user details");
      console.log(userDetails);
      console.log(userDetails[0]);
      
      this.userDetails = userDetails[0];
      this.user.dinerUserName=this.userDetails.dinerUserName;
      this.user.userId= this.userDetails.userId;
      this.user.age = this.userDetails.age;
      this.user.gender = this.userDetails.gender;
      this.user.bio = this.userDetails.bio;
      this.user.foodPrefTag = this.userDetails.foodPrefTag;
      this.user.username = this.userDetails.username;
      
    });
  }

  // getProfilePic(){
  //   this.userService.getFeed(this.userId, this.PROFILE_USAGE_TYPE, this.DINER_USER_TYPE).subscribe((profilePic: any) => {
  //     this.profilePic = profilePic;
  //   },
  //   (error) => {
  //     console.error('Error fetching photo feed:', error);
  //   }
  //   );
  // }
  
  getProfilePic(){
    this.userService.getFeed(this.userId, this.PROFILE_USAGE_TYPE, this.DINER_USER_TYPE).subscribe(
      (response) => {
        this.profilePic = response.data;
        console.log("this.profilePic", this.profilePic);
        this.profilePic = this.getImageUrls(this.profilePic);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  getFeed(): void {
    this.userService.getFeed(this.userId, this.FEED_USAGE_TYPE, this.DINER_USER_TYPE).subscribe(
      (response) => {
        this.feedPic = response.data;
        console.log("this.feedpic", this.feedPic);
        this.feedPic = this.getImageUrls(this.feedPic);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }


  
  getImageUrls(images: any[]): string[] {
    if (images && images.length > 0) {
      return images.map((image) => 'data:image/jpeg;base64,' + image.imageByte);
    }
    return [];
  }


  saveChanges() {
    console.log("savechanges()");   
    this.user.userId = this.userId;
    console.log("this.user.userId", this.user.userId)
    this.editMode = false;
    console.log(this.user);
    this.userService.updateUserDetails(this.user).subscribe({
      next:(updateUserDetails: any) => {
        console.log('User details updated:', updateUserDetails);
        this.user = updateUserDetails;
        this.getUserDetails()
      },
      error:(error) => {
        // Handle any errors that occur during the update
        console.error('Error updating user details:', error);
      }
    });

    if (this.photoChanged){
      console.log("yes photo changed");
      this.userService.updateProfilePic(this.newProfilePic)
      .subscribe(() => {
        console.log("entering NOW");
        this.getProfilePic();
        this.photoChanged = false;
      },(error) => {
        // Handle any errors that occur during the update
        console.error('Error updating user details:', error);
      });
    }
  }

  onFeedUpload() {
    if (this.feedChanged){
      console.log("savechanges()");
      this.userService.insertFeed(this.newFeed)
        .subscribe(() => {
          console.log("entering NOW");
          this.getFeed();
          
        },(error) => {
          // Handle any errors that occur during the update
          console.error('Error updating user details:', error);
        });
    }
    
    this.uploadMode = false;
      this.newFeed = {};
  }

  
  
  onProfilePictureChange(event: any) {
    console.log('File input changed:', event);
    if (event){
      this.photoChanged = true;
    }
    // Implement logic to upload and set the new profile picture
    const file = event.target.files[0];
    // Implement logic to upload the file and set profilePictureUrl
    if (file && file.type.startsWith('image/')) {
      console.log("in true");
      const reader = new FileReader();
      
      reader.onload = (e) => {
        // The result property contains the base64 string
        this.newProfilePic.userId=this.userId;
        this.newProfilePic.restaurantId = '1';
        this.newProfilePic.imageName = file.name;
        const imageType = file.type.split('/')[1]; // This extracts the "jpeg" part
        this.newProfilePic.imageType = imageType;
        this.newProfilePic.userType = 'diner';
        this.newProfilePic.usageType='profile';
        this.newProfilePic.imageByte = reader.result as string;
        if (this.newProfilePic.imageByte.startsWith('data:image/jpeg;base64,')) {
          // It's a JPEG image
          this.newProfilePic.imageByte = this.newProfilePic.imageByte.substring('data:image/jpeg;base64,'.length);
      } else if (this.newProfilePic.imageByte.startsWith('data:image/jpg;base64,')) {
          // It's a JPG image
          this.newProfilePic.imageByte = this.newProfilePic.imageByte.substring('data:image/jpg;base64,'.length);
      } else if (this.newProfilePic.imageByte.startsWith('data:image/png;base64,')) {
          // It's a PNG image
          this.newProfilePic.imageByte = this.newProfilePic.imageByte.substring('data:image/png;base64,'.length);
      }
        console.log("Base64 Image: ", this.newProfilePic);
        console.log("onProfilePicChange base64? = ",this.isBase64Image(this.newProfilePic.imageByte));
        console.log("model = ", this.newProfilePic);

      };

      reader.readAsDataURL(file);
    } else {
      console.log('Invalid file type or no file selected.');
    }
    
  }

  onFeedChanged(event: any) {
    console.log('on feed changed:', event);
    if (event){
      this.feedChanged = true;
    }
    // Implement logic to upload and set the new profile picture
    const file = event.target.files[0];
    // Implement logic to upload the file and set profilePictureUrl
    if (file && file.type.startsWith('image/')) {
      console.log("in true");
      const reader = new FileReader();
      
      reader.onload = (e) => {
        // The result property contains the base64 string
        this.newFeed.userId=this.userId;
        this.newFeed.restaurantId = '1';
        this.newFeed.imageName = file.name;
        const imageType = file.type.split('/')[1]; // This extracts the "jpeg" part
        this.newFeed.imageType = imageType;
        this.newFeed.userType = 'diner';
        this.newFeed.usageType='feed';
        this.newFeed.imageByte = reader.result as string;
        if (this.newFeed.imageByte.startsWith('data:image/jpeg;base64,')) {
          // It's a JPEG image
          this.newFeed.imageByte = this.newFeed.imageByte.substring('data:image/jpeg;base64,'.length);
      } else if (this.newFeed.imageByte.startsWith('data:image/jpg;base64,')) {
          // It's a JPG image
          this.newFeed.imageByte = this.newFeed.imageByte.substring('data:image/jpg;base64,'.length);
      } else if (this.newFeed.imageByte.startsWith('data:image/png;base64,')) {
          // It's a PNG image
          this.newFeed.imageByte = this.newFeed.imageByte.substring('data:image/png;base64,'.length);
      }
        console.log("Base64 Image: ", this.newFeed);
        console.log("onProfilePicChange base64? = ",this.isBase64Image(this.newFeed.imageByte));
        console.log("model = ", this.newFeed);

      };

      reader.readAsDataURL(file);

    } else {
      console.log('Invalid file type or no file selected.');
    }
    
  }
  
  isBase64Image(base64String: string): boolean {
    const regex = /^data:image\/(jpeg|jpg|png|gif);base64,/i;
    return regex.test(base64String);
  }


  toggleDelete() {
    console.log("toggledelete");
    this.deleteMode = !this.deleteMode;

  }


// Function to handle image selection
  handleImageSelection(image: string): void {
    console.log("image is selected");
    // Check if the image is selected
    if (this.selectedImages.includes(image)) {
      console.log("images was previously selected. now removing it");
      // If the image is already in the selectedImages array, remove it
      this.selectedImages = this.selectedImages.filter((selectedImage) => selectedImage !== image);
      
    } else {
      // If the image is not in the selectedImages array, add it
      console.log("this.selectedImage", this.selectedImages);
      this.selectedImages.push(image);
    }
  }

  deleteSelectedImages(): void {
    console.log("deleteselectedimages");
    if (this.selectedImages.length === 0) {
      console.log("no iamges selected")
      // No selected images to delete
      this.deleteChanged = false;
    }else{
      if (confirm('Are you sure you want to delete the selected images?')) {
        for (const image of this.selectedImages) {
          // Send a delete request to your backend to delete the selected image
          this.deleteChanged = true;
          this.deleteImage(image);
        }
      }
    }
    this.selectedImages = [];
    this.deleteMode = false;
  }

  deleteImage(image: any): void {
    if(this.deleteChanged){
      console.log("delete image function");
      console.log("user profile image = ", image);
      this.userService.deleteImage(this.userId,this.DINER_USER_TYPE,this.FEED_USAGE_TYPE,image).subscribe(
        () => {
          console.log("delete image sucessfully");
          
          // Successfully deleted the image from the server
          // You may want to update your feedPic array here or reload the feed.
          // For example: this.getFeed(); to refresh the feed.
          this.getFeed();
        },
        (error) => {
          console.error('Error deleting image:', error);
        }
      );
    }
  }


}