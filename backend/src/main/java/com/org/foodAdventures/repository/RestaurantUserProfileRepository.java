package com.org.foodAdventures.repository;

import com.org.foodAdventures.entity.RestaurantUserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.math.BigDecimal;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface RestaurantUserProfileRepository extends JpaRepository<RestaurantUserProfile, BigDecimal>{

    @Query(value = "select * from T_RESTAURANT_USER_PROFILE", nativeQuery = true)
    public List<RestaurantUserProfile> getAllRestaurantUserProfiles();

}
