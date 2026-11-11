"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  LoaderCircle,
  MoveUpRight,
  Plus,
  X,
} from "lucide-react";

type Need = "video" | "grafico" | "3d" | "otro";
type Attribution = { source: string; medium: string; campaign: string };
const examples: Record<
  Need,
  { name: string; brief: string; result: string; scope: string; tag: string }
> = {
  video: {
    name: "Un video que quieras compartir.",
    brief:
      "Tengo varios clips de un viaje. Quiero convertirlos en un recuerdo de 30 segundos.",
    result: "Video editado de 30 segundos",
    scope: "Cortes, ritmo y subtítulos",
    tag: "Edición de video",
  },
  grafico: {
    name: "Una invitación con tu estilo.",
    brief:
      "Quiero una invitación digital para mi cumpleaños. Tengo la fecha y una idea de los colores.",
    result: "Invitación digital",
    scope: "Diseño final listo para compartir",
    tag: "Diseño gráfico",
  },
  "3d": {
    name: "De una idea a un objeto.",
    brief:
      "Necesito un soporte de escritorio a medida. Quiero explorar el diseño y la impresión 3D.",
    result: "Propuesta de pieza 3D",
    scope: "Medidas, material y entrega por acordar",
    tag: "Modelado e impresión 3D",
  },
  otro: {
    name: "Cuéntanos qué tienes en mente.",
    brief:
      "Tengo un encargo creativo o digital y quiero saber si encaja con el piloto.",
    result: "Un alcance por definir",
    scope: "Lo revisamos durante el piloto",
    tag: "Otro encargo",
  },
};
const previewNeeds: Need[] = ["video", "grafico", "3d"];
const portfolios = [
  { name: "Isabella González Castellanos", title: "Cipher Bloom: WOVEN", file: "woven", alt: "Detalle de la lámina WOVEN con una estructura textil suspendida", url: "https://www.behance.net/gallery/253495247/DISO-3318-Cipher-Bloom-WOVEN" },
  { name: "Ana Maria Garcia", title: "Ilustraciones 2026", file: "ilustraciones", alt: "Dos composiciones de flores con formas y colores vibrantes", url: "https://www.behance.net/gallery/254028575/Ilustraciones-2026" },
  { name: "Tatiana Silva Martínez", title: "Diseño de personajes", file: "personajes", alt: "Estudios de un personaje y su perro en tonos cálidos", url: "https://tatianasilvamartinez.framer.website/character-design" },
  { name: "Isabella Montoya", title: "¡Ven a patinar!", file: "patinar", alt: "Pequeños patinadores y ciclistas recorren pistas de colores que se entrecruzan", url: "https://isabellamontoyacc.myportfolio.com/digital-illustration-ven-a-patinar" },
];
const inspirations: { skill: string; possibility: string; need: Need }[] = [
  { skill: "Diseño textil · Exploración de materiales", possibility: "Una pieza textil para explorar una historia, una textura o una identidad propia.", need: "otro" },
  { skill: "Ilustración · Composición y color", possibility: "Una ilustración para un afiche, una publicación o un proyecto personal.", need: "grafico" },
  { skill: "Diseño de personajes · Expresión visual", possibility: "Un personaje para darle una cara y una voz a tu historia o proyecto.", need: "grafico" },
  { skill: "Ilustración digital · Narrativa visual", possibility: "Una imagen para contar una idea, ambientar una historia o comunicar tu mundo.", need: "grafico" },
];
const faq = [
  [
    "¿Puedo usar KnowU si no tengo una empresa?",
    "Sí. Estamos preparando KnowU para personas y negocios: puedes necesitar un video para ti, una invitación para un evento o una pieza para tu emprendimiento. Lo importante es que sea un encargo puntual y que podamos definir qué se entrega.",
  ],
  [
    "¿Qué estudiantes participan?",
    "El foco inicial está en estudiantes de diseño y sus distintas habilidades. También contemplamos encargos digitales que puedan resolver estudiantes de sistemas. La disponibilidad y el encaje de cada solicitud se revisarán durante el piloto.",
  ],
  [
    "¿Cuánto cuesta un encargo?",
    "No hay una tarifa única. Depende del entregable, la complejidad, el plazo y, si aplica, los materiales. El alcance y el presupuesto deben acordarse antes de empezar. Dejar tu interés en el piloto no genera un cobro.",
  ],
  [
    "¿Puedo pedir una impresión 3D?",
    "Puedes registrar tu interés en diseño, modelado o impresión 3D. Estamos explorando estos encargos en el piloto. El archivo, las medidas, el material, el costo de impresión y la entrega física necesitan una revisión previa; enviar la solicitud no confirma que podamos realizarla.",
  ],
  [
    "¿Cómo funciona el piloto?",
    "Déjanos tu correo y el tipo de encargo que necesitas. El equipo de KnowU podrá contactarte para conocer tu caso y coordinar una prueba si encaja. El registro no garantiza disponibilidad ni contratación. El MVP actual usa pagos simulados y no mueve dinero real.",
  ],
  [
    "¿Es un servicio oficial de una universidad?",
    "KnowU es una iniciativa independiente. Conectar con estudiantes no implica una alianza institucional ni una certificación de estudios o habilidades por parte de una universidad.",
  ],
];

// Conceptual examples, separate from the credited student portfolio works.
function EncargoVisual({ kind }: { kind: Need }) {
  return (
    <div className={`encargo-visual encargo-${kind}`} aria-hidden="true">
      {kind === "video" ? (
        <svg viewBox="0 0 480 300" fill="none">
          <rect width="480" height="300" fill="#e6e4f3" />
          <rect x="44" y="33" width="392" height="230" rx="4" fill="#24242b" />
          <rect x="56" y="45" width="368" height="174" fill="#e8b994" />
          <circle cx="322" cy="93" r="27" fill="#fff1c5" />
          <path d="M56 182L157 86L280 219H56Z" fill="#8d93aa" />
          <path d="M195 219L325 126L424 183V219Z" fill="#3c468b" />
          <circle cx="240" cy="132" r="26" fill="#f4f2eb" />
          <path d="M234 121L251 132L234 143Z" fill="#3036d6" />
          <path d="M65 241H414" stroke="#73727f" strokeWidth="3" />
          <path d="M65 241H226" stroke="#caff44" strokeWidth="3" />
          <circle cx="226" cy="241" r="5" fill="#caff44" />
        </svg>
      ) : kind === "grafico" ? (
        <svg viewBox="0 0 480 300" fill="none">
          <rect width="480" height="300" fill="#e9c7ad" />
          <g transform="rotate(-9 156 156)">
            <rect x="61" y="40" width="189" height="238" fill="#3036d6" />
            <path d="M90 166C122 77 185 91 220 56M90 205C122 116 185 130 220 95M90 244C122 155 185 169 220 134" stroke="#caff44" strokeWidth="9" />
          </g>
          <g transform="rotate(7 302 145)">
            <rect x="209" y="25" width="195" height="239" fill="#f4f2eb" stroke="#252526" />
            <circle cx="348" cy="72" r="20" fill="#e9c7ad" />
            <text x="228" y="130" fill="#3036d6" fontFamily="Georgia, serif" fontSize="44">Celebra</text>
            <text x="228" y="174" fill="#3036d6" fontFamily="Georgia, serif" fontSize="44">a tu</text>
            <text x="228" y="218" fill="#3036d6" fontFamily="Georgia, serif" fontSize="44">manera.</text>
            <path d="M229 239H377" stroke="#252526" />
          </g>
        </svg>
      ) : (
        <svg viewBox="0 0 480 300" fill="none">
          <rect width="480" height="300" fill="#dfe4da" />
          <path d="M37 218L243 99L445 216M87 249L293 130M139 278L345 160M37 159L243 278M88 129L344 277M139 100L445 277" stroke="#b8c1b2" />
          <ellipse cx="249" cy="242" rx="104" ry="24" fill="#b5beac" />
          <path d="M165 209L250 258L340 206L255 157Z" fill="#3036d6" />
          <path d="M165 193L250 242V258L165 209Z" fill="#24299b" />
          <path d="M250 242L340 190V206L250 258Z" fill="#4e53e1" />
          <path d="M165 193L255 141L340 190L250 242Z" fill="#797df0" />
          <path d="M188 180V97L222 77V160L290 199L255 219Z" fill="#3036d6" />
          <path d="M188 97L222 77L246 91L212 111Z" fill="#a5a8ff" />
          <path d="M212 111L246 91V146L313 185L290 199L222 160V117Z" fill="#6368eb" />
          <path d="M150 70L150 178M143 74L157 66M143 182L157 174M333 226L378 200M333 220V232M378 194V206" stroke="#34383a" strokeWidth="1.5" />
        </svg>
      )}
    </div>
  );
}

function Wordmark() {
  return (
    <a className="wordmark" href="#inicio" aria-label="KnowU, inicio">
      Know<span>U</span>
      <span className="brand-period" aria-hidden="true">
        .
      </span>
    </a>
  );
}

export default function Home() {
  const [need, setNeed] = useState<Need>("otro");
  const [status, setStatus] = useState<"idle" | "busy" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [errorFields, setErrorFields] = useState<{
    email?: string;
    consent?: string;
  }>({});
  const successRef = useRef<HTMLDivElement>(null);
  const privacyRef = useRef<HTMLDialogElement>(null);
  const sessionId = useRef("");
  const attribution = useRef<Attribution>({
    source: "direct",
    medium: "",
    campaign: "",
  });

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("knowu-client-session");
      sessionId.current =
        stored && /^[0-9a-f-]{36}$/i.test(stored)
          ? stored
          : crypto.randomUUID();
      sessionStorage.setItem("knowu-client-session", sessionId.current);
    } catch {
      sessionId.current = crypto.randomUUID();
    }
    const params = new URLSearchParams(location.search);
    attribution.current = {
      source: (params.get("utm_source") || "direct").slice(0, 100),
      medium: (params.get("utm_medium") || "").slice(0, 100),
      campaign: (params.get("utm_campaign") || "").slice(0, 100),
    };
    track("visit", "page");
  }, []);
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);
  useEffect(() => {
    if (privacyOpen) privacyRef.current?.showModal();
  }, [privacyOpen]);

  function track(event: string, position: string) {
    if (!sessionId.current) return;
    void fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        position,
        sessionId: sessionId.current,
        attribution: attribution.current,
      }),
      keepalive: true,
    }).catch(() => {});
  }
  function begin(position: string, selected?: Need) {
    if (selected) setNeed(selected);
    track("cta_click", position);
    requestAnimationFrame(() =>
      document.getElementById("pilot-email")?.focus({ preventScroll: true }),
    );
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "busy") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") || "").trim();
    const consent = data.get("consent") === "on";
    const fields: { email?: string; consent?: string } = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)
      fields.email = "Escribe un correo válido. Por ejemplo: ana@correo.com.";
    if (!consent)
      fields.consent = "Autoriza el contacto para poder enviar tu solicitud.";
    setErrorFields(fields);
    if (Object.keys(fields).length) {
      form
        .querySelector<HTMLInputElement>(
          fields.email ? "[name=email]" : "[name=consent]",
        )
        ?.focus();
      return;
    }
    setStatus("busy");
    setError("");
    try {
      if (!sessionId.current) sessionId.current = crypto.randomUUID();
      const response = await fetch("/api/pilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          need,
          description: String(data.get("description") || "").trim(),
          consent,
          clientKind: data.get("clientKind"),
          website: data.get("website"),
          sessionId: sessionId.current,
          attribution: attribution.current,
        }),
      });
      if (!response.ok)
        throw new Error(
          "No pudimos guardar tu solicitud. Tus datos siguen aquí para que puedas intentarlo de nuevo.",
        );
      const receipt = await response.json();
      setConfirmation(receipt.confirmation || "unavailable");
      setStatus("success");
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "No pudimos guardar tu solicitud. Inténtalo de nuevo.",
      );
      setStatus("error");
    }
  }

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <header className="site-header" id="inicio">
        <div className="container header-content">
          <div className="brand">
            <Wordmark />
            <span className="audience-label">Para clientes</span>
          </div>
          <a
            className="button button-small"
            href="#piloto"
            onClick={() => begin("header")}
          >
            Proponer mi encargo <MoveUpRight size={15} />
          </a>
        </div>
      </header>
      <main id="contenido">
        <section className="container hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow">
              <span aria-hidden="true" />
              DISEÑO / PILOTO EN BOGOTÁ
            </div>
            <h1 id="hero-title">
              Tienes una idea.<br /><em>Encuentra quién le dé forma.</em>
            </h1>
            <p className="hero-description">
              Conecta con estudiantes de diseño para dar forma a proyectos personales o de tu negocio. Cuéntanos qué necesitas y revisemos cómo ayudarte durante el piloto.
            </p>
            <a className="button" href="#piloto" onClick={() => begin("hero")}>
              Proponer mi encargo <ArrowRight size={18} />
            </a>
            <p className="hero-note">
              Registra tu idea para el piloto en Bogotá.
              <br />
              El equipo podrá contactarte para conocer los detalles. Sin crear una cuenta.
            </p>
            <a className="text-link" href="#encargos">
              Mira lo que podrías encargar <ArrowDown size={14} />
            </a>
          </div>
          <figure className="cover-work">
            <a href={portfolios[3].url} target="_blank" rel="noopener noreferrer" aria-label="Ver ¡Ven a patinar! de Isabella Montoya">
              <img src="/obras/patinar.webp" width="1200" height="800" fetchPriority="high" alt={portfolios[3].alt} />
            </a>
            <figcaption><strong>¡Ven a patinar!</strong><span>Isabella Montoya · Ilustración digital</span></figcaption>
          </figure>
        </section>
        <section
          className="container examples-section"
          id="encargos"
          aria-labelledby="examples-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">ALGUNOS EJEMPLOS DE ENCARGOS</p>
              <h2 id="examples-title">
                Para tus planes.
                <br />
                Para tu negocio.
              </h2>
            </div>
            <p>
              Tienes la idea, los clips o un boceto. Te hace falta alguien que
              te ayude a darle forma. Estos son algunos puntos de partida.
            </p>
          </div>
          <div className="project-grid">
            {previewNeeds.map((value, index) => (
              <article className="project" key={value}>
                <EncargoVisual kind={value} />
                <div className="project-info">
                  <div className="project-heading">
                    <span className="project-number">0{index + 1}</span>
                    <span className="project-category">{examples[value].tag}</span>
                  </div>
                  <h3>{examples[value].name}</h3>
                  <p>
                    {value === "video"
                      ? "Un recuerdo de viaje, un reel para tu marca o un video para una ocasión especial."
                      : value === "grafico"
                        ? "Invitaciones, afiches, ilustraciones o piezas para las redes de tu emprendimiento."
                        : "Un soporte a medida, un modelo o una pequeña pieza. Diseño y fabricación por revisar en el piloto."}
                  </p>
                  <a
                    className="text-link"
                    href="#piloto"
                    onClick={() => begin("example", value)}
                  >
                    Quiero algo así <ArrowRight size={16} />
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className="other-needs">
            <span>¿Tienes un proyecto distinto?</span>
            <p>
              Puedes proponer tu propio encargo de diseño. También exploramos
              proyectos digitales con estudiantes de sistemas.
            </p>
            <a href="#piloto" onClick={() => begin("other", "otro")}>
              Cuéntanos tu idea <ArrowRight size={15} />
            </a>
          </div>
        </section>
        <section className="process-section" aria-labelledby="process-title">
          <div className="container process-inner">
            <div>
              <p className="eyebrow">ASÍ QUEREMOS CONECTAR LAS IDEAS</p>
              <h2 id="process-title">
                Tú cuentas qué necesitas.
                <br />
                El talento pone manos
                <br />a la obra.
              </h2>
              <p className="process-intro">
                El recorrido que estamos preparando para el piloto: encargos
                definidos desde el principio y acuerdos claros para ambas
                partes.
              </p>
              <a
                className="button button-white"
                href="#piloto"
                onClick={() => begin("process")}
              >
                Proponer mi encargo <ArrowRight size={18} />
              </a>
            </div>
            <ol className="process-list">
              <li>
                <span>01</span>
                <div>
                  <h3>Cuéntanos tu encargo.</h3>
                  <p>
                    Déjanos tu correo y el tipo de ayuda que buscas. Puede ser
                    para ti o para tu negocio.
                  </p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>Conversemos sobre tu idea.</h3>
                  <p>
                    El equipo podrá contactarte para conocer tu proyecto y
                    revisar si encaja con una prueba del piloto.
                  </p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>Acordemos las condiciones.</h3>
                  <p>
                    Si hay una oportunidad, se definirán el alcance, la fecha
                    y el presupuesto antes de empezar.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>
        <section
          className="container exhibition" aria-labelledby="portfolio-title">
          <div className="exhibit-head"><p className="eyebrow">SELECCIÓN DE PORTAFOLIOS / 01—04</p>
            <h2 id="portfolio-title">Cuatro miradas <em>al diseño.</em></h2>
            <p>Detrás de cada trabajo hay una habilidad que puede inspirar tu encargo. Explora las obras de sus autoras e imagina qué podrías crear con ese talento.</p>
          </div>
          <div className="works-grid">{portfolios.map((work, i) => (
            <figure key={work.file}>
              <a className="work-link" href={work.url} target="_blank" rel="noopener noreferrer">
                <div className={'work-plate plate-' + work.file}><img src={'/obras/' + work.file + '.webp'} loading="lazy" decoding="async" alt={work.alt} /></div>
                <figcaption><small>0{i+1} / {work.name}</small><strong>{work.title} <MoveUpRight size={17} aria-hidden="true" /></strong></figcaption>
              </a>
              <div className="work-possibility">
                <p className="work-skill">{inspirations[i].skill}</p>
                <p className="work-possibility-label">UN PUNTO DE PARTIDA PARA TU IDEA</p>
                <p className="work-prompt">{inspirations[i].possibility}</p>
                <a className="text-link" href="#piloto"
                  aria-label={`Proponer un encargo inspirado en ${work.title}`}
                  onClick={() => begin("example", inspirations[i].need)}>
                  Quiero explorar algo así <ArrowRight size={16} />
                </a>
              </div>
            </figure>
          ))}</div>
        </section>
        <section
          className="container pilot-section"
          id="piloto"
          aria-labelledby="pilot-title"
        >
          <div className="pilot-copy">
            <p className="eyebrow">EMPECEMOS POR TU IDEA</p>
            <h2 id="pilot-title">
              No necesitas tener<br />
              <em>todo resuelto.</em>
            </h2>
            <p>
              Cuéntanos por dónde quieres empezar. Puede ser una idea, una
              referencia o algo que todavía no sabes cómo resolver. Déjanos tu
              correo y exploremos si encaja con el piloto.
            </p>
            <div className="pilot-reassurance">
              <CheckCircle2 size={19} />
              <p>
                Recibimos tu idea y el equipo podrá contactarte para conocer los detalles y revisar si encaja con el piloto.
                <br />
                Sin compromiso de contratación ni cobros por registrar tu interés.
              </p>
            </div>
            <div className="pilot-sticker" aria-hidden="true">
              <span>
                UNA IDEA
                <br />
                NO TIENE QUE
                <br />
                QUEDARSE EN IDEA.
              </span>
              <MoveUpRight size={28} />
            </div>
          </div>
          <div className="form-panel">
            {status === "success" ? (
              <div
                className="success-state"
                ref={successRef}
                tabIndex={-1}
                role="status"
              >
                <div className="success-icon">
                  <Check size={32} />
                </div>
                <p className="eyebrow">SOLICITUD RECIBIDA</p>
                <h3>
                  Tu idea ya tiene
                  <br />
                  un siguiente paso.
                </h3>
                <p>
                  Guardamos tu solicitud. El equipo de KnowU podrá contactarte
                  en el correo que ingresaste para conocer los detalles y revisar
                  si tu encargo encaja con el piloto.
                </p>
                <p className="form-footnote">
                  {confirmation === "accepted"
                    ? "Enviamos una confirmación a tu correo. Revisa también la carpeta de spam."
                    : confirmation === "already_sent"
                      ? "Este correo ya tiene una solicitud registrada. Conservamos tu registro anterior; puedes responder a la confirmación que recibiste."
                      : "Tu solicitud está guardada, pero no pudimos enviar la confirmación por correo en este momento. No necesitas volver a registrarte."}
                </p>
                <p className="form-footnote">
                  Esto no confirma una contratación ni disponibilidad. No se ha
                  realizado ningún cobro.
                </p>
                <button
                  className="text-link"
                  onClick={() => {
                    setStatus("idle");
                    setErrorFields({});
                  }}
                >
                  Volver al formulario <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate aria-busy={status === "busy"}>
                <div className="form-top">
                  <h3>Da el primer paso.</h3>
                  <span className="form-stage">01 / PILOTO</span>
                </div>
                <div className="form-field">
                  <label htmlFor="pilot-email">
                    Tu correo electrónico <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="pilot-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="tu@correo.com"
                    required
                    maxLength={254}
                    aria-invalid={!!errorFields.email}
                    aria-describedby={
                      errorFields.email ? "email-error" : undefined
                    }
                  />
                  {errorFields.email && (
                    <p className="field-error" id="email-error">
                      {errorFields.email}
                    </p>
                  )}
                </div>
                <div className="form-field">
                  <label htmlFor="pilot-need">
                    ¿Qué tipo de encargo necesitas?
                  </label>
                  <div className="select-wrap">
                    <select
                      id="pilot-need"
                      name="need"
                      value={need}
                      onChange={(event) => setNeed(event.target.value as Need)}
                    >
                      <option value="otro">Mi propio proyecto de diseño o digital</option>
                      <option value="video">Edición de video</option>
                      <option value="grafico">
                        Diseño gráfico e ilustración
                      </option>
                      <option value="3d">Modelado o impresión 3D</option>
                    </select>
                    <ChevronDown size={17} aria-hidden="true" />
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="pilot-description">
                    Cuéntanos brevemente tu idea <span className="optional">(opcional)</span>
                  </label>
                  <textarea id="pilot-description" name="description" rows={4}
                    maxLength={1000} placeholder="¿Qué necesitas crear o resolver?"
                    aria-describedby="description-hint" />
                  <p className="form-footnote" id="description-hint">Hasta 1.000 caracteres. Puede ser cualquier encargo de diseño; los ejemplos son solo un punto de partida.</p>
                </div>
                {need === "3d" && (
                  <p className="conditional-note">
                    Los encargos físicos están en exploración: revisaremos
                    materiales, impresión y entrega antes de coordinar una
                    prueba.
                  </p>
                )}
                <div className="form-field">
                  <label htmlFor="client-kind">
                    Es para… <span className="optional">(opcional)</span>
                  </label>
                  <div className="select-wrap">
                    <select
                      id="client-kind"
                      name="clientKind"
                      defaultValue="sin-definir"
                    >
                      <option value="sin-definir">
                        Prefiero contarlo después
                      </option>
                      <option value="personal">Un proyecto personal</option>
                      <option value="negocio">
                        Mi negocio o emprendimiento
                      </option>
                    </select>
                    <ChevronDown size={17} aria-hidden="true" />
                  </div>
                </div>
                <div className="honeypot" aria-hidden="true">
                  <label htmlFor="website">Deja este campo vacío</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    autoComplete="off"
                    tabIndex={-1}
                  />
                </div>
                <div className="consent-field">
                  <input
                    id="pilot-consent"
                    name="consent"
                    type="checkbox"
                    required
                    aria-invalid={!!errorFields.consent}
                    aria-describedby={
                      errorFields.consent ? "consent-error" : undefined
                    }
                  />
                  <label htmlFor="pilot-consent">
                    Autorizo a KnowU a usar estos datos para contactarme sobre
                    el piloto.{" "}
                    <button
                      className="inline-link"
                      type="button"
                      onClick={() => setPrivacyOpen(true)}
                    >
                      Cómo usamos tus datos
                    </button>
                  </label>
                </div>
                {errorFields.consent && (
                  <p className="field-error" id="consent-error">
                    {errorFields.consent}
                  </p>
                )}
                {status === "error" && (
                  <p className="submit-error" role="alert">
                    {error}
                  </p>
                )}
                <button
                  className="button form-submit"
                  type="submit"
                  disabled={status === "busy"}
                >
                  {status === "busy" ? (
                    <>
                      <LoaderCircle className="spinner" size={18} /> Enviando tu
                      solicitud…
                    </>
                  ) : (
                    <>
                      Proponer mi encargo <ArrowRight size={18} />
                    </>
                  )}
                </button>
                <p className="form-footnote">
                  Registro de interés, sin compromiso de contratación.
                  <br />
                  El MVP actual usa pagos simulados.
                </p>
              </form>
            )}
          </div>
        </section>
        <section className="faq-section">
          <div className="container faq-layout">
            <div>
              <p className="eyebrow">ANTES DE EMPEZAR</p>
              <h2>
                Las cosas claras.
                <br />
                Las ideas, también.
              </h2>
              <p className="faq-intro">
                Un poco más sobre quién puede participar y qué estamos
                preparando.
              </p>
            </div>
            <div className="faq-list">
              {faq.map(([question, answer]) => (
                <details key={question}>
                  <summary>
                    {question}
                    <Plus size={18} aria-hidden="true" />
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section className="container final-cta">
          <span className="eyebrow">DE PENDIENTE A POSIBILIDAD</span>
          <h2>
            Empieza con un
            <br />
            «necesito ayuda con…».
          </h2>
          <a className="button" href="#piloto" onClick={() => begin("closing")}>
            Proponer mi encargo <ArrowRight size={18} />
          </a>
        </section>
      </main>
      <footer className="site-footer">
        <div className="container footer-content">
          <Wordmark />
          <p>
            Ideas de personas y negocios.
            <br />
            Talento estudiantil para darles forma.
          </p>
          <span>
            BOGOTÁ, COLOMBIA
            <br />
            KnowU · Piloto en preparación
          </span>
          <button className="text-link" onClick={() => setPrivacyOpen(true)}>
            Uso de datos <MoveUpRight size={14} />
          </button>
        </div>
      </footer>
      <dialog
        className="privacy-dialog"
        ref={privacyRef}
        aria-labelledby="privacy-title"
        onClose={() => setPrivacyOpen(false)}
      >
        <div className="dialog-header">
          <span className="eyebrow">PILOTO KNOWU</span>
          <button
            type="button"
            aria-label="Cerrar información de datos"
            onClick={() => privacyRef.current?.close()}
          >
            <X size={20} />
          </button>
        </div>
        <h2 id="privacy-title">
          Tus datos,
          <br />
          con un propósito.
        </h2>
        <p>
          El equipo del proyecto KnowU recibe el correo, el tipo de encargo y la
          descripción opcional que envías para gestionar tu interés y contactarte
          sobre el piloto.
        </p>
        <p>
          También registramos visitas por sesión, clics y canal de llegada para
          entender el interés en esta propuesta. No usamos estos datos para
          crear una cuenta ni realizar cobros. No recogemos archivos de tu
          proyecto en esta página.
        </p>
        <p>
          El acceso a las solicitudes está restringido al equipo que administra
          el sitio. Puedes retirar tu interés respondiendo al contacto que
          recibas; no te enviaremos una confirmación automática por correo.
        </p>
        <button className="button" onClick={() => privacyRef.current?.close()}>
          Entendido <Check size={16} />
        </button>
      </dialog>
    </>
  );
}
