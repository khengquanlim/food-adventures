import { Component, OnInit } from '@angular/core';
import { UserUpdateRequest } from 'src/app/core/models/userUpdateRequest.model';
import { DinerUserService } from 'src/app/core/services/dinerUser.service';
import { ImageGridComponent } from 'src/app/image-grid/image-grid.component'; 
import { UserProfilePicRequest } from 'src/app/core/models/userProfilePicRequest.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private userService : DinerUserService) {}

  userDetails: any = {};
  user: UserUpdateRequest = {};
  newProfilePic:UserProfilePicRequest = {};

  imageUrls: string[] = [];
  editMode = false;
  uploadMode = false;
  numberOfColumns=3;
  
  profilePic: any;
  photoChanged = false;
  feedPic : any;
  userId = 'SUP003';
  
  DINER_USER_TYPE = 'diner';

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
    this.userService.getUserDetails('SUP003').subscribe((userDetails: any) => {
      // console.log("user profile get user details");
      console.log(userDetails);
      console.log(userDetails[0]);
      
      this.userDetails = userDetails[0];
      this.user.userId= this.userDetails.userId;
      this.user.age = this.userDetails.age;
      this.user.gender = this.userDetails.gender;
      this.user.bio = this.userDetails.bio;
      this.user.foodPreferencesTag = this.userDetails.foodPreferencesTag;
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
        this.filterImages(this.feedPic);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  filterImages(currentImages: any[]) {
    const currentRestaurantUserFeedImageByteUrls = currentImages.filter((feedImage: { usageType: string; }) => feedImage.usageType === 'feed');
    // const restaurantProfilePicByte = currentImages.filter((feedImage: { usageType: string; }) => feedImage.usageType === 'profile');
    // this.profilePic = this.getImageUrls(restaurantProfilePicByte);
    this.feedPic = this.getImageUrls(currentRestaurantUserFeedImageByteUrls);
    console.log("this.feedpic", this.feedPic);
    // console.log("this.profilePic", this.profilePic);
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
    this.userService.updateUserDetails(this.user)
    .subscribe((updateUserDetails: any) => {
      console.log('User details updated:', updateUserDetails);
      this.user = updateUserDetails;
      this.getUserDetails()
    },(error) => {
      // Handle any errors that occur during the update
      console.error('Error updating user details:', error);
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

      //return to false
      
    }
    

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
        // this.newProfilePic.imageByte = this.newProfilePic.imageByte.substring('image/jpeg;base64,'.length);
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
        this.newProfilePic.userType = 'diner';
        this.newProfilePic.usageType='feed';
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
        console.log("onProfilePicChange base64? = ",this.isBase64Image(this.newProfilePic.imageByte));
        console.log("model = ", this.newProfilePic);

      };



      reader.readAsDataURL(file);
    } else {
      console.log('Invalid file type or no file selected.');
    }
    
  }

  onFeedUpload() {
    console.log("savechanges()");
    this.userService.insertFeed(this.newProfilePic)
      .subscribe(() => {
        console.log("entering NOW");

        this.uploadMode = false;
        this.getFeed();
        
      },(error) => {
        // Handle any errors that occur during the update
        console.error('Error updating user details:', error);
      });


  }

  
  isBase64Image(base64String: string): boolean {
    const regex = /^data:image\/(jpeg|jpg|png|gif);base64,/i;
    return regex.test(base64String);
  }

  
  
  

}