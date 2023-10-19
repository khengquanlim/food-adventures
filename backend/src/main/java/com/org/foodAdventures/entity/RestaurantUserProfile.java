package com.org.foodAdventures.entity;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.boot.test.autoconfigure.data.couchbase.*;
import org.springframework.data.relational.core.mapping.Table;
import jakarta.persistence.*;

import java.math.*;
import java.sql.*;

@Entity
@Table("T_RESTAURANT_USER_PROFILE")
@DynamicInsert
@DynamicUpdate
public class RestaurantUserProfile implements java.io.Serializable{
    @Id
    @Column(name="RESTAURANT_USER_PROFILE_ID", unique = true, nullable = false)
    private BigDecimal restaurantUserProfileId;

    @Column(name="RESTAURANT_NAME", nullable = false)
    private String restaurantName;

    @Column(name="RESTAURANT_OWNER_NAME", nullable = false)
    private String restaurantOwnerName;

    @Column(name="FOOD_OPTIONS_TAG", nullable = false)
    private String foodOptionsTag;

    @Column(name="BIOGRAPHY", nullable = false)
    private String bio;

    @Column(name="BOOKING_URL", nullable = false)
    private String bookingUrl;

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

    public String getBookingUrl() {
        return bookingUrl;
    }

    public void setBookingUrl(String bookingUrl) {
        this.bookingUrl = bookingUrl;
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

    public RestaurantUserProfile(BigDecimal restaurantUserProfileId, String restaurantName, String restaurantOwnerName, String foodOptionsTag, String bio, String bookingUrl, Timestamp createdTs, Timestamp updatedTs) {
        super();
        this.restaurantUserProfileId = restaurantUserProfileId;
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
