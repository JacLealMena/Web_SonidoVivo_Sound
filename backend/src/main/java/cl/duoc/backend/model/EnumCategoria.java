package cl.duoc.backend.model;

import com.fasterxml.jackson.annotation.JsonValue;
import com.fasterxml.jackson.annotation.JsonCreator;

public enum EnumCategoria {

    GUITARRAS_ACUSTICAS("Guitarras Acústicas"),
    GUITARRAS_ELECTRICAS("Guitarras Eléctricas"),
    BAJOS_ELECTRICOS("Bajos Eléctricos"),
    BATERIAS("Baterías"),
    TECLADOS_Y_PIANOS("Teclados y Pianos"),
    AMPLIFICADORES("Amplificadores"),
    MICROFONOS("Micrófonos"),
    PEDALES_DE_EFECTOS("Pedales de Efectos"),
    ESTUDIO_Y_GRABACION("Estudio y Grabación"),
    ACCESORIOS("Accesorios");

    private final String categoria;

    EnumCategoria(String categoria) {
        this.categoria = categoria;
    }

    @JsonValue
    public String getCategoria() {
        return categoria;
    }

    @JsonCreator
    public static EnumCategoria fromValue(String valor) {
        if (valor == null) {
            return null;
        }
        for (EnumCategoria categoria : values()) {
            if (categoria.categoria.equalsIgnoreCase(valor.trim())
                    || categoria.name().equalsIgnoreCase(valor.trim())) {
                return categoria;
            }
        }
        throw new IllegalArgumentException("Categoria no valida: " + valor);
    }
}