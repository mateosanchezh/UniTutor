package com.Unitutor.UniTutor.service;

import com.Unitutor.UniTutor.model.Usuario;
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

    // Método para generar un token JWT usando el nombre de usuario
    public String generateToken(Usuario usuario) {
        return Jwts.builder()
                .setSubject(usuario.getUser()) // Cambia esto si quieres que el 'sub' sea diferente
                .claim("nombre", usuario.getNombre())
                .claim("user", usuario.getUser())
                .claim("role", usuario.getUserRole().name()) // Suponiendo que tienes un enum para el rol
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SECRET_KEY)
                .compact();
    }

    // Método para validar el token JWT
    public Boolean validateToken(String token, String username) {
        final String extractedUsername = extractUsername(token); // Extrae el nombre de usuario
        return (extractedUsername.equals(username) && !isTokenExpired(token)); // Valida que el nombre de usuario coincida y que no haya expirado
    }

    // Extraer el nombre de usuario del token JWT
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
