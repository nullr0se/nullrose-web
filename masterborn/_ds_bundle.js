/* @ds-bundle: {"format":4,"namespace":"DesignSystem_2ac299","components":[{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"ConfirmDialog","sourcePath":"components/feedback/ConfirmDialog.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"StatusBadge","sourcePath":"components/feedback/StatusBadge.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"DateField","sourcePath":"components/forms/DateField.jsx"},{"name":"Stepper","sourcePath":"components/forms/Stepper.jsx"},{"name":"TextField","sourcePath":"components/forms/TextField.jsx"}],"sourceHashes":{"components/core/Icon.jsx":"191dd9a57a7c","components/data/DataTable.jsx":"4ccc889e4a78","components/feedback/ConfirmDialog.jsx":"afcdcc5899c0","components/feedback/Dialog.jsx":"1e01d0161d0f","components/feedback/StatusBadge.jsx":"3d82eece066e","components/forms/Button.jsx":"c738c9ea2a80","components/forms/DateField.jsx":"7cef1b30ecb5","components/forms/Stepper.jsx":"8604dfd53e0a","components/forms/TextField.jsx":"47528d2bc3d1","explore/walkin.js":"1448c199bc5d","ui_kits/reception/AppHeader.jsx":"5789f7106671","ui_kits/reception/EditReservationDialog.jsx":"a495dd68b8ff","ui_kits/reception/GuestDrawer.jsx":"9bd27d1d5a55","ui_kits/reception/InvoiceFields.jsx":"750f2b5b31ff","ui_kits/reception/OwnerStrip.jsx":"c57d82544f7a","ui_kits/reception/RangeField.jsx":"b702a562eff2","ui_kits/reception/StateChip.jsx":"a1dea09d001e","ui_kits/reception/Timeline.jsx":"93e91c76bb75","ui_kits/reception/WalkInPanel.jsx":"1a00aca649ee","ui_kits/reception/data.js":"e81e2cfff084","ui_kits/reception/responsive.js":"15db94fa714e"},"inlinedExternals":[],"unexposedExports":[{"name":"formatDate","sourcePath":"components/forms/DateField.jsx"}]} */

(() => {

const __ds_ns = (window.DesignSystem_2ac299 = window.DesignSystem_2ac299 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Icon.jsx
try { (() => {
const pascal = s => s.replace(/(^|-)([a-z0-9])/g, (_, __, c) => c.toUpperCase());
function Icon({
  name,
  size = 16,
  strokeWidth = 2,
  color = 'currentColor',
  label,
  style
}) {
  const lib = typeof window !== 'undefined' && window.lucide && window.lucide.icons;
  let node = lib && lib[pascal(name)];
  if (node && node[0] === 'svg') node = node[2];
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    style: {
      flex: 'none',
      display: 'block',
      ...style
    },
    'aria-hidden': label ? undefined : true,
    role: label ? 'img' : undefined,
    'aria-label': label
  };
  return /*#__PURE__*/React.createElement("svg", props, (node || []).map(([tag, attrs], i) => React.createElement(tag, {
    key: i,
    ...attrs
  })));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
function Row({
  row,
  columns,
  onClick,
  selected,
  highlighted,
  tone
}) {
  const [hover, setHover] = React.useState(false);
  const bg = selected ? 'var(--surface-selected)' : highlighted ? 'var(--surface-new)' : hover && onClick ? 'var(--blue-25)' : tone === 'sunken' ? 'var(--surface-sunken)' : 'transparent';
  return /*#__PURE__*/React.createElement("tr", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      cursor: onClick ? 'pointer' : 'default'
    }
  }, columns.map((c, i) => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    style: {
      padding: tone === 'sunken' ? '10px 16px' : '13px 16px',
      borderBottom: '1px solid var(--border-default)',
      background: bg,
      textAlign: c.align || 'left',
      verticalAlign: 'middle',
      width: c.width,
      color: tone === 'sunken' ? 'var(--text-secondary)' : 'var(--text-body)',
      boxShadow: selected && i === 0 ? 'inset 3px 0 0 var(--action-primary)' : 'none'
    }
  }, c.render ? c.render(row) : row[c.key])));
}
function DataTable({
  columns,
  rows,
  rowKey = 'id',
  onRowClick,
  selectedKey,
  highlightKey,
  tone = 'default',
  showHeader = true,
  empty
}) {
  return /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 14,
      lineHeight: 1.45,
      fontVariantNumeric: 'tabular-nums'
    }
  }, showHeader && /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    style: {
      textAlign: c.align || 'left',
      fontWeight: 600,
      fontSize: 14,
      color: 'var(--text-secondary)',
      padding: '10px 16px',
      borderBottom: '1px solid var(--border-default)',
      background: 'var(--surface-sunken)',
      whiteSpace: 'nowrap'
    }
  }, c.label)))), /*#__PURE__*/React.createElement("tbody", null, rows.length === 0 && empty ? /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: columns.length,
    style: {
      padding: '18px 16px',
      color: 'var(--text-secondary)'
    }
  }, empty)) : rows.map(r => /*#__PURE__*/React.createElement(Row, {
    key: r[rowKey],
    row: r,
    columns: columns,
    tone: tone,
    selected: selectedKey != null && r[rowKey] === selectedKey,
    highlighted: highlightKey != null && r[rowKey] === highlightKey,
    onClick: onRowClick ? () => onRowClick(r) : undefined
  }))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({
  open,
  title,
  children,
  footer,
  onClose,
  width = 480
}) {
  React.useEffect(() => {
    if (!open) return;
    const k = e => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  }, [open, onClose]);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onMouseDown: e => {
      if (e.target === e.currentTarget && onClose) onClose();
    },
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'var(--overlay)',
      display: 'grid',
      placeItems: 'center',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    "aria-label": title,
    style: {
      width,
      maxWidth: '100%',
      maxHeight: 'calc(100vh - 48px)',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-dialog)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-sans)',
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      padding: '18px 20px 18px 24px',
      borderBottom: '1px solid var(--border-default)'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: 'var(--text-page-title)',
      letterSpacing: 'var(--tracking-tight)'
    }
  }, title), onClose && /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Zamknij",
    onClick: onClose,
    style: {
      width: 36,
      height: 36,
      border: 0,
      background: 'none',
      borderRadius: 8,
      display: 'grid',
      placeItems: 'center',
      cursor: 'pointer',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24,
      fontSize: 15,
      lineHeight: 1.45,
      overflowY: 'auto',
      minHeight: 0
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 12,
      padding: '16px 24px',
      borderTop: '1px solid var(--border-default)'
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/StatusBadge.jsx
try { (() => {
const DEFAULT_ICON = {
  ok: 'circle-check',
  warn: 'clock-3',
  busy: 'lock',
  off: 'wrench',
  info: 'log-in'
};
function StatusBadge({
  tone = 'info',
  icon,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '3px 10px 3px 8px',
      borderRadius: 'var(--radius-pill)',
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 1.45,
      whiteSpace: 'nowrap',
      background: 'var(--status-' + tone + '-bg)',
      color: 'var(--status-' + tone + '-fg)',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon || DEFAULT_ICON[tone]
  }), children);
}
Object.assign(__ds_scope, { StatusBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/StatusBadge.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const PAL = {
  primary: ['var(--action-primary)', 'var(--action-primary-hover)', 'var(--text-on-accent)', 'var(--action-primary)', 'var(--action-primary-hover)'],
  secondary: ['var(--surface-card)', 'var(--surface-hover)', 'var(--text-body)', 'var(--border-strong)', 'var(--border-hover)'],
  danger: ['var(--red-700)', 'var(--red-800)', 'var(--text-on-accent)', 'var(--red-700)', 'var(--red-800)'],
  'danger-quiet': ['transparent', 'var(--danger-bg)', 'var(--danger-fg)', 'transparent', 'transparent'],
  ghost: ['transparent', 'var(--surface-hover)', 'var(--text-body)', 'transparent', 'transparent']
};
function Button({
  variant = 'secondary',
  size = 'md',
  icon,
  children,
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [bg, bgH, fg, bd, bdH] = PAL[variant] || PAL.secondary;
  const on = hover && !disabled;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      height: size === 'sm' ? 'var(--control-h-sm)' : 'var(--control-h)',
      padding: size === 'sm' ? '0 12px' : '0 16px',
      width: fullWidth ? '100%' : undefined,
      borderRadius: 'var(--radius-md)',
      border: '1px solid ' + (on ? bdH : bd),
      background: on ? bgH : bg,
      color: fg,
      font: 'inherit',
      fontSize: size === 'sm' ? 14 : 15,
      fontWeight: 500,
      whiteSpace: 'nowrap',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      transition: 'background var(--dur-fast), border-color var(--dur-fast)',
      ...style
    }
  }), icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon
  }), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ConfirmDialog.jsx
try { (() => {
function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel = 'Potwierdź',
  cancelLabel = 'Anuluj',
  danger = false,
  onConfirm,
  onCancel
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.Dialog, {
    open: open,
    title: title,
    onClose: onCancel,
    width: 440,
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(__ds_scope.Button, {
      onClick: onCancel
    }, cancelLabel), /*#__PURE__*/React.createElement(__ds_scope.Button, {
      variant: danger ? 'danger' : 'primary',
      icon: danger ? 'trash-2' : 'check',
      onClick: onConfirm,
      autoFocus: true
    }, confirmLabel))
  }, children);
}
Object.assign(__ds_scope, { ConfirmDialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ConfirmDialog.jsx", error: String((e && e.message) || e) }); }

// components/forms/DateField.jsx
try { (() => {
const DAY = 864e5;
const toN = iso => {
  const [y, m, d] = iso.split('-').map(Number);
  return Date.UTC(y, m - 1, d) / DAY;
};
const toISO = n => new Date(n * DAY).toISOString().slice(0, 10);
const pad = n => String(n).padStart(2, '0');
const formatDate = iso => {
  const [y, m, d] = iso.split('-');
  return d + '.' + m + '.' + y;
};
const MONTHS = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
function DateField({
  label,
  value,
  min,
  today,
  onChange,
  style
}) {
  const [open, setOpen] = React.useState(false);
  const v = toN(value),
    t = new Date(v * DAY);
  const [ym, setYm] = React.useState([t.getUTCFullYear(), t.getUTCMonth()]);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const h = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const k = e => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', h);
    document.addEventListener('keydown', k);
    return () => {
      document.removeEventListener('mousedown', h);
      document.removeEventListener('keydown', k);
    };
  }, [open]);
  const [y, m] = ym;
  const first = Date.UTC(y, m, 1) / DAY,
    dim = new Date(Date.UTC(y, m + 1, 0)).getUTCDate(),
    off = (new Date(first * DAY).getUTCDay() + 6) % 7;
  const minN = min ? toN(min) : -Infinity,
    todayN = today ? toN(today) : null;
  const shift = d => {
    let mm = m + d,
      yy = y;
    if (mm < 0) {
      mm = 11;
      yy--;
    }
    if (mm > 11) {
      mm = 0;
      yy++;
    }
    setYm([yy, mm]);
  };
  const nav = {
    border: 0,
    background: 'none',
    width: 32,
    height: 32,
    borderRadius: 6,
    display: 'grid',
    placeItems: 'center',
    cursor: 'pointer',
    color: 'var(--text-body)'
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      color: 'var(--text-secondary)'
    }
  }, label), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-haspopup": "dialog",
    "aria-expanded": open,
    onClick: () => {
      setYm([t.getUTCFullYear(), t.getUTCMonth()]);
      setOpen(o => !o);
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: 'var(--control-h)',
      padding: '0 14px',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-card)',
      font: 'inherit',
      fontWeight: 500,
      color: 'var(--text-body)',
      cursor: 'pointer',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "calendar"
  }), formatDate(value), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      color: 'var(--text-muted)',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down"
  }))), open && /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-label": "Wybierz dat\u0119",
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 6,
      zIndex: 50,
      width: 300,
      padding: 14,
      background: 'var(--surface-card)',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-pop)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: nav,
    "aria-label": "Poprzedni miesi\u0105c",
    onClick: () => shift(-1)
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-left"
  })), MONTHS[m], " ", y, /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: nav,
    "aria-label": "Nast\u0119pny miesi\u0105c",
    onClick: () => shift(1)
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-right"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7,1fr)',
      gap: 2,
      textAlign: 'center',
      fontSize: 14
    }
  }, ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'].map(d => /*#__PURE__*/React.createElement("div", {
    key: d,
    style: {
      fontSize: 13,
      color: 'var(--text-muted)',
      padding: '4px 0'
    }
  }, d)), Array.from({
    length: off
  }, (_, i) => /*#__PURE__*/React.createElement("div", {
    key: 'o' + i
  })), Array.from({
    length: dim
  }, (_, i) => {
    const n = first + i,
      sel = n === v,
      dis = n < minN;
    return /*#__PURE__*/React.createElement("button", {
      key: n,
      type: "button",
      disabled: dis,
      onClick: () => {
        onChange && onChange(toISO(n));
        setOpen(false);
      },
      style: {
        height: 36,
        border: 0,
        borderRadius: 6,
        font: 'inherit',
        fontSize: 14,
        cursor: dis ? 'not-allowed' : 'pointer',
        background: sel ? 'var(--action-primary)' : 'none',
        color: sel ? '#fff' : dis ? 'var(--text-disabled)' : 'var(--text-body)',
        boxShadow: n === todayN && !sel ? 'inset 0 0 0 1px var(--action-primary)' : 'none'
      }
    }, i + 1);
  }))));
}
Object.assign(__ds_scope, { formatDate, DateField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/DateField.jsx", error: String((e && e.message) || e) }); }

// components/forms/Stepper.jsx
try { (() => {
function Stepper({
  label,
  value,
  min = 1,
  max = 99,
  unit,
  onChange,
  style
}) {
  const btn = (d, dis, name, aria) => /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": aria,
    disabled: dis,
    onClick: () => onChange && onChange(value + d),
    style: {
      width: 44,
      height: '100%',
      border: 0,
      background: 'none',
      display: 'grid',
      placeItems: 'center',
      cursor: dis ? 'not-allowed' : 'pointer',
      opacity: dis ? 0.3 : 1,
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: name
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      color: 'var(--text-secondary)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    role: "group",
    "aria-label": label,
    style: {
      display: 'flex',
      alignItems: 'center',
      height: 'var(--control-h)',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-card)',
      overflow: 'hidden'
    }
  }, btn(-1, value <= min, 'minus', 'Mniej'), /*#__PURE__*/React.createElement("output", {
    style: {
      flex: 1,
      minWidth: 48,
      textAlign: 'center',
      fontWeight: 600,
      fontSize: 16
    }
  }, value, unit ? ' ' + unit : ''), btn(1, value >= max, 'plus', 'Więcej')));
}
Object.assign(__ds_scope, { Stepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Stepper.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function TextField({
  label,
  optional = false,
  hint,
  style,
  inputStyle,
  ...input
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      color: 'var(--text-secondary)'
    }
  }, label, optional && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      fontWeight: 400
    }
  }, " (opcjonalnie)")), /*#__PURE__*/React.createElement("input", _extends({}, input, {
    onFocus: e => {
      setFocus(true);
      input.onFocus && input.onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      input.onBlur && input.onBlur(e);
    },
    style: {
      height: 'var(--control-h)',
      padding: '0 12px',
      border: '1px solid ' + (focus ? 'var(--focus-ring)' : 'var(--border-strong)'),
      outline: focus ? '1px solid var(--focus-ring)' : 'none',
      borderRadius: 'var(--radius-md)',
      font: 'inherit',
      fontSize: 15,
      background: 'var(--surface-card)',
      color: 'var(--text-body)',
      width: '100%',
      boxSizing: 'border-box',
      ...inputStyle
    }
  })), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, hint));
}
Object.assign(__ds_scope, { TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextField.jsx", error: String((e && e.message) || e) }); }

// explore/walkin.js
try { (() => {
(() => {
  const DAY = 864e5;
  const D = (y, m, d) => Date.UTC(y, m - 1, d) / DAY;
  const TODAY = D(2024, 12, 28);
  const pad = n => String(n).padStart(2, '0');
  const fmt = n => {
    const t = new Date(n * DAY);
    return pad(t.getUTCDate()) + '.' + pad(t.getUTCMonth() + 1) + '.' + t.getUTCFullYear();
  };
  const pln = n => n.toLocaleString('pl-PL').replace(/\u00a0/g, ' ') + ' PLN';
  const nightsWord = n => n === 1 ? 'noc' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 'noce' : 'nocy';
  const SEED = {
    rooms: [{
      id: '101',
      floor: 1,
      cap: 1,
      type: 'Jednoosobowy',
      price: 180,
      hk: 'clean'
    }, {
      id: '102',
      floor: 1,
      cap: 2,
      type: 'Dwuosobowy',
      price: 250,
      hk: 'clean'
    }, {
      id: '103',
      floor: 1,
      cap: 3,
      type: 'Trzyosobowy',
      price: 280,
      hk: 'dirty'
    }, {
      id: '104',
      floor: 1,
      cap: 1,
      type: 'Jednoosobowy',
      price: 180,
      hk: 'clean'
    }, {
      id: '105',
      floor: 1,
      cap: 2,
      type: 'Studio',
      price: 350,
      hk: 'clean',
      outUntil: D(2024, 12, 30),
      outNote: 'wymiana kranu'
    }, {
      id: '201',
      floor: 2,
      cap: 2,
      type: 'Dwuosobowy',
      price: 250,
      hk: 'clean'
    }, {
      id: '202',
      floor: 2,
      cap: 1,
      type: 'Jednoosobowy',
      price: 180,
      hk: 'clean'
    }, {
      id: '203',
      floor: 2,
      cap: 4,
      type: 'Rodzinny',
      price: 320,
      hk: 'clean'
    }],
    reservations: [{
      id: 'r1',
      guest: 'Jan Kowalski',
      phone: '+48 501 234 567',
      room: '102',
      from: D(2024, 12, 28),
      to: D(2025, 1, 2),
      guests: 2,
      pay: 'Karta',
      note: 'Śniadanie 7:30, parking A5'
    }, {
      id: 'r2',
      guest: 'Anna Nowak',
      phone: '+48 601 234 567',
      room: '103',
      from: D(2024, 12, 26),
      to: D(2024, 12, 28),
      guests: 2,
      pay: 'Gotówka',
      note: 'Wyjazd do 14:00'
    }, {
      id: 'r3',
      guest: 'Maria Wiśniewska',
      phone: '+48 791 234 567',
      room: '104',
      from: D(2024, 12, 27),
      to: D(2024, 12, 30),
      guests: 1,
      pay: 'Faktura',
      note: 'FV na ABC Sp. z o.o.'
    }, {
      id: 'r4',
      guest: 'Piotr Zieliński',
      phone: '+44 7123 456 789',
      room: '201',
      from: D(2024, 12, 25),
      to: D(2025, 1, 3),
      guests: 2,
      pay: 'Przelew',
      note: 'VIP, późny checkout'
    }, {
      id: 'r5',
      guest: 'Rodzina Schmidt',
      phone: '+49 123 456 7890',
      room: '203',
      from: D(2024, 12, 27),
      to: D(2024, 12, 29),
      guests: 4,
      pay: 'Karta',
      note: '2 dzieci, łóżeczko'
    }, {
      id: 'r6',
      guest: 'Tomasz Lewandowski',
      phone: '+48 502 111 222',
      room: '101',
      from: D(2024, 12, 29),
      to: D(2025, 1, 1),
      guests: 1,
      pay: 'Karta',
      note: ''
    }]
  };
  const state = {
    rooms: [],
    reservations: [],
    newId: null
  };
  const listeners = [];
  function reset() {
    const s = JSON.parse(JSON.stringify(SEED));
    state.rooms = s.rooms;
    state.reservations = s.reservations;
    state.newId = null;
    emit();
  }
  function emit() {
    listeners.forEach(f => f());
  }
  function onChange(f) {
    listeners.push(f);
  }
  function search(q) {
    const end = q.from + q.nights,
      available = [],
      unavailable = [];
    for (const room of state.rooms) {
      const reasons = [];
      if (room.outUntil && room.outUntil > q.from) reasons.push({
        k: 'off',
        icon: 'wrench',
        t: 'Wyłączony do ' + fmt(room.outUntil) + ' (' + room.outNote + ')'
      });
      state.reservations.filter(r => r.room === room.id && r.from < end && r.to > q.from).sort((a, b) => a.from - b.from).forEach(r => {
        reasons.push(r.from <= q.from ? {
          k: 'busy',
          icon: 'lock',
          t: 'Zajęty do ' + fmt(r.to)
        } : {
          k: 'warn',
          icon: 'calendar-clock',
          t: 'Wolny tylko do ' + fmt(r.from)
        });
      });
      if (room.cap < q.guests) reasons.push({
        k: 'off',
        icon: 'users',
        t: 'Za mały, maks. ' + room.cap + ' os.'
      });
      if (reasons.length) {
        unavailable.push({
          room,
          reasons
        });
        continue;
      }
      const later = q.from === TODAY && room.hk === 'dirty';
      const ready = later ? {
        k: 'warn',
        icon: 'clock-3',
        t: 'Gotowy od ok. 14:00'
      } : q.from === TODAY ? {
        k: 'ok',
        icon: 'circle-check',
        t: 'Posprzątany, gotowy'
      } : {
        k: 'ok',
        icon: 'circle-check',
        t: 'Gotowy na przyjazd'
      };
      available.push({
        room,
        ready,
        total: room.price * q.nights,
        score: (room.cap - q.guests) * 10 + (later ? 5 : 0) + room.price / 1000
      });
    }
    available.sort((a, b) => a.score - b.score);
    if (available[0]) available[0].best = true;
    return {
      available,
      unavailable,
      end
    };
  }
  function stats() {
    const active = state.rooms.filter(r => !(r.outUntil && r.outUntil > TODAY));
    const occ = new Set(state.reservations.filter(r => r.from <= TODAY && r.to > TODAY).map(r => r.room));
    return {
      active: active.length,
      occupied: active.filter(r => occ.has(r.id)).length,
      arrivals: state.reservations.filter(r => r.from === TODAY).length,
      departures: state.reservations.filter(r => r.to === TODAY).length,
      dirty: state.rooms.filter(r => r.hk === 'dirty').length,
      off: state.rooms.length - active.length
    };
  }
  function book(roomId, q, g) {
    const id = 'r' + Date.now();
    state.reservations.push({
      id,
      guest: (g.first + ' ' + g.last).trim(),
      phone: g.phone,
      email: g.email,
      room: roomId,
      from: q.from,
      to: q.from + q.nights,
      guests: q.guests,
      pay: 'Do ustalenia',
      note: 'Walk-in'
    });
    state.newId = id;
    emit();
  }
  function remove(id) {
    state.reservations = state.reservations.filter(r => r.id !== id);
    emit();
  }
  function header(el) {
    el.innerHTML = `<div class="brand">HotelManager PRO</div>
  <nav class="nav"><span class="on">Recepcja</span><span>Pokoje</span><span>Goście</span><span>Płatności</span><span>Raporty</span></nav>
  <div class="head-right"><span><i data-lucide="calendar"></i></span><span>Sobota, 28.12.2024, 11:00</span>
  <button class="btn sm" data-reset><i data-lucide="rotate-ccw"></i>Przywróć dane początkowe</button></div>`;
    el.querySelector('[data-reset]').onclick = () => {
      if (confirm('Przywrócić dane początkowe? Nowe rezerwacje zostaną usunięte.')) reset();
    };
  }
  function owner(el) {
    const s = stats();
    const bar = Array.from({
      length: s.active
    }, (_, i) => `<i class="${i < s.occupied ? 'f' : ''}"></i>`).join('');
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
    el.querySelectorAll('[data-del]').forEach(b => b.onclick = () => {
      const r = state.reservations.find(x => x.id === b.dataset.del);
      if (confirm('Usunąć rezerwację: ' + r.guest + ', pokój ' + r.room + '? Tej operacji nie można cofnąć.')) remove(r.id);
    });
  }
  let calEl = null;
  function calendar(anchor, value, onPick) {
    if (calEl) {
      calEl.remove();
      calEl = null;
      return;
    }
    let t = new Date(value * DAY),
      y = t.getUTCFullYear(),
      m = t.getUTCMonth();
    const months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
    calEl = document.createElement('div');
    calEl.className = 'cal';
    const r = anchor.getBoundingClientRect();
    calEl.style.left = r.left + scrollX + 'px';
    calEl.style.top = r.bottom + scrollY + 6 + 'px';
    const draw = () => {
      const first = Date.UTC(y, m, 1) / DAY,
        dim = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
      const off = (new Date(first * DAY).getUTCDay() + 6) % 7;
      let cells = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'].map(d => `<div class="dow">${d}</div>`).join('') + '<div></div>'.repeat(off);
      for (let d = 1; d <= dim; d++) {
        const n = first + d - 1;
        cells += `<button data-d="${n}" class="${n === value ? 'sel' : ''} ${n === TODAY ? 'today' : ''}" ${n < TODAY ? 'disabled' : ''}>${d}</button>`;
      }
      calEl.innerHTML = `<div class="cal-head"><button data-p aria-label="Poprzedni miesiąc"><i data-lucide="chevron-left"></i></button>${months[m]} ${y}<button data-n aria-label="Następny miesiąc"><i data-lucide="chevron-right"></i></button></div><div class="cal-grid">${cells}</div>`;
      lucide.createIcons();
    };
    calEl.onclick = e => {
      e.stopPropagation();
      const b = e.target.closest('button');
      if (!b) return;
      if (b.dataset.p !== undefined) {
        m--;
        if (m < 0) {
          m = 11;
          y--;
        }
        draw();
      } else if (b.dataset.n !== undefined) {
        m++;
        if (m > 11) {
          m = 0;
          y++;
        }
        draw();
      } else if (b.dataset.d) {
        onPick(+b.dataset.d);
        calEl.remove();
        calEl = null;
      }
    };
    draw();
    document.body.appendChild(calEl);
    setTimeout(() => document.addEventListener('click', function h() {
      if (calEl) {
        calEl.remove();
        calEl = null;
      }
      document.removeEventListener('click', h);
    }), 0);
  }
  window.WI = {
    TODAY,
    fmt,
    pln,
    nightsWord,
    state,
    reset,
    onChange,
    search,
    stats,
    book,
    header,
    owner,
    reservations,
    calendar
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "explore/walkin.js", error: String((e && e.message) || e) }); }

// ui_kits/reception/AppHeader.jsx
try { (() => {
function AppHeader() {
  const {
    Button,
    ConfirmDialog,
    Icon
  } = window.DesignSystem_2ac299;
  const [ask, setAsk] = React.useState(false);
  const [theme, setTheme] = React.useState(HMTheme.get());
  const toggle = () => {
    const t = theme === 'dark' ? 'light' : 'dark';
    HMTheme.set(t);
    setTheme(t);
  };
  const nav = ['Recepcja', 'Pokoje', 'Goście', 'Płatności', 'Raporty'];
  return /*#__PURE__*/React.createElement("header", {
    className: "hm-head",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 28,
      minHeight: 'var(--header-h)',
      padding: '0 var(--page-pad)',
      background: 'var(--surface-card)',
      borderBottom: '1px solid var(--border-default)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 17,
      letterSpacing: '-0.01em',
      whiteSpace: 'nowrap'
    }
  }, "HotelManager PRO"), /*#__PURE__*/React.createElement("nav", {
    className: "hm-nav",
    style: {
      display: 'flex',
      gap: 4
    },
    "aria-label": "Modu\u0142y"
  }, nav.map((n, i) => /*#__PURE__*/React.createElement("span", {
    key: n,
    "aria-disabled": i > 0,
    title: i > 0 ? 'Moduł poza zakresem tego ekranu' : undefined,
    style: {
      padding: '6px 12px',
      borderRadius: 6,
      fontWeight: 500,
      background: i === 0 ? 'var(--action-soft)' : 'none',
      color: i === 0 ? 'var(--status-info-fg)' : 'var(--text-disabled)'
    }
  }, n))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hm-date",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginRight: 4,
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar"
  }), "Sobota, 28.12.2024, 11:00"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    icon: theme === 'dark' ? 'sun' : 'moon',
    onClick: toggle,
    "aria-pressed": theme === 'dark'
  }, /*#__PURE__*/React.createElement("span", {
    className: "hm-btn-label"
  }, theme === 'dark' ? 'Jasny' : 'Ciemny')), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    icon: "rotate-ccw",
    onClick: () => setAsk(true)
  }, /*#__PURE__*/React.createElement("span", {
    className: "hm-btn-label"
  }, "Przywr\xF3\u0107 dane pocz\u0105tkowe"))), /*#__PURE__*/React.createElement(ConfirmDialog, {
    open: ask,
    title: "Przywr\xF3ci\u0107 dane pocz\u0105tkowe?",
    confirmLabel: "Przywr\xF3\u0107 dane",
    onCancel: () => setAsk(false),
    onConfirm: () => {
      HM.reset();
      setAsk(false);
    }
  }, "Rezerwacje dodane i zmienione w tej sesji zostan\u0105 usuni\u0119te. Pokoje i rezerwacje wr\xF3c\u0105 do stanu z 28.12.2024, 11:00."));
}
window.AppHeader = AppHeader;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/reception/AppHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/reception/EditReservationDialog.jsx
try { (() => {
function EditReservationDialog({
  res,
  onClose
}) {
  const {
    Dialog,
    ConfirmDialog,
    TextField,
    Button,
    Stepper,
    StatusBadge,
    Icon
  } = window.DesignSystem_2ac299;
  const [f, setF] = React.useState({
    first: res.first,
    last: res.last,
    phone: res.phone,
    email: res.email || '',
    pay: res.pay,
    note: res.note || '',
    inv: res.invoice ? {
      on: true,
      ...res.invoice
    } : {
      on: false,
      nip: '',
      company: ''
    }
  });
  const [t, setT] = React.useState({
    from: res.from,
    to: res.to,
    guests: res.guests
  });
  const [askDel, setAskDel] = React.useState(false);
  const set = k => e => setF({
    ...f,
    [k]: e.target.value
  });
  const rm = HM.room(res.room),
    k = HM.resState(res);
  const changed = t.from !== res.from || t.to !== res.to || t.guests !== res.guests;
  const issues = changed ? HM.conflicts(res.room, t.from, t.to, t.guests, res.id) : [];
  const blocked = issues.length > 0;
  const dateIssue = issues.some(x => x.res || x.icon === 'hammer' || x.icon === 'ban');
  const capIssue = issues.some(x => x.icon === 'users');
  const headline = 'Nie można zapisać: pokój ' + rm.id + ' ' + [dateIssue && 'nie jest wolny w tym terminie', capIssue && 'nie mieści ' + t.guests + ' os.'].filter(Boolean).join(' i ') + (capIssue ? '' : '.');
  const save = e => {
    e.preventDefault();
    if (blocked) return;
    const {
      inv,
      ...rest
    } = f;
    HM.update(res.id, {
      ...rest,
      invoice: inv.on ? {
        nip: inv.nip,
        company: inv.company.trim()
      } : null,
      from: t.from,
      to: t.to,
      guests: t.guests
    });
    onClose();
  };
  const ci = HM.canCheckIn(res),
    co = HM.canCheckOut(res);
  const label = {
    font: 'var(--text-label)',
    color: 'var(--text-secondary)'
  };
  const grid = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 190px), 1fr))',
    gap: 12
  };
  let meldText,
    meldAct = null;
  if (k === 'out') meldText = 'Gość wymeldowany. Pokój ' + rm.id + ': ' + HM.roomState(rm).text.toLowerCase() + '.';else if (co) {
    meldText = 'Wyjazd dziś. Po wymeldowaniu pokój przejdzie w serwis.';
    meldAct = /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      icon: "log-out",
      onClick: () => HM.checkOut(res.id)
    }, "Wymelduj");
  } else if (ci.show) {
    meldText = ci.blocker || 'Przyjazd dziś. Pokój jest gotowy.';
    meldAct = /*#__PURE__*/React.createElement(React.Fragment, null, ci.blocker && rm.hk === 'service' && /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      icon: "sparkles",
      onClick: () => HM.markClean(rm.id)
    }, "Oznacz pok\xF3j jako czysty"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      icon: "log-in",
      disabled: !!ci.blocker,
      onClick: () => HM.checkIn(res.id)
    }, "Zamelduj"));
  } else if (k === 'inhouse') meldText = 'Gość zameldowany. Wyjazd ' + HM.fmt(res.to) + '.';else meldText = 'Przyjazd ' + HM.fmt(res.from) + '. Meldunek będzie dostępny w dniu przyjazdu.';
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Dialog, {
    open: true,
    title: 'Rezerwacja: ' + res.first + ' ' + res.last + ', pokój ' + res.room,
    onClose: onClose,
    width: 640,
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "danger-quiet",
      icon: "trash-2",
      onClick: () => setAskDel(true),
      style: {
        marginRight: 'auto'
      }
    }, "Usu\u0144 rezerwacj\u0119"), /*#__PURE__*/React.createElement(Button, {
      onClick: onClose
    }, "Anuluj"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      icon: "check",
      type: "submit",
      form: "editRes",
      disabled: blocked
    }, "Zapisz zmiany"))
  }, /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: 12,
      padding: 14,
      marginBottom: 18,
      background: 'var(--surface-sunken)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement(StateChip, {
    kind: k
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: '1 1 200px',
      fontSize: 14,
      color: 'var(--text-secondary)'
    }
  }, meldText), meldAct && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, meldAct)), /*#__PURE__*/React.createElement("form", {
    id: "editRes",
    onSubmit: save,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-section)'
    }
  }, "Pobyt"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 170px), 1fr))',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: 'span 2',
      minWidth: 0
    },
    className: "ed-range"
  }, /*#__PURE__*/React.createElement(RangeField, {
    label: res.checkedIn ? 'Pobyt (zmiana daty wyjazdu)' : 'Przyjazd i wyjazd',
    from: t.from,
    to: t.to,
    min: Math.min(res.from, HM.TODAY),
    lockFrom: res.checkedIn,
    disabled: res.checkedOut,
    onChange: v => setT({
      ...t,
      ...v
    })
  })), /*#__PURE__*/React.createElement(Stepper, {
    label: "Liczba os\xF3b",
    value: t.guests,
    min: 1,
    max: 6,
    onChange: v => setT({
      ...t,
      guests: v
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      ...grid,
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))',
      padding: '10px 14px',
      background: 'var(--surface-sunken)',
      borderRadius: 'var(--radius-md)',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-muted)'
    }
  }, "Pok\xF3j"), /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 600
    }
  }, rm.id, ", ", rm.type, ", do ", rm.cap, " os.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-muted)'
    }
  }, "Doby"), /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 600
    }
  }, HM.doby(t.to - t.from), ", ", HM.pln(rm.price), " za dob\u0119")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-muted)'
    }
  }, "Suma"), /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 600
    }
  }, HM.pln(rm.price * (t.to - t.from))))), blocked ? /*#__PURE__*/React.createElement("div", {
    role: "alert",
    style: {
      display: 'flex',
      gap: 10,
      padding: 14,
      borderRadius: 'var(--radius-md)',
      background: 'var(--status-busy-bg)',
      color: 'var(--status-busy-fg)',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "circle-alert",
    size: 18
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 600
    }
  }, headline), issues.map((x, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, x.res ? /*#__PURE__*/React.createElement(React.Fragment, null, "Koliduje z rezerwacj\u0105: ", /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 600
    }
  }, x.res.first, " ", x.res.last), ", ", HM.fmt(x.res.from), " do ", HM.fmt(x.res.to), ".") : x.text.replace(/\.?$/, '.'))), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, "Zmie\u0144 termin albo usu\u0144 rezerwacj\u0119 i dodaj now\u0105 w innym pokoju."))) : changed ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StatusBadge, {
    tone: "ok",
    icon: "circle-check"
  }, "Pok\xF3j ", rm.id, " wolny w nowym terminie")) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-section)',
      marginTop: 4
    }
  }, "Go\u015B\u0107"), /*#__PURE__*/React.createElement("div", {
    style: grid
  }, /*#__PURE__*/React.createElement(TextField, {
    label: "Imi\u0119",
    required: true,
    value: f.first,
    onChange: set('first')
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Nazwisko",
    required: true,
    value: f.last,
    onChange: set('last')
  })), /*#__PURE__*/React.createElement("div", {
    style: grid
  }, /*#__PURE__*/React.createElement(TextField, {
    label: "Telefon",
    required: true,
    value: f.phone,
    onChange: set('phone')
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "E-mail",
    optional: true,
    type: "email",
    value: f.email,
    onChange: set('email')
  })), /*#__PURE__*/React.createElement("div", {
    style: grid
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: label
  }, "P\u0142atno\u015B\u0107"), /*#__PURE__*/React.createElement("select", {
    value: f.pay,
    onChange: set('pay'),
    style: {
      height: 'var(--control-h)',
      padding: '0 10px',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-md)',
      font: 'inherit',
      background: 'var(--surface-card)',
      color: 'var(--text-body)'
    }
  }, ['Karta', 'Gotówka', 'Przelew', 'Do ustalenia'].map(p => /*#__PURE__*/React.createElement("option", {
    key: p
  }, p)))), /*#__PURE__*/React.createElement(TextField, {
    label: "Uwagi",
    optional: true,
    value: f.note,
    onChange: set('note')
  })), /*#__PURE__*/React.createElement(InvoiceFields, {
    idPrefix: "edit",
    value: f.inv,
    onChange: inv => setF({
      ...f,
      inv
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--text-muted)'
    }
  }, "Zmiana pokoju jest niedost\u0119pna w edycji. Aby przenie\u015B\u0107 go\u015Bcia, usu\u0144 rezerwacj\u0119 i dodaj now\u0105 w innym pokoju."))), /*#__PURE__*/React.createElement(ConfirmDialog, {
    open: askDel,
    danger: true,
    title: "Usun\u0105\u0107 rezerwacj\u0119?",
    confirmLabel: "Usu\u0144 rezerwacj\u0119",
    onCancel: () => setAskDel(false),
    onConfirm: () => {
      HM.remove(res.id);
      setAskDel(false);
      onClose();
    }
  }, res.first, " ", res.last, ", pok\xF3j ", res.room, ", ", HM.fmt(res.from), " do ", HM.fmt(res.to), ". Pok\xF3j wr\xF3ci do puli dost\u0119pnych. Tej operacji nie mo\u017Cna cofn\u0105\u0107."));
}
window.EditReservationDialog = EditReservationDialog;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/reception/EditReservationDialog.jsx", error: String((e && e.message) || e) }); }

// ui_kits/reception/GuestDrawer.jsx
try { (() => {
function GuestDrawer({
  match,
  q,
  onClose,
  onBooked
}) {
  const {
    TextField,
    Button,
    StatusBadge,
    Icon
  } = window.DesignSystem_2ac299;
  const rm = match.room,
    n = q.to - q.from;
  const [g, setG] = React.useState({
    first: '',
    last: '',
    phone: '',
    email: '',
    pay: 'Karta',
    inv: {
      on: false,
      nip: '',
      company: ''
    }
  });
  const withCheckIn = React.useRef(false);
  React.useEffect(() => {
    const k = e => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', k);
    const el = document.querySelector('#guestForm input');
    el && el.focus();
    return () => document.removeEventListener('keydown', k);
  }, []);
  const submit = e => {
    e.preventDefault();
    const ci = withCheckIn.current && match.ready.now;
    HM.book(rm.id, q, g, ci);
    onBooked({
      room: rm.id,
      name: g.first.trim() + ' ' + g.last.trim(),
      from: q.from,
      to: q.to,
      checkedIn: ci
    });
  };
  const sum = [['Pokój', rm.id + ', ' + rm.type + ', do ' + rm.cap + ' os.'], ['Osoby', q.guests], ['Termin', HM.fmt(q.from) + ' do ' + HM.fmt(q.to)], ['Doby', HM.doby(n)], ['Cena za dobę', HM.pln(rm.price)], ['Suma', HM.pln(match.total)]];
  const today = q.from === HM.TODAY;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "gd-bg",
    onMouseDown: onClose
  }), /*#__PURE__*/React.createElement("aside", {
    className: "gd",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": 'Nowa rezerwacja, pokój ' + rm.id
  }, /*#__PURE__*/React.createElement("header", {
    className: "gd-head"
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: 'var(--text-page-title)',
      letterSpacing: 'var(--tracking-tight)'
    }
  }, "Nowa rezerwacja: pok\xF3j ", rm.id), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Zamknij",
    onClick: onClose,
    style: {
      width: 36,
      height: 36,
      border: 0,
      background: 'none',
      borderRadius: 8,
      display: 'grid',
      placeItems: 'center',
      cursor: 'pointer',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    className: "gd-body"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
      gap: '12px 16px',
      padding: 16,
      background: 'var(--surface-sunken)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-md)',
      fontSize: 14
    }
  }, sum.map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-muted)'
    }
  }, k), /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 600,
      fontSize: k === 'Suma' ? 18 : 15
    }
  }, v)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StatusBadge, {
    tone: match.ready.tone,
    icon: match.ready.icon,
    style: {
      whiteSpace: 'normal'
    }
  }, match.ready.text)), /*#__PURE__*/React.createElement("form", {
    id: "guestForm",
    onSubmit: submit,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    label: "Imi\u0119",
    required: true,
    value: g.first,
    onChange: e => setG({
      ...g,
      first: e.target.value
    })
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Nazwisko",
    required: true,
    value: g.last,
    onChange: e => setG({
      ...g,
      last: e.target.value
    })
  })), /*#__PURE__*/React.createElement(TextField, {
    label: "Telefon",
    type: "tel",
    required: true,
    placeholder: "+48 600 000 000",
    value: g.phone,
    onChange: e => setG({
      ...g,
      phone: e.target.value
    })
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "E-mail",
    type: "email",
    optional: true,
    value: g.email,
    onChange: e => setG({
      ...g,
      email: e.target.value
    })
  }), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      color: 'var(--text-secondary)'
    }
  }, "P\u0142atno\u015B\u0107"), /*#__PURE__*/React.createElement("select", {
    value: g.pay,
    onChange: e => setG({
      ...g,
      pay: e.target.value
    }),
    style: {
      height: 'var(--control-h)',
      padding: '0 10px',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-md)',
      font: 'inherit',
      background: 'var(--surface-card)',
      color: 'var(--text-body)'
    }
  }, ['Karta', 'Gotówka', 'Przelew'].map(p => /*#__PURE__*/React.createElement("option", {
    key: p
  }, p)))), /*#__PURE__*/React.createElement(InvoiceFields, {
    idPrefix: "walkin",
    value: g.inv,
    onChange: inv => setG({
      ...g,
      inv
    })
  })), today && !match.ready.now && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--text-secondary)'
    }
  }, "Meldunek b\u0119dzie mo\u017Cliwy, gdy pok\xF3j b\u0119dzie gotowy. Zrobisz go z terminarza, klikaj\u0105c pasek rezerwacji.")), /*#__PURE__*/React.createElement("footer", {
    className: "gd-foot"
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: onClose
  }, "Anuluj"), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    form: "guestForm",
    variant: match.ready.now ? 'secondary' : 'primary',
    icon: match.ready.now ? undefined : 'check',
    onClick: () => {
      withCheckIn.current = false;
    }
  }, "Zarezerwuj"), match.ready.now && /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    form: "guestForm",
    variant: "primary",
    icon: "log-in",
    onClick: () => {
      withCheckIn.current = true;
    }
  }, "Zarezerwuj i zamelduj"))));
}
window.GuestDrawer = GuestDrawer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/reception/GuestDrawer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/reception/InvoiceFields.jsx
try { (() => {
function InvoiceFields({
  value,
  onChange,
  idPrefix
}) {
  const {
    TextField
  } = window.DesignSystem_2ac299;
  const v = value || {
    on: false,
    nip: '',
    company: ''
  };
  const id = (idPrefix || 'inv') + '-on';
  return /*#__PURE__*/React.createElement("div", {
    className: "hm-full",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      minHeight: 32,
      fontSize: 15,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("input", {
    id: id,
    type: "checkbox",
    checked: v.on,
    onChange: e => onChange({
      ...v,
      on: e.target.checked
    }),
    style: {
      width: 18,
      height: 18,
      margin: 0,
      accentColor: 'var(--action-primary)',
      cursor: 'pointer'
    }
  }), "Faktura VAT na firm\u0119"), v.on && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    label: "NIP",
    required: true,
    inputMode: "numeric",
    pattern: "[0-9]{10}",
    maxLength: 10,
    title: "NIP: 10 cyfr",
    placeholder: "10 cyfr",
    hint: "10 cyfr, bez spacji",
    value: v.nip,
    onChange: e => onChange({
      ...v,
      nip: e.target.value.replace(/\D/g, '').slice(0, 10)
    })
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Nazwa firmy",
    required: true,
    value: v.company,
    onChange: e => onChange({
      ...v,
      company: e.target.value
    })
  })));
}
function FvTag({
  invoice
}) {
  const [open, setOpen] = React.useState(false);
  if (!invoice) return null;
  const tip = 'Faktura VAT: ' + invoice.company + ', NIP ' + invoice.nip;
  return /*#__PURE__*/React.createElement("span", {
    tabIndex: 0,
    "aria-label": tip,
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onFocus: () => setOpen(true),
    onBlur: () => setOpen(false),
    style: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      height: 22,
      padding: '0 7px',
      marginLeft: 8,
      borderRadius: 4,
      border: '1px solid var(--border-strong)',
      background: 'var(--surface-sunken)',
      color: 'var(--text-secondary)',
      fontSize: 14,
      fontWeight: 600,
      lineHeight: 1,
      cursor: 'help',
      verticalAlign: 'middle',
      outline: 'none'
    }
  }, "FV", open && /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      bottom: 'calc(100% + 6px)',
      right: 0,
      zIndex: 30,
      padding: '8px 10px',
      borderRadius: 6,
      background: 'var(--text-body)',
      color: 'var(--surface-card)',
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 1.35,
      whiteSpace: 'nowrap',
      boxShadow: 'var(--shadow-pop)'
    }
  }, tip));
}
window.InvoiceFields = InvoiceFields;
window.FvTag = FvTag;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/reception/InvoiceFields.jsx", error: String((e && e.message) || e) }); }

// ui_kits/reception/OwnerStrip.jsx
try { (() => {
function OwnerStrip() {
  const {
    Icon
  } = window.DesignSystem_2ac299;
  const s = HM.stats();
  const Item = ({
    icon,
    children
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: '4px 8px',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon
  }), children);
  const B = ({
    children
  }) => /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--text-body)',
      fontWeight: 600
    }
  }, children);
  return /*#__PURE__*/React.createElement("div", {
    role: "region",
    "aria-label": "Podsumowanie dnia",
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      columnGap: 32,
      rowGap: 6,
      minHeight: 'var(--strip-h)',
      padding: '8px var(--page-pad)',
      boxSizing: 'border-box',
      background: 'var(--surface-strip)',
      borderBottom: '1px solid var(--border-default)',
      fontSize: 14,
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement(Item, {
    icon: "bed-double"
  }, "Ob\u0142o\u017Cenie dzi\u015B ", /*#__PURE__*/React.createElement(B, null, s.occupied, " z ", s.active), " dost\u0119pnych pokoi", /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: 'flex',
      gap: 2
    }
  }, Array.from({
    length: s.active
  }, (_, i) => /*#__PURE__*/React.createElement("i", {
    key: i,
    style: {
      width: 10,
      height: 14,
      borderRadius: 2,
      background: i < s.occupied ? 'var(--ink-700)' : 'var(--surface-card)',
      border: '1px solid ' + (i < s.occupied ? 'var(--ink-700)' : 'var(--border-strong)')
    }
  })))), /*#__PURE__*/React.createElement(Item, {
    icon: "log-in"
  }, "Przyjazdy dzi\u015B ", /*#__PURE__*/React.createElement(B, null, s.arrivals)), /*#__PURE__*/React.createElement(Item, {
    icon: "log-out"
  }, "Wyjazdy dzi\u015B ", /*#__PURE__*/React.createElement(B, null, s.departures)), /*#__PURE__*/React.createElement(Item, {
    icon: "spray-can"
  }, "Serwisy ", /*#__PURE__*/React.createElement(B, null, s.service)), /*#__PURE__*/React.createElement(Item, {
    icon: "wrench"
  }, "Wy\u0142\u0105czone ", /*#__PURE__*/React.createElement(B, null, s.off)));
}
window.OwnerStrip = OwnerStrip;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/reception/OwnerStrip.jsx", error: String((e && e.message) || e) }); }

// ui_kits/reception/RangeField.jsx
try { (() => {
function RangeField({
  label,
  from,
  to,
  min,
  maxNights = 30,
  lockFrom,
  disabled,
  onChange
}) {
  const {
    Icon
  } = window.DesignSystem_2ac299;
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState(null);
  const [hover, setHover] = React.useState(null);
  const [ym, setYm] = React.useState([2024, 11]);
  const [pos, setPos] = React.useState(null);
  const btn = React.useRef(null),
    pop = React.useRef(null);
  const vw = useViewportWidth(),
    two = vw >= 720;
  const monthOf = n => {
    const t = new Date(n * HM.DAY);
    return [t.getUTCFullYear(), t.getUTCMonth()];
  };
  const place = React.useCallback(() => {
    if (!btn.current) return;
    const r = btn.current.getBoundingClientRect(),
      w = Math.min(two ? 612 : 316, window.innerWidth - 24);
    const left = Math.max(12, Math.min(r.left, window.innerWidth - w - 12));
    const h = pop.current ? pop.current.offsetHeight : 400;
    let top = r.bottom + 6;
    if (top + h > window.innerHeight - 8 && r.top - h - 6 > 8) top = r.top - h - 6;
    top = Math.max(8, Math.min(top, window.innerHeight - h - 8));
    setPos({
      left,
      top,
      width: w
    });
  }, [two]);
  const close = () => {
    setOpen(false);
    setDraft(null);
    setHover(null);
  };
  React.useLayoutEffect(() => {
    if (open) place();
  }, [open, place, ym]);
  React.useEffect(() => {
    if (!open) return;
    const down = e => {
      if (!(pop.current && pop.current.contains(e.target)) && !(btn.current && btn.current.contains(e.target))) close();
    };
    const key = e => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        close();
      }
    };
    const re = () => place();
    document.addEventListener('mousedown', down);
    window.addEventListener('keydown', key, true);
    window.addEventListener('resize', re);
    window.addEventListener('scroll', re, true);
    return () => {
      document.removeEventListener('mousedown', down);
      window.removeEventListener('keydown', key, true);
      window.removeEventListener('resize', re);
      window.removeEventListener('scroll', re, true);
    };
  }, [open, place]);
  const toggle = () => {
    if (open) return close();
    setYm(monthOf(from));
    setDraft(lockFrom ? from : null);
    setOpen(true);
  };
  const pick = n => {
    if (lockFrom) {
      if (n > from && n - from <= maxNights) {
        onChange({
          from,
          to: n
        });
        close();
      }
      return;
    }
    if (draft === null || n <= draft) {
      setDraft(n);
      return;
    }
    if (n - draft > maxNights) return;
    onChange({
      from: draft,
      to: n
    });
    close();
  };
  const minN = min == null ? -Infinity : min;
  const a = draft !== null ? draft : from;
  const b = draft !== null ? hover !== null && hover > draft ? hover : lockFrom ? to : null : to;
  const shift = d => {
    let [y, m] = ym;
    m += d;
    if (m < 0) {
      m = 11;
      y--;
    }
    if (m > 11) {
      m = 0;
      y++;
    }
    setYm([y, m]);
  };
  const nav = {
    border: 0,
    background: 'none',
    width: 32,
    height: 32,
    borderRadius: 6,
    display: 'grid',
    placeItems: 'center',
    cursor: 'pointer',
    color: 'var(--text-body)'
  };
  const month = (y, m) => {
    const first = Date.UTC(y, m, 1) / HM.DAY,
      dim = new Date(Date.UTC(y, m + 1, 0)).getUTCDate(),
      off = (new Date(first * HM.DAY).getUTCDay() + 6) % 7;
    return /*#__PURE__*/React.createElement("div", {
      key: y + '-' + m,
      style: {
        flex: '1 1 0',
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        fontWeight: 600,
        height: 32,
        lineHeight: '32px',
        marginBottom: 6
      }
    }, HM.MONTHS[m], " ", y), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(7,1fr)',
        rowGap: 2,
        textAlign: 'center',
        fontSize: 14
      },
      onMouseLeave: () => setHover(null)
    }, ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'].map(d => /*#__PURE__*/React.createElement("div", {
      key: d,
      style: {
        fontSize: 13,
        color: 'var(--text-muted)',
        padding: '4px 0'
      }
    }, d)), Array.from({
      length: off
    }, (_, i) => /*#__PURE__*/React.createElement("div", {
      key: 'o' + i
    })), Array.from({
      length: dim
    }, (_, i) => {
      const n = first + i;
      const dis = lockFrom ? n <= from || n - from > maxNights : n < minN || draft !== null && n > draft && n - draft > maxNights;
      const end = n === a || n === b,
        mid = b !== null && n > a && n < b;
      const left = n === a && b !== null && b > a,
        right = n === b && b > a;
      return /*#__PURE__*/React.createElement("button", {
        key: n,
        type: "button",
        disabled: dis,
        onClick: () => pick(n),
        onMouseEnter: () => setHover(n),
        "aria-label": HM.fmt(n),
        "aria-pressed": end,
        style: {
          height: 38,
          border: 0,
          font: 'inherit',
          fontSize: 14,
          fontWeight: end ? 600 : 400,
          cursor: dis ? 'not-allowed' : 'pointer',
          borderRadius: end ? left ? '8px 0 0 8px' : right ? '0 8px 8px 0' : 8 : 0,
          background: end ? 'var(--action-primary)' : mid ? 'var(--action-soft)' : 'none',
          color: end ? 'var(--text-on-accent)' : dis ? 'var(--text-disabled)' : 'var(--text-body)',
          boxShadow: n === HM.TODAY && !end ? 'inset 0 0 0 1px var(--action-primary)' : 'none'
        }
      }, i + 1);
    })));
  };
  const [y, m] = ym,
    y2 = m === 11 ? y + 1 : y,
    m2 = (m + 1) % 12;
  const hint = lockFrom ? 'Kliknij nową datę wyjazdu. Przyjazd jest zablokowany, bo gość jest zameldowany.' : draft === null ? 'Kliknij datę przyjazdu, potem datę wyjazdu.' : 'Teraz kliknij datę wyjazdu.';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      minWidth: 0
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      color: 'var(--text-secondary)'
    }
  }, label), /*#__PURE__*/React.createElement("button", {
    ref: btn,
    type: "button",
    disabled: disabled,
    "aria-haspopup": "dialog",
    "aria-expanded": open,
    onClick: toggle,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: 'var(--control-h)',
      padding: '0 12px 0 14px',
      border: '1px solid ' + (open ? 'var(--action-primary)' : 'var(--border-strong)'),
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-card)',
      font: 'inherit',
      fontWeight: 500,
      color: disabled ? 'var(--text-disabled)' : 'var(--text-body)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      width: '100%',
      minWidth: 0,
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar-range"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, HM.fmt(from), " do ", HM.fmt(to)), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 14,
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '2px 8px',
      borderRadius: 999,
      background: 'var(--surface-sunken)',
      border: '1px solid var(--border-default)'
    }
  }, HM.doby(to - from)), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down"
  }))), open && ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    ref: pop,
    role: "dialog",
    "aria-label": "Wybierz termin pobytu",
    style: {
      position: 'fixed',
      zIndex: 300,
      left: pos ? pos.left : -9999,
      top: pos ? pos.top : -9999,
      width: pos ? pos.width : 316,
      boxSizing: 'border-box',
      maxHeight: 'calc(100vh - 16px)',
      overflowY: 'auto',
      padding: 14,
      background: 'var(--surface-card)',
      color: 'var(--text-body)',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-pop)',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: {
      ...nav,
      position: 'absolute',
      left: 0,
      top: 0
    },
    "aria-label": "Poprzedni miesi\u0105c",
    onClick: () => shift(-1)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-left"
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: {
      ...nav,
      position: 'absolute',
      right: 0,
      top: 0
    },
    "aria-label": "Nast\u0119pny miesi\u0105c",
    onClick: () => shift(1)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24
    }
  }, month(y, m), two && month(y2, m2))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: '6px 16px',
      marginTop: 12,
      paddingTop: 12,
      borderTop: '1px solid var(--border-default)',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, hint), /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 600
    }
  }, HM.fmt(a), " do ", b !== null ? HM.fmt(b) + ', ' + HM.doby(b - a) : '…'))), document.body));
}
window.RangeField = RangeField;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/reception/RangeField.jsx", error: String((e && e.message) || e) }); }

// ui_kits/reception/StateChip.jsx
try { (() => {
const HM_ST = {
  arrival: {
    bg: 'var(--st-arrival)',
    fg: '#fff',
    icon: 'log-in',
    label: 'Oczekiwany przyjazd'
  },
  inhouse: {
    bg: 'var(--st-inhouse)',
    fg: '#fff',
    icon: 'bed',
    label: 'Zameldowany'
  },
  departure: {
    bg: 'var(--st-departure)',
    fg: '#fff',
    icon: 'log-out',
    label: 'Wyjazd dziś'
  },
  out: {
    bg: 'var(--st-out-bg)',
    fg: 'var(--st-out-fg)',
    icon: 'check-check',
    label: 'Wymeldowany'
  },
  clean: {
    bg: 'var(--st-clean)',
    fg: '#fff',
    icon: 'sparkles',
    label: 'Czysty'
  },
  service: {
    bg: 'var(--st-service)',
    fg: 'var(--st-service-fg)',
    icon: 'spray-can',
    label: 'Serwis'
  },
  reno: {
    bg: 'var(--st-reno)',
    fg: '#fff',
    icon: 'hammer',
    label: 'Remont'
  },
  blocked: {
    bg: 'var(--st-blocked)',
    fg: '#fff',
    icon: 'ban',
    label: 'Zablokowany'
  }
};
function StateChip({
  kind,
  children,
  style
}) {
  const {
    Icon
  } = window.DesignSystem_2ac299;
  const c = HM_ST[kind];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      minHeight: 26,
      padding: '2px 10px 2px 8px',
      borderRadius: 999,
      background: c.bg,
      color: c.fg,
      fontSize: 14,
      fontWeight: 600,
      lineHeight: 1.2,
      ...style
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: c.icon,
    size: 15
  }), children || c.label);
}
window.HM_ST = HM_ST;
window.StateChip = StateChip;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/reception/StateChip.jsx", error: String((e && e.message) || e) }); }

// ui_kits/reception/Timeline.jsx
try { (() => {
function Timeline({
  result,
  q,
  selRoom,
  onPickRoom,
  onOpenRes
}) {
  const {
    Icon,
    StatusBadge,
    Button
  } = window.DesignSystem_2ac299;
  const S = HM.TL_START,
    N = HM.TL_DAYS,
    active = !!result;
  const days = Array.from({
    length: N
  }, (_, i) => S + i);
  const pct = x => x / N * 100 + '%';
  const span = (a, b) => {
    const l = Math.max(a - S + 0.5, 0),
      r = Math.min(b - S + 0.5, N);
    if (r <= l) return null;
    const cl = a - S + 0.5 < 0,
      cr = b - S + 0.5 > N;
    return {
      left: 'calc(' + pct(l) + ' + ' + (cl ? 0 : 2) + 'px)',
      width: 'calc(' + pct(r - l) + ' - ' + ((cl ? 0 : 2) + (cr ? 0 : 2)) + 'px)',
      borderRadius: (cl ? '0' : '23px') + ' ' + (cr ? '0 0' : '23px 23px') + ' ' + (cl ? '0' : '23px')
    };
  };
  const band = active ? span(q.from, q.to) : null;
  const months = [];
  days.forEach(d => {
    const t = new Date(d * HM.DAY),
      lab = HM.MONTHS[t.getUTCMonth()] + ' ' + t.getUTCFullYear();
    const last = months[months.length - 1];
    last && last.lab === lab ? last.n++ : months.push({
      lab,
      n: 1
    });
  });
  const dayCls = d => 'tl-day' + (HM.weekday(d) % 6 === 0 ? ' is-we' : '') + (d === HM.TODAY ? ' is-today' : '');
  const rows = active ? [...result.available.map(a => ({
    rm: a.room,
    match: a
  })), ...result.unavailable.map(u => ({
    rm: u.room,
    reasons: u.reasons
  }))] : HM.state.rooms.map(rm => ({
    rm
  }));
  const legend = k => /*#__PURE__*/React.createElement(StateChip, {
    key: k,
    kind: k
  });
  const Divider = ({
    icon,
    children
  }) => /*#__PURE__*/React.createElement("div", {
    className: "tl-divider"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: icon
  }), /*#__PURE__*/React.createElement("span", null, children)));
  const renderRow = ({
    rm,
    match,
    reasons
  }) => {
    const st = HM.roomState(rm),
      dim = active && !match,
      sel = selRoom === rm.id;
    const res = HM.state.reservations.filter(r => r.room === rm.id);
    const bl = rm.block ? span(rm.block.from, rm.block.until) : null;
    const pickIt = match ? () => onPickRoom(rm.id) : undefined;
    return /*#__PURE__*/React.createElement("div", {
      key: rm.id,
      className: 'tl-row' + (match ? ' is-match' : '') + (dim ? ' is-dim' : '') + (sel ? ' is-sel' : ''),
      onClick: pickIt
    }, /*#__PURE__*/React.createElement("div", {
      className: "tl-room"
    }, /*#__PURE__*/React.createElement("div", {
      className: "tl-room-top"
    }, /*#__PURE__*/React.createElement("span", {
      className: "tl-no"
    }, rm.id), /*#__PURE__*/React.createElement(StateChip, {
      kind: st.key
    }, st.text)), /*#__PURE__*/React.createElement("div", {
      className: "tl-sub"
    }, rm.type, ", do ", rm.cap, " os."), match && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "tl-sub"
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        fontWeight: 600,
        color: 'var(--text-body)'
      }
    }, HM.pln(rm.price)), " za dob\u0119"), match.best && /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 14,
        fontWeight: 600,
        color: 'var(--status-info-fg)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "star"
    }), "Najlepsze dopasowanie"), /*#__PURE__*/React.createElement(StatusBadge, {
      tone: match.ready.tone,
      icon: match.ready.icon,
      style: {
        whiteSpace: 'normal'
      }
    }, match.ready.text)), dim && /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 6
      }
    }, reasons.filter(x => !((st.key === 'reno' || st.key === 'blocked') && (x.icon === 'hammer' || x.icon === 'ban'))).map((x, i) => /*#__PURE__*/React.createElement(StatusBadge, {
      key: i,
      tone: x.tone,
      icon: x.icon,
      style: {
        whiteSpace: 'normal'
      }
    }, x.text))), st.key === 'service' && /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      icon: "sparkles",
      onClick: e => {
        e.stopPropagation();
        HM.markClean(rm.id);
      }
    }, "Oznacz jako czysty")), /*#__PURE__*/React.createElement("div", {
      className: "tl-lane"
    }, /*#__PURE__*/React.createElement("div", {
      className: "tl-days tl-bg"
    }, days.map(d => /*#__PURE__*/React.createElement("div", {
      key: d,
      className: dayCls(d)
    }))), band && /*#__PURE__*/React.createElement("div", {
      className: "tl-band",
      style: {
        left: band.left,
        width: band.width
      }
    }), bl && /*#__PURE__*/React.createElement("div", {
      className: "tl-bar tl-block",
      style: {
        ...bl,
        background: HM_ST[rm.block.kind === 'remont' ? 'reno' : 'blocked'].bg,
        color: '#fff'
      },
      title: (rm.block.kind === 'remont' ? 'Remont' : 'Blokada') + ' do ' + HM.fmt(rm.block.until) + ', ' + rm.block.note
    }, /*#__PURE__*/React.createElement(Icon, {
      name: rm.block.kind === 'remont' ? 'hammer' : 'ban',
      size: 16
    }), /*#__PURE__*/React.createElement("span", {
      className: "tl-bar-t"
    }, /*#__PURE__*/React.createElement("b", null, rm.block.kind === 'remont' ? 'Remont' : 'Blokada', " do ", HM.fmt(rm.block.until)), /*#__PURE__*/React.createElement("span", null, rm.block.note))), res.map(r => {
      const sp = span(r.from, r.to);
      if (!sp) return null;
      const k = HM.resState(r),
        c = HM_ST[k],
        amt = HM.pln(HM.total(r));
      const label = r.first + ' ' + r.last + ', pokój ' + r.room + ', ' + HM.fmt(r.from) + ' do ' + HM.fmt(r.to) + ', ' + HM.doby(r.to - r.from) + ', ' + amt + '. ' + c.label + '.';
      return /*#__PURE__*/React.createElement("button", {
        key: r.id,
        type: "button",
        className: 'tl-bar' + (r.id === HM.state.newId ? ' is-new' : ''),
        style: {
          ...sp,
          background: c.bg,
          color: c.fg
        },
        title: label + ' Kliknij, aby otworzyć rezerwację.',
        "aria-label": 'Otwórz rezerwację: ' + label,
        onClick: e => {
          e.stopPropagation();
          onOpenRes(r);
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: c.icon,
        size: 16
      }), /*#__PURE__*/React.createElement("span", {
        className: "tl-bar-t"
      }, /*#__PURE__*/React.createElement("b", null, r.first, " ", r.last), /*#__PURE__*/React.createElement("span", null, amt)));
    }), match && band && /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: 'tl-ghost' + (sel ? ' is-sel' : ''),
      style: {
        left: band.left,
        width: band.width
      },
      "aria-label": 'Wybierz pokój ' + rm.id + ', suma ' + HM.pln(match.total),
      title: 'Pokój ' + rm.id + ': ' + HM.pln(match.total) + ' za ' + HM.doby(q.to - q.from),
      onClick: e => {
        e.stopPropagation();
        onPickRoom(rm.id);
      }
    }, q.to - q.from > 1 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      name: sel ? 'check' : 'plus',
      size: 16
    }), /*#__PURE__*/React.createElement("span", {
      className: "tl-bar-t"
    }, /*#__PURE__*/React.createElement("b", null, sel ? 'Wybrany' : 'Wybierz'), /*#__PURE__*/React.createElement("span", null, HM.pln(match.total)))) : /*#__PURE__*/React.createElement("span", {
      className: "tl-bar-t",
      style: {
        alignItems: 'center',
        width: '100%'
      }
    }, /*#__PURE__*/React.createElement("b", null, match.total.toLocaleString('pl-PL').replace(/\u00a0/g, ' ')), /*#__PURE__*/React.createElement("span", null, "PLN")))));
  };
  return /*#__PURE__*/React.createElement("section", {
    "aria-label": "Terminarz",
    className: "tl-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tl-top"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: 'var(--text-page-title)',
      letterSpacing: 'var(--tracking-tight)'
    }
  }, "Terminarz"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 14,
      whiteSpace: 'nowrap'
    }
  }, HM.fmt(S), " do ", HM.fmt(S + N - 1))), /*#__PURE__*/React.createElement("div", {
    className: "tl-legend",
    "aria-label": "Legenda"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tl-legend-l"
  }, "Rezerwacje"), ['arrival', 'inhouse', 'departure', 'out'].map(legend), /*#__PURE__*/React.createElement("span", {
    className: "tl-legend-l"
  }, "Pokoje"), ['clean', 'service', 'reno', 'blocked'].map(legend))), /*#__PURE__*/React.createElement("div", {
    className: "tl-scroll"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tl-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tl-row tl-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tl-room tl-corner"
  }, "Pok\xF3j"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "tl-months"
  }, months.map(mo => /*#__PURE__*/React.createElement("div", {
    key: mo.lab,
    style: {
      gridColumn: 'span ' + mo.n
    }
  }, mo.lab))), /*#__PURE__*/React.createElement("div", {
    className: "tl-days"
  }, days.map(d => {
    const inR = active && d >= q.from && d <= q.to;
    return /*#__PURE__*/React.createElement("div", {
      key: d,
      className: dayCls(d) + (inR ? ' is-range' : ''),
      "aria-label": HM.fmt(d)
    }, /*#__PURE__*/React.createElement("span", null, d === HM.TODAY ? 'Dziś' : HM.WD[HM.weekday(d)]), /*#__PURE__*/React.createElement("b", null, new Date(d * HM.DAY).getUTCDate()));
  })))), active && !band && /*#__PURE__*/React.createElement(Divider, {
    icon: "info"
  }, "Wybrany termin wychodzi poza widoczny zakres terminarza (", HM.fmt(S), " do ", HM.fmt(S + N - 1), ")."), active && (result.available.length ? /*#__PURE__*/React.createElement(Divider, {
    icon: "circle-check"
  }, "Wolne przez ca\u0142y pobyt: ", result.available.length, ". Kliknij wiersz, aby wybra\u0107 pok\xF3j.") : /*#__PURE__*/React.createElement(Divider, {
    icon: "circle-alert"
  }, "Brak pokoi wolnych przez ca\u0142y pobyt.")), rows.filter(r => !active || r.match).map(renderRow), active && result.unavailable.length > 0 && /*#__PURE__*/React.createElement(Divider, {
    icon: "ban"
  }, "Niedost\u0119pne w tym terminie: ", result.unavailable.length), active && rows.filter(r => !r.match).map(renderRow))));
}
window.Timeline = Timeline;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/reception/Timeline.jsx", error: String((e && e.message) || e) }); }

// ui_kits/reception/WalkInPanel.jsx
try { (() => {
function WalkInPanel({
  q,
  onQ,
  active,
  result,
  done,
  onActivate,
  onClear
}) {
  const {
    Stepper,
    Button,
    Icon
  } = window.DesignSystem_2ac299;
  const count = result ? result.available.length : 0;
  const heading = active ? 'Wolne pokoje: ' + HM.fmt(q.from) + ' do ' + HM.fmt(q.to) + ', ' + q.guests + ' os.' : 'Szukaj wolnego pokoju';
  const verb = count === 1 ? 'pasuje' : HM.few(count) ? 'pasują' : 'pasuje';
  const sub = !active ? 'Podaj termin i liczbę osób. Pasujące pokoje podświetlą się na terminarzu.' : count ? count + ' ' + HM.roomsWord(count) + ' ' + verb + (count > 1 ? ', najlepsze dopasowanie na górze terminarza' : '') + '. Kliknij podświetlony pokój, aby wpisać dane gościa.' : 'Brak pokoi wolnych przez cały pobyt. Powody widać przy numerach pokoi. Zmień termin lub liczbę osób.';
  return /*#__PURE__*/React.createElement("section", {
    "aria-label": "Wyszukiwanie wolnych pokoi",
    className: "wk-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wk-fields"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wk-range"
  }, /*#__PURE__*/React.createElement(RangeField, {
    label: "Przyjazd i wyjazd",
    from: q.from,
    to: q.to,
    min: HM.TODAY,
    onChange: v => onQ(v)
  })), /*#__PURE__*/React.createElement("div", {
    className: "wk-guests"
  }, /*#__PURE__*/React.createElement(Stepper, {
    label: "Liczba os\xF3b",
    value: q.guests,
    min: 1,
    max: 6,
    onChange: v => onQ({
      guests: v
    })
  }))), /*#__PURE__*/React.createElement("div", {
    className: "wk-sum"
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: 'var(--text-page-title)',
      letterSpacing: 'var(--tracking-tight)'
    }
  }, heading), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-secondary)',
      fontSize: 14,
      marginTop: 4,
      textWrap: 'pretty'
    }
  }, sub)), /*#__PURE__*/React.createElement("div", {
    className: "wk-act"
  }, active ? /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    icon: "x",
    onClick: onClear
  }, "Wyczy\u015B\u0107 wyszukiwanie") : /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    icon: "search",
    onClick: onActivate
  }, "Poka\u017C wolne pokoje")), done && /*#__PURE__*/React.createElement("div", {
    role: "status",
    className: "wk-done",
    style: {
      display: 'flex',
      gap: 10,
      padding: '12px 14px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--status-ok-bg)',
      color: 'var(--status-ok-fg)',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "circle-check",
    size: 18
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 600
    }
  }, "Zarezerwowano pok\xF3j ", done.room, done.checkedIn ? ', gość zameldowany' : '', "."), " ", done.name, ", ", HM.fmt(done.from), " do ", HM.fmt(done.to), ". Nowa rezerwacja jest obwiedziona na terminarzu.")));
}
window.WalkInPanel = WalkInPanel;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/reception/WalkInPanel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/reception/data.js
try { (() => {
(() => {
  const DAY = 864e5;
  const D = (y, m, d) => Date.UTC(y, m - 1, d) / DAY;
  const TODAY = D(2024, 12, 28);
  const TL_START = D(2024, 12, 24),
    TL_DAYS = 14;
  const pad = n => String(n).padStart(2, '0');
  const fmt = n => {
    const t = new Date(n * DAY);
    return pad(t.getUTCDate()) + '.' + pad(t.getUTCMonth() + 1) + '.' + t.getUTCFullYear();
  };
  const toISO = n => new Date(n * DAY).toISOString().slice(0, 10);
  const fromISO = s => {
    const [y, m, d] = s.split('-').map(Number);
    return D(y, m, d);
  };
  const pln = n => n.toLocaleString('pl-PL').replace(/\u00a0/g, ' ') + ' PLN';
  const few = n => n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20);
  const dobaWord = n => n === 1 ? 'doba' : few(n) ? 'doby' : 'dób';
  const doby = n => n + ' ' + dobaWord(n);
  const roomsWord = n => n === 1 ? 'pokój' : few(n) ? 'pokoje' : 'pokoi';
  const WD = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb'];
  const MONTHS = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
  const weekday = n => new Date(n * DAY).getUTCDay();
  const SEED = {
    rooms: [{
      id: '101',
      floor: 1,
      cap: 1,
      type: 'Jednoosobowy',
      price: 180,
      hk: 'clean'
    }, {
      id: '102',
      floor: 1,
      cap: 2,
      type: 'Dwuosobowy',
      price: 250,
      hk: 'clean'
    }, {
      id: '103',
      floor: 1,
      cap: 3,
      type: 'Trzyosobowy',
      price: 280,
      hk: 'clean'
    }, {
      id: '104',
      floor: 1,
      cap: 1,
      type: 'Jednoosobowy',
      price: 180,
      hk: 'clean'
    }, {
      id: '105',
      floor: 1,
      cap: 2,
      type: 'Studio',
      price: 350,
      hk: 'clean',
      block: {
        kind: 'remont',
        from: D(2024, 12, 20),
        until: D(2024, 12, 30),
        note: 'wymiana kranu'
      }
    }, {
      id: '201',
      floor: 2,
      cap: 2,
      type: 'Dwuosobowy',
      price: 250,
      hk: 'clean'
    }, {
      id: '202',
      floor: 2,
      cap: 1,
      type: 'Jednoosobowy',
      price: 180,
      hk: 'clean'
    }, {
      id: '203',
      floor: 2,
      cap: 4,
      type: 'Rodzinny',
      price: 320,
      hk: 'clean'
    }],
    reservations: [{
      id: 'r1',
      first: 'Jan',
      last: 'Kowalski',
      phone: '+48 501 234 567',
      email: 'j.kowalski@example.com',
      room: '102',
      from: D(2024, 12, 28),
      to: D(2025, 1, 2),
      guests: 2,
      pay: 'Karta',
      note: 'Śniadanie 7:30, parking A5',
      checkedIn: false
    }, {
      id: 'r2',
      first: 'Anna',
      last: 'Nowak',
      phone: '+48 601 234 567',
      email: 'a.nowak@gmail.com',
      room: '103',
      from: D(2024, 12, 26),
      to: D(2024, 12, 28),
      guests: 2,
      pay: 'Gotówka',
      note: 'Wyjazd do 14:00',
      checkedIn: true
    }, {
      id: 'r3',
      first: 'Maria',
      last: 'Wiśniewska',
      phone: '+48 791 234 567',
      email: 'maria.w@company.pl',
      room: '104',
      from: D(2024, 12, 27),
      to: D(2024, 12, 30),
      guests: 1,
      pay: 'Przelew',
      note: '',
      invoice: {
        nip: '1234563218',
        company: 'ABC Sp. z o.o.'
      },
      checkedIn: true
    }, {
      id: 'r4',
      first: 'Piotr',
      last: 'Zieliński',
      phone: '+44 7123 456 789',
      email: 'piotr.z@email.co.uk',
      room: '201',
      from: D(2024, 12, 25),
      to: D(2025, 1, 3),
      guests: 2,
      pay: 'Przelew',
      note: 'VIP, późny checkout',
      checkedIn: true
    }, {
      id: 'r5',
      first: 'Rodzina',
      last: 'Schmidt',
      phone: '+49 123 456 7890',
      email: 'schmidt@deutsche.de',
      room: '203',
      from: D(2024, 12, 27),
      to: D(2024, 12, 29),
      guests: 4,
      pay: 'Karta',
      note: '2 dzieci, łóżeczko',
      checkedIn: true
    }, {
      id: 'r6',
      first: 'Tomasz',
      last: 'Lewandowski',
      phone: '+48 502 111 222',
      email: '',
      room: '101',
      from: D(2024, 12, 29),
      to: D(2025, 1, 1),
      guests: 1,
      pay: 'Karta',
      note: '',
      checkedIn: false
    }]
  };
  const state = {
    rooms: [],
    reservations: [],
    newId: null,
    v: 0
  };
  const subs = new Set();
  const emit = () => {
    state.v++;
    subs.forEach(f => f(state.v));
  };
  function reset() {
    const s = JSON.parse(JSON.stringify(SEED));
    state.rooms = s.rooms;
    state.reservations = s.reservations.map(r => ({
      checkedOut: false,
      ...r
    }));
    state.newId = null;
    emit();
  }
  function subscribe(f) {
    subs.add(f);
    return () => subs.delete(f);
  }
  const room = id => state.rooms.find(r => r.id === id);
  const blockActive = (rm, day) => !!(rm.block && rm.block.until > day);
  const blockText = b => (b.kind === 'remont' ? 'Remont do ' : 'Zablokowany do ') + fmt(b.until);
  function roomState(rm) {
    if (blockActive(rm, TODAY)) return {
      key: rm.block.kind === 'remont' ? 'reno' : 'blocked',
      text: blockText(rm.block)
    };
    if (rm.hk === 'service') return {
      key: 'service',
      text: 'Serwis'
    };
    return {
      key: 'clean',
      text: 'Czysty'
    };
  }
  function resState(r) {
    if (r.checkedOut) return 'out';
    if (r.checkedIn) return r.to === TODAY ? 'departure' : 'inhouse';
    return 'arrival';
  }
  const total = r => room(r.room).price * (r.to - r.from);
  const pendingDeparture = roomId => state.reservations.find(r => r.room === roomId && r.to === TODAY && r.checkedIn && !r.checkedOut);
  function conflicts(roomId, from, to, guests, excludeId) {
    const rm = room(roomId),
      reasons = [];
    if (rm.block && rm.block.until > from && rm.block.from < to) reasons.push({
      tone: 'off',
      icon: rm.block.kind === 'remont' ? 'hammer' : 'ban',
      text: blockText(rm.block)
    });
    state.reservations.filter(r => r.id !== excludeId && r.room === rm.id && r.from < to && r.to > from).sort((a, b) => a.from - b.from).forEach(r => {
      reasons.push(r.from <= from ? {
        tone: 'busy',
        icon: 'lock',
        text: 'Zajęty do ' + fmt(r.to),
        res: r
      } : {
        tone: 'warn',
        icon: 'calendar-clock',
        text: 'Wolny tylko do ' + fmt(r.from),
        res: r
      });
    });
    if (rm.cap < guests) reasons.push({
      tone: 'off',
      icon: 'users',
      text: 'Za mały, maks. ' + rm.cap + ' os.'
    });
    return reasons;
  }
  function readiness(rm, from) {
    if (from !== TODAY) return {
      tone: 'ok',
      icon: 'circle-check',
      text: 'Gotowy na przyjazd',
      now: false,
      later: false
    };
    if (pendingDeparture(rm.id)) return {
      tone: 'warn',
      icon: 'clock-3',
      text: 'Gotowy ok. 14:00, po wyjeździe gościa',
      now: false,
      later: true
    };
    if (rm.hk === 'service') return {
      tone: 'warn',
      icon: 'clock-3',
      text: 'W serwisie, gotowy ok. 14:00',
      now: false,
      later: true
    };
    return {
      tone: 'ok',
      icon: 'circle-check',
      text: 'Czysty, gotowy teraz',
      now: true,
      later: false
    };
  }
  function search({
    from,
    to,
    guests
  }) {
    const nights = to - from,
      available = [],
      unavailable = [];
    for (const rm of state.rooms) {
      const reasons = conflicts(rm.id, from, to, guests);
      if (reasons.length) {
        unavailable.push({
          id: rm.id,
          room: rm,
          reasons
        });
        continue;
      }
      const ready = readiness(rm, from);
      available.push({
        id: rm.id,
        room: rm,
        ready,
        total: rm.price * nights,
        later: ready.later,
        spare: rm.cap - guests
      });
    }
    available.sort((a, b) => a.later - b.later || a.spare - b.spare || a.room.price - b.room.price);
    if (available.length >= 2) available[0].best = true;
    return {
      available,
      unavailable,
      nights
    };
  }
  function canCheckIn(r) {
    const show = !r.checkedIn && r.from <= TODAY && r.to > TODAY;
    if (!show) return {
      show: false,
      blocker: null
    };
    if (pendingDeparture(r.room)) return {
      show,
      blocker: 'Poprzedni gość jeszcze się nie wymeldował.'
    };
    if (room(r.room).hk === 'service') return {
      show,
      blocker: 'Pokój jest w serwisie. Oznacz go jako czysty przed meldunkiem.'
    };
    return {
      show,
      blocker: null
    };
  }
  const canCheckOut = r => r.checkedIn && !r.checkedOut && r.to === TODAY;
  function stats() {
    const active = state.rooms.filter(r => !blockActive(r, TODAY));
    const occ = new Set(state.reservations.filter(r => r.from <= TODAY && r.to > TODAY).map(r => r.room));
    return {
      active: active.length,
      occupied: active.filter(r => occ.has(r.id)).length,
      arrivals: state.reservations.filter(r => r.from === TODAY).length,
      departures: state.reservations.filter(r => r.to === TODAY).length,
      service: active.filter(r => r.hk === 'service').length,
      off: state.rooms.length - active.length
    };
  }
  function book(roomId, q, g, checkIn) {
    const id = 'r' + Date.now();
    state.reservations.push({
      id,
      first: g.first.trim(),
      last: g.last.trim(),
      phone: g.phone.trim(),
      email: (g.email || '').trim(),
      room: roomId,
      from: q.from,
      to: q.to,
      guests: q.guests,
      pay: g.pay || 'Karta',
      note: 'Walk-in',
      invoice: g.inv && g.inv.on ? {
        nip: g.inv.nip,
        company: g.inv.company.trim()
      } : null,
      checkedIn: !!checkIn,
      checkedOut: false
    });
    state.newId = id;
    emit();
    return id;
  }
  const find = id => state.reservations.find(r => r.id === id);
  function update(id, patch) {
    Object.assign(find(id), patch);
    emit();
  }
  function checkIn(id) {
    find(id).checkedIn = true;
    emit();
  }
  function checkOut(id) {
    const r = find(id);
    r.checkedOut = true;
    room(r.room).hk = 'service';
    emit();
  }
  function markClean(id) {
    room(id).hk = 'clean';
    emit();
  }
  function remove(id) {
    state.reservations = state.reservations.filter(r => r.id !== id);
    emit();
  }
  window.HM = {
    DAY,
    TODAY,
    TL_START,
    TL_DAYS,
    WD,
    MONTHS,
    fmt,
    toISO,
    fromISO,
    pln,
    dobaWord,
    doby,
    roomsWord,
    few,
    weekday,
    state,
    room,
    reset,
    subscribe,
    blockActive,
    roomState,
    resState,
    total,
    conflicts,
    readiness,
    search,
    canCheckIn,
    canCheckOut,
    stats,
    book,
    update,
    checkIn,
    checkOut,
    markClean,
    remove
  };
  reset();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/reception/data.js", error: String((e && e.message) || e) }); }

// ui_kits/reception/responsive.js
try { (() => {
window.useViewportWidth = function () {
  const [w, setW] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return w;
};
window.HMTheme = {
  get: () => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  set: t => {
    document.documentElement.dataset.theme = t;
    try {
      localStorage.setItem('hm-theme', t);
    } catch (e) {}
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/reception/responsive.js", error: String((e && e.message) || e) }); }

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.ConfirmDialog = __ds_scope.ConfirmDialog;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.StatusBadge = __ds_scope.StatusBadge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.DateField = __ds_scope.DateField;

__ds_ns.Stepper = __ds_scope.Stepper;

__ds_ns.TextField = __ds_scope.TextField;

})();
