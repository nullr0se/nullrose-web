function InvoiceFields({ value, onChange, idPrefix }) {
  const { TextField } = window.DesignSystem_2ac299;
  const v = value || { on: false, nip: '', company: '' };
  const id = (idPrefix || 'inv') + '-on';
  return (
    <div className="hm-full" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <label htmlFor={id} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 32, fontSize: 15, cursor: 'pointer' }}>
        <input id={id} type="checkbox" checked={v.on} onChange={e => onChange({ ...v, on: e.target.checked })} style={{ width: 18, height: 18, margin: 0, accentColor: 'var(--action-primary)', cursor: 'pointer' }} />
        Faktura VAT na firmę
      </label>
      {v.on && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))', gap: 10 }}>
          <TextField label="NIP" required inputMode="numeric" pattern="[0-9]{10}" maxLength={10} title="NIP: 10 cyfr" placeholder="10 cyfr" hint="10 cyfr, bez spacji"
            value={v.nip} onChange={e => onChange({ ...v, nip: e.target.value.replace(/\D/g, '').slice(0, 10) })} />
          <TextField label="Nazwa firmy" required value={v.company} onChange={e => onChange({ ...v, company: e.target.value })} />
        </div>
      )}
    </div>
  );
}
function FvTag({ invoice }) {
  const [open, setOpen] = React.useState(false);
  if (!invoice) return null;
  const tip = 'Faktura VAT: ' + invoice.company + ', NIP ' + invoice.nip;
  return (
    <span tabIndex={0} aria-label={tip} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', height: 22, padding: '0 7px', marginLeft: 8, borderRadius: 4, border: '1px solid var(--border-strong)', background: 'var(--surface-sunken)', color: 'var(--text-secondary)', fontSize: 14, fontWeight: 600, lineHeight: 1, cursor: 'help', verticalAlign: 'middle', outline: 'none' }}>
      FV
      {open && <span role="tooltip" style={{ position: 'absolute', bottom: 'calc(100% + 6px)', right: 0, zIndex: 30, padding: '8px 10px', borderRadius: 6, background: 'var(--text-body)', color: 'var(--surface-card)', fontSize: 14, fontWeight: 500, lineHeight: 1.35, whiteSpace: 'nowrap', boxShadow: 'var(--shadow-pop)' }}>{tip}</span>}
    </span>
  );
}
window.InvoiceFields = InvoiceFields; window.FvTag = FvTag;
