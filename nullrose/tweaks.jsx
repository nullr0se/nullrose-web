/* nullrose Tweaks — open dials for the operator (handoff §10) */
const { useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "grit": 0.42,
  "heat": 0.42,
  "typeScale": 1,
  "gap": 9
}/*EDITMODE-END*/;

function NullroseTweaks(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(()=>{
    const root=document.documentElement;
    root.style.setProperty('--grit', t.grit);
    root.style.setProperty('--type-scale', t.typeScale);
    root.style.setProperty('--gap', t.gap + 'px');
    if(window.__entity){ window.__entity.setGrit(t.grit); window.__entity.setHeat(t.heat); }
  }, [t.grit, t.heat, t.typeScale, t.gap]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Grit & heat" />
      <TweakSlider label="Grain / riso" value={t.grit} min={0} max={0.9} step={0.02}
                   onChange={(v)=>setTweak('grit', v)} />
      <TweakSlider label="Entity heat" value={t.heat} min={0.15} max={1} step={0.02}
                   onChange={(v)=>setTweak('heat', v)} />
      <TweakSection label="Type & grid" />
      <TweakSlider label="Type scale" value={t.typeScale} min={0.8} max={1.6} step={0.02} unit="×"
                   onChange={(v)=>setTweak('typeScale', v)} />
      <TweakSlider label="Gutter" value={t.gap} min={2} max={20} step={1} unit="px"
                   onChange={(v)=>setTweak('gap', v)} />
      <TweakButton label="Strike the null" onClick={()=>{
        const s=document.getElementById('the_slash');
        if(window.__entity) window.__entity.fire(0.8);
        if(s && window.gsap){
          window.gsap.timeline()
            .to(s,{fill:'#8A4FB2',filter:'drop-shadow(0 0 8px rgba(201,156,242,.9))',duration:0.18})
            .to(s,{fill:'#C99CF2',duration:0.12})
            .to(s,{fill:'#FFFFFF',filter:'drop-shadow(0 0 0 rgba(201,156,242,0))',duration:0.5,ease:'power3.out'});
        }
      }} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<NullroseTweaks />);
