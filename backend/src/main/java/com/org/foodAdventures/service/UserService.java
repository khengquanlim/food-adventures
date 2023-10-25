package com.org.foodAdventures.service;

import com.org.foodAdventures.entity.User;

import com.org.foodAdventures.model.*;

import com.org.foodAdventures.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;
import java.util.*;

import java.math.*;


import java.sql.*;



import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;


    private final Logger log = LoggerFactory.getLogger(UserService.class);

    public List<DinerUserProfile> getAllUsers() {
        return userRepository.getAllUsers();
    }


    public User saveUserRegistration(UserRegisterRequest userRegisterRequest) {

        try{
            Timestamp currentTimestamp = new Timestamp(System.currentTimeMillis());

            if (userRepository.getByName(userRegisterRequest.getUserId()) != null) {
                log.info("User already exists");
                return null;
            } else {
                User user = new User();
                user.setId(userRegisterRequest.getUserId());
                user.setUserType(userRegisterRequest.getUserType());
                user.setPwdHash(userRegisterRequest.getPassword());
                user.setAge(userRegisterRequest.getAge());
                user.setEmail(userRegisterRequest.getEmail());
                user.setLastOnline(currentTimestamp);
                user.setCreatedTs(currentTimestamp);
                user.setUpdatedTs(currentTimestamp);

                return userRepository.save(user);
            }

        }catch (Exception e){
            log.info("Exception: {}", e);
            return null;
        }
    }

}
