(() => {
const DAY = 864e5;
const D = (y, m, d) => Date.UTC(y, m - 1, d) / DAY;
const TODAY = D(2024, 12, 28);
const TL_START = D(2024, 12, 24), TL_DAYS = 14;
const pad = n => String(n).padStart(2, '0');
const fmt = n => { const t = new Date(n * DAY); return pad(t.getUTCDate()) + '.' + pad(t.getUTCMonth() + 1) + '.' + t.getUTCFullYear(); };
const toISO = n => new Date(n * DAY).toISOString().slice(0, 10);
const fromISO = s => { const [y, m, d] = s.split('-').map(Number); return D(y, m, d); };
const pln = n => n.toLocaleString('pl-PL').replace(/\u00a0/g, ' ') + ' PLN';
const few = n => n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20);
const dobaWord = n => n === 1 ? 'doba' : few(n) ? 'doby' : 'dób';
const doby = n => n + ' ' + dobaWord(n);
const roomsWord = n => n === 1 ? 'pokój' : few(n) ? 'pokoje' : 'pokoi';
const WD = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb'];
const MONTHS = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
const weekday = n => new Date(n * DAY).getUTCDay();
const SEED = {
  rooms: [
    { id: '101', floor: 1, cap: 1, type: 'Jednoosobowy', price: 180, hk: 'clean' },
    { id: '102', floor: 1, cap: 2, type: 'Dwuosobowy', price: 250, hk: 'clean' },
    { id: '103', floor: 1, cap: 3, type: 'Trzyosobowy', price: 280, hk: 'clean' },
    { id: '104', floor: 1, cap: 1, type: 'Jednoosobowy', price: 180, hk: 'clean' },
    { id: '105', floor: 1, cap: 2, type: 'Studio', price: 350, hk: 'clean', block: { kind: 'remont', from: D(2024, 12, 20), until: D(2024, 12, 30), note: 'wymiana kranu' } },
    { id: '201', floor: 2, cap: 2, type: 'Dwuosobowy', price: 250, hk: 'clean' },
    { id: '202', floor: 2, cap: 1, type: 'Jednoosobowy', price: 180, hk: 'clean' },
    { id: '203', floor: 2, cap: 4, type: 'Rodzinny', price: 320, hk: 'clean' }
  ],
  reservations: [
    { id: 'r1', first: 'Jan', last: 'Kowalski', phone: '+48 501 234 567', email: 'j.kowalski@example.com', room: '102', from: D(2024, 12, 28), to: D(2025, 1, 2), guests: 2, pay: 'Karta', note: 'Śniadanie 7:30, parking A5', checkedIn: false },
    { id: 'r2', first: 'Anna', last: 'Nowak', phone: '+48 601 234 567', email: 'a.nowak@gmail.com', room: '103', from: D(2024, 12, 26), to: D(2024, 12, 28), guests: 2, pay: 'Gotówka', note: 'Wyjazd do 14:00', checkedIn: true },
    { id: 'r3', first: 'Maria', last: 'Wiśniewska', phone: '+48 791 234 567', email: 'maria.w@company.pl', room: '104', from: D(2024, 12, 27), to: D(2024, 12, 30), guests: 1, pay: 'Przelew', note: '', invoice: { nip: '1234563218', company: 'ABC Sp. z o.o.' }, checkedIn: true },
    { id: 'r4', first: 'Piotr', last: 'Zieliński', phone: '+44 7123 456 789', email: 'piotr.z@email.co.uk', room: '201', from: D(2024, 12, 25), to: D(2025, 1, 3), guests: 2, pay: 'Przelew', note: 'VIP, późny checkout', checkedIn: true },
    { id: 'r5', first: 'Rodzina', last: 'Schmidt', phone: '+49 123 456 7890', email: 'schmidt@deutsche.de', room: '203', from: D(2024, 12, 27), to: D(2024, 12, 29), guests: 4, pay: 'Karta', note: '2 dzieci, łóżeczko', checkedIn: true },
    { id: 'r6', first: 'Tomasz', last: 'Lewandowski', phone: '+48 502 111 222', email: '', room: '101', from: D(2024, 12, 29), to: D(2025, 1, 1), guests: 1, pay: 'Karta', note: '', checkedIn: false }
  ]
};
const state = { rooms: [], reservations: [], newId: null, v: 0 };
const subs = new Set();
const emit = () => { state.v++; subs.forEach(f => f(state.v)); };
function reset() { const s = JSON.parse(JSON.stringify(SEED)); state.rooms = s.rooms; state.reservations = s.reservations.map(r => ({ checkedOut: false, ...r })); state.newId = null; emit(); }
function subscribe(f) { subs.add(f); return () => subs.delete(f); }
const room = id => state.rooms.find(r => r.id === id);
const blockActive = (rm, day) => !!(rm.block && rm.block.until > day);
const blockText = b => (b.kind === 'remont' ? 'Remont do ' : 'Zablokowany do ') + fmt(b.until);
function roomState(rm) {
  if (blockActive(rm, TODAY)) return { key: rm.block.kind === 'remont' ? 'reno' : 'blocked', text: blockText(rm.block) };
  if (rm.hk === 'service') return { key: 'service', text: 'Serwis' };
  return { key: 'clean', text: 'Czysty' };
}
function resState(r) {
  if (r.checkedOut) return 'out';
  if (r.checkedIn) return r.to === TODAY ? 'departure' : 'inhouse';
  return 'arrival';
}
const total = r => room(r.room).price * (r.to - r.from);
const pendingDeparture = roomId => state.reservations.find(r => r.room === roomId && r.to === TODAY && r.checkedIn && !r.checkedOut);
function conflicts(roomId, from, to, guests, excludeId) {
  const rm = room(roomId), reasons = [];
  if (rm.block && rm.block.until > from && rm.block.from < to) reasons.push({ tone: 'off', icon: rm.block.kind === 'remont' ? 'hammer' : 'ban', text: blockText(rm.block) });
  state.reservations.filter(r => r.id !== excludeId && r.room === rm.id && r.from < to && r.to > from).sort((a, b) => a.from - b.from).forEach(r => {
    reasons.push(r.from <= from ? { tone: 'busy', icon: 'lock', text: 'Zajęty do ' + fmt(r.to), res: r } : { tone: 'warn', icon: 'calendar-clock', text: 'Wolny tylko do ' + fmt(r.from), res: r });
  });
  if (rm.cap < guests) reasons.push({ tone: 'off', icon: 'users', text: 'Za mały, maks. ' + rm.cap + ' os.' });
  return reasons;
}
function readiness(rm, from) {
  if (from !== TODAY) return { tone: 'ok', icon: 'circle-check', text: 'Gotowy na przyjazd', now: false, later: false };
  if (pendingDeparture(rm.id)) return { tone: 'warn', icon: 'clock-3', text: 'Gotowy ok. 14:00, po wyjeździe gościa', now: false, later: true };
  if (rm.hk === 'service') return { tone: 'warn', icon: 'clock-3', text: 'W serwisie, gotowy ok. 14:00', now: false, later: true };
  return { tone: 'ok', icon: 'circle-check', text: 'Czysty, gotowy teraz', now: true, later: false };
}
function search({ from, to, guests }) {
  const nights = to - from, available = [], unavailable = [];
  for (const rm of state.rooms) {
    const reasons = conflicts(rm.id, from, to, guests);
    if (reasons.length) { unavailable.push({ id: rm.id, room: rm, reasons }); continue; }
    const ready = readiness(rm, from);
    available.push({ id: rm.id, room: rm, ready, total: rm.price * nights, later: ready.later, spare: rm.cap - guests });
  }
  available.sort((a, b) => (a.later - b.later) || (a.spare - b.spare) || (a.room.price - b.room.price));
  if (available.length >= 2) available[0].best = true;
  return { available, unavailable, nights };
}
function canCheckIn(r) {
  const show = !r.checkedIn && r.from <= TODAY && r.to > TODAY;
  if (!show) return { show: false, blocker: null };
  if (pendingDeparture(r.room)) return { show, blocker: 'Poprzedni gość jeszcze się nie wymeldował.' };
  if (room(r.room).hk === 'service') return { show, blocker: 'Pokój jest w serwisie. Oznacz go jako czysty przed meldunkiem.' };
  return { show, blocker: null };
}
const canCheckOut = r => r.checkedIn && !r.checkedOut && r.to === TODAY;
function stats() {
  const active = state.rooms.filter(r => !blockActive(r, TODAY));
  const occ = new Set(state.reservations.filter(r => r.from <= TODAY && r.to > TODAY).map(r => r.room));
  return { active: active.length, occupied: active.filter(r => occ.has(r.id)).length,
    arrivals: state.reservations.filter(r => r.from === TODAY).length, departures: state.reservations.filter(r => r.to === TODAY).length,
    service: active.filter(r => r.hk === 'service').length, off: state.rooms.length - active.length };
}
function book(roomId, q, g, checkIn) {
  const id = 'r' + Date.now();
  state.reservations.push({ id, first: g.first.trim(), last: g.last.trim(), phone: g.phone.trim(), email: (g.email || '').trim(), room: roomId, from: q.from, to: q.to, guests: q.guests, pay: g.pay || 'Karta', note: 'Walk-in', invoice: g.inv && g.inv.on ? { nip: g.inv.nip, company: g.inv.company.trim() } : null, checkedIn: !!checkIn, checkedOut: false });
  state.newId = id; emit(); return id;
}
const find = id => state.reservations.find(r => r.id === id);
function update(id, patch) { Object.assign(find(id), patch); emit(); }
function checkIn(id) { find(id).checkedIn = true; emit(); }
function checkOut(id) { const r = find(id); r.checkedOut = true; room(r.room).hk = 'service'; emit(); }
function markClean(id) { room(id).hk = 'clean'; emit(); }
function remove(id) { state.reservations = state.reservations.filter(r => r.id !== id); emit(); }
window.HM = { DAY, TODAY, TL_START, TL_DAYS, WD, MONTHS, fmt, toISO, fromISO, pln, dobaWord, doby, roomsWord, few, weekday, state, room, reset, subscribe, blockActive, roomState, resState, total, conflicts, readiness, search, canCheckIn, canCheckOut, stats, book, update, checkIn, checkOut, markClean, remove };
reset();
})();
