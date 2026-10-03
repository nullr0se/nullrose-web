window.useViewportWidth = function () {
  const [w, setW] = React.useState(window.innerWidth);
  React.useEffect(() => { const h = () => setW(window.innerWidth); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h); }, []);
  return w;
};
window.HMTheme = {
  get: () => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  set: t => { document.documentElement.dataset.theme = t; try { localStorage.setItem('hm-theme', t); } catch (e) {} }
};
