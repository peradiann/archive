(()=>{
  const logo='peradian-logo.png';
  const add=(rel,href,extra={})=>{let el=document.querySelector(`link[rel="${rel}"]`);if(!el){el=document.createElement('link');el.rel=rel;document.head.appendChild(el)}el.href=href;Object.assign(el,extra)};
  add('icon',logo,{type:'image/png'});add('shortcut icon',logo,{type:'image/png'});add('apple-touch-icon',logo,{sizes:'180x180'});
  let m=document.querySelector('meta[name="theme-color"]');if(!m){m=document.createElement('meta');m.name='theme-color';document.head.appendChild(m)}m.content='#050304';
  const og=(property,content)=>{let el=document.querySelector(`meta[property="${property}"]`);if(!el){el=document.createElement('meta');el.setAttribute('property',property);document.head.appendChild(el)}el.content=content};
  og('og:title','Peradian Resources — Documentary Research Archive');og('og:description','Explore the research, sources and stories behind Peradian documentaries.');og('og:image',new URL(logo,location.href).href);og('og:type','website');og('og:url',location.href.split('#')[0]);document.title='Peradian Resources — Documentary Research Archive';
  document.querySelectorAll('a').forEach(a=>{const text=(a.textContent||'').trim().toLowerCase();const href=a.getAttribute('href')||'';if(text.includes('peradian web')||/rrdobhal081-blip\.github\.io/i.test(href))a.href='https://peradiann.github.io/archive/'});

  const wrap=document.querySelector('#documentaries .wrap');const firstCase=wrap?.querySelector('.case');
  if(wrap&&firstCase&&!document.getElementById('case-002')){const article=document.createElement('article');article.className='case';article.id='case-002';article.dataset.search='002 the mystery of japanese folklore japanese folklore culture mystery history case 002';article.innerHTML=`<div class="num">002</div><div><h3>The Mystery of Japanese Folklore</h3><div class="meta">Research archive · Sources available · Case 002</div><a class="smallbtn" href="case-002the-mystery-of-japanese-folklore(1)pdf.pdf" target="_blank" rel="noopener">View Research PDF ↗</a><a class="smallbtn" href="https://youtube.com/@peradiann?si=t7XTuLBd3xRZQ4Nj" target="_blank" rel="noopener">Peradian YouTube ↗</a></div><div class="thumb"><img src="japanese-folklore.jpg" alt="The Mystery of Japanese Folklore"></div>`;firstCase.before(article)}

  const searchBox=document.getElementById('searchBox');const empty=document.getElementById('empty');
  const runArchiveSearch=()=>{if(!searchBox||!wrap)return;const q=searchBox.value.trim().toLowerCase();const active=document.querySelector('.cat.active')?.dataset.filter||'all';const cards=[...wrap.querySelectorAll('.case')];let visible=0;cards.forEach(card=>{const text=(card.dataset.search||'').toLowerCase();const ok=(active==='all'||text.includes(active))&&(!q||text.includes(q));card.style.display=ok?'grid':'none';if(ok)visible++});if(empty)empty.style.display=visible?'none':'block'};
  searchBox?.addEventListener('input',runArchiveSearch);document.querySelectorAll('.cat').forEach(cat=>cat.addEventListener('click',()=>setTimeout(runArchiveSearch,0)));runArchiveSearch();
  const researchCount=document.querySelector('.dashcard strong');if(researchCount)researchCount.textContent='002';const factCount=document.querySelector('.fact strong');if(factCount)factCount.textContent='02';

  function ensureTopicSuggestion(){const heroActions=document.querySelector('.hero .actions');if(!heroActions||document.getElementById('topicSuggestionHero'))return;const btn=document.createElement('button');btn.id='topicSuggestionHero';btn.className='button';btn.type='button';btn.setAttribute('aria-label','Suggest a Video Topic');btn.setAttribute('data-topic-suggestion','true');btn.innerHTML=`<span style="display:inline-grid;place-items:center;width:16px;height:16px;margin-right:7px;color:#ff7448;font-size:16px;line-height:1">✦</span><span>Topic Suggestion</span>`;btn.style.cursor='pointer';btn.style.position='relative';btn.style.zIndex='10';btn.style.whiteSpace='nowrap';btn.style.touchAction='manipulation';btn.addEventListener('click',()=>{const modal=document.getElementById('suggestModal');if(modal){modal.classList.add('open');modal.setAttribute('aria-hidden','false');setTimeout(()=>document.getElementById('topicInput')?.focus(),250)}});heroActions.appendChild(btn)}
  ensureTopicSuggestion();window.addEventListener('DOMContentLoaded',ensureTopicSuggestion,{once:true});window.addEventListener('load',ensureTopicSuggestion,{once:true});setTimeout(ensureTopicSuggestion,250);setTimeout(ensureTopicSuggestion,1000);

  function fixFounderPhoto(){const img=document.querySelector('.founder-photo');if(!img)return;const asset='https://peradiann.github.io/archive/pradip.jpg';if(img.src!==asset)img.src=asset;img.removeAttribute('srcset');img.loading='eager';img.decoding='async';img.fetchPriority='high';img.style.objectFit='cover';img.style.objectPosition='center 8%';img.style.background='#070707';img.style.padding='0';img.alt='Pradeep Rajput — Founder of Peradian';img.onerror=()=>{const raw='https://raw.githubusercontent.com/peradiann/archive/main/pradip.jpg';if(img.src!==raw)img.src=raw}};

  function fixThumbnailLoading(){
    const cards=[...document.querySelectorAll('.case')];
    cards.forEach((card,index)=>{
      const img=card.querySelector('.thumb img');
      if(!img)return;
      img.decoding='async';
      img.removeAttribute('srcset');
      img.style.display='block';
      img.style.width='100%';
      img.style.height='100%';
      if(index===0){img.loading='eager';img.fetchPriority='high'}else{img.loading='lazy';img.fetchPriority='low'}
    });
    const first=cards[0]?.querySelector('.thumb img');
    if(first){
      const href=first.currentSrc||first.src;
      if(href&&!document.querySelector('link[data-peradian-thumb-preload]')){
        const preload=document.createElement('link');preload.rel='preload';preload.as='image';preload.href=href;preload.fetchPriority='high';preload.setAttribute('data-peradian-thumb-preload','true');document.head.appendChild(preload)
      }
    }
  }

  function fixArchiveVisuals(){
    if(!document.getElementById('peradian-visual-fixes')){
      const style=document.createElement('style');style.id='peradian-visual-fixes';style.textContent=`
        html{background:#050304!important;min-height:100%;overscroll-behavior-y:none}
        body{background-color:#050304!important;min-height:100vh;overscroll-behavior-y:none}
        main,footer{background-color:transparent}
        .case{content-visibility:auto;contain-intrinsic-size:360px}
        .thumb{contain:layout paint;isolation:isolate}
        .founder{display:grid!important;grid-template-columns:190px minmax(0,1fr)!important;grid-auto-flow:row!important;gap:12px 26px!important;align-items:start!important;margin:0 0 40px!important;padding:20px!important}
        .founder>div:not(.founder-photo){display:contents!important}
        .founder-photo{grid-column:1!important;grid-row:1 / span 3!important;width:190px!important;height:238px!important;min-width:190px!important;min-height:238px!important;aspect-ratio:4/5!important;object-fit:cover!important;object-position:center 8%!important;padding:0!important;background:#070707!important;border-radius:22px!important;align-self:start!important}
        .founder-kicker{grid-column:2!important;grid-row:1!important;align-self:start!important;margin:4px 0 0!important}
        .founder h3{grid-column:2!important;grid-row:2!important;align-self:start!important;margin:0!important;line-height:1.05!important}
        .founder-role{grid-column:2!important;grid-row:3!important;align-self:start!important;margin:0!important;line-height:1.4!important}
        .founder p{grid-column:1 / -1!important;grid-row:auto!important;width:100%!important}
        .founder-links{grid-column:1 / -1!important;grid-row:auto!important}
        @media(max-width:700px){
          .founder{grid-template-columns:145px minmax(0,1fr)!important;gap:10px 16px!important;padding:16px!important}
          .founder-photo{width:145px!important;height:182px!important;min-width:145px!important;min-height:182px!important;border-radius:19px!important;object-position:center 8%!important}
          .founder h3{font-size:25px!important;line-height:1.08!important;margin:0!important}
          .founder-role{font-size:10px!important;margin:0!important;line-height:1.4!important}
          .founder-kicker{font-size:7px!important;letter-spacing:1.6px!important;margin:2px 0 0!important}
        }
      `;document.head.appendChild(style)}
    fixFounderPhoto();
    fixThumbnailLoading();
  }
  fixArchiveVisuals();window.addEventListener('DOMContentLoaded',fixArchiveVisuals,{once:true});window.addEventListener('load',fixArchiveVisuals,{once:true});setTimeout(fixArchiveVisuals,250);setTimeout(fixArchiveVisuals,1000);

  function routeContact(){
    document.querySelectorAll('#menuPanel a').forEach(a=>{
      const label=a.querySelector('b');
      const copy=a.querySelector('.contact-copy');
      if(label&&label.textContent.trim()==='Contact'){
        if(copy)copy.remove();
        a.href='contact.html';
        a.removeAttribute('target');
        a.removeAttribute('rel');
      }
    });
    document.querySelectorAll('a[href^="mailto:"]').forEach(a=>{
      const inMenu=a.closest('#menuPanel');
      if(inMenu){
        a.href='contact.html';
        a.removeAttribute('target');
        a.removeAttribute('rel');
      }
    });
  }
  routeContact();window.addEventListener('DOMContentLoaded',routeContact,{once:true});window.addEventListener('load',routeContact,{once:true});setTimeout(routeContact,100);setTimeout(routeContact,500);setTimeout(routeContact,1200);
})();
