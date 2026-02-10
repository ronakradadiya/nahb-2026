import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";

// ============================================
// COLOR PALETTE
// ============================================
const colors = {
  primary: "#2D5A4A",
  secondary: "#8B4513",
  accent: "#D4A574",
  light: "#F5F0E8",
  dark: "#1A1A1A",
  success: "#4A7C59",
  connection: "#E85D75",
  discovery: "#4A90A4",
  movement: "#4A7C59",
  rest: "#8B6DB3",
};

// ============================================
// SVG ILLUSTRATIONS
// ============================================

// Modern Life Chaos Illustration
const ModernLifeIllustration = () => (
  <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%" }}>
    {/* Background - gray stressed */}
    <circle cx="100" cy="100" r="90" fill="#e8e0d8" />
    {/* Stressed Person */}
    <circle cx="100" cy="85" r="25" fill="#d4c4b0" /> {/* Head */}
    <ellipse cx="100" cy="140" rx="30" ry="35" fill="#d4c4b0" /> {/* Body */}
    {/* Stressed face */}
    <path
      d="M90 80 Q95 85 100 80"
      stroke="#888"
      strokeWidth="2"
      fill="none"
    />{" "}
    {/* Worried eyebrow */}
    <path
      d="M100 80 Q105 85 110 80"
      stroke="#888"
      strokeWidth="2"
      fill="none"
    />
    <circle cx="92" cy="85" r="3" fill="#888" />
    <circle cx="108" cy="85" r="3" fill="#888" />
    <path
      d="M92 95 Q100 90 108 95"
      stroke="#888"
      strokeWidth="2"
      fill="none"
    />{" "}
    {/* Frown */}
    {/* Chaos elements spinning around */}
    {/* Phone notifications */}
    <g transform="translate(45, 50)">
      <rect x="0" y="0" width="20" height="30" rx="3" fill="#888" />
      <circle cx="10" cy="5" r="4" fill="#E85D75" />
      <text x="10" y="8" fontSize="6" fill="#fff" textAnchor="middle">
        3
      </text>
    </g>
    {/* Clock - time pressure */}
    <g transform="translate(140, 45)">
      <circle
        cx="15"
        cy="15"
        r="15"
        fill="#fff"
        stroke="#888"
        strokeWidth="2"
      />
      <line x1="15" y1="15" x2="15" y2="7" stroke="#E85D75" strokeWidth="2" />
      <line x1="15" y1="15" x2="22" y2="15" stroke="#888" strokeWidth="2" />
    </g>
    {/* Email overload */}
    <g transform="translate(35, 120)">
      <rect x="0" y="0" width="25" height="18" rx="2" fill="#888" />
      <polyline
        points="0,0 12.5,10 25,0"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
      />
      <circle cx="20" cy="3" r="6" fill="#E85D75" />
      <text x="20" y="6" fontSize="8" fill="#fff" textAnchor="middle">
        99
      </text>
    </g>
    {/* Fast food */}
    <g transform="translate(145, 115)">
      <rect x="0" y="10" width="25" height="15" rx="2" fill="#FFB74D" />
      <ellipse cx="12.5" cy="10" rx="12.5" ry="5" fill="#8D6E63" />
    </g>
    {/* Stress lines */}
    <g stroke="#ccc" strokeWidth="1" opacity="0.6">
      <line x1="60" y1="40" x2="50" y2="30" />
      <line x1="140" y1="40" x2="150" y2="30" />
      <line x1="55" y1="160" x2="40" y2="170" />
      <line x1="145" y1="160" x2="160" y2="170" />
    </g>
    {/* Swirl lines indicating chaos */}
    <path
      d="M30 100 Q20 80 40 70"
      stroke="#ccc"
      strokeWidth="2"
      fill="none"
      strokeDasharray="4,4"
    />
    <path
      d="M170 100 Q180 80 160 70"
      stroke="#ccc"
      strokeWidth="2"
      fill="none"
      strokeDasharray="4,4"
    />
  </svg>
);

// Silverwood Community Illustration
const SilverwoodIllustration = () => (
  <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%" }}>
    {/* Background - warm welcoming */}
    <circle cx="100" cy="100" r="90" fill="#E8F5E9" />

    {/* Sun */}
    <circle cx="100" cy="35" r="20" fill="#FFE082" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <line
        key={i}
        x1={100 + Math.cos((angle * Math.PI) / 180) * 25}
        y1={35 + Math.sin((angle * Math.PI) / 180) * 25}
        x2={100 + Math.cos((angle * Math.PI) / 180) * 32}
        y2={35 + Math.sin((angle * Math.PI) / 180) * 32}
        stroke="#FFE082"
        strokeWidth="3"
        strokeLinecap="round"
      />
    ))}

    {/* Trees */}
    <g transform="translate(25, 80)">
      <rect x="12" y="40" width="8" height="20" fill="#8D6E63" />
      <ellipse cx="16" cy="30" rx="20" ry="25" fill={colors.success} />
    </g>
    <g transform="translate(150, 85)">
      <rect x="12" y="35" width="8" height="18" fill="#8D6E63" />
      <ellipse cx="16" cy="25" rx="18" ry="22" fill={colors.movement} />
    </g>

    {/* House with porch */}
    <g transform="translate(70, 95)">
      {/* House body */}
      <rect x="0" y="25" width="60" height="45" fill="#FFCCBC" />
      {/* Roof */}
      <polygon points="30,-5 -5,25 65,25" fill={colors.secondary} />
      {/* Door */}
      <rect x="23" y="40" width="14" height="30" fill={colors.primary} />
      {/* Windows */}
      <rect x="8" y="35" width="12" height="12" fill="#81D4FA" />
      <rect x="40" y="35" width="12" height="12" fill="#81D4FA" />
      {/* Porch */}
      <rect x="-5" y="65" width="70" height="8" fill="#D7CCC8" />
    </g>

    {/* People connecting - 2 figures */}
    <g transform="translate(55, 155)">
      {/* Person 1 */}
      <circle cx="15" cy="5" r="8" fill="#FFCCBC" />
      <ellipse cx="15" cy="25" rx="8" ry="12" fill={colors.connection} />
    </g>
    <g transform="translate(115, 155)">
      {/* Person 2 */}
      <circle cx="15" cy="5" r="8" fill="#D7CCC8" />
      <ellipse cx="15" cy="25" rx="8" ry="12" fill={colors.discovery} />
    </g>

    {/* Connection line between people */}
    <path
      d="M78 165 Q100 150 122 165"
      stroke={colors.connection}
      strokeWidth="3"
      fill="none"
      strokeDasharray="5,5"
    />
    <text
      x="100"
      y="152"
      fontSize="10"
      fill={colors.connection}
      textAnchor="middle"
    >
      ♥
    </text>

    {/* Path/trail */}
    <path
      d="M20 180 Q60 170 100 175 Q140 180 180 170"
      stroke="#D7CCC8"
      strokeWidth="8"
      fill="none"
      strokeLinecap="round"
    />

    {/* Small flowers/nature elements */}
    {[
      { x: 45, y: 175 },
      { x: 155, y: 172 },
      { x: 85, y: 178 },
    ].map((pos, i) => (
      <g key={i} transform={`translate(${pos.x}, ${pos.y})`}>
        <circle cx="0" cy="0" r="4" fill="#F48FB1" />
        <circle cx="0" cy="-3" r="2" fill="#FFE082" />
      </g>
    ))}
  </svg>
);

// Connection Pillar Illustration
const ConnectionIllustration = () => (
  <svg viewBox="0 0 180 140" style={{ width: "100%", height: "100%" }}>
    {/* Background */}
    <rect
      x="0"
      y="0"
      width="180"
      height="140"
      fill={`${colors.connection}15`}
      rx="10"
    />
    {/* Front porch scene */}
    <rect x="30" y="60" width="120" height="50" fill="#FFCCBC" rx="5" />{" "}
    {/* Porch floor */}
    <rect x="25" y="55" width="130" height="8" fill="#D7CCC8" />{" "}
    {/* Porch roof */}
    {/* Porch columns */}
    <rect x="35" y="63" width="6" height="45" fill="#EFEBE9" />
    <rect x="139" y="63" width="6" height="45" fill="#EFEBE9" />
    {/* People sitting and chatting */}
    {/* Person 1 - sitting */}
    <g transform="translate(55, 75)">
      <circle cx="12" cy="5" r="10" fill="#FFCCBC" />
      <ellipse cx="12" cy="25" rx="12" ry="15" fill={colors.connection} />
      {/* Smile */}
      <path d="M8 7 Q12 12 16 7" stroke="#333" strokeWidth="1.5" fill="none" />
    </g>
    {/* Person 2 - sitting */}
    <g transform="translate(100, 75)">
      <circle cx="12" cy="5" r="10" fill="#D7CCC8" />
      <ellipse cx="12" cy="25" rx="12" ry="15" fill={colors.discovery} />
      {/* Smile */}
      <path d="M8 7 Q12 12 16 7" stroke="#333" strokeWidth="1.5" fill="none" />
    </g>
    {/* Speech bubbles */}
    <g transform="translate(75, 45)">
      <ellipse cx="12" cy="8" rx="15" ry="10" fill="#fff" />
      <polygon points="8,18 12,18 10,25" fill="#fff" />
    </g>
    <g transform="translate(105, 50)">
      <ellipse cx="10" cy="6" rx="12" ry="8" fill="#fff" />
      <polygon points="6,14 10,14 8,20" fill="#fff" />
    </g>
    {/* Coffee cups */}
    <rect x="80" y="95" width="8" height="10" fill="#795548" rx="1" />
    <rect x="92" y="95" width="8" height="10" fill="#795548" rx="1" />
    {/* Heart connection */}
    <text
      x="90"
      y="35"
      fontSize="16"
      fill={colors.connection}
      textAnchor="middle"
    >
      ♥
    </text>
    {/* Label */}
    <text
      x="90"
      y="130"
      fontSize="11"
      fill={colors.connection}
      fontWeight="bold"
      textAnchor="middle"
    >
      Neighbors by Design
    </text>
  </svg>
);

// Discovery Pillar Illustration
const DiscoveryIllustration = () => (
  <svg viewBox="0 0 180 140" style={{ width: "100%", height: "100%" }}>
    {/* Background */}
    <rect
      x="0"
      y="0"
      width="180"
      height="140"
      fill={`${colors.discovery}15`}
      rx="10"
    />

    {/* Trail path */}
    <path
      d="M10 120 Q50 100 90 105 Q130 110 170 90"
      stroke="#D7CCC8"
      strokeWidth="12"
      fill="none"
      strokeLinecap="round"
    />

    {/* Trees along trail */}
    <g transform="translate(25, 50)">
      <rect x="8" y="30" width="6" height="20" fill="#8D6E63" />
      <ellipse cx="11" cy="22" rx="15" ry="20" fill={colors.success} />
    </g>
    <g transform="translate(130, 40)">
      <rect x="8" y="30" width="6" height="20" fill="#8D6E63" />
      <ellipse cx="11" cy="22" rx="15" ry="20" fill={colors.movement} />
    </g>

    {/* Edible plants - grape vine */}
    <g transform="translate(70, 35)">
      <path
        d="M0 30 Q20 10 40 30"
        stroke={colors.success}
        strokeWidth="3"
        fill="none"
      />
      <circle cx="10" cy="25" r="5" fill="#7B1FA2" />
      <circle cx="18" cy="22" r="5" fill="#7B1FA2" />
      <circle cx="14" cy="30" r="5" fill="#7B1FA2" />
      <circle cx="30" cy="25" r="5" fill="#7B1FA2" />
      <circle cx="26" cy="30" r="5" fill="#7B1FA2" />
    </g>

    {/* Person exploring */}
    <g transform="translate(80, 70)">
      <circle cx="12" cy="5" r="10" fill="#FFCCBC" />
      <ellipse cx="12" cy="28" rx="10" ry="15" fill={colors.discovery} />
      {/* Backpack */}
      <ellipse cx="20" cy="28" rx="6" ry="10" fill="#FF8A65" />
    </g>

    {/* Butterfly */}
    <g transform="translate(120, 55)">
      <ellipse
        cx="0"
        cy="0"
        rx="8"
        ry="5"
        fill="#F48FB1"
        transform="rotate(-30)"
      />
      <ellipse
        cx="0"
        cy="0"
        rx="8"
        ry="5"
        fill="#F48FB1"
        transform="rotate(30)"
      />
      <ellipse cx="0" cy="0" rx="2" ry="6" fill="#333" />
    </g>

    {/* Discovery sparkles */}
    <text x="55" y="55" fontSize="12" fill={colors.discovery}>
      ✨
    </text>
    <text x="140" y="70" fontSize="10" fill={colors.discovery}>
      ✨
    </text>

    {/* Magnifying glass hint */}
    <g transform="translate(50, 80)">
      <circle
        cx="10"
        cy="10"
        r="8"
        stroke={colors.discovery}
        strokeWidth="2"
        fill="none"
      />
      <line
        x1="16"
        y1="16"
        x2="22"
        y2="22"
        stroke={colors.discovery}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </g>

    {/* Label */}
    <text
      x="90"
      y="130"
      fontSize="11"
      fill={colors.discovery}
      fontWeight="bold"
      textAnchor="middle"
    >
      40 Acres to Explore
    </text>
  </svg>
);

// Movement Pillar Illustration
const MovementIllustration = () => (
  <svg viewBox="0 0 180 140" style={{ width: "100%", height: "100%" }}>
    {/* Background */}
    <rect
      x="0"
      y="0"
      width="180"
      height="140"
      fill={`${colors.movement}15`}
      rx="10"
    />

    {/* Loop trail - figure 8 style */}
    <ellipse
      cx="65"
      cy="70"
      rx="45"
      ry="35"
      stroke="#D7CCC8"
      strokeWidth="10"
      fill="none"
    />
    <ellipse
      cx="115"
      cy="70"
      rx="45"
      ry="35"
      stroke="#D7CCC8"
      strokeWidth="10"
      fill="none"
    />

    {/* Person jogging */}
    <g transform="translate(40, 45)">
      <circle cx="10" cy="5" r="8" fill="#FFCCBC" />
      <ellipse cx="10" cy="22" rx="8" ry="12" fill={colors.movement} />
      {/* Running legs */}
      <line
        x1="6"
        y1="32"
        x2="0"
        y2="45"
        stroke={colors.movement}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="14"
        y1="32"
        x2="22"
        y2="42"
        stroke={colors.movement}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </g>

    {/* Person on bike */}
    <g transform="translate(115, 50)">
      <circle cx="10" cy="5" r="8" fill="#D7CCC8" />
      <ellipse cx="10" cy="20" rx="7" ry="10" fill={colors.discovery} />
      {/* Bike wheels */}
      <circle cx="0" cy="35" r="10" stroke="#666" strokeWidth="2" fill="none" />
      <circle
        cx="25"
        cy="35"
        r="10"
        stroke="#666"
        strokeWidth="2"
        fill="none"
      />
      {/* Bike frame */}
      <path
        d="M0 35 L12 20 L25 35 M12 20 L12 35"
        stroke="#666"
        strokeWidth="2"
        fill="none"
      />
    </g>

    {/* Pickleball court hint */}
    <g transform="translate(75, 95)">
      <rect
        x="0"
        y="0"
        width="30"
        height="20"
        fill="#81C784"
        stroke="#fff"
        strokeWidth="2"
        rx="2"
      />
      <line x1="15" y1="0" x2="15" y2="20" stroke="#fff" strokeWidth="1" />
      {/* Ball */}
      <circle cx="22" cy="10" r="4" fill="#FFEE58" />
    </g>

    {/* Movement arrows */}
    <path
      d="M30 70 L20 70 L25 65 M20 70 L25 75"
      stroke={colors.movement}
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M150 70 L160 70 L155 65 M160 70 L155 75"
      stroke={colors.movement}
      strokeWidth="2"
      fill="none"
    />

    {/* Energy sparkles */}
    <text x="90" y="25" fontSize="14" fill={colors.movement}>
      ⚡
    </text>

    {/* Label */}
    <text
      x="90"
      y="130"
      fontSize="11"
      fill={colors.movement}
      fontWeight="bold"
      textAnchor="middle"
    >
      5-15 Min Loop Trails
    </text>
  </svg>
);

// Rest Pillar Illustration
const RestIllustration = () => (
  <svg viewBox="0 0 180 140" style={{ width: "100%", height: "100%" }}>
    {/* Background - calming gradient */}
    <rect
      x="0"
      y="0"
      width="180"
      height="140"
      fill={`${colors.rest}15`}
      rx="10"
    />
    {/* Moon and stars */}
    <circle cx="150" cy="25" r="15" fill="#E1BEE7" />
    <circle cx="145" cy="20" r="12" fill={`${colors.rest}15`} />{" "}
    {/* Moon crescent effect */}
    <text x="30" y="30" fontSize="8" fill={colors.rest}>
      ✦
    </text>
    <text x="50" y="20" fontSize="6" fill={colors.rest}>
      ✦
    </text>
    <text x="120" y="35" fontSize="5" fill={colors.rest}>
      ✦
    </text>
    {/* Pond/water feature */}
    <ellipse cx="90" cy="100" rx="60" ry="25" fill="#B3E5FC" />
    <ellipse cx="90" cy="95" rx="50" ry="18" fill="#81D4FA" opacity="0.5" />
    {/* Water ripples */}
    <ellipse
      cx="75"
      cy="100"
      rx="15"
      ry="5"
      stroke="#fff"
      strokeWidth="1"
      fill="none"
      opacity="0.6"
    />
    <ellipse
      cx="105"
      cy="95"
      rx="10"
      ry="3"
      stroke="#fff"
      strokeWidth="1"
      fill="none"
      opacity="0.6"
    />
    {/* Person meditating/resting */}
    <g transform="translate(75, 45)">
      <circle cx="15" cy="8" r="10" fill="#FFCCBC" />
      <ellipse cx="15" cy="30" rx="15" ry="15" fill={colors.rest} />
      {/* Peaceful closed eyes */}
      <path d="M10 8 Q13 6 16 8" stroke="#333" strokeWidth="1.5" fill="none" />
      <path d="M14 8 Q17 6 20 8" stroke="#333" strokeWidth="1.5" fill="none" />
      {/* Gentle smile */}
      <path d="M12 13 Q15 16 18 13" stroke="#333" strokeWidth="1" fill="none" />
    </g>
    {/* Zen circles */}
    <circle
      cx="40"
      cy="60"
      r="8"
      stroke={colors.rest}
      strokeWidth="1"
      fill="none"
      opacity="0.5"
    />
    <circle
      cx="140"
      cy="55"
      r="6"
      stroke={colors.rest}
      strokeWidth="1"
      fill="none"
      opacity="0.5"
    />
    {/* Plants/nature */}
    <g transform="translate(15, 70)">
      <path d="M10 30 Q5 15 15 10 Q25 15 20 30" fill={colors.success} />
      <line x1="15" y1="30" x2="15" y2="40" stroke="#8D6E63" strokeWidth="3" />
    </g>
    <g transform="translate(145, 65)">
      <path d="M10 30 Q5 15 15 10 Q25 15 20 30" fill={colors.success} />
      <line x1="15" y1="30" x2="15" y2="40" stroke="#8D6E63" strokeWidth="3" />
    </g>
    {/* Zzz */}
    <text x="110" y="40" fontSize="12" fill={colors.rest} opacity="0.7">
      z
    </text>
    <text x="118" y="32" fontSize="10" fill={colors.rest} opacity="0.5">
      z
    </text>
    <text x="124" y="26" fontSize="8" fill={colors.rest} opacity="0.3">
      z
    </text>
    {/* Label */}
    <text
      x="90"
      y="130"
      fontSize="11"
      fill={colors.rest}
      fontWeight="bold"
      textAnchor="middle"
    >
      Restore Without Effort
    </text>
  </svg>
);

// ============================================
// DOWNLOAD BUTTON
// ============================================
const DownloadButton = ({ sectionRef, filename }) => {
  const [downloading, setDownloading] = useState(false);
  const buttonRef = useRef(null);

  const handleDownload = async () => {
    if (!sectionRef.current) return;
    setDownloading(true);
    try {
      if (buttonRef.current) buttonRef.current.style.display = "none";
      const canvas = await html2canvas(sectionRef.current, {
        backgroundColor: "#fff",
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement("a");
      link.download = `${filename}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      if (buttonRef.current) buttonRef.current.style.display = "flex";
      setDownloading(false);
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleDownload}
      disabled={downloading}
      style={{
        position: "absolute",
        top: "15px",
        right: "20px",
        padding: "10px 20px",
        backgroundColor: downloading ? colors.accent : colors.primary,
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: downloading ? "wait" : "pointer",
        fontSize: "0.85rem",
        fontWeight: 600,
        zIndex: 10,
      }}
    >
      {downloading ? "⏳ Saving..." : "📥 Download PNG"}
    </button>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
export default function CDMR() {
  const slide1Ref = useRef(null);
  const slide2Ref = useRef(null);

  return (
    <div
      style={{
        fontFamily: "Georgia, serif",
        backgroundColor: colors.light,
        padding: "30px",
      }}
    >
      {/* ==================== SLIDE 1: The Transformation Story ==================== */}
      <section
        ref={slide1Ref}
        style={{
          position: "relative",
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "40px",
          marginBottom: "40px",
          boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
        }}
      >
        <DownloadButton sectionRef={slide1Ref} filename="cdmr-slide-1-story" />

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div
            style={{
              fontSize: "0.75rem",
              letterSpacing: "3px",
              color: colors.secondary,
              marginBottom: "8px",
            }}
          >
            SILVERWOOD HEIGHTS • LILBURN, GEORGIA
          </div>
          <h1
            style={{
              fontSize: "2rem",
              color: colors.dark,
              margin: 0,
              fontWeight: 700,
            }}
          >
            Designed Around the{" "}
            <span style={{ color: colors.primary }}>Human Rhythm</span>
          </h1>
        </div>

        {/* Visual Story: Problem → Solution */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gap: "25px",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          {/* LEFT: Modern Life */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "200px",
                height: "200px",
                margin: "0 auto 15px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "4px solid #e0d6cc",
              }}
            >
              <ModernLifeIllustration />
            </div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#888" }}>
              Modern Life
            </div>
            <div
              style={{ fontSize: "0.8rem", color: "#aaa", marginTop: "5px" }}
            >
              Fragmented • Isolated • Depleted
            </div>
          </div>

          {/* CENTER: Transformation Arrow */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                backgroundColor: colors.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "2rem",
                boxShadow: "0 6px 25px rgba(45, 90, 74, 0.4)",
              }}
            >
              →
            </div>
            <div
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: colors.primary,
                letterSpacing: "2px",
              }}
            >
              CDMR™
            </div>
          </div>

          {/* RIGHT: Silverwood */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "200px",
                height: "200px",
                margin: "0 auto 15px",
                borderRadius: "50%",
                overflow: "hidden",
                border: `4px solid ${colors.primary}`,
              }}
            >
              <SilverwoodIllustration />
            </div>
            <div
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: colors.primary,
              }}
            >
              Silverwood Heights
            </div>
            <div
              style={{
                fontSize: "0.8rem",
                color: colors.secondary,
                marginTop: "5px",
              }}
            >
              Connected • Curious • Restored
            </div>
          </div>
        </div>

        {/* Site Stats Bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "15px",
            padding: "25px 30px",
            backgroundColor: colors.primary,
            borderRadius: "16px",
            color: "#fff",
          }}
        >
          {[
            { value: "93", unit: "Acres", label: "Total Site" },
            { value: "40", unit: "Acres", label: "Preserved Green" },
            { value: "43%", unit: "", label: "Conservation" },
            { value: "180", unit: "Homes", label: "Thoughtfully Placed" },
          ].map((stat, idx) => (
            <div key={idx} style={{ textAlign: "center" }}>
              <div
                style={{ fontSize: "2.2rem", fontWeight: 700, lineHeight: 1 }}
              >
                {stat.value}
                <span
                  style={{
                    fontSize: "0.9rem",
                    opacity: 0.8,
                    marginLeft: "3px",
                  }}
                >
                  {stat.unit}
                </span>
              </div>
              <div
                style={{ fontSize: "0.75rem", opacity: 0.85, marginTop: "5px" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p
            style={{
              fontSize: "1rem",
              color: colors.secondary,
              fontStyle: "italic",
              margin: 0,
            }}
          >
            "Design Backed by Science, Centered on People"
          </p>
        </div>
      </section>

      {/* ==================== SLIDE 2: The Four Pillars ==================== */}
      <section
        ref={slide2Ref}
        style={{
          position: "relative",
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "40px",
          boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
        }}
      >
        <DownloadButton
          sectionRef={slide2Ref}
          filename="cdmr-slide-2-pillars"
        />

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <h2 style={{ fontSize: "1.5rem", color: colors.dark, margin: 0 }}>
            The Four Pillars of{" "}
            <span style={{ color: colors.primary }}>CDMR™</span>
          </h2>
        </div>

        {/* 4 Pillar Illustrations */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginBottom: "25px",
          }}
        >
          {[
            {
              name: "Connection",
              color: colors.connection,
              Illustration: ConnectionIllustration,
              benefit: "Oxytocin ↑",
            },
            {
              name: "Discovery",
              color: colors.discovery,
              Illustration: DiscoveryIllustration,
              benefit: "Dopamine ↑",
            },
            {
              name: "Movement",
              color: colors.movement,
              Illustration: MovementIllustration,
              benefit: "Myokines ↑",
            },
            {
              name: "Rest",
              color: colors.rest,
              Illustration: RestIllustration,
              benefit: "Cortisol ↓",
            },
          ].map((pillar, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#fff",
                borderRadius: "16px",
                overflow: "hidden",
                border: `3px solid ${pillar.color}`,
                boxShadow: `0 4px 15px ${pillar.color}25`,
              }}
            >
              {/* Illustration */}
              <div style={{ height: "140px" }}>
                <pillar.Illustration />
              </div>

              {/* Label */}
              <div
                style={{
                  padding: "12px",
                  textAlign: "center",
                  backgroundColor: pillar.color,
                  color: "#fff",
                }}
              >
                <div style={{ fontWeight: 700, fontSize: "1rem" }}>
                  {pillar.name}
                </div>
                <div style={{ fontSize: "0.7rem", opacity: 0.9 }}>
                  {pillar.benefit}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Daily Rhythm Flow */}
        <div
          style={{
            backgroundColor: colors.light,
            borderRadius: "16px",
            padding: "20px 30px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {[
              {
                time: "Morning",
                icon: "🌅",
                pillar: "Movement",
                color: colors.movement,
              },
              {
                time: "Midday",
                icon: "☀️",
                pillar: "Connection",
                color: colors.connection,
              },
              {
                time: "Afternoon",
                icon: "🌤️",
                pillar: "Discovery",
                color: colors.discovery,
              },
              {
                time: "Evening",
                icon: "🌙",
                pillar: "Rest",
                color: colors.rest,
              },
            ].map((period, idx) => (
              <React.Fragment key={idx}>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "5px" }}>
                    {period.icon}
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      color: colors.dark,
                    }}
                  >
                    {period.time}
                  </div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      color: "#fff",
                      fontWeight: 600,
                      marginTop: "5px",
                      backgroundColor: period.color,
                      padding: "3px 10px",
                      borderRadius: "10px",
                      display: "inline-block",
                    }}
                  >
                    {period.pillar}
                  </div>
                </div>
                {idx < 3 && (
                  <div
                    style={{
                      width: "50px",
                      height: "4px",
                      background: `linear-gradient(90deg, ${[colors.movement, colors.connection, colors.discovery, colors.rest][idx]}, ${[colors.movement, colors.connection, colors.discovery, colors.rest][idx + 1]})`,
                      borderRadius: "2px",
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px 25px",
            backgroundColor: colors.primary,
            borderRadius: "12px",
            color: "#fff",
          }}
        >
          <div style={{ fontSize: "0.9rem" }}>
            Connection <span style={{ opacity: 0.6 }}>grounds</span> • Discovery{" "}
            <span style={{ opacity: 0.6 }}>inspires</span> • Movement{" "}
            <span style={{ opacity: 0.6 }}>sustains</span> • Rest{" "}
            <span style={{ opacity: 0.6 }}>restores</span>
          </div>
          <div
            style={{
              fontSize: "0.7rem",
              opacity: 0.9,
              borderLeft: "1px solid rgba(255,255,255,0.3)",
              paddingLeft: "15px",
            }}
          >
            © <strong>CDMR™</strong> MOR Studio
          </div>
        </div>
      </section>
    </div>
  );
}
