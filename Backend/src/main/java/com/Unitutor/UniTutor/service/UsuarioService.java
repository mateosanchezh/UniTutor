package com.Unitutor.UniTutor.service;

import com.Unitutor.UniTutor.DTO.UsuarioDTO;
import com.Unitutor.UniTutor.model.Usuario;
import com.Unitutor.UniTutor.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    public List<UsuarioDTO> listarUsuariosDTO() {
        return usuarioRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private UsuarioDTO convertToDTO(Usuario usuario) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(usuario.getId());
        dto.setNombre(usuario.getNombre());
        dto.setApellido(usuario.getApellido());
        dto.setUser(usuario.getUser());
        dto.setEmail(usuario.getEmail());
        dto.setTelefono(usuario.getTelefono());
        // No se recomienda enviar la contraseña al frontend
        // dto.setPassword(usuario.getContrasena());
        dto.setUserRole(usuario.getUserRole());
        dto.setUserEstadoCuenta(usuario.getUserEstadoCuenta());
        dto.setCarreraId(usuario.getCarrera() != null ? usuario.getCarrera().getId() : null);
        dto.setSemestre(usuario.getSemestre());
        return dto;
    }
}