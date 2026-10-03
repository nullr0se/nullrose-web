/** Confirmation step for destructive or irreversible actions (delete reservation, reset data). */
export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  /** Say exactly what will happen and to what (guest name, room). */
  children?: React.ReactNode;
  /** Verb naming the action, e.g. "Usuń rezerwację". */
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}
export declare function ConfirmDialog(props: ConfirmDialogProps): JSX.Element | null;
