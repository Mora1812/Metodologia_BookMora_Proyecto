package com.example.demo.controller;

import com.example.demo.models.Cuenta;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

// Controlador REST para gestionar Cuentas
@RestController
public class CuentaController {

    // Lista en memoria para almacenar cuentas
    private List<Cuenta> listaCuenta = new ArrayList<>();

    // GET: Mostrar todas las cuentas
    @GetMapping("/listarCuenta")
    public List<Cuenta> listar() {
        return listaCuenta;
    }

    // GET: Buscar una cuenta específica por ID
    @GetMapping("/cuenta/{id}")
    public Cuenta buscar(@PathVariable int id) {
        for (Cuenta cu : listaCuenta) {
            if (cu.getIdCuenta() == id) {
                return cu;
            }
        }
        return null;
    }

    // POST: Insertar una nueva cuenta
    @PostMapping("/agregarCuenta")
    public Cuenta agregar(@RequestBody Cuenta cuenta) {
        listaCuenta.add(cuenta);
        return cuenta;
    }

    // DELETE: Eliminar una cuenta por ID
    @DeleteMapping("/cuenta/{id}")
    public String eliminar(@PathVariable int id) {
        for (int i = 0; i < listaCuenta.size(); i++) {
            if (listaCuenta.get(i).getIdCuenta() == id) {
                listaCuenta.remove(i);
                return "Cuenta eliminada";
            }
        }
        return "Cuenta no encontrada";
    }

    // GET: Filtrar cuentas por usuario usando for
    @GetMapping("/filtrarCuenta")
    public List<Cuenta> filtrar(@RequestParam(required = false) String usuario) {
        List<Cuenta> resultado = new ArrayList<>();
        for (Cuenta cu : listaCuenta) {
            if (usuario != null && cu.getUsuario().equals(usuario)) {
                resultado.add(cu);
            }
        }
        return resultado;
    }
}
