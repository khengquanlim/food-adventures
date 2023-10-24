import { Injectable } from '@angular/core';
import { ChatMessage } from '../models/chatMessage.model';
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatMessageService {
  private chatMessages: ChatMessage[] = [];
  
  constructor(private http: HttpClient) {}

  addRestaurantNameAndBookingUrlToMessageDatabase(restaurantName: any, bookingUrl: any, senderId: any, receiverId: any): Observable<any> {  
    console.log(senderId)  
    console.log(restaurantName)  
    console.log(bookingUrl)  
    console.log(receiverId)  
    const url = `http://localhost:8080/foodAdventures/addRestaurantNameAndBookingUrlToMessageDatabase`;
    const body = {
      "senderId": senderId,
      "receiverId": receiverId,
      "bookingUrl": bookingUrl,
      "restaurantName": restaurantName
    };
    return this.http.put(url, body);
  }

  updateMessageBetweenCurrentUserAndSelectedUser(senderId: any, receiverId: any, message: any): Observable<any> {  
    console.log(senderId)  
    const url = `http://localhost:8080/foodAdventures/updateMessageBetweenCurrentUserAndSelectedUser`;
    const body = {
      "senderId": senderId,
      "receiverId": receiverId,
      "message": message
    };
    return this.http.put(url, body);
  }
    
  updateDinerUserLikeListByRestaurantUserProfileId(dinerUserLikeList: string, restaurantUserProfileId: number): Observable<any> {
    const url = `http://localhost:8080/foodAdventures/updateDinerUserLikeListById`;

    const params = new HttpParams()
    .set('dinerUserLikeList', dinerUserLikeList)
    .set('restaurantUserProfileId', restaurantUserProfileId);

    return this.http.post(url, null, { params });
  };

  getMessagesForUser(userId: number): ChatMessage[] {
    return this.chatMessages.filter((chatMessages) => chatMessages.receiverId === userId || chatMessages.senderId === userId);
  }
  getAllMatchedDinerUserChatMessages(currentDinerUserId: any, selectedDinerUserId: any): Observable<any> {
    return this.http.get(`http://localhost:8080/foodAdventures/getAllMatchedDinerUserChatMessages?senderId=${currentDinerUserId}&receiverId=${selectedDinerUserId}`);
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