package com.Unitutor.UniTutor.repository;

import com.Unitutor.UniTutor.model.Tutoria;
import com.Unitutor.UniTutor.model.Usuario;
import com.Unitutor.UniTutor.model.Materia;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TutoriaRepository extends JpaRepository<Tutoria, Long> {

    // Buscar tutorías por tutor
    List<Tutoria> findByTutor(Usuario tutor);

    // Buscar tutorías por materia
    List<Tutoria> findByMateria(Materia materia);

    // Buscar tutorías por fecha
    List<Tutoria> findByFecha(LocalDate fecha);

    // Buscar tutorías por tutor y fecha
    List<Tutoria> findByTutorAndFecha(Usuario tutor, LocalDate fecha);

    // Buscar tutorías por materia y fecha
    List<Tutoria> findByMateriaAndFecha(Materia materia, LocalDate fecha);

    // Buscar tutorías por modalidad
    List<Tutoria> findByModalidad(Tutoria.Modalidad modalidad);

    // Buscar tutorías futuras de un tutor
    @Query("SELECT t FROM Tutoria t WHERE t.tutor = :tutor AND t.fecha >= :fecha ORDER BY t.fecha ASC")
    List<Tutoria> findFutureTutoriasByTutor(@Param("tutor") Usuario tutor, @Param("fecha") LocalDate fecha);

    // Contar el número de tutorías de un tutor en un rango de fechas
    @Query("SELECT COUNT(t) FROM Tutoria t WHERE t.tutor = :tutor AND t.fecha BETWEEN :startDate AND :endDate")
    Long countTutoriasByTutorBetweenDates(@Param("tutor") Usuario tutor, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    // Buscar tutorías por tutor, materia y rango de fechas
    @Query("SELECT t FROM Tutoria t WHERE t.tutor = :tutor AND t.materia = :materia AND t.fecha BETWEEN :startDate AND :endDate ORDER BY t.fecha ASC")
    List<Tutoria> findTutoriasByTutorAndMateriaAndDateRange(
            @Param("tutor") Usuario tutor,
            @Param("materia") Materia materia,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    // Buscar las últimas N tutorías de un tutor con paginación
    @Query("SELECT t FROM Tutoria t WHERE t.tutor = :tutor ORDER BY t.fecha DESC, t.hora DESC")
    List<Tutoria> findLastNTutoriasByTutor(@Param("tutor") Usuario tutor, Pageable pageable);
}
