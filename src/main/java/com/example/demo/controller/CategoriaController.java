package com.example.demo.controller;

import com.example.demo.models.Categoria;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

// Controlador REST para gestionar Categorías
@RestController
public class CategoriaController {

    // Lista en memoria para almacenar categorías
    private List<Categoria> listaCategoria = new ArrayList<>();

    // GET: Mostrar todas las categorías
    @GetMapping("/listarCategoria")
    public List<Categoria> listar() {
        return listaCategoria;
    }

    // GET: Buscar una categoría específica por ID
    @GetMapping("/categoria/{id}")
    public Categoria buscar(@PathVariable int id) {
        for (Categoria c : listaCategoria) {
            if (c.getIdCategoria() == id) {
                return c;
            }
        }
        return null;
    }

    // POST: Insertar una nueva categoría
    @PostMapping("/agregarCategoria")
    public Categoria agregar(@RequestBody Categoria categoria) {
        listaCategoria.add(categoria);
        return categoria;
    }

    // DELETE: Eliminar una categoría por ID
    @DeleteMapping("/categoria/{id}")
    public String eliminar(@PathVariable int id) {
        for (int i = 0; i < listaCategoria.size(); i++) {
            if (listaCategoria.get(i).getIdCategoria() == id) {
                listaCategoria.remove(i);
                return "Categoría eliminada";
            }
        }
        return "Categoría no encontrada";
    }

    // GET: Filtrar categorías por nombre usando for
    @GetMapping("/filtrarCategoria")
    public List<Categoria> filtrar(@RequestParam(required = false) String nombre) {
        List<Categoria> resultado = new ArrayList<>();
        for (Categoria c : listaCategoria) {
            if (nombre != null && c.getNombre().equals(nombre)) {
                resultado.add(c);
            }
        }
        return resultado;
    }
}
