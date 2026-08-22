(()=>{
  const ready=()=>{
    const modal=document.getElementById('peradian-ai');
    if(!modal)return;
    const clone=(id)=>{const el=document.getElementById(id);if(!el)return null;const c=el.cloneNode(true);el.replaceWith(c);return c};
    const trigger=clone('peradianAITrigger');
    const menu=clone('paMenu');
    const close=clone('paClose');
    const form=clone('paForm');
    const input=document.getElementById('paInput');
    const msgs=document.getElementById('paMsgs');
    if(!form||!input||!msgs)return;

    const PDF='https://peradiann.github.io/archive/case-001-sources.pdf';
    const MAIL='workperadian@gmail.com';
    const esc=(s)=>String(s).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));

    const style=document.createElement('style');
    style.id='peradian-ai-fixed-style';
    style.textContent=`
      html.pa-open,body.pa-open{overflow:hidden!important;overscroll-behavior:none!important}
      .pa-modal{position:fixed!important;inset:0!important;z-index:999999!important;display:grid!important;place-items:center!important;padding:18px!important;background:rgba(2,1,2,.86)!important;backdrop-filter:blur(18px)!important;opacity:0!important;visibility:hidden!important;pointer-events:none!important;transition:opacity .22s ease,visibility .22s ease!important}
      .pa-modal.open{opacity:1!important;visibility:visible!important;pointer-events:auto!important}
      .pa-shell{width:min(720px,100%)!important;height:min(760px,calc(100svh - 36px))!important;max-height:calc(100svh - 36px)!important;min-height:0!important;display:flex!important;flex-direction:column!important;overflow:hidden!important;border:1px solid rgba(255,96,56,.30)!important;border-radius:28px!important;background:#090607!important;color:#f5f2ee!important;box-shadow:0 35px 120px rgba(0,0,0,.9),0 0 80px rgba(255,61,36,.12)!important;font-family:Inter,Arial,Helvetica,sans-serif!important}
      .pa-head{flex:0 0 auto!important;background:rgba(11,6,7,.98)!important;color:#f5f2ee!important}
      .pa-msgs{flex:1 1 auto!important;min-height:0!important;overflow-y:auto!important;overflow-x:hidden!important;background:#080506!important;color:#f5f2ee!important;overscroll-behavior:contain!important;-webkit-overflow-scrolling:touch!important}
      .pa-msg,.pa-msg.bot,.pa-msg.user{font-family:Inter,Arial,Helvetica,sans-serif!important;opacity:1!important;visibility:visible!important;mix-blend-mode:normal!important;filter:none!important;-webkit-text-fill-color:initial!important}
      .pa-msg{background:#141011!important;color:#f1ece8!important;border:1px solid rgba(255,255,255,.09)!important}
      .pa-msg.bot{background:linear-gradient(145deg,#181315,#0f0c0d)!important;color:#f5f0eb!important;border-color:rgba(255,255,255,.10)!important}
      .pa-msg.bot *{color:inherit!important;-webkit-text-fill-color:currentColor!important}
      .pa-msg.bot a{color:#ff9a78!important;-webkit-text-fill-color:#ff9a78!important}
      .pa-msg.user{background:linear-gradient(135deg,#ff7134,#ff4224)!important;color:#fff!important;border:0!important}
      .pa-welcome{color:#f5f2ee!important}
      .pa-welcome h3{color:#fff!important}
      .pa-welcome p{color:#aaa29d!important}
      .pa-form{flex:0 0 auto!important;background:#070405!important;padding-bottom:max(10px,env(safe-area-inset-bottom))!important}
      .pa-input{background:#0d0a0b!important;color:#fff!important;-webkit-text-fill-color:#fff!important;caret-color:#ff7448!important}
      .pa-input::placeholder{color:#77706c!important;-webkit-text-fill-color:#77706c!important}
      .pa-trigger{display:grid!important;place-items:center!important;width:50px!important;height:50px!important;border:0!important;background:transparent!important;cursor:pointer!important;padding:0!important}
      @media(max-width:700px){
        .pa-modal{padding:0!important;place-items:stretch!important}
        .pa-shell{width:100%!important;height:100svh!important;max-height:100svh!important;border-radius:0!important}
        .pa-head{padding:14px!important}
        .pa-msgs{padding:18px 13px!important}
        .pa-msg{max-width:92%!important;font-size:12.5px!important;line-height:1.62!important}
        .pa-form{padding:9px!important;gap:8px!important}
        .pa-input{height:48px!important;font-size:16px!important}
        .pa-send{width:48px!important;height:48px!important;flex:0 0 48px!important}
        .pa-trigger{width:43px!important;height:43px!important}
      }
      @media(prefers-reduced-motion:reduce){.pa-modal,.pa-shell{transition:none!important}}
    `;
    document.head.appendChild(style);

    const orb=()=>'<span class="pa-orb" aria-hidden="true"><i></i><i></i><i></i></span>';
    document.querySelectorAll('.pa-orb').forEach((x)=>{if(!x.innerHTML.trim())x.innerHTML='<i></i><i></i><i></i>'});

    const lang=(q)=>{
      if(/[\u0900-\u097F]/.test(q))return'hi';
      if(/\b(aahe|ahe|kay|kaay|kadhi|kuthe|kon|majha|tumhi|mala|sanga|kasa|kashi|karaycha|baddal|suruvat|zala|zali|kiti|ahe|cha|chi|che)\b/i.test(q))return'mr';
      return'en';
    };

    const A={
      en:{
        founder:'<b>Pradeep Rajput</b> is the Founder and Documentary Creator behind <b>Peradian</b>. Peradian is his documentary and research platform focused on uncovering stories that shaped our world and presenting complex subjects through engaging, thoughtful storytelling. The founder is based in the <b>West of India</b>.',
        peradian:'<b>Peradian</b> is a documentary and research platform dedicated to uncovering stories that shaped our world through history, mystery, science, war, culture, investigation and critical thinking.',
        youtube:'<b>YouTube</b> was founded on <b>February 14, 2005</b>, by co-founders <b>Chad Hurley, Steve Chen, and Jawed Karim</b>. In <b>October 2006</b>, Google acquired YouTube for <b>$1.65 billion</b> in stock.',
        pyt:'The <b>Peradian YouTube channel</b> was created on <b>July 2, 2026</b>. It publishes research-driven documentary content for a global audience.',
        count:'The current Peradian Research Archive lists <b>1 documentary/video case</b>: <b>Case 001 — The Most Dangerous Dictator Kim Jong Un</b>. The count can change as new Peradian videos are published.',
        resource:'The current Peradian research resource is <b>Case 001 — The Most Dangerous Dictator Kim Jong Un</b>. <a href="'+PDF+'" target="_blank" rel="noopener">Open / download the Research PDF ↗</a>',
        email:'Peradian enquiries can be sent to <b>'+MAIL+'</b>. You can write about <b>sponsorships, business enquiries, website problems, technical issues, collaborations, media/work opportunities, or working with the Peradian team</b>.<br><br>Example subjects: <b>“Sponsorship Enquiry — Peradian”</b>, <b>“Website Problem”</b>, or <b>“Work With Peradian”</b>.',
        instagram:'Peradian is on Instagram as <b>@peradiann</b>.',
        topic:'You can suggest a future Peradian video topic using <b>Topic Suggestion ✦</b>. Suggestions are sent to <b>'+MAIL+'</b>.',
        case:'<b>Case 001</b> is <b>The Most Dangerous Dictator Kim Jong Un</b>. Its research sources are available in the <a href="'+PDF+'" target="_blank" rel="noopener">Research PDF ↗</a>.',
        hello:'Hello! I’m <b>Peradian AI</b>. Ask me about Peradian, its founder, YouTube channel, documentaries, research archive, resources or enquiries.'
      },
      hi:{
        founder:'<b>Pradeep Rajput</b> <b>Peradian के Founder और Documentary Creator</b> हैं। Peradian उनका documentary और research platform है, जिसका उद्देश्य दुनिया को आकार देने वाली कहानियों को research और thoughtful storytelling के साथ सामने लाना है। Founder <b>West of India</b> में based हैं।',
        peradian:'<b>Peradian</b> एक documentary और research platform है, जो history, mystery, science, war, culture, investigation और critical thinking जैसे विषयों पर काम करता है।',
        youtube:'<b>YouTube</b> की स्थापना <b>14 फ़रवरी 2005</b> को co-founders <b>Chad Hurley, Steve Chen और Jawed Karim</b> ने की थी। <b>October 2006</b> में Google ने YouTube को <b>$1.65 billion</b> के stock deal में acquire किया था।',
        pyt:'<b>Peradian YouTube channel</b> की शुरुआत <b>2 July 2026</b> को हुई थी। Channel global audience के लिए research-driven documentary content बनाता है।',
        count:'मौजूदा Peradian Research Archive में अभी <b>1 documentary/video case</b> listed है: <b>Case 001 — The Most Dangerous Dictator Kim Jong Un</b>। नए Peradian videos publish होने पर यह संख्या बदल सकती है।',
        resource:'मौजूदा Peradian research resource <b>Case 001 — The Most Dangerous Dictator Kim Jong Un</b> है। <a href="'+PDF+'" target="_blank" rel="noopener">Research PDF खोलें / डाउनलोड करें ↗</a>',
        email:'Peradian enquiry के लिए <b>'+MAIL+'</b> पर email करें। आप <b>sponsorship, business enquiry, website problem, technical issue, collaboration, media/work opportunity या Peradian team के साथ काम</b> के बारे में message भेज सकते हैं।<br><br>Subject के उदाहरण: <b>“Sponsorship Enquiry — Peradian”</b>, <b>“Website Problem”</b> या <b>“Work With Peradian”</b>।',
        instagram:'Peradian Instagram पर <b>@peradiann</b> के नाम से है।',
        topic:'Future Peradian video के लिए <b>Topic Suggestion ✦</b> से topic भेज सकते हैं। Suggestions <b>'+MAIL+'</b> पर भेजे जाते हैं।',
        case:'<b>Case 001</b> का नाम <b>The Most Dangerous Dictator Kim Jong Un</b> है। इसके research sources <a href="'+PDF+'" target="_blank" rel="noopener">Research PDF ↗</a> में उपलब्ध हैं।',
        hello:'नमस्ते! मैं <b>Peradian AI</b> हूँ। Peradian, उसके founder, YouTube channel, documentaries, research archive, resources या enquiries के बारे में पूछिए।'
      },
      mr:{
        founder:'<b>Pradeep Rajput</b> हे <b>Peradian चे Founder आणि Documentary Creator</b> आहेत. Peradian हे त्यांचे documentary आणि research platform आहे, जे जगाला आकार देणाऱ्या कथा research आणि thoughtful storytelling द्वारे मांडते. Founder <b>West of India</b> मध्ये based आहेत.',
        peradian:'<b>Peradian</b> हे documentary आणि research platform आहे. यामध्ये history, mystery, science, war, culture, investigation आणि critical thinking यांसारख्या विषयांवर लक्ष केंद्रित केले जाते.',
        youtube:'<b>YouTube</b> ची स्थापना <b>14 फेब्रुवारी 2005</b> रोजी co-founders <b>Chad Hurley, Steve Chen आणि Jawed Karim</b> यांनी केली. <b>October 2006</b> मध्ये Google ने YouTube ला <b>$1.65 billion</b> च्या stock deal मध्ये acquire केले.',
        pyt:'<b>Peradian YouTube channel</b> ची सुरुवात <b>2 July 2026</b> रोजी झाली. Channel global audience साठी research-driven documentary content तयार करतो.',
        count:'सध्याच्या Peradian Research Archive मध्ये <b>1 documentary/video case</b> listed आहे: <b>Case 001 — The Most Dangerous Dictator Kim Jong Un</b>. नवीन Peradian videos publish झाल्यावर ही संख्या बदलू शकते.',
        resource:'सध्याचा Peradian research resource <b>Case 001 — The Most Dangerous Dictator Kim Jong Un</b> आहे. <a href="'+PDF+'" target="_blank" rel="noopener">Research PDF उघडा / डाउनलोड करा ↗</a>',
        email:'Peradian enquiry साठी <b>'+MAIL+'</b> वर email करू शकता. तुम्ही <b>sponsorship, business enquiry, website problem, technical issue, collaboration, media/work opportunity किंवा Peradian team सोबत काम</b> याबद्दल message पाठवू शकता.<br><br>Subject उदाहरणे: <b>“Sponsorship Enquiry — Peradian”</b>, <b>“Website Problem”</b> किंवा <b>“Work With Peradian”</b>.',
        instagram:'Peradian Instagram वर <b>@peradiann</b> या नावाने आहे.',
        topic:'Future Peradian video साठी <b>Topic Suggestion ✦</b> वापरून topic पाठवू शकता. Suggestions <b>'+MAIL+'</b> वर येतात.',
        case:'<b>Case 001</b> चे नाव <b>The Most Dangerous Dictator Kim Jong Un</b> आहे. त्याचे research sources <a href="'+PDF+'" target="_blank" rel="noopener">Research PDF ↗</a> मध्ये उपलब्ध आहेत.',
        hello:'नमस्कार! मी <b>Peradian AI</b> आहे. Peradian, founder, YouTube channel, documentaries, research archive, resources किंवा enquiries बद्दल विचारा.'
      }
    };

    function answer(q){
      const l=lang(q),t=A[l],z=q.toLowerCase().replace(/[’']/g,"'");
      const has=(re)=>re.test(z);
      if(has(/peradian[\s\S]*(youtube|channel)[\s\S]*(when|kab|kadhi|founded|started|created|bana|bani|launch|start|suruvat|zala|zali)/)||has(/(youtube|channel)[\s\S]*peradian[\s\S]*(when|kab|kadhi|founded|started|created|bana|bani|launch|start|suruvat|zala|zali)/))return t.pyt;
      if(has(/(how many|kitne|kiti|number|no\.?)[\s\S]*(peradian)?[\s\S]*(video|videos|upload|uploaded|published|publish)/)||has(/peradian[\s\S]*(kitne|kiti|how many|number)[\s\S]*(video|videos|upload|uploaded)/)||has(/peradian[\s\S]*(video|videos)[\s\S]*(kitne|kiti|how many)/))return t.count;
      if(has(/\b(youtube|you tube)\b/)&&has(/(when|founded|started|created|bana|bani|kab|establish|acquire|google|kadhi|suruvat)/))return t.youtube;
      if(has(/\b(pradip|pradeep)\b|pradeep[\s-]*rajput|rajput[\s-]*pradeep|founder|who is pradip|who is pradeep/))return t.founder;
      if(has(/resource|resources|source|sources|pdf|reference|research[\s-]*file|research[\s-]*link/))return t.resource;
      if(has(/email|contact|enquir|enquiry|sponsor|sponsorship|business|work with|team/))return t.email;
      if(has(/instagram|insta/))return t.instagram;
      if(has(/location|where[\s\S]*peradian|where[\s\S]*founder/))return t.founder;
      if(has(/suggest|topic/))return t.topic;
      if(has(/case[\s-]*001|kim[\s-]*jong|dangerous dictator/))return t.case;
      if(has(/what is peradian|about peradian|who is peradian|peradian kya|peradian kay|peradian mhanje/))return t.peradian;
      if(/^(hi|hello|hey|namaste|नमस्ते|हाय)\b/i.test(q.trim()))return t.hello;
      return l==='hi'?'मैं केवल <b>Peradian से संबंधित सवालों</b> का जवाब देता हूँ — founder, YouTube channel, documentaries, research archive, resources, contact और future topics के बारे में पूछ सकते हैं।':l==='mr'?'मी फक्त <b>Peradian संबंधित प्रश्नांची</b> उत्तरे देतो — founder, YouTube channel, documentaries, research archive, resources, contact आणि future topics बद्दल विचारा.':'I answer <b>Peradian-related questions only</b> — including its founder, YouTube channel, documentaries, research archive, resources, contact details and future topics.';
    }

    const open=()=>{modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.documentElement.classList.add('pa-open');document.body.classList.add('pa-open');setTimeout(()=>input.focus(),120)};
    const shut=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.documentElement.classList.remove('pa-open');document.body.classList.remove('pa-open')};
    const add=(html,kind)=>{const el=document.createElement('div');el.className='pa-msg '+kind;el.innerHTML=html;msgs.appendChild(el);requestAnimationFrame(()=>{msgs.scrollTop=msgs.scrollHeight})};

    trigger&&trigger.addEventListener('click',open);
    menu&&menu.addEventListener('click',(e)=>{e.preventDefault();open()});
    close&&close.addEventListener('click',shut);
    modal.addEventListener('click',(e)=>{if(e.target===modal)shut()});
    document.addEventListener('keydown',(e)=>{if(e.key==='Escape')shut()});
    form.addEventListener('submit',(e)=>{e.preventDefault();const q=input.value.trim();if(!q)return;add(esc(q),'user');input.value='';setTimeout(()=>add(answer(q),'bot'),180)});

    // Keep the AI interface dark even when the browser applies forced colors/dark-mode adjustments.
    const meta=document.querySelector('meta[name="color-scheme"]')||document.createElement('meta');
    meta.name='color-scheme';meta.content='dark';if(!meta.parentNode)document.head.appendChild(meta);
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});else ready();
})();
