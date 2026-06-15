/* ─────────────────────────────────────────────────────────────
   nullrose detail engine
   · injects hover affordances (.sheen, .enter-hint) + parallax
   · FLIP morph: tile rect → framed fullscreen panel (GSAP)
   · renders gallery / showreel / about / contact archetypes
   Copy + imagery are placeholders the operator will replace.
   ───────────────────────────────────────────────────────────── */
(function(){
  const BASE = /\/pl\/(index\.html)?$/.test(location.pathname) ? '../' : '';
  const IMG=BASE+'nullrose/img/';
  const VID=BASE+'nullrose/vid/';
  const VR=n=> (window.__resources && window.__resources['vid/'+n]) || VID+n;
  /* ── intro video hero: CRT/HUD frame, autoplays muted on enter ── */
  function heroVid(src,label){
    return `<div class="vid-hero paused" data-vid-hero>
      <div class="vh-screen">
        <video class="vh-media" src="${src}" muted loop playsinline preload="auto"></video>
        <div class="vh-scan"></div>
        <div class="vh-vig"></div>
        <i class="vh-tick tl"></i><i class="vh-tick tr"></i><i class="vh-tick bl"></i><i class="vh-tick br"></i>
        <div class="vh-play"><b></b></div>
      </div>
      <div class="vh-bar">
        <span class="vh-rec"><b></b> ${(document.documentElement.lang==='pl')?'AUTOODTWARZANIE · PĘTLA':'AUTOPLAY · LOOP'}</span>
        <span class="vh-label">${label}</span>
        <span class="vh-tc">00:00 / 00:00</span>
      </div>
    </div>`;
  }
  const POSTERS=['deftones','verstappen','dream','ae86','digital-escape'];
  // standalone-aware: prefer an inlined blob URL (window.__resources) when present
  const P=n=>{ const name=POSTERS[n%POSTERS.length];
    return (window.__resources && window.__resources[name]) || IMG+name+'.png'; };

  /* ── category data (placeholder copy) ── */
  const CAT={
    navishopper:{kind:'navigallery',idx:'02',kicker:'CASE // SOCIAL',title:'NAVI<br>SHOPPER',
      meta:'social coverage · art direction · 2024–25',
      meta_pl:'social media · kierunek artystyczny · 2024–25',
      desc:'Full-funnel social presence for a shopping-tech brand: a living system of templates, motion and art direction that scaled across launch, always-on and paid.',
      desc_pl:'Kompleksowa obecność w social mediach marki z branży shopping-tech: od startu, przez codzienne treści, po kampanie płatne. System szablonów, animacji i języka wizualnego, który rósł razem z marką.',
      tags:['social','art direction','content','carousel'],
      tags_pl:['social media','kierunek artystyczny','treści','karuzela']},
    dermanium:{kind:'dermgallery',idx:'03',kicker:'CASE // BRAND',title:'DERMA<br>NIUM',
      meta:'brand · campaign · amazon · 2025',
      meta_pl:'marka · kampania · amazon · 2025',
      desc:'Storefront, seasonal campaign and Amazon creative for a skincare line built natively for marketplace: one restrained system that survives a 200×200 thumbnail, a story frame and a shelf alike.',
      desc_pl:'Sklep, sezonowe kampanie i kreacje na Amazon dla marki dermokosmetycznej. Jeden spójny system, który równie dobrze wygląda w miniaturce 200×200, w relacjach i na półce.',
      tags:['branding','packaging','amazon','campaign','social'],
      tags_pl:['branding','opakowania','amazon','kampania','social media'], n:13, vids:[]},
    mit:{kind:'mitgallery',idx:'04',kicker:'CASE // BRAND',title:'MADE IN<br>TURKIC',
      meta:'brand · social · campaign · 2025',
      meta_pl:'marka · social media · kampania · 2025',
      desc:'Social and campaign creative for a pan-Turkic marketplace: night-side earth maps, a three-pillar geography story and a teaser carousel that trades on Silk-Road heritage.',
      desc_pl:'Materiały social i kampanijne dla platformy handlowej łączącej kraje turkijskie. Nocne mapy świata, geograficzna opowieść i karuzela-zapowiedź z motywem Jedwabnego Szlaku.',
      tags:['branding','social','campaign','data viz'],
      tags_pl:['branding','social media','kampania','wizualizacja danych'], n:10, vids:[]},
    archive:{kind:'archive',idx:'06',kicker:'INDEX // SELECTED',title:'ARCH<br>IVE',
      meta:'posters · ads · thumbnails · 2024–25',
      meta_pl:'plakaty · reklamy · miniatury · 2024–25',
      desc:'Gig posters, driving-school campaigns and travel-video thumbnails — the loose, real-world commissions between the bigger systems.',
      desc_pl:'Plakaty koncertowe, kampanie szkoły jazdy i miniatury do filmów z podróży — luźne, życiowe zlecenia pomiędzy większymi projektami.',
      tags:['posters','infographics','social','thumbnails'],
      tags_pl:['plakaty','infografiki','social','miniatury']},
    systems:{kind:'systems',idx:'07',kicker:'INDEX // SYSTEMS',title:'SYS<br>TEMS',
      meta:'brand books · 4 systems · 81 pages',
      meta_pl:'księgi marki · 4 systemy · 81 stron',
      desc:'The full brand books behind the case studies — logo systems, palettes, type and grids. Tap a stack to fan the whole thing open.',
      desc_pl:'Pełne księgi marki, które stoją za projektami: systemy znaku, palety kolorów, typografia i siatki. Kliknij w stos, żeby go rozwinąć.',
      tags:['brand books','logo','type','grids','color'],
      tags_pl:['księgi marki','logo','typografia','siatki','kolor']},
    showreel:{kind:'showreel',idx:'00',kicker:'MOTION // REEL',title:'SHOW<br>REEL',
      meta:'2025 cut · 01:48',
      desc:'A 108-second pass across the last year of motion, brand and type work.'},
    about:{kind:'about',idx:'01',kicker:'PROFILE',title:'ABOUT',
      meta:'Maciej Kwiatkowski · Gdańsk, PL'},
    contact:{kind:'contact',idx:'05',kicker:'SIGNAL',title:'CONTACT',
      meta:'open for select work · 2026'},
  };

  /* ── bilingual copy for the personal sections (operator-owned) ── */
  const LANG=()=> (document.documentElement.lang==='pl' ? 'pl' : 'en');
  /* english → polish for case-gallery labels/sections (brand-native Turkish copy left intact) */
  const PLT={
    'assets':'plików',
    // derm sections
    'Brand Store':'Sklep marki','08 March · Women’s Day':'8 marca · Dzień Kobiet','Mother’s Day':'Dzień Matki',
    'Amazon A+':'Amazon A+','Product Gallery':'Galeria produktów','Storefront Banners':'Banery sklepu',
    'Product Labels':'Etykiety produktów',
    'storefront product tiles':'kafelki produktów','wide banner + 3 stories':'szeroki baner + 3 stories',
    '3-up carousel':'karuzela · 3 obrazy','A+ content modules':'moduły treści A+',
    'square listing set':'zestaw kwadratowych zdjęć','category hero banners':'banery kategorii',
    'label / packaging design':'etykieta / projekt opakowania',
    // derm labels
    'AHA Exfoliating':'AHA złuszczające','Hyaluronic Acid':'Kwas hialuronowy','Collagen':'Kolagen','Vitamin C':'Witamina C',
    'Eye Contour':'Kontur oka','Pores Care':'Pielęgnacja porów','Ozonized':'Ozonowane','Salmon':'Łosoś',
    'Cellular Care · March 8':'Pielęgnacja komórkowa · 8 marca','Generations':'Pokolenia','Skin Memory':'Pamięć skóry','Every Day':'Każdego dnia',
    'One of a Kind':'Jedyna w swoim rodzaju','Happy Mother’s Day':'Szczęśliwego Dnia Matki','The Trio':'Trio',
    'Hyaluronic · Hero':'Hialuronowy · główny','Active Ingredients':'Składniki aktywne','Benefits':'Korzyści',
    'Eye Contour · Actives':'Kontur oka · składniki aktywne','Targets':'Działanie','Flatlay':'Flatlay','In Hand':'W dłoni',
    'Daily Routine':'Rytuał dzienny','Night Routine':'Rytuał nocny','Age Gracefully':'Piękne starzenie',
    'Lunalin · Botanical Night Ritual':'Lunalin · botaniczny rytuał nocy',
    // mit sections + labels
    'April Campaign':'Kampania kwietniowa','Instagram Carousel':'Karuzela na Instagramie',
    'three-pillar geography story':'trzyfilarowa opowieść geograficzna','teaser narrative':'narracja zapowiadająca',
    'Coming Soon':'Wkrótce'
  };
  const tx=(en,pl)=> (LANG()==='pl' ? (pl||PLT[en]||en) : en);
  const LINKEDIN='https://www.linkedin.com/in/maciej-kwiatkowski-49a28616b/';
  const COPY={
    about:{
      en:{kicker:'PROFILE', title:'ABOUT', meta:'Maciej Kwiatkowski · Gdańsk, PL', tag:'MACIEJ // GDAŃSK',
        h1:'Who am I?',
        p1:`I'm <b>Maciej Kwiatkowski</b>, 27, a millennial-zoomer hybrid running on Monster White and an outsized love for surreal art. I picked up video editing and Photoshop back in 2015, mostly to shitpost and make YouTube videos, and the craft quietly grew up alongside me.`,
        p2:`Between 2020 and 2025 I drifted through <b>journalism and PR</b>, and earned my bachelor's in Journalism from the <b>Ateneum Academy</b> here in Gdańsk. I always wanted to be a film director; for now I cope by watching every pretentious, overlong piece of avant-garde cinema I can find. And I love biking.`,
        h2:'What is Nullrose?',
        p3:`<b>Nullrose</b> is a new opening: me saying goodbye to my old life and white-collar work. It's independence, and a bold new direction in this ever-shifting world of visual media. In time, I hope it becomes a recognised mark of quality, and I'd love for you to be part of it.`,
        discH:'Disciplines', disc:['Brand identity','Motion / title design','Design systems','Art direction','Packaging'],
        cliH:'Selected work', cli:['NaviShopper','Dermanium','Made in Turkic','+ studio work'],
        toolH:'Tools', tools:['Photoshop','Illustrator','After Effects','Premiere Pro','Figma','AI tools'],
        linkH:'Elsewhere'},
      pl:{kicker:'PROFIL', title:'O MNIE', meta:'Maciej Kwiatkowski · Gdańsk, PL', tag:'MACIEJ // GDAŃSK',
        h1:'Kim jestem?',
        p1:`Nazywam się <b>Maciej Kwiatkowski</b>, mam 27 lat. Jestem dziwną hybrydą millenialsa i zoomera, napędzaną białym Monsterem i miłością do surrealistycznej sztuki. Montażu i Photoshopa uczyłem się od 2015 roku, na początku głównie po to, żeby shitpostować i nagrywać filmiki na YouTube. Z czasem te umiejętności urosły razem ze mną.`,
        p2:`W latach 2020–2025 pracowałem w dziennikarstwie i PR-ze, zrobiłem też licencjat z dziennikarstwa w gdańskiej Akademii Ateneum. Zawsze chciałem być reżyserem, odreagowuję oglądając te wszystkie pretensjonalne, francuskie czarnobiałe filmy. No i uwielbiam jeździć na rowerze.`,
        h2:'Czym jest Nullrose?',
        p3:`<b>Nullrose</b> to nowe otwarcie: pożegnanie z dawnym życiem i pracą za biurkiem. To niezależność i odważny, nowy kierunek w ciągle zmieniającym się świecie mediów wizualnych. Mam nadzieję, że z czasem stanie się rozpoznawalnym znakiem jakości. I bardzo bym chciał, żebyś był tego częścią.`,
        discH:'Specjalizacje', disc:['Identyfikacja wizualna','Motion / napisy','Systemy projektowe','Kierownictwo artystyczne','Opakowania'],
        cliH:'Wybrane prace', cli:['NaviShopper','Dermanium','Made in Turkic','+ prace studyjne'],
        toolH:'Narzędzia', tools:['Photoshop','Illustrator','After Effects','Premiere Pro','Figma','Narzędzia AI'],
        linkH:'Gdzie indziej'}
    },
    contact:{
      en:{kicker:'SIGNAL', title:'CONTACT', meta:'open for select work · 2026',
        intro:`Hi! If you'd like to commission my work, send me an email with all the details and I'm sure we can work something out. I'm open to all kinds of work.`,
        fName:'Your name', fEmail:'Your email', fMsg:'Tell me about the project', send:'Send email ↗',
        or:'or just write to', foot:['open for select work','Gdańsk, PL','CET // UTC+1']},
      pl:{kicker:'SYGNAŁ', title:'KONTAKT', meta:'otwarty na wybrane zlecenia · 2026',
        intro:`Cześć! Jeśli chcesz zlecić mi projekt, napisz do mnie maila ze wszystkimi szczegółami, a na pewno coś wspólnie wymyślimy. Jestem otwarty na różne zlecenia.`,
        fName:'Twoje imię', fEmail:'Twój e-mail', fMsg:'Opowiedz mi o projekcie', send:'Wyślij e-mail ↗',
        or:'albo napisz na', foot:['otwarty na wybrane zlecenia','Gdańsk, PL','CET // UTC+1']}
    },
    showreel:{
      en:{kicker:'MOTION // REEL', title:'SHOWREEL', meta:'work in progress :3',
        wip:'WORK IN PROGRESS', note:`The reel is being cut right now. Come back soon to see it. :3`},
      pl:{kicker:'MOTION // REEL', title:'SHOWREEL', meta:'prace w toku :3',
        wip:'PRACE W TOKU', note:`Reel jest właśnie w montażu. Zajrzyj wkrótce, żeby go zobaczyć. :3`}
    }
  };

  /* ── renderers ── */
  const esc=s=>s;
  function head(d){
    const pl=LANG()==='pl';
    const meta=pl&&d.meta_pl?d.meta_pl:d.meta;
    const desc=pl&&d.desc_pl?d.desc_pl:d.desc;
    const tags=pl&&d.tags_pl?d.tags_pl:d.tags;
    return `<header class="detail-head">
      <div class="dh-idx">[ ${d.idx} ] // ${d.kicker}</div>
      <h1 class="dh-title">${d.title}</h1>
      <div class="dh-meta">${meta}</div>
      ${desc?`<p class="dh-desc">${desc}</p>`:''}
      ${tags?`<div class="dh-tags">${tags.map(t=>`<span>${t}</span>`).join('')}</div>`:''}
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

  /* ── ARCHIVE: real selected commissions (true-colour on hover) ── */
  const ARCHB=BASE+'nullrose/img/arch/';
  const AR=n=> (window.__resources && window.__resources['arch/'+n]) || ARCHB+n+'.png';
  const ARCHIVE_ITEMS=[
    {file:'gig-extra',     t:'Extraterrestial Destruction', t_pl:'Extraterrestial Destruction',
      type:'gig poster',   type_pl:'plakat koncertowy', y:'2025'},
    {file:'autocross-info',t:'Driving Licence at 16',       t_pl:'Prawo jazdy od 16 lat',
      type:'infographic',  type_pl:'infografika', y:'2025'},
    {file:'autocross-ad',  t:'New Course · 24.04',          t_pl:'Nowy kurs · 24.04',
      type:'social ad',    type_pl:'reklama social', y:'2025'},
    {file:'armenia',       t:'Armenia',                     t_pl:'Armenia',
      type:'youtube thumbnail', type_pl:'miniatura youtube', y:'2024'},
  ];
  function renderArchive(d){
    const pl=LANG()==='pl';
    let cards='';
    ARCHIVE_ITEMS.forEach((it,i)=>{
      const num=String(i+1).padStart(2,'0');
      const title=pl?it.t_pl:it.t, type=pl?it.type_pl:it.type;
      cards+=`<div class="gcard arch" data-full="${AR(it.file)}" data-label="${title}" data-pulse>
        <span class="num">${num}</span>
        <img src="${AR(it.file)}" alt="${title}">
        <div class="gcap"><span class="t">${title}</span><span class="y">${type} · ${it.y}</span></div>
      </div>`;
    });
    return head(d)+`<div class="gallery arch-gal">${cards}</div>`;
  }

  /* ── SYSTEMS: brand books as page-stacks that fan open ── */
  const SYSB=BASE+'nullrose/img/sys/';
  const SY=(book,n)=> (window.__resources && window.__resources['sys/'+book+'/'+n]) || SYSB+book+'/'+n+'.jpg';
  const SYSTEMS=[
    {book:'derm', name:'Dermanium',     sub:'brand book',        sub_pl:'księga marki',      pages:26, tone:'#7ac943'},
    {book:'mit',  name:'Made in Turkic',sub:'brand book',        sub_pl:'księga marki',      pages:24, tone:'#23a6b8'},
    {book:'navi', name:'NaviShopper',   sub:'brand guidelines',  sub_pl:'księga znaku',      pages:23, tone:'#f08a2c'},
    {book:'sheiq',name:'SHEiQ',         sub:'brand guidelines',  sub_pl:'księga znaku',      pages:8,  tone:'#2f8f5e'},
  ];
  function renderSystems(d){
    const pl=LANG()==='pl';
    let rows='';
    SYSTEMS.forEach(s=>{
      let stack='';
      for(let k=4;k>=1;k--){ const p=String(Math.min(k,s.pages)).padStart(2,'0');
        stack+=`<span class="pg pg-${k}" style="background-image:url(${SY(s.book,p)})"></span>`; }
      let grid='';
      for(let p=1;p<=s.pages;p++){ const n=String(p).padStart(2,'0');
        grid+=`<figure class="sys-pg" data-full="${SY(s.book,n)}" data-label="${s.name} · ${n} / ${String(s.pages).padStart(2,'0')}" data-pulse>
          <img src="${SY(s.book,n)}" alt="${s.name} page ${n}" loading="lazy">
          <span class="sys-pgn">${n}</span>
        </figure>`; }
      rows+=`<section class="sys-item" data-book="${s.book}" style="--tone:${s.tone}">
        <button class="sys-row" type="button">
          <span class="sys-stack">${stack}</span>
          <span class="sys-info">
            <span class="sys-name">${s.name}</span>
            <span class="sys-sub">${pl?s.sub_pl:s.sub}</span>
          </span>
          <span class="sys-count">${s.pages} ${pl?'stron':'pages'}</span>
          <span class="sys-open"><i>${pl?'rozwiń':'open'}</i> ▾</span>
        </button>
        <div class="sys-spread"><div class="sys-grid">${grid}</div></div>
      </section>`;
    });
    return head(d)+`<div class="sys-shelf">${rows}</div>`;
  }

  const DERM=BASE+'nullrose/img/derm/';
  const DR=n=> (window.__resources && window.__resources['derm/'+n]) || DERM+n+(/\.(png|jpe?g|webp)$/i.test(n)?'':'.jpg');
  const DERM_SECTIONS=[
    {id:'A',name:'Brand Store',note:'storefront product tiles',grid:'shop',ar:'3 / 4',items:[
      ['shop-col','Collagen'],['shop-vitc','Vitamin C'],
      ['shop-eye','Eye Contour'],['shop-pore','Pores Care'],['shop-ozo','Ozonized'],['shop-sal','Salmon']]},
    {id:'A2',name:'Product Videos',note:'short-form product clips',grid:'derm-vids',ar:'1 / 1',items:[
      ['shop-aha','AHA Exfoliating',null,null,'aha'],['shop-hyalu','Hyaluronic Acid',null,null,'hyalu']]},
    {id:'B',name:'08 March · Women\u2019s Day',note:'wide banner + 3 stories',grid:'stories',ar:'9 / 16',items:[
      ['mar8-banner','Cellular Care · March 8','span-full','2 / 1'],
      ['mar8-story1','Generations'],['mar8-story2','Skin Memory'],['mar8-story3','Every Day']]},
    {id:'C',name:'Mother\u2019s Day',note:'3-up carousel',grid:'mom',ar:'4 / 5',items:[
      ['mom-1','One of a Kind'],['mom-2','Happy Mother\u2019s Day'],['mom-3','The Trio']]},
    {id:'D',name:'Amazon A+',note:'A+ content modules',grid:'aplus',ar:'1940 / 1200',items:[
      ['aplus-1','Hyaluronic · Hero'],['aplus-2','Active Ingredients'],['aplus-3','Benefits']]},
    {id:'E',name:'Product Gallery',note:'square listing set',grid:'prod',ar:'1 / 1',items:[
      ['prod-1','Eye Contour · Actives'],['prod-2','Targets'],['prod-3','Flatlay'],['prod-4','In Hand']]},
    {id:'F',name:'Storefront Banners',note:'category hero banners',grid:'banner',ar:'2 / 1',items:[
      ['banner-1','\u015eimdi Ke\u015ffet'],['banner-2','Daily Routine'],['banner-3','Night Routine'],['banner-4','Age Gracefully']]},
    {id:'G',name:'Product Labels',note:'label / packaging design',grid:'label',ar:'2480 / 3508',items:[
      ['label-lunalin.png','Lunalin · Botanical Night Ritual']]},
  ];
  function renderDermanium(d){
    let secs='';
    DERM_SECTIONS.forEach(s=>{
      let cards='';
      s.items.forEach(it=>{
        const [file,label,cls,ar,vid]=it;
        const lab=tx(label);
        if(vid){
          cards+=`<figure class="derm-card vid-card ${cls||''}" style="aspect-ratio:${ar||s.ar}" data-vid-card data-label="${lab}" data-pulse>
            <video src="${VR(vid+'.mp4')}" poster="${DR(file)}" muted loop playsinline preload="none"></video>
            <span class="vc-badge">${LANG()==='pl'?'▶ klip':'▶ clip'}</span>
            <figcaption class="derm-cap"><span>${lab}</span><b>▶</b></figcaption>
          </figure>`;
          return;
        }
        cards+=`<figure class="derm-card ${cls||''}" style="aspect-ratio:${ar||s.ar}" data-full="${DR(file)}" data-label="${lab}" data-pulse>
          <img src="${DR(file)}" alt="${lab}" loading="lazy">
          <figcaption class="derm-cap"><span>${lab}</span><b>\u2197</b></figcaption>
        </figure>`;
      });
      secs+=`<section class="derm-sec">
        <div class="derm-sec-head">
          <span class="ds-idx">${s.id}</span>
          <span class="ds-name">${tx(s.name)}</span>
          <span class="ds-note">${tx(s.note)}</span>
          <span class="ds-count">${s.items.length} ${tx('assets')}</span>
        </div>
        <div class="derm-grid grid-${s.grid}">${cards}</div>
      </section>`;
    });
    return head(d)+heroVid(VR('derm-intro.mp4'),LANG()==='pl'?'Dermanium · film marki':'Dermanium · brand film')+`<div class="derm-gal">${secs}</div>`;
  }

  /* ── MADE IN TURKIC: campaign + social, grouped by family ── */
  const MITB=BASE+'nullrose/img/mit/';
  const MR=n=> (window.__resources && window.__resources['mit/'+n]) || MITB+n+'.jpg';
  const MIT_SECTIONS=[
    {id:'A',name:'April Campaign',note:'three-pillar geography story',grid:'prod',ar:'4 / 5',items:[
      ['apr-1','\u00dcretim Merkezi \u00b7 T\u00fcrkiye'],['apr-2','Merkez \u00b7 Azerbaijan'],
      ['apr-3','B\u00fcy\u00fcyen Pazar \u00b7 Central Asia'],['apr-chart','48M$ Net Gelir Hedefi']]},
    {id:'B',name:'Instagram Carousel',note:'teaser narrative',grid:'mom',ar:'1 / 1',items:[
      ['ig-1','\u0130pek Yolu\u2019nun Miras\u0131'],['ig-3','Global Ticaretin Gelece\u011fi'],['ig-2','Coming Soon']]},
  ];
  function renderMit(d){
    let secs='';
    MIT_SECTIONS.forEach(s=>{
      let cards='';
      s.items.forEach(it=>{
        const [file,label,cls,ar]=it;
        const lab=tx(label);
        cards+=`<figure class="derm-card ${cls||''}" style="aspect-ratio:${ar||s.ar}" data-full="${MR(file)}" data-label="${lab}" data-pulse>
          <img src="${MR(file)}" alt="${lab}" loading="lazy">
          <figcaption class="derm-cap"><span>${lab}</span><b>\u2197</b></figcaption>
        </figure>`;
      });
      secs+=`<section class="derm-sec">
        <div class="derm-sec-head">
          <span class="ds-idx">${s.id}</span>
          <span class="ds-name">${tx(s.name)}</span>
          <span class="ds-note">${tx(s.note)}</span>
          <span class="ds-count">${s.items.length} ${tx('assets')}</span>
        </div>
        <div class="derm-grid grid-${s.grid}">${cards}</div>
      </section>`;
    });
    return head(d)+heroVid(VR('mit-intro.mp4'),LANG()==='pl'?'Made in Turkic · zwiastun':'Made in Turkic · teaser')+`<div class="derm-gal">${secs}</div>`;
  }

  /* ── NAVISHOPPER: instagram carousels (real client decks) ── */
  const NAVB=BASE+'nullrose/img/navi/';
  const NV=n=> (window.__resources && window.__resources['navi/'+n]) || NAVB+n+'.png';
  const NAVI_SECTIONS=[
    {id:'A',name:'E-Commerce Management',name_pl:'Zarządzanie e-commerce',
      note:'instagram carousel',note_pl:'karuzela na instagramie',ar:'4 / 5',items:[
      ['ecom-1','Makes a Difference?','Robi różnicę?'],
      ['ecom-2','Unplanned Process','Proces bez planu'],
      ['ecom-3','Professional Process','Profesjonalny proces']]},
    {id:'B',name:'Key Essentials',name_pl:'Kluczowe podstawy',
      note:'instagram carousel',note_pl:'karuzela na instagramie',ar:'4 / 5',items:[
      ['key-1','Before Building a Brand','Zanim zbudujesz markę'],
      ['key-2','Built Overnight','Z dnia na dzień'],
      ['key-3','Beyond Product Costs','Więcej niż koszty produktu'],
      ['key-4','Consistency','Konsekwencja'],
      ['key-5','Plan to Fail','Brak planu = porażka']]},
  ];
  function renderNavi(d){
    const pl=LANG()==='pl';
    let secs='';
    NAVI_SECTIONS.forEach(s=>{
      let cards='';
      s.items.forEach((it,i)=>{
        const [file,label,label_pl]=it;
        const lab=pl&&label_pl?label_pl:label;
        cards+=`<figure class="derm-card" style="aspect-ratio:${s.ar}" data-full="${NV(file)}" data-label="${lab}" data-pulse>
          <span class="num">${String(i+1).padStart(2,'0')}</span>
          <img src="${NV(file)}" alt="${lab}">
          <figcaption class="derm-cap"><span>${lab}</span><b>\u2197</b></figcaption>
        </figure>`;
      });
      secs+=`<section class="derm-sec">
        <div class="derm-sec-head">
          <span class="ds-idx">${s.id}</span>
          <span class="ds-name">${pl?s.name_pl:s.name}</span>
          <span class="ds-note">${pl?s.note_pl:s.note}</span>
          <span class="ds-swipe">${s.items.length} ${pl?'slajdów \u2014 przesuń':'slides \u2014 swipe'}</span>
        </div>
        <div class="navi-strip">${cards}</div>
      </section>`;
    });
    return head(d)+`<div class="derm-gal">${secs}</div>`;
  }

  function renderAbout(d){
    const a=COPY.about[LANG()];
    const h={idx:d.idx,kicker:a.kicker,title:a.title,meta:a.meta};
    return head(h)+`
      <div class="about-grid">
        <div class="about-portrait">
          <img class="gp-base" src="${IMG}mk.jpg" alt="Maciej Kwiatkowski">
          <img class="gp-slice gp-r" src="${IMG}mk.jpg" alt="" aria-hidden="true">
          <img class="gp-slice gp-g" src="${IMG}mk.jpg" alt="" aria-hidden="true">
          <span class="gp-scan"></span>
          <span class="tag">${a.tag}</span>
        </div>
        <div class="about-text">
          <h3 class="about-h">${a.h1}</h3>
          <p>${a.p1}</p>
          <p>${a.p2}</p>
          <h3 class="about-h">${a.h2}</h3>
          <p>${a.p3}</p>
          <div class="about-cols">
            <div><h4>${a.discH}</h4><ul>${a.disc.map(x=>`<li>${x}</li>`).join('')}</ul></div>
            <div><h4>${a.cliH}</h4><ul>${a.cli.map(x=>`<li>${x}</li>`).join('')}</ul></div>
            <div><h4>${a.toolH}</h4><ul>${a.tools.map(x=>`<li>${x}</li>`).join('')}</ul></div>
            <div><h4>${a.linkH}</h4><ul><li><a href="${LINKEDIN}" target="_blank" rel="noopener">LinkedIn ↗</a></li></ul></div>
          </div>
        </div>
      </div>`;
  }
  function renderContact(d){
    const c=COPY.contact[LANG()];
    const h={idx:d.idx,kicker:c.kicker,title:c.title,meta:c.meta};
    return head(h)+`
      <div class="contact-wrap">
        <p class="contact-intro">${c.intro}</p>
        <form class="contact-form" id="cf" novalidate>
          <div class="cf-grid">
            <input class="cf-in" name="name" type="text" placeholder="${c.fName}" autocomplete="name">
            <input class="cf-in" name="email" type="email" placeholder="${c.fEmail}" autocomplete="email">
          </div>
          <textarea class="cf-in cf-area" name="msg" rows="4" placeholder="${c.fMsg}"></textarea>
          <button class="cf-send" type="submit">${c.send}</button>
        </form>
        <div class="contact-or">${c.or}</div>
        <a class="big-email" href="mailto:mk@nullrose.com">mk@nullrose.com</a>
        <div class="contact-rows">
          <a href="${LINKEDIN}" target="_blank" rel="noopener"><span class="ch-name">LinkedIn</span><span class="ch-h">/maciej-kwiatkowski ↗</span></a>
        </div>
        <div class="contact-foot">
          <span class="live">${c.foot[0]}</span>
          <span>54.35°N 18.65°E</span><span>${c.foot[1]}</span><span>${c.foot[2]}</span>
        </div>
      </div>`;
  }
  function renderShowreel(d){
    const s=COPY.showreel[LANG()];
    const h={idx:d.idx,kicker:s.kicker,title:s.title,meta:s.meta};
    return head(h)+`
      <div class="reel-wip" data-pulse>
        <div class="reel-wip-glow"></div>
        <span class="wip-tag">${s.wip} :3</span>
        <p>${s.note}</p>
      </div>`;
  }
  const RENDER={gallery:renderGallery,dermgallery:renderDermanium,mitgallery:renderMit,navigallery:renderNavi,archive:renderArchive,systems:renderSystems,showreel:renderShowreel,about:renderAbout,contact:renderContact};

  /* ── DOM refs ── */
  const layer=document.getElementById('detail-layer');
  const scrim=document.getElementById('detail-scrim');
  const panel=document.getElementById('detail-panel');
  const body=panel.querySelector('.detail-body');
  const scroll=panel.querySelector('.detail-scroll');
  const closeBtn=document.getElementById('detail-close');
  let origin=null, openKey=null, animating=false, aboutGlitchT=null, vidObserver=null;

  function teardownVideos(){ if(vidObserver){ vidObserver.disconnect(); vidObserver=null; } }
  function wireVideos(){
    teardownVideos();
    const fmt=t=>{ t=Math.max(0,t||0); const m=Math.floor(t/60),s=Math.floor(t%60);
      return String(m).padStart(2,'0')+':'+String(s).padStart(2,'0'); };
    // intro hero — autoplay muted on enter, click to pause, button to unmute
    const hero=body.querySelector('[data-vid-hero]');
    if(hero){
      const v=hero.querySelector('.vh-media'), screen=hero.querySelector('.vh-screen');
      const tc=hero.querySelector('.vh-tc');
      const sync=()=>hero.classList.toggle('paused',v.paused);
      v.addEventListener('play',sync); v.addEventListener('pause',sync);
      v.addEventListener('timeupdate',()=>{ if(tc) tc.textContent=fmt(v.currentTime)+' / '+fmt(v.duration); });
      screen.addEventListener('click',()=>{ v.paused?v.play():v.pause(); });
      const go=()=>{ const p=v.play(); if(p&&p.catch) p.catch(()=>{}); };
      if(v.readyState>=2) go(); else v.addEventListener('loadeddata',go,{once:true});
    }
    // inline product clips — play while scrolled into view, pause when out
    const clips=[...body.querySelectorAll('.vid-card video')];
    if(clips.length){
      vidObserver=new IntersectionObserver(es=>es.forEach(en=>{
        if(en.isIntersecting){ const p=en.target.play(); if(p&&p.catch) p.catch(()=>{}); }
        else en.target.pause();
      }),{root:scroll,threshold:.35});
      clips.forEach(v=>vidObserver.observe(v));
    }
  }

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
    wireVideos();
    clearTimeout(aboutGlitchT);
    if(key==='about'){
      aboutGlitchT=setTimeout(()=>{
        const p=body.querySelector('.about-portrait'); if(!p) return;
        p.classList.remove('big-glitch'); void p.offsetWidth; p.classList.add('big-glitch');
        if(window.__entity) window.__entity.fire(0.85);
        setTimeout(()=>p.classList.remove('big-glitch'),700);
      },2000);
    }

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
      .fromTo('.detail-head, .vid-hero, .gallery, .derm-gal, .reel-stage, .reel-chapters, .about-grid, .contact-wrap',
        {opacity:0,y:22},{opacity:1,y:0,duration:.5,stagger:.06,ease:'power2.out'},'-=0.28')
      .to(closeBtn,{opacity:1,duration:.3},'-=0.4');
  }

  function close(){
    if(animating||!openKey||!origin) return;
    animating=true;
    clearTimeout(aboutGlitchT);
    teardownVideos();
    body.querySelectorAll('video').forEach(v=>{ try{ v.pause(); }catch(e){} });
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

  /* ── DERMANIUM lightbox (true-colour zoom + prev/next) ── */
  const lb=document.createElement('div'); lb.id='derm-lb';
  lb.innerHTML=`<button class="lb-x" type="button">CLOSE \u2715</button>
    <button class="lb-nav lb-prev" type="button" aria-label="Previous">\u2039</button>
    <div class="lb-stage"><img alt=""><span class="lb-cap"></span><span class="lb-count"></span></div>
    <button class="lb-nav lb-next" type="button" aria-label="Next">\u203a</button>`;
  document.body.appendChild(lb);
  const lbImg=lb.querySelector('img'), lbCap=lb.querySelector('.lb-cap'), lbCount=lb.querySelector('.lb-count');
  let lbList=[], lbIdx=0;
  function lbShow(i){
    if(!lbList.length) return;
    lbIdx=(i+lbList.length)%lbList.length;
    const c=lbList[lbIdx];
    lbImg.src=c.getAttribute('data-full');
    lbImg.alt=c.getAttribute('data-label')||'';
    lbCap.textContent=c.getAttribute('data-label')||'';
    lbCount.textContent=String(lbIdx+1).padStart(2,'0')+' / '+String(lbList.length).padStart(2,'0');
  }
  function lbOpen(card){
    const scope=card.closest('.sys-grid')||body;
    lbList=[...scope.querySelectorAll('[data-full]:not(.vid-card)')];
    const i=lbList.indexOf(card); if(i<0) return;
    lbShow(i); lb.classList.add('open');
    if(window.__entity) window.__entity.fire(0.4);
  }
  function lbClose(){ lb.classList.remove('open'); lbImg.src=''; }
  lb.addEventListener('click',e=>{
    if(e.target.closest('.lb-next')){ lbShow(lbIdx+1); return; }
    if(e.target.closest('.lb-prev')){ lbShow(lbIdx-1); return; }
    if(e.target.closest('.lb-x')||!e.target.closest('.lb-stage')) lbClose();
  });
  window.addEventListener('keydown',e=>{
    if(!lb.classList.contains('open')) return;
    if(e.key==='Escape'){ lbClose(); e.stopImmediatePropagation(); }
    else if(e.key==='ArrowRight'){ lbShow(lbIdx+1); e.stopImmediatePropagation(); }
    else if(e.key==='ArrowLeft'){ lbShow(lbIdx-1); e.stopImmediatePropagation(); }
  },true);
  function toggleSys(item){
    if(!item) return;
    const spread=item.querySelector('.sys-spread');
    const lab=item.querySelector('.sys-open i');
    const pl=LANG()==='pl';
    if(item.classList.contains('open')){
      gsap.to(spread,{height:0,duration:.45,ease:'power3.inOut',onComplete:()=>item.classList.remove('open')});
      if(lab) lab.textContent=pl?'rozwiń':'open';
    } else {
      // close any other open system first
      body.querySelectorAll('.sys-item.open').forEach(o=>{ if(o!==item){
        const sp=o.querySelector('.sys-spread'); const l=o.querySelector('.sys-open i');
        gsap.to(sp,{height:0,duration:.4,ease:'power3.inOut',onComplete:()=>o.classList.remove('open')});
        if(l) l.textContent=pl?'rozwiń':'open';
      }});
      item.classList.add('open');
      gsap.fromTo(spread,{height:0},{height:'auto',duration:.55,ease:'power3.inOut'});
      gsap.fromTo(item.querySelectorAll('.sys-pg'),{opacity:0,y:16},{opacity:1,y:0,stagger:.022,duration:.4,delay:.08,ease:'power2.out'});
      if(lab) lab.textContent=pl?'zwiń':'close';
      if(window.__entity) window.__entity.fire(0.5);
    }
  }
  body.addEventListener('click',e=>{
    const row=e.target.closest('.sys-row'); if(!row) return;
    toggleSys(row.closest('.sys-item'));
  });
  body.addEventListener('click',e=>{
    const card=e.target.closest('.derm-card, .gcard.arch, .sys-pg'); if(!card) return;
    if(card.classList.contains('vid-card')){
      const v=card.querySelector('video'); if(v){ v.paused?v.play():v.pause(); }
      return;
    }
    lbOpen(card);
  });

  // pulse feedback on inner media (placeholder for real video)
  body.addEventListener('click',e=>{
    const m=e.target.closest('[data-pulse]'); if(!m) return;
    if(window.__entity) window.__entity.fire(0.4);
    gsap.fromTo(m,{filter:'brightness(1.4)'},{filter:'brightness(1)',duration:.5,ease:'power2.out'});
  });

  // contact form → compose an email to mk@nullrose.com (static-site friendly)
  body.addEventListener('submit',e=>{
    const f=e.target.closest('#cf'); if(!f) return;
    e.preventDefault();
    const g=n=>(f.querySelector('[name="'+n+'"]')?.value||'').trim();
    const name=g('name'), email=g('email'), msg=g('msg');
    const subject=encodeURIComponent('Nullrose // '+(name||'commission'));
    const body=encodeURIComponent((msg||'')+'\n\n'+(name||'')+(email?' ('+email+')':''));
    if(window.__entity) window.__entity.fire(0.7);
    location.href='mailto:mk@nullrose.com?subject='+subject+'&body='+body;
  });

  // keep an open personal panel in sync when the language flips
  // keep an open panel's chrome in sync when the language flips
  const I18N_KEYS={about:1,contact:1,showreel:1,navishopper:1,dermanium:1,mit:1,archive:1,systems:1};
  new MutationObserver(()=>{
    if(openKey && I18N_KEYS[openKey] && !animating){
      const d=CAT[openKey]; const st=scroll.scrollTop;
      body.innerHTML=(RENDER[d.kind]||renderGallery)(d);
      scroll.scrollTop=st;
      wireVideos();
    }
  }).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});

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
