package com.org.foodAdventures.dto;
import java.math.*;


public class UserUpdateRequest {
    private String userName;
    private BigDecimal age;
    private String gender;
    private String bio;
    private String foodPreferencesTag;
    private String userId;
    
    // Add getters and setters

    public String getUserId(){
        return userId;
    }

    public void setUserId(String userId){
        this.userId = userId;
    }

    public String getUserName(){
        return userName;
    }

    public void setUserName(String userName){
        this.userName = userName;
    }
    
    public BigDecimal getAge(){
        return age;
    }

    public void setAge(BigDecimal age){
        this.age = age;
    }
    
    public String getGender(){
        return gender;
    }

    public void setGender(String gender){
        this.gender = gender;
    }

    public String getBio(){
        return bio;
    }

    public void setBio(String bio){
        this.bio = bio;
    }
    
    public String getFoodPreferencesTag(){
        return foodPreferencesTag;
    }

    public void setFoodPreferencesTag(String foodPreferencesTag){
        this.foodPreferencesTag = foodPreferencesTag;
    }
}