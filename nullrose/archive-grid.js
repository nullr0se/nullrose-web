/* ─────────────────────────────────────────────────────────────
   nullrose archive grid — an infinite perspective road.
   Horizontal rungs rush toward the viewer (progressing path);
   the vanishing point banks toward the cursor on hover; and a
   looped colonnade of palms streams down both shoulders — outrun.
   ───────────────────────────────────────────────────────────── */
(function(){
  const box=document.querySelector('.g-arch .gridblk');
  if(!box) return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

  // real palm silhouette (trimmed + tinted lilac); standalone-aware
  const BASE=/\/pl\/(index\.html)?$/.test(location.pathname)?'../':'';
  const PALM_AR=0.637, PALM_BX=0.437;        // sprite aspect + trunk-base x (fraction)
  const palmImg=new Image();
  palmImg.src=(window.__resources && window.__resources['palm']) || BASE+'nullrose/img/palm.png';
  let palmReady=false; palmImg.onload=()=>{ palmReady=true; };

  box.innerHTML='<canvas></canvas>';
  box.style.opacity='1'; box.style.animation='none';
  const cv=box.querySelector('canvas');
  cv.style.cssText='width:100%;height:100%;display:block';
  const ctx=cv.getContext('2d');

  let W=1,H=1; const DPR=Math.min(window.devicePixelRatio||1,2);
  function size(){ const r=box.getBoundingClientRect();
    W=Math.max(1,r.width); H=Math.max(1,r.height);
    cv.width=Math.round(W*DPR); cv.height=Math.round(H*DPR);
    ctx.setTransform(DPR,0,0,DPR,0,0); }
  if(window.ResizeObserver){ new ResizeObserver(size).observe(box); } else { window.addEventListener('resize',size); }
  size();

  const cell=box.closest('.cell');
  const HZ=0.34;                              // horizon high in frame — camera laid flat on the tarmac
  let targVX=0.5, targVY=HZ, vx=0.5, vy=HZ, hover=0, targHover=0;
  cell.addEventListener('mousemove',e=>{
    const r=cv.getBoundingClientRect();
    targVX=Math.min(.78,Math.max(.22,(e.clientX-r.left)/r.width));
    targVY=HZ + (((e.clientY-r.top)/r.height)-0.5)*0.10;   // cursor nudges the horizon a hair
    targHover=1;
  });
  cell.addEventListener('mouseleave',()=>{ targVX=.5; targVY=HZ; targHover=0; });

  const RAILS=4, HLINES=12, PALMS=7;
  const win=u=>Math.min(1,u/0.14)*Math.min(1,(1-u)/0.14);  // 0 at both ends → seamless loop
  let t=0, last=performance.now();
  const persp=u=>u*u*u;                      // stronger foreshortening — a flat, on-the-tarmac read

  /* draw the palm sprite, anchored at its trunk base, mirrored on the left shoulder */
  function palm(x, baseY, s, a, side){
    if(!palmReady || s<4) return;
    const dh=s, dw=s*PALM_AR;
    ctx.save();
    ctx.globalCompositeOperation='source-over';   // clean silhouette, not a blown-out additive blob
    ctx.globalAlpha=Math.min(1,a);
    ctx.translate(x, baseY);
    if(side<0) ctx.scale(-1,1);              // mirror the left-hand colonnade
    ctx.drawImage(palmImg, -PALM_BX*dw, -dh, dw, dh);
    ctx.restore();
  }

  function frame(now){
    const dt=Math.min(0.05,(now-last)/1000); last=now;
    if(!reduce) t+=dt*0.24;                  // forward progression
    vx+=(targVX-vx)*.09; vy+=(targVY-vy)*.09; hover+=(targHover-hover)*.09;

    ctx.globalCompositeOperation='source-over';
    ctx.clearRect(0,0,W,H);
    ctx.globalCompositeOperation='lighter';  // additive → translucent neon, never opaque
    const VPx=W*vx, VPy=H*vy, base=H;        // vanishing point on the horizon; road runs to the bottom edge
    const spread=W*0.50*(1+hover*0.12);
    const phase=t%1;

    // vertical rails fan from the VP down to the bottom edge
    for(let i=-RAILS;i<=RAILS;i++){
      const bx=W/2+(i/RAILS)*spread;
      const a=0.05+0.12*(1-Math.abs(i)/RAILS);
      ctx.strokeStyle='rgba(170,118,214,'+a.toFixed(3)+')';
      ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(VPx,VPy); ctx.lineTo(bx,base); ctx.stroke();
    }

    // horizontal rungs rush downward toward the viewer, looping
    for(let j=0;j<HLINES;j++){
      let u=(j/HLINES+phase)%1;             // 0 far(horizon) → 1 near(viewer)
      const sf=persp(u);                    // perspective bunching near the VP
      const y=VPy+(base-VPy)*sf;
      const xL=VPx+((W/2-spread)-VPx)*sf;
      const xR=VPx+((W/2+spread)-VPx)*sf;
      const a=(0.07+0.32*sf)*win(u);        // fades in far AND out near → no seam
      ctx.strokeStyle='rgba(188,140,232,'+a.toFixed(3)+')';
      ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(xL,y); ctx.lineTo(xR,y); ctx.stroke();
    }

    // looped colonnade of palms down both shoulders of the road
    const pOff=0.55;                         // how far outside the rail they stand (× road width)
    for(let j=0;j<PALMS;j++){
      const u=(j/PALMS+phase*0.85)%1;        // drift a touch slower than the rungs
      const sf=persp(u);
      const y=VPy+(base-VPy)*sf;
      const xL=VPx+((W/2-spread)-VPx)*sf;
      const xR=VPx+((W/2+spread)-VPx)*sf;
      const road=xR-xL;                       // road width at this depth
      const s=Math.min(H*1.05, sf*H*1.7);     // sprite height — rises tall near the viewer
      const a=(0.28+0.5*sf)*win(u);          // matched fade window → loops seamlessly
      palm(xL-road*pOff, y, s, a, -1);        // left shoulder (mirrored)
      palm(xR+road*pOff, y, s, a,  1);        // right shoulder, leans right
    }

    ctx.globalCompositeOperation='source-over';
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
