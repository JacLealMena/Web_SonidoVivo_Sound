package cl.duoc.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cl.duoc.backend.dto.AuthResponse;
import cl.duoc.backend.dto.LoginRequest;
import cl.duoc.backend.dto.UsuarioRequest;
import cl.duoc.backend.model.Usuario;
import cl.duoc.backend.security.JwtService;
import cl.duoc.backend.service.UsuarioService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UsuarioService usuarioService;
    private final JwtService jwtService;

    public AuthController(AuthenticationManager authenticationManager, UsuarioService usuarioService, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.usuarioService = usuarioService;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.email().trim().toLowerCase(), request.password()));
            Usuario usuario = usuarioService.buscarPorEmail(request.email());
            if (usuario == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            return ResponseEntity.ok(new AuthResponse(jwtService.generateToken(usuario), usuarioService.toResponse(usuario)));
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/registro")
    public ResponseEntity<?> registrar(@Valid @RequestBody UsuarioRequest request) {
        try {
            Usuario usuario = usuarioService.registrar(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new AuthResponse(jwtService.generateToken(usuario), usuarioService.toResponse(usuario)));
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.badRequest().body(java.util.Map.of("mensaje", exception.getMessage()));
        }
    }
}
