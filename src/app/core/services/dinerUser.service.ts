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
  
    private likedDinerUserIds: number[] = [];
    private matchedDinerUsers: DinerUser[] = [];
    private dislikedDinerUserIds: number[] = [];
    private currentDinerUserIndex = 0;
  
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

    }
  }