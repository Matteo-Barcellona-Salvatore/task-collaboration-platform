package com.collaboration.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import java.util.HashMap;
import java.util.Map;

@Controller
public class WebSocketController {
    
    @MessageMapping("/task-update")
    @SendTo("/topic/tasks")
    public Map<String, Object> handleTaskUpdate(Map<String, Object> message) {
        return message;
    }
    
    @MessageMapping("/notification")
    @SendTo("/topic/notifications")
    public Map<String, Object> handleNotification(Map<String, Object> message) {
        Map<String, Object> notification = new HashMap<>();
        notification.put("message", message.get("message"));
        notification.put("type", message.get("type"));
        notification.put("timestamp", System.currentTimeMillis());
        return notification;
    }
}