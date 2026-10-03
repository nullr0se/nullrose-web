function WalkInPanel({ q, onQ, active, result, done, onActivate, onClear }) {
  const { Stepper, Button, Icon } = window.DesignSystem_2ac299;
  const count = result ? result.available.length : 0;
  const heading = active ? 'Wolne pokoje: ' + HM.fmt(q.from) + ' do ' + HM.fmt(q.to) + ', ' + q.guests + ' os.' : 'Szukaj wolnego pokoju';
  const verb = count === 1 ? 'pasuje' : HM.few(count) ? 'pasują' : 'pasuje';
  const sub = !active ? 'Podaj termin i liczbę osób. Pasujące pokoje podświetlą się na terminarzu.'
    : count ? count + ' ' + HM.roomsWord(count) + ' ' + verb + (count > 1 ? ', najlepsze dopasowanie na górze terminarza' : '') + '. Kliknij podświetlony pokój, aby wpisać dane gościa.'
    : 'Brak pokoi wolnych przez cały pobyt. Powody widać przy numerach pokoi. Zmień termin lub liczbę osób.';
  return (
    <section aria-label="Wyszukiwanie wolnych pokoi" className="wk-card">
      <div className="wk-fields">
        <div className="wk-range"><RangeField label="Przyjazd i wyjazd" from={q.from} to={q.to} min={HM.TODAY} onChange={v => onQ(v)} /></div>
        <div className="wk-guests"><Stepper label="Liczba osób" value={q.guests} min={1} max={6} onChange={v => onQ({ guests: v })} /></div>
      </div>
      <div className="wk-sum">
        <h2 style={{ margin: 0, font: 'var(--text-page-title)', letterSpacing: 'var(--tracking-tight)' }}>{heading}</h2>
        <div style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 4, textWrap: 'pretty' }}>{sub}</div>
      </div>
      <div className="wk-act">{active
        ? <Button variant="ghost" icon="x" onClick={onClear}>Wyczyść wyszukiwanie</Button>
        : <Button variant="primary" icon="search" onClick={onActivate}>Pokaż wolne pokoje</Button>}</div>
      {done && (
        <div role="status" className="wk-done" style={{ display: 'flex', gap: 10, padding: '12px 14px', borderRadius: 'var(--radius-md)', background: 'var(--status-ok-bg)', color: 'var(--status-ok-fg)', fontSize: 14 }}>
          <Icon name="circle-check" size={18} />
          <div><b style={{ fontWeight: 600 }}>Zarezerwowano pokój {done.room}{done.checkedIn ? ', gość zameldowany' : ''}.</b> {done.name}, {HM.fmt(done.from)} do {HM.fmt(done.to)}. Nowa rezerwacja jest obwiedziona na terminarzu.</div>
        </div>
      )}
    </section>
  );
}
window.WalkInPanel = WalkInPanel;
