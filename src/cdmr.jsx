import React, { useState, useRef } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
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
  warning: "#C9A227",
  connection: "#E85D75",
  discovery: "#4A90A4",
  movement: "#4A7C59",
  rest: "#8B6DB3",
};

// ============================================
// CDMR DATA
// ============================================

const cdmrPillars = [
  {
    name: "Connection",
    icon: "🤝",
    color: colors.connection,
    score: 90,
    tagline: "Neighbors recognize one another by design",
    features: [
      "Front porches & shallow setbacks",
      "Shared kitchens & cowork lounges",
      "Central loop circulation",
      "Clear sightlines & lighting",
    ],
  },
  {
    name: "Discovery",
    icon: "🔍",
    color: colors.discovery,
    score: 95,
    tagline: "Dopamine earned, not consumed",
    features: [
      "40 acres preserved green space",
      "Trail narrative sequences",
      "Edible landscape integration",
      "Pocket overlooks & pause points",
    ],
  },
  {
    name: "Movement",
    icon: "🏃",
    color: colors.movement,
    score: 85,
    tagline: "Everyday motion without pressure",
    features: [
      "5-15 min loop trails",
      "Pickleball along circulation",
      "Playgrounds on pathways",
      "Flex spaces in units",
    ],
  },
  {
    name: "Rest",
    icon: "😌",
    color: colors.rest,
    score: 88,
    tagline: "Active nervous-system recovery",
    features: [
      "High ceilings & clerestories",
      "Natural material palettes",
      "Water features & rain gardens",
      "Quiet zones & sound control",
    ],
  },
];

const radarData = cdmrPillars.map((p) => ({ pillar: p.name, score: p.score }));

const siteData = [
  { name: "Preserved", value: 40, color: colors.success },
  { name: "Developed", value: 53, color: colors.primary },
];

const ediblePlants = [
  { name: "Mulberry", icon: "🫐", benefit: "Cross-generational" },
  { name: "Pomegranate", icon: "🍎", benefit: "Mood support" },
  { name: "Grapes", icon: "🍇", benefit: "Shade & movement" },
  { name: "Citrus", icon: "🍊", benefit: "Cortisol regulation" },
  { name: "Strawberries", icon: "🍓", benefit: "Family engagement" },
];

// ============================================
// COMPONENTS
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
        backgroundColor: colors.light,
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
        top: "10px",
        right: "15px",
        padding: "8px 16px",
        backgroundColor: downloading ? colors.accent : colors.primary,
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: downloading ? "wait" : "pointer",
        fontSize: "0.8rem",
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
        minHeight: "100vh",
      }}
    >
      {/* ==================== SLIDE 1: Framework Overview ==================== */}
      <section
        ref={slide1Ref}
        style={{
          marginBottom: "40px",
          position: "relative",
          backgroundColor: colors.light,
          padding: "10px",
          borderRadius: "12px",
        }}
      >
        <DownloadButton sectionRef={slide1Ref} filename="cdmr-slide-1" />

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "6px 16px",
              backgroundColor: colors.primary,
              color: "#fff",
              borderRadius: "20px",
              fontSize: "0.75rem",
              letterSpacing: "2px",
              marginBottom: "10px",
            }}
          >
            CDMR™ FRAMEWORK
          </div>
          <h1
            style={{ fontSize: "1.6rem", color: colors.dark, margin: "8px 0" }}
          >
            A Community Designed Around the Human Rhythm
          </h1>
          <p
            style={{ fontSize: "0.85rem", color: colors.secondary, margin: 0 }}
          >
            93 Acres Total | 40 Acres Preserved | Lilburn, Georgia
          </p>
        </div>

        {/* 4 Pillars Grid with Features */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "15px",
            marginBottom: "20px",
          }}
        >
          {cdmrPillars.map((pillar) => (
            <div
              key={pillar.name}
              style={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                padding: "15px",
                borderTop: `4px solid ${pillar.color}`,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "8px",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: pillar.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.1rem",
                  }}
                >
                  {pillar.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      color: colors.dark,
                    }}
                  >
                    {pillar.name}
                  </div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      color: pillar.color,
                      fontWeight: 600,
                    }}
                  >
                    {pillar.score}%
                  </div>
                </div>
              </div>
              <p
                style={{
                  margin: "0 0 10px",
                  fontSize: "0.75rem",
                  color: colors.secondary,
                  fontStyle: "italic",
                }}
              >
                "{pillar.tagline}"
              </p>
              <div
                style={{
                  borderTop: `1px solid ${colors.light}`,
                  paddingTop: "8px",
                }}
              >
                {pillar.features.map((f, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: "0.7rem",
                      color: colors.dark,
                      marginBottom: "4px",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span style={{ color: pillar.color }}>•</span> {f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Row: Radar + Site Allocation + Value Props */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1.5fr",
            gap: "15px",
          }}
        >
          {/* Radar Chart */}
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "15px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <h4
              style={{
                color: colors.primary,
                margin: "0 0 8px",
                fontSize: "0.85rem",
                textAlign: "center",
              }}
            >
              Integration Score
            </h4>
            <ResponsiveContainer width="100%" height={150}>
              <RadarChart data={radarData}>
                <PolarGrid stroke={colors.accent} />
                <PolarAngleAxis
                  dataKey="pillar"
                  tick={{ fill: colors.dark, fontSize: 9 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={{ fontSize: 8 }}
                />
                <Radar
                  dataKey="score"
                  stroke={colors.primary}
                  fill={colors.primary}
                  fillOpacity={0.5}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
            <div style={{ textAlign: "center" }}>
              <span
                style={{
                  backgroundColor: colors.success,
                  color: "#fff",
                  padding: "3px 10px",
                  borderRadius: "10px",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                }}
              >
                Avg:{" "}
                {Math.round(cdmrPillars.reduce((s, p) => s + p.score, 0) / 4)}%
              </span>
            </div>
          </div>

          {/* Site Allocation */}
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "15px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <h4
              style={{
                color: colors.primary,
                margin: "0 0 8px",
                fontSize: "0.85rem",
                textAlign: "center",
              }}
            >
              Site Allocation
            </h4>
            <ResponsiveContainer width="100%" height={120}>
              <PieChart>
                <Pie
                  data={siteData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={45}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {siteData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `${v} acres`} />
              </PieChart>
            </ResponsiveContainer>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "12px",
                marginTop: "8px",
              }}
            >
              {siteData.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "0.65rem",
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      backgroundColor: item.color,
                      borderRadius: "2px",
                    }}
                  />
                  <span>
                    {item.name}: {item.value}ac
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Value Proposition */}
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "15px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <h4
              style={{
                color: colors.primary,
                margin: "0 0 10px",
                fontSize: "0.85rem",
              }}
            >
              CDMR™ Value Proposition
            </h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
              }}
            >
              {[
                {
                  icon: "🎯",
                  text: "Reduces Friction",
                  sub: "Spatial strategies",
                },
                {
                  icon: "💚",
                  text: "Increases Attachment",
                  sub: "Lived experience",
                },
                {
                  icon: "📈",
                  text: "Stabilizes Performance",
                  sub: "Retention & pricing",
                },
                {
                  icon: "🔄",
                  text: "Repeatable Model",
                  sub: "Future developments",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px",
                    backgroundColor: colors.light,
                    borderRadius: "6px",
                  }}
                >
                  <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                  <div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: colors.dark,
                      }}
                    >
                      {item.text}
                    </div>
                    <div
                      style={{ fontSize: "0.6rem", color: colors.secondary }}
                    >
                      {item.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SLIDE 2: Implementation ==================== */}
      <section
        ref={slide2Ref}
        style={{
          marginBottom: "30px",
          position: "relative",
          backgroundColor: colors.light,
          padding: "10px",
          borderRadius: "12px",
        }}
      >
        <DownloadButton sectionRef={slide2Ref} filename="cdmr-slide-2" />

        <h2
          style={{
            fontSize: "1.2rem",
            color: colors.dark,
            marginBottom: "20px",
            borderLeft: `4px solid ${colors.secondary}`,
            paddingLeft: "12px",
            paddingRight: "100px",
          }}
        >
          CDMR™ Implementation: Daily Operating System
        </h2>

        {/* Daily Rhythm + Edible Landscape */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          {/* Daily Operating System */}
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <h4
              style={{
                color: colors.primary,
                margin: "0 0 15px",
                fontSize: "0.9rem",
              }}
            >
              From Housing to Daily Operating System
            </h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "12px",
              }}
            >
              {[
                {
                  time: "Morning",
                  icon: "🌅",
                  activities: [
                    "Trail walk",
                    "Natural light",
                    "Community coffee",
                  ],
                  pillar: "Movement + Rest",
                  color: colors.movement,
                },
                {
                  time: "Midday",
                  icon: "☀️",
                  activities: [
                    "Cowork lounge",
                    "Shaded paths",
                    "Chance encounters",
                  ],
                  pillar: "Connection",
                  color: colors.connection,
                },
                {
                  time: "Afternoon",
                  icon: "🌤️",
                  activities: [
                    "Playground nodes",
                    "Edible harvest",
                    "Pickleball",
                  ],
                  pillar: "Discovery",
                  color: colors.discovery,
                },
                {
                  time: "Evening",
                  icon: "🌙",
                  activities: [
                    "Water features",
                    "Quiet zones",
                    "Porch sitting",
                  ],
                  pillar: "Rest",
                  color: colors.rest,
                },
              ].map((period, idx) => (
                <div
                  key={idx}
                  style={{
                    textAlign: "center",
                    padding: "12px 8px",
                    backgroundColor: colors.light,
                    borderRadius: "8px",
                    borderTop: `3px solid ${period.color}`,
                  }}
                >
                  <div style={{ fontSize: "1.4rem", marginBottom: "5px" }}>
                    {period.icon}
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      color: colors.dark,
                    }}
                  >
                    {period.time}
                  </div>
                  <div
                    style={{
                      fontSize: "0.6rem",
                      color: period.color,
                      fontWeight: 600,
                      marginBottom: "8px",
                    }}
                  >
                    {period.pillar}
                  </div>
                  {period.activities.map((a, i) => (
                    <div
                      key={i}
                      style={{
                        fontSize: "0.65rem",
                        color: colors.dark,
                        padding: "3px 0",
                      }}
                    >
                      {a}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Edible Landscape */}
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <h4
              style={{
                color: colors.primary,
                margin: "0 0 12px",
                fontSize: "0.9rem",
              }}
            >
              🌱 Edible Landscape
            </h4>
            <p
              style={{
                fontSize: "0.7rem",
                color: colors.secondary,
                margin: "0 0 12px",
              }}
            >
              Low-maintenance plants for daily micro-rituals
            </p>
            {ediblePlants.map((plant, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px",
                  backgroundColor: idx % 2 === 0 ? colors.light : "#fff",
                  borderRadius: "6px",
                  marginBottom: "4px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span style={{ fontSize: "1rem" }}>{plant.icon}</span>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: colors.dark,
                    }}
                  >
                    {plant.name}
                  </span>
                </div>
                <span style={{ fontSize: "0.65rem", color: colors.secondary }}>
                  {plant.benefit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Bar */}
        <div
          style={{
            padding: "15px 25px",
            backgroundColor: colors.primary,
            borderRadius: "10px",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <div style={{ maxWidth: "65%" }}>
            <h4 style={{ margin: "0 0 5px", fontSize: "0.95rem" }}>
              ✅ CDMR™ Completes Traditional Planning
            </h4>
            <p style={{ margin: 0, fontSize: "0.75rem", opacity: 0.9 }}>
              Market feasibility + Human biology + Land stewardship aligned.
              Delivers <strong>financial performance</strong> and{" "}
              <strong>human stability</strong>.
            </p>
          </div>
          <div style={{ display: "flex", gap: "15px" }}>
            {cdmrPillars.map((p, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    backgroundColor: p.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    margin: "0 auto 4px",
                  }}
                >
                  {p.icon}
                </div>
                <div style={{ fontSize: "0.6rem", opacity: 0.9 }}>{p.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            padding: "12px 20px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            border: `1px solid ${colors.accent}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "1rem" }}>©</span>
            <span style={{ fontSize: "0.75rem", color: colors.dark }}>
              <strong>CDMR™</strong> is the exclusive intellectual property of{" "}
              <strong>MOR Studio</strong>. All rights reserved.
            </span>
          </div>
          <span style={{ fontSize: "0.7rem", color: colors.secondary }}>
            www.morstudio.net
          </span>
        </div>
      </section>
    </div>
  );
}
