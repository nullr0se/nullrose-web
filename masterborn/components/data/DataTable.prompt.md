Column-driven table for reservations and room availability; prices are plain semibold ink, never link-coloured.

```jsx
<DataTable rowKey="id" rows={rooms} selectedKey={sel} onRowClick={r => setSel(r.id)} columns={[
  { key: 'id', label: 'Pokój' },
  { key: 'ready', label: 'Gotowość', render: r => <StatusBadge tone="ok">Posprzątany, gotowy</StatusBadge> },
  { key: 'total', label: 'Suma za pobyt', align: 'right', render: r => <b>{r.total} PLN</b> },
]} />
```

Use `tone="sunken"` + `showHeader={false}` for a collapsed secondary group under the main table.
