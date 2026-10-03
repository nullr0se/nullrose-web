Date picker button with a Polish month calendar; the only way to enter dates (one format: DD.MM.RRRR).

```jsx
<DateField label="Przyjazd" value="2024-12-28" min="2024-12-28" today="2024-12-28" onChange={setFrom} />
```

Also exports `formatDate(iso)` → "28.12.2024" for displaying dates elsewhere.
