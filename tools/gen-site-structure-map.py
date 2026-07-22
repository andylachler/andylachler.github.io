#!/usr/bin/env python3
# lachler.com site structure map — current IA, July 22 2026.
# July 22 restructure: home reel is now FIVE cards + More (Full product
# study leads; Algoma shown as two showcases — Wireframe component work +
# Platform driven reports; Feasibility platform case study RETIRED).
# Regenerate: python3 portfolio/tools/gen-site-structure-map.py
# Then re-upload the embed on the Notion "Lachler Studio HQ" page.
import html, os
W, H = 2260, 1330
INK, CREAM, STONE, FOREST, ORANGE, SAGE = "#14211C", "#F2EFE6", "#E8E4D5", "#3D5448", "#D45A1B", "rgba(20,33,28,0.55)"
ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
parts = []
def esc(s): return html.escape(s, quote=True)

def card(x, y, w, h, title, proves, subs=(), change=None, ghost=False):
    if ghost:
        parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="10" fill="none" stroke="{SAGE}" stroke-width="1.4" stroke-dasharray="7 5"/>')
        tcol, scol = SAGE, "rgba(20,33,28,0.4)"
    else:
        parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="10" fill="{FOREST}"/>')
        tcol, scol = CREAM, "rgba(242,239,230,0.7)"
    parts.append(f'<text x="{x+18}" y="{y+28}" font-size="16" font-weight="600" fill="{tcol}">{esc(title)}</text>')
    pw = len(proves)*6.6 + 20
    parts.append(f'<rect x="{x+18}" y="{y+40}" width="{pw}" height="22" rx="11" fill="{"rgba(20,33,28,0.06)" if ghost else "rgba(242,239,230,0.12)"}"/>')
    parts.append(f'<text x="{x+28}" y="{y+55}" font-size="11.5" font-weight="600" fill="{tcol}">{esc("proves: " + proves)}</text>')
    ty = y + 80
    for s in subs:
        parts.append(f'<text x="{x+18}" y="{ty}" font-size="12.5" fill="{scol}">{esc(s)}</text>')
        ty += 18
    if change:
        parts.append(f'<circle cx="{x+24}" cy="{ty+1}" r="3.5" fill="{ORANGE}"/>')
        parts.append(f'<text x="{x+34}" y="{ty+5}" font-size="12" font-weight="600" fill="{ORANGE if ghost else "#F5C88C"}">{esc(change)}</text>')

def chip(x, y, label, w=None, accent=False):
    w = w or len(label)*7 + 26
    parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="30" rx="15" fill="{"none" if accent else INK}" stroke="{ORANGE if accent else "none"}" stroke-width="{1.6 if accent else 0}"/>')
    parts.append(f'<text x="{x+w/2}" y="{y+19}" font-size="12" font-weight="500" fill="{ORANGE if accent else CREAM}" text-anchor="middle">{esc(label)}</text>')
    return w

def note(x, y, lines, anchor="start", color=None):
    ty = y
    for ln in lines:
        parts.append(f'<text x="{x}" y="{ty}" font-size="11.5" font-style="italic" fill="{color or SAGE}" text-anchor="{anchor}">{esc(ln)}</text>')
        ty += 15

def sect(x, y, w, h, label):
    parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="14" fill="{CREAM}" stroke="rgba(20,33,28,0.18)" stroke-width="1"/>')
    parts.append(f'<text x="{x+24}" y="{y+38}" font-size="13" font-weight="700" letter-spacing="2.5" fill="{INK}">{esc(label.upper())}</text>')

parts.append(f'<rect width="{W}" height="{H}" fill="{STONE}"/>')
parts.append(f'<text x="48" y="64" font-size="30" font-weight="700" fill="{INK}">lachler.com — site structure map</text>')
parts.append(f'<text x="48" y="92" font-size="14" fill="{SAGE}">Current IA, July 22 2026 — home reel restructured to FIVE cards: Full product study leads, Algoma split into two showcases, Feasibility case study retired. Orange = still to do.</text>')

# Legend
lx = 1620
parts.append(f'<rect x="{lx}" y="34" width="600" height="70" rx="10" fill="{CREAM}" stroke="rgba(20,33,28,0.15)"/>')
parts.append(f'<rect x="{lx+18}" y="52" width="64" height="24" rx="7" fill="{FOREST}"/>')
parts.append(f'<text x="{lx+92}" y="68" font-size="12" fill="{INK}">Page / tile</text>')
parts.append(f'<rect x="{lx+175}" y="52" width="64" height="24" rx="7" fill="none" stroke="{SAGE}" stroke-dasharray="7 5" stroke-width="1.4"/>')
parts.append(f'<text x="{lx+249}" y="68" font-size="12" fill="{INK}">Retired / ghost</text>')
parts.append(f'<circle cx="{lx+360}" cy="64" r="4" fill="{ORANGE}"/>')
parts.append(f'<text x="{lx+372}" y="68" font-size="12" fill="{INK}">Change to make</text>')
parts.append(f'<line x1="{lx+480}" y1="64" x2="{lx+520}" y2="64" stroke="{ORANGE}" stroke-width="2" stroke-dasharray="3 4"/>')
parts.append(f'<text x="{lx+530}" y="68" font-size="12" fill="{INK}">Custom study layout</text>')

# ---------- HOME band ----------
sect(48, 130, W-96, 190, 'Home — the identity layer')
card(80, 176, 560, 118, 'Hero', 'the thesis', ['“A product designer trained as an architect.”'], change='tagline/positioning under review — tabled')
card(680, 176, 900, 118, 'Selected-work reel — five cards + More', 'range at a glance',
     ['01 Full product study · 02 Wireframe component work · 03 Platform driven', 'reports · 04 Exhibition Trailer · 05 Ella · → More projects'],
     change='✓ restructured July 22 (done)')
card(1620, 176, 560, 118, 'Nav + dropdowns', 'wayfinding', ['Work · About · project deep-links'], change='✓ derives from PROJECTS — no edit needed')

# ---------- WORK / project layer ----------
sect(48, 360, 1360, 800, 'Project layer — the featured five')
cw, ch = 640, 168
card(80, 420, cw, ch, 'Full product study · AutoEase', '0→1 product thinking',
     ['CUSTOM LAYOUT: idea → market table → assumptions → 9 interviews /', '3 personas → evidence-ranked features → lowfi → hifi → live prototype'],
     change='hifi row uses live Vercel screens — swap for stills if perf dips')
card(760, 420, cw, ch, 'Wireframe component work · Algoma', 'component craft, state by state',
     ['CUSTOM LAYOUT: 4 series — chat panel · rendering · service intake ·', 'zoning report. Prototypes ported verbatim inside lachler chrome'],
     change='revisit confidentiality before launch (standing note)')
card(760, 620, cw, ch, 'Platform driven reports · Algoma', 'product logic, written down',
     ['CUSTOM LAYOUT: two tracks → converge → principles → 4-phase', 'roadmap → why-it-matters metrics band'],
     change='✓ fully rebranded native rebuild (done)')
card(80, 620, cw, ch, 'Exhibition Trailer', 'physical prototyping',
     ['Image-forward: renders, animations, drawings lead; text supports'],
     change='add renders + animations (Andy has them)')
card(80, 820, cw, ch, 'Ella · Arquitectonica', 'built at scale',
     ['95-unit condo, CD 90%, completing 2026', 'Facade system + ground-plane story'],
     change='add renders + model shots (image system ready)')
# retired feasibility ghost
card(760, 820, cw, 150, 'Feasibility platform — RETIRED', 'was: shipped B2B SaaS',
     ['July 22: replaced by the two Algoma showcases.', 'Old links + stored state fall back to Full product study.'], ghost=True)
note(80, 1030, ['Reel order = the story order: the full arc first, then the two ways it shows up at work,', 'then physical proof, then built scale. Minis stay on the Work index.'])
parts.append(f'<circle cx="86" cy="1080" r="3.5" fill="{ORANGE}"/>')
parts.append(f'<text x="96" y="1084" font-size="12" font-weight="600" fill="{ORANGE}">Work page — Algoma section now: wireframe-components · platform-reports · zoning-chat · comps · site-search</text>')
note(80, 1112, ['Custom study pages share StudyKit.jsx (hero · carousel · impact cards · tail) — one grammar, three stories.'], color=ORANGE)

# ---------- WORK INDEX ----------
sect(1458, 360, 754, 800, 'Work index — one page, all sections')
rows = [
    ('INDEPENDENT · 2022–2026', ['Full product study', 'Exhibition Trailer']),
    ('ALGOMA — PRODUCT · 2024–', ['Wireframe component work', 'Platform driven reports', 'Zoning chat', 'Comps', 'Site search']),
    ('ARQUITECTONICA · 2022–24', ['Ella', 'Brickell']),
    ('FOUNDATIONS — PRATT', ['Fluxing', 'Pastoral Urbanity', 'Mesa Verde', 'Elevate Ravenswood', 'Dissection']),
    ('FOUNDATIONS — LEHIGH', ['Unit Multiplication', 'Singular + Flow', 'Riverfront', 'Culinary', 'Schoolhouse']),
    ('PLAYABLE', ['Ball Game · Unity']),
]
cy = 420
for label, chips_ in rows:
    parts.append(f'<text x="1490" y="{cy}" font-size="12" font-weight="700" letter-spacing="2" fill="{SAGE}">{esc(label)}</text>')
    cy += 14
    cxx = 1490
    for l in chips_:
        w = chip(cxx, cy, l, accent=(l in ('Wireframe component work', 'Platform driven reports', 'Full product study')))
        cxx += w + 8
        if cxx > 2000: cxx = 1490; cy += 38
    cy += 56
note(1490, cy+4, ['Orange outline = new/renamed this pass. ReelCard grammar everywhere;', 'silhouette linework fallback until tile images land.'])
note(1490, cy+46, ['Ball Game still NOT playable — fix the Unity WebGL export before launch.'], color=ORANGE)

# ---------- bottom strip ----------
py = H-110
parts.append(f'<rect x="48" y="{py}" width="{W-96}" height="76" rx="10" fill="{INK}"/>')
parts.append(f'<text x="70" y="{py+28}" font-size="12" font-weight="700" letter-spacing="2" fill="{CREAM}">STATUS — JULY 22, 2026</text>')
parts.append(f'<text x="70" y="{py+54}" font-size="13.5" fill="rgba(242,239,230,0.85)">DONE: reel of 5 · Full product study custom page · both Algoma showcases rebuilt native + rebranded · feasibility retired w/ fallbacks · next-chain rewired      TO DO: Ella + Trailer imagery · tile images for the two showcases · Algoma confidentiality check · Ball Game export · Notion embed re-upload</text>')

svg = f'''<svg viewBox="0 0 {W} {H}" width="{W}" height="{H}" xmlns="http://www.w3.org/2000/svg" font-family="Inter, -apple-system, system-ui, sans-serif" role="img">
<title>lachler.com site structure map</title>
<desc>Current information architecture, July 22 2026: home reel of five cards plus More, project layer with three custom study pages, unified Work index, feasibility retired.</desc>
<defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="{SAGE}"/></marker></defs>
{chr(10).join(parts)}
</svg>'''

svg_path = os.path.join(ROOT, "site-structure-map.svg")
open(svg_path, "w").write(svg)

wrapper = f'''<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>lachler.com — Site Structure Map</title>
<style>
body {{ margin:0; background:#E8E4D5; font-family:Inter,-apple-system,system-ui,sans-serif; }}
.bar {{ position:sticky; top:0; display:flex; gap:8px; align-items:center; padding:10px 16px; background:#14211C; color:#F2EFE6; }}
.bar b {{ font-size:14px; margin-right:auto; }}
.bar button {{ background:rgba(242,239,230,0.12); color:#F2EFE6; border:1px solid rgba(242,239,230,0.3); border-radius:6px; padding:4px 12px; font-size:13px; cursor:pointer; }}
#wrap {{ overflow:auto; }} #map {{ transform-origin:top left; width:{W}px; }}
</style></head><body>
<div class="bar"><b>lachler.com — site structure map (current IA · July 22, 2026)</b>
<button onclick="zoom(-0.15)">−</button><button onclick="zoom(0.15)">+</button><button onclick="fit()">Fit width</button></div>
<div id="wrap"><div id="map">
{svg}
</div></div>
<script>
let s = 1;
function apply() {{ document.getElementById('map').style.transform = 'scale(' + s + ')'; }}
function zoom(d) {{ s = Math.max(0.2, Math.min(3, s + d)); apply(); }}
function fit() {{ s = (window.innerWidth - 8) / {W}; apply(); }}
fit();
</script>
</body></html>'''
open(os.path.join(ROOT, "site-structure-map.html"), "w").write(wrapper)
print("written:", svg_path, "and site-structure-map.html")
