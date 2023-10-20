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

    @Column(name = "IMAGE_NAME", length = 50, nullable = false)
    protected String imageName;

    @Column(name = "IMAGE")
    protected byte[] imageByte;

    @Column(name = "IMAGE_TYPE", length = 50, nullable = false)
    protected String imageType;

    @Column(name = "USER_ID", unique=true, length = 50, nullable = false)
    protected String username;

    @Column(name = "RESTAURANT_USER_PROFILE_ID", unique=true, length = 50, nullable = false)
    protected String restaurantId;

    @Column(name = "USER_TYPE", length = 50, nullable = false)
    protected String userType;

    @Column(name = "USAGE_TYPE", length = 50, nullable = false)
    protected String usageType;

    @JsonIgnore
    @Column(name = "CRT_TS", length = 50, nullable = false)
    protected Timestamp crtTs;


//    @Id
    public Integer getImageId(){
        return imageId;
    }

    public void setImageId(Integer imageId){
        this.imageId = imageId;
    }

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

    @Column(name = "CRT_TS", nullable = false)
    public Timestamp getCrtTs(){
        return crtTs;
    }

    public void setCrtTs(Timestamp crtTs){
        this.crtTs = crtTs;
    }

    public byte[] getImageByte(){
        return imageByte;
    }

    public void setImageByte(byte[] imageByte){
        this.imageByte = imageByte;
    }




    public String toString(){
        return "Image Details: imageId = " + imageId+ ",imageName = "+ imageName+ ",imageType ="+ imageType + ", imageByte = "+ imageByte + ",username = "+ username+ ",userType = "+ userType+",usageType = "+usageType+", crtTs ="+crtTs;
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
