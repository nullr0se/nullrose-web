import React from 'react';
import { Icon } from '../core/Icon.jsx';
const DEFAULT_ICON = { ok: 'circle-check', warn: 'clock-3', busy: 'lock', off: 'wrench', info: 'log-in' };
export function StatusBadge({ tone = 'info', icon, children, style }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px 3px 8px', borderRadius: 'var(--radius-pill)', fontSize: 14, fontWeight: 500, lineHeight: 1.45, whiteSpace: 'nowrap',
      background: 'var(--status-' + tone + '-bg)', color: 'var(--status-' + tone + '-fg)', ...style }}>
      <Icon name={icon || DEFAULT_ICON[tone]} />{children}
    </span>
  );
}
