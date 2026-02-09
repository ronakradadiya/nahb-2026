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
  danger: "#A85454",
  blue: "#4A90A4",
  // CDMR specific colors
  connection: "#E85D75", // Warm coral
  discovery: "#4A90A4", // Blue
  movement: "#4A7C59", // Green
  rest: "#8B6DB3", // Purple
};

// ============================================
// CDMR DATA
// ============================================

const cdmrPillars = [
  {
    id: "connection",
    name: "Connection",
    icon: "🤝",
    color: colors.connection,
    tagline: "Neighbors recognize one another by design",
    score: 90,
    features: [
      "Front porches & shallow setbacks",
      "Shared kitchens & cowork lounges",
      "Central loop circulation",
      "Clear sightlines & lighting",
    ],
    benefit: "Fosters familiarity & trust",
  },
  {
    id: "discovery",
    name: "Discovery",
    icon: "🔍",
    color: colors.discovery,
    tagline: "Dopamine is earned, not consumed",
    score: 95,
    features: [
      "40 acres preserved green space",
      "Trail narrative sequences",
      "Edible landscape integration",
      "Pocket overlooks & pause points",
    ],
    benefit: "Encourages exploration & curiosity",
  },
  {
    id: "movement",
    name: "Movement",
    icon: "🏃",
    color: colors.movement,
    tagline: "Everyday motion without exercise pressure",
    score: 85,
    features: [
      "5-15 min loop trails",
      "Pickleball along circulation",
      "Playgrounds on pathways",
      "Flex spaces in units",
    ],
    benefit: "Movement becomes ambient",
  },
  {
    id: "rest",
    name: "Rest",
    icon: "😌",
    color: colors.rest,
    tagline: "Active nervous-system recovery",
    score: 88,
    features: [
      "High ceilings & clerestories",
      "Natural material palettes",
      "Water features & rain gardens",
      "Quiet zones & sound control",
    ],
    benefit: "Restores without instruction",
  },
];

// Radar chart data
const radarData = cdmrPillars.map((p) => ({
  pillar: p.name,
  score: p.score,
  fullMark: 100,
}));

// Site allocation data
const siteAllocationData = [
  { name: "Preserved Open Space", value: 40, color: colors.success },
  { name: "Developed Area", value: 53, color: colors.primary },
];

// Edible landscape data
const edibleLandscapeData = [
  {
    name: "Mulberry",
    icon: "🫐",
    benefit: "Cross-generational engagement",
    maintenance: "Low",
  },
  {
    name: "Pomegranate",
    icon: "🍎",
    benefit: "Mood support & sensory",
    maintenance: "Low",
  },
  {
    name: "Grapes",
    icon: "🍇",
    benefit: "Shade & movement incentive",
    maintenance: "Low",
  },
  {
    name: "Citrus",
    icon: "🍊",
    benefit: "Cortisol modulation",
    maintenance: "Medium",
  },
  {
    name: "Strawberries",
    icon: "🍓",
    benefit: "High family engagement",
    maintenance: "Medium",
  },
];

// ============================================
// COMPONENTS
// ============================================

// Download Button
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
        logging: false,
      });
      const link = document.createElement("a");
      link.download = `${filename}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Download failed:", error);
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
        display: "flex",
        alignItems: "center",
        gap: "6px",
        zIndex: 10,
      }}
    >
      {downloading ? "⏳ Saving..." : "📥 Download PNG"}
    </button>
  );
};

// Chart Box with download
const ChartBox = ({ children, title, filename }) => {
  const chartRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!chartRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: "#fff",
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement("a");
      link.download = `${filename}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div
      ref={chartRef}
      style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "25px",
        boxShadow: "0 4px 20px rgba(45, 90, 74, 0.1)",
        position: "relative",
      }}
    >
      <button
        onClick={handleDownload}
        disabled={downloading}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          padding: "6px 12px",
          backgroundColor: downloading ? colors.accent : colors.primary,
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: downloading ? "wait" : "pointer",
          fontSize: "0.7rem",
          fontWeight: 600,
          zIndex: 10,
        }}
      >
        {downloading ? "⏳" : "📥"}
      </button>
      {title && (
        <h3
          style={{
            color: colors.primary,
            marginBottom: "15px",
            fontSize: "1.1rem",
            paddingRight: "40px",
          }}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

// CDMR Pillar Card
const CDMRCard = ({ pillar }) => (
  <div
    style={{
      backgroundColor: "#fff",
      borderRadius: "16px",
      padding: "25px",
      borderTop: `6px solid ${pillar.color}`,
      boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "12px",
      }}
    >
      <div
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: pillar.color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
        }}
      >
        {pillar.icon}
      </div>
      <div>
        <h3 style={{ margin: 0, fontSize: "1.3rem", color: colors.dark }}>
          {pillar.name}
        </h3>
        <div
          style={{
            fontSize: "0.75rem",
            color: pillar.color,
            fontWeight: 600,
            backgroundColor: `${pillar.color}15`,
            padding: "2px 8px",
            borderRadius: "4px",
            display: "inline-block",
            marginTop: "4px",
          }}
        >
          Score: {pillar.score}/100
        </div>
      </div>
    </div>

    <p
      style={{
        fontSize: "0.9rem",
        fontStyle: "italic",
        color: pillar.color,
        marginBottom: "15px",
        fontWeight: 500,
      }}
    >
      "{pillar.tagline}"
    </p>

    <div style={{ flex: 1 }}>
      {pillar.features.map((feature, idx) => (
        <div
          key={idx}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "8px",
            fontSize: "0.85rem",
            color: colors.dark,
          }}
        >
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: pillar.color,
            }}
          />
          {feature}
        </div>
      ))}
    </div>

    <div
      style={{
        marginTop: "15px",
        padding: "12px",
        backgroundColor: `${pillar.color}10`,
        borderRadius: "8px",
        borderLeft: `4px solid ${pillar.color}`,
      }}
    >
      <div style={{ fontSize: "0.8rem", fontWeight: 600, color: pillar.color }}>
        ✓ {pillar.benefit}
      </div>
    </div>
  </div>
);

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
      {/* ==================== SLIDE 1 ==================== */}
      <section
        ref={slide1Ref}
        style={{
          marginBottom: "50px",
          position: "relative",
          backgroundColor: colors.light,
          padding: "10px",
          borderRadius: "12px",
        }}
      >
        <DownloadButton sectionRef={slide1Ref} filename="cdmr-slide-1" />

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "8px 20px",
              backgroundColor: colors.primary,
              color: "#fff",
              borderRadius: "20px",
              fontSize: "0.8rem",
              letterSpacing: "2px",
              marginBottom: "15px",
            }}
          >
            CDMR™ FRAMEWORK
          </div>
          <h1
            style={{ fontSize: "2rem", color: colors.dark, margin: "10px 0" }}
          >
            A Community Designed Around the Human Rhythm
          </h1>
          <p
            style={{
              fontSize: "1rem",
              color: colors.secondary,
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Connection grounds • Discovery inspires • Movement sustains • Rest
            restores
          </p>
        </div>

        {/* Key Stats Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "15px",
            marginBottom: "30px",
          }}
        >
          {[
            {
              label: "Total Site",
              value: "93",
              unit: "Acres",
              icon: "🏞️",
              color: colors.primary,
            },
            {
              label: "Preserved Open",
              value: "40",
              unit: "Acres",
              icon: "🌳",
              color: colors.success,
            },
            {
              label: "Conservation",
              value: "43%",
              unit: "of Site",
              icon: "♻️",
              color: colors.blue,
            },
            {
              label: "Pillars",
              value: "4",
              unit: "CDMR",
              icon: "🎯",
              color: colors.warning,
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                borderBottom: `4px solid ${stat.color}`,
              }}
            >
              <div style={{ fontSize: "1.8rem", marginBottom: "5px" }}>
                {stat.icon}
              </div>
              <div
                style={{ fontSize: "2rem", fontWeight: 700, color: stat.color }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "0.85rem", color: colors.secondary }}>
                {stat.unit}
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: colors.dark,
                  marginTop: "4px",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CDMR 4 Pillars Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginBottom: "25px",
          }}
        >
          {cdmrPillars.map((pillar) => (
            <CDMRCard key={pillar.id} pillar={pillar} />
          ))}
        </div>

        {/* Central Visualization: Radar Chart + Site Allocation */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <ChartBox title="CDMR™ Integration Score" filename="cdmr-radar">
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={radarData}>
                <PolarGrid stroke={colors.accent} />
                <PolarAngleAxis
                  dataKey="pillar"
                  tick={{ fill: colors.dark, fontSize: 12 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={{ fontSize: 10 }}
                />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke={colors.primary}
                  fill={colors.primary}
                  fillOpacity={0.5}
                  strokeWidth={3}
                />
              </RadarChart>
            </ResponsiveContainer>
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <span
                style={{
                  backgroundColor: colors.success,
                  color: "#fff",
                  padding: "6px 16px",
                  borderRadius: "20px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                Average Score:{" "}
                {Math.round(cdmrPillars.reduce((s, p) => s + p.score, 0) / 4)}%
              </span>
            </div>
          </ChartBox>

          <ChartBox
            title="Site Allocation (93 Acres)"
            filename="site-allocation"
          >
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={siteAllocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${(percent * 100).toFixed(0)}%`
                  }
                >
                  {siteAllocationData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `${v} acres`} />
              </PieChart>
            </ResponsiveContainer>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "25px",
                marginTop: "15px",
              }}
            >
              {siteAllocationData.map((item, i) => (
                <div
                  key={i}
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      backgroundColor: item.color,
                      borderRadius: "3px",
                    }}
                  />
                  <span style={{ fontSize: "0.85rem", color: colors.dark }}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: "20px",
                padding: "12px",
                backgroundColor: "#E8F5E9",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: colors.success,
                }}
              >
                🌿 40 Acres Preserved = River Frontage + Trails + Detention Pond
              </div>
            </div>
          </ChartBox>
        </div>
      </section>

      {/* ==================== SLIDE 2 ==================== */}
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

        {/* Header */}
        <h2
          style={{
            fontSize: "1.5rem",
            color: colors.dark,
            marginBottom: "20px",
            borderLeft: `4px solid ${colors.secondary}`,
            paddingLeft: "15px",
            paddingRight: "120px",
          }}
        >
          CDMR™ Implementation Strategy
        </h2>

        {/* Edible Landscape + Value Proposition */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginBottom: "25px",
          }}
        >
          {/* Edible Landscape */}
          <ChartBox
            title="🌱 Discovery: Edible Landscape Strategy"
            filename="edible-landscape"
          >
            <p
              style={{
                fontSize: "0.8rem",
                color: colors.secondary,
                marginBottom: "15px",
              }}
            >
              Low-maintenance plants supporting mental health through daily
              micro-rituals
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {edibleLandscapeData.map((plant, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 15px",
                    backgroundColor: idx % 2 === 0 ? colors.light : "#fff",
                    borderRadius: "8px",
                    borderLeft: `4px solid ${colors.discovery}`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span style={{ fontSize: "1.3rem" }}>{plant.icon}</span>
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "0.9rem",
                          color: colors.dark,
                        }}
                      >
                        {plant.name}
                      </div>
                      <div
                        style={{ fontSize: "0.75rem", color: colors.secondary }}
                      >
                        {plant.benefit}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      padding: "3px 8px",
                      borderRadius: "4px",
                      backgroundColor:
                        plant.maintenance === "Low" ? "#E8F5E9" : "#FFF8E1",
                      color:
                        plant.maintenance === "Low"
                          ? colors.success
                          : colors.warning,
                      fontWeight: 600,
                    }}
                  >
                    {plant.maintenance}
                  </div>
                </div>
              ))}
            </div>
          </ChartBox>

          {/* Value Proposition */}
          <ChartBox title="📊 CDMR™ Value Drivers" filename="cdmr-value">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {[
                {
                  icon: "🎯",
                  title: "Reduces Friction",
                  desc: "Spatial strategies minimize daily life obstacles",
                  color: colors.connection,
                },
                {
                  icon: "💚",
                  title: "Increases Attachment",
                  desc: "Residents bond to place through lived experience",
                  color: colors.discovery,
                },
                {
                  icon: "📈",
                  title: "Stabilizes Performance",
                  desc: "Higher retention, lower vacancy, premium pricing",
                  color: colors.movement,
                },
                {
                  icon: "🔄",
                  title: "Repeatable Model",
                  desc: "Framework scales across future developments",
                  color: colors.rest,
                },
                {
                  icon: "🌿",
                  title: "Conservation = Value",
                  desc: "40 acres preserved becomes marketing differentiator",
                  color: colors.success,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    padding: "14px",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    borderLeft: `5px solid ${item.color}`,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                  }}
                >
                  <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        color: colors.dark,
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{ fontSize: "0.8rem", color: colors.secondary }}
                    >
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ChartBox>
        </div>

        {/* Daily Operating System Visual */}
        <ChartBox
          title="🏠 From Housing to Daily Operating System"
          filename="daily-operating-system"
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
            }}
          >
            {[
              {
                time: "Morning",
                icon: "🌅",
                activities: [
                  "Trail walk",
                  "Clerestory light",
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
                  "Shaded pathways",
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
                pillar: "Discovery + Movement",
                color: colors.discovery,
              },
              {
                time: "Evening",
                icon: "🌙",
                activities: ["Water features", "Quiet zones", "Porch sitting"],
                pillar: "Rest + Connection",
                color: colors.rest,
              },
            ].map((period, idx) => (
              <div
                key={idx}
                style={{
                  textAlign: "center",
                  padding: "20px",
                  backgroundColor: colors.light,
                  borderRadius: "12px",
                  borderTop: `4px solid ${period.color}`,
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "8px" }}>
                  {period.icon}
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: colors.dark,
                    marginBottom: "8px",
                  }}
                >
                  {period.time}
                </div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: period.color,
                    fontWeight: 600,
                    marginBottom: "12px",
                    backgroundColor: `${period.color}15`,
                    padding: "3px 8px",
                    borderRadius: "4px",
                    display: "inline-block",
                  }}
                >
                  {period.pillar}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  {period.activities.map((activity, i) => (
                    <div
                      key={i}
                      style={{
                        fontSize: "0.8rem",
                        color: colors.dark,
                        padding: "6px",
                        backgroundColor: "#fff",
                        borderRadius: "6px",
                      }}
                    >
                      {activity}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ChartBox>

        {/* Summary Bar */}
        <div
          style={{
            marginTop: "25px",
            padding: "20px 30px",
            backgroundColor: colors.primary,
            borderRadius: "12px",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ maxWidth: "60%" }}>
            <h4 style={{ margin: "0 0 8px", fontSize: "1.1rem" }}>
              ✅ CDMR™ Completes Traditional Planning
            </h4>
            <p style={{ margin: 0, fontSize: "0.85rem", opacity: 0.9 }}>
              Market feasibility + Human biology + Land stewardship aligned in a
              single, coherent development logic. Silverwood Heights delivers{" "}
              <strong>financial performance</strong> and{" "}
              <strong>human stability</strong> over the long term.
            </p>
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            {cdmrPillars.map((p, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    backgroundColor: p.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.3rem",
                    margin: "0 auto 5px",
                  }}
                >
                  {p.icon}
                </div>
                <div style={{ fontSize: "0.7rem", opacity: 0.9 }}>{p.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright Notice */}
        <div
          style={{
            marginTop: "25px",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            border: `1px solid ${colors.accent}`,
          }}
        >
          <div
            style={{ display: "flex", alignItems: "flex-start", gap: "15px" }}
          >
            <div
              style={{
                fontSize: "1.5rem",
                padding: "10px",
                backgroundColor: colors.light,
                borderRadius: "8px",
              }}
            >
              ©
            </div>
            <div>
              <h4
                style={{
                  margin: "0 0 8px",
                  color: colors.dark,
                  fontSize: "0.95rem",
                }}
              >
                Intellectual Property & Use Notice
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.8rem",
                  color: colors.secondary,
                  lineHeight: 1.6,
                }}
              >
                <strong>CDMR™</strong>, including its methodology, terminology,
                structure, assessment logic, and underlying framework, is the{" "}
                <strong>exclusive intellectual property of MOR Studio</strong>.
                No ownership rights are transferred through the provision of
                CDMR™ Assessments or related materials. Materials may be shared
                internally with the project team solely for the purpose of
                evaluating, planning, and advancing this specific project.
              </p>
              <div
                style={{
                  marginTop: "12px",
                  padding: "10px 15px",
                  backgroundColor: colors.light,
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: "0.8rem", color: colors.dark }}>
                  <strong>MOR Studio</strong> | Scottsdale, AZ
                </span>
                <span style={{ fontSize: "0.75rem", color: colors.secondary }}>
                  www.morstudio.net | info@morstudio.net
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
