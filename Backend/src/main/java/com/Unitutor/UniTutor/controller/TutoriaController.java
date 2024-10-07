package com.Unitutor.UniTutor.controller;

import com.Unitutor.UniTutor.model.Tutoria;
import com.Unitutor.UniTutor.model.Usuario;
import com.Unitutor.UniTutor.repository.UsuarioRepository;
import com.Unitutor.UniTutor.service.JwtService;
import com.Unitutor.UniTutor.model.enums.UserRole;
import com.Unitutor.UniTutor.service.TutoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
@RestController
@RequestMapping("/api/tutorias")
@CrossOrigin(origins = "http://localhost:5174")
public class TutoriaController {

    private final TutoriaService tutoriaService;
    private final JwtService jwtService; // Inyecta JwtService aquí
    private final UsuarioRepository usuarioRepository; // Inyecta UsuarioRepository también

    @Autowired
    public TutoriaController(TutoriaService tutoriaService, JwtService jwtService, UsuarioRepository usuarioRepository) {
        this.tutoriaService = tutoriaService;
        this.jwtService = jwtService;
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/crear")
    public ResponseEntity<Tutoria> crearTutoria(@RequestParam Long idMateria,
                                                @RequestParam String fecha,
                                                @RequestParam String hora,
                                                @RequestParam Tutoria.Modalidad modalidad,
                                                @RequestHeader("Authorization") String token) {
        LocalDate fechaTutoria = LocalDate.parse(fecha);
        LocalTime horaTutoria = LocalTime.parse(hora);

        // Extrae el usuario desde el token usando la instancia inyectada de JwtService
        String tokenLimpio = token.replace("Bearer ", "");
        String username = jwtService.extractUsername(tokenLimpio); // Cambiado a jwtService

        // Busca el tutor en la base de datos usando la instancia de UsuarioRepository
        Usuario tutor = usuarioRepository.findByUser(username);

        if (tutor == null || tutor.getUserRole() != UserRole.TUTOR) {
            return ResponseEntity.status(403).body(null); // Prohibido si no es tutor
        }

        Tutoria nuevaTutoria = tutoriaService.crearTutoria(idMateria, fechaTutoria, horaTutoria, modalidad, tutor);
        return ResponseEntity.ok(nuevaTutoria);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tutoria> obtenerTutoria(@PathVariable Long id) {
        return tutoriaService.obtenerTutoria(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tutoria> actualizarTutoria(@PathVariable Long id,
                                                     @RequestParam(required = false) Long idMateria,
                                                     @RequestParam(required = false) String fecha,
                                                     @RequestParam(required = false) String hora,
                                                     @RequestParam(required = false) Tutoria.Modalidad modalidad,
                                                     @RequestBody(required = false) Usuario usuario) {
        LocalDate fechaTutoria = fecha != null ? LocalDate.parse(fecha) : null;
        LocalTime horaTutoria = hora != null ? LocalTime.parse(hora) : null;
        Tutoria tutoriaActualizada = tutoriaService.actualizarTutoria(id, idMateria, fechaTutoria, horaTutoria, modalidad, usuario);
        return ResponseEntity.ok(tutoriaActualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarTutoria(@PathVariable Long id) {
        tutoriaService.eliminarTutoria(id);
        return ResponseEntity.noContent().build();
    }
}