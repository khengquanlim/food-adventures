import { Injectable } from '@angular/core';
import { RestaurantUser } from "../models/restaurantUser.model"
import { DinerUser } from '../models/dinerUser.model';
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class RestaurantUserService {
  
    private likedRestaurantUserIds: number[] = [];
    private dislikedRestaurantUserIds: number[] = [];
    private currentRestaurantUserIndex = 0;

    constructor(private http: HttpClient) {}
    
    getAllRestaurantUserProfile(): Observable<any> {
      return this.http.get('http://localhost:8080/foodAdventures/getAllRestaurantProfile');
    }
    
    getAllRestaurantUserImagesByUsernameAndUserType(username: string, userType: string): Observable<any> {
      return this.http.get(`http://localhost:8080/foodAdventures/getAllImagesByUsernameAndImageType?username=${username}&userType=${userType}`);
    }
    
    updateDinerUserLikeListByRestaurantUserProfileId(dinerUserLikeList: string, restaurantUserProfileId: number): Observable<any> {
      const url = `http://localhost:8080/foodAdventures/updateDinerUserLikeListById`;

      const params = new HttpParams()
      .set('dinerUserLikeList', dinerUserLikeList)
      .set('restaurantUserProfileId', restaurantUserProfileId);
  
      return this.http.post(url, null, { params });
    };
  
    getRestaurantUserById(): Observable<any> {
      return this.http.get('http://localhost:8080/foodAdventures/getRestaurantProfileById');
    }

    addDinerUserToCurrentRestaurantUserLikesIdList(likedRestaurantUser: RestaurantUser, dinerUserId: number): void {
      likedRestaurantUser.dinerLikesIdList.push(dinerUserId)
    }

    compareCurrentDinerUserToRestaurantDinerLikesIdList(currentDinerUserId: number, currentRestaurantDinerUserLikeList: number[]): boolean {
      const currentDinerLikesIdList = currentRestaurantDinerUserLikeList;
      if (currentDinerLikesIdList.length != 0 && !(currentDinerLikesIdList.includes(currentDinerUserId))) {
        console.log("Got others in the like id list!")
        return true;
      } else {
        console.log("Got ME in the like id list!")
        return false;
      }
    }

    getOtherDinerUserIdFromRestaurantDinerLikesIdList(currentDinerUser: DinerUser, currentRestaurantDinerUserLikeList: number[]): number {

      for (const dinerUserId of currentRestaurantDinerUserLikeList) {
        if (!currentDinerUser.matchedDinerUserIdList.includes(dinerUserId) && dinerUserId != currentDinerUser.id) {
          return dinerUserId;
        }
      }
      return 0;
    }

    convertStringToArray(inputString: String): number[] {
      if(inputString === null) {
        return [];
      } else {
        const cleanedString = inputString.replace(/^\[|\]$/g, '');
        const stringArray = cleanedString.split(',');
        const numberArray = stringArray.map(element => parseInt(element, 10));
    
        return numberArray;
      }
    }
  }