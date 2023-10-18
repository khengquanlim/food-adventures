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

    @Query(value = "select * from T_DINER_USER_PROFILE", nativeQuery = true)
    List<DinerUserProfile> getAllDinerUsersDetails();

    @Query(value = "select * from T_DINER_USER_PROFILE WHERE USER_ID =:userId", nativeQuery = true)
    DinerUserProfile getCurrentDinerUsersDetails(
            @Param("userId") String userId);

}
