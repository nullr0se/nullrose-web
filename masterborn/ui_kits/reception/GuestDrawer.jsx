function GuestDrawer({ match, q, onClose, onBooked }) {
  const { TextField, Button, StatusBadge, Icon } = window.DesignSystem_2ac299;
  const rm = match.room, n = q.to - q.from;
  const [g, setG] = React.useState({ first: '', last: '', phone: '', email: '', pay: 'Karta', inv: { on: false, nip: '', company: '' } });
  const withCheckIn = React.useRef(false);
  React.useEffect(() => {
    const k = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', k);
    const el = document.querySelector('#guestForm input'); el && el.focus();
    return () => document.removeEventListener('keydown', k);
  }, []);
  const submit = e => {
    e.preventDefault();
    const ci = withCheckIn.current && match.ready.now;
    HM.book(rm.id, q, g, ci);
    onBooked({ room: rm.id, name: g.first.trim() + ' ' + g.last.trim(), from: q.from, to: q.to, checkedIn: ci });
  };
  const sum = [['Pokój', rm.id + ', ' + rm.type + ', do ' + rm.cap + ' os.'], ['Osoby', q.guests], ['Termin', HM.fmt(q.from) + ' do ' + HM.fmt(q.to)], ['Doby', HM.doby(n)], ['Cena za dobę', HM.pln(rm.price)], ['Suma', HM.pln(match.total)]];
  const today = q.from === HM.TODAY;
  return (<>
    <div className="gd-bg" onMouseDown={onClose}></div>
    <aside className="gd" role="dialog" aria-modal="true" aria-label={'Nowa rezerwacja, pokój ' + rm.id}>
      <header className="gd-head">
        <h2 style={{ margin: 0, font: 'var(--text-page-title)', letterSpacing: 'var(--tracking-tight)' }}>Nowa rezerwacja: pokój {rm.id}</h2>
        <button type="button" aria-label="Zamknij" onClick={onClose} style={{ width: 36, height: 36, border: 0, background: 'none', borderRadius: 8, display: 'grid', placeItems: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}><Icon name="x" size={18} /></button>
      </header>
      <div className="gd-body">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '12px 16px', padding: 16, background: 'var(--surface-sunken)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', fontSize: 14 }}>
          {sum.map(([k, v]) => <div key={k} style={{ minWidth: 0 }}><div style={{ color: 'var(--text-muted)' }}>{k}</div><b style={{ fontWeight: 600, fontSize: k === 'Suma' ? 18 : 15 }}>{v}</b></div>)}
        </div>
        <div><StatusBadge tone={match.ready.tone} icon={match.ready.icon} style={{ whiteSpace: 'normal' }}>{match.ready.text}</StatusBadge></div>
        <form id="guestForm" onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 10 }}>
            <TextField label="Imię" required value={g.first} onChange={e => setG({ ...g, first: e.target.value })} />
            <TextField label="Nazwisko" required value={g.last} onChange={e => setG({ ...g, last: e.target.value })} />
          </div>
          <TextField label="Telefon" type="tel" required placeholder="+48 600 000 000" value={g.phone} onChange={e => setG({ ...g, phone: e.target.value })} />
          <TextField label="E-mail" type="email" optional value={g.email} onChange={e => setG({ ...g, email: e.target.value })} />
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ font: 'var(--text-label)', color: 'var(--text-secondary)' }}>Płatność</span>
            <select value={g.pay} onChange={e => setG({ ...g, pay: e.target.value })} style={{ height: 'var(--control-h)', padding: '0 10px', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)', font: 'inherit', background: 'var(--surface-card)', color: 'var(--text-body)' }}>{['Karta', 'Gotówka', 'Przelew'].map(p => <option key={p}>{p}</option>)}</select></label>
          <InvoiceFields idPrefix="walkin" value={g.inv} onChange={inv => setG({ ...g, inv })} />
        </form>
        {today && !match.ready.now && <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Meldunek będzie możliwy, gdy pokój będzie gotowy. Zrobisz go z terminarza, klikając pasek rezerwacji.</div>}
      </div>
      <footer className="gd-foot">
        <Button onClick={onClose}>Anuluj</Button>
        <Button type="submit" form="guestForm" variant={match.ready.now ? 'secondary' : 'primary'} icon={match.ready.now ? undefined : 'check'} onClick={() => { withCheckIn.current = false; }}>Zarezerwuj</Button>
        {match.ready.now && <Button type="submit" form="guestForm" variant="primary" icon="log-in" onClick={() => { withCheckIn.current = true; }}>Zarezerwuj i zamelduj</Button>}
      </footer>
    </aside>
  </>);
}
window.GuestDrawer = GuestDrawer;
