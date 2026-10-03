(() => {
const DAY = 864e5;
const D = (y, m, d) => Date.UTC(y, m - 1, d) / DAY;
const TODAY = D(2024, 12, 28);
const pad = n => String(n).padStart(2, '0');
const fmt = n => { const t = new Date(n * DAY); return pad(t.getUTCDate()) + '.' + pad(t.getUTCMonth() + 1) + '.' + t.getUTCFullYear(); };
const pln = n => n.toLocaleString('pl-PL').replace(/\u00a0/g, ' ') + ' PLN';
const nightsWord = n => n === 1 ? 'noc' : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) ? 'noce' : 'nocy';
const SEED = {
  rooms: [
    { id: '101', floor: 1, cap: 1, type: 'Jednoosobowy', price: 180, hk: 'clean' },
    { id: '102', floor: 1, cap: 2, type: 'Dwuosobowy', price: 250, hk: 'clean' },
    { id: '103', floor: 1, cap: 3, type: 'Trzyosobowy', price: 280, hk: 'dirty' },
    { id: '104', floor: 1, cap: 1, type: 'Jednoosobowy', price: 180, hk: 'clean' },
    { id: '105', floor: 1, cap: 2, type: 'Studio', price: 350, hk: 'clean', outUntil: D(2024, 12, 30), outNote: 'wymiana kranu' },
    { id: '201', floor: 2, cap: 2, type: 'Dwuosobowy', price: 250, hk: 'clean' },
    { id: '202', floor: 2, cap: 1, type: 'Jednoosobowy', price: 180, hk: 'clean' },
    { id: '203', floor: 2, cap: 4, type: 'Rodzinny', price: 320, hk: 'clean' }
  ],
  reservations: [
    { id: 'r1', guest: 'Jan Kowalski', phone: '+48 501 234 567', room: '102', from: D(2024, 12, 28), to: D(2025, 1, 2), guests: 2, pay: 'Karta', note: 'Śniadanie 7:30, parking A5' },
    { id: 'r2', guest: 'Anna Nowak', phone: '+48 601 234 567', room: '103', from: D(2024, 12, 26), to: D(2024, 12, 28), guests: 2, pay: 'Gotówka', note: 'Wyjazd do 14:00' },
    { id: 'r3', guest: 'Maria Wiśniewska', phone: '+48 791 234 567', room: '104', from: D(2024, 12, 27), to: D(2024, 12, 30), guests: 1, pay: 'Faktura', note: 'FV na ABC Sp. z o.o.' },
    { id: 'r4', guest: 'Piotr Zieliński', phone: '+44 7123 456 789', room: '201', from: D(2024, 12, 25), to: D(2025, 1, 3), guests: 2, pay: 'Przelew', note: 'VIP, późny checkout' },
    { id: 'r5', guest: 'Rodzina Schmidt', phone: '+49 123 456 7890', room: '203', from: D(2024, 12, 27), to: D(2024, 12, 29), guests: 4, pay: 'Karta', note: '2 dzieci, łóżeczko' },
    { id: 'r6', guest: 'Tomasz Lewandowski', phone: '+48 502 111 222', room: '101', from: D(2024, 12, 29), to: D(2025, 1, 1), guests: 1, pay: 'Karta', note: '' }
  ]
};
const state = { rooms: [], reservations: [], newId: null };
const listeners = [];
function reset() { const s = JSON.parse(JSON.stringify(SEED)); state.rooms = s.rooms; state.reservations = s.reservations; state.newId = null; emit(); }
function emit() { listeners.forEach(f => f()); }
function onChange(f) { listeners.push(f); }

function search(q) {
  const end = q.from + q.nights, available = [], unavailable = [];
  for (const room of state.rooms) {
    const reasons = [];
    if (room.outUntil && room.outUntil > q.from) reasons.push({ k: 'off', icon: 'wrench', t: 'Wyłączony do ' + fmt(room.outUntil) + ' (' + room.outNote + ')' });
    state.reservations.filter(r => r.room === room.id && r.from < end && r.to > q.from).sort((a, b) => a.from - b.from).forEach(r => {
      reasons.push(r.from <= q.from ? { k: 'busy', icon: 'lock', t: 'Zajęty do ' + fmt(r.to) } : { k: 'warn', icon: 'calendar-clock', t: 'Wolny tylko do ' + fmt(r.from) });
    });
    if (room.cap < q.guests) reasons.push({ k: 'off', icon: 'users', t: 'Za mały, maks. ' + room.cap + ' os.' });
    if (reasons.length) { unavailable.push({ room, reasons }); continue; }
    const later = q.from === TODAY && room.hk === 'dirty';
    const ready = later ? { k: 'warn', icon: 'clock-3', t: 'Gotowy od ok. 14:00' } : q.from === TODAY ? { k: 'ok', icon: 'circle-check', t: 'Posprzątany, gotowy' } : { k: 'ok', icon: 'circle-check', t: 'Gotowy na przyjazd' };
    available.push({ room, ready, total: room.price * q.nights, score: (room.cap - q.guests) * 10 + (later ? 5 : 0) + room.price / 1000 });
  }
  available.sort((a, b) => a.score - b.score);
  if (available[0]) available[0].best = true;
  return { available, unavailable, end };
}
function stats() {
  const active = state.rooms.filter(r => !(r.outUntil && r.outUntil > TODAY));
  const occ = new Set(state.reservations.filter(r => r.from <= TODAY && r.to > TODAY).map(r => r.room));
  return {
    active: active.length, occupied: active.filter(r => occ.has(r.id)).length,
    arrivals: state.reservations.filter(r => r.from === TODAY).length,
    departures: state.reservations.filter(r => r.to === TODAY).length,
    dirty: state.rooms.filter(r => r.hk === 'dirty').length,
    off: state.rooms.length - active.length
  };
}
function book(roomId, q, g) {
  const id = 'r' + Date.now();
  state.reservations.push({ id, guest: (g.first + ' ' + g.last).trim(), phone: g.phone, email: g.email, room: roomId, from: q.from, to: q.from + q.nights, guests: q.guests, pay: 'Do ustalenia', note: 'Walk-in' });
  state.newId = id; emit();
}
function remove(id) { state.reservations = state.reservations.filter(r => r.id !== id); emit(); }

function header(el) {
  el.innerHTML = `<div class="brand">HotelManager PRO</div>
  <nav class="nav"><span class="on">Recepcja</span><span>Pokoje</span><span>Goście</span><span>Płatności</span><span>Raporty</span></nav>
  <div class="head-right"><span><i data-lucide="calendar"></i></span><span>Sobota, 28.12.2024, 11:00</span>
  <button class="btn sm" data-reset><i data-lucide="rotate-ccw"></i>Przywróć dane początkowe</button></div>`;
  el.querySelector('[data-reset]').onclick = () => { if (confirm('Przywrócić dane początkowe? Nowe rezerwacje zostaną usunięte.')) reset(); };
}
function owner(el) {
  const s = stats();
  const bar = Array.from({ length: s.active }, (_, i) => `<i class="${i < s.occupied ? 'f' : ''}"></i>`).join('');
  el.innerHTML = `<div class="item"><i data-lucide="bed-double"></i>Obłożenie dziś <b>${s.occupied} z ${s.active}</b> dostępnych pokoi <span class="occ-bar" aria-hidden="true">${bar}</span></div>
  <div class="item"><i data-lucide="log-in"></i>Przyjazdy dziś <b>${s.arrivals}</b></div>
  <div class="item"><i data-lucide="log-out"></i>Wyjazdy dziś <b>${s.departures}</b></div>
  <div class="item"><i data-lucide="spray-can"></i>Do sprzątania <b>${s.dirty}</b></div>
  <div class="item"><i data-lucide="wrench"></i>Wyłączone <b>${s.off}</b></div>`;
}
function resStatus(r) {
  if (r.from === TODAY) return `<span class="status info"><i data-lucide="log-in"></i>Przyjazd dziś</span>`;
  if (r.to === TODAY) return `<span class="status warn"><i data-lucide="log-out"></i>Wyjazd dziś</span>`;
  if (r.from < TODAY) return `<span class="status ok"><i data-lucide="bed"></i>W trakcie pobytu</span>`;
  return `<span class="status off"><i data-lucide="calendar"></i>Przyjazd ${fmt(r.from)}</span>`;
}
function reservations(el) {
  const rows = state.reservations.filter(r => r.to >= TODAY).sort((a, b) => (b.id === state.newId) - (a.id === state.newId) || a.from - b.from);
  const price = id => state.rooms.find(x => x.id === id).price;
  el.innerHTML = `<div style="display:flex;align-items:baseline;justify-content:space-between;padding:20px 20px 14px"><h2 class="h2">Rezerwacje na dziś i najbliższe dni</h2><span class="muted">${rows.length} rezerwacji</span></div>
  <table class="res"><thead><tr><th>Gość</th><th>Pokój</th><th>Status</th><th>Termin</th><th>Osoby</th><th>Suma</th><th>Płatność</th><th>Uwagi</th><th style="text-align:right">Akcje</th></tr></thead><tbody>
  ${rows.map(r => `<tr class="${r.id === state.newId ? 'new' : ''}"><td><b style="font-weight:600">${r.guest}</b><div class="muted">${r.phone || ''}</div></td><td>${r.room}</td><td>${resStatus(r)}</td>
  <td>${fmt(r.from)} do ${fmt(r.to)}<div class="muted">${r.to - r.from} ${nightsWord(r.to - r.from)}</div></td><td>${r.guests}</td><td class="price">${pln(price(r.room) * (r.to - r.from))}</td><td>${r.pay}</td><td class="muted">${r.note || ''}</td>
  <td style="text-align:right;white-space:nowrap"><button class="btn sm"><i data-lucide="pencil"></i>Edytuj</button><span style="display:inline-block;width:16px"></span><button class="btn sm danger-text" data-del="${r.id}"><i data-lucide="trash-2"></i>Usuń</button></td></tr>`).join('')}
  </tbody></table>`;
  el.querySelectorAll('[data-del]').forEach(b => b.onclick = () => { const r = state.reservations.find(x => x.id === b.dataset.del); if (confirm('Usunąć rezerwację: ' + r.guest + ', pokój ' + r.room + '? Tej operacji nie można cofnąć.')) remove(r.id); });
}
let calEl = null;
function calendar(anchor, value, onPick) {
  if (calEl) { calEl.remove(); calEl = null; return; }
  let t = new Date(value * DAY), y = t.getUTCFullYear(), m = t.getUTCMonth();
  const months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
  calEl = document.createElement('div'); calEl.className = 'cal';
  const r = anchor.getBoundingClientRect();
  calEl.style.left = (r.left + scrollX) + 'px'; calEl.style.top = (r.bottom + scrollY + 6) + 'px';
  const draw = () => {
    const first = Date.UTC(y, m, 1) / DAY, dim = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
    const off = (new Date(first * DAY).getUTCDay() + 6) % 7;
    let cells = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'].map(d => `<div class="dow">${d}</div>`).join('') + '<div></div>'.repeat(off);
    for (let d = 1; d <= dim; d++) { const n = first + d - 1; cells += `<button data-d="${n}" class="${n === value ? 'sel' : ''} ${n === TODAY ? 'today' : ''}" ${n < TODAY ? 'disabled' : ''}>${d}</button>`; }
    calEl.innerHTML = `<div class="cal-head"><button data-p aria-label="Poprzedni miesiąc"><i data-lucide="chevron-left"></i></button>${months[m]} ${y}<button data-n aria-label="Następny miesiąc"><i data-lucide="chevron-right"></i></button></div><div class="cal-grid">${cells}</div>`;
    lucide.createIcons();
  };
  calEl.onclick = e => {
    e.stopPropagation();
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.p !== undefined) { m--; if (m < 0) { m = 11; y--; } draw(); }
    else if (b.dataset.n !== undefined) { m++; if (m > 11) { m = 0; y++; } draw(); }
    else if (b.dataset.d) { onPick(+b.dataset.d); calEl.remove(); calEl = null; }
  };
  draw(); document.body.appendChild(calEl);
  setTimeout(() => document.addEventListener('click', function h() { if (calEl) { calEl.remove(); calEl = null; } document.removeEventListener('click', h); }), 0);
}
window.WI = { TODAY, fmt, pln, nightsWord, state, reset, onChange, search, stats, book, header, owner, reservations, calendar };
})();
