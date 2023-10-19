package com.org.foodAdventures.controller;

import com.org.foodAdventures.common.*;
import com.org.foodAdventures.entity.*;
import com.org.foodAdventures.service.*;

import org.apache.coyote.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ChatController {
    @Autowired
    private ChatService chatService;

    private static final Logger log = LoggerFactory.getLogger(ChatController.class);

    @RequestMapping(value="/getChatBySenderAndReceiver", method= RequestMethod.GET)
    public ResponseEntity<JsonWrapperObject> getChatBySenderAndReceiver() {
        log.info("chat controller get chat by sender and receiver");
        JsonWrapperObject response = new JsonWrapperObject();
        try {
            List<Message> messages = chatService.getChatBySenderAndReceiver("Sky1001", "Sky1002");
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
}
