/* ─────────────────────────────────────────────────────────────
   nullrose motion — the strike arrives, the barcode lives,
   collective heartbeat, meaningful register.  GSAP timeline.
   ───────────────────────────────────────────────────────────── */

/* in-cell register pulls from the brand language, not random hex */
const DOCTRINE = [
  'PURPLE IS THE VERB','WHITE IS THE NOUN','DESIGN // MOTION // SYSTEMS',
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

/* ══ logo glitch: a subtle RGB-split + clip-band shimmer (like the quote cut) ══ */
function wmGlitch(strong){
  const logo=document.getElementById('logo-svg'); if(!logo) return;
  const b=strong?1.6:1.0;                       // gentle chromatic split, no hard jumps
  const seq=[
    {f:`drop-shadow(${b}px 0 #8A4FB2) drop-shadow(-${b}px 0 #C99CF2)`, c:'inset(0 0 64% 0)',   x:strong?-0.8:-0.4},
    {f:'none',                                                          c:'inset(0 0 0 0)',     x:0},
    {f:`drop-shadow(-${(b*0.7).toFixed(1)}px 0 #8A4FB2) drop-shadow(${(b*0.7).toFixed(1)}px 0 #B47EDE)`, c:'inset(58% 0 0 0)', x:strong?0.6:0.3},
    {f:'none',                                                          c:'inset(26% 0 34% 0)', x:0},
    {f:`drop-shadow(${(b*0.5).toFixed(1)}px 0 #C99CF2)`,                c:'inset(0 0 0 0)',     x:-0.3},
    {f:'none',                                                          c:'inset(0 0 0 0)',     x:0}];
  let i=0; const iv=setInterval(()=>{
    const s=seq[i];
    logo.style.filter=s.f;
    logo.style.clipPath=s.c;
    logo.style.transform=`translateX(${s.x}px)`;
    if(++i>=seq.length){clearInterval(iv);logo.style.filter='';logo.style.clipPath='';logo.style.transform='';}
  },50);
}

/* ══ console blink: a soft CRT shimmer — dips, never a hard blackout ══ */
function consoleBlink(strong){
  const logo=document.getElementById('logo-svg'); if(!logo||!window.gsap) return;
  const seq = strong ? [0.5,1,0.28,1,0.72,1] : [0.74,1,0.88,1];
  const tl=gsap.timeline();
  seq.forEach((o,i)=> tl.set(logo,{opacity:o}, i*0.055));
  tl.add(()=>wmGlitch(strong), 0);
  tl.set(logo,{opacity:1});
  return tl;
}

/* ══ hover-rev: smoothly speed up / slow down an element's motion ══
   handles CSS animations (via WAAPI playbackRate) AND any SMIL inside an
   inner <svg> (by hand-driving the SVG clock). Ramps in on enter, out on leave. */
function attachRev(el, fast){
  if(!el) return;
  fast = fast || 3.4;
  const svg = el.querySelector('svg');
  const canSmil = !!(svg && svg.pauseAnimations && svg.setCurrentTime && svg.unpauseAnimations);
  const speed={v:1};
  let raf=0, last=0;
  const setCss=r=>{ try{ (el.getAnimations?el.getAnimations({subtree:true}):[]).forEach(a=>{ a.playbackRate=r; }); }catch(e){} };
  function loop(now){
    const dt=Math.min(0.05,(now-last)/1000); last=now;
    if(canSmil){ try{ svg.setCurrentTime(svg.getCurrentTime()+dt*speed.v); }catch(e){} }
    raf=requestAnimationFrame(loop);
  }
  function start(){ if(raf) return; if(canSmil){ try{ svg.pauseAnimations(); }catch(e){} }
    last=performance.now(); raf=requestAnimationFrame(loop); }
  function stop(){ if(raf){ cancelAnimationFrame(raf); raf=0; } if(canSmil){ try{ svg.unpauseAnimations(); }catch(e){} } }
  function ramp(to){
    if(window.gsap){
      gsap.to(speed,{v:to,duration:to>1?0.7:1.0,ease:to>1?'power2.out':'power2.inOut',overwrite:true,
        onUpdate:()=>setCss(speed.v),
        onComplete:()=>{ if(to===1){ stop(); setCss(1); } }});
    } else { speed.v=to; setCss(to); if(to===1) stop(); }
  }
  el.addEventListener('mouseenter',()=>{ start(); ramp(fast); });
  el.addEventListener('mouseleave',()=>{ ramp(1); });
}

window.addEventListener('DOMContentLoaded',()=>{
  // default to white / inverted mode
  document.documentElement.classList.add('invert');
  document.body.style.filter = 'invert(1) hue-rotate(180deg)';
  document.querySelector('[data-ctl="invert"]')?.classList.add('is-on');

  buildStream('term-navi',56,0.30,false);
  buildStream('term-derm',60,0.26,false);
  buildStream('term-mit', 52,0.32,false);
  buildStream('term-strip',90,0.40,true);
  buildBarcode();

  // wireframe sphere + checker strip: rev on hover
  attachRev(document.querySelector('.sphere-deco'));
  attachRev(document.querySelector('.checker'));

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

    function scheduleIdle(){ gsap.delayedCall(7+Math.random()*9, idle); }
    function idle(){
      const strong=Math.random()<0.2;
      consoleBlink(strong);
      fire(strong?0.55:0.32);
      if(strong) collectiveHeartbeat();
      // sometimes a faint purple charge re-warms the slash, then cools back to white
      if(Math.random()<0.4){
        gsap.timeline()
          .to(slash,{fill:PURP, filter:'drop-shadow(0 0 5px rgba(201,156,242,.6))', duration:0.22, ease:'sine.inOut'})
          .to(slash,{fill:LILAC, duration:0.14})
          .to(slash,{fill:WHITE, filter:'drop-shadow(0 0 0 rgba(201,156,242,0))', duration:0.6, ease:'power3.out'});
      }
      scheduleIdle();
    }
  }

  /* ══ off-sync collective border breathing ══ */
  const cells=[...document.querySelectorAll('.cell')];
  const breaths=[];
  cells.forEach((c)=>{
    const dur=4.6+Math.random()*2.6, delay=Math.random()*4;
    breaths.push(gsap.fromTo(c,{'--bp':0},{'--bp':1, duration:dur, delay, repeat:-1, yoyo:true, ease:'sine.inOut',
      onUpdate(){
        const v=parseFloat(getComputedStyle(c).getPropertyValue('--bp'))||0;
        c.style.borderColor=`rgba(180,126,222,${(0.16+0.34*v).toFixed(3)})`;
        c.style.boxShadow=v>0.55?`0 0 ${(14*v).toFixed(1)}px rgba(138,79,178,${(0.14*v).toFixed(3)}) inset`:'none';
      }}));
  });

  function collectiveHeartbeat(){
    cells.forEach((c,i)=>{
      gsap.delayedCall(i*0.05+Math.random()*0.1, ()=>{
        c.classList.add('fired');
        gsap.delayedCall(0.4+Math.random()*0.3, ()=>c.classList.remove('fired'));
      });
    });
  }

  /* ══ SIGNAL: every border ignites at once, holds a beat, then breathes again ══ */
  let signalLock=0;
  function signalBurst(){
    fire(1); wmGlitch(true);
    breaths.forEach(t=>t.pause());
    const id=++signalLock;
    cells.forEach(c=>{
      c.style.transition='border-color .14s ease, box-shadow .14s ease';
      c.style.borderColor='rgba(201,156,242,0.95)';
      c.style.boxShadow='0 0 26px rgba(201,156,242,.45) inset, 0 0 22px rgba(138,79,178,.5)';
      c.classList.add('fired');
    });
    // a quick second pulse so it reads as a 'signal', then release
    gsap.delayedCall(0.55,()=>{
      if(id!==signalLock) return;
      cells.forEach(c=>{ c.style.boxShadow='0 0 12px rgba(201,156,242,.22) inset'; });
    });
    gsap.delayedCall(0.9,()=>{
      if(id!==signalLock) return;
      cells.forEach(c=>{ c.classList.remove('fired'); c.style.transition=''; });
      breaths.forEach(t=>t.resume());
    });
  }

  cells.forEach(c=> c.addEventListener('mouseenter',()=>fire(0.18)));

  /* ══ masthead controls ══ */
  const root=document.documentElement;
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
        signalBurst();
        btn.classList.add('is-on'); setTimeout(()=>btn.classList.remove('is-on'),900);
      }
    });
  });
});
