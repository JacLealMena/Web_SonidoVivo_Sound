package cl.duoc.backend.dto;

import cl.duoc.backend.model.EnumRol;

public record UsuarioResponse(
        Long id,
        String nombre,
        String email,
        EnumRol rol,
        boolean activo
) {}
