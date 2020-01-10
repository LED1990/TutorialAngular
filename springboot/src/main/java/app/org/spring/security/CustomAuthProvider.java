package app.org.spring.security;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * AuthenticationProvider is choice when authentication requires some external service (I dont have user login and pass in my DB etc.)
 * when I do have user login and pass UserDetailService may be good choice
 */
@Component
public class CustomAuthProvider implements AuthenticationProvider {
    /**
     * here I can define how authentication process goes
     *
     * @param authentication object with data needed for authentication
     * @return class that also is of type Authentication but with authenticated data
     * @throws AuthenticationException if auth fails
     */
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String login = authentication.getName();
        String pass = authentication.getCredentials().toString();
        List<GrantedAuthority> authorities = new ArrayList<>();
        //hardcoded roles for tests
        switch (login) {
            case "user1":
                authorities.add(new SimpleGrantedAuthority("ROLE_USER1"));
                break;
            case "user2":
                authorities.add(new SimpleGrantedAuthority("ROLE_USER1"));
                authorities.add(new SimpleGrantedAuthority("ROLE_USER2"));
                break;
            case "user3":
                authorities.add(new SimpleGrantedAuthority("ROLE_USER1"));
                authorities.add(new SimpleGrantedAuthority("ROLE_USER2"));
                authorities.add(new SimpleGrantedAuthority("ROLE_USER3"));
                break;
        }

        //here may be used third party authentication service
        //for test hardcoded values
        if (("user1".equals(login) || "user2".equals(login) || "user3".equals(login)) && "pass".equals(pass)) {
            //GrantedAuthority - hasAuthority('ROLE_ADMIN') is the same as hasRole('ADMIN) -> prefix 'ROLE' is added implicit
            //here empty collection is passed
            return new UsernamePasswordAuthenticationToken(login, pass, authorities);
        }
        throw new BadCredentialsException("Custom auth FAILED");
    }

    /**
     * to tell spring security with with type of authentication this class will work with
     *
     * @param aClass passed class
     * @return true or false
     */
    @Override
    public boolean supports(Class<?> aClass) {
        return aClass.equals(UsernamePasswordAuthenticationToken.class);
    }
}
