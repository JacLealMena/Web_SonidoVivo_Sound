package cl.duoc.backend.security;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import cl.duoc.backend.model.Usuario;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration-ms}")
    private long expirationMs;

    private SecretKey getKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(java.nio.charset.StandardCharsets.UTF_8));
    }

    public String generateToken(Usuario usuario) {
        Date now = new Date();
        Date expiration = new Date(now.getTime() + expirationMs);
        return Jwts.builder()
                .subject(usuario.getEmail())
                .claim("rol", usuario.getRol().getValor())
                .issuedAt(now)
                .expiration(expiration)
                .signWith(getKey())
                .compact();
    }

    public String getEmail(String token) {
        return parseClaims(token).getSubject();
    }

    public boolean isTokenValid(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (Exception exception) {
            return false;
        }
    }

    private Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
