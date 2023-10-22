package com.org.foodAdventures.service;

import com.org.foodAdventures.entity.Message;
import com.org.foodAdventures.repository.MessageRepository;
// import org.hibernate.validator.constraints.*;
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

    public List<Message> getChatBySenderAndReceiver(String senderId, String receiverId) {
        return messageRepository.getAllMessagesBySenderIdAndReceiverId(senderId, receiverId);
    }

}
