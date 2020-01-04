package app.org.spring.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;

@Configuration
@EnableWebSecurity
public class CustomSecurityAdapter extends WebSecurityConfigurerAdapter {

    @Autowired
    private CustomAuthProvider customAuthProvider;
    @Autowired
    private CustomUserDetails userDetails;

    /**
     * here I can configure authentication providers
     * order is important, providers are checked from top to bottom
     * @param auth auth
     * @throws Exception Exception
     */
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(customAuthProvider);
        auth.userDetailsService(userDetails);
        auth.inMemoryAuthentication()
                .withUser("admin")
                .password(passwordEncoder().encode("admin")).authorities("ROLE_ADMIN");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.addFilterBefore(new CrosFilter(), ChannelProcessingFilter.class);//needed to use @CrossOrigin
        http.authorizeRequests()
                .antMatchers("/api/security/*")
                .authenticated()
                .and().httpBasic().and();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
