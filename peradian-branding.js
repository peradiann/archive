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
    if(text.includes('peradian web') || /rrdobhal081-blip\.github\.io/i.test(href)){
      a.href='https://peradiann.github.io/archive/';
    }
  });

  // Restore Case 002 without replacing the stable archive layout.
  const wrap=document.querySelector('#documentaries .wrap');
  const firstCase=wrap?.querySelector('.case');
  if(wrap && firstCase && !document.getElementById('case-002')){
    const article=document.createElement('article');
    article.className='case';
    article.id='case-002';
    article.dataset.search='002 the mystery of japanese folklore japanese folklore culture mystery history case 002';
    article.innerHTML=`<div class="num">002</div><div><h3>The Mystery of Japanese Folklore</h3><div class="meta">Research archive · Sources available · Case 002</div><a class="smallbtn" href="case-002the-mystery-of-japanese-folklore(1)pdf.pdf" target="_blank" rel="noopener">View Research PDF ↗</a><a class="smallbtn" href="https://youtube.com/@peradiann?si=t7XTuLBd3xRZQ4Nj" target="_blank" rel="noopener">Peradian YouTube ↗</a></div><div class="thumb"><img src="japanese-folklore.jpg" alt="The Mystery of Japanese Folklore"></div>`;
    firstCase.after(article);
  }

  // Keep search/filter behavior working for both documentary cases.
  const searchBox=document.getElementById('searchBox');
  const empty=document.getElementById('empty');
  const runArchiveSearch=()=>{
    if(!searchBox||!wrap)return;
    const q=searchBox.value.trim().toLowerCase();
    const active=document.querySelector('.cat.active')?.dataset.filter || 'all';
    const cards=[...wrap.querySelectorAll('.case')];
    let visible=0;
    cards.forEach(card=>{
      const text=(card.dataset.search||'').toLowerCase();
      const ok=(active==='all'||text.includes(active))&&(!q||text.includes(q));
      card.style.display=ok?'grid':'none';
      if(ok)visible++;
    });
    if(empty)empty.style.display=visible?'none':'block';
  };
  searchBox?.addEventListener('input',runArchiveSearch);
  document.querySelectorAll('.cat').forEach(cat=>cat.addEventListener('click',()=>setTimeout(runArchiveSearch,0)));
  runArchiveSearch();

  // Update archive counters now that Case 002 is live.
  const researchCount=document.querySelector('.dashcard strong');
  if(researchCount)researchCount.textContent='002';
  const factCount=document.querySelector('.fact strong');
  if(factCount)factCount.textContent='02';

  // Restore the premium Topic Suggestion action beside Explore Archive and Watch Peradian.
  function ensureTopicSuggestion(){
    const heroActions=document.querySelector('.hero .actions');
    if(!heroActions || document.getElementById('topicSuggestionHero')) return;

    const btn=document.createElement('button');
    btn.id='topicSuggestionHero';
    btn.className='button';
    btn.type='button';
    btn.setAttribute('aria-label','Suggest a Video Topic');
    btn.setAttribute('data-topic-suggestion','true');
    btn.innerHTML=`<span style="display:inline-grid;place-items:center;width:16px;height:16px;margin-right:7px;color:#ff7448;font-size:16px;line-height:1">✦</span><span>Topic Suggestion</span>`;
    btn.style.cursor='pointer';
    btn.style.position='relative';
    btn.style.zIndex='10';
    btn.style.whiteSpace='nowrap';
    btn.style.touchAction='manipulation';
    btn.addEventListener('click',()=>{
      const modal=document.getElementById('suggestModal');
      if(modal){
        modal.classList.add('open');
        modal.setAttribute('aria-hidden','false');
        setTimeout(()=>document.getElementById('topicInput')?.focus(),250);
      }
    });

    // Put it directly after the two primary hero actions.
    heroActions.appendChild(btn);
  }

  // Run now and again after initialization so the action cannot disappear
  // because another script finishes rendering afterward.
  ensureTopicSuggestion();
  window.addEventListener('DOMContentLoaded',ensureTopicSuggestion,{once:true});
  window.addEventListener('load',ensureTopicSuggestion,{once:true});
  setTimeout(ensureTopicSuggestion,250);
  setTimeout(ensureTopicSuggestion,1000);
})();
