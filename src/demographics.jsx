import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Area,
} from "recharts";

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
};

const populationData = [
  { year: "1980", pop: 3500 },
  { year: "1990", pop: 7500 },
  { year: "2000", pop: 11307 },
  { year: "2010", pop: 11596 },
  { year: "2020", pop: 14285 },
  { year: "2025", pop: 16913 },
];

const ageData = [
  { age: "Under 15", value: 4070, pct: 27.2, color: colors.primary },
  { age: "15-24", value: 1776, pct: 11.9, color: colors.secondary },
  { age: "25-44", value: 3869, pct: 25.9, color: colors.accent },
  { age: "45-64", value: 2977, pct: 19.9, color: colors.success },
  { age: "65+", value: 2247, pct: 15.0, color: colors.blue },
];

const raceData = [
  { race: "Other Race", pct: 24.37, color: colors.primary },
  { race: "Multiracial", pct: 23.91, color: colors.secondary },
  { race: "White", pct: 22.65, color: colors.accent },
  { race: "Black", pct: 15.15, color: colors.success },
  { race: "Asian", pct: 12.91, color: colors.blue },
  { race: "Other", pct: 1.01, color: colors.warning },
];

const employmentData = [
  { sector: "Retail", pct: 17.0, color: "#E53935" },
  { sector: "Construction", pct: 16.7, color: "#FB8C00" },
  { sector: "Office/Admin", pct: 13.1, color: "#43A047" },
  { sector: "Food Service", pct: 9.0, color: "#1E88E5" },
  { sector: "Healthcare", pct: 6.9, color: "#8E24AA" },
  { sector: "Other", pct: 37.3, color: "#607D8B" },
];

const incomeByAge = [
  { age: "25-44", income: 66403, color: colors.primary },
  { age: "45-64", income: 71604, color: colors.secondary },
  { age: "65+", income: 45398, color: colors.accent },
];

const householdType = [
  { type: "Family", pct: 61.9, color: colors.primary },
  { type: "Non-Family", pct: 38.1, color: colors.accent },
];

const housingType = [
  { type: "Single Family", pct: 72.3, color: colors.primary },
  { type: "Multi-Family", pct: 21.9, color: colors.secondary },
  { type: "Other", pct: 5.8, color: colors.accent },
];

const crimeComparison = [
  { type: "Violent", lilburn: 1.58, us: 4.0 },
  { type: "Property", lilburn: 25.6, us: 19.0 },
];

export default function Demographics() {
  return (
    <div
      style={{
        fontFamily: "Georgia, serif",
        backgroundColor: colors.light,
        padding: "30px",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <header
        style={{
          textAlign: "center",
          marginBottom: "40px",
          borderBottom: `3px solid ${colors.primary}`,
          paddingBottom: "25px",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            color: colors.primary,
            margin: 0,
            letterSpacing: "2px",
          }}
        >
          LILBURN DEMOGRAPHICS
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: colors.secondary,
            marginTop: "10px",
            letterSpacing: "3px",
            textTransform: "uppercase",
          }}
        >
          Gwinnett County, Georgia | Community Profile
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "20px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              backgroundColor: colors.primary,
              color: "#fff",
              padding: "6px 16px",
              borderRadius: "20px",
              fontSize: "0.9rem",
            }}
          >
            Pop: 16,913
          </span>
          <span
            style={{
              backgroundColor: colors.secondary,
              color: "#fff",
              padding: "6px 16px",
              borderRadius: "20px",
              fontSize: "0.9rem",
            }}
          >
            Growth: +3.21%/yr
          </span>
          <span
            style={{
              backgroundColor: colors.success,
              color: "#fff",
              padding: "6px 16px",
              borderRadius: "20px",
              fontSize: "0.9rem",
            }}
          >
            Median Age: 35
          </span>
          <span
            style={{
              backgroundColor: colors.blue,
              color: "#fff",
              padding: "6px 16px",
              borderRadius: "20px",
              fontSize: "0.9rem",
            }}
          >
            Area: 7 sq mi
          </span>
        </div>
      </header>

      {/* Section 1: Population */}
      <section style={{ marginBottom: "40px" }}>
        <h2
          style={{
            fontSize: "1.4rem",
            color: colors.dark,
            marginBottom: "20px",
            borderLeft: `4px solid ${colors.secondary}`,
            paddingLeft: "15px",
          }}
        >
          1. Population Overview
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          {[
            { label: "2025 Population", value: "16,913", icon: "👥" },
            { label: "2020 Census", value: "14,285", icon: "📊" },
            { label: "Growth Since 2020", value: "+18.4%", icon: "📈" },
            { label: "Annual Growth", value: "3.21%", icon: "🚀" },
            { label: "Median Age", value: "35-36", icon: "🎂" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                padding: "18px",
                textAlign: "center",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              }}
            >
              <div style={{ fontSize: "1.6rem", marginBottom: "6px" }}>
                {item.icon}
              </div>
              <div
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  color: colors.primary,
                }}
              >
                {item.value}
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: colors.secondary,
                  textTransform: "uppercase",
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h3 style={{ color: colors.primary, marginBottom: "15px" }}>
            Population Growth (1980-2025)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <ComposedChart data={populationData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={colors.accent}
                opacity={0.5}
              />
              <XAxis dataKey="year" tick={{ fill: colors.dark }} />
              <YAxis
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
                tick={{ fill: colors.dark }}
              />
              <Tooltip formatter={(v) => v.toLocaleString()} />
              <Area
                type="monotone"
                dataKey="pop"
                fill={colors.accent}
                fillOpacity={0.3}
                stroke="none"
              />
              <Line
                type="monotone"
                dataKey="pop"
                stroke={colors.primary}
                strokeWidth={3}
                dot={{ fill: colors.primary, r: 5 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Section 2: Age Distribution */}
      <section style={{ marginBottom: "40px" }}>
        <h2
          style={{
            fontSize: "1.4rem",
            color: colors.dark,
            marginBottom: "20px",
            borderLeft: `4px solid ${colors.secondary}`,
            paddingLeft: "15px",
          }}
        >
          2. Age Distribution
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gap: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={ageData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={colors.accent}
                  opacity={0.5}
                />
                <XAxis
                  dataKey="age"
                  tick={{ fill: colors.dark, fontSize: 11 }}
                />
                <YAxis
                  tickFormatter={(v) => `${(v / 1000).toFixed(1)}K`}
                  tick={{ fill: colors.dark }}
                />
                <Tooltip formatter={(v) => v.toLocaleString()} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {ageData.map((e, i) => (
                    <Cell key={i} fill={e.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h4 style={{ color: colors.primary, marginBottom: "12px" }}>
              Age Breakdown
            </h4>
            {ageData.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px",
                  backgroundColor: i % 2 === 0 ? colors.light : "#fff",
                  borderRadius: "4px",
                  marginBottom: "6px",
                  borderLeft: `3px solid ${item.color}`,
                }}
              >
                <span style={{ fontSize: "0.85rem" }}>{item.age}</span>
                <span style={{ fontWeight: 600, color: colors.primary }}>
                  {item.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Race & Ethnicity */}
      <section style={{ marginBottom: "40px" }}>
        <h2
          style={{
            fontSize: "1.4rem",
            color: colors.dark,
            marginBottom: "20px",
            borderLeft: `4px solid ${colors.secondary}`,
            paddingLeft: "15px",
          }}
        >
          3. Race & Ethnicity
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={raceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={85}
                  paddingAngle={2}
                  dataKey="pct"
                  label={({ pct }) => `${pct}%`}
                >
                  {raceData.map((e, i) => (
                    <Cell key={i} fill={e.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h4 style={{ color: colors.primary, marginBottom: "12px" }}>
              Diversity Breakdown
            </h4>
            {raceData.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: item.color,
                    borderRadius: "2px",
                  }}
                />
                <span style={{ flex: 1, fontSize: "0.85rem" }}>
                  {item.race}
                </span>
                <div
                  style={{
                    width: `${item.pct * 2.5}px`,
                    height: 14,
                    backgroundColor: item.color,
                    borderRadius: "3px",
                    minWidth: 4,
                  }}
                />
                <span
                  style={{
                    width: 45,
                    textAlign: "right",
                    fontWeight: 600,
                    color: colors.primary,
                  }}
                >
                  {item.pct}%
                </span>
              </div>
            ))}
            <div
              style={{
                marginTop: "15px",
                padding: "10px",
                backgroundColor: "#E8F5E9",
                borderRadius: "6px",
                fontSize: "0.8rem",
                borderLeft: `3px solid ${colors.success}`,
              }}
            >
              <strong>Key:</strong> No majority race. ~50% Hispanic/Latino.
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Employment & Income */}
      <section style={{ marginBottom: "40px" }}>
        <h2
          style={{
            fontSize: "1.4rem",
            color: colors.dark,
            marginBottom: "20px",
            borderLeft: `4px solid ${colors.secondary}`,
            paddingLeft: "15px",
          }}
        >
          4. Employment & Income
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          {[
            { label: "Working Pop", value: "6,486", icon: "👷" },
            { label: "Median Income", value: "$57,266", icon: "💵" },
            { label: "Mean Income", value: "$84,096", icon: "📊" },
            { label: "Per Capita", value: "$27,856", icon: "👤" },
            { label: "Renter Income", value: "$35,469", icon: "🏠" },
            { label: "Emp Growth", value: "+3.05%", icon: "📈" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                padding: "15px",
                textAlign: "center",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              }}
            >
              <div style={{ fontSize: "1.4rem", marginBottom: "4px" }}>
                {item.icon}
              </div>
              <div
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: colors.primary,
                }}
              >
                {item.value}
              </div>
              <div
                style={{
                  fontSize: "0.65rem",
                  color: colors.secondary,
                  textTransform: "uppercase",
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h4 style={{ color: colors.primary, marginBottom: "12px" }}>
              Employment by Sector
            </h4>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={employmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  dataKey="pct"
                  nameKey="sector"
                >
                  {employmentData.map((e, i) => (
                    <Cell key={i} fill={e.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} />
                <Legend formatter={(value, entry) => entry.payload.sector} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h4 style={{ color: colors.primary, marginBottom: "12px" }}>
              Income by Age Group
            </h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={incomeByAge}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={colors.accent}
                  opacity={0.5}
                />
                <XAxis dataKey="age" tick={{ fill: colors.dark }} />
                <YAxis
                  tickFormatter={(v) => `$${v / 1000}K`}
                  tick={{ fill: colors.dark }}
                />
                <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                <Bar dataKey="income" radius={[4, 4, 0, 0]}>
                  {incomeByAge.map((e, i) => (
                    <Cell key={i} fill={e.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Section 5: Household & Housing */}
      <section style={{ marginBottom: "40px" }}>
        <h2
          style={{
            fontSize: "1.4rem",
            color: colors.dark,
            marginBottom: "20px",
            borderLeft: `4px solid ${colors.secondary}`,
            paddingLeft: "15px",
          }}
        >
          5. Household & Housing
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          {[
            { label: "Avg HH Size", value: "3.28", icon: "👨‍👩‍👧‍👦" },
            { label: "Housing Units", value: "5,075", icon: "🏘️" },
            { label: "Occupied", value: "4,834", icon: "🏠" },
            { label: "Owner-Occ", value: "61.2%", icon: "🔑" },
            { label: "Renter-Occ", value: "38.8%", icon: "📋" },
            { label: "Vacancy", value: "4.7%", icon: "🚪" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                padding: "15px",
                textAlign: "center",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              }}
            >
              <div style={{ fontSize: "1.4rem", marginBottom: "4px" }}>
                {item.icon}
              </div>
              <div
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: colors.primary,
                }}
              >
                {item.value}
              </div>
              <div
                style={{
                  fontSize: "0.65rem",
                  color: colors.secondary,
                  textTransform: "uppercase",
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h4 style={{ color: colors.primary, marginBottom: "12px" }}>
              Household Type
            </h4>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={householdType}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={60}
                  dataKey="pct"
                >
                  {householdType.map((e, i) => (
                    <Cell key={i} fill={e.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                marginTop: "8px",
              }}
            >
              {householdType.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "0.8rem",
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      backgroundColor: item.color,
                      borderRadius: "2px",
                    }}
                  />
                  <span>
                    {item.type}: {item.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h4 style={{ color: colors.primary, marginBottom: "12px" }}>
              Housing Types
            </h4>
            {housingType.map((item, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "4px",
                  }}
                >
                  <span style={{ fontSize: "0.85rem" }}>{item.type}</span>
                  <span style={{ fontWeight: 600, color: colors.primary }}>
                    {item.pct}%
                  </span>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: 10,
                    backgroundColor: colors.light,
                    borderRadius: "5px",
                  }}
                >
                  <div
                    style={{
                      width: `${item.pct}%`,
                      height: "100%",
                      backgroundColor: item.color,
                      borderRadius: "5px",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h4 style={{ color: colors.primary, marginBottom: "12px" }}>
              Build Year
            </h4>
            <div style={{ textAlign: "center", padding: "20px" }}>
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  color: colors.primary,
                }}
              >
                1987
              </div>
              <div style={{ fontSize: "0.85rem", color: colors.secondary }}>
                Median Construction Year
              </div>
            </div>
            <div
              style={{
                padding: "10px",
                backgroundColor: colors.light,
                borderRadius: "6px",
                fontSize: "0.8rem",
                marginTop: "10px",
              }}
            >
              <strong>81.5%</strong> of homes built 1970-1999
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Crime */}
      <section style={{ marginBottom: "40px" }}>
        <h2
          style={{
            fontSize: "1.4rem",
            color: colors.dark,
            marginBottom: "20px",
            borderLeft: `4px solid ${colors.secondary}`,
            paddingLeft: "15px",
          }}
        >
          6. Crime Statistics
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "25px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              textAlign: "center",
            }}
          >
            <h4 style={{ color: colors.primary, marginBottom: "15px" }}>
              Safety Index
            </h4>
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                backgroundColor: colors.warning,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                margin: "0 auto 15px",
              }}
            >
              <div style={{ fontSize: "2rem", fontWeight: 700 }}>12</div>
              <div style={{ fontSize: "0.65rem" }}>of 100</div>
            </div>
            <div
              style={{
                fontSize: "0.9rem",
                color: colors.warning,
                fontWeight: 600,
              }}
            >
              Below Average
            </div>
            <div style={{ fontSize: "0.75rem", color: "#999" }}>
              Safer than 12% of cities
            </div>
            <div
              style={{
                marginTop: "15px",
                padding: "10px",
                backgroundColor: "#FFF8E1",
                borderRadius: "6px",
                fontSize: "0.8rem",
              }}
            >
              <strong>1 in 634</strong> violent crime chance
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "25px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h4 style={{ color: colors.primary, marginBottom: "15px" }}>
              Crime Rate (per 1,000 residents)
            </h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "15px",
              }}
            >
              {crimeComparison.map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: "15px",
                    backgroundColor: colors.light,
                    borderRadius: "10px",
                    borderTop: `4px solid ${
                      i === 0 ? colors.success : colors.danger
                    }`,
                  }}
                >
                  <div
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      marginBottom: "12px",
                    }}
                  >
                    {item.type} Crime
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "0.7rem", color: "#999" }}>
                        Lilburn
                      </div>
                      <div
                        style={{
                          fontSize: "1.6rem",
                          fontWeight: 700,
                          color: i === 0 ? colors.success : colors.danger,
                        }}
                      >
                        {item.lilburn}
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "0.7rem", color: "#999" }}>
                        US Avg
                      </div>
                      <div
                        style={{
                          fontSize: "1.6rem",
                          fontWeight: 700,
                          color: colors.secondary,
                        }}
                      >
                        {item.us}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: "10px",
                      padding: "6px",
                      backgroundColor: "#fff",
                      borderRadius: "4px",
                      textAlign: "center",
                      fontSize: "0.75rem",
                    }}
                  >
                    {i === 0 ? "✅ Below US Avg" : "⚠️ Above US Avg"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section
        style={{
          backgroundColor: colors.primary,
          borderRadius: "10px",
          padding: "30px",
          color: "#fff",
          marginBottom: "25px",
        }}
      >
        <h2
          style={{
            fontSize: "1.4rem",
            marginBottom: "20px",
            borderBottom: `2px solid ${colors.accent}`,
            paddingBottom: "12px",
          }}
        >
          Demographics Summary
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          <div>
            <h4 style={{ color: colors.accent, marginBottom: "8px" }}>
              👥 Population
            </h4>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.5, margin: 0 }}>
              16,913 residents, 3.21% annual growth. +18.4% since 2020.
            </p>
          </div>
          <div>
            <h4 style={{ color: colors.accent, marginBottom: "8px" }}>
              🌍 Diversity
            </h4>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.5, margin: 0 }}>
              No majority race. ~50% Hispanic/Latino community.
            </p>
          </div>
          <div>
            <h4 style={{ color: colors.accent, marginBottom: "8px" }}>
              💼 Employment
            </h4>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.5, margin: 0 }}>
              6,486 workers. $57K median income supports ~$480K homes.
            </p>
          </div>
          <div>
            <h4 style={{ color: colors.accent, marginBottom: "8px" }}>
              🏠 Housing
            </h4>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.5, margin: 0 }}>
              72.3% single-family. 61.2% owner-occupied. 3.28 HH size.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          paddingTop: "20px",
          borderTop: `2px solid ${colors.accent}`,
          color: colors.secondary,
        }}
      >
        <p style={{ margin: 0, fontSize: "0.85rem" }}>
          NAHB Student Competition | Lilburn Demographics | Gwinnett County, GA
        </p>
        <p style={{ margin: "5px 0 0", fontSize: "0.75rem", color: "#999" }}>
          Data: U.S. Census Bureau, Neilsberg, Census Reporter
        </p>
      </footer>
    </div>
  );
}
