import React from 'react';
function Row({ row, columns, onClick, selected, highlighted, tone }) {
  const [hover, setHover] = React.useState(false);
  const bg = selected ? 'var(--surface-selected)' : highlighted ? 'var(--surface-new)' : hover && onClick ? 'var(--blue-25)' : tone === 'sunken' ? 'var(--surface-sunken)' : 'transparent';
  return (
    <tr onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      {columns.map((c, i) => (
        <td key={c.key} style={{ padding: tone === 'sunken' ? '10px 16px' : '13px 16px', borderBottom: '1px solid var(--border-default)', background: bg, textAlign: c.align || 'left', verticalAlign: 'middle', width: c.width, color: tone === 'sunken' ? 'var(--text-secondary)' : 'var(--text-body)',
          boxShadow: selected && i === 0 ? 'inset 3px 0 0 var(--action-primary)' : 'none' }}>
          {c.render ? c.render(row) : row[c.key]}
        </td>
      ))}
    </tr>
  );
}
export function DataTable({ columns, rows, rowKey = 'id', onRowClick, selectedKey, highlightKey, tone = 'default', showHeader = true, empty }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, lineHeight: 1.45, fontVariantNumeric: 'tabular-nums' }}>
      {showHeader && <thead><tr>{columns.map(c => <th key={c.key} style={{ textAlign: c.align || 'left', fontWeight: 600, fontSize: 14, color: 'var(--text-secondary)', padding: '10px 16px', borderBottom: '1px solid var(--border-default)', background: 'var(--surface-sunken)', whiteSpace: 'nowrap' }}>{c.label}</th>)}</tr></thead>}
      <tbody>
        {rows.length === 0 && empty ? <tr><td colSpan={columns.length} style={{ padding: '18px 16px', color: 'var(--text-secondary)' }}>{empty}</td></tr> :
          rows.map(r => <Row key={r[rowKey]} row={r} columns={columns} tone={tone} selected={selectedKey != null && r[rowKey] === selectedKey} highlighted={highlightKey != null && r[rowKey] === highlightKey} onClick={onRowClick ? () => onRowClick(r) : undefined} />)}
      </tbody>
    </table>
  );
}
