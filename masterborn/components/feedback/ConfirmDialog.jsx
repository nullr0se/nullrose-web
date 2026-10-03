import React from 'react';
import { Dialog } from './Dialog.jsx';
import { Button } from '../forms/Button.jsx';
export function ConfirmDialog({ open, title, children, confirmLabel = 'Potwierdź', cancelLabel = 'Anuluj', danger = false, onConfirm, onCancel }) {
  return (
    <Dialog open={open} title={title} onClose={onCancel} width={440}
      footer={<><Button onClick={onCancel}>{cancelLabel}</Button><Button variant={danger ? 'danger' : 'primary'} icon={danger ? 'trash-2' : 'check'} onClick={onConfirm} autoFocus>{confirmLabel}</Button></>}>
      {children}
    </Dialog>
  );
}
