export interface DinerUser {
    id: number;
    name: string;
    photoUrl?: string;
    bio: string;
    likeId: number[];
    matchedId: number[];
    // Add more properties as needed
  }