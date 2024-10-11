package com.Unitutor.UniTutor.controller;

import com.Unitutor.UniTutor.DTO.UsuarioDTO;
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

            String token = jwtService.generateToken(usuario);
            return ResponseEntity.ok(Map.of("token", token, "user", usuario));
        } else {
            return ResponseEntity.badRequest().body("Contraseña incorrecta");
        }
    }
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UsuarioDTO usuarioDTO) {
        // Validaciones
        if (usuarioDTO.getNombre() == null) {
            return ResponseEntity.badRequest().body("El nombre es requerido");
        }
        if (usuarioDTO.getApellido() == null) {
            return ResponseEntity.badRequest().body("El apellido es requerido");
        }
        if (usuarioDTO.getUser() == null) {
            return ResponseEntity.badRequest().body("El usuario es requerido");
        }
        if (usuarioDTO.getEmail() == null) {
            return ResponseEntity.badRequest().body("El email es requerido");
        }
        if (usuarioDTO.getTelefono() == null) {
            return ResponseEntity.badRequest().body("El teléfono es requerido");
        }
        if (usuarioDTO.getPassword() == null) {
            return ResponseEntity.badRequest().body("La contraseña es requerida");
        }
        if (usuarioDTO.getUserRole() == null) {
            return ResponseEntity.badRequest().body("El rol de usuario es requerido");
        }
        if (usuarioDTO.getUserEstadoCuenta() == null) {
            return ResponseEntity.badRequest().body("El estado de cuenta del usuario es requerido");
        }
        if (usuarioDTO.getCarreraId() == null) {
            return ResponseEntity.badRequest().body("La carrera es requerida");
        }
        if (usuarioDTO.getSemestre() == null) {
            return ResponseEntity.badRequest().body("El semestre es requerido");
        }

        if (usuarioRepository.findByUser(usuarioDTO.getUser()) != null) {
            return ResponseEntity.badRequest().body("El usuario ya existe");
        }

        // Verificar si el número de teléfono ya está registrado
        if (usuarioRepository.findByTelefono(usuarioDTO.getTelefono()) != null) {
            return ResponseEntity.badRequest().body("El número de teléfono ya está en uso");
        }

        // Verificar si el email ya está registrado
        if (usuarioRepository.findByEmail(usuarioDTO.getEmail()) != null) {
            return ResponseEntity.badRequest().body("El email ya está en uso");
        }

        // Convertir el rol y estado de cuenta a enums
        UserRole userRole;
        UserEstadoCuenta userEstadoCuenta;
        try {
            userRole = UserRole.valueOf(usuarioDTO.getUserRole().name());
            userEstadoCuenta = UserEstadoCuenta.valueOf(usuarioDTO.getUserEstadoCuenta().name());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Rol o estado de cuenta inválido");
        }

        Carrera carrera = carreraRepository.findById(usuarioDTO.getCarreraId())
                .orElse(null);
        if (carrera == null) {
            return ResponseEntity.badRequest().body("Carrera no encontrada");
        }

        // Codificar la contraseña
        String hashedPassword = passwordEncoder.encode(usuarioDTO.getPassword());

        // Crear nuevo usuario a partir del DTO
        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setNombre(usuarioDTO.getNombre());
        nuevoUsuario.setApellido(usuarioDTO.getApellido());
        nuevoUsuario.setUser(usuarioDTO.getUser());
        nuevoUsuario.setEmail(usuarioDTO.getEmail());
        nuevoUsuario.setTelefono(usuarioDTO.getTelefono());
        nuevoUsuario.setContrasena(hashedPassword); // Usar la contraseña codificada
        nuevoUsuario.setUserRole(userRole);
        nuevoUsuario.setUserEstadoCuenta(userEstadoCuenta);
        nuevoUsuario.setCarrera(carrera);
        nuevoUsuario.setSemestre(usuarioDTO.getSemestre());

        usuarioRepository.save(nuevoUsuario);
        return ResponseEntity.ok("Usuario registrado exitosamente");
    }


}