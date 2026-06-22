const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';

import { useTheme } from '@/lib/ThemeContext';
import ScrambleText from '@/components/ScrambleText';

export default function Projects() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const borderColor = isLight ? '#e0e0e0' : '#1E1E1E';
  const textColor = isLight ? '#0A0A0A' : '#F5F5F5';

  useEffect(() => {
    db.entities.Project.list('displayOrder', 50)
      .then(data => {
        const visible = data.filter(p => p.visible !== false);
        setProjects(visible);
      })
      .finally(() => setLoading(false));
  }, []);

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
          [SECTION.02 // ARCHIVE]
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
          <ScrambleText text="PROJECT" trigger speed={30} delay={200} />
          <br />
          <span style={{ color: '#00D4AA' }}>
            <ScrambleText text="ARCHIVE" trigger speed={30} delay={600} />
          </span>
        </h2>
      </motion.div>

      {/* Projects list */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {[1, 2, 3, 4].map(i => (
            <div
              key={i}
              style={{
                height: '140px',
                border: `1px solid ${borderColor}`,
                backgroundColor: isLight ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.01)',
                marginBottom: '1px',
                animation: 'shimmer 1.5s ease infinite',
              }}
            />
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * i, duration: 0.5 }}
              className="project-card"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '2rem',
                padding: '2.5rem',
                cursor: 'default',
              }}
            >
              {/* Left — main content */}
              <div>
                {/* Index + title */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '1rem' }}>
                  <span
                    style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '0.65rem',
                      color: '#00D4AA',
                      letterSpacing: '0.1em',
                      flexShrink: 0,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                      fontWeight: 500,
                      color: textColor,
                      margin: 0,
                      lineHeight: 1.2,
                    }}
                  >
                    {project.name}
                  </h3>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: '0.88rem',
                    lineHeight: 1.7,
                    color: isLight ? '#555' : '#888888',
                    marginBottom: '1.5rem',
                    maxWidth: '600px',
                  }}
                >
                  {project.description}
                </p>

                {/* Tech tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {(project.techTags || []).map((tag, j) => (
                    <span key={j} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right — status + link */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  minWidth: '140px',
                  borderLeft: `1px solid ${borderColor}`,
                  paddingLeft: '2rem',
                }}
              >
                <div>
                  <p className="section-label" style={{ marginBottom: '0.5rem', textAlign: 'right' }}>
                    [SYS.STATUS]
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'flex-end' }}>
                    <div
                      style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        backgroundColor: '#00D4AA',
                        boxShadow: '0 0 5px #00D4AA',
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'DM Mono, monospace',
                        fontSize: '0.6rem',
                        color: '#00D4AA',
                        letterSpacing: '0.1em',
                      }}
                    >
                      ACTIVE
                    </span>
                  </div>
                </div>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.5rem 1rem',
                    border: `1px solid ${borderColor}`,
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.62rem',
                    letterSpacing: '0.1em',
                    color: isLight ? '#0A0A0A' : '#F5F5F5',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s ease, color 0.2s ease',
                    marginTop: '2rem',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#00D4AA';
                    e.currentTarget.style.color = '#00D4AA';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = borderColor;
                    e.currentTarget.style.color = isLight ? '#0A0A0A' : '#F5F5F5';
                  }}
                >
                  GITHUB <ArrowUpRight size={10} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes shimmer {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @media (max-width: 640px) {
          .project-card > div:last-child {
            display: none !important;
          }
          .project-card {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}