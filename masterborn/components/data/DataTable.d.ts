/**
 * Data table: 14px minimum, tabular numbers, optional row selection and "new row" highlight.
 * @startingPoint section="Data" subtitle="Reservation and room tables" viewport="700x300"
 */
export interface DataTableColumn<T = any> {
  key: string;
  label: React.ReactNode;
  align?: 'left' | 'right' | 'center';
  width?: number | string;
  render?: (row: T) => React.ReactNode;
}
export interface DataTableProps<T = any> {
  columns: DataTableColumn<T>[];
  rows: T[];
  /** Property used as React key and for selection. Default "id". */
  rowKey?: string;
  /** Makes rows clickable (hover tint + pointer). */
  onRowClick?: (row: T) => void;
  /** Selected row gets accent tint + 3px left bar. */
  selectedKey?: string | number;
  /** Freshly created row gets a light blue background. */
  highlightKey?: string | number;
  /** sunken = secondary/collapsed group (e.g. unavailable rooms). */
  tone?: 'default' | 'sunken';
  showHeader?: boolean;
  /** Shown when rows is empty. */
  empty?: React.ReactNode;
}
export declare function DataTable(props: DataTableProps): JSX.Element;
