package com.org.foodAdventures.service;

import com.org.foodAdventures.entity.Message;
import com.org.foodAdventures.entity.RestaurantUserProfile;
import com.org.foodAdventures.repository.RestaurantUserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
}
