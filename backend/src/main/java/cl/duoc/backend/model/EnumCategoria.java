package cl.duoc.backend.model;

import com.fasterxml.jackson.annotation.JsonValue;

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
}