import { Injectable } from '@angular/core';
import { DinerUser } from '../models/dinerUser.model';
import { UserUpdateRequest } from 'src/app/core/models/userUpdateRequest.model';
import { Photo } from '../models/photo.model';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import {from} from 'rxjs';
import { UserProfilePicRequest } from '../models/userProfilePicRequest.model';


@Injectable({
    providedIn: 'root'
  })
  export class DinerUserService {
    
    private dinerUsers: DinerUser[] = [
      {
        id: 1,
        name: 'John Doe',
        photoUrl: 'path/to/john-doe.jpg',
        bio: 'Hi, I am John. Nice to meet you!',
        // Add more properties as needed
      },
      {
        id: 2,
        name: 'Jane Smith',
        photoUrl: 'path/to/jane-smith.jpg',
        bio: 'Hey, I am Jane. Let\'s have a great conversation!',
        // Add more properties as needed
      },
      // Add more dummy user data here
    ];
    constructor(private http: HttpClient) {}

    private baseUrl = 'http://localhost:8080/foodAdventures';
    //Hardcode 1 or 2 (user ID) for now
    private likedDinerUserIds: number[] = [1,2];
    private dislikedDinerUserIds: number[] = [];
    private currentDinerUserIndex = 0;
    
    getAllUsers(): Observable<any> {
      return this.http.get('http://localhost:8080/foodAdventures/getAllUsers');
    }

    getDinerUsers(): DinerUser[] {
      return this.dinerUsers;
    }
  
    getDinerUserById(dinerUserId: number): DinerUser | undefined {
      return this.dinerUsers.find(dinerUser => dinerUser.id === dinerUserId);
    }
  
    getCurrentDinerUser(): DinerUser | undefined {
      return this.dinerUsers[this.currentDinerUserIndex];
    }
  
    // Assuming you have a method to handle matching users
    // For simplicity, this example just returns the first two users as matches

    getMatchedDinerUsers(): DinerUser[] {
      const matchedDinerUsers = this.dinerUsers.filter(dinerUser => this.likedDinerUserIds.includes(dinerUser.id));
      return matchedDinerUsers;
    }
  
    likeDinerUser(dinerUserId: number): void {
      if (!this.likedDinerUserIds.includes(dinerUserId)) {
        this.likedDinerUserIds.push(dinerUserId);
        console.log(`You liked user with ID ${dinerUserId}.`);
  
        // Update the index to show the next user after liking/disliking
        this.currentDinerUserIndex++;
      }
  
      // Handle cases where there are no more users to display
      if (this.currentDinerUserIndex >= this.dinerUsers.length) {
        console.log('No more users to display.');
        // You can choose to redirect the user or show a message indicating that there are no more users.
        // For this example, we'll just reset the index to show the first user again.
        this.currentDinerUserIndex = 0;
      }
    }
  
    dislikeDinerUser(userDinerId: number): void {
      if (!this.dislikedDinerUserIds.includes(userDinerId)) {
        this.dislikedDinerUserIds.push(userDinerId);
        console.log(`You disliked user with ID ${userDinerId}.`);
  
        // Update the index to show the next user after liking/disliking
        this.currentDinerUserIndex++;
      }
  
      // Handle cases where there are no more users to display
      if (this.currentDinerUserIndex >= this.dinerUsers.length) {
        console.log('No more users to display.');
        // You can choose to redirect the user or show a message indicating that there are no more users.
        // For this example, we'll just reset the index to show the first user again.
        this.currentDinerUserIndex = 0;
      }
    // getMatchedUsers(): User[] {
    //   const matchedUsers = this.users.filter(user => this.likedUserIds.includes(user.id));
    //   return matchedUsers;
    // }
  
    // likeUser(userId: number): void {
      // if (!this.likedUserIds.includes(userId)) {
      //   this.likedUserIds.push(userId);
      //   console.log(`You liked user with ID ${userId}.`);
  
      //   // Update the index to show the next user after liking/disliking
      //   this.currentUserIndex++;
      // }
  
      // // Handle cases where there are no more users to display
      // if (this.currentUserIndex >= this.users.length) {
      //   console.log('No more users to display.');
      //   // You can choose to redirect the user or show a message indicating that there are no more users.
      //   // For this example, we'll just reset the index to show the first user again.
      //   this.currentUserIndex = 0;
      // }
    // }
  
    // dislikeUser(userId: number): void {
      // if (!this.dislikedUserIds.includes(userId)) {
      //   this.dislikedUserIds.push(userId);
      //   console.log(`You disliked user with ID ${userId}.`);
  
      //   // Update the index to show the next user after liking/disliking
      //   this.currentUserIndex++;
      // }
  
      // // Handle cases where there are no more users to display
      // if (this.currentUserIndex >= this.users.length) {
      //   console.log('No more users to display.');
      //   // You can choose to redirect the user or show a message indicating that there are no more users.
      //   // For this example, we'll just reset the index to show the first user again.
      //   this.currentUserIndex = 0;
      // }
    // }
    }
    
    //esther
    getUserDetails(userId: string) {
      const url = `${this.baseUrl}/${userId}/getDinerUserDetails`;
      return this.http.get<DinerUser[]>(url);
    }

    updateUserDetails(userDetails: UserUpdateRequest): Observable<any>
      {
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

    
      
}