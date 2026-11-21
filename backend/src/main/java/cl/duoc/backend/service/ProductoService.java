package cl.duoc.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cl.duoc.backend.model.EnumCategoria;
import cl.duoc.backend.model.Producto;
import cl.duoc.backend.repository.ProductoRepository;

@Service 
public class ProductoService {
    
    @Autowired 
    private ProductoRepository productoRepository;


    // LISTAR

    public List<Producto> listarTodo(){
        return productoRepository.findAll();
    }

    public List<Producto> listarPorNombre(String nombre){
        return productoRepository.findAllByNombre(nombre);
    }

    public List<Producto> listarPorCategoria(EnumCategoria categoria){
        return productoRepository.findAllByCategoria(categoria);
    }

    // BUSCAR

    public Producto buscarPorId(Long id){
        return productoRepository.findById(id).orElse(null);
    }

    public Producto buscarPorCodigo(String codigo){
        return productoRepository.findByCodigo(codigo);
    }

    public Producto buscarPorNombre (String nombre){
        return productoRepository.findByNombre(nombre);
    }

    // GUARDAR

    public Producto guardarProducto(Producto producto){
        return productoRepository.save(producto);
    }

    // ELIMINAR
    public void eliminarPorId(Long id){
        productoRepository.deleteById(id);
    }

    public void eliminarPorCodigo(String codigo){
        productoRepository.deleteByCodigo(codigo);
    }

    // Actualizar Todo
    public Producto actualizarProducto(Producto producto, String codigo){
        Producto productoActualizado = productoRepository.findByCodigo(codigo);

        if (productoActualizado == null) {
            return null;
        }else{
            productoActualizado.setId(producto.getId());
        }

        return productoActualizado;
    }

}
