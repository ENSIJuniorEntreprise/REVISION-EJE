import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────
   DONNÉES
───────────────────────────────────────────────────────────── */
const processSteps = [
  {
    icon: "/assets/analysis.png",
    title: "Analyse des Besoins",
    delay: 0,
    items: [
      "Premier contact",
      "Analyse approfondie des besoins et exigences",
      "Proposition de la solution adaptée",
    ],
  },
  {
    icon: "/assets/consulting.png",
    title: "Conseil",
    delay: 150,
    items: [
      "Préparation des spécifications du projet",
      "Signature du contrat",
      "Début de la collaboration",
    ],
  },
  {
    icon: "/assets/execution.png",
    title: "Exécution du Projet",
    delay: 300,
    items: [
      "Mise en œuvre du projet",
      "Réunions de suivi",
      "Validation étape par étape",
    ],
  },
  {
    icon: "/assets/delivery.png",
    title: "Livraison du Projet",
    delay: 450,
    items: [
      "Remise du projet",
      "Mesure de la satisfaction",
      "Support client",
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL
───────────────────────────────────────────────────────────── */
export default function ProcessSection() {
  const [visible,    setVisible]    = useState(false);
  const [lineHeight, setLineHeight] = useState(0);
  const [hovered,    setHovered]    = useState(null);
  const sectionRef  = useRef(null);
  const timelineRef = useRef(null);

  /* ── IntersectionObserver ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* ── Animation de la ligne verticale ── */
  useEffect(() => {
    if (!visible) return;
    let start = null;
    const duration = 1600;
    const animate = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setLineHeight(progress * 100);
      if (progress < 1) requestAnimationFrame(animate);
    };
    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [visible]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-[#2ea3dd]/10 px-6 sm:px-10 lg:px-16 py-20 sm:py-28"
      style={{ background: "#1f212d" }}
    >
      {/* ── Keyframes ── */}
      <style>{`
        @keyframes proc-fadeUp   { from { opacity:0; transform:translateY(32px);  } to { opacity:1; transform:translateY(0); } }
        @keyframes proc-fadeLeft { from { opacity:0; transform:translateX(-36px); } to { opacity:1; transform:translateX(0); } }
        @keyframes proc-fadeRight{ from { opacity:0; transform:translateX(36px);  } to { opacity:1; transform:translateX(0); } }
        @keyframes proc-dotPop   { 0%{transform:scale(0) rotate(-90deg);opacity:0;} 65%{transform:scale(1.18) rotate(6deg);opacity:1;} 100%{transform:scale(1) rotate(0);opacity:1;} }
        @keyframes proc-glow     { 0%,100%{box-shadow:0 0 0 rgba(46,163,221,0);}  50%{box-shadow:0 0 20px rgba(46,163,221,0.45);} }
        @keyframes proc-shimmer  { 0%{background-position:-200% center;} 100%{background-position:200% center;} }
        @keyframes proc-scan     { 0%{top:-2px;opacity:.7;} 100%{top:calc(100% + 2px);opacity:0;} }
        @keyframes proc-vidReveal{ from{opacity:0;transform:scale(.94) translateY(18px);} to{opacity:1;transform:scale(1) translateY(0);} }
        @keyframes proc-pulse    { 0%,100%{opacity:1;} 50%{opacity:.45;} }

        .proc-step-card {
          transition: transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .35s ease, background .3s ease, border-color .3s ease;
        }
        .proc-step-card:hover {
          transform: translateX(8px) !important;
        }
      `}</style>

      {/* ── Grille de fond ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(46,163,221,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(46,163,221,0.035) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          opacity: visible ? 1 : 0,
          transition: "opacity 1.4s ease .3s",
        }}
      />
      {/* Vignette radiale */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(46,163,221,0.04) 0%, transparent 70%)",
        }}
      />

      {/* ══════════════════════════════════════════════════
          CONTENU : 2 colonnes (titre+vidéo | timeline)
      ══════════════════════════════════════════════════ */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row gap-14 lg:gap-20 items-start">

        {/* ═══════════════════════
            COLONNE GAUCHE
        ═══════════════════════ */}
        <div
          className="lg:w-[380px] flex-shrink-0"
          style={{
            opacity: visible ? 1 : 0,
            animation: visible
              ? "proc-fadeLeft .85s cubic-bezier(.22,1,.36,1) .1s both"
              : "none",
          }}
        >
          {/* Badge */}
          <span
            className="inline-flex items-center gap-2 text-[#2ea3dd] text-xs font-bold tracking-widest px-4 py-1.5 rounded-full border border-[#2ea3dd]/30 mb-6"
            style={{ background: "rgba(46,163,221,0.07)" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#2ea3dd]"
              style={{ animation: "proc-pulse 2s ease-in-out infinite" }}
            />
            À PROPOS DE NOTRE
          </span>

          {/* Titre */}
          <p
            className="text-lg font-light italic mb-1 tracking-wide"
            style={{ color: "#2ea3dd" }}
          >
            Notre
          </p>
          <h2
            className="text-5xl sm:text-6xl font-extrabold uppercase tracking-tight leading-none mb-5"
            style={{ color: "#e0ded2" }}
          >
            PROCESSUS
          </h2>

          {/* Sous-titre */}
          <p className="text-sm sm:text-base leading-7 text-[#8a8880] mb-8">
            Guidé par une{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(90deg, #2ea3dd, #33ddff, #2ea3dd)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: visible ? "proc-shimmer 3s linear infinite" : "none",
                fontWeight: 600,
              }}
            >
              expérience client
            </span>{" "}
            exceptionnelle
          </p>

          {/* Ligne déco */}
          <div
            className="h-px w-16 mb-10"
            style={{
              background: "linear-gradient(90deg, #2ea3dd, transparent)",
            }}
          />

          {/* ── Vidéo ── */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              border: "1px solid rgba(46,163,221,0.22)",
              boxShadow:
                "0 0 0 1px rgba(46,163,221,0.06), 0 20px 50px rgba(0,0,0,0.45)",
              opacity: visible ? 1 : 0,
              animation: visible
                ? "proc-vidReveal .95s cubic-bezier(.22,1,.36,1) .45s both"
                : "none",
            }}
          >
            <video
              className="w-full block"
              style={{ maxHeight: 260, objectFit: "cover" }}
              autoPlay
              muted
              loop
              playsInline
              loading="lazy"
              poster="/assets/video-poster.jpg"
            >
              <source src="/videos/process.mp4" type="video/mp4" />
            </video>

            {/* Overlay bas */}
            <div
              className="absolute bottom-0 left-0 right-0 h-14 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(31,33,45,.65), transparent)",
              }}
            />

            {/* Badge live */}
            <div
              className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{
                background: "rgba(46,163,221,0.15)",
                border: "1px solid rgba(46,163,221,0.35)",
                color: "#2ea3dd",
                backdropFilter: "blur(8px)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#2ea3dd]"
                style={{ animation: "proc-pulse 1.5s ease-in-out infinite" }}
              />
              EN DIRECT
            </div>
          </div>
        </div>

        {/* ═══════════════════════
            COLONNE DROITE — Timeline
        ═══════════════════════ */}
        <div
          ref={timelineRef}
          className="flex-1 relative"
          style={{
            opacity: visible ? 1 : 0,
            animation: visible
              ? "proc-fadeRight .85s cubic-bezier(.22,1,.36,1) .2s both"
              : "none",
          }}
        >
          {/* Ligne verticale */}
          <div
            className="absolute top-7 bottom-7 w-px"
            style={{
              left: 27,
              background: "rgba(46,163,221,0.1)",
            }}
          >
            <div
              className="w-full origin-top"
              style={{
                height: `${lineHeight}%`,
                background:
                  "linear-gradient(to bottom, #2ea3dd 0%, rgba(46,163,221,0.15) 100%)",
                transition: "height 0.05s linear",
              }}
            />
          </div>

          {/* ── Étapes ── */}
          <div className="flex flex-col gap-8">
            {processSteps.map((step, i) => {
              const isHovered = hovered === i;
              const delay = 300 + i * 160;

              return (
                <div
                  key={step.title}
                  className="relative flex gap-5 items-start"
                  style={{
                    opacity: visible ? 1 : 0,
                    animation: visible
                      ? `proc-fadeUp .65s cubic-bezier(.22,1,.36,1) ${delay}ms both`
                      : "none",
                  }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Nœud icône */}
                  <div className="relative flex-shrink-0 z-10">
                    <div
                      className="flex items-center justify-center rounded-full cursor-pointer"
                      style={{
                        width: 54,
                        height: 54,
                        background: isHovered
                          ? "rgba(46,163,221,0.18)"
                          : "#1f212d",
                        border: `2px solid ${isHovered ? step.color : "rgba(46,163,221,0.3)"}`,
                        boxShadow: isHovered
                          ? `0 0 22px rgba(46,163,221,0.4)`
                          : "none",
                        transition: "all .35s ease",
                        animation: visible
                          ? `proc-dotPop .55s cubic-bezier(.34,1.56,.64,1) ${delay + 200}ms both`
                          : "none",
                      }}
                    >
                      <img
                        src={step.icon}
                        alt={step.title}
                        className="w-6 h-6 object-contain"
                        style={{
                          filter: isHovered
                            ? `brightness(1.25) drop-shadow(0 0 7px ${step.color})`
                            : "brightness(.7)",
                          transition: "filter .3s ease",
                        }}
                      />
                    </div>

                    {/* Numéro */}
                    <span
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-extrabold"
                      style={{
                        background: isHovered ? step.color : "#2ea3dd",
                        color: "#1f212d",
                        transition: "background .3s ease",
                      }}
                    >
                      {i + 1}
                    </span>
                  </div>

                  {/* Carte contenu */}
                  <div
                    className="proc-step-card flex-1 rounded-2xl px-5 py-4 overflow-hidden relative"
                    style={{
                      background: isHovered
                        ? "rgba(46,163,221,0.09)"
                        : "rgba(255,255,255,0.03)",
                      border: `1px solid ${isHovered ? "rgba(46,163,221,0.4)" : "rgba(46,163,221,0.1)"}`,
                      backdropFilter: "blur(12px)",
                      boxShadow: isHovered
                        ? "0 8px 32px rgba(46,163,221,0.14)"
                        : "0 2px 12px rgba(0,0,0,0.15)",
                    }}
                  >
                    {/* Scan line au hover */}
                    {isHovered && (
                      <div
                        className="absolute left-0 w-full pointer-events-none"
                        style={{
                          height: 1.5,
                          background:
                            "linear-gradient(90deg, transparent, rgba(46,163,221,0.55), transparent)",
                          animation: "proc-scan .9s ease-in-out infinite",
                        }}
                      />
                    )}

                    {/* Reflet haut */}
                    <div
                      className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(46,163,221,0.4), transparent)",
                        opacity: isHovered ? 1 : 0.3,
                        transition: "opacity .3s ease",
                      }}
                    />

                    {/* Titre étape */}
                    <h3
                      className="text-sm sm:text-base font-extrabold mb-3 tracking-wide"
                      style={{
                        color: isHovered ? step.color : "#2ea3dd",
                        transition: "color .3s ease",
                      }}
                    >
                      {step.title}
                    </h3>

                    {/* Séparateur */}
                    <div
                      className="rounded-full mb-3"
                      style={{
                        height: 1.5,
                        width: isHovered ? "50%" : "20%",
                        background: `linear-gradient(90deg, ${step.color}, transparent)`,
                        transition: "width .4s cubic-bezier(.34,1.56,.64,1)",
                      }}
                    />

                    {/* Liste */}
                    <ol className="flex flex-col gap-2">
                      {step.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2.5 text-xs sm:text-sm"
                          style={{
                            color: isHovered ? "#c8c6bc" : "#8a8880",
                            transition: "color .3s ease",
                          }}
                        >
                          <span
                            className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold mt-0.5"
                            style={{
                              background: isHovered
                                ? "rgba(46,163,221,0.2)"
                                : "rgba(46,163,221,0.1)",
                              color: step.color,
                              border: `1px solid ${isHovered ? "rgba(46,163,221,0.4)" : "rgba(46,163,221,0.2)"}`,
                              transition: "all .3s ease",
                            }}
                          >
                            {j + 1}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ol>

                    {/* Barre bas */}
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
                      style={{
                        height: 2,
                        width: isHovered ? "65%" : "0%",
                        background: `linear-gradient(90deg, transparent, ${step.color}, transparent)`,
                        transition: "width .4s cubic-bezier(.34,1.56,.64,1)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── CTA bas ── */}
      <div
        className="relative z-10 mt-16 sm:mt-20 text-center"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity .8s ease 1.3s",
        }}
      >
        {/* Ligne déco */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#2ea3dd]/40" />
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#2ea3dd]/60"
          />
          <span
            className="w-2 h-2 rounded-full bg-[#2ea3dd]"
            style={{ animation: "proc-pulse 2s ease-in-out infinite" }}
          />
          <span className="w-1.5 h-1.5 rounded-full bg-[#2ea3dd]/60" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#2ea3dd]/40" />
        </div>

        <button
          className="rounded-xl px-9 py-3.5 text-sm font-bold tracking-wide transition-all duration-300 hover:-translate-y-0.5"
          style={{ background: "#2ea3dd", color: "#1f212d" }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "#33ddff";
            e.currentTarget.style.boxShadow  = "0 8px 30px rgba(46,163,221,0.35)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "#2ea3dd";
            e.currentTarget.style.boxShadow  = "none";
          }}
        >
          Démarrer un projet
        </button>
      </div>
    </section>
  );
}
