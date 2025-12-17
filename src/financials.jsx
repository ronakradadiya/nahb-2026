import React, { useState, useRef } from "react";
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
  AreaChart,
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
  chart: ["#2D5A4A", "#8B4513", "#D4A574", "#6B8E7D", "#A0522D", "#C9A227"],
};

// ============================================
// RAW DATA - UPDATE THIS SECTION ONLY
// ============================================

const RAW_DATA = {
  // Project Info
  projectName: "Silverwood Heights",
  
  // Home Plans - Update values here
  homePlans: [
    { name: "The Havenwood", units: 36, sqft: 2156, basePrice: 484000, buyerBonus: 10500 },
    { name: "The Sterling", units: 37, sqft: 2212, basePrice: 494000, buyerBonus: 10750 },
    { name: "The Brookside", units: 37, sqft: 2327, basePrice: 515000, buyerBonus: 11500 },
    { name: "The Kirkwood", units: 24, sqft: 2696, basePrice: 595000, buyerBonus: 13000 },
    { name: "The Ingram", units: 24, sqft: 2705, basePrice: 605000, buyerBonus: 13500 },
    { name: "The Riverbend", units: 22, sqft: 2924, basePrice: 635000, buyerBonus: 14500 },
  ],

  // Variable Cost Rates (as percentage of base price or fixed amounts)
  variableCostRates: {
    constInterestPts: 0.03,      // 3% of base price
    escrowClosing: 0.005,        // 0.5% of base price
    warranty: 0.0025,            // 0.25% of base price
    reCommission: 0.03,          // 3% of base price
    reCommissionExt: 0.03,       // 3% of base price
    insuranceGeneral: 0.005,     // 0.5% of base price
    insuranceBuilder: 0.0025,    // 0.25% of base price
    hbaDues: 27,                 // Fixed per unit
  },

  // Scenario Data (from Financial Analysis document)
  scenarios: {
    best: { 
      revenue: 107.73, 
      totalCost: 78.88, 
      profit: 28.85, 
      roi: 36.60, 
      irr: "32-34%",
      driver: "+5% price, −2% cost"
    },
    baseline: { 
      revenue: 102.60, 
      totalCost: 80.49, 
      profit: 22.11, 
      roi: 27.47,
      irr: "28.40%",
      driver: "As modeled"
    },
    worst: { 
      revenue: 97.47, 
      totalCost: 82.10, 
      profit: 15.37, 
      roi: 18.70, 
      irr: "21-23%",
      driver: "−5% price, +2% cost"
    },
  },

  // Draw Schedule (from Financial Analysis document)
  drawSchedule: [
    { draw: "Draw 1", amountMin: 11.0, amountMax: 11.5, timing: "Months 1-2", purpose: "Land acquisition, soft costs, early carry" },
    { draw: "Draw 2", amountMin: 4.0, amountMax: 4.5, timing: "Months 5-6", purpose: "Peak site development, utilities" },
    { draw: "Draw 3", amountMin: 3.5, amountMax: 4.0, timing: "Months 11-12", purpose: "Vertical construction ramp (Phase 1)" },
    { draw: "Draw 4", amountMin: 2.5, amountMax: 3.0, timing: "Months 17-18", purpose: "Peak vertical + interest carry" },
  ],

  // Lot Sell-Off Strategy (Risk Mitigation)
  lotSellOff: {
    availableLots: 37,
    percentageOfTotal: 20.56,
    profitMargin: 17,
    totalCost: 2.83,  // in millions
    salesPrice: 3.31, // in millions
  },

  // Absorption Rate Info
  absorptionRate: {
    early: "Limited or no closings",
    mid: "3-5 closings/month",
    later: "6-7 closings/month",
  },

  // Cost Breakdown (in thousands)
  costBreakdown: [
    { category: "Land Acquisition", value: 11035 },
    { category: "Land Soft Costs", value: 222 },
    { category: "Horizontal Dev", value: 7181 },
    { category: "Vertical Construction", value: 46500 },
    { category: "Arch/Product", value: 795 },
    { category: "Interest", value: 5556 },
    { category: "Other (Model, HOA)", value: 3000 },
  ],

  // Monthly Cash Flow Data (in thousands)
  monthlyCashFlow: [
    { month: "May 26", totalCost: 842, revenue: 0, closings: 0 },
    { month: "Jun 26", totalCost: 842, revenue: 0, closings: 0 },
    { month: "Jul 26", totalCost: 11878, revenue: 0, closings: 0 },
    { month: "Aug 26", totalCost: 842, revenue: 0, closings: 0 },
    { month: "Sep 26", totalCost: 842, revenue: 0, closings: 0 },
    { month: "Oct 26", totalCost: 842, revenue: 0, closings: 0 },
    { month: "Nov 26", totalCost: 842, revenue: 0, closings: 0 },
    { month: "Dec 26", totalCost: 811, revenue: 0, closings: 0 },
    { month: "Jan 27", totalCost: 811, revenue: 0, closings: 0 },
    { month: "Feb 27", totalCost: 811, revenue: 0, closings: 0 },
    { month: "Mar 27", totalCost: 93, revenue: 0, closings: 0 },
    { month: "Apr 27", totalCost: 93, revenue: 0, closings: 0 },
    { month: "May 27", totalCost: 881, revenue: 0, closings: 0 },
    { month: "Jun 27", totalCost: 881, revenue: 0, closings: 0 },
    { month: "Jul 27", totalCost: 881, revenue: 0, closings: 0 },
    { month: "Aug 27", totalCost: 881, revenue: 0, closings: 0 },
    { month: "Sep 27", totalCost: 881, revenue: 0, closings: 0 },
    { month: "Oct 27", totalCost: 881, revenue: 0, closings: 0 },
    { month: "Nov 27", totalCost: 881, revenue: 0, closings: 0 },
    { month: "Dec 27", totalCost: 881, revenue: 0, closings: 0 },
    { month: "Jan 28", totalCost: 902, revenue: 0, closings: 0 },
    { month: "Feb 28", totalCost: 881, revenue: 0, closings: 0 },
    { month: "Mar 28", totalCost: 755, revenue: 1585, closings: 3 },
    { month: "Apr 28", totalCost: 755, revenue: 1585, closings: 3 },
    { month: "May 28", totalCost: 755, revenue: 1585, closings: 3 },
    { month: "Jun 28", totalCost: 755, revenue: 1585, closings: 3 },
    { month: "Jul 28", totalCost: 755, revenue: 1585, closings: 3 },
    { month: "Aug 28", totalCost: 755, revenue: 1585, closings: 3 },
    { month: "Sep 28", totalCost: 755, revenue: 1585, closings: 3 },
    { month: "Oct 28", totalCost: 755, revenue: 1585, closings: 3 },
    { month: "Nov 28", totalCost: 755, revenue: 1585, closings: 3 },
    { month: "Dec 28", totalCost: 755, revenue: 1585, closings: 3 },
    { month: "Jan 29", totalCost: 755, revenue: 1585, closings: 3 },
    { month: "Feb 29", totalCost: 1691, revenue: 1585, closings: 3 },
    { month: "Mar 29", totalCost: 1047, revenue: 2642, closings: 5 },
    { month: "Apr 29", totalCost: 1047, revenue: 2642, closings: 5 },
    { month: "May 29", totalCost: 1047, revenue: 2642, closings: 5 },
    { month: "Jun 29", totalCost: 1047, revenue: 2642, closings: 5 },
    { month: "Jul 29", totalCost: 1047, revenue: 2642, closings: 5 },
    { month: "Aug 29", totalCost: 1047, revenue: 2642, closings: 5 },
    { month: "Sep 29", totalCost: 1047, revenue: 2642, closings: 5 },
    { month: "Oct 29", totalCost: 1047, revenue: 2642, closings: 5 },
    { month: "Nov 29", totalCost: 1047, revenue: 2642, closings: 5 },
    { month: "Dec 29", totalCost: 1047, revenue: 2642, closings: 5 },
    { month: "Jan 30", totalCost: 1047, revenue: 2642, closings: 5 },
    { month: "Feb 30", totalCost: 1047, revenue: 2642, closings: 5 },
    { month: "Mar 30", totalCost: 982, revenue: 3699, closings: 7 },
    { month: "Apr 30", totalCost: 982, revenue: 3699, closings: 7 },
    { month: "May 30", totalCost: 982, revenue: 3699, closings: 7 },
    { month: "Jun 30", totalCost: 982, revenue: 3699, closings: 7 },
    { month: "Jul 30", totalCost: 982, revenue: 3699, closings: 7 },
    { month: "Aug 30", totalCost: 982, revenue: 3699, closings: 7 },
    { month: "Sep 30", totalCost: 982, revenue: 3699, closings: 7 },
    { month: "Oct 30", totalCost: 982, revenue: 3699, closings: 7 },
    { month: "Nov 30", totalCost: 982, revenue: 3699, closings: 7 },
    { month: "Dec 30", totalCost: 982, revenue: 3699, closings: 7 },
    { month: "Jan 31", totalCost: 982, revenue: 3699, closings: 7 },
    { month: "Feb 31", totalCost: 982, revenue: 3699, closings: 7 },
    { month: "Mar 31", totalCost: 976, revenue: 0, closings: 0 },
  ],
};

// ============================================
// COMPUTED DATA - AUTO-CALCULATED FROM RAW_DATA
// ============================================

// Process home plans with computed fields
const homePlansData = RAW_DATA.homePlans.map((plan, idx) => ({
  ...plan,
  netPrice: plan.basePrice - plan.buyerBonus,
  pricePerSqFt: Math.round(plan.basePrice / plan.sqft),
  totalRevenue: (plan.basePrice - plan.buyerBonus) * plan.units,
  color: colors.chart[idx % colors.chart.length],
}));

// Total units
const totalUnits = homePlansData.reduce((sum, p) => sum + p.units, 0);

// Total revenue (in millions)
const totalRevenue = homePlansData.reduce((sum, p) => sum + p.totalRevenue, 0) / 1000000;

// Variable costs computed per plan
const variableCostsData = homePlansData.map(plan => {
  const rates = RAW_DATA.variableCostRates;
  const constInterest = Math.round(plan.basePrice * rates.constInterestPts);
  const escrow = Math.round(plan.basePrice * rates.escrowClosing);
  const warranty = Math.round(plan.basePrice * rates.warranty);
  const reComm = Math.round(plan.basePrice * rates.reCommission);
  const reCommExt = Math.round(plan.basePrice * rates.reCommissionExt);
  const insurance = Math.round(plan.basePrice * (rates.insuranceGeneral + rates.insuranceBuilder));
  const total = constInterest + escrow + warranty + reComm + reCommExt + insurance + rates.hbaDues;
  
  return {
    name: plan.name.replace("The ", ""),
    constInterest,
    escrow,
    warranty,
    reComm,
    reCommExt,
    insurance,
    hbaDues: rates.hbaDues,
    total,
  };
});

// Fixed costs total (from cost breakdown, in millions)
const fixedCostsTotal = RAW_DATA.costBreakdown.reduce((sum, c) => sum + c.value, 0) / 1000;

// Variable costs total (in millions)
const variableCostsTotal = variableCostsData.reduce((sum, v, idx) => {
  return sum + (v.total * RAW_DATA.homePlans[idx].units);
}, 0) / 1000000;

// Total costs (in millions)
const totalCosts = fixedCostsTotal + variableCostsTotal;

// Profit
const totalProfit = totalRevenue - totalCosts;

// ROI
const roi = (totalProfit / totalCosts) * 100;

// IRR (simplified calculation based on baseline)
const irr = roi + 1;

// Scenario data from explicit proforma values
const scenarioData = [
  {
    scenario: "Best Case",
    revenue: RAW_DATA.scenarios.best.revenue,
    totalCost: RAW_DATA.scenarios.best.totalCost,
    profit: RAW_DATA.scenarios.best.profit,
    roi: RAW_DATA.scenarios.best.roi,
    irr: RAW_DATA.scenarios.best.irr,
    driver: RAW_DATA.scenarios.best.driver,
  },
  {
    scenario: "Baseline",
    revenue: RAW_DATA.scenarios.baseline.revenue,
    totalCost: RAW_DATA.scenarios.baseline.totalCost,
    profit: RAW_DATA.scenarios.baseline.profit,
    roi: RAW_DATA.scenarios.baseline.roi,
    irr: RAW_DATA.scenarios.baseline.irr,
    driver: RAW_DATA.scenarios.baseline.driver,
  },
  {
    scenario: "Worst Case",
    revenue: RAW_DATA.scenarios.worst.revenue,
    totalCost: RAW_DATA.scenarios.worst.totalCost,
    profit: RAW_DATA.scenarios.worst.profit,
    roi: RAW_DATA.scenarios.worst.roi,
    irr: RAW_DATA.scenarios.worst.irr,
    driver: RAW_DATA.scenarios.worst.driver,
  },
];

// Draw schedule formatted
const drawScheduleData = RAW_DATA.drawSchedule.map(d => ({
  ...d,
  amount: `$${d.amountMin}M – $${d.amountMax}M`,
}));

// Total draw amounts
const totalDrawMin = RAW_DATA.drawSchedule.reduce((sum, d) => sum + d.amountMin, 0);
const totalDrawMax = RAW_DATA.drawSchedule.reduce((sum, d) => sum + d.amountMax, 0);

// Cost breakdown with colors
const costBreakdownColors = [colors.primary, colors.secondary, colors.accent, colors.success, colors.warning, colors.danger, colors.blue];
const costBreakdownData = RAW_DATA.costBreakdown.map((item, idx) => ({
  ...item,
  color: costBreakdownColors[idx % costBreakdownColors.length],
}));

// Monthly cash flow with net and cumulative
let cumulative = 0;
const monthlyCashFlowData = RAW_DATA.monthlyCashFlow.map(item => {
  const netCashFlow = item.revenue - item.totalCost;
  cumulative += netCashFlow;
  return { ...item, netCashFlow, cumulative };
});

// Find breakeven month
const breakevenMonth = monthlyCashFlowData.find(m => m.cumulative > 0)?.month || "N/A";

// Max closings per month
const maxClosings = Math.max(...RAW_DATA.monthlyCashFlow.map(m => m.closings));
const minClosingsActive = Math.min(...RAW_DATA.monthlyCashFlow.filter(m => m.closings > 0).map(m => m.closings));

// Units distribution for pie chart
const unitsDistributionData = homePlansData.map(plan => ({
  name: plan.name.replace("The ", ""),
  value: plan.units,
  color: plan.color,
}));

// Price per sq ft for charts
const pricePerSqFtData = homePlansData.map(plan => ({
  name: plan.name.replace("The ", ""),
  pricePerSqFt: plan.pricePerSqFt,
  sqft: plan.sqft,
}));

// Price range
const priceMin = Math.min(...homePlansData.map(p => p.basePrice));
const priceMax = Math.max(...homePlansData.map(p => p.basePrice));

// Key metrics for display (using baseline scenario values from proforma)
const keyMetrics = {
  totalUnits,
  totalRevenue: `$${RAW_DATA.scenarios.baseline.revenue}M`,
  totalCosts: `$${RAW_DATA.scenarios.baseline.totalCost}M`,
  totalProfit: `$${RAW_DATA.scenarios.baseline.profit}M`,
  roi: `${RAW_DATA.scenarios.baseline.roi}%`,
  irr: RAW_DATA.scenarios.baseline.irr,
  priceRange: `$${(priceMin/1000).toFixed(0)}K - $${(priceMax/1000).toFixed(0)}K`,
};

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
    <DownloadButton sectionRef={sectionRef} filename={`section-${sectionNumber}-${id}`} />
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
        <h3 style={{ color: colors.primary, marginBottom: "15px", fontSize: "1.1rem", paddingRight: "40px" }}>
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
        <p style={{ margin: 0, fontWeight: 600, color: colors.dark }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ margin: "4px 0 0", color: entry.color || colors.dark }}>
            {entry.name}: {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
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

export default function Financials() {
  const headerRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const section5Ref = useRef(null);
  const section6Ref = useRef(null);
  const section7Ref = useRef(null);
  const section8Ref = useRef(null);
  const summaryRef = useRef(null);

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
        ref={headerRef}
        style={{
          textAlign: "center",
          marginBottom: "40px",
          borderBottom: `3px solid ${colors.primary}`,
          paddingBottom: "25px",
          position: "relative",
        }}
      >
        <DownloadButton sectionRef={headerRef} filename="header-financials" />
        <h1
          style={{
            fontSize: "2.5rem",
            color: colors.primary,
            margin: 0,
            letterSpacing: "2px",
          }}
        >
          FINANCIAL ANALYSIS
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
          {RAW_DATA.projectName} | Proforma & Cash Flow Projections
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
          <span style={{ backgroundColor: colors.primary, color: "#fff", padding: "6px 16px", borderRadius: "20px", fontSize: "0.85rem" }}>
            {keyMetrics.totalUnits} Units
          </span>
          <span style={{ backgroundColor: colors.secondary, color: "#fff", padding: "6px 16px", borderRadius: "20px", fontSize: "0.85rem" }}>
            {keyMetrics.totalRevenue} Revenue
          </span>
          <span style={{ backgroundColor: colors.success, color: "#fff", padding: "6px 16px", borderRadius: "20px", fontSize: "0.85rem" }}>
            {keyMetrics.roi} ROI
          </span>
          <span style={{ backgroundColor: colors.blue, color: "#fff", padding: "6px 16px", borderRadius: "20px", fontSize: "0.85rem" }}>
            {keyMetrics.irr} IRR
          </span>
        </div>
      </header>

      {/* Section 1: Key Financial Metrics */}
      <Section id="key-metrics" title="Key Financial Metrics" sectionNumber={1} sectionRef={section1Ref}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "15px" }}>
          {[
            { label: "Total Revenue", value: keyMetrics.totalRevenue, icon: "💰", color: colors.primary },
            { label: "Total Costs", value: keyMetrics.totalCosts, icon: "📊", color: colors.secondary },
            { label: "Total Profit", value: keyMetrics.totalProfit, icon: "📈", color: colors.success },
            { label: "ROI", value: keyMetrics.roi, icon: "🎯", color: colors.warning },
            { label: "IRR", value: keyMetrics.irr, icon: "⚡", color: colors.blue },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: "22px",
                boxShadow: "0 4px 20px rgba(45, 90, 74, 0.1)",
                textAlign: "center",
                borderTop: `4px solid ${item.color}`,
              }}
            >
              <div style={{ fontSize: "1.8rem", marginBottom: "8px" }}>{item.icon}</div>
              <div style={{ fontSize: "1.6rem", fontWeight: 700, color: item.color, marginBottom: "5px" }}>
                {item.value}
              </div>
              <div style={{ fontSize: "0.8rem", color: colors.secondary, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Section 2: Product Mix & Pricing */}
      <Section id="product-mix" title="Product Mix & Pricing" sectionNumber={2} sectionRef={section2Ref}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px", marginBottom: "20px" }}>
          <ChartBox title="Home Plans Overview" filename="home-plans-chart">
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={homePlansData.map(p => ({ ...p, name: p.name.replace("The ", "") }))}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.accent} opacity={0.5} />
                <XAxis dataKey="name" tick={{ fill: colors.dark, fontSize: 10 }} />
                <YAxis yAxisId="left" tickFormatter={(v) => `$${v/1000}K`} tick={{ fill: colors.dark }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: colors.secondary }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar yAxisId="left" dataKey="basePrice" name="Base Price" fill={colors.primary} radius={[4, 4, 0, 0]} />
                <Bar yAxisId="left" dataKey="netPrice" name="Net Price" fill={colors.accent} radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="units" name="Units" stroke={colors.danger} strokeWidth={3} dot={{ r: 5 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartBox>

          <ChartBox title="Unit Distribution" filename="unit-distribution-pie">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={unitsDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={{ stroke: colors.dark, strokeWidth: 1 }}
                >
                  {unitsDistributionData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `${v} units`} />
              </PieChart>
            </ResponsiveContainer>
          </ChartBox>
        </div>

        {/* Home Plans Table */}
        <ChartBox filename="home-plans-table">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ backgroundColor: colors.primary, color: "#fff" }}>
                <th style={{ padding: "12px", textAlign: "left" }}>Plan Name</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Units</th>
                <th style={{ padding: "12px", textAlign: "right" }}>Sq Ft</th>
                <th style={{ padding: "12px", textAlign: "right" }}>Base Price</th>
                <th style={{ padding: "12px", textAlign: "right" }}>Buyer Bonus</th>
                <th style={{ padding: "12px", textAlign: "right" }}>Net Price</th>
                <th style={{ padding: "12px", textAlign: "right" }}>$/Sq Ft</th>
              </tr>
            </thead>
            <tbody>
              {homePlansData.map((plan, idx) => (
                <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? "#fff" : colors.light }}>
                  <td style={{ padding: "12px", fontWeight: 600, color: colors.primary }}>{plan.name}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{plan.units}</td>
                  <td style={{ padding: "12px", textAlign: "right" }}>{plan.sqft.toLocaleString()}</td>
                  <td style={{ padding: "12px", textAlign: "right" }}>${plan.basePrice.toLocaleString()}</td>
                  <td style={{ padding: "12px", textAlign: "right", color: colors.danger }}>${plan.buyerBonus.toLocaleString()}</td>
                  <td style={{ padding: "12px", textAlign: "right", fontWeight: 600, color: colors.success }}>${plan.netPrice.toLocaleString()}</td>
                  <td style={{ padding: "12px", textAlign: "right" }}>${plan.pricePerSqFt}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ backgroundColor: colors.secondary, color: "#fff" }}>
                <td style={{ padding: "12px", fontWeight: 600 }}>TOTAL</td>
                <td style={{ padding: "12px", textAlign: "center", fontWeight: 600 }}>{totalUnits}</td>
                <td style={{ padding: "12px", textAlign: "right" }}>—</td>
                <td style={{ padding: "12px", textAlign: "right" }}>—</td>
                <td style={{ padding: "12px", textAlign: "right" }}>—</td>
                <td style={{ padding: "12px", textAlign: "right", fontWeight: 600 }}>{keyMetrics.totalRevenue}</td>
                <td style={{ padding: "12px", textAlign: "right" }}>—</td>
              </tr>
            </tfoot>
          </table>
        </ChartBox>
      </Section>

      {/* Section 3: Scenario Analysis */}
      <Section id="scenario-analysis" title="Scenario Analysis" sectionNumber={3} sectionRef={section3Ref}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <ChartBox title="Scenario Comparison" filename="scenario-comparison-chart">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={scenarioData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.accent} opacity={0.5} />
                <XAxis dataKey="scenario" tick={{ fill: colors.dark }} />
                <YAxis tickFormatter={(v) => `$${v}M`} tick={{ fill: colors.dark }} />
                <Tooltip formatter={(v) => `$${v}M`} />
                <Legend />
                <Bar dataKey="revenue" name="Revenue" fill={colors.primary} radius={[4, 4, 0, 0]} />
                <Bar dataKey="totalCost" name="Total Cost" fill={colors.accent} radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" name="Profit" fill={colors.success} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartBox>

          <ChartBox filename="scenario-details-table">
            <h3 style={{ color: colors.primary, marginBottom: "15px", fontSize: "1.1rem" }}>Scenario Details</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
              <thead>
                <tr style={{ backgroundColor: colors.primary, color: "#fff" }}>
                  <th style={{ padding: "10px", textAlign: "left" }}>Scenario</th>
                  <th style={{ padding: "10px", textAlign: "right" }}>Revenue</th>
                  <th style={{ padding: "10px", textAlign: "right" }}>Profit</th>
                  <th style={{ padding: "10px", textAlign: "right" }}>ROI</th>
                  <th style={{ padding: "10px", textAlign: "right" }}>IRR</th>
                </tr>
              </thead>
              <tbody>
                {scenarioData.map((s, idx) => (
                  <tr key={idx} style={{ backgroundColor: idx === 1 ? "#E8F5E9" : idx % 2 === 0 ? "#fff" : colors.light }}>
                    <td style={{ padding: "10px", fontWeight: 600 }}>{s.scenario}</td>
                    <td style={{ padding: "10px", textAlign: "right" }}>${s.revenue}M</td>
                    <td style={{ padding: "10px", textAlign: "right", color: colors.success, fontWeight: 600 }}>${s.profit}M</td>
                    <td style={{ padding: "10px", textAlign: "right" }}>{s.roi}%</td>
                    <td style={{ padding: "10px", textAlign: "right" }}>{s.irr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: "15px", fontSize: "0.8rem", color: colors.secondary }}>
              <strong>Key Drivers:</strong>
              <ul style={{ margin: "8px 0 0", paddingLeft: "20px", lineHeight: 1.8 }}>
                <li><strong>Best:</strong> {scenarioData[0].driver}</li>
                <li><strong>Baseline:</strong> {scenarioData[1].driver}</li>
                <li><strong>Worst:</strong> {scenarioData[2].driver}</li>
              </ul>
            </div>
          </ChartBox>
        </div>
      </Section>

      {/* Section 4: Monthly Cash Flow */}
      <Section id="cash-flow" title="Monthly Cash Flow Analysis" sectionNumber={4} sectionRef={section4Ref}>
        <ChartBox title="Monthly Cash Flow (in $000s)" filename="monthly-cashflow-chart">
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={monthlyCashFlowData.filter((_, i) => i % 2 === 0)} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.accent} opacity={0.5} />
              <XAxis dataKey="month" tick={{ fill: colors.dark, fontSize: 9 }} angle={-45} textAnchor="end" height={60} />
              <YAxis tickFormatter={(v) => `$${v}K`} tick={{ fill: colors.dark }} />
              <Tooltip formatter={(v) => `$${v.toLocaleString()}K`} />
              <Legend />
              <Bar dataKey="revenue" name="Revenue" fill={colors.success} radius={[2, 2, 0, 0]} />
              <Bar dataKey="totalCost" name="Costs" fill={colors.danger} radius={[2, 2, 0, 0]} />
              <Line type="monotone" dataKey="netCashFlow" name="Net Cash Flow" stroke={colors.primary} strokeWidth={2} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartBox>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
          <ChartBox title="Cumulative Cash Flow" filename="cumulative-cashflow-chart">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={monthlyCashFlowData.filter((_, i) => i % 2 === 0)} margin={{ top: 10, right: 30, left: 10, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.accent} opacity={0.5} />
                <XAxis dataKey="month" tick={{ fill: colors.dark, fontSize: 8 }} angle={-45} textAnchor="end" height={50} />
                <YAxis tickFormatter={(v) => `$${v}K`} tick={{ fill: colors.dark }} />
                <Tooltip formatter={(v) => `$${v.toLocaleString()}K`} />
                <Area type="monotone" dataKey="cumulative" name="Cumulative" stroke={colors.primary} fill={colors.primary} fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
            <div style={{ marginTop: "10px", padding: "10px", backgroundColor: colors.light, borderRadius: "6px", fontSize: "0.8rem" }}>
              <strong>Breakeven:</strong> {breakevenMonth}
            </div>
          </ChartBox>

          <ChartBox title="Monthly Closings" filename="monthly-closings-chart">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyCashFlowData.filter((_, i) => i % 2 === 0 && i > 20)} margin={{ top: 10, right: 30, left: 10, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.accent} opacity={0.5} />
                <XAxis dataKey="month" tick={{ fill: colors.dark, fontSize: 8 }} angle={-45} textAnchor="end" height={50} />
                <YAxis tick={{ fill: colors.dark }} />
                <Tooltip />
                <Bar dataKey="closings" name="Closings" fill={colors.secondary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div style={{ marginTop: "10px", padding: "10px", backgroundColor: colors.light, borderRadius: "6px", fontSize: "0.8rem" }}>
              <strong>Sales Velocity:</strong> {minClosingsActive}-{maxClosings} closings/month during active sales period
            </div>
          </ChartBox>
        </div>
      </Section>

      {/* Section 5: Cost Breakdown */}
      <Section id="cost-breakdown" title="Cost Breakdown" sectionNumber={5} sectionRef={section5Ref}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <ChartBox title="Cost Distribution" filename="cost-distribution-pie">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={costBreakdownData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={{ stroke: colors.dark, strokeWidth: 1 }}
                >
                  {costBreakdownData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `$${v.toLocaleString()}K`} />
              </PieChart>
            </ResponsiveContainer>
          </ChartBox>

          <ChartBox title="Variable Costs by Plan" filename="variable-costs-chart">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={variableCostsData} layout="vertical" margin={{ left: 70, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.accent} opacity={0.5} />
                <XAxis type="number" tickFormatter={(v) => `$${v/1000}K`} tick={{ fill: colors.dark }} />
                <YAxis type="category" dataKey="name" tick={{ fill: colors.dark, fontSize: 11 }} />
                <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                <Bar dataKey="total" name="Total Variable Costs" fill={colors.primary} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartBox>
        </div>
      </Section>

      {/* Section 6: Draw Schedule */}
      <Section id="draw-schedule" title="Draw Schedule" sectionNumber={6} sectionRef={section6Ref}>
        <ChartBox filename="draw-schedule-table">
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${drawScheduleData.length}, 1fr)`, gap: "20px" }}>
            {drawScheduleData.map((draw, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: colors.light,
                  borderRadius: "10px",
                  padding: "20px",
                  textAlign: "center",
                  borderTop: `4px solid ${colors.chart[idx % colors.chart.length]}`,
                }}
              >
                <div style={{ fontSize: "1.5rem", fontWeight: 700, color: colors.primary, marginBottom: "5px" }}>
                  {draw.draw}
                </div>
                <div style={{ fontSize: "1.2rem", fontWeight: 600, color: colors.secondary, marginBottom: "10px" }}>
                  {draw.amount}
                </div>
                <div style={{ fontSize: "0.85rem", color: colors.dark, marginBottom: "8px" }}>
                  <strong>{draw.timing}</strong>
                </div>
                <div style={{ fontSize: "0.8rem", color: colors.secondary }}>
                  {draw.purpose}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#E3F2FD", borderRadius: "8px", borderLeft: `4px solid ${colors.blue}` }}>
            <strong>Total Estimated Draws:</strong> ${totalDrawMin}M – ${totalDrawMax}M over 18 months
          </div>
        </ChartBox>
      </Section>

      {/* Section 7: Price Analysis */}
      <Section id="price-analysis" title="Price per Square Foot Analysis" sectionNumber={7} sectionRef={section7Ref}>
        <ChartBox title="Price/Sq Ft by Plan" filename="price-sqft-chart">
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={pricePerSqFtData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.accent} opacity={0.5} />
              <XAxis dataKey="name" tick={{ fill: colors.dark }} />
              <YAxis yAxisId="left" tickFormatter={(v) => `$${v}`} tick={{ fill: colors.dark }} domain={['dataMin - 10', 'dataMax + 10']} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: colors.secondary }} />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="pricePerSqFt" name="$/Sq Ft" fill={colors.primary} radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="sqft" name="Square Feet" stroke={colors.secondary} strokeWidth={3} dot={{ r: 5 }} />
            </ComposedChart>
          </ResponsiveContainer>
          <div style={{ marginTop: "15px", padding: "12px", backgroundColor: colors.light, borderRadius: "6px", fontSize: "0.85rem" }}>
            <strong>Analysis:</strong> Price per sq ft ranges from ${Math.min(...pricePerSqFtData.map(p => p.pricePerSqFt))}-${Math.max(...pricePerSqFtData.map(p => p.pricePerSqFt))}, with smaller homes commanding slightly higher $/sqft premiums.
          </div>
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
        <DownloadButton sectionRef={summaryRef} filename="financials-summary" />
        <h2
          style={{
            fontSize: "1.4rem",
            marginBottom: "20px",
            borderBottom: `2px solid ${colors.accent}`,
            paddingBottom: "12px",
            paddingRight: "120px",
          }}
        >
          💰 Financial Summary
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          <div>
            <h4 style={{ color: colors.accent, marginBottom: "8px" }}>📊 Project Scale</h4>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.5, margin: 0 }}>
              {totalUnits} homes across {RAW_DATA.homePlans.length} plans. Price range: {keyMetrics.priceRange}. Total revenue: {keyMetrics.totalRevenue} over project timeline.
            </p>
          </div>
          <div>
            <h4 style={{ color: colors.accent, marginBottom: "8px" }}>💵 Returns</h4>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.5, margin: 0 }}>
              Baseline profit: {keyMetrics.totalProfit} ({keyMetrics.roi} ROI, {keyMetrics.irr} IRR). Best case potential: ${scenarioData[0].profit}M profit ({scenarioData[0].roi}% ROI).
            </p>
          </div>
          <div>
            <h4 style={{ color: colors.accent, marginBottom: "8px" }}>📈 Cash Flow</h4>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.5, margin: 0 }}>
              Initial investment period through 2028. Breakeven ~{breakevenMonth}. Peak sales velocity: {maxClosings} closings/month.
            </p>
          </div>
          <div>
            <h4 style={{ color: colors.accent, marginBottom: "8px" }}>🏦 Financing</h4>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.5, margin: 0 }}>
              {RAW_DATA.drawSchedule.length} draws totaling ${totalDrawMin}-{totalDrawMax}M. Land acquisition in {RAW_DATA.drawSchedule[0].timing}. Peak construction draw at {RAW_DATA.drawSchedule[RAW_DATA.drawSchedule.length - 1].timing}.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}