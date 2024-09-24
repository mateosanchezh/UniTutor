package com.Unitutor.UniTutor.model;

import jakarta.persistence.*;
import com.Unitutor.UniTutor.model.enums.UserRole;
import com.Unitutor.UniTutor.model.enums.UserEstadoCuenta;

@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String email;
    private String contraseña;

    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @Enumerated(EnumType.STRING)
    private UserEstadoCuenta userEstadoCuenta;

    @ManyToOne
    @JoinColumn(name = "id_carrera")
    private Carrera carrera;

    private Integer semestre;

    // Getters y setters

    public String getContraseña() {
        return contraseña;
    }

    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
    }

    public UserRole getUserRole() {
        return userRole;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }

    public UserEstadoCuenta getUserEstadoCuenta() {
        return userEstadoCuenta;
    }

    public void setUserEstadoCuenta(UserEstadoCuenta userEstadoCuenta) {
        this.userEstadoCuenta = userEstadoCuenta;
    }

    public Integer getSemestre() {
        return semestre;
    }

    public void setSemestre(Integer semestre) {
        this.semestre = semestre;
    }

    public Carrera getCarrera() {
        return carrera;
    }

    public void setCarrera(Carrera carrera) {
        this.carrera = carrera;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
