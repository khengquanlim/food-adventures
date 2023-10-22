package com.org.foodAdventures.repository;

// import com.org.foodAdventures.entity.User;
import com.org.foodAdventures.entity.DinerUserProfile;
import com.org.foodAdventures.entity.Image;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.*;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.multipart.MultipartFile;


@Repository
public interface UserRepository extends JpaRepository<DinerUserProfile, String>{
    @Query(value = "select * from T_DINER_USER_PROFILE", nativeQuery = true)
    List<DinerUserProfile> getAllUsers();
// extends JpaRepository<User, Long> {
    // Define custom query methods if needed
    // @Query(nativeQuery = true, value="SELECT p FROM TB_PHOTO p WHERE p.user.id = :username")
    // public List<Photo> getPhotoFeed(
    //     @Param("username") String username
    // );

    @Query(nativeQuery = true, value="SELECT * FROM T_DINER_USER_PROFILE WHERE USERNAME = :username")
    public List<DinerUserProfile> getUserDetails(
        @Param("username") String username
    );

    @Modifying
    @Query(nativeQuery = true, value = "UPDATE T_DINER_USER_PROFILE SET age = :age, gender = :gender, biography = :bio, food_preferences_tag = :foodPreferencesTag WHERE username = :username")
    void updateUserDetails(
        @Param("username") String username,
        @Param("age") BigDecimal age,
        @Param("gender") String gender,
        @Param("bio") String bio,
        @Param("foodPreferencesTag") String foodPreferencesTag
    );
    

    // @Query(nativeQuery = true, value="SELECT * FROM T_IMAGE WHERE USER_ID = :username and usage_type='profile' ")
    // public List<Image> getProfilePic(
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

