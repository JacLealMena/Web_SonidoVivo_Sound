package cl.duoc.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cl.duoc.backend.dto.UsuarioRequest;
import cl.duoc.backend.dto.UsuarioResponse;
import cl.duoc.backend.model.Usuario;
import cl.duoc.backend.service.UsuarioService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/usuarios")
@PreAuthorize("hasRole('ADMIN')")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public ResponseEntity<List<UsuarioResponse>> listar() {
        List<UsuarioResponse> usuarios = usuarioService.listar().stream()
                .map(usuarioService::toResponse)
                .toList();
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponse> buscarPorId(@PathVariable Long id) {
        Usuario usuario = usuarioService.buscarPorId(id);
        return usuario == null
                ? ResponseEntity.notFound().build()
                : ResponseEntity.ok(usuarioService.toResponse(usuario));
    }

    @PostMapping
    public ResponseEntity<?> crear(@Valid @RequestBody UsuarioRequest request) {
        try {
            Usuario usuario = usuarioService.crear(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.toResponse(usuario));
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.badRequest().body(java.util.Map.of("mensaje", exception.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id, @RequestBody UsuarioRequest request) {
        try {
            Usuario usuario = usuarioService.actualizar(id, request);
            return usuario == null
                    ? ResponseEntity.notFound().build()
                    : ResponseEntity.ok(usuarioService.toResponse(usuario));
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.badRequest().body(java.util.Map.of("mensaje", exception.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        Usuario usuario = usuarioService.buscarPorId(id);
        if (usuario == null) return ResponseEntity.notFound().build();
        usuarioService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
