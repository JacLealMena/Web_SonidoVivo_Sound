package cl.duoc.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@NoArgsConstructor 
@AllArgsConstructor 
@Entity 
@Table (name = "productos")
public class Producto {

    @Id
    public Long id;

    @Column(nullable = false)
    public String codigo;

    @Column(nullable = false)
    public String nombre;

    @Column(nullable = false) 
    @Enumerated(EnumType.STRING)
    public EnumCategoria categoria;

    @Column(nullable = true)
    public String descripcion;

    @Column(nullable = false)
    public int precio;

    @Column(nullable = false)
    public int stock;

    @Column(nullable = true)
    public int stockCritico;

    @Column(name = "imagen", nullable = true, length = 1000)
    public String imagen;

}
