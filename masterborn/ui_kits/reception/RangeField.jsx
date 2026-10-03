function RangeField({ label, from, to, min, maxNights = 30, lockFrom, disabled, onChange }) {
  const { Icon } = window.DesignSystem_2ac299;
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState(null);
  const [hover, setHover] = React.useState(null);
  const [ym, setYm] = React.useState([2024, 11]);
  const [pos, setPos] = React.useState(null);
  const btn = React.useRef(null), pop = React.useRef(null);
  const vw = useViewportWidth(), two = vw >= 720;
  const monthOf = n => { const t = new Date(n * HM.DAY); return [t.getUTCFullYear(), t.getUTCMonth()]; };
  const place = React.useCallback(() => {
    if (!btn.current) return;
    const r = btn.current.getBoundingClientRect(), w = Math.min(two ? 612 : 316, window.innerWidth - 24);
    const left = Math.max(12, Math.min(r.left, window.innerWidth - w - 12));
    const h = pop.current ? pop.current.offsetHeight : 400;
    let top = r.bottom + 6; if (top + h > window.innerHeight - 8 && r.top - h - 6 > 8) top = r.top - h - 6;
    top = Math.max(8, Math.min(top, window.innerHeight - h - 8));
    setPos({ left, top, width: w });
  }, [two]);
  const close = () => { setOpen(false); setDraft(null); setHover(null); };
  React.useLayoutEffect(() => { if (open) place(); }, [open, place, ym]);
  React.useEffect(() => {
    if (!open) return;
    const down = e => { if (!(pop.current && pop.current.contains(e.target)) && !(btn.current && btn.current.contains(e.target))) close(); };
    const key = e => { if (e.key === 'Escape') { e.stopPropagation(); close(); } };
    const re = () => place();
    document.addEventListener('mousedown', down); window.addEventListener('keydown', key, true); window.addEventListener('resize', re); window.addEventListener('scroll', re, true);
    return () => { document.removeEventListener('mousedown', down); window.removeEventListener('keydown', key, true); window.removeEventListener('resize', re); window.removeEventListener('scroll', re, true); };
  }, [open, place]);
  const toggle = () => { if (open) return close(); setYm(monthOf(from)); setDraft(lockFrom ? from : null); setOpen(true); };
  const pick = n => {
    if (lockFrom) { if (n > from && n - from <= maxNights) { onChange({ from, to: n }); close(); } return; }
    if (draft === null || n <= draft) { setDraft(n); return; }
    if (n - draft > maxNights) return;
    onChange({ from: draft, to: n }); close();
  };
  const minN = min == null ? -Infinity : min;
  const a = draft !== null ? draft : from;
  const b = draft !== null ? (hover !== null && hover > draft ? hover : (lockFrom ? to : null)) : to;
  const shift = d => { let [y, m] = ym; m += d; if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; } setYm([y, m]); };
  const nav = { border: 0, background: 'none', width: 32, height: 32, borderRadius: 6, display: 'grid', placeItems: 'center', cursor: 'pointer', color: 'var(--text-body)' };
  const month = (y, m) => {
    const first = Date.UTC(y, m, 1) / HM.DAY, dim = new Date(Date.UTC(y, m + 1, 0)).getUTCDate(), off = (new Date(first * HM.DAY).getUTCDay() + 6) % 7;
    return (
      <div key={y + '-' + m} style={{ flex: '1 1 0', minWidth: 0 }}>
        <div style={{ textAlign: 'center', fontWeight: 600, height: 32, lineHeight: '32px', marginBottom: 6 }}>{HM.MONTHS[m]} {y}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', rowGap: 2, textAlign: 'center', fontSize: 14 }} onMouseLeave={() => setHover(null)}>
          {['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'].map(d => <div key={d} style={{ fontSize: 13, color: 'var(--text-muted)', padding: '4px 0' }}>{d}</div>)}
          {Array.from({ length: off }, (_, i) => <div key={'o' + i}></div>)}
          {Array.from({ length: dim }, (_, i) => {
            const n = first + i;
            const dis = lockFrom ? (n <= from || n - from > maxNights) : (n < minN || (draft !== null && n > draft && n - draft > maxNights));
            const end = n === a || n === b, mid = b !== null && n > a && n < b;
            const left = n === a && b !== null && b > a, right = n === b && b > a;
            return <button key={n} type="button" disabled={dis} onClick={() => pick(n)} onMouseEnter={() => setHover(n)}
              aria-label={HM.fmt(n)} aria-pressed={end}
              style={{ height: 38, border: 0, font: 'inherit', fontSize: 14, fontWeight: end ? 600 : 400, cursor: dis ? 'not-allowed' : 'pointer',
                borderRadius: end ? (left ? '8px 0 0 8px' : right ? '0 8px 8px 0' : 8) : 0,
                background: end ? 'var(--action-primary)' : mid ? 'var(--action-soft)' : 'none',
                color: end ? 'var(--text-on-accent)' : dis ? 'var(--text-disabled)' : 'var(--text-body)',
                boxShadow: n === HM.TODAY && !end ? 'inset 0 0 0 1px var(--action-primary)' : 'none' }}>{i + 1}</button>;
          })}
        </div>
      </div>
    );
  };
  const [y, m] = ym, y2 = m === 11 ? y + 1 : y, m2 = (m + 1) % 12;
  const hint = lockFrom ? 'Kliknij nową datę wyjazdu. Przyjazd jest zablokowany, bo gość jest zameldowany.' : draft === null ? 'Kliknij datę przyjazdu, potem datę wyjazdu.' : 'Teraz kliknij datę wyjazdu.';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
      {label && <span style={{ font: 'var(--text-label)', color: 'var(--text-secondary)' }}>{label}</span>}
      <button ref={btn} type="button" disabled={disabled} aria-haspopup="dialog" aria-expanded={open} onClick={toggle}
        style={{ display: 'flex', alignItems: 'center', gap: 10, height: 'var(--control-h)', padding: '0 12px 0 14px', border: '1px solid ' + (open ? 'var(--action-primary)' : 'var(--border-strong)'), borderRadius: 'var(--radius-md)', background: 'var(--surface-card)', font: 'inherit', fontWeight: 500, color: disabled ? 'var(--text-disabled)' : 'var(--text-body)', cursor: disabled ? 'not-allowed' : 'pointer', width: '100%', minWidth: 0, whiteSpace: 'nowrap' }}>
        <Icon name="calendar-range" />
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{HM.fmt(from)} do {HM.fmt(to)}</span>
        <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'var(--text-secondary)' }}><span style={{ padding: '2px 8px', borderRadius: 999, background: 'var(--surface-sunken)', border: '1px solid var(--border-default)' }}>{HM.doby(to - from)}</span><Icon name="chevron-down" /></span>
      </button>
      {open && ReactDOM.createPortal(
        <div ref={pop} role="dialog" aria-label="Wybierz termin pobytu" style={{ position: 'fixed', zIndex: 300, left: pos ? pos.left : -9999, top: pos ? pos.top : -9999, width: pos ? pos.width : 316, boxSizing: 'border-box', maxHeight: 'calc(100vh - 16px)', overflowY: 'auto', padding: 14, background: 'var(--surface-card)', color: 'var(--text-body)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-pop)', fontFamily: 'var(--font-sans)' }}>
          <div style={{ position: 'relative' }}>
            <button type="button" style={{ ...nav, position: 'absolute', left: 0, top: 0 }} aria-label="Poprzedni miesiąc" onClick={() => shift(-1)}><Icon name="chevron-left" /></button>
            <button type="button" style={{ ...nav, position: 'absolute', right: 0, top: 0 }} aria-label="Następny miesiąc" onClick={() => shift(1)}><Icon name="chevron-right" /></button>
            <div style={{ display: 'flex', gap: 24 }}>{month(y, m)}{two && month(y2, m2)}</div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '6px 16px', marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border-default)', fontSize: 14 }}>
            <span style={{ color: 'var(--text-secondary)' }}>{hint}</span>
            <b style={{ fontWeight: 600 }}>{HM.fmt(a)} do {b !== null ? HM.fmt(b) + ', ' + HM.doby(b - a) : '…'}</b>
          </div>
        </div>, document.body)}
    </div>
  );
}
window.RangeField = RangeField;
