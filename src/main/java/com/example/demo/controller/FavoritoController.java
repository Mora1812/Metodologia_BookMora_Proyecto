package com.example.demo.controller;

import com.example.demo.models.Favorito;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

// Controlador REST para gestionar Favoritos
@RestController
public class FavoritoController {

    // Lista en memoria para almacenar favoritos
    private List<Favorito> listaFavorito = new ArrayList<>();

    // GET: Mostrar todos los favoritos
    @GetMapping("/listarFavorito")
    public List<Favorito> listar() {
        return listaFavorito;
    }

    // GET: Buscar un favorito específico por ID
    @GetMapping("/favorito/{id}")
    public Favorito buscar(@PathVariable int id) {
        for (Favorito f : listaFavorito) {
            if (f.getFavoId() == id) {
                return f;
            }
        }
        return null;
    }

    // POST: Insertar un nuevo favorito
    @PostMapping("/agregarFavorito")
    public Favorito agregar(@RequestBody Favorito favorito) {
        listaFavorito.add(favorito);
        return favorito;
    }

    // DELETE: Eliminar un favorito por ID
    @DeleteMapping("/favorito/{id}")
    public String eliminar(@PathVariable int id) {
        for (int i = 0; i < listaFavorito.size(); i++) {
            if (listaFavorito.get(i).getFavoId() == id) {
                listaFavorito.remove(i);
                return "Favorito eliminado";
            }
        }
        return "Favorito no encontrado";
    }

    // GET: Filtrar favoritos por cuentoId usando for
    @GetMapping("/filtrarFavorito")
    public List<Favorito> filtrar(@RequestParam(required = false) Integer cuentoId) {
        List<Favorito> resultado = new ArrayList<>();
        for (Favorito f : listaFavorito) {
            if (cuentoId != null && f.getCuentoId() == cuentoId) {
                resultado.add(f);
            }
        }
        return resultado;
    }
}
