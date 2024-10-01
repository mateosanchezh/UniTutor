package com.Unitutor.UniTutor.controller;

import com.Unitutor.UniTutor.model.Carrera;
import com.Unitutor.UniTutor.model.Usuario;
import com.Unitutor.UniTutor.repository.CarreraRepository;
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
    private CarreraRepository carreraRepository; // Nuevo para buscar la carrera

    @Autowired
    private JwtService jwtService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String user = credentials.get("user");
        String password = credentials.get("password");

        if (user == null || password == null) {
            return ResponseEntity.badRequest().body("Usuario y contraseña son requeridos");
        }

        System.out.println("Usuario: " + user);
        System.out.println("Password: " + password);

        Usuario usuario = usuarioRepository.findByUser(user);
        if (usuario == null) {
            return ResponseEntity.badRequest().body("Usuario no encontrado");
        }

        if (passwordEncoder.matches(password, usuario.getContrasena())) {
            usuario.setContrasena(null);

            String token = jwtService.generateToken(user, usuario.getUserRole().name());
            return ResponseEntity.ok(Map.of("token", token, "user", usuario));
        } else {
            return ResponseEntity.badRequest().body("Contraseña incorrecta");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> userDetails) {
        String nombre = userDetails.get("nombre");
        String apellido = userDetails.get("apellido");
        String user = userDetails.get("user");
        String email = userDetails.get("email");
        String telefono = userDetails.get("telefono");
        String password = userDetails.get("password");
        String rol = userDetails.get("rol");
        String estadoCuenta = userDetails.get("estadoCuenta");
        String carreraId = userDetails.get("carreraId");
        String semestre = userDetails.get("semestre");

        if (nombre == null || apellido == null || user == null || email == null || telefono == null ||
                password == null || rol == null || estadoCuenta == null || carreraId == null || semestre == null) {
            return ResponseEntity.badRequest().body("Todos los campos son requeridos");
        }

        if (usuarioRepository.findByUser(user) != null) {
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

        Carrera carrera = carreraRepository.findById(Long.parseLong(carreraId))
                .orElse(null);
        if (carrera == null) {
            return ResponseEntity.badRequest().body("Carrera no encontrada");
        }

        String hashedPassword = passwordEncoder.encode(password);

        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setNombre(nombre);
        nuevoUsuario.setApellido(apellido);
        nuevoUsuario.setUser(user);
        nuevoUsuario.setEmail(email);
        nuevoUsuario.setTelefono(telefono);
        nuevoUsuario.setContrasena(hashedPassword);
        nuevoUsuario.setUserRole(userRole);
        nuevoUsuario.setUserEstadoCuenta(userEstadoCuenta);
        nuevoUsuario.setCarrera(carrera);
        nuevoUsuario.setSemestre(Integer.parseInt(semestre));

        usuarioRepository.save(nuevoUsuario);
        return ResponseEntity.ok("Usuario registrado exitosamente");
    }
}
