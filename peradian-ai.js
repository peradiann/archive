(()=>{
'use strict';
const icon=`<span class="pai-orb" aria-hidden="true"><i></i><i></i><i></i></span>`;
const css=`
.pai-trigger{position:relative;display:grid!important;place-items:center;width:50px;height:50px;margin:0;border:0;background:transparent;color:#fff;cursor:pointer;z-index:5}
.pai-trigger:focus-visible{outline:2px solid rgba(255,116,72,.8);outline-offset:-2px;border-radius:16px}
.pai-orb{position:relative;width:27px;height:27px;display:block;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff 0 4%,#ffb37d 8%,#ff663d 24%,#6d170e 58%,#120607 100%);box-shadow:0 0 0 1px rgba(255,126,81,.38),0 0 18px rgba(255,76,36,.38),inset 0 0 12px rgba(255,255,255,.12);animation:paiPulse 2.4s ease-in-out infinite}
.pai-orb:before,.pai-orb:after{content:"";position:absolute;inset:-6px;border:1px solid rgba(255,105,58,.18);border-radius:50%;animation:paiRing 2.8s ease-out infinite}
.pai-orb:after{inset:-10px;border-color:rgba(255,170,105,.08);animation-delay:.9s}
.pai-orb i{position:absolute;width:4px;height:4px;border-radius:50%;background:#ffd0ad;box-shadow:0 0 7px #ff6a3c;animation:paiDot 2.2s linear infinite}
.pai-orb i:nth-child(1){left:-3px;top:9px}.pai-orb i:nth-child(2){right:-2px;top:4px;animation-delay:.7s}.pai-orb i:nth-child(3){right:3px;bottom:-2px;animation-delay:1.3s}
@keyframes paiPulse{50%{transform:scale(1.08);box-shadow:0 0 0 1px rgba(255,126,81,.45),0 0 28px rgba(255,76,36,.55),inset 0 0 12px rgba(255,255,255,.16)}}
@keyframes paiRing{0%{transform:scale(.82);opacity:.8}100%{transform:scale(1.35);opacity:0}}
@keyframes paiDot{50%{transform:translate(4px,-3px);opacity:.45}}
.pai-menu-icon{position:relative;overflow:visible}.pai-menu-icon .pai-orb{width:20px;height:20px}.pai-menu-icon .pai-orb i{width:3px;height:3px}
.pai-modal{position:fixed;inset:0;z-index:140;display:grid;place-items:center;padding:18px;background:rgba(0,0,0,.76);backdrop-filter:blur(18px);opacity:0;pointer-events:none;transition:opacity .25s ease}
.pai-modal.open{opacity:1;pointer-events:auto}
.pai-shell{position:relative;width:min(720px,100%);height:min(760px,calc(100dvh - 36px));display:flex;flex-direction:column;overflow:hidden;border:1px solid rgba(255,91,48,.24);border-radius:28px;background:linear-gradient(155deg,#100708 0%,#070506 55%,#030303 100%);box-shadow:0 35px 110px rgba(0,0,0,.82),0 0 70px rgba(255,54,26,.1);transform:translateY(18px) scale(.97);transition:transform .3s cubic-bezier(.2,.8,.2,1)}
.pai-modal.open .pai-shell{transform:none}
.pai-shell:before{content:"";position:absolute;width:420px;height:260px;left:50%;top:-170px;transform:translateX(-50%);background:radial-gradient(circle,rgba(255,77,36,.22),transparent 68%);pointer-events:none}
.pai-head{position:relative;display:flex;align-items:center;gap:13px;padding:18px 18px 16px;border-bottom:1px solid rgba(255,255,255,.08);flex:none}
.pai-brand-icon{width:48px;height:48px;border-radius:15px;display:grid;place-items:center;background:rgba(255,71,32,.08);border:1px solid rgba(255,102,61,.22);box-shadow:0 0 26px rgba(255,65,28,.12)}
.pai-brand-icon .pai-orb{width:26px;height:26px}
.pai-title{font-size:17px;font-weight:800;letter-spacing:-.35px}.pai-subtitle{margin-top:3px;color:#8e8884;font-size:10px;line-height:1.45}.pai-close{margin-left:auto;width:42px;height:42px;border:1px solid rgba(255,255,255,.11);border-radius:13px;background:rgba(255,255,255,.035);color:#fff;font-size:25px;cursor:pointer;transition:.2s}.pai-close:hover{border-color:rgba(255,104,62,.45);background:rgba(255,75,35,.08)}
.pai-messages{position:relative;flex:1;overflow:auto;padding:24px 20px 26px;scroll-behavior:smooth}.pai-messages::-webkit-scrollbar{width:5px}.pai-messages::-webkit-scrollbar-thumb{background:#2b1715;border-radius:10px}.pai-msg{max-width:82%;margin:0 0 14px;padding:13px 15px;border:1px solid rgba(255,255,255,.09);border-radius:18px;background:rgba(255,255,255,.035);color:#e9e5e1;font-size:13px;line-height:1.6;animation:paiMessage .3s ease}.pai-msg.user{margin-left:auto;background:linear-gradient(135deg,#ff7134,#ff4224);border-color:transparent;color:#fff;border-bottom-right-radius:6px;box-shadow:0 10px 28px rgba(255,65,27,.15)}.pai-msg.bot{border-bottom-left-radius:6px}.pai-msg strong{color:#fff}.pai-welcome{margin:4px auto 25px;text-align:center;max-width:460px}.pai-welcome .pai-orb{margin:0 auto 13px;width:48px;height:48px}.pai-welcome h3{margin:0 0 7px;font-size:22px;letter-spacing:-.7px}.pai-welcome p{margin:0;color:#8e8884;font-size:11px;line-height:1.65}
.pai-composer{position:relative;display:flex;gap:9px;padding:13px;border-top:1px solid rgba(255,255,255,.08);background:rgba(7,5,6,.92);flex:none}.pai-input{min-width:0;flex:1;height:50px;padding:0 15px;border:1px solid rgba(255,255,255,.11);border-radius:15px;outline:0;background:#0d0a0b;color:#fff;font:inherit;font-size:13px}.pai-input:focus{border-color:rgba(255,99,57,.6);box-shadow:0 0 0 3px rgba(255,70,30,.07)}.pai-input::placeholder{color:#6f6965}.pai-send{width:50px;height:50px;border:0;border-radius:15px;background:linear-gradient(135deg,#ff7a38,#ff3f20);color:#fff;font-size:21px;cursor:pointer;box-shadow:0 8px 24px rgba(255,69,27,.2);transition:.2s}.pai-send:hover{transform:translateY(-1px);box-shadow:0 12px 30px rgba(255,69,27,.3)}.pai-send:disabled{opacity:.55;cursor:wait}.pai-typing{display:inline-flex;gap:4px;align-items:center}.pai-typing i{width:5px;height:5px;border-radius:50%;background:#ff7547;animation:paiTyping .9s infinite}.pai-typing i:nth-child(2){animation-delay:.15s}.pai-typing i:nth-child(3){animation-delay:.3s}@keyframes paiTyping{50%{opacity:.25;transform:translateY(-2px)}}
@media(max-width:700px){.pai-trigger{width:43px;height:50px}.pai-modal{padding:0}.pai-shell{width:100%;height:100dvh;max-height:none;border-radius:0;border-left:0;border-right:0}.pai-head{padding:14px 14px 13px}.pai-messages{padding:20px 14px 24px}.pai-msg{max-width:90%;font-size:12.5px}.pai-composer{padding:10px}.pai-input{height:48px}.pai-send{width:48px;height:48px}.pai-welcome h3{font-size:20px}}
`;
const style=document.createElement('style');style.id='peradian-ai-style';style.textContent=css;document.head.appendChild(style);
const plus=document.querySelector('.plus');
const menuPanel=document.getElementById('menuPanel');
if(plus){plus.className='plus pai-trigger';plus.setAttribute('role','button');plus.setAttribute('tabindex','0');plus.setAttribute('aria-label','Open Peradian AI');plus.innerHTML=icon;}
if(menuPanel&&!document.getElementById('menuPeradianAI')){
 const a=document.createElement('a');a.href='#peradian-ai';a.id='menuPeradianAI';a.innerHTML=`<span class="mi pai-menu-icon">${icon}</span><span>Peradian AI</span>`;menuPanel.insertBefore(a,menuPanel.firstElementChild);a.addEventListener('click',e=>{e.preventDefault();if(window.closePeradianMenu)window.closePeradianMenu();openAI()});
}
const modal=document.createElement('div');modal.className='pai-modal';modal.id='peradian-ai';modal.setAttribute('aria-hidden','true');modal.innerHTML=`<section class="pai-shell" role="dialog" aria-modal="true" aria-labelledby="paiTitle"><header class="pai-head"><div class="pai-brand-icon">${icon}</div><div><div class="pai-title" id="paiTitle">Peradian AI</div><div class="pai-subtitle">You can ask only Peradian-related questions.</div></div><button class="pai-close" type="button" aria-label="Close Peradian AI">×</button></header><div class="pai-messages" id="paiMessages"><div class="pai-welcome">${icon}<h3>Peradian AI</h3><p>Your built-in Peradian research assistant. Ask about Peradian, its documentaries, research archive, founder, or the topics covered by Peradian.</p></div></div><form class="pai-composer" id="paiForm"><input class="pai-input" id="paiInput" autocomplete="off" placeholder="Ask about Peradian..." aria-label="Ask Peradian AI"><button class="pai-send" type="submit" aria-label="Send">➤</button></form></section></div>`;document.body.appendChild(modal);
const messages=document.getElementById('paiMessages'),input=document.getElementById('paiInput'),form=document.getElementById('paiForm');
const related=['peradian','peradian ai','pradeep rajput','pradeep','founder','documentary','documentaries','research archive','research','case 001','kim jong un','archive','youtube','instagram','workperadian','video topic','suggest a topic','about peradian','peradian resources'];
const replies=[
 [/who\s+(is|was)\s+pradeep|pradeep rajput|founder/,`<strong>Pradeep Rajput</strong> is the Founder &amp; Documentary Creator behind Peradian. Peradian is his documentary and research platform, focused on uncovering stories that shaped our world and presenting complex subjects through engaging, thoughtful storytelling.`],
 [/what\s+is\s+peradian|about\s+peradian|who\s+is\s+peradian/,`<strong>Peradian</strong> is a documentary and research platform dedicated to uncovering the stories that shaped our world. Its work combines investigation, historical context, culture, science, mystery and critical thinking.`],
 [/documentar|video|youtube/,`Peradian is building a research-driven documentary archive for a global audience. You can explore the available documentary cases and research references in the Peradian Resources archive.`],
 [/research|source|archive|case 001/,`The <strong>Peradian Research Archive</strong> contains documentary research, sources and references. The current archive includes <strong>Case 001: The Most Dangerous Dictator Kim Jong Un</strong>, with its research PDF available in the Documentary section.`],
 [/kim jong|dangerous dictator/,`Case 001 in the Peradian archive is <strong>The Most Dangerous Dictator Kim Jong Un</strong>. Its research references are available through the Case 001 Research PDF.`],
 [/suggest|topic|cover/,`You can suggest a future Peradian documentary topic through <strong>Suggest a Video Topic</strong>. Your idea is sent to the Peradian team at <strong>workperadian@gmail.com</strong>.`],
 [/contact|email|business/,`For Peradian website enquiries or business-related matters, contact <strong>workperadian@gmail.com</strong>.`],
 [/instagram/,`Peradian is on Instagram at <strong>@peradiann</strong>.`],
 [/where|location/,`Peradian's founder, Pradeep Rajput, is based in the <strong>West of India</strong>.`],
 [/hello|hi|hey|namaste/,`Hello! I’m <strong>Peradian AI</strong>. Ask me anything about Peradian, its documentaries, research archive, founder, or related Peradian topics.`]
];
function isRelated(q){return related.some(k=>q.includes(k));}
function answer(q){for(const [re,text] of replies){if(re.test(q))return text;}return `I can help with <strong>Peradian-related questions</strong> only — such as Peradian, Pradeep Rajput, documentaries, the research archive, Case 001, research sources, or suggesting a future video topic.`;}
function add(text,type){const el=document.createElement('div');el.className='pai-msg '+type;el.innerHTML=text;messages.appendChild(el);messages.scrollTop=messages.scrollHeight;return el;}
function openAI(){modal.classList.add('open');modal.setAttribute('aria-hidden','false');setTimeout(()=>input.focus(),180)}
function closeAI(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}
window.openPeradianAI=openAI;
if(plus){plus.addEventListener('click',openAI);plus.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openAI()}})}
modal.querySelector('.pai-close').addEventListener('click',closeAI);modal.addEventListener('click',e=>{if(e.target===modal)closeAI()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAI()});
form.addEventListener('submit',e=>{e.preventDefault();const q=input.value.trim();if(!q)return;add(q.replace(/[&<>]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[m])),'user');input.value='';const typing=add('<span class="pai-typing"><i></i><i></i><i></i></span>','bot');setTimeout(()=>{typing.remove();add(answer(q.toLowerCase()),'bot')},420);});
})();
