package com.Unitutor.UniTutor.repository;

import com.Unitutor.UniTutor.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByUser(String user);
    Usuario findByTelefono(String telefono);
    Usuario findByEmail(String email);
}
