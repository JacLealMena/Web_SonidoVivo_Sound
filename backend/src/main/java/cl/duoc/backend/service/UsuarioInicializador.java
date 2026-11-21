package cl.duoc.backend.service;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import cl.duoc.backend.model.EnumRol;
import cl.duoc.backend.model.Usuario;
import cl.duoc.backend.repository.UsuarioRepository;

@Component
public class UsuarioInicializador implements ApplicationRunner {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioInicializador(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(ApplicationArguments arguments) {
        crearSiNoExiste("Administrador", "admin@sonidovivo.cl", EnumRol.ADMIN);
        crearSiNoExiste("Vendedor Principal", "vendedor@sonidovivo.cl", EnumRol.VENDEDOR);
        crearSiNoExiste("Cliente Demo", "cliente@sonidovivo.cl", EnumRol.CLIENTE);
    }

    private void crearSiNoExiste(String nombre, String email, EnumRol rol) {
        if (usuarioRepository.existsByEmailIgnoreCase(email)) return;
        Usuario usuario = new Usuario();
        usuario.setNombre(nombre);
        usuario.setEmail(email);
        usuario.setPassword(passwordEncoder.encode("123456"));
        usuario.setRol(rol);
        usuario.setActivo(true);
        usuarioRepository.save(usuario);
    }
}
