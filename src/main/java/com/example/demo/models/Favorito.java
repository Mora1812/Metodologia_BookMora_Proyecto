package com.example.demo.models;

import java.util.Date;

// Modelo de Favorito - relaciona cuentos con favoritos del usuario
public class Favorito {

    private int favoId;             // FAVO_ID
    private Date favoFechaGuardado; // FAVO_FECHA_GUARDADO
    private int cuentoId;           // FK - CUENTO

    // Constructor por defecto
    public Favorito() {
    }

    public int getFavoId() {
        return favoId;
    }

    public void setFavoId(int favoId) {
        this.favoId = favoId;
    }

    public Date getFavoFechaGuardado() {
        return favoFechaGuardado;
    }

    public void setFavoFechaGuardado(Date favoFechaGuardado) {
        this.favoFechaGuardado = favoFechaGuardado;
    }

    public int getCuentoId() {
        return cuentoId;
    }

    public void setCuentoId(int cuentoId) {
        this.cuentoId = cuentoId;
    }
}
