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

/* ══ logo glitch: RGB-split + horizontal jitter (console artefact) ══ */
function wmGlitch(strong){
  const logo=document.getElementById('logo-svg'); if(!logo) return;
  const b=strong?2.6:1.6;
  const seq=[
    `drop-shadow(${b}px 0 #8A4FB2) drop-shadow(-${b}px 0 #C99CF2)`,'none',
    `drop-shadow(-${(b*0.7).toFixed(1)}px 0 #8A4FB2) drop-shadow(${(b*0.7).toFixed(1)}px 0 #B47EDE)`,'none',
    `drop-shadow(${(b*0.5).toFixed(1)}px 0 #C99CF2)`,'none'];
  const jit=[strong?-3:-1.5,0,strong?2:1,0,-1,0];
  let i=0; const iv=setInterval(()=>{
    logo.style.filter=seq[i]||'none';
    logo.style.transform=`translateX(${jit[i]||0}px)`;
    if(++i>=seq.length){clearInterval(iv);logo.style.filter='none';logo.style.transform='';}
  },38);
}

/* ══ console blink: the whole logo flickers on/off like a CRT refresh ══ */
function consoleBlink(strong){
  const logo=document.getElementById('logo-svg'); if(!logo||!window.gsap) return;
  const seq = strong ? [0.12,1,0,1,0.4,1,0.05,1] : [0.3,1,0,1,1];
  const tl=gsap.timeline();
  seq.forEach((o,i)=> tl.set(logo,{opacity:o}, i*0.05));
  tl.add(()=>wmGlitch(strong), 0);
  tl.set(logo,{opacity:1});
  return tl;
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
    const TOPY=TOP, FLY=30;
    gsap.set(slash,{attr:{height:0, y:TOPY-FLY}, fill:PURP, filter:'drop-shadow(0 0 9px rgba(201,156,242,.95))', opacity:0});
    gsap.set(head,{attr:{r:0, cy:TOPY}, fill:LILAC, filter:'drop-shadow(0 0 7px rgba(201,156,242,1))'});
    gsap.set(wm,{opacity:1});
    gsap.set('#logo-svg',{opacity:0});

    gsap.timeline({delay:0.4})
      // terminal power-on: the wordmark flickers in
      .add(consoleBlink(true))
      .add(()=>fire(0.6))
      // the slash FLIES into the O along its own axis, glitching
      .set(slash,{opacity:1})
      .to(slash,{attr:{height:FULL, y:TOPY}, duration:0.15, ease:'power4.in',
        onUpdate(){ const t=this.progress(); slash.style.opacity = (t>0.4 && Math.random()<0.3)?0.3:1; }})
      .set(slash,{opacity:1})
      // overshoot along axis + elastic settle
      .to(slash,{attr:{height:FULL+8, y:TOPY-8}, duration:0.06, ease:'power2.out'})
      .to(slash,{attr:{height:FULL, y:TOPY}, duration:0.22, ease:'elastic.out(1,0.5)'})
      // impact: glitch burst, head flare, entity fires
      .add(()=>{ wmGlitch(true); fire(0.9); head.setAttribute('cy',TOPY+FULL); })
      .fromTo(head,{attr:{r:16}},{attr:{r:0}, duration:0.32, ease:'power3.in'})
      // cool the purple to white
      .to(slash,{fill:LILAC, duration:0.14}, '-=0.34')
      .to(slash,{fill:WHITE, filter:'drop-shadow(0 0 0 rgba(201,156,242,0))', duration:0.5, ease:'power3.out', onComplete:scheduleIdle});

    function scheduleIdle(){ gsap.delayedCall(5+Math.random()*7, idle); }
    function idle(){
      const strong=Math.random()<0.34;
      consoleBlink(strong);
      fire(strong?0.7:0.4);
      if(strong) collectiveHeartbeat();
      // sometimes a purple charge re-strikes the slash, then cools
      if(Math.random()<0.6){
        gsap.timeline()
          .to(slash,{fill:PURP, filter:'drop-shadow(0 0 7px rgba(201,156,242,.85))', duration:0.12})
          .to(slash,{fill:LILAC, duration:0.1})
          .to(slash,{fill:WHITE, filter:'drop-shadow(0 0 0 rgba(201,156,242,0))', duration:0.5, ease:'power3.out'});
      }
      scheduleIdle();
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

  /* ══ masthead controls ══ */
  const root=document.documentElement;
  const GRAIN=[0, 0.42, 0.72]; let gi=1;
  document.querySelectorAll('.ctl').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const k=btn.dataset.ctl;
      if(k==='invert'){
        const on=!root.classList.contains('invert');
        root.classList.toggle('invert', on);
        document.body.style.filter = on ? 'invert(1) hue-rotate(180deg)' : '';
        btn.classList.toggle('is-on', on);
        wmGlitch(true); fire(0.6);
      }else if(k==='signal'){
        fire(1); collectiveHeartbeat(); wmGlitch(true);
        btn.classList.add('is-on'); setTimeout(()=>btn.classList.remove('is-on'),520);
      }else if(k==='grain'){
        gi=(gi+1)%GRAIN.length;
        root.style.setProperty('--grit', GRAIN[gi]);
        if(window.__entity) window.__entity.setGrit(GRAIN[gi]);
        btn.classList.toggle('is-on', gi!==1);
        btn.querySelector('span').textContent = gi===0?'GRAIN·0':gi===2?'GRAIN·2':'GRAIN';
      }
    });
  });
});
