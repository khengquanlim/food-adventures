package com.org.foodAdventures.service;

import com.org.foodAdventures.entity.User;
import com.org.foodAdventures.entity.DinerUserProfile;


import com.org.foodAdventures.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;

import java.math.*;

 import org.slf4j.Logger;
 import org.slf4j.LoggerFactory;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    private static final String UPLOAD_DIR = "/path/to/your/photo/directory";
    private final Logger log = LoggerFactory.getLogger(UserService.class);

    public List<DinerUserProfile> getAllUsers() {
        return userRepository.getAllUsers();
    }

    public List<DinerUserProfile> getUserDetails(String username) {
        return userRepository.getUserDetails(username);
    }

    public void updateUserDetails(String username, BigDecimal age, String gender, String bio, String foodPreferencesTag) {
        userRepository.updateUserDetails(username, age, gender, bio, foodPreferencesTag);
    }

    

}
