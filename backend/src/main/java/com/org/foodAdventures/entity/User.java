package com.org.foodAdventures.entity;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.relational.core.mapping.Table;
import jakarta.persistence.*;

@Entity
@Table("T_USER")
@DynamicInsert
@DynamicUpdate
public class User implements java.io.Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private int age;
    private String gender;
    private String profilePictureUrl;
    private String bio;

    // Getters and setters
    public String getUsername(){
        return username;
    }

    public void setName(String newUsername){
        this.username = newUsername;
    }

    public int getAge(){
        return age;
    }

    public void setAge(int newAge){
        this.age = newAge;
    }

    public String getGender(){
        return gender;
    }

    public void setGender(String newGender){
        this.gender = newGender;
    }

    public String getProfilePic(){
        return profilePictureUrl;
    }

    public void setProfilePic(String newProfilePic){
        this.profilePictureUrl = newProfilePic;
    }

    public String getBio(){
        return bio;
    }

    public void setBio(String newBio){
        this.bio = newBio;
    }

}
