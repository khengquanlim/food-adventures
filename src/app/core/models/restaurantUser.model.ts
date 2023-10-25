export interface RestaurantUser {
    id: number;
    name: string;
    profilePicUrl?: string;
    foodPicsUrl?: string[];
    location: string;
    pricePerPax: string;
    rating: string;
    dinerLikesIdList: number[];
    toRecommendDinerUserIdPairList?: number[];
    // Add more properties as needed
  }