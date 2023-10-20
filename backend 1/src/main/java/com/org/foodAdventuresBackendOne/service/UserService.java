package com.org.foodAdventuresBackendOne.service;

import com.org.foodAdventuresBackendOne.entity.*;
import com.org.foodAdventuresBackendOne.model.*;
import com.org.foodAdventuresBackendOne.repository.*;
import org.slf4j.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.sql.*;
import java.util.*;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    private final Logger log = LoggerFactory.getLogger(UserService.class);

    public List<User> getAllUsers() {
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
