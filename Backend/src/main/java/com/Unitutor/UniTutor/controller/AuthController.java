package com.Unitutor.UniTutor.controller;

import com.Unitutor.UniTutor.model.Usuario;
import com.Unitutor.UniTutor.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.Unitutor.UniTutor.model.enums.UserRole;
import com.Unitutor.UniTutor.model.enums.UserEstadoCuenta;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // esto lo que hace es recibir todos los datos desde el front ((SOLO TOCAR SI CAMBIAN EL PUERTO))
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); // se usa para codificar y comparar contraseñas
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        // Verifica que tanto el email como la contraseña sean ingresados
        if (email == null || password == null) {
            return ResponseEntity.badRequest().body("Email y contraseña son requeridos");
        }

        // Busca al usuario en la base de datos por email
        Usuario usuario = usuarioRepository.findByEmail(email);
        if (usuario == null) {
            // Si no se encuentra un usuario con ese email, se devuelve un error
            return ResponseEntity.badRequest().body("Usuario no encontrado");
        }

        // Compara la contraseña proporcionada con la contraseña codificada almacenada en la base de datos
        if (passwordEncoder.matches(password, usuario.getContraseña())) {
            // Si la contraseña es correcta, elimina la contraseña del objeto antes de devolverlo como respuesta
            usuario.setContraseña(null);
            return ResponseEntity.ok(usuario);
        } else if (password.equals(usuario.getContraseña())) {
            // Si la contraseña almacenada está en texto plano (no está codificada), la actualiza con el formato BCrypt
            String hashedPassword = passwordEncoder.encode(password);
            usuario.setContraseña(hashedPassword);
            usuarioRepository.save(usuario);  // Guarda la nueva contraseña codificada en la base de datos
            usuario.setContraseña(null);  // Elimina la contraseña del objeto antes de devolverlo
            return ResponseEntity.ok(usuario);  // Devuelve el usuario actualizado
        } else {
            // Si la contraseña es incorrecta, devuelve un error
            return ResponseEntity.badRequest().body("Contraseña incorrecta");
        }
    }

    // Este metodo lo que hace es registrar usuarios a la base de datos mediante un correo y una contraseña
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> userDetails) {
        String nombre = userDetails.get("nombre");
        String user = userDetails.get("user");
        String email = userDetails.get("email");
        String password = userDetails.get("password");
        String rol = userDetails.get("rol"); // Obtener rol
        String estadoCuenta = userDetails.get("estadoCuenta"); // Obtener estado de cuenta

        // Verifica que todos los campos sean ingresados
        if (nombre == null || user == null || email == null || password == null || rol == null || estadoCuenta == null) {
            return ResponseEntity.badRequest().body("Todos los campos son requeridos");
        }

        // Verifica que el usuario no esté ya registrado
        if (usuarioRepository.findByEmail(email) != null) {
            return ResponseEntity.badRequest().body("El usuario ya existe");
        }

        // Verifica que el rol y el estado de cuenta sean válidos
        UserRole userRole;
        UserEstadoCuenta userEstadoCuenta;
        try {
            userRole = UserRole.valueOf(rol.toUpperCase()); // Convertir el rol a mayúsculas para evitar errores
            userEstadoCuenta = UserEstadoCuenta.valueOf(estadoCuenta.toUpperCase()); // Convertir el estado a mayúsculas
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Rol o estado de cuenta inválido");
        }

        // Encripta la contraseña
        String hashedPassword = passwordEncoder.encode(password);

        // Crear un nuevo usuario
        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setNombre(nombre);
        nuevoUsuario.setUser(user);
        nuevoUsuario.setEmail(email);
        nuevoUsuario.setContraseña(hashedPassword);
        nuevoUsuario.setUserRole(userRole); // Establecer el rol
        nuevoUsuario.setUserEstadoCuenta(userEstadoCuenta); // Establecer el estado de cuenta

        usuarioRepository.save(nuevoUsuario); // Guardar el usuario en la base de datos

        return ResponseEntity.ok("Usuario registrado exitosamente");
    }
}