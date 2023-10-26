import { Component, OnInit } from '@angular/core';
import { RestaurantUpdateRequest } from 'src/app/core/models/restaurantUpdateRequest.model';
import { RestaurantUserService } from 'src/app/core/services/restaurantUser.service';
import { ImageGridComponent } from 'src/app/image-grid/image-grid.component'; 
import { UserProfilePicRequest } from 'src/app/core/models/userProfilePicRequest.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurant-owner-profile',
  templateUrl: './restaurant-owner-profile.component.html',
  styleUrls: ['./restaurant-owner-profile.component.css']
})
export class RestaurantOwnerProfileComponent implements OnInit  {

  constructor(private route: ActivatedRoute,
    private restaurantService : RestaurantUserService) {}

  restaurant: RestaurantUpdateRequest = {};
  newProfilePic:UserProfilePicRequest = {};
  newFeed:UserProfilePicRequest = {};

  userDetails: any = {};
  imageUrls: string[] = [];
  profilePic: any;
  feedPic : any;
  userId :any;
  imageToDelete: any; // Initialize the variable
  selectedImages: string[] = [];
  
  editMode = false;
  uploadMode = false;
  deleteMode = false;

  photoChanged = false;
  feedChanged = false;
  deleteChanged = false;
  
  
  numberOfColumns=3;
  
  RESTAURANT_USER_TYPE = 'restaurant';
  PROFILE_USAGE_TYPE='profile';
  FEED_USAGE_TYPE ='feed';

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      // Get the user's ID from the route parameters
      //e.g.SUP003
      this.userId = params['userId'];

    });
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
      this.restaurant.restaurantUserProfileId = this.userDetails.restaurantUserProfileId;
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
    this.restaurantService.updateUserDetails(this.userId, this.restaurant)
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
    if (this.feedChanged){
    console.log("savechanges()");
    this.restaurantService.insertFeed(this.newFeed)
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
        this.newProfilePic.restaurantId = this.restaurant.restaurantUserProfileId!.toString();
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
        this.newFeed.restaurantId = this.restaurant.restaurantUserProfileId!.toString();
        this.newFeed.imageName = file.name;
        const imageType = file.type.split('/')[1]; // This extracts the "jpeg" part
        this.newFeed.imageType = imageType;
        this.newFeed.userType = this.RESTAURANT_USER_TYPE;
        this.newFeed.usageType=this.FEED_USAGE_TYPE;
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
        console.log("model = ", this.newFeed);

      };



      reader.readAsDataURL(file);
    } else {
      console.log('Invalid file type or no file selected.');
    }
    
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
      this.restaurantService.deleteImage(this.userId,this.RESTAURANT_USER_TYPE,this.FEED_USAGE_TYPE,image).subscribe(
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
