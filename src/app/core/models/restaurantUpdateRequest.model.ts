export class RestaurantUpdateRequest {
    constructor(
        public restaurantUserProfileId?: number,
        public userId?: string,
        public restaurantName?: string,
        public restaurantOwnerName?: string,
        public foodOptionsTag?: string,
        public bio?: string,
        public location?: string,
        public pricePerPax?: string,
        public rating?: string,
        public bookingUrl?: string
    ) {
    }
}