import { Injectable } from '@angular/core';
import { DinerUser } from '../models/dinerUser.model';
import { Photo } from '../models/photo.model';
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { Observable } from 'rxjs';

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
    
    //user-profile

    updateUserDetails(
      username: string,
      age: number,
      gender: string,
      profilePic: string,
      bio: string
    ) {
      const url = `${this.baseUrl}/${username}/updateDetails`;
      const body = { age, gender, profilePic, bio };
      return this.http.post(url, body);
    }
  
    insertPhoto(username: string, formData: FormData): Observable<any> {
      const url = `${this.baseUrl}/${username}/insertPhoto`;
      return this.http.post(url, formData);
    }
  
    getUserDetails(username: string) {
      console.log("service get user details");
      const url = `${this.baseUrl}/${username}/getUserDetails`;
      return this.http.get<DinerUser[]>(url);
    }
  
    getPhotoFeed(username: string) {
      console.log("service get photo feed");
      const url = `${this.baseUrl}/${username}/getPhotoFeed`;
      return this.http.get<Photo[]>(url);
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