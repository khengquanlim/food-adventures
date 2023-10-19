package com.org.foodAdventures.repository;

import com.org.foodAdventures.entity.User;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.*;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<User, String> {
    @Query(value = "select * from T_USER", nativeQuery = true)
    List<User> getAllUsers();

    @Query(value="insert into T_USER (USER_ID, PWD_HASH, USER_TYPE, LAST_ONLINE, EMAIL, AGE, CRT_TS, UPD_TS)" +
        " VALUES (:userId, :pwdHash, :userType, :lastOnline, :email, :age, :crtTs, :updTs);", nativeQuery = true)
    void saveUser(@Param("userId") String userId,
                  @Param("pwdHash") String pwdHash,
                  @Param("userType") String userType,
                  @Param("lastOnline") Timestamp lastOnline,
                  @Param("email") String email,
                  @Param("age") int age,
                  @Param("crtTs") Timestamp crtTs,
                  @Param("updTs") Timestamp updTs);

    @Query(value="select * from T_USER where USER_ID = :username", nativeQuery = true)
    User getByName(@Param("username") String username);

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

