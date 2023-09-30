import { Injectable } from '@angular/core';
import { RestaurantUser } from "../models/restaurantUser.model"

@Injectable({
    providedIn: 'root'
  })
  export class RestaurantUserService {
    private RestaurantUsers: RestaurantUser[] = [
      {
        id: 1,
        name: 'Genki Sushi',
        profilePicUrl: '/assets/debug/user1.jpeg',
        foodPicsUrl: ['/assets/debug/food1.jpg', '/assets/debug/food2.jpg', '/assets/debug/food3.jpg', '/assets/debug/food4.jpg'],
        location: 'Yishun',
        pricePerPax: '$40/pax',
        rating: '4.1',
        likeId: []
      },
      {
        id: 2,
        name: 'TacoBell',
        foodPicsUrl: ['/assets/debug/food4.jpg', '/assets/debug/food5.jpg', '/assets/debug/food6.jpg'],
        location: 'Jurong East',
        pricePerPax: '$20/pax',
        rating: '6.9',
        likeId: []
      },
    ];
  
    private likedRestaurantUserIds: number[] = [];
    private matchedRestaurantUsers: RestaurantUser[] = [];
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

    addMatchedUser(RestaurantUser: RestaurantUser): void {
      this.matchedRestaurantUsers.push(RestaurantUser);
    }
  
    likeUser(RestaurantUserId: number): void {
      const currentRestaurantUserId = this.getCurrentRestaurantUser()?.id;
      if (!this.likedRestaurantUserIds.includes(RestaurantUserId)) {
        this.likedRestaurantUserIds.push(RestaurantUserId);
        console.log(`You liked user with ID ${RestaurantUserId}.`);

        const likedRestaurantUser = this.RestaurantUsers.find((RestaurantUser) => RestaurantUser.id === RestaurantUserId);
        if (likedRestaurantUser && likedRestaurantUser.likeId.includes(currentRestaurantUserId)) {
          console.log("MATCHHH")
          this.addMatchedUser(likedRestaurantUser);
        }
        this.currentRestaurantUserIndex++;
      }
      this.checkEndOfMatchingRestaurantUsers();
    }
  
    dislikeUser(RestaurantUserId: number): void {
      if (!this.dislikedRestaurantUserIds.includes(RestaurantUserId)) {
        this.dislikedRestaurantUserIds.push(RestaurantUserId);
        console.log(`You disliked user with ID ${RestaurantUserId}.`);
  
        this.currentRestaurantUserIndex++;
      }
      this.checkEndOfMatchingRestaurantUsers();
    }

    checkEndOfMatchingRestaurantUsers(): void {
      if (this.currentRestaurantUserIndex >= this.RestaurantUsers.length) {
        console.log('No more users to display.');
        this.currentRestaurantUserIndex = -1;
      }

    }
  }