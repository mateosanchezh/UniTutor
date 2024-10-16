package com.Unitutor.UniTutor.controller;

import com.Unitutor.UniTutor.model.Materia;
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
import java.util.List;

@RestController
@RequestMapping("/api/tutorias")
@CrossOrigin(origins = "http://localhost:5174")
public class TutoriaController {

    private final TutoriaService tutoriaService;
    private final JwtService jwtService;
    private final UsuarioRepository usuarioRepository;

    @Autowired
    public TutoriaController(TutoriaService tutoriaService, JwtService jwtService, UsuarioRepository usuarioRepository) {
        this.tutoriaService = tutoriaService;
        this.jwtService = jwtService;
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/crear")
    public ResponseEntity<?> crearTutoria(@RequestBody SolicitudTutoria solicitud,
                                          @RequestHeader("Authorization") String token) {
        try {
            String tokenLimpio = token.replace("Bearer ", "");
            String nombreUsuario = jwtService.extractUsername(tokenLimpio);
            Usuario tutor = usuarioRepository.findByUser(nombreUsuario);

            // Verificar si el usuario es un tutor
            if (tutor == null || tutor.getUserRole() != UserRole.TUTOR) {
                return ResponseEntity.status(403).body("Acceso denegado. Solo los tutores pueden crear tutorías.");
            }

            LocalDate fechaTutoria = LocalDate.parse(solicitud.getFecha());
            LocalTime horaTutoria = LocalTime.parse(solicitud.getHora());

            Tutoria nuevaTutoria = tutoriaService.crearTutoria(
                    solicitud.getIdMateria(),
                    fechaTutoria,
                    horaTutoria,
                    Tutoria.Modalidad.valueOf(solicitud.getModalidad().toUpperCase()),
                    tutor
            );

            return ResponseEntity.ok(nuevaTutoria);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al crear la tutoría: " + e.getMessage());
        }
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

    @GetMapping("/materias")
    public ResponseEntity<?> obtenerMateriasPorTutor(@RequestHeader("Authorization") String token) {
        try {
            String tokenLimpio = token.replace("Bearer ", "");
            String username = jwtService.extractUsername(tokenLimpio);
            Usuario tutor = usuarioRepository.findByUser(username);

            if (tutor != null && tutor.getUserRole() == UserRole.TUTOR) {
                Long tutorId = tutor.getId(); // Obtener el ID del tutor
                List<Materia> materias = tutoriaService.obtenerMateriasPorTutor(tutorId);
                return ResponseEntity.ok(materias);
            } else {
                return ResponseEntity.status(403).body("Acceso denegado. Solo los tutores pueden obtener las materias.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error interno del servidor: " + e.getMessage());
        }
    }
}

// Clase interna para la solicitud de creación de tutoría
class SolicitudTutoria {
    private Long idMateria;
    private String fecha;
    private String hora;
    private String modalidad;

    // Getters y setters
    public Long getIdMateria() {
        return idMateria;
    }

    public void setIdMateria(Long idMateria) {
        this.idMateria = idMateria;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getHora() {
        return hora;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }

    public String getModalidad() {
        return modalidad;
    }

    public void setModalidad(String modalidad) {
        this.modalidad = modalidad;
    }
}
