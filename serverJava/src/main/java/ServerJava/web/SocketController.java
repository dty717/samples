package web;

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

import serverJava.domain.Greeting;
import serverJava.domain.HelloMessage;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.charset.Charset;
import java.util.*;


@Controller
public class SocketController {
    
    
    @RequestMapping(value = { "/work","/workSpace" })
    public String workHome() {
        return "workspace.html";
    }
    
    @RequestMapping(value = { "/web","/Web" })
    public String webHome() {
        return "webIDE.html";
    }
    
    @Autowired
    private SimpMessagingTemplate template;
    
    
    @RequestMapping("/update")
    @ResponseBody
    public Greeting greeting(@RequestParam("content")String content) throws Exception {
        this.template.convertAndSend("/topic/greetings", new Greeting(content));
        return new Greeting("OK!");
    }
/*    @RequestMapping("/test")
    @ResponseBody
    public Greeting greeting(@RequestParam("api_key")String api_key,@RequestParam("field1")String field) throws Exception {
        //this.template.convertAndSend("/topic/greetings", new Greeting(content));
        System.out.println(api_key+":"+field);
        return new Greeting("OK!");
    }
    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(HelloMessage message) throws Exception {
        
        return new Greeting(HtmlUtils.htmlEscape(message.getName()));
    }*/
    
}