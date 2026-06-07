/* ─────────────────────────────────────────────────────────────
   nullrose motion — the strike arrives, the barcode lives,
   collective heartbeat, meaningful register.  GSAP timeline.
   ───────────────────────────────────────────────────────────── */

/* in-cell register pulls from the brand language, not random hex */
const DOCTRINE = [
  'PURPLE IS THE VERB','WHITE IS THE NOUN','DESIGN — MOTION — SYSTEMS',
  'THE O IS STRUCK TO NULL','∅ = NULLROSE','ONE ACCENT // NO SECOND HUE',
  'PURPLE NEVER SITS STILL','SLOW // LOW // BARELY ALIVE',
  'A DARK ENTITY ALIVE BUT BARELY','THE NULL RE-FIRES // RARE // QUIET',
  'SIGHT BEYOND SIGHT','COOL THE PURPLE TO WHITE','EST. 30.01.2026',
  'MACIEJ KWIATKOWSKI // _NULLROSE','PURPLE IS TRANSIENT',
  'WHITE IS THE RESTING STATE','THE STRIKE HAS WEIGHT',
  'COSMIC // VOID // TERMINAL','GDAŃSK // 54.35°N',
];
const REG = [
  'STRIKE → COOL → WHITE','IRIS :: BREATHING','SLASH :: DRAWN',
  'NULL :: HELD','SIGNAL :: RESTING','VOID :: 0D0D0C',
  'PULSE :: STAGGERED','FIELD :: WARPING','GRAIN :: ON','ENTITY :: AWAKE',
];
function pick(a){ return a[Math.floor(Math.random()*a.length)]; }

function buildStream(id, count, speed, useReg){
  const el=document.getElementById(id); if(!el) return;
  const src = useReg ? REG : DOCTRINE;
  const make=()=>{
    const d=document.createElement('div');
    const r=Math.random();
    d.className=(useReg?'tc':'tl')+(r<0.12?' '+(useReg?'bright':'hi'):r<0.22?(useReg?'':' dim'):'');
    d.textContent=pick(src);
    return d;
  };
  for(let i=0;i<count;i++) el.appendChild(make());
  const lineH=(useReg?7:7.5)*1.85;
  let y=0;
  (function tick(){
    y+=speed;
    if(y>=lineH){ y-=lineH; if(el.firstChild) el.removeChild(el.firstChild); el.appendChild(make()); }
    el.style.transform=`translateY(${-y}px)`;
    requestAnimationFrame(tick);
  })();
}

/* ══ a custom barcode — generated, flickering, occasionally re-scanning ══ */
function buildBarcode(){
  const bc=document.getElementById('barcode'), code=document.getElementById('barcode-code');
  if(!bc) return;
  const W=96;
  function gen(){
    bc.innerHTML='';
    let x=0;
    while(x<W){
      const w=1+Math.floor(Math.random()*4), gap=1+Math.floor(Math.random()*3);
      const bar=document.createElement('i');
      bar.style.flex='0 0 '+w+'px';
      bar.style.background=Math.random()<0.5?'var(--lilac)':'var(--purple)';
      bar.style.opacity=(0.45+Math.random()*0.55).toFixed(2);
      bc.appendChild(bar);
      const g=document.createElement('i'); g.style.flex='0 0 '+gap+'px'; bc.appendChild(g);
      x+=w+gap;
    }
  }
  gen();
  // restless flicker
  setInterval(()=>{
    const bars=bc.children; if(!bars.length) return;
    for(let k=0;k<3;k++){
      const b=bars[Math.floor(Math.random()*bars.length)];
      if(b && b.style.background) b.style.opacity=(0.3+Math.random()*0.7).toFixed(2);
    }
  },130);
  // occasional full re-scan
  setInterval(gen,4400);
  // live code readout
  const hx=()=>Math.floor(Math.random()*0xFFFF).toString(16).toUpperCase().padStart(4,'0');
  if(code) setInterval(()=>{ code.textContent='∅0x'+hx()+'·54.35N'; },1500);
}

/* ══ the wordmark glitches on impact ══ */
function wmGlitch(){
  const wm=document.getElementById('wordmark'); if(!wm) return;
  const seq=['drop-shadow(2px 0 #8A4FB2) drop-shadow(-2px 0 #B47EDE)','none',
             'drop-shadow(-1.5px 0 #8A4FB2) drop-shadow(1.5px 0 #C99CF2)','none',
             'drop-shadow(1px 0 #B47EDE)','none'];
  let i=0; const iv=setInterval(()=>{ wm.style.filter=seq[i]||'none'; if(++i>=seq.length){clearInterval(iv);wm.style.filter='none';} },42);
}

window.addEventListener('DOMContentLoaded',()=>{
  buildStream('term-navi',56,0.30,false);
  buildStream('term-derm',60,0.26,false);
  buildStream('term-mit', 52,0.32,false);
  buildStream('term-strip',90,0.40,true);
  buildBarcode();

  const slash=document.getElementById('the_slash');
  const head=document.getElementById('strike_head');
  const wm=document.getElementById('wordmark');
  const TOP=426.35, FULL=90.22, CX=286.07;
  const fire=(a)=>{ if(window.__entity) window.__entity.fire(a); };
  const PURP='#8A4FB2', LILAC='#C99CF2', WHITE='#FFFFFF';

  if(slash && head && window.gsap){
    const p={v:0};
    gsap.set(slash,{attr:{height:0}, fill:PURP, filter:'drop-shadow(0 0 9px rgba(201,156,242,.95))'});
    gsap.set(head,{attr:{r:0, cy:TOP}, fill:LILAC, filter:'drop-shadow(0 0 7px rgba(201,156,242,1))'});
    gsap.set(wm,{opacity:0});

    const draw=()=>{ slash.setAttribute('height', FULL*p.v); head.setAttribute('cy', TOP+FULL*p.v); };

    gsap.timeline({delay:0.55})
      // wordmark fades up first
      .to(wm,{opacity:1, duration:0.5, ease:'power2.out'})
      // the slash is DRAWN IN by the travelling head
      .to(head,{attr:{r:7}, duration:0.12}, '-=0.15')
      .to(p,{v:1, duration:0.40, ease:'power3.in', onUpdate:draw})
      // overshoot + settle
      .to(slash,{attr:{height:FULL+8}, duration:0.07, ease:'power2.out', onComplete:()=>head.setAttribute('cy',TOP+FULL+8)})
      .to(slash,{attr:{height:FULL}, duration:0.24, ease:'elastic.out(1,0.5)', onUpdate:()=>head.setAttribute('cy', TOP+parseFloat(slash.getAttribute('height')))})
      // impact: head flares, wordmark glitches, entity fires
      .add(()=>{ wmGlitch(); fire(0.85); })
      .to(head,{attr:{r:17}, duration:0.10, ease:'power2.out'}, '<')
      .to(head,{attr:{r:0}, duration:0.34, ease:'power3.in'})
      // cool the purple to white
      .to(slash,{fill:LILAC, duration:0.16}, '-=0.40')
      .to(slash,{fill:WHITE, filter:'drop-shadow(0 0 0 rgba(201,156,242,0))', duration:0.55, ease:'power3.out', onComplete:scheduleIdle});

    function scheduleIdle(){ gsap.delayedCall(14+Math.random()*6, idle); }
    function idle(){
      collectiveHeartbeat(); fire(0.55);
      // a purple signal travels back down the slash, then cools
      gsap.set(head,{attr:{r:5, cy:TOP}, filter:'drop-shadow(0 0 6px rgba(201,156,242,1))'});
      gsap.timeline({onComplete:scheduleIdle})
        .to(slash,{fill:PURP, filter:'drop-shadow(0 0 7px rgba(201,156,242,.85))', duration:0.18})
        .to(head,{attr:{cy:TOP+FULL}, duration:0.42, ease:'power2.inOut'}, '<')
        .add(()=>{ if(Math.random()<0.5) wmGlitch(); })
        .to(head,{attr:{r:0}, duration:0.2})
        .to(slash,{fill:LILAC, duration:0.12}, '-=0.2')
        .to(slash,{fill:WHITE, filter:'drop-shadow(0 0 0 rgba(201,156,242,0))', duration:0.55, ease:'power3.out'});
    }
  }

  /* ══ off-sync collective border breathing ══ */
  const cells=[...document.querySelectorAll('.cell')];
  cells.forEach((c)=>{
    const dur=4.6+Math.random()*2.6, delay=Math.random()*4;
    gsap.fromTo(c,{'--bp':0},{'--bp':1, duration:dur, delay, repeat:-1, yoyo:true, ease:'sine.inOut',
      onUpdate(){
        const v=parseFloat(getComputedStyle(c).getPropertyValue('--bp'))||0;
        c.style.borderColor=`rgba(180,126,222,${(0.16+0.34*v).toFixed(3)})`;
        c.style.boxShadow=v>0.55?`0 0 ${(14*v).toFixed(1)}px rgba(138,79,178,${(0.14*v).toFixed(3)}) inset`:'none';
      }});
  });

  function collectiveHeartbeat(){
    cells.forEach((c,i)=>{
      gsap.delayedCall(i*0.05+Math.random()*0.1, ()=>{
        c.classList.add('fired');
        gsap.delayedCall(0.4+Math.random()*0.3, ()=>c.classList.remove('fired'));
      });
    });
  }

  cells.forEach(c=> c.addEventListener('mouseenter',()=>fire(0.18)));
});
