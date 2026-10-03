function OwnerStrip() {
  const { Icon } = window.DesignSystem_2ac299;
  const s = HM.stats();
  const Item = ({ icon, children }) => <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px 8px', minWidth: 0 }}><Icon name={icon} />{children}</div>;
  const B = ({ children }) => <b style={{ color: 'var(--text-body)', fontWeight: 600 }}>{children}</b>;
  return (
    <div role="region" aria-label="Podsumowanie dnia" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', columnGap: 32, rowGap: 6, minHeight: 'var(--strip-h)', padding: '8px var(--page-pad)', boxSizing: 'border-box', background: 'var(--surface-strip)', borderBottom: '1px solid var(--border-default)', fontSize: 14, color: 'var(--text-secondary)' }}>
      <Item icon="bed-double">Obłożenie dziś <B>{s.occupied} z {s.active}</B> dostępnych pokoi
        <span aria-hidden="true" style={{ display: 'flex', gap: 2 }}>{Array.from({ length: s.active }, (_, i) => <i key={i} style={{ width: 10, height: 14, borderRadius: 2, background: i < s.occupied ? 'var(--ink-700)' : 'var(--surface-card)', border: '1px solid ' + (i < s.occupied ? 'var(--ink-700)' : 'var(--border-strong)') }}></i>)}</span>
      </Item>
      <Item icon="log-in">Przyjazdy dziś <B>{s.arrivals}</B></Item>
      <Item icon="log-out">Wyjazdy dziś <B>{s.departures}</B></Item>
      <Item icon="spray-can">Serwisy <B>{s.service}</B></Item>
      <Item icon="wrench">Wyłączone <B>{s.off}</B></Item>
    </div>
  );
}
window.OwnerStrip = OwnerStrip;
