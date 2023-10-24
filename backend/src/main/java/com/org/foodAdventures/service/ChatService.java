package com.org.foodAdventures.service;

import com.org.foodAdventures.entity.DinerUserProfile;
import com.org.foodAdventures.entity.Message;
import com.org.foodAdventures.repository.MessageRepository;
import org.hibernate.validator.constraints.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class ChatService {
    @Autowired
    private MessageRepository messageRepository;
    private final Logger log = LoggerFactory.getLogger(ChatService.class);

    public List<Message> getAllMatchedDinerUserChatMessages(String senderId, String receiverId) {
        return messageRepository.getAllMatchedDinerUserChatMessages(senderId, receiverId);
    }

    public List<Message> getChatBySender(String senderId) {
        return messageRepository.getAllMessagesBySenderId(senderId);
    }
    
    public Message updateChatMessage(Message message) {
        try {
            // Log before saving to the database.
            log.info("Before saving to the database...");

            // Save the message to the database.
            Message savedMessage = messageRepository.save(message);

            // Log after saving to the database.
            log.info("Successfully saved to the database: {}", savedMessage);

            return savedMessage;
        } catch (Exception e) {
            // Log and handle the exception.
            log.error("Error while saving the message: {}", e.getMessage(), e);
            // Rethrow or handle the exception as needed.
            throw e;
        }
    }

}
