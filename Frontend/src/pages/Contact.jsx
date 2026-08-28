import { useState } from "react";
import { media } from "../assets/media";
import Seo from "../components/Seo";
import { apiFetch, ApiError } from "../config/api";

const COLORS = {
  dark: "#1F212D",
  darkCard: "#181A24",
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
  socialMedia: {
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

/* ── ICONS ── */
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
    backgroundImage: `linear-gradient(to bottom, rgba(31,33,45,0.88) 0%, rgba(31,33,45,0.93) 100%), url(${media.images.hero})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Proxima Nova', sans-serif",
    color: COLORS.cream,
    overflowX: "hidden",
  },
  main: {
    flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
    padding: "156px 24px 100px", position: "relative",
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

/* ── CONTACT FORM ── */
const INITIAL_VALUES = { nom: "", telephone: "", email: "", profession: "", demande: "", message: "", socialMedia: "" };
const INITIAL_TOUCHED = { nom: false, telephone: false, email: false, profession: false, demande: false, message: false, socialMedia: false };

function ContactForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [touched, setTouched] = useState(INITIAL_TOUCHED);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const errors = Object.fromEntries(
    Object.keys(values).map((k) => [k, validate(k, values[k])])
  );
  const isFormValid = Object.values(errors).every((e) => !e) &&
    values.nom && values.telephone && values.email && values.profession && values.demande;

  const handleChange = (name, value) => setValues((v) => ({ ...v, [name]: value }));
  const handleBlur = (name) => setTouched((t) => ({ ...t, [name]: true }));

  const handleSubmit = async () => {
    const allTouched = Object.fromEntries(Object.keys(touched).map((k) => [k, true]));
    setTouched(allTouched);
    if (!isFormValid || submitting) return;

    setSubmitError("");
    setSubmitting(true);
    try {
      await apiFetch("/contact", { method: "POST", body: JSON.stringify(values) });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setValues(INITIAL_VALUES);
        setTouched(INITIAL_TOUCHED);
      }, 3000);
    } catch (err) {
      setSubmitError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
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

      <ValidatedInput name="socialMedia" placeholder="Social Media (optional)"
        value={values.socialMedia} touched={touched.socialMedia} error={errors.socialMedia}
        onChange={handleChange} onBlur={handleBlur} />

      <ValidatedTextarea name="message" placeholder="Your message..."
        value={values.message} touched={touched.message} error={errors.message}
        onChange={handleChange} onBlur={handleBlur} />

      {submitError && <div style={S.errorMsg}><IconAlert />{submitError}</div>}

      <button
        onClick={handleSubmit}
        onMouseEnter={() => setHoverBtn(true)}
        onMouseLeave={() => setHoverBtn(false)}
        disabled={submitting}
        style={{
          ...S.btnSubmit,
          color: submitted ? COLORS.success : (hoverBtn ? "#fff" : COLORS.blue),
          backgroundColor: submitted ? COLORS.successBg : (hoverBtn ? COLORS.blue : "transparent"),
          border: submitted ? `2px solid ${COLORS.success}` : `2px solid ${COLORS.blue}`,
          boxShadow: hoverBtn && !submitted ? "0 6px 24px rgba(46,163,221,0.35)" : "none",
          transform: hoverBtn && !submitted ? "translateY(-2px)" : "none",
          opacity: (!isFormValid && !submitted) || submitting ? 0.6 : 1,
          cursor: submitting ? "not-allowed" : "pointer",
        }}
      >
        {submitted ? "✓ SENT" : submitting ? "SENDING..." : "SEND"}
      </button>
    </div>
  );
}

/* ── PAGE ── */
export default function ContactPage() {
  return (
    <div style={S.page}>
      <Seo
        title="Contact"
        description="Get in touch with ENSI Junior Entreprise to discuss your web, mobile, desktop, or AI/chatbot project."
        path="/contact"
      />
      <main style={S.main}>
        <div style={S.glow} />
        <div style={S.heading}>
          <span
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
              color: COLORS.blue, marginBottom: 16,
            }}
          >
            Get in touch
          </span>
          <h1 style={S.h1}>Contact Us</h1>
          <p style={S.subtitle}>Let's work together</p>
        </div>
        <ContactForm />
      </main>
    </div>
  );
}