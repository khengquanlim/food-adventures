package com.org.foodAdventures.controller;

import com.org.foodAdventures.common.*;
import com.org.foodAdventures.entity.*;
import com.org.foodAdventures.service.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
