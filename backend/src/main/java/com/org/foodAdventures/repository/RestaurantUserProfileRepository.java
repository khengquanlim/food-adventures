package com.org.foodAdventures.repository;

import com.org.foodAdventures.entity.Message;
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

    @Query(value = "select * from T_RESTAURANT_USER_PROFILE where RESTAURANT_USER_PROFILE_ID =:restaurantUserProfileId order by CRT_TS desc", nativeQuery = true)
    RestaurantUserProfile getRestaurantProfileById(
        @Param("restaurantUserProfileId") Integer restaurantUserProfileId);

    @Query(value = "UPDATE T_RESTAURANT_USER_PROFILE SET DINER_USER_LIKE_LIST=:dinerUserLikeList where RESTAURANT_USER_PROFILE_ID =:restaurantUserProfileId", nativeQuery = true)
    RestaurantUserProfile updateDinerUserLikeListById(
        @Param("dinerUserLikeList") List<Integer> dinerUserLikeList,
    	@Param("restaurantUserProfileId") Integer restaurantUserProfileId);


    //esther
    @Query(nativeQuery = true, value="SELECT * FROM T_RESTAURANT_USER_PROFILE WHERE USER_ID =:userId")
    public List<RestaurantUserProfile> getUserDetails(
        @Param("userId") String userId
    );

    @Modifying
    @Query(nativeQuery = true, value = "UPDATE T_RESTAURANT_USER_PROFILE SET restaurant_name = :restaurantName, restaurant_owner_name = :restaurantOwnerName, food_options_tag = :foodOptionsTag, biography = :bio, location = :location, price_per_pax = :pricePerPax, rating = :rating, booking_url = :bookingUrl WHERE USER_ID =:userId")
    void updateUserDetails(
        @Param("restaurantName") String restaurantName,
        @Param("restaurantOwnerName") String restaurantOwnerName,
        @Param("foodOptionsTag") String foodOptionsTag,
        @Param("bio") String bio,
        @Param("location") String location,
        @Param("pricePerPax") String pricePerPax,
        @Param("rating") String rating,
        @Param("bookingUrl") String bookingUrl,
        @Param("userId") String userId
    );
}

