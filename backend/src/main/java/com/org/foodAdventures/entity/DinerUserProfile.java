package com.org.foodAdventures.entity;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "T_DINER_USER_PROFILE")
public class DinerUserProfile implements java.io.Serializable{


    @Id
    private Long userId;
    private String username;
    private String dinerUserName;
    private Integer age;
    private String gender;
    private String bio;
    private String matchedDinerUserIdList;
    private String foodPreferencesTag;

    @JsonIgnore
    private Timestamp createdDttm;
    @JsonIgnore
    private Timestamp updatedDttm;


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="DINER_USER_PROFILE_ID", unique = true, nullable = false)
    public Long getUserId(){
        return userId;
    }

    public void setUserId(Long userId){
        this.userId = userId;
    }

    @Column(name="USERNAME", length = 50, unique = true, nullable = false)
    public String getDinerUserName(){
        return dinerUserName;
    }

    public void setDinerUserName(String dinerUserName){
        this.dinerUserName = dinerUserName;
    }

    @Column(name="USER_ID", length = 50, unique = true, nullable = false)
    public String getUsername(){
        return username;
    }

    public void setUsername(String username){
        this.username = username;
    }
    
    @Column(name = "AGE")
    public Integer getAge(){
        return age;
    }

    public void setAge(Integer age){
        this.age = age;
    }

    @Column(name = "GENDER", length = 6)
    public String getGender(){
        return gender;
    }

    public void setGender(String gender){
        this.gender = gender;
    }

    @Column(name = "BIOGRAPHY", length = 150)
    public String getBio(){
        return bio;
    }

    public void setBio(String bio){
        this.bio = bio;
    }

    public void setMatchedDinerUserIdList(String matchedDinerUserIdList){
        this.matchedDinerUserIdList = matchedDinerUserIdList;
    }

    @Column(name = "MATCHED_DINER_USER_ID_LIST")
    public String getMatchedDinerUserIdList(){
        return matchedDinerUserIdList;
    }

    @Column(name = "FOOD_PREFERENCES_TAG", length = 10)
    public String getFoodPrefTag(){
        return foodPreferencesTag;
    }

    public void setFoodPrefTag(String foodPreferencesTag){
        this.foodPreferencesTag = foodPreferencesTag;
    }

    @CreationTimestamp
    @Column(name = "CRT_TS", nullable = false)
    public Timestamp getCreatedDttm(){
        return createdDttm;
    }

    public void setCreatedDttm(Timestamp createdDttm){
        this.createdDttm = createdDttm;
    }

    @UpdateTimestamp
    @Column(name = "UPD_TS", nullable = false)
    public Timestamp getUpdatedDttm(){
        return updatedDttm;
    }

    public void setUpdatedDttm(Timestamp updatedDttm){
        this.updatedDttm = updatedDttm;
    }

    public String toString(){
        return "User Profile Details: username = " + username+ ",age = "+ age+ ",gender ="+ gender + ", bio = "+ bio +", createdDttm ="+createdDttm;
    }

    // public DinerUserProfile(){
    //     super();
    //     this.username = username;
    //     this.age = age;
    //     this.gender = gender;
    //     this.bio = bio;
    //     this.createdDttm = createdDttm;

    // }

}