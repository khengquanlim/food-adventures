package com.org.foodAdventures.dto;

public class MessageUpdateDTO { 
	private Integer senderId;
	private Integer receiverId;
	private String message;
	private String bookingUrl;
	private String restaurantName;

	public MessageUpdateDTO(Integer senderId, Integer receiverId, String message, String bookingUrl, String restaurantName) {
	    this.senderId = senderId;
	    this.receiverId = receiverId;
	    this.message = message;
	    this.bookingUrl = bookingUrl;
	    this.restaurantName = restaurantName;
	}
	
	
	// Default (no-argument) constructor
	public MessageUpdateDTO() {
	}
	
	public Integer getSenderId() {
	    return senderId;
	}
	
	public void setSenderId(Integer senderId) {
	    this.senderId = senderId;
	}
	
	public Integer getReceiverId() {
	    return receiverId;
	}
	
	public void setReceiverId(Integer receiverId) {
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

}
