package com.Unitutor.UniTutor.service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;

@Service
public class JwtService {

    private final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256); // Genera una clave segura

    @Value("${jwt.expiration}")
    private long EXPIRATION_TIME;

    // Método para generar un token JWT
    public String generateToken(String email, String role) {
        return Jwts.builder()
                .setSubject(email) // Define el email como el sujeto del token
                .claim("role", role) // Incluye el rol como una "claim"
                .setIssuedAt(new Date()) // Define la fecha de emisión del token
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // Establece la fecha de expiración
                .signWith(SECRET_KEY) // Usa la clave generada para firmar el token
                .compact();
    }

    // Método para validar el token JWT
    public Boolean validateToken(String token, String email) {
        final String username = extractUsername(token); // Extrae el username (en este caso el email)
        return (username.equals(email) && !isTokenExpired(token)); // Valida que el email coincida y que no haya expirado
    }

    // Extraer el email (sujeto) del token JWT
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    // Extraer el rol del token JWT
    public String extractRole(String token) {
        return (String) extractAllClaims(token).get("role");
    }

    // Extraer todas las "claims" (información) del token JWT
    private Claims extractAllClaims(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY) // Usa la misma clave secreta para validar
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (JwtException e) {
            e.printStackTrace();
            return null;
        }
    }

    // Verificar si el token ha expirado
    private Boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }
}
