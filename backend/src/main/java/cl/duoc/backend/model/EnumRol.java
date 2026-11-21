package cl.duoc.backend.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum EnumRol {

    ADMIN("admin"),
    VENDEDOR("vendedor"),
    CLIENTE("cliente");

    private final String valor;

    EnumRol(String valor) {
        this.valor = valor;
    }

    @JsonValue
    public String getValor() {
        return valor;
    }

    @JsonCreator
    public static EnumRol fromValue(String valor) {
        if (valor == null) {
            return null;
        }
        for (EnumRol rol : values()) {
            if (rol.valor.equalsIgnoreCase(valor.trim())) {
                return rol;
            }
        }
        throw new IllegalArgumentException("Rol no valido: " + valor);
    }
}
