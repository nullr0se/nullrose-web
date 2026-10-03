Centered modal with title, body and right-aligned footer; for secondary edits, not for the main walk-in flow.

```jsx
<Dialog open={open} title="Edycja rezerwacji: pokój 102" onClose={close}
  footer={<><Button onClick={close}>Anuluj</Button><Button variant="primary" icon="check">Zapisz zmiany</Button></>}>
  …fields…
</Dialog>
```
