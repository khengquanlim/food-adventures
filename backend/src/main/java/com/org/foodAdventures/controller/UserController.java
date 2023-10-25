
package com.org.foodAdventures.controller;

import com.org.foodAdventures.common.*;
import com.org.foodAdventures.entity.*;
import com.org.foodAdventures.model.*;
import com.org.foodAdventures.service.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

	@Autowired
	private UserService userService;

	private static final Logger log = LoggerFactory.getLogger(UserController.class);

	@RequestMapping(value = "/getAllUsers", method = RequestMethod.GET)
	public ResponseEntity<JsonWrapperObject> getAllUsers() {
		log.info("user controller get all users");
		JsonWrapperObject response = new JsonWrapperObject();
		try {
			List<User> users = userService.getAllUsers();
			log.info("successfully retrieve users = {}", users);
			response.setStatus(CommonConstant.SUCCESS);
			response.setData(users);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			log.info("error in retrieving all users: {}", e.getMessage());
			response.setStatus(CommonConstant.FAILURE);
			response.setDescription(e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<JsonWrapperObject> saveUserRegistration(@RequestBody UserRegisterRequest userRegisterRequest) {
        log.info("User Registration Creation: {}", userRegisterRequest.getUserId());
        User user = userService.saveUserRegistration(userRegisterRequest);
        JsonWrapperObject response = new JsonWrapperObject();

        if(user == null ) {
            response.setStatus(CommonConstant.FAILURE);
            response.setDescription("User already exists");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else {
            response.setStatus(CommonConstant.SUCCESS);
            response.setData(user);
            return ResponseEntity.ok(response);
        }
    }
}
