package com.org.foodAdventuresBackendOne.entity;

import jakarta.persistence.*;

import java.sql.*;

@Entity
@Table(name = "T_USER")
public class User {
    @Id
    @Column(name="USER_ID", unique = true)
    private String id;

    @Column(name="AGE", nullable = false)
    private int age;

    @Column(name="USER_TYPE", nullable = false)
    private String userType;

    @Column(name="PWD_HASH", nullable = false)
    private String pwdHash;

    @Column(name="LAST_ONLINE", nullable = false)
    private Timestamp lastOnline;

    @Column(name="EMAIL", nullable = false)
    private String email;

    @Column(name="CRT_TS", nullable = false)
    private Timestamp createdTs;

    @Column(name="UPD_TS", nullable = false)
    private Timestamp updatedTs;

    // Getters and setters


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getPwdHash() {
        return pwdHash;
    }

    public void setPwdHash(String pwdHash) {
        this.pwdHash = pwdHash;
    }

    public Timestamp getLastOnline() {
        return lastOnline;
    }

    public void setLastOnline(Timestamp lastOnline) {
        this.lastOnline = lastOnline;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public User(String id, int age, String userType, String pwdHash, Timestamp lastOnline, String email, Timestamp createdTs, Timestamp updatedTs) {
        super();
        this.id = id;
        this.age = age;
        this.userType = userType;
        this.pwdHash = pwdHash;
        this.lastOnline = lastOnline;
        this.email = email;
        this.createdTs = createdTs;
        this.updatedTs = updatedTs;
    }

    public User() {}

    @Override
    public String toString() {
        return "User{" +
            "id=" + id +
            ", age=" + age +
            ", userType='" + userType + '\'' +
            ", pwdHash='" + pwdHash + '\'' +
            ", lastOnline=" + lastOnline +
            ", email='" + email + '\'' +
            ", createdTs=" + createdTs +
            ", updatedTs=" + updatedTs +
            '}';
    }
}
