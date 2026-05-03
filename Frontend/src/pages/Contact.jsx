import { useState } from "react";

const COLORS = {
  dark: "#1F212D",
  darkCard: "#252736",
  darkNav: "#191B26",
  blue: "#2EA3DD",
  cream: "#E0DED2",
  inputBg: "rgba(255,255,255,0.06)",
  inputBorder: "rgba(224,222,210,0.15)",
  muted: "rgba(224,222,210,0.5)",
  error: "#F07070",
  errorBg: "rgba(240,112,112,0.08)",
  errorBorder: "rgba(240,112,112,0.5)",
  success: "#4CAF92",
  successBg: "rgba(76,175,146,0.08)",
  successBorder: "rgba(76,175,146,0.45)",
};

/* ── VALIDATION RULES ── */
const VALIDATORS = {
  nom: {
    required: true,
    minLength: 3,
    maxLength: 60,
    pattern: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/,
    messages: {
      required: "Full name is required.",
      minLength: "Name must be at least 3 characters.",
      maxLength: "Name cannot exceed 60 characters.",
      pattern: "Letters, spaces, or hyphens only.",
    },
  },
  telephone: {
    required: true,
    minLength: 8,
    maxLength: 8,
    pattern: /^[0-9]{8}$/,
    messages: {
      required: "Phone number is required.",
      minLength: "Number must be exactly 8 digits.",
      maxLength: "Number cannot exceed 8 digits.",
      pattern: "Digits only (exactly 8 digits).",
    },
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    messages: {
      required: "Email address is required.",
      pattern: "Please enter a valid email address.",
    },
  },
  profession: {
    required: true,
    messages: {
      required: "Profession is required.",
    },
  },
  demande: {
    required: true,
    messages: {
      required: "Request type is required.",
    },
  },
  message: {
    required: false,
    messages: {},
  },
};

function validate(name, value) {
  const rules = VALIDATORS[name];
  if (!rules) return null;
  if (rules.required && !value.trim()) return rules.messages.required;
  if (value.trim() === "") return null;
  if (rules.minLength && value.trim().length < rules.minLength) return rules.messages.minLength;
  if (rules.maxLength && value.trim().length > rules.maxLength) return rules.messages.maxLength;
  if (rules.pattern && !rules.pattern.test(value.trim())) return rules.messages.pattern;
  return null;
}

/* ── LOGO SVG ── */
const LogoSVG = ({ size = 38 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="60" rx="56" ry="56" stroke={COLORS.cream} strokeWidth="3.5" fill="none" opacity="0.9"/>
    <ellipse cx="60" cy="60" rx="24" ry="56" stroke={COLORS.cream} strokeWidth="2.5" fill="none" opacity="0.9"/>
    <line x1="6" y1="60" x2="114" y2="60" stroke={COLORS.cream} strokeWidth="2.5" opacity="0.9"/>
    <path d="M12 38 Q60 28 108 38" stroke={COLORS.cream} strokeWidth="2" fill="none" opacity="0.75"/>
    <path d="M12 82 Q60 92 108 82" stroke={COLORS.cream} strokeWidth="2" fill="none" opacity="0.75"/>
  </svg>
);

/* ── ICONS ── */
const IconMail = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/>
  </svg>
);
const IconPhone = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);
const IconPin = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconFB = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>);
const IconIG = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>);
const IconLI = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>);
const IconTW = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>);
const IconChevron = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>);

const IconCheck = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={COLORS.success} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconAlert = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={COLORS.error} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

/* ── STYLES ── */
const S = {
  page: {
    backgroundColor: COLORS.dark,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Montserrat', 'Nunito Sans', sans-serif",
    color: COLORS.cream,
    overflowX: "hidden",
  },
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    backgroundColor: COLORS.darkNav,
    borderBottom: `1px solid rgba(46,163,221,0.12)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 48px",
    height: "64px",
  },
  navBrand: { display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" },
  navBrandName: { fontWeight: 700, fontSize: "15px", color: COLORS.cream, letterSpacing: "0.02em", whiteSpace: "nowrap" },
  navLinks: { display: "flex", alignItems: "center", gap: "36px", listStyle: "none", margin: 0, padding: 0 },
  navLink: { fontSize: "14px", fontWeight: 600, color: COLORS.cream, textDecoration: "none", opacity: 0.75, cursor: "pointer" },
  navLinkActive: { fontSize: "14px", fontWeight: 600, color: COLORS.blue, textDecoration: "none", opacity: 1, cursor: "pointer" },
  btnDevis: {
    display: "flex", alignItems: "center", gap: "6px",
    fontFamily: "inherit", fontSize: "13px", fontWeight: 700, letterSpacing: "0.04em",
    color: "#fff", backgroundColor: COLORS.blue, border: "none",
    borderRadius: "6px", padding: "10px 20px", cursor: "pointer", whiteSpace: "nowrap",
  },
  main: {
    flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
    padding: "72px 24px 100px", position: "relative",
  },
  glow: {
    position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
    width: "700px", height: "400px",
    background: "radial-gradient(ellipse at center, rgba(46,163,221,0.08) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  heading: { textAlign: "center", marginBottom: "48px", position: "relative", zIndex: 1 },
  h1: { fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)", color: COLORS.cream, letterSpacing: "-0.01em", lineHeight: 1.1, margin: 0 },
  subtitle: { marginTop: "10px", fontSize: "16px", fontWeight: 600, color: COLORS.blue, letterSpacing: "0.04em" },
  card: {
    backgroundColor: COLORS.darkCard,
    border: `1px solid rgba(224,222,210,0.10)`,
    borderRadius: "20px",
    padding: "44px 48px",
    width: "100%",
    maxWidth: "560px",
    position: "relative",
    zIndex: 1,
    boxShadow: "0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(46,163,221,0.06) inset",
    animation: "fadeUp 0.7s ease both",
  },
  formGroup: { marginBottom: "6px" },
  fieldWrap: { marginBottom: "18px" },
  inputBase: {
    width: "100%",
    backgroundColor: COLORS.inputBg,
    borderRadius: "10px",
    color: COLORS.cream,
    fontFamily: "inherit",
    fontSize: "14px",
    fontWeight: 400,
    padding: "13px 18px",
    outline: "none",
    transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
  },
  errorMsg: {
    display: "flex", alignItems: "center", gap: "6px",
    fontSize: "12px", color: COLORS.error,
    marginTop: "6px", paddingLeft: "2px",
    animation: "fadeIn 0.2s ease",
  },
  counter: {
    fontSize: "11px", color: COLORS.muted,
    textAlign: "right", marginTop: "5px",
  },
  counterWarn: {
    fontSize: "11px", color: COLORS.error,
    textAlign: "right", marginTop: "5px",
  },
  chevronIcon: { position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: COLORS.muted },
  selectWrapper: { position: "relative" },
  btnSubmit: {
    display: "block", margin: "28px auto 0", fontFamily: "inherit",
    fontSize: "13px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
    borderRadius: "50px", padding: "12px 44px", cursor: "pointer",
    transition: "background 0.2s, color 0.2s, transform 0.15s, box-shadow 0.2s",
  },
  footer: { backgroundColor: COLORS.darkNav, borderTop: `1px solid rgba(224,222,210,0.07)`, padding: "52px 64px 36px" },
  footerInner: { maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr", gap: "48px" },
  footerBrand: { display: "flex", flexDirection: "column", gap: "14px" },
  footerLogoRow: { display: "flex", alignItems: "center", gap: "12px" },
  footerBrandName: { fontWeight: 700, fontSize: "15px", color: COLORS.cream },
  footerDesc: { fontSize: "13px", color: COLORS.muted, lineHeight: 1.7, maxWidth: "220px" },
  footerTagline: { fontFamily: "'Brush Script MT', cursive", fontSize: "20px", color: COLORS.blue, opacity: 0.8, marginTop: "4px" },
  footerColTitle: { fontWeight: 700, fontSize: "13px", letterSpacing: "0.06em", textTransform: "uppercase", color: COLORS.cream, marginBottom: "18px" },
  footerLink: { fontSize: "13px", color: COLORS.muted, textDecoration: "none", display: "block", marginBottom: "10px", cursor: "pointer" },
  footerContactItem: { display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px", color: COLORS.muted, marginBottom: "10px" },
  footerBottom: { maxWidth: "1100px", margin: "40px auto 0", paddingTop: "24px", borderTop: `1px solid rgba(224,222,210,0.07)`, display: "flex", alignItems: "center", justifyContent: "space-between" },
  socialLinks: { display: "flex", gap: "10px" },
  socialLink: { width: "34px", height: "34px", borderRadius: "8px", backgroundColor: "rgba(255,255,255,0.06)", border: `1px solid rgba(224,222,210,0.1)`, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: COLORS.muted, cursor: "pointer" },
};

/* ── DYNAMIC BORDER STYLE ── */
function getBorderStyle(error, touched, value) {
  if (!touched) return `1px solid ${COLORS.inputBorder}`;
  if (error) return `1px solid ${COLORS.errorBorder}`;
  if (value.trim()) return `1px solid ${COLORS.successBorder}`;
  return `1px solid ${COLORS.inputBorder}`;
}
function getBgStyle(error, touched, value, focused) {
  if (focused) return error ? COLORS.errorBg : "rgba(46,163,221,0.05)";
  if (touched && error) return COLORS.errorBg;
  if (touched && value.trim()) return COLORS.successBg;
  return COLORS.inputBg;
}
function getBoxShadow(error, focused) {
  if (!focused) return "none";
  return error ? "0 0 0 3px rgba(240,112,112,0.15)" : "0 0 0 3px rgba(46,163,221,0.12)";
}

/* ── VALIDATED INPUT ── */
function ValidatedInput({ name, placeholder, type = "text", value, touched, error, onChange, onBlur, maxLength }) {
  const [focused, setFocused] = useState(false);
  const isValid = touched && !error && value.trim();

  const inputStyle = {
    ...S.inputBase,
    border: getBorderStyle(error, touched, value),
    backgroundColor: getBgStyle(error, touched, value, focused),
    boxShadow: getBoxShadow(error && touched, focused),
    paddingRight: touched ? "42px" : "18px",
  };

  return (
    <div style={S.fieldWrap}>
      <div style={{ position: "relative" }}>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
          style={inputStyle}
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); onBlur(name); }}
          onChange={(e) => {
            let v = e.target.value;
            if (type === "tel") v = v.replace(/\D/g, "").slice(0, 8);
            onChange(name, v);
          }}
        />
        {touched && (
          <span style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)" }}>
            {error ? <IconAlert /> : isValid ? <IconCheck /> : null}
          </span>
        )}
      </div>
      {touched && error && (
        <div style={S.errorMsg}><IconAlert />{error}</div>
      )}
      {name === "telephone" && (
        <div style={value.length === 8 ? { ...S.counter, color: COLORS.success } : S.counter}>
          {value.length}/8 digits
        </div>
      )}
    </div>
  );
}

/* ── VALIDATED SELECT ── */
function ValidatedSelect({ name, placeholder, options, value, touched, error, onChange, onBlur }) {
  const [focused, setFocused] = useState(false);

  const selectStyle = {
    ...S.inputBase,
    border: getBorderStyle(error, touched, value),
    backgroundColor: getBgStyle(error, touched, value, focused),
    boxShadow: getBoxShadow(error && touched, focused),
    appearance: "none",
    WebkitAppearance: "none",
    cursor: "pointer",
  };

  return (
    <div style={S.fieldWrap}>
      <div style={S.selectWrapper}>
        <select
          value={value}
          style={selectStyle}
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); onBlur(name); }}
          onChange={(e) => onChange(name, e.target.value)}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <span style={S.chevronIcon}><IconChevron /></span>
      </div>
      {touched && error && (
        <div style={S.errorMsg}><IconAlert />{error}</div>
      )}
    </div>
  );
}

/* ── VALIDATED TEXTAREA ── */
function ValidatedTextarea({ name, placeholder, value, touched, error, onChange, onBlur }) {
  const [focused, setFocused] = useState(false);
  const isValid = touched && !error && value.trim();

  const taStyle = {
    ...S.inputBase,
    border: getBorderStyle(error, touched, value),
    backgroundColor: getBgStyle(error, touched, value, focused),
    boxShadow: getBoxShadow(error && touched, focused),
    resize: "vertical",
    minHeight: "110px",
    lineHeight: 1.55,
  };

  return (
    <div style={S.fieldWrap}>
      <div style={{ position: "relative" }}>
        <textarea
          placeholder={placeholder}
          value={value}
          style={taStyle}
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); onBlur(name); }}
          onChange={(e) => onChange(name, e.target.value)}
        />
        {touched && (
          <span style={{ position: "absolute", right: "14px", top: "14px" }}>
            {error ? <IconAlert /> : isValid ? <IconCheck /> : null}
          </span>
        )}
      </div>
      {touched && error && (
        <div style={S.errorMsg}><IconAlert />{error}</div>
      )}
    </div>
  );
}

/* ── SOCIAL BUTTON ── */
function SocialBtn({ icon }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button style={{ ...S.socialLink, backgroundColor: hovered ? COLORS.blue : "rgba(255,255,255,0.06)", color: hovered ? "#fff" : COLORS.muted }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {icon}
    </button>
  );
}

/* ── NAVBAR ── */
function Navbar() {
  const [h, setH] = useState(false);
  return (
    <nav style={S.nav}>
      <a href="#" style={S.navBrand}>
        <LogoSVG size={36} />
        <span style={S.navBrandName}>ENSI Junior Enterprise</span>
      </a>
      <ul style={S.navLinks}>
        {["Home", "About", "Services"].map((l) => (
          <li key={l}><a href="#" style={S.navLink}>{l}</a></li>
        ))}
        <li><a href="#" style={S.navLinkActive}>Contact</a></li>
      </ul>
      <button style={{ ...S.btnDevis, backgroundColor: h ? "#1d8abf" : COLORS.blue }}
        onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
        Request a Quote <IconChevron />
      </button>
    </nav>
  );
}

/* ── CONTACT FORM ── */
const INITIAL_VALUES = { nom: "", telephone: "", email: "", profession: "", demande: "", message: "" };
const INITIAL_TOUCHED = { nom: false, telephone: false, email: false, profession: false, demande: false, message: false };

function ContactForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [touched, setTouched] = useState(INITIAL_TOUCHED);
  const [submitted, setSubmitted] = useState(false);

  const errors = Object.fromEntries(
    Object.keys(values).map((k) => [k, validate(k, values[k])])
  );
  const isFormValid = Object.values(errors).every((e) => !e) &&
    values.nom && values.telephone && values.email && values.profession && values.demande;

  const handleChange = (name, value) => setValues((v) => ({ ...v, [name]: value }));
  const handleBlur = (name) => setTouched((t) => ({ ...t, [name]: true }));

  const handleSubmit = () => {
    const allTouched = Object.fromEntries(Object.keys(touched).map((k) => [k, true]));
    setTouched(allTouched);
    if (!isFormValid) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setValues(INITIAL_VALUES);
      setTouched(INITIAL_TOUCHED);
    }, 3000);
  };

  const [hoverBtn, setHoverBtn] = useState(false);

  return (
    <div style={S.card}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
        input::placeholder, textarea::placeholder { color: rgba(224,222,210,0.45); }
        select option { background: #252736; color: #E0DED2; }
        * { box-sizing: border-box; }
      `}</style>

      <ValidatedInput name="nom" placeholder="Full Name *" value={values.nom}
        touched={touched.nom} error={errors.nom} onChange={handleChange} onBlur={handleBlur} maxLength={60} />

      <ValidatedInput name="telephone" placeholder="Phone Number (8 digits) *" type="tel"
        value={values.telephone} touched={touched.telephone} error={errors.telephone}
        onChange={handleChange} onBlur={handleBlur} />

      <ValidatedInput name="email" placeholder="Email Address *" type="email"
        value={values.email} touched={touched.email} error={errors.email}
        onChange={handleChange} onBlur={handleBlur} />

      <ValidatedSelect name="profession" placeholder="Profession *"
        options={["Student", "Entrepreneur", "Manager", "Engineer", "Other"]}
        value={values.profession} touched={touched.profession} error={errors.profession}
        onChange={handleChange} onBlur={handleBlur} />

      <ValidatedSelect name="demande" placeholder="Request Type *"
        options={["Web Development", "Graphic Design", "Digital Marketing", "Hosting", "Strategic Consulting", "Other"]}
        value={values.demande} touched={touched.demande} error={errors.demande}
        onChange={handleChange} onBlur={handleBlur} />

      <ValidatedTextarea name="message" placeholder="Your message..."
        value={values.message} touched={touched.message} error={errors.message}
        onChange={handleChange} onBlur={handleBlur} />

      <button
        onClick={handleSubmit}
        onMouseEnter={() => setHoverBtn(true)}
        onMouseLeave={() => setHoverBtn(false)}
        style={{
          ...S.btnSubmit,
          color: submitted ? COLORS.success : (hoverBtn ? "#fff" : COLORS.blue),
          backgroundColor: submitted ? COLORS.successBg : (hoverBtn ? COLORS.blue : "transparent"),
          border: submitted ? `2px solid ${COLORS.success}` : `2px solid ${COLORS.blue}`,
          boxShadow: hoverBtn && !submitted ? "0 6px 24px rgba(46,163,221,0.35)" : "none",
          transform: hoverBtn && !submitted ? "translateY(-2px)" : "none",
          opacity: !isFormValid && !submitted ? 0.6 : 1,
        }}
      >
        {submitted ? "✓ SENT" : "SEND"}
      </button>
    </div>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer style={S.footer}>
      <div style={S.footerInner}>
        <div style={S.footerBrand}>
          <div style={S.footerLogoRow}>
            <LogoSVG size={44} />
            <span style={S.footerBrandName}>ENSI Junior Enterprise</span>
          </div>
          <p style={S.footerDesc}>The student association connecting businesses with tomorrow's talents.</p>
          <span style={S.footerTagline}>Always Striving For Greatness</span>
        </div>
        <div>
          <p style={S.footerColTitle}>Navigation</p>
          {["Home", "About", "Services", "Activities", "Contact"].map((l) => (
            <a key={l} href="#" style={S.footerLink}>{l}</a>
          ))}
        </div>
        <div>
          <p style={S.footerColTitle}>Contact</p>
          <div style={S.footerContactItem}><IconMail /><span>contact@ensi-je.com</span></div>
          <div style={S.footerContactItem}><IconPhone /><span>+216 XX XXX XXX</span></div>
          <div style={S.footerContactItem}><IconPin /><span>ENSI, Manouba, Tunisia</span></div>
        </div>
      </div>
      <div style={S.footerBottom}>
        <span style={{ fontSize: "12px", color: COLORS.muted }}>© 2025 ENSI Junior Enterprise</span>
        <div style={S.socialLinks}>
          <SocialBtn icon={<IconFB />} />
          <SocialBtn icon={<IconIG />} />
          <SocialBtn icon={<IconLI />} />
          <SocialBtn icon={<IconTW />} />
        </div>
      </div>
    </footer>
  );
}

/* ── PAGE ── */
export default function ContactPage() {
  return (
    <div style={S.page}>
      <Navbar />
      <main style={S.main}>
        <div style={S.glow} />
        <div style={S.heading}>
          <h1 style={S.h1}>Contact Us</h1>
          <p style={S.subtitle}>Let's work together</p>
        </div>
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}