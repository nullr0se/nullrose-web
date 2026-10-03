/** Labelled single-line text input. Label above, never placeholder-as-label. */
export interface TextFieldProps {
  label: string;
  /** Appends "(opcjonalnie)" to the label. Required is the default; don't mark it with asterisks. */
  optional?: boolean;
  hint?: string;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  [inputProp: string]: any;
}
export declare function TextField(props: TextFieldProps): JSX.Element;
