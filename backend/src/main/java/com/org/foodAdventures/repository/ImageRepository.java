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

}
