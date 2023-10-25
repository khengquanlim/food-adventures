package com.org.foodAdventures.service;

import com.org.foodAdventures.entity.Image;
import com.org.foodAdventures.repository.ImageRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import java.util.List;

 import org.slf4j.Logger;
 import org.slf4j.LoggerFactory;

@Service
public class ImageService {
    @Autowired
    private ImageRepository imageRepository;
    private final Logger log = LoggerFactory.getLogger(UserService.class);

    //esther
    public List<Image> getImage(String username, String usageType, String userType) {
        return imageRepository.getImage(username, usageType, userType);
    }

    public void insertFeed(String username, String restaurantId, String imageName, String imageType, String userType, String usageType, byte[] imageBytes) {
        imageRepository.insertFeed(username, restaurantId, imageName, imageType, userType, usageType, imageBytes);
            
    }

    public void updateUserProfilePic(String username, String restaurantId, String imageName, String imageType, String userType, String usageType, byte[] imageBytes) {
        imageRepository.updateProfilePic(username, restaurantId, imageName, imageType, userType, usageType, imageBytes);
    }

    public void deleteImage(String username, String userType, String usageType, Integer imageId) {
        log.info("imageservice.java delete image");
        imageRepository.deleteImage(username, userType, usageType, imageId);
    }
    
    public List<Image> getAllImagesByUsernameAndImageType(String username, String userType) {
        return imageRepository.getAllImagesByUsernameAndImageType(username, userType);
    }

    public List<Image> getAllImagesByUsernameAndImageTypeAndUsageType(String username, String userType, String usageType) {
        return imageRepository.getAllImagesByUsernameAndImageTypeAndUsageType(username, userType, usageType);
    }
}