/** Numeric +/- control for small counts (nights, guests). Faster than typing at the reception desk. */
export interface StepperProps {
  label?: string;
  value: number;
  min?: number;
  max?: number;
  /** Optional unit after the number, e.g. "os." */
  unit?: string;
  onChange?: (value: number) => void;
  style?: React.CSSProperties;
}
export declare function Stepper(props: StepperProps): JSX.Element;
