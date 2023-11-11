package com.org.foodAdventuresBackendOne.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
    private BCryptPasswordEncoder passwordEncoder;
    private final Logger log = LoggerFactory.getLogger(UserService.class);

    public UserService() {
        this.passwordEncoder = new BCryptPasswordEncoder();
    }
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
            log.info("Exception: {}", e.getMessage());
            return null;
        }
    }

    public Object login(String email, String password) {
        // First, retrieve the user by username
        //hashing entered password
        log.info("entered userservice login");
        // String hashedPassword = this.hashPassword(password);
        log.info("hashedPassword is = "+password);
        User user = userRepository.findByEmail(email);
        if (user != null) {

            String storedHashedPassword = user.getPwdHash();
            // if (true){
            log.info("storedHashedPassword is = "+storedHashedPassword);

            if (this.verifyPassword(password, storedHashedPassword)) {
                log.info("verified");
                return user;
            } else {
                log.info("not verified");
                return "incorrect_password";
            }

        }else {
            //return error message saying no such user
            return "user_not_found";
        }
    }

    public String hashPassword(String plainPassword) {
        // Hash the plain password
        return passwordEncoder.encode(plainPassword);
    }

    public boolean verifyPassword(String plainPassword, String hashedPassword) {
        // Verify the plain password against the hashed password
        return passwordEncoder.matches(plainPassword, hashedPassword);
    }
}
