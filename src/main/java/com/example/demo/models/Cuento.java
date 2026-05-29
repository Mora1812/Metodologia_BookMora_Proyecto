package com.example.demo.models;

import java.util.Date;

// Modelo de Cuento - representa un cuento del proyecto BookMora
public class Cuento {

    private int cuentoId;           // CUEN_ID
    private String cuentoTitulo;    // CUEN_TITULO
    private String cuentoDescripcion;  // CUEN_DESCRIPCION
    private String cuentoContenido;    // CUEN_CONTENIDO
    private Date cuentoFechaPublicacion; // CUEN_FECHA_PUBLICACION
    private int autoId;             // FK - AUTOR
    private int categId;            // FK - CATEGORIA

    // Constructor por defecto
    public Cuento() {
    }

    public int getCuentoId() {
        return cuentoId;
    }

    public void setCuentoId(int cuentoId) {
        this.cuentoId = cuentoId;
    }

    public String getCuentoTitulo() {
        return cuentoTitulo;
    }

    public void setCuentoTitulo(String cuentoTitulo) {
        this.cuentoTitulo = cuentoTitulo;
    }

    public String getCuentoDescripcion() {
        return cuentoDescripcion;
    }

    public void setCuentoDescripcion(String cuentoDescripcion) {
        this.cuentoDescripcion = cuentoDescripcion;
    }

    public String getCuentoContenido() {
        return cuentoContenido;
    }

    public void setCuentoContenido(String cuentoContenido) {
        this.cuentoContenido = cuentoContenido;
    }

    public Date getCuentoFechaPublicacion() {
        return cuentoFechaPublicacion;
    }

    public void setCuentoFechaPublicacion(Date cuentoFechaPublicacion) {
        this.cuentoFechaPublicacion = cuentoFechaPublicacion;
    }

    public int getAutoId() {
        return autoId;
    }

    public void setAutoId(int autoId) {
        this.autoId = autoId;
    }

    public int getCategId() {
        return categId;
    }

    public void setCategId(int categId) {
        this.categId = categId;
    }
}
