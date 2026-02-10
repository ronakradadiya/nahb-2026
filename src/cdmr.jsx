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
      {/* ==================== SLIDE 1: The Story ==================== */}
      <section
        ref={slide1Ref}
        style={{
          position: "relative",
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "40px",
          marginBottom: "40px",
          boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
          minHeight: "600px",
        }}
      >
        <DownloadButton sectionRef={slide1Ref} filename="cdmr-slide-1-story" />

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div
            style={{
              fontSize: "0.8rem",
              letterSpacing: "3px",
              color: colors.secondary,
              marginBottom: "8px",
            }}
          >
            SILVERWOOD HEIGHTS
          </div>
          <h1
            style={{
              fontSize: "2.2rem",
              color: colors.dark,
              margin: 0,
              fontWeight: 700,
            }}
          >
            A Community Designed Around the{" "}
            <span style={{ color: colors.primary }}>Human Rhythm</span>
          </h1>
        </div>

        {/* Visual Story: Problem → Solution */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gap: "30px",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          {/* LEFT: The Challenge */}
          <div
            style={{
              backgroundColor: "#f8f4f0",
              borderRadius: "20px",
              padding: "30px",
              textAlign: "center",
              border: "2px solid #e0d6cc",
            }}
          >
            <div
              style={{
                fontSize: "3rem",
                marginBottom: "15px",
                filter: "grayscale(50%)",
              }}
            >
              😔
            </div>
            <div
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: colors.dark,
                marginBottom: "15px",
              }}
            >
              Modern Life
            </div>

            {/* Visual representation of fragmentation */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "8px",
                marginBottom: "20px",
                flexWrap: "wrap",
              }}
            >
              {["😰", "📱", "🏃‍♂️", "😴", "🍔", "💼"].map((emoji, i) => (
                <div
                  key={i}
                  style={{
                    width: "45px",
                    height: "45px",
                    backgroundColor: "#e8e0d8",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.3rem",
                    transform: `rotate(${(i - 2.5) * 8}deg)`,
                    opacity: 0.7,
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {[
                "Cognitive Overload",
                "Isolation",
                "Lifestyle Fragmentation",
              ].map((text, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: "0.8rem",
                    color: "#888",
                    padding: "6px 12px",
                    backgroundColor: "#fff",
                    borderRadius: "15px",
                  }}
                >
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* CENTER: Arrow transformation */}
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
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: colors.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "1.8rem",
                boxShadow: "0 4px 20px rgba(45, 90, 74, 0.4)",
              }}
            >
              →
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: colors.primary,
                letterSpacing: "2px",
                textAlign: "center",
              }}
            >
              CDMR™
            </div>
          </div>

          {/* RIGHT: The Solution */}
          <div
            style={{
              backgroundColor: colors.light,
              borderRadius: "20px",
              padding: "30px",
              textAlign: "center",
              border: `2px solid ${colors.primary}`,
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "15px" }}>🏡</div>
            <div
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: colors.dark,
                marginBottom: "15px",
              }}
            >
              Silverwood Heights
            </div>

            {/* 4 Pillars in harmony */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              {[
                { emoji: "🤝", color: colors.connection },
                { emoji: "🔍", color: colors.discovery },
                { emoji: "🏃", color: colors.movement },
                { emoji: "😌", color: colors.rest },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: item.color,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.4rem",
                    boxShadow: `0 3px 10px ${item.color}50`,
                  }}
                >
                  {item.emoji}
                </div>
              ))}
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {[
                "Daily Operating System",
                "Human-Centered Design",
                "Thriving Communities",
              ].map((text, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: "0.8rem",
                    color: colors.primary,
                    fontWeight: 600,
                    padding: "6px 12px",
                    backgroundColor: "#fff",
                    borderRadius: "15px",
                  }}
                >
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Site Overview Visual */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: "20px",
            padding: "25px",
            backgroundColor: colors.primary,
            borderRadius: "16px",
            color: "#fff",
          }}
        >
          {[
            { value: "93", unit: "Acres", label: "Total Site", icon: "🏞️" },
            {
              value: "40",
              unit: "Acres",
              label: "Preserved Open Space",
              icon: "🌳",
            },
            { value: "43%", unit: "", label: "Conservation", icon: "♻️" },
            {
              value: "180",
              unit: "Homes",
              label: "Thoughtfully Placed",
              icon: "🏠",
            },
          ].map((stat, idx) => (
            <div key={idx} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "5px" }}>
                {stat.icon}
              </div>
              <div style={{ fontSize: "2rem", fontWeight: 700 }}>
                {stat.value}
                <span style={{ fontSize: "1rem", opacity: 0.8 }}>
                  {stat.unit && ` ${stat.unit}`}
                </span>
              </div>
              <div style={{ fontSize: "0.75rem", opacity: 0.85 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <div style={{ textAlign: "center", marginTop: "25px" }}>
          <p
            style={{
              fontSize: "1.1rem",
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
          minHeight: "600px",
        }}
      >
        <DownloadButton
          sectionRef={slide2Ref}
          filename="cdmr-slide-2-pillars"
        />

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "6px 20px",
              backgroundColor: colors.primary,
              color: "#fff",
              borderRadius: "20px",
              fontSize: "0.75rem",
              letterSpacing: "2px",
            }}
          >
            THE FOUR PILLARS
          </div>
        </div>

        {/* 4 Pillars - Visual Cards */}
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
              icon: "🤝",
              color: colors.connection,
              visual: "👨‍👩‍👧‍👦",
              scene: ["🏠", "💬", "☕", "👋"],
              benefit: "Oxytocin ↑ Trust ↑",
            },
            {
              name: "Discovery",
              icon: "🔍",
              color: colors.discovery,
              visual: "🌿",
              scene: ["🥾", "🍇", "🦋", "🌸"],
              benefit: "Dopamine ↑ Curiosity ↑",
            },
            {
              name: "Movement",
              icon: "🏃",
              color: colors.movement,
              visual: "🚴",
              scene: ["🏸", "🚶", "🧘", "⛳"],
              benefit: "Myokines ↑ Energy ↑",
            },
            {
              name: "Rest",
              icon: "😌",
              color: colors.rest,
              visual: "🧘‍♀️",
              scene: ["💧", "🌙", "📖", "🛋️"],
              benefit: "Cortisol ↓ Focus ↑",
            },
          ].map((pillar, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#fff",
                borderRadius: "16px",
                overflow: "hidden",
                border: `3px solid ${pillar.color}`,
                boxShadow: `0 4px 15px ${pillar.color}30`,
              }}
            >
              {/* Top visual scene */}
              <div
                style={{
                  backgroundColor: `${pillar.color}15`,
                  padding: "20px",
                  textAlign: "center",
                  borderBottom: `2px solid ${pillar.color}30`,
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "10px" }}>
                  {pillar.visual}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  {pillar.scene.map((emoji, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: "1.3rem",
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        padding: "5px",
                      }}
                    >
                      {emoji}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom info */}
              <div style={{ padding: "15px", textAlign: "center" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: pillar.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1rem",
                    }}
                  >
                    {pillar.icon}
                  </span>
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      color: colors.dark,
                    }}
                  >
                    {pillar.name}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: pillar.color,
                    fontWeight: 600,
                    backgroundColor: `${pillar.color}15`,
                    padding: "4px 10px",
                    borderRadius: "10px",
                    display: "inline-block",
                  }}
                >
                  {pillar.benefit}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Daily Rhythm Timeline */}
        <div
          style={{
            backgroundColor: colors.light,
            borderRadius: "16px",
            padding: "20px 30px",
            marginBottom: "20px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "15px" }}>
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: colors.primary,
                letterSpacing: "1px",
              }}
            >
              A DAY AT SILVERWOOD HEIGHTS
            </span>
          </div>

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
                activities: "🥾 Trail Walk",
                color: colors.movement,
              },
              {
                time: "Midday",
                icon: "☀️",
                activities: "💬 Community",
                color: colors.connection,
              },
              {
                time: "Afternoon",
                icon: "🌤️",
                activities: "🔍 Explore",
                color: colors.discovery,
              },
              {
                time: "Evening",
                icon: "🌙",
                activities: "😌 Restore",
                color: colors.rest,
              },
            ].map((period, idx) => (
              <React.Fragment key={idx}>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: "2rem", marginBottom: "5px" }}>
                    {period.icon}
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      color: colors.dark,
                    }}
                  >
                    {period.time}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: period.color,
                      fontWeight: 600,
                      marginTop: "5px",
                    }}
                  >
                    {period.activities}
                  </div>
                </div>
                {idx < 3 && (
                  <div
                    style={{
                      width: "60px",
                      height: "3px",
                      background: `linear-gradient(90deg, ${[colors.movement, colors.connection, colors.discovery, colors.rest][idx]}, ${[colors.movement, colors.connection, colors.discovery, colors.rest][idx + 1]})`,
                      borderRadius: "2px",
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Footer: Summary + Copyright */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px 20px",
            backgroundColor: colors.primary,
            borderRadius: "12px",
            color: "#fff",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            {["🤝", "🔍", "🏃", "😌"].map((emoji, i) => (
              <span key={i} style={{ fontSize: "1.3rem" }}>
                {emoji}
              </span>
            ))}
            <span style={{ fontSize: "0.85rem", opacity: 0.9 }}>
              Connection grounds • Discovery inspires • Movement sustains • Rest
              restores
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              borderLeft: "1px solid rgba(255,255,255,0.3)",
              paddingLeft: "15px",
            }}
          >
            <span style={{ fontSize: "0.7rem", opacity: 0.8 }}>©</span>
            <span style={{ fontSize: "0.7rem" }}>
              <strong>CDMR™</strong> MOR Studio
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
