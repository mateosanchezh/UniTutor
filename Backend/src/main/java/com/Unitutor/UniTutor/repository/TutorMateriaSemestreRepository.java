package com.Unitutor.UniTutor.repository;

import com.Unitutor.UniTutor.model.TutorMateriaSemestre;
import com.Unitutor.UniTutor.model.Usuario;
import com.Unitutor.UniTutor.model.Materia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TutorMateriaSemestreRepository extends JpaRepository<TutorMateriaSemestre, Long> {
    List<TutorMateriaSemestre> findByTutor(Usuario tutor);
    List<TutorMateriaSemestre> findByMateria(Materia materia);
    List<TutorMateriaSemestre> findByTutorAndMateria(Usuario tutor, Materia materia);
    List<TutorMateriaSemestre> findBySemestre(Integer semestre);
    List<TutorMateriaSemestre> findByTutorId(Long tutorId);
}