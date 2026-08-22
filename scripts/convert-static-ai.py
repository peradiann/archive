from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
index = ROOT / "index.html"

html = index.read_text(encoding="utf-8")

# Make the AI launcher part of the initial HTML so crawlers/fetchers can see it.
old = '<span class="plus">+</span>'
new = '''<button class="plus pa-trigger" id="peradianAITrigger" type="button" aria-label="Open Peradian AI" aria-controls="peradian-ai" aria-expanded="false"><span class="pa-orb" aria-hidden="true"><i></i><i></i><i></i></span></button>'''
if old in html:
    html = html.replace(old, new, 1)

# Add a static menu entry for the AI.
menu_marker = '<div class="menu-panel" id="menuPanel">'
menu_item = '<a href="#peradian-ai" id="paMenu"><span class="mi"><span class="pa-orb pa-menu" aria-hidden="true"><i></i><i></i><i></i></span></span><span>Peradian AI</span></a>'
if 'id="paMenu"' not in html and menu_marker in html:
    html = html.replace(menu_marker, menu_marker + menu_item, 1)

# Static AI modal. JavaScript only supplies interaction and keyword matching.
modal = '''<div class="pa-modal" id="peradian-ai" aria-hidden="true"><section class="pa-shell" role="dialog" aria-modal="true" aria-labelledby="paTitle"><header class="pa-head"><div class="pa-brand"><span class="pa-orb" aria-hidden="true"><i></i><i></i><i></i></span></div><div><div class="pa-title" id="paTitle">Peradian AI</div><div class="pa-sub">Peradian assistant</div></div><button class="pa-close" id="paClose" type="button" aria-label="Close Peradian AI">×</button></header><div class="pa-msgs" id="paMsgs"><div class="pa-welcome"><span class="pa-orb" aria-hidden="true"><i></i><i></i><i></i></span><h3>Peradian AI</h3><p>You can ask questions about Peradian, its founder, YouTube channel, documentaries, research archive, resources and enquiries.</p><span class="pa-note">✦ Peradian-focused answers</span></div></div><form class="pa-form" id="paForm"><input class="pa-input" id="paInput" type="text" placeholder="Ask about Peradian..." autocomplete="off" aria-label="Ask Peradian AI"><button class="pa-send" type="submit" aria-label="Send">➤</button></form></section></div>'''
if 'id="peradian-ai"' not in html:
    html = html.replace('</body>', modal + '</body>', 1)

# Keep the AI as a normal static JS asset; no API, fetch, Gemini, or server dependency.
if '<script src="peradian-ai.js"></script>' not in html:
    html = html.replace('</body>', '<script src="peradian-ai.js"></script></body>', 1)

index.write_text(html, encoding="utf-8")
print("Static Peradian AI markup ensured in index.html")
