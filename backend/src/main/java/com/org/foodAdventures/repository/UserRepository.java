package com.org.foodAdventures.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.multipart.MultipartFile;


@Repository
public interface UserRepository {
// extends JpaRepository<User, Long> {
    // Define custom query methods if needed
    // @Query(nativeQuery = true, value="SELECT p FROM TB_PHOTO p WHERE p.user.id = :username")
    // public List<Photo> getPhotoFeed(
    //     @Param("username") String username
    // );

    // @Query(nativeQuery = true, value="SELECT age, gender, profilePic, bio FROM TB_USER p WHERE p.user.id = :userId")
    // public List<User> getUserDetails(
    //     @Param("username") String username
    // );

    // @Modifying
    // @Query(nativeQuery = true, value = "UPDATE TB_USER SET age = :age, gender = :gender, profilePic = :profilePic, bio = :bio WHERE id = :userId")
    // void updateUserDetails(
    //     @Param("age") Integer age,
    //     @Param("gender") String gender,
    //     @Param("profilePic") String profilePic,
    //     @Param("bio") String bio,
    //     @Param("username") String username
    // );

    // @Modifying
    // @Query(value = "INSERT INTO TB_PHOTO (username, photoUrl) VALUES (:username, :photoUrl)", nativeQuery = true)
    // void insertPhoto(
    //     @Param("username") String username, // Assuming userId is a Long
    //     @Param("photoUrl") MultipartFile photoUrl // Assuming photoUrl is a String
        
    // );

    // Optional<ImageModel> findByName(String name);
}

