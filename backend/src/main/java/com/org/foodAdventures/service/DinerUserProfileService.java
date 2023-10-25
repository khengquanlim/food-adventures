package com.org.foodAdventures.service;

import com.org.foodAdventures.entity.DinerUserProfile;
import com.org.foodAdventures.repository.DinerUserProfileRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import java.math.*;

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

    //esther
    public List<DinerUserProfile> getUserDetails(String userId) {

        List<DinerUserProfile> profiles = dinerUserProfileRepository.getUserDetails(userId);

        for (DinerUserProfile profile : profiles) {
			
			log.info("loop age = " + profile);
		}
        return dinerUserProfileRepository.getUserDetails(userId);
    }

    public void updateUserDetails(String dinerUserName, String username, Integer age, String gender, String bio, String foodPreferencesTag, String userId) {
        // log.info("service dinerUserName "+dinerUserName);
        // log.info("service username "+username);
        dinerUserProfileRepository.updateUserDetails(dinerUserName, username, age, gender, bio, foodPreferencesTag, userId);
    }
}