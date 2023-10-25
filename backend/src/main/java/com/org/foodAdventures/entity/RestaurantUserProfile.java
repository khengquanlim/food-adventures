package com.org.foodAdventures.entity;	

import java.util.List;
import jakarta.persistence.*;

import java.math.*;
import java.sql.*;

@Entity
@Table(name = "T_RESTAURANT_USER_PROFILE")
public class RestaurantUserProfile implements java.io.Serializable{
    @Id
    @Column(name="RESTAURANT_USER_PROFILE_ID", unique = true, nullable = false)
    private BigDecimal restaurantUserProfileId;

    @Column(name="USER_ID", nullable = false)
    private String userId;

    @Column(name="RESTAURANT_NAME", nullable = false)
    private String restaurantName;

    @Column(name="RESTAURANT_OWNER_NAME", nullable = false)
    private String restaurantOwnerName;

    @Column(name="FOOD_OPTIONS_TAG", nullable = false)
    private String foodOptionsTag;

    @Column(name="BIOGRAPHY", nullable = false)
    private String bio;

    @Column(name="RATING", nullable = false)
    private String rating;

    @Column(name="PRICE_PER_PAX", nullable = false)
    private String pricePerPax;

    @Column(name="LOCATION", nullable = false)
    private String location;

    @Column(name="BOOKING_URL", nullable = false)
    private String bookingUrl;
    
    @Column(name="DINER_USER_LIKE_LIST", nullable = false)
    private String dinerUserLikeList;

    @Column(name="CRT_TS", nullable = false)
    private Timestamp createdTs;

    @Column(name="UPD_TS", nullable = false)
    private Timestamp updatedTs;

    // Getters and setters

    public BigDecimal getRestaurantUserProfileId() {
        return restaurantUserProfileId;
    }

    public void setRestaurantUserProfileId(BigDecimal restaurantUserProfileId) {
        this.restaurantUserProfileId = restaurantUserProfileId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public String getRestaurantOwnerName() {
        return restaurantOwnerName;
    }

    public void setRestaurantOwnerName(String restaurantOwnerName) {
        this.restaurantOwnerName = restaurantOwnerName;
    }

    public String getFoodOptionsTag() {
        return foodOptionsTag;
    }

    public void setFoodOptionsTag(String foodOptionsTag) {
        this.foodOptionsTag = foodOptionsTag;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }
    
    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getPricePerPax() {
        return pricePerPax;
    }

    public void setPricePerPax(String pricePerPax) {
        this.pricePerPax = pricePerPax;
    }
    
    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getBookingUrl() {
        return bookingUrl;
    }

    public void setBookingUrl(String bookingUrl) {
        this.bookingUrl = bookingUrl;
    }

    public String getDinerUserLikeList() {
        return dinerUserLikeList;
    }

    public void setDinerUserLikeList(String  dinerUserLikeList) {
        this.dinerUserLikeList = dinerUserLikeList;
    }

    public Timestamp getCreatedTs() {
        return createdTs;
    }

    public void setCreatedTs(Timestamp createdTs) {
        this.createdTs = createdTs;
    }

    public Timestamp getUpdatedTs() {
        return updatedTs;
    }

    public void setUpdatedTs(Timestamp updatedTs) {
        this.updatedTs = updatedTs;
    }

    public RestaurantUserProfile(BigDecimal restaurantUserProfileId, String userId, String restaurantName, String restaurantOwnerName, String foodOptionsTag, String bio, String bookingUrl, Timestamp createdTs, Timestamp updatedTs) {
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
            ", bio='" + bio + '\'' +
            ", bookingUrl='" + bookingUrl + '\'' +
            ", createdTs=" + createdTs +
            ", updatedTs=" + updatedTs +
            '}';
    }
}