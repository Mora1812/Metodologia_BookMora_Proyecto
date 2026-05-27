package com.example.demo.controller;

import com.example.demo.models.Autor;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

// Controlador REST para gestionar Autores
@RestController
public class AutorController {

    // Lista en memoria para almacenar autores
    private List<Autor> listaAutor = new ArrayList<>();

    // GET: Mostrar todos los autores
    @GetMapping("/listarAutor")
    public List<Autor> listar() {
        return listaAutor;
    }

    // GET: Buscar un autor específico por ID
    @GetMapping("/autor/{id}")
    public Autor buscar(@PathVariable int id) {
        for (Autor a : listaAutor) {
            if (a.getIdAutor() == id) {
                return a;
            }
        }
        return null;
    }

    // POST: Insertar un nuevo autor
    @PostMapping("/agregarAutor")
    public Autor agregar(@RequestBody Autor autor) {
        listaAutor.add(autor);
        return autor;
    }

    // DELETE: Eliminar un autor por ID
    @DeleteMapping("/autor/{id}")
    public String eliminar(@PathVariable int id) {
        for (int i = 0; i < listaAutor.size(); i++) {
            if (listaAutor.get(i).getIdAutor() == id) {
                listaAutor.remove(i);
                return "Autor eliminado";
            }
        }
        return "Autor no encontrado";
    }

    // GET: Filtrar autores por nombre usando for
    @GetMapping("/filtrarAutor")
    public List<Autor> filtrar(@RequestParam(required = false) String nombre) {
        List<Autor> resultado = new ArrayList<>();
        for (Autor a : listaAutor) {
            if (nombre != null && a.getNombre().equals(nombre)) {
                resultado.add(a);
            }
        }
        return resultado;
    }
}
