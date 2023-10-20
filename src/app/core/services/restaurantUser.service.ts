import { Injectable } from '@angular/core';
import { RestaurantUser } from "../models/restaurantUser.model"
import { DinerUser } from '../models/dinerUser.model';
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class RestaurantUserService {
    private RestaurantUsers: RestaurantUser[] = [
      {
        id: 1,
        name: 'Genki Sushi',
        profilePicUrl: '/assets/debug/user1.jpg',
        foodPicsUrl: ['/assets/debug/food1.jpg', '/assets/debug/food2.jpg', '/assets/debug/food3.jpg', '/assets/debug/food4.jpg'],
        location: 'Yishun',
        pricePerPax: '$40/pax',
        rating: '4.1',
        dinerLikesIdList: [2]
      }, 
      {
        id: 2,
        name: 'TacoBell',
        profilePicUrl: '/assets/debug/user2.jpg',
        foodPicsUrl: ['/assets/debug/food5.jpg', '/assets/debug/food6.jpg'],
        location: 'Jurong East',
        pricePerPax: '$20/pax',
        rating: '6.9',
        dinerLikesIdList: [2]
      },
      {
        id: 3,
        name: 'Cooking Empire',
        profilePicUrl: '/assets/debug/user3.jpg',
        foodPicsUrl: ['/assets/debug/food4.jpg', '/assets/debug/food2.jpg', '/assets/debug/food3.jpg'],
        location: 'Insane food here!',
        pricePerPax: '$20/pax',
        rating: '6.9',
        dinerLikesIdList: [3]
      },
      {
        id: 4,
        name: 'Chinese meow',
        profilePicUrl: '/assets/debug/user4.jpg',
        foodPicsUrl: ['/assets/debug/food4.jpg', '/assets/debug/food5.jpg', '/assets/debug/food6.jpg'],
        location: 'Traditional and modern chinese cooking!',
        pricePerPax: '$20/pax',
        rating: '6.9',
        dinerLikesIdList: []
      },
    ];
  
    private likedRestaurantUserIds: number[] = [];
    private dislikedRestaurantUserIds: number[] = [];
    private currentRestaurantUserIndex = 0;

    constructor(private http: HttpClient) {}
  
    getRestaurantUsers(): RestaurantUser[] {
      return this.RestaurantUsers;
    }
    
    getAllRestaurantUserProfile(): Observable<any> {
      return this.http.get('http://localhost:8080/foodAdventures/getAllRestaurantProfile');
    }
    
    getAllRestaurantUserImagesByUsernameAndUserType(username: string, userType: string): Observable<any> {
      console.log("username", username)
      console.log("userType", userType)
      return this.http.get(`http://localhost:8080/foodAdventures/getAllRestaurantImages?username=${username}&userType=${userType}`);
    }
    
    updateDinerUserLikeListByRestaurantUserProfileId(dinerUserLikeList: string, restaurantUserProfileId: number): Observable<any> {
      const url = `http://localhost:8080/foodAdventures/updateDinerUserLikeListById`;

      const params = new HttpParams()
      .set('dinerUserLikeList', dinerUserLikeList)
      .set('restaurantUserProfileId', restaurantUserProfileId);
  
      return this.http.post(url, null, { params });
    };
  
    getRestaurantUserById(): Observable<any> {
      // return this.RestaurantUsers[0];
      return this.http.get('http://localhost:8080/foodAdventures/getRestaurantProfileById');
    }
  
    getCurrentRestaurantUser(): RestaurantUser {
      return this.RestaurantUsers[this.currentRestaurantUserIndex];
    }

    getMatchedRestaurantUsers(): RestaurantUser[] {
      const matchedRestaurantUsers = this.RestaurantUsers.filter(RestaurantUser => this.likedRestaurantUserIds.includes(RestaurantUser.id));
      return matchedRestaurantUsers;
    }

    addDinerUserToCurrentRestaurantUserLikesIdList(likedRestaurantUser: RestaurantUser, dinerUserId: number): void {
      likedRestaurantUser.dinerLikesIdList.push(dinerUserId)
    }
  
    likeUser(RestaurantUserId: number, dinerUser: DinerUser): void {
      
      const currentRestaurantUserId = this.getCurrentRestaurantUser()?.id;
      const likedRestaurantUser = this.RestaurantUsers.find((RestaurantUser) => RestaurantUser.id === RestaurantUserId);
      if(likedRestaurantUser) {
        console.log(`You liked user with ID ${RestaurantUserId}.`);

        if (likedRestaurantUser && !likedRestaurantUser.dinerLikesIdList.includes(dinerUser.id)) {
          this.addDinerUserToCurrentRestaurantUserLikesIdList(likedRestaurantUser, dinerUser.id);
        }
        this.currentRestaurantUserIndex++;
      } else {
      }
      this.checkEndOfMatchingRestaurantUsers();
    }

    compareCurrentDinerUserToRestaurantDinerLikesIdList(currentDinerUserId: number, currentRestaurantDinerUserLikeList: number[]): boolean {
      const currentDinerLikesIdList = currentRestaurantDinerUserLikeList;
      console.log("currentDinerLikesIdList.length!", currentDinerLikesIdList.length)
      console.log("currentDinerLikesIdList.length!", currentDinerLikesIdList)
      if (currentDinerLikesIdList.length != 0 && !(currentDinerLikesIdList.includes(currentDinerUserId))) {
        console.log("Got others in the like id list!")
        return true;
      } else {
        console.log("Got ME in the like id list!")
        return false;
      }
    }

    getOtherDinerUserIdFromRestaurantDinerLikesIdList(currentDinerUser: DinerUser, currentRestaurantDinerUserLikeList: number[]): number {
      console.log("getOtherDinerUserIdFromRestaurantDinerLikesIdList DINERuSER", currentDinerUser)

      for (const dinerUserId of currentRestaurantDinerUserLikeList) {
        if (!currentDinerUser.matchedDinerUserIdList.includes(dinerUserId) && dinerUserId != currentDinerUser.id) {
          console.log("Suc?")
          return dinerUserId;
        }
      }
      return 0;
    }

    dislikeUser(dinerUserId: number): void {
      if (!this.dislikedRestaurantUserIds.includes(dinerUserId)) {
        this.dislikedRestaurantUserIds.push(dinerUserId);
        console.log(`You disliked user with ID ${dinerUserId}.`);
  
        this.currentRestaurantUserIndex++;
      }
      console.log("this.currentRestaurantUserIndex", this.currentRestaurantUserIndex)
      this.checkEndOfMatchingRestaurantUsers();
    }

    checkEndOfMatchingRestaurantUsers(): void {
      if (this.currentRestaurantUserIndex >= this.RestaurantUsers.length) {
        console.log('No more users to display.');
        this.currentRestaurantUserIndex = -1;
      }
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