function Timeline({ result, q, selRoom, onPickRoom, onOpenRes }) {
  const { Icon, StatusBadge, Button } = window.DesignSystem_2ac299;
  const S = HM.TL_START, N = HM.TL_DAYS, active = !!result;
  const days = Array.from({ length: N }, (_, i) => S + i);
  const pct = x => (x / N * 100) + '%';
  const span = (a, b) => {
    const l = Math.max(a - S + 0.5, 0), r = Math.min(b - S + 0.5, N);
    if (r <= l) return null;
    const cl = a - S + 0.5 < 0, cr = b - S + 0.5 > N;
    return { left: 'calc(' + pct(l) + ' + ' + (cl ? 0 : 2) + 'px)', width: 'calc(' + pct(r - l) + ' - ' + ((cl ? 0 : 2) + (cr ? 0 : 2)) + 'px)', borderRadius: (cl ? '0' : '23px') + ' ' + (cr ? '0 0' : '23px 23px') + ' ' + (cl ? '0' : '23px') };
  };
  const band = active ? span(q.from, q.to) : null;
  const months = []; days.forEach(d => { const t = new Date(d * HM.DAY), lab = HM.MONTHS[t.getUTCMonth()] + ' ' + t.getUTCFullYear(); const last = months[months.length - 1]; last && last.lab === lab ? last.n++ : months.push({ lab, n: 1 }); });
  const dayCls = d => 'tl-day' + (HM.weekday(d) % 6 === 0 ? ' is-we' : '') + (d === HM.TODAY ? ' is-today' : '');
  const rows = active
    ? [...result.available.map(a => ({ rm: a.room, match: a })), ...result.unavailable.map(u => ({ rm: u.room, reasons: u.reasons }))]
    : HM.state.rooms.map(rm => ({ rm }));
  const legend = k => <StateChip key={k} kind={k} />;
  const Divider = ({ icon, children }) => <div className="tl-divider"><span><Icon name={icon} /><span>{children}</span></span></div>;
  const renderRow = ({ rm, match, reasons }) => {
    const st = HM.roomState(rm), dim = active && !match, sel = selRoom === rm.id;
    const res = HM.state.reservations.filter(r => r.room === rm.id);
    const bl = rm.block ? span(rm.block.from, rm.block.until) : null;
    const pickIt = match ? () => onPickRoom(rm.id) : undefined;
    return (
      <div key={rm.id} className={'tl-row' + (match ? ' is-match' : '') + (dim ? ' is-dim' : '') + (sel ? ' is-sel' : '')} onClick={pickIt}>
        <div className="tl-room">
          <div className="tl-room-top"><span className="tl-no">{rm.id}</span><StateChip kind={st.key}>{st.text}</StateChip></div>
          <div className="tl-sub">{rm.type}, do {rm.cap} os.</div>
          {match && <>
            <div className="tl-sub"><b style={{ fontWeight: 600, color: 'var(--text-body)' }}>{HM.pln(rm.price)}</b> za dobę</div>
            {match.best && <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: 'var(--status-info-fg)' }}><Icon name="star" />Najlepsze dopasowanie</div>}
            <StatusBadge tone={match.ready.tone} icon={match.ready.icon} style={{ whiteSpace: 'normal' }}>{match.ready.text}</StatusBadge>
          </>}
          {dim && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{reasons.filter(x => !((st.key === 'reno' || st.key === 'blocked') && (x.icon === 'hammer' || x.icon === 'ban'))).map((x, i) => <StatusBadge key={i} tone={x.tone} icon={x.icon} style={{ whiteSpace: 'normal' }}>{x.text}</StatusBadge>)}</div>}
          {st.key === 'service' && <Button size="sm" icon="sparkles" onClick={e => { e.stopPropagation(); HM.markClean(rm.id); }}>Oznacz jako czysty</Button>}
        </div>
        <div className="tl-lane">
          <div className="tl-days tl-bg">{days.map(d => <div key={d} className={dayCls(d)}></div>)}</div>
          {band && <div className="tl-band" style={{ left: band.left, width: band.width }}></div>}
          {bl && <div className="tl-bar tl-block" style={{ ...bl, background: HM_ST[rm.block.kind === 'remont' ? 'reno' : 'blocked'].bg, color: '#fff' }} title={(rm.block.kind === 'remont' ? 'Remont' : 'Blokada') + ' do ' + HM.fmt(rm.block.until) + ', ' + rm.block.note}>
            <Icon name={rm.block.kind === 'remont' ? 'hammer' : 'ban'} size={16} /><span className="tl-bar-t"><b>{rm.block.kind === 'remont' ? 'Remont' : 'Blokada'} do {HM.fmt(rm.block.until)}</b><span>{rm.block.note}</span></span>
          </div>}
          {res.map(r => {
            const sp = span(r.from, r.to); if (!sp) return null;
            const k = HM.resState(r), c = HM_ST[k], amt = HM.pln(HM.total(r));
            const label = r.first + ' ' + r.last + ', pokój ' + r.room + ', ' + HM.fmt(r.from) + ' do ' + HM.fmt(r.to) + ', ' + HM.doby(r.to - r.from) + ', ' + amt + '. ' + c.label + '.';
            return <button key={r.id} type="button" className={'tl-bar' + (r.id === HM.state.newId ? ' is-new' : '')} style={{ ...sp, background: c.bg, color: c.fg }} title={label + ' Kliknij, aby otworzyć rezerwację.'} aria-label={'Otwórz rezerwację: ' + label} onClick={e => { e.stopPropagation(); onOpenRes(r); }}>
              <Icon name={c.icon} size={16} /><span className="tl-bar-t"><b>{r.first} {r.last}</b><span>{amt}</span></span>
            </button>;
          })}
          {match && band && <button type="button" className={'tl-ghost' + (sel ? ' is-sel' : '')} style={{ left: band.left, width: band.width }} aria-label={'Wybierz pokój ' + rm.id + ', suma ' + HM.pln(match.total)} title={'Pokój ' + rm.id + ': ' + HM.pln(match.total) + ' za ' + HM.doby(q.to - q.from)} onClick={e => { e.stopPropagation(); onPickRoom(rm.id); }}>
            {q.to - q.from > 1
              ? <><Icon name={sel ? 'check' : 'plus'} size={16} /><span className="tl-bar-t"><b>{sel ? 'Wybrany' : 'Wybierz'}</b><span>{HM.pln(match.total)}</span></span></>
              : <span className="tl-bar-t" style={{ alignItems: 'center', width: '100%' }}><b>{match.total.toLocaleString('pl-PL').replace(/\u00a0/g, ' ')}</b><span>PLN</span></span>}
          </button>}
        </div>
      </div>
    );
  };
  return (
    <section aria-label="Terminarz" className="tl-card">
      <div className="tl-top">
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
          <h2 style={{ margin: 0, font: 'var(--text-page-title)', letterSpacing: 'var(--tracking-tight)' }}>Terminarz</h2>
          <span style={{ color: 'var(--text-muted)', fontSize: 14, whiteSpace: 'nowrap' }}>{HM.fmt(S)} do {HM.fmt(S + N - 1)}</span>
        </div>
        <div className="tl-legend" aria-label="Legenda">
          <span className="tl-legend-l">Rezerwacje</span>{['arrival', 'inhouse', 'departure', 'out'].map(legend)}
          <span className="tl-legend-l">Pokoje</span>{['clean', 'service', 'reno', 'blocked'].map(legend)}
        </div>
      </div>
      <div className="tl-scroll">
        <div className="tl-grid">
          <div className="tl-row tl-head">
            <div className="tl-room tl-corner">Pokój</div>
            <div>
              <div className="tl-months">{months.map(mo => <div key={mo.lab} style={{ gridColumn: 'span ' + mo.n }}>{mo.lab}</div>)}</div>
              <div className="tl-days">{days.map(d => {
                const inR = active && d >= q.from && d <= q.to;
                return <div key={d} className={dayCls(d) + (inR ? ' is-range' : '')} aria-label={HM.fmt(d)}><span>{d === HM.TODAY ? 'Dziś' : HM.WD[HM.weekday(d)]}</span><b>{new Date(d * HM.DAY).getUTCDate()}</b></div>;
              })}</div>
            </div>
          </div>
          {active && !band && <Divider icon="info">Wybrany termin wychodzi poza widoczny zakres terminarza ({HM.fmt(S)} do {HM.fmt(S + N - 1)}).</Divider>}
          {active && (result.available.length
            ? <Divider icon="circle-check">Wolne przez cały pobyt: {result.available.length}. Kliknij wiersz, aby wybrać pokój.</Divider>
            : <Divider icon="circle-alert">Brak pokoi wolnych przez cały pobyt.</Divider>)}
          {rows.filter(r => !active || r.match).map(renderRow)}
          {active && result.unavailable.length > 0 && <Divider icon="ban">Niedostępne w tym terminie: {result.unavailable.length}</Divider>}
          {active && rows.filter(r => !r.match).map(renderRow)}
        </div>
      </div>
    </section>
  );
}
window.Timeline = Timeline;
