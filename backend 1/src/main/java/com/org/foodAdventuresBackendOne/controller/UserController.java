package com.org.foodAdventuresBackendOne.controller;

import com.org.foodAdventuresBackendOne.common.*;
import com.org.foodAdventuresBackendOne.entity.*;
import com.org.foodAdventuresBackendOne.model.*;
import com.org.foodAdventuresBackendOne.service.*;

import org.slf4j.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

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
}
