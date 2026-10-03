import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function Stepper({ label, value, min = 1, max = 99, unit, onChange, style }) {
  const btn = (d, dis, name, aria) => (
    <button type="button" aria-label={aria} disabled={dis} onClick={() => onChange && onChange(value + d)}
      style={{ width: 44, height: '100%', border: 0, background: 'none', display: 'grid', placeItems: 'center', cursor: dis ? 'not-allowed' : 'pointer', opacity: dis ? 0.3 : 1, color: 'var(--text-body)' }}>
      <Icon name={name} />
    </button>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && <span style={{ font: 'var(--text-label)', color: 'var(--text-secondary)' }}>{label}</span>}
      <div role="group" aria-label={label} style={{ display: 'flex', alignItems: 'center', height: 'var(--control-h)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)', background: 'var(--surface-card)', overflow: 'hidden' }}>
        {btn(-1, value <= min, 'minus', 'Mniej')}
        <output style={{ flex: 1, minWidth: 48, textAlign: 'center', fontWeight: 600, fontSize: 16 }}>{value}{unit ? ' ' + unit : ''}</output>
        {btn(1, value >= max, 'plus', 'Więcej')}
      </div>
    </div>
  );
}
