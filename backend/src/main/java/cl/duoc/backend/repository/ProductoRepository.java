package cl.duoc.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import cl.duoc.backend.model.EnumCategoria;
import cl.duoc.backend.model.Producto;

@Repository 
public interface ProductoRepository extends JpaRepository<Producto,Long> {

    // Listar
    public List<Producto> findAllByNombre(String nombre);

    public List<Producto> findAllByCategoria(EnumCategoria categoria);

    // Buscar
    public Producto findByNombre(String nombre);

    public Producto findByCodigo(String codigo);

    // Eliminar
    @Transactional
    @Modifying
    public void deleteByCodigo(String codigo);

}