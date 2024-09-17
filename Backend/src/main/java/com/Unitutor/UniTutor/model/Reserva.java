package com.Unitutor.UniTutor.model;

import jakarta.persistence.*;

@Entity
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_estudiante")
    private Usuario estudiante;

    @ManyToOne
    @JoinColumn(name = "id_tutoria")
    private Tutoria tutoria;

    @Enumerated(EnumType.STRING)
    private Estado estado;

    // Getters and setters


    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public Usuario getEstudiante() {
        return estudiante;
    }

    public void setEstudiante(Usuario estudiante) {
        this.estudiante = estudiante;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Tutoria getTutoria() {
        return tutoria;
    }

    public void setTutoria(Tutoria tutoria) {
        this.tutoria = tutoria;
    }

    public enum Estado {
        PENDIENTE, CONFIRMADA, CANCELADA
    }
}
