Two-button confirmation for deleting or resetting; the confirm label repeats the verb.

```jsx
<ConfirmDialog open danger title="Usunąć rezerwację?" confirmLabel="Usuń rezerwację" onConfirm={del} onCancel={close}>
  Jan Kowalski, pokój 102, 28.12.2024 do 02.01.2025. Tej operacji nie można cofnąć.
</ConfirmDialog>
```
