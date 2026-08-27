(()=>{
  const SITE=new URL('.',location.href).href;
  const RAW='https://raw.githubusercontent.com/peradiann/archive/main/';
  const asset=name=>SITE+name;
  const logo=asset('peradian-logo.png');

  const addLink=(rel,href,extra={})=>{let el=document.querySelector(`link[rel="${rel}"]`);if(!el){el=document.createElement('link');el.rel=rel;document.head.appendChild(el)}el.href=href;Object.assign(el,extra)};
  addLink('icon',logo,{type:'image/png'});addLink('shortcut icon',logo,{type:'image/png'});addLink('apple-touch-icon',logo,{sizes:'180x180'});
  const meta=(selector,attrs,content)=>{let el=document.querySelector(selector);if(!el){el=document.createElement('meta');Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v));document.head.appendChild(el)}el.content=content};
  meta('meta[property="og:title"]',{property:'og:title'},'Peradian Resources — Documentary Research Archive');meta('meta[property="og:description"]',{property:'og:description'},'Explore the research, sources and stories behind Peradian documentaries.');meta('meta[property="og:image"]',{property:'og:image'},logo);meta('meta[property="og:type"]',{property:'og:type'},'website');meta('meta[property="og:url"]',{property:'og:url'},location.href.split('#')[0]);
  document.title='Peradian Resources — Documentary Research Archive';

  const wrap=document.querySelector('#documentaries .wrap');
  function runArchiveSearch(){
    if(!wrap)return;const searchBox=document.getElementById('searchBox');const empty=document.getElementById('empty');const q=(searchBox?.value||'').trim().toLowerCase();const active=document.querySelector('.cat.active')?.dataset.filter||'all';const cards=[...wrap.querySelectorAll('.case')];let visible=0;
    cards.forEach(card=>{const text=(card.dataset.search||'').toLowerCase();const ok=(active==='all'||text.includes(active))&&(!q||text.includes(q));card.style.display=ok?'grid':'none';if(ok)visible++});if(empty)empty.style.display=visible?'none':'block';
  }
  document.getElementById('searchBox')?.addEventListener('input',runArchiveSearch);document.querySelectorAll('.cat').forEach(cat=>cat.addEventListener('click',()=>setTimeout(runArchiveSearch,0)));

  function openTopicModal(){if(typeof window.openSuggest==='function'){window.openSuggest();return}const modal=document.getElementById('suggestModal');if(modal){modal.classList.add('open');modal.setAttribute('aria-hidden','false');setTimeout(()=>document.getElementById('topicInput')?.focus(),200)}}
  function ensureTopicHero(){const actions=document.querySelector('.hero .actions');if(!actions||document.getElementById('topicSuggestionHero'))return;const btn=document.createElement('button');btn.id='topicSuggestionHero';btn.className='button';btn.type='button';btn.innerHTML='<span style="display:inline-grid;place-items:center;width:16px;height:16px;margin-right:7px;color:#ff7448;font-size:16px">✦</span><span>Topic Suggestion</span>';btn.addEventListener('click',openTopicModal);actions.appendChild(btn)}
  function ensureContactHero(){const actions=document.querySelector('.hero .actions');if(!actions||document.getElementById('contactHero'))return;const btn=document.createElement('a');btn.id='contactHero';btn.className='button';btn.href='contact.html';btn.innerHTML='<span style="display:inline-grid;place-items:center;width:16px;height:16px;margin-right:7px;color:#ff7448;font-size:15px">✉</span><span>Contact</span>';actions.appendChild(btn)}

  function fixFounderPhoto(){const img=document.querySelector('.founder-photo');if(!img)return;img.src=asset('pradip.jpg');img.onerror=()=>{img.onerror=null;img.src=RAW+'pradip.jpg'};img.removeAttribute('srcset');img.width=190;img.height=238;img.loading='eager';img.decoding='async';img.fetchPriority='high';img.style.objectFit='cover';img.style.objectPosition='center 8%';img.style.padding='0';img.alt='Pradeep Rajput — Founder of Peradian'}

  function injectStyles(){
    if(document.getElementById('peradian-fix-styles'))return;const style=document.createElement('style');style.id='peradian-fix-styles';style.textContent=`
      html,body{background-color:#050304!important;min-height:100%;}body{overscroll-behavior-y:none;}
      .founder{display:grid!important;grid-template-columns:190px minmax(0,1fr)!important;grid-auto-flow:row!important;gap:12px 26px!important;align-items:start!important;padding:20px!important;}
      .founder>div:not(.founder-photo){display:contents!important;}.founder-photo{grid-column:1!important;grid-row:1 / span 3!important;width:190px!important;height:238px!important;min-width:190px!important;min-height:238px!important;aspect-ratio:4/5!important;object-fit:cover!important;object-position:center 8%!important;border-radius:22px!important;align-self:start!important;}.founder-kicker{grid-column:2!important;grid-row:1!important;margin:4px 0 0!important;}.founder h3{grid-column:2!important;grid-row:2!important;margin:0!important;line-height:1.05!important;}.founder-role{grid-column:2!important;grid-row:3!important;margin:0!important;line-height:1.4!important;}.founder p{grid-column:1 / -1!important;width:100%!important;}.founder-links{grid-column:1 / -1!important;}.brand,.brand span{color:#f5f2ee!important;}.links{display:flex!important;align-items:center!important;gap:22px!important;flex-wrap:nowrap!important;}.links a{white-space:nowrap!important;}
      @media(max-width:700px){.links{display:none!important;}.founder{grid-template-columns:145px minmax(0,1fr)!important;gap:10px 16px!important;padding:16px!important;}.founder-photo{width:145px!important;height:182px!important;min-width:145px!important;min-height:182px!important;border-radius:19px!important;}.founder h3{font-size:25px!important;line-height:1.08!important;}.founder-role{font-size:10px!important;}.founder-kicker{font-size:7px!important;letter-spacing:1.6px!important;}}
    `;document.head.appendChild(style);
  }

  function routeContact(){const panel=document.getElementById('menuPanel');if(!panel)return;panel.querySelectorAll('a').forEach(a=>{const label=a.querySelector('b');if(!label||label.textContent.trim().toLowerCase()!=='contact')return;const icon=a.querySelector('.mi');const text=Object.assign(document.createElement('b'),{textContent:'Contact'});a.replaceChildren(...(icon?[icon,text]:[text]));a.href='contact.html';a.removeAttribute('target');a.removeAttribute('rel');a.setAttribute('aria-label','Contact Peradian')})}

  function removePublishedCases(){
    if(wrap){wrap.querySelectorAll('.case').forEach(card=>card.remove());}
    document.querySelectorAll('#case-001,#case-002').forEach(el=>el.remove());
    const researchCount=document.querySelector('.dashcard strong');if(researchCount)researchCount.textContent='000';
    const factCount=document.querySelector('.fact strong');if(factCount)factCount.textContent='00';
    const empty=document.getElementById('empty');if(empty){empty.style.display='block';if(!empty.textContent.trim()||/no results/i.test(empty.textContent))empty.textContent='No documentaries published yet.';}
  }

  function run(){injectStyles();ensureTopicHero();ensureContactHero();fixFounderPhoto();routeContact();removePublishedCases();runArchiveSearch()}
  run();document.addEventListener('DOMContentLoaded',run,{once:true});window.addEventListener('load',run,{once:true});setTimeout(run,250);setTimeout(run,1000);
})();