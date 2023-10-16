package com.org.foodAdventures.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.org.foodAdventures.common.CommonConstant;
import com.org.foodAdventures.common.JsonWrapperObject;
import com.org.foodAdventures.entity.DinerUserProfile;
import com.org.foodAdventures.service.DinerUserProfileService;

@RestController
//@RequestMapping("/api/users")
public class DinerUserProfileController {

	@Autowired
	private DinerUserProfileService dinerUserProfileService;

	private static final Logger log = LoggerFactory.getLogger(UserController.class);
        
    @RequestMapping(value="/getAllDinerUserProfile", method= RequestMethod.GET)
	public ResponseEntity<JsonWrapperObject> getAllDinerUsersDetails() {
		log.info("user controller get all diner users details");
		JsonWrapperObject response = new JsonWrapperObject();
		try {
			List<DinerUserProfile> dinerUsers = dinerUserProfileService.getAllDinerUsersDetails();
			log.info("successfully retrieve diner users details = {}", dinerUsers);
			response.setStatus(CommonConstant.SUCCESS);
			response.setData(dinerUsers);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			log.info("error in retrieving diner users details: {}", e.getMessage());
			response.setStatus(CommonConstant.FAILURE);
			response.setDescription(e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}
    
}
