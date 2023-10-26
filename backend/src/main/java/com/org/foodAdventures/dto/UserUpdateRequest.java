package com.org.foodAdventures.dto;
import java.math.*;


public class UserUpdateRequest {
    private String dinerUserName;
    private String username;
    private Integer age;
    private String gender;
    private String bio;
    private String foodPreferencesTag;
    private String userId;
    
    // Add getters and setters
    public String getDinerUserName(){
        return dinerUserName;
    }

    public void setDinerUserName(String dinerUserName){
        this.dinerUserName = dinerUserName;
    }

    public String getUserId(){
        return userId;
    }

    public void setUserId(String userId){
        this.userId = userId;
    }

    public String getUsername(){
        return username;
    }

    public void setUsername(String username){
        this.username = username;
    }
    
    public Integer getAge(){
        return age;
    }

    public void setAge(Integer age){
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
    
    public String getFoodPrefTag(){
        return foodPreferencesTag;
    }

    public void setFoodPrefTag(String foodPreferencesTag){
        this.foodPreferencesTag = foodPreferencesTag;
    }
}