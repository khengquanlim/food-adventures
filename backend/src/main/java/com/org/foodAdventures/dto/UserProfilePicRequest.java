package com.org.foodAdventures.dto;
import java.math.*;


public class UserProfilePicRequest {
    public String username;
    public String restaurantId;
    public String imageName;
    public String imageType;
    public String userType;
    public String usageType;
    public byte[] imageByte;
    
    // Add getters and setters

    public String getUsername(){
        return username;
    }

    public void setUsername(String username){
        this.username = username;
    }

    public String getRestaurantId(){
        return restaurantId;
    }

    public void setRestaurantId(String restaurantId){
        this.restaurantId = restaurantId;
    }


    public String getImageName(){
        return imageName;
    }

    public void setImageName(String imageName){
        this.imageName = imageName;
    }

    public String getImageType(){
        return imageType;
    }

    public void setImageType(String imageType){
        this.imageType = imageType;
    }



    public String getUserType(){
        return userType;
    }

    public void setUserType(String userType){
        this.userType = userType;
    }

    public String getUsageType(){
        return usageType;
    }

    public void setUsageType(String usageType){
        this.usageType = usageType;
    }

    public byte[] getImageByte(){
        return imageByte;
    }

    public void setImageByte(byte[] imageByte){
        this.imageByte = imageByte;
    }
}
