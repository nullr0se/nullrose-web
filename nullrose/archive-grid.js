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
  const HZ=0.42;                              // horizon height — low camera, eye near the tarmac
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

  /* a minimal palm silhouette — trunk + drooping crown, neon/additive */
  const FROND=[[-0.95,-0.26],[-0.74,-0.60],[-0.32,-0.80],[0.32,-0.80],[0.74,-0.60],[0.95,-0.26]];
  function palm(x, baseY, s, a, lean){
    if(s<2) return;
    const topX=x+lean*s*0.16, topY=baseY-s*0.72;
    const col='rgba(176,124,220,'+a.toFixed(3)+')';
    ctx.strokeStyle=col; ctx.lineCap='round';
    // trunk, slight bow away from the road
    ctx.lineWidth=Math.max(0.6,s*0.05);
    ctx.beginPath(); ctx.moveTo(x,baseY);
    ctx.quadraticCurveTo(x+lean*s*0.10, baseY-s*0.36, topX, topY); ctx.stroke();
    // crown
    const len=s*0.5; ctx.lineWidth=Math.max(0.5,s*0.03);
    for(let f=0;f<FROND.length;f++){
      const dx=FROND[f][0]*len, dy=FROND[f][1]*len;
      const tx=topX+dx, ty=topY+dy;
      const cx=topX+dx*0.5, cy=topY+dy*0.5-len*0.30;   // arch up, then droop to tip
      ctx.beginPath(); ctx.moveTo(topX,topY);
      ctx.quadraticCurveTo(cx,cy,tx,ty); ctx.stroke();
    }
    // a faint coconut node at the crown
    ctx.fillStyle=col; ctx.beginPath();
    ctx.arc(topX,topY,Math.max(0.6,s*0.04),0,6.283); ctx.fill();
  }

  function frame(now){
    const dt=Math.min(0.05,(now-last)/1000); last=now;
    if(!reduce) t+=dt*0.24;                  // forward progression
    vx+=(targVX-vx)*.09; vy+=(targVY-vy)*.09; hover+=(targHover-hover)*.09;

    ctx.globalCompositeOperation='source-over';
    ctx.clearRect(0,0,W,H);
    ctx.globalCompositeOperation='lighter';  // additive → translucent neon, never opaque
    const VPx=W*vx, VPy=H*vy, base=H;        // vanishing point on the horizon (~42%), road below it
    const spread=W*0.46*(1+hover*0.12);
    const phase=t%1;

    // a soft horizon glow where the road meets the sky
    const hg=ctx.createRadialGradient(VPx,VPy,0,VPx,VPy,W*0.6);
    hg.addColorStop(0,'rgba(201,156,242,0.20)');
    hg.addColorStop(1,'rgba(201,156,242,0)');
    ctx.fillStyle=hg; ctx.fillRect(0,Math.max(0,VPy-16),W,32);

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
      const sf=u*u;                         // perspective bunching near the VP
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
      const sf=u*u;
      const y=VPy+(base-VPy)*sf;
      const xL=VPx+((W/2-spread)-VPx)*sf;
      const xR=VPx+((W/2+spread)-VPx)*sf;
      const road=xR-xL;                       // road width at this depth
      const s=Math.max(0,sf*H*1.15);          // rises nearly tile-tall as it nears the viewer
      const a=(0.12+0.5*sf)*win(u)*0.62;      // matched fade window → loops seamlessly
      palm(xL-road*pOff, y, s, a, -1);        // left shoulder, leans left
      palm(xR+road*pOff, y, s, a,  1);        // right shoulder, leans right
    }

    ctx.globalCompositeOperation='source-over';
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
