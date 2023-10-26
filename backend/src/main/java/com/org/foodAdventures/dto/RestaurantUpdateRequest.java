package com.org.foodAdventures.dto;
import java.math.*;


public class RestaurantUpdateRequest {
    private String restaurantName;
    private String restaurantOwnerName;
    private String foodOptionsTag;
    private String bio;
    private String location;
    private String pricePerPax;
    private String rating;
    private String bookingUrl;
    
    // Add getters and setters
    // Getter and Setter for restaurantName
    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    // Getter and Setter for ownerName
    public String getRestaurantOwnerName() {
        return restaurantOwnerName;
    }

    public void setRestaurantOwnerName(String restaurantOwnerName) {
        this.restaurantOwnerName = restaurantOwnerName;
    }

    // Getter and Setter for foodOptionsTag
    public String getFoodOptionsTag() {
        return foodOptionsTag;
    }

    public void setFoodOptionsTag(String foodOptionsTag) {
        this.foodOptionsTag = foodOptionsTag;
    }

    // Getter and Setter for bio
    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    // Getter and Setter for location
    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    // Getter and Setter for price
    public String getPricePerPax() {
        return pricePerPax;
    }

    public void setPricePerPax(String pricePerPax) {
        this.pricePerPax = pricePerPax;
    }

    // Getter and Setter for rating
    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    // Getter and Setter for bookingUrl
    public String getBookingUrl() {
        return bookingUrl;
    }

    public void setBookingUrl(String bookingUrl) {
        this.bookingUrl = bookingUrl;
    }
    
}