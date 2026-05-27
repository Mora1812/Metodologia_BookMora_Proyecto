# Metodologia_BookMora_Proyecto

Proyecto Spring Boot sencillo para gestionar 4 modelos de un proyecto de biblioteca:
- `Autor`
- `Categoria`
- `Cuenta`
- `Favorito`

## Estructura del proyecto

- `src/main/java/com/example/demo/models/` → modelos Java simples con getters y setters
- `src/main/java/com/example/demo/controller/` → controladores REST que manejan las operaciones en memoria
- `src/main/java/com/example/demo/DemoApplication.java` → clase principal de Spring Boot

## Qué hace cada controlador

Cada controlador implementa:
- `GET /listarX` → lista todos los objetos del tipo X
- `GET /x/{id}` → busca un objeto específico por su ID
- `POST /agregarX` → agrega un nuevo objeto al arreglo en memoria
- `DELETE /x/{id}` → elimina un objeto por su ID
- `GET /filtrarX` → filtra la lista usando un `for` y un parámetro opcional

Ejemplos:
- `GET /listarAutor`
- `GET /autor/1`
- `POST /agregarAutor`
- `DELETE /autor/1`
- `GET /filtrarAutor?nombre=Gabriel`

## Cómo ejecutar

Desde la carpeta del proyecto:

```powershell
./mvnw.cmd clean install
./mvnw.cmd spring-boot:run
```

La aplicación iniciará en `http://localhost:8080`.

## Ejemplo de uso con curl

Insertar un autor:

```powershell
curl -X POST http://localhost:8080/agregarAutor \
  -H "Content-Type: application/json" \
  -d '{"idAutor":1,"nombre":"Gabriel","apellido":"García","email":"gabriel@example.com","pais":"Colombia"}'
```

Listar autores:

```powershell
curl http://localhost:8080/listarAutor
```

Buscar autor por ID:

```powershell
curl http://localhost:8080/autor/1
```

Eliminar autor:

```powershell
curl -X DELETE http://localhost:8080/autor/1
```

Filtrar autor por nombre:

```powershell
curl "http://localhost:8080/filtrarAutor?nombre=Gabriel"
```

## Notas

- No usa base de datos; la información se guarda solo en listas de memoria.
- El código está hecho para que puedas explicarlo fácilmente: cada método hace una sola cosa.
