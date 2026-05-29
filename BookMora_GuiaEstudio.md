# Guía de Estudio – BookMora API REST
### Proyecto Spring Boot | Metodología de Software | ISER | Mayo 2026

---

## Cómo usar esta guía

Cada sección corresponde a una diapositiva de la presentación. Te dice **qué contiene**, **qué debes saber**, **qué decir en voz alta** y **qué puede preguntarte el profesor** con respuestas sugeridas.

---

## Diapositiva 1 – Portada

### Qué contiene
Nombre del proyecto (BookMora), nombre del estudiante, materia (Metodología de Software), institución (ISER) y fecha (Mayo 2026).

### Qué debes saber
Preparar una presentación personal breve y segura.

### Qué decir
> "Buenos días/tardes. Mi nombre es María José Mora Mora. El proyecto que voy a presentar se llama **BookMora**: una API REST desarrollada con Spring Boot que permite gestionar autores, categorías, cuentos y favoritos mediante operaciones HTTP. La presentación está organizada siguiendo la metodología Scrum."

### Posibles preguntas del profesor

**¿Qué significa API REST?**
> Una API REST (Representational State Transfer) es un conjunto de endpoints web que siguen convenciones HTTP para exponer datos y operaciones. En este proyecto, los clientes hacen peticiones GET, POST y DELETE a URLs específicas y reciben respuestas en formato JSON.

**¿Por qué eligieron Spring Boot?**
> Spring Boot permite crear APIs REST en Java de forma rápida, con configuración mínima. Tiene integración directa con el servidor Tomcat embebido y simplifica la serialización a JSON con Jackson de forma automática.

---

## Diapositiva 2 – Agenda

### Qué contiene
Lista de los 9 grandes temas de la presentación, numerados y organizados en dos columnas.

### Qué decir
> "La presentación está organizada en los siguientes bloques: primero explico la metodología de trabajo Scrum, luego los requerimientos del sistema, los diagramas de modelado (casos de uso, MER y clases), la estructura del proyecto en código, el modelo de tabla, cada uno de los endpoints implementados, y finalmente las conclusiones."

### Posibles preguntas del profesor

**¿Cuánto tiempo tomó desarrollar el proyecto?**
> Se trabajó en un Sprint de aproximadamente 2 semanas, que incluye el diseño, desarrollo e implementación de los 16 endpoints de las 4 entidades.

---

## Diapositiva 3 – Metodología Scrum

### Qué contiene
Definición de Scrum, tabla con los 3 roles principales (Product Owner, Scrum Master, Dev Team) y las 5 fases del Sprint destacando el ciclo de desarrollo.

### Qué debes saber
- **Scrum** es un framework ágil para gestionar proyectos de software de forma iterativa.
- Un **Sprint** es un período de tiempo fijo (1-4 semanas) en el que se desarrolla un incremento funcional.
- El **Product Backlog** es la lista priorizada de todo lo que se quiere construir.
- El **Sprint Backlog** es lo que se compromete a hacer en el Sprint actual.
- La **Retrospectiva** es la reunión donde el equipo reflexiona sobre cómo mejorar.

### Qué decir
> "Para organizar el desarrollo del proyecto usamos Scrum, que es un framework ágil. En Scrum hay tres roles: el Product Owner que define qué se desarrolla, el Scrum Master que facilita el proceso, y el equipo de desarrollo. El trabajo se organiza en Sprints. En este proyecto trabajamos en un único Sprint de 2 semanas cuyo objetivo era entregar la API REST completa y funcional."

### Posibles preguntas del profesor

**¿Qué es un Sprint?**
> Un Sprint es un ciclo de tiempo fijo, generalmente de 1 a 4 semanas, al final del cual se entrega un incremento funcional del producto. Tiene planificación al inicio y revisión al final.

**¿Cuál era el objetivo del Sprint en este proyecto?**
> El objetivo era implementar los 4 controladores REST con operaciones CRUD (listar, buscar, agregar, eliminar y filtrar) para las entidades Autor, Categoria, Cuento y Favorito.

**¿Qué diferencia hay entre Product Backlog y Sprint Backlog?**
> El Product Backlog contiene todos los requerimientos del sistema priorizados. El Sprint Backlog es el subconjunto de esos requerimientos que el equipo se compromete a completar durante el Sprint actual.

---

## Diapositiva 4 – Requerimientos del Sistema

### Qué contiene
Tabla con 7 requerimientos funcionales (RF-01 a RF-07), cada uno con nombre y descripción.

### Qué debes saber
Los requerimientos funcionales describen **qué debe hacer** el sistema. No cómo lo hace internamente.

| ID | Lo que implica |
|----|---------------|
| RF-01 a RF-04 | Cada entidad tiene sus propios endpoints CRUD |
| RF-05 | El GET con `{id}` en la URL busca un objeto específico |
| RF-06 | El GET con `?param=valor` filtra por atributo |
| RF-07 | Todo se comunica vía HTTP con respuestas JSON |

### Qué decir
> "El sistema tiene 7 requerimientos funcionales. Los 4 primeros cubren la gestión completa de cada entidad: Autor, Categoría, Cuento y Favorito. El RF-05 y RF-06 especifican cómo buscar registros, ya sea por ID o filtrando por atributos. El RF-07 establece que toda la comunicación debe hacerse a través de la API REST con HTTP."

### Posibles preguntas del profesor

**¿Qué diferencia hay entre un requerimiento funcional y uno no funcional?**
> Un requerimiento funcional describe una funcionalidad concreta del sistema (qué hace). Un requerimiento no funcional describe cómo debe comportarse (rendimiento, seguridad, disponibilidad). Por ejemplo: RF-05 dice "buscar por ID" (funcional); "la respuesta debe ser en menos de 200ms" sería no funcional.

**¿Por qué no hay un requerimiento de base de datos?**
> En este Sprint se priorizó implementar la lógica de la API con almacenamiento en memoria. La persistencia en base de datos sería un requerimiento para un Sprint futuro.

---

## Diapositiva 5 – Diagrama de Casos de Uso

### Qué contiene
Un actor (Usuario) conectado a 5 óvalos que representan los casos de uso, y una tabla que mapea cada caso de uso a sus endpoints y métodos HTTP.

### Qué debes saber
- Un **actor** es quien interactúa con el sistema (puede ser persona o sistema externo).
- Un **caso de uso** es una funcionalidad que el actor puede ejecutar.
- Los óvalos representan casos de uso, los palitos representan actores, y las líneas representan la relación "el actor puede realizar este caso".

### Qué decir
> "El diagrama de casos de uso muestra qué puede hacer el usuario con el sistema. El único actor es el Usuario, que puede realizar 5 operaciones: listar todos los registros, buscar uno específico por ID, insertar uno nuevo, eliminarlo, y filtrar por atributo. Cada uno de estos casos de uso corresponde a uno o más endpoints HTTP."

### Posibles preguntas del profesor

**¿Qué es un actor en un diagrama de casos de uso?**
> Un actor es cualquier entidad externa que interactúa con el sistema. Puede ser una persona (usuario final), otro sistema o un proceso automatizado. En este proyecto el actor es el Usuario que consume la API.

**¿Cuántos casos de uso tiene el sistema?**
> Tiene 5 casos de uso principales: listar, buscar por ID, insertar, eliminar y filtrar. Se aplican de igual forma a las 4 entidades.

**¿Qué relación existe entre los casos de uso y los endpoints?**
> Cada caso de uso se implementa como uno o más endpoints. Por ejemplo, "Buscar por ID" se implementa con `GET /autor/{id}`, `GET /cuento/{id}`, etc.

---

## Diapositiva 6 – Modelo Entidad-Relación (MER)

### Qué contiene
Cuatro entidades representadas como tablas con sus atributos (PK marcadas en rojo, FK en azul), con líneas de relación etiquetadas 1:N.

### Qué debes saber
- **Entidad**: objeto del mundo real con atributos propios (Autor, Categoria, Cuento, Favorito).
- **PK (Primary Key)**: campo que identifica de forma única un registro.
- **FK (Foreign Key)**: campo que referencia la PK de otra entidad.
- **Relación 1:N**: un registro de una entidad se relaciona con muchos de otra.

Relaciones del proyecto:
- Un `Autor` puede tener muchos `Cuento` → `autoId` en Cuento es FK
- Una `Categoria` puede tener muchos `Cuento` → `categId` en Cuento es FK
- Un `Cuento` puede estar en muchos `Favorito` → `cuentoId` en Favorito es FK

### Qué decir
> "El MER muestra cómo se relacionan las entidades. Tenemos 4 entidades principales. La entidad Cuento tiene dos claves foráneas: autoId que referencia a Autor, y categId que referencia a Categoria. La entidad Favorito tiene una FK cuentoId que apunta a Cuento. Todas las relaciones son de uno a muchos (1:N)."

### Posibles preguntas del profesor

**¿Cuál es la diferencia entre el MER y el Diagrama de Clases?**
> El MER modela los **datos** y sus relaciones desde la perspectiva de la base de datos (entidades, atributos, claves). El Diagrama de Clases modela la **lógica del sistema** desde la perspectiva del código (clases, métodos, tipos de datos, relaciones de herencia/composición).

**¿Por qué Cuento tiene dos FK?**
> Porque un cuento pertenece a un autor (quien lo escribió) y a una categoría (su género o tipo). Necesita ambas referencias para modelar correctamente esas dos relaciones.

**¿Qué pasa si se elimina un Autor que tiene Cuentos asociados?**
> Con la implementación actual en memoria, no hay validación. En una base de datos real se definiría una restricción de integridad referencial (ON DELETE CASCADE o RESTRICT) para manejar ese caso.

---

## Diapositiva 7 – Diagrama de Clases

### Qué contiene
Las 4 clases Java (Autor, Categoria, Cuento, Favorito) con sus atributos privados (en Courier New con `-`) y métodos públicos (con `+`), al estilo UML.

### Qué debes saber
- En UML, `-` significa `private` y `+` significa `public`.
- Un **POJO** (Plain Old Java Object) es una clase simple con atributos, getters y setters, sin lógica de negocio.
- Los **getters** retornan el valor de un atributo (`getNombre(): String`).
- Los **setters** asignan el valor de un atributo (`setNombre(String)`).

### Qué decir
> "El diagrama de clases muestra cómo están codificadas las entidades en Java. Todas son POJOs: tienen atributos privados y métodos públicos de acceso (getters y setters). Por ejemplo, la clase Autor tiene los atributos idAutor, nombre y email, con sus respectivos getters y setters. La clase Cuento es la más compleja porque tiene 7 atributos incluyendo las dos claves foráneas."

### Posibles preguntas del profesor

**¿Qué es un getter y un setter? ¿Por qué se usan?**
> Un getter (`getNombre()`) permite leer el valor de un atributo privado desde fuera de la clase. Un setter (`setNombre(String)`) permite modificarlo. Se usan para encapsular los atributos: se protegen con `private` y se controla el acceso con métodos públicos.

**¿Por qué los atributos son `private`?**
> Por encapsulamiento, uno de los principios de la Programación Orientada a Objetos. Los atributos privados no pueden modificarse directamente desde otras clases; solo a través de los métodos públicos definidos.

**¿Estas clases tienen herencia?**
> No. En este proyecto todas las entidades son independientes. No hay una clase padre común porque no comparten comportamiento genérico que justifique herencia.

---

## Diapositiva 8 – Estructura del Proyecto

### Qué contiene
Un árbol de carpetas del proyecto en bloque de código a la izquierda, y una tabla que describe cada capa a la derecha.

### Qué debes saber
```
src/main/java/com/example/demo/
├── controller/   → Recibe peticiones HTTP
├── models/       → Define la estructura de los datos
└── DemoApplication.java  → Punto de entrada
```

- `@SpringBootApplication` en DemoApplication arranca todo el contexto de Spring.
- `pom.xml` define las dependencias del proyecto (Spring Web, etc.).
- `application.properties` puede configurar el puerto (por defecto 8080).

### Qué decir
> "El proyecto sigue una arquitectura MVC simplificada. Los modelos definen la estructura de los datos. Los controladores reciben las peticiones HTTP y devuelven respuestas JSON. No hay capa de repositorio porque usamos listas en memoria en lugar de una base de datos. La clase principal DemoApplication con la anotación @SpringBootApplication inicia el servidor en el puerto 8080."

### Posibles preguntas del profesor

**¿Qué hace la anotación `@SpringBootApplication`?**
> Es una anotación combinada que equivale a `@Configuration` + `@EnableAutoConfiguration` + `@ComponentScan`. Le dice a Spring que configure automáticamente el contexto, busque componentes en el paquete actual y registre los beans necesarios.

**¿Por qué no hay una capa de servicio (Service)?**
> En proyectos simples con lógica mínima, el controlador puede manejar directamente la lógica. En un sistema real se añadiría una capa Service para separar la lógica de negocio de la lógica HTTP, facilitando las pruebas y el mantenimiento.

**¿Dónde están almacenados los datos?**
> En listas `ArrayList` dentro de cada controlador. Son variables de instancia, por lo que los datos persisten mientras el servidor está activo, pero se pierden al reiniciarlo. Para persistencia real se usaría JPA con una base de datos.

---

## Diapositiva 9 – Modelo de Tabla: Autor

### Qué contiene
Tabla con los 3 campos de `Autor` (idAutor, nombre, email) con su tipo Java, nombre de columna en BD, restricciones y descripción. Debajo, el código Java completo de la clase.

### Qué debes saber
| Campo | Tipo | Restricción |
|-------|------|-------------|
| `idAutor` | `int` | PK – identifica unívocamente al autor |
| `nombre` | `String` | NOT NULL – siempre debe tener nombre |
| `email` | `String` | UNIQUE – no puede repetirse |

### Qué decir
> "La entidad Autor tiene 3 campos. El idAutor es la clave primaria de tipo entero. El nombre es obligatorio. El email debería ser único para cada autor. En la implementación Java esto se refleja como atributos privados con sus getters y setters correspondientes. Spring Boot convierte automáticamente esta clase a JSON cuando se retorna en un endpoint."

### Posibles preguntas del profesor

**¿Qué es una clave primaria (PK)?**
> Es un campo o conjunto de campos que identifica de forma única cada registro en una tabla. No puede ser nulo ni repetirse. En este caso `idAutor` cumple ese rol.

**¿Cómo convierte Spring Boot el objeto Java a JSON?**
> Spring Boot usa la librería **Jackson** automáticamente. Cuando un método de controlador retorna un objeto Java, Jackson lo serializa a JSON usando los getters de la clase (por eso deben existir). No requiere configuración extra.

**¿Qué pasaría si dos autores tienen el mismo idAutor?**
> Con la implementación actual en memoria no hay validación; ambos se agregarían a la lista. En una base de datos real la restricción PK lo impediría con un error de integridad.

---

## Diapositiva 10 – GET: Buscar Objeto Específico

### Qué contiene
Tabla con los detalles del endpoint (método, URL, parámetro, retorno, código HTTP), código Java del método `buscar()` y ejemplo de respuesta JSON.

### Qué debes saber
- **`@GetMapping("/autor/{id}")`**: mapea peticiones GET a esa URL.
- **`@PathVariable int id`**: extrae el valor `{id}` de la URL y lo inyecta como parámetro.
- El método recorre la lista con un `for` buscando el ID. Si lo encuentra, retorna el objeto. Si no, retorna `null`.

**Ejemplo de llamada:** `GET http://localhost:8080/autor/1`

### Qué decir
> "Este endpoint recibe un ID en la URL, por ejemplo /autor/1. Recorre la lista de autores con un for, y cuando encuentra el que tiene ese idAutor, lo retorna. Spring Boot lo convierte automáticamente a JSON. Si no lo encuentra, retorna null, y el cliente recibe un HTTP 200 con cuerpo vacío."

### Posibles preguntas del profesor

**¿Qué diferencia hay entre `@PathVariable` y `@RequestParam`?**
> `@PathVariable` extrae un valor **de la ruta** de la URL, por ejemplo `/autor/1`. `@RequestParam` extrae un valor **de los parámetros** de consulta (query string), por ejemplo `/filtrarAutor?nombre=Borges`.

**¿Qué pasa si el ID no existe?**
> El método retorna `null`. Spring Boot serializa `null` como un cuerpo de respuesta vacío con código HTTP 200. En una API de producción se retornaría un HTTP 404 con un mensaje de error usando `ResponseEntity`.

**¿Es eficiente recorrer la lista con un for?**
> Para el alcance de este proyecto es suficiente. En producción con muchos datos, se usaría una base de datos con índices en la PK, que permite buscar en O(1) o O(log n) en lugar de O(n).

---

## Diapositiva 11 – GET: Mostrar Lista Completa

### Qué contiene
Tabla del endpoint de listado, código del método `listar()` y ejemplo de respuesta JSON como array.

### Qué debes saber
- **`@GetMapping("/listarAutor")`**: no necesita parámetros.
- Retorna directamente `listaAutor` (un `List<Autor>`).
- Jackson convierte la lista a un array JSON `[...]`.
- Si la lista está vacía, retorna `[]`.

**Endpoints de lista disponibles:**
- `GET /listarAutor`
- `GET /listarCategoria`
- `GET /listarCuento`
- `GET /listarFavorito`

### Qué decir
> "Este es el endpoint más simple: no recibe parámetros y retorna todos los registros de la lista. Spring Boot convierte la lista de Java a un array JSON automáticamente. Si no se ha insertado ningún autor, retorna un array vacío. Tenemos este mismo patrón para las 4 entidades."

### Posibles preguntas del profesor

**¿Cuál es la diferencia entre GET /listarAutor y GET /autor/{id}?**
> `/listarAutor` retorna **todos** los autores en un array. `/autor/{id}` retorna **uno solo**, identificado por su ID.

**¿Qué código HTTP retorna si la lista está vacía?**
> Retorna HTTP 200 OK con un cuerpo `[]` (array vacío). No es un error; simplemente no hay datos todavía.

---

## Diapositiva 12 – POST: Insertar Registro

### Qué contiene
Tabla del endpoint POST, código del método `agregar()`, ejemplo del body JSON a enviar y la respuesta que retorna.

### Qué debes saber
- **`@PostMapping("/agregarAutor")`**: mapea peticiones POST.
- **`@RequestBody Autor autor`**: Spring Boot deserializa el JSON del body a un objeto `Autor`.
- El método agrega el objeto a la lista y lo retorna (confirmación).
- El cliente debe enviar el JSON en el **body** de la petición, no en la URL.

**Header necesario en la petición:**
```
Content-Type: application/json
```

### Qué decir
> "Para insertar un nuevo autor, el cliente hace una petición POST a /agregarAutor y envía los datos del autor en el body como JSON. La anotación @RequestBody hace que Spring Boot convierta ese JSON automáticamente al objeto Java Autor. Luego lo agregamos a la lista y lo retornamos como confirmación de que fue guardado."

### Posibles preguntas del profesor

**¿Qué es `@RequestBody`?**
> Es una anotación que le dice a Spring Boot que debe leer el cuerpo de la petición HTTP y deserializarlo (convertirlo) a un objeto Java. Jackson hace esa conversión automáticamente.

**¿Qué diferencia hay entre POST y PUT?**
> POST se usa para **crear** un nuevo recurso. PUT se usa para **actualizar** un recurso existente (reemplazarlo completamente). En este proyecto solo se implementó POST para insertar, no se implementó actualización.

**¿Por qué el POST retorna el mismo objeto que recibió?**
> Es una práctica común para confirmar al cliente exactamente lo que fue guardado, incluyendo cualquier modificación que el servidor haya hecho (como asignar un ID generado automáticamente). En este caso el servidor no modifica nada, pero es buena práctica retornarlo.

---

## Diapositiva 13 – DELETE: Eliminar Objeto

### Qué contiene
Tabla del endpoint DELETE, código del método `eliminar()` con su lógica de for, y tabla con los dos posibles escenarios de respuesta.

### Qué debes saber
- **`@DeleteMapping("/autor/{id}")`**: mapea peticiones HTTP DELETE a esa URL.
- El método recorre la lista con un `for` indexado (no foreach) para poder usar `remove(i)`.
- Retorna un `String`: `"Autor eliminado"` o `"Autor no encontrado"`.
- En ambos casos el código HTTP es 200 OK.

**Ejemplo:** `DELETE http://localhost:8080/autor/1`

### Qué decir
> "Para eliminar un autor, se hace una petición DELETE con el ID en la URL. El método recorre la lista por índice, y cuando encuentra el autor con ese ID, lo elimina con remove(i) y retorna el mensaje 'Autor eliminado'. Si no lo encuentra, retorna 'Autor no encontrado'. Ambas respuestas son HTTP 200."

### Posibles preguntas del profesor

**¿Por qué se usa un `for` con índice en lugar de un foreach?**
> Porque necesitamos llamar a `listaAutor.remove(i)` con el índice para eliminar el elemento. Con un foreach (enhanced for) no tenemos acceso al índice directamente, y además modificar la lista mientras se itera con foreach lanzaría `ConcurrentModificationException`.

**¿Qué código HTTP debería retornar si el objeto no existe?**
> En REST estándar debería ser **HTTP 404 Not Found**. En este proyecto se retorna 200 con un mensaje de texto. Para una API más robusta se usaría `ResponseEntity<String>` para controlar el código de estado.

**¿Qué pasa con los Cuentos que tenían ese Autor si se elimina el Autor?**
> Con la implementación actual en memoria, nada: los Cuentos siguen existiendo con su `autoId` que ya no apunta a ningún Autor válido. En una base de datos real con FK, esto dependería de la política definida (CASCADE, RESTRICT, SET NULL).

---

## Diapositiva 14 – Conclusiones

### Qué contiene
Tres bloques de conclusiones: Logros del Sprint, Tecnologías usadas y Aprendizajes clave.

### Qué decir
> "Para cerrar, en este Sprint logramos implementar una API REST completa con Spring Boot. Desarrollamos 16 endpoints para 4 entidades, siguiendo una arquitectura MVC con modelos y controladores separados. Las tecnologías principales fueron Java, Spring Boot y Maven. Los aprendizajes más importantes fueron el uso de anotaciones REST como @GetMapping, @PostMapping y @DeleteMapping, y cómo Spring Boot maneja automáticamente la conversión a JSON. Quedo abierta a preguntas."

### Resumen de logros para tener en mente

| Entidad | Listar | Buscar | Agregar | Eliminar | Filtrar |
|---------|--------|--------|---------|----------|---------|
| Autor | ✓ | ✓ | ✓ | ✓ | ✓ por nombre |
| Categoria | ✓ | ✓ | ✓ | ✓ | ✓ por nombre |
| Cuento | ✓ | ✓ | ✓ | ✓ | ✓ por autoId |
| Favorito | ✓ | ✓ | ✓ | ✓ | ✓ por cuentoId |

**Total: 20 endpoints implementados (4 entidades × 5 operaciones)**

### Posibles preguntas del profesor

**¿Qué mejorarías del proyecto en el siguiente Sprint?**
> Agregar persistencia con JPA y MySQL, implementar HTTP 404 cuando no se encuentra un recurso, agregar validaciones con `@Valid`, agregar una capa de servicio para separar la lógica, y documentar la API con Swagger/OpenAPI.

**¿Qué es Maven y para qué sirve?**
> Maven es una herramienta de gestión de dependencias y construcción de proyectos Java. En el `pom.xml` declaramos las librerías que necesitamos (como Spring Boot) y Maven las descarga automáticamente. También compila, prueba y empaqueta el proyecto con comandos como `mvn package`.

**¿Cómo probarías que los endpoints funcionan correctamente?**
> Con **Postman** o cualquier cliente HTTP. Por ejemplo: hacer POST a `/agregarAutor` con un JSON en el body, luego GET a `/listarAutor` para ver que apareció, GET a `/autor/1` para buscarlo, y DELETE a `/autor/1` para eliminarlo.

---

## Resumen rápido de todos los endpoints

| Metodo | URL | Accion |
|--------|-----|--------|
| GET | /listarAutor | Lista todos los autores |
| GET | /autor/{id} | Busca autor por ID |
| POST | /agregarAutor | Inserta nuevo autor |
| DELETE | /autor/{id} | Elimina autor por ID |
| GET | /filtrarAutor?nombre= | Filtra autores por nombre |
| GET | /listarCategoria | Lista todas las categorías |
| GET | /categoria/{id} | Busca categoría por ID |
| POST | /agregarCategoria | Inserta nueva categoría |
| DELETE | /categoria/{id} | Elimina categoría por ID |
| GET | /filtrarCategoria?nombre= | Filtra categorías por nombre |
| GET | /listarCuento | Lista todos los cuentos |
| GET | /cuento/{id} | Busca cuento por ID |
| POST | /agregarCuento | Inserta nuevo cuento |
| DELETE | /cuento/{id} | Elimina cuento por ID |
| GET | /filtrarCuento?autoId= | Filtra cuentos por autor |
| GET | /listarFavorito | Lista todos los favoritos |
| GET | /favorito/{id} | Busca favorito por ID |
| POST | /agregarFavorito | Inserta nuevo favorito |
| DELETE | /favorito/{id} | Elimina favorito por ID |
| GET | /filtrarFavorito?cuentoId= | Filtra favoritos por cuento |

---

*Guía generada para la presentación de BookMora – Metodología de Software – ISER – Mayo 2026*
