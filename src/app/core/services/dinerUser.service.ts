import { Injectable } from '@angular/core';
import { DinerUser } from '../models/dinerUser.model';
import { UserUpdateRequest } from 'src/app/core/models/userUpdateRequest.model';
import { Photo } from '../models/photo.model';
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { Observable, switchMap } from 'rxjs';
import {from} from 'rxjs';
import { UserProfilePicRequest } from '../models/userProfilePicRequest.model';


@Injectable({
    providedIn: 'root'
  })
  export class DinerUserService {
  
    private matchedDinerUsers: DinerUser[] = [];
    constructor(private http: HttpClient) {}

    private baseUrl = 'http://localhost:8080/foodAdventures';
    
    getAllUsers(): Observable<any> {
      return this.http.get('http://localhost:8080/foodAdventures/getAllUsers');
    }
  
    getDinerUserProfileByUserId(username: String): Observable<any> {
      return this.http.get(`http://localhost:8080/foodAdventures/getCurrentDinerUserProfileByUserId?username=${username}`);
    }
    
    getAllDinerUserProfile(): Observable<any> {
      return this.http.get('http://localhost:8080/foodAdventures/getAllDinerUserProfile');
    }
    
    getAllDinerUserImagesByUsernameAndUserTypeAndUsageType(username: string, userType: string, usageType: string): Observable<any> {
      return this.http.get(`http://localhost:8080/foodAdventures/getAllImagesByUsernameAndImageTypeAndUsageType?username=${username}&userType=${userType}&usageType=${usageType}`);
    }
    
    updateDinerUserLikeListByRestaurantUserProfileId(matchedDinerUserIdList: string, dinerUserProfileId: number): Observable<any> {
      const url = `http://localhost:8080/foodAdventures/updateMatchedDinerUserListById`;

      const params = new HttpParams()
      .set('matchedDinerUserIdList', matchedDinerUserIdList)
      .set('dinerUserProfileId', dinerUserProfileId);
  
      return this.http.post(url, null, { params });
    };

    addMatchedUser(dinerUser: DinerUser): void {
      this.matchedDinerUsers.push(dinerUser);
    }
    
    //esther
    getUserDetails(userId: string) {
      const url = `${this.baseUrl}/${userId}/getDinerUserDetails`;
      return this.http.get<DinerUser[]>(url);
    }

    updateUserDetails(userDetails: UserUpdateRequest): Observable<any>
      {
        // console.log("userid is ", userDetails.dinerUserProfileId);
        // console.log("username is ", userDetails.username);
        // console.log("userid is ", userDetails.userId);
        // console.log("userdetails", userDetails);


      const url = `${this.baseUrl}/${userDetails.userId}/updateDinerDetails`;
      return this.http.post(url, userDetails);
    }

    updateProfilePic(profilePic: UserProfilePicRequest): Observable<any> {
      const url = `${this.baseUrl}/${profilePic.userId}/updateProfilePic`;
      return this.http.post(url, profilePic);
      
    }

    insertFeed(profilePic: UserProfilePicRequest): Observable<any> {
      const url = `${this.baseUrl}/${profilePic.userId}/insertFeed`;
      return this.http.post(url, profilePic);
    }
    
    deleteImage(username: string, userType: string, usageType: string, image: string): Observable<any>{
      console.log("deleteimage at service", image);
      // console.log("image is ", image);
      const base64ImageData = btoa(image);
      console.log("base64 is ",base64ImageData);
      const requestBody = { imageData: image };
      const url = `${this.baseUrl}/${username}/deleteImage?username=${username}&userType=${userType}&usageType=${usageType}`;
      return this.http.post(url, requestBody);
    }
    
    getProfilePic(username: string, usageType: string, userType: string): Observable<string>{
      console.log("get pic username", username);
      console.log("usageType", usageType);
      console.log("userType", userType);
      
      const url = `${this.baseUrl}/${username}/getProfilePic?username=${username}&usageType=${usageType}&userType=${userType}`;
      return this.http.get(url, { responseType: 'blob' }).pipe(
        switchMap((imageBlob: Blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(imageBlob);
          // console.log("image blob = ", imageBlob);
          return new Observable<string>((observer) => {
            reader.onloadend = () => {
              if (reader.result) {
                console.log("reader.result = ", reader.result);
                observer.next(reader.result.toString());
                observer.complete();
              } else {
                observer.error('Error converting image blob to URL.');
              }
            };
          });
        })
      );
      
    }


    getFeed(username: string, usageType: string, userType:string): Observable<any> {
      // console.log("username", username);
      // console.log("usageType", usageType);
      // console.log("userType", userType);
      
      const url = `${this.baseUrl}/getFeed?username=${username}&usageType=${usageType}&userType=${userType}`;
      return this.http.get(url);
    }

    
    convertStringToArray(inputString: String): number[] {
      if(inputString === null) {
        return [];
      } else {
        // Remove square brackets and any leading/trailing whitespace
        const cleanedString = inputString.replace(/^\[|\]$/g, '');
      
        // Split the cleaned string by commas
        const stringArray = cleanedString.split(',');
      
        // Parse each element into a number and create a number array
        const numberArray = stringArray.map(element => parseInt(element, 10));
    
        return numberArray;
      }
    }
      
}