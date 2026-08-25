(()=>{
  if(window.__PERADIAN_PRELOADER__)return;
  window.__PERADIAN_PRELOADER__=true;

  const logoURL=new URL('peradian-logo.png',location.href).href;
  const preload=document.createElement('link');
  preload.rel='preload';
  preload.as='image';
  preload.href=logoURL;
  preload.setAttribute('fetchpriority','high');
  (document.head||document.documentElement).appendChild(preload);

  const style=document.createElement('style');
  style.id='peradian-preloader-style';
  style.textContent=`
    html{background:#050304!important;}
    body{background:#050304!important;}
    #peradian-preloader{position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;background:#050304;opacity:1;visibility:visible;pointer-events:auto;transition:opacity .42s ease,visibility .42s ease;overflow:hidden;}
    #peradian-preloader.is-done{opacity:0;visibility:hidden;pointer-events:none;}
    #peradian-preloader:before{content:"";position:absolute;inset:-25%;background:radial-gradient(circle at 50% 45%,rgba(255,69,32,.17),transparent 25%),radial-gradient(circle at 50% 75%,rgba(255,45,20,.08),transparent 42%);filter:blur(16px);}
    #peradian-preloader:after{content:"";position:absolute;inset:0;background:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px);background-size:100% 5px;opacity:.18;pointer-events:none;}
    .peradian-loader-center{position:relative;z-index:2;width:min(360px,82vw);display:flex;flex-direction:column;align-items:center;text-align:center;}
    .peradian-loader-mark{position:relative;width:132px;height:132px;display:grid;place-items:center;margin-bottom:28px;}
    .peradian-loader-ring{position:absolute;inset:0;border:1px solid rgba(255,255,255,.13);border-radius:50%;box-shadow:0 0 55px rgba(255,62,30,.1);}
    .peradian-loader-ring:before{content:"";position:absolute;inset:-7px;border:1px solid rgba(255,91,45,.13);border-radius:50%;border-top-color:#ff6236;animation:peradianRing 1.5s linear infinite;}
    .peradian-loader-logo-shell{width:88px;height:88px;border-radius:24px;display:grid;place-items:center;background:rgba(8,5,6,.72);border:1px solid rgba(255,255,255,.12);box-shadow:0 18px 60px rgba(0,0,0,.55),0 0 40px rgba(255,70,35,.13);overflow:hidden;}
    .peradian-loader-fallback{position:absolute;color:#f5f2ee;font:900 52px/1 Arial,sans-serif;letter-spacing:-5px;opacity:.92;}
    .peradian-loader-logo{position:relative;width:72px;height:72px;object-fit:contain;z-index:2;opacity:0;transition:opacity .25s ease;filter:drop-shadow(0 0 22px rgba(255,72,38,.22));}
    .peradian-loader-logo.is-ready{opacity:1;}
    .peradian-loader-title{color:#f5f2ee;font:800 13px/1 Inter,Arial,sans-serif;letter-spacing:5px;margin:0 0 8px;}
    .peradian-loader-subtitle{color:#7f7874;font:500 8px/1.4 Inter,Arial,sans-serif;letter-spacing:2.2px;text-transform:uppercase;margin:0 0 28px;}
    .peradian-loader-meta{width:100%;display:flex;justify-content:space-between;align-items:center;color:#6f6864;font:600 8px/1 Inter,Arial,sans-serif;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:8px;}
    .peradian-loader-percent{color:#d8d2ce;}
    .peradian-loader-track{width:100%;height:2px;border-radius:99px;background:rgba(255,255,255,.07);overflow:hidden;box-shadow:inset 0 0 8px rgba(0,0,0,.45);}
    .peradian-loader-bar{width:0;height:100%;border-radius:99px;background:linear-gradient(90deg,#ff301c,#ff6030,#ff8a42);box-shadow:0 0 16px rgba(255,66,32,.75);transition:width .24s ease;}
    .peradian-loader-status{margin-top:12px;color:#55504d;font:500 8px/1.4 Inter,Arial,sans-serif;letter-spacing:1px;}
    @keyframes peradianRing{to{transform:rotate(360deg)}}
    @media(prefers-reduced-motion:reduce){#peradian-preloader{transition:none}.peradian-loader-ring:before{animation:none}}
  `;
  (document.head||document.documentElement).appendChild(style);

  const loader=document.createElement('div');
  loader.id='peradian-preloader';
  loader.setAttribute('aria-label','Loading Peradian');
  loader.innerHTML=`<div class="peradian-loader-center"><div class="peradian-loader-mark"><div class="peradian-loader-ring"></div><div class="peradian-loader-logo-shell"><span class="peradian-loader-fallback">P</span><img class="peradian-loader-logo" src="${logoURL}" alt="Peradian"></div></div><div class="peradian-loader-title">PERADIAN</div><div class="peradian-loader-subtitle">Documentary Research Archive</div><div class="peradian-loader-meta"><span>Initializing archive</span><span class="peradian-loader-percent">0%</span></div><div class="peradian-loader-track"><div class="peradian-loader-bar"></div></div><div class="peradian-loader-status">Preparing your research experience</div></div>`;
  (document.body||document.documentElement).appendChild(loader);

  const logo=loader.querySelector('.peradian-loader-logo');
  const markReady=()=>logo&&logo.classList.add('is-ready');
  if(logo){
    if(logo.complete)markReady();
    else logo.addEventListener('load',markReady,{once:true});
  }

  const optimizeImages=()=>document.querySelectorAll('img').forEach(img=>{
    img.decoding='async';
    const src=img.currentSrc||img.getAttribute('src')||'';
    if(src.includes('peradian-logo.png')){img.fetchPriority='high';img.loading='eager';}
    else if(!img.hasAttribute('loading')){img.loading='lazy';img.fetchPriority='low';}
  });
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',optimizeImages,{once:true});else optimizeImages();

  const bar=loader.querySelector('.peradian-loader-bar');
  const percent=loader.querySelector('.peradian-loader-percent');
  const status=loader.querySelector('.peradian-loader-status');
  const messages=['Preparing your research experience','Loading Peradian archive','Rendering the workspace','Almost ready'];
  let progress=4, messageIndex=0;
  const tick=setInterval(()=>{
    progress=Math.min(progress+(88-progress)*.12,88);
    if(bar)bar.style.width=progress+'%';
    if(percent)percent.textContent=Math.round(progress)+'%';
    if(status&&progress>28&&messageIndex===0){messageIndex=1;status.textContent=messages[1];}
    if(status&&progress>58&&messageIndex===1){messageIndex=2;status.textContent=messages[2];}
    if(status&&progress>78&&messageIndex===2){messageIndex=3;status.textContent=messages[3];}
  },110);

  let finished=false;
  const finish=()=>{
    if(finished)return;
    finished=true;
    clearInterval(tick);
    if(bar)bar.style.width='100%';
    if(percent)percent.textContent='100%';
    if(status)status.textContent='Archive ready';
    loader.classList.add('is-done');
    setTimeout(()=>{loader.remove();style.remove();preload.remove();},460);
  };

  if(document.readyState==='complete')setTimeout(finish,120);else window.addEventListener('load',finish,{once:true});
  window.addEventListener('scroll',finish,{once:true,passive:true});
  window.addEventListener('touchmove',finish,{once:true,passive:true});
  window.addEventListener('pageshow',e=>{if(e.persisted)finish()},{once:true});
})();
