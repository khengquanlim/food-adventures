package com.org.foodAdventures.service;

import com.org.foodAdventures.entity.RestaurantUserProfile;
import com.org.foodAdventures.repository.RestaurantUserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class RestaurantUserProfileService {
    @Autowired
    private RestaurantUserProfileRepository restaurantUserProfileRepository;

    private final Logger log = LoggerFactory.getLogger(RestaurantUserProfileService.class);

    public List<RestaurantUserProfile> getAllRestaurantProfile() {
        return restaurantUserProfileRepository.getAllRestaurantUserProfiles();
    }

    public RestaurantUserProfile getRestaurantProfileById(Integer restaurantUserProfileId) {
        return restaurantUserProfileRepository.getRestaurantProfileById(restaurantUserProfileId);
    }

    public RestaurantUserProfile updateRestaurantUserProfile(RestaurantUserProfile restaurantUserProfile) {
        return restaurantUserProfileRepository.save(restaurantUserProfile);
    }


    //esther
    public List<RestaurantUserProfile> getUserDetails(String userId) {
        return restaurantUserProfileRepository.getUserDetails(userId);
    }

    public void updateUserDetails(String restaurantName, String ownerName, String foodOptionsTag, String bio, 
    String location, String price, String rating, String bookingUrl, String userId) {
        restaurantUserProfileRepository.updateUserDetails(restaurantName, ownerName, foodOptionsTag, bio, location, price,rating, bookingUrl, userId);
    }
}

