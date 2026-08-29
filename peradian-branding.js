(()=>{
  const SITE=new URL('.',location.href).href, RAW='https://raw.githubusercontent.com/peradiann/archive/main/', asset=n=>SITE+n, logo=asset('peradian-logo.png');
  const addLink=(rel,href,extra={})=>{let e=document.querySelector(`link[rel="${rel}"]`);if(!e){e=document.createElement('link');e.rel=rel;document.head.appendChild(e)}e.href=href;Object.assign(e,extra)};
  addLink('icon',logo,{type:'image/png'});addLink('shortcut icon',logo,{type:'image/png'});addLink('apple-touch-icon',logo,{sizes:'180x180'});
  const wrap=document.querySelector('#documentaries .wrap');
  function openTopicModal(){if(typeof window.openSuggest==='function')return window.openSuggest();const m=document.getElementById('suggestModal');if(m){m.classList.add('open');m.setAttribute('aria-hidden','false');setTimeout(()=>document.getElementById('topicInput')?.focus(),200)}}
  function addHeroButton(id,label,icon,href,click){const a=document.querySelector('.hero .actions');if(!a||document.getElementById(id))return;const b=document.createElement(href?'a':'button');b.id=id;b.className='button';b.innerHTML=`<span style="display:inline-grid;place-items:center;width:16px;height:16px;margin-right:7px;color:#ff7448;font-size:15px">${icon}</span><span>${label}</span>`;if(href)b.href=href;else{b.type='button';b.onclick=click}a.appendChild(b)}
  function quickFeatures(){addHeroButton('topicSuggestionHero','Topic Suggestion','✦',null,openTopicModal);addHeroButton('contactHero','Contact','✉','contact.html');addHeroButton('quizHero','Quick Practice','⌁','quiz.html');const nav=document.querySelector('.links');if(nav&&!document.getElementById('desktopQuickPractice')){const a=document.createElement('a');a.id='desktopQuickPractice';a.href='quiz.html';a.textContent='Quick Practice';nav.insertBefore(a,document.getElementById('desktopTopicSuggestion')||null)}}
  function routeQuizCategories(){
    if(!location.pathname.endsWith('/quiz.html')&&!location.pathname.endsWith('quiz.html'))return;
    document.querySelectorAll('.category[data-cat]').forEach(card=>{
      if(card.dataset.peradianRouted)return;
      card.dataset.peradianRouted='1';
      card.addEventListener('click',e=>{
        e.preventDefault();e.stopImmediatePropagation();
        const cat=card.dataset.cat||'history';
        location.href='quiz-category.html?category='+encodeURIComponent(cat);
      },true);
      card.setAttribute('role','link');
      card.setAttribute('aria-label',(card.querySelector('b')?.textContent||cat)+' category');
    });
  }
  function founder(){const i=document.querySelector('.founder-photo');if(!i)return;i.src=asset('pradip.jpg');i.onerror=()=>{i.onerror=null;i.src=RAW+'pradip.jpg'};i.removeAttribute('srcset');i.width=190;i.height=238;i.loading='eager';i.fetchPriority='high';i.style.objectFit='cover';i.style.objectPosition='center 8%'}
  function removeCases(){if(!wrap)return;wrap.querySelectorAll('.case').forEach(x=>x.remove());document.querySelectorAll('#case-001,#case-002').forEach(x=>x.remove());document.querySelectorAll('.dashcard strong').forEach(x=>x.textContent='000');document.querySelectorAll('.fact strong').forEach(x=>x.textContent='00');const e=document.getElementById('empty');if(e){e.style.display='block';e.textContent='No documentaries published yet.'}}
  function style(){if(document.getElementById('peradian-fix-styles'))return;const s=document.createElement('style');s.id='peradian-fix-styles';s.textContent=`html,body{background-color:#050304!important;min-height:100%}.founder{display:grid!important;grid-template-columns:190px minmax(0,1fr)!important;gap:12px 26px!important;padding:20px!important}.founder>div:not(.founder-photo){display:contents!important}.founder-photo{grid-column:1!important;grid-row:1 / span 3!important;width:190px!important;height:238px!important;object-fit:cover!important;object-position:center 8%!important}.founder-kicker{grid-column:2!important;grid-row:1!important}.founder h3{grid-column:2!important;grid-row:2!important;margin:0!important}.founder-role{grid-column:2!important;grid-row:3!important}.founder p,.founder-links{grid-column:1 / -1!important}.brand,.brand span{color:#f5f2ee!important}.links{display:flex!important;align-items:center!important;gap:22px!important;flex-wrap:nowrap!important}.links a{white-space:nowrap!important}.hero .actions{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important;width:min(620px,100%)!important;margin:28px auto 0!important}.hero .actions .button{width:100%!important;min-height:48px!important;padding:13px 16px!important;white-space:nowrap!important}.hero .actions #quizHero{grid-column:1 / -1!important;width:min(310px,100%)!important;justify-self:center!important}.hero .actions #topicSuggestionHero,.hero .actions #contactHero{min-width:0!important}@media(max-width:700px){.links{display:none!important}.hero .actions{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important;width:100%!important;margin-top:23px!important;padding:0 8px!important}.hero .actions .button{min-height:52px!important;font-size:10px!important;padding:12px 10px!important}.hero .actions #quizHero{width:calc(100% - 34px)!important;max-width:300px!important}.founder{grid-template-columns:145px minmax(0,1fr)!important;gap:10px 16px!important;padding:16px!important}.founder-photo{width:145px!important;height:182px!important;min-width:145px!important;min-height:182px!important}.founder h3{font-size:25px!important}.founder-role{font-size:10px!important}}`;document.head.appendChild(s)}
  function run(){style();quickFeatures();routeQuizCategories();founder();removeCases()}
  run();document.addEventListener('DOMContentLoaded',run,{once:true});window.addEventListener('load',run,{once:true});setTimeout(run,300);setTimeout(run,1000);
})();

/* Ensure the Contact item in the mobile three-line menu opens the dedicated contact page. */
(()=>{
  const fixContactRoute=()=>{
    const panel=document.getElementById('menuPanel');
    if(!panel)return;
    panel.querySelectorAll('a').forEach(a=>{
      const text=(a.textContent||'').trim().toLowerCase();
      if(text.includes('contact')){
        a.href='contact.html';
        a.removeAttribute('target');
        a.onclick=null;
      }
    });
  };
  fixContactRoute();
  document.addEventListener('DOMContentLoaded',fixContactRoute,{once:true});
  setTimeout(fixContactRoute,100);
  setTimeout(fixContactRoute,500);
})();