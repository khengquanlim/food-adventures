package com.org.foodAdventures.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.math.BigDecimal;


import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.org.foodAdventures.entity.Image;


@Repository
public interface ImageRepository extends JpaRepository<Image,Integer>{

//    @Query(value = "select * from t_image u where u.username=:username and u.userType = :usertype and u.usageType = :usageType", nativeQuery = true)
//    public List<Image> getImage(
//        @Param("username") String username,
//        @Param("userType") String userType,
//        @Param("usageType") String usageType
//    );
//
//    @Modifying
//    @Query(nativeQuery = true, value = "INSERT INTO t_image (imageName, imageType, imageByte, username, userType, usageType) values (:imageName, :imageType, :imageByte, :username, :userType, :usageType) ")
//    void insertImage(
//        @Param("imageName") String imageName,
//        @Param("imageType") String imageType,
//        @Param("imageByte") byte[] imageByte,
//        @Param("username") String username,
//        @Param("userType") String userType,
//        @Param("usageType") String usageType
//
//    );

    //esther
    @Query(nativeQuery = true, value="SELECT * FROM T_IMAGE WHERE USER_ID = :username and usage_type=:usageType and user_type=:userType")
    public List<Image> getImage(
        @Param("username") String username,
        @Param("usageType") String usageType,
        @Param("userType") String userType
    );

    
    @Modifying
    @Query(nativeQuery = true, value = "UPDATE T_IMAGE SET restaurant_user_profile_id = :restaurantId, image_name = :imageName, image_Type = :imageType, image = :imageBytes WHERE user_id = :username and user_Type = :userType and usage_Type = :usageType")
    void updateProfilePic(
        @Param("username") String username,
        @Param("restaurantId") String restaurantId,
        @Param("imageName") String imageName,
        @Param("imageType") String imageType,
        @Param("userType") String userType,
        @Param("usageType") String usageType,
        @Param("imageBytes") byte[] imageBytes
    );

    @Modifying
    @Query(nativeQuery = true, value = "INSERT INTO T_IMAGE (user_id,restaurant_user_profile_id, image_name, image_Type, user_Type, usage_Type, image) VALUES (:username, :restaurantId, :imageName, :imageType, :userType, :usageType, :imageBytes)")
    void insertFeed(
        @Param("username") String username,
        @Param("restaurantId") String restaurantId,
        @Param("imageName") String imageName,
        @Param("imageType") String imageType,
        @Param("userType") String userType,
        @Param("usageType") String usageType,
        @Param("imageBytes") byte[] imageBytes
    );
    
    @Modifying
    @Query(nativeQuery = true, value = "DELETE FROM T_IMAGE WHERE user_id = :username AND user_Type = :userType AND usage_Type = :usageType AND image_id = :imageId")
    void deleteImage(
        @Param("username") String username,
        @Param("userType") String userType,
        @Param("usageType") String usageType,
        @Param("imageId") Integer imageId
    );

}
