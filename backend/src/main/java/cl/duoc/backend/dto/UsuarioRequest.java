package cl.duoc.backend.dto;

import cl.duoc.backend.model.EnumRol;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UsuarioRequest(
        @NotBlank(message = "El nombre es obligatorio") String nombre,
        @NotBlank(message = "El correo es obligatorio") @Email(message = "El correo no es valido") String email,
        @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres") String password,
        EnumRol rol,
        Boolean activo
) {}
