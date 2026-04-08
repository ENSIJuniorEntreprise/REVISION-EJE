import { useState, useEffect, useRef } from "react";

const AgilityIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="20" stroke="#2ea3dd" strokeWidth="1.5" strokeDasharray="4 2" />
    <path d="M24 14 L28 20 L24 18 L20 20 Z" fill="#2ea3dd" />
    <circle cx="24" cy="24" r="4" fill="#2ea3dd" fillOpacity="0.3" stroke="#2ea3dd" strokeWidth="1.5" />
    <path d="M16 32 Q24 26 32 32" stroke="#2ea3dd" strokeWidth="1.5" fill="none" />
  </svg>
);

const PrecisionIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="18" stroke="#2ea3dd" strokeWidth="1.5" />
    <circle cx="24" cy="24" r="10" stroke="#2ea3dd" strokeWidth="1" />
    <circle cx="24" cy="24" r="4" fill="#2ea3dd" />
    <path d="M32 16 L36 12 M24 6 L24 10 M38 24 L42 24" stroke="#2ea3dd" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M28 20 L36 12" stroke="#2ea3dd" strokeWidth="1" strokeDasharray="2 2" />
  </svg>
);

const ExcellenceIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M24 8 L28 18 L40 18 L30 25 L34 36 L24 29 L14 36 L18 25 L8 18 L20 18 Z" stroke="#2ea3dd" strokeWidth="1.5" fill="none" />
    <path d="M24 14 L26.5 21 L34 21 L28 25.5 L30.5 33 L24 28.5 L17.5 33 L20 25.5 L14 21 L21.5 21 Z" fill="#2ea3dd" fillOpacity="0.2" />
  </svg>
);

const TimeIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="18" stroke="#2ea3dd" strokeWidth="1.5" />
    <path d="M24 12 L24 24 L32 32" stroke="#2ea3dd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="24" cy="24" r="3" fill="#2ea3dd" />
  </svg>
);

const CostIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="16" stroke="#2ea3dd" strokeWidth="1.5" />
    <path d="M24 14 L24 34" stroke="#2ea3dd" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 18 L30 18" stroke="#2ea3dd" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 30 L30 30" stroke="#2ea3dd" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

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
  },
];

const mindsetValues = [
  { icon: <AgilityIcon />, title: "Agilité", desc: "Méthodologie Scrum pour une livraison rapide et maîtrisée." },
  { icon: <PrecisionIcon />, title: "Précision", desc: "Alignement étroit avec vos objectifs stratégiques." },
  { icon: <ExcellenceIcon />, title: "Excellence", desc: "Contrôle qualité rigoureux à chaque étape du projet." },
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
    "absolute w-40 h-40 rounded-full border-2 border-[#2ea3dd] bg-[#2ea3dd]/10 flex flex-col items-center justify-center gap-3 text-[#2ea3dd] font-bold text-sm text-center leading-snug cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-[#2ea3dd]/20 hover:border-[#33ddff] hover:shadow-[0_0_30px_rgba(46,163,221,0.4)]";

  return (
    <div className="min-h-screen bg-[#1f212d] text-white font-sans overflow-x-hidden">
      {/* HERO */}
      <section
        ref={heroRef}
        className={`relative overflow-hidden mb-16 bg-[linear-gradient(rgba(31,33,45,0.82),rgba(31,33,45,0.82)),url('/assets/20th-generation.png')] bg-cover bg-center bg-no-repeat px-6 sm:px-10 lg:px-24 py-28 sm:py-36 text-center transition-all duration-700 ${
          heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Cercles orbitaux */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="absolute w-[600px] h-[600px] rounded-full border border-[#2ea3dd]/10 animate-spin" />
          <div className="absolute w-[400px] h-[400px] rounded-full border border-[#2ea3dd]/10 animate-[spin_15s_linear_infinite_reverse]" />
        </div>

        <div className="relative z-10">
          <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#e0ded2]">
            Nos Expertises
          </h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg leading-7 text-[#8a8880]">
            De la conception à la mise en production, nous transformons vos défis technologiques en avantages compétitifs.
          </p>
          <button className="rounded-lg bg-[#2ea3dd] px-8 py-3.5 text-sm font-bold text-[#e0ded2] tracking-wide transition-all duration-300 translate-x-[-100px] translate-y-[50px] hover:-translate-y-1 hover:bg-[#33ddff] hover:shadow-[0_8px_16px_rgba(46,163,221,0.35)]">
            Demander un devis
          </button>
          <button className="rounded-lg bg-transparent border border-[#8a8880] px-8 py-3.5 text-sm font-bold text-[#e0ded2] tracking-wide transition-all duration-300 translate-x-[100px] translate-y-[50px] hover:-translate-y-0.5 hover:bg-[#1f212d] hover:shadow-[0_8px_16px_#1f212d]">
            Notre Portfolio
          </button>
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
      <div className="flex flex-wrap gap-2 mb-10">
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
            <img src={icon} alt={label} className="w-[15px] h-[15px] filter invert opacity-80" />
            {label}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Left */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-[#2ea3dd] mb-4">
            {current.title}
          </h3>
          <p className="text-[#e0ded2]/60 text-sm leading-relaxed mb-6">
            {current.desc}
          </p>
          <ul className="flex flex-col gap-3">
            {current.features.map((feat) => (
              <li
                key={feat}
                className="flex items-center gap-3 text-sm text-[#e0ded2]"
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
          <div className="bg-[#171a27] rounded-xl p-6 min-h-[280px] flex items-center justify-center">
            {current.icon ? (
              
              <img
                src="C:\Users\famille\Documents\GitHub\REVISION-EJE\Frontend\public\assets\Mobile App.jpg"
                
                className="rounded-lg w-full h-40 object-contain filter invert opacity-80"
              />
            ) : (
              <div className="bg-[#e8e6df] rounded-lg w-4/5 h-52 flex items-center justify-center opacity-20">
                <svg
                  className="w-10 h-10 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="2"
                    strokeWidth="1.5"
                  />
                  <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="1.5" />
                  <polyline points="21 15 16 10 5 21" strokeWidth="1.5" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

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
          Notre approche structurée garantit le succès de chaque projet.
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
              {v.icon}
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

        <div className="relative w-full mb-16 sm:mb-20">
          {/* SVG décoratif */}
          <svg
            className="pointer-events-none absolute left-0 top-0 h-[600px] w-full"
            viewBox="0 0 1200 600"
          >
            <path
              d="M 300 450 Q 400 350 600 300 Q 700 280 700 280"
              stroke="rgba(46,163,221,0.15)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 4"
            />
            <path
              d="M 900 450 Q 800 350 600 300 Q 550 280 550 280"
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

          <div className="relative z-10 h-[620px] sm:h-[520px]">
            {/* Top */}
            <div
              className={`${circleBase} top-5 left-1/2 -translate-x-1/2`}
              onMouseEnter={() => setHoveredCircle("temps")}
              onMouseLeave={() => setHoveredCircle(null)}
            >
              <TimeIcon />
              <div>
                <span>Maîtrise du</span>
                <span> Temps</span>
              </div>
            </div>

            {/* Bottom left */}
            <div
              className={`${circleBase} bottom-5 left-[15%] -translate-x-1/2`}
              onMouseEnter={() => setHoveredCircle("coûts")}
              onMouseLeave={() => setHoveredCircle(null)}
            >
              <CostIcon />
              <div>
                <span>Maîtrise</span>
                <span> des Coûts</span>
              </div>
            </div>

            {/* Bottom right */}
            <div
              className={`${circleBase} bottom-5 right-[15%] translate-x-1/2`}
              onMouseEnter={() => setHoveredCircle("qualité")}
              onMouseLeave={() => setHoveredCircle(null)}
            >
              <ExcellenceIcon />
              <div>
                <span>Maîtrise de la</span>
                <span> Qualité</span>
              </div>
            </div>

            {/* Tooltips */}
            {hoveredCircle === "temps" && (
              <div className="absolute left-1/2 top-[-130px] z-[100] w-[220px] max-w-[240px] -translate-x-1/2 rounded-xl border border-[#2ea3dd] bg-[#1f212d]/95 p-4 shadow-[0_4px_20px_rgba(46,163,221,0.2)] animate-fadeIn pointer-events-none">
                <div className="mb-1.5 flex items-center gap-2 text-xs font-bold text-[#2ea3dd]">
                  <span>⏱️</span> Respect des détails
                </div>
                <div className="text-[11px] leading-5 text-[#8a8880]">
                  Planification maîtrisée et exécution efficace pour garantir une livraison ponctuelle
                </div>
              </div>
            )}

            {hoveredCircle === "coûts" && (
              <div className="absolute left-[-130px] bottom-20 z-[100] w-[220px] max-w-[240px] rounded-xl border border-[#2ea3dd] bg-[#1f212d]/95 p-4 shadow-[0_4px_20px_rgba(46,163,221,0.2)] animate-fadeIn pointer-events-none">
                <div className="mb-1.5 flex items-center gap-2 text-xs font-bold text-[#2ea3dd]">
                  <span>💰</span> Maîtriser les coûts
                </div>
                <div className="text-[11px] leading-5 text-[#8a8880]">
                  Des solutions optimisées, transparence et adaptation à votre projet
                </div>
              </div>
            )}

            {hoveredCircle === "qualité" && (
              <div className="absolute right-[-130px] bottom-20 z-[100] w-[220px] max-w-[240px] rounded-xl border border-[#2ea3dd] bg-[#1f212d]/95 p-4 shadow-[0_4px_20px_rgba(46,163,221,0.2)] animate-fadeIn pointer-events-none">
                <div className="mb-1.5 flex items-center gap-2 text-xs font-bold text-[#2ea3dd]">
                  <span>✅</span> Exigence et précision
                </div>
                <div className="text-[11px] leading-5 text-[#8a8880]">
                  Un haut niveau de qualité assuré à chaque étape du projet
                </div>
              </div>
            )}
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
