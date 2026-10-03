/** Date input shown as DD.MM.RRRR with a calendar popover. Never a free-text date field. */
export interface DateFieldProps {
  label?: string;
  /** ISO date "YYYY-MM-DD". Displayed as DD.MM.RRRR. */
  value: string;
  /** ISO date; days before it are disabled. */
  min?: string;
  /** ISO date marked with an outline ring. */
  today?: string;
  onChange?: (iso: string) => void;
  style?: React.CSSProperties;
}
export declare function DateField(props: DateFieldProps): JSX.Element;
export declare function formatDate(iso: string): string;
