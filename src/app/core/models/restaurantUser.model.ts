export interface RestaurantUser {
    id: number;
    name: string;
    photoUrl?: string;
    bio: string;
    likeId: number[];
    // Add more properties as needed
  }