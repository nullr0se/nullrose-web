/* ─────────────────────────────────────────────────────────────
   nullrose i18n — EN ⇄ PL, glitch-cut swap, persisted.
   Project names (NULLROSE / NAVISHOPPER / DERMANIUM / MADE IN TURKIC)
   are proper nouns and never translate.  Chrome + doctrine do.
   Final copy is the operator's to refine — these are sound defaults.
   ───────────────────────────────────────────────────────────── */
(function(){
  const DICT = {
    en: {
      services:'design — motion — systems',
      ethos:'<b>purple is the verb.</b> white is the noun.',
      about:'ABOUT',         about_sub:'// who is maciej',
      navi_sub:'social coverage',
      derm_sub:'brand + product // amazon',
      mit_sub:'motion',
      contact:'CONTACT',     contact_sub:'// reach',
      archive:'ARCHIVE',     archive_sub:'early work',
      systems:'SYSTEMS',
      showreel_sub:'▶ play',
    },
    pl: {
      services:'projektowanie — motion — systemy',
      ethos:'<b>fiolet to czasownik.</b> biel to rzeczownik.',
      about:'O MNIE',        about_sub:'// kim jest maciej',
      navi_sub:'obsługa social media',
      derm_sub:'marka + produkt // amazon',
      mit_sub:'motion',
      contact:'KONTAKT',     contact_sub:'// napisz',
      archive:'ARCHIWUM',    archive_sub:'wczesne prace',
      systems:'SYSTEMY',
      showreel_sub:'▶ odtwórz',
    }
  };

  const KEY='nullrose-lang';
  let lang = localStorage.getItem(KEY) || 'en';

  function paint(l){
    const d=DICT[l]||DICT.en;
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const k=el.getAttribute('data-i18n'); if(d[k]!=null) el.textContent=d[k];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el=>{
      const k=el.getAttribute('data-i18n-html'); if(d[k]!=null) el.innerHTML=d[k];
    });
    document.documentElement.lang = l;
    document.querySelectorAll('.flag').forEach(b=>{
      b.classList.toggle('is-on', b.getAttribute('data-lang')===l);
    });
  }

  function swap(l){
    if(l===lang) return;
    lang=l; localStorage.setItem(KEY,l);
    if(window.__entity) window.__entity.fire(0.45);   // a signal fires on the cut
    const frame=document.querySelector('.frame');
    frame.classList.add('cut');
    setTimeout(()=>paint(l), 90);                     // swap mid-glitch
    setTimeout(()=>frame.classList.remove('cut'), 360);
  }

  function init(){
    document.querySelectorAll('.flag').forEach(b=>{
      b.addEventListener('click',()=>swap(b.getAttribute('data-lang')));
    });
    paint(lang);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();
