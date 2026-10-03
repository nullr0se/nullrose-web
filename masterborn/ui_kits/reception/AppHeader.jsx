function AppHeader() {
  const { Button, ConfirmDialog, Icon } = window.DesignSystem_2ac299;
  const [ask, setAsk] = React.useState(false);
  const [theme, setTheme] = React.useState(HMTheme.get());
  const toggle = () => { const t = theme === 'dark' ? 'light' : 'dark'; HMTheme.set(t); setTheme(t); };
  const nav = ['Recepcja', 'Pokoje', 'Goście', 'Płatności', 'Raporty'];
  return (
    <header className="hm-head" style={{ display: 'flex', alignItems: 'center', gap: 28, minHeight: 'var(--header-h)', padding: '0 var(--page-pad)', background: 'var(--surface-card)', borderBottom: '1px solid var(--border-default)' }}>
      <div style={{ fontWeight: 700, fontSize: 17, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>HotelManager PRO</div>
      <nav className="hm-nav" style={{ display: 'flex', gap: 4 }} aria-label="Moduły">
        {nav.map((n, i) => <span key={n} aria-disabled={i > 0} title={i > 0 ? 'Moduł poza zakresem tego ekranu' : undefined} style={{ padding: '6px 12px', borderRadius: 6, fontWeight: 500, background: i === 0 ? 'var(--action-soft)' : 'none', color: i === 0 ? 'var(--status-info-fg)' : 'var(--text-disabled)' }}>{n}</span>)}
      </nav>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)' }}>
        <span className="hm-date" style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 4, whiteSpace: 'nowrap' }}><Icon name="calendar" />Sobota, 28.12.2024, 11:00</span>
        <Button size="sm" variant="ghost" icon={theme === 'dark' ? 'sun' : 'moon'} onClick={toggle} aria-pressed={theme === 'dark'}><span className="hm-btn-label">{theme === 'dark' ? 'Jasny' : 'Ciemny'}</span></Button>
        <Button size="sm" icon="rotate-ccw" onClick={() => setAsk(true)}><span className="hm-btn-label">Przywróć dane początkowe</span></Button>
      </div>
      <ConfirmDialog open={ask} title="Przywrócić dane początkowe?" confirmLabel="Przywróć dane" onCancel={() => setAsk(false)} onConfirm={() => { HM.reset(); setAsk(false); }}>
        Rezerwacje dodane i zmienione w tej sesji zostaną usunięte. Pokoje i rezerwacje wrócą do stanu z 28.12.2024, 11:00.
      </ConfirmDialog>
    </header>
  );
}
window.AppHeader = AppHeader;
