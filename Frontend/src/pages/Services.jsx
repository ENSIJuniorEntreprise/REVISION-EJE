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
    image : "/assets/le-portage-salarial-developpeur-web-1.jpg",
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
    image : "/assets/Mobile_App.jpg",
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
    image : "/assets/Desktop.jpg",
  },
  {
    id: "ia",
    label: "Intelligence Artificielle",
    icon: "/assets/chatbot.png",
    title: "Intelligence Artificielle",
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
        className={`relative overflow-hidden py-80 sm:py-50 bg-[linear-gradient(rgba(31,33,45,0.82),rgba(31,33,45,0.82)),url('/assets/20th-generation.png')] bg-cover bg-center bg-no-repeat px-6 sm:px-10 lg:px-24 py-28 sm:py-36 text-center transition-all duration-700 ${
          heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Cercles orbitaux */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="absolute w-[600px] h-[600px] rounded-full border border-[#2ea3dd]/10 animate-spin" />
          <div className="absolute w-[400px] h-[400px] rounded-full border border-[#2ea3dd]/10 animate-[spin_15s_linear_infinite_reverse]" />
        </div>

        <div className="relative z-5">
          <span className="inline-block border-2 border-[#2ea3dd] text-[#2ea3dd] text-xs font-bold tracking-widest px-7 py-3 rounded-full mb-4">
          ENSI JUNIOR ENTREPRISE
        </span>
          <h1 className="mb-8 text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-[#e0ded2]">
            Nos Expertises
          </h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg leading-7 text-[#8a8880]">
            De la conception à la mise en production, nous transformons vos défis technologiques en avantages compétitifs.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button className="rounded-lg bg-[#2ea3dd] px-8 py-3.5 text-sm font-bold text-[#e0ded2] tracking-wide transition-all duration-300 hover:-translate-y-1 hover:bg-[#33ddff] hover:shadow-[0_8px_16px_rgba(46,163,221,0.35)]">
              Demander un devis
            </button>
            <button className="rounded-lg bg-transparent border border-[#8a8880] px-8 py-3.5 text-sm font-bold text-[#e0ded2] tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1f212d] hover:shadow-[0_8px_16px_#1f212d]">
              Notre Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* SERVICE CARDS */}
       <section className="bg-[#1f212d] px-6 py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="inline-block border border-[#2ea3dd] text-[#2ea3dd] text-xs font-semibold tracking-widest px-4 py-1 rounded-full mb-4">
          NOS SERVICES
        </span>
        <h2 className="text-3xl font-bold text-[#e0ded2] mb-4">
          Solutions de Développement
        </h2>
        <p className="text-[#e0ded2]/60 max-w-xl mx-auto text-sm leading-relaxed">
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
                  : "border-white/20 text-[#e0ded2]/60 hover:border-[#2ea3dd] hover:text-[#2ea3dd]"
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
          <p className="text-[#e0ded2]/60 font-semibold text-sm leading-relaxed mb-6">
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
      <section
        ref={mindsetRef}
        className={`bg-gradient-to-br from-[#00aacc] via-[#0077aa] to-[#005588] px-6 sm:px-10 lg:px-16 py-16 sm:py-20 text-center transition-all duration-700 ${
          mindsetVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <h2 className="mb-2 text-3xl sm:text-4xl font-extrabold text-[#e0ded2]">
          Projet <span className="text-[#1f212d]">Mindset</span>
        </h2>
        <p className="mb-12 text-sm sm:text-base text-white/75">
          Notre approche structurée garantit le succès de chaque collaboration.
        </p>
        <div className="flex flex-wrap justify-center gap-10 lg:gap-20">
          {mindsetValues.map((v, i) => (
            <div
              key={v.title}
              className={`flex flex-col items-center gap-4 transition-all duration-700 ${
                mindsetVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <img
                  src={v.icon}
                  alt={v.title}
                  className="w-12 h-12 object-contain"
              />
              <div className="text-base font-bold text-[#e0ded2]">{v.title}</div>
              <div className="max-w-[160px] text-center text-xs sm:text-sm leading-6 text-white/70">
                {v.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

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
                  <span>⏱️</span> Respect des délais
                </div>
                <div className="text-[10px] leading-4 text-[#8a8880]">
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
                  <span>💰</span> Maîtriser les coûts
                </div>
                <div className="text-[10px] leading-4 text-[#8a8880]">
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
                  <span>✅</span> Exigence et précision
                </div>
                <div className="text-[10px] leading-4 text-[#8a8880]">
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
      <section
        ref={subRef}
        className={`border-t border-[#2ea3dd]/10 px-6 sm:px-10 lg:px-16 py-20 text-center transition-all duration-700 ${
          subVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-[#2ea3dd]">
          ALLER PLUS LOIN
        </div>

        <h2 className="mb-4 text-3xl sm:text-4xl font-extrabold text-[#e0ded2]">
          Les sous-prestations
        </h2>

        <p className="mx-auto mb-12 max-w-2xl text-sm sm:text-base leading-7 text-[#8a8880]">
          Au-delà du développement de base, nous fournissons un écosystème complet de services numériques pour assurer le succès à long terme de vos projets.
        </p>

        <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3.5">
          {subServices.map((s, i) => (
            <button
              key={s}
              className={`rounded-full border border-[#2ea3dd]/40 px-5 py-2.5 text-xs sm:text-sm text-[#c8c6bc] transition-all duration-500 hover:border-[#2ea3dd] hover:bg-[#2ea3dd]/10 hover:text-[#2ea3dd] ${
                subVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              {s}
            </button>
          ))}
        </div>
      </section>

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

        <p className="mb-9 text-sm sm:text-base text-[#8a8880]">
          Contactez nos experts dès aujourd'hui pour une analyse gratuite de vos besoins.
        </p>

        <button className="rounded-lg bg-[#2ea3dd] px-8 py-3.5 text-sm font-bold text-[#1f212d] tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#33ddff] hover:shadow-[0_8px_30px_rgba(46,163,221,0.35)]">
          Demander un devis
        </button>
      </section>
    </div>
  );
}
