export interface DinerUser {
    id: number;
    name: string;
    photoUrl?: string;
    bio: string;
    likeRestaurantUserIdList: number[];
    matchedDinerUserIdList: number[];
    // Add more properties as needed
  }