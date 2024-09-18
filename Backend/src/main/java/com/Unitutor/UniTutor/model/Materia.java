package com.Unitutor.UniTutor.model;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Materia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @ManyToOne
    @JoinColumn(name = "id_carrera")
    private Carrera carrera;

    @OneToMany(mappedBy = "materia")
    private Set<Tutoria> tutorias;

    // Getters and setters

    public Carrera getCarrera() {
        return carrera;
    }

    public void setCarrera(Carrera carrera) {
        this.carrera = carrera;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Tutoria> getTutorias() {
        return tutorias;
    }

    public void setTutorias(Set<Tutoria> tutorias) {
        this.tutorias = tutorias;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
