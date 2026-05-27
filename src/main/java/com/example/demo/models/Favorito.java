package com.example.demo.models;

// Modelo de Favorito - relaciona usuarios con libros que marcan como favoritos
public class Favorito {

    private int idFavorito;
    private int idUsuario;
    private int idLibro;
    private String fecha;

    // Constructor por defecto
    public Favorito() {
    }

    public int getIdFavorito() {
        return idFavorito;
    }

    public void setIdFavorito(int idFavorito) {
        this.idFavorito = idFavorito;
    }

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public int getIdLibro() {
        return idLibro;
    }

    public void setIdLibro(int idLibro) {
        this.idLibro = idLibro;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }
}
