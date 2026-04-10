import { useState } from 'react';

const versions = [
  { id: 'v1', label: 'V1', desc: 'Bold Modern' },
  { id: 'v2', label: 'V2', desc: 'Editorial Olive' },
  { id: 'v3', label: 'V3', desc: 'Script Signature' },
] as const;

export type VersionId = (typeof versions)[number]['id'];

interface Props {
  current: VersionId;
  onChange: (v: VersionId) => void;
}

export function VersionSwitcher({ current, onChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-4 right-4 z-[9999]" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: 40, height: 40, borderRadius: '50%',
          background: current === 'v1' ? '#FACC15' : current === 'v2' ? '#4A5A52' : '#2B2B2B',
          color: current === 'v1' ? '#2B2B2B' : '#F7F5F2',
          border: '2px solid rgba(255,255,255,0.3)',
          fontSize: 11, fontWeight: 700, cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.2s ease',
          transform: open ? 'rotate(90deg)' : 'none',
        }}
      >
        {current.toUpperCase()}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: 'absolute', top: 48, right: 0,
            background: 'rgba(247,245,242,0.97)', backdropFilter: 'blur(12px)',
            borderRadius: 12, padding: 8,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            border: '1px solid rgba(184,169,153,0.2)',
            minWidth: 160,
          }}
        >
          {versions.map((v) => (
            <button
              key={v.id}
              onClick={() => { onChange(v.id); setOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                width: '100%', padding: '10px 12px', border: 'none',
                background: current === v.id ? 'rgba(74,90,82,0.1)' : 'transparent',
                borderRadius: 8, cursor: 'pointer', textAlign: 'left',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => { if (current !== v.id) (e.target as HTMLElement).style.background = 'rgba(0,0,0,0.04)'; }}
              onMouseLeave={(e) => { if (current !== v.id) (e.target as HTMLElement).style.background = 'transparent'; }}
            >
              <span style={{
                width: 28, height: 28, borderRadius: '50%',
                background: v.id === 'v1' ? '#FACC15' : v.id === 'v2' ? '#4A5A52' : '#2B2B2B',
                color: v.id === 'v1' ? '#2B2B2B' : '#F7F5F2',
                fontSize: 10, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {v.label}
              </span>
              <span style={{ fontSize: 13, color: '#2B2B2B', fontWeight: current === v.id ? 600 : 400 }}>
                {v.desc}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
