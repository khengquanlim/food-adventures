export class UserUpdateRequest {
    constructor(
        public dinerUserName?: string,
        public username?: string,
        public age?: any,
        public gender?: string,
        public bio?: string,
        public foodPrefTag?: string,
        public userId?: number
    ) {
    }
}