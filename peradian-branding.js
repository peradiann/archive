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
})();
