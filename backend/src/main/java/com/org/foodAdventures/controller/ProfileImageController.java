package com.org.foodAdventures.controller;

import org.springframework.transaction.annotation.Transactional;
import com.org.foodAdventures.common.*;
import com.org.foodAdventures.entity.*;
import com.org.foodAdventures.repository.ImageRepository;
import com.org.foodAdventures.repository.MessageRepository;
import com.org.foodAdventures.service.*;
import java.util.Map;
import org.springframework.web.multipart.MultipartFile;
import com.org.foodAdventures.dto.UserProfilePicRequest;


import org.apache.coyote.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;


import java.util.*;
import java.math.*;
// import java.util.Base64;
import java.nio.charset.StandardCharsets;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
//@RequestMapping("/api/users")
public class ProfileImageController {


	@Autowired
	private ImageService imageService;
	
    @Autowired
    private ImageRepository imageRepository;

	private static final Logger log = LoggerFactory.getLogger(ProfileImageController.class);

	@RequestMapping(value="/getProfilePic", method= RequestMethod.GET)
	public ResponseEntity<ByteArrayResource> getProfilePic(@RequestParam("username") String username, 
			@RequestParam("usageType") String usageType, @RequestParam("userType") String userType) {
		log.info("user controller get profile pic: " + username);
        // Fetch the user's profile picture by username and usageType 'profile' from your service
        List<Image> images = imageService.getImage(username,usageType, userType);

        if (images != null && !images.isEmpty()) {
			Image image = images.get(0);
			log.info("returning profile pic in service = "+ image);

            ByteArrayResource resource = new ByteArrayResource(image.getImageByte());
            
			String contentType = "image/jpeg"; // Default to JPEG
			if (image.getImageType().equalsIgnoreCase("png")) {
				contentType = "image/png";
			} else if (image.getImageType().equalsIgnoreCase("gif")) {
				contentType = "image/gif";
			}else if (image.getImageType().equalsIgnoreCase("jpg")) {
                contentType = "image/jpg";
            }

			byte[] byteArray = image.getImageByte();
			String base64Data = Base64.getEncoder().encodeToString(byteArray);
        	// log.info("Byte Array as Base64 in controller: " + base64Data);
			
			return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + image.getImageName() + "\"")
                .contentType(MediaType.parseMediaType(contentType))
                .contentLength(image.getImageByte().length)
                .body(resource);
        } else {
            // Return a default image or an error response as needed
            return ResponseEntity.notFound().build();
        }

		
    }

	@RequestMapping(value="/getFeed", method= RequestMethod.GET)
	public ResponseEntity<JsonWrapperObject> getFeed(@RequestParam("username") String username, 
			@RequestParam("usageType") String usageType, @RequestParam("userType") String userType) {
		log.info("user controller get AllRestaurantImages");
		JsonWrapperObject response = new JsonWrapperObject();
		try {
			List<Image> images = imageService.getImage(username, usageType,userType);
			log.info("successfully retrieve AllRestaurantImages = {}", images);
			response.setStatus(CommonConstant.SUCCESS);
			response.setData(images);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			log.info("error in retrieving AllRestaurantImages: {}", e.getMessage());
			response.setStatus(CommonConstant.FAILURE);
			response.setDescription(e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}

	@Transactional
	@RequestMapping(value = "/{username}/updateProfilePic", method = RequestMethod.POST)
	public ResponseEntity<JsonWrapperObject> updateProfilePic(@PathVariable String username, @RequestBody UserProfilePicRequest userProfilePicRequest){
	// , @RequestParam("file") MultipartFile file) {
		log.info("user controller update profile pic: " + username);
		String restaurantId = userProfilePicRequest.getRestaurantId();
		String imageName = userProfilePicRequest.getImageName();
		String imageType = userProfilePicRequest.getImageType();
		String userType = userProfilePicRequest.getUserType();
		String usageType = userProfilePicRequest.getUsageType();
		byte[] imageByte = userProfilePicRequest.getImageByte();

        log.info("Updating user details for getRestaurantId: " + userProfilePicRequest.getRestaurantId());
		log.info("Updating user details for getImageName: " + userProfilePicRequest.getImageName());
		log.info("Updating user details for getImageType: " + userProfilePicRequest.getImageType());
		log.info("Updating user details for getUserType: " + userProfilePicRequest.getUserType());
        log.info("Updating user details for getUsageType: " + userProfilePicRequest.getUsageType());
		log.info("Updating user details for getImageByte: " + userProfilePicRequest.getImageByte());
		log.info("Updating user details for username: " + username);
		log.info("Updating user details for imageType: " + imageType);
		
		List<Image> existingImageList = imageService.getAllImagesByUsernameAndImageType(username, userType);
		log.info("existingImageList: " + existingImageList.size());
		log.info("existingImageList: " + usageType);
		if(existingImageList.size() == 0 && usageType.equals("profile")) {
			log.info("Handle new profile images for REST & DINNER: ");
			Image newImage = new Image();
			newImage.setUsername(username);
			newImage.setImageByte(imageByte);
			newImage.setImageName(imageName);		
			newImage.setImageType(imageType);
			newImage.setUserType(userType);
			newImage.setUsageType(usageType);
			if(userType.equals("restaurant")) {
				newImage.setRestaurantId(restaurantId);
			} else {
				newImage.setDinerId(restaurantId);
			}
			imageRepository.save(newImage);
		} else {
			log.info("Coming here???: ");
	        imageService.updateUserProfilePic(username, restaurantId, imageName, imageType, userType, usageType, imageByte);
		}


		JsonWrapperObject response = new JsonWrapperObject();
		response.setStatus(CommonConstant.SUCCESS);
		response.setDescription("User profile pic updated successfully"); // Provide a description

		return ResponseEntity.ok(response);
	}

	@Transactional
	@RequestMapping(value = "/{username}/insertFeed", method = RequestMethod.POST)
	public ResponseEntity<JsonWrapperObject> insertFeed(@PathVariable String username, @RequestBody UserProfilePicRequest userProfilePicRequest){
	// , @RequestParam("file") MultipartFile file) {
		log.info("user controller update profile pic: " + username);
		String restaurantId = userProfilePicRequest.getRestaurantId();
		String imageName = userProfilePicRequest.getImageName();
		String imageType = userProfilePicRequest.getImageType();
		String userType = userProfilePicRequest.getUserType();
		String usageType = userProfilePicRequest.getUsageType();
		byte[] imageByte = userProfilePicRequest.getImageByte();

        log.info("Updating user details for getRestaurantId: " + userProfilePicRequest.getRestaurantId());
		log.info("Updating user details for getImageName: " + userProfilePicRequest.getImageName());
		log.info("Updating user details for getImageType: " + userProfilePicRequest.getImageType());
		log.info("Updating user details for getUserType: " + userProfilePicRequest.getUserType());
        log.info("Updating user details for getUsageType: " + userProfilePicRequest.getUsageType());
		log.info("Updating user details for getImageByte: " + userProfilePicRequest.getImageByte());

        imageService.insertFeed(username, restaurantId, imageName, imageType, userType, usageType, imageByte);

		JsonWrapperObject response = new JsonWrapperObject();
		response.setStatus(CommonConstant.SUCCESS);
		response.setDescription("User profile pic updated successfully"); // Provide a description

		return ResponseEntity.ok(response);
	}
			
	@Transactional@RequestMapping(value="/{username}/deleteImage", method = RequestMethod.POST)
	public ResponseEntity<JsonWrapperObject> deleteImage(@PathVariable String username, @RequestParam("userType") String userType,
	@RequestParam("usageType") String usageType, @RequestBody Map<String, String> requestBody){
		
		//convert selected image from data url to byte
		String imageData = requestBody.get("imageData");
		String base64ImageData = imageData.substring("data:image/jpeg;base64,".length());
		byte[] imageToDelete = Base64.getDecoder().decode(base64ImageData);
		
		//from list of images, compare byte array and get imagename
		List<Image> images = imageService.getImage(username, usageType, userType);
		Integer deletedImageId = null;

		for (Image singleImage : images) {
			byte[] imageBytes = singleImage.getImageByte();
			log.info("loop imageBytes = " + imageBytes);
			if (Arrays.equals(imageToDelete, imageBytes)) {
				log.info("same image");
				// If the image bytes match, save the image name
				deletedImageId = singleImage.getImageId();
				log.info("deleteId = " + deletedImageId);
				break; // Exit the loop
			}
		}

		//delete image
		if (deletedImageId != null) {
        // Image found and deleted
			log.info("matching image is found");
			imageService.deleteImage(username, userType, usageType, deletedImageId);
			JsonWrapperObject response = new JsonWrapperObject();
			response.setStatus(CommonConstant.SUCCESS);
			response.setDescription("Image '" + deletedImageId + "' deleted successfully");
			return ResponseEntity.ok(response);
		} else {
			// Image not found
			JsonWrapperObject response = new JsonWrapperObject();
			response.setStatus(CommonConstant.FAILURE);
			response.setDescription("Image not found");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}

	}
		
    

	private boolean isImage(MultipartFile file) {
        return file.getContentType() != null && file.getContentType().startsWith("image/");
    }
	
}
