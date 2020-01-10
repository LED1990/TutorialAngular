package app.org.spring.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

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
     *
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
        http
                .logout().logoutUrl("/api/security/logout").invalidateHttpSession(true).deleteCookies("JSESSIONID", "XSRF-TOKEN").logoutSuccessHandler((new HttpStatusReturningLogoutSuccessHandler(HttpStatus.OK)))
                .and()
                .cors().and()
                .csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())//remember to add CSRF header on client side!
                .ignoringAntMatchers("/api/notes/*", "/api/security/logout")
                .and()
                .authorizeRequests()
                .antMatchers("/api/security/user1").hasAnyAuthority("ROLE_USER3", "ROLE_USER2", "ROLE_USER1")
                .antMatchers("/api/security/user2").hasAnyAuthority("ROLE_USER2", "ROLE_USER3")
                .antMatchers("/api/security/user3").hasAnyAuthority("ROLE_USER3")
                .antMatchers("/api/security/logout").permitAll()
                .antMatchers("/api/security/**").authenticated()
                .and()
                .httpBasic()
                .authenticationEntryPoint(new NoPopupBasicAuthenticationEntryPoint())
                .and().authorizeRequests()
                .anyRequest().permitAll();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200", "https://localhost:4200"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "OPTIONS", "DELETE", "PUT", "PATCH"));
        configuration.setAllowedHeaders(Arrays.asList("X-XSRF-TOKEN", "X-Requested-With", "Origin", "Content-Type", "Accept", "Authorization"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
