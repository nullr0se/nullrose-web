Text button for every action; one `primary` per view, `danger-quiet` for separated delete entry points, `danger` only inside a confirm dialog.

```jsx
<Button variant="primary" icon="check" type="submit">Zarezerwuj pokój 202</Button>
<Button size="sm" icon="pencil">Edytuj</Button>
<Button size="sm" variant="danger-quiet" icon="trash-2">Usuń</Button>
```

Labels are Polish verbs in sentence case ("Zarezerwuj", "Edytuj", "Anuluj"), never all caps, never icon only.
