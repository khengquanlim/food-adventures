package com.org.foodAdventures.service;

import com.org.foodAdventures.entity.DinerUserProfile;
import com.org.foodAdventures.entity.RestaurantUserProfile;
import com.org.foodAdventures.repository.DinerUserProfileRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

 import org.slf4j.Logger;
 import org.slf4j.LoggerFactory;

@Service
public class DinerUserProfileService {
    @Autowired
    private DinerUserProfileRepository dinerUserProfileRepository;
    private final Logger log = LoggerFactory.getLogger(UserService.class);

    public List<DinerUserProfile> getAllDinerUsersDetails() {
        return dinerUserProfileRepository.getAllDinerUsersDetails();
    }

    public DinerUserProfile getCurrentDinerUsersDetails(String username) {
        return dinerUserProfileRepository.getCurrentDinerUsersDetails(username);
    }

    public DinerUserProfile getCurrentDinerUsersDetailsById(Integer dinerUserProfileId) {
        return dinerUserProfileRepository.getCurrentDinerUsersDetailsById(dinerUserProfileId);
    }

    public DinerUserProfile updateDinerUserProfile(DinerUserProfile dinerUserProfile) {
        return dinerUserProfileRepository.save(dinerUserProfile);
    }
}