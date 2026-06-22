const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useEffect, useState, useRef } from 'react';

import { useTheme } from '@/lib/ThemeContext';
import { Pencil, Trash2, Plus, X, Check, AlertTriangle } from 'lucide-react';

const ADMIN_PASSWORD = 'jimi2026';

function SysToast({ message, type = 'success' }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        padding: '0.75rem 1.25rem',
        backgroundColor: type === 'error' ? '#1a0000' : '#001a14',
        border: `1px solid ${type === 'error' ? '#ff4444' : '#00D4AA'}`,
        fontFamily: 'DM Mono, monospace',
        fontSize: '0.68rem',
        letterSpacing: '0.06em',
        color: type === 'error' ? '#ff4444' : '#00D4AA',
        zIndex: 9999,
        maxWidth: '340px',
      }}
    >
      {message}
    </div>
  );
}

function ProjectRow({ project, onEdit, onDelete, isLight }) {
  const borderColor = isLight ? '#e0e0e0' : '#1E1E1E';
  const textColor = isLight ? '#0A0A0A' : '#F5F5F5';

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr 3fr 1fr auto',
        gap: '1.5rem',
        alignItems: 'center',
        padding: '1.2rem 1.5rem',
        borderBottom: `1px solid ${borderColor}`,
        transition: 'background-color 0.2s ease',
      }}
      onMouseEnter={e => e.currentTarget.style.backgroundColor = isLight ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)'}
      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
    >
      <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.8rem', color: textColor }}>
        {project.name}
      </span>
      <span style={{ fontSize: '0.78rem', color: '#888', lineHeight: 1.5 }}>
        {(project.description || '').slice(0, 80)}{project.description?.length > 80 ? '…' : ''}
      </span>
      <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: project.visible !== false ? '#00D4AA' : '#888' }}>
        {project.visible !== false ? 'VISIBLE' : 'HIDDEN'}
      </span>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={() => onEdit(project)}
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.62rem',
            padding: '0.3rem 0.6rem',
            border: `1px solid ${borderColor}`,
            backgroundColor: 'transparent',
            color: textColor,
            cursor: 'none',
            letterSpacing: '0.05em',
            transition: 'border-color 0.2s ease, color 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#00D4AA'; e.currentTarget.style.color = '#00D4AA'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = borderColor; e.currentTarget.style.color = textColor; }}
        >
          [EDIT]
        </button>
        <button
          onClick={() => onDelete(project)}
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.62rem',
            padding: '0.3rem 0.6rem',
            border: '1px solid #1a1a1a',
            backgroundColor: 'transparent',
            color: '#555',
            cursor: 'none',
            letterSpacing: '0.05em',
            transition: 'border-color 0.2s ease, color 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#ff4444'; e.currentTarget.style.color = '#ff4444'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#1a1a1a'; e.currentTarget.style.color = '#555'; }}
        >
          [DROP]
        </button>
      </div>
    </div>
  );
}

function EditModal({ project, onSave, onClose, isLight }) {
  const [form, setForm] = useState({
    name: project?.name || '',
    description: project?.description || '',
    techTags: (project?.techTags || []).join(', '),
    githubUrl: project?.githubUrl || '',
    displayOrder: project?.displayOrder ?? 0,
    visible: project?.visible !== false,
  });

  const borderColor = isLight ? '#e0e0e0' : '#1E1E1E';
  const textColor = isLight ? '#0A0A0A' : '#F5F5F5';
  const bg = isLight ? '#F9F9F6' : '#0A0A0A';
  const inputBg = isLight ? '#fff' : '#111';

  const inputStyle = {
    width: '100%',
    padding: '0.6rem 0.8rem',
    backgroundColor: inputBg,
    border: `1px solid ${borderColor}`,
    color: textColor,
    fontFamily: 'DM Mono, monospace',
    fontSize: '0.78rem',
    outline: 'none',
    boxSizing: 'border-box',
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9000,
        padding: '2rem',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          backgroundColor: bg,
          border: `1px solid ${borderColor}`,
          padding: '2.5rem',
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.1em', color: '#00D4AA' }}>
            {project?.id ? '[EDIT // PROJECT]' : '[NEW // PROJECT]'}
          </span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#888', cursor: 'none' }}>
            <X size={14} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {[
            { key: 'name', label: 'PROJECT NAME' },
            { key: 'githubUrl', label: 'GITHUB URL' },
            { key: 'techTags', label: 'TECH TAGS (comma-separated)' },
          ].map(({ key, label }) => (
            <div key={key}>
              <label style={{ display: 'block', fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', color: '#888', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                [{label}]
              </label>
              <input
                style={inputStyle}
                value={form[key]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
              />
            </div>
          ))}

          <div>
            <label style={{ display: 'block', fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', color: '#888', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
              [DESCRIPTION]
            </label>
            <textarea
              style={{ ...inputStyle, height: '100px', resize: 'vertical' }}
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', color: '#888', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                [DISPLAY ORDER]
              </label>
              <input
                type="number"
                style={inputStyle}
                value={form.displayOrder}
                onChange={e => setForm(f => ({ ...f, displayOrder: Number(e.target.value) }))}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', color: '#888', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                [VISIBILITY]
              </label>
              <button
                onClick={() => setForm(f => ({ ...f, visible: !f.visible }))}
                style={{
                  ...inputStyle,
                  width: '100%',
                  cursor: 'none',
                  color: form.visible ? '#00D4AA' : '#888',
                  borderColor: form.visible ? '#00D4AA' : borderColor,
                  textAlign: 'left',
                }}
              >
                {form.visible ? 'VISIBLE' : 'HIDDEN'}
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.65rem',
              padding: '0.5rem 1rem',
              border: `1px solid ${borderColor}`,
              backgroundColor: 'transparent',
              color: '#888',
              cursor: 'none',
              letterSpacing: '0.08em',
            }}
          >
            CANCEL
          </button>
          <button
            onClick={() => onSave(form)}
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.65rem',
              padding: '0.5rem 1rem',
              border: '1px solid #00D4AA',
              backgroundColor: '#00D4AA',
              color: '#0A0A0A',
              cursor: 'none',
              letterSpacing: '0.08em',
              fontWeight: 500,
            }}
          >
            SAVE CHANGES
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Admin() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState('');
  const [pwError, setPwError] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [deletingProject, setDeletingProject] = useState(null);
  const [toast, setToast] = useState(null);

  const borderColor = isLight ? '#e0e0e0' : '#1E1E1E';
  const textColor = isLight ? '#0A0A0A' : '#F5F5F5';
  const bg = isLight ? '#F9F9F6' : '#0A0A0A';

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const loadProjects = () => {
    setLoading(true);
    db.entities.Project.list('displayOrder', 50)
      .then(setProjects)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (authed) loadProjects();
  }, [authed]);

  const handleLogin = () => {
    if (pwInput === ADMIN_PASSWORD) {
      setAuthed(true);
    } else {
      setPwError(true);
      setTimeout(() => setPwError(false), 2000);
    }
  };

  const handleSave = async (form) => {
    const payload = {
      name: form.name,
      description: form.description,
      techTags: form.techTags.split(',').map(t => t.trim()).filter(Boolean),
      githubUrl: form.githubUrl,
      displayOrder: form.displayOrder,
      visible: form.visible,
    };
    if (editingProject?.id) {
      await db.entities.Project.update(editingProject.id, payload);
      showToast(`SYS.LOG: ${form.name.toUpperCase().replace(/ /g,'_')} UPDATED // SUCCESS`);
    } else {
      await db.entities.Project.create(payload);
      showToast(`SYS.LOG: NEW PROJECT CREATED // SUCCESS`);
    }
    setEditingProject(null);
    setShowNewModal(false);
    loadProjects();
  };

  const handleDelete = async (project) => {
    await db.entities.Project.delete(project.id);
    setDeletingProject(null);
    showToast(`SYS.LOG: ${project.name.toUpperCase().replace(/ /g,'_')} DROPPED // REMOVED`, 'error');
    loadProjects();
  };

  // Password gate
  if (!authed) {
    return (
      <div
        style={{
          minHeight: 'calc(100vh - 60px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          backgroundColor: bg,
        }}
      >
        <div style={{ width: '100%', maxWidth: '360px' }}>
          <p className="section-label" style={{ marginBottom: '2rem', textAlign: 'center' }}>
            [ADMIN // ACCESS REQUIRED]
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="password"
              placeholder="ENTER ACCESS CODE"
              value={pwInput}
              onChange={e => setPwInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                backgroundColor: isLight ? '#fff' : '#111',
                border: `1px solid ${pwError ? '#ff4444' : borderColor}`,
                color: textColor,
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.8rem',
                letterSpacing: '0.15em',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box',
              }}
            />
            {pwError && (
              <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', color: '#ff4444', letterSpacing: '0.08em' }}>
                ACCESS DENIED // INVALID CODE
              </p>
            )}
            <button
              onClick={handleLogin}
              style={{
                width: '100%',
                padding: '0.8rem',
                backgroundColor: '#00D4AA',
                border: 'none',
                color: '#0A0A0A',
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                fontWeight: 500,
                cursor: 'none',
              }}
            >
              AUTHENTICATE
            </button>
          </div>
        </div>
        {toast && <SysToast message={toast.message} type={toast.type} />}
      </div>
    );
  }

  // Admin dashboard
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
        <div>
          <p className="section-label" style={{ marginBottom: '0.75rem' }}>[ADMIN // COMMAND CENTER]</p>
          <h2 style={{ fontFamily: 'DM Mono, monospace', fontSize: '1.8rem', fontWeight: 500, color: textColor, margin: 0 }}>
            PROJECT DATABASE
          </h2>
          <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: '#888', marginTop: '0.5rem' }}>
            {projects.length} records loaded
          </p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.6rem 1.2rem',
            backgroundColor: '#00D4AA',
            border: 'none',
            color: '#0A0A0A',
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.68rem',
            letterSpacing: '0.1em',
            fontWeight: 500,
            cursor: 'none',
          }}
        >
          <Plus size={12} /> NEW PROJECT
        </button>
      </div>

      {/* Table header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 3fr 1fr auto',
          gap: '1.5rem',
          padding: '0.75rem 1.5rem',
          borderBottom: `1px solid ${borderColor}`,
          borderTop: `1px solid ${borderColor}`,
        }}
      >
        {['NAME', 'DESCRIPTION', 'STATUS', 'ACTIONS'].map(h => (
          <span key={h} className="section-label">[{h}]</span>
        ))}
      </div>

      {/* Projects */}
      {loading ? (
        <div style={{ padding: '3rem', textAlign: 'center' }}>
          <span className="section-label">LOADING // PROJECTS</span>
        </div>
      ) : projects.length === 0 ? (
        <div style={{ padding: '3rem', textAlign: 'center' }}>
          <span className="section-label">NO RECORDS // DATABASE EMPTY</span>
        </div>
      ) : (
        projects.map(project => (
          <ProjectRow
            key={project.id}
            project={project}
            isLight={isLight}
            onEdit={p => setEditingProject(p)}
            onDelete={p => setDeletingProject(p)}
          />
        ))
      )}

      {/* Edit modal */}
      {(editingProject || showNewModal) && (
        <EditModal
          project={editingProject}
          isLight={isLight}
          onClose={() => { setEditingProject(null); setShowNewModal(false); }}
          onSave={handleSave}
        />
      )}

      {/* Delete confirm */}
      {deletingProject && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9000,
            padding: '2rem',
          }}
        >
          <div
            style={{
              backgroundColor: bg,
              border: '1px solid #ff4444',
              padding: '2rem',
              maxWidth: '400px',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <AlertTriangle size={14} style={{ color: '#ff4444' }} />
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.68rem', color: '#ff4444', letterSpacing: '0.1em' }}>
                [WARNING // DESTRUCTIVE ACTION]
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: textColor, marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Drop <strong style={{ color: '#ff4444' }}>{deletingProject.name}</strong> from the database?
              This cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setDeletingProject(null)}
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '0.65rem',
                  padding: '0.5rem 1rem',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: 'transparent',
                  color: '#888',
                  cursor: 'none',
                  letterSpacing: '0.08em',
                }}
              >
                ABORT
              </button>
              <button
                onClick={() => handleDelete(deletingProject)}
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '0.65rem',
                  padding: '0.5rem 1rem',
                  border: '1px solid #ff4444',
                  backgroundColor: 'transparent',
                  color: '#ff4444',
                  cursor: 'none',
                  letterSpacing: '0.08em',
                }}
              >
                CONFIRM DROP
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <SysToast message={toast.message} type={toast.type} />}
    </div>
  );
}