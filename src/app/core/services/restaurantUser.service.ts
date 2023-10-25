import { Injectable } from '@angular/core';
import { RestaurantUser } from "../models/restaurantUser.model"
import { DinerUser } from '../models/dinerUser.model';
import { HttpClient, HttpParams } from '@angular/common/http'; 

import { Observable, switchMap } from 'rxjs';
import { RestaurantUpdateRequest } from '../models/restaurantUpdateRequest.model';
import { UserProfilePicRequest } from '../models/userProfilePicRequest.model';


@Injectable({
    providedIn: 'root'
  })
  export class RestaurantUserService {
  
    private likedRestaurantUserIds: number[] = [];
    private dislikedRestaurantUserIds: number[] = [];
    private currentRestaurantUserIndex = 0;
    private baseUrl = 'http://localhost:8080/foodAdventures';
    constructor(private http: HttpClient) {}
  
    getUserDetails(userId: string) {
      const url = `${this.baseUrl}/${userId}/getRestaurantUserDetails`;
      return this.http.get<DinerUser[]>(url);
    }

    updateUserDetails(userDetails: RestaurantUpdateRequest): Observable<any>
      {
      const url = `${this.baseUrl}/${userDetails.userId}/updateRestaurantDetails`;
      return this.http.post(url, userDetails);
    }

    updateProfilePic(profilePic: UserProfilePicRequest): Observable<any> {
      console.log("updating profile pic")
      const url = `${this.baseUrl}/${profilePic.userId}/updateProfilePic`;
      return this.http.post(url, profilePic);
      
    }

    insertFeed(profilePic: UserProfilePicRequest): Observable<any> {
      const url = `${this.baseUrl}/${profilePic.userId}/insertFeed`;
      return this.http.post(url, profilePic);
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

    deleteImage(username: string, userType: string, usageType: string, image: string): Observable<any>{
      console.log("deleteimage at service", image);
      // console.log("image is ", image);
      const base64ImageData = btoa(image);
      console.log("base64 is ",base64ImageData);
      const requestBody = { imageData: image };
      const url = `${this.baseUrl}/${username}/deleteImage?username=${username}&userType=${userType}&usageType=${usageType}`;
      return this.http.post(url, requestBody);
    }
    
    
    getAllRestaurantUserProfile(): Observable<any> {
      return this.http.get('http://localhost:8080/foodAdventures/getAllRestaurantProfile');
    }
    
    getAllRestaurantUserImagesByUsernameAndUserType(username: string, userType: string): Observable<any> {
      return this.http.get(`http://localhost:8080/foodAdventures/getAllImagesByUsernameAndImageType?username=${username}&userType=${userType}`);
    }
    
    updateDinerUserLikeListByRestaurantUserProfileId(dinerUserLikeList: string, restaurantUserProfileId: number): Observable<any> {
      const url = `http://localhost:8080/foodAdventures/updateDinerUserLikeListById`;

      const params = new HttpParams()
      .set('dinerUserLikeList', dinerUserLikeList)
      .set('restaurantUserProfileId', restaurantUserProfileId);
  
      return this.http.post(url, null, { params });
    };
  
    getRestaurantUserById(): Observable<any> {
      return this.http.get('http://localhost:8080/foodAdventures/getRestaurantProfileById');
    }

    addDinerUserToCurrentRestaurantUserLikesIdList(likedRestaurantUser: RestaurantUser, dinerUserId: number): void {
      likedRestaurantUser.dinerLikesIdList.push(dinerUserId)
    }

    compareCurrentDinerUserToRestaurantDinerLikesIdList(currentDinerUserId: number, currentRestaurantDinerUserLikeList: number[]): boolean {
      const currentDinerLikesIdList = currentRestaurantDinerUserLikeList;
      if (currentDinerLikesIdList.length != 0 && !(currentDinerLikesIdList.includes(currentDinerUserId))) {
        console.log("Got others in the like id list!")
        return true;
      } else {
        console.log("Got ME in the like id list!")
        return false;
      }
    }

    getOtherDinerUserIdFromRestaurantDinerLikesIdList(currentDinerUser: DinerUser, currentRestaurantDinerUserLikeList: number[]): number {

      for (const dinerUserId of currentRestaurantDinerUserLikeList) {
        if (!currentDinerUser.matchedDinerUserIdList.includes(dinerUserId) && dinerUserId != currentDinerUser.id) {
          return dinerUserId;
        }
      }
      return 0;
    }

    convertStringToArray(inputString: String): number[] {
      if(inputString === null) {
        return [];
      } else {
        const cleanedString = inputString.replace(/^\[|\]$/g, '');
        const stringArray = cleanedString.split(',');
        const numberArray = stringArray.map(element => parseInt(element, 10));
    
        return numberArray;
      }
    }
  }

  