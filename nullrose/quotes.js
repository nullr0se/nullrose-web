/* ─────────────────────────────────────────────────────────────
   nullrose quotes — the ethos line is alive. Every 15s it cuts
   to the next aphorism on beauty (and a couple darker ones), in
   the active language, with a short glitch. Owns .ethos outright,
   so i18n no longer paints it (data-i18n-html was removed).
   Operator: edit, reorder, or extend the QUOTES list freely.
   ───────────────────────────────────────────────────────────── */
(function(){
  const el=document.querySelector('.ethos');
  if(!el) return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 10 lines on beauty — Romantics, a couple of harder edges (Camus, Nietzsche). */
  const QUOTES=[
    {en:['Beauty is nothing but the beginning of terror.','R. M. Rilke'],
     pl:['Piękno jest jedynie początkiem grozy.','R. M. Rilke']},
    {en:['Beauty will save the world.','F. Dostoevsky'],
     pl:['Piękno zbawi świat.','F. Dostojewski']},
    {en:['Beauty is unbearable, and drives us to despair.','A. Camus'],
     pl:['Piękno jest nie do zniesienia i wpędza nas w rozpacz.','A. Camus']},
    {en:['We have art in order not to die of the truth.','F. Nietzsche'],
     pl:['Mamy sztukę, by nie umrzeć od prawdy.','F. Nietzsche']},
    {en:['The beautiful is always strange.','C. Baudelaire'],
     pl:['Piękno jest zawsze osobliwe.','C. Baudelaire']},
    {en:['Beauty is truth, truth beauty.','J. Keats'],
     pl:['Piękno jest prawdą, prawda pięknem.','J. Keats']},
    {en:['There is no love of life without despair of life.','A. Camus'],
     pl:['Nie ma miłości do życia bez rozpaczy życia.','A. Camus']},
    {en:['We see things not as they are, but as we are.','A. Nin'],
     pl:['Widzimy rzeczy nie takimi, jakie są, lecz jakimi my jesteśmy.','A. Nin']},
    {en:['Beauty is the only thing that time cannot harm.','O. Wilde'],
     pl:['Piękno to jedyna rzecz, której czas nie może zniszczyć.','O. Wilde']},
    {en:['Mirrors should reflect a little before throwing back images.','J. Cocteau'],
     pl:['Lustra powinny się zastanowić, zanim odbiją obraz.','J. Cocteau']},
  ];

  const lang=()=> (document.documentElement.lang==='pl' ? 'pl' : 'en');
  const html=(q)=>{ const v=q[lang()]; return '“'+v[0]+'”<cite>'+v[1]+'</cite>'; };

  let i=0;
  el.innerHTML=html(QUOTES[0]);   // claim the line from the static markup

  function show(n){
    i=((n%QUOTES.length)+QUOTES.length)%QUOTES.length;
    const next=html(QUOTES[i]);
    if(reduce){ el.innerHTML=next; return; }
    el.classList.add('q-glitch');
    if(window.__entity) window.__entity.fire(0.32);  // a small signal on the cut
    setTimeout(()=>{ el.innerHTML=next; }, 150);
    setTimeout(()=>{ el.classList.remove('q-glitch'); }, 360);
  }

  // re-render the current quote when the language flips (keeps i18n in step)
  new MutationObserver(()=>{ el.innerHTML=html(QUOTES[i]); })
    .observe(document.documentElement,{attributes:true,attributeFilter:['lang']});

  let timer=setInterval(()=>show(i+1), 15000);
  // pause the cycle while the line is hovered/read; resume on leave
  el.addEventListener('mouseenter',()=>{ clearInterval(timer); });
  el.addEventListener('mouseleave',()=>{ clearInterval(timer); timer=setInterval(()=>show(i+1),15000); });
})();
