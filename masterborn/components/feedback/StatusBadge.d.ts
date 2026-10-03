/**
 * Status pill: always icon + text, never colour alone.
 * @startingPoint section="Feedback" subtitle="Room and reservation statuses" viewport="700x200"
 */
export interface StatusBadgeProps {
  /** ok = ready/available, warn = needs attention or partial (gotowy od 14:00, wolny tylko do), busy = occupied, off = out of service / not applicable, info = arrival / neutral highlight. */
  tone?: 'ok' | 'warn' | 'busy' | 'off' | 'info';
  /** Lucide icon name; each tone has a default. */
  icon?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function StatusBadge(props: StatusBadgeProps): JSX.Element;
