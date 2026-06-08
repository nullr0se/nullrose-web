/* ─────────────────────────────────────────────────────────────
   nullrose entity — generated hero: an iris breathing in the void
   domain-warped void field + radial-fiber iris + ordered riso dither
   exposes window.__entity { setGrit, setHeat, fire }
   ───────────────────────────────────────────────────────────── */
(function(){
  const canvas = document.getElementById('entity-canvas');
  const gl = canvas.getContext('webgl', {antialias:false, alpha:false}) ||
             canvas.getContext('experimental-webgl');
  if(!gl){ document.body.classList.add('no-gl'); return; }

  const vert = `attribute vec2 a_pos; void main(){ gl_Position = vec4(a_pos,0.,1.); }`;

  const frag = `
  precision highp float;
  uniform float u_time, u_grit, u_heat, u_fire;
  uniform vec2  u_res, u_ptr;

  vec2 hash2(vec2 p){
    p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));
    return -1.0+2.0*fract(sin(p)*43758.5453123);
  }
  float noise(vec2 p){
    vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);
    return mix(mix(dot(hash2(i),f),dot(hash2(i+vec2(1,0)),f-vec2(1,0)),u.x),
               mix(dot(hash2(i+vec2(0,1)),f-vec2(0,1)),dot(hash2(i+vec2(1,1)),f-vec2(1,1)),u.x),u.y);
  }
  float fbm(vec2 p){
    float v=0.0,a=0.5; mat2 r=mat2(0.8,0.6,-0.6,0.8);
    for(int i=0;i<5;i++){ v+=a*noise(p); p=r*p*2.05+vec2(1.7,9.2); a*=0.5; }
    return v;
  }
  // ordered 4x4 bayer dither → riso/halftone print feel
  float bayer(vec2 c){
    int x=int(mod(c.x,4.0)), y=int(mod(c.y,4.0));
    int i=x+y*4;
    float m[16];
    m[0]=0.;m[1]=8.;m[2]=2.;m[3]=10.;
    m[4]=12.;m[5]=4.;m[6]=14.;m[7]=6.;
    m[8]=3.;m[9]=11.;m[10]=1.;m[11]=9.;
    m[12]=15.;m[13]=7.;m[14]=13.;m[15]=5.;
    float v=0.0;
    for(int k=0;k<16;k++){ if(k==i) v=m[k]; }
    return (v+0.5)/16.0;
  }

  const vec3 VOID  = vec3(0.051,0.051,0.047);
  const vec3 PURP  = vec3(0.541,0.310,0.698);
  const vec3 LILAC = vec3(0.706,0.494,0.871);
  const vec3 BRT   = vec3(0.788,0.612,0.949);

  void main(){
    vec2 res=u_res;
    float t=u_time;
    vec2 uv=gl_FragCoord.xy/res; uv.y=1.0-uv.y;

    // ── glitch boxes: small, edge-weighted, occasional (kept off the iris/content) ──
    vec2 gcell=floor(uv*vec2(20.0,26.0));
    float gt=floor(t*3.5);
    float crand=fract(sin(dot(gcell,vec2(41.3,289.1))+gt*13.7)*43758.5453);
    float edge=max(smoothstep(0.26,0.5,abs(uv.x-0.5)), smoothstep(0.30,0.5,abs(uv.y-0.5)));
    float active=step(0.955,crand)*step(0.35,edge);
    float disp=active*(fract(sin(dot(gcell,vec2(7.1,3.3))+gt)*4373.0)-0.5)*0.05;
    uv.x+=disp;

    vec2 asp=vec2(res.x/res.y,1.0);

    // focal point: behind the hero column, drifts faintly + pointer parallax
    vec2 ctr=vec2(0.40,0.50);
    ctr+=u_ptr*0.018;
    ctr+=0.012*vec2(sin(t*0.07),cos(t*0.05));

    vec2 p=(uv-ctr)*asp;
    float d=length(p);
    float ang=atan(p.y,p.x);

    // ── ambient void field ──
    vec2 q=vec2(fbm(uv*2.0+t*0.04), fbm(uv*2.0+5.2+t*0.03));
    float field=fbm(uv*1.6+2.6*q+t*0.02);
    field=clamp(field*0.5+0.5,0.0,1.0);
    float amb=smoothstep(0.55,0.92,field);

    // ── iris ── held in the void, structured, not a flood
    float breathe=0.005*sin(t*0.6);
    float rp=0.060+breathe;                 // pupil (the null)
    float ri=0.250+0.008*sin(t*0.4);        // outer iris
    // organic warp of the radius
    float warp=fbm(vec2(ang*1.7, d*5.0)+t*0.05)*0.040;
    float dr=d+warp;

    // radial fibres — crisp, so it reads as an iris not a cloud
    float fib=fbm(vec2(ang*9.0, dr*18.0 - t*0.12));
    fib+=0.55*fbm(vec2(ang*22.0, dr*11.0 + t*0.07));
    fib=fib*0.5+0.5;
    fib=pow(clamp(fib,0.0,1.0),1.4);        // bias dark → contrast
    float irisMask=smoothstep(rp,rp+0.016,dr)*(1.0-smoothstep(ri-0.05,ri,dr));
    // rose-petal lobes so it reads as a bloom, not a disc
    float petals=0.80+0.20*cos(ang*5.0 + warp*9.0 + 0.15*sin(t*0.3));
    float irisBright=irisMask*petals*(0.18+0.82*fib);
    // bright limbal ring + inner rim at pupil edge
    float ring=smoothstep(0.010,0.0,abs(dr-ri))*0.8;
    float pupilRim=smoothstep(0.014,0.0,abs(dr-rp))*0.7;
    float glow=exp(-d*9.0)*0.22;            // tight bloom, no flood

    float lum=irisBright + ring + pupilRim + glow + amb*0.16;
    // pupil = pure void (the null)
    lum*= smoothstep(rp-0.006, rp+0.010, dr)*0.97 + 0.03;

    // heartbeat / strike fire
    lum*= 1.0 + u_fire*(0.9*irisMask + 0.6*ring);

    lum=clamp(lum,0.0,1.4);

    // ── colour: void → purple → lilac → bright ──
    float h=u_heat;
    vec3 col=VOID;
    col=mix(col, PURP,  smoothstep(0.10,0.55,lum)*(0.7+0.3*h));
    col=mix(col, LILAC, smoothstep(0.50,0.85,lum));
    col=mix(col, BRT,   smoothstep(0.85,1.15,lum)*(0.5+0.5*u_fire));
    col*= 0.26 + 0.74*h;                    // overall heat / restraint
    col*= 1.0 + u_fire*0.25;

    // ── riso dither: quantise toward print ──
    float thr=bayer(gl_FragCoord.xy);
    vec3 q1=floor(col*5.0 + thr)/5.0;       // posterised + dithered
    col=mix(col, q1, clamp(u_grit,0.0,1.0)*0.55);

    // ── chromatic fringe on the limbal ring + glitch rgb-split ──
    float ringR=smoothstep(0.013,0.0,abs(dr-ri-0.005));
    float ringB=smoothstep(0.013,0.0,abs(dr-ri+0.005));
    col.r+=ringR*0.20; col.b+=ringB*0.40;   // lilac/purple fringe, not red
    col.r+=disp*4.0; col.b+=disp*4.5;        // magenta tear during a slice (on-palette)

    // vignette
    vec2 vg=uv-0.5; col*=clamp(1.0-dot(vg,vg)*1.9,0.0,1.0);

    gl_FragColor=vec4(col,1.0);
  }`;

  function sh(type,src){
    const s=gl.createShader(type); gl.shaderSource(s,src); gl.compileShader(s);
    if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)) console.warn(gl.getShaderInfoLog(s));
    return s;
  }
  const prog=gl.createProgram();
  gl.attachShader(prog,sh(gl.VERTEX_SHADER,vert));
  gl.attachShader(prog,sh(gl.FRAGMENT_SHADER,frag));
  gl.linkProgram(prog); gl.useProgram(prog);

  const buf=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,buf);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
  const loc=gl.getAttribLocation(prog,'a_pos');
  gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);

  const U={
    time:gl.getUniformLocation(prog,'u_time'),
    res:gl.getUniformLocation(prog,'u_res'),
    ptr:gl.getUniformLocation(prog,'u_ptr'),
    grit:gl.getUniformLocation(prog,'u_grit'),
    heat:gl.getUniformLocation(prog,'u_heat'),
    fire:gl.getUniformLocation(prog,'u_fire'),
  };

  const state={ grit:0.5, heat:0.42, fire:0, ptr:{x:0,y:0}, ptrT:{x:0,y:0} };

  window.addEventListener('mousemove',e=>{
    state.ptrT.x=(e.clientX/window.innerWidth -0.5)*2;
    state.ptrT.y=(e.clientY/window.innerHeight-0.5)*2;
  },{passive:true});

  // cap DPR for mid-range phones (perf bar in handoff §8)
  const DPR=Math.min(window.devicePixelRatio||1, 1.75);
  function resize(){
    canvas.width =Math.floor(window.innerWidth *DPR);
    canvas.height=Math.floor(window.innerHeight*DPR);
    gl.viewport(0,0,canvas.width,canvas.height);
  }
  window.addEventListener('resize',resize); resize();

  const t0=performance.now();
  function loop(){
    const t=(performance.now()-t0)*0.001;
    state.ptr.x+=(state.ptrT.x-state.ptr.x)*0.04;
    state.ptr.y+=(state.ptrT.y-state.ptr.y)*0.04;
    state.fire*=0.93;
    gl.uniform1f(U.time,t);
    gl.uniform2f(U.res,canvas.width,canvas.height);
    gl.uniform2f(U.ptr,state.ptr.x,state.ptr.y);
    gl.uniform1f(U.grit,state.grit);
    gl.uniform1f(U.heat,state.heat);
    gl.uniform1f(U.fire,state.fire);
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
    requestAnimationFrame(loop);
  }
  loop();

  window.__entity={
    setGrit:v=>state.grit=v,
    setHeat:v=>state.heat=v,
    fire:(amt)=>{ state.fire=Math.min(1, state.fire + (amt==null?1:amt)); },
  };
})();
