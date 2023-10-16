import { Injectable } from '@angular/core';
import { DinerUser } from '../models/dinerUser.model';
import { Photo } from '../models/photo.model';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import {from} from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class DinerUserService {
    
    private dinerUsers: DinerUser[] = [
      {
        id: 1,
        name: 'John Doe',
        photoUrl: '/assets/debug/user1.jpg',
        bio: 'Hi, I am John. Nice to meet you!',
        likeRestaurantUserIdList: [1],
        matchedDinerUserIdList: []
      },
      {
        id: 2,
        name: 'Jane Smith',
        photoUrl: '/assets/debug/user2.jpg',
        bio: 'Hey, I am Jane. Let\'s have a great conversation!',
        likeRestaurantUserIdList: [],
        matchedDinerUserIdList: []
      },
      {
        id: 3,
        name: 'He He',
        photoUrl: '/assets/debug/user3.jpg',
        bio: 'Insane food here!',
        likeRestaurantUserIdList: [1],
        matchedDinerUserIdList: []
      },
      {
        id: 4,
        name: 'Chinese Hao',
        photoUrl: '/assets/debug/user4.jpg',
        bio: 'Traditional and modern chinese cooking!',
        likeRestaurantUserIdList: [1],
        matchedDinerUserIdList: []
      },
    ];
  
    private matchedDinerUsers: DinerUser[] = [];
    constructor(private http: HttpClient) {}

    private baseUrl = 'http://localhost:8080/foodAdventures';
    //Hardcode 1 or 2 (user ID) for now
    private likedDinerUserIds: number[] = [1,2];
    private dislikedDinerUserIds: number[] = [];
    private currentDinerUserIndex = 0;
    
    getAllUsers(): Observable<any> {
      return this.http.get('http://localhost:8080/foodAdventures/getAllUsers');
    }
    
    getAllDinerUserProfile(): Observable<any> {
      return this.http.get('http://localhost:8080/foodAdventures/getAllDinerUserProfile');
    }

    getDinerUsers(): DinerUser[] {
      return this.dinerUsers;
    }
  
    getDinerUserById(dinerUserId: number): DinerUser | undefined {
      return this.dinerUsers.find(user => user.id === dinerUserId);
    }
  
    getCurrentDinerUser(): DinerUser {
      return this.dinerUsers[this.currentDinerUserIndex];
    }

    getMatchedDinerUsers(): DinerUser[] {
      const matchedDinerUsers = this.dinerUsers.filter(dinerUser => this.likedDinerUserIds.includes(dinerUser.id));
      return matchedDinerUsers;
    }

    addMatchedUser(dinerUser: DinerUser): void {
      this.matchedDinerUsers.push(dinerUser);
    }

    addMatchedIdToCurrentDinerUser(dinerUserId: number): void {
      this.getCurrentDinerUser().matchedDinerUserIdList.push(dinerUserId);
    }

    addCurrentUserIdToMatchedDinerUser(matchedDinerUserId: number): void {
      this.getCurrentDinerUser().matchedDinerUserIdList.push(matchedDinerUserId);
    }

    addRestaurantUserIdTolikeRestaurantUserIdList(restaurantUserId: number): void {
      this.getCurrentDinerUser().likeRestaurantUserIdList.push(restaurantUserId);
    }
  
    likeUser(dinerUserId: number): void {
      const currentDinerUserId = this.getCurrentDinerUser()?.id;
      if (!this.likedDinerUserIds.includes(dinerUserId)) {
        this.likedDinerUserIds.push(dinerUserId);
        console.log(`You liked user with ID ${dinerUserId}.`);

        const likedDinerUser = this.dinerUsers.find((dinerUser) => dinerUser.id === dinerUserId);
        if (likedDinerUser && likedDinerUser.likeRestaurantUserIdList.includes(currentDinerUserId)) {
          console.log("MATCHHH")
          this.addMatchedUser(likedDinerUser);
        }
        this.currentDinerUserIndex++;
      }
      this.checkEndOfMatchingUsers();
    }
  
    dislikeUser(dinerUserId: number): void {
      if (!this.dislikedDinerUserIds.includes(dinerUserId)) {
        this.dislikedDinerUserIds.push(dinerUserId);
        console.log(`You disliked user with ID ${dinerUserId}.`);
  
        this.currentDinerUserIndex++;
      }
      this.checkEndOfMatchingUsers();
    }

    checkEndOfMatchingUsers(): void {
      if (this.currentDinerUserIndex >= this.dinerUsers.length) {
        console.log('No more users to display.');
        this.currentDinerUserIndex = -1;
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
      
}