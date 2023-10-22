package com.org.foodAdventures.entity;

import java.util.Date;
import java.sql.Timestamp;
import jakarta.persistence.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.data.relational.core.mapping.Table;

import java.math.*;

@Entity
@Table("T_DINER_USER_PROFILE")
@DynamicInsert
@DynamicUpdate
public class DinerUserProfile implements java.io.Serializable{


    @Id
    @Column(name="DINER_USER_PROFILE_ID", unique = true, nullable = false)
    private Integer userId;

    @Column(name="USERNAME", length = 50, unique = true, nullable = false)
    private String username;

    @Column(name = "AGE", nullable = true)
    private BigDecimal age;

    @Column(name = "GENDER", length = 6, nullable = false)
    private String gender;

    @Column(name = "BIOGRAPHY", length = 150, nullable = false)
    private String bio;

    @Column(name = "FOOD_PREFERENCES_TAG", length = 10, nullable = false)
    private String foodPreferencesTag;

    @Column(name = "CRT_TS", nullable = false)
    private Timestamp createdDttm;

    @Column(name = "UPD_TS", nullable = false)
    private Timestamp updatedDttm;
    
    public Integer getUserId(){
        return userId;
    }

    public void setUserId(Integer userId){
        this.userId = userId;
    }
    
    public String getUsername(){
        return username;
    }

    public void setUsername(String username){
        this.username = username;
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

    
    public Timestamp getCreatedDttm(){
        return createdDttm;
    }

    public void setCreatedDttm(Timestamp createdDttm){
        this.createdDttm = createdDttm;
    }

    
    public Timestamp getUpdatedDttm(){
        return updatedDttm;
    }

    public void setUpdatedDttm(Timestamp updatedDttm){
        this.updatedDttm = updatedDttm;
    }

    public String toString(){
        return "User Profile Details: username = " + username+ ",age = "+ age+ ",gender ="+ gender + ", bio = " +  bio +", createdDttm ="+createdDttm + ", updatedDtttm ="+updatedDttm + ", foodPreferencesTag =" + foodPreferencesTag;
    }

    public DinerUserProfile(Integer userId, String username, BigDecimal age, String bio, String gender, String foodPreferencesTag, Timestamp createdDttm, Timestamp updatedDttm){
        super();
        System.out.println("hello world");
        this.userId = userId;
        this.username = username;
        this.age = age;
        this.gender = gender;
        this.bio = bio;
        this.foodPreferencesTag = foodPreferencesTag;
        this.createdDttm = createdDttm;
        this.updatedDttm = updatedDttm;

    }

    public DinerUserProfile() {
        System.out.println("hello world 1");
    }

    

}
