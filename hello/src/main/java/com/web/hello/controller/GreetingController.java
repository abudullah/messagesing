package com.web.hello.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class GreetingController {

 private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public GreetingController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/private-message/{username}")
    @SendTo("/user/{username}/private")
    public void sendPrivateMessage(@DestinationVariable String username, String message) {
        System.out.println("username"+username);
        System.out.println("message"+message);
        String destination = "/user/" + username + "/private";
        messagingTemplate.convertAndSend(destination, message);
    }
}
