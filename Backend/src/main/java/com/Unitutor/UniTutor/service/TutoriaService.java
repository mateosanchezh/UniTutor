package com.Unitutor.UniTutor.service;

import com.Unitutor.UniTutor.model.Tutoria;
import com.Unitutor.UniTutor.model.Usuario;
import com.Unitutor.UniTutor.model.Materia;
import com.Unitutor.UniTutor.model.enums.UserRole;
import com.Unitutor.UniTutor.repository.TutoriaRepository;
import com.Unitutor.UniTutor.repository.MateriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

@Service
public class TutoriaService {

    @Autowired
    private TutoriaRepository tutoriaRepository;

    @Autowired
    private MateriaRepository materiaRepository;

    public Tutoria crearTutoria(Long idMateria, LocalDate fecha, LocalTime hora, Tutoria.Modalidad modalidad, Usuario tutor) {
        // Validar que el tutor es realmente un tutor
        if (tutor.getUserRole() != UserRole.TUTOR) {
            throw new IllegalArgumentException("Solo los tutores pueden crear tutorías");
        }

        Materia materia = materiaRepository.findById(idMateria)
                .orElseThrow(() -> new IllegalArgumentException("Materia no encontrada"));

        Tutoria nuevaTutoria = new Tutoria();
        nuevaTutoria.setTutor(tutor);
        nuevaTutoria.setMateria(materia);
        nuevaTutoria.setFecha(fecha);
        nuevaTutoria.setHora(hora);
        nuevaTutoria.setModalidad(modalidad);

        return tutoriaRepository.save(nuevaTutoria);
    }

    public Optional<Tutoria> obtenerTutoria(Long id) {
        return tutoriaRepository.findById(id);
    }

    public Tutoria actualizarTutoria(Long id, Long idMateria, LocalDate fecha, LocalTime hora, Tutoria.Modalidad modalidad, Usuario usuario) {
        Tutoria tutoria = tutoriaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Tutoría no encontrada"));

        if (idMateria != null) {
            Materia materia = materiaRepository.findById(idMateria)
                    .orElseThrow(() -> new IllegalArgumentException("Materia no encontrada"));
            tutoria.setMateria(materia);
        }
        if (fecha != null) tutoria.setFecha(fecha);
        if (hora != null) tutoria.setHora(hora);
        if (modalidad != null) tutoria.setModalidad(modalidad);
        if (usuario != null && usuario.getUserRole() == UserRole.TUTOR) tutoria.setTutor(usuario);

        return tutoriaRepository.save(tutoria);
    }

    public void eliminarTutoria(Long id) {
        tutoriaRepository.deleteById(id);
    }
}