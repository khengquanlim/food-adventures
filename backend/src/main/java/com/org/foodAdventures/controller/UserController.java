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

// import org.apache.coyote.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.*;
// import org.springframework.web.bind.annotation.*;
// import org.springframework.core.io.ByteArrayResource;
// import org.springframework.core.io.Resource;

@RestController
public class UserController {

// import java.util.*;
// import java.math.*;

// @RestController
// @CrossOrigin(origins = "http://localhost:4200")
// //@RequestMapping("/api/users")
// public class UserController {

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
            response.setDescription("User already exists");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else {
            response.setStatus(CommonConstant.SUCCESS);
            response.setData(user);
            return ResponseEntity.ok(response);
        }
    }
}
