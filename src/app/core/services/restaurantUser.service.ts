import { Injectable } from '@angular/core';
import { RestaurantUser } from "../models/restaurantUser.model"

@Injectable({
    providedIn: 'root'
  })
  export class RestaurantUserService {
    private RestaurantUsers: RestaurantUser[] = [
      {
        id: 1,
        name: 'John Doe',
        photoUrl: '/assets/debug/user1.jpeg',
        bio: 'Hi, I am John. Nice to meet you!',
        likeId: []
      },
      {
        id: 2,
        name: 'Jane Smith',
        photoUrl: '/assets/debug/user2.jpg',
        bio: 'Hey, I am Jane. Let\'s have a great conversation!',
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