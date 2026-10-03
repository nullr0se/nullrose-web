/** Modal dialog for secondary tasks (editing a reservation). Primary tasks like walk-in stay on the page, never in a modal. */
export interface DialogProps {
  open: boolean;
  title: string;
  children?: React.ReactNode;
  /** Buttons, right-aligned. */
  footer?: React.ReactNode;
  onClose?: () => void;
  width?: number;
}
export declare function Dialog(props: DialogProps): JSX.Element | null;
