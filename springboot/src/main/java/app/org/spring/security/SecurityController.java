package app.org.spring.security;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 36000)
@RestController
public class SecurityController {

    @GetMapping("/api/security")
    public ResponseEntity<String> getHello(){
        return ResponseEntity.ok("simple hello");
    }

    @GetMapping("/api/security/basic")
    public ResponseEntity<String> basicAuth(){
        return ResponseEntity.ok(null);
    }
}
