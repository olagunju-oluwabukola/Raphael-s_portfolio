import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const GITHUB_RAW = "https://raw.githubusercontent.com/olagunju-oluwabukola/portfolio-webpage/main/";

const NAV_LINKS = ["Home", "About", "Services", "Projects", "Contact"];

const PROJECTS = [
  {
    id: "mep-admin",
    title: "Award-Winning MEP Design",
    subtitle: "Four-Floor Administrative Building",
    location: "Nigeria",
    tags: ["Electrical", "Plumbing", "HVAC", "MEP Design"],
    icon: "🏆",
    description:
      "An award-winning MEP design for a four-floor administrative building, demonstrating innovative approaches to mechanical, electrical, and plumbing systems integration. This project earned recognition in a prestigious MEP design competition for its innovative approach and holistic engineering solutions.",
    scope: [
      "Comprehensive electrical power distribution design",
      "HVAC system design for all four floors",
      "Plumbing and drainage layout",
      "Fire protection and alarm systems",
      "ELV and communication infrastructure",
    ],
    images: [
      "POWER acen.png",
      "LIGHTING acen.png",
      "ELV acen.png",
      "MLVP acen.png",
      "EARTHING acen.png",
      "DB SCHEDULE acen.png",
      "SCHEMATICS acen.png",
      "ROOF acen.png",
    ],
  },
  {
    id: "osogbo-commercial",
    title: "Commercial Development",
    subtitle: "Osogbo Shopping Complex",
    location: "Osogbo",
    tags: ["MEP Design", "Commercial", "AutoCAD"],
    icon: "🏬",
    description:
      "MEP engineering for a large-scale commercial shopping complex in Osogbo. The project required careful coordination of all mechanical, electrical, and plumbing systems to serve high foot traffic and complex tenant requirements.",
    scope: [
      "High-capacity power distribution",
      "Central HVAC design",
      "Plumbing for multiple retail units",
      "Fire detection and suppression",
      "Emergency lighting and safety systems",
    ],
    images: ["RD1.png", "RD2.png", "RD3.png", "RD4.png", "RD5.png"],
  },
  {
    id: "elv-lagos",
    title: "ELV Services Integration",
    subtitle: "Residential Development, Lagos",
    location: "Lagos",
    tags: ["CCTV", "Home Cinema", "ICT", "Video Entry"],
    icon: "📡",
    description:
      "As a key contributor to a residential development project, I played a crucial role in enhancing the modern living experience through the seamless integration of ICT infrastructure, CCTV systems, a state-of-the-art home cinema, and advanced video entry systems.",
    scope: [
      "ICT Rack installation and configuration",
      "CCTV systems — full site coverage",
      "Video entry systems",
      "Home Cinema setup",
      "User experience and smart home integration",
    ],
    images: [
      "IMG_20231223_145609.jpg",
      "20230919_141532.jpg",
      "20230918_141453.jpg",
      "20230916_173615.jpg",
    ],
  },
  {
    id: "garment-ilorin",
    title: "Garment Factory",
    subtitle: "Ilorin",
    location: "Ilorin",
    tags: ["Industrial", "M&E", "Power Systems"],
    icon: "🏭",
    description:
      "Full M&E engineering design for a garment manufacturing facility in Ilorin, delivering reliable power, HVAC, and plumbing systems to support continuous industrial operations.",
    scope: [
      "Industrial power distribution",
      "Mechanical ventilation and HVAC",
      "Plumbing and drainage",
      "Lighting design for production floors",
      "Fire protection systems",
    ],
    images: ["G1.jpg", "G2.jpg", "G3.jpg", "G4.jpg"],
  },
  {
    id: "hostel-ikorodu",
    title: "Hostel Development",
    subtitle: "Ikorodu, Lagos",
    location: "Ikorodu",
    tags: ["Residential", "MEP", "HVAC"],
    icon: "🏢",
    description:
      "In designing MEP systems for a 30-room hostel building, I ensured functionality, efficiency, and safety. HVAC, electrical, plumbing, and fire protection systems were integrated with a focus on cost-effectiveness and sustainability. Challenges like budget constraints and space limitations were addressed through innovative design and close collaboration.",
    scope: [
      "ELV systems integration",
      "Medium and low voltage power (MLVP)",
      "Power distribution",
      "Drainage and plumbing",
      "Lighting layout",
      "Water supply systems",
    ],
    images: ["ELV ik.png", "MLVP ik.png", "DRAINAGE ik.png", "ELV abk.png", "MLVP abk.png"],
  },
  {
    id: "fcmb-ikeja",
    title: "M&E Engineering Solutions",
    subtitle: "FCMB DRC, Ikeja",
    location: "Ikeja, Lagos",
    tags: ["Electrical", "Mechanical", "Commercial"],
    icon: "⚡",
    description:
      "Comprehensive mechanical and electrical engineering solutions for FCMB's Data Recovery Centre in Ikeja. The project demanded high reliability power systems, precision cooling, and robust infrastructure to meet data centre standards.",
    scope: [
      "High-availability power distribution",
      "Precision cooling and HVAC",
      "UPS and standby generator integration",
      "Cable management and containment",
      "Electrical schematics and documentation",
    ],
    images: ["MEP DESIGN.jpeg", "MEP DESIGN 2.jpg"],
  },
  {
    id: "residential-ibadan",
    title: "Residential Development",
    subtitle: "Ibadan",
    location: "Ibadan",
    tags: ["Residential", "Plumbing", "Electrical"],
    icon: "🏠",
    description:
      "Complete MEP design for a residential property in Ibadan, covering electrical, plumbing, and drainage systems to deliver a comfortable and energy-efficient home.",
    scope: [
      "Domestic electrical installation design",
      "Plumbing and water supply",
      "Drainage systems",
      "Lighting design",
      "Safety and fire protection",
    ],
    images: [
      "IMG-20230819-WA0022.jpg",
      "IMG-20230819-WA0023.jpg",
      "IMG-20230819-WA0024.jpg",
      "IMG-20230823-WA0017.jpg",
      "IMG-20230823-WA0018.jpg",
    ],
  },
  {
    id: "school-osogbo",
    title: "Three-Floor School Project",
    subtitle: "Oshogbo",
    location: "Oshogbo",
    tags: ["Educational", "MEP", "Fire Protection"],
    icon: "🏫",
    description:
      "MEP design for a three-floor school project, ensuring comprehensive systems for heating, ventilation, lighting, plumbing, and fire protection. Challenges like space constraints and budget limitations were overcome through innovative design strategies. The project delivers a safe, comfortable, and sustainable learning environment.",
    scope: [
      "Heating, ventilation and air conditioning",
      "Electrical distribution and lighting",
      "Plumbing and drainage",
      "Fire detection and protection",
      "Compliance with educational building standards",
    ],
    images: [
      "E1.jpg",
      "20230916_173527.jpg",
      "20230916_173539.jpg",
      "20230918_164350.jpg",
      "20230918_180015.jpg",
      "20230918_185041.jpg",
    ],
  },
];

const SERVICES = [
  { title: "MEP Design", desc: "Comprehensive mechanical, electrical and plumbing systems design for residential, commercial and industrial buildings.", icon: "⚙️" },
  { title: "AutoCAD MEP Drafting", desc: "Precision technical drawings and detailed design documentation for seamless project execution.", icon: "📐" },
  { title: "Renewable Energy", desc: "Solar and hybrid energy system design integrating sustainable practices into modern engineering.", icon: "🌱" },
  { title: "ELV Services", desc: "Extra Low Voltage systems — CCTV, fire alarms, access control, home cinema, ICT infrastructure.", icon: "📡" },
  { title: "Project Engineering", desc: "End-to-end project management from concept through commissioning for complex multi-discipline projects.", icon: "📋" },
  { title: "Electrical Installations", desc: "Power distribution, lighting design, earthing and electrical systems for all building types.", icon: "⚡" },
];

const SKILLS = [
  { label: "AutoCAD MEP", pct: 95 },
  { label: "Electrical Systems Design", pct: 92 },
  { label: "ELV Services", pct: 90 },
  { label: "Renewable Energy", pct: 85 },
  { label: "Project Engineering", pct: 88 },
  { label: "Plumbing & HVAC", pct: 82 },
];

/* ─────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────── */
const C = {
  bg: "#0d0d0d",
  surface: "#141414",
  surfaceAlt: "#191919",
  border: "rgba(255,255,255,0.07)",
  borderHover: "rgba(255,255,255,0.14)",
  accent: "#c8a96e",
  accentMuted: "rgba(200,169,110,0.1)",
  accentBorder: "rgba(200,169,110,0.25)",
  text: "#e8e4dc",
  textMuted: "rgba(232,228,220,0.52)",
  textDim: "rgba(232,228,220,0.28)",
};

/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

/* ─────────────────────────────────────────────
   SHARED UI
───────────────────────────────────────────── */
function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(22px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <span style={{
      display: "inline-block",
      background: C.accentMuted,
      border: `1px solid ${C.accentBorder}`,
      color: C.accent,
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.1em",
      padding: "4px 13px",
      borderRadius: 100,
      textTransform: "uppercase",
    }}>
      {children}
    </span>
  );
}

function AnimBar({ pct, delay }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ height: 2, background: "rgba(255,255,255,0.07)", borderRadius: 2, overflow: "hidden" }}>
      <div style={{
        height: "100%",
        background: C.accent,
        borderRadius: 2,
        width: inView ? `${pct}%` : "0%",
        transition: `width 0.9s ease ${delay}ms`,
      }} />
    </div>
  );
}

function Chip({ children, accent }) {
  return (
    <span style={{
      fontSize: 11, padding: "3px 10px", borderRadius: 100,
      background: accent ? C.accentMuted : "rgba(255,255,255,0.05)",
      border: `1px solid ${accent ? C.accentBorder : "transparent"}`,
      color: accent ? C.accent : C.textMuted,
      display: "inline-block",
    }}>
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────────
   NAV
───────────────────────────────────────────── */
function Nav({ setPage, scrolled, menuOpen, setMenuOpen }) {
  const goto = (link) => {
    setPage("home");
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    }, 60);
  };

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: 64, display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "0 2rem",
        background: scrolled ? "rgba(13,13,13,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        transition: "background 0.35s, backdrop-filter 0.35s",
      }}>
        <button onClick={() => goto("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#0d0d0d", flexShrink: 0 }}>RB</div>
          <span style={{ fontWeight: 600, fontSize: 14, color: C.text, letterSpacing: "0.01em" }}>Raphael Bamidele</span>
        </button>

        <nav style={{ display: "flex", gap: "2rem" }} className="desk-nav">
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => goto(l)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: C.textMuted, fontSize: 13, fontWeight: 500,
              letterSpacing: "0.04em", transition: "color 0.2s",
            }}
              onMouseOver={e => e.currentTarget.style.color = C.accent}
              onMouseOut={e => e.currentTarget.style.color = C.textMuted}
            >{l}</button>
          ))}
        </nav>

        <button onClick={() => setMenuOpen(!menuOpen)} className="mob-ham" style={{ background: "none", border: "none", color: C.text, fontSize: 20, cursor: "pointer" }}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </header>

      {menuOpen && (
        <div style={{
          position: "fixed", top: 64, left: 0, right: 0, zIndex: 99,
          background: "rgba(13,13,13,0.97)", backdropFilter: "blur(16px)",
          padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.5rem",
          borderBottom: `1px solid ${C.border}`,
        }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => goto(l)} style={{ background: "none", border: "none", color: C.text, fontSize: 17, fontWeight: 600, cursor: "pointer", textAlign: "left" }}>{l}</button>
          ))}
        </div>
      )}
    </>
  );
}

/* ─────────────────────────────────────────────
   PROJECT DETAIL
───────────────────────────────────────────── */
function ProjectDetail({ project, onBack, allProjects, onProjectClick }) {
  const [lightbox, setLightbox] = useState(null);
  const [failedImgs, setFailedImgs] = useState({});
  useEffect(() => { window.scrollTo(0, 0); }, [project.id]);

  const others = allProjects.filter(p => p.id !== project.id).slice(0, 3);

  return (
    <div style={{ paddingTop: 64, minHeight: "100vh" }}>
      {/* Breadcrumb */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "0.875rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <button onClick={onBack} style={{
            background: "none", border: "none", color: C.textMuted,
            fontSize: 13, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6,
            transition: "color 0.2s",
          }}
            onMouseOver={e => e.currentTarget.style.color = C.accent}
            onMouseOut={e => e.currentTarget.style.color = C.textMuted}
          >
            ← Back to Projects
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 2rem 5rem" }}>

        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            {project.tags.map(t => <Chip key={t} accent>{t}</Chip>)}
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 800, color: C.text, marginBottom: "0.5rem", lineHeight: 1.15,
          }}>
            {project.title}
          </h1>
          <p style={{ color: C.textMuted, fontSize: 15 }}>{project.subtitle} &nbsp;·&nbsp; {project.location}</p>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: C.border, marginBottom: "2.5rem" }} />

        {/* Overview + Scope */}
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "3.5rem", marginBottom: "3rem" }} className="detail-grid">
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.09em", color: C.accent, textTransform: "uppercase", marginBottom: "0.875rem" }}>Overview</p>
            <p style={{ color: C.textMuted, lineHeight: 1.85, fontSize: 15 }}>{project.description}</p>
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.09em", color: C.accent, textTransform: "uppercase", marginBottom: "0.875rem" }}>Scope of Work</p>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              {project.scope.map((s, i) => (
                <li key={i} style={{ display: "flex", gap: 10, color: C.textMuted, fontSize: 14, lineHeight: 1.6 }}>
                  <span style={{ color: C.accent, flexShrink: 0, marginTop: 2 }}>–</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Gallery */}
        {project.images.length > 0 && (
          <>
            <div style={{ height: 1, background: C.border, marginBottom: "2.5rem" }} />
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.09em", color: C.accent, textTransform: "uppercase", marginBottom: "1.5rem" }}>Project Images</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
              {project.images.map((img, i) => (
                !failedImgs[i] ? (
                  <div key={i}
                    onClick={() => setLightbox(i)}
                    style={{
                      borderRadius: 10, overflow: "hidden",
                      background: C.surface, border: `1px solid ${C.border}`,
                      cursor: "zoom-in", aspectRatio: "4/3",
                      transition: "border-color 0.2s, transform 0.2s",
                    }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = C.accentBorder; e.currentTarget.style.transform = "scale(1.015)"; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "scale(1)"; }}
                  >
                    <img
                      src={GITHUB_RAW + encodeURIComponent(img)}
                      alt={`${project.title} ${i + 1}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      onError={() => setFailedImgs(f => ({ ...f, [i]: true }))}
                    />
                  </div>
                ) : null
              ))}
            </div>
          </>
        )}

        {/* Other projects */}
        {others.length > 0 && (
          <>
            <div style={{ height: 1, background: C.border, margin: "3.5rem 0 2.5rem" }} />
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.09em", color: C.accent, textTransform: "uppercase", marginBottom: "1.5rem" }}>Other Projects</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
              {others.map(p => (
                <div key={p.id} onClick={() => onProjectClick(p)}
                  style={{
                    background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12,
                    padding: "1.5rem", cursor: "pointer",
                    transition: "border-color 0.2s, background 0.2s, transform 0.2s",
                  }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = C.accentBorder; e.currentTarget.style.background = C.surfaceAlt; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.surface; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ fontSize: 22, marginBottom: "0.75rem" }}>{p.icon}</div>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 4 }}>{p.title}</h4>
                  <p style={{ fontSize: 12, color: C.textMuted }}>{p.subtitle}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div onClick={() => setLightbox(null)}
          style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.93)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
          <img
            src={GITHUB_RAW + encodeURIComponent(project.images[lightbox])}
            alt=""
            style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", borderRadius: 8 }}
          />
          {[
            { label: "‹", pos: "left", next: () => setLightbox(l => l > 0 ? l - 1 : project.images.length - 1) },
            { label: "›", pos: "right", next: () => setLightbox(l => l < project.images.length - 1 ? l + 1 : 0) },
          ].map(({ label, pos, next }) => (
            <button key={pos} onClick={e => { e.stopPropagation(); next(); }}
              style={{ position: "absolute", [pos]: "1.5rem", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.08)", border: "none", color: C.text, fontSize: 22, cursor: "pointer", width: 44, height: 44, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {label}
            </button>
          ))}
          <button onClick={() => setLightbox(null)}
            style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "rgba(255,255,255,0.08)", border: "none", color: C.text, fontSize: 16, cursor: "pointer", width: 38, height: 38, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            ✕
          </button>
          <div style={{ position: "absolute", bottom: "1.5rem", color: C.textMuted, fontSize: 12 }}>
            {lightbox + 1} / {project.images.length}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────── */
function HomePage({ onProjectClick }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);

  const heroStyle = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : "translateY(18px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  });

  return (
    <>
      {/* ── HERO ── */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 64, position: "relative", overflow: "hidden" }}>
        {/* Dot grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)`, backgroundSize: "44px 44px", pointerEvents: "none" }} />
        {/* Single ambient glow */}
        <div style={{ position: "absolute", top: "15%", right: "10%", width: 480, height: 480, borderRadius: "50%", background: "rgba(200,169,110,0.045)", filter: "blur(90px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem", position: "relative", zIndex: 1, width: "100%" }}>
          <div style={heroStyle(0)}>
            <SectionLabel>MEP Engineer &amp; Designer</SectionLabel>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2.8rem, 6vw, 5.2rem)",
            fontWeight: 800, lineHeight: 1.06,
            color: C.text, margin: "1.25rem 0 1.5rem",
            ...heroStyle(120),
          }}>
            Engineering<br />
            <span style={{ color: C.accent }}>the future</span><br />
            of buildings.
          </h1>

          <p style={{ fontSize: 16, lineHeight: 1.8, color: C.textMuted, maxWidth: 500, marginBottom: "2.5rem", ...heroStyle(240) }}>
            Specialising in MEP design for residential, commercial, industrial and telecoms systems — from concept through commissioning.
          </p>

          <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", ...heroStyle(360) }}>
            <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: C.accent, border: "none", color: "#0d0d0d", padding: "13px 26px", borderRadius: 7, fontSize: 14, fontWeight: 700, cursor: "pointer", letterSpacing: "0.01em", transition: "opacity 0.2s" }}
              onMouseOver={e => e.currentTarget.style.opacity = "0.82"}
              onMouseOut={e => e.currentTarget.style.opacity = "1"}
            >View Projects →</button>
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: "none", border: `1px solid ${C.border}`, color: C.text, padding: "13px 26px", borderRadius: 7, fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "border-color 0.2s" }}
              onMouseOver={e => e.currentTarget.style.borderColor = C.accentBorder}
              onMouseOut={e => e.currentTarget.style.borderColor = C.border}
            >Get in Touch</button>
          </div>

          {/* Stat row */}
          <div style={{ display: "flex", gap: "3rem", marginTop: "4.5rem", flexWrap: "wrap", borderTop: `1px solid ${C.border}`, paddingTop: "2.5rem", ...heroStyle(480) }}>
            {[["10+", "Projects Delivered"], ["Award", "MEP Competition Winner"], ["6+", "Core Specialisations"]].map(([val, label]) => (
              <div key={label}>
                <div style={{ fontSize: "1.6rem", fontWeight: 800, color: C.accent, lineHeight: 1 }}>{val}</div>
                <div style={{ fontSize: 12, color: C.textDim, marginTop: 5, letterSpacing: "0.02em" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "7rem 2rem", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn style={{ marginBottom: "3rem" }}><SectionLabel>About Me</SectionLabel></FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }} className="two-col">
          <div>
            <FadeIn delay={80}>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.7rem, 3vw, 2.4rem)", fontWeight: 800, color: C.text, lineHeight: 1.2, marginBottom: "1.5rem" }}>
                A passion for precision<br />in every system.
              </h2>
            </FadeIn>
            {[
              "I am a dedicated professional with a passion for electrical engineering and a proven track record in MEP design. Holding a degree in Electrical Engineering, I have combined academic excellence with hands-on project delivery across Nigeria.",
              "My work earned recognition as an award winner in a prestigious MEP design competition — a testament to my innovative approach and problem-solving capabilities. I am proficient in AutoCAD MEP and specialise in renewable energy systems and ELV services.",
              "From fire alarms to power distribution, from garment factories to schools — I bring the same commitment to every project: precision, sustainability, and seamless execution.",
            ].map((p, i) => (
              <FadeIn key={i} delay={160 + i * 70}>
                <p style={{ color: C.textMuted, lineHeight: 1.82, fontSize: 15, marginBottom: "1rem" }}>{p}</p>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={100}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.09em", color: C.textDim, textTransform: "uppercase", marginBottom: "1.5rem" }}>Core Competencies</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              {SKILLS.map((s, i) => (
                <div key={s.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
                    <span style={{ color: C.text, fontWeight: 500 }}>{s.label}</span>
                    <span style={{ color: C.accent, fontWeight: 600 }}>{s.pct}%</span>
                  </div>
                  <AnimBar pct={s.pct} delay={i * 80} />
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <div style={{ height: 1, background: C.border, margin: "0 2rem" }} />

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: "7rem 2rem", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn style={{ marginBottom: "3rem" }}>
          <SectionLabel>What I Do</SectionLabel>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.7rem, 3vw, 2.4rem)", fontWeight: 800, color: C.text, lineHeight: 1.2, marginTop: "0.75rem" }}>Services</h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
          {SERVICES.map((s, i) => (
            <FadeIn key={s.title} delay={i * 55}>
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "1.75rem", transition: "border-color 0.25s, background 0.25s", height: "100%" }}
                onMouseOver={e => { e.currentTarget.style.borderColor = C.borderHover; e.currentTarget.style.background = C.surfaceAlt; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.surface; }}
              >
                <div style={{ fontSize: 26, marginBottom: "0.875rem" }}>{s.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: "0.5rem" }}>{s.title}</h3>
                <p style={{ color: C.textMuted, lineHeight: 1.72, fontSize: 13 }}>{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <div style={{ height: 1, background: C.border, margin: "0 2rem" }} />

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: "7rem 2rem", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn style={{ marginBottom: "3rem" }}>
          <SectionLabel>Portfolio</SectionLabel>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.7rem, 3vw, 2.4rem)", fontWeight: 800, color: C.text, lineHeight: 1.2, marginTop: "0.75rem" }}>Projects</h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "1rem" }}>
          {PROJECTS.map((p, i) => (
            <FadeIn key={p.id} delay={i * 50}>
              <div onClick={() => onProjectClick(p)}
                style={{
                  background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12,
                  padding: "1.75rem", cursor: "pointer",
                  display: "flex", flexDirection: "column", gap: "0.75rem",
                  transition: "border-color 0.25s, background 0.25s, transform 0.25s",
                }}
                onMouseOver={e => { e.currentTarget.style.borderColor = C.accentBorder; e.currentTarget.style.background = C.surfaceAlt; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.surface; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ fontSize: 24 }}>{p.icon}</div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 3 }}>{p.title}</h3>
                  <p style={{ fontSize: 12, color: C.textMuted }}>{p.subtitle}</p>
                </div>
                <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginTop: "auto", paddingTop: "0.5rem" }}>
                  {p.tags.map(t => <Chip key={t}>{t}</Chip>)}
                </div>
                <span style={{ fontSize: 12, color: C.accent, fontWeight: 600 }}>View project →</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <div style={{ height: 1, background: C.border, margin: "0 2rem" }} />

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "7rem 2rem", maxWidth: 660, margin: "0 auto" }}>
        <FadeIn style={{ marginBottom: "2.5rem" }}>
          <SectionLabel>Get In Touch</SectionLabel>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.7rem, 3vw, 2.4rem)", fontWeight: 800, color: C.text, lineHeight: 1.2, marginTop: "0.75rem", marginBottom: "0.75rem" }}>Let's work together</h2>
          <p style={{ color: C.textMuted, lineHeight: 1.8, fontSize: 15 }}>
            Have a project in mind? Whether it's a new build, refurbishment, or a complex MEP challenge — reach out and let's create something exceptional.
          </p>
        </FadeIn>
        <FadeIn delay={100}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "2rem", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {[{ ph: "Your Name", type: "text" }, { ph: "Email Address", type: "email" }].map(({ ph, type }) => (
              <input key={ph} type={type} placeholder={ph} style={{
                background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`,
                borderRadius: 7, padding: "13px 15px", color: C.text, fontSize: 14,
                outline: "none", width: "100%", fontFamily: "inherit", transition: "border-color 0.2s",
              }}
                onFocus={e => e.currentTarget.style.borderColor = C.accentBorder}
                onBlur={e => e.currentTarget.style.borderColor = C.border}
              />
            ))}
            <textarea placeholder="Tell me about your project..." rows={5} style={{
              background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`,
              borderRadius: 7, padding: "13px 15px", color: C.text, fontSize: 14,
              outline: "none", resize: "vertical", width: "100%", fontFamily: "inherit", transition: "border-color 0.2s",
            }}
              onFocus={e => e.currentTarget.style.borderColor = C.accentBorder}
              onBlur={e => e.currentTarget.style.borderColor = C.border}
            />
            <button style={{ background: C.accent, border: "none", color: "#0d0d0d", padding: "13px", borderRadius: 7, fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "opacity 0.2s" }}
              onMouseOver={e => e.currentTarget.style.opacity = "0.82"}
              onMouseOut={e => e.currentTarget.style.opacity = "1"}
            >Send Message →</button>
          </div>
        </FadeIn>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "1.75rem 2rem", color: C.textDim, fontSize: 13 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <span>© 2026 Raphael Bamidele</span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: "none", border: "none", color: C.textDim, fontSize: 13, cursor: "pointer", transition: "color 0.2s" }}
                onMouseOver={e => e.currentTarget.style.color = C.accent}
                onMouseOut={e => e.currentTarget.style.color = C.textDim}
              >{l}</button>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}

/* ─────────────────────────────────────────────
   ROOT
───────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("home");
  const [activeProject, setActiveProject] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 55);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleProjectClick = (project) => {
    setActiveProject(project);
    setPage("project");
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setPage("home");
    setActiveProject(null);
    setTimeout(() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }), 80);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif", background: C.bg, color: C.text, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet" />

      <Nav setPage={setPage} scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {page === "home" && <HomePage onProjectClick={handleProjectClick} />}
      {page === "project" && activeProject && (
        <ProjectDetail
          project={activeProject}
          onBack={handleBack}
          allProjects={PROJECTS}
          onProjectClick={handleProjectClick}
        />
      )}

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder, textarea::placeholder { color: ${C.textDim}; }
        @media (max-width: 768px) {
          .desk-nav { display: none !important; }
          .mob-ham { display: flex !important; }
          .two-col, .detail-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
        @media (min-width: 769px) { .mob-ham { display: none !important; } }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.09); border-radius: 3px; }
      `}</style>
    </div>
  );
}
