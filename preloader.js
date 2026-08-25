(()=>{
  if(window.__PERADIAN_PRELOADER__)return;
  window.__PERADIAN_PRELOADER__=true;

  const style=document.createElement('style');
  style.id='peradian-preloader-style';
  style.textContent=`
    html{background:#050304!important;}
    body{background:#050304!important;}
    #peradian-preloader{
      position:fixed;inset:0;z-index:2147483647;
      display:grid;place-items:center;
      background:#050304;
      opacity:1;visibility:visible;pointer-events:auto;
      transition:opacity .35s ease,visibility .35s ease;
      overflow:hidden;
    }
    #peradian-preloader.is-done{opacity:0;visibility:hidden;pointer-events:none;}
    #peradian-preloader::before{
      content:"";position:absolute;inset:-20%;
      background:radial-gradient(circle at 50% 48%,rgba(255,55,25,.13),transparent 30%),radial-gradient(circle at 50% 100%,rgba(255,55,25,.06),transparent 45%);
      filter:blur(12px);
    }
    .peradian-loader-logo{
      position:relative;width:92px;height:92px;object-fit:contain;
      filter:drop-shadow(0 0 28px rgba(255,72,38,.14));
      animation:peradianLogoPulse 1.8s ease-in-out infinite;
    }
    .peradian-loader-wordmark{
      position:absolute;top:calc(50% + 66px);left:50%;transform:translateX(-50%);
      color:#f5f2ee;font:800 11px/1 Inter,Arial,sans-serif;letter-spacing:3.5px;
      white-space:nowrap;
    }
    .peradian-loader-track{
      position:absolute;left:0;top:0;width:100%;height:3px;
      background:rgba(255,255,255,.06);
      transform:translateZ(0);
    }
    .peradian-loader-bar{
      width:0;height:100%;
      background:linear-gradient(90deg,#ff2d1b,#ff4b25,#ff6b32);
      box-shadow:0 0 14px rgba(255,55,30,.7),0 0 28px rgba(255,55,30,.25);
      transition:width .3s ease;
    }
    @keyframes peradianLogoPulse{0%,100%{transform:scale(.96);opacity:.78}50%{transform:scale(1);opacity:1}}
    @media(prefers-reduced-motion:reduce){
      .peradian-loader-logo{animation:none}
      #peradian-preloader{transition:none}
    }
  `;
  (document.head||document.documentElement).appendChild(style);

  const loader=document.createElement('div');
  loader.id='peradian-preloader';
  loader.setAttribute('aria-label','Loading Peradian');
  loader.innerHTML=`<div class="peradian-loader-track"><div class="peradian-loader-bar"></div></div><img class="peradian-loader-logo" src="peradian-logo.png" alt="Peradian"><div class="peradian-loader-wordmark">PERADIAN</div>`;
  (document.body||document.documentElement).appendChild(loader);

  const bar=loader.querySelector('.peradian-loader-bar');
  let progress=8;
  const tick=setInterval(()=>{
    progress=Math.min(progress+(78-progress)*.13,86);
    if(bar)bar.style.width=progress+'%';
  },120);

  let finished=false;
  const finish=()=>{
    if(finished)return;
    finished=true;
    clearInterval(tick);
    if(bar)bar.style.width='100%';
    loader.classList.add('is-done');
    // Remove the loader completely so the red line can never remain during scrolling.
    setTimeout(()=>{
      loader.remove();
      style.remove();
    },420);
  };

  if(document.readyState==='complete')setTimeout(finish,120);
  else window.addEventListener('load',finish,{once:true});

  // Scrolling is never a loading state. If the visitor starts scrolling before
  // the page load event finishes, immediately remove the loader and its line.
  window.addEventListener('scroll',finish,{once:true,passive:true});
  window.addEventListener('touchmove',finish,{once:true,passive:true});
  window.addEventListener('pageshow',e=>{if(e.persisted)finish()},{once:true});
})();
