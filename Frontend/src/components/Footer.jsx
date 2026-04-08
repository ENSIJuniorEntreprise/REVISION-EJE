export default function Footer() {
  return (
    <footer style={{
      background: "#181a26",
      borderTop: "1px solid rgba(46,163,221,0.08)",
      padding: "50px 60px 30px",
    }}>
      <style>{`
        .footer-link { color: #8a8880; font-size: 0.82rem; text-decoration: none; display: block; margin-bottom: 6px; transition: color 0.2s; }
        .footer-link:hover { color: #2ea3dd; }
      `}</style>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "40px", marginBottom: "40px" }}>
        <div style={{ maxWidth: "240px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", border: "2px solid #2ea3dd", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 12, height: 12, background: "#2ea3dd", borderRadius: "50%" }} />
            </div>
            <div>
              <div style={{ color: "#e0ded2", fontWeight: 700, fontSize: "0.78rem" }}>ENSI Junior Entreprise</div>
            </div>
          </div>
          <p style={{ color: "#8a8880", fontSize: "0.8rem", lineHeight: 1.6 }}>
            L'association junior-entreprise de l'ENSI Manouba au service de l'innovation.
          </p>
        </div>
        <div>
          <div style={{ color: "#e0ded2", fontWeight: 700, fontSize: "0.85rem", marginBottom: "16px" }}>Navigation</div>
          {['Accueil', 'À propos', 'Services', 'Actualités', 'Contact'].map((link) => (
            <a key={link} href="#" className="footer-link">{link}</a>
          ))}
        </div>
        <div>
          <div style={{ color: "#e0ded2", fontWeight: 700, fontSize: "0.85rem", marginBottom: "16px" }}>Contact</div>
          <div style={{ color: "#8a8880", fontSize: "0.82rem", lineHeight: 2 }}>
            <div>📧 contact@enje.tn</div>
            <div>📞 +216 XX XXX XXX</div>
            <div>📍 ENSI, Manouba, Tunisie</div>
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "20px", textAlign: "center" }}>
        <p style={{ color: "#4a4a50", fontSize: "0.78rem" }}>
          © 2025 ENSI Junior Entreprise. Tous droits réservés.
        </p>
      </div>
    </footer>
  )
}