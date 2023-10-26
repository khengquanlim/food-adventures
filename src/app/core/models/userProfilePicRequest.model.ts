export class UserProfilePicRequest {
    constructor(
        public userId?: string,
        public restaurantId?: string,
        public imageName?: string,
        public imageType?: string,
        public userType?: string,
        public usageType?: string,
        public imageByte?: any
    ) {
    }
}