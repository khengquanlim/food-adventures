// package com.org.foodAdventures.controller;

// import com.org.foodAdventures.dto.UserUpdateRequest;
// import com.org.foodAdventures.dto.UserProfilePicRequest;

// import org.springframework.transaction.annotation.Transactional;
// import com.org.foodAdventures.common.*;
// import com.org.foodAdventures.entity.*;
// import com.org.foodAdventures.service.*;
// import java.util.Map;
// import org.springframework.web.multipart.MultipartFile;

// import org.apache.coyote.*;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.*;
// import org.springframework.web.bind.annotation.*;
// import org.springframework.core.io.ByteArrayResource;
// import org.springframework.core.io.Resource;


// import java.util.*;
// import java.math.*;

// @RestController
// @CrossOrigin(origins = "http://localhost:4200")
// //@RequestMapping("/api/users")
// public class UserController {

// 	@Autowired
// 	private UserService userService;

// 	@Autowired
// 	private ImageService imageService;

// 	@Autowired
// 	private DinerUserProfileService dinerUserProfileService;

// 	private static final Logger log = LoggerFactory.getLogger(UserController.class);

// 	@RequestMapping(value = "/getAllUsers", method = RequestMethod.GET)
// 	public ResponseEntity<JsonWrapperObject> getAllUsers() {
// 		log.info("user controller get all users");
// 		JsonWrapperObject response = new JsonWrapperObject();
// 		try {
// 			List<DinerUserProfile> users = userService.getAllUsers();
// 			log.info("successfully retrieve users = {}", users);
// 			response.setStatus(CommonConstant.SUCCESS);
// 			response.setData(users);
// 			return ResponseEntity.ok(response);
// 		} catch (Exception e) {
// 			log.info("error in retrieving all users: {}", e.getMessage());
// 			response.setStatus(CommonConstant.FAILURE);
// 			response.setDescription(e.getMessage());
// 			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
// 		}
// 	}

// 	// user details
	

	

// 	// @GetMapping("/{username}/getProfilePic")
//     // public ResponseEntity<ByteArrayResource> getProfilePic(@PathVariable String username) {
// 	// 	log.info("user controller get profile pic: " + username);
//     //     // Fetch the user's profile picture by username and usageType 'profile' from your service
//     //     final String usageType = "profile";
// 	// 	final String userType = "diner";
// 	// 	List<Image> images = imageService.getImage(username,usageType, userType);

//     //     if (images != null && !images.isEmpty()) {
// 	// 		Image image = images.get(0);
// 	// 		log.info("returning profile pic in service = "+ image);

//     //         ByteArrayResource resource = new ByteArrayResource(image.getImageByte());
            
// 	// 		String contentType = "image/jpeg"; // Default to JPEG
// 	// 		if (image.getImageType().equalsIgnoreCase("png")) {
// 	// 			contentType = "image/png";
// 	// 		} else if (image.getImageType().equalsIgnoreCase("gif")) {
// 	// 			contentType = "image/gif";
// 	// 		}else if (image.getImageType().equalsIgnoreCase("jpg")) {
//     //             contentType = "image/jpg";
//     //         }

// 	// 		byte[] byteArray = image.getImageByte();
// 	// 		String base64Data = Base64.getEncoder().encodeToString(byteArray);
//     //     	// log.info("Byte Array as Base64 in controller: " + base64Data);
			
// 	// 		return ResponseEntity.ok()
//     //             .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + image.getImageName() + "\"")
//     //             .contentType(MediaType.parseMediaType(contentType))
//     //             .contentLength(image.getImageByte().length)
//     //             .body(resource);
//     //     } else {
//     //         // Return a default image or an error response as needed
//     //         return ResponseEntity.notFound().build();
//     //     }

		
//     // }

// 	// @RequestMapping(value="/getFeed", method= RequestMethod.GET)
// 	// public ResponseEntity<JsonWrapperObject> getFeed(@RequestParam("username") String username, 
// 	// 		@RequestParam("usageType") String usageType) {
// 	// 	log.info("user controller get AllRestaurantImages");
// 	// 	JsonWrapperObject response = new JsonWrapperObject();
// 	// 	try {
// 	// 		final String userType = "diner";
// 	// 		List<Image> images = imageService.getImage(username, usageType,userType);
// 	// 		log.info("successfully retrieve AllRestaurantImages = {}", images);
// 	// 		response.setStatus(CommonConstant.SUCCESS);
// 	// 		response.setData(images);
// 	// 		return ResponseEntity.ok(response);
// 	// 	} catch (Exception e) {
// 	// 		log.info("error in retrieving AllRestaurantImages: {}", e.getMessage());
// 	// 		response.setStatus(CommonConstant.FAILURE);
// 	// 		response.setDescription(e.getMessage());
// 	// 		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
// 	// 	}
// 	// }

// 	// @Transactional
// 	// @PostMapping("/{username}/updateProfilePic")
//     // public ResponseEntity<JsonWrapperObject> updateProfilePic(@PathVariable String username, @RequestBody UserProfilePicRequest userProfilePicRequest){
// 	// // , @RequestParam("file") MultipartFile file) {
// 	// 	log.info("user controller update profile pic: " + username);
// 	// 	String restaurantId = userProfilePicRequest.getRestaurantId();
// 	// 	String imageName = userProfilePicRequest.getImageName();
// 	// 	String imageType = userProfilePicRequest.getImageType();
// 	// 	String userType = userProfilePicRequest.getUserType();
// 	// 	String usageType = userProfilePicRequest.getUsageType();
// 	// 	byte[] imageByte = userProfilePicRequest.getImageByte();

//     //     log.info("Updating user details for getRestaurantId: " + userProfilePicRequest.getRestaurantId());
// 	// 	log.info("Updating user details for getImageName: " + userProfilePicRequest.getImageName());
// 	// 	log.info("Updating user details for getImageType: " + userProfilePicRequest.getImageType());
// 	// 	log.info("Updating user details for getUserType: " + userProfilePicRequest.getUserType());
//     //     log.info("Updating user details for getUsageType: " + userProfilePicRequest.getUsageType());
// 	// 	log.info("Updating user details for getImageByte: " + userProfilePicRequest.getImageByte());

//     //     imageService.updateUserProfilePic(username, restaurantId, imageName, imageType, userType, usageType, imageByte);

// 	// 	JsonWrapperObject response = new JsonWrapperObject();
// 	// 	response.setStatus(CommonConstant.SUCCESS);
// 	// 	response.setDescription("User profile pic updated successfully"); // Provide a description

// 	// 	return ResponseEntity.ok(response);
// 	// }

// 	// @Transactional
// 	// @PostMapping("/{username}/insertFeed")
//     // public ResponseEntity<JsonWrapperObject> insertFeed(@PathVariable String username, @RequestBody UserProfilePicRequest userProfilePicRequest){
// 	// // , @RequestParam("file") MultipartFile file) {
// 	// 	log.info("user controller update profile pic: " + username);
// 	// 	String restaurantId = userProfilePicRequest.getRestaurantId();
// 	// 	String imageName = userProfilePicRequest.getImageName();
// 	// 	String imageType = userProfilePicRequest.getImageType();
// 	// 	String userType = userProfilePicRequest.getUserType();
// 	// 	String usageType = userProfilePicRequest.getUsageType();
// 	// 	byte[] imageByte = userProfilePicRequest.getImageByte();

//     //     log.info("Updating user details for getRestaurantId: " + userProfilePicRequest.getRestaurantId());
// 	// 	log.info("Updating user details for getImageName: " + userProfilePicRequest.getImageName());
// 	// 	log.info("Updating user details for getImageType: " + userProfilePicRequest.getImageType());
// 	// 	log.info("Updating user details for getUserType: " + userProfilePicRequest.getUserType());
//     //     log.info("Updating user details for getUsageType: " + userProfilePicRequest.getUsageType());
// 	// 	log.info("Updating user details for getImageByte: " + userProfilePicRequest.getImageByte());

//     //     imageService.insertFeed(username, restaurantId, imageName, imageType, userType, usageType, imageByte);

// 	// 	JsonWrapperObject response = new JsonWrapperObject();
// 	// 	response.setStatus(CommonConstant.SUCCESS);
// 	// 	response.setDescription("User profile pic updated successfully"); // Provide a description

// 	// 	return ResponseEntity.ok(response);
// 	// }
			
		
    

// 	// private boolean isImage(MultipartFile file) {
//     //     // Implement a logic to check if the uploaded file is an image
//     //     // You can check the file's content type or extension
//     //     // For example, you can check if it starts with "image/"
//     //     return file.getContentType() != null && file.getContentType().startsWith("image/");
//     // }
	
// }
