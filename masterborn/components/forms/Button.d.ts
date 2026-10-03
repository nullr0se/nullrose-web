/**
 * Text button. Actions are always described with words; icon is optional and leading.
 * @startingPoint section="Forms" subtitle="Primary, secondary, danger and quiet buttons" viewport="700x260"
 */
export interface ButtonProps {
  /** primary = the one main action in a view; danger = confirm a destructive action inside a dialog; danger-quiet = the separated "Usuń" entry point in tables. */
  variant?: 'primary' | 'secondary' | 'danger' | 'danger-quiet' | 'ghost';
  /** md = 44px (forms), sm = 34px (table rows, header). */
  size?: 'md' | 'sm';
  /** Leading Lucide icon name. */
  icon?: string;
  children?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
  [key: string]: any;
}
export declare function Button(props: ButtonProps): JSX.Element;
