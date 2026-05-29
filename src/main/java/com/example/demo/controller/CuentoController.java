package com.example.demo.controller;

import com.example.demo.models.Cuento;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

// Controlador REST para gestionar Cuentos
@RestController
public class CuentoController {

    // Lista en memoria para almacenar cuentos
    private List<Cuento> listaCuento = new ArrayList<>();

    // GET: Mostrar todos los cuentos
    @GetMapping("/listarCuento")
    public List<Cuento> listar() {
        return listaCuento;
    }

    // GET: Buscar un cuento específico por ID
    @GetMapping("/cuento/{id}")
    public Cuento buscar(@PathVariable int id) {
        for (Cuento cu : listaCuento) {
            if (cu.getCuentoId() == id) {
                return cu;
            }
        }
        return null;
    }

    // POST: Insertar un nuevo cuento
    @PostMapping("/agregarCuento")
    public Cuento agregar(@RequestBody Cuento cuento) {
        listaCuento.add(cuento);
        return cuento;
    }

    // DELETE: Eliminar un cuento por ID
    @DeleteMapping("/cuento/{id}")
    public String eliminar(@PathVariable int id) {
        for (int i = 0; i < listaCuento.size(); i++) {
            if (listaCuento.get(i).getCuentoId() == id) {
                listaCuento.remove(i);
                return "Cuento eliminado";
            }
        }
        return "Cuento no encontrado";
    }

    // GET: Filtrar cuentos por autor (autoId) usando for
    @GetMapping("/filtrarCuento")
    public List<Cuento> filtrar(@RequestParam(required = false) Integer autoId) {
        List<Cuento> resultado = new ArrayList<>();
        for (Cuento cu : listaCuento) {
            if (autoId != null && cu.getAutoId() == autoId) {
                resultado.add(cu);
            }
        }
        return resultado;
    }
}
