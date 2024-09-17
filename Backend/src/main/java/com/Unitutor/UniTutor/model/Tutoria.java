package com.Unitutor.UniTutor.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class Tutoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_tutor")
    private Usuario tutor;

    @ManyToOne
    @JoinColumn(name = "id_materia")
    private Materia materia;

    private LocalDate fecha;
    private LocalTime hora;

    @Enumerated(EnumType.STRING)
    private Modalidad modalidad;

    // Getters and setters


    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public Modalidad getModalidad() {
        return modalidad;
    }

    public void setModalidad(Modalidad modalidad) {
        this.modalidad = modalidad;
    }

    public Usuario getTutor() {
        return tutor;
    }

    public void setTutor(Usuario tutor) {
        this.tutor = tutor;
    }

    public Materia getMateria() {
        return materia;
    }

    public void setMateria(Materia materia) {
        this.materia = materia;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalTime getHora() {
        return hora;
    }

    public void setHora(LocalTime hora) {
        this.hora = hora;
    }

    public enum Modalidad {
        VIRTUAL, PRESENCIAL
    }
}