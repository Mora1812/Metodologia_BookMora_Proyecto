const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  VerticalAlign, PageNumber, Header, Footer, LevelFormat,
  PageBreak, TableOfContents,
} = require("docx");
const fs = require("fs");

// ─── Colores ────────────────────────────────────────────────────────────────
const BLUE   = "2E75B6";
const BLUE_L = "D6E4F0";
const GRAY_H = "F0F0F0";
const WHITE  = "FFFFFF";
const BLACK  = "1A1A1A";
const BORDER = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const BORDERS = { top: BORDER, bottom: BORDER, left: BORDER, right: BORDER };
const NO_BORDER = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const NO_BORDERS = { top: NO_BORDER, bottom: NO_BORDER, left: NO_BORDER, right: NO_BORDER };

// ─── Helpers de texto ───────────────────────────────────────────────────────
const bold  = (t, sz = 22, color = BLACK) => new TextRun({ text: t, bold: true,  size: sz, color, font: "Calibri" });
const norm  = (t, sz = 22, color = BLACK) => new TextRun({ text: t, bold: false, size: sz, color, font: "Calibri" });
const ital  = (t, sz = 22, color = BLACK) => new TextRun({ text: t, italic: true, size: sz, color, font: "Calibri" });
const code  = (t)                          => new TextRun({ text: t, font: "Courier New", size: 18, color: "333333" });
const br    = ()                           => new TextRun({ break: 1 });

// Párrafo normal
function p(children, opts = {}) {
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    ...opts,
    children: Array.isArray(children) ? children : [norm(children)],
  });
}

// Párrafo de alerta / tip con fondo azul claro
function callout(label, text, color = BLUE_L) {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    indent: { left: 360 },
    shading: { type: ShadingType.CLEAR, fill: color },
    children: [bold("► " + label + "  ", 20, BLUE), norm(text, 20)],
  });
}

// Bullet
function bullet(text, level = 0) {
  return new Paragraph({
    numbering: { reference: "bullets", level },
    spacing: { before: 40, after: 40 },
    children: [norm(text, 21)],
  });
}

// Bloque de código
function codeBlock(lines) {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    indent: { left: 360, right: 360 },
    shading: { type: ShadingType.CLEAR, fill: "F4F4F4" },
    border: { top: BORDER, bottom: BORDER, left: { style: BorderStyle.SINGLE, size: 8, color: BLUE }, right: BORDER },
    children: [code(lines)],
  });
}

// Separador horizontal
function hr() {
  return new Paragraph({
    spacing: { before: 120, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD" } },
    children: [],
  });
}

// Fila de tabla simple
function tRow(cells, header = false) {
  return new TableRow({
    tableHeader: header,
    children: cells.map((c, i) =>
      new TableCell({
        borders: BORDERS,
        shading: { type: ShadingType.CLEAR, fill: header ? BLUE : (i === 0 ? GRAY_H : WHITE) },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({
          children: [header
            ? bold(c, 20, WHITE)
            : (i === 0 ? bold(c, 20) : norm(c, 20))
          ],
        })],
      })
    ),
  });
}

// Tabla general
function table(rows, colWidths) {
  const total = colWidths.reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: rows.map((row, ri) =>
      new TableRow({
        tableHeader: ri === 0,
        children: row.map((cell, ci) =>
          new TableCell({
            borders: BORDERS,
            width: { size: colWidths[ci], type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: ri === 0 ? BLUE : (ri % 2 === 0 ? GRAY_H : WHITE) },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({
              children: [ri === 0 ? bold(cell, 19, WHITE) : norm(cell, 19)],
            })],
          })
        ),
      })
    ),
  });
}

function spaceAfter(px = 160) {
  return new Paragraph({ spacing: { before: 0, after: px }, children: [] });
}

// ─── Encabezado de sección de diapositiva ───────────────────────────────────
function slideHeader(num, title) {
  return [
    new Paragraph({ pageBreakBefore: true, children: [] }),
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 0, after: 120 },
      children: [
        new TextRun({ text: `Diapositiva ${num}  `, font: "Calibri", size: 36, bold: true, color: BLUE }),
        new TextRun({ text: title, font: "Calibri", size: 36, bold: true, color: BLACK }),
      ],
    }),
    hr(),
  ];
}

function subTitle(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 80 },
    children: [new TextRun({ text, font: "Calibri", size: 28, bold: true, color: BLUE })],
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// CONTENIDO DEL DOCUMENTO
// ═══════════════════════════════════════════════════════════════════════════
const children = [];

// ── PORTADA DEL DOCUMENTO ─────────────────────────────────────────────────
children.push(
  new Paragraph({ spacing: { before: 2400, after: 240 }, alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "GUÍA DE ESTUDIO", font: "Calibri", size: 56, bold: true, color: BLUE })] }),
  new Paragraph({ spacing: { before: 0, after: 120 }, alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "Proyecto BookMora — Exposición Scrum", font: "Calibri", size: 32, color: BLACK })] }),
  new Paragraph({ spacing: { before: 0, after: 80 }, alignment: AlignmentType.CENTER,
    children: [ital("API REST con Spring Boot", 26, "555555")] }),
  hr(),
  new Paragraph({ spacing: { before: 120, after: 60 }, alignment: AlignmentType.CENTER,
    children: [norm("Estudiante: ", 22), bold("Maria Jose Mora Mora", 22)] }),
  new Paragraph({ spacing: { before: 0, after: 60 }, alignment: AlignmentType.CENTER,
    children: [norm("Docente: ", 22), bold("Carlos Sneider Rodriguez", 22)] }),
  new Paragraph({ spacing: { before: 0, after: 60 }, alignment: AlignmentType.CENTER,
    children: [norm("Asignatura: ", 22), bold("Metodologias de Desarrollo de Software", 22)] }),
  new Paragraph({ spacing: { before: 0, after: 60 }, alignment: AlignmentType.CENTER,
    children: [norm("Institución: ", 22), bold("ISER — Pamplona, Norte de Santander", 22)] }),
  new Paragraph({ spacing: { before: 0, after: 60 }, alignment: AlignmentType.CENTER,
    children: [norm("Fecha: ", 22), bold("Mayo 2026", 22)] }),
  spaceAfter(200),
  callout("Para qué sirve esta guía",
    "Cada sección explica qué hay en cada diapositiva, qué debes saber antes de hablar, exactamente qué decir en voz alta, qué NO decir para no perderte, y las preguntas más comunes que hace el profesor con respuestas completas sugeridas."),
  new Paragraph({ children: [new PageBreak()] }),
);

// ── TABLA DE CONTENIDO ────────────────────────────────────────────────────
children.push(
  new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 0, after: 200 },
    children: [new TextRun({ text: "Tabla de Contenido", font: "Calibri", size: 36, bold: true, color: BLACK })] }),
  new TableOfContents("Tabla de Contenido", { hyperlink: true, headingStyleRange: "1-2" }),
  new Paragraph({ children: [new PageBreak()] }),
);

// ═══════════════════════════════════════════════════════════════════════════
// DIAPOSITIVA 1 – PORTADA
// ═══════════════════════════════════════════════════════════════════════════
children.push(...slideHeader(1, "Portada"));

children.push(
  subTitle("¿Qué contiene esta diapositiva?"),
  p([norm("Muestra el nombre del proyecto "), bold("BookMora"), norm(", el subtítulo "), ital("Plataforma Web de Cuentos Cortos"), norm(", tu nombre, el nombre del docente ("), bold("Carlos Sneider Rodriguez"), norm("), la asignatura "), bold("Metodologías de Desarrollo de Software"), norm(", la institución "), bold("ISER — Pamplona"), norm(" y la fecha "), bold("Mayo 2026"), norm(".")]),

  subTitle("¿Qué debes saber antes de hablar?"),
  bullet("Tienes que saber pronunciar bien el nombre del proyecto y del docente."),
  bullet("Debes poder explicar en una oración qué hace BookMora: una plataforma que gestiona cuentos cortos mediante una API REST."),
  bullet("La institución se llama ISER (Instituto Superior de Educación Rural), no confundirla con otra."),
  spaceAfter(),

  subTitle("¿Qué decir exactamente?"),
  callout("Di esto en voz alta",
    "«Buenos días / tardes. Mi nombre es María José Mora Mora. El proyecto que voy a presentar se llama BookMora, una plataforma web para gestionar cuentos cortos. El backend está desarrollado con Spring Boot y expone una API REST. La presentación está organizada bajo la metodología Scrum y cubre desde el modelado del sistema hasta los endpoints implementados. Voy a comenzar.»"),

  subTitle("¿Qué NO decir?"),
  bullet("No leas la diapositiva como lista. Solo di la oración anterior y pasa."),
  bullet("No digas «este es mi proyecto de...» sin explicar qué hace el proyecto."),
  spaceAfter(),

  subTitle("Preguntas frecuentes del profesor"),
  table([
    ["Pregunta", "Respuesta sugerida"],
    ["¿Qué es BookMora?",
      "Es una plataforma web de cuentos cortos. Permite gestionar autores, categorías, cuentos y favoritos a través de una API REST desarrollada en Spring Boot."],
    ["¿Por qué se llama BookMora?",
      "Es una combinación de 'Book' (libro en inglés) y 'Mora', apellido de la desarrolladora. Representa una plataforma personal de literatura digital."],
    ["¿Qué tecnología usaron?",
      "Java con Spring Boot para el backend. La API expone endpoints HTTP que retornan respuestas en formato JSON."],
  ], [3600, 5400]),
);

// ═══════════════════════════════════════════════════════════════════════════
// DIAPOSITIVA 2 – AGENDA
// ═══════════════════════════════════════════════════════════════════════════
children.push(...slideHeader(2, "Agenda"));

children.push(
  subTitle("¿Qué contiene esta diapositiva?"),
  p("Lista de los 9 bloques temáticos de la exposición, numerados del 01 al 09, organizados en dos columnas con cuadros azules numerados."),

  subTitle("¿Qué decir exactamente?"),
  callout("Di esto en voz alta",
    "«La presentación está organizada en nueve secciones. Primero explico la metodología Scrum bajo la que trabajé. Luego presento los requerimientos del sistema, seguido de los tres diagramas de modelado: casos de uso, entidad-relación y clases. Después muestro la estructura del código, el modelo de tabla de la entidad principal, los endpoints de la API y finalmente las conclusiones del Sprint.»"),

  subTitle("Consejo de transición entre diapositivas"),
  callout("Tip",
    "Cada vez que cambias de diapositiva, di el nombre de la siguiente: «Pasemos a la metodología Scrum», «Ahora veamos los requerimientos». Esto muestra que dominas la estructura y le da ritmo a la exposición."),

  subTitle("Preguntas frecuentes del profesor"),
  table([
    ["Pregunta", "Respuesta sugerida"],
    ["¿Cuántos temas cubre la presentación?",
      "Nueve bloques principales: Scrum, requerimientos, casos de uso, MER, clases, estructura del proyecto, modelo de tabla, endpoints y conclusiones."],
    ["¿Por qué organizaron la presentación así?",
      "El orden sigue el flujo natural del desarrollo Scrum: primero se define el proceso, luego los requerimientos, luego el diseño (diagramas) y finalmente la implementación (código y endpoints)."],
  ], [3600, 5400]),
);

// ═══════════════════════════════════════════════════════════════════════════
// DIAPOSITIVA 3 – SCRUM
// ═══════════════════════════════════════════════════════════════════════════
children.push(...slideHeader(3, "Metodología Scrum"));

children.push(
  subTitle("¿Qué contiene esta diapositiva?"),
  p("Definición de Scrum, tabla con los tres roles (Product Owner, Scrum Master, Dev Team) y su responsabilidad específica en BookMora, más el diagrama del ciclo de un Sprint con las 5 fases."),

  subTitle("¿Qué debes saber?"),
  table([
    ["Concepto", "Explicación en tus palabras"],
    ["Scrum", "Framework ágil para proyectos de software. Organiza el trabajo en ciclos cortos llamados Sprints y permite entregar valor de forma continua."],
    ["Sprint", "Período de tiempo fijo (1 a 4 semanas) al final del cual se entrega un incremento funcional del producto. En BookMora fue de 2 semanas."],
    ["Product Backlog", "Lista completa y priorizada de todo lo que se quiere construir en el proyecto (todos los requerimientos)."],
    ["Sprint Backlog", "Subconjunto del Product Backlog que el equipo se compromete a completar en el Sprint actual."],
    ["Sprint Review", "Reunión al final del Sprint donde se muestra lo que se construyó. En este caso: los endpoints funcionando."],
    ["Retrospectiva", "Reunión interna del equipo para analizar qué salió bien, qué salió mal y cómo mejorar en el próximo Sprint."],
    ["Product Owner", "Define y prioriza los requerimientos. Decide qué se construye primero."],
    ["Scrum Master", "Facilita el proceso, quita obstáculos al equipo. No es el jefe, es el facilitador."],
    ["Dev Team", "El equipo que construye el producto. En BookMora: desarrolló los 4 controladores y 4 modelos."],
  ], [2800, 6200]),
  spaceAfter(),

  subTitle("¿Qué decir exactamente?"),
  callout("Di esto en voz alta",
    "«Para desarrollar BookMora usé la metodología Scrum. Scrum es un framework ágil que organiza el trabajo en ciclos cortos llamados Sprints. En este proyecto trabajé en un único Sprint de dos semanas. El objetivo de ese Sprint era entregar una API REST funcional con operaciones CRUD para las cuatro entidades del sistema: Autor, Categoría, Cuento y Favorito. En cuanto a los roles: el Product Owner define qué se construye, el Scrum Master facilita el proceso, y el equipo de desarrollo implementa el código. Las cinco fases del Sprint son: planificación, ejecución, revisión y retrospectiva.»"),

  subTitle("¿Qué NO decir?"),
  bullet("No confundas Scrum Master con el jefe del proyecto. Aclara que es el facilitador."),
  bullet("No digas que Scrum es una metodología de gestión de proyectos en general — es específico para software ágil."),
  bullet("No mezcles Sprint con iteración de otra metodología como XP o RUP."),
  spaceAfter(),

  subTitle("Preguntas frecuentes del profesor"),
  table([
    ["Pregunta", "Respuesta sugerida"],
    ["¿Qué es un Sprint?",
      "Es un período de tiempo fijo, entre 1 y 4 semanas, al final del cual se entrega un incremento funcional del software. El equipo planifica al inicio y hace una revisión al final."],
    ["¿Cuál era el objetivo del Sprint de BookMora?",
      "Implementar la API REST completa con los cuatro controladores (Autor, Categoria, Cuento, Favorito), cada uno con cinco operaciones: listar, buscar, agregar, eliminar y filtrar. En total 20 endpoints."],
    ["¿Qué diferencia hay entre Product Backlog y Sprint Backlog?",
      "El Product Backlog tiene TODOS los requerimientos del sistema priorizados. El Sprint Backlog es solo lo que el equipo decide completar en el Sprint actual. Es un subconjunto del Backlog completo."],
    ["¿Por qué elegiste Scrum y no otra metodología?",
      "Scrum permite trabajar en ciclos cortos con entregas concretas. Para un proyecto académico de estas características, la estructura de Sprint con objetivo claro (entregar la API) es ideal porque permite medir el avance y hacer ajustes rápidamente."],
    ["¿Cuántos Sprints hiciste?",
      "Un Sprint de dos semanas. El entregable fue la API REST completa con los 20 endpoints implementados y funcionando."],
  ], [3200, 5800]),
);

// ═══════════════════════════════════════════════════════════════════════════
// DIAPOSITIVA 4 – REQUERIMIENTOS
// ═══════════════════════════════════════════════════════════════════════════
children.push(...slideHeader(4, "Requerimientos del Sistema"));

children.push(
  subTitle("¿Qué contiene esta diapositiva?"),
  p("Tabla con 7 requerimientos funcionales (RF-01 a RF-07), cada uno con nombre corto y descripción de lo que hace el sistema."),

  subTitle("¿Qué debes saber?"),
  p([bold("Requerimiento funcional"), norm(": describe QUÉ debe hacer el sistema desde el punto de vista del usuario. NO describe cómo lo implementa internamente.")]),
  p([bold("Requerimiento no funcional"), norm(": describe CÓMO debe comportarse (rendimiento, seguridad, disponibilidad). En este Sprint no están en la presentación pero debes saber la diferencia.")]),
  spaceAfter(),
  table([
    ["ID", "Lo que cubre", "Cómo está implementado en el código"],
    ["RF-01", "Gestión de Autores", "AutorController: 5 endpoints sobre listaAutor"],
    ["RF-02", "Gestión de Categorías", "CategoriaController: 5 endpoints sobre listaCategoria"],
    ["RF-03", "Gestión de Cuentos", "CuentoController: 5 endpoints, con autoId y categId como FK"],
    ["RF-04", "Gestión de Favoritos", "FavoritoController: 5 endpoints, con cuentoId como FK"],
    ["RF-05", "Buscar por ID", "GET /{entidad}/{id} con @PathVariable"],
    ["RF-06", "Filtrar por atributo", "GET /filtrar?param= con @RequestParam"],
    ["RF-07", "API REST HTTP", "@RestController + @GetMapping/@PostMapping/@DeleteMapping"],
  ], [1200, 2800, 5000]),
  spaceAfter(),

  subTitle("¿Qué decir exactamente?"),
  callout("Di esto en voz alta",
    "«El sistema tiene siete requerimientos funcionales. Los primeros cuatro cubren la gestión completa de cada entidad: Autor, Categoría, Cuento y Favorito. El RF-05 especifica que se puede buscar cualquier registro por su ID. El RF-06 permite filtrar listas por atributos como nombre o ID de autor. Y el RF-07 establece que toda la comunicación es mediante HTTP con respuestas en formato JSON.»"),

  subTitle("Preguntas frecuentes del profesor"),
  table([
    ["Pregunta", "Respuesta sugerida"],
    ["¿Cuál es la diferencia entre requerimiento funcional y no funcional?",
      "Un requerimiento funcional describe una funcionalidad específica del sistema, qué hace. Un no funcional describe cómo debe comportarse: velocidad, seguridad, disponibilidad. Por ejemplo RF-05 dice 'buscar por ID' (funcional); 'la búsqueda debe responder en menos de 200ms' sería no funcional."],
    ["¿Por qué no hay requerimiento de base de datos persistente?",
      "En este Sprint se priorizó implementar la lógica de la API. El almacenamiento es en memoria con ArrayList. La persistencia con base de datos real (el DER está diseñado en PostgreSQL) sería un requerimiento para el siguiente Sprint."],
    ["¿Cuántos endpoints resultaron de estos requerimientos?",
      "20 endpoints en total: 4 entidades × 5 operaciones (listar, buscar, agregar, eliminar, filtrar)."],
  ], [3200, 5800]),
);

// ═══════════════════════════════════════════════════════════════════════════
// DIAPOSITIVA 5 – CASOS DE USO
// ═══════════════════════════════════════════════════════════════════════════
children.push(...slideHeader(5, "Diagrama de Casos de Uso"));

children.push(
  subTitle("¿Qué contiene esta diapositiva?"),
  p("Figura de un actor (Usuario representado como persona con cabeza, cuerpo, brazos y piernas) conectado a 5 óvalos que representan los casos de uso. A la derecha, tabla que mapea cada caso de uso a su endpoint y método HTTP."),

  subTitle("¿Qué debes saber?"),
  table([
    ["Elemento UML", "Qué es", "En BookMora"],
    ["Actor", "Entidad externa que interactúa con el sistema. Puede ser persona, sistema o proceso.", "El Usuario que consume la API (puede ser Postman, una app web, etc.)"],
    ["Caso de uso", "Funcionalidad concreta que el sistema ofrece al actor. Se dibuja como óvalo.", "Listar, Buscar, Insertar, Eliminar, Filtrar"],
    ["Relación actor-caso", "Línea que conecta al actor con los casos que puede ejecutar.", "El Usuario puede ejecutar los 5 casos de uso"],
    ["Límite del sistema", "Rectángulo que encierra los casos de uso. No está en la diapositiva pero debes saber que existe.", "Sería el rectángulo que engloba los 5 óvalos"],
  ], [2000, 3200, 3800]),
  spaceAfter(),

  subTitle("¿Qué decir exactamente?"),
  callout("Di esto en voz alta",
    "«El diagrama de casos de uso muestra qué puede hacer el usuario con el sistema. El actor principal es el Usuario, que puede ejecutar cinco operaciones: listar todos los registros, buscar uno específico por ID, insertar un nuevo registro, eliminarlo, y filtrar por algún atributo. Cada uno de estos casos de uso corresponde a uno o más endpoints de la API. Por ejemplo, 'Buscar por ID' corresponde a los endpoints GET /autor/{id}, GET /cuento/{id}, etc.»"),

  subTitle("¿Qué NO decir?"),
  bullet("No confundas el caso de uso con el método Java. El caso de uso es la funcionalidad visible para el usuario; el método es la implementación interna."),
  bullet("No digas que hay un caso de uso por endpoint. Hay 5 casos de uso y 20 endpoints porque cada caso aplica a 4 entidades."),
  spaceAfter(),

  subTitle("Preguntas frecuentes del profesor"),
  table([
    ["Pregunta", "Respuesta sugerida"],
    ["¿Qué es un actor en UML?",
      "Un actor es cualquier entidad externa que interactúa con el sistema. Puede ser una persona, otro sistema o un proceso automatizado. En BookMora el actor es el Usuario que hace peticiones HTTP a la API."],
    ["¿Por qué solo hay un actor?",
      "Porque en este Sprint no hay sistema de autenticación ni roles diferenciados. Cualquier cliente que acceda a la API tiene las mismas capacidades. En un sistema real tendríamos Actor:Usuario y Actor:Administrador con casos de uso diferentes."],
    ["¿Qué relación existe entre casos de uso y endpoints?",
      "Cada caso de uso se implementa mediante uno o más endpoints. 'Buscar por ID' tiene 4 endpoints (uno por entidad). 'Insertar' tiene otros 4. En total 5 casos de uso × 4 entidades = 20 endpoints."],
    ["¿Cuántos actores debería tener el sistema completo?",
      "En una versión completa tendría al menos dos: Usuario (lector) con acceso de solo lectura y favoritos, y Administrador con capacidad de agregar y eliminar contenido."],
  ], [3200, 5800]),
);

// ═══════════════════════════════════════════════════════════════════════════
// DIAPOSITIVA 6 – MER
// ═══════════════════════════════════════════════════════════════════════════
children.push(...slideHeader(6, "Modelo Entidad-Relación (MER)"));

children.push(
  subTitle("¿Qué contiene esta diapositiva?"),
  p("La imagen real del diagrama entidad-relación generado en pgAdmin 4 con PostgreSQL 18, tal como aparece en el informe de modelado. Muestra las 4 tablas con sus columnas reales, tipos de datos y líneas de relación."),

  subTitle("Datos exactos del diagrama (memoriza esto)"),
  table([
    ["Tabla", "Columnas", "Tipo", "Restricción"],
    ["AUTOR", "AUTO_ID", "serial", "PK"],
    ["AUTOR", "AUTO_NOMBRE", "varchar(100)", "NOT NULL"],
    ["AUTOR", "AUTO_EMAIL", "varchar(150)", "—"],
    ["CATEGORIA", "CATE_ID", "serial", "PK"],
    ["CATEGORIA", "CATE_NOMBRE", "varchar(100)", "NOT NULL"],
    ["CATEGORIA", "CATE_DESCRIPCION", "text", "—"],
    ["CUENTO", "CUEN_ID", "serial", "PK"],
    ["CUENTO", "CUEN_TITULO", "varchar(200)", "NOT NULL"],
    ["CUENTO", "CUEN_DESCRIPCION", "text", "—"],
    ["CUENTO", "CUEN_CONTENIDO", "text", "—"],
    ["CUENTO", "CUENT_FECHA_PUBLICACION", "date", "—"],
    ["CUENTO", "AUTO_ID", "integer", "FK → AUTOR"],
    ["CUENTO", "CATE_ID", "integer", "FK → CATEGORIA"],
    ["FAVORITO", "FAVO_ID", "serial", "PK"],
    ["FAVORITO", "FAVO_FECHA_GUARDADO", "date", "—"],
    ["FAVORITO", "CUEN_ID", "integer", "FK → CUENTO"],
  ], [1500, 2700, 1800, 3000]),
  spaceAfter(),

  subTitle("¿Qué decir exactamente?"),
  callout("Di esto en voz alta",
    "«Este es el diagrama entidad-relación del sistema BookMora, generado en pgAdmin 4 con PostgreSQL 18. Tenemos cuatro entidades principales. AUTOR tiene tres columnas: AUTO_ID como clave primaria de tipo serial, AUTO_NOMBRE y AUTO_EMAIL. CATEGORIA tiene CATE_ID, CATE_NOMBRE y CATE_DESCRIPCION. CUENTO es la entidad central con siete columnas: además de sus datos propios, tiene dos claves foráneas: AUTO_ID que referencia a AUTOR, y CATE_ID que referencia a CATEGORIA. FAVORITO tiene FAVO_ID, la fecha de guardado, y CUEN_ID como clave foránea que apunta a CUENTO. Todas las relaciones son de uno a muchos: un autor puede tener muchos cuentos, una categoría puede clasificar muchos cuentos, y un cuento puede estar guardado en muchos favoritos.»"),

  subTitle("¿Qué NO decir?"),
  bullet("No confundas los nombres de columnas del DER (AUTO_ID) con los atributos Java (autoId). Son el mismo dato representado diferente."),
  bullet("No digas que la base de datos está implementada — en el Sprint actual el almacenamiento es en memoria. El DER es el diseño para la BD real."),
  spaceAfter(),

  subTitle("Diferencia MER vs Diagrama de Clases — pregunta muy frecuente"),
  table([
    ["Aspecto", "MER", "Diagrama de Clases"],
    ["¿Qué modela?", "La estructura de los DATOS (base de datos)", "La estructura del CÓDIGO (clases Java)"],
    ["¿Desde qué perspectiva?", "Perspectiva de almacenamiento y relaciones de datos", "Perspectiva de objetos, atributos y comportamiento"],
    ["¿Incluye métodos?", "No. Solo entidades, atributos y relaciones.", "Sí. Incluye getters, setters y otros métodos."],
    ["¿Herramienta usada?", "pgAdmin 4 con PostgreSQL 18", "Diseño UML (diagrama de clases)"],
    ["Nombres de columnas", "AUTO_ID, CUEN_TITULO (convención BD)", "idAutor, cuentoTitulo (camelCase Java)"],
  ], [1800, 3600, 3600]),
  spaceAfter(),

  subTitle("Preguntas frecuentes del profesor"),
  table([
    ["Pregunta", "Respuesta sugerida"],
    ["¿Cuál es la diferencia entre PK y FK?",
      "PK (Primary Key o Clave Primaria) es el campo que identifica de forma única cada registro en una tabla. No puede ser nulo ni repetirse. FK (Foreign Key o Clave Foránea) es un campo que referencia la PK de otra tabla, estableciendo una relación entre ellas."],
    ["¿Por qué CUENTO tiene dos FK?",
      "Porque un cuento pertenece a un autor (quien lo escribió) y a una categoría (su género o tipo). Necesita ambas referencias para representar esas dos relaciones del mundo real."],
    ["¿Qué significa 'serial' en PostgreSQL?",
      "Serial es un tipo de dato en PostgreSQL que genera automáticamente un número entero incremental. Es equivalente a AUTO_INCREMENT en MySQL. Perfecto para claves primarias que se asignan automáticamente."],
    ["¿Qué tipo de relaciones hay en el modelo?",
      "Tres relaciones 1:N (uno a muchos): AUTOR a CUENTO, CATEGORIA a CUENTO, y CUENTO a FAVORITO. Un autor puede tener muchos cuentos, pero cada cuento tiene un solo autor."],
  ], [3200, 5800]),
);

// ═══════════════════════════════════════════════════════════════════════════
// DIAPOSITIVA 7 – DIAGRAMA DE CLASES
// ═══════════════════════════════════════════════════════════════════════════
children.push(...slideHeader(7, "Diagrama de Clases UML"));

children.push(
  subTitle("¿Qué contiene esta diapositiva?"),
  p("La imagen real del diagrama de clases UML del informe, con fondo oscuro y texto verde/blanco. Muestra las 4 clases (Autor, Categoria, Cuento, Favorito) con atributos privados (-) y métodos públicos (+), y las líneas de asociación entre ellas."),

  subTitle("Datos exactos del diagrama — memoriza las clases"),
  table([
    ["Clase", "Atributos (-)", "Métodos públicos (+)"],
    ["Autor", "IdAutor: int, Nombre: String, Correo: String",
      "GetIdAutor():int, SetIdAutor(int):void, GetNombre():String, SetNombre(String):void, GetCorreo():String, SetCorreo(String):void"],
    ["Categoria", "IdCategoria: int, Nombre: String, Descripcion: String",
      "GetIdCategoria():int, SetIdCategoria(int):void, GetNombre():String, SetNombre(String):void, GetDescripcion():String, SetDescripcion(String):void"],
    ["Cuento", "IdCuento: int, Titulo: String, Descripcion: String, Contenido: String, FechaPublicacion: Date",
      "GetIdCuento():int, SetIdCuento(int):void, GetTitulo():String, SetTitulo(String):void, GetDescripcion():String, SetContenido():String, GetFechaPublicacion():Date, SetFechaPublicacion(Date):void"],
    ["Favorito", "IdFavorito: int, FechaGuardado: Date",
      "GetIdFavorito():int, SetIdFavorito(int):void, GetFechaGuardado():Date, SetFechaGuardado(Date):void"],
  ], [1500, 3000, 4500]),
  spaceAfter(),

  subTitle("¿Qué decir exactamente?"),
  callout("Di esto en voz alta",
    "«El diagrama de clases muestra la estructura orientada a objetos del sistema. Tenemos cuatro clases principales. La notación UML usa el signo menos para los atributos privados y el signo más para los métodos públicos. Todas las clases son POJOs: tienen atributos privados para proteger los datos y métodos getter y setter para acceder a ellos desde otras clases. La clase Cuento es la más compleja con cinco atributos propios. Las relaciones entre clases reflejan las mismas asociaciones del MER: Autor tiene una relación de asociación con Cuento, Categoria también, y Cuento con Favorito.»"),

  subTitle("¿Qué debes saber? — Conceptos clave"),
  table([
    ["Concepto", "Definición", "Ejemplo en BookMora"],
    ["POJO", "Plain Old Java Object. Clase Java simple sin dependencias de frameworks.", "Autor, Categoria, Cuento, Favorito"],
    ["Encapsulamiento", "Atributos privados + acceso mediante métodos públicos.", "private int idAutor + public int getIdAutor()"],
    ["Getter", "Método que retorna el valor de un atributo privado.", "public String getNombre() { return nombre; }"],
    ["Setter", "Método que asigna un valor al atributo privado.", "public void setNombre(String v) { this.nombre = v; }"],
    ["Visibilidad - (UML)", "Private. Solo accesible dentro de la misma clase.", "- idAutor: int"],
    ["Visibilidad + (UML)", "Public. Accesible desde cualquier clase.", "+ getNombre(): String"],
  ], [1400, 3600, 4000]),
  spaceAfter(),

  subTitle("Preguntas frecuentes del profesor"),
  table([
    ["Pregunta", "Respuesta sugerida"],
    ["¿Por qué los atributos son privados?",
      "Por encapsulamiento, uno de los principios fundamentales de la Programación Orientada a Objetos. Los atributos privados no pueden ser modificados directamente desde fuera de la clase. Solo se accede a ellos a través de los getters y setters, lo que permite controlar y validar el acceso."],
    ["¿Qué diferencia hay entre el MER y el Diagrama de Clases?",
      "El MER modela los datos desde la perspectiva de la base de datos: entidades, columnas con tipos SQL, claves primarias y foráneas. El Diagrama de Clases modela el código desde la perspectiva orientada a objetos: clases Java, atributos con tipos Java, métodos, y relaciones de herencia o asociación."],
    ["¿Estas clases tienen herencia?",
      "No. Las cuatro clases son independientes. No existe una clase padre común porque no comparten comportamiento genérico que justifique crear una jerarquía de herencia."],
    ["¿Qué es un POJO?",
      "Plain Old Java Object. Es una clase Java simple que solo tiene atributos, constructor, getters y setters. No extiende ninguna clase especial ni implementa interfaces de frameworks. Las clases Autor, Categoria, Cuento y Favorito son todas POJOs."],
    ["¿Por qué Jackson puede convertir estos objetos a JSON automáticamente?",
      "Porque Jackson lee los métodos getter de la clase para encontrar los atributos a serializar. Por eso es crucial que existan los getters con el nombre correcto: getNombre() se convierte en el campo 'nombre' del JSON."],
  ], [3200, 5800]),
);

// ═══════════════════════════════════════════════════════════════════════════
// DIAPOSITIVA 8 – ESTRUCTURA DEL PROYECTO
// ═══════════════════════════════════════════════════════════════════════════
children.push(...slideHeader(8, "Estructura del Proyecto"));

children.push(
  subTitle("¿Qué contiene esta diapositiva?"),
  p("Árbol de carpetas del proyecto en bloque de código monoespaciado a la izquierda, y tabla descriptiva de cada capa a la derecha. Nota al pie sobre el almacenamiento en memoria y el puerto 8080."),

  subTitle("Estructura que debes dominar"),
  codeBlock(
    "src/main/java/com/example/demo/\n" +
    "  DemoApplication.java       ← @SpringBootApplication\n" +
    "  controller/\n" +
    "    AutorController.java     ← 5 endpoints\n" +
    "    CategoriaController.java ← 5 endpoints\n" +
    "    CuentoController.java    ← 5 endpoints\n" +
    "    FavoritoController.java  ← 5 endpoints\n" +
    "  models/\n" +
    "    Autor.java               ← POJO\n" +
    "    Categoria.java           ← POJO\n" +
    "    Cuento.java              ← POJO\n" +
    "    Favorito.java            ← POJO\n" +
    "src/main/resources/\n" +
    "  application.properties    ← configuración\n" +
    "pom.xml                      ← dependencias Maven"
  ),
  spaceAfter(),

  subTitle("¿Qué decir exactamente?"),
  callout("Di esto en voz alta",
    "«La estructura del proyecto sigue una arquitectura MVC simplificada. En la carpeta models están los cuatro POJOs que representan las entidades del sistema. En la carpeta controller están los cuatro controladores REST, uno por entidad, cada uno con cinco endpoints. La clase DemoApplication con la anotación @SpringBootApplication es el punto de entrada que arranca el servidor en el puerto 8080. No hay una capa de repositorio porque el almacenamiento es en listas ArrayList en memoria, lo que significa que los datos se pierden cuando el servidor se reinicia. Para un sistema en producción, se añadiría JPA con conexión a la base de datos PostgreSQL diseñada en el MER.»"),

  subTitle("Preguntas frecuentes del profesor"),
  table([
    ["Pregunta", "Respuesta sugerida"],
    ["¿Qué hace @SpringBootApplication?",
      "Es una anotación combinada que equivale a tres anotaciones juntas: @Configuration (configura el contexto Spring), @EnableAutoConfiguration (configura automáticamente los beans necesarios) y @ComponentScan (busca y registra componentes en el paquete actual y subpaquetes)."],
    ["¿Por qué no hay capa de Service?",
      "En proyectos simples con lógica mínima, el controlador puede manejar directamente la operación. En un sistema real se añadiría una capa Service para separar la lógica de negocio de la lógica HTTP, lo que facilita las pruebas unitarias y el mantenimiento."],
    ["¿Dónde están almacenados los datos?",
      "En listas ArrayList dentro de cada controlador. Son variables de instancia que persisten mientras el servidor está activo, pero se pierden al reiniciarlo porque están en memoria RAM, no en disco ni en base de datos."],
    ["¿Qué es Maven y para qué sirve el pom.xml?",
      "Maven es una herramienta de gestión de dependencias y construcción de proyectos Java. En pom.xml declaramos las librerías que necesitamos, como Spring Web. Maven las descarga automáticamente y también compila, prueba y empaqueta el proyecto."],
    ["¿Por qué usa el puerto 8080?",
      "Es el puerto por defecto de Spring Boot. Se puede cambiar en application.properties con la propiedad server.port=8081, por ejemplo."],
  ], [3200, 5800]),
);

// ═══════════════════════════════════════════════════════════════════════════
// DIAPOSITIVA 9 – MODELO DE TABLA
// ═══════════════════════════════════════════════════════════════════════════
children.push(...slideHeader(9, "Modelo de Tabla: Cuento"));

children.push(
  subTitle("¿Qué contiene esta diapositiva?"),
  p("Tabla completa con los 7 campos de la entidad Cuento: nombre del campo Java, nombre de columna en la BD (según el DER), tipo de dato en PostgreSQL, restricción y descripción. Abajo, el código Java de la clase con todos los atributos y un comentario de los getters/setters."),

  subTitle("Campos exactos que debes memorizar"),
  table([
    ["Campo Java", "Columna BD", "Tipo BD", "Restricción", "Descripción"],
    ["cuentoId", "CUEN_ID", "serial", "PK", "Identificador único autoincremental"],
    ["cuentoTitulo", "CUEN_TITULO", "varchar(200)", "NOT NULL", "Título del cuento"],
    ["cuentoDescripcion", "CUEN_DESCRIPCION", "text", "—", "Resumen o sinopsis corta"],
    ["cuentoContenido", "CUEN_CONTENIDO", "text", "—", "Texto completo del cuento"],
    ["cuentoFechaPublicacion", "CUENT_FECHA_PUBLICACION", "date", "—", "Fecha de publicación"],
    ["autoId", "AUTO_ID", "integer", "FK → AUTOR", "Referencia al autor del cuento"],
    ["categId", "CATE_ID", "integer", "FK → CATEGORIA", "Referencia a la categoría"],
  ], [1700, 2100, 1300, 1500, 2400]),
  spaceAfter(),

  subTitle("¿Qué decir exactamente?"),
  callout("Di esto en voz alta",
    "«Esta diapositiva muestra el modelo completo de la entidad Cuento, que es la entidad central del sistema. Tiene siete campos. El cuentoId es la clave primaria de tipo serial en PostgreSQL, es decir, se genera automáticamente. El cuentoTitulo es de tipo varchar con máximo 200 caracteres y es obligatorio. La descripción y el contenido son de tipo text, para textos largos sin límite. La fechaPublicacion es de tipo date. Y los dos últimos campos son claves foráneas: autoId que referencia al autor que escribió el cuento, y categId que referencia la categoría a la que pertenece. En Java, estos campos se declaran como atributos privados con sus respectivos getters y setters.»"),

  subTitle("Preguntas frecuentes del profesor"),
  table([
    ["Pregunta", "Respuesta sugerida"],
    ["¿Cuál es la clave primaria de Cuento y por qué?",
      "La clave primaria es cuentoId (CUEN_ID en la BD), de tipo serial en PostgreSQL. Es PK porque identifica de forma única cada cuento. Se usa serial para que la base de datos genere el número automáticamente al insertar."],
    ["¿Por qué Cuento tiene dos claves foráneas?",
      "Porque un cuento tiene dos relaciones: pertenece a un autor (autoId) y pertenece a una categoría (categId). Ambas relaciones son necesarias para el modelo de datos completo."],
    ["¿Cómo convierte Spring Boot la clase Cuento a JSON?",
      "Spring Boot usa Jackson automáticamente. Jackson llama a los getters de la clase: getCuentoId() se convierte en el campo 'cuentoId' del JSON, getCuentoTitulo() en 'cuentoTitulo', etc. Por eso los getters deben seguir la convención de nombres getXxx()."],
    ["¿Qué diferencia hay entre varchar y text en PostgreSQL?",
      "varchar(n) limita el texto a n caracteres. Es útil para campos con longitud conocida como el título (máx 200 chars). text no tiene límite de longitud y es ideal para el contenido completo del cuento que puede ser muy largo."],
  ], [3200, 5800]),
);

// ═══════════════════════════════════════════════════════════════════════════
// DIAPOSITIVA 10 – GET ESPECÍFICO
// ═══════════════════════════════════════════════════════════════════════════
children.push(...slideHeader(10, "GET – Buscar Objeto Específico"));

children.push(
  subTitle("¿Qué contiene esta diapositiva?"),
  p("Tabla con los detalles del endpoint (método HTTP, URL, parámetro, qué retorna, código HTTP), código Java del método buscar() con @PathVariable, y el JSON de respuesta de ejemplo."),

  subTitle("¿Qué debes saber?"),
  table([
    ["Elemento", "Explicación"],
    ["@GetMapping(\"/autor/{id}\")", "Registra el método para peticiones HTTP GET a esa URL. {id} es un marcador de posición."],
    ["@PathVariable int id", "Extrae el valor de {id} desde la URL y lo inyecta como parámetro Java. Ej: /autor/1 → id = 1."],
    ["Lógica del for", "Recorre toda la lista buscando el autor cuyo idAutor coincida con el parámetro. O(n) — recorre todos."],
    ["return a", "Cuando encuentra el autor, lo retorna inmediatamente. Spring Boot lo convierte a JSON."],
    ["return null", "Si no encuentra el ID, retorna null. Spring Boot envía HTTP 200 con cuerpo vacío."],
  ], [3000, 6000]),
  spaceAfter(),
  codeBlock(
    "@GetMapping(\"/autor/{id}\")\n" +
    "public Autor buscar(@PathVariable int id) {\n" +
    "    for (Autor a : listaAutor) {\n" +
    "        if (a.getIdAutor() == id) {\n" +
    "            return a;\n" +
    "        }\n" +
    "    }\n" +
    "    return null;\n" +
    "}"
  ),
  spaceAfter(),

  subTitle("¿Qué decir exactamente?"),
  callout("Di esto en voz alta",
    "«Este endpoint recibe el ID del autor directamente en la URL. La anotación @GetMapping define que responde a peticiones GET. La anotación @PathVariable extrae el valor del ID de la URL y lo pasa como parámetro entero al método. Luego recorre la lista con un for, y cuando encuentra el autor cuyo idAutor coincide con el parámetro, lo retorna. Spring Boot convierte automáticamente el objeto a JSON. Si el ID no existe en la lista, el método retorna null y el cliente recibe un HTTP 200 con cuerpo vacío.»"),

  subTitle("Preguntas frecuentes del profesor"),
  table([
    ["Pregunta", "Respuesta sugerida"],
    ["¿Cuál es la diferencia entre @PathVariable y @RequestParam?",
      "@PathVariable extrae el valor directamente de la ruta URL, por ejemplo /autor/1 → id=1. @RequestParam extrae el valor de los parámetros de consulta (query string), por ejemplo /filtrarAutor?nombre=Borges → nombre='Borges'. PathVariable va en la URL, RequestParam va después del signo de interrogación."],
    ["¿Qué pasa si el ID no existe?",
      "El método retorna null. Spring Boot serializa null como un cuerpo de respuesta vacío con código HTTP 200 OK. En una API de producción se debería retornar HTTP 404 Not Found usando ResponseEntity para indicar explícitamente que el recurso no fue encontrado."],
    ["¿Es eficiente este algoritmo de búsqueda?",
      "Para el alcance de este proyecto académico es suficiente. En el peor caso recorre toda la lista: O(n). En producción con base de datos PostgreSQL, se usarían índices en la PK que permiten buscar en O(log n) con B-tree o O(1) con hash, mucho más eficiente."],
    ["¿Por qué se usa == para comparar int y no .equals()?",
      "Porque id es un tipo primitivo int, no un objeto Integer. Para tipos primitivos se usa ==. Si fuera Integer (objeto), se usaría .equals() para comparar el valor, ya que == en objetos compara la referencia de memoria, no el valor."],
  ], [3200, 5800]),
);

// ═══════════════════════════════════════════════════════════════════════════
// DIAPOSITIVA 11 – GET LISTA
// ═══════════════════════════════════════════════════════════════════════════
children.push(...slideHeader(11, "GET – Mostrar Lista Completa"));

children.push(
  subTitle("¿Qué contiene esta diapositiva?"),
  p("Tabla de detalles del endpoint de listado, código del método listar() y respuesta JSON como array con dos objetos de ejemplo."),

  subTitle("¿Qué debes saber?"),
  p([bold("Diferencia clave con el GET anterior: "), norm("GET /listarAutor retorna TODOS los registros en un array JSON. GET /autor/{id} retorna solo UNO específico como objeto JSON.")]),
  spaceAfter(),
  codeBlock(
    "@GetMapping(\"/listarAutor\")\n" +
    "public List<Autor> listar() {\n" +
    "    return listaAutor;\n" +
    "}"
  ),
  spaceAfter(),

  subTitle("¿Qué decir exactamente?"),
  callout("Di esto en voz alta",
    "«El endpoint de listado es el más simple: no recibe ningún parámetro y retorna directamente la lista completa de autores. Spring Boot convierte automáticamente el List<Autor> de Java a un array JSON. Si no se ha insertado ningún autor aún, retorna un array vacío. Este mismo patrón se repite para las cuatro entidades: /listarAutor, /listarCategoria, /listarCuento y /listarFavorito.»"),

  subTitle("Preguntas frecuentes del profesor"),
  table([
    ["Pregunta", "Respuesta sugerida"],
    ["¿Cuál es la diferencia entre GET /listarAutor y GET /autor/{id}?",
      "/listarAutor no recibe parámetros y retorna TODOS los autores en un array JSON. /autor/{id} recibe el ID en la URL y retorna solo UN autor específico como objeto JSON (o cuerpo vacío si no existe)."],
    ["¿Qué retorna si la lista está vacía?",
      "Retorna HTTP 200 OK con un cuerpo [] (array JSON vacío). No es un error; simplemente no hay datos insertados todavía. El cliente puede distinguirlo porque recibe el array vacío, no null."],
    ["¿Por qué List<Autor> se convierte a array JSON automáticamente?",
      "Spring Boot tiene Jackson integrado. Jackson reconoce que List<Autor> es una colección y la serializa como array JSON []. Cada objeto Autor se serializa como objeto JSON {} usando sus getters."],
  ], [3200, 5800]),
);

// ═══════════════════════════════════════════════════════════════════════════
// DIAPOSITIVA 12 – POST
// ═══════════════════════════════════════════════════════════════════════════
children.push(...slideHeader(12, "POST – Insertar Registro"));

children.push(
  subTitle("¿Qué contiene esta diapositiva?"),
  p("Tabla de detalles del endpoint POST, código del método agregar() con @RequestBody, el body JSON de la petición y la respuesta JSON de confirmación."),

  subTitle("¿Qué debes saber?"),
  table([
    ["Elemento", "Explicación"],
    ["@PostMapping(\"/agregarAutor\")", "Registra el método para peticiones HTTP POST. POST se usa para CREAR nuevos recursos."],
    ["@RequestBody Autor autor", "Spring Boot lee el cuerpo JSON de la petición y lo deserializa automáticamente a un objeto Autor usando Jackson."],
    ["listaAutor.add(autor)", "Agrega el objeto al ArrayList en memoria."],
    ["return autor", "Retorna el mismo objeto como confirmación de que fue guardado exitosamente."],
    ["Header necesario", "El cliente debe enviar Content-Type: application/json en la cabecera de la petición."],
  ], [2800, 6200]),
  spaceAfter(),

  subTitle("¿Qué decir exactamente?"),
  callout("Di esto en voz alta",
    "«Para insertar un nuevo autor, el cliente hace una petición POST a /agregarAutor y envía los datos en el cuerpo de la petición en formato JSON. La anotación @RequestBody le indica a Spring Boot que debe leer ese JSON y convertirlo automáticamente a un objeto Java de tipo Autor, usando Jackson. Luego simplemente lo agregamos a la lista y lo retornamos como confirmación. El cliente recibe de vuelta el mismo objeto que envió, lo que confirma que fue guardado correctamente.»"),

  subTitle("Preguntas frecuentes del profesor"),
  table([
    ["Pregunta", "Respuesta sugerida"],
    ["¿Qué diferencia hay entre POST y GET?",
      "GET se usa para LEER datos. No modifica el estado del servidor. POST se usa para CREAR nuevos recursos. Modifica el estado del servidor (agrega a la lista). GET puede ejecutarse múltiples veces con el mismo resultado (idempotente). POST cada vez que se ejecuta crea un nuevo registro."],
    ["¿Qué diferencia hay entre POST y PUT?",
      "POST se usa para CREAR un nuevo recurso. PUT se usa para ACTUALIZAR completamente un recurso existente. En este proyecto solo implementamos POST para insertar. La actualización (PUT/PATCH) sería un requerimiento del siguiente Sprint."],
    ["¿Qué es @RequestBody?",
      "Es una anotación de Spring que le indica al framework que debe deserializar el cuerpo de la petición HTTP. Spring usa Jackson para convertir el JSON del body al tipo de objeto especificado. En este caso, convierte el JSON de la petición a un objeto Autor con todos sus campos populados."],
    ["¿Qué pasa si envías JSON con campos faltantes?",
      "Jackson asigna null a los String y 0 a los int que no vengan en el JSON. Spring Boot no valida automáticamente. Para añadir validación se usarían las anotaciones @Valid y @NotNull de Jakarta Validation."],
  ], [3200, 5800]),
);

// ═══════════════════════════════════════════════════════════════════════════
// DIAPOSITIVA 13 – DELETE
// ═══════════════════════════════════════════════════════════════════════════
children.push(...slideHeader(13, "DELETE – Eliminar Objeto"));

children.push(
  subTitle("¿Qué contiene esta diapositiva?"),
  p("Tabla de detalles del endpoint DELETE, código completo del método eliminar() con for indexado, y tabla con los dos escenarios de respuesta (ID existe / no existe)."),

  subTitle("¿Qué debes saber?"),
  table([
    ["Elemento", "Explicación"],
    ["@DeleteMapping(\"/autor/{id}\")", "Registra el método para peticiones HTTP DELETE. Misma URL que el GET buscar, pero método HTTP distinto."],
    ["for con índice i", "Se usa for indexado (no enhanced for) porque necesitamos el índice para llamar remove(i). Enhanced for no da acceso al índice."],
    ["listaAutor.remove(i)", "Elimina el elemento en la posición i de la lista."],
    ["return \"Autor eliminado\"", "Confirmación de éxito. Spring Boot lo retorna como text/plain."],
    ["return \"Autor no encontrado\"", "Mensaje de error cuando el ID no existe. Ambos retornan HTTP 200."],
  ], [2800, 6200]),
  spaceAfter(),
  codeBlock(
    "@DeleteMapping(\"/autor/{id}\")\n" +
    "public String eliminar(@PathVariable int id) {\n" +
    "    for (int i = 0; i < listaAutor.size(); i++) {\n" +
    "        if (listaAutor.get(i).getIdAutor() == id) {\n" +
    "            listaAutor.remove(i);\n" +
    "            return \"Autor eliminado\";\n" +
    "        }\n" +
    "    }\n" +
    "    return \"Autor no encontrado\";\n" +
    "}"
  ),
  spaceAfter(),

  subTitle("¿Qué decir exactamente?"),
  callout("Di esto en voz alta",
    "«Para eliminar un autor, se hace una petición DELETE con el ID en la URL. Es la misma URL que el GET de buscar, pero con el método HTTP DELETE. El método recorre la lista con un for indexado — usamos índice y no el enhanced for porque necesitamos poder llamar a remove(i). Cuando encuentra el autor con ese ID, lo elimina de la lista y retorna el mensaje 'Autor eliminado'. Si recorre toda la lista sin encontrarlo, retorna 'Autor no encontrado'. En ambos casos el código HTTP es 200 OK.»"),

  subTitle("Preguntas frecuentes del profesor"),
  table([
    ["Pregunta", "Respuesta sugerida"],
    ["¿Por qué se usa un for con índice y no un enhanced for?",
      "Porque necesitamos llamar a listaAutor.remove(i) con el índice para eliminar el elemento. El enhanced for (for-each) no expone el índice. Además, si modificamos la lista dentro de un enhanced for, se lanza ConcurrentModificationException porque el iterador detecta que la colección cambió mientras se iteraba."],
    ["¿Qué código HTTP debería retornar si el ID no existe?",
      "En REST estándar debería ser HTTP 404 Not Found para indicar que el recurso solicitado no existe. En este proyecto retornamos HTTP 200 con un mensaje de texto. Para una API más robusta se usaría ResponseEntity<String> para controlar el código de estado: return ResponseEntity.notFound().build() si no existe."],
    ["¿Qué pasaría en una BD real al eliminar un autor con cuentos asociados?",
      "Dependería de la política de integridad referencial definida en PostgreSQL. Con ON DELETE CASCADE, al eliminar el autor se eliminarían automáticamente todos sus cuentos. Con ON DELETE RESTRICT, la BD rechazaría la eliminación si el autor tiene cuentos asociados. Con ON DELETE SET NULL, los cuentos quedarían con AUTO_ID en null."],
    ["¿Se puede usar DELETE con un body?",
      "Técnicamente sí, pero no es una práctica recomendada. La convención REST es pasar el ID en la URL. Algunos servidores y proxies ignoran el body en peticiones DELETE. Lo correcto es enviarlo en la URL como PathVariable."],
  ], [3200, 5800]),
);

// ═══════════════════════════════════════════════════════════════════════════
// DIAPOSITIVA 14 – CONCLUSIONES
// ═══════════════════════════════════════════════════════════════════════════
children.push(...slideHeader(14, "Conclusiones"));

children.push(
  subTitle("¿Qué contiene esta diapositiva?"),
  p("Tres bloques de conclusiones: logros del Sprint, tecnologías usadas y aprendizajes clave del proyecto."),

  subTitle("¿Qué decir exactamente?"),
  callout("Di esto en voz alta",
    "«Para cerrar la exposición, en este Sprint logramos implementar una API REST completa con Spring Boot para el sistema BookMora. Desarrollamos 20 endpoints distribuidos en cuatro controladores, uno por entidad, siguiendo una arquitectura MVC con modelos y controladores bien separados. Las tecnologías principales fueron Java, Spring Boot y Maven para el backend, y PostgreSQL con pgAdmin 4 para el diseño de la base de datos. Los aprendizajes más importantes fueron el uso de las anotaciones REST de Spring: @RestController, @GetMapping, @PostMapping y @DeleteMapping, la diferencia entre @PathVariable y @RequestParam para recibir parámetros, y cómo Spring Boot usa Jackson para convertir objetos Java a JSON automáticamente. Quedo abierta a cualquier pregunta.»"),

  subTitle("Tabla resumen de todos los endpoints"),
  table([
    ["Método", "URL", "Operación", "Entidades"],
    ["GET", "/listar{Entidad}", "Lista todos los registros", "Autor, Categoria, Cuento, Favorito"],
    ["GET", "/{entidad}/{id}", "Busca uno por ID (@PathVariable)", "Autor, Categoria, Cuento, Favorito"],
    ["POST", "/agregar{Entidad}", "Inserta nuevo registro (@RequestBody)", "Autor, Categoria, Cuento, Favorito"],
    ["DELETE", "/{entidad}/{id}", "Elimina por ID (@PathVariable)", "Autor, Categoria, Cuento, Favorito"],
    ["GET", "/filtrar{Entidad}?param=", "Filtra por atributo (@RequestParam)", "Autor, Categoria, Cuento, Favorito"],
  ], [900, 2200, 2900, 3000]),
  spaceAfter(),

  subTitle("Cómo cerrar bien la exposición"),
  bullet("Di la frase de cierre con seguridad, sin apresurarte."),
  bullet("Mantén contacto visual con el docente al decir las conclusiones."),
  bullet("Si el profesor pregunta algo que no sabes, di: «Eso correspondería al siguiente Sprint donde implementaríamos...» — demuestra que entiendes el alcance."),
  bullet("No digas «y eso es todo» o «eso es» — cierra con la frase completa y espera las preguntas."),
  spaceAfter(),

  subTitle("Preguntas generales de cierre"),
  table([
    ["Pregunta", "Respuesta sugerida"],
    ["¿Qué mejorarías en el siguiente Sprint?",
      "Añadiría persistencia real con Spring Data JPA conectado a la BD PostgreSQL ya diseñada en el MER. También implementaría HTTP 404 con ResponseEntity cuando no se encuentra un recurso, añadiría validaciones con @Valid, una capa de servicio para separar la lógica, y documentación con Swagger/OpenAPI."],
    ["¿Cómo probarías que los endpoints funcionan?",
      "Con Postman o cualquier cliente HTTP. El flujo de prueba sería: POST /agregarAutor para insertar → GET /listarAutor para ver la lista → GET /autor/1 para buscar el específico → GET /filtrarAutor?nombre=... para filtrar → DELETE /autor/1 para eliminar → GET /autor/1 para confirmar que ya no existe."],
    ["¿Qué es REST y por qué se usa?",
      "REST (Representational State Transfer) es un estilo arquitectónico para diseñar APIs web. Se usa porque es simple, estándar, funciona sobre HTTP, permite que cualquier cliente (web, móvil, Postman) consuma la API, y retorna JSON que es fácil de procesar. Cada recurso tiene una URL, y se usan los métodos HTTP (GET, POST, PUT, DELETE) para las operaciones."],
  ], [3200, 5800]),
);

// ═══════════════════════════════════════════════════════════════════════════
// APÉNDICE: TABLA COMPLETA DE ENDPOINTS
// ═══════════════════════════════════════════════════════════════════════════
children.push(
  new Paragraph({ pageBreakBefore: true, children: [] }),
  new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 0, after: 200 },
    children: [new TextRun({ text: "Apéndice: Todos los Endpoints", font: "Calibri", size: 36, bold: true, color: BLACK })] }),
  hr(),
  table([
    ["Método", "URL completa", "Acción"],
    ["GET",    "/listarAutor",              "Lista todos los autores"],
    ["GET",    "/autor/{id}",               "Busca autor por ID"],
    ["POST",   "/agregarAutor",             "Inserta nuevo autor"],
    ["DELETE", "/autor/{id}",               "Elimina autor por ID"],
    ["GET",    "/filtrarAutor?nombre=",     "Filtra autores por nombre"],
    ["GET",    "/listarCategoria",          "Lista todas las categorías"],
    ["GET",    "/categoria/{id}",           "Busca categoría por ID"],
    ["POST",   "/agregarCategoria",         "Inserta nueva categoría"],
    ["DELETE", "/categoria/{id}",           "Elimina categoría por ID"],
    ["GET",    "/filtrarCategoria?nombre=", "Filtra categorías por nombre"],
    ["GET",    "/listarCuento",             "Lista todos los cuentos"],
    ["GET",    "/cuento/{id}",              "Busca cuento por ID"],
    ["POST",   "/agregarCuento",            "Inserta nuevo cuento"],
    ["DELETE", "/cuento/{id}",              "Elimina cuento por ID"],
    ["GET",    "/filtrarCuento?autoId=",    "Filtra cuentos por autor"],
    ["GET",    "/listarFavorito",           "Lista todos los favoritos"],
    ["GET",    "/favorito/{id}",            "Busca favorito por ID"],
    ["POST",   "/agregarFavorito",          "Inserta nuevo favorito"],
    ["DELETE", "/favorito/{id}",            "Elimina favorito por ID"],
    ["GET",    "/filtrarFavorito?cuentoId=","Filtra favoritos por cuento"],
  ], [1000, 3200, 4800]),
);

// ═══════════════════════════════════════════════════════════════════════════
// BUILD
// ═══════════════════════════════════════════════════════════════════════════
const doc = new Document({
  numbering: {
    config: [
      { reference: "bullets", levels: [
        { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 540, hanging: 360 } } } },
        { level: 1, format: LevelFormat.BULLET, text: "○", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 900, hanging: 360 } } } },
      ]},
    ],
  },
  styles: {
    default: { document: { run: { font: "Calibri", size: 22, color: BLACK } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, font: "Calibri", color: BLACK },
        paragraph: { spacing: { before: 480, after: 160 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Calibri", color: BLUE },
        paragraph: { spacing: { before: 240, after: 80 }, outlineLevel: 1 } },
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 }, // A4
        margin: { top: 1134, right: 1134, bottom: 1134, left: 1134 }, // 2cm
      },
    },
    headers: {
      default: new Header({ children: [
        new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: BLUE } },
          spacing: { before: 0, after: 80 },
          children: [
            bold("BookMora  ", 18, BLUE),
            norm("— Guía de Estudio — Metodologías de Desarrollo de Software — ISER", 18, "888888"),
          ],
        }),
      ]}),
    },
    footers: {
      default: new Footer({ children: [
        new Paragraph({
          border: { top: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD" } },
          spacing: { before: 80, after: 0 },
          alignment: AlignmentType.CENTER,
          children: [
            norm("Página ", 18, "888888"),
            new TextRun({ children: [PageNumber.CURRENT], font: "Calibri", size: 18, color: "888888" }),
            norm(" de ", 18, "888888"),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], font: "Calibri", size: 18, color: "888888" }),
          ],
        }),
      ]}),
    },
    children,
  }],
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("BookMora_GuiaEstudio.docx", buffer);
  console.log("✅  BookMora_GuiaEstudio.docx generado correctamente");
}).catch(e => console.error("Error:", e));
