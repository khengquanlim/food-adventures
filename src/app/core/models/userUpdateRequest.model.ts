export class UserUpdateRequest {
    constructor(
        public username?: string,
        public age?: any,
        public gender?: string,
        public bio?: string,
        public foodPreferencesTag?: string,
        public userId?: string
    ) {
    }
}