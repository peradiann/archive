(()=>{
  const logo='peradian-logo.png';
  const add=(rel,href,extra={})=>{
    let el=document.querySelector(`link[rel="${rel}"]`);
    if(!el){el=document.createElement('link');el.rel=rel;document.head.appendChild(el)}
    el.href=href;Object.assign(el,extra);
  };
  add('icon',logo,{type:'image/png'});
  add('shortcut icon',logo,{type:'image/png'});
  add('apple-touch-icon',logo,{sizes:'180x180'});
  let m=document.querySelector('meta[name="theme-color"]');
  if(!m){m=document.createElement('meta');m.name='theme-color';document.head.appendChild(m)}
  m.content='#050304';
  const og=(property,content)=>{
    let el=document.querySelector(`meta[property="${property}"]`);
    if(!el){el=document.createElement('meta');el.setAttribute('property',property);document.head.appendChild(el)}
    el.content=content;
  };
  og('og:title','Peradian Resources — Documentary Research Archive');
  og('og:description','Explore the research, sources and stories behind Peradian documentaries.');
  og('og:image',new URL(logo,location.href).href);
  og('og:type','website');
  og('og:url',location.href.split('#')[0]);
  document.title='Peradian Resources — Documentary Research Archive';
  document.querySelectorAll('a').forEach(a=>{
    const text=(a.textContent||'').trim().toLowerCase();
    const href=a.getAttribute('href')||'';
    if(text.includes('peradian web') || /rrdobhal081-blip\\.github\\.io/i.test(href)){
      a.href='https://peradiann.github.io/archive/';
    }
  });

  const style=document.createElement('style');
  style.textContent=`
    .topic-suggestion{position:relative;isolation:isolate;overflow:hidden;gap:9px!important;border-color:rgba(255,105,55,.28)!important;background:linear-gradient(135deg,rgba(255,255,255,.055),rgba(255,74,35,.09))!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.06),0 8px 28px rgba(0,0,0,.22)!important;transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease!important}
    .topic-suggestion:before{content:"";position:absolute;inset:-2px;background:linear-gradient(110deg,transparent 15%,rgba(255,255,255,.16) 42%,transparent 65%);transform:translateX(-120%);transition:transform .7s ease;z-index:-1}
    .topic-suggestion:hover{transform:translateY(-2px);border-color:rgba(255,112,65,.7)!important;box-shadow:0 12px 34px rgba(255,64,28,.16),inset 0 1px 0 rgba(255,255,255,.08)!important}
    .topic-suggestion:hover:before{transform:translateX(120%)}
    .topic-suggestion .topic-icon{position:relative;width:17px;height:17px;display:inline-grid;place-items:center;color:#ff9a72;font-size:15px;line-height:1}
    .topic-suggestion .topic-icon:before,.topic-suggestion .topic-icon:after{content:"";position:absolute;border:1px solid rgba(255,130,90,.55);border-radius:50%;inset:1px;animation:topicPulse 2.1s ease-out infinite}
    .topic-suggestion .topic-icon:after{inset:-3px;animation-delay:1.05s}
    .topic-suggestion .topic-spark{display:block;animation:topicSpark 1.8s ease-in-out infinite}
    @keyframes topicPulse{0%{transform:scale(.55);opacity:.8}100%{transform:scale(1.55);opacity:0}}
    @keyframes topicSpark{0%,100%{transform:rotate(0) scale(1);filter:brightness(1)}50%{transform:rotate(18deg) scale(1.18);filter:brightness(1.35)}}
    @media(max-width:700px){.hero .actions{gap:8px}.hero .topic-suggestion{flex-basis:auto}.topic-suggestion .topic-icon{width:15px;height:15px;font-size:13px}}
  `;
  document.head.appendChild(style);

  const heroActions=document.querySelector('.hero .actions');
  const modal=document.getElementById('suggestModal');
  if(heroActions && !document.getElementById('heroTopicSuggestion')){
    const topic=document.createElement('a');
    topic.id='heroTopicSuggestion';
    topic.className='button topic-suggestion';
    topic.href='#suggestModal';
    topic.setAttribute('aria-label','Suggest a Video Topic');
    topic.innerHTML='<span class="topic-icon" aria-hidden="true"><span class="topic-spark">✦</span></span><span>Topic Suggestion ✦</span>';
    heroActions.appendChild(topic);
    topic.addEventListener('click',e=>{
      e.preventDefault();
      if(!modal)return;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden','false');
      const input=document.getElementById('topicInput');
      setTimeout(()=>input&&input.focus(),180);
    });
  }
})();
