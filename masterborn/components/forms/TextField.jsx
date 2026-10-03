import React from 'react';
export function TextField({ label, optional = false, hint, style, inputStyle, ...input }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      <span style={{ font: 'var(--text-label)', color: 'var(--text-secondary)' }}>{label}{optional && <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}> (opcjonalnie)</span>}</span>
      <input {...input} onFocus={e => { setFocus(true); input.onFocus && input.onFocus(e); }} onBlur={e => { setFocus(false); input.onBlur && input.onBlur(e); }}
        style={{ height: 'var(--control-h)', padding: '0 12px', border: '1px solid ' + (focus ? 'var(--focus-ring)' : 'var(--border-strong)'), outline: focus ? '1px solid var(--focus-ring)' : 'none', borderRadius: 'var(--radius-md)', font: 'inherit', fontSize: 15, background: 'var(--surface-card)', color: 'var(--text-body)', width: '100%', boxSizing: 'border-box', ...inputStyle }} />
      {hint && <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{hint}</span>}
    </label>
  );
}
