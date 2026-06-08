/* ─────────────────────────────────────────────────────────────
   nullrose ripple — the empty tiles answer the cursor.
   A water-drip field: rings bloom from the pointer and chase it
   across ABOUT / CONTACT / SYSTEMS / SHOWREEL. Purple, additive,
   barely-there. One shared rAF; idle tiles cost nothing.
   ───────────────────────────────────────────────────────────── */
(function(){
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce) return;
  const SEL='.g-about,.g-contact,.g-sys,.g-reel';
  const DPR=Math.min(window.devicePixelRatio||1,2);
  const tiles=[];

  document.querySelectorAll(SEL).forEach(cell=>{
    const cv=document.createElement('canvas');
    cv.className='ripple-cv';
    cell.insertBefore(cv, cell.firstChild);
    const ctx=cv.getContext('2d');
    const T={cell,cv,ctx,W:1,H:1,rings:[],px:-1,py:-1,inside:false,
             lastDrip:0,lastX:0,lastY:0,active:false};

    function size(){ const r=cell.getBoundingClientRect();
      T.W=Math.max(1,r.width); T.H=Math.max(1,r.height);
      cv.width=Math.round(T.W*DPR); cv.height=Math.round(T.H*DPR);
      ctx.setTransform(DPR,0,0,DPR,0,0); }
    if(window.ResizeObserver) new ResizeObserver(size).observe(cell); else window.addEventListener('resize',size);
    size();

    function drip(x,y,strength){
      // a water drip = two rings, the second a beat behind
      T.rings.push({x,y,r:2,max:26+strength*30,born:performance.now(),life:760+strength*260,w:1.2});
      T.rings.push({x,y,r:0,max:18+strength*22,born:performance.now()+95,life:680,w:0.8});
      T.active=true;
    }

    cell.addEventListener('pointermove',e=>{
      const r=cv.getBoundingClientRect();
      const x=e.clientX-r.left, y=e.clientY-r.top;
      T.px=x; T.py=y; T.inside=true; T.active=true;
      const now=performance.now();
      const moved=Math.hypot(x-T.lastX,y-T.lastY);
      // shed a drip as the cursor travels — denser the faster it moves
      if(now-T.lastDrip>90 && moved>5){
        drip(x,y,Math.min(1,moved/40));
        T.lastDrip=now; T.lastX=x; T.lastY=y;
      }
    });
    cell.addEventListener('pointerenter',e=>{
      const r=cv.getBoundingClientRect();
      drip(e.clientX-r.left, e.clientY-r.top, 0.5);
    });
    cell.addEventListener('pointerleave',()=>{ T.inside=false; });
    tiles.push(T);
  });

  if(!tiles.length) return;

  function frame(now){
    for(const T of tiles){
      if(!T.active){ continue; }
      const ctx=T.ctx;
      ctx.clearRect(0,0,T.W,T.H);
      ctx.globalCompositeOperation='lighter';

      // the pointer's own glow — the drop sitting on the surface
      if(T.inside && T.px>=0){
        const g=ctx.createRadialGradient(T.px,T.py,0,T.px,T.py,16);
        g.addColorStop(0,'rgba(201,156,242,0.34)');
        g.addColorStop(1,'rgba(201,156,242,0)');
        ctx.fillStyle=g;
        ctx.beginPath(); ctx.arc(T.px,T.py,16,0,6.283); ctx.fill();
      }

      // rings
      for(let i=T.rings.length-1;i>=0;i--){
        const r=T.rings[i];
        const p=(now-r.born)/r.life;
        if(p<0) continue;            // delayed second ring not yet born
        if(p>=1){ T.rings.splice(i,1); continue; }
        const rad=r.r+(r.max-r.r)*(1-Math.pow(1-p,2));   // ease-out expansion
        const a=(1-p)*0.5;
        ctx.strokeStyle='rgba(138,79,178,'+a.toFixed(3)+')';
        ctx.lineWidth=r.w;
        ctx.beginPath(); ctx.arc(r.x,r.y,rad,0,6.283); ctx.stroke();
        // inner brighter lip
        ctx.strokeStyle='rgba(201,156,242,'+(a*0.6).toFixed(3)+')';
        ctx.lineWidth=r.w*0.5;
        ctx.beginPath(); ctx.arc(r.x,r.y,rad*0.86,0,6.283); ctx.stroke();
      }

      ctx.globalCompositeOperation='source-over';
      // settle: once nothing's left and the cursor's gone, do one final clear and idle
      if(!T.inside && T.rings.length===0){
        ctx.clearRect(0,0,T.W,T.H);
        T.active=false;
      }
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
