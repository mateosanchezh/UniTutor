package com.Unitutor.UniTutor.configuracion;

import com.Unitutor.UniTutor.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtService jwtService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Deshabilita CSRF ya que estamos usando JWT
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Configura CORS
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/api/auth/**").permitAll() // Permitir acceso a la API de autenticación
                        .requestMatchers("/").permitAll() // Permitir acceso a la raíz
                        .requestMatchers("/admin").hasRole("ADMINISTRADOR") // Asegúrate que el rol esté correctamente definido
                        .anyRequest().authenticated() // Requiere autenticación para otras rutas
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Establece que no se mantendrá el estado de sesión
                .addFilterBefore(new JwtAuthenticationFilter(jwtService), UsernamePasswordAuthenticationFilter.class); // Agrega el filtro JWT antes del filtro de autenticación de usuario y contraseña

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5174")); // Agrega los orígenes permitidos
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Agrega los métodos permitidos
        configuration.setAllowedHeaders(Arrays.asList("*")); // Permite todos los encabezados
        configuration.setAllowCredentials(true); // Permite las credenciales

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Registra la configuración CORS para todas las rutas
        return source;
    }
}
