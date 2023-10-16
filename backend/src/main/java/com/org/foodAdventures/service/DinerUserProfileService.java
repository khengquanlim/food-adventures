package com.org.foodAdventures.service;

import com.org.foodAdventures.entity.DinerUserProfile;
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
}