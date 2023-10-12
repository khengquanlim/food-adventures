package com.org.foodAdventures.entity;

import java.math.BigDecimal;
import java.util.Date;
import java.sql.Timestamp;

import jakarta.persistence.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.envers.NotAudited;

import org.springframework.data.relational.core.mapping.Table;

@Entity
@Table("T_IMAGE")
@DynamicInsert
@DynamicUpdate
public class Image implements java.io.Serializable {

    @Id
    @Column(name="IMAGE_ID", unique = true, nullable = false, precision = 20, scale = 0)
    Integer imageId;
    protected String imageName;

    protected byte[] imageByte;

    protected String imageType;
    protected String username;
    protected String restaurantId;
    protected String userType;
    protected String usageType;

    @JsonIgnore
    protected Timestamp createdDttm;


//    @Id
    public Integer getImageId(){
        return imageId;
    }

    public void setImageId(Integer imageId){
        this.imageId = imageId;
    }

    @Column(name = "USER_ID", unique=true, length = 50, nullable = false)
    public String getUsername(){
        return username;
    }

    public void setUsername(String username){
        this.username = username;
    }

    @Column(name = "RESTAURANT_USER_PROFILE_ID", unique=true, length = 50, nullable = false)
    public String getRestaurantId(){
        return restaurantId;
    }

    public void setRestaurantId(String restaurantId){
        this.restaurantId = restaurantId;
    }


    @Column(name = "IMAGE_NAME", length = 50, nullable = false)
    public String getImageName(){
        return imageName;
    }

    public void setImageName(String imageName){
        this.imageName = imageName;
    }

    @Column(name = "IMAGE_TYPE", length = 50, nullable = false)
    public String getImageType(){
        return imageType;
    }

    public void setImageType(String imageType){
        this.imageType = imageType;
    }



    @Column(name = "USER_TYPE", length = 50, nullable = false)
    public String getUserType(){
        return userType;
    }

    public void setUserType(String userType){
        this.userType = userType;
    }

    @Column(name = "USAGE_TYPE", length = 50, nullable = false)
    public String getUsageType(){
        return usageType;
    }

    public void setUsageType(String usageType){
        this.usageType = usageType;
    }

    @Column(name = "CRT_TS", nullable = false)
    public Timestamp getCreatedDttm(){
        return createdDttm;
    }

    public void setCreatedDttm(Timestamp createdDttm){
        this.createdDttm = createdDttm;
    }

    @Column(name = "IMAGE")
    @NotAudited
    public byte[] getImageByte(){
        return imageByte;
    }

    public void setImageByte(byte[] imageByte){
        this.imageByte = imageByte;
    }




    public String toString(){
        return "Image Details: imageId = " + imageId+ ",imageName = "+ imageName+ ",imageType ="+ imageType + ", imageByte = "+ imageByte + ",username = "+ username+ ",userType = "+ userType+",usageType = "+usageType+", createdDttm ="+createdDttm;
    }

    // public Image(){
    //     super();
    //     this.imageId = imageId;
    //     this.imageName = imageName;
    //     this.imageByte = imageByte;
    //     this.imageType = imageType;
    //     this.username = username;
    //     this.userType = userType;
    //     this.usageType = usageType;
    //     this.createdDttm = createdDttm;
    // }

}
