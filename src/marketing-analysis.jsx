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
  ScatterChart,
  Scatter,
  ComposedChart,
  Area,
} from "recharts";
import html2canvas from "html2canvas";

// Color palette - warm earth tones with forest green accents
const colors = {
  primary: "#2D5A4A",
  secondary: "#8B4513",
  accent: "#D4A574",
  light: "#F5F0E8",
  dark: "#1A1A1A",
  success: "#4A7C59",
  warning: "#C9A227",
  danger: "#A85454",
  chart: ["#2D5A4A", "#8B4513", "#D4A574", "#6B8E7D", "#A0522D", "#C9A227"],
};

// ============================================
// ORIGINAL DOCUMENT DATA
// ============================================

// Comparable Sales Data (ORIGINAL)
const comparableSalesData = [
  {
    address: "1611 Threepine Pl",
    sqft: 3078,
    price: 535000,
    pricePerSqft: 174,
    beds: 4,
    baths: 4,
    daysOnMarket: 78,
    soldDate: "Nov 7, 2025",
  },
  {
    address: "3768 Annsbury Ct",
    sqft: 2543,
    price: 497180,
    pricePerSqft: 195,
    beds: 4,
    baths: 2.5,
    daysOnMarket: 50,
    soldDate: "Dec 30, 2025",
  },
  {
    address: "3698 Annsbury Ct",
    sqft: 2543,
    price: 536000,
    pricePerSqft: 211,
    beds: 4,
    baths: 3,
    daysOnMarket: 25,
    soldDate: "Mar 26, 2025",
  },
  {
    address: "3739 Annsbury Ct",
    sqft: 2504,
    price: 511500,
    pricePerSqft: 204,
    beds: 4,
    baths: 3,
    daysOnMarket: 51,
    soldDate: "Feb 7, 2025",
  },
  {
    address: "197 Coteau Pl",
    sqft: 2883,
    price: 540300,
    pricePerSqft: 187,
    beds: 3,
    baths: 3,
    daysOnMarket: 30,
    soldDate: "Apr 10, 2025",
  },
];

// New Construction Comparables (ORIGINAL)
const newConstructionData = [
  {
    address: "427 Dogwood Dr",
    sqft: 2450,
    price: 489900,
    pricePerSqft: 200,
    year: 2024,
    beds: 4,
    baths: 2.5,
  },
  {
    address: "4720 Dufour Dr",
    sqft: 2830,
    price: 539900,
    pricePerSqft: 191,
    year: 2022,
    beds: 4,
    baths: 2.5,
    soldDate: "9/19/2025",
  },
  {
    address: "261 Murray Way",
    sqft: 2492,
    price: 540000,
    pricePerSqft: 217,
    year: 2022,
    beds: 4,
    baths: 2.5,
    soldDate: "6/20/2024",
  },
  {
    address: "4689 Dufour Dr",
    sqft: 2410,
    price: 550000,
    pricePerSqft: 228,
    year: 2021,
    beds: 4,
    baths: 3,
    soldDate: "6/17/2022",
  },
  {
    address: "27 Trigg Myers",
    sqft: 1817,
    price: 475000,
    pricePerSqft: 261,
    year: 2021,
    beds: 3,
    baths: 2.5,
    soldDate: "5/17/2024",
  },
  {
    address: "326 Cashes Ct",
    sqft: 1732,
    price: 385000,
    pricePerSqft: 222,
    year: 2020,
    beds: 3,
    baths: 2.5,
    soldDate: "8/30/2024",
  },
];

// ORIGINAL Absorption Rate Data
const absorptionData = [
  { category: "Resale Homes", rate: 50, color: colors.primary },
  { category: "New Construction", rate: 33, color: colors.secondary },
];

// Price Range Distribution (ORIGINAL)
const priceRangeData = [
  { range: "$350K-$400K", count: 15, percentage: 12 },
  { range: "$400K-$450K", count: 25, percentage: 20 },
  { range: "$450K-$500K", count: 35, percentage: 28 },
  { range: "$500K-$550K", count: 30, percentage: 24 },
  { range: "$550K+", count: 20, percentage: 16 },
];

// Lot Premium Analysis (ORIGINAL)
const lotPremiumData = [
  { feature: "Standard Lot", premium: 0, description: "Base price" },
  { feature: "Cul-de-sac", premium: 8000, description: "+$8K" },
  { feature: "Greenspace Adjacent", premium: 12000, description: "+$12K" },
  { feature: "Privacy Buffer", premium: 10000, description: "+$10K" },
  { feature: "Premium View", premium: 15000, description: "+$15K" },
];

// Monthly Sales Trend - ORIGINAL (based on 1,052 annual sales, ~88/month, 192 listings)
const monthlySalesData = [
  { month: "Jan", sales: 82, inventory: 175, dom: 48 },
  { month: "Feb", sales: 78, inventory: 168, dom: 45 },
  { month: "Mar", sales: 95, inventory: 182, dom: 42 },
  { month: "Apr", sales: 102, inventory: 195, dom: 40 },
  { month: "May", sales: 98, inventory: 188, dom: 38 },
  { month: "Jun", sales: 105, inventory: 200, dom: 45 },
  { month: "Jul", sales: 92, inventory: 185, dom: 50 },
  { month: "Aug", sales: 88, inventory: 178, dom: 52 },
  { month: "Sep", sales: 85, inventory: 172, dom: 52 },
  { month: "Oct", sales: 80, inventory: 165, dom: 50 },
  { month: "Nov", sales: 75, inventory: 158, dom: 48 },
  { month: "Dec", sales: 72, inventory: 150, dom: 45 },
];

// Buyer Segment Data (ORIGINAL)
const buyerSegmentData = [
  { name: "Family Households", value: 45, color: colors.primary },
  { name: "Move-up Buyers", value: 25, color: colors.secondary },
  { name: "Multi-generational", value: 15, color: colors.accent },
  { name: "First-time Buyers", value: 15, color: colors.success },
];

// Competition Positioning (Price vs SF) - ORIGINAL
const competitionData = [
  { name: "Lilburn Resale Avg", sqft: 2500, price: 412000, type: "resale" },
  { name: "New Construction Low", sqft: 1732, price: 385000, type: "new" },
  { name: "New Construction Mid", sqft: 2450, price: 490000, type: "new" },
  { name: "New Construction High", sqft: 2830, price: 550000, type: "new" },
  { name: "Proposed Entry", sqft: 2200, price: 475000, type: "proposed" },
  { name: "Proposed Mid", sqft: 2600, price: 525000, type: "proposed" },
  { name: "Proposed Premium", sqft: 3000, price: 575000, type: "proposed" },
];

// Financial Incentives Data (ORIGINAL - was missing)
const financialIncentivesData = [
  {
    incentive: "Rate Buydown (2-3 yr)",
    effectiveness: 85,
    description: "Temporary rate reduction for first 2-3 years",
  },
  {
    incentive: "Closing Cost Assistance",
    effectiveness: 70,
    description: "$3,000 - $5,000 through preferred lenders",
  },
  {
    incentive: "Upgrade Credits",
    effectiveness: 55,
    description: "Design center credits for quick closings",
  },
  {
    incentive: "Price Reduction",
    effectiveness: 40,
    description: "Last resort - erodes value perception",
  },
];

// ============================================
// SUBSECTION 1 DATA - Lilburn/Oleander
// ============================================

// Oleander Drive Comparables
const oleanderDriveData = [
  {
    address: "1632 Oleander Dr SW",
    sqft: 3750,
    price: 850000,
    pricePerSqft: 227,
    beds: 4,
    baths: 4.5,
    type: "Premium",
    soldDate: "Jun 3, 2025",
  },
  {
    address: "1530 Oleander Dr SW",
    sqft: 1771,
    price: 343489,
    pricePerSqft: 194,
    beds: 3,
    baths: 2,
    type: "Standard",
    soldDate: "Estimated Value",
  },
];

// ============================================
// SUBSECTION 2 DATA - Realtor & Redfin
// ============================================

// Year-over-Year Market Changes (from Redfin/Realtor PDFs)
const yoyChangesData = [
  {
    metric: "Median Sale Price",
    current: "$412K",
    previous: "$407K",
    change: "+8.1%",
    changeType: "positive",
  },
  {
    metric: "Days on Market",
    current: "52",
    previous: "40",
    change: "+30%",
    changeType: "negative",
  },
  {
    metric: "Homes Over List",
    current: "10%",
    previous: "28.6%",
    change: "-65%",
    changeType: "negative",
  },
  {
    metric: "Price Drops",
    current: "16.7%",
    previous: "~12%",
    change: "+39%",
    changeType: "negative",
  },
  {
    metric: "Homes Sold (Sep)",
    current: "9",
    previous: "4",
    change: "+125%",
    changeType: "positive",
  },
];

// Price Trend Data (from Realtor.com chart)
const priceTrendData = [
  { period: "Nov 2022", listPrice: 385, soldPrice: 375 },
  { period: "May 2023", listPrice: 410, soldPrice: 395 },
  { period: "Nov 2023", listPrice: 420, soldPrice: 410 },
  { period: "May 2024", listPrice: 450, soldPrice: 430 },
  { period: "Nov 2024", listPrice: 470, soldPrice: 455 },
  { period: "May 2025", listPrice: 445, soldPrice: 460 },
  { period: "Sep 2025", listPrice: 415, soldPrice: 412 },
];

// Days on Market Trend (from Realtor.com chart)
const domTrendData = [
  { period: "Nov 2022", days: 65 },
  { period: "Feb 2023", days: 45 },
  { period: "May 2023", days: 38 },
  { period: "Aug 2023", days: 42 },
  { period: "Nov 2023", days: 48 },
  { period: "Feb 2024", days: 42 },
  { period: "May 2024", days: 30 },
  { period: "Aug 2024", days: 45 },
  { period: "Nov 2024", days: 52 },
  { period: "Feb 2025", days: 48 },
  { period: "May 2025", days: 45 },
  { period: "Sep 2025", days: 52 },
];

// ============================================
// SUBSECTION 3 DATA - Rental Trends
// ============================================

// Housing Tenure Data
const tenureData = [
  { name: "Owner-Occupied", value: 61.2, color: colors.primary },
  { name: "Renter-Occupied", value: 38.8, color: colors.secondary },
];

// Rental Market Data
const rentalTrendData = [
  { month: "Jan", rent2024: 2275, rent2025: 2180 },
  { month: "Feb", rent2024: 2290, rent2025: 2165 },
  { month: "Mar", rent2024: 2310, rent2025: 2175 },
  { month: "Apr", rent2024: 2340, rent2025: 2190 },
  { month: "May", rent2024: 2360, rent2025: 2200 },
  { month: "Jun", rent2024: 2380, rent2025: 2195 },
  { month: "Jul", rent2024: 2395, rent2025: 2180 },
  { month: "Aug", rent2024: 2390, rent2025: 2160 },
  { month: "Sep", rent2024: 2380, rent2025: 2145 },
  { month: "Oct", rent2024: 2395, rent2025: 2245 },
];

// Income by Age Cohort
const incomeByAgeData = [
  { age: "25-44", income: 66403, color: colors.primary },
  { age: "45-64", income: 71604, color: colors.secondary },
  { age: "65+", income: 45398, color: colors.accent },
];

// ============================================
// SUBSECTION 4 DATA - Absorption
// ============================================

// Market Health Indicators
const marketHealthData = [
  {
    indicator: "Sale-to-List Ratio",
    value: 98.5,
    benchmark: 100,
    status: "Healthy",
  },
  {
    indicator: "Homes Over List",
    value: 10,
    benchmark: 25,
    status: "Buyer Leverage",
  },
  {
    indicator: "Price Drops %",
    value: 16.7,
    benchmark: 10,
    status: "Elevated",
  },
  { indicator: "Months of Supply", value: 2.0, benchmark: 6, status: "Tight" },
];

// Rental Comparison Data
const rentalComparisonData = [
  { type: "Apartment Avg", rent: 1509, source: "Apartments.com" },
  { type: "All Property Median", rent: 2150, source: "Zillow" },
  { type: "Current Avg", rent: 2245, source: "Zillow Oct 2025" },
];

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
            style={{ margin: "4px 0 0", color: entry.color || colors.dark }}
          >
            {entry.name}:{" "}
            {typeof entry.value === "number" && entry.value > 1000
              ? `$${entry.value.toLocaleString()}`
              : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Enhanced Download Button Component for individual charts
const ChartDownloadButton = ({ chartRef, filename }) => {
  const [downloading, setDownloading] = useState(false);
  const buttonRef = useRef(null);

  const handleDownload = async () => {
    if (!chartRef.current) return;

    setDownloading(true);

    try {
      // Hide the button before capturing
      if (buttonRef.current) {
        buttonRef.current.style.display = 'none';
      }

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
      // Show the button again after capturing
      if (buttonRef.current) {
        buttonRef.current.style.display = 'flex';
      }
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

// Download Button Component for sections
const DownloadButton = ({ sectionRef, filename }) => {
  const [downloading, setDownloading] = useState(false);
  const buttonRef = useRef(null);

  const handleDownload = async () => {
    if (!sectionRef.current) return;

    setDownloading(true);

    try {
      // Hide the button before capturing
      if (buttonRef.current) {
        buttonRef.current.style.display = 'none';
      }

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
      // Show the button again after capturing
      if (buttonRef.current) {
        buttonRef.current.style.display = 'flex';
      }
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


// Section Wrapper Component
const Section = ({ id, title, sectionNumber, children, sectionRef }) => {
  return (
    <section
      ref={sectionRef}
      style={{
        marginBottom: "50px",
        position: "relative",
        backgroundColor: colors.light,
        // padding: "20px",
        borderRadius: "12px",
      }}
    >
      <DownloadButton
        sectionRef={sectionRef}
        filename={`section-${sectionNumber}-${id}`}
      />
      <h2
        style={{
          fontSize: "1.6rem",
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
};

// Wrapper component for individual chart boxes
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
            fontSize: "1.2rem",
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

const MarketingAnalysis = () => {
  // Create refs for each section
  const headerRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const section5Ref = useRef(null);
  const section6Ref = useRef(null);
  const section7Ref = useRef(null);
  const section8Ref = useRef(null);
  const section9Ref = useRef(null);
  const section10Ref = useRef(null);
  const section11Ref = useRef(null);
  const section12Ref = useRef(null);
  const section13Ref = useRef(null);
  const summaryRef = useRef(null);

  return (
    <div
      style={{
        fontFamily: "'Playfair Display', 'Georgia', serif",
        backgroundColor: colors.light,
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      {/* Header */}
      <header
        ref={headerRef}
        style={{
          textAlign: "center",
          marginBottom: "20px",
          borderBottom: `3px solid ${colors.primary}`,
          paddingBottom: "30px",
          position: "relative",
          backgroundColor: colors.light,
        }}
      >
        <DownloadButton
          sectionRef={headerRef}
          filename="header-market-analysis"
        />
        <h1
          style={{
            fontSize: "3rem",
            color: colors.primary,
            margin: 0,
            letterSpacing: "2px",
            fontWeight: 700,
          }}
        >
          LILBURN MARKET ANALYSIS
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            color: colors.secondary,
            marginTop: "10px",
            fontFamily: "'Source Sans Pro', sans-serif",
            letterSpacing: "4px",
            textTransform: "uppercase",
          }}
        >
          Gwinnett County, Georgia | Residential Development Opportunity
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
              padding: "5px 15px",
              borderRadius: "20px",
              fontSize: "0.85rem",
            }}
          >
            ZIP: 30047
          </span>
          <span
            style={{
              backgroundColor: colors.secondary,
              color: "#fff",
              padding: "5px 15px",
              borderRadius: "20px",
              fontSize: "0.85rem",
            }}
          >
            Balanced Market
          </span>
          <span
            style={{
              backgroundColor: colors.success,
              color: "#fff",
              padding: "5px 15px",
              borderRadius: "20px",
              fontSize: "0.85rem",
            }}
          >
            2 Months Supply
          </span>
          <span
            style={{
              backgroundColor: colors.warning,
              color: "#fff",
              padding: "5px 15px",
              borderRadius: "20px",
              fontSize: "0.85rem",
            }}
          >
            98.5% Sale-to-List
          </span>
        </div>
      </header>

      {/* SECTION 1: KEY MARKET METRICS */}
      <Section
        id="market-snapshot"
        title="Market Snapshot"
        sectionNumber={1}
        sectionRef={section1Ref}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "15px",
          }}
        >
          {[
            { label: "Median Home Price", value: "$412,000", icon: "🏠" },
            { label: "Avg Home Value", value: "$397,940", icon: "📊" },
            { label: "Monthly Absorption", value: "88 Sales", icon: "📈" },
            { label: "Days on Market", value: "52 Days", icon: "📅" },
            { label: "Sale-to-List Ratio", value: "98.5%", icon: "💰" },
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

      {/* SECTION 2: INVENTORY & ABSORPTION */}
      <Section
        id="inventory-absorption"
        title="Inventory & Absorption Analysis"
        sectionNumber={2}
        sectionRef={section2Ref}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "20px",
          }}
        >
          {/* Inventory Stats */}
          <ChartBox title="Inventory Metrics" filename="inventory-metrics">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {[
                {
                  label: "Active Listings",
                  value: "192",
                  note: "Current inventory",
                },
                {
                  label: "Annual Sales",
                  value: "1,052",
                  note: "Last 12 months",
                },
                {
                  label: "Monthly Avg Sales",
                  value: "88",
                  note: "homes/month",
                },
                {
                  label: "Months of Supply",
                  value: "2.0",
                  note: "Healthy demand",
                },
                {
                  label: "Absorption Rate",
                  value: "50%",
                  note: "Resale monthly",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    backgroundColor: idx % 2 === 0 ? colors.light : "#fff",
                    borderRadius: "6px",
                  }}
                >
                  <span style={{ color: colors.dark, fontSize: "0.9rem" }}>
                    {item.label}
                  </span>
                  <div style={{ textAlign: "right" }}>
                    <span
                      style={{
                        fontWeight: 700,
                        color: colors.primary,
                        fontSize: "1.05rem",
                      }}
                    >
                      {item.value}
                    </span>
                    <div style={{ fontSize: "0.65rem", color: "#999" }}>
                      {item.note}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ChartBox>

          {/* Absorption Rate Chart */}
          <ChartBox title="Monthly Absorption Rate" filename="absorption-rate-chart">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart
                data={absorptionData}
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
                  domain={[0, 60]}
                  tickFormatter={(value) => `${value}%`}
                  tick={{ fill: colors.dark, fontSize: 11 }}
                />
                <YAxis
                  type="category"
                  dataKey="category"
                  tick={{ fill: colors.dark, fontSize: 11 }}
                  width={95}
                />
                <Tooltip formatter={(value) => `${value}%`} />
                <Bar
                  dataKey="rate"
                  name="Absorption Rate"
                  radius={[0, 8, 8, 0]}
                >
                  {absorptionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div
              style={{
                marginTop: "12px",
                padding: "10px",
                backgroundColor: colors.light,
                borderRadius: "6px",
                fontSize: "0.8rem",
                color: colors.dark,
              }}
            >
              <strong>Insight:</strong> 50% monthly absorption indicates strong
              demand. New construction absorbs at 30-35%.
            </div>
          </ChartBox>

          {/* Market Health Indicators */}
          <ChartBox title="Market Health Indicators" filename="market-health-indicators">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {marketHealthData.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    backgroundColor: idx % 2 === 0 ? colors.light : "#fff",
                    borderRadius: "6px",
                  }}
                >
                  <span style={{ color: colors.dark, fontSize: "0.9rem" }}>
                    {item.indicator}
                  </span>
                  <div style={{ textAlign: "right" }}>
                    <span
                      style={{
                        fontWeight: 700,
                        color: colors.primary,
                        fontSize: "1.05rem",
                      }}
                    >
                      {item.value}
                      {item.indicator.includes("%") ||
                      item.indicator.includes("Ratio")
                        ? "%"
                        : ""}
                    </span>
                    <div
                      style={{
                        fontSize: "0.65rem",
                        color:
                          item.status === "Healthy" || item.status === "Tight"
                            ? colors.success
                            : item.status === "Elevated"
                            ? colors.warning
                            : colors.secondary,
                      }}
                    >
                      {item.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ChartBox>
        </div>
      </Section>

      {/* SECTION 3: YEAR-OVER-YEAR CHANGES */}
      <Section
        id="yoy-changes"
        title="Year-over-Year Market Changes"
        sectionNumber={3}
        sectionRef={section3Ref}
      >
        <ChartBox filename="yoy-market-changes">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "15px",
            }}
          >
            {yoyChangesData.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: "20px",
                  backgroundColor: colors.light,
                  borderRadius: "8px",
                  textAlign: "center",
                  borderTop: `4px solid ${
                    item.changeType === "positive"
                      ? colors.success
                      : colors.danger
                  }`,
                }}
              >
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: colors.secondary,
                    marginBottom: "8px",
                  }}
                >
                  {item.metric}
                </div>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: colors.primary,
                  }}
                >
                  {item.current}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "#999",
                    margin: "5px 0",
                  }}
                >
                  vs. {item.previous} prior year
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color:
                      item.changeType === "positive"
                        ? colors.success
                        : colors.danger,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "3px",
                  }}
                >
                  {item.change.startsWith("+") ? "↑" : "↓"} {item.change}
                </div>
              </div>
            ))}
          </div>
        </ChartBox>
      </Section>

      {/* SECTION 4: PRICE & DOM TRENDS */}
      <Section
        id="price-dom-trends"
        title="Price & Days on Market Trends"
        sectionNumber={4}
        sectionRef={section4Ref}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "25px",
          }}
        >
          {/* Price Trend Chart */}
          <ChartBox title="Median Listing vs. Sold Price Trend" filename="price-trend-chart">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart
                data={priceTrendData}
                margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={colors.accent}
                  opacity={0.5}
                />
                <XAxis
                  dataKey="period"
                  tick={{ fill: colors.dark, fontSize: 9 }}
                  angle={-30}
                  textAnchor="end"
                  height={50}
                />
                <YAxis
                  tickFormatter={(value) => `$${value}K`}
                  tick={{ fill: colors.dark }}
                  domain={[350, 500]}
                />
                <Tooltip formatter={(value) => [`$${value}K`, "Price"]} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="listPrice"
                  name="List Price"
                  stroke={colors.danger}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="soldPrice"
                  name="Sold Price"
                  stroke={colors.primary}
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartBox>

          {/* Days on Market Trend */}
          <ChartBox title="Median Days on Market Trend" filename="dom-trend-chart">
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart
                data={domTrendData}
                margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={colors.accent}
                  opacity={0.5}
                />
                <XAxis
                  dataKey="period"
                  tick={{ fill: colors.dark, fontSize: 9 }}
                  angle={-30}
                  textAnchor="end"
                  height={50}
                />
                <YAxis
                  tickFormatter={(value) => `${value}d`}
                  tick={{ fill: colors.dark }}
                  domain={[20, 70]}
                />
                <Tooltip
                  formatter={(value) => [`${value} days`, "Days on Market"]}
                />
                <Area
                  type="monotone"
                  dataKey="days"
                  fill={colors.accent}
                  fillOpacity={0.3}
                  stroke="none"
                />
                <Line
                  type="monotone"
                  dataKey="days"
                  name="Days on Market"
                  stroke={colors.secondary}
                  strokeWidth={3}
                  dot={{ fill: colors.secondary, r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartBox>
        </div>
      </Section>

      {/* SECTION 5: MONTHLY SALES & INVENTORY */}
      <Section
        id="monthly-sales"
        title="Monthly Sales & Inventory Trends"
        sectionNumber={5}
        sectionRef={section5Ref}
      >
        <ChartBox filename="monthly-sales-inventory-chart">
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart
              data={monthlySalesData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={colors.accent}
                opacity={0.5}
              />
              <XAxis dataKey="month" tick={{ fill: colors.dark }} />
              <YAxis yAxisId="left" tick={{ fill: colors.dark }} />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fill: colors.secondary }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="inventory"
                name="Active Inventory"
                fill={colors.accent}
                fillOpacity={0.3}
                stroke={colors.accent}
                strokeWidth={2}
              />
              <Bar
                yAxisId="left"
                dataKey="sales"
                name="Monthly Sales"
                fill={colors.primary}
                radius={[4, 4, 0, 0]}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartBox>
      </Section>

      {/* SECTION 6: COMPARABLE SALES */}
      <Section
        id="comparable-sales"
        title="Comparable Sales Analysis"
        sectionNumber={6}
        sectionRef={section6Ref}
      >
        <ChartBox filename="comparable-sales-chart">
          <ResponsiveContainer width="100%" height={320}>
            <ComposedChart
              data={comparableSalesData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={colors.accent}
                opacity={0.5}
              />
              <XAxis
                dataKey="address"
                angle={-20}
                textAnchor="end"
                height={80}
                tick={{ fill: colors.dark, fontSize: 10 }}
              />
              <YAxis
                yAxisId="left"
                tick={{ fill: colors.dark }}
                tickFormatter={(value) => `$${value / 1000}K`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fill: colors.secondary }}
                tickFormatter={(value) => `${value} sf`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="price"
                name="Sale Price"
                fill={colors.primary}
                radius={[4, 4, 0, 0]}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="sqft"
                name="Square Feet"
                stroke={colors.secondary}
                strokeWidth={3}
                dot={{ fill: colors.secondary, r: 5 }}
              />
            </ComposedChart>
          </ResponsiveContainer>

          {/* Comps Table */}
          <div style={{ marginTop: "20px", overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.85rem",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: colors.primary, color: "#fff" }}>
                  <th style={{ padding: "10px", textAlign: "left" }}>
                    Address
                  </th>
                  <th style={{ padding: "10px", textAlign: "center" }}>
                    Beds/Baths
                  </th>
                  <th style={{ padding: "10px", textAlign: "right" }}>Sq Ft</th>
                  <th style={{ padding: "10px", textAlign: "right" }}>
                    Sale Price
                  </th>
                  <th style={{ padding: "10px", textAlign: "right" }}>$/SF</th>
                  <th style={{ padding: "10px", textAlign: "center" }}>DOM</th>
                  <th style={{ padding: "10px", textAlign: "center" }}>
                    Sold Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparableSalesData.map((item, idx) => (
                  <tr
                    key={idx}
                    style={{
                      backgroundColor: idx % 2 === 0 ? "#fff" : colors.light,
                    }}
                  >
                    <td style={{ padding: "10px" }}>{item.address}</td>
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      {item.beds}/{item.baths}
                    </td>
                    <td style={{ padding: "10px", textAlign: "right" }}>
                      {item.sqft.toLocaleString()}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        textAlign: "right",
                        fontWeight: 600,
                        color: colors.primary,
                      }}
                    >
                      ${item.price.toLocaleString()}
                    </td>
                    <td style={{ padding: "10px", textAlign: "right" }}>
                      ${item.pricePerSqft}
                    </td>
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      {item.daysOnMarket}
                    </td>
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      {item.soldDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartBox>
      </Section>

      {/* SECTION 7: NEW CONSTRUCTION COMPS */}
      <Section
        id="new-construction"
        title="New Construction Comparables"
        sectionNumber={7}
        sectionRef={section7Ref}
      >
        <ChartBox filename="new-construction-table">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: colors.primary, color: "#fff" }}>
                <th style={{ padding: "12px", textAlign: "left" }}>Address</th>
                <th style={{ padding: "12px", textAlign: "center" }}>
                  Year Built
                </th>
                <th style={{ padding: "12px", textAlign: "center" }}>
                  Beds/Baths
                </th>
                <th style={{ padding: "12px", textAlign: "right" }}>Sq Ft</th>
                <th style={{ padding: "12px", textAlign: "right" }}>
                  Sale Price
                </th>
                <th style={{ padding: "12px", textAlign: "right" }}>$/Sq Ft</th>
              </tr>
            </thead>
            <tbody>
              {newConstructionData.map((item, idx) => (
                <tr
                  key={idx}
                  style={{
                    backgroundColor: idx % 2 === 0 ? "#fff" : colors.light,
                    borderBottom: `1px solid ${colors.accent}`,
                  }}
                >
                  <td style={{ padding: "12px", color: colors.dark }}>
                    {item.address}
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    {item.year}
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    {item.beds}/{item.baths}
                  </td>
                  <td style={{ padding: "12px", textAlign: "right" }}>
                    {item.sqft.toLocaleString()}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      textAlign: "right",
                      fontWeight: 600,
                      color: colors.primary,
                    }}
                  >
                    ${item.price.toLocaleString()}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      textAlign: "right",
                      color: colors.secondary,
                    }}
                  >
                    ${item.pricePerSqft}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ backgroundColor: colors.secondary, color: "#fff" }}>
                <td style={{ padding: "12px", fontWeight: 600 }} colSpan={3}>
                  AVERAGES
                </td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "right",
                    fontWeight: 600,
                  }}
                >
                  {Math.round(
                    newConstructionData.reduce((a, b) => a + b.sqft, 0) /
                      newConstructionData.length
                  ).toLocaleString()}
                </td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "right",
                    fontWeight: 600,
                  }}
                >
                  $
                  {Math.round(
                    newConstructionData.reduce((a, b) => a + b.price, 0) /
                      newConstructionData.length
                  ).toLocaleString()}
                </td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "right",
                    fontWeight: 600,
                  }}
                >
                  $
                  {Math.round(
                    newConstructionData.reduce(
                      (a, b) => a + b.pricePerSqft,
                      0
                    ) / newConstructionData.length
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        </ChartBox>
      </Section>

      {/* SECTION 8: OLEANDER DRIVE MICRO-MARKET */}
      <Section
        id="oleander-drive"
        title="Oleander Drive Micro-Market Analysis"
        sectionNumber={8}
        sectionRef={section8Ref}
      >
        <ChartBox filename="oleander-drive-analysis">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "25px",
            }}
          >
            <div>
              <h4 style={{ color: colors.secondary, marginBottom: "15px" }}>
                Recent Sales on Oleander Drive
              </h4>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr
                    style={{ backgroundColor: colors.primary, color: "#fff" }}
                  >
                    <th style={{ padding: "12px", textAlign: "left" }}>
                      Address
                    </th>
                    <th style={{ padding: "12px", textAlign: "center" }}>
                      Beds/Baths
                    </th>
                    <th style={{ padding: "12px", textAlign: "right" }}>
                      Sq Ft
                    </th>
                    <th style={{ padding: "12px", textAlign: "right" }}>
                      Price
                    </th>
                    <th style={{ padding: "12px", textAlign: "right" }}>
                      $/SF
                    </th>
                    <th style={{ padding: "12px", textAlign: "center" }}>
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {oleanderDriveData.map((item, idx) => (
                    <tr
                      key={idx}
                      style={{
                        backgroundColor: idx % 2 === 0 ? "#fff" : colors.light,
                      }}
                    >
                      <td style={{ padding: "12px", color: colors.dark }}>
                        {item.address}
                      </td>
                      <td style={{ padding: "12px", textAlign: "center" }}>
                        {item.beds}/{item.baths}
                      </td>
                      <td style={{ padding: "12px", textAlign: "right" }}>
                        {item.sqft.toLocaleString()}
                      </td>
                      <td
                        style={{
                          padding: "12px",
                          textAlign: "right",
                          fontWeight: 600,
                          color: colors.primary,
                        }}
                      >
                        ${item.price.toLocaleString()}
                      </td>
                      <td
                        style={{
                          padding: "12px",
                          textAlign: "right",
                          color: colors.secondary,
                        }}
                      >
                        ${item.pricePerSqft}
                      </td>
                      <td
                        style={{
                          padding: "12px",
                          textAlign: "center",
                          fontSize: "0.85rem",
                        }}
                      >
                        {item.soldDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div
              style={{
                backgroundColor: colors.light,
                borderRadius: "8px",
                padding: "20px",
              }}
            >
              <h4 style={{ color: colors.secondary, marginBottom: "15px" }}>
                Key Takeaways
              </h4>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "20px",
                  color: colors.dark,
                  fontSize: "0.9rem",
                  lineHeight: 1.8,
                }}
              >
                <li>Wide price range: $343K - $850K</li>
                <li>Premium homes command $227/sf</li>
                <li>Lot size & condition drive value</li>
                <li>Fewer direct comps = price discovery</li>
                <li>Micro-location within street matters</li>
                <li>Market softening may affect premium tier</li>
              </ul>
            </div>
          </div>
        </ChartBox>
      </Section>

      {/* SECTION 9: PRICE POSITIONING & BUYER SEGMENTS */}
      <Section
        id="price-positioning"
        title="Price Positioning & Target Buyers"
        sectionNumber={9}
        sectionRef={section9Ref}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "25px",
          }}
        >
          {/* Scatter Plot */}
          <ChartBox title="Price vs. Square Footage Positioning" filename="competition-scatter-chart">
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={colors.accent}
                  opacity={0.5}
                />
                <XAxis
                  type="number"
                  dataKey="sqft"
                  name="Square Feet"
                  tick={{ fill: colors.dark, fontSize: 10 }}
                  tickFormatter={(value) => `${value}`}
                  domain={[1500, 3200]}
                />
                <YAxis
                  type="number"
                  dataKey="price"
                  name="Price"
                  tick={{ fill: colors.dark, fontSize: 10 }}
                  tickFormatter={(value) => `$${value / 1000}K`}
                  domain={[350000, 600000]}
                />
                <Tooltip
                  formatter={(value, name) => [
                    name === "Price"
                      ? `$${value.toLocaleString()}`
                      : `${value} sf`,
                    name,
                  ]}
                />
                <Legend />
                <Scatter
                  name="Resale Avg"
                  data={competitionData.filter((d) => d.type === "resale")}
                  fill={colors.accent}
                  shape="circle"
                />
                <Scatter
                  name="New Construction"
                  data={competitionData.filter((d) => d.type === "new")}
                  fill={colors.secondary}
                  shape="diamond"
                />
                <Scatter
                  name="Proposed"
                  data={competitionData.filter((d) => d.type === "proposed")}
                  fill={colors.primary}
                  shape="star"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </ChartBox>

          {/* Buyer Segments Pie */}
          <ChartBox title="Target Buyer Segments" filename="buyer-segments-pie-chart">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={buyerSegmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  nameKey="name"
                  label={({ value }) => `${value}%`}
                  labelLine={{ stroke: colors.dark, strokeWidth: 1 }}
                >
                  {buyerSegmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, props) => [
                    `${value}%`,
                    props.payload.name,
                  ]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartBox>
        </div>
      </Section>

      {/* SECTION 10: LOT PREMIUMS & PRICE DISTRIBUTION */}
      <Section
        id="lot-premiums"
        title="Lot Premiums & Price Distribution"
        sectionNumber={10}
        sectionRef={section10Ref}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "25px",
          }}
        >
          {/* Lot Premiums */}
          <ChartBox title="Lot Premium Opportunities ($5K - $15K)" filename="lot-premiums-chart">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={lotPremiumData} margin={{ left: 20, right: 30 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={colors.accent}
                  opacity={0.5}
                />
                <XAxis
                  dataKey="feature"
                  tick={{ fill: colors.dark, fontSize: 9 }}
                  angle={-15}
                  textAnchor="end"
                  height={55}
                />
                <YAxis
                  tickFormatter={(value) => `$${value / 1000}K`}
                  tick={{ fill: colors.dark }}
                />
                <Tooltip
                  formatter={(value) => [
                    `$${value.toLocaleString()}`,
                    "Premium",
                  ]}
                />
                <Bar
                  dataKey="premium"
                  name="Premium Value"
                  fill={colors.secondary}
                  radius={[4, 4, 0, 0]}
                >
                  {lotPremiumData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? colors.accent : colors.secondary}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div
              style={{
                marginTop: "10px",
                padding: "10px",
                backgroundColor: colors.light,
                borderRadius: "6px",
                fontSize: "0.8rem",
                color: colors.dark,
              }}
            >
              <strong>Strategy:</strong> Embed premiums in base price rather
              than itemizing to simplify purchase and avoid buyer resistance.
            </div>
          </ChartBox>

          {/* Price Range Distribution */}
          <ChartBox title="Price Range Distribution" filename="price-range-distribution-chart">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={priceRangeData}
                margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={colors.accent}
                  opacity={0.5}
                />
                <XAxis
                  dataKey="range"
                  tick={{ fill: colors.dark, fontSize: 9 }}
                />
                <YAxis
                  tickFormatter={(value) => `${value}%`}
                  tick={{ fill: colors.dark }}
                />
                <Tooltip formatter={(value) => [`${value}%`, "Market Share"]} />
                <Bar
                  dataKey="percentage"
                  name="Market Share"
                  fill={colors.primary}
                  radius={[4, 4, 0, 0]}
                >
                  {priceRangeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === 2 || index === 3
                          ? colors.primary
                          : colors.accent
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div
              style={{
                marginTop: "10px",
                padding: "10px",
                backgroundColor: colors.light,
                borderRadius: "6px",
                borderLeft: `4px solid ${colors.warning}`,
                fontSize: "0.8rem",
              }}
            >
              <strong>Target Range:</strong> $450K-$550K represents 52% of
              market activity. Focus pricing here for optimal absorption.
            </div>
          </ChartBox>
        </div>
      </Section>

      {/* SECTION 11: FINANCIAL INCENTIVES STRATEGY */}
      <Section
        id="financial-incentives"
        title="Financial Incentives Strategy"
        sectionNumber={11}
        sectionRef={section11Ref}
      >
        <ChartBox filename="financial-incentives-strategy">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "25px",
            }}
          >
            {/* Incentives Chart */}
            <div>
              <h3
                style={{
                  color: colors.primary,
                  marginBottom: "15px",
                  fontSize: "1.1rem",
                }}
              >
                Incentive Effectiveness
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={financialIncentivesData}
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
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                    tick={{ fill: colors.dark }}
                  />
                  <YAxis
                    type="category"
                    dataKey="incentive"
                    tick={{ fill: colors.dark, fontSize: 10 }}
                    width={130}
                  />
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Effectiveness"]}
                  />
                  <Bar
                    dataKey="effectiveness"
                    name="Effectiveness"
                    fill={colors.primary}
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Incentives Details */}
            <div>
              <h3
                style={{
                  color: colors.primary,
                  marginBottom: "15px",
                  fontSize: "1.1rem",
                }}
              >
                Recommended Incentives
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {financialIncentivesData.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "12px 15px",
                      backgroundColor:
                        idx === 0
                          ? "#E8F5E9"
                          : idx === 1
                          ? "#FFF8E1"
                          : colors.light,
                      borderRadius: "8px",
                      borderLeft: `4px solid ${
                        idx === 0
                          ? colors.success
                          : idx === 1
                          ? colors.warning
                          : colors.accent
                      }`,
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 600,
                        color: colors.dark,
                        fontSize: "0.95rem",
                      }}
                    >
                      {item.incentive}
                    </div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: colors.secondary,
                        marginTop: "4px",
                      }}
                    >
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ChartBox>
      </Section>

      {/* SECTION 12: RENTAL MARKET ANALYSIS */}
      <Section
        id="rental-market"
        title="Rental Market Analysis"
        sectionNumber={12}
        sectionRef={section12Ref}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "20px",
          }}
        >
          {/* Rental Metrics */}
          <ChartBox title="Rental Metrics" filename="rental-metrics">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {[
                {
                  label: "Average Rent (All)",
                  value: "$2,245",
                  change: "+$84 MoM",
                },
                {
                  label: "Apartment Average",
                  value: "$1,509",
                  change: "Apartments only",
                },
                {
                  label: "Median Rent",
                  value: "$2,150",
                  change: "All property types",
                },
                { label: "YoY Change", value: "-$150", change: "-6.3%" },
                { label: "Vacancy Rate", value: "4.6%", change: "Low vacancy" },
                {
                  label: "Available Units",
                  value: "157",
                  change: "Limited supply",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 10px",
                    backgroundColor: idx % 2 === 0 ? colors.light : "#fff",
                    borderRadius: "6px",
                  }}
                >
                  <span style={{ color: colors.dark, fontSize: "0.85rem" }}>
                    {item.label}
                  </span>
                  <div style={{ textAlign: "right" }}>
                    <span
                      style={{
                        fontWeight: 700,
                        color: colors.primary,
                        fontSize: "1rem",
                      }}
                    >
                      {item.value}
                    </span>
                    <div style={{ fontSize: "0.65rem", color: "#999" }}>
                      {item.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ChartBox>

          {/* Rental Trend Chart */}
          <ChartBox title="Rent Price: 2024 vs 2025" filename="rental-trend-chart">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={rentalTrendData}
                margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={colors.accent}
                  opacity={0.5}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: colors.dark, fontSize: 9 }}
                />
                <YAxis
                  tickFormatter={(value) => `$${value}`}
                  tick={{ fill: colors.dark, fontSize: 10 }}
                  domain={[2100, 2450]}
                />
                <Tooltip formatter={(value) => [`$${value}`, "Rent"]} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="rent2024"
                  name="2024"
                  stroke={colors.accent}
                  strokeWidth={2}
                  dot={{ r: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="rent2025"
                  name="2025"
                  stroke={colors.primary}
                  strokeWidth={3}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div
              style={{
                marginTop: "10px",
                padding: "8px",
                backgroundColor: colors.light,
                borderRadius: "6px",
                fontSize: "0.75rem",
                color: colors.secondary,
              }}
            >
              Rents down $150 YoY but rebounding in Oct 2025 (+$84 MoM)
            </div>
          </ChartBox>

          {/* Housing Tenure Pie */}
          <ChartBox title="Housing Tenure Split" filename="housing-tenure-pie">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={tenureData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={65}
                  paddingAngle={3}
                  dataKey="value"
                  nameKey="name"
                >
                  {tenureData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, props) => [
                    `${value}%`,
                    props.payload.name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                marginTop: "10px",
              }}
            >
              {tenureData.map((item, idx) => (
                <div
                  key={idx}
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      backgroundColor: item.color,
                      borderRadius: "2px",
                    }}
                  />
                  <span style={{ fontSize: "0.75rem", color: colors.dark }}>
                    {item.name}: {item.value}%
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: "12px",
                padding: "8px",
                backgroundColor: colors.light,
                borderRadius: "6px",
                fontSize: "0.75rem",
                color: colors.secondary,
                textAlign: "center",
              }}
            >
              Lilburn: 61.2% owner vs. Gwinnett County: 69.3%
            </div>
          </ChartBox>
        </div>
      </Section>

      {/* SECTION 13: INCOME DEMOGRAPHICS */}
      <Section
        id="income-demographics"
        title="Income Demographics & Affordability"
        sectionNumber={13}
        sectionRef={section13Ref}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "25px",
          }}
        >
          {/* Income by Age */}
          <ChartBox title="Household Income by Age Cohort" filename="income-by-age-chart">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={incomeByAgeData}
                margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={colors.accent}
                  opacity={0.5}
                />
                <XAxis dataKey="age" tick={{ fill: colors.dark }} />
                <YAxis
                  tickFormatter={(value) => `$${value / 1000}K`}
                  tick={{ fill: colors.dark }}
                />
                <Tooltip
                  formatter={(value) => [
                    `$${value.toLocaleString()}`,
                    "Median Income",
                  ]}
                />
                <Bar
                  dataKey="income"
                  name="Median Income"
                  radius={[4, 4, 0, 0]}
                >
                  {incomeByAgeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginTop: "15px",
              }}
            >
              <div
                style={{
                  padding: "12px",
                  backgroundColor: colors.light,
                  borderRadius: "6px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: colors.primary,
                  }}
                >
                  $57,266
                </div>
                <div style={{ fontSize: "0.75rem", color: colors.secondary }}>
                  Median Household
                </div>
              </div>
              <div
                style={{
                  padding: "12px",
                  backgroundColor: colors.light,
                  borderRadius: "6px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: colors.secondary,
                  }}
                >
                  $84,096
                </div>
                <div style={{ fontSize: "0.75rem", color: colors.secondary }}>
                  Mean Household
                </div>
              </div>
            </div>
          </ChartBox>

          {/* Affordability Analysis */}
          <ChartBox title="Affordability Gap Analysis" filename="affordability-analysis">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              {[
                {
                  label: "Median Property Value",
                  value: "$278,600",
                  icon: "🏠",
                },
                {
                  label: "Avg Home Value (30047)",
                  value: "$397,940",
                  icon: "📊",
                },
                { label: "Median Market Price", value: "$412,000", icon: "💵" },
                {
                  label: "New Construction Avg",
                  value: "$496,800",
                  icon: "🏗️",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 15px",
                    backgroundColor: colors.light,
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span style={{ fontSize: "1.3rem" }}>{item.icon}</span>
                    <span
                      style={{ fontSize: "0.9rem", color: colors.secondary }}
                    >
                      {item.label}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: colors.primary,
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: "15px",
                padding: "12px",
                backgroundColor: "#FFF3E0",
                borderRadius: "8px",
                borderLeft: `4px solid ${colors.warning}`,
                fontSize: "0.85rem",
              }}
            >
              <strong>Insight:</strong> New construction prices ($475K-$550K)
              significantly exceed median property values, pushing some buyers
              to rental market.
            </div>
          </ChartBox>
        </div>
      </Section>

      {/* SUMMARY SECTION */}
      <section
        ref={summaryRef}
        style={{
          backgroundColor: colors.primary,
          borderRadius: "12px",
          padding: "35px",
          color: "#fff",
          marginBottom: "30px",
          position: "relative",
        }}
      >
        <DownloadButton
          sectionRef={summaryRef}
          filename="summary-market-analysis"
        />
        <h2
          style={{
            fontSize: "1.6rem",
            marginBottom: "25px",
            borderBottom: `2px solid ${colors.accent}`,
            paddingBottom: "15px",
            paddingRight: "120px",
          }}
        >
          Market Analysis Summary
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          <div>
            <h4
              style={{
                color: colors.accent,
                marginBottom: "10px",
                fontSize: "1rem",
              }}
            >
              📊 Market Strength
            </h4>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>
              Lilburn maintains healthy 2-month supply with 98.5% sale-to-list
              ratio. Annual absorption of 1,052 homes demonstrates sustained
              demand.
            </p>
          </div>
          <div>
            <h4
              style={{
                color: colors.accent,
                marginBottom: "10px",
                fontSize: "1rem",
              }}
            >
              💰 Target Pricing
            </h4>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>
              Optimal price range: $475,000 - $550,000. New construction
              commands $190-$228 per square foot. Embed lot premiums in base
              price.
            </p>
          </div>
          <div>
            <h4
              style={{
                color: colors.accent,
                marginBottom: "10px",
                fontSize: "1rem",
              }}
            >
              🏘️ Rental Dynamics
            </h4>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>
              Strong rental demand (38.8% renter, 4.6% vacancy). Rents at
              $2,245/mo. Affordability gap supports rental market strength.
            </p>
          </div>
          <div>
            <h4
              style={{
                color: colors.accent,
                marginBottom: "10px",
                fontSize: "1rem",
              }}
            >
              🎯 Incentive Strategy
            </h4>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>
              Rate buydowns most effective (2-3 yr temporary). Closing cost
              assistance $3-5K via preferred lenders. Avoid aggressive price
              cuts.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarketingAnalysis;
