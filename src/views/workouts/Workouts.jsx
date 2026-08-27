import React, { useState, useEffect, useMemo, useRef } from "react";

/* ============================================================
   BUKZ · PARRILLA DE CONTENIDOS + RULETA DE IDEAS
   Identidad: neobrutalismo — #F5E100 / #272622, Bebas Neue + Figtree
   ============================================================ */

const AMARILLO = "#F5E100";
const NEGRO = "#272622";
const CREMA = "#FFFDF2";
const BLANCO = "#FFFFFF";
const ROJO = "#E2452C";

const KEY = "bukz-parrilla-v1";

/* ---------- 50 ideas base, en tono Bukz ---------- */
const IDEAS_BASE = [
  {
    t: "5 libros de menos de 150 páginas para romper el bloqueo lector",
    k: "GUARDABLE",
  },
  {
    t: "Cómo elegir un libro sin leer la contraportada",
    k: "ANTI-GATEKEEPING",
  },
  {
    t: "Literatura colombiana que no es Cien años de soledad",
    k: "ANTI-GATEKEEPING",
  },
  {
    t: "El orden para leer a Kafka (y por qué no importa)",
    k: "ANTI-GATEKEEPING",
  },
  { t: "Libros que se leen en un vuelo Medellín–Bogotá", k: "GUARDABLE" },
  { t: "Qué leer según el parche que tengas este finde", k: "COMPARTIBLE" },
  {
    t: "Nadie te va a preguntar cuántos libros leíste este año",
    k: "COMPARTIBLE",
  },
  {
    t: "Manga para el que dice que el manga no es literatura",
    k: "ANTI-GATEKEEPING",
  },
  {
    t: "Libros que la gente abandona en la página 40 (y cómo pasarla)",
    k: "GUARDABLE",
  },
  { t: "Diccionario para no perderse en una librería", k: "ANTI-GATEKEEPING" },
  { t: "Poesía para el que odia la poesía", k: "ANTI-GATEKEEPING" },
  { t: "Libros que se sienten como aguacero en Medellín", k: "LOCAL" },
  { t: "5 ensayos cortos para discutir en el almuerzo", k: "COMPARTIBLE" },
  { t: "Cómo montar tu biblioteca desde cero con $200.000", k: "SERVICIO" },
  { t: "Los libros que más se roban en el mundo", k: "COMPARTIBLE" },
  { t: "Libros prohibidos que hoy están en la vitrina", k: "COMPARTIBLE" },
  { t: "Qué leer según tu álbum favorito", k: "COMPARTIBLE" },
  { t: "Autores colombianos vivos que deberías estar leyendo", k: "LOCAL" },
  { t: "Subrayar libros no es un crimen", k: "ANTI-GATEKEEPING" },
  { t: "Cómo leer 2 libros al mes sin volverlo tarea", k: "GUARDABLE" },
  { t: "Libros para regalar sin quedar mal", k: "GUARDABLE" },
  { t: "El final más discutido de la literatura", k: "COMPARTIBLE" },
  { t: "Libros que se ven mejor de lo que se leen", k: "COMPARTIBLE" },
  {
    t: "Qué es el realismo sucio y por qué te va a gustar",
    k: "ANTI-GATEKEEPING",
  },
  { t: "Libros que caben en el bolsillo del jean", k: "GUARDABLE" },
  { t: "5 novelas gráficas para el que 'no lee'", k: "ANTI-GATEKEEPING" },
  {
    t: "Preguntas que nos hacen en Bukz y no sabemos responder",
    k: "COMPARTIBLE",
  },
  {
    t: "Libros que envejecieron mal (y por qué igual valen)",
    k: "COMPARTIBLE",
  },
  { t: "Cómo salir de un slump lector", k: "SERVICIO" },
  { t: "Libros para leer en el metro sin perder la parada", k: "LOCAL" },
  {
    t: "Autoras latinoamericanas que están rompiéndola ahorita",
    k: "GUARDABLE",
  },
  { t: "El terror latinoamericano le gana al gringo", k: "COMPARTIBLE" },
  { t: "Libros incómodos que te cambian la conversación", k: "COMPARTIBLE" },
  { t: "Qué leer si te gustó la serie del momento", k: "GUARDABLE" },
  { t: "Cómo cuidar tus libros con la humedad de acá", k: "SERVICIO" },
  { t: "Ediciones por las que sí vale pagar más", k: "SERVICIO" },
  { t: "Libros de este año que ya se sienten clásicos", k: "GUARDABLE" },
  { t: "El club de lectura al que no te da pena entrar", k: "LOCAL" },
  { t: "Frases que todo el mundo cita mal", k: "COMPARTIBLE" },
  { t: "Libros sobre plata que no son de coach", k: "GUARDABLE" },
  { t: "Ciencia ficción para el que solo ve Netflix", k: "ANTI-GATEKEEPING" },
  { t: "Libros que se leen de una sentada", k: "GUARDABLE" },
  { t: "El librero de Bukz recomienda: 5 apuestas del mes", k: "LOCAL" },
  { t: "4 formas de organizar tu biblioteca (y cuál sirve)", k: "SERVICIO" },
  { t: "Las mejores portadas del año", k: "COMPARTIBLE" },
  { t: "Traducciones que le arruinaron el libro a alguien", k: "COMPARTIBLE" },
  { t: "Medellín en 5 libros", k: "LOCAL" },
  { t: "Libros para leer con el perro al lado", k: "COMPARTIBLE" },
  { t: "Qué leer según tu último desamor", k: "COMPARTIBLE" },
  {
    t: "Cosas que la gente cree que hay que hacer para 'ser lector'",
    k: "ANTI-GATEKEEPING",
  },
];

const KIND_COLORS = {
  GUARDABLE: AMARILLO,
  COMPARTIBLE: "#7FE0C4",
  "ANTI-GATEKEEPING": ROJO,
  LOCAL: "#A78BFA",
  SERVICIO: "#FF9F1C",
  RELÁMPAGO: "#FFFFFF",
};

const SEDES = [
  "Las Lomas",
  "Viva Envigado",
  "Museo de Antioquia",
  "Salón Prado",
  "Zona G",
  "Online",
];
const FORMATOS = ["Carrusel", "Reel", "Story", "Post estático", "Colaboración"];
const PLATAFORMAS = ["Instagram", "TikTok", "LinkedIn", "Newsletter"];
const OBJETIVOS = [
  "Guardados",
  "Compartidos",
  "Alcance",
  "Tráfico a tienda",
  "Comunidad",
];
const ESTADOS = [
  "Idea",
  "En producción",
  "Diseño",
  "Aprobado",
  "Programado",
  "Publicado",
];
const ESTADO_COLOR = {
  Idea: "#E8E5DC",
  "En producción": "#FF9F1C",
  Diseño: "#7FE0C4",
  Aprobado: "#A78BFA",
  Programado: AMARILLO,
  Publicado: "#9DE04F",
};

/* ---------- helpers ---------- */
const uid = () =>
  Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-3);

function polar(cx, cy, r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
function slicePath(cx, cy, r, a0, a1) {
  const p0 = polar(cx, cy, r, a0);
  const p1 = polar(cx, cy, r, a1);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${p0.x.toFixed(2)} ${p0.y.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} Z`;
}

/* ---------- estilos base ---------- */
const box = (bg = BLANCO, shadow = 6) => ({
  background: bg,
  border: `3px solid ${NEGRO}`,
  boxShadow: `${shadow}px ${shadow}px 0 ${NEGRO}`,
});
const display = {
  fontFamily: "'Bebas Neue', 'Oswald', Impact, sans-serif",
  letterSpacing: "0.02em",
  lineHeight: 0.95,
};
const body = { fontFamily: "'Figtree', 'Inter', system-ui, sans-serif" };

function Btn({
  children,
  onClick,
  bg = AMARILLO,
  color = NEGRO,
  style,
  disabled,
  type,
}) {
  const [down, setDown] = useState(false);
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setDown(true)}
      onMouseUp={() => setDown(false)}
      onMouseLeave={() => setDown(false)}
      style={{
        ...body,
        background: disabled ? "#D9D6CC" : bg,
        color: disabled ? "#8A8779" : color,
        border: `3px solid ${NEGRO}`,
        boxShadow:
          down || disabled ? `0px 0px 0 ${NEGRO}` : `4px 4px 0 ${NEGRO}`,
        transform: down && !disabled ? "translate(4px,4px)" : "none",
        padding: "10px 16px",
        fontWeight: 800,
        fontSize: 13,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "transform .06s, box-shadow .06s",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ ...body, display: "block", marginBottom: 14 }}>
      <span
        style={{
          display: "block",
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}

const inputStyle = {
  ...body,
  width: "100%",
  boxSizing: "border-box",
  border: `3px solid ${NEGRO}`,
  background: CREMA,
  padding: "10px 12px",
  fontSize: 15,
  outline: "none",
};

function Chips({ options, value, onToggle, multi = true }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map((o) => {
        const on = multi ? value.includes(o) : value === o;
        return (
          <button
            key={o}
            type="button"
            onClick={() => onToggle(o)}
            style={{
              ...body,
              border: `3px solid ${NEGRO}`,
              background: on ? AMARILLO : BLANCO,
              padding: "6px 10px",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: on ? `3px 3px 0 ${NEGRO}` : "none",
            }}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

/* ============================================================ */
export default function Workouts() {
  const [tab, setTab] = useState("ruleta");
  const [ideasExtra, setIdeasExtra] = useState([]);
  const [parrilla, setParrilla] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [rot, setRot] = useState(0);
  const [girando, setGirando] = useState(false);
  const [ganadora, setGanadora] = useState(null);
  const [preguntando, setPreguntando] = useState(false);
  const [form, setForm] = useState(null);
  const [nuevaIdea, setNuevaIdea] = useState(null);
  const [toast, setToast] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const timer = useRef(null);

  const ideas = useMemo(() => [...IDEAS_BASE, ...ideasExtra], [ideasExtra]);

  /* fuentes */
  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href =
      "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Figtree:wght@400;600;800;900&display=swap";
    document.head.appendChild(l);
  }, []);

  /* cargar datos compartidos */
  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get(KEY, true);
        const d = r ? JSON.parse(r.value) : null;
        if (d) {
          setIdeasExtra(Array.isArray(d.ideasExtra) ? d.ideasExtra : []);
          setParrilla(Array.isArray(d.parrilla) ? d.parrilla : []);
        }
      } catch (e) {
        /* primera vez: no hay nada guardado */
      }
      setCargando(false);
    })();
  }, []);

  async function guardar(nextIdeas, nextParrilla) {
    try {
      await window.storage.set(
        KEY,
        JSON.stringify({ ideasExtra: nextIdeas, parrilla: nextParrilla }),
        true,
      );
    } catch (e) {
      setToast("No se pudo guardar. Intenta otra vez.");
      setTimeout(() => setToast(""), 3000);
    }
  }

  function avisar(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 2600);
  }

  /* ---------- ruleta ---------- */
  function girar() {
    if (girando || ideas.length === 0) return;
    setGanadora(null);
    setPreguntando(false);
    setGirando(true);
    const n = ideas.length;
    const seg = 360 / n;
    const idx = Math.floor(Math.random() * n);
    const objetivo = (360 - (idx * seg + seg / 2)) % 360;
    const actual = ((rot % 360) + 360) % 360;
    const delta = ((objetivo - actual + 360) % 360) + 360 * 6;
    setRot(rot + delta);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setGirando(false);
      setGanadora({ ...ideas[idx], idx });
      setPreguntando(true);
    }, 4300);
  }

  function abrirFormulario() {
    setPreguntando(false);
    setForm({
      id: uid(),
      titulo: ganadora.t,
      tipo: ganadora.k,
      fecha: "",
      formato: "Carrusel",
      plataformas: ["Instagram"],
      sede: "Online",
      objetivo: "Guardados",
      colaboradores: "",
      responsable: "",
      hook: "",
      cta: "",
      estado: "Idea",
      notas: "",
    });
  }

  function guardarEnParrilla() {
    if (!form.fecha)
      return avisar("Ponle fecha tentativa para ubicarla en la parrilla.");
    const next = [...parrilla, { ...form, creado: Date.now() }];
    setParrilla(next);
    guardar(ideasExtra, next);
    setForm(null);
    setGanadora(null);
    avisar("Listo. Ya quedó en la parrilla.");
    setTab("parrilla");
  }

  function agregarIdeaRelampago() {
    if (!nuevaIdea.t.trim()) return avisar("Escribe la idea primero.");
    const next = [...ideasExtra, { t: nuevaIdea.t.trim(), k: nuevaIdea.k }];
    setIdeasExtra(next);
    guardar(next, parrilla);
    setNuevaIdea(null);
    avisar("Idea agregada a la ruleta.");
  }

  function cambiarEstado(id, estado) {
    const next = parrilla.map((p) => (p.id === id ? { ...p, estado } : p));
    setParrilla(next);
    guardar(ideasExtra, next);
  }

  function borrar(id) {
    const next = parrilla.filter((p) => p.id !== id);
    setParrilla(next);
    guardar(ideasExtra, next);
    avisar("Se eliminó de la parrilla.");
  }

  function copiarParrilla() {
    const filas = [...parrilla]
      .sort((a, b) => (a.fecha || "").localeCompare(b.fecha || ""))
      .map(
        (p) =>
          `${p.fecha} · ${p.formato} · ${p.titulo}\n  Plataformas: ${p.plataformas.join(", ")} | Sede: ${p.sede} | Objetivo: ${p.objetivo} | Estado: ${p.estado}\n  Responsable: ${p.responsable || "—"} | Colabs: ${p.colaboradores || "—"}\n  Hook: ${p.hook || "—"}\n  CTA: ${p.cta || "—"}`,
      )
      .join("\n\n");
    const texto = `PARRILLA BUKZ (${parrilla.length} piezas)\n\n${filas}`;
    try {
      const ta = document.createElement("textarea");
      ta.value = texto;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      avisar("Parrilla copiada al portapapeles.");
    } catch (e) {
      avisar("No se pudo copiar aquí.");
    }
  }

  /* ---------- render ruleta ---------- */
  const n = ideas.length;
  const seg = 360 / n;
  const R = 190;
  const C = 200;

  const parrillaOrdenada = useMemo(
    () =>
      [...parrilla]
        .filter((p) => filtro === "Todos" || p.estado === filtro)
        .sort((a, b) => (a.fecha || "9999").localeCompare(b.fecha || "9999")),
    [parrilla, filtro],
  );

  return (
    <div
      style={{
        ...body,
        background: CREMA,
        minHeight: "100vh",
        color: NEGRO,
        padding: "18px 14px 60px",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        {/* HEADER */}
        <header
          style={{
            ...box(AMARILLO, 8),
            padding: "18px 20px",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: "0.22em",
                }}
              >
                BUKZ · CONTENIDO
              </div>
              <h1
                style={{
                  ...display,
                  fontSize: "clamp(38px,8vw,72px)",
                  margin: "4px 0 0",
                }}
              >
                LA RULETA DE LA PARRILLA
              </h1>
              <p
                style={{
                  margin: "8px 0 0",
                  fontSize: 14,
                  fontWeight: 600,
                  maxWidth: 560,
                }}
              >
                Gira, saca una idea, mándala al calendario. Sin junta de dos
                horas. Punto.
              </p>
            </div>
            <div
              style={{
                ...box(NEGRO, 0),
                color: AMARILLO,
                padding: "10px 14px",
                minWidth: 130,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  fontWeight: 800,
                }}
              >
                EN PARRILLA
              </div>
              <div style={{ ...display, fontSize: 46 }}>{parrilla.length}</div>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  fontWeight: 800,
                }}
              >
                {n} IDEAS EN RULETA
              </div>
            </div>
          </div>
        </header>

        {/* NOTA DE MÉTRICA */}
        <div
          style={{
            ...box(BLANCO, 4),
            padding: "10px 14px",
            marginBottom: 16,
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          <strong>Recordatorio de data:</strong> la tasa de guardado por view es
          la métrica que separa un buen post de uno regular, y los carruseles
          siguen ganándole a los reels en eso. Prioriza ideas guardables y
          compartibles.
        </div>

        {/* TABS */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 18,
            flexWrap: "wrap",
          }}
        >
          <Btn
            onClick={() => setTab("ruleta")}
            bg={tab === "ruleta" ? NEGRO : BLANCO}
            color={tab === "ruleta" ? AMARILLO : NEGRO}
          >
            Ruleta
          </Btn>
          <Btn
            onClick={() => setTab("parrilla")}
            bg={tab === "parrilla" ? NEGRO : BLANCO}
            color={tab === "parrilla" ? AMARILLO : NEGRO}
          >
            Parrilla ({parrilla.length})
          </Btn>
          <Btn
            onClick={() => setNuevaIdea({ t: "", k: "RELÁMPAGO" })}
            bg={ROJO}
            color={BLANCO}
          >
            + Idea relámpago
          </Btn>
        </div>

        {cargando && (
          <div style={{ ...box(BLANCO, 4), padding: 20, fontWeight: 700 }}>
            Cargando la parrilla compartida…
          </div>
        )}

        {/* ---------------- RULETA ---------------- */}
        {!cargando && tab === "ruleta" && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
              alignItems: "flex-start",
            }}
          >
            <div style={{ flex: "1 1 380px", minWidth: 300 }}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: 440,
                  margin: "0 auto",
                }}
              >
                {/* aguja */}
                <div
                  style={{
                    position: "absolute",
                    top: -6,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: 0,
                    borderLeft: "16px solid transparent",
                    borderRight: "16px solid transparent",
                    borderTop: `30px solid ${ROJO}`,
                    filter: `drop-shadow(0 3px 0 ${NEGRO})`,
                    zIndex: 3,
                  }}
                />
                <div
                  onClick={girar}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") && girar()
                  }
                  title="Clic para girar"
                  style={{
                    cursor: girando ? "wait" : "pointer",
                    outlineOffset: 4,
                  }}
                >
                  <svg
                    viewBox="0 0 400 400"
                    style={{
                      width: "100%",
                      display: "block",
                      transform: `rotate(${rot}deg)`,
                      transition: girando
                        ? "transform 4.2s cubic-bezier(.12,.75,.12,1)"
                        : "none",
                    }}
                  >
                    <circle cx={C} cy={C} r={R + 6} fill={NEGRO} />
                    {ideas.map((it, i) => {
                      const a0 = i * seg;
                      const a1 = a0 + seg;
                      const base = i % 2 === 0 ? AMARILLO : NEGRO;
                      const fill = ganadora && ganadora.idx === i ? ROJO : base;
                      const mid = a0 + seg / 2;
                      const p = polar(C, C, R - 18, mid);
                      return (
                        <g key={i}>
                          <path
                            d={slicePath(C, C, R, a0, a1)}
                            fill={fill}
                            stroke={NEGRO}
                            strokeWidth="1.2"
                          />
                          <text
                            x={p.x}
                            y={p.y}
                            fill={fill === NEGRO ? AMARILLO : NEGRO}
                            fontSize="10"
                            fontWeight="800"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            transform={`rotate(${mid} ${p.x} ${p.y})`}
                            style={body}
                          >
                            {i + 1}
                          </text>
                        </g>
                      );
                    })}
                    <circle cx={C} cy={C} r="46" fill={NEGRO} />
                    <circle
                      cx={C}
                      cy={C}
                      r="38"
                      fill={AMARILLO}
                      stroke={NEGRO}
                      strokeWidth="3"
                    />
                    <text
                      x={C}
                      y={C - 4}
                      textAnchor="middle"
                      fontSize="20"
                      fill={NEGRO}
                      style={display}
                    >
                      BUKZ
                    </text>
                    <text
                      x={C}
                      y={C + 14}
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight="800"
                      fill={NEGRO}
                      style={body}
                    >
                      GIRA
                    </text>
                  </svg>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 18,
                }}
              >
                <Btn
                  onClick={girar}
                  disabled={girando}
                  bg={NEGRO}
                  color={AMARILLO}
                  style={{ fontSize: 18, padding: "16px 34px" }}
                >
                  {girando ? "Girando…" : "Girar la ruleta"}
                </Btn>
              </div>
              <p
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  marginTop: 8,
                  fontWeight: 600,
                  opacity: 0.7,
                }}
              >
                También puedes darle clic directo a la ruleta.
              </p>
            </div>

            {/* PANEL DERECHO */}
            <div style={{ flex: "1 1 320px", minWidth: 280 }}>
              {ganadora ? (
                <div style={{ ...box(BLANCO, 8), padding: 20 }}>
                  <div
                    style={{
                      display: "inline-block",
                      background: KIND_COLORS[ganadora.k] || AMARILLO,
                      border: `3px solid ${NEGRO}`,
                      padding: "4px 10px",
                      fontSize: 11,
                      fontWeight: 900,
                      letterSpacing: "0.1em",
                      color: ganadora.k === "ANTI-GATEKEEPING" ? BLANCO : NEGRO,
                    }}
                  >
                    {ganadora.k} · #{ganadora.idx + 1}
                  </div>
                  <h2
                    style={{
                      ...display,
                      fontSize: "clamp(28px,5vw,44px)",
                      margin: "14px 0 0",
                    }}
                  >
                    {ganadora.t}
                  </h2>

                  {preguntando && (
                    <div
                      style={{
                        ...box(AMARILLO, 0),
                        padding: 16,
                        marginTop: 18,
                      }}
                    >
                      <p
                        style={{
                          margin: "0 0 12px",
                          fontWeight: 800,
                          fontSize: 16,
                        }}
                      >
                        ¿Deseas agregar esta idea a la parrilla de contenido?
                      </p>
                      <div
                        style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
                      >
                        <Btn
                          onClick={abrirFormulario}
                          bg={NEGRO}
                          color={AMARILLO}
                        >
                          Sí, agregar
                        </Btn>
                        <Btn
                          onClick={() => {
                            setPreguntando(false);
                            setGanadora(null);
                          }}
                          bg={BLANCO}
                        >
                          No, girar otra vez
                        </Btn>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ ...box(NEGRO, 8), padding: 24, color: CREMA }}>
                  <h3
                    style={{
                      ...display,
                      fontSize: 34,
                      margin: 0,
                      color: AMARILLO,
                    }}
                  >
                    NADA GIRANDO TODAVÍA
                  </h3>
                  <p style={{ fontSize: 14, fontWeight: 600, marginTop: 10 }}>
                    Hay {n} ideas adentro: guardables, compartibles y
                    anti-gatekeeping. Dale girar y saca la de hoy.
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                      marginTop: 16,
                    }}
                  >
                    {Object.keys(KIND_COLORS).map((k) => (
                      <span
                        key={k}
                        style={{
                          background: KIND_COLORS[k],
                          color: k === "ANTI-GATEKEEPING" ? BLANCO : NEGRO,
                          border: `2px solid ${CREMA}`,
                          padding: "3px 8px",
                          fontSize: 10,
                          fontWeight: 900,
                          letterSpacing: "0.08em",
                        }}
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ---------------- PARRILLA ---------------- */}
        {!cargando && tab === "parrilla" && (
          <div>
            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Chips
                options={["Todos", ...ESTADOS]}
                value={filtro}
                onToggle={setFiltro}
                multi={false}
              />
              <div style={{ flex: 1 }} />
              <Btn onClick={copiarParrilla} bg={BLANCO}>
                Copiar parrilla
              </Btn>
            </div>

            {parrillaOrdenada.length === 0 ? (
              <div
                style={{ ...box(BLANCO, 6), padding: 28, textAlign: "center" }}
              >
                <h3 style={{ ...display, fontSize: 34, margin: 0 }}>
                  AQUÍ NO HAY NADA AÚN
                </h3>
                <p style={{ fontWeight: 600, marginTop: 8 }}>
                  Gira la ruleta y manda la primera idea para acá.
                </p>
                <div
                  style={{
                    marginTop: 14,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Btn onClick={() => setTab("ruleta")} bg={AMARILLO}>
                    Ir a la ruleta
                  </Btn>
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gap: 14,
                  gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
                }}
              >
                {parrillaOrdenada.map((p) => (
                  <article
                    key={p.id}
                    style={{ ...box(BLANCO, 6), padding: 16 }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 8,
                      }}
                    >
                      <div
                        style={{
                          ...display,
                          fontSize: 26,
                          background: AMARILLO,
                          border: `3px solid ${NEGRO}`,
                          padding: "2px 8px",
                        }}
                      >
                        {p.fecha
                          ? p.fecha.split("-").reverse().slice(0, 2).join("/")
                          : "S/F"}
                      </div>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 900,
                          letterSpacing: "0.08em",
                        }}
                      >
                        {p.formato.toUpperCase()}
                      </span>
                    </div>
                    <h3
                      style={{ ...display, fontSize: 24, margin: "12px 0 8px" }}
                    >
                      {p.titulo}
                    </h3>
                    <div
                      style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.6 }}
                    >
                      <div>
                        📍 {p.sede} · {p.plataformas.join(", ")}
                      </div>
                      <div>🎯 {p.objetivo}</div>
                      {p.responsable && <div>👤 {p.responsable}</div>}
                      {p.colaboradores && <div>🤝 {p.colaboradores}</div>}
                      {p.hook && (
                        <div style={{ marginTop: 6, fontStyle: "italic" }}>
                          “{p.hook}”
                        </div>
                      )}
                      {p.cta && (
                        <div style={{ marginTop: 4 }}>CTA: {p.cta}</div>
                      )}
                      {p.notas && (
                        <div style={{ marginTop: 4, opacity: 0.75 }}>
                          {p.notas}
                        </div>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        marginTop: 14,
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <select
                        value={p.estado}
                        onChange={(e) => cambiarEstado(p.id, e.target.value)}
                        style={{
                          ...body,
                          border: `3px solid ${NEGRO}`,
                          background: ESTADO_COLOR[p.estado],
                          padding: "6px 8px",
                          fontWeight: 800,
                          fontSize: 12,
                          cursor: "pointer",
                        }}
                      >
                        {ESTADOS.map((e) => (
                          <option key={e} value={e}>
                            {e}
                          </option>
                        ))}
                      </select>
                      <div style={{ flex: 1 }} />
                      <Btn
                        onClick={() => borrar(p.id)}
                        bg={BLANCO}
                        style={{ padding: "6px 10px", fontSize: 11 }}
                      >
                        Eliminar
                      </Btn>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ---------------- FORMULARIO ---------------- */}
        {form && (
          <Overlay onClose={() => setForm(null)}>
            <div
              style={{
                ...box(CREMA, 10),
                padding: 22,
                maxWidth: 560,
                width: "100%",
              }}
            >
              <h2 style={{ ...display, fontSize: 34, margin: "0 0 4px" }}>
                AGENDAR ESTA IDEA
              </h2>
              <p style={{ fontWeight: 700, fontSize: 15, margin: "0 0 18px" }}>
                {form.titulo}
              </p>

              <Field label="Fecha tentativa">
                <input
                  type="date"
                  value={form.fecha}
                  onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                  style={inputStyle}
                />
              </Field>

              <Field label="Formato">
                <Chips
                  options={FORMATOS}
                  value={form.formato}
                  onToggle={(v) => setForm({ ...form, formato: v })}
                  multi={false}
                />
              </Field>

              <Field label="Plataformas">
                <Chips
                  options={PLATAFORMAS}
                  value={form.plataformas}
                  onToggle={(v) =>
                    setForm({
                      ...form,
                      plataformas: form.plataformas.includes(v)
                        ? form.plataformas.filter((x) => x !== v)
                        : [...form.plataformas, v],
                    })
                  }
                />
              </Field>

              <Field label="Sede o punto">
                <Chips
                  options={SEDES}
                  value={form.sede}
                  onToggle={(v) => setForm({ ...form, sede: v })}
                  multi={false}
                />
              </Field>

              <Field label="Objetivo de la pieza">
                <Chips
                  options={OBJETIVOS}
                  value={form.objetivo}
                  onToggle={(v) => setForm({ ...form, objetivo: v })}
                  multi={false}
                />
              </Field>

              <Field label="Posibles colaboradores">
                <input
                  value={form.colaboradores}
                  onChange={(e) =>
                    setForm({ ...form, colaboradores: e.target.value })
                  }
                  placeholder="Editorial, autor, marca, creador…"
                  style={inputStyle}
                />
              </Field>

              <Field label="Responsable">
                <input
                  value={form.responsable}
                  onChange={(e) =>
                    setForm({ ...form, responsable: e.target.value })
                  }
                  placeholder="Quién la saca"
                  style={inputStyle}
                />
              </Field>

              <Field label="Hook tentativo">
                <textarea
                  value={form.hook}
                  onChange={(e) => setForm({ ...form, hook: e.target.value })}
                  rows={2}
                  placeholder="La primera línea que frena el scroll"
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </Field>

              <Field label="CTA de cierre">
                <input
                  value={form.cta}
                  onChange={(e) => setForm({ ...form, cta: e.target.value })}
                  placeholder="Guárdalo para tu próxima visita. Punto."
                  style={inputStyle}
                />
              </Field>

              <Field label="Estado">
                <Chips
                  options={ESTADOS}
                  value={form.estado}
                  onToggle={(v) => setForm({ ...form, estado: v })}
                  multi={false}
                />
              </Field>

              <Field label="Notas de producción">
                <textarea
                  value={form.notas}
                  onChange={(e) => setForm({ ...form, notas: e.target.value })}
                  rows={2}
                  placeholder="Referencias, libros a incluir, quién diseña…"
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </Field>

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  marginTop: 6,
                  flexWrap: "wrap",
                }}
              >
                <Btn
                  onClick={guardarEnParrilla}
                  bg={NEGRO}
                  color={AMARILLO}
                  style={{ fontSize: 15, padding: "14px 22px" }}
                >
                  Agregar a la parrilla
                </Btn>
                <Btn onClick={() => setForm(null)} bg={BLANCO}>
                  Cancelar
                </Btn>
              </div>
            </div>
          </Overlay>
        )}

        {/* ---------------- IDEA RELÁMPAGO ---------------- */}
        {nuevaIdea && (
          <Overlay onClose={() => setNuevaIdea(null)}>
            <div
              style={{
                ...box(AMARILLO, 10),
                padding: 22,
                maxWidth: 480,
                width: "100%",
              }}
            >
              <h2 style={{ ...display, fontSize: 34, margin: "0 0 4px" }}>
                IDEA RELÁMPAGO
              </h2>
              <p style={{ fontWeight: 600, fontSize: 13, margin: "0 0 16px" }}>
                Se suma a la ruleta y la ve todo el equipo.
              </p>
              <Field label="La idea">
                <input
                  value={nuevaIdea.t}
                  onChange={(e) =>
                    setNuevaIdea({ ...nuevaIdea, t: e.target.value })
                  }
                  placeholder="Ej: Libros que se leen en la fila del banco"
                  style={inputStyle}
                  autoFocus
                />
              </Field>
              <Field label="Tipo">
                <Chips
                  options={Object.keys(KIND_COLORS)}
                  value={nuevaIdea.k}
                  onToggle={(v) => setNuevaIdea({ ...nuevaIdea, k: v })}
                  multi={false}
                />
              </Field>
              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <Btn onClick={agregarIdeaRelampago} bg={NEGRO} color={AMARILLO}>
                  Agregar a la ruleta
                </Btn>
                <Btn onClick={() => setNuevaIdea(null)} bg={BLANCO}>
                  Cancelar
                </Btn>
              </div>
            </div>
          </Overlay>
        )}

        {/* TOAST */}
        {toast && (
          <div
            style={{
              position: "fixed",
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
              ...box(NEGRO, 5),
              color: AMARILLO,
              padding: "12px 18px",
              fontWeight: 800,
              fontSize: 14,
              zIndex: 90,
            }}
          >
            {toast}
          </div>
        )}

        <footer
          style={{
            marginTop: 30,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.06em",
            opacity: 0.7,
          }}
        >
          LA PARRILLA Y LAS IDEAS SON COMPARTIDAS: TODO EL QUE ABRA ESTE
          ARTEFACTO VE Y EDITA LO MISMO.
        </footer>
      </div>
    </div>
  );
}

function Overlay({ children, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(39,38,34,0.7)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 20,
        overflowY: "auto",
        zIndex: 80,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 560,
          marginTop: 30,
          marginBottom: 40,
        }}
      >
        {children}
      </div>
    </div>
  );
}
