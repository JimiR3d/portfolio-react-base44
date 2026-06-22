import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import ScrambleText from '@/components/ScrambleText';

const STACK = [
  { label: 'Python', category: 'CORE' },
  { label: 'SQL', category: 'CORE' },
  { label: 'Power BI', category: 'CORE' },
  { label: 'Microsoft Fabric', category: 'CORE' },
  { label: 'Pandas', category: 'CORE' },
  { label: 'Streamlit', category: 'TOOLS' },
  { label: 'DuckDB', category: 'TOOLS' },
  { label: 'Plotly', category: 'TOOLS' },
  { label: 'Git', category: 'TOOLS' },
  { label: 'GitHub Actions', category: 'TOOLS' },
];

const TIMELINE = [
  {
    period: '2026 →',
    role: 'M.Sc. Technology & Management',
    org: 'CODE University of Applied Sciences, Berlin',
    note: 'Admitted · Starting September 2026',
  },
  {
    period: '2024 – 2025',
    role: 'Data Analyst — Regulatory Automation',
    org: 'Qucoon',
    note: 'Built Basel III compliance reporting pipelines for a Nigerian bank',
  },
  {
    period: '2023 – 2024',
    role: 'ERP Implementation Consultant',
    org: 'GEMS Consulting',
    note: 'Deployed Microsoft Dynamics NAV/BC for enterprise clients',
  },
  {
    period: '2019 – 2023',
    role: 'B.Sc. Computer Science',
    org: 'Nigeria',
    note: 'Foundation in algorithms, data structures, and software engineering',
  },
];

export default function About() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const borderColor = isLight ? '#e0e0e0' : '#1E1E1E';
  const mutedColor = '#888888';
  const textColor = isLight ? '#0A0A0A' : '#F5F5F5';

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '5rem 2.5rem' }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '5rem' }}
      >
        <p className="section-label" style={{ marginBottom: '1.5rem' }}>
          [SECTION.03 // INTEL]
        </p>
        <h2
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 500,
            color: textColor,
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          <ScrambleText text="ABOUT THE" trigger speed={30} delay={200} />
          <br />
          <span style={{ color: '#00D4AA' }}>
            <ScrambleText text="SYSTEM" trigger speed={30} delay={600} />
          </span>
        </h2>
      </motion.div>

      {/* Two column layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          marginBottom: '5rem',
        }}
        className="grid-cols-about"
      >
        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="section-label" style={{ marginBottom: '1.5rem' }}>
            [PROFILE // BIO]
          </p>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: isLight ? '#444' : '#aaa', marginBottom: '1.2rem' }}>
            I'm a data analyst and CS graduate based in Lagos, Nigeria, specialising in
            regulatory reporting automation, financial data pipelines, and compliance analytics.
          </p>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: isLight ? '#444' : '#aaa', marginBottom: '1.2rem' }}>
            My work sits at the intersection of Python, SQL, and the regulatory frameworks
            that govern African banking — Basel III, CBN prudential guidelines, and financial
            risk reporting.
          </p>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: isLight ? '#444' : '#aaa' }}>
            Previously, I built automated Basel III compliance reporting pipelines at Qucoon
            and implemented ERP systems (Microsoft Dynamics NAV/BC) at GEMS Consulting.
            Starting September 2026, I'll be pursuing an M.Sc. in Technology & Management
            at CODE University of Applied Sciences, Berlin.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p className="section-label" style={{ marginBottom: '1.5rem' }}>
            [TIMELINE // LOG]
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {TIMELINE.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '1.5rem' }}>
                <div
                  style={{
                    width: '1px',
                    backgroundColor: borderColor,
                    flexShrink: 0,
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '4px',
                      left: '-3px',
                      width: '7px',
                      height: '7px',
                      backgroundColor: '#00D4AA',
                      borderRadius: '50%',
                    }}
                  />
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '0.65rem',
                      color: '#00D4AA',
                      letterSpacing: '0.1em',
                      marginBottom: '0.3rem',
                    }}
                  >
                    {item.period}
                  </p>
                  <p style={{ fontSize: '0.9rem', fontWeight: 500, color: textColor, marginBottom: '0.2rem' }}>
                    {item.role}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: mutedColor, marginBottom: '0.3rem' }}>
                    {item.org}
                  </p>
                  <p style={{ fontSize: '0.78rem', color: isLight ? '#666' : '#666', fontStyle: 'italic' }}>
                    {item.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        style={{
          borderTop: `1px solid ${borderColor}`,
          paddingTop: '3rem',
        }}
      >
        <p className="section-label" style={{ marginBottom: '2rem' }}>
          [STACK // DEPENDENCIES]
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {STACK.map((item, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.05 }}
              className="tech-tag"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <span style={{ color: '#00D4AA', fontSize: '0.55rem' }}>{item.category}</span>
              {item.label}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Currently section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        style={{
          borderTop: `1px solid ${borderColor}`,
          paddingTop: '3rem',
          marginTop: '3rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
        }}
      >
        {[
          { label: 'STATUS', value: 'Open to Work' },
          { label: 'LOCATION', value: 'Lagos, Nigeria' },
          { label: 'FOCUS', value: 'Data Analytics · RegTech' },
          { label: 'NEXT', value: 'CODE University, Berlin \'26' },
        ].map((item, i) => (
          <div key={i}>
            <p className="section-label" style={{ marginBottom: '0.5rem' }}>
              [{item.label}]
            </p>
            <p style={{ fontSize: '0.9rem', color: textColor, fontFamily: 'DM Mono, monospace' }}>
              {item.value}
            </p>
          </div>
        ))}
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .grid-cols-about {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </div>
  );
}
