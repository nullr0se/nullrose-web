const HM_ST = {
  arrival: { bg: 'var(--st-arrival)', fg: '#fff', icon: 'log-in', label: 'Oczekiwany przyjazd' },
  inhouse: { bg: 'var(--st-inhouse)', fg: '#fff', icon: 'bed', label: 'Zameldowany' },
  departure: { bg: 'var(--st-departure)', fg: '#fff', icon: 'log-out', label: 'Wyjazd dziś' },
  out: { bg: 'var(--st-out-bg)', fg: 'var(--st-out-fg)', icon: 'check-check', label: 'Wymeldowany' },
  clean: { bg: 'var(--st-clean)', fg: '#fff', icon: 'sparkles', label: 'Czysty' },
  service: { bg: 'var(--st-service)', fg: 'var(--st-service-fg)', icon: 'spray-can', label: 'Serwis' },
  reno: { bg: 'var(--st-reno)', fg: '#fff', icon: 'hammer', label: 'Remont' },
  blocked: { bg: 'var(--st-blocked)', fg: '#fff', icon: 'ban', label: 'Zablokowany' }
};
function StateChip({ kind, children, style }) {
  const { Icon } = window.DesignSystem_2ac299;
  const c = HM_ST[kind];
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, minHeight: 26, padding: '2px 10px 2px 8px', borderRadius: 999, background: c.bg, color: c.fg, fontSize: 14, fontWeight: 600, lineHeight: 1.2, ...style }}><Icon name={c.icon} size={15} />{children || c.label}</span>;
}
window.HM_ST = HM_ST; window.StateChip = StateChip;
