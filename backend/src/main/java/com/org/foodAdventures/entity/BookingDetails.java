package com.org.foodAdventures.entity;

import java.math.BigDecimal;
import java.util.Date;
import java.sql.Timestamp;
import jakarta.persistence.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import org.springframework.data.relational.core.mapping.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table("T_BOOKING_DETAILS")
@DynamicInsert
@DynamicUpdate
public class BookingDetails implements java.io.Serializable{

    @Id
    private Integer bookingDetailsId;
    private Integer restaurantId;
    private Timestamp diningDateTime;
    private String bookedBy;
    private String bookedFor;
    private Integer contactNo;

    @JsonIgnore
    private Timestamp createdDttm;

    @JsonIgnore
    private Timestamp updatedDttm;

    @Id
    @Column(name="BOOKING_DETAILS_ID", unique = true, nullable = false, precision = 20, scale = 0)
    public Integer getBookingDetailsId(){
        return bookingDetailsId;
    }

    public void setBookingDetailsId(Integer bookingDetailsId){
        this.bookingDetailsId = bookingDetailsId;
    }

    @Column(name = "RESTAURANT_USER_PROFILE_ID", length = 50, nullable = false)
    public Integer getRestaurantId(){
        return restaurantId;
    }

    public void setRestaurantId(Integer restaurantId){
        this.restaurantId = restaurantId;
    }

    @Column(name = "DINING_DATE_TIME", nullable = false)
    public Timestamp getDiningDateTime(){
        return diningDateTime;
    }

    public void setDiningDateTime(Timestamp diningDateTime){
        this.diningDateTime = diningDateTime;
    }

    @Column(name = "CRT_TS", nullable = false)
    public Timestamp getCreatedDttm(){
        return createdDttm;
    }

    public void setCreatedDttm(Timestamp createdDttm){
        this.createdDttm = createdDttm;
    }

    @Column(name = "UPD_TS", nullable = false)
    public Timestamp getUpdatedDttm(){
        return updatedDttm;
    }

    public void setUpdatedDttm(Timestamp updatedDttm){
        this.updatedDttm = updatedDttm;
    }

    @Column(name = "BOOKED_BY", length = 50, nullable = false)
    public String getBookedBy(){
        return bookedBy;
    }

    public void setBookedBy(String bookedBy){
        this.bookedBy = bookedBy;
    }

    @Column(name = "BOOKED_FOR", length = 50, nullable = false)
    public String getBookedFor(){
        return bookedFor;
    }

    public void setBookedFor(String bookedFor){
        this.bookedFor = bookedFor;
    }

    @Column(name = "CONTACT_NO", length = 11, nullable = false)
    public Integer getContactNo(){
        return contactNo;
    }

    public void setContactNo(Integer contactNo){
        this.contactNo = contactNo;
    }

    public String toString(){
        return "Booking Details: bookingDetailsId = " + bookingDetailsId
        + ",restaurantId = "+ restaurantId
        + ",bookedBy ="+ bookedBy
        +",bookedFor = "+ bookedFor
        +",diningDateTime = "+diningDateTime
        +", contactNo = " +contactNo
        +", createdDttm ="+createdDttm;
    }

    // public BookingDetails(){
    //     super();
    //     this.bookingId = bookingId;
    //     this.restaurantName = restaurantName;
    //     this.bookedBy = bookedBy;
    //     this.bookedFor = bookedFor;
    //     this.bookedDttm = bookedDttm;
    //     this.createdDttm = createdDttm;

    // }

}
