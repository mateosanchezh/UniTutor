package com.Unitutor.UniTutor.repository;

import com.Unitutor.UniTutor.model.Tutoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TutoriaRepository extends JpaRepository<Tutoria, Long> {
}

