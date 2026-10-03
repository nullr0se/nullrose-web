import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function Dialog({ open, title, children, footer, onClose, width = 480 }) {
  React.useEffect(() => {
    if (!open) return;
    const k = e => { if (e.key === 'Escape' && onClose) onClose(); };
    document.addEventListener('keydown', k); return () => document.removeEventListener('keydown', k);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div onMouseDown={e => { if (e.target === e.currentTarget && onClose) onClose(); }} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'var(--overlay)', display: 'grid', placeItems: 'center', padding: 24 }}>
      <div role="dialog" aria-modal="true" aria-label={title} style={{ width, maxWidth: '100%', maxHeight: 'calc(100vh - 48px)', background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-dialog)', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)', color: 'var(--text-body)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '18px 20px 18px 24px', borderBottom: '1px solid var(--border-default)' }}>
          <h2 style={{ margin: 0, font: 'var(--text-page-title)', letterSpacing: 'var(--tracking-tight)' }}>{title}</h2>
          {onClose && <button type="button" aria-label="Zamknij" onClick={onClose} style={{ width: 36, height: 36, border: 0, background: 'none', borderRadius: 8, display: 'grid', placeItems: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}><Icon name="x" size={18} /></button>}
        </div>
        <div style={{ padding: 24, fontSize: 15, lineHeight: 1.45, overflowY: 'auto', minHeight: 0 }}>{children}</div>
        {footer && <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, padding: '16px 24px', borderTop: '1px solid var(--border-default)' }}>{footer}</div>}
      </div>
    </div>
  );
}
