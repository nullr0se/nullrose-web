import React from 'react';
const pascal = s => s.replace(/(^|-)([a-z0-9])/g, (_, __, c) => c.toUpperCase());
export function Icon({ name, size = 16, strokeWidth = 2, color = 'currentColor', label, style }) {
  const lib = typeof window !== 'undefined' && window.lucide && window.lucide.icons;
  let node = lib && lib[pascal(name)];
  if (node && node[0] === 'svg') node = node[2];
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round', style: { flex: 'none', display: 'block', ...style }, 'aria-hidden': label ? undefined : true, role: label ? 'img' : undefined, 'aria-label': label };
  return <svg {...props}>{(node || []).map(([tag, attrs], i) => React.createElement(tag, { key: i, ...attrs }))}</svg>;
}
