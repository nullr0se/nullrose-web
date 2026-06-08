/* ─────────────────────────────────────────────────────────────
   nullrose detail engine
   · injects hover affordances (.sheen, .enter-hint) + parallax
   · FLIP morph: tile rect → framed fullscreen panel (GSAP)
   · renders gallery / showreel / about / contact archetypes
   Copy + imagery are placeholders the operator will replace.
   ───────────────────────────────────────────────────────────── */
(function(){
  const BASE = /\/pl\/?$/.test(location.pathname) ? '../' : '';
  const IMG=BASE+'nullrose/img/';
  const POSTERS=['deftones','verstappen','dream','ae86','digital-escape'];
  // standalone-aware: prefer an inlined blob URL (window.__resources) when present
  const P=n=>{ const name=POSTERS[n%POSTERS.length];
    return (window.__resources && window.__resources[name]) || IMG+name+'.png'; };

  /* ── category data (placeholder copy) ── */
  const CAT={
    navishopper:{kind:'gallery',idx:'02',kicker:'CASE // SOCIAL',title:'NAVI<br>SHOPPER',
      meta:'social coverage · art direction · 2024—25',
      desc:'Full-funnel social presence for a shopping-tech brand — a living system of templates, motion and art direction that scaled across launch, always-on and paid.',
      tags:['social','art direction','content','motion'], n:11, vids:[2,7]},
    dermanium:{kind:'gallery',idx:'03',kicker:'CASE // BRAND',title:'DERMA<br>NIUM',
      meta:'brand + product · amazon · 2025',
      desc:'Identity, packaging and storefront for a skincare line built natively for marketplace — a restrained system that survives a 200×200 thumbnail and a shelf alike.',
      tags:['branding','packaging','amazon','product'], n:13, vids:[4]},
    mit:{kind:'gallery',idx:'04',kicker:'CASE // MOTION',title:'MADE IN<br>TURKIC',
      meta:'motion · titles · 2024',
      desc:'A motion language and title sequence for a cultural platform — type in space, kinetic grids, and a palette that holds its nerve in the dark.',
      tags:['motion','3d','type','titles'], n:10, vids:[0,5]},
    archive:{kind:'gallery',idx:'06',kicker:'INDEX // EARLY',title:'ARCH<br>IVE',
      meta:'selected early work · 2019—23',
      desc:'Posters, studies and experiments — the sketchbook the rest of this came from.',
      tags:['posters','studies','type','misc'], n:14, vids:[]},
    systems:{kind:'gallery',idx:'07',kicker:'INDEX // SYSTEMS',title:'SYS<br>TEMS',
      meta:'design systems · specimens',
      desc:'Tokens, grids and type specimens — the underlying machinery behind the work.',
      tags:['systems','tokens','grids','type'], n:9, vids:[]},
    showreel:{kind:'showreel',idx:'00',kicker:'MOTION // REEL',title:'SHOW<br>REEL',
      meta:'2025 cut · 01:48',
      desc:'A 108-second pass across the last year of motion, brand and type work.'},
    about:{kind:'about',idx:'01',kicker:'PROFILE',title:'ABOUT',
      meta:'Maciej Kwiatkowski · Gdańsk, PL'},
    contact:{kind:'contact',idx:'05',kicker:'SIGNAL',title:'CONTACT',
      meta:'open for select work · 2026'},
  };

  /* ── renderers ── */
  const esc=s=>s;
  function head(d){
    return `<header class="detail-head">
      <div class="dh-idx">[ ${d.idx} ] // ${d.kicker}</div>
      <h1 class="dh-title">${d.title}</h1>
      <div class="dh-meta">${d.meta}</div>
      ${d.desc?`<p class="dh-desc">${d.desc}</p>`:''}
      ${d.tags?`<div class="dh-tags">${d.tags.map(t=>`<span>${t}</span>`).join('')}</div>`:''}
    </header>`;
  }
  const HEIGHTS=[null,null,null]; // natural for posters (varied already)
  function renderGallery(d){
    const vids=d.vids||[];
    let cards='';
    for(let i=0;i<d.n;i++){
      const num=String(i+1).padStart(2,'0');
      if(vids.includes(i)){
        const dur=['00:24','01:12','00:48','02:03','00:36'][i%5];
        cards+=`<div class="gcard video" data-pulse>
          <img src="${P(i)}" alt="">
          <span class="dur">▶ ${dur}</span>
          <div class="play"><b></b></div>
          <div class="gcap"><span class="t">sequence ${num}</span><span class="y">mov</span></div>
        </div>`;
      }else{
        const yr=2019+((i*5+3)%7);
        cards+=`<div class="gcard" data-pulse>
          <span class="num">${num}</span>
          <img src="${P(i)}" alt="">
          <div class="gcap"><span class="t">plate ${num}</span><span class="y">${yr}</span></div>
        </div>`;
      }
    }
    return head(d)+`<div class="gallery">${cards}</div>`;
  }
  function renderShowreel(d){
    return head(d)+`
      <div class="reel-stage" data-pulse>
        <img src="${P(0)}" alt="">
        <div class="scrim"></div>
        <div class="reel-play"><b></b></div>
        <div class="reel-bar"><span class="tc">00:38</span><div class="track"><i></i></div><span class="tc">01:48</span></div>
      </div>
      <div class="reel-chapters">
        <div class="ch"><b>01</b>MOTION</div>
        <div class="ch"><b>02</b>BRAND</div>
        <div class="ch"><b>03</b>TYPE IN SPACE</div>
        <div class="ch"><b>04</b>3D / RENDER</div>
        <div class="ch"><b>05</b>TITLES</div>
      </div>`;
  }
  function renderAbout(d){
    return head(d)+`
      <div class="about-grid">
        <div class="about-portrait"><img src="${P(2)}" alt="Maciej Kwiatkowski"><span class="tag">MACIEJ // GDAŃSK</span></div>
        <div class="about-text">
          <p>I'm <b>Maciej Kwiatkowski</b> — a designer working across <b>design, motion and systems</b> from Gdańsk. I build brands that behave: identities with a pulse, motion with intent, and the quiet systems that hold them together.</p>
          <p>The work tends toward the <b>restrained and cinematic</b> — one accent, a lot of void, and rhythm doing the heavy lifting. Less surface, more behaviour. Purple is the verb; white is the noun.</p>
          <div class="about-cols">
            <div><h4>Disciplines</h4><ul><li>Brand identity</li><li>Motion / title design</li><li>Design systems</li><li>Art direction</li><li>Packaging</li></ul></div>
            <div><h4>Selected clients</h4><ul><li>NaviShopper</li><li>Dermanium</li><li>Made in Turkic</li><li>+ studio work</li></ul></div>
            <div><h4>Elsewhere</h4><ul><li><a href="#">Instagram ↗</a></li><li><a href="#">Behance ↗</a></li><li><a href="#">Are.na ↗</a></li><li><a href="#">Read.cv ↗</a></li></ul></div>
          </div>
        </div>
      </div>`;
  }
  function renderContact(d){
    return head(d)+`
      <div class="contact-wrap">
        <a class="big-email" href="mailto:hello@nullrose.com">hello@nullrose.com</a>
        <div class="contact-rows">
          <a href="#"><span class="ch-name">Instagram</span><span class="ch-h">@_nullrose ↗</span></a>
          <a href="#"><span class="ch-name">Behance</span><span class="ch-h">/maciejk ↗</span></a>
          <a href="#"><span class="ch-name">Are.na</span><span class="ch-h">/nullrose ↗</span></a>
          <a href="#"><span class="ch-name">LinkedIn</span><span class="ch-h">/in/maciejk ↗</span></a>
        </div>
        <div class="contact-foot">
          <span class="live">available for select work</span>
          <span>54.35°N 18.65°E</span><span>Gdańsk, PL</span><span>CET // UTC+1</span>
        </div>
      </div>`;
  }
  const RENDER={gallery:renderGallery,showreel:renderShowreel,about:renderAbout,contact:renderContact};

  /* ── DOM refs ── */
  const layer=document.getElementById('detail-layer');
  const scrim=document.getElementById('detail-scrim');
  const panel=document.getElementById('detail-panel');
  const body=panel.querySelector('.detail-body');
  const scroll=panel.querySelector('.detail-scroll');
  const closeBtn=document.getElementById('detail-close');
  let origin=null, openKey=null, animating=false;

  const PAD=()=> (window.innerWidth>860?22:0);

  function open(cell,key){
    if(animating||openKey) return;
    const d=CAT[key]; if(!d) return;
    animating=true; openKey=key; origin=cell;
    cell.classList.add('opening');

    const r=cell.getBoundingClientRect();
    body.innerHTML=(RENDER[d.kind]||renderGallery)(d);
    panel.className='kind-'+d.kind;
    scroll.scrollTop=0;
    layer.classList.add('open'); layer.setAttribute('aria-hidden','false');
    document.documentElement.style.overflow='hidden';
    if(window.__entity) window.__entity.fire(0.7);

    gsap.set(scrim,{opacity:0});
    gsap.set(panel,{top:r.top,left:r.left,width:r.width,height:r.height,opacity:1});
    gsap.set(closeBtn,{opacity:0});

    const pad=PAD();
    gsap.to(scrim,{opacity:1,duration:.4,ease:'power2.out'});
    gsap.timeline({onComplete:()=>{
        panel.classList.add('ready');
        animating=false;
      }})
      .to(panel,{top:pad,left:pad,width:window.innerWidth-2*pad,height:window.innerHeight-2*pad,
                 duration:.62,ease:'power3.inOut'})
      .add(()=>{ panel.classList.add('ready'); },'-=0.18')
      .fromTo('.detail-head, .gallery, .reel-stage, .reel-chapters, .about-grid, .contact-wrap',
        {opacity:0,y:22},{opacity:1,y:0,duration:.5,stagger:.06,ease:'power2.out'},'-=0.28')
      .to(closeBtn,{opacity:1,duration:.3},'-=0.4');
  }

  function close(){
    if(animating||!openKey||!origin) return;
    animating=true;
    const r=origin.getBoundingClientRect();
    panel.classList.remove('ready');
    gsap.to(scrim,{opacity:0,duration:.4,ease:'power2.in'});
    gsap.to(closeBtn,{opacity:0,duration:.18});
    gsap.to(body,{opacity:0,duration:.22});
    gsap.to(panel,{top:r.top,left:r.left,width:r.width,height:r.height,duration:.5,ease:'power3.inOut',
      onComplete:()=>{
        layer.classList.remove('open'); layer.setAttribute('aria-hidden','true');
        document.documentElement.style.overflow='';
        if(origin) origin.classList.remove('opening');
        body.innerHTML=''; body.style.opacity='';
        openKey=null; origin=null; animating=false;
      }});
  }

  /* keep panel full on resize while open */
  window.addEventListener('resize',()=>{
    if(openKey&&!animating){ const pad=PAD();
      gsap.set(panel,{top:pad,left:pad,width:window.innerWidth-2*pad,height:window.innerHeight-2*pad}); }
  });

  closeBtn.addEventListener('click',close);
  scrim.addEventListener('click',close);
  window.addEventListener('keydown',e=>{ if(e.key==='Escape') close(); });

  // pulse feedback on inner media (placeholder for real video)
  body.addEventListener('click',e=>{
    const m=e.target.closest('[data-pulse]'); if(!m) return;
    if(window.__entity) window.__entity.fire(0.4);
    gsap.fromTo(m,{filter:'brightness(1.4)'},{filter:'brightness(1)',duration:.5,ease:'power2.out'});
  });

  /* ── wire tiles: hover affordances + click ── */
  function svgArrow(){return '<svg viewBox="0 0 24 24"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="9 7 17 7 17 15"/></svg>';}
  document.querySelectorAll('.cell[data-cat]').forEach(cell=>{
    // sheen
    const sheen=document.createElement('span'); sheen.className='sheen'; cell.appendChild(sheen);
    // enter hint
    const hint=document.createElement('span'); hint.className='enter-hint';
    hint.innerHTML='ENTER '+svgArrow(); cell.appendChild(hint);
    // click
    cell.addEventListener('click',()=>open(cell,cell.getAttribute('data-cat')));
    // subtle parallax on image cells
    const img=cell.querySelector('.shot img');
    if(img){
      cell.addEventListener('mousemove',e=>{
        const b=cell.getBoundingClientRect();
        const dx=((e.clientX-b.left)/b.width-.5), dy=((e.clientY-b.top)/b.height-.5);
        img.style.transform=`scale(1.075) translate(${(-dx*10).toFixed(1)}px,${(-dy*10).toFixed(1)}px)`;
      });
      cell.addEventListener('mouseleave',()=>{ img.style.transform=''; });
    }
  });
})();
