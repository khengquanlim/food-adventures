package com.org.foodAdventures.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.math.*;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import com.org.foodAdventures.entity.DinerUserProfile;

@Repository
public interface DinerUserProfileRepository extends JpaRepository<DinerUserProfile,Integer>{

    @Query(value = "select * from T_DINER_USER_PROFILE", nativeQuery = true)
    List<DinerUserProfile> getAllDinerUsersDetails();

    @Query(value = "select * from T_DINER_USER_PROFILE WHERE USER_ID =:userId", nativeQuery = true)
    DinerUserProfile getCurrentDinerUsersDetails(
            @Param("userId") String userId);

    @Query(value = "select * from T_DINER_USER_PROFILE WHERE DINER_USER_PROFILE_ID =:dinerUserProfileId", nativeQuery = true)
    DinerUserProfile getCurrentDinerUsersDetailsById(
            @Param("dinerUserProfileId") Integer dinerUserProfileId);


    //esther
    @Query(nativeQuery = true, value="SELECT * FROM T_DINER_USER_PROFILE WHERE USER_ID =:userId")
    public List<DinerUserProfile> getUserDetails(
        @Param("userId") String userId
    );

    @Modifying
    @Query(nativeQuery = true, value = "UPDATE T_DINER_USER_PROFILE SET username = :dinerUserName, age = :age, gender = :gender, biography = :bio, food_preferences_tag = :foodPreferencesTag WHERE DINER_USER_PROFILE_ID =:userId and USER_ID =:username")
    void updateUserDetails(
        @Param("dinerUserName") String dinerUserName,
        @Param("username") String username,
        @Param("age") Integer age,
        @Param("gender") String gender,
        @Param("bio") String bio,
        @Param("foodPreferencesTag") String foodPreferencesTag,
        @Param("userId") String userId
    );
    

}

