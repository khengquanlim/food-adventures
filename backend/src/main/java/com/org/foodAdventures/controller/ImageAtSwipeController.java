package com.org.foodAdventures.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.org.foodAdventures.common.CommonConstant;
import com.org.foodAdventures.common.JsonWrapperObject;
import com.org.foodAdventures.entity.Image;
import com.org.foodAdventures.service.ImageService;

@RestController

public class ImageAtSwipeController {

	@Autowired
	private ImageService imageService;

	private static final Logger log = LoggerFactory.getLogger(UserController.class);
        
    @RequestMapping(value="/getAllRestaurantImages", method= RequestMethod.GET)
	public ResponseEntity<JsonWrapperObject> getAllRestaurantImages(@RequestParam("username") String username, 
			@RequestParam("userType") String userType) {
		log.info("user controller get AllRestaurantImages");
		JsonWrapperObject response = new JsonWrapperObject();
		try {
			List<Image> imagesRetrieved = imageService.getAllRestaurantImagesByUsername(username, userType);
			log.info("successfully retrieve AllRestaurantImages = {}", imagesRetrieved);
			response.setStatus(CommonConstant.SUCCESS);
			response.setData(imagesRetrieved);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			log.info("error in retrieving AllRestaurantImages: {}", e.getMessage());
			response.setStatus(CommonConstant.FAILURE);
			response.setDescription(e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}

}
