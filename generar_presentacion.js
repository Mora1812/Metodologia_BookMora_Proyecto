const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "BookMora - Proyecto Spring Boot";
pres.author = "Maria Jose Mora Mora";

// ─── Colores ───────────────────────────────────────────────────────────────
const C = {
  white:   "FFFFFF",
  black:   "1A1A1A",
  blue:    "2E75B6",
  blueL:   "D6E4F0",
  gray:    "F4F4F4",
  grayM:   "F0F0F0",
  grayD:   "888888",
  tableAlt:"F7FAFD",
};

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

function headerCell(text) {
  return { text, options: { fill: { color: C.blue }, color: C.white, bold: true, fontSize: 11, fontFace: "Calibri", align: "center", valign: "middle" } };
}

function rowCell(text, alt) {
  return { text, options: { fill: { color: alt ? C.grayM : C.white }, color: C.black, fontSize: 10, fontFace: "Calibri", align: "left", valign: "middle" } };
}

function addCodeBlock(slide, lines, x, y, w, h) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: C.gray },
    line: { color: "CCCCCC", width: 1 },
  });
  slide.addText(lines, {
    x: x + 0.12, y: y + 0.05, w: w - 0.24, h: h - 0.1,
    fontSize: 9, fontFace: "Courier New", color: C.black,
    align: "left", valign: "top", margin: 0,
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 1 – PORTADA
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };

  // Franja azul lateral izquierda
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.22, h: 5.625,
    fill: { color: C.blue }, line: { color: C.blue, width: 0 },
  });

  s.addText("BookMora", {
    x: 0.55, y: 1.1, w: 9, h: 1.1,
    fontSize: 52, fontFace: "Calibri", bold: true, color: C.black,
    align: "left", margin: 0,
  });
  s.addText("API REST con Spring Boot", {
    x: 0.55, y: 2.25, w: 9, h: 0.55,
    fontSize: 22, fontFace: "Calibri", color: C.blue, align: "left", margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: 0.55, y: 2.9, w: 5.5, h: 0,
    line: { color: C.grayD, width: 1 },
  });

  const meta = [
    { label: "Estudiante:",  val: "Maria Jose Mora Mora" },
    { label: "Materia:",     val: "Metodologia de Software" },
    { label: "Institucion:", val: "ISER" },
    { label: "Fecha:",       val: "Mayo 2026" },
  ];
  meta.forEach((m, i) => {
    s.addText([
      { text: m.label + " ", options: { bold: true, color: C.black } },
      { text: m.val,         options: { color: C.grayD } },
    ], {
      x: 0.55, y: 3.05 + i * 0.42, w: 8, h: 0.38,
      fontSize: 13, fontFace: "Calibri", align: "left", margin: 0,
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
    ["05", "Diagrama de Clases"],
    ["06", "Estructura del proyecto"],
    ["07", "Modelo de Tabla: Autor"],
    ["08", "Endpoints REST (GET, POST, DELETE)"],
    ["09", "Conclusiones"],
  ];

  // Dos columnas
  const col1 = temas.slice(0, 5);
  const col2 = temas.slice(5);

  [col1, col2].forEach((col, ci) => {
    col.forEach((t, i) => {
      const xBase = ci === 0 ? 0.4 : 5.2;
      const yBase = 1.1 + i * 0.78;

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
        x: xBase + 0.62, y: yBase + 0.08, w: 4.1, h: 0.36,
        fontSize: 13, fontFace: "Calibri", color: C.black,
        align: "left", margin: 0,
      });
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 3 – METODOLOGÍA SCRUM
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  addTitle(s, "Metodología Scrum");

  // Descripcion
  s.addText("Framework agil iterativo que organiza el trabajo en ciclos llamados Sprints, con roles definidos y entregas continuas de valor.", {
    x: 0.4, y: 1.0, w: 9.2, h: 0.6,
    fontSize: 12, fontFace: "Calibri", color: C.black, align: "left", margin: 0,
  });

  // Tabla roles
  const rolesData = [
    [headerCell("Rol"), headerCell("Responsabilidad")],
    [rowCell("Product Owner", false), rowCell("Define y prioriza el Product Backlog", false)],
    [rowCell("Scrum Master", true),   rowCell("Facilita el proceso y elimina impedimentos", true)],
    [rowCell("Dev Team",     false),  rowCell("Desarrolla los incrementos del producto", false)],
  ];
  s.addTable(rolesData, {
    x: 0.4, y: 1.7, w: 4.6, h: 1.5,
    colW: [1.8, 2.8],
    border: { pt: 1, color: "DDDDDD" },
  });

  // Fases del Sprint
  const fases = ["Product Backlog", "Sprint Planning", "Sprint (1-4 sem)", "Sprint Review", "Retrospectiva"];
  fases.forEach((f, i) => {
    const x = 5.2 + i * 0.01; // align left
    const xPos = 5.15;
    s.addShape(pres.shapes.RECTANGLE, {
      x: xPos, y: 1.72 + i * 0.58, w: 4.4, h: 0.44,
      fill: { color: i === 2 ? C.blue : C.grayM },
      line: { color: "CCCCCC", width: 1 },
    });
    s.addText(f, {
      x: xPos, y: 1.72 + i * 0.58, w: 4.4, h: 0.44,
      fontSize: 11, fontFace: "Calibri",
      color: i === 2 ? C.white : C.black,
      bold: i === 2, align: "center", valign: "middle", margin: 0,
    });
    if (i < fases.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: xPos + 2.2, y: 1.72 + i * 0.58 + 0.44, w: 0, h: 0.14,
        line: { color: C.blue, width: 2 },
      });
    }
  });

  s.addText("Sprint de este proyecto: 1 ciclo  |  Duracion estimada: 2 semanas  |  Entregable: API REST funcional", {
    x: 0.4, y: 4.9, w: 9.2, h: 0.38,
    fontSize: 10, fontFace: "Calibri", color: C.grayD, italic: true, align: "center", margin: 0,
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
    ["RF-01", "Gestión de Autores",     "CRUD completo sobre la entidad Autor"],
    ["RF-02", "Gestión de Categorías",  "CRUD completo sobre la entidad Categoria"],
    ["RF-03", "Gestión de Cuentos",     "CRUD completo con relacion a Autor y Categoria"],
    ["RF-04", "Gestión de Favoritos",   "CRUD completo con relacion a Cuento"],
    ["RF-05", "Busqueda por ID",        "Localizar un registro especifico mediante su ID"],
    ["RF-06", "Filtrado por atributo",  "Filtrar registros por nombre, autoId o cuentoId"],
    ["RF-07", "API REST",               "Exponer servicios via HTTP (GET, POST, DELETE)"],
  ];

  const tableData = [
    [headerCell("ID"), headerCell("Requerimiento"), headerCell("Descripcion")],
    ...reqs.map((r, i) => [rowCell(r[0], i%2!==0), rowCell(r[1], i%2!==0), rowCell(r[2], i%2!==0)]),
  ];

  s.addTable(tableData, {
    x: 0.4, y: 1.05, w: 9.2, h: 3.8,
    colW: [1.1, 2.4, 5.7],
    border: { pt: 1, color: "DDDDDD" },
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 5 – CASOS DE USO
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  addTitle(s, "Diagrama de Casos de Uso");

  // Actor (ovalo + texto)
  s.addShape(pres.shapes.OVAL, {
    x: 0.3, y: 1.4, w: 0.55, h: 0.55,
    fill: { color: C.blue }, line: { color: C.blue, width: 0 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.38, y: 1.95, w: 0.4, h: 1.0,
    fill: { color: C.blue }, line: { color: C.blue, width: 0 },
  });
  s.addShape(pres.shapes.LINE, {
    x: 0.38, y: 2.25, w: -0.2, h: 0.4,
    line: { color: C.blue, width: 2 },
  });
  s.addShape(pres.shapes.LINE, {
    x: 0.78, y: 2.25, w: 0.2, h: 0.4,
    line: { color: C.blue, width: 2 },
  });
  s.addText("Usuario", {
    x: 0.1, y: 3.05, w: 0.9, h: 0.3,
    fontSize: 10, fontFace: "Calibri", color: C.black, align: "center", margin: 0,
  });

  // Casos de uso como ovales
  const casos = [
    "Listar registros",
    "Buscar por ID",
    "Insertar registro",
    "Eliminar registro",
    "Filtrar registros",
  ];

  casos.forEach((c, i) => {
    const y = 1.15 + i * 0.78;
    s.addShape(pres.shapes.OVAL, {
      x: 2.2, y, w: 3.4, h: 0.5,
      fill: { color: C.blueL }, line: { color: C.blue, width: 1.5 },
    });
    s.addText(c, {
      x: 2.2, y, w: 3.4, h: 0.5,
      fontSize: 11, fontFace: "Calibri", color: C.black, align: "center", valign: "middle", margin: 0,
    });
    // Linea de conexion actor -> caso
    s.addShape(pres.shapes.LINE, {
      x: 0.85, y: y + 0.25, w: 1.35, h: 0,
      line: { color: C.grayD, width: 1 },
    });
  });

  // Tabla de actores y endpoints
  const casosData = [
    [headerCell("Caso de Uso"), headerCell("Endpoint"), headerCell("Metodo HTTP")],
    [rowCell("Listar registros", false), rowCell("/listarAutor, /listarCuento...", false), rowCell("GET", false)],
    [rowCell("Buscar por ID", true),     rowCell("/autor/{id}, /cuento/{id}...", true),    rowCell("GET", true)],
    [rowCell("Insertar registro", false),rowCell("/agregarAutor, /agregarCuento...", false),rowCell("POST", false)],
    [rowCell("Eliminar registro", true), rowCell("/autor/{id}, /cuento/{id}...", true),    rowCell("DELETE", true)],
    [rowCell("Filtrar registros", false),rowCell("/filtrarAutor?nombre=...", false),       rowCell("GET", false)],
  ];
  s.addTable(casosData, {
    x: 5.8, y: 1.05, w: 3.8, h: 3.2,
    colW: [1.7, 1.4, 0.7],
    border: { pt: 1, color: "DDDDDD" },
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 6 – MER
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  addTitle(s, "Modelo Entidad-Relacion (MER)");

  const entidades = [
    { name: "AUTOR",      x: 0.4,  y: 1.1, fields: ["PK idAutor", "nombre", "email"] },
    { name: "CATEGORIA",  x: 0.4,  y: 3.0, fields: ["PK idCategoria", "nombre", "descripcion"] },
    { name: "CUENTO",     x: 3.7,  y: 1.8, fields: ["PK cuentoId", "cuentoTitulo", "cuentoDescripcion", "cuentoContenido", "cuentoFechaPublicacion", "FK autoId", "FK categId"] },
    { name: "FAVORITO",   x: 7.3,  y: 1.8, fields: ["PK favoId", "favoFechaGuardado", "FK cuentoId"] },
  ];

  entidades.forEach(e => {
    const rowH = 0.28;
    const totalH = 0.38 + e.fields.length * rowH;
    // Cabecera
    s.addShape(pres.shapes.RECTANGLE, {
      x: e.x, y: e.y, w: 2.4, h: 0.38,
      fill: { color: C.blue }, line: { color: C.blue, width: 0 },
    });
    s.addText(e.name, {
      x: e.x, y: e.y, w: 2.4, h: 0.38,
      fontSize: 11, fontFace: "Calibri", bold: true, color: C.white,
      align: "center", valign: "middle", margin: 0,
    });
    // Campos
    e.fields.forEach((f, i) => {
      const isPK = f.startsWith("PK");
      const isFK = f.startsWith("FK");
      s.addShape(pres.shapes.RECTANGLE, {
        x: e.x, y: e.y + 0.38 + i * rowH, w: 2.4, h: rowH,
        fill: { color: i % 2 === 0 ? C.white : C.grayM },
        line: { color: "DDDDDD", width: 1 },
      });
      s.addText(f, {
        x: e.x + 0.08, y: e.y + 0.38 + i * rowH, w: 2.24, h: rowH,
        fontSize: 9, fontFace: isPK || isFK ? "Courier New" : "Calibri",
        bold: isPK, color: isFK ? C.blue : (isPK ? "AA0000" : C.black),
        align: "left", valign: "middle", margin: 0,
      });
    });
  });

  // Relaciones (lineas)
  // AUTOR -> CUENTO
  s.addShape(pres.shapes.LINE, { x: 2.8, y: 1.8, w: 0.9, h: 0.5, line: { color: C.blue, width: 1.5 } });
  s.addText("1:N", { x: 2.7, y: 1.88, w: 0.5, h: 0.28, fontSize: 9, color: C.blue, fontFace: "Calibri", margin: 0 });

  // CATEGORIA -> CUENTO
  s.addShape(pres.shapes.LINE, { x: 2.8, y: 3.18, w: 0.9, h: -0.7, line: { color: C.blue, width: 1.5 } });
  s.addText("1:N", { x: 2.7, y: 2.8, w: 0.5, h: 0.28, fontSize: 9, color: C.blue, fontFace: "Calibri", margin: 0 });

  // CUENTO -> FAVORITO
  s.addShape(pres.shapes.LINE, { x: 6.1, y: 2.3, w: 1.2, h: 0, line: { color: C.blue, width: 1.5 } });
  s.addText("1:N", { x: 6.15, y: 2.05, w: 0.5, h: 0.28, fontSize: 9, color: C.blue, fontFace: "Calibri", margin: 0 });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 7 – DIAGRAMA DE CLASES
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  addTitle(s, "Diagrama de Clases");

  const clases = [
    {
      name: "Autor", x: 0.3, y: 1.1,
      attrs: ["- idAutor: int", "- nombre: String", "- email: String"],
      methods: ["+ getIdAutor(): int", "+ setIdAutor(int)", "+ getNombre(): String", "+ setNombre(String)", "+ getEmail(): String", "+ setEmail(String)"],
    },
    {
      name: "Categoria", x: 2.65, y: 1.1,
      attrs: ["- idCategoria: int", "- nombre: String", "- descripcion: String"],
      methods: ["+ getIdCategoria(): int", "+ getNombre(): String", "+ getDescripcion(): String", "+ setIdCategoria(int)", "+ setNombre(String)", "+ setDescripcion(String)"],
    },
    {
      name: "Cuento", x: 5.0, y: 1.1,
      attrs: ["- cuentoId: int", "- cuentoTitulo: String", "- cuentoDescripcion: String", "- cuentoContenido: String", "- cuentoFechaPublicacion: Date", "- autoId: int", "- categId: int"],
      methods: ["+ getCuentoId(): int", "+ getCuentoTitulo(): String", "+ getAutoId(): int", "+ getCategId(): int", "+ set...()"],
    },
    {
      name: "Favorito", x: 7.55, y: 1.1,
      attrs: ["- favoId: int", "- favoFechaGuardado: Date", "- cuentoId: int"],
      methods: ["+ getFavoId(): int", "+ getFavoFechaGuardado(): Date", "+ getCuentoId(): int", "+ set...()"],
    },
  ];

  clases.forEach(c => {
    const rowH = 0.24;
    // Nombre clase
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: c.y, w: 2.2, h: 0.36,
      fill: { color: C.blue }, line: { color: C.blue, width: 0 },
    });
    s.addText(c.name, {
      x: c.x, y: c.y, w: 2.2, h: 0.36,
      fontSize: 11, fontFace: "Calibri", bold: true, color: C.white,
      align: "center", valign: "middle", margin: 0,
    });
    // Atributos
    c.attrs.forEach((a, i) => {
      s.addShape(pres.shapes.RECTANGLE, {
        x: c.x, y: c.y + 0.36 + i * rowH, w: 2.2, h: rowH,
        fill: { color: i%2===0 ? C.white : C.grayM }, line: { color: "DDDDDD", width: 1 },
      });
      s.addText(a, {
        x: c.x + 0.06, y: c.y + 0.36 + i * rowH, w: 2.08, h: rowH,
        fontSize: 8, fontFace: "Courier New", color: C.black,
        align: "left", valign: "middle", margin: 0,
      });
    });
    // Separador
    const sepY = c.y + 0.36 + c.attrs.length * rowH;
    s.addShape(pres.shapes.LINE, {
      x: c.x, y: sepY, w: 2.2, h: 0,
      line: { color: C.blue, width: 1 },
    });
    // Metodos
    c.methods.forEach((m, i) => {
      s.addShape(pres.shapes.RECTANGLE, {
        x: c.x, y: sepY + i * rowH, w: 2.2, h: rowH,
        fill: { color: i%2===0 ? C.tableAlt : C.white }, line: { color: "DDDDDD", width: 1 },
      });
      s.addText(m, {
        x: c.x + 0.06, y: sepY + i * rowH, w: 2.08, h: rowH,
        fontSize: 8, fontFace: "Courier New", color: "224488",
        align: "left", valign: "middle", margin: 0,
      });
    });
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
    "  src/",
    "    main/",
    "      java/com/example/demo/",
    "        DemoApplication.java",
    "        controller/",
    "          AutorController.java",
    "          CategoriaController.java",
    "          CuentoController.java",
    "          FavoritoController.java",
    "        models/",
    "          Autor.java",
    "          Categoria.java",
    "          Cuento.java",
    "          Favorito.java",
    "      resources/",
    "        application.properties",
    "  pom.xml",
  ];

  addCodeBlock(s, tree.join("\n"), 0.4, 1.05, 4.6, 4.3);

  // Tabla descripcion de capas
  const desc = [
    [headerCell("Capa"), headerCell("Descripcion")],
    [rowCell("controller/", false), rowCell("Endpoints REST: recibe peticiones HTTP y retorna JSON", false)],
    [rowCell("models/", true),      rowCell("POJOs con atributos, getters y setters de cada entidad", true)],
    [rowCell("DemoApplication", false), rowCell("Clase principal con @SpringBootApplication", false)],
    [rowCell("pom.xml", true),      rowCell("Dependencias Maven: Spring Web, Spring Boot", true)],
    [rowCell("application.properties", false), rowCell("Configuracion del servidor (puerto 8080)", false)],
  ];
  s.addTable(desc, {
    x: 5.2, y: 1.05, w: 4.4, h: 3.2,
    colW: [1.6, 2.8],
    border: { pt: 1, color: "DDDDDD" },
  });

  s.addText("Arquitectura: MVC simplificado  |  Almacenamiento: listas en memoria (ArrayList)  |  Puerto: 8080", {
    x: 0.4, y: 4.95, w: 9.2, h: 0.35,
    fontSize: 9, fontFace: "Calibri", color: C.grayD, italic: true, align: "center", margin: 0,
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 9 – MODELO DE TABLA: AUTOR
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  addTitle(s, "Modelo de Tabla: Autor");

  const tableData = [
    [headerCell("Campo"), headerCell("Tipo Java"), headerCell("Columna BD"), headerCell("Restriccion"), headerCell("Descripcion")],
    [rowCell("idAutor",false),  rowCell("int",false),    rowCell("AUTOR_ID",false),    rowCell("PK, NOT NULL",false), rowCell("Identificador unico",false)],
    [rowCell("nombre",true),    rowCell("String",true),  rowCell("AUTOR_NOMBRE",true), rowCell("NOT NULL",true),      rowCell("Nombre completo",true)],
    [rowCell("email",false),    rowCell("String",false), rowCell("AUTOR_EMAIL",false), rowCell("UNIQUE",false),       rowCell("Correo electronico",false)],
  ];
  s.addTable(tableData, {
    x: 0.4, y: 1.1, w: 9.2, h: 1.8,
    colW: [1.4, 1.4, 1.8, 1.8, 2.8],
    border: { pt: 1, color: "DDDDDD" },
  });

  // Codigo del modelo
  const code = `public class Autor {
    private int idAutor;
    private String nombre;
    private String email;

    public int getIdAutor()       { return idAutor; }
    public void setIdAutor(int v) { this.idAutor = v; }
    public String getNombre()     { return nombre; }
    public void setNombre(String v){ this.nombre = v; }
    public String getEmail()      { return email; }
    public void setEmail(String v){ this.email = v; }
}`;

  addCodeBlock(s, code, 0.4, 3.1, 9.2, 2.2);
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 10 – GET BUSCAR ESPECÍFICO
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  addTitle(s, "GET – Buscar Objeto Especifico");

  // Info endpoint
  const infoData = [
    [headerCell("Campo"), headerCell("Valor")],
    [rowCell("Metodo HTTP", false),  rowCell("GET", false)],
    [rowCell("URL",         true),   rowCell("http://localhost:8080/autor/{id}", true)],
    [rowCell("Parametro",   false),  rowCell("{id} - ID del autor en la URL (PathVariable)", false)],
    [rowCell("Retorna",     true),   rowCell("JSON con el objeto Autor o null si no existe", true)],
    [rowCell("Codigo HTTP", false),  rowCell("200 OK", false)],
  ];
  s.addTable(infoData, {
    x: 0.4, y: 1.05, w: 4.5, h: 2.2,
    colW: [1.5, 3.0],
    border: { pt: 1, color: "DDDDDD" },
  });

  // Codigo
  const code = `@GetMapping("/autor/{id}")
public Autor buscar(@PathVariable int id) {
    for (Autor a : listaAutor) {
        if (a.getIdAutor() == id) {
            return a;
        }
    }
    return null;
}`;
  addCodeBlock(s, code, 5.1, 1.05, 4.5, 2.2);

  // Respuesta JSON
  s.addText("Respuesta JSON:", {
    x: 0.4, y: 3.4, w: 3, h: 0.3,
    fontSize: 11, fontFace: "Calibri", bold: true, color: C.black, margin: 0,
  });
  const json = `{
  "idAutor": 1,
  "nombre": "Gabriel Garcia Marquez",
  "email": "ggmarquez@mail.com"
}`;
  addCodeBlock(s, json, 0.4, 3.72, 4.5, 1.55);

  s.addText("Si el ID no existe, el metodo retorna null y Spring Boot devuelve HTTP 200 con cuerpo vacio.", {
    x: 5.1, y: 3.72, w: 4.5, h: 0.8,
    fontSize: 10, fontFace: "Calibri", color: C.black, italic: true,
    align: "left", margin: 0,
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 11 – GET LISTA
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  addTitle(s, "GET – Mostrar Lista Completa");

  const infoData = [
    [headerCell("Campo"), headerCell("Valor")],
    [rowCell("Metodo HTTP", false), rowCell("GET", false)],
    [rowCell("URL",         true),  rowCell("http://localhost:8080/listarAutor", true)],
    [rowCell("Parametros",  false), rowCell("Ninguno", false)],
    [rowCell("Retorna",     true),  rowCell("Array JSON con todos los autores", true)],
    [rowCell("Codigo HTTP", false), rowCell("200 OK  (array vacio [] si no hay datos)", false)],
  ];
  s.addTable(infoData, {
    x: 0.4, y: 1.05, w: 4.5, h: 2.2,
    colW: [1.5, 3.0],
    border: { pt: 1, color: "DDDDDD" },
  });

  const code = `@GetMapping("/listarAutor")
public List<Autor> listar() {
    return listaAutor;
}`;
  addCodeBlock(s, code, 5.1, 1.05, 4.5, 1.3);

  s.addText("Respuesta JSON (array):", {
    x: 0.4, y: 3.4, w: 4, h: 0.3,
    fontSize: 11, fontFace: "Calibri", bold: true, color: C.black, margin: 0,
  });
  const json = `[
  { "idAutor": 1, "nombre": "Gabriel Garcia Marquez", "email": "gg@mail.com" },
  { "idAutor": 2, "nombre": "Isabel Allende",          "email": "ia@mail.com" }
]`;
  addCodeBlock(s, json, 0.4, 3.72, 9.2, 1.55);

  s.addText("Endpoints de lista: /listarAutor  /listarCategoria  /listarCuento  /listarFavorito", {
    x: 5.1, y: 2.55, w: 4.5, h: 0.6,
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
    [headerCell("Campo"), headerCell("Valor")],
    [rowCell("Metodo HTTP", false), rowCell("POST", false)],
    [rowCell("URL",         true),  rowCell("http://localhost:8080/agregarAutor", true)],
    [rowCell("Body",        false), rowCell("JSON con campos del objeto (RequestBody)", false)],
    [rowCell("Retorna",     true),  rowCell("El objeto guardado en formato JSON", true)],
    [rowCell("Codigo HTTP", false), rowCell("200 OK", false)],
  ];
  s.addTable(infoData, {
    x: 0.4, y: 1.05, w: 4.5, h: 2.2,
    colW: [1.5, 3.0],
    border: { pt: 1, color: "DDDDDD" },
  });

  const code = `@PostMapping("/agregarAutor")
public Autor agregar(@RequestBody Autor autor) {
    listaAutor.add(autor);
    return autor;
}`;
  addCodeBlock(s, code, 5.1, 1.05, 4.5, 1.5);

  s.addText("Body de la peticion (JSON):", {
    x: 0.4, y: 3.4, w: 4, h: 0.3,
    fontSize: 11, fontFace: "Calibri", bold: true, color: C.black, margin: 0,
  });
  const bodyJson = `{
  "idAutor": 3,
  "nombre": "Jorge Luis Borges",
  "email": "borges@mail.com"
}`;
  addCodeBlock(s, bodyJson, 0.4, 3.72, 4.5, 1.55);

  s.addText("Respuesta (objeto insertado):", {
    x: 5.1, y: 3.4, w: 4.5, h: 0.3,
    fontSize: 11, fontFace: "Calibri", bold: true, color: C.black, margin: 0,
  });
  const respJson = `{
  "idAutor": 3,
  "nombre": "Jorge Luis Borges",
  "email": "borges@mail.com"
}`;
  addCodeBlock(s, respJson, 5.1, 3.72, 4.5, 1.55);
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 13 – DELETE
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  addTitle(s, "DELETE – Eliminar Objeto");

  const infoData = [
    [headerCell("Campo"), headerCell("Valor")],
    [rowCell("Metodo HTTP", false), rowCell("DELETE", false)],
    [rowCell("URL",         true),  rowCell("http://localhost:8080/autor/{id}", true)],
    [rowCell("Parametro",   false), rowCell("{id} - ID del autor a eliminar (PathVariable)", false)],
    [rowCell("Retorna",     true),  rowCell('"Autor eliminado" o "Autor no encontrado"', true)],
    [rowCell("Codigo HTTP", false), rowCell("200 OK en ambos casos", false)],
  ];
  s.addTable(infoData, {
    x: 0.4, y: 1.05, w: 4.5, h: 2.2,
    colW: [1.5, 3.0],
    border: { pt: 1, color: "DDDDDD" },
  });

  const code = `@DeleteMapping("/autor/{id}")
public String eliminar(@PathVariable int id) {
    for (int i = 0; i < listaAutor.size(); i++) {
        if (listaAutor.get(i).getIdAutor() == id) {
            listaAutor.remove(i);
            return "Autor eliminado";
        }
    }
    return "Autor no encontrado";
}`;
  addCodeBlock(s, code, 5.1, 1.05, 4.5, 2.4);

  s.addText("Posibles respuestas:", {
    x: 0.4, y: 3.4, w: 4, h: 0.3,
    fontSize: 11, fontFace: "Calibri", bold: true, color: C.black, margin: 0,
  });

  const respData = [
    [headerCell("Escenario"), headerCell("Respuesta")],
    [rowCell("ID existe en la lista",    false), rowCell('"Autor eliminado"',      false)],
    [rowCell("ID no existe en la lista", true),  rowCell('"Autor no encontrado"',  true)],
  ];
  s.addTable(respData, {
    x: 0.4, y: 3.72, w: 4.5, h: 1.3,
    colW: [2.5, 2.0],
    border: { pt: 1, color: "DDDDDD" },
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 14 – CONCLUSIONES
// ══════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };

  // Franja azul izquierda
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.22, h: 5.625,
    fill: { color: C.blue }, line: { color: C.blue, width: 0 },
  });

  s.addText("Conclusiones", {
    x: 0.5, y: 0.3, w: 9, h: 0.7,
    fontSize: 36, fontFace: "Calibri", bold: true, color: C.black,
    align: "left", margin: 0,
  });

  const logros = [
    ["Logros del Sprint", [
      "API REST funcional con 4 entidades: Autor, Categoria, Cuento, Favorito",
      "16 endpoints implementados (GET listar, GET buscar, POST agregar, DELETE eliminar, GET filtrar)",
      "Arquitectura MVC con controladores y modelos separados",
      "Respuestas en formato JSON usando Spring Boot",
    ]],
    ["Tecnologias usadas", [
      "Java 17+  |  Spring Boot  |  Maven  |  REST API",
      "Almacenamiento en memoria (ArrayList) sin base de datos externa",
      "Herramientas: IntelliJ IDEA / VS Code, Postman para pruebas",
    ]],
    ["Aprendizajes clave", [
      "Uso de anotaciones @RestController, @GetMapping, @PostMapping, @DeleteMapping",
      "Mapeo de parametros con @PathVariable y @RequestParam",
      "Serializacion automatica a JSON con @RequestBody y @ResponseBody",
    ]],
  ];

  logros.forEach((bloque, bi) => {
    const yBase = 1.1 + bi * 1.42;
    s.addText(bloque[0], {
      x: 0.5, y: yBase, w: 9, h: 0.34,
      fontSize: 14, fontFace: "Calibri", bold: true, color: C.blue,
      align: "left", margin: 0,
    });
    s.addText(bloque[1].map(t => ({ text: t, options: { bullet: true, breakLine: true } })).slice(0, -1)
      .concat([{ text: bloque[1][bloque[1].length - 1], options: { bullet: true } }]),
    {
      x: 0.5, y: yBase + 0.36, w: 9, h: 1.0,
      fontSize: 11, fontFace: "Calibri", color: C.black,
      align: "left", margin: 0,
    });
  });
}

// ─── Guardar ───────────────────────────────────────────────────────────────
pres.writeFile({ fileName: "BookMora_Presentacion.pptx" })
  .then(() => console.log("✅ BookMora_Presentacion.pptx generado correctamente"))
  .catch(e => console.error("Error:", e));
