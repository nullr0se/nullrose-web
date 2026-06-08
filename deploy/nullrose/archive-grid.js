/* ─────────────────────────────────────────────────────────────
   nullrose archive grid — an infinite perspective road.
   Horizontal lines rush toward the viewer (progressing path);
   the vanishing point banks toward the cursor on hover.
   ───────────────────────────────────────────────────────────── */
(function(){
  const box=document.querySelector('.g-arch .gridblk');
  if(!box) return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

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
  let targVX=0.5, targVY=0.0, vx=0.5, vy=0.0, hover=0, targHover=0;
  cell.addEventListener('mousemove',e=>{
    const r=cv.getBoundingClientRect();
    targVX=Math.min(.82,Math.max(.18,(e.clientX-r.left)/r.width));
    targVY=Math.min(.16,Math.max(0,((e.clientY-r.top)/r.height)*0.22));
    targHover=1;
  });
  cell.addEventListener('mouseleave',()=>{ targVX=.5; targVY=0.0; targHover=0; });

  const RAILS=4, HLINES=8;
  let t=0, last=performance.now();

  function frame(now){
    const dt=Math.min(0.05,(now-last)/1000); last=now;
    if(!reduce) t+=dt*0.26;                 // forward progression
    vx+=(targVX-vx)*.09; vy+=(targVY-vy)*.09; hover+=(targHover-hover)*.09;

    ctx.globalCompositeOperation='source-over';
    ctx.clearRect(0,0,W,H);
    ctx.globalCompositeOperation='lighter';  // additive → translucent neon, never opaque
    const VPx=W*vx, VPy=H*vy, base=H;        // vanishing point anchored near the top edge
    const spread=W*0.5*(1+hover*0.12);

    // vertical rails fan from the VP down to the bottom edge
    for(let i=-RAILS;i<=RAILS;i++){
      const bx=W/2+(i/RAILS)*spread;
      const a=0.05+0.13*(1-Math.abs(i)/RAILS);
      ctx.strokeStyle='rgba(170,118,214,'+a.toFixed(3)+')';
      ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(VPx,VPy); ctx.lineTo(bx,base); ctx.stroke();
    }
    // horizontal rungs rush downward toward the viewer, looping
    const phase=t%1;
    for(let j=0;j<HLINES;j++){
      let u=(j/HLINES+phase)%1;             // 0 far(top) → 1 near(bottom)
      const sf=u*u;                         // perspective bunching near the VP
      const y=VPy+(base-VPy)*sf;
      const xL=VPx+((W/2-spread)-VPx)*sf;
      const xR=VPx+((W/2+spread)-VPx)*sf;
      const a=Math.min(1,sf*1.3)*(1-sf*0.45)*0.34;   // fade in far, ease off at the very front
      ctx.strokeStyle='rgba(188,140,232,'+a.toFixed(3)+')';
      ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(xL,y); ctx.lineTo(xR,y); ctx.stroke();
    }
    ctx.globalCompositeOperation='source-over';
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
