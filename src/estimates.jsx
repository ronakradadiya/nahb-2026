import { useState, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
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
  chart: ["#2D5A4A", "#8B4513", "#D4A574", "#4A7C59", "#C9A227", "#4A90A4"],
};

// Cost category colors
const categoryColors = {
  Foundation: "#2D5A4A",
  Framing: "#8B4513",
  "Exterior Envelope": "#D4A574",
  MEP: "#4A7C59",
  "Interior Finishes": "#C9A227",
  Specialties: "#4A90A4",
};

// ============================================
// DATA FROM EXCEL FILES
// ============================================

// Final Estimates - Per Plan Summary
const planEstimates = [
  {
    name: "The Havenwood",
    shortName: "Havenwood",
    config: "Single-Story",
    lotSize: 7500,
    sqft: 2156,
    costPerSqft: 79.63,
    estimatePerUnit: 171688,
    units: 36,
    totalCost: 6180780,
    color: colors.chart[0],
  },
  {
    name: "The Sterling",
    shortName: "Sterling",
    config: "1.5 Story w/ Loft",
    lotSize: 7500,
    sqft: 2212,
    costPerSqft: 80.85,
    estimatePerUnit: 178842,
    units: 37,
    totalCost: 6617154,
    color: colors.chart[1],
  },
  {
    name: "The Brookside",
    shortName: "Brookside",
    config: "Single Story",
    lotSize: 7500,
    sqft: 2327,
    costPerSqft: 81.98,
    estimatePerUnit: 190765,
    units: 37,
    totalCost: 7058298,
    color: colors.chart[2],
  },
  {
    name: "The Kirkwood",
    shortName: "Kirkwood",
    config: "Two Story",
    lotSize: 9000,
    sqft: 2696,
    costPerSqft: 84.03,
    estimatePerUnit: 226533,
    units: 24,
    totalCost: 5436797,
    color: colors.chart[3],
  },
  {
    name: "The Ingram",
    shortName: "Ingram",
    config: "Two-Story (5-Bed)",
    lotSize: 9000,
    sqft: 2705,
    costPerSqft: 88.15,
    estimatePerUnit: 238456,
    units: 24,
    totalCost: 5722944,
    color: colors.chart[4],
  },
  {
    name: "The Riverbend",
    shortName: "Riverbend",
    config: "Two-Story (4 bed)",
    lotSize: 9000,
    sqft: 2924,
    costPerSqft: 89.71,
    estimatePerUnit: 262302,
    units: 22,
    totalCost: 5770635,
    color: colors.chart[5],
  },
];

// Price per SF data for Section 3b
const pricePerSqftData = [
  { name: "Havenwood", sqft: 2156, pricePerSqft: 230, avg: 222 },
  { name: "Sterling", sqft: 2212, pricePerSqft: 220, avg: 222 },
  { name: "Brookside", sqft: 2327, pricePerSqft: 221, avg: 222 },
  { name: "Kirkwood", sqft: 2696, pricePerSqft: 221, avg: 222 },
  { name: "Ingram", sqft: 2705, pricePerSqft: 224, avg: 222 },
  { name: "Riverbend", sqft: 2924, pricePerSqft: 217, avg: 222 },
];

// Neighborhood Comparison Data for Section 3c
const neighborhoodComparisonData = [
  // Silverwood Heights
  { neighborhood: "Silverwood", sqft: 2156, pricePerSqft: 230 },
  { neighborhood: "Silverwood", sqft: 2212, pricePerSqft: 220 },
  { neighborhood: "Silverwood", sqft: 2327, pricePerSqft: 221 },
  { neighborhood: "Silverwood", sqft: 2696, pricePerSqft: 221 },
  { neighborhood: "Silverwood", sqft: 2705, pricePerSqft: 224 },
  { neighborhood: "Silverwood", sqft: 2924, pricePerSqft: 217 },
  // Annsbury Park
  { neighborhood: "Annsbury Park", sqft: 2114, pricePerSqft: 220 },
  { neighborhood: "Annsbury Park", sqft: 2047, pricePerSqft: 227 },
  { neighborhood: "Annsbury Park", sqft: 2325, pricePerSqft: 209 },
  { neighborhood: "Annsbury Park", sqft: 2047, pricePerSqft: 237 },
  { neighborhood: "Annsbury Park", sqft: 2325, pricePerSqft: 213 },
  { neighborhood: "Annsbury Park", sqft: 2524, pricePerSqft: 214 },
  // Chandler Run
  { neighborhood: "Chandler Run", sqft: 1893, pricePerSqft: 242 },
  { neighborhood: "Chandler Run", sqft: 2375, pricePerSqft: 199 },
  { neighborhood: "Chandler Run", sqft: 1984, pricePerSqft: 225 },
];

// Separate data by neighborhood for line chart
const silverwoodData = neighborhoodComparisonData
  .filter((d) => d.neighborhood === "Silverwood")
  .sort((a, b) => a.sqft - b.sqft);
const annsburyData = neighborhoodComparisonData
  .filter((d) => d.neighborhood === "Annsbury Park")
  .sort((a, b) => a.sqft - b.sqft);
const chandlerData = neighborhoodComparisonData
  .filter((d) => d.neighborhood === "Chandler Run")
  .sort((a, b) => a.sqft - b.sqft);

// Totals
const totalUnits = planEstimates.reduce((sum, p) => sum + p.units, 0);
const totalCost = planEstimates.reduce((sum, p) => sum + p.totalCost, 0);
const avgCostPerSqft =
  planEstimates.reduce((sum, p) => sum + p.costPerSqft, 0) /
  planEstimates.length;
const avgEstimatePerUnit =
  planEstimates.reduce((sum, p) => sum + p.estimatePerUnit, 0) /
  planEstimates.length;

// Breakdown Estimates - Cost Components per Plan
const breakdownData = [
  {
    plan: "Havenwood",
    Foundation: 17169,
    FoundationPct: 10,
    Framing: 34338,
    FramingPct: 20,
    "Exterior Envelope": 25753,
    "Exterior EnvelopePct": 15,
    MEP: 51506,
    MEPPct: 30,
    "Interior Finishes": 34338,
    "Interior FinishesPct": 20,
    Specialties: 8584,
    SpecialtiesPct: 5,
    total: 171688,
  },
  {
    plan: "Sterling",
    Foundation: 14307,
    FoundationPct: 8,
    Framing: 39345,
    FramingPct: 22,
    "Exterior Envelope": 28615,
    "Exterior EnvelopePct": 16,
    MEP: 53653,
    MEPPct: 30,
    "Interior Finishes": 35768,
    "Interior FinishesPct": 20,
    Specialties: 7154,
    SpecialtiesPct: 4,
    total: 178842,
  },
  {
    plan: "Brookside",
    Foundation: 22892,
    FoundationPct: 12,
    Framing: 38153,
    FramingPct: 20,
    "Exterior Envelope": 28615,
    "Exterior EnvelopePct": 15,
    MEP: 57230,
    MEPPct: 30,
    "Interior Finishes": 34338,
    "Interior FinishesPct": 18,
    Specialties: 9538,
    SpecialtiesPct: 5,
    total: 190765,
  },
  {
    plan: "Kirkwood",
    Foundation: 18123,
    FoundationPct: 8,
    Framing: 56633,
    FramingPct: 25,
    "Exterior Envelope": 38511,
    "Exterior EnvelopePct": 17,
    MEP: 67960,
    MEPPct: 30,
    "Interior Finishes": 38511,
    "Interior FinishesPct": 17,
    Specialties: 6796,
    SpecialtiesPct: 3,
    total: 226533,
  },
  {
    plan: "Ingram",
    Foundation: 19076,
    FoundationPct: 8,
    Framing: 57229,
    FramingPct: 24,
    "Exterior Envelope": 38153,
    "Exterior EnvelopePct": 16,
    MEP: 76306,
    MEPPct: 32,
    "Interior Finishes": 40538,
    "Interior FinishesPct": 17,
    Specialties: 7154,
    SpecialtiesPct: 3,
    total: 238456,
  },
  {
    plan: "Riverbend",
    Foundation: 20984,
    FoundationPct: 8,
    Framing: 65576,
    FramingPct: 25,
    "Exterior Envelope": 41968,
    "Exterior EnvelopePct": 16,
    MEP: 78691,
    MEPPct: 30,
    "Interior Finishes": 47214,
    "Interior FinishesPct": 18,
    Specialties: 7869,
    SpecialtiesPct: 3,
    total: 262302,
  },
];

// Average cost breakdown (for pie chart)
const avgBreakdownData = [
  {
    name: "Foundation",
    value: Math.round(breakdownData.reduce((s, p) => s + p.Foundation, 0) / 6),
    color: categoryColors.Foundation,
  },
  {
    name: "Framing",
    value: Math.round(breakdownData.reduce((s, p) => s + p.Framing, 0) / 6),
    color: categoryColors.Framing,
  },
  {
    name: "Exterior Envelope",
    value: Math.round(
      breakdownData.reduce((s, p) => s + p["Exterior Envelope"], 0) / 6,
    ),
    color: categoryColors["Exterior Envelope"],
  },
  {
    name: "MEP",
    value: Math.round(breakdownData.reduce((s, p) => s + p.MEP, 0) / 6),
    color: categoryColors.MEP,
  },
  {
    name: "Interior Finishes",
    value: Math.round(
      breakdownData.reduce((s, p) => s + p["Interior Finishes"], 0) / 6,
    ),
    color: categoryColors["Interior Finishes"],
  },
  {
    name: "Specialties",
    value: Math.round(breakdownData.reduce((s, p) => s + p.Specialties, 0) / 6),
    color: categoryColors.Specialties,
  },
];

// Data for stacked bar chart
const stackedBarData = breakdownData.map((p) => ({
  plan: p.plan,
  Foundation: p.Foundation,
  Framing: p.Framing,
  "Exterior Envelope": p["Exterior Envelope"],
  MEP: p.MEP,
  "Interior Finishes": p["Interior Finishes"],
  Specialties: p.Specialties,
}));

// Radar chart data (percentage breakdown comparison)
const radarData = [
  {
    category: "Foundation",
    Havenwood: 10,
    Sterling: 8,
    Brookside: 12,
    Kirkwood: 8,
    Ingram: 8,
    Riverbend: 8,
  },
  {
    category: "Framing",
    Havenwood: 20,
    Sterling: 22,
    Brookside: 20,
    Kirkwood: 25,
    Ingram: 24,
    Riverbend: 25,
  },
  {
    category: "Ext. Envelope",
    Havenwood: 15,
    Sterling: 16,
    Brookside: 15,
    Kirkwood: 17,
    Ingram: 16,
    Riverbend: 16,
  },
  {
    category: "MEP",
    Havenwood: 30,
    Sterling: 30,
    Brookside: 30,
    Kirkwood: 30,
    Ingram: 32,
    Riverbend: 30,
  },
  {
    category: "Int. Finishes",
    Havenwood: 20,
    Sterling: 20,
    Brookside: 18,
    Kirkwood: 17,
    Ingram: 17,
    Riverbend: 18,
  },
  {
    category: "Specialties",
    Havenwood: 5,
    Sterling: 4,
    Brookside: 5,
    Kirkwood: 3,
    Ingram: 3,
    Riverbend: 3,
  },
];

// Construction Cost per SF data for Section 3c
const constructionCostData = [
  { name: "Havenwood", sqft: 2156, costPerSqft: 79.63, avg: 84.06 },
  { name: "Sterling", sqft: 2212, costPerSqft: 80.85, avg: 84.06 },
  { name: "Brookside", sqft: 2327, costPerSqft: 81.98, avg: 84.06 },
  { name: "Kirkwood", sqft: 2696, costPerSqft: 84.03, avg: 84.06 },
  { name: "Ingram", sqft: 2705, costPerSqft: 88.15, avg: 84.06 },
  { name: "Riverbend", sqft: 2924, costPerSqft: 89.71, avg: 84.06 },
];

// ============================================
// COMPONENTS
// ============================================

// Download Button Component
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
        top: "0px",
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
        transition: "all 0.2s ease",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        zIndex: 10,
      }}
    >
      {downloading ? "⏳ Saving..." : "📥 Download PNG"}
    </button>
  );
};

// Chart Download Button
const ChartDownloadButton = ({ chartRef, filename }) => {
  const [downloading, setDownloading] = useState(false);
  const buttonRef = useRef(null);

  const handleDownload = async () => {
    if (!chartRef.current) return;
    setDownloading(true);
    try {
      if (buttonRef.current) buttonRef.current.style.display = "none";
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: "#fff",
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
        right: "10px",
        padding: "6px 12px",
        backgroundColor: downloading ? colors.accent : colors.primary,
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: downloading ? "wait" : "pointer",
        fontSize: "0.7rem",
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        gap: "4px",
        transition: "all 0.2s ease",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        zIndex: 10,
        opacity: 0.9,
      }}
      onMouseEnter={(e) => (e.target.style.opacity = "1")}
      onMouseLeave={(e) => (e.target.style.opacity = "0.9")}
    >
      {downloading ? "⏳" : "📥"}
    </button>
  );
};

// Section Wrapper
const Section = ({ id, title, sectionNumber, children, sectionRef }) => (
  <section
    ref={sectionRef}
    style={{
      marginBottom: "50px",
      position: "relative",
      backgroundColor: colors.light,
      borderRadius: "12px",
    }}
  >
    <DownloadButton
      sectionRef={sectionRef}
      filename={`section-${sectionNumber}-${id}`}
    />
    <h2
      style={{
        fontSize: "1.4rem",
        color: colors.dark,
        marginBottom: "20px",
        borderLeft: `4px solid ${colors.secondary}`,
        paddingLeft: "15px",
        paddingRight: "120px",
      }}
    >
      {sectionNumber}. {title}
    </h2>
    {children}
  </section>
);

// Chart Box
const ChartBox = ({ children, title, filename }) => {
  const chartRef = useRef(null);
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
      <ChartDownloadButton chartRef={chartRef} filename={filename} />
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

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: colors.light,
          border: `2px solid ${colors.primary}`,
          borderRadius: "8px",
          padding: "12px 16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <p style={{ margin: 0, fontWeight: 600, color: colors.dark }}>
          {label}
        </p>
        {payload.map((entry, index) => (
          <p
            key={index}
            style={{
              margin: "4px 0 0",
              color: entry.color || colors.dark,
              fontSize: "0.85rem",
            }}
          >
            {entry.name}: $
            {typeof entry.value === "number"
              ? entry.value.toLocaleString()
              : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ============================================
// MAIN COMPONENT
// ============================================

export default function Estimates() {
  const headerRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section3bRef = useRef(null);
  const section3cRef = useRef(null);
  const section3dRef = useRef(null);
  const section4Ref = useRef(null);
  const section5Ref = useRef(null);
  const summaryRef = useRef(null);
  const costSummaryCardsRef = useRef(null); // For Construction Cost Summary cards only
  const categoryCardsRef = useRef(null); // For Cost Breakdown category cards only

  return (
    <div
      style={{
        fontFamily: "Georgia, serif",
        backgroundColor: colors.light,
        padding: "30px",
        minHeight: "100vh",
      }}
    >
      {/* Section 1: Key Metrics */}
      <Section
        id="key-metrics"
        title="Construction Cost Summary"
        sectionNumber={1}
        sectionRef={section1Ref}
      >
        <p
          style={{
            fontSize: "0.95rem",
            color: colors.dark,
            lineHeight: 1.7,
            marginBottom: "20px",
          }}
        >
          Total construction hard costs for <strong>180 homes</strong> across{" "}
          <strong>6 floor plans</strong> is
          <strong> ${(totalCost / 1000000).toFixed(2)}M</strong>. Cost per
          square foot ranges from
          <strong> $79.63</strong> (Havenwood) to <strong>$89.71</strong>{" "}
          (Riverbend), reflecting size and complexity differences.
        </p>
        <div
          ref={costSummaryCardsRef}
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "15px",
            padding: "20px",
            backgroundColor: colors.light,
            borderRadius: "10px",
          }}
        >
          <ChartDownloadButton
            chartRef={costSummaryCardsRef}
            filename="construction-cost-summary-cards"
          />
          {[
            {
              label: "Total Hard Cost",
              value: `$${(totalCost / 1000000).toFixed(2)}M`,
              icon: "💰",
              color: colors.primary,
            },
            {
              label: "Total Units",
              value: totalUnits.toString(),
              icon: "🏠",
              color: colors.secondary,
            },
            {
              label: "Floor Plans",
              value: "6",
              icon: "📋",
              color: colors.accent,
            },
            {
              label: "Avg $/Sqft",
              value: `$${avgCostPerSqft.toFixed(2)}`,
              icon: "📐",
              color: colors.success,
            },
            {
              label: "Avg/Unit",
              value: `$${Math.round(avgEstimatePerUnit / 1000)}K`,
              icon: "🏗️",
              color: colors.warning,
            },
            {
              label: "Sqft Range",
              value: "2,156-2,924",
              icon: "📏",
              color: colors.blue,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: "22px",
                boxShadow: "0 4px 20px rgba(45, 90, 74, 0.1)",
                border: `1px solid ${colors.accent}`,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "1.8rem", marginBottom: "8px" }}>
                {item.icon}
              </div>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: colors.primary,
                  marginBottom: "5px",
                }}
              >
                {item.value}
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: colors.secondary,
                  fontFamily: "'Source Sans Pro', sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Section 2: Total Cost by Plan */}
      <Section
        id="cost-by-plan"
        title="Total Construction Cost by Plan"
        sectionNumber={2}
        sectionRef={section2Ref}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "20px",
          }}
        >
          <ChartBox
            title="Total Cost by Plan ($M)"
            filename="total-cost-by-plan"
          >
            <p
              style={{
                fontSize: "0.8rem",
                color: colors.secondary,
                marginBottom: "15px",
              }}
            >
              Brookside has highest total cost ($7.06M) due to 37 units.
              Riverbend has highest per-unit cost ($262K) due to larger size.
            </p>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart
                data={planEstimates}
                margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={colors.accent}
                  opacity={0.5}
                />
                <XAxis
                  dataKey="shortName"
                  tick={{ fill: colors.dark, fontSize: 11 }}
                />
                <YAxis
                  yAxisId="left"
                  tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`}
                  tick={{ fill: colors.dark }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fill: colors.secondary }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="totalCost"
                  name="Total Cost"
                  radius={[4, 4, 0, 0]}
                >
                  {planEstimates.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="units"
                  name="Units"
                  stroke={colors.danger}
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartBox>

          <ChartBox title="Cost Distribution" filename="cost-distribution-pie">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={planEstimates}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={2}
                  dataKey="totalCost"
                  nameKey="shortName"
                  label={({ shortName, percent }) =>
                    `${shortName} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={{ stroke: colors.dark, strokeWidth: 1 }}
                >
                  {planEstimates.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `$${(v / 1000000).toFixed(2)}M`} />
              </PieChart>
            </ResponsiveContainer>
          </ChartBox>
        </div>
      </Section>

      {/* Section 3: Cost per Square Foot Analysis */}
      <Section
        id="cost-per-sqft"
        title="Cost per Square Foot Analysis"
        sectionNumber={3}
        sectionRef={section3Ref}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <ChartBox
            title="Cost/Sqft vs Square Footage"
            filename="cost-sqft-comparison"
          >
            <p
              style={{
                fontSize: "0.8rem",
                color: colors.secondary,
                marginBottom: "15px",
              }}
            >
              Larger homes (Riverbend: 2,924 sqft) have higher $/sqft due to
              increased complexity. Smaller single-story homes are most
              efficient.
            </p>
            <ResponsiveContainer width="100%" height={250}>
              <ComposedChart
                data={planEstimates}
                margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={colors.accent}
                  opacity={0.5}
                />
                <XAxis
                  dataKey="shortName"
                  tick={{ fill: colors.dark, fontSize: 11 }}
                />
                <YAxis
                  yAxisId="left"
                  tickFormatter={(v) => `$${v}`}
                  tick={{ fill: colors.dark }}
                  domain={[75, 95]}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fill: colors.secondary }}
                  domain={[2000, 3000]}
                />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="costPerSqft"
                  name="$/Sqft"
                  fill={colors.primary}
                  radius={[4, 4, 0, 0]}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="sqft"
                  name="Square Feet"
                  stroke={colors.warning}
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartBox>

          <ChartBox title="Per Unit Estimate" filename="per-unit-estimate">
            <p
              style={{
                fontSize: "0.8rem",
                color: colors.secondary,
                marginBottom: "15px",
              }}
            >
              Per-unit construction cost ranges from $171K to $262K based on
              home size and configuration.
            </p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={planEstimates}
                layout="vertical"
                margin={{ left: 70, right: 30 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={colors.accent}
                  opacity={0.5}
                />
                <XAxis
                  type="number"
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
                  tick={{ fill: colors.dark }}
                />
                <YAxis
                  type="category"
                  dataKey="shortName"
                  tick={{ fill: colors.dark, fontSize: 11 }}
                />
                <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                <Bar
                  dataKey="estimatePerUnit"
                  name="Estimate/Unit"
                  radius={[0, 4, 4, 0]}
                >
                  {planEstimates.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartBox>
        </div>
      </Section>

      {/* Section 3b: Square Footage by Plan */}
      <Section
        id="sqft-by-plan"
        title="Square Footage by Plan"
        sectionNumber={"3b"}
        sectionRef={section3bRef}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "3fr 2fr",
            gap: "20px",
          }}
        >
          <ChartBox
            title="Price per Square Foot vs Size"
            filename="price-per-sqft"
          >
            <p
              style={{
                fontSize: "0.8rem",
                color: colors.secondary,
                marginBottom: "15px",
              }}
            >
              Price per SF ranges from $217 to $230 with an average of $222/SF
              across all plans.
            </p>
            <ResponsiveContainer width="100%" height={250}>
              <ComposedChart
                data={pricePerSqftData}
                margin={{ top: 10, right: 30, left: 30, bottom: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={colors.accent}
                  opacity={0.5}
                />
                <XAxis
                  dataKey="sqft"
                  tick={{ fill: colors.dark, fontSize: 14 }}
                  label={{
                    value: "SF",
                    position: "insideBottomRight",
                    offset: -15,
                    style: { fontSize: 14 },
                  }}
                />
                <YAxis
                  domain={[200, 240]}
                  tickFormatter={(v) => `$${v}`}
                  tick={{ fill: colors.dark }}
                  label={{
                    value: "$/SF",
                    angle: -90,
                    position: "insideLeft",
                    dx: -15,
                    style: { textAnchor: "middle" },
                  }}
                />
                <Tooltip
                  formatter={(v, name) =>
                    name === "avg" ? `$${v}/SF (Avg)` : `$${v}/SF`
                  }
                  labelFormatter={(v) => `${v} SF`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pricePerSqft"
                  name="$/SF"
                  stroke={colors.primary}
                  strokeWidth={3}
                  dot={{ r: 6, fill: colors.primary }}
                />
                <Line
                  type="monotone"
                  dataKey="avg"
                  name="Average ($222/SF)"
                  stroke={colors.danger}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartBox>

          <ChartBox
            title="Square Footage Distribution"
            filename="sqft-horizontal"
          >
            <p
              style={{
                fontSize: "0.8rem",
                color: colors.secondary,
                marginBottom: "15px",
              }}
            >
              Two-story plans on 9,000 sqft lots offer larger floor plans than
              single-story options.
            </p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={planEstimates}
                layout="vertical"
                margin={{ left: 70, right: 30 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={colors.accent}
                  opacity={0.5}
                />
                <XAxis
                  type="number"
                  tickFormatter={(v) => `${v.toLocaleString()}`}
                  tick={{ fill: colors.dark }}
                />
                <YAxis
                  type="category"
                  dataKey="shortName"
                  tick={{ fill: colors.dark, fontSize: 11 }}
                />
                <Tooltip formatter={(v) => `${v.toLocaleString()} sqft`} />
                <Bar dataKey="sqft" name="Square Feet" radius={[0, 4, 4, 0]}>
                  {planEstimates.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartBox>
        </div>
      </Section>

      {/* Section 3c: Neighborhood Comparison */}
      <Section
        id="neighborhood-comparison"
        title="Neighborhood Comparison"
        sectionNumber={"3c"}
        sectionRef={section3cRef}
      >
        <ChartBox
          title="Price per SF Comparison - Silverwood vs Competitors"
          filename="neighborhood-comparison"
        >
          <p
            style={{
              fontSize: "0.8rem",
              color: colors.secondary,
              marginBottom: "15px",
            }}
          >
            Comparing $/SF across Silverwood Heights, Annsbury Park, and
            Chandler Run neighborhoods.
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart
              margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={colors.accent}
                opacity={0.5}
              />
              <XAxis
                dataKey="sqft"
                type="number"
                domain={[1800, 3000]}
                tick={{ fill: colors.dark, fontSize: 14 }}
                label={{
                  value: "SF",
                  position: "insideBottomRight",
                  offset: -5,
                  style: { fontSize: 14 },
                }}
                allowDuplicatedCategory={false}
              />
              <YAxis
                domain={[190, 250]}
                tickFormatter={(v) => `$${v}`}
                tick={{ fill: colors.dark }}
                label={{
                  value: "$/SF",
                  angle: -90,
                  position: "insideLeft",
                  dx: -15,
                  style: { textAnchor: "middle" },
                }}
              />
              <Tooltip
                formatter={(v) => `$${v}/SF`}
                labelFormatter={(v) => `${v} SF`}
              />
              <Legend />
              <Line
                data={silverwoodData}
                type="monotone"
                dataKey="pricePerSqft"
                name="Silverwood Heights"
                stroke={colors.primary}
                strokeWidth={3}
                dot={{ r: 6, fill: colors.primary }}
              />
              <Line
                data={annsburyData}
                type="monotone"
                dataKey="pricePerSqft"
                name="Annsbury Park"
                stroke={colors.warning}
                strokeWidth={3}
                dot={{ r: 6, fill: colors.warning }}
              />
              <Line
                data={chandlerData}
                type="monotone"
                dataKey="pricePerSqft"
                name="Chandler Run"
                stroke={colors.danger}
                strokeWidth={3}
                dot={{ r: 6, fill: colors.danger }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartBox>
      </Section>

      {/* Section 3d: Construction Cost by Plan */}
      <Section
        id="construction-cost"
        title="Construction Cost"
        sectionNumber={"3d"}
        sectionRef={section3dRef}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "3fr 2fr",
            gap: "20px",
          }}
        >
          <ChartBox
            title="Construction Cost per Square Foot vs Size"
            filename="construction-cost-sqft"
          >
            <p
              style={{
                fontSize: "0.8rem",
                color: colors.secondary,
                marginBottom: "15px",
              }}
            >
              Construction cost per SF ranges from $79.63 to $89.71 with an
              average of $84.06/SF across all plans.
            </p>
            <ResponsiveContainer width="100%" height={250}>
              <ComposedChart
                data={constructionCostData}
                margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={colors.accent}
                  opacity={0.5}
                />
                <XAxis
                  dataKey="sqft"
                  tick={{ fill: colors.dark, fontSize: "16px" }}
                  label={{
                    value: "SF",
                    position: "insideBottomRight",
                    offset: -5,
                    style: { fontSize: "0.85rem" },
                  }}
                />
                <YAxis
                  domain={[75, 95]}
                  tickFormatter={(v) => `$${v}`}
                  tick={{ fill: colors.dark }}
                  label={{
                    value: "$/SF",
                    angle: -90,
                    position: "insideLeft",
                    dx: "-1.5rem",
                    style: { textAnchor: "middle" },
                  }}
                />
                <Tooltip
                  formatter={(v, name) =>
                    name === "avg" ? `$${v}/SF (Avg)` : `$${v}/SF`
                  }
                  labelFormatter={(v) => `${v} SF`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="costPerSqft"
                  name="$/SF"
                  stroke={colors.primary}
                  strokeWidth={3}
                  dot={{ r: 6, fill: colors.primary }}
                />
                <Line
                  type="monotone"
                  dataKey="avg"
                  name="Average ($84.06/SF)"
                  stroke={colors.danger}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartBox>

          <ChartBox
            title="Construction Cost Distribution"
            filename="construction-cost-horizontal"
          >
            <p
              style={{
                fontSize: "0.8rem",
                color: colors.secondary,
                marginBottom: "15px",
              }}
            >
              Larger two-story plans have higher construction cost per SF due to
              complexity.
            </p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={constructionCostData}
                layout="vertical"
                margin={{ left: 10, right: 30 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={colors.accent}
                  opacity={0.5}
                />
                <XAxis
                  type="number"
                  domain={[75, 95]}
                  tickFormatter={(v) => `$${v}`}
                  tick={{ fill: colors.dark, fontSize: 11 }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fill: colors.dark, fontSize: 11 }}
                />
                <Tooltip formatter={(v) => `$${v.toFixed(2)}/SF`} />
                <Bar dataKey="costPerSqft" name="$/SF" radius={[0, 4, 4, 0]}>
                  {constructionCostData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={planEstimates[index]?.color || colors.primary}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartBox>
        </div>
      </Section>

      {/* Section 4: Cost Breakdown by Category */}
      <Section
        id="cost-breakdown"
        title="Cost Breakdown by Category"
        sectionNumber={4}
        sectionRef={section4Ref}
      >
        <p
          style={{
            fontSize: "0.95rem",
            color: colors.dark,
            lineHeight: 1.7,
            marginBottom: "20px",
          }}
        >
          Construction costs are broken into <strong>6 categories</strong>:
          Foundation, Framing, Exterior Envelope, MEP
          (Mechanical/Electrical/Plumbing), Interior Finishes, and Specialties.{" "}
          <strong>MEP consistently represents ~30%</strong> of costs across all
          plans.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          {/* Stacked Bar Chart */}
          <ChartBox
            title="Cost Breakdown by Plan (Stacked)"
            filename="stacked-breakdown-chart"
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={stackedBarData}
                margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={colors.accent}
                  opacity={0.5}
                />
                <XAxis
                  dataKey="plan"
                  tick={{ fill: colors.dark, fontSize: 11 }}
                />
                <YAxis
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
                  tick={{ fill: colors.dark }}
                />
                <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                <Legend />
                <Bar
                  dataKey="Foundation"
                  stackId="a"
                  fill={categoryColors.Foundation}
                />
                <Bar
                  dataKey="Framing"
                  stackId="a"
                  fill={categoryColors.Framing}
                />
                <Bar
                  dataKey="Exterior Envelope"
                  stackId="a"
                  fill={categoryColors["Exterior Envelope"]}
                />
                <Bar dataKey="MEP" stackId="a" fill={categoryColors.MEP} />
                <Bar
                  dataKey="Interior Finishes"
                  stackId="a"
                  fill={categoryColors["Interior Finishes"]}
                />
                <Bar
                  dataKey="Specialties"
                  stackId="a"
                  fill={categoryColors.Specialties}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartBox>

          {/* Average Breakdown Pie */}
          <ChartBox title="Average Cost Mix" filename="avg-breakdown-pie">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={avgBreakdownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${(percent * 100).toFixed(0)}%`
                  }
                >
                  {avgBreakdownData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              {avgBreakdownData.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "0.7rem",
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
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </ChartBox>
        </div>

        {/* Category Insights */}
        <div
          ref={categoryCardsRef}
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "12px",
            padding: "20px",
            backgroundColor: colors.light,
            borderRadius: "10px",
          }}
        >
          <ChartDownloadButton
            chartRef={categoryCardsRef}
            filename="cost-breakdown-category-cards"
          />
          {[
            {
              name: "Foundation",
              pct: "8-12%",
              desc: "Slab & footings",
              color: categoryColors.Foundation,
            },
            {
              name: "Framing",
              pct: "20-25%",
              desc: "Structure & roof",
              color: categoryColors.Framing,
            },
            {
              name: "Ext. Envelope",
              pct: "15-17%",
              desc: "Siding, windows",
              color: categoryColors["Exterior Envelope"],
            },
            {
              name: "MEP",
              pct: "30-32%",
              desc: "HVAC, electrical, plumbing",
              color: categoryColors.MEP,
            },
            {
              name: "Int. Finishes",
              pct: "17-20%",
              desc: "Drywall, flooring, trim",
              color: categoryColors["Interior Finishes"],
            },
            {
              name: "Specialties",
              pct: "3-5%",
              desc: "Appliances, misc",
              color: categoryColors.Specialties,
            },
          ].map((cat, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: "22px",
                boxShadow: "0 4px 20px rgba(45, 90, 74, 0.1)",
                border: `1px solid ${colors.accent}`,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "1.8rem", marginBottom: "8px" }}>
                {["🏗️", "🪵", "🏠", "⚡", "🎨", "🔧"][i]}
              </div>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: colors.primary,
                  marginBottom: "5px",
                }}
              >
                {cat.pct}
              </div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  color: colors.dark,
                  marginBottom: "4px",
                }}
              >
                {cat.name}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: colors.secondary,
                  fontFamily: "'Source Sans Pro', sans-serif",
                }}
              >
                {cat.desc}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Section 5: Detailed Plan Comparison Table */}
      <Section
        id="plan-comparison"
        title="Detailed Plan Comparison"
        sectionNumber={5}
        sectionRef={section5Ref}
      >
        <ChartBox filename="plan-comparison-table">
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.85rem",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: colors.primary, color: "#fff" }}>
                <th style={{ padding: "12px", textAlign: "left" }}>
                  Plan Name
                </th>
                <th style={{ padding: "12px", textAlign: "center" }}>
                  Configuration
                </th>
                <th style={{ padding: "12px", textAlign: "center" }}>
                  Lot Size
                </th>
                <th style={{ padding: "12px", textAlign: "right" }}>Sq Ft</th>
                <th style={{ padding: "12px", textAlign: "right" }}>$/Sq Ft</th>
                <th style={{ padding: "12px", textAlign: "right" }}>
                  Est/Unit
                </th>
                <th style={{ padding: "12px", textAlign: "center" }}>Units</th>
                <th style={{ padding: "12px", textAlign: "right" }}>
                  Total Cost
                </th>
              </tr>
            </thead>
            <tbody>
              {planEstimates.map((plan, idx) => (
                <tr
                  key={idx}
                  style={{
                    backgroundColor: idx % 2 === 0 ? "#fff" : colors.light,
                  }}
                >
                  <td
                    style={{
                      padding: "12px",
                      fontWeight: 600,
                      color: plan.color,
                    }}
                  >
                    {plan.name}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      textAlign: "center",
                      fontSize: "0.8rem",
                    }}
                  >
                    {plan.config}
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    {plan.lotSize.toLocaleString()}
                  </td>
                  <td style={{ padding: "12px", textAlign: "right" }}>
                    {plan.sqft.toLocaleString()}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      textAlign: "right",
                      fontWeight: 600,
                    }}
                  >
                    ${plan.costPerSqft.toFixed(2)}
                  </td>
                  <td style={{ padding: "12px", textAlign: "right" }}>
                    ${plan.estimatePerUnit.toLocaleString()}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      textAlign: "center",
                      fontWeight: 600,
                    }}
                  >
                    {plan.units}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      textAlign: "right",
                      fontWeight: 600,
                      color: colors.success,
                    }}
                  >
                    ${(plan.totalCost / 1000000).toFixed(2)}M
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ backgroundColor: colors.secondary, color: "#fff" }}>
                <td style={{ padding: "12px", fontWeight: 700 }} colSpan={4}>
                  TOTAL
                </td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "right",
                    fontWeight: 700,
                  }}
                >
                  ${avgCostPerSqft.toFixed(2)} avg
                </td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "right",
                    fontWeight: 700,
                  }}
                >
                  ${Math.round(avgEstimatePerUnit / 1000)}K avg
                </td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    fontWeight: 700,
                  }}
                >
                  {totalUnits}
                </td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "right",
                    fontWeight: 700,
                  }}
                >
                  ${(totalCost / 1000000).toFixed(2)}M
                </td>
              </tr>
            </tfoot>
          </table>
        </ChartBox>
      </Section>

      {/* Summary */}
      <section
        ref={summaryRef}
        style={{
          backgroundColor: colors.primary,
          borderRadius: "12px",
          padding: "30px",
          color: "#fff",
          marginBottom: "25px",
          position: "relative",
        }}
      >
        <DownloadButton sectionRef={summaryRef} filename="estimates-summary" />
        <h2
          style={{
            fontSize: "1.4rem",
            marginBottom: "20px",
            borderBottom: `2px solid ${colors.accent}`,
            paddingBottom: "12px",
            paddingRight: "120px",
          }}
        >
          📊 Construction Estimates Summary
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
              💰 Total Investment
            </h4>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.5, margin: 0 }}>
              ${(totalCost / 1000000).toFixed(2)}M in construction hard costs
              for 180 homes across 6 plans. Excludes land, soft costs, and
              financing.
            </p>
          </div>
          <div>
            <h4 style={{ color: colors.accent, marginBottom: "8px" }}>
              📐 Cost Efficiency
            </h4>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.5, margin: 0 }}>
              $79-$90/sqft range reflects efficient design. Single-story plans
              most cost-effective. Two-story commands premium for complexity.
            </p>
          </div>
          <div>
            <h4 style={{ color: colors.accent, marginBottom: "8px" }}>
              🔧 MEP Dominance
            </h4>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.5, margin: 0 }}>
              MEP (30-32%) is largest cost category across all plans—HVAC,
              electrical, plumbing drive home functionality and code compliance.
            </p>
          </div>
          <div>
            <h4 style={{ color: colors.accent, marginBottom: "8px" }}>
              🏠 Plan Mix
            </h4>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.5, margin: 0 }}>
              Entry-level (Havenwood/Sterling) at $171-179K. Premium
              (Kirkwood/Ingram/Riverbend) at $226-262K. Serves diverse buyer
              segments.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
