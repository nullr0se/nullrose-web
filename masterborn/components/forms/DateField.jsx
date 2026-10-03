import React from 'react';
import { Icon } from '../core/Icon.jsx';
const DAY = 864e5;
const toN = iso => { const [y, m, d] = iso.split('-').map(Number); return Date.UTC(y, m - 1, d) / DAY; };
const toISO = n => new Date(n * DAY).toISOString().slice(0, 10);
const pad = n => String(n).padStart(2, '0');
export const formatDate = iso => { const [y, m, d] = iso.split('-'); return d + '.' + m + '.' + y; };
const MONTHS = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
export function DateField({ label, value, min, today, onChange, style }) {
  const [open, setOpen] = React.useState(false);
  const v = toN(value), t = new Date(v * DAY);
  const [ym, setYm] = React.useState([t.getUTCFullYear(), t.getUTCMonth()]);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const k = e => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', h); document.addEventListener('keydown', k);
    return () => { document.removeEventListener('mousedown', h); document.removeEventListener('keydown', k); };
  }, [open]);
  const [y, m] = ym;
  const first = Date.UTC(y, m, 1) / DAY, dim = new Date(Date.UTC(y, m + 1, 0)).getUTCDate(), off = (new Date(first * DAY).getUTCDay() + 6) % 7;
  const minN = min ? toN(min) : -Infinity, todayN = today ? toN(today) : null;
  const shift = d => { let mm = m + d, yy = y; if (mm < 0) { mm = 11; yy--; } if (mm > 11) { mm = 0; yy++; } setYm([yy, mm]); };
  const nav = { border: 0, background: 'none', width: 32, height: 32, borderRadius: 6, display: 'grid', placeItems: 'center', cursor: 'pointer', color: 'var(--text-body)' };
  return (
    <div ref={ref} style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && <span style={{ font: 'var(--text-label)', color: 'var(--text-secondary)' }}>{label}</span>}
      <button type="button" aria-haspopup="dialog" aria-expanded={open} onClick={() => { setYm([t.getUTCFullYear(), t.getUTCMonth()]); setOpen(o => !o); }}
        style={{ display: 'flex', alignItems: 'center', gap: 10, height: 'var(--control-h)', padding: '0 14px', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)', background: 'var(--surface-card)', font: 'inherit', fontWeight: 500, color: 'var(--text-body)', cursor: 'pointer', width: '100%' }}>
        <Icon name="calendar" />{formatDate(value)}<span style={{ marginLeft: 'auto', color: 'var(--text-muted)', display: 'flex' }}><Icon name="chevron-down" /></span>
      </button>
      {open && (
        <div role="dialog" aria-label="Wybierz datę" style={{ position: 'absolute', top: '100%', left: 0, marginTop: 6, zIndex: 50, width: 300, padding: 14, background: 'var(--surface-card)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-pop)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, fontWeight: 600 }}>
            <button type="button" style={nav} aria-label="Poprzedni miesiąc" onClick={() => shift(-1)}><Icon name="chevron-left" /></button>
            {MONTHS[m]} {y}
            <button type="button" style={nav} aria-label="Następny miesiąc" onClick={() => shift(1)}><Icon name="chevron-right" /></button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2, textAlign: 'center', fontSize: 14 }}>
            {['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'].map(d => <div key={d} style={{ fontSize: 13, color: 'var(--text-muted)', padding: '4px 0' }}>{d}</div>)}
            {Array.from({ length: off }, (_, i) => <div key={'o' + i}></div>)}
            {Array.from({ length: dim }, (_, i) => {
              const n = first + i, sel = n === v, dis = n < minN;
              return <button key={n} type="button" disabled={dis} onClick={() => { onChange && onChange(toISO(n)); setOpen(false); }}
                style={{ height: 36, border: 0, borderRadius: 6, font: 'inherit', fontSize: 14, cursor: dis ? 'not-allowed' : 'pointer', background: sel ? 'var(--action-primary)' : 'none', color: sel ? '#fff' : dis ? 'var(--text-disabled)' : 'var(--text-body)', boxShadow: n === todayN && !sel ? 'inset 0 0 0 1px var(--action-primary)' : 'none' }}>{i + 1}</button>;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
