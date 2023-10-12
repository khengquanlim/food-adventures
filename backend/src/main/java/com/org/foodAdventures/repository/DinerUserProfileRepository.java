package com.org.foodAdventures.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import com.org.foodAdventures.entity.DinerUserProfile;

@Repository
public interface DinerUserProfileRepository extends JpaRepository<DinerUserProfile,Integer>{

//    @Query(value = "select * from t_diner_user_profile u where username = :username", nativeQuery = true)
//    public List<DinerUserProfile> getProfileDetailsByUsername(
//        @Param("username") String username
//    );
//
//    @Modifying
//    @Query(nativeQuery = true, value = "INSERT INTO t_diner_user_profile (username, age, gender, bio, foodPreferencesTag) values (:username, :age, :gender, :bio, :foodPreferencesTag) ")
//    void insertUserProfile(
//        @Param("username") String username,
//        @Param("age") Integer age,
//        @Param("gender") String gender,
//        @Param("bio") String bio,
//        @Param("foodPreferencesTag") String foodPreferencesTag
//
//
//    );

}
