package com.org.foodAdventures.controller;


import java.util.*;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.transaction.annotation.Transactional;


import com.org.foodAdventures.common.CommonConstant;
import com.org.foodAdventures.common.JsonWrapperObject;
import com.org.foodAdventures.entity.DinerUserProfile;
import com.org.foodAdventures.service.DinerUserProfileService;

import com.org.foodAdventures.dto.UserUpdateRequest;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class DinerUserProfileController {

	@Autowired
	private DinerUserProfileService dinerUserProfileService;


	private static final Logger log = LoggerFactory.getLogger(DinerUserProfileController.class);

    

    //esther
    @RequestMapping(value="/{userId}/getDinerUserDetails", method= RequestMethod.GET)
	public List<DinerUserProfile> getUserDetails(@PathVariable String userId) {
        // log.info("get userid is "+ userId);
		return dinerUserProfileService.getUserDetails(userId);
	}

    @Transactional
    @RequestMapping(value = "/{userId}/updateDinerDetails", method = RequestMethod.POST)
	public ResponseEntity<JsonWrapperObject> updateUserDetails(@PathVariable String userId, @RequestBody UserUpdateRequest userUpdateRequest) {
        // log.info("set userid is "+ userId);
		String dinerUserName = userUpdateRequest.getDinerUserName();
        String username = userUpdateRequest.getUsername();
		Integer age = userUpdateRequest.getAge();
		String gender = userUpdateRequest.getGender();
		String bio = userUpdateRequest.getBio();
		String foodPreferencesTag = userUpdateRequest.getFoodPrefTag();
		// log.info("set dinerUserProfileId is "+ dinerUserProfileId);
		// log.info("set dinerUserName is "+ dinerUserName);
		// log.info("set username is "+ username);
        // log.info("set age is "+ age);
		// log.info("foodpref" + foodPreferencesTag);
        // String userId = userUpdateRequest.getUserId();		List<DinerUserProfile> existingDinerUserList = dinerUserProfileService.getUserDetails(userId);
		if(existingDinerUserList.size() == 0) {
			 log.info("first time user: {}" + userId);
			 DinerUserProfile newDinerUser = new DinerUserProfile();
			 newDinerUser.setDinerUserName(dinerUserName);
			 newDinerUser.setUsername(userId);
			 newDinerUser.setAge(age);
			 newDinerUser.setGender(gender);
			 newDinerUser.setBio(bio);
			 newDinerUser.setFoodPrefTag(foodPreferencesTag);
			dinerUserProfileService.updateDinerUserProfile(newDinerUser);
		} else {
			 log.info("existing user: {}" + userId);
			dinerUserProfileService.updateUserDetails(dinerUserName, username, age, gender, bio, foodPreferencesTag);
		}
        
        JsonWrapperObject response = new JsonWrapperObject();
		response.setStatus(CommonConstant.SUCCESS);
		response.setDescription("User details updated successfully"); // Provide a description

		return ResponseEntity.ok(response);
    }
    

	    
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
    
	@RequestMapping(value="/getCurrentDinerUserProfileByUserId", method= RequestMethod.GET)
	public ResponseEntity<JsonWrapperObject> getCurrentDinerUserProfileByUserId(@RequestParam("username") String username) {
		log.info("user controller get current diner user details");
		JsonWrapperObject response = new JsonWrapperObject();
		try {
			DinerUserProfile dinerUser = dinerUserProfileService.getCurrentDinerUsersDetails(username);
			log.info("successfully retrieve current diner user details = {}", dinerUser);
			response.setStatus(CommonConstant.SUCCESS);
			response.setData(dinerUser);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			log.info("error in retrieving current diner user details: {}", e.getMessage());
			response.setStatus(CommonConstant.FAILURE);
			response.setDescription(e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}

    @RequestMapping(value = "/updateMatchedDinerUserListById", method = RequestMethod.POST)
    public ResponseEntity<?> updateMatchedDinerUserListById(
        @RequestParam("matchedDinerUserIdList") String matchedDinerUserIdListJson,
        @RequestParam("dinerUserProfileId") Integer dinerUserProfileId) {

        try {
			DinerUserProfile dinerUser = dinerUserProfileService.getCurrentDinerUsersDetailsById(dinerUserProfileId);
            dinerUser.setMatchedDinerUserIdList(matchedDinerUserIdListJson);
            dinerUserProfileService.updateDinerUserProfile(dinerUser);
            log.info("Successfully updated diner user profiles = {}", dinerUser);
            return ResponseEntity.ok("{\"message\": \"Update successful\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred.");
        }
    }
    
}
