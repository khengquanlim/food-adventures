package com.org.foodAdventuresBackendOne.controller;

import com.org.foodAdventuresBackendOne.common.*;
import com.org.foodAdventuresBackendOne.entity.*;
import com.org.foodAdventuresBackendOne.model.*;
import com.org.foodAdventuresBackendOne.service.*;
import com.org.foodAdventuresBackendOne.model.LoginRequest;

import org.slf4j.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class UserController {

	@Autowired
	private UserService userService;

	private static final Logger log = LoggerFactory.getLogger(UserController.class);

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<JsonWrapperObject> saveUserRegistration(@RequestBody UserRegisterRequest userRegisterRequest) {
        log.info("User Registration Creation: {}", userRegisterRequest.getUserId());
        User user = userService.saveUserRegistration(userRegisterRequest);
        JsonWrapperObject response = new JsonWrapperObject();

        if(user == null ) {
            response.setStatus(CommonConstant.FAILURE);
            response.setDescription("UserId already exists");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else {
            response.setStatus(CommonConstant.SUCCESS);
            response.setData(user);
            return ResponseEntity.ok(response);
        }
    }

    @RequestMapping(value="/login", method = RequestMethod.POST)
    public ResponseEntity<JsonWrapperObject> login(@RequestBody LoginRequest loginData) {
        log.info("login usercontroller");
        Object loginResult = userService.login(loginData.getEmail(), loginData.getPassword());

        JsonWrapperObject response = new JsonWrapperObject();

        if (loginResult instanceof User) {
            User user = (User) loginResult;
            log.info("im a user");
            // If the returned object is a User, it means the login was successful.
            response.setStatus("success");
            response.setData(user);
            return ResponseEntity.ok(response);
        }else if (loginResult.equals("incorrect_password")) {
            log.info("Incorrect password");
            response.setStatus("error");
            response.setDescription("Incorrect password"); // Return specific error message for incorrect password
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        } else {
            log.info("User not found");
            response.setStatus("error");
            response.setDescription("User not found"); // Return specific error message for user not found
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }


}
