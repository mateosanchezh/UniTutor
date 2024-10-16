package com.Unitutor.UniTutor.controller;

import com.Unitutor.UniTutor.DTO.UsuarioDTO;
import com.Unitutor.UniTutor.model.Carrera;
import com.Unitutor.UniTutor.model.Usuario;
import com.Unitutor.UniTutor.repository.CarreraRepository;
import com.Unitutor.UniTutor.repository.UsuarioRepository;
import com.Unitutor.UniTutor.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
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
    private CarreraRepository carreraRepository; // Para buscar carreras

    @Autowired
    private JwtService jwtService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Método para iniciar sesión
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String user = credentials.get("user");
        String password = credentials.get("password");

        // Verifico que el usuario y la contraseña estén presentes
        if (user == null || password == null) {
            return ResponseEntity.badRequest().body("Usuario y contraseña son requeridos");
        }

        // Busco al usuario en la base de datos
        Usuario usuario = usuarioRepository.findByUser(user);
        if (usuario == null) {
            return ResponseEntity.badRequest().body("Usuario no encontrado");
        }

        // Verifico la contraseña
        if (passwordEncoder.matches(password, usuario.getContrasena())) {
            // Quito la contraseña del objeto usuario antes de devolverlo
            usuario.setContrasena(null);

            // Genero un token de acceso
            String token = jwtService.generateToken(usuario);

            // Creo un objeto de respuesta con el token y detalles del usuario
            Map<String, Object> response = Map.of(
                    "token", token,
                    "user", Map.of(
                            "id", usuario.getId(),
                            "nombre", usuario.getNombre(),
                            "apellido", usuario.getApellido(),
                            "userRole", usuario.getUserRole()
                    )
            );

            return ResponseEntity.ok(response);
        } else {
            // Si la contraseña es incorrecta, devuelvo un mensaje
            return ResponseEntity.badRequest().body("Contraseña incorrecta");
        }
    }

    // Método para registrar un nuevo usuario
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UsuarioDTO usuarioDTO) {
        // Realizo varias validaciones para asegurarme de que toda la información esté presente
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

        // Verifico si el usuario ya existe
        if (usuarioRepository.findByUser(usuarioDTO.getUser()) != null) {
            return ResponseEntity.badRequest().body("El usuario ya existe");
        }

        // Verifico si el teléfono y el email ya están en uso
        if (usuarioRepository.findByTelefono(usuarioDTO.getTelefono()) != null) {
            return ResponseEntity.badRequest().body("El número de teléfono ya está en uso");
        }
        if (usuarioRepository.findByEmail(usuarioDTO.getEmail()) != null) {
            return ResponseEntity.badRequest().body("El email ya está en uso");
        }

        // Convierte el rol y el estado de cuenta a enums
        UserRole userRole;
        UserEstadoCuenta userEstadoCuenta;
        try {
            userRole = UserRole.valueOf(usuarioDTO.getUserRole().name());
            userEstadoCuenta = UserEstadoCuenta.valueOf(usuarioDTO.getUserEstadoCuenta().name());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Rol o estado de cuenta inválido");
        }

        // Busco la carrera por ID
        Carrera carrera = carreraRepository.findById(usuarioDTO.getCarreraId())
                .orElse(null);
        if (carrera == null) {
            return ResponseEntity.badRequest().body("Carrera no encontrada");
        }

        // Codifico la contraseña
        String hashedPassword = passwordEncoder.encode(usuarioDTO.getPassword());

        // Creo un nuevo usuario a partir del DTO
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

        // Guardo el nuevo usuario en la base de datos
        usuarioRepository.save(nuevoUsuario);
        return ResponseEntity.ok("Usuario registrado exitosamente");
    }

    // Método para cerrar sesión
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        // Confirmo que el cierre de sesión fue exitoso
        return ResponseEntity.ok("Logout exitoso");
    }
}
