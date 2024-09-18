package com.Unitutor.UniTutor.controller;

import com.Unitutor.UniTutor.model.Usuario;
import com.Unitutor.UniTutor.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5174") // esto lo que hace es recibir todos los datos desde el front ((SOLO TOCAR SI CAMBIAN EL PUERTO))
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
        String email = userDetails.get("email");
        String password = userDetails.get("password");

        // Este metodo lo que hace es que al ingresar un usuario y contraseña sean validos y no sean datos falos
        if (email == null || password == null) {
            return ResponseEntity.badRequest().body("Email y contraseña son requeridos");
        }

        // Una vez se valide que los datos anterirores son validos, el metodo busca en la base de datos que el usuario no este ya registrado (email)
        if (usuarioRepository.findByEmail(email) != null) {
            return ResponseEntity.badRequest().body("El usuario ya existe");
        }

        // Para no gardar datos en plano el metodo encode encripta la contraseña
        String hashedPassword = passwordEncoder.encode(password);

        // Crear un nuevo usuario
        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setEmail(email);
        nuevoUsuario.setContraseña(hashedPassword);

        usuarioRepository.save(nuevoUsuario);// Guardar el usuario en la base de datos

        return ResponseEntity.ok("Usuario registrado exitosamente");
    }
}
