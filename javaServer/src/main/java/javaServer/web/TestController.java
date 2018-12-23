package javaServer.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.beans.factory.annotation.Autowired;



@Controller
public class TestController {
    @RequestMapping(value = { "Test" })
    @ResponseBody
    public String getCalculateSimple() {
        //model.addAttribute("user", getPrincipal());
        try{
            return "test";
            
        }catch(Exception e){
            return null;
        }
    }    
    
    
}