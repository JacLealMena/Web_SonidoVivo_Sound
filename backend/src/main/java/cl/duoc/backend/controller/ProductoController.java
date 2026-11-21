package cl.duoc.backend.controller;

import cl.duoc.backend.model.EnumCategoria;
import cl.duoc.backend.model.Producto;
import cl.duoc.backend.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    // LISTAR

    @GetMapping("/listar")
    public ResponseEntity<List<Producto>> listarTodo() {
        List<Producto> productos = productoService.listarTodo();
        if (productos.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content
        }
        return ResponseEntity.ok(productos); // 200 OK
    }

    @GetMapping("/listar/nombre/{nombre}")
    public ResponseEntity<List<Producto>> listarPorNombre(@PathVariable String nombre) {
        List<Producto> productos = productoService.listarPorNombre(nombre);
        if (productos.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content
        }
        return ResponseEntity.ok(productos); // 200 OK
    }

    @GetMapping("/listar/categoria/{categoria}")
    public ResponseEntity<List<Producto>> listarPorCategoria(@PathVariable EnumCategoria categoria) {
        List<Producto> productos = productoService.listarPorCategoria(categoria);
        if (productos.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content
        }
        return ResponseEntity.ok(productos); // 200 OK
    }

    // BUSCAR

    @GetMapping("/buscar/id/{id}")
    public ResponseEntity<Producto> buscarPorId(@PathVariable Long id) {
        Producto producto = productoService.buscarPorId(id);
        if (producto == null) {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
        return ResponseEntity.ok(producto); // 200 OK
    }

    @GetMapping("/buscar/codigo/{codigo}")
    public ResponseEntity<Producto> buscarPorCodigo(@PathVariable String codigo) {
        Producto producto = productoService.buscarPorCodigo(codigo);
        if (producto == null) {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
        return ResponseEntity.ok(producto); // 200 OK
    }

    @GetMapping("/buscar/nombre/{nombre}")
    public ResponseEntity<Producto> buscarPorNombre(@PathVariable String nombre) {
        Producto producto = productoService.buscarPorNombre(nombre);
        if (producto == null) {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
        return ResponseEntity.ok(producto); // 200 OK
    }

    // GUARDAR

    @PostMapping("/guardar")
    public ResponseEntity<Producto> guardarProducto(@RequestBody Producto producto) {
        try {
            Producto nuevoProducto = productoService.guardarProducto(producto);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoProducto); // 201 Created
        } catch (Exception e) {
            return ResponseEntity.badRequest().build(); // 400 Bad Request
        }
    }

    // ELIMINAR

    @DeleteMapping("/eliminar/id/{id}")
    public ResponseEntity<Void> eliminarPorId(@PathVariable Long id) {
        try {
            productoService.eliminarPorId(id);
            return ResponseEntity.noContent().build(); // 204 No Content
        } catch (Exception e) {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
    }

    @DeleteMapping("/eliminar/codigo/{codigo}")
    public ResponseEntity<Void> eliminarPorCodigo(@PathVariable String codigo) {
        try {
            productoService.eliminarPorCodigo(codigo);
            return ResponseEntity.noContent().build(); // 204 No Content
        } catch (Exception e) {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
    }

    // ACTUALIZAR TODO

    @PutMapping("/actualizar/codigo/{codigo}")
    public ResponseEntity<Producto> actualizarProducto(@RequestBody Producto producto, @PathVariable String codigo) {
        try {
            Producto productoActualizado = productoService.actualizarProducto(producto, codigo);
            if (productoActualizado == null) {
                return ResponseEntity.notFound().build(); // 404 Not Found
            }
            return ResponseEntity.ok(productoActualizado); // 200 OK
        } catch (Exception e) {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
    }
}