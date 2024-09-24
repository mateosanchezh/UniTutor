package com.Unitutor.UniTutor.model;

import jakarta.persistence.*;
import com.Unitutor.UniTutor.model.enums.UserRole;
import com.Unitutor.UniTutor.model.enums.UserEstadoCuenta;

@Entity
@Table(name = "usuarios") // Se puede especificar el nombre de la tabla
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "user", nullable = false, unique = true) /
    private String user;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "contraseña", nullable = false)
    private String contraseña;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_role")
    private UserRole userRole;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_estado_cuenta")
    private UserEstadoCuenta userEstadoCuenta;

    @ManyToOne
    @JoinColumn(name = "id_carrera")
    private Carrera carrera;

    @Column(name = "semestre")
    private Integer semestre;

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

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

    public Carrera getCarrera() {
        return carrera;
    }

    public void setCarrera(Carrera carrera) {
        this.carrera = carrera;
    }

    public Integer getSemestre() {
        return semestre;
    }

    public void setSemestre(Integer semestre) {
        this.semestre = semestre;
    }
}
