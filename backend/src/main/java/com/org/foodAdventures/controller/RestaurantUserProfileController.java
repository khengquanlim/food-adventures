package com.org.foodAdventures.controller;

import com.org.foodAdventures.common.*;
import com.org.foodAdventures.entity.*;
import com.org.foodAdventures.service.*;
import org.springframework.transaction.annotation.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import com.org.foodAdventures.dto.RestaurantUpdateRequest;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class RestaurantUserProfileController {
    @Autowired
    private RestaurantUserProfileService restaurantUserProfileService;
    

    private static final Logger log = LoggerFactory.getLogger(RestaurantUserProfileController.class);

     @RequestMapping(value="/getAllRestaurantProfile", method= RequestMethod.GET)
     public ResponseEntity<JsonWrapperObject> getAllRestaurantProfile() {
         log.info("restaurant user profile controller get all restaurant profile");
         JsonWrapperObject response = new JsonWrapperObject();
         try {
             List<RestaurantUserProfile> restaurantUserProfiles = restaurantUserProfileService.getAllRestaurantProfile();
             log.info("successfully retrieve restaurant user profiles = {}", restaurantUserProfiles);
             response.setStatus(CommonConstant.SUCCESS);
             response.setData(restaurantUserProfiles);
             return ResponseEntity.ok(response);
         } catch(Exception e) {
             log.info("error in retrieving all restaurant user profiles: {}", e.getMessage());
             response.setStatus(CommonConstant.FAILURE);
             response.setDescription(e.getMessage());
             return ResponseEntity.ok(response);
         }
     }

    // @RequestMapping(value="/getRestaurantProfileById", method= RequestMethod.GET)
    // public ResponseEntity<JsonWrapperObject> getRestaurantProfileById(@RequestParam("restaurantUserProfileId") Integer restaurantUserProfileId) {
    //     log.info("restaurant user profile controller get all restaurant profile");
    //     JsonWrapperObject response = new JsonWrapperObject();
    //     try {
    //         RestaurantUserProfile restaurantUserProfiles = restaurantUserProfileService.getRestaurantProfileById(restaurantUserProfileId);
    //         log.info("successfully retrieve restaurant user profiles = {}", restaurantUserProfiles);
    //         response.setStatus(CommonConstant.SUCCESS);
    //         response.setData(restaurantUserProfiles);
    //         return ResponseEntity.ok(response);
    //     } catch(Exception e) {
    //         log.info("error in retrieving all restaurant user profiles: {}", e.getMessage());
    //         response.setStatus(CommonConstant.FAILURE);
    //         response.setDescription(e.getMessage());
    //         return ResponseEntity.ok(response);
    //     }
    // }

    // @RequestMapping(value = "/updateDinerUserLikeListById", method = RequestMethod.POST)
    // public ResponseEntity<?> updateDinerUserLikeList(
    //     @RequestParam("dinerUserLikeList") String dinerUserLikeListJson,
    //     @RequestParam("restaurantUserProfileId") Integer restaurantUserProfileId) {

    //     try {
    //         RestaurantUserProfile restaurantUserProfile = restaurantUserProfileService.getRestaurantProfileById(
    //                 restaurantUserProfileId
    //         );
    //         restaurantUserProfile.setDinerUserLikeList(dinerUserLikeListJson);
    //         restaurantUserProfileService.updateRestaurantUserProfile(restaurantUserProfile);
    //         log.info("Successfully updated restaurant user profiles = {}", restaurantUserProfile);
    //         return ResponseEntity.ok("{\"message\": \"Update successful\"}");
    //     } catch (Exception e) {
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred.");
    //     }
    // }

    //esther
    @RequestMapping(value="/{username}/getRestaurantUserDetails", method= RequestMethod.GET)
	public List<RestaurantUserProfile> getUserDetails(@PathVariable String username) {
		return restaurantUserProfileService.getUserDetails(username);
	}

    @Transactional
    @RequestMapping(value = "/{userId}/updateRestaurantDetails", method = RequestMethod.POST)
	public ResponseEntity<JsonWrapperObject> updateUserDetails(@PathVariable String userId, @RequestBody RestaurantUpdateRequest userUpdateRequest) {
        String restaurantName = userUpdateRequest.getRestaurantName();
		String ownerName = userUpdateRequest.getRestaurantOwnerName();
		String foodOptionsTag = userUpdateRequest.getFoodOptionsTag();
		String bio = userUpdateRequest.getBio();
		String location = userUpdateRequest.getLocation();
        String price = userUpdateRequest.getPricePerPax();
        String rating = userUpdateRequest.getRating();
        String bookingUrl = userUpdateRequest.getBookingUrl();
        // log.info("userid is"+ userId);
        // log.info("restaurantName is"+ restaurantName);
        // log.info("ownerName is"+ ownerName);
        // log.info("foodOptionsTag is"+ foodOptionsTag);
        // log.info("bio is"+ bio);
        // log.info("location is"+ location);
        // log.info("price is"+ price);
        // log.info("rating is"+ rating);
        // log.info("bookingUrl is"+ bookingUrl);
		List<RestaurantUserProfile> existingRestaurantUserList = restaurantUserProfileService.getUserDetails(userId);
		if(existingRestaurantUserList.size() == 0) {
			 log.info("first time user: {}" + userId);
			 RestaurantUserProfile newRestaurantUser = new RestaurantUserProfile();
			 newRestaurantUser.setUserId(userId);
			 newRestaurantUser.setRestaurantName(restaurantName);
			 newRestaurantUser.setRestaurantOwnerName(ownerName);
			 newRestaurantUser.setFoodOptionsTag(foodOptionsTag);
			 newRestaurantUser.setBio(bio);
			 newRestaurantUser.setLocation(location);
			 newRestaurantUser.setPricePerPax(price);
			 newRestaurantUser.setRating(rating);
			 newRestaurantUser.setBookingUrl(bookingUrl);
			restaurantUserProfileService.updateRestaurantUserProfile(newRestaurantUser);
		} else {
			 log.info("existing user: {}" + userId);
				restaurantUserProfileService.updateUserDetails(restaurantName, ownerName, foodOptionsTag, bio, location,price, rating, bookingUrl, userId);
		}
		
        JsonWrapperObject response = new JsonWrapperObject();
		response.setStatus(CommonConstant.SUCCESS);
		response.setDescription("User details updated successfully"); // Provide a description

		return ResponseEntity.ok(response);

        
    }

    @RequestMapping(value="/getRestaurantProfileById", method= RequestMethod.GET)
    public ResponseEntity<JsonWrapperObject> getRestaurantProfileById(@RequestParam("restaurantUserProfileId") Integer restaurantUserProfileId) {
        log.info("restaurant user profile controller get all restaurant profile");
        JsonWrapperObject response = new JsonWrapperObject();
        try {
            RestaurantUserProfile restaurantUserProfiles = restaurantUserProfileService.getRestaurantProfileById(restaurantUserProfileId);
            log.info("successfully retrieve restaurant user profiles = {}", restaurantUserProfiles);
            response.setStatus(CommonConstant.SUCCESS);
            response.setData(restaurantUserProfiles);
            return ResponseEntity.ok(response);
        } catch(Exception e) {
            log.info("error in retrieving all restaurant user profiles: {}", e.getMessage());
            response.setStatus(CommonConstant.FAILURE);
            response.setDescription(e.getMessage());
            return ResponseEntity.ok(response);
        }
    }

    @RequestMapping(value = "/updateDinerUserLikeListById", method = RequestMethod.POST)
    public ResponseEntity<?> updateDinerUserLikeList(
        @RequestParam("dinerUserLikeList") String dinerUserLikeListJson,
        @RequestParam("restaurantUserProfileId") Integer restaurantUserProfileId) {

        try {
            RestaurantUserProfile restaurantUserProfile = restaurantUserProfileService.getRestaurantProfileById(
                    restaurantUserProfileId
            );
            restaurantUserProfile.setDinerUserLikeList(dinerUserLikeListJson);
            restaurantUserProfileService.updateRestaurantUserProfile(restaurantUserProfile);
            log.info("Successfully updated restaurant user profiles = {}", restaurantUserProfile);
            return ResponseEntity.ok("{\"message\": \"Update successful\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred.");
        }
    }
}
