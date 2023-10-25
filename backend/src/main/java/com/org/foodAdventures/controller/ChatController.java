package com.org.foodAdventures.controller;

import com.org.foodAdventures.common.*;
import com.org.foodAdventures.dto.MessageUpdateDTO;
import com.org.foodAdventures.entity.*;
import com.org.foodAdventures.service.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@RestController
public class ChatController {
    @Autowired
    private ChatService chatService;
    
    private MessageUpdateDTO messageUpdateDTO; 
    private static final Logger log = LoggerFactory.getLogger(ChatController.class);

    @RequestMapping(value="/getAllMatchedDinerUserChatMessages", method= RequestMethod.GET)
    public ResponseEntity<JsonWrapperObject> getChatBySenderAndReceiver(@RequestParam("senderId") String senderId, 
    @RequestParam("receiverId") String receiverId) {
        log.info("chat controller get chat by sender and receiver");
        JsonWrapperObject response = new JsonWrapperObject();
        try {
            List<Message> messages = chatService.getAllMatchedDinerUserChatMessages(senderId, receiverId);
            log.info("successfully retrieve messages = {}", messages);
            response.setStatus(CommonConstant.SUCCESS);
            response.setData(messages);
            return ResponseEntity.ok(response);
        } catch(Exception e) {
            log.info("error in retrieving all messages: {}", e.getMessage());
            response.setStatus(CommonConstant.FAILURE);
            response.setDescription(e.getMessage());
            return ResponseEntity.ok(response);
        }
    }
    @RequestMapping(value="/getChatBySender", method= RequestMethod.GET)
    public ResponseEntity<JsonWrapperObject> getChatBySender(@RequestParam("senderId") String senderId) {
        log.info("chat controller get chat by sender");
        JsonWrapperObject response = new JsonWrapperObject();
        try {
            List<Message> messages = chatService.getChatBySender(senderId);
            log.info("successfully retrieve messages = {}", messages);
            response.setStatus(CommonConstant.SUCCESS);
            response.setData(messages);
            return ResponseEntity.ok(response);
        } catch(Exception e) {
            log.info("error in retrieving all messages: {}", e.getMessage());
            response.setStatus(CommonConstant.FAILURE);
            response.setDescription(e.getMessage());
            return ResponseEntity.ok(response);
        }
    }

    @RequestMapping(value = "/updateMessageBetweenCurrentUserAndSelectedUser", method = RequestMethod.PUT)
    public ResponseEntity<?> updateMessageBetweenCurrentUserAndSelectedUser(
        @RequestBody MessageUpdateDTO messageUpdateDTO) {
        try {
			Message newCurrentUserAndSelectedUserMessages = new Message();
	        newCurrentUserAndSelectedUserMessages.setMessage(messageUpdateDTO.getMessage());
	        newCurrentUserAndSelectedUserMessages.setSenderId(messageUpdateDTO.getSenderId().toString());
	        newCurrentUserAndSelectedUserMessages.setReceiverId(messageUpdateDTO.getReceiverId().toString());
            chatService.updateChatMessage(newCurrentUserAndSelectedUserMessages);
            List<Message> updatedMessages = chatService.getAllMatchedDinerUserChatMessages(messageUpdateDTO.getSenderId().toString(), 
            		messageUpdateDTO.getReceiverId().toString());
            log.info("Successfully updateMessageBetweenCurrentUserAndSelectedUser = {}", newCurrentUserAndSelectedUserMessages);
            return ResponseEntity.ok(updatedMessages);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred.");
        }
    }
    
    @RequestMapping(value = "/addRestaurantNameAndBookingUrlToMessageDatabase", method = RequestMethod.PUT)
    public ResponseEntity<?> addRestaurantNameAndBookingUrlToMessageDatabase(
            @RequestBody MessageUpdateDTO messageUpdateDTO) {
        	JsonWrapperObject response = new JsonWrapperObject();
            try {
    			Message newCurrentUserAndSelectedUserMessages = new Message();
    	        newCurrentUserAndSelectedUserMessages.setBookingUrl(messageUpdateDTO.getBookingUrl());
    	        newCurrentUserAndSelectedUserMessages.setRestaurantName(messageUpdateDTO.getRestaurantName());
    	        newCurrentUserAndSelectedUserMessages.setSenderId(messageUpdateDTO.getSenderId().toString());
    	        newCurrentUserAndSelectedUserMessages.setReceiverId(messageUpdateDTO.getReceiverId().toString());
                chatService.updateChatMessage(newCurrentUserAndSelectedUserMessages);

                log.info("Successfully updated message = {}", newCurrentUserAndSelectedUserMessages);
                response.setStatus(CommonConstant.SUCCESS);
                response.setData(newCurrentUserAndSelectedUserMessages);
                return ResponseEntity.ok(response);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred.");
            }
        }
}
