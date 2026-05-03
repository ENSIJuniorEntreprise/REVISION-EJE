import { useState, useEffect, useRef } from "react";

import heroBg1 from '../assets/images/ydin.jpg';
import quiImg from '../assets/images/20th Generation.png';
import getEntrepImg from '../assets/images/GET E 3.0.jpg';
import riyedaImg from '../assets/images/riyeda.png';
import hassineImg from '../assets/images/hassine.jpg';
import fekiImg from '../assets/images/feki.jpg';
import zribiImg from '../assets/images/zribi.jpg';

const COLORS = {
  bg: "#1F212D",
  blue: "#2EA3DD",
  cream: "#E0DED2",
  white: "#FFFFFF",
  darkCard: "#181A24",
};

const carouselImages = [quiImg, getEntrepImg, riyedaImg];

const timelineEvents = [
  {
    year: "2006",
    title: "Foundation of EJE",
    desc: "Birth of the ENSI Junior Enterprise.",
    above: true,
  },
  {
    year: "2011",
    title: "Co-founding of JET",
    desc: "EJE among the founders of Junior Enterprise Tunisia.",
    above: false,
  },
  {
    year: "2011",
    title: "Adoption of association bylaws",
    desc: "formalizing the organization’s governance structure",
    above: true,
  },
  {
    year: "2020",
    title: "Excellence Award",
    desc: "Recognition for the excellence of delivered projects.",
    above: false,
  },
];

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Nunito+Sans:wght@400;600;700&family=Sora:wght@400;600;700;800;900&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }

  body, #root {
    background: ${COLORS.bg};
    color: ${COLORS.cream};
    font-family: 'Nunito Sans', sans-serif;
    overflow-x: hidden;
  }

  .cursor-glow {
    position: fixed;
    top: 0; left: 0;
    width: 500px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(46,163,221,0.18) 0%, rgba(46,163,221,0) 60%);
    pointer-events: none;
    z-index: 1;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s;
    will-change: transform;
  }

  .scroll-progress {
    position: fixed;
    top: 0; left: 0;
    height: 3px;
    background: linear-gradient(90deg, ${COLORS.blue}, #6dd5fa);
    z-index: 200;
    transition: width 0.1s ease-out;
    box-shadow: 0 0 12px rgba(46,163,221,0.6);
  }

  .reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
    will-change: opacity, transform;
  }
  .reveal.in { opacity: 1; transform: translateY(0); }
  .reveal-left { transform: translateX(-60px); }
  .reveal-right { transform: translateX(60px); }
  .reveal-left.in, .reveal-right.in { transform: translateX(0); }

  .navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 48px;
    height: 70px;
    background: rgba(31, 33, 45, 0.7);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(255,255,255,0.05);
    transition: background 0.3s, box-shadow 0.3s, height 0.3s;
  }
  .navbar.scrolled {
    background: rgba(31, 33, 45, 0.92);
    box-shadow: 0 8px 32px rgba(0,0,0,0.35);
    height: 60px;
  }
  .navbar-brand { display: flex; align-items: center; gap: 12px; }
  .navbar-name {
    font-family: 'Sora', sans-serif;
    font-weight: 700;
    font-size: 15px;
    color: ${COLORS.cream};
    letter-spacing: 0.02em;
  }
  .navbar-links { display: flex; align-items: center; gap: 36px; }
  .navbar-links a {
    font-size: 14px;
    color: ${COLORS.cream};
    text-decoration: none;
    opacity: 0.85;
    font-family: 'Nunito Sans', sans-serif;
    font-weight: 600;
    position: relative;
    padding: 6px 0;
  }
  .navbar-links a::after {
    content: '';
    position: absolute;
    left: 0; bottom: 0;
    width: 100%; height: 2px;
    background: ${COLORS.blue};
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .navbar-links a:hover { opacity: 1; color: ${COLORS.blue}; }
  .navbar-links a:hover::after { transform: scaleX(1); transform-origin: left; }

  .btn-devis {
    background: ${COLORS.blue};
    color: ${COLORS.white};
    border: none;
    border-radius: 22px;
    padding: 10px 22px;
    font-size: 13.5px;
    font-weight: 700;
    cursor: pointer;
    font-family: 'Nunito', sans-serif;
    display: flex; align-items: center; gap: 6px;
    position: relative;
    overflow: hidden;
    transition: transform 0.25s, box-shadow 0.25s;
    box-shadow: 0 4px 18px rgba(46,163,221,0.35);
  }
  .btn-devis::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(120deg, transparent, rgba(255,255,255,0.3), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s;
  }
  .btn-devis:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(46,163,221,0.5); }
  .btn-devis:hover::before { transform: translateX(100%); }

  .hero {
    position: relative;
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    text-align: center;
    overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: -10%;
    background-size: cover;
    background-position: center;
    filter: brightness(0.35) saturate(1.1);
    will-change: transform;
  }
  .hero-overlay {
    position: absolute; inset: 0;
    background:
      radial-gradient(circle at 30% 20%, rgba(46,163,221,0.18) 0%, transparent 50%),
      radial-gradient(circle at 70% 80%, rgba(46,163,221,0.12) 0%, transparent 50%),
      linear-gradient(to bottom, rgba(31,33,45,0.55) 0%, rgba(31,33,45,0.85) 100%);
  }
  .hero-content { position: relative; z-index: 2; padding: 0 24px; }

  .hero-label {
    font-size: 14px;
    color: ${COLORS.blue};
    margin-bottom: 16px;
    font-family: 'Sora', sans-serif;
    font-weight: 600;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    opacity: 0;
    animation: fadeUp 0.9s 0.2s forwards;
  }
  .hero-label::before, .hero-label::after { content: '—'; margin: 0 14px; opacity: 0.6; }

  .hero-title {
    font-family: 'Sora', sans-serif;
    font-weight: 900;
    font-size: clamp(48px, 7.5vw, 92px);
    line-height: 1.05;
    margin-bottom: 22px;
    letter-spacing: -0.02em;
  }
  .hero-title .word {
    display: inline-block;
    opacity: 0;
    transform: translateY(40px);
    animation: fadeUp 0.8s forwards;
  }
  .hero-title .word.gradient {
    background: linear-gradient(120deg, ${COLORS.blue} 0%, #7ed4f5 50%, ${COLORS.blue} 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: fadeUp 0.8s forwards, shimmer 4s linear 1s infinite;
  }
  .hero-title .word.white { color: ${COLORS.white}; }

  .hero-subtitle {
    font-size: 17px;
    color: ${COLORS.cream};
    opacity: 0;
    letter-spacing: 0.12em;
    margin-bottom: 40px;
    font-family: 'Nunito Sans', sans-serif;
    font-weight: 500;
    animation: fadeUp 0.9s 1.2s forwards;
  }
  .hero-subtitle span { color: ${COLORS.blue}; margin: 0 8px; }

  .btn-discover {
    background: ${COLORS.blue};
    color: ${COLORS.white};
    border: none;
    border-radius: 30px;
    padding: 14px 40px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    font-family: 'Sora', sans-serif;
    position: relative;
    overflow: hidden;
    opacity: 0;
    animation: fadeUp 0.9s 1.4s forwards;
    box-shadow: 0 8px 28px rgba(46,163,221,0.4);
    transition: transform 0.25s, box-shadow 0.25s;
    letter-spacing: 0.05em;
  }
  .btn-discover::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent);
    transform: translateX(-100%);
    transition: transform 0.7s;
  }
  .btn-discover:hover { transform: translateY(-3px); box-shadow: 0 14px 36px rgba(46,163,221,0.55); }
  .btn-discover:hover::before { transform: translateX(100%); }

  .hero-scroll-indicator {
    position: absolute;
    bottom: 32px; left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    opacity: 0;
    animation: fadeUp 1s 1.8s forwards;
  }
  .hero-scroll-indicator .mouse {
    width: 24px; height: 38px;
    border: 2px solid ${COLORS.cream};
    border-radius: 14px;
    position: relative;
    opacity: 0.6;
  }
  .hero-scroll-indicator .mouse::after {
    content: '';
    position: absolute;
    top: 8px; left: 50%;
    width: 3px; height: 7px;
    background: ${COLORS.cream};
    border-radius: 2px;
    transform: translateX(-50%);
    animation: scrollDot 1.6s ease-in-out infinite;
  }

  @keyframes fadeUp {
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    to { background-position: 200% center; }
  }
  @keyframes scrollDot {
    0% { transform: translate(-50%, 0); opacity: 1; }
    100% { transform: translate(-50%, 14px); opacity: 0; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
  }
  @keyframes pulse-ring {
    0% { transform: scale(1); opacity: 0.8; }
    100% { transform: scale(1.8); opacity: 0; }
  }

  section { padding: 100px 64px; position: relative; z-index: 2; }
  .section-title {
    text-align: center;
    font-family: 'Sora', sans-serif;
    font-weight: 900;
    font-size: clamp(30px, 4vw, 46px);
    color: ${COLORS.white};
    margin-bottom: 70px;
    letter-spacing: -0.01em;
  }
  .section-title span {
    color: ${COLORS.blue};
    position: relative;
    display: inline-block;
  }
  .section-title span::after {
    content: '';
    position: absolute;
    bottom: -6px; left: 0;
    width: 100%; height: 3px;
    background: ${COLORS.blue};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.8s 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .reveal.in .section-title span::after,
  .section-title.in span::after { transform: scaleX(1); }

  .qui-section { padding: 100px 64px; }
  .qui-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 72px;
    align-items: center;
    max-width: 1150px;
    margin: 0 auto;
  }
  .qui-label {
    font-family: 'Sora', sans-serif;
    font-weight: 800;
    font-size: clamp(28px, 3vw, 38px);
    color: ${COLORS.white};
    margin-bottom: 26px;
    letter-spacing: -0.01em;
  }
  .qui-label span { color: ${COLORS.blue}; position: relative; }
  .qui-text { font-size: 15.5px; line-height: 1.85; color: ${COLORS.cream}; opacity: 0.88; }
  .qui-text strong { color: ${COLORS.white}; font-weight: 800; }

  .qui-img-wrap { perspective: 1200px; }
  .carousel-container {
    border-radius: 20px;
    overflow: hidden;
    aspect-ratio: 4/3;
    background: #2a2d3d;
    box-shadow: 0 20px 60px rgba(0,0,0,0.4);
    position: relative;
    transition: box-shadow 0.5s;
  }
  .carousel-container:hover {
    box-shadow: 0 30px 80px rgba(46,163,221,0.3), 0 20px 60px rgba(0,0,0,0.5);
  }
  .carousel-slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: opacity;
  }
  .carousel-slide.active { opacity: 1; }
  .carousel-slide img {
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
  }
  .carousel-container::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, transparent 60%, rgba(46,163,221,0.2));
    z-index: 2;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.4s;
  }
  .carousel-container:hover::after { opacity: 1; }
  .carousel-dots {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 7px;
    z-index: 3;
  }
  .carousel-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: rgba(255,255,255,0.35);
    transition: background 0.3s, transform 0.3s;
  }
  .carousel-dot.active {
    background: ${COLORS.blue};
    transform: scale(1.3);
    box-shadow: 0 0 8px ${COLORS.blue};
  }

  .histoire-section { padding: 100px 64px; }
  .histoire-subtitle {
    text-align: center;
    font-size: 15px;
    color: ${COLORS.cream};
    opacity: 0.6;
    margin-top: -52px;
    margin-bottom: 80px;
    font-family: 'Nunito Sans', sans-serif;
    font-weight: 500;
    letter-spacing: 0.04em;
  }
  .timeline-wrapper {
    max-width: 1100px;
    margin: 0 auto;
    position: relative;
  }
  .timeline-track {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .timeline-line {
    position: absolute;
    top: 50%; left: 0;
    height: 2px;
    width: 0;
    background: linear-gradient(90deg, transparent 0%, ${COLORS.blue} 20%, ${COLORS.blue} 80%, transparent 100%);
    transform: translateY(-50%);
    z-index: 0;
    transition: width 1.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s;
  }
  .reveal.in .timeline-line { width: 100%; }
  .timeline-event {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    z-index: 1;
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .reveal.in .timeline-event:nth-child(2) { transition-delay: 0.1s; }
  .reveal.in .timeline-event:nth-child(3) { transition-delay: 0.25s; }
  .reveal.in .timeline-event:nth-child(4) { transition-delay: 0.4s; }
  .reveal.in .timeline-event:nth-child(5) { transition-delay: 0.55s; }
  .reveal.in .timeline-event:nth-child(6) { transition-delay: 0.7s; }
  .reveal.in .timeline-event { opacity: 1; transform: translateY(0); }
  .timeline-top {
    min-height: 130px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding: 0 10px 18px;
    text-align: center;
  }
  .timeline-bottom {
    min-height: 130px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 18px 10px 0;
    text-align: center;
  }
  .timeline-dot-wrap {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px; height: 22px;
    flex-shrink: 0;
  }
  .timeline-dot {
    width: 14px; height: 14px;
    border-radius: 50%;
    background: ${COLORS.blue};
    box-shadow: 0 0 0 3px rgba(46,163,221,0.25);
    transition: transform 0.3s, box-shadow 0.3s;
    z-index: 2;
    position: relative;
  }
  .timeline-event:hover .timeline-dot {
    transform: scale(1.4);
    box-shadow: 0 0 0 5px rgba(46,163,221,0.35), 0 0 16px ${COLORS.blue};
  }
  .reveal.in .timeline-dot::after {
    content: '';
    position: absolute; inset: -4px;
    border-radius: 50%;
    border: 2px solid ${COLORS.blue};
    opacity: 0;
    animation: pulse-ring 2.5s ease-out infinite;
  }
  .reveal.in .timeline-event:nth-child(2) .timeline-dot::after { animation-delay: 0s; }
  .reveal.in .timeline-event:nth-child(3) .timeline-dot::after { animation-delay: 0.3s; }
  .reveal.in .timeline-event:nth-child(4) .timeline-dot::after { animation-delay: 0.6s; }
  .reveal.in .timeline-event:nth-child(5) .timeline-dot::after { animation-delay: 0.9s; }
  .reveal.in .timeline-event:nth-child(6) .timeline-dot::after { animation-delay: 1.2s; }
  .timeline-tick {
    width: 2px;
    height: 32px;
    background: linear-gradient(to bottom, ${COLORS.blue}, transparent);
    flex-shrink: 0;
  }
  .timeline-tick.down { background: linear-gradient(to top, ${COLORS.blue}, transparent); }
  .timeline-year {
    font-family: 'Sora', sans-serif;
    font-weight: 900;
    font-size: clamp(22px, 2.5vw, 30px);
    color: ${COLORS.blue};
    line-height: 1;
    margin-bottom: 8px;
  }
  .timeline-title {
    font-family: 'Sora', sans-serif;
    font-weight: 700;
    font-size: clamp(12px, 1.2vw, 14px);
    color: ${COLORS.white};
    margin-bottom: 6px;
    line-height: 1.3;
  }
  .timeline-desc {
    font-size: clamp(10px, 1vw, 12px);
    color: ${COLORS.cream};
    opacity: 0.6;
    line-height: 1.55;
    font-family: 'Nunito Sans', sans-serif;
  }

  .valeurs-section { padding: 80px 64px 100px; }
  .valeurs-timeline {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 980px;
    margin: 0 auto;
  }
  .valeurs-line {
    position: absolute;
    top: 50%; left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, ${COLORS.blue}, transparent);
    transform: translateY(-50%);
    z-index: 0;
    transition: width 1.6s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .valeurs-section.in .valeurs-line { width: 100%; }
  .valeur-dot-left, .valeur-dot-right {
    width: 12px; height: 12px;
    border-radius: 50%;
    background: ${COLORS.blue};
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    box-shadow: 0 0 0 0 rgba(46,163,221,0.5);
  }
  .valeurs-section.in .valeur-dot-left,
  .valeurs-section.in .valeur-dot-right {
    animation: pulse-ring 2s ease-out 1s infinite;
  }
  .valeur-dot-left { left: 0; }
  .valeur-dot-right { right: 0; }
  .valeur-circle {
    position: relative;
    z-index: 2;
    width: 230px; height: 230px;
    border-radius: 50%;
    background: ${COLORS.cream};
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center;
    padding: 30px;
    margin: 0 30px;
    flex-shrink: 0;
    cursor: pointer;
    opacity: 0;
    transform: scale(0.6);
    transition: opacity 0.7s, transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.4s, box-shadow 0.4s;
    box-shadow: 0 10px 40px rgba(0,0,0,0.25);
  }
  .valeurs-section.in .valeur-circle { opacity: 1; transform: scale(1); }
  .valeurs-section.in .valeur-circle:nth-child(3) { transition-delay: 0.3s; }
  .valeurs-section.in .valeur-circle:nth-child(4) { transition-delay: 0.5s; }
  .valeurs-section.in .valeur-circle:nth-child(5) { transition-delay: 0.7s; }
  .valeur-circle:hover {
    background: ${COLORS.blue};
    box-shadow: 0 20px 60px rgba(46,163,221,0.5);
    transform: scale(1.08) !important;
  }
  .valeur-title {
    font-family: 'Sora', sans-serif;
    font-weight: 800;
    font-size: 18px;
    color: ${COLORS.blue};
    margin-bottom: 12px;
    transition: color 0.3s;
  }
  .valeur-circle:hover .valeur-title { color: ${COLORS.white}; }
  .valeur-desc {
    font-size: 13px;
    color: #1F212D;
    line-height: 1.65;
    font-weight: 600;
    transition: color 0.3s;
  }
  .valeur-circle:hover .valeur-desc { color: ${COLORS.white}; }

  .chiffres-section { padding: 80px 64px; text-align: center; }
  .chiffres-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 50px 70px;
    max-width: 980px;
    margin: 0 auto;
  }
  .chiffre-item {
    text-align: center;
    position: relative;
    padding: 10px 20px;
    transition: transform 0.3s;
  }
  .chiffre-item:hover { transform: translateY(-6px); }
  .chiffre-number {
    font-family: 'Sora', sans-serif;
    font-weight: 900;
    font-size: 48px;
    color: ${COLORS.white};
    display: block;
    background: linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.blue} 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1;
  }
  .chiffre-label {
    font-family: 'Sora', sans-serif;
    font-size: 12px;
    color: ${COLORS.cream};
    opacity: 0.7;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    margin-top: 10px;
    font-weight: 600;
    display: block;
  }

  .axes-section { padding: 80px 64px 100px; }
  .axes-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
    max-width: 1000px;
    margin: 0 auto;
  }
  .axe-card {
    border: 1.5px solid rgba(255,255,255,0.12);
    border-radius: 18px;
    padding: 44px 30px;
    text-align: center;
    background: linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
    transition: border-color 0.4s, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s, background 0.4s;
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }
  .axe-card::before {
    content: '';
    position: absolute;
    top: -50%; left: -50%;
    width: 200%; height: 200%;
    background: radial-gradient(circle, rgba(46,163,221,0.15) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.5s;
    pointer-events: none;
  }
  .axe-card:hover {
    border-color: ${COLORS.blue};
    transform: translateY(-8px);
    box-shadow: 0 20px 50px rgba(46,163,221,0.2);
    background: linear-gradient(145deg, rgba(46,163,221,0.06), rgba(255,255,255,0.02));
  }
  .axe-card:hover::before { opacity: 1; }
  .axe-icon {
    font-size: 38px;
    margin-bottom: 22px;
    display: inline-block;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .axe-card:hover .axe-icon { transform: scale(1.2) rotate(-8deg); }
  .axe-title {
    font-family: 'Sora', sans-serif;
    font-weight: 800;
    font-size: 19px;
    color: ${COLORS.blue};
    margin-bottom: 16px;
    position: relative;
  }
  .axe-desc { font-size: 14px; color: ${COLORS.cream}; opacity: 0.82; line-height: 1.75; position: relative; }

  .prestations-section { padding: 80px 64px 100px; }
  .prestations-inner {
    display: flex;
    max-width: 900px;
    margin: 0 auto;
    position: relative;
  }
  .presta-col-left, .presta-col-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 44px;
    justify-content: center;
  }
  .presta-col-right { padding-top: 80px; }
  .presta-center-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    width: 40px;
    position: relative;
  }
  .presta-center-line {
    width: 2px;
    flex: 1;
    background: linear-gradient(to bottom, transparent, rgba(46,163,221,0.4), transparent);
    position: relative;
  }
  .presta-center-line::after {
    content: '';
    position: absolute;
    top: 0; left: 50%;
    width: 6px; height: 30px;
    background: ${COLORS.blue};
    transform: translateX(-50%);
    border-radius: 3px;
    box-shadow: 0 0 16px ${COLORS.blue};
    animation: travel 3s ease-in-out infinite;
  }
  @keyframes travel {
    0%, 100% { top: 0; opacity: 0; }
    20%, 80% { opacity: 1; }
    50% { top: calc(100% - 30px); }
  }
  .presta-row-left, .presta-row-right { display: flex; align-items: center; }
  .presta-item {
    display: flex;
    align-items: center;
    gap: 14px;
    border: 1.5px solid rgba(255,255,255,0.15);
    border-radius: 12px;
    padding: 16px 20px;
    font-size: 13.5px;
    color: ${COLORS.cream};
    font-weight: 600;
    background: rgba(255,255,255,0.02);
    flex: 1;
    opacity: 0;
    transform: translateX(-80px);
    transition: border-color 0.35s, box-shadow 0.35s, opacity 0.7s, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), background 0.35s;
    cursor: pointer;
  }
  .presta-item.from-right { transform: translateX(80px); }
  .presta-item.visible { opacity: 1; transform: translateX(0); }
  .presta-item:hover {
    border-color: ${COLORS.blue};
    box-shadow: 0 0 30px rgba(46,163,221,0.25);
    background: rgba(46,163,221,0.08);
  }
  .presta-icon {
    font-size: 20px;
    flex-shrink: 0;
    transition: transform 0.3s;
  }
  .presta-item:hover .presta-icon { transform: scale(1.2); }
  .presta-connector { display: flex; align-items: center; flex-shrink: 0; }
  .presta-connector-line { width: 24px; height: 2px; background: rgba(46,163,221,0.4); }
  .presta-dot {
    width: 12px; height: 12px;
    border-radius: 50%;
    background: ${COLORS.blue};
    flex-shrink: 0;
    box-shadow: 0 0 12px ${COLORS.blue};
  }

  /* ===== Bureau ===== */
  .bureau-section { padding: 80px 64px 100px; }
  .bureau-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
    max-width: 940px;
    margin: 0 auto;
  }
  .team-card {
    border-radius: 18px;
    overflow: hidden;
    aspect-ratio: 3/4;
    position: relative;
    background: #2a2d3d;
    transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s;
    cursor: pointer;
    box-shadow: 0 14px 40px rgba(0,0,0,0.35);
  }
  .team-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 30px 60px rgba(46,163,221,0.25), 0 14px 40px rgba(0,0,0,0.45);
  }
  .team-card .avatar-wrap {
    width: 100%; height: 100%;
    transition: transform 0.6s;
  }
  .team-card:hover .avatar-wrap { transform: scale(1.05); }
  .team-info {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 16px 18px 18px;
    background: linear-gradient(to top, rgba(31,33,45,0.98) 60%, transparent);
    backdrop-filter: blur(6px);
    transform: translateY(0);
    transition: transform 0.4s;
  }
  .team-name { font-family: 'Sora', sans-serif; font-weight: 800; font-size: 15px; color: ${COLORS.white}; }
  .team-role { font-size: 12px; color: ${COLORS.blue}; font-weight: 700; margin-top: 4px; letter-spacing: 0.05em; }

  /* Empty placeholder card */
  .team-card-empty {
    border-radius: 18px;
    overflow: hidden;
    aspect-ratio: 3/4;
    position: relative;
    background: rgba(42, 45, 61, 0.5);
    border: 2px dashed rgba(46,163,221,0.25);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    transition: border-color 0.4s, box-shadow 0.4s, transform 0.4s;
    box-shadow: 0 14px 40px rgba(0,0,0,0.2);
  }
  .team-card-empty:hover {
    border-color: rgba(46,163,221,0.6);
    box-shadow: 0 20px 50px rgba(46,163,221,0.15);
    transform: translateY(-6px);
  }
  .team-card-empty-icon {
    width: 64px; height: 64px;
    border-radius: 50%;
    background: rgba(46,163,221,0.08);
    border: 2px dashed rgba(46,163,221,0.3);
    display: flex; align-items: center; justify-content: center;
  }
  .team-card-empty-label {
    font-family: 'Sora', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: ${COLORS.cream};
    opacity: 0.4;
    letter-spacing: 0.05em;
  }

  footer {
    background: #181a24;
    padding: 50px 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid rgba(255,255,255,0.07);
    position: relative;
    z-index: 2;
  }
  .footer-brand { display: flex; align-items: center; gap: 12px; }
  .footer-links { display: flex; gap: 30px; }
  .footer-links a {
    font-size: 13px;
    color: ${COLORS.cream};
    opacity: 0.6;
    text-decoration: none;
    font-weight: 600;
    transition: opacity 0.2s, color 0.2s, transform 0.2s;
  }
  .footer-links a:hover { opacity: 1; color: ${COLORS.blue}; transform: translateY(-2px); }
  .footer-copy { font-size: 12px; color: ${COLORS.cream}; opacity: 0.4; }

  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
    max-width: 1000px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  @media (max-width: 900px) {
    section, .qui-section, .valeurs-section, .chiffres-section,
    .axes-section, .prestations-section, .bureau-section,
    .histoire-section { padding: 70px 24px; }
    .qui-inner { grid-template-columns: 1fr; gap: 40px; }
    .axes-grid { grid-template-columns: 1fr; }
    .bureau-grid { grid-template-columns: 1fr; }
    .valeurs-timeline { flex-direction: column; gap: 24px; }
    .valeurs-line, .valeur-dot-left, .valeur-dot-right { display: none; }
    .valeur-circle { width: 220px; height: 220px; margin: 0; }
    .navbar { padding: 0 20px; }
    .navbar-links { display: none; }
    .navbar-name { font-size: 13px; }
    .btn-devis { padding: 8px 16px; font-size: 12px; }
    .prestations-inner { flex-direction: column; }
    .presta-col-right { padding-top: 0; }
    .presta-center-wrapper { display: none; }
    .presta-connector { display: none; }
    .cursor-glow { display: none; }
    footer { flex-direction: column; gap: 24px; text-align: center; }
    .timeline-wrapper { overflow-x: auto; padding-bottom: 16px; }
    .timeline-track { min-width: 700px; }
    .timeline-top, .timeline-bottom { min-height: 100px; }
    .histoire-subtitle { margin-top: -42px; }
  }
`;

const LogoSVG = ({ size = 36, color = "white" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="55" cy="50" rx="28" ry="38" stroke={color} strokeWidth="4" fill="none" />
    <line x1="28" y1="35" x2="82" y2="35" stroke={color} strokeWidth="3.5" />
    <line x1="28" y1="50" x2="82" y2="50" stroke={color} strokeWidth="3.5" />
    <line x1="28" y1="65" x2="82" y2="65" stroke={color} strokeWidth="3.5" />
    <line x1="55" y1="12" x2="55" y2="88" stroke={color} strokeWidth="3.5" />
    <path d="M 18 28 Q 8 50 18 72" stroke={color} strokeWidth="3.5" fill="none" strokeLinecap="round" />
    <path d="M 15 35 Q 4 50 15 65" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M 11 42 Q 2 50 11 58" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

const Avatar = ({ src, name }) => (
  <div className="avatar-wrap" style={{ width: "100%", height: "100%" }}>
    <img
      src={src}
      alt={name}
      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
    />
  </div>
);

const ImageCarousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timerRef.current);
  }, [paused, images.length]);

  return (
    <div
      className="carousel-container"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((src, i) => (
        <div key={i} className={`carousel-slide${i === activeIndex ? " active" : ""}`}>
          <img src={src} alt={`Slide ${i + 1}`} />
        </div>
      ))}
      <div className="carousel-dots">
        {images.map((_, i) => (
          <div key={i} className={`carousel-dot${i === activeIndex ? " active" : ""}`} />
        ))}
      </div>
    </div>
  );
};

const chiffres = [
  { number: "+75", label: "Clients Served" },
  { number: "+78", label: "Projects Completed" },
  { number: "+48", label: "Students & Members" },
  { number: "+35", label: "Former Collaborators" },
  { number: "7",   label: "Junior Enterprises" },
  { number: "9",   label: "Institutional Partners" },
];

const valeurs = [
  { title: "Creativity",       desc: "We push the boundaries of innovation to deliver original, tailor-made solutions." },
  { title: "Professionalism",  desc: "Rigor, commitment, and respect for deadlines in every project we carry out." },
  { title: "Excellence",       desc: "We aim for excellence in every detail, from design through to delivery." },
];

const axes = [
  {
    icon: (
      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3.33 1.67 8.67 1.67 12 0v-5"/>
      </svg>
    ),
    title: "Training Division",
    desc: "Intensive workshops and technical training to elevate our members' skills.",
  },
  {
    icon: (
      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2"/>
        <line x1="22" y1="2" x2="16" y2="8"/>
        <polyline points="17 2 22 2 22 7"/>
      </svg>
    ),
    title: "Project Division",
    desc: "Concrete, challenging projects for real clients — immersive, hands-on learning.",
  },
  {
    icon: (
      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><rect x="8" y="14" width="3" height="3"/>
      </svg>
    ),
    title: "Events Division",
    desc: "High-impact event organization that bridges the gap between academia and industry.",
  },
];

const team = [
  { name: "Ahmed ZRIBI",   role: "President",          img: zribiImg },
  { name: "Mohamed FEKI",  role: "Vice President",      img: fekiImg   },
  { name: "Hassine KOOLI", role: "Treasurer",           img: hassineImg  },
];

const useMagnetic = () => ({
  onMouseMove: (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 16;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * 16;
    e.currentTarget.style.transform = `translate(${x}px, ${y}px)`;
  },
  onMouseLeave: (e) => { e.currentTarget.style.transform = ""; },
});

const tiltHandlers = {
  onMouseMove: (e) => {
    const card = e.currentTarget.querySelector(".carousel-container");
    if (!card) return;
    const r  = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top)  / r.height;
    card.style.transform = `rotateX(${(py - 0.5) * -8}deg) rotateY(${(px - 0.5) * 10}deg)`;
  },
  onMouseLeave: (e) => {
    const card = e.currentTarget.querySelector(".carousel-container");
    if (card) card.style.transform = "";
  },
};

const useReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("in"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
};

/* ── Empty placeholder card ── */
const EmptyTeamCard = () => (
  <div className="team-card-empty">
    <div className="team-card-empty-icon">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={COLORS.blue} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5">
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    </div>
    <span className="team-card-empty-label">Coming Soon</span>
  </div>
);

export default function Index() {
  const [scrolled,  setScrolled]  = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  const heroBgRef      = useRef(null);
  const cursorRef      = useRef(null);
  const chiffresRef    = useRef(null);
  const prestationsRef = useRef(null);

  const magnetic          = useMagnetic();
  const quiRef            = useReveal();
  const histoireRef       = useReveal();
  const valeursRef        = useReveal();
  const axesRef           = useReveal();
  const bureauRef         = useReveal();
  const chiffresRevealRef = useReveal();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(h > 0 ? (y / h) * 100 : 0);
      if (heroBgRef.current) {
        heroBgRef.current.style.transform =
          `translateY(${y * 0.35}px) scale(${1 + y * 0.0003})`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const section = chiffresRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        section.querySelectorAll(".chiffre-number").forEach((el, i) => {
          const target = parseInt(el.dataset.target || "0", 10);
          const prefix = el.dataset.prefix || "";
          const duration = 1500;
          let start = null;
          setTimeout(() => {
            const step = (ts) => {
              if (!start) start = ts;
              const p    = Math.min((ts - start) / duration, 1);
              const ease = 1 - Math.pow(1 - p, 3);
              el.textContent = prefix + Math.round(ease * target);
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }, i * 130);
        });
        observer.disconnect();
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = prestationsRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        section.querySelectorAll(".presta-row-left  .presta-item")
               .forEach((el, i) => setTimeout(() => el.classList.add("visible"), i * 200));
        section.querySelectorAll(".presta-row-right .presta-item")
               .forEach((el, i) => setTimeout(() => el.classList.add("visible"), i * 200 + 100));
        observer.disconnect();
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const setChiffresRef = (el) => {
    chiffresRef.current       = el;
    chiffresRevealRef.current = el;
  };

  return (
    <>
      <style>{globalStyles}</style>

      <div className="cursor-glow" ref={cursorRef} aria-hidden />
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} aria-hidden />

      {/* ── NAVBAR ── */}
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="navbar-brand">
          <LogoSVG size={34} color={COLORS.cream} />
          <span className="navbar-name">ENSI Junior Enterprise</span>
        </div>
        <div className="navbar-links">
          <a href="#accueil">Home</a>
          <a href="#apropos">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </div>
        <button className="btn-devis" {...magnetic}>Request a Quote ›</button>
      </nav>

      {/* ── HERO ── */}
      <section id="accueil" className="hero">
        <div
          className="hero-bg"
          ref={heroBgRef}
          style={{ backgroundImage: `url('${heroBg1}')` }}
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-label">About</p>
          <h1 className="hero-title">
            <span className="word gradient" style={{ animationDelay: "0.4s" }}>ENSI</span>{" "}
            <span className="word white"    style={{ animationDelay: "0.6s" }}>Junior</span>
            <br />
            <span className="word white"    style={{ animationDelay: "0.8s" }}>Enterprise</span>
          </h1>
          <p className="hero-subtitle">
            Creativity<span>—</span>Professionalism<span>—</span>Excellence
          </p>
          <button className="btn-discover" {...magnetic}>Discover</button>
        </div>
        <div className="hero-scroll-indicator">
          <div className="mouse" />
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section id="apropos" className="qui-section reveal" ref={quiRef}>
        <div className="qui-inner">
          <div>
            <h2 className="qui-label"><span>Who</span> are we?</h2>
            <p className="qui-text">
              Founded in <strong>2006</strong>, ENSI Junior Enterprise (EJE) is a non-profit association
              dedicated to introducing students to the world of entrepreneurship.
              <br /><br />
              For <strong>20 years</strong>, our association has tirelessly carved out its own path toward
              excellence, innovation and expertise, establishing itself as a pioneer within the Junior
              Enterprise movement in Tunisia.
            </p>
          </div>
          <div className="qui-img-wrap" style={{ perspective: "1200px" }} {...tiltHandlers}>
            <ImageCarousel images={carouselImages} />
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── OUR HISTORY ── */}
      <section className="histoire-section reveal" ref={histoireRef}>
        <h2 className="section-title"><span>Our</span> History</h2>
        <p className="histoire-subtitle">The key milestones that shaped EJE</p>
        <div className="timeline-wrapper">
          <div className="timeline-track">
            <div className="timeline-line" />
            {timelineEvents.map((event, i) => (
              <div key={i} className="timeline-event">
                {event.above ? (
                  <>
                    <div className="timeline-top">
                      <div className="timeline-year">{event.year}</div>
                      <div className="timeline-title">{event.title}</div>
                      <div className="timeline-desc">{event.desc}</div>
                    </div>
                    <div className="timeline-tick" />
                    <div className="timeline-dot-wrap">
                      <div className="timeline-dot" />
                    </div>
                    <div className="timeline-bottom" />
                  </>
                ) : (
                  <>
                    <div className="timeline-top" />
                    <div className="timeline-dot-wrap">
                      <div className="timeline-dot" />
                    </div>
                    <div className="timeline-tick down" />
                    <div className="timeline-bottom">
                      <div className="timeline-year">{event.year}</div>
                      <div className="timeline-title">{event.title}</div>
                      <div className="timeline-desc">{event.desc}</div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── OUR VALUES ── */}
      <section className="valeurs-section reveal" ref={valeursRef}>
        <h2 className="section-title"><span>Our</span> Values</h2>
        <div className="valeurs-timeline">
          <div className="valeurs-line" />
          <div className="valeur-dot-left" />
          {valeurs.map((v, i) => (
            <div key={i} className="valeur-circle">
              <div className="valeur-title">{v.title}</div>
              <div className="valeur-desc">{v.desc}</div>
            </div>
          ))}
          <div className="valeur-dot-right" />
        </div>
      </section>

      <div className="divider" />

      {/* ── KEY FIGURES ── */}
      <section className="chiffres-section reveal" ref={setChiffresRef}>
        <h2 className="section-title">Key <span>Figures</span></h2>
        <div className="chiffres-grid">
          {chiffres.map((c, i) => (
            <div key={i} className="chiffre-item">
              <span
                className="chiffre-number"
                data-target={parseInt(c.number.replace("+", ""), 10)}
                data-prefix={c.number.startsWith("+") ? "+" : ""}
              >
                {c.number.startsWith("+") ? "+0" : "0"}
              </span>
              <span className="chiffre-label">{c.label}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── OUR DIVISIONS ── */}
      <section id="services" className="axes-section reveal" ref={axesRef}>
        <h2 className="section-title"><span>Our</span> Divisions</h2>
        <div className="axes-grid">
          {axes.map((a, i) => (
            <div key={i} className="axe-card">
              <span className="axe-icon">{a.icon}</span>
              <div className="axe-title">{a.title}</div>
              <div className="axe-desc">{a.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── OUR SERVICES ── */}
      <section className="prestations-section" ref={prestationsRef}>
        <h2 className="section-title"><span>Our</span> Services</h2>
        <div className="prestations-inner">
          <div className="presta-col-left">
            <div className="presta-row-left">
              <div className="presta-item">
                <span className="presta-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                  </svg>
                </span>
                Web Design & Development
              </div>
              <div className="presta-connector">
                <div className="presta-connector-line" />
                <div className="presta-dot" />
              </div>
            </div>
            <div className="presta-row-left">
              <div className="presta-item">
                <span className="presta-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
                  </svg>
                </span>
                Mobile Application Development
              </div>
              <div className="presta-connector">
                <div className="presta-connector-line" />
                <div className="presta-dot" />
              </div>
            </div>
          </div>

          <div className="presta-center-wrapper">
            <div className="presta-center-line" />
          </div>

          <div className="presta-col-right">
            <div className="presta-row-right">
              <div className="presta-connector">
                <div className="presta-dot" />
                <div className="presta-connector-line" />
              </div>
              <div className="presta-item from-right">
                <span className="presta-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/>
                  </svg>
                </span>
                Software Solution Development
              </div>
            </div>
            <div className="presta-row-right">
              <div className="presta-connector">
                <div className="presta-dot" />
                <div className="presta-connector-line" />
              </div>
              <div className="presta-item from-right">
                <span className="presta-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a8 8 0 0 1 8 8v1a8 8 0 0 1-8 8H7l-4 4V10a8 8 0 0 1 9-8z"/>
                    <line x1="8" y1="10" x2="8.01" y2="10"/><line x1="12" y1="10" x2="12.01" y2="10"/><line x1="16" y1="10" x2="16.01" y2="10"/>
                  </svg>
                </span>
                ChatBot Agent Design & Deployment
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── EXECUTIVE BOARD ── */}
      <section className="bureau-section reveal" ref={bureauRef}>
        <h2 className="section-title"><span>Executive</span> Board</h2>
        <div className="bureau-grid">
          {/* Row 1 — existing members */}
          {team.map((member, i) => (
            <div key={i} className="team-card">
              <Avatar src={member.img} name={member.name} />
              <div className="team-info">
                <div className="team-name">{member.name}</div>
                <div className="team-role">{member.role}</div>
              </div>
            </div>
          ))}
          {/* Row 2 — empty cards */}
          <EmptyTeamCard />
          <EmptyTeamCard />
          <EmptyTeamCard />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="contact">
        <div className="footer-brand">
          <LogoSVG size={28} color={COLORS.cream} />
          <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 14, color: COLORS.cream, opacity: 0.85 }}>
            ENSI Junior Enterprise
          </span>
        </div>
        <div className="footer-links">
          <a href="#accueil">Home</a>
          <a href="#apropos">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </div>
        <span className="footer-copy">© 2025 ENSI Junior Enterprise</span>
      </footer>
    </>
  );
}