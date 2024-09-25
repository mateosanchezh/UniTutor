package com.Unitutor.UniTutor.controller;

import com.Unitutor.UniTutor.model.Usuario;
import com.Unitutor.UniTutor.repository.UsuarioRepository;
import com.Unitutor.UniTutor.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.Unitutor.UniTutor.model.enums.UserRole;
import com.Unitutor.UniTutor.model.enums.UserEstadoCuenta;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5174")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtService jwtService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body("Email y contrasena son requeridos");
        }

        Usuario usuario = usuarioRepository.findByEmail(email);
        if (usuario == null) {
            return ResponseEntity.badRequest().body("Usuario no encontrado");
        }

        if (passwordEncoder.matches(password, usuario.getContrasena())) {
            usuario.setContrasena(null);
            String token = jwtService.generateToken(email);
            return ResponseEntity.ok(Map.of("token", token, "user", usuario));
        } else if (password.equals(usuario.getContrasena())) {
            String hashedPassword = passwordEncoder.encode(password);
            usuario.setContrasena(hashedPassword);
            usuarioRepository.save(usuario);
            usuario.setContrasena(null);
            String token = jwtService.generateToken(email);
            return ResponseEntity.ok(Map.of("token", token, "user", usuario));
        } else {
            return ResponseEntity.badRequest().body("Contrasena incorrecta");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> userDetails) {
        String nombre = userDetails.get("nombre");
        String user = userDetails.get("user");
        String email = userDetails.get("email");
        String password = userDetails.get("password");
        String rol = userDetails.get("rol");
        String estadoCuenta = userDetails.get("estadoCuenta");

        if (nombre == null || user == null || email == null || password == null || rol == null || estadoCuenta == null) {
            return ResponseEntity.badRequest().body("Todos los campos son requeridos");
        }

        if (usuarioRepository.findByEmail(email) != null) {
            return ResponseEntity.badRequest().body("El usuario ya existe");
        }

        UserRole userRole;
        UserEstadoCuenta userEstadoCuenta;
        try {
            userRole = UserRole.valueOf(rol.toUpperCase());
            userEstadoCuenta = UserEstadoCuenta.valueOf(estadoCuenta.toUpperCase());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Rol o estado de cuenta inválido");
        }

        String hashedPassword = passwordEncoder.encode(password);

        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setNombre(nombre);
        nuevoUsuario.setUser(user);
        nuevoUsuario.setEmail(email);
        nuevoUsuario.setContrasena(hashedPassword);
        nuevoUsuario.setUserRole(userRole);
        nuevoUsuario.setUserEstadoCuenta(userEstadoCuenta);

        usuarioRepository.save(nuevoUsuario);
        return ResponseEntity.ok("Usuario registrado exitosamente");
    }
}
