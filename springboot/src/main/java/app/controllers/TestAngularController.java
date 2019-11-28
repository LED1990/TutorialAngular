package app.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:4200")
@RestController
public class TestAngularController {

    @RequestMapping("/hello/angular")
    public String sayHelloToAngular(){
        return "Hello angular";
    }
}

