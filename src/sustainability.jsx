import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";

import BioswaleImage from "url:./assets/bioswale.png";
import EnvelopeImage from "url:./assets/envelope.png";
import PlumbingLoopImage from "url:./assets/plumbing-loop.png";

// Color palette - matching the project theme
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
  leed: "#6B8E23", // LEED green
};

// Download Button Component for sections
const DownloadButton = ({ sectionRef, filename }) => {
  const [downloading, setDownloading] = useState(false);
  const buttonRef = useRef(null);

  const handleDownload = async () => {
    if (!sectionRef.current) return;

    setDownloading(true);

    try {
      if (buttonRef.current) {
        buttonRef.current.style.display = "none";
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
      if (buttonRef.current) {
        buttonRef.current.style.display = "flex";
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
          borderLeft: `4px solid ${colors.leed}`,
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

// Content Box Component
const ContentBox = ({ children, style = {} }) => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "25px",
        boxShadow: "0 4px 20px rgba(45, 90, 74, 0.1)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Subsection Header Component
const SubsectionHeader = ({ title, highlighted = false }) => (
  <h4
    style={{
      color: highlighted ? colors.leed : colors.secondary,
      marginBottom: "12px",
      fontSize: "1.05rem",
      backgroundColor: highlighted ? "#E8F5E9" : "transparent",
      padding: highlighted ? "8px 12px" : "0",
      borderRadius: highlighted ? "6px" : "0",
    }}
  >
    {title}
  </h4>
);

// Bullet List Component
const BulletList = ({ items }) => (
  <ul
    style={{
      margin: 0,
      paddingLeft: "20px",
      color: colors.dark,
      fontSize: "0.9rem",
      lineHeight: 1.8,
    }}
  >
    {items.map((item, idx) => (
      <li key={idx} style={{ marginBottom: "6px" }}>
        {item}
      </li>
    ))}
  </ul>
);

// Image Placeholder Component
const ImagePlaceholder = ({
  height = "200px",
  label = "Image Placeholder",
  fullWidth = false,
}) => (
  <div
    style={{
      width: fullWidth ? "100%" : "100%",
      height: height,
      backgroundColor: "#E0E0E0",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      border: `2px dashed ${colors.accent}`,
      color: colors.secondary,
    }}
  >
    <span style={{ fontSize: "2rem", marginBottom: "8px" }}>🖼️</span>
    <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>{label}</span>
    <span style={{ fontSize: "0.75rem", opacity: 0.7, marginTop: "4px" }}>
      Upload image here
    </span>
  </div>
);

// LEED Credit Tag Component
const LEEDTag = ({ credit }) => (
  <span
    style={{
      display: "inline-block",
      backgroundColor: colors.leed,
      color: "#fff",
      padding: "3px 8px",
      borderRadius: "4px",
      fontSize: "0.7rem",
      fontWeight: 600,
      marginLeft: "8px",
    }}
  >
    {credit}
  </span>
);

export default function Sustainability() {
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
  const summaryRef = useRef(null);

  console.log(
    "Rendering Sustainability Implementation Component",
    BioswaleImage
  );

  return (
    <div
      style={{
        fontFamily: "Georgia, serif",
        backgroundColor: colors.light,
        padding: "30px",
        minHeight: "100vh",
      }}
    >
      {/* Section 1: Site Clearance & Pre-Construction Controls */}
      <Section
        id="site-clearance"
        title="Site Clearance & Pre-Construction Controls"
        sectionNumber={1}
        sectionRef={section1Ref}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <ContentBox>
            <SubsectionHeader
              title="Install and Enforce ESC (Erosion & Sediment Control)"
              highlighted
            />
            <BulletList
              items={[
                "Double silt fences, inlet protection, stabilized entrances",
                "Protect storm drains with filter fabric",
                "Create sediment basins before any mass grading",
                "Weekly inspections required by LEED prerequisites",
              ]}
            />
          </ContentBox>

          <ContentBox>
            <SubsectionHeader title="Protect Natural Resources" highlighted />
            <BulletList
              items={[
                "Define Tree Protection Zones per ANSI A300 and LEED ND GIB Credit – Tree-Lined Streets & Habitat Conservation",
                "Fence No-Disturb zones; avoid root compaction with geotextiles or mulch mats",
                "Salvage topsoil – carefully removing, stockpiling, and reusing nutrient-rich upper layer for later site restoration",
              ]}
            />
          </ContentBox>
        </div>
      </Section>

      {/* Section 2: Earthwork & Stormwater/LID Installation */}
      <Section
        id="earthwork-stormwater"
        title="Earthwork & Stormwater/LID Installation"
        sectionNumber={2}
        sectionRef={section2Ref}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <ContentBox>
            <SubsectionHeader
              title="Grade to Preserve Natural Hydrology"
              highlighted
            />
            <BulletList
              items={[
                "Maintain pre-development drainage patterns (LEED SS Rainwater Management)",
                "Minimize cut/fill",
                "Prevent compaction in future green infrastructure areas",
              ]}
            />

            <SubsectionHeader title="Install Green Infrastructure" />
            <p
              style={{
                fontSize: "0.85rem",
                color: colors.secondary,
                marginBottom: "10px",
              }}
            >
              Following EPA LID Manual + LEED SS Rainwater Requirements:
            </p>
            <BulletList
              items={[
                'Rain gardens sized for the first 1" rainfall',
                "Bioswales with amended soils (40% sand / 40% topsoil / 20% compost)",
                "Level spreaders to prevent channelization",
                "Early installation of detention pond to serve as temporary E&S basin",
              ]}
            />

            <SubsectionHeader title="Soil Restoration" />
            <p
              style={{
                fontSize: "0.8rem",
                color: colors.leed,
                fontStyle: "italic",
                marginBottom: "8px",
              }}
            >
              Mandatory in SITES, recommended in LEED
            </p>
            <BulletList
              items={[
                "Restore soils post-grading to 5% organic content",
                'De-compact to 12" depth in landscaped areas',
              ]}
            />
          </ContentBox>

          <ContentBox>
            <SubsectionHeader title="Bioswale Diagram" />
            <img
              src={BioswaleImage}
              alt="Bioswale Cross-Section Diagram"
              style={{
                width: "100%",
                height: "calc(100% - 40px)",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </ContentBox>
        </div>
      </Section>

      {/* Section 3: Utilities & Subgrade Work */}
      <Section
        id="utilities-subgrade"
        title="Utilities & Subgrade Work"
        sectionNumber={3}
        sectionRef={section3Ref}
      >
        <ContentBox style={{ marginBottom: "20px" }}>
          <SubsectionHeader
            title="Sustainable Utility Installation"
            highlighted
          />
          <BulletList
            items={[
              "Use trenchless installation near tree roots",
              "Ensure stormwater piping does not bypass LID features",
              "Install sub-slab vapor/radon barriers",
            ]}
          />
        </ContentBox>

        <ContentBox>
          <div style={{ display: "flex", gap: "30px" }}>
            <div style={{ flex: 1 }}>
              <SubsectionHeader
                title="Efficiency-Ready Infrastructure"
                highlighted
              />
              <BulletList
                items={[
                  "Plumbing loops designed to reduce wait times (LEED WE: Indoor Water Use Reduction)",
                ]}
              />
              <div style={{ marginTop: "15px" }}>
                <p
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: colors.dark,
                    marginBottom: "10px",
                  }}
                >
                  Conduits for:
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    paddingLeft: "15px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={{ color: colors.leed }}>➔</span>
                    <span style={{ fontSize: "0.9rem" }}>EV charging</span>
                    <LEEDTag credit="LEED LT Credit – Green Vehicles" />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={{ color: colors.leed }}>➔</span>
                    <span style={{ fontSize: "0.9rem" }}>PV-ready systems</span>
                    <LEEDTag credit="LEED EA Renewable Energy" />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <img
                src={PlumbingLoopImage}
                alt="Plumbing Loop Configuration"
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
            </div>
          </div>
        </ContentBox>
      </Section>

      {/* Section 4: Foundation & Framing */}
      <Section
        id="foundation-framing"
        title="Foundation & Framing"
        sectionNumber={4}
        sectionRef={section4Ref}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <ContentBox>
            <SubsectionHeader title="Foundation Best Practices" highlighted />
            <BulletList
              items={[
                "Install capillary breaks between slab & framing (LEED Durability Management)",
                "Ensure positive drainage away from home (SITES Water & Soil Credit)",
              ]}
            />
          </ContentBox>

          <ContentBox>
            <SubsectionHeader title="Advanced Framing" highlighted />
            <BulletList
              items={[
                '24" o.c. stud spacing (LEED MR: Material Optimization)',
                "Aligned framing and insulated corners for thermal performance",
                "Limit unnecessary headers—resource-efficient framing",
              ]}
            />
          </ContentBox>
        </div>
      </Section>

      {/* Section 5: Building Envelope (CRITICAL) - Full Width Image */}
      <Section
        id="building-envelope"
        title="Building Envelope (Critical LEED Energy Items)"
        sectionNumber={5}
        sectionRef={section5Ref}
      >
        <ContentBox
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={EnvelopeImage}
            alt="Building Envelope - Heat Flow & Solar Reflection Diagram"
            style={{
              width: "auto",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </ContentBox>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "20px",
          }}
        >
          <ContentBox>
            <SubsectionHeader
              title="High-Performance Air Sealing"
              highlighted
            />
            <BulletList
              items={[
                "Continuous air barrier approach per LEED EA modeling",
                "Seal penetrations, rim joists, and top plates with spray foam or gasket systems",
                'Use blower-door test during rough-in ("Midpoint Testing" per LEED Homes)',
              ]}
            />
          </ContentBox>

          <ContentBox>
            <SubsectionHeader title="Insulation Best Practices" highlighted />
            <BulletList
              items={[
                "Grade-1 insulation installation required for LEED Energy compliance",
                "Continuous exterior insulation to reduce thermal bridging",
              ]}
            />
          </ContentBox>

          <ContentBox>
            <SubsectionHeader
              title="Window & Weather-Resistive Barrier"
              highlighted
            />
            <BulletList
              items={[
                "Flash all openings according to AAMA + LEED durability requirements",
                "Proper integration of WRB, flashing, and siding (LEED EQ Moisture Management)",
              ]}
            />
          </ContentBox>
        </div>
      </Section>

      {/* Section 6: MEP Installation */}
      <Section
        id="mep-installation"
        title="Mechanical, Electrical & Plumbing Installation"
        sectionNumber={6}
        sectionRef={section6Ref}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "20px",
          }}
        >
          <ContentBox>
            <SubsectionHeader title="HVAC" highlighted />
            <BulletList
              items={[
                "Manual J/S/D required for LEED Homes certification",
                "Duct leakage ≤ 4% (ENERGY STAR prerequisite)",
                "Install ducts inside conditioned space (LEED EA optimization)",
              ]}
            />
          </ContentBox>

          <ContentBox>
            <SubsectionHeader title="Ventilation & IAQ" highlighted />
            <BulletList
              items={[
                "Balanced ventilation (ERV recommended) for LEED EQ Ventilation",
                "MERV 11 filters required",
                "Protect ducts from dust during construction",
              ]}
            />
          </ContentBox>

          <ContentBox>
            <SubsectionHeader title="Water Efficiency" highlighted />
            <BulletList
              items={[
                "All fixtures WaterSense (LEED WE prerequisites)",
                "Smart irrigation with rain sensors for common areas",
                "Pressure test & insulate hot water lines",
              ]}
            />
          </ContentBox>
        </div>
      </Section>

      {/* Section 7: Exterior Work & Landscaping */}
      <Section
        id="exterior-landscaping"
        title="Exterior Work & Landscaping"
        sectionNumber={7}
        sectionRef={section7Ref}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "20px",
          }}
        >
          <ContentBox>
            <SubsectionHeader title="Hardscape" highlighted />
            <BulletList
              items={[
                "Use high-SRI materials to reduce heat island effect (LEED SS Heat Island)",
                "Permeable surfaces for walkways, drives, and visitor parking",
              ]}
            />
          </ContentBox>

          <ContentBox>
            <SubsectionHeader title="Landscaping" highlighted />
            <BulletList
              items={[
                "≥ 70% native/adapted vegetation (LEED Water Efficiency + SITES)",
                "No turf in low-use areas; replace with native meadow",
                "Tree canopy goals per LEED ND – Habitat Conservation",
              ]}
            />
          </ContentBox>

          <ContentBox>
            <SubsectionHeader title="Stormwater Functionality" highlighted />
            <BulletList
              items={[
                "Verify all roof drainage connects to LID systems",
                "Stabilize soil immediately with erosion control blankets or hydroseed",
              ]}
            />
          </ContentBox>
        </div>
      </Section>

      {/* Section 8: Quality Control, Commissioning & Testing */}
      <Section
        id="quality-control"
        title="Quality Control, Commissioning & Testing"
        sectionNumber={8}
        sectionRef={section8Ref}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "20px",
          }}
        >
          <ContentBox>
            <SubsectionHeader
              title="Building Performance Testing"
              highlighted
            />
            <BulletList
              items={[
                "Final blower door test (≤ 3.0 ACH50 recommended)",
                "Duct leakage testing",
                "IR scan to identify insulation gaps",
              ]}
            />
          </ContentBox>

          <ContentBox>
            <SubsectionHeader title="IAQ Flush-Out" highlighted />
            <BulletList
              items={[
                "48–72 hour flush-out OR IAQ testing per LEED EQ credits",
                "Ensure low-VOC materials used (LEED EQ: Low-Emitting Materials)",
              ]}
            />
          </ContentBox>

          <ContentBox>
            <SubsectionHeader title="Stormwater Commissioning" highlighted />
            <BulletList
              items={[
                "Test infiltration rates of bioswales",
                "Validate pond forebay & outlet structures",
                "Confirm sediment clean-out before turnover",
              ]}
            />
          </ContentBox>
        </div>
      </Section>

      {/* Section 9: Solar Strategies */}
      <Section
        id="solar-strategies"
        title="Solar Strategies"
        sectionNumber={9}
        sectionRef={section9Ref}
      >
        <ContentBox>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <span style={{ fontSize: "2rem" }}>☀️</span>
            <div>
              <h4 style={{ margin: 0, color: colors.primary }}>
                LEED EA – Renewable Energy Preparedness
              </h4>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: "0.85rem",
                  color: colors.secondary,
                }}
              >
                Design & Construction Actions for Solar-Ready Homes
              </p>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "15px",
            }}
          >
            {[
              {
                icon: "🏠",
                text: "Orient rooflines to provide ≥ 200 sq ft of south-facing, unobstructed roof area",
              },
              {
                icon: "🔧",
                text: "Use roofing materials with minimum 25-year lifespan to avoid early penetrations",
              },
              {
                icon: "🔌",
                text: 'Install 1"–1.25" EMT conduit from attic → electrical panel for future PV',
              },
              {
                icon: "⚡",
                text: 'Reserve two adjacent breaker spaces labeled "SOLAR PV – FUTURE"',
              },
              {
                icon: "🏗️",
                text: "Install roof truss systems designed to support additional dead load from solar panels",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: colors.light,
                  borderRadius: "8px",
                  padding: "15px",
                  textAlign: "center",
                  borderTop: `4px solid ${colors.warning}`,
                }}
              >
                <div style={{ fontSize: "1.8rem", marginBottom: "10px" }}>
                  {item.icon}
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.8rem",
                    color: colors.dark,
                    lineHeight: 1.5,
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </ContentBox>
      </Section>

      {/* Section 10: Water Conservation */}
      <Section
        id="water-conservation"
        title="Water Conservation"
        sectionNumber={10}
        sectionRef={section10Ref}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <span style={{ fontSize: "1.5rem" }}>💧</span>
          <span
            style={{ fontSize: "0.9rem", color: colors.blue, fontWeight: 600 }}
          >
            LEED WE + WaterSense Standards
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "20px",
          }}
        >
          <ContentBox>
            <SubsectionHeader title="Indoor" highlighted />
            <BulletList
              items={[
                "Install EPA WaterSense fixtures (toilets ≤1.28 gpf, showers ≤1.75 gpm)",
                "Hot water recirculation loops or structured plumbing to minimize wait time",
                "Leak detection valves on main supply (recommended)",
              ]}
            />
          </ContentBox>

          <ContentBox>
            <SubsectionHeader title="Outdoor" highlighted />
            <BulletList
              items={[
                "Smart irrigation controllers with rain shutoff sensors",
                "Use drip irrigation for shrubs & trees; avoid spray heads near foundations",
                "Collect rainwater via rain barrels or cisterns",
              ]}
            />
          </ContentBox>

          <ContentBox>
            <SubsectionHeader title="Sitewide" highlighted />
            <BulletList
              items={[
                "Reduce irrigated turf to ≤30% of landscaped area",
                "Group plants into hydrozones to optimize watering needs",
                "Select drought-adapted natives",
              ]}
            />
          </ContentBox>
        </div>
      </Section>

      {/* Section 11: Smart Technology */}
      <Section
        id="smart-technology"
        title="Smart Technology"
        sectionNumber={11}
        sectionRef={section11Ref}
      >
        <p
          style={{
            fontSize: "0.9rem",
            color: colors.secondary,
            marginBottom: "20px",
          }}
        >
          Supports LEED EA Optimization + Modern Buyer Expectations
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <ContentBox>
            <SubsectionHeader title="Home-Level Smart Systems" highlighted />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              {[
                {
                  icon: "🌡️",
                  text: "Smart thermostat with multi-stage scheduling",
                },
                {
                  icon: "💧",
                  text: "Leak detection system with mobile alerts",
                },
                { icon: "🌱", text: "Smart irrigation controller" },
                { icon: "💡", text: "Smart lighting at entry & main spaces" },
                { icon: "🔌", text: "EV charger readiness (40A circuit)" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px",
                    backgroundColor: colors.light,
                    borderRadius: "6px",
                  }}
                >
                  <span style={{ fontSize: "1.3rem" }}>{item.icon}</span>
                  <span style={{ fontSize: "0.85rem", color: colors.dark }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </ContentBox>

          <ContentBox>
            <SubsectionHeader title="Community-Level Technology" highlighted />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {[
                {
                  icon: "📶",
                  text: "Wi-Fi-connected amenity spaces (clubhouse, trailhead)",
                },
                {
                  icon: "🔦",
                  text: "Security lighting on motion sensors (reducing energy use)",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "15px",
                    backgroundColor: colors.light,
                    borderRadius: "8px",
                    borderLeft: `4px solid ${colors.primary}`,
                  }}
                >
                  <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
                  <span style={{ fontSize: "0.9rem", color: colors.dark }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </ContentBox>
        </div>
      </Section>

      {/* Section 12: Resilient Design */}
      <Section
        id="resilient-design"
        title="Resilient Design"
        sectionNumber={12}
        sectionRef={section12Ref}
      >
        <p
          style={{
            fontSize: "0.9rem",
            color: colors.secondary,
            marginBottom: "20px",
          }}
        >
          LEED Resilience: Passive Survivability + Durability Management
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: "20px",
          }}
        >
          <ContentBox>
            <SubsectionHeader
              title="Structural & Envelope Resilience"
              highlighted
            />
            <BulletList
              items={[
                "Class 3 or Class 4 impact-resistant shingles",
                "Fiber-cement or brick siding for long-term durability",
                "WRB with taped seams for moisture resilience",
                "Attics/crawlspaces ventilated or sealed for humidity",
              ]}
            />
          </ContentBox>

          <ContentBox>
            <SubsectionHeader title="Climate Adaptation" highlighted />
            <BulletList
              items={[
                "Grade all lots with 5% minimum slope away from foundations",
                "Install backflow prevention valves where required",
                "Native plants resistant to drought and extreme rainfall",
              ]}
            />
          </ContentBox>

          <ContentBox>
            <SubsectionHeader title="Energy Resilience" highlighted />
            <BulletList
              items={[
                "Solar-ready + battery-ready electrical layout",
                "High-performance envelope reduces dependency on mechanical cooling during outages",
              ]}
            />
          </ContentBox>

          <ContentBox>
            <SubsectionHeader title="Water Resilience" highlighted />
            <BulletList
              items={[
                "Flood-tolerant landscape near stormwater areas",
                "Oversized gutters/downspouts in heavy-rainfall zones",
              ]}
            />
          </ContentBox>
        </div>
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
        <DownloadButton
          sectionRef={summaryRef}
          filename="sustainability-summary"
        />
        <h2
          style={{
            fontSize: "1.4rem",
            marginBottom: "20px",
            borderBottom: `2px solid ${colors.leed}`,
            paddingBottom: "12px",
            paddingRight: "120px",
          }}
        >
          🌿 Sustainability Implementation Summary
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          <div>
            <h4 style={{ color: colors.leed, marginBottom: "8px" }}>
              🏗️ Site & Construction
            </h4>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.5, margin: 0 }}>
              ESC controls, tree protection zones, bioswales with amended soils,
              and preserved natural hydrology throughout development.
            </p>
          </div>
          <div>
            <h4 style={{ color: colors.leed, marginBottom: "8px" }}>
              ⚡ Energy Efficiency
            </h4>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.5, margin: 0 }}>
              High-performance envelope, ≤3.0 ACH50, Grade-1 insulation,
              solar-ready infrastructure, and smart thermostats.
            </p>
          </div>
          <div>
            <h4 style={{ color: colors.leed, marginBottom: "8px" }}>
              💧 Water Conservation
            </h4>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.5, margin: 0 }}>
              WaterSense fixtures, smart irrigation, rainwater collection, and
              ≤30% irrigated turf requirement.
            </p>
          </div>
          <div>
            <h4 style={{ color: colors.leed, marginBottom: "8px" }}>
              🛡️ Resilience
            </h4>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.5, margin: 0 }}>
              Impact-resistant materials, climate adaptation measures,
              battery-ready layouts, and flood-tolerant landscaping.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
