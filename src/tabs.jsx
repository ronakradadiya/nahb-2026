import React, { useState } from "react";
import MarketingAnalysis from "./marketing-analysis";
import Demographics from "./demographics";
import ProjectManagement from "./project-management";

// Color palette - earthy sage tones
const colors = {
  bone: "#EBE3D2",
  dun: "#CCBFA3",
  sage: "#A4AC86",
  reseda: "#737A5D",
  ebony: "#414833",
};

export default function NAHBDashboard() {
  const [activeTab, setActiveTab] = useState("sales");

  return (
    <div
      style={{
        fontFamily: "'Georgia', serif",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <header
        style={{
          background: `linear-gradient(135deg, ${colors.ebony} 0%, ${colors.reseda} 100%)`,
          color: "#fff",
          padding: "30px 40px",
          borderBottom: `4px solid ${colors.sage}`,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <div
            style={{
              fontSize: "0.85rem",
              letterSpacing: "4px",
              color: colors.sage,
              marginBottom: "8px",
              textTransform: "uppercase",
            }}
          >
            NAHB Student Competition 2025
          </div>
          <h1
            style={{
              fontSize: "2.4rem",
              margin: 0,
              fontWeight: 700,
              letterSpacing: "1px",
            }}
          >
            LILBURN RESIDENTIAL DEVELOPMENT
          </h1>
          <p style={{ margin: "8px 0 0", fontSize: "1rem", opacity: 0.8 }}>
            Gwinnett County, Georgia
          </p>
        </div>

        {/* Tab Navigation */}
        <nav style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
          {[
            { id: "sales", label: "Sales & Marketing Analysis", icon: "📊" },
            { id: "demographics", label: "Demographics", icon: "👥" },
            { id: "project", label: "Project Management", icon: "🏗️" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "14px 28px",
                backgroundColor:
                  activeTab === tab.id ? colors.sage : "transparent",
                color: activeTab === tab.id ? colors.ebony : colors.bone,
                border: `2px solid ${
                  activeTab === tab.id ? colors.sage : "rgba(255,255,255,0.3)"
                }`,
                borderRadius: "8px",
                cursor: "pointer",
                fontFamily: "'Georgia', serif",
                fontSize: "1rem",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "10px",
                transition: "all 0.3s ease",
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Area */}
      <main style={{ padding: "40px" }}>
        {/* Sales & Marketing Analysis Tab */}
        {activeTab === "sales" && (
          <div>
            <h2
              style={{
                color: colors.ebony,
                marginBottom: "20px",
                fontSize: "1.8rem",
                borderBottom: `3px solid ${colors.sage}`,
                paddingBottom: "10px",
              }}
            >
              Sales & Marketing Analysis
            </h2>

            <MarketingAnalysis />
          </div>
        )}

        {/* Demographics Tab */}
        {activeTab === "demographics" && (
          <div>
            <h2
              style={{
                color: colors.ebony,
                marginBottom: "20px",
                fontSize: "1.8rem",
                borderBottom: `3px solid ${colors.sage}`,
                paddingBottom: "10px",
              }}
            >
              Demographics
            </h2>

            <Demographics />
          </div>
        )}

        {/* Project Management Tab */}
        {activeTab === "project" && (
          <div>
            <h2
              style={{
                color: colors.ebony,
                marginBottom: "20px",
                fontSize: "1.8rem",
                borderBottom: `3px solid ${colors.sage}`,
                paddingBottom: "10px",
              }}
            >
              Project Management
            </h2>

            <ProjectManagement />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: colors.ebony,
          color: "#fff",
          padding: "20px 40px",
          textAlign: "center",
          borderTop: `4px solid ${colors.sage}`,
        }}
      >
        <p style={{ margin: 0, fontSize: "0.9rem", opacity: 0.8 }}>
          NAHB Student Competition 2025 | Lilburn Residential Development
        </p>
        <p style={{ margin: "5px 0 0", fontSize: "0.8rem", opacity: 0.6 }}>
          Gwinnett County, Georgia
        </p>
      </footer>
    </div>
  );
}
