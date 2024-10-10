package com.Unitutor.UniTutor.DTO;

import com.Unitutor.UniTutor.model.enums.UserEstadoCuenta;
import com.Unitutor.UniTutor.model.enums.UserRole;

import java.util.Set;

public class UsuarioDTO {

    private Long id;
    private String nombre;
    private String apellido;
    private String user;
    private String email;
    private String telefono;
    private String password;
    private UserRole userRole;
    private UserEstadoCuenta userEstadoCuenta;
    private Long carreraId;
    private Integer semestre;
    private Set<TutorMateriaSemestreDTO> materiasAsignadas;  // Relación con materias y semestre

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

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
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

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public Long getCarreraId() {
        return carreraId;
    }

    public void setCarreraId(Long carreraId) {
        this.carreraId = carreraId;
    }

    public Integer getSemestre() {
        return semestre;
    }

    public void setSemestre(Integer semestre) {
        this.semestre = semestre;
    }

    public Set<TutorMateriaSemestreDTO> getMateriasAsignadas() {
        return materiasAsignadas;
    }

    public void setMateriasAsignadas(Set<TutorMateriaSemestreDTO> materiasAsignadas) {
        this.materiasAsignadas = materiasAsignadas;
    }
}
