package app.org.spring.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 36000)
@RestController
public class SecurityController {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @GetMapping("/api/security")
    public ResponseEntity<String> getHello() {
        return ResponseEntity.ok("simple hello");
    }

    @GetMapping("/api/security/basic")
    public Map<String, String> basicAuth() {
        Map<String, String> model = new HashMap<>();
        model.put("msg", "User authenticated");
        return model;
    }

    @GetMapping("/api/security/user1")
    public Map<String, String> user1Resource() {
        Map<String, String> model = new HashMap<>();
        model.put("msg", "Resource available for users with roles: ROLE_USER3, ROLE_USER2, ROLE_USER1");
        return model;
    }

    @GetMapping("/api/security/user2")
    public Map<String, String> user2Resource() {
        Map<String, String> model = new HashMap<>();
        model.put("msg", "Resource available for users with roles: ROLE_USER3, ROLE_USER2");
        return model;
    }

    @GetMapping("/api/security/user3")
    public Map<String, String> user3Resource() {
        Map<String, String> model = new HashMap<>();
        model.put("msg", "Resource available for users with roles: ROLE_USER3");
        return model;
    }

    @PostMapping("/api/security/logout")
    public Map<String, String> logout() {
        Map<String, String> model = new HashMap<>();
        model.put("msg", "Logout successful");
        return model;
    }
}
