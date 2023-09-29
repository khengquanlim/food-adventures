import { Injectable } from '@angular/core';
import { DinerUser } from '../models/dinerUser.model';

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
  
    //Hardcode 1 or 2 (user ID) for now
    private likedDinerUserIds: number[] = [1,2];
    private dislikedDinerUserIds: number[] = [];
    private currentDinerUserIndex = 0;
  
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
    }
  }