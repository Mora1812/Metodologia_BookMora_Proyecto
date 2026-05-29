const pptxgen = require("pptxgenjs");
const path = require("path");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "BookMora - Proyecto Spring Boot";
pres.author = "Maria Jose Mora Mora";

// ─── Colores ───────────────────────────────────────────────────────────────
const C = {
  white:  "FFFFFF",
  black:  "1A1A1A",
  blue:   "2E75B6",
  blueL:  "D6E4F0",
  gray:   "F4F4F4",
  grayM:  "F0F0F0",
  grayD:  "888888",
  altRow: "F7FAFD",
};

const IMG_MER    = path.join(__dirname, "diagrama_mer.png");
const IMG_CLASES = path.join(__dirname, "diagrama_clases.jpg");

// ─── Helpers ───────────────────────────────────────────────────────────────
function addTitle(slide, text) {
  slide.addText(text, {
    x: 0.4, y: 0.18, w: 9.2, h: 0.72,
    fontSize: 30, fontFace: "Calibri", bold: true,
    color: C.black, align: "left", margin: 0,
  });
  slide.addShape(pres.shapes.LINE, {
    x: 0.4, y: 0.92, w: 9.2, h: 0,
    line: { color: C.blue, width: 2 },
  });
}

function hCell(text) {
  return { text, options: { fill: { color: C.blue }, color: C.white, bold: true, fontSize: 11, fontFace: "Calibri", align: "center", valign: "middle" } };
}
function rCell(text, alt) {
  return { text, options: { fill: { color: alt ? C.grayM : C.white }, color: C.black, fontSize: 10, fontFace: "Calibri", align: "left", valign: "middle" } };
}

function codeBlock(slide, lines, x, y, w, h) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: C.gray }, line: { color: "CCCCCC", width: 1 },
  });
  slide.addText(lines, {
    x: x + 0.12, y: y + 0.06, w: w - 0.24, h: h - 0.12,
    fontSize: 9, fontFace: "Courier New", color: C.black,
    align: "left", valign: "top", margin: 0,
  });
}

// Figura de persona (actor UML): cabeza + cuerpo + brazos + piernas
function addActor(slide, cx, cy, label) {
  const hw = 0.28; // radio cabeza
  // Cabeza
  slide.addShape(pres.shapes.OVAL, {
    x: cx - hw, y: cy, w: hw * 2, h: hw * 2,
    fill: { color: C.white }, line: { color: C.blue, width: 2 },
  });
  // Cuerpo
  slide.addShape(pres.shapes.LINE, {
    x: cx, y: cy + hw * 2, w: 0, h: 0.55,
    line: { color: C.blue, width: 2 },
  });
  // Brazo izquierdo
  slide.addShape(pres.shapes.LINE, {
    x: cx - 0.3, y: cy + hw * 2 + 0.18, w: 0.3, h: 0.18,
    line: { color: C.blue, width: 2 },
  });
  // Brazo derecho
  slide.addShape(pres.shapes.LINE, {
    x: cx, y: cy + hw * 2 + 0.18, w: 0.3, h: 0.18,
    line: { color: C.blue, width: 2 },
  });
  // Pierna izquierda
  slide.addShape(pres.shapes.LINE, {
    x: cx - 0.28, y: cy + hw * 2 + 0.55 + 0.12, w: 0.28, h: 0.3,
    line: { color: C.blue, width: 2 },
  });
  // Pierna derecha
  slide.addShape(pres.shapes.LINE, {
    x: cx, y: cy + hw * 2 + 0.55 + 0.12, w: 0.28, h: 0.3,
    line: { color: C.blue, width: 2 },
  });
  // Etiqueta
  slide.addText(label, {
    x: cx - 0.6, y: cy + hw * 2 + 1.08, w: 1.2, h: 0.3,
    fontSize: 10, fontFace: "Calibri", bold: true, color: C.black,
    align: "center", margin: 0,
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 1 – PORTADA
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.22, h: 5.625,
    fill: { color: C.blue }, line: { color: C.blue, width: 0 },
  });

  s.addText("BookMora", {
    x: 0.55, y: 0.9, w: 9, h: 1.0,
    fontSize: 52, fontFace: "Calibri", bold: true, color: C.black,
    align: "left", margin: 0,
  });
  s.addText("Plataforma Web de Cuentos Cortos", {
    x: 0.55, y: 1.95, w: 9, h: 0.5,
    fontSize: 20, fontFace: "Calibri", italic: true, color: C.blue,
    align: "left", margin: 0,
  });
  s.addText("API REST con Spring Boot", {
    x: 0.55, y: 2.45, w: 9, h: 0.42,
    fontSize: 16, fontFace: "Calibri", color: C.grayD, align: "left", margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: 0.55, y: 3.0, w: 5.5, h: 0,
    line: { color: "CCCCCC", width: 1 },
  });

  const meta = [
    { l: "Estudiante:",  v: "Maria Jose Mora Mora" },
    { l: "Docente:",     v: "Carlos Sneider Rodriguez" },
    { l: "Asignatura:",  v: "Metodologias de Desarrollo de Software" },
    { l: "Institucion:", v: "ISER - Pamplona, Norte de Santander" },
    { l: "Fecha:",       v: "Mayo 2026" },
  ];
  meta.forEach((m, i) => {
    s.addText([
      { text: m.l + "  ", options: { bold: true, color: C.black } },
      { text: m.v,        options: { color: C.grayD } },
    ], {
      x: 0.55, y: 3.1 + i * 0.38, w: 9, h: 0.34,
      fontSize: 12, fontFace: "Calibri", align: "left", margin: 0,
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 2 – AGENDA
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  addTitle(s, "Agenda");

  const temas = [
    ["01", "Metodología Scrum"],
    ["02", "Requerimientos del sistema"],
    ["03", "Diagrama de Casos de Uso"],
    ["04", "Modelo Entidad-Relación (MER)"],
    ["05", "Diagrama de Clases UML"],
    ["06", "Estructura del proyecto"],
    ["07", "Modelo de Tabla: Cuento"],
    ["08", "Endpoints GET, POST, DELETE"],
    ["09", "Conclusiones"],
  ];

  const col1 = temas.slice(0, 5);
  const col2 = temas.slice(5);

  [col1, col2].forEach((col, ci) => {
    col.forEach((t, i) => {
      const xBase = ci === 0 ? 0.4 : 5.2;
      const yBase = 1.1 + i * 0.82;
      s.addShape(pres.shapes.RECTANGLE, {
        x: xBase, y: yBase, w: 0.52, h: 0.52,
        fill: { color: C.blue }, line: { color: C.blue, width: 0 },
      });
      s.addText(t[0], {
        x: xBase, y: yBase, w: 0.52, h: 0.52,
        fontSize: 13, fontFace: "Calibri", bold: true, color: C.white,
        align: "center", valign: "middle", margin: 0,
      });
      s.addText(t[1], {
        x: xBase + 0.62, y: yBase + 0.1, w: 4.0, h: 0.34,
        fontSize: 13, fontFace: "Calibri", color: C.black,
        align: "left", margin: 0,
      });
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 3 – SCRUM
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  addTitle(s, "Metodología Scrum");

  s.addText("Framework ágil iterativo que organiza el trabajo en ciclos (Sprints), con roles definidos y entregas continuas de valor al cliente.", {
    x: 0.4, y: 1.02, w: 9.2, h: 0.48,
    fontSize: 12, fontFace: "Calibri", color: C.black, align: "left", margin: 0,
  });

  const rolesData = [
    [hCell("Rol"), hCell("Responsabilidad en BookMora")],
    [rCell("Product Owner", false), rCell("Define los requerimientos de la API (endpoints, entidades)", false)],
    [rCell("Scrum Master",  true),  rCell("Gestiona el Sprint y resuelve bloqueos técnicos", true)],
    [rCell("Dev Team",      false), rCell("Implementa los controladores y modelos en Spring Boot", false)],
  ];
  s.addTable(rolesData, {
    x: 0.4, y: 1.6, w: 4.7, h: 1.5,
    colW: [1.7, 3.0], border: { pt: 1, color: "DDDDDD" },
  });

  // Ciclo Sprint como bloques apilados
  const fases = [
    { t: "Product Backlog", bg: C.grayM, fg: C.black },
    { t: "Sprint Planning", bg: C.grayM, fg: C.black },
    { t: "SPRINT  (2 semanas)", bg: C.blue, fg: C.white },
    { t: "Sprint Review",   bg: C.grayM, fg: C.black },
    { t: "Retrospectiva",   bg: C.grayM, fg: C.black },
  ];
  fases.forEach((f, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.35, y: 1.6 + i * 0.54, w: 4.2, h: 0.46,
      fill: { color: f.bg }, line: { color: "BBBBBB", width: 1 },
    });
    s.addText(f.t, {
      x: 5.35, y: 1.6 + i * 0.54, w: 4.2, h: 0.46,
      fontSize: 11, fontFace: "Calibri", bold: f.bg === C.blue,
      color: f.fg, align: "center", valign: "middle", margin: 0,
    });
    if (i < fases.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: 7.45, y: 1.6 + i * 0.54 + 0.46, w: 0, h: 0.08,
        line: { color: C.blue, width: 2 },
      });
    }
  });

  s.addText("Sprint de este proyecto: 1 ciclo  ·  Duración: 2 semanas  ·  Entregable: API REST funcional con 20 endpoints", {
    x: 0.4, y: 4.95, w: 9.2, h: 0.35,
    fontSize: 9, fontFace: "Calibri", color: C.grayD, italic: true, align: "center", margin: 0,
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 4 – REQUERIMIENTOS
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  addTitle(s, "Requerimientos del Sistema");

  const reqs = [
    ["RF-01", "Gestión de Autores",    "CRUD: listar, buscar, agregar, eliminar, filtrar por nombre"],
    ["RF-02", "Gestión de Categorías", "CRUD: listar, buscar, agregar, eliminar, filtrar por nombre"],
    ["RF-03", "Gestión de Cuentos",    "CRUD con FK a Autor (AUTO_ID) y Categoría (CATE_ID)"],
    ["RF-04", "Gestión de Favoritos",  "CRUD con FK a Cuento (CUEN_ID)"],
    ["RF-05", "Buscar por ID",         "GET /{entidad}/{id} retorna un objeto específico"],
    ["RF-06", "Filtrar por atributo",  "GET /filtrar?param= filtra la lista por un campo"],
    ["RF-07", "API REST HTTP",         "Comunicación vía GET, POST, DELETE con respuestas JSON"],
  ];

  const tableData = [
    [hCell("ID"), hCell("Requerimiento"), hCell("Descripción")],
    ...reqs.map((r, i) => [rCell(r[0], i%2!==0), rCell(r[1], i%2!==0), rCell(r[2], i%2!==0)]),
  ];
  s.addTable(tableData, {
    x: 0.4, y: 1.05, w: 9.2, h: 3.9,
    colW: [1.1, 2.3, 5.8], border: { pt: 1, color: "DDDDDD" },
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 5 – CASOS DE USO (actor mejorado)
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  addTitle(s, "Diagrama de Casos de Uso");

  // Actor mejorado (stick figure)
  addActor(s, 1.0, 1.2, "Usuario");

  // Óvalos de casos de uso
  const casos = [
    "Listar registros",
    "Buscar por ID",
    "Insertar registro",
    "Eliminar registro",
    "Filtrar registros",
  ];
  casos.forEach((c, i) => {
    const oy = 1.15 + i * 0.78;
    const cx = 1.0;  // centro actor x
    const ovalX = 2.5;
    const ovalMidY = oy + 0.25;

    s.addShape(pres.shapes.OVAL, {
      x: ovalX, y: oy, w: 3.2, h: 0.5,
      fill: { color: C.blueL }, line: { color: C.blue, width: 1.5 },
    });
    s.addText(c, {
      x: ovalX, y: oy, w: 3.2, h: 0.5,
      fontSize: 11, fontFace: "Calibri", color: C.black,
      align: "center", valign: "middle", margin: 0,
    });
    // Línea actor → caso
    s.addShape(pres.shapes.LINE, {
      x: cx + 0.28, y: ovalMidY, w: ovalX - cx - 0.28, h: 0,
      line: { color: C.grayD, width: 1 },
    });
  });

  // Tabla mapeo
  const mapData = [
    [hCell("Caso de Uso"), hCell("Endpoint ejemplo"), hCell("HTTP")],
    [rCell("Listar registros", false),  rCell("/listarAutor, /listarCuento", false), rCell("GET", false)],
    [rCell("Buscar por ID",    true),   rCell("/autor/{id}, /cuento/{id}",   true),  rCell("GET", true)],
    [rCell("Insertar",         false),  rCell("/agregarAutor, /agregarCuento",false),rCell("POST",false)],
    [rCell("Eliminar",         true),   rCell("/autor/{id}, /cuento/{id}",   true),  rCell("DELETE",true)],
    [rCell("Filtrar",          false),  rCell("/filtrarAutor?nombre=",       false), rCell("GET", false)],
  ];
  s.addTable(mapData, {
    x: 6.0, y: 1.05, w: 3.6, h: 3.0,
    colW: [1.6, 1.4, 0.6], border: { pt: 1, color: "DDDDDD" },
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 6 – MER (imagen real del informe)
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  addTitle(s, "Modelo Entidad-Relación (MER)");

  s.addText("Generado con pgAdmin 4 · PostgreSQL 18  |  4 entidades: AUTOR, CATEGORIA, CUENTO, FAVORITO", {
    x: 0.4, y: 1.0, w: 9.2, h: 0.32,
    fontSize: 10, fontFace: "Calibri", italic: true, color: C.grayD,
    align: "left", margin: 0,
  });

  // Imagen real del informe (centrada)
  s.addImage({ path: IMG_MER, x: 0.5, y: 1.35, w: 9.0, h: 3.95 });

  s.addText("PK = Clave Primaria (serial)   ·   FK = Clave Foránea (integer)   ·   Relaciones: 1:N", {
    x: 0.4, y: 5.28, w: 9.2, h: 0.26,
    fontSize: 9, fontFace: "Calibri", color: C.grayD, align: "center", margin: 0,
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 7 – DIAGRAMA DE CLASES (imagen real del informe)
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  addTitle(s, "Diagrama de Clases UML");

  s.addText("Visibilidad: ( - ) privado · ( + ) público  |  4 clases con atributos, getters y setters", {
    x: 0.4, y: 1.0, w: 9.2, h: 0.32,
    fontSize: 10, fontFace: "Calibri", italic: true, color: C.grayD,
    align: "left", margin: 0,
  });

  // Imagen real del informe — relación de aspecto original: ~895 × 1430 px
  // Ajustamos alto máximo = 3.9", calculamos ancho proporcional
  const origW = 895, origH = 1430, maxH = 3.95;
  const calcW = maxH * (origW / origH);
  const imgX = (10 - calcW) / 2;
  s.addImage({ path: IMG_CLASES, x: imgX, y: 1.35, w: calcW, h: maxH });

  s.addText("Relaciones: Autor → Cuento (1:N)  ·  Categoria → Cuento (1:N)  ·  Cuento → Favorito (1:N)", {
    x: 0.4, y: 5.28, w: 9.2, h: 0.26,
    fontSize: 9, fontFace: "Calibri", color: C.grayD, align: "center", margin: 0,
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 8 – ESTRUCTURA DEL PROYECTO
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  addTitle(s, "Estructura del Proyecto");

  const tree = [
    "demo-copia/",
    "  src/main/java/com/example/demo/",
    "    DemoApplication.java",
    "    controller/",
    "      AutorController.java",
    "      CategoriaController.java",
    "      CuentoController.java",
    "      FavoritoController.java",
    "    models/",
    "      Autor.java",
    "      Categoria.java",
    "      Cuento.java",
    "      Favorito.java",
    "  src/main/resources/",
    "    application.properties",
    "  pom.xml",
  ];
  codeBlock(s, tree.join("\n"), 0.4, 1.05, 4.5, 4.3);

  const desc = [
    [hCell("Capa"), hCell("Descripción")],
    [rCell("controller/",    false), rCell("Recibe HTTP, procesa y retorna JSON", false)],
    [rCell("models/",        true),  rCell("POJOs con atributos + getters/setters", true)],
    [rCell("DemoApplication",false), rCell("@SpringBootApplication — punto de entrada", false)],
    [rCell("pom.xml",        true),  rCell("Dependencias Maven: Spring Web", true)],
    [rCell("app.properties", false), rCell("Configuración del servidor (puerto 8080)", false)],
  ];
  s.addTable(desc, {
    x: 5.2, y: 1.05, w: 4.4, h: 3.0,
    colW: [1.7, 2.7], border: { pt: 1, color: "DDDDDD" },
  });

  s.addText("Almacenamiento: ArrayList en memoria  ·  Sin BD externa en este Sprint  ·  Puerto: 8080", {
    x: 0.4, y: 5.0, w: 9.2, h: 0.3,
    fontSize: 9, fontFace: "Calibri", color: C.grayD, italic: true, align: "center", margin: 0,
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 9 – MODELO DE TABLA: CUENTO
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  addTitle(s, "Modelo de Tabla: Cuento");

  const tableData = [
    [hCell("Campo Java"),             hCell("Columna BD"),           hCell("Tipo BD"),    hCell("Restricción"),   hCell("Descripción")],
    [rCell("cuentoId",false),         rCell("CUEN_ID",false),        rCell("serial",false),    rCell("PK",false),       rCell("Identificador único",false)],
    [rCell("cuentoTitulo",true),      rCell("CUEN_TITULO",true),     rCell("varchar(200)",true), rCell("NOT NULL",true),  rCell("Título del cuento",true)],
    [rCell("cuentoDescripcion",false),rCell("CUEN_DESCRIPCION",false),rCell("text",false), rCell("—",false),        rCell("Resumen corto",false)],
    [rCell("cuentoContenido",true),   rCell("CUEN_CONTENIDO",true),  rCell("text",true),  rCell("—",true),         rCell("Texto completo",true)],
    [rCell("cuentoFechaPublicacion",false),rCell("CUENT_FECHA_PUBLICACION",false),rCell("date",false),rCell("—",false),rCell("Fecha de publicación",false)],
    [rCell("autoId",true),            rCell("AUTO_ID",true),         rCell("integer",true),rCell("FK → AUTOR",true),rCell("Autor del cuento",true)],
    [rCell("categId",false),          rCell("CATE_ID",false),        rCell("integer",false),rCell("FK → CATEGORIA",false),rCell("Categoría del cuento",false)],
  ];
  s.addTable(tableData, {
    x: 0.4, y: 1.05, w: 9.2, h: 2.6,
    colW: [1.6, 1.9, 1.2, 1.4, 3.1], border: { pt: 1, color: "DDDDDD" },
  });

  const code = `public class Cuento {
    private int cuentoId;
    private String cuentoTitulo;
    private String cuentoDescripcion;
    private String cuentoContenido;
    private Date cuentoFechaPublicacion;
    private int autoId;    // FK -> Autor
    private int categId;   // FK -> Categoria
    // getters y setters para cada campo...
}`;
  codeBlock(s, code, 0.4, 3.8, 9.2, 1.55);
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 10 – GET buscar específico
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  addTitle(s, "GET – Buscar Objeto Específico");

  const infoData = [
    [hCell("Campo"), hCell("Valor")],
    [rCell("Método HTTP", false), rCell("GET", false)],
    [rCell("URL",         true),  rCell("http://localhost:8080/autor/{id}", true)],
    [rCell("Parámetro",  false), rCell("{id} — valor entero en la URL (@PathVariable)", false)],
    [rCell("Retorna",    true),  rCell("Objeto JSON o null si no existe", true)],
    [rCell("HTTP Code",  false), rCell("200 OK", false)],
  ];
  s.addTable(infoData, {
    x: 0.4, y: 1.05, w: 4.5, h: 2.1,
    colW: [1.5, 3.0], border: { pt: 1, color: "DDDDDD" },
  });

  codeBlock(s, `@GetMapping("/autor/{id}")
public Autor buscar(@PathVariable int id) {
    for (Autor a : listaAutor) {
        if (a.getIdAutor() == id) {
            return a;
        }
    }
    return null;
}`, 5.1, 1.05, 4.5, 2.1);

  s.addText("Respuesta JSON:", { x: 0.4, y: 3.28, w: 3, h: 0.3, fontSize: 11, fontFace: "Calibri", bold: true, color: C.black, margin: 0 });
  codeBlock(s, `{
  "idAutor": 1,
  "nombre": "Gabriel Garcia Marquez",
  "email": "gg@mail.com"
}`, 0.4, 3.6, 4.5, 1.65);

  s.addText("Si el ID no existe → retorna null → HTTP 200 con cuerpo vacío.\nEn producción se usaría ResponseEntity con HTTP 404.", {
    x: 5.1, y: 3.28, w: 4.5, h: 0.9,
    fontSize: 10, fontFace: "Calibri", color: C.black, italic: true, align: "left", margin: 0,
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 11 – GET lista
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  addTitle(s, "GET – Mostrar Lista Completa");

  const infoData = [
    [hCell("Campo"), hCell("Valor")],
    [rCell("Método HTTP", false), rCell("GET", false)],
    [rCell("URL",         true),  rCell("http://localhost:8080/listarAutor", true)],
    [rCell("Parámetros",  false), rCell("Ninguno", false)],
    [rCell("Retorna",     true),  rCell("Array JSON con todos los registros", true)],
    [rCell("HTTP Code",   false), rCell("200 OK  ([] si no hay datos)", false)],
  ];
  s.addTable(infoData, {
    x: 0.4, y: 1.05, w: 4.5, h: 2.1,
    colW: [1.5, 3.0], border: { pt: 1, color: "DDDDDD" },
  });

  codeBlock(s, `@GetMapping("/listarAutor")
public List<Autor> listar() {
    return listaAutor;
}`, 5.1, 1.05, 4.5, 1.2);

  s.addText("Respuesta JSON (array):", { x: 0.4, y: 3.28, w: 5, h: 0.3, fontSize: 11, fontFace: "Calibri", bold: true, color: C.black, margin: 0 });
  codeBlock(s, `[
  { "idAutor": 1, "nombre": "Gabriel Garcia Marquez", "email": "gg@mail.com" },
  { "idAutor": 2, "nombre": "Isabel Allende",          "email": "ia@mail.com" }
]`, 0.4, 3.6, 9.2, 1.3);

  s.addText("Disponible para: /listarAutor  /listarCategoria  /listarCuento  /listarFavorito", {
    x: 5.1, y: 2.45, w: 4.5, h: 0.55,
    fontSize: 10, fontFace: "Calibri", color: C.grayD, italic: true, align: "left", margin: 0,
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 12 – POST
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  addTitle(s, "POST – Insertar Registro");

  const infoData = [
    [hCell("Campo"), hCell("Valor")],
    [rCell("Método HTTP", false), rCell("POST", false)],
    [rCell("URL",         true),  rCell("http://localhost:8080/agregarAutor", true)],
    [rCell("Body",        false), rCell("JSON con los campos del objeto (@RequestBody)", false)],
    [rCell("Retorna",     true),  rCell("El objeto insertado como confirmación", true)],
    [rCell("HTTP Code",   false), rCell("200 OK", false)],
  ];
  s.addTable(infoData, {
    x: 0.4, y: 1.05, w: 4.5, h: 2.1,
    colW: [1.5, 3.0], border: { pt: 1, color: "DDDDDD" },
  });

  codeBlock(s, `@PostMapping("/agregarAutor")
public Autor agregar(@RequestBody Autor autor) {
    listaAutor.add(autor);
    return autor;
}`, 5.1, 1.05, 4.5, 1.5);

  s.addText("Body de la petición:", { x: 0.4, y: 3.28, w: 4, h: 0.3, fontSize: 11, fontFace: "Calibri", bold: true, color: C.black, margin: 0 });
  codeBlock(s, `{
  "idAutor": 3,
  "nombre": "Jorge Luis Borges",
  "email": "borges@mail.com"
}`, 0.4, 3.6, 4.5, 1.5);

  s.addText("Respuesta:", { x: 5.1, y: 3.28, w: 4.5, h: 0.3, fontSize: 11, fontFace: "Calibri", bold: true, color: C.black, margin: 0 });
  codeBlock(s, `{
  "idAutor": 3,
  "nombre": "Jorge Luis Borges",
  "email": "borges@mail.com"
}`, 5.1, 3.6, 4.5, 1.5);
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 13 – DELETE
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  addTitle(s, "DELETE – Eliminar Objeto");

  const infoData = [
    [hCell("Campo"), hCell("Valor")],
    [rCell("Método HTTP", false), rCell("DELETE", false)],
    [rCell("URL",         true),  rCell("http://localhost:8080/autor/{id}", true)],
    [rCell("Parámetro",   false), rCell("{id} — ID del registro a eliminar", false)],
    [rCell("Retorna",     true),  rCell('"Autor eliminado" o "Autor no encontrado"', true)],
    [rCell("HTTP Code",   false), rCell("200 OK en ambos casos", false)],
  ];
  s.addTable(infoData, {
    x: 0.4, y: 1.05, w: 4.5, h: 2.1,
    colW: [1.5, 3.0], border: { pt: 1, color: "DDDDDD" },
  });

  codeBlock(s, `@DeleteMapping("/autor/{id}")
public String eliminar(@PathVariable int id) {
    for (int i = 0; i < listaAutor.size(); i++) {
        if (listaAutor.get(i).getIdAutor() == id) {
            listaAutor.remove(i);
            return "Autor eliminado";
        }
    }
    return "Autor no encontrado";
}`, 5.1, 1.05, 4.5, 2.4);

  const respData = [
    [hCell("Escenario"), hCell("Respuesta del servidor")],
    [rCell("ID existe en la lista",    false), rCell('"Autor eliminado"',     false)],
    [rCell("ID no existe en la lista", true),  rCell('"Autor no encontrado"', true)],
  ];
  s.addTable(respData, {
    x: 0.4, y: 3.35, w: 5.5, h: 1.3,
    colW: [2.8, 2.7], border: { pt: 1, color: "DDDDDD" },
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 14 – CONCLUSIONES
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.22, h: 5.625,
    fill: { color: C.blue }, line: { color: C.blue, width: 0 },
  });

  s.addText("Conclusiones", {
    x: 0.5, y: 0.25, w: 9, h: 0.7,
    fontSize: 36, fontFace: "Calibri", bold: true, color: C.black,
    align: "left", margin: 0,
  });

  const bloques = [
    {
      t: "Logros del Sprint",
      items: [
        "API REST funcional: 4 entidades (Autor, Categoria, Cuento, Favorito)",
        "20 endpoints implementados: GET listar, GET buscar, POST, DELETE, GET filtrar",
        "Arquitectura MVC: modelos y controladores separados",
      ],
    },
    {
      t: "Tecnologías usadas",
      items: [
        "Java · Spring Boot · Maven · REST API · JSON",
        "Diseño BD: PostgreSQL 18 con pgAdmin 4",
        "Almacenamiento del Sprint: ArrayList en memoria",
      ],
    },
    {
      t: "Aprendizajes clave",
      items: [
        "@RestController · @GetMapping · @PostMapping · @DeleteMapping",
        "@PathVariable (ID en URL) vs @RequestParam (parámetro query)",
        "@RequestBody: deserialización automática JSON → objeto Java",
      ],
    },
  ];

  bloques.forEach((b, bi) => {
    const yBase = 1.08 + bi * 1.4;
    s.addText(b.t, {
      x: 0.5, y: yBase, w: 9, h: 0.34,
      fontSize: 14, fontFace: "Calibri", bold: true, color: C.blue,
      align: "left", margin: 0,
    });
    const richItems = b.items.flatMap((item, ii) =>
      ii < b.items.length - 1
        ? [{ text: item, options: { bullet: true, breakLine: true } }]
        : [{ text: item, options: { bullet: true } }]
    );
    s.addText(richItems, {
      x: 0.5, y: yBase + 0.36, w: 9, h: 0.96,
      fontSize: 11, fontFace: "Calibri", color: C.black, align: "left", margin: 0,
    });
  });
}

// ─── Guardar ───────────────────────────────────────────────────────────────
pres.writeFile({ fileName: "BookMora_Presentacion.pptx" })
  .then(() => console.log("✅  BookMora_Presentacion.pptx generado correctamente"))
  .catch(e => console.error("Error:", e));
