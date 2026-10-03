export interface IconProps {
  /** Lucide icon name in kebab-case, e.g. "calendar", "circle-check", "log-in". Requires the Lucide UMD script on the page. */
  name: string;
  /** Pixel size. Default 16. */
  size?: number;
  strokeWidth?: number;
  color?: string;
  /** Accessible label. Omit for decorative icons (status badges always carry text next to the icon). */
  label?: string;
  style?: React.CSSProperties;
}
export declare function Icon(props: IconProps): JSX.Element;
