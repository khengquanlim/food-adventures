export interface ChatMessage {
    senderId: number;
    receiverId: number;
    restaurantId: number;
    content?: string;
    timestamp: Date;
  }