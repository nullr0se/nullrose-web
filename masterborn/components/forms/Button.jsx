import React from 'react';
import { Icon } from '../core/Icon.jsx';
const PAL = {
  primary: ['var(--action-primary)', 'var(--action-primary-hover)', 'var(--text-on-accent)', 'var(--action-primary)', 'var(--action-primary-hover)'],
  secondary: ['var(--surface-card)', 'var(--surface-hover)', 'var(--text-body)', 'var(--border-strong)', 'var(--border-hover)'],
  danger: ['var(--red-700)', 'var(--red-800)', 'var(--text-on-accent)', 'var(--red-700)', 'var(--red-800)'],
  'danger-quiet': ['transparent', 'var(--danger-bg)', 'var(--danger-fg)', 'transparent', 'transparent'],
  ghost: ['transparent', 'var(--surface-hover)', 'var(--text-body)', 'transparent', 'transparent']
};
export function Button({ variant = 'secondary', size = 'md', icon, children, fullWidth = false, disabled = false, type = 'button', onClick, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const [bg, bgH, fg, bd, bdH] = PAL[variant] || PAL.secondary;
  const on = hover && !disabled;
  return (
    <button type={type} disabled={disabled} onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} {...rest}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: size === 'sm' ? 'var(--control-h-sm)' : 'var(--control-h)', padding: size === 'sm' ? '0 12px' : '0 16px', width: fullWidth ? '100%' : undefined,
        borderRadius: 'var(--radius-md)', border: '1px solid ' + (on ? bdH : bd), background: on ? bgH : bg, color: fg, font: 'inherit', fontSize: size === 'sm' ? 14 : 15, fontWeight: 500, whiteSpace: 'nowrap',
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1, transition: 'background var(--dur-fast), border-color var(--dur-fast)', ...style }}>
      {icon && <Icon name={icon} />}{children}
    </button>
  );
}
