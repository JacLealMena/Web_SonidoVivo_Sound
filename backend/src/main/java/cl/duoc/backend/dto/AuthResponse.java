package cl.duoc.backend.dto;

public record AuthResponse(
        String token,
        UsuarioResponse usuario
) {}
