package com.org.foodAdventures.controller;

import com.org.foodAdventures.service.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    //user details
    // @PostMapping("/{userId}/updateDetails")
    // public void updateUserDetails(
    //         @PathVariable String username,
    //         @RequestParam Integer age,
    //         @RequestParam String gender,
    //         @RequestParam String profilePic,
    //         @RequestParam String bio) {
        // userService.updateUserDetails(username, age, gender, profilePic, bio);
    // }

    // @GetMapping("/{username}/getUserDetails")
    // public List<User> getUserDetails(@PathVariable String username) {
        // log.info("user controller get user details");
        // return userService.getUserDetails(username);
    // }

    // Endpoint to insert a new photo
    // @PostMapping("/{userId}/insertPhoto")
    // public void insertPhoto(
    //         @PathVariable String username,
    //         @RequestParam String photoUrl) {
    //     userService.insertPhoto(userId, photoUrl);
    // }

    // Endpoint to get a user's photo feed
    // @GetMapping("/{username}/getPhotoFeed")
    // public List<Photo> getPhotoFeed(@PathVariable String username) {
        // log.info("user controller get photo feed");
        // return userService.getPhotoFeed(username);
    // }


    // @GetMapping(path = { "/get/{imageName}" })
	// public ImageModel getImage(@PathVariable("imageName") String imageName) throws IOException {

	// 	final Optional<ImageModel> retrievedImage = imageRepository.findByName(imageName);
	// 	ImageModel img = new ImageModel(retrievedImage.get().getName(), retrievedImage.get().getType(),
	// 			decompressBytes(retrievedImage.get().getPicByte()));
	// 	return img;
	// }


    // @PostMapping("/{userId}/insertPhoto")
    // public void insertPhoto(
    //     @PathVariable String username,
    //     @RequestParam("photo") MultipartFile photo) {
    //     try {
            // Implement logic to store the photo, including validation
            // Return a success message or the new photo's URL
            // userService.insertPhoto(username, photo);
            // return ResponseEntity.ok("Photo uploaded successfully. URL: " + photoUrl);
        // } catch (Exception e) {
            // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload photo: " + e.getMessage());
    //     }
    // }


    // @PostMapping("/upload")
	// public BodyBuilder uplaodImage(@RequestParam("imageFile") MultipartFile file) throws IOException {

	// 	System.out.println("Original Image Byte Size - " + file.getBytes().length);
	// 	ImageModel img = new ImageModel(file.getOriginalFilename(), file.getContentType(),
	// 			compressBytes(file.getBytes()));
	// 	imageRepository.save(img);
	// 	return ResponseEntity.status(HttpStatus.OK);
	// }



}

