package com.org.foodAdventures.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.*;

public class UserRegisterRequest implements Serializable {

    @JsonProperty("userId")
    private String userId;

    @JsonProperty("userType")
    private String userType;

    @JsonProperty("age")
    private int age;

    @JsonProperty("email")
    private String email;

    @JsonProperty("password")
    private String password;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserRegisterRequest(String userId, String userType, int age, String email, String password) {
        this.userId = userId;
        this.userType = userType;
        this.age = age;
        this.email = email;
        this.password = password;
    }

    public UserRegisterRequest() {}

    @Override
    public String toString() {
        return "UserRegisterRequest{" +
            "userId='" + userId + '\'' +
            ", userType=" + userType +
            ", age=" + age +
            ", email=" + email +
            ", password=" + password +
            '}';
    }


}
