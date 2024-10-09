package com.Unitutor.UniTutor.controller;

import com.Unitutor.UniTutor.model.Usuario;
import com.Unitutor.UniTutor.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<Usuario> obtenerUsuarios() {
        return usuarioService.listarUsuarios();
    }
}
