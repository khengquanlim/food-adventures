import { Injectable } from '@angular/core';
import { DinerUser } from '../models/dinerUser.model';

@Injectable({
    providedIn: 'root'
  })
  export class DinnerUserService {
    private dinerUsers: DinerUser[] = [
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
  
    private likedDinerUserIds: number[] = [];
    private matchedDinerUsers: DinerUser[] = [];
    private dislikedDinnerUserIds: number[] = [];
    private currentDinnerUserIndex = 0;
  
    getDinnerUsers(): DinerUser[] {
      return this.dinerUsers;
    }
  
    getDinnerUserById(): DinerUser | undefined {
      return this.dinerUsers[0];
    }
  
    getCurrentDinerUser(): DinerUser {
      return this.dinerUsers[this.currentDinnerUserIndex];
    }

    getMatchedDinnerUsers(): DinerUser[] {
      const matchedDinerUsers = this.dinerUsers.filter(dinerUser => this.likedDinerUserIds.includes(dinerUser.id));
      return matchedDinerUsers;
    }

    addMatchedUser(dinerUser: DinerUser): void {
      this.matchedDinerUsers.push(dinerUser);
    }
  
    likeUser(dinerUserId: number): void {
      const currentDinerUserId = this.getCurrentDinerUser()?.id;
      if (!this.likedDinerUserIds.includes(dinerUserId)) {
        this.likedDinerUserIds.push(dinerUserId);
        console.log(`You liked user with ID ${dinerUserId}.`);

        const likedDinerUser = this.dinerUsers.find((dinerUser) => dinerUser.id === dinerUserId);
        if (likedDinerUser && likedDinerUser.likeId.includes(currentDinerUserId)) {
          console.log("MATCHHH")
          this.addMatchedUser(likedDinerUser);
        }
        this.currentDinnerUserIndex++;
      }
      this.checkEndOfMatchingUsers();
    }
  
    dislikeUser(dinerUserId: number): void {
      if (!this.dislikedDinnerUserIds.includes(dinerUserId)) {
        this.dislikedDinnerUserIds.push(dinerUserId);
        console.log(`You disliked user with ID ${dinerUserId}.`);
  
        this.currentDinnerUserIndex++;
      }
      this.checkEndOfMatchingUsers();
    }

    checkEndOfMatchingUsers(): void {
      if (this.currentDinnerUserIndex >= this.dinerUsers.length) {
        console.log('No more users to display.');
        this.currentDinnerUserIndex = -1;
      }

    }
  }