import { Component, OnInit } from '@angular/core';
import { RestaurantUpdateRequest } from 'src/app/core/models/restaurantUpdateRequest.model';
import { RestaurantUserService } from 'src/app/core/services/restaurantUser.service';
import { ImageGridComponent } from 'src/app/image-grid/image-grid.component'; 
import { UserProfilePicRequest } from 'src/app/core/models/userProfilePicRequest.model';

@Component({
  selector: 'app-restaurant-owner-profile',
  templateUrl: './restaurant-owner-profile.component.html',
  styleUrls: ['./restaurant-owner-profile.component.css']
})
export class RestaurantOwnerProfileComponent implements OnInit  {

  constructor(private restaurantService : RestaurantUserService) {}

  userDetails: any = {};
  restaurant: RestaurantUpdateRequest = {};
  newProfilePic:UserProfilePicRequest = {};

  imageUrls: string[] = [];
  editMode = false;
  uploadMode = false;
  numberOfColumns=3;
  
  profilePic: any;
  photoChanged = false;
  feedPic : any;
  userId = 'rest1002';
  
  RESTAURANT_USER_TYPE = 'restaurant';

  PROFILE_USAGE_TYPE='profile';
  FEED_USAGE_TYPE ='feed';

  ngOnInit(): void {
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
    this.restaurantService.getUserDetails(this.userId).subscribe((userDetails: any) => {
      // console.log("user profile get user details");
      console.log(userDetails);
      console.log(userDetails[0]);
      
      this.userDetails = userDetails[0];
      this.restaurant.restaurantName= this.userDetails.restaurantName;
      this.restaurant.restaurantOwnerName = this.userDetails.restaurantOwnerName;
      this.restaurant.foodOptionsTag = this.userDetails.foodOptionsTag;
      this.restaurant.bio = this.userDetails.bio;
      this.restaurant.location = this.userDetails.location;
      this.restaurant.pricePerPax = this.userDetails.pricePerPax;
      this.restaurant.rating = this.userDetails.rating;
      this.restaurant.bookingUrl = this.userDetails.bookingUrl;
      this.restaurant.userId = this.userDetails.userId;
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
    this.restaurantService.getFeed(this.userId, this.PROFILE_USAGE_TYPE, this.RESTAURANT_USER_TYPE).subscribe(
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
    this.restaurantService.getFeed(this.userId, this.FEED_USAGE_TYPE, this.RESTAURANT_USER_TYPE).subscribe(
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
    this.editMode = false;
    console.log("save changes rest", this.restaurant);
    this.restaurantService.updateUserDetails(this.restaurant)
    .subscribe((updateUserDetails: any) => {
      console.log('User details updated:', updateUserDetails);
      this.restaurant = updateUserDetails;
      this.getUserDetails()
    },(error) => {
      // Handle any errors that occur during the update
      console.error('Error updating user details:', error);
    });

    if (this.photoChanged){
      console.log("yes photo changed");
      this.restaurantService.updateProfilePic(this.newProfilePic)
      .subscribe(() => {
        console.log("entering NOW");
        this.getProfilePic();
        this.photoChanged = false;
      },(error) => {
        // Handle any errors that occur during the update
        console.error('Error updating user details:', error);
      });

      //return to false
      
    }
  }

  
  
  onFeedUpload() {
    console.log("savechanges()");
    this.restaurantService.insertFeed(this.newProfilePic)
      .subscribe(() => {
        console.log("entering NOW");

        this.uploadMode = false;
        this.getFeed();
        
      },(error) => {
        // Handle any errors that occur during the update
        console.error('Error updating user details:', error);
      });


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
      // this.newProfilePic = URL.createObjectURL(file);
      const reader = new FileReader();
      
      reader.onload = (e) => {
        // The result property contains the base64 string
        this.newProfilePic.userId=this.userId;
        this.newProfilePic.restaurantId = '1';
        this.newProfilePic.imageName = file.name;
        const imageType = file.type.split('/')[1]; // This extracts the "jpeg" part
        this.newProfilePic.imageType = imageType;
        this.newProfilePic.userType = this.RESTAURANT_USER_TYPE;
        this.newProfilePic.usageType=this.PROFILE_USAGE_TYPE;
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
        // this.newProfilePic.imageByte = this.newProfilePic.imageByte.substring('image/jpeg;base64,'.length);
        console.log("Base64 Image: ", this.newProfilePic);
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
      this.photoChanged = true;
    }
    // Implement logic to upload and set the new profile picture
    const file = event.target.files[0];
    // Implement logic to upload the file and set profilePictureUrl
    if (file && file.type.startsWith('image/')) {
      console.log("in true");
      // this.newProfilePic = URL.createObjectURL(file);
      const reader = new FileReader();
      
      reader.onload = (e) => {
        // The result property contains the base64 string
        this.newProfilePic.userId=this.userId;
        this.newProfilePic.restaurantId = '1';
        this.newProfilePic.imageName = file.name;
        const imageType = file.type.split('/')[1]; // This extracts the "jpeg" part
        this.newProfilePic.imageType = imageType;
        this.newProfilePic.userType = this.RESTAURANT_USER_TYPE;
        this.newProfilePic.usageType=this.FEED_USAGE_TYPE;
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
        // this.newProfilePic.imageByte = this.newProfilePic.imageByte.substring('image/jpeg;base64,'.length);
        console.log("Base64 Image: ", this.newProfilePic);
        console.log("model = ", this.newProfilePic);

      };



      reader.readAsDataURL(file);
    } else {
      console.log('Invalid file type or no file selected.');
    }
    
  }

  
  
}
