import { useState, useEffect, useRef } from 'react';

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" stroke="#2ea3dd" strokeWidth="1.5"/>
    <path d="M5 8l2 2 4-4" stroke="#2ea3dd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function ServiceCard({ service, index }) {
  const [ref, visible] = useIntersection();

  return (
    <div
      ref={ref}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(46,163,221,0.15)",
        borderRadius: "12px",
        padding: "32px",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div style={{ marginBottom: "16px" }}>
        <img
          src={service.icon}
          alt={service.title}
          style={{
            width: "36px",
            height: "36px",
            objectFit: "contain",
            display: "block"
          }}
        />
      </div>

      <h3
        style={{
          color: "#e0ded2",
          fontSize: "1.15rem",
          fontWeight: 700,
          marginBottom: "10px",
          fontFamily: "'Space Grotesk', sans-serif"
        }}
      >
        {service.title}
      </h3>

      <p
        style={{
          color: "#8a8880",
          fontSize: "0.85rem",
          lineHeight: 1.6,
          marginBottom: "20px"
        }}
      >
        {service.desc}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
        {service.features.map((f) => (
          <div key={f} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <CheckIcon />
            <span style={{ color: "#8a8880", fontSize: "0.72rem", letterSpacing: "0.05em" }}>
              {f}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

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
  }, []);

  return [ref, visible];
}

export default ServiceCard;