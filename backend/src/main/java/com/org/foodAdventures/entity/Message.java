package com.org.foodAdventures.entity;

import jakarta.persistence.*;

import java.sql.*;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "T_MESSAGE")
public class Message implements java.io.Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="MSG_ID", unique = true, nullable = false)
    private Long msgId;
    
    @Column(name="SENDER_ID", nullable = false)
    private String senderId;

    @Column(name="RECEIVER_ID", nullable = false)
    private String receiverId;

    @Column(name="MESSAGE", nullable = false)
    private String message;

    @Column(name="BOOKING_URL")
    private String bookingUrl;

    @Column(name="RESTAURANT_NAME")
    private String restaurantName;
    
    @CreationTimestamp
    @Column(name="CRT_TS", nullable = false)
    private Timestamp createdTs;

    @UpdateTimestamp
    @Column(name="UPD_TS", nullable = false)
    private Timestamp updatedTs;

    // Getters and setters

    public Long getMsgId() {
        return msgId;
    }

    public void setMsgId(Long msgId) {
        this.msgId = msgId;
    }

    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public String getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(String receiverId) {
        this.receiverId = receiverId;
    }
	
	public String getMessage() {
	    return message;
	}
	
	public void setMessage(String message) {
	    this.message = message;
	}

	public String getBookingUrl() {
	    return bookingUrl;
	}
	
	public void setBookingUrl(String bookingUrl) {
	    this.bookingUrl = bookingUrl;
	}
	
	public String getRestaurantName() {
	    return restaurantName;
	}
	
	public void setRestaurantName(String restaurantName) {
	    this.restaurantName = restaurantName;
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

    public Message(Long msgId, String senderId, String receiverId, String message, String bookingUrl, String restaurantName, Timestamp createdTs, Timestamp updatedTs) {
        this.msgId = msgId;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.message = message;
	    this.bookingUrl = bookingUrl;
	    this.restaurantName = restaurantName;
        this.createdTs = createdTs;
        this.updatedTs = updatedTs;
    }

    public Message() {}

    @Override
    public String toString() {
        return "Message{" +
            "msgId=" + msgId +
            ", senderId='" + senderId + '\'' +
            ", receiverId='" + receiverId + '\'' +
            ", message='" + message + '\'' +
            ", bookingUrl=" + bookingUrl +
            ", restaurantName=" + restaurantName +
            ", createdTs=" + createdTs +
            ", updatedTs=" + updatedTs +
            '}';
    }
}
