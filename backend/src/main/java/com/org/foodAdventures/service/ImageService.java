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

    public List<Image> getAllImagesByUsernameAndImageType(String username, String userType) {
        return imageRepository.getAllImagesByUsernameAndImageType(username, userType);
    }

    public List<Image> getAllImagesByUsernameAndImageTypeAndUsageType(String username, String userType, String usageType) {
        return imageRepository.getAllImagesByUsernameAndImageTypeAndUsageType(username, userType, usageType);
    }
}