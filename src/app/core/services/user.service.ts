import { Injectable } from '@angular/core';
import { User } from './../models/user.model';

@Injectable({
    providedIn: 'root'
  })
  export class UserService {
    private users: User[] = [
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
    private likedUserIds: number[] = [1,2];
    private dislikedUserIds: number[] = [];
    private currentUserIndex = 0;
  
    getUsers(): User[] {
      return this.users;
    }
  
    getUserById(userId: number): User | undefined {
      return this.users.find(user => user.id === userId);
    }
  
    getCurrentUser(): User | undefined {
      return this.users[this.currentUserIndex];
    }
  
    // Assuming you have a method to handle matching users
    // For simplicity, this example just returns the first two users as matches

    getMatchedUsers(): User[] {
      const matchedUsers = this.users.filter(user => this.likedUserIds.includes(user.id));
      return matchedUsers;
    }
  
    likeUser(userId: number): void {
      if (!this.likedUserIds.includes(userId)) {
        this.likedUserIds.push(userId);
        console.log(`You liked user with ID ${userId}.`);
  
        // Update the index to show the next user after liking/disliking
        this.currentUserIndex++;
      }
  
      // Handle cases where there are no more users to display
      if (this.currentUserIndex >= this.users.length) {
        console.log('No more users to display.');
        // You can choose to redirect the user or show a message indicating that there are no more users.
        // For this example, we'll just reset the index to show the first user again.
        this.currentUserIndex = 0;
      }
    }
  
    dislikeUser(userId: number): void {
      if (!this.dislikedUserIds.includes(userId)) {
        this.dislikedUserIds.push(userId);
        console.log(`You disliked user with ID ${userId}.`);
  
        // Update the index to show the next user after liking/disliking
        this.currentUserIndex++;
      }
  
      // Handle cases where there are no more users to display
      if (this.currentUserIndex >= this.users.length) {
        console.log('No more users to display.');
        // You can choose to redirect the user or show a message indicating that there are no more users.
        // For this example, we'll just reset the index to show the first user again.
        this.currentUserIndex = 0;
      }
    }
  }