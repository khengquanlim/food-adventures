import { Injectable } from '@angular/core';
import { RestaurantUser } from '../models/restaurantUser.model';

@Injectable({
    providedIn: 'root'
  })
  export class RestaurantUserService {
    private restaurantUsers: RestaurantUser[] = [
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
  
    //Hardcode 1 or 2 (user ID) for now
    private likedRestaurantUserIds: number[] = [1,2];
    private dislikedRestaurantUserIds: number[] = [];
    private currentRestaurantUserIndex = 0;
  
    getRestaurantUsers(): RestaurantUser[] {
      return this.restaurantUsers;
    }
  
    getRestaurantUserById(restaurantUserId: number): RestaurantUser | undefined {
      return this.restaurantUsers.find(restaurantUser => restaurantUser.id === restaurantUserId);
    }
  
    getRestaurantCurrentUser(): RestaurantUser | undefined {
      return this.restaurantUsers[this.currentRestaurantUserIndex];
    }
  
    // Assuming you have a method to handle matching users
    // For simplicity, this example just returns the first two users as matches

    getMatchedRestaurantUsers(): RestaurantUser[] {
      const matchedRestaurantUsers = this.restaurantUsers.filter(restaurantUser => this.likedRestaurantUserIds.includes(restaurantUser.id));
      return matchedRestaurantUsers;
    }
  
    likeRestaurantUser(userRestaurantId: number): void {
      if (!this.likedRestaurantUserIds.includes(userRestaurantId)) {
        this.likedRestaurantUserIds.push(userRestaurantId);
        console.log(`You liked user with ID ${userRestaurantId}.`);
  
        // Update the index to show the next user after liking/disliking
        this.currentRestaurantUserIndex++;
      }
  
      // Handle cases where there are no more users to display
      if (this.currentRestaurantUserIndex >= this.restaurantUsers.length) {
        console.log('No more users to display.');
        // You can choose to redirect the user or show a message indicating that there are no more users.
        // For this example, we'll just reset the index to show the first user again.
        this.currentRestaurantUserIndex = 0;
      }
    }
  
    dislikeRestaurantUser(userRestaurantId: number): void {
      if (!this.dislikedRestaurantUserIds.includes(userRestaurantId)) {
        this.dislikedRestaurantUserIds.push(userRestaurantId);
        console.log(`You disliked user with ID ${userRestaurantId}.`);
  
        // Update the index to show the next user after liking/disliking
        this.currentRestaurantUserIndex++;
      }
  
      // Handle cases where there are no more users to display
      if (this.currentRestaurantUserIndex >= this.restaurantUsers.length) {
        console.log('No more users to display.');
        // You can choose to redirect the user or show a message indicating that there are no more users.
        // For this example, we'll just reset the index to show the first user again.
        this.currentRestaurantUserIndex = 0;
      }
    }
  }