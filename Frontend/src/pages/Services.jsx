import { useState, useEffect, useRef } from "react";


const CheckCircle = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const services = [
  {
    id: "web",
    label : "Développement Web",  
    icon: "/assets/globe.png",
    title: "Développement Web",
    desc: "Solutions web performantes, évolutives et centrées sur l'utilisateur utilisant React, Next.js et Node.js.",
    features: ["Sites web d'entreprise et vitrines",
      "Applications web progressives (PWA)",
      "Plateformes e-commerce",
      "Systèmes de gestion de contenu (CMS)",
      "Intégrations API et services tiers",],
    image : "/assets/getent (1).png",
  },
  {
    id: "mobile",
    label: "Développement Mobile",

    icon: "/assets/telephone.png",
    title: "Développement Mobile",
    desc: "Applications natives et hybrides fluides pour iOS et Android avec Flutter ou React Native.",
    features: ["iOS & Android natif et hybride",
      "UI/UX Mobile optimisé",
      "Intégration API",
      "Mode hors-ligne (Offline Mode)",],
    image : "/assets/daam.png",
  },
  {
    id: "desktop",
    label: "Développement Desktop",
    icon: "/assets/portable.png",
    title: "Développement Desktop",
    desc: "Logiciels de bureau robustes pour Windows, macOS et Linux répondant à vos besoins métiers complexes.",
    features: ["Cross-platform (Win, Mac, Linux)",
      "Haute performance",
      "Sécurité avancée",
      "Legacy update & migration",],
    image : "/assets/dashbord.png",
  },
  {
    id: "ia",
    label: "ChatBot & IA",
    icon: "/assets/chatbot.png",
    title: "CHATBOT & IA",
    desc: "Intégration de modèles d'IA générative et de machine learning pour automatiser et optimiser vos processus.",
    features: ["NLP & traitement du langage",
      "Computer Vision",
      "Predictive Analytics",
      "Generative AI (Gen AI)",],
    image : "/assets/chatbot.jpg",
  },
];

const mindsetValues = [
  { icon: "/assets/agile.png", title: "Agilité", desc: "Méthodologie Scrum pour une livraison rapide et maîtrisée." },
  { icon: "/assets/precision (1).png", title: "Précision", desc: "Alignement étroit avec vos objectifs stratégiques." },
  { icon: "/assets/shop.png", title: "Excellence", desc: "Contrôle qualité rigoureux à chaque étape du projet." },
];

const subServices = [
  "UI/UX DESIGN",
  "Search Engine Optimization",
  "Maintenance",
  "Analytics Dashboard",
  "Hosting & Domain Setup",
  "Staff Training",
];

function useIntersection(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) obs.observe(ref.current);

    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}
const mindsetCards = [
  {
    icon: "/assets/agile.png",
    title: "Agilité",
    desc: "Méthodologie Scrum pour une livraison rapide et maîtrisée.",
    accent: "#2ea3dd",
    glowColor: "rgba(46,163,221,0.22)",
    delay: 0,
    fromX: -28,
    fromY: 40,
  },
  {
    icon: "/assets/precision (1).png",
    title: "Précision",
    desc: "Alignement étroit avec vos objectifs stratégiques.",
    accent: "#33ddff",
    glowColor: "rgba(51,221,255,0.22)",
    delay: 160,
    fromX: 0,
    fromY: 52,
  },
  {
    icon: "/assets/shop.png",
    title: "Excellence",
    desc: "Contrôle qualité rigoureux à chaque étape du projet.",
    accent: "#2ea3dd",
    glowColor: "rgba(46,163,221,0.22)",
    delay: 320,
    fromX: 28,
    fromY: 40,
  },
];

function MindsetSection() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-6 sm:px-10 lg:px-16 py-20 sm:py-28"
      style={{
        background: "linear-gradient(135deg, #0a1628 0%, #0d2040 40%, #0a1a30 70%, #061220 100%)",
      }}
    >
      <style>{`
        @keyframes mindsetFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%       { transform: translateY(-5px) rotate(0.5deg); }
          66%       { transform: translateY(-2px) rotate(-0.3deg); }
        }
        @keyframes iconPulse {
          0%, 100% { filter: brightness(1)    drop-shadow(0 0 6px rgba(46,163,221,0.3)); }
          50%       { filter: brightness(1.15) drop-shadow(0 0 14px rgba(46,163,221,0.6)); }
        }
        @keyframes bgMesh {
          0%   { transform: translate(-50%,-50%) scale(1)    rotate(0deg); }
          50%  { transform: translate(-50%,-50%) scale(1.08) rotate(180deg); }
          100% { transform: translate(-50%,-50%) scale(1)    rotate(360deg); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .mindset-card-hover {
          transition:
            transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow 0.38s ease,
            background 0.38s ease;
        }
        .mindset-card-hover:hover {
          transform: translateY(-10px) scale(1.03) !important;
        }
      `}</style>

      {/* Fond décoratif */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[
          { size: 520, top: "10%", left: "15%", dur: "28s", opacity: 0.06 },
          { size: 380, top: "55%", left: "70%", dur: "36s", opacity: 0.05 },
          { size: 260, top: "30%", left: "85%", dur: "22s", opacity: 0.07 },
          { size: 200, top: "75%", left: "8%",  dur: "19s", opacity: 0.05 },
        ].map(({ size, top, left, dur, opacity }, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-[#2ea3dd]"
            style={{
              width: size, height: size,
              top, left,
              transform: "translate(-50%,-50%)",
              opacity,
              animation: `bgMesh ${dur} linear infinite`,
              animationDelay: `${i * 4}s`,
            }}
          />
        ))}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(46,163,221,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Header */}
      <div
        className="relative z-10 text-center mb-16 sm:mb-20"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >

          

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#e0ded2] mb-4 leading-tight">
          Project{" "}
          <span
            style={{
              backgroundImage: "linear-gradient(90deg, #2ea3dd 0%, #33ddff 40%, #2ea3dd 80%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 3s linear infinite",
            }}
          >
            Mindset
          </span>
        </h2>
        <p className="text-sm sm:text-base text-white/55 max-w-md mx-auto leading-relaxed">
          Notre approche structurée garantit le succès de chaque projet.
        </p>
      </div>

      {/* Cartes */}
      <div className="relative z-10 flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-20 max-w-5xl mx-auto">
        {mindsetCards.map((card, i) => {
          const isHovered = hovered === i;
          return (
            <div
              key={card.title}
              className="mindset-card-hover relative flex flex-col items-center gap-5 cursor-pointer"
              style={{
                width: "clamp(200px, 28vw, 280px)",
                padding: "50px 24px 50px",
                borderRadius: 20,
                background: isHovered ? "rgba(46,163,221,0.12)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${isHovered ? "rgba(46,163,221,0.55)" : "rgba(46,163,221,0.15)"}`,
                boxShadow: isHovered
                  ? `0 20px 50px ${card.glowColor}, 0 0 0 1px rgba(46,163,221,0.2)`
                  : "0 4px 24px rgba(0,0,0,0.2)",
                backdropFilter: "blur(12px)",
                opacity: visible ? 1 : 0,
                transform: visible
                  ? "translateY(0) translateX(0) scale(1)"
                  : `translateY(${card.fromY}px) translateX(${card.fromX}px) scale(0.88)`,
                transition: `opacity 0.7s ease ${card.delay}ms, transform 0.75s cubic-bezier(0.34, 1.56, 0.64, 1) ${card.delay}ms, box-shadow 0.38s ease, background 0.38s ease, border 0.38s ease`,
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
                style={{
                  width: "60%", height: 1,
                  background: "linear-gradient(90deg, transparent, rgba(46,163,221,0.5), transparent)",
                  opacity: isHovered ? 1 : 0.4,
                  transition: "opacity 0.3s ease",
                }}
              />

              <span
                className="absolute top-4 right-5 text-xs font-bold tracking-widest"
                style={{
                  color: isHovered ? "rgba(46,163,221,0.8)" : "rgba(46,163,221,0.25)",
                  transition: "color 0.3s ease",
                }}
              >
                0{i + 1}
              </span>

              <div
                className="relative flex items-center justify-center rounded-full"
                style={{
                  width: 72, height: 72,
                  background: isHovered ? "rgba(46,163,221,0.18)" : "rgba(46,163,221,0.08)",
                  border: `1.5px solid ${isHovered ? "rgba(46,163,221,0.5)" : "rgba(46,163,221,0.2)"}`,
                  boxShadow: isHovered ? `0 0 22px ${card.glowColor}` : "none",
                  transition: "all 0.35s ease",
                  animation: visible
                    ? `mindsetFloat ${4.2 + i * 0.6}s ease-in-out ${card.delay + 800}ms infinite`
                    : "none",
                }}
              >
                <img
                  src={card.icon}
                  alt={card.title}
                  className="w-9 h-9 object-contain"
                  style={{
                    animation: isHovered ? "iconPulse 1.4s ease-in-out infinite" : "none",
                    filter: isHovered ? `drop-shadow(0 0 10px ${card.accent})` : "none",
                    transition: "filter 0.3s ease",
                  }}
                />
              </div>

              <div
                className="text-base font-extrabold tracking-wide"
                style={{
                  color: isHovered ? card.accent : "#e0ded2",
                  transition: "color 0.3s ease",
                }}
              >
                {card.title}
              </div>

              <div
                className="rounded-full"
                style={{
                  height: 1.5,
                  width: isHovered ? "60%" : "28%",
                  background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)`,
                  transition: "width 0.4s ease",
                }}
              />

              <p
                className="text-center text-xs sm:text-sm leading-6"
                style={{
                  color: isHovered ? "rgba(224,222,210,0.85)" : "rgba(224,222,210,0.55)",
                  transition: "color 0.3s ease",
                  maxWidth: 200,
                }}
              >
                {card.desc}
              </p>

              <span
                className="mt-1 text-[10px] font-bold tracking-[0.12em] uppercase px-3 py-1 rounded-full"
                style={{
                  background: isHovered ? "rgba(46,163,221,0.18)" : "rgba(46,163,221,0.07)",
                  color: isHovered ? card.accent : "rgba(46,163,221,0.45)",
                  border: `1px solid ${isHovered ? "rgba(46,163,221,0.4)" : "rgba(46,163,221,0.12)"}`,
                  transition: "all 0.3s ease",
                }}
              >
                {card.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Ligne décorative bas */}
      <div
        className="relative z-10 mt-16 mx-auto flex items-center gap-4 max-w-xs"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s ease 0.7s",
        }}
      >
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#2ea3dd]/40" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#2ea3dd]/60" />
        <div className="w-2 h-2 rounded-full bg-[#2ea3dd]" style={{ animation: "iconPulse 2s ease-in-out infinite" }} />
        <div className="w-1.5 h-1.5 rounded-full bg-[#2ea3dd]/60" />
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#2ea3dd]/40" />
      </div>
    </section>
  );
}
const subServicesList = [
  { label: "UI/UX DESIGN",            icon: "/assets/fenetre.png" },
  { label: "Search Engine Optimization", icon: "/assets/search-engine-optimization.png" },
  { label: "Maintenance",              icon: "/assets/reglage.png" },
  { label: "Analytics Dashboard",      icon: "/assets/data-analytics.png" },
  { label: "Hosting & Domain Setup",   icon: "/assets/une-analyse.png" },
  { label: "Staff Training",           icon: "/assets/equipe.png" },
];

function SubPrestationsSection() {
  const [visible, setVisible]   = useState(false);
  const [hovered, setHovered]   = useState(null);
  const [active,  setActive]    = useState(null);
  const sectionRef              = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-[#2ea3dd]/10 px-6 sm:px-10 lg:px-16 py-20 sm:py-28"
      style={{ background: "#1f212d" }}
    >
      <style>{`
        /* Entrée : chaque carte tombe depuis le haut avec rotation */
        @keyframes dropIn {
          0%   { opacity: 0; transform: translateY(-60px) rotateX(40deg) scale(0.85); }
          60%  { opacity: 1; transform: translateY(6px)   rotateX(-4deg) scale(1.02); }
          80%  { transform: translateY(-3px) rotateX(2deg) scale(0.99); }
          100% { opacity: 1; transform: translateY(0)     rotateX(0deg)  scale(1);    }
        }

        /* Shimmer sur le texte au hover */
        @keyframes textShimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        /* Scan line qui traverse la carte */
        @keyframes scanLine {
          0%   { top: -2px;    opacity: 0.7; }
          100% { top: calc(100% + 2px); opacity: 0;   }
        }

        /* Rotation douce de l'icône au hover */
        @keyframes iconSpin {
          0%   { transform: rotate(0deg)   scale(1);    }
          40%  { transform: rotate(20deg)  scale(1.15); }
          70%  { transform: rotate(-8deg)  scale(1.05); }
          100% { transform: rotate(0deg)   scale(1);    }
        }

        /* Glow pulsant sur la bordure au hover */
        @keyframes borderGlow {
          0%,100% { box-shadow: 0 0 0px rgba(46,163,221,0);   }
          50%      { box-shadow: 0 0 18px rgba(46,163,221,0.4); }
        }

        .sub-card {
          transition:
            transform  0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
            background 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.35s ease;
        }
        .sub-card:hover {
          transform: translateY(-6px) scale(1.06) !important;
        }
        .sub-card.active-card {
          transform: scale(0.96) !important;
        }
      `}</style>

      {/* ── Grille de points décoratifs ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(46,163,221,0.12) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: visible ? 0.5 : 0,
          transition: "opacity 1.2s ease 0.3s",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(31,33,45,0) 40%, #1f212d 100%)",
        }}
      />

      {/* ── Header ── */}
      <div
        className="relative z-10 text-center mb-16"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(-20px) scale(0.97)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        

        <h2 className="mb-4 text-3xl sm:text-4xl font-extrabold text-[#e0ded2]">
          Les{" "}
          <span
            style={{
              backgroundImage: "linear-gradient(90deg, #2ea3dd, #33ddff, #2ea3dd)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: visible ? "textShimmer 3s linear infinite" : "none",
            }}
          >
            sous-prestations
          </span>
        </h2>

        <p className="mx-auto max-w-2xl text-sm sm:text-base leading-7 text-[#e0ded2]">
          Au-delà du développement de base, nous fournissons un écosystème complet
          de services numériques pour assurer le succès à long terme de vos projets.
        </p>
      </div>

      {/* ── Grille de cartes ── */}
      <div className="relative z-10 mx-auto max-w-4xl grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
        {subServicesList.map((service, i) => {
          const isHovered = hovered === i;
          const isActive  = active  === i;

          return (
            <div
              key={service.label}
              className={`sub-card relative overflow-hidden cursor-pointer rounded-2xl px-5 py-6 flex flex-col items-center gap-3 text-center ${isActive ? "active-card" : ""}`}
              style={{
                background: isHovered
                  ? "rgba(46,163,221,0.1)"
                  : "rgba(255,255,255,0.03)",
                border: `1px solid ${isHovered ? "rgba(46,163,221,0.5)" : "rgba(46,163,221,0.12)"}`,
                backdropFilter: "blur(10px)",
                /* Animation dropIn au scroll */
                animation: visible
                  ? `dropIn 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${i * 80}ms both`
                  : "none",
                /* Glow pulsant quand hover */
                boxShadow: isHovered
                  ? "0 8px 32px rgba(46,163,221,0.2), inset 0 1px 0 rgba(46,163,221,0.15)"
                  : "0 2px 12px rgba(0,0,0,0.15)",
                perspective: 800,
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onMouseDown={()  => setActive(i)}
              onMouseUp={()    => setActive(null)}
            >
              {/* Scan line au hover */}
              {isHovered && (
                <div
                  className="absolute left-0 w-full pointer-events-none"
                  style={{
                    height: 1.5,
                    background:
                      "linear-gradient(90deg, transparent, rgba(46,163,221,0.6), transparent)",
                    animation: "scanLine 0.9s ease-in-out infinite",
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
                  transition: "opacity 0.3s ease",
                }}
              />

              {/* Icône */}
              {/* Icône */}
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: 52,
                  height: 52,
                  background: isHovered ? "rgba(46,163,221,0.15)" : "rgba(46,163,221,0.07)",
                  border: `1.5px solid ${isHovered ? "rgba(46,163,221,0.45)" : "rgba(46,163,221,0.15)"}`,
                  boxShadow: isHovered ? "0 0 18px rgba(46,163,221,0.3)" : "none",
                  transition: "all 0.35s ease",
                  animation: isHovered ? "iconSpin 0.5s ease forwards" : "none",
                  }}
                >
                  <img
                  src={service.icon}
                  alt={service.label}
                  className="w-6 h-6 object-contain"
                  style={{
                    filter: isHovered
                    ? "brightness(1.2) drop-shadow(0 0 6px rgba(46,163,221,0.6))"
                    : "brightness(0.8)",
                    transition: "filter 0.3s ease",
                  }}
                  />
              </div>
              {/* Label */}
              <span
                className="text-xs sm:text-sm font-bold tracking-wide leading-snug"
                style={{
                  color: isHovered ? "#e0ded2" : "#e0ded2",
                  transition: "color 0.3s ease",
                }}
              >
                {service.label}
              </span>

              {/* Barre indicateur bas */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
                style={{
                  height: 2,
                  width: isHovered ? "70%" : "0%",
                  background: "linear-gradient(90deg, transparent, #2ea3dd, #33ddff, transparent)",
                  transition: "width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
const processSteps = [
  {
    icon: "/assets/analysing.png",
    title: "Analyse des Besoins",
    delay: 0,
    items: [
      "Premier contact",
      "Analyse approfondie des besoins et exigences",
      "Proposition de la solution adaptée",
    ],
  },
  {
    icon: "/assets/talk.png",
    title: "Conseil",
    delay: 150,
    items: [
      "Préparation des spécifications du projet",
      "Signature du contrat",
      "Début de la collaboration",
    ],
  },
  {
    icon: "/assets/task-management.png",
    title: "Exécution du Projet",
    delay: 300,
    items: [
      "Mise en œuvre du projet",
      "Réunions de suivi",
      "Validation étape par étape",
    ],
  },
  {
    icon: "/assets/express-delivery.png",
    title: "Livraison du Projet",
    delay: 450,
    items: [
      "Remise du projet",
      "Mesure de la satisfaction",
      "Support client",
    ],
  },
];

function ProcessSection() {
  const [visible,    setVisible]    = useState(false);
  const [lineHeight, setLineHeight] = useState(0);
  const [hovered,    setHovered]    = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

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
      style={{
        background:
          "linear-gradient(135deg, #0a1628 0%, #0d2040 40%, #0a1a30 70%, #061220 100%)",
      }}
    >
      <style>{`
        @keyframes proc-fadeUp    { from{opacity:0;transform:translateY(32px);}  to{opacity:1;transform:translateY(0);} }
        @keyframes proc-fadeLeft  { from{opacity:0;transform:translateX(-36px);} to{opacity:1;transform:translateX(0);} }
        @keyframes proc-fadeRight { from{opacity:0;transform:translateX(36px);}  to{opacity:1;transform:translateX(0);} }
        @keyframes proc-dotPop    { 0%{transform:scale(0) rotate(-90deg);opacity:0;} 65%{transform:scale(1.18) rotate(6deg);opacity:1;} 100%{transform:scale(1) rotate(0);opacity:1;} }
        @keyframes proc-shimmer   { 0%{background-position:-200% center;} 100%{background-position:200% center;} }
        @keyframes proc-scan      { 0%{top:-2px;opacity:.7;} 100%{top:calc(100% + 2px);opacity:0;} }
        @keyframes proc-vidReveal { from{opacity:0;transform:scale(.94) translateY(18px);} to{opacity:1;transform:scale(1) translateY(0);} }
        @keyframes proc-pulse     { 0%,100%{opacity:1;} 50%{opacity:.4;} }
        @keyframes proc-bgMesh    { 0%{transform:translate(-50%,-50%) scale(1) rotate(0deg);} 50%{transform:translate(-50%,-50%) scale(1.08) rotate(180deg);} 100%{transform:translate(-50%,-50%) scale(1) rotate(360deg);} }
        @keyframes iconPulseProc  { 0%,100%{filter:brightness(1) drop-shadow(0 0 6px rgba(46,163,221,.3));} 50%{filter:brightness(1.15) drop-shadow(0 0 14px rgba(46,163,221,.6));} }
        .proc-step-card {
          transition: transform .38s cubic-bezier(.34,1.56,.64,1), box-shadow .35s ease, background .3s ease, border-color .3s ease;
        }
        .proc-step-card:hover {
          transform: translateY(-6px) scale(1.02) !important;
        }
      `}</style>

      {/* Fond décoratif cercles mesh */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[
          { size: 520, top: "10%", left: "15%", dur: "28s", opacity: 0.06 },
          { size: 380, top: "55%", left: "70%", dur: "36s", opacity: 0.05 },
          { size: 260, top: "30%", left: "85%", dur: "22s", opacity: 0.07 },
          { size: 200, top: "75%", left: "8%",  dur: "19s", opacity: 0.05 },
        ].map(({ size, top, left, dur, opacity }, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-[#2ea3dd]"
            style={{
              width: size, height: size,
              top, left,
              transform: "translate(-50%,-50%)",
              opacity,
              animation: `proc-bgMesh ${dur} linear infinite`,
              animationDelay: `${i * 4}s`,
            }}
          />
        ))}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(46,163,221,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Layout 2 colonnes */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row gap-14 lg:gap-20 items-start">

        {/* GAUCHE : titre + vidéo */}
        <div
          className="lg:w-[560px] flex-shrink-0 flex flex-col gap-8"
          style={{
            opacity: visible ? 1 : 0,
            animation: visible ? "proc-fadeLeft .85s cubic-bezier(.22,1,.36,1) .1s both" : "none",
          }}
        >
          <div>
            <p className="text-lg font-light italic mt-4 mb-1 tracking-wide" style={{ color: "#2ea3dd" }}>
              Notre
            </p>
            <h2
              className="text-5xl sm:text-6xl font-extrabold uppercase tracking-tight leading-none mb-5"
              style={{ color: "#e0ded2" }}
            >
              PROCESSUS
            </h2>
            <p className="text-sm sm:text-base leading-7 text-[#e0ded2]">
              Guidé par une{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(90deg, #2ea3dd 0%, #33ddff 40%, #2ea3dd 80%)",
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
            <div className="mt-6 h-px w-16" style={{ background: "linear-gradient(90deg, #2ea3dd, transparent)" }} />
          </div>

          {/* Vidéo */}
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
    className="w-full h-[300px] md:h-[400px] lg:h-[400px] object-cover"
    autoPlay
    muted
    loop
    playsInline
    poster="/assets/video-poster.jpg"
  >
    <source src="/assets/Copie.mp4" type="video/mp4" />
  </video>

  <div
    className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
    style={{
      background:
        "linear-gradient(to top, rgba(10,22,40,.7), transparent)",
    }}
  />
</div>
        </div>

        {/* DROITE : Timeline */}
        <div
          className="flex-1 relative"
          style={{
            opacity: visible ? 1 : 0,
            animation: visible ? "proc-fadeRight .85s cubic-bezier(.22,1,.36,1) .25s both" : "none",
          }}
        >
          {/* Ligne verticale */}
          <div
            className="absolute top-7 bottom-7 w-px"
            style={{ left: 27, background: "rgba(46,163,221,0.1)" }}
          >
            <div
              className="w-full origin-top"
              style={{
                height: `${lineHeight}%`,
                background: "linear-gradient(to bottom, #2ea3dd 0%, rgba(46,163,221,0.15) 100%)",
              }}
            />
          </div>

          <div className="flex flex-col gap-7">
            {processSteps.map((step, i) => {
              const isHovered = hovered === i;
              const delay = 300 + i * 160;
              return (
                <div
                  key={step.title}
                  className="relative flex gap-5 items-start"
                  style={{
                    opacity: visible ? 1 : 0,
                    animation: visible ? `proc-fadeUp .65s cubic-bezier(.22,1,.36,1) ${delay}ms both` : "none",
                  }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Icône nœud */}
                  <div className="relative flex-shrink-0 z-10">
                    <div
                      className="flex items-center justify-center rounded-full"
                      style={{
                        width: 54, height: 54,
                        background: isHovered ? "rgba(46,163,221,0.18)" : "rgba(46,163,221,0.08)",
                        border: `2px solid ${isHovered ? "#2ea3dd" : "rgba(46,163,221,0.3)"}`,
                        boxShadow: isHovered ? "0 0 22px rgba(46,163,221,0.4)" : "none",
                        transition: "all .35s ease",
                        animation: visible ? `proc-dotPop .55s cubic-bezier(.34,1.56,.64,1) ${delay + 200}ms both` : "none",
                      }}
                    >
                      <img
                        src={step.icon}
                        alt={step.title}
                        className="w-6 h-6 object-contain"
                        style={{
                          filter: isHovered
                            ? "brightness(1.25) drop-shadow(0 0 7px rgba(46,163,221,0.7))"
                            : "brightness(.7)",
                          animation: isHovered ? "iconPulseProc 1.4s ease-in-out infinite" : "none",
                          transition: "filter .3s ease",
                        }}
                      />
                    </div>
                    <span
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-extrabold"
                      style={{ background: "#2ea3dd", color: "#1f212d" }}
                    >
                      {i + 1}
                    </span>
                  </div>

                  {/* Carte */}
                  <div
                    className="proc-step-card flex-1 rounded-2xl px-5 py-4 relative overflow-hidden cursor-pointer"
                    style={{
                      background: isHovered ? "rgba(46,163,221,0.1)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${isHovered ? "rgba(46,163,221,0.45)" : "rgba(46,163,221,0.1)"}`,
                      backdropFilter: "blur(12px)",
                      boxShadow: isHovered
                        ? "0 12px 36px rgba(46,163,221,0.15), inset 0 1px 0 rgba(46,163,221,0.12)"
                        : "0 2px 12px rgba(0,0,0,0.15)",
                    }}
                  >
                    {isHovered && (
                      <div
                        className="absolute left-0 w-full pointer-events-none"
                        style={{
                          height: 1.5,
                          background: "linear-gradient(90deg, transparent, rgba(46,163,221,0.55), transparent)",
                          animation: "proc-scan .9s ease-in-out infinite",
                        }}
                      />
                    )}
                    <div
                      className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(46,163,221,0.4), transparent)",
                        opacity: isHovered ? 1 : 0.3,
                        transition: "opacity .3s ease",
                      }}
                    />
                    <span
                      className="absolute top-3 right-4 text-xs font-bold tracking-widest"
                      style={{
                        color: isHovered ? "rgba(46,163,221,0.8)" : "rgba(46,163,221,0.2)",
                        transition: "color .3s ease",
                      }}
                    >
                      0{i + 1}
                    </span>
                    <h3
                      className="text-sm sm:text-base font-extrabold mb-2 tracking-wide"
                      style={{ color: isHovered ? "#33ddff" : "#2ea3dd", transition: "color .3s ease" }}
                    >
                      {step.title}
                    </h3>
                    <div
                      className="rounded-full mb-3"
                      style={{
                        height: 1.5,
                        width: isHovered ? "55%" : "22%",
                        background: "linear-gradient(90deg, #2ea3dd, transparent)",
                        transition: "width .4s cubic-bezier(.34,1.56,.64,1)",
                      }}
                    />
                    <ol className="flex flex-col gap-2">
                      {step.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2.5 text-xs sm:text-sm"
                          style={{ color: isHovered ? "#c8c6bc" : "#e0ded2", transition: "color .3s ease" }}
                        >
                          <span
                            className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold mt-0.5"
                            style={{
                              background: isHovered ? "rgba(46,163,221,0.2)" : "rgba(46,163,221,0.1)",
                              color: "#2ea3dd",
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
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
                      style={{
                        height: 2,
                        width: isHovered ? "65%" : "0%",
                        background: "linear-gradient(90deg, transparent, #2ea3dd, #33ddff, transparent)",
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

      {/* CTA bas */}
      <div
        className="relative z-10 mt-16 sm:mt-20 text-center"
        style={{ opacity: visible ? 1 : 0, transition: "opacity .8s ease 1.3s" }}
      >
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#2ea3dd]/40" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#2ea3dd]/60" />
          <span className="w-2 h-2 rounded-full bg-[#2ea3dd]" style={{ animation: "proc-pulse 2s ease-in-out infinite" }} />
          <span className="w-1.5 h-1.5 rounded-full bg-[#2ea3dd]/60" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#2ea3dd]/40" />
        </div>
        <button
          className="rounded-xl px-9 py-3.5 text-sm font-bold tracking-wide transition-all duration-300 hover:-translate-y-0.5"
          style={{ background: "#2ea3dd", color: "#1f212d" }}
          onMouseEnter={e => { e.currentTarget.style.background = "#33ddff"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(46,163,221,0.35)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#2ea3dd"; e.currentTarget.style.boxShadow = "none"; }}
        >
          Démarrer un projet
        </button>
      </div>
    </section>
  );
}



export default function Services() {
  const [hoveredCircle, setHoveredCircle] = useState(null);
  const [heroRef, heroVisible] = useIntersection(0.1);
  const [mindsetRef, mindsetVisible] = useIntersection(0.1);
  const [projectRef, projectVisible] = useIntersection(0.1);
  const [subRef, subVisible] = useIntersection(0.1);
  const [ctaRef, ctaVisible] = useIntersection(0.1);
  const [active, setActive] = useState("web");
  const current = services.find((s) => s.id === active);

  const circleBase =
    "absolute w-40 h-40 rounded-full border-2 border-[#2ea3dd] bg-[#2ea3dd]/10 flex flex-col items-center justify-center gap-3 text-[#2ea3dd] font-bold text-sm text-center leading-snug cursor-pointer transition-all duration-500 hover:scale-110 hover:bg-[#2ea3dd]/20 hover:border-[#33ddff] hover:shadow-[0_0_30px_rgba(46,163,221,0.4)]";

  // Animation variants for the circles
  const getCircleStyle = (position, isVisible, delay) => {
    const baseStyle = {
      transition: `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
      opacity: isVisible ? 1 : 0,
      transform: isVisible 
        ? `translate(-50%, 0) scale(1)` 
        : `translate(-50%, ${position === 'top' ? '200px' : position === 'bottom' ? '-200px' : '0'}) scale(0.7)`,
      filter: isVisible ? 'blur(0px)' : 'blur(4px)',
    };

    if (position === 'top') {
        return { ...baseStyle, top: '20px', left: '50%' };
    } else if (position === 'bottom-left') {
        return { 
            ...baseStyle, 
            bottom: '20px', 
            left: '15%',
            transform: isVisible 
                ? `translate(-50%, 0) scale(1)` 
                : `translate(calc(-50% + 35vw), -200px) scale(0.7)`
        };
    } else if (position === 'bottom-right') {
        return { 
            ...baseStyle, 
            bottom: '20px', 
            right: '15%',
            transform: isVisible 
                ? `translate(50%, 0) scale(1)` 
                : `translate(calc(50% - 35vw), -200px) scale(0.7)`
        };
    }
    return baseStyle;
  };

  return (
    <div className="min-h-screen bg-[#1f212d] text-white font-sans overflow-x-hidden">
      {/* HERO */}
      <section
  ref={heroRef}
  className={`relative w-full overflow-hidden 
  min-h-[calc(100vh-64px)] 
  bg-[linear-gradient(rgba(31,33,45,0.82),rgba(31,33,45,0.82)),url('/assets/20th-generation.png')] 
  bg-cover bg-center bg-no-repeat 
  flex items-center justify-center 
  px-6 sm:px-10 lg:px-24 text-center 
  transition-all duration-700 ${
    heroVisible
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-10"
  }`}
>
        {/* Cercles orbitaux */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="absolute w-[600px] h-[600px] rounded-full border border-[#2ea3dd]/10 animate-spin" />
          <div className="absolute w-[400px] h-[400px] rounded-full border border-[#2ea3dd]/10 animate-[spin_15s_linear_infinite_reverse]" />
        </div>

        <div className="relative z-5">
          
        
          <span>
             
          <h1 className="mb-8 text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-[#e0ded2]" style={{
              backgroundImage: "linear-gradient(90deg, #e0ded2 0%, #2ea3dd 40%, #e0ded2 80%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 7s linear infinite",
            }} >
            Nos Expertises
          </h1>
          </span>
          <p className="mx-auto max-w-2xl text-base sm:text-lg leading-7 text-[#e0ded2]">
            De la conception à la mise en production, nous transformons vos défis technologiques en avantages compétitifs.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button className="rounded-lg bg-[#2ea3dd] px-8 py-3.5 text-sm font-bold text-[#e0ded2] tracking-wide transition-all duration-300 hover:-translate-y-1 hover:bg-[#33ddff] hover:shadow-[0_8px_16px_rgba(46,163,221,0.35)]">
              Demander un devis
            </button>
           <a href="\assets\Documents\Project-Portfolio-1.pdf">
  <button className="rounded-lg bg-transparent border border-[#e0ded2] px-8 py-3.5 text-sm font-bold text-[#e0ded2] tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1f212d] hover:shadow-[0_8px_16px_#1f212d]">
    Notre Portfolio
  </button>
</a>
          </div>
        </div>
      </section>

      {/* SERVICE CARDS */}
       <section className="bg-[#1f212d] px-6 py-20">
      {/* Header */}
      <div className="text-center mb-12">
        
        <h2 className="text-5xl font-bold text-[#e0ded2] mb-5">
          Solutions de Développement
        </h2>
        <p className="text-[#e0ded2] max-w-xl mx-auto text-sm leading-relaxed">
          Explorez notre gamme complète de services de développement
          informatique conçus pour répondre à vos besoins spécifiques.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center flex-wrap gap-2 mb-10">
        {services.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-200
              ${
                active === id
                  ? "bg-[#2ea3dd] border-[#2ea3dd] text-white"
                  : "border-white/20 text-[#e0ded2] hover:border-[#2ea3dd] hover:text-[#2ea3dd]"
              }`}
          >
            <img src={icon} alt={label} className="w-[15px] h-[15px] opacity-80" />
            {label}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div className="flex flex-col md:flex-row gap-10 items-start max-w-6xl mx-auto">
        {/* Left */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-[#2ea3dd] mb-4">
            {current.title}
          </h3>
          <p className="text-[#e0ded2] font-bold text-sm leading-relaxed mb-6">
            {current.desc}
          </p>
          <ul className="flex flex-col gap-3">
            {current.features.map((feat) => (
              <li
                key={feat}
                className="flex items-center gap-3 text-sm font-semibold text-[#e0ded2]"
              >
                <CheckCircle
                  size={18}
                  className="text-[#2ea3dd] flex-shrink-0"
                />
                {feat}
              </li>
            ))}
          </ul>
        </div>

        {/* Right */}
        <div className="flex-1 max-w-md w-full">
          <div className="bg-[#171a27] rounded-xl p-8 min-h-[280px] flex items-center justify-center shadow-2xl">
            {current.image ? (
              <img
                src={current.image}
                alt={current.title}
                className="rounded-lg w-full h-auto max-h-64 object-contain opacity-90"
              />
            ) : (
              <div className="bg-[#e8e6df]/10 rounded-lg w-full h-52 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-[#2ea3dd]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" />
                  <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="1.5" />
                  <polyline points="21 15 16 10 5 21" strokeWidth="1.5" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  

      {/* PROJET MINDSET */}
      <MindsetSection />

      {/* L'ESPRIT DE PROJET */}
      <section
        ref={projectRef}
        className={`mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 py-20 transition-all duration-700 ${
          projectVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="mb-16 sm:mb-20 text-center">
          <div className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-[#2ea3dd]">
            L'ESPRIT DE PROJET
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight text-[#e0ded2]">
            Chaque projet est conçu avec{" "}
            <span className="text-[#2ea3dd]">rigueur et précision</span>
          </h2>
        </div>

        <div className="relative w-full mb-16 sm:mb-20 flex justify-center items-center">
          {/* SVG décoratif - Center it better */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg
              className="h-[600px] w-full max-w-4xl"
              viewBox="0 0 1200 600"
            >
              <path
                d="M 300 450 Q 600 350 600 150"
                stroke="rgba(46,163,221,0.15)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="4 4"
              />
              <path
                d="M 900 450 Q 600 350 600 150"
                stroke="rgba(46,163,221,0.15)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="4 4"
              />
              <circle cx="350" cy="380" r="4" fill="rgba(46,163,221,0.3)" />
              <circle cx="420" cy="350" r="3" fill="rgba(46,163,221,0.2)" />
              <circle cx="850" cy="380" r="4" fill="rgba(46,163,221,0.3)" />
              <circle cx="780" cy="350" r="3" fill="rgba(46,163,221,0.2)" />
            </svg>
          </div>

          <div className="relative z-10 w-full h-[620px] sm:h-[520px] max-w-4xl">
            {/* Top Circle - Maîtrise du Temps */}
            <div
              className={circleBase}
              style={getCircleStyle('top', projectVisible, 200)}
              onMouseEnter={() => setHoveredCircle("temps")}
              onMouseLeave={() => setHoveredCircle(null)}
            >
              <img src="/assets/save-time.png" alt="" className="w-10 h-10 object-contain" />
              <div>
                <span>Maîtrise du</span>
                <br />
                <span> Temps</span>
              </div>
              
              {/* Tooltip inline for better responsiveness */}
              <div className={`absolute top-[-110px] left-1/2 -translate-x-1/2 w-[200px] rounded-xl border border-[#2ea3dd] bg-[#1f212d]/95 p-3 shadow-xl transition-all duration-300 pointer-events-none ${hoveredCircle === "temps" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
                <div className="mb-1 flex items-center gap-2 text-xs font-bold text-[#2ea3dd]">
                  <span><img src="\assets\save-time.png"alt="" /></span> Respect des délais
                </div>
                <div className="text-[10px] leading-4 text-[#e0ded2]">
                  Planification maîtrisée et exécution efficace pour garantir une livraison ponctuelle
                </div>
              </div>
            </div>

            {/* Bottom Left Circle - Maîtrise des Coûts */}
            <div
              className={circleBase}
              style={getCircleStyle('bottom-left', projectVisible, 400)}
              onMouseEnter={() => setHoveredCircle("coûts")}
              onMouseLeave={() => setHoveredCircle(null)}
            >
              <img src="/assets/profit.png" alt="" className="w-10 h-10 object-contain" />
              <div>
                <span>Maîtrise</span>
                <br />
                <span> des Coûts</span>
              </div>

              <div className={`absolute top-[-110px] left-1/2 -translate-x-1/2 w-[200px] rounded-xl border border-[#2ea3dd] bg-[#1f212d]/95 p-3 shadow-xl transition-all duration-300 pointer-events-none ${hoveredCircle === "coûts" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
                <div className="mb-1 flex items-center gap-2 text-xs font-bold text-[#2ea3dd]">
                  <span><img src="/assets/profit.png" alt="" className="w-10 h-10 object-contain" />
                </span> Maîtriser les coûts
                </div>
                <div className="text-[10px] leading-4 text-[#e0ded2]">
                  Des solutions optimisées, transparence et adaptation à votre projet
                </div>
              </div>
            </div>

            {/* Bottom Right Circle - Maîtrise de la Qualité */}
            <div
              className={circleBase}
              style={getCircleStyle('bottom-right', projectVisible, 600)}
              onMouseEnter={() => setHoveredCircle("qualité")}
              onMouseLeave={() => setHoveredCircle(null)}
            >
              <img src="/assets/achievement.png" alt="" className="w-10 h-10 object-contain" />
              <div>
                <span>Maîtrise de</span>
                <br />
                <span> Qualité</span>
              </div>

              <div className={`absolute top-[-110px] left-1/2 -translate-x-1/2 w-[200px] rounded-xl border border-[#2ea3dd] bg-[#1f212d]/95 p-3 shadow-xl transition-all duration-300 pointer-events-none ${hoveredCircle === "qualité" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
                <div className="mb-1 flex items-center gap-2 text-xs font-bold text-[#2ea3dd]">
                  <span><img src="/assets/achievement.png" alt="" className="w-10 h-10 object-contain" /></span> Exigence et précision
                </div>
                <div className="text-[10px] leading-4 text-[#e0ded2]">
                  Un haut niveau de qualité assuré à chaque étape du projet
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-lg sm:text-xl font-bold uppercase tracking-[0.08em] text-[#e0ded2]">
            LA CONCRÉTISATION DE L'ÉQUILIBRE PARFAIT
          </h3>
        </div>
      </section>

      {/* SOUS-PRESTATIONS */}
      <SubPrestationsSection />
      {/* NOTRE PROCESSUS */}
      {/* NOTRE PROCESSUS */}
<ProcessSection />
    

      {/* CTA */}
      <section
        ref={ctaRef}
        className={`border-t border-[#2ea3dd]/10 bg-white/[0.02] px-6 sm:px-10 lg:px-16 py-16 sm:py-20 text-center transition-all duration-700 ${
          ctaVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <h2 className="mb-4 text-3xl sm:text-4xl font-extrabold text-[#e0ded2]">
          Prêt à lancer votre projet ?
        </h2>

        <p className="mb-9 text-sm sm:text-base text-[#e0ded2]">
          Contactez nos experts dès aujourd'hui pour une analyse gratuite de vos besoins.
        </p>

        <button className="rounded-lg bg-[#2ea3dd] px-8 py-3.5 text-sm font-bold text-[#1f212d] tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#33ddff] hover:shadow-[0_8px_30px_rgba(46,163,221,0.35)]">
          Demander un devis
        </button>
      </section>
    </div>
  );
}
