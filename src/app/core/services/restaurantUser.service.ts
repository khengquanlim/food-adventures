import { Injectable } from '@angular/core';
import { RestaurantUser } from "../models/restaurantUser.model"
import { DinerUser } from '../models/dinerUser.model';

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
  
    getRestaurantUsers(): RestaurantUser[] {
      return this.RestaurantUsers;
    }
  
    getRestaurantUserById(): RestaurantUser | undefined {
      return this.RestaurantUsers[0];
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

    compareCurrentDinerUserToRestaurantDinerLikesIdList(currentDinerUserId: number, currentRestaurantLikeIdList: number[]): boolean {
      const currentDinerLikesIdListLength = this.getCurrentRestaurantUser().dinerLikesIdList.length;
      if (currentDinerLikesIdListLength != 0 && !this.getCurrentRestaurantUser().dinerLikesIdList.includes(currentDinerUserId)) {
        return true;
      } else {
        return false;
      }
    }

    getOtherDinerUserIdFromRestaurantDinerLikesIdList(currentDinerUser: DinerUser, currentRestaurantLikeIdList: number[]): number {
      console.log("currentRestaurantLikeIdList", currentRestaurantLikeIdList)
      for (const dinerUserId of currentRestaurantLikeIdList) {
        if (!currentDinerUser.matchedDinerUserIdList.includes(dinerUserId) && dinerUserId != currentDinerUser.id) {
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
  }