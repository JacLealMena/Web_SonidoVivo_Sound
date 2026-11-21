package cl.duoc.backend.service;

import java.util.List;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import cl.duoc.backend.dto.UsuarioRequest;
import cl.duoc.backend.dto.UsuarioResponse;
import cl.duoc.backend.model.EnumRol;
import cl.duoc.backend.model.Usuario;
import cl.duoc.backend.repository.UsuarioRepository;

@Service
public class UsuarioService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Usuario> listar() {
        return usuarioRepository.findAll();
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    public Usuario buscarPorEmail(String email) {
        return usuarioRepository.findByEmailIgnoreCase(email).orElse(null);
    }

    public Usuario registrar(UsuarioRequest request) {
        if (usuarioRepository.existsByEmailIgnoreCase(request.email())) {
            throw new IllegalArgumentException("Ya existe una cuenta con ese correo");
        }
        Usuario usuario = new Usuario();
        usuario.setNombre(request.nombre().trim());
        usuario.setEmail(request.email().trim().toLowerCase());
        usuario.setPassword(passwordEncoder.encode(request.password()));
        usuario.setRol(EnumRol.CLIENTE);
        usuario.setActivo(true);
        return usuarioRepository.save(usuario);
    }

    public Usuario crear(UsuarioRequest request) {
        if (usuarioRepository.existsByEmailIgnoreCase(request.email())) {
            throw new IllegalArgumentException("Ya existe una cuenta con ese correo");
        }
        Usuario usuario = new Usuario();
        usuario.setNombre(request.nombre().trim());
        usuario.setEmail(request.email().trim().toLowerCase());
        usuario.setPassword(passwordEncoder.encode(request.password()));
        usuario.setRol(request.rol() == null ? EnumRol.CLIENTE : request.rol());
        usuario.setActivo(request.activo() == null || request.activo());
        return usuarioRepository.save(usuario);
    }

    public Usuario actualizar(Long id, UsuarioRequest request) {
        Usuario usuario = usuarioRepository.findById(id).orElse(null);
        if (usuario == null) return null;

        if (request.email() != null
                && !request.email().equalsIgnoreCase(usuario.getEmail())
                && usuarioRepository.existsByEmailIgnoreCase(request.email())) {
            throw new IllegalArgumentException("Ya existe una cuenta con ese correo");
        }

        if (request.nombre() != null) usuario.setNombre(request.nombre().trim());
        if (request.email() != null) usuario.setEmail(request.email().trim().toLowerCase());
        if (request.password() != null && !request.password().isBlank()) {
            usuario.setPassword(passwordEncoder.encode(request.password()));
        }
        if (request.rol() != null) usuario.setRol(request.rol());
        if (request.activo() != null) usuario.setActivo(request.activo());
        return usuarioRepository.save(usuario);
    }

    public void eliminar(Long id) {
        usuarioRepository.deleteById(id);
    }

    public UsuarioResponse toResponse(Usuario usuario) {
        return new UsuarioResponse(usuario.getId(), usuario.getNombre(), usuario.getEmail(), usuario.getRol(), usuario.isActivo());
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
        if (!usuario.isActivo()) {
            throw new UsernameNotFoundException("Usuario desactivado");
        }
        return User.withUsername(usuario.getEmail())
                .password(usuario.getPassword())
                .roles(usuario.getRol().getValor().toUpperCase())
                .build();
    }
}
