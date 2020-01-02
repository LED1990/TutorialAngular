package app.org.spring.security;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

/**
 * when using UserDetailsService authentication is based on user name and password is provided from logging form
 * useful when user credentials are stored in DB or somewhere else in app
 * when third party auth is needed AuthenticationProvider will be the choice
 */
@Service
public class CustomUserDetails implements UserDetailsService {
    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {

        //for test user name and passowrd hardcoded
        if(s.equals("user")){
            return new User(s, new BCryptPasswordEncoder().encode("user"), Collections.emptyList());
        }
        throw new UsernameNotFoundException("user doesn't exists");
    }

}
