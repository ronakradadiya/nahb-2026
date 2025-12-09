import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

// Color palette - professional construction/engineering theme
const colors = {
  primary: '#1B3A4B',      // Deep navy
  secondary: '#E07A5F',    // Terracotta/construction orange
  accent: '#3D5A80',       // Steel blue
  success: '#4A7C59',      // Safety green
  warning: '#F2CC8F',      // Caution yellow
  danger: '#C44536',       // Alert red
  light: '#F4F1DE',        // Off-white/cream
  dark: '#0D1B2A',         // Near black
  gray: '#6B7280',
  lightGray: '#E5E7EB',
};

// Org chart color palette - earthy sage tones
const orgColors = {
  bone: '#EBE3D2',
  dun: '#CCBFA3',
  sage: '#A4AC86',
  reseda: '#737A5D',
  ebony: '#414833',
};

// Organization data
const orgStructure = [
  { role: 'Senior Construction Manager', level: 1, icon: '👷‍♂️', color: colors.primary,
    desc: 'Directs all on-site operations, ensures code compliance & safety standards' },
  { role: 'Area Construction Manager', level: 2, icon: '🏗️', color: colors.accent,
    desc: 'Oversees production for specific phases, manages schedule & budget' },
  { role: 'Land Development Manager', level: 2, icon: '🌍', color: colors.success,
    desc: 'Manages horizontal site development, delivers pad-ready lots' },
  { role: 'Construction Manager', level: 3, icon: '🔨', color: colors.secondary,
    desc: 'Manages daily vertical construction from foundation to closing' },
  { role: 'Construction Project Intern', level: 4, icon: '📋', color: colors.gray,
    desc: 'Supports site management, maintains logs, tracks RFIs' },
];

const safetyItems = [
  { title: 'OSHA 30 Certification', icon: '🎓', color: colors.primary,
    desc: 'All managers & superintendents must hold current OSHA 30-hour certification and CPR training' },
  { title: 'AED Accessibility', icon: '❤️', color: colors.danger,
    desc: 'Fully operational AED permanently mounted in site office for cardiac emergencies' },
  { title: 'Daily Site Housekeeping', icon: '🧹', color: colors.success,
    desc: 'Clean-as-you-go policy enforced - remove debris, scrap, and trip hazards continuously' },
  { title: 'Material Inspection', icon: '✅', color: colors.accent,
    desc: 'All deliveries undergo strict visual inspection; damaged materials immediately rejected' },
  { title: 'Third-Party Audits', icon: '🔍', color: colors.warning,
    desc: 'Independent inspectors verify work at critical phases: foundation, framing, mechanicals' },
  { title: 'Surface Protection', icon: '🛡️', color: colors.secondary,
    desc: 'High-touch surfaces covered with protective layers during final construction weeks' },
];

const safetyPlanSections = [
  { num: '01', title: 'Objectives', items: ['Safeguard well-being of all staff & visitors', 'Reduce incident frequency & severity', 'Full regulatory compliance'] },
  { num: '02', title: 'Roles', items: ['Safety Officer: Compliance & audits', 'Supervisors: Daily enforcement', 'Crew: Report hazards immediately'] },
  { num: '03', title: 'Hazard Assessment', items: ['Thorough risk analysis', 'Identify electrical, machinery, fall risks', 'Continuous updates as phases change'] },
  { num: '04', title: 'PPE & Training', items: ['Hard hats, high-vis, steel-toed boots', 'Mandatory onboarding for all personnel', 'Continuous education sessions'] },
  { num: '05', title: 'Emergency Response', items: ['Medical, fire, weather protocols', 'Regular emergency drills', 'Clear evacuation routes'] },
  { num: '06', title: 'Traffic & Equipment', items: ['Designated vehicle vs pedestrian routes', 'Certified operators only', 'Strict maintenance schedules'] },
];

const environmentalItems = [
  { title: 'Stormwater Prevention', icon: '💧', color: colors.accent,
    items: ['Rock check dams in temporary swales', 'High-velocity erosion blankets on steep slopes', 'Sediment basins with skimmer outlets', 'Inspections after 0.5"+ rainfall'] },
  { title: 'Dust Control', icon: '💨', color: colors.warning,
    items: ['Water trucks for continuous dampening', '10 MPH speed limit enforced', 'Perimeter silt fencing', 'Daily street sweeping'] },
];

const softwareFeatures = [
  { feature: 'Real-Time Updates', icon: '⚡' },
  { feature: 'Field-to-Office Sync', icon: '🔄' },
  { feature: 'Document Management', icon: '📁' },
  { feature: 'RFI Tracking', icon: '📝' },
  { feature: 'Photo Documentation', icon: '📷' },
  { feature: 'Permit Box Integration', icon: '📦' },
];

// Download Button Component
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
        padding: "8px 16px",
        backgroundColor: downloading ? colors.warning : colors.secondary,
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
        opacity: 0.9,
      }}
      onMouseEnter={(e) => (e.target.style.opacity = "1")}
      onMouseLeave={(e) => (e.target.style.opacity = "0.9")}
    >
      {downloading ? "⏳ Saving..." : "📥 Download PNG"}
    </button>
  );
};

export default function ProjectManagement() {
  const [activeSection, setActiveSection] = useState('overview');
  const orgChartRef = useRef(null);

  const NavButton = ({ id, label, icon }) => (
    <button
      onClick={() => setActiveSection(id)}
      style={{
        padding: '12px 20px',
        backgroundColor: activeSection === id ? colors.secondary : 'transparent',
        color: activeSection === id ? '#fff' : colors.light,
        border: `2px solid ${activeSection === id ? colors.secondary : 'rgba(255,255,255,0.2)'}`,
        borderRadius: '8px',
        cursor: 'pointer',
        fontFamily: "'Georgia', serif",
        fontSize: '0.9rem',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.3s ease',
      }}
    >
      <span>{icon}</span> {label}
    </button>
  );

  return (
    <div style={{ fontFamily: "'Georgia', serif", backgroundColor: colors.light, minHeight: '100vh' }}>
      
      {/* Header */}
      <header style={{ 
        background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.primary} 100%)`,
        color: '#fff',
        padding: '30px 40px',
        borderBottom: `4px solid ${colors.secondary}`
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '0.85rem', letterSpacing: '4px', color: colors.secondary, marginBottom: '8px', textTransform: 'uppercase' }}>
              NAHB Student Competition 2025
            </div>
            <h1 style={{ fontSize: '2.2rem', margin: 0, fontWeight: 700, letterSpacing: '1px' }}>
              PROJECT MANAGEMENT
            </h1>
            <p style={{ margin: '8px 0 0', fontSize: '1rem', opacity: 0.8 }}>
              Lilburn Residential Development | Gwinnett County, Georgia
            </p>
          </div>
          <div style={{ 
            backgroundColor: 'rgba(255,255,255,0.1)', 
            padding: '15px 25px', 
            borderRadius: '10px',
            textAlign: 'center',
            border: `1px solid rgba(255,255,255,0.2)`
          }}>
            <div style={{ fontSize: '0.7rem', letterSpacing: '2px', opacity: 0.7, marginBottom: '5px' }}>POWERED BY</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: colors.warning }}>PROCORE</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Single Source of Truth</div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <NavButton id="overview" label="Overview" icon="📊" />
          <NavButton id="team" label="Team Structure" icon="👥" />
          <NavButton id="safety" label="Safety & QA" icon="🛡️" />
          <NavButton id="environmental" label="Environmental" icon="🌿" />
          <NavButton id="logistics" label="Logistics" icon="🚛" />
        </nav>
      </header>

      <main style={{ padding: '30px 40px' }}>
        
        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div>
            {/* Key Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
              {[
                { label: 'Management Roles', value: '5', icon: '👷', color: colors.primary },
                { label: 'Safety Protocols', value: '6', icon: '🛡️', color: colors.success },
                { label: 'Construction Phases', value: '2', icon: '🏗️', color: colors.accent },
                { label: 'QA Checkpoints', value: '9', icon: '✅', color: colors.secondary },
              ].map((stat, i) => (
                <div key={i} style={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  padding: '25px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                  borderLeft: `5px solid ${stat.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}>
                  <div style={{ fontSize: '2.5rem' }}>{stat.icon}</div>
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: stat.color }}>{stat.value}</div>
                    <div style={{ fontSize: '0.85rem', color: colors.gray, textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Project Approach */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '25px' }}>
              <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '25px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }}>
                <h2 style={{ color: colors.primary, marginBottom: '20px', fontSize: '1.3rem', borderBottom: `2px solid ${colors.secondary}`, paddingBottom: '10px' }}>
                  📋 Project Execution Strategy
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ padding: '20px', backgroundColor: colors.light, borderRadius: '10px', borderTop: `4px solid ${colors.primary}` }}>
                    <h4 style={{ color: colors.primary, margin: '0 0 10px', fontSize: '1rem' }}>Phase 1: Land Development</h4>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: colors.gray, lineHeight: 1.6 }}>
                      Horizontal site development executed for entire site simultaneously including central stream crossing, prior to vertical construction.
                    </p>
                  </div>
                  <div style={{ padding: '20px', backgroundColor: colors.light, borderRadius: '10px', borderTop: `4px solid ${colors.secondary}` }}>
                    <h4 style={{ color: colors.secondary, margin: '0 0 10px', fontSize: '1rem' }}>Phase 2: Sequential Building</h4>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: colors.gray, lineHeight: 1.6 }}>
                      Home building proceeds sequentially - all Phase 1 homes completed before Phase 2 commences for optimal logistics.
                    </p>
                  </div>
                </div>
                <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#E8F5E9', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '1.5rem' }}>✅</span>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: colors.dark }}>
                    <strong>Key Benefit:</strong> Stream crossing fully constructed and certified for heavy loads before Phase 2, ensuring seamless material delivery access.
                  </p>
                </div>
              </div>

              {/* Procore Features */}
              <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '25px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }}>
                <h2 style={{ color: colors.primary, marginBottom: '20px', fontSize: '1.3rem', borderBottom: `2px solid ${colors.warning}`, paddingBottom: '10px' }}>
                  💻 Procore Capabilities
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {softwareFeatures.map((item, i) => (
                    <div key={i} style={{
                      padding: '15px',
                      backgroundColor: colors.light,
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      border: `1px solid ${colors.lightGray}`
                    }}>
                      <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: colors.dark }}>{item.feature}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '15px', padding: '12px', backgroundColor: colors.dark, borderRadius: '8px', color: '#fff', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', opacity: 0.7, marginBottom: '3px' }}>CONNECTS</div>
                  <div style={{ fontSize: '0.9rem' }}>Field Staff ↔ Office Leadership</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Team Structure Section */}
        {activeSection === 'team' && (
          <div>
            <h2 style={{ color: colors.primary, marginBottom: '25px', fontSize: '1.5rem' }}>
              👥 Organizational Structure
            </h2>
            
            {/* Org Chart Visual with Download Button */}
            <div 
              ref={orgChartRef}
              style={{ 
                backgroundColor: '#fff', 
                borderRadius: '12px', 
                padding: '30px', 
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)', 
                marginBottom: '25px',
                position: 'relative'
              }}
            >
              <ChartDownloadButton chartRef={orgChartRef} filename="organizational-structure" />
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Level 1 - Senior Construction Manager */}
                <div style={{
                  backgroundColor: orgColors.ebony,
                  color: '#fff',
                  padding: '20px 40px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  minWidth: '280px',
                  boxShadow: '0 4px 15px rgba(65, 72, 51, 0.4)'
                }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>👷‍♂️</div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Senior Construction Manager</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '5px' }}>Directs all on-site operations</div>
                </div>
                
                {/* Vertical line down from Senior */}
                <div style={{ width: '3px', height: '25px', backgroundColor: orgColors.ebony }} />
                
                {/* Horizontal line connecting Level 2 */}
                <div style={{ position: 'relative', width: '450px', height: '3px', backgroundColor: orgColors.ebony }}>
                  {/* Left vertical connector */}
                  <div style={{ position: 'absolute', left: '0', top: '0', width: '3px', height: '25px', backgroundColor: orgColors.ebony }} />
                  {/* Right vertical connector */}
                  <div style={{ position: 'absolute', right: '0', top: '0', width: '3px', height: '25px', backgroundColor: orgColors.ebony }} />
                </div>
                
                {/* Level 2 - Two branches */}
                <div style={{ display: 'flex', gap: '80px', marginTop: '22px' }}>
                  {/* Left Branch - Area Construction Manager */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      backgroundColor: orgColors.reseda,
                      color: '#fff',
                      padding: '18px 25px',
                      borderRadius: '10px',
                      textAlign: 'center',
                      minWidth: '200px',
                      boxShadow: '0 4px 15px rgba(115, 122, 93, 0.4)'
                    }}>
                      <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>🏗️</div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Area Construction Manager</div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.9, marginTop: '4px' }}>Oversees phase production</div>
                    </div>
                    
                    {/* Vertical line to Construction Manager */}
                    <div style={{ width: '3px', height: '25px', backgroundColor: orgColors.reseda }} />
                    
                    {/* Level 3 - Construction Manager */}
                    <div style={{
                      backgroundColor: orgColors.sage,
                      color: orgColors.ebony,
                      padding: '16px 22px',
                      borderRadius: '10px',
                      textAlign: 'center',
                      minWidth: '190px',
                      boxShadow: '0 4px 15px rgba(164, 172, 134, 0.4)'
                    }}>
                      <div style={{ fontSize: '1.4rem', marginBottom: '6px' }}>🔨</div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Construction Manager</div>
                      <div style={{ fontSize: '0.7rem', opacity: 0.85, marginTop: '4px' }}>Daily vertical construction</div>
                    </div>
                    
                    {/* Vertical line to Intern */}
                    <div style={{ width: '3px', height: '25px', backgroundColor: orgColors.sage }} />
                    
                    {/* Level 4 - Intern */}
                    <div style={{
                      backgroundColor: orgColors.dun,
                      color: orgColors.ebony,
                      padding: '14px 20px',
                      borderRadius: '10px',
                      textAlign: 'center',
                      minWidth: '180px',
                      boxShadow: '0 4px 15px rgba(204, 191, 163, 0.4)'
                    }}>
                      <div style={{ fontSize: '1.2rem', marginBottom: '5px' }}>📋</div>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Construction Project Intern</div>
                      <div style={{ fontSize: '0.65rem', opacity: 0.85, marginTop: '3px' }}>Site support & documentation</div>
                    </div>
                  </div>
                  
                  {/* Right Branch - Land Development Manager (separate branch, no subordinates) */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      backgroundColor: orgColors.reseda,
                      color: '#fff',
                      padding: '18px 25px',
                      borderRadius: '10px',
                      textAlign: 'center',
                      minWidth: '200px',
                      boxShadow: '0 4px 15px rgba(115, 122, 93, 0.4)'
                    }}>
                      <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>🌍</div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Land Development Manager</div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.9, marginTop: '4px' }}>Horizontal site development</div>
                    </div>
                    
                    {/* Note about handoff */}
                    <div style={{ 
                      marginTop: '20px', 
                      padding: '12px 15px', 
                      backgroundColor: orgColors.bone, 
                      borderRadius: '8px',
                      border: `2px dashed ${orgColors.reseda}`,
                      maxWidth: '200px',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '0.75rem', color: orgColors.ebony, lineHeight: 1.4 }}>
                        Delivers pad-ready lots to Construction Managers
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Role Details */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              {orgStructure.map((role, i) => (
                <div key={i} style={{
                  backgroundColor: '#fff',
                  borderRadius: '10px',
                  padding: '20px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                  borderLeft: `5px solid ${role.color}`,
                  display: 'flex',
                  gap: '15px'
                }}>
                  <div style={{ fontSize: '2rem' }}>{role.icon}</div>
                  <div>
                    <h4 style={{ margin: '0 0 8px', color: role.color, fontSize: '1rem' }}>{role.role}</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: colors.gray, lineHeight: 1.5 }}>{role.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Safety Section */}
        {activeSection === 'safety' && (
          <div>
            <h2 style={{ color: colors.primary, marginBottom: '25px', fontSize: '1.5rem' }}>
              🛡️ Safety & Quality Assurance
            </h2>

            {/* 6 Safety Items */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
              {safetyItems.map((item, i) => (
                <div key={i} style={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  padding: '25px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                  borderTop: `5px solid ${item.color}`,
                  textAlign: 'center'
                }}>
                  <div style={{ 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '50%', 
                    backgroundColor: `${item.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 15px',
                    fontSize: '1.8rem'
                  }}>
                    {item.icon}
                  </div>
                  <h4 style={{ margin: '0 0 10px', color: colors.dark, fontSize: '1rem' }}>{item.title}</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: colors.gray, lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Safety Plan Grid */}
            <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }}>
              <h3 style={{ color: colors.primary, marginBottom: '25px', fontSize: '1.2rem', borderBottom: `2px solid ${colors.secondary}`, paddingBottom: '10px' }}>
                📋 Comprehensive Safety Plan
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {safetyPlanSections.map((section, i) => (
                  <div key={i} style={{
                    padding: '20px',
                    backgroundColor: colors.light,
                    borderRadius: '10px',
                    borderLeft: `4px solid ${colors.accent}`
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                      <span style={{ 
                        backgroundColor: colors.accent, 
                        color: '#fff', 
                        padding: '5px 10px', 
                        borderRadius: '5px',
                        fontWeight: 700,
                        fontSize: '0.85rem'
                      }}>
                        {section.num}
                      </span>
                      <h4 style={{ margin: 0, color: colors.dark, fontSize: '1rem' }}>{section.title}</h4>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.85rem', color: colors.gray, lineHeight: 1.8 }}>
                      {section.items.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Environmental Section */}
        {activeSection === 'environmental' && (
          <div>
            <h2 style={{ color: colors.primary, marginBottom: '25px', fontSize: '1.5rem' }}>
              🌿 Environmental Management
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '30px' }}>
              {environmentalItems.map((item, i) => (
                <div key={i} style={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  padding: '30px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                  borderTop: `5px solid ${item.color}`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                    <div style={{ 
                      width: '50px', 
                      height: '50px', 
                      borderRadius: '10px', 
                      backgroundColor: `${item.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.8rem'
                    }}>
                      {item.icon}
                    </div>
                    <h3 style={{ margin: 0, color: colors.dark, fontSize: '1.2rem' }}>{item.title}</h3>
                  </div>
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {item.items.map((point, j) => (
                      <div key={j} style={{
                        padding: '12px 15px',
                        backgroundColor: colors.light,
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        color: colors.dark,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}>
                        <span style={{ color: item.color, fontWeight: 700 }}>✓</span>
                        {point}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* SWPPP Compliance */}
            <div style={{ 
              backgroundColor: colors.primary, 
              borderRadius: '12px', 
              padding: '30px', 
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: '30px'
            }}>
              <div style={{ fontSize: '4rem' }}>📋</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 10px', fontSize: '1.3rem' }}>SWPPP Compliance</h3>
                <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.9, lineHeight: 1.6 }}>
                  Stormwater Pollution Prevention Plan maintained in Procore permit box for immediate review by City of Lilburn code enforcement. Mandatory inspections conducted after every rainfall event of 0.5 inches or greater.
                </p>
              </div>
              <div style={{ 
                backgroundColor: 'rgba(255,255,255,0.15)', 
                padding: '20px', 
                borderRadius: '10px', 
                textAlign: 'center' 
              }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: colors.warning }}>0.5"</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Inspection Threshold</div>
              </div>
            </div>
          </div>
        )}

        {/* Logistics Section */}
        {activeSection === 'logistics' && (
          <div>
            <h2 style={{ color: colors.primary, marginBottom: '25px', fontSize: '1.5rem' }}>
              🚛 Material Delivery & Traffic Management
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
              {/* Material Delivery */}
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '30px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
              }}>
                <h3 style={{ color: colors.primary, marginBottom: '20px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.5rem' }}>📦</span> Material Delivery Strategy
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {[
                    { title: 'Just-in-Time Delivery', desc: 'Materials delivered directly to home sites, minimizing on-site storage', icon: '⏱️' },
                    { title: 'Dry-In Priority', desc: 'Secure storage prioritized during dry-in phase for material protection', icon: '🏠' },
                    { title: 'Rolling Stockpiles', desc: 'Undeveloped lots utilized for temporary material storage', icon: '📍' },
                    { title: 'Sequential Completion', desc: 'Phase 1 homes completed before Phase 2 commences', icon: '✅' },
                  ].map((item, i) => (
                    <div key={i} style={{
                      padding: '15px',
                      backgroundColor: colors.light,
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px'
                    }}>
                      <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
                      <div>
                        <h4 style={{ margin: '0 0 5px', color: colors.dark, fontSize: '0.95rem' }}>{item.title}</h4>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: colors.gray }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Traffic Management */}
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '30px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
              }}>
                <h3 style={{ color: colors.primary, marginBottom: '20px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.5rem' }}>🚧</span> Construction Traffic Plan
                </h3>
                
                {/* Entry Point Highlight */}
                <div style={{
                  backgroundColor: colors.secondary,
                  color: '#fff',
                  padding: '20px',
                  borderRadius: '10px',
                  marginBottom: '20px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8, marginBottom: '5px' }}>SOLE ACCESS POINT</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>Southernmost Entrance</div>
                  <div style={{ fontSize: '0.9rem', marginTop: '5px' }}>Oleander Drive</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    'High-visibility "Construction Entrance" signage',
                    'Designated paths for vehicles',
                    'Pedestrian zones separated from vehicle traffic',
                    'Minimized impact on surrounding neighborhood',
                  ].map((item, i) => (
                    <div key={i} style={{
                      padding: '12px 15px',
                      backgroundColor: colors.light,
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      color: colors.dark,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <span style={{ color: colors.success, fontWeight: 700 }}>✓</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stream Crossing Note */}
            <div style={{
              marginTop: '25px',
              backgroundColor: '#E3F2FD',
              borderRadius: '12px',
              padding: '25px',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              border: `2px solid ${colors.accent}`
            }}>
              <div style={{ fontSize: '3rem' }}>🌊</div>
              <div>
                <h4 style={{ margin: '0 0 8px', color: colors.accent, fontSize: '1.1rem' }}>Stream Crossing Infrastructure</h4>
                <p style={{ margin: 0, fontSize: '0.95rem', color: colors.dark, lineHeight: 1.6 }}>
                  Permanent stream crossing fully constructed and certified for heavy loads <strong>before</strong> Phase 2 vertical construction begins, guaranteeing seamless access for material deliveries without logistical delays.
                </p>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
