package javaServer.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.messaging.simp.SimpMessagingTemplate;

import javaServer.domain.Greeting;
import javaServer.domain.HelloMessage;
import javaServer.service.EchoService;
import javaServer.service.ReceiveTcp;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.charset.Charset;
import java.util.*;

@Controller
public class HelloController {
    

    @Autowired
    private SimpMessagingTemplate template;
    
    @RequestMapping("/update")
    @ResponseBody
    public Greeting greeting(@RequestParam("content")String content) throws Exception {
        this.template.convertAndSend("/topic/greetings", new Greeting(content));
        return new Greeting("OK!");
    }

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(HelloMessage message) throws Exception {
        
        return new Greeting(HtmlUtils.htmlEscape(message.getName()));
    }
    
}