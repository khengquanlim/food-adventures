package com.org.foodAdventures.entity;	

import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;

import java.math.*;
import java.sql.*;

@Entity
@Table(name = "T_RESTAURANT_USER_PROFILE")
public class RestaurantUserProfile implements java.io.Serializable{
	
    private Long restaurantUserProfileId;

    private String userId;

    private String restaurantName;

    private String restaurantOwnerName;

    private String foodOptionsTag;

    private String bio;

    private String rating;

    private String pricePerPax;

    private String location;

    private String bookingUrl;
    
    private String dinerUserLikeList;

    private Timestamp createdTs;

    private Timestamp updatedTs;

    // Getters and setters

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="RESTAURANT_USER_PROFILE_ID", unique = true, nullable = false)
    public Long getRestaurantUserProfileId() {
        return restaurantUserProfileId;
    }

    public void setRestaurantUserProfileId(Long restaurantUserProfileId) {
        this.restaurantUserProfileId = restaurantUserProfileId;
    }

    @Column(name="USER_ID")
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Column(name="RESTAURANT_NAME", nullable = false)
    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    @Column(name="RESTAURANT_OWNER_NAME", nullable = false)
    public String getRestaurantOwnerName() {
        return restaurantOwnerName;
    }

    public void setRestaurantOwnerName(String restaurantOwnerName) {
        this.restaurantOwnerName = restaurantOwnerName;
    }

    @Column(name="FOOD_OPTIONS_TAG")
    public String getFoodOptionsTag() {
        return foodOptionsTag;
    }

    public void setFoodOptionsTag(String foodOptionsTag) {
        this.foodOptionsTag = foodOptionsTag;
    }

    @Column(name="BIOGRAPHY")
    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    @Column(name="RATING")
    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    @Column(name="PRICE_PER_PAX")
    public String getPricePerPax() {
        return pricePerPax;
    }

    public void setPricePerPax(String pricePerPax) {
        this.pricePerPax = pricePerPax;
    }

    @Column(name="LOCATION")
    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    @Column(name="BOOKING_URL")
    public String getBookingUrl() {
        return bookingUrl;
    }

    public void setBookingUrl(String bookingUrl) {
        this.bookingUrl = bookingUrl;
    }

    @Column(name="DINER_USER_LIKE_LIST")
    public String getDinerUserLikeList() {
        return dinerUserLikeList;
    }

    public void setDinerUserLikeList(String  dinerUserLikeList) {
        this.dinerUserLikeList = dinerUserLikeList;
    }

    @CreationTimestamp
    @Column(name="CRT_TS", nullable = false)
    public Timestamp getCreatedTs() {
        return createdTs;
    }

    public void setCreatedTs(Timestamp createdTs) {
        this.createdTs = createdTs;
    }

    @UpdateTimestamp
    @Column(name = "UPD_TS", nullable = false)
    public Timestamp getUpdatedTs() {
        return updatedTs;
    }

    public void setUpdatedTs(Timestamp updatedTs) {
        this.updatedTs = updatedTs;
    }

    public RestaurantUserProfile(Long restaurantUserProfileId, String userId, String restaurantName, String restaurantOwnerName, String foodOptionsTag, String bio, String bookingUrl, Timestamp createdTs, Timestamp updatedTs) {
        super();
        this.restaurantUserProfileId = restaurantUserProfileId;
        this.userId = userId;
        this.restaurantName = restaurantName;
        this.restaurantOwnerName = restaurantOwnerName;
        this.foodOptionsTag = foodOptionsTag;
        this.bio = bio;
        this.bookingUrl = bookingUrl;
        this.createdTs = createdTs;
        this.updatedTs = updatedTs;
    }

    public RestaurantUserProfile() {
        super();
    }

    @Override
    public String toString() {
        return "RestaurantUserProfile{" +
            "restaurantUserProfileId=" + restaurantUserProfileId +
            ", userId='" + userId + '\'' +
            ", restaurantName='" + restaurantName + '\'' +
            ", restaurantOwnerName='" + restaurantOwnerName + '\'' +
            ", foodOptionsTag='" + foodOptionsTag + '\'' +
            ", biography='" + bio + '\'' +
            ", bookingUrl='" + bookingUrl + '\'' +
            ", createdTs=" + createdTs +
            ", updatedTs=" + updatedTs +
            '}';
    }
}