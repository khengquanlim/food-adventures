export class CommonConstant {

    //TODO: to replace this with the actual microservice url
    public static get authenticationBaseUrl() { return 'http://localhost:8082/foodAdventures'; }

    public static getCommonBaseUrl() { return 'http://localhost:8080/foodAdventures'; }

    public static get RESPONSE_SUCCESS() { return 'SUCCESS'; }
    public static get RESPONSE_FAILURE() { return 'FAILURE'; }
}
