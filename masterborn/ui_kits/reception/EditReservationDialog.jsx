function EditReservationDialog({ res, onClose }) {
  const { Dialog, ConfirmDialog, TextField, Button, Stepper, StatusBadge, Icon } = window.DesignSystem_2ac299;
  const [f, setF] = React.useState({ first: res.first, last: res.last, phone: res.phone, email: res.email || '', pay: res.pay, note: res.note || '', inv: res.invoice ? { on: true, ...res.invoice } : { on: false, nip: '', company: '' } });
  const [t, setT] = React.useState({ from: res.from, to: res.to, guests: res.guests });
  const [askDel, setAskDel] = React.useState(false);
  const set = k => e => setF({ ...f, [k]: e.target.value });
  const rm = HM.room(res.room), k = HM.resState(res);
  const changed = t.from !== res.from || t.to !== res.to || t.guests !== res.guests;
  const issues = changed ? HM.conflicts(res.room, t.from, t.to, t.guests, res.id) : [];
  const blocked = issues.length > 0;
  const dateIssue = issues.some(x => x.res || x.icon === 'hammer' || x.icon === 'ban');
  const capIssue = issues.some(x => x.icon === 'users');
  const headline = 'Nie można zapisać: pokój ' + rm.id + ' ' + [dateIssue && 'nie jest wolny w tym terminie', capIssue && 'nie mieści ' + t.guests + ' os.'].filter(Boolean).join(' i ') + (capIssue ? '' : '.');
  const save = e => { e.preventDefault(); if (blocked) return; const { inv, ...rest } = f; HM.update(res.id, { ...rest, invoice: inv.on ? { nip: inv.nip, company: inv.company.trim() } : null, from: t.from, to: t.to, guests: t.guests }); onClose(); };
  const ci = HM.canCheckIn(res), co = HM.canCheckOut(res);
  const label = { font: 'var(--text-label)', color: 'var(--text-secondary)' };
  const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 190px), 1fr))', gap: 12 };
  let meldText, meldAct = null;
  if (k === 'out') meldText = 'Gość wymeldowany. Pokój ' + rm.id + ': ' + HM.roomState(rm).text.toLowerCase() + '.';
  else if (co) { meldText = 'Wyjazd dziś. Po wymeldowaniu pokój przejdzie w serwis.'; meldAct = <Button variant="primary" icon="log-out" onClick={() => HM.checkOut(res.id)}>Wymelduj</Button>; }
  else if (ci.show) {
    meldText = ci.blocker || 'Przyjazd dziś. Pokój jest gotowy.';
    meldAct = <>{ci.blocker && rm.hk === 'service' && <Button size="sm" icon="sparkles" onClick={() => HM.markClean(rm.id)}>Oznacz pokój jako czysty</Button>}<Button variant="primary" icon="log-in" disabled={!!ci.blocker} onClick={() => HM.checkIn(res.id)}>Zamelduj</Button></>;
  }
  else if (k === 'inhouse') meldText = 'Gość zameldowany. Wyjazd ' + HM.fmt(res.to) + '.';
  else meldText = 'Przyjazd ' + HM.fmt(res.from) + '. Meldunek będzie dostępny w dniu przyjazdu.';
  return (<>
    <Dialog open title={'Rezerwacja: ' + res.first + ' ' + res.last + ', pokój ' + res.room} onClose={onClose} width={640}
      footer={<><Button variant="danger-quiet" icon="trash-2" onClick={() => setAskDel(true)} style={{ marginRight: 'auto' }}>Usuń rezerwację</Button><Button onClick={onClose}>Anuluj</Button><Button variant="primary" icon="check" type="submit" form="editRes" disabled={blocked}>Zapisz zmiany</Button></>}>
      <div role="status" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, padding: 14, marginBottom: 18, background: 'var(--surface-sunken)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)' }}>
        <StateChip kind={k} />
        <span style={{ flex: '1 1 200px', fontSize: 14, color: 'var(--text-secondary)' }}>{meldText}</span>
        {meldAct && <span style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{meldAct}</span>}
      </div>
      <form id="editRes" onSubmit={save} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ font: 'var(--text-section)' }}>Pobyt</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 170px), 1fr))', gap: 12 }}>
          <div style={{ gridColumn: 'span 2', minWidth: 0 }} className="ed-range"><RangeField label={res.checkedIn ? 'Pobyt (zmiana daty wyjazdu)' : 'Przyjazd i wyjazd'} from={t.from} to={t.to} min={Math.min(res.from, HM.TODAY)} lockFrom={res.checkedIn} disabled={res.checkedOut} onChange={v => setT({ ...t, ...v })} /></div>
          <Stepper label="Liczba osób" value={t.guests} min={1} max={6} onChange={v => setT({ ...t, guests: v })} />
        </div>
        <div style={{ ...grid, gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))', padding: '10px 14px', background: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', fontSize: 14 }}>
          <div><div style={{ color: 'var(--text-muted)' }}>Pokój</div><b style={{ fontWeight: 600 }}>{rm.id}, {rm.type}, do {rm.cap} os.</b></div>
          <div><div style={{ color: 'var(--text-muted)' }}>Doby</div><b style={{ fontWeight: 600 }}>{HM.doby(t.to - t.from)}, {HM.pln(rm.price)} za dobę</b></div>
          <div><div style={{ color: 'var(--text-muted)' }}>Suma</div><b style={{ fontWeight: 600 }}>{HM.pln(rm.price * (t.to - t.from))}</b></div>
        </div>
        {blocked ? (
          <div role="alert" style={{ display: 'flex', gap: 10, padding: 14, borderRadius: 'var(--radius-md)', background: 'var(--status-busy-bg)', color: 'var(--status-busy-fg)', fontSize: 14 }}>
            <Icon name="circle-alert" size={18} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <b style={{ fontWeight: 600 }}>{headline}</b>
              {issues.map((x, i) => <div key={i}>{x.res ? <>Koliduje z rezerwacją: <b style={{ fontWeight: 600 }}>{x.res.first} {x.res.last}</b>, {HM.fmt(x.res.from)} do {HM.fmt(x.res.to)}.</> : x.text.replace(/\.?$/, '.')}</div>)}
              <div style={{ color: 'var(--text-secondary)' }}>Zmień termin albo usuń rezerwację i dodaj nową w innym pokoju.</div>
            </div>
          </div>
        ) : changed ? <div><StatusBadge tone="ok" icon="circle-check">Pokój {rm.id} wolny w nowym terminie</StatusBadge></div> : null}
        <div style={{ font: 'var(--text-section)', marginTop: 4 }}>Gość</div>
        <div style={grid}><TextField label="Imię" required value={f.first} onChange={set('first')} /><TextField label="Nazwisko" required value={f.last} onChange={set('last')} /></div>
        <div style={grid}><TextField label="Telefon" required value={f.phone} onChange={set('phone')} /><TextField label="E-mail" optional type="email" value={f.email} onChange={set('email')} /></div>
        <div style={grid}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><span style={label}>Płatność</span>
            <select value={f.pay} onChange={set('pay')} style={{ height: 'var(--control-h)', padding: '0 10px', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)', font: 'inherit', background: 'var(--surface-card)', color: 'var(--text-body)' }}>{['Karta', 'Gotówka', 'Przelew', 'Do ustalenia'].map(p => <option key={p}>{p}</option>)}</select></label>
          <TextField label="Uwagi" optional value={f.note} onChange={set('note')} />
        </div>
        <InvoiceFields idPrefix="edit" value={f.inv} onChange={inv => setF({ ...f, inv })} />
        <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>Zmiana pokoju jest niedostępna w edycji. Aby przenieść gościa, usuń rezerwację i dodaj nową w innym pokoju.</div>
      </form>
    </Dialog>
    <ConfirmDialog open={askDel} danger title="Usunąć rezerwację?" confirmLabel="Usuń rezerwację" onCancel={() => setAskDel(false)} onConfirm={() => { HM.remove(res.id); setAskDel(false); onClose(); }}>
      {res.first} {res.last}, pokój {res.room}, {HM.fmt(res.from)} do {HM.fmt(res.to)}. Pokój wróci do puli dostępnych. Tej operacji nie można cofnąć.
    </ConfirmDialog>
  </>);
}
window.EditReservationDialog = EditReservationDialog;
