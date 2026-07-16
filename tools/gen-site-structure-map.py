#!/usr/bin/env python3
# lachler.com site structure map — proposed IA, July 2026
import html
W, H = 2260, 1330
INK, CREAM, STONE, FOREST, ORANGE, SAGE = "#14211C", "#F2EFE6", "#E8E4D5", "#3D5448", "#D45A1B", "rgba(20,33,28,0.55)"
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
    # proves tag
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
parts.append(f'<text x="48" y="92" font-size="14" fill="{SAGE}">Current IA, July 2026 — redlined + executed. Every piece placed by what it proves. Orange = still to do (mostly images).</text>')

# Legend
lx = 1620
parts.append(f'<rect x="{lx}" y="34" width="600" height="70" rx="10" fill="{CREAM}" stroke="rgba(20,33,28,0.15)"/>')
parts.append(f'<rect x="{lx+18}" y="52" width="64" height="24" rx="7" fill="{FOREST}"/>')
parts.append(f'<text x="{lx+92}" y="68" font-size="12" fill="{INK}">Page / tile</text>')
parts.append(f'<rect x="{lx+175}" y="52" width="64" height="24" rx="7" fill="none" stroke="{SAGE}" stroke-dasharray="7 5" stroke-width="1.4"/>')
parts.append(f'<text x="{lx+249}" y="68" font-size="12" fill="{INK}">Moving / ghost</text>')
parts.append(f'<circle cx="{lx+360}" cy="64" r="4" fill="{ORANGE}"/>')
parts.append(f'<text x="{lx+372}" y="68" font-size="12" fill="{INK}">Change to make</text>')
parts.append(f'<line x1="{lx+480}" y1="64" x2="{lx+520}" y2="64" stroke="{ORANGE}" stroke-width="2" stroke-dasharray="3 4"/>')
parts.append(f'<text x="{lx+530}" y="68" font-size="12" fill="{INK}">Physical thread</text>')

# ---------- HOME band ----------
sect(48, 130, W-96, 190, 'Home — the identity layer')
card(80, 176, 640, 118, 'Hero', 'the thesis', ['“A product designer trained as an architect.”'], change='tagline/positioning under review — tabled for now')
card(760, 176, 660, 118, 'Selected-work carousel', 'range at a glance', ['“Product design, research, and prototyping — digital and physical.”'], change='✓ tightened to 4 tiles (done)')
card(1460, 176, 720, 118, 'Nav + dropdowns', 'wayfinding', ['Work · Archive · About · project deep-links'], change='✓ renamed “Foundations” (done)')

# ---------- WORK ----------
sect(48, 360, 1010, 800, 'Work — the featured four')
cw, ch = 460, 180
positions = [(80, 420), (570, 420), (80, 630), (570, 630)]
card(*positions[0], cw, ch, 'AutoEase', '0→1 product thinking', ['Research → strategy → brand → working prototype', 'Research-first info app; mileage-slider demo coming'], change='storyline resequence pending (own ticket)')
card(*positions[1], cw, ch, 'Feasibility platform · Algoma', 'shipped B2B SaaS', ['Component stories: zoning chat · comps · site search —', 'step-by-step UX development, not clickable demos'], change='former orphans now linked; embeds retired')
card(*positions[2], cw, ch, 'Exhibition Trailer', 'physical prototyping', ['IMAGE-FORWARD: renders, animations, and', 'static drawings lead; text supports'], change='add renders + animations (Andy has them)')
card(*positions[3], cw, ch, 'Ella · Arquitectonica', 'built at scale', ['95-unit condo, CD 90%, completing 2026', 'Facade system + ground-plane story'], change='add renders + model shots (image system ready)')
# Brickell ghost
card(80, 850, cw, 150, 'Brickell residential', 'built depth', ['Mass timber, 32 units — thinnest case study'], change='✓ moved to Foundations (done)', ghost=True)
# orphan pages note
parts.append(f'<rect x="570" y="850" width="{cw}" height="150" rx="10" fill="{CREAM}" stroke="rgba(20,33,28,0.18)"/>')
parts.append(f'<text x="588" y="878" font-size="14" font-weight="600" fill="{INK}">✓ Mini UX studies — “Algoma — Product” on the Work page</text>')
parts.append(f'<text x="588" y="900" font-size="12.5" fill="{SAGE}">zoning-chat · comps · site-search: tiles under Algoma — Product,</text>')
parts.append(f'<text x="588" y="918" font-size="12.5" fill="{SAGE}">cards on the Feasibility page. One new mini per wireframe upload.</text>')
parts.append(f'<circle cx="594" cy="944" r="3.5" fill="{ORANGE}"/>')
parts.append(f'<text x="604" y="948" font-size="12" font-weight="600" fill="{ORANGE}">ready to convert: Rendering Module · Address &amp; Naming</text>')
note(80, 1052, ['Grid order = the story order: product first, physical proof second, scale third.'])
note(80, 1090, ['Physical is WOVEN here — model shots and process photos inside each case study,', 'not a separate section. The images task is what makes this real.'], color=ORANGE)

# ---------- FOUNDATIONS ----------
sect(1108, 360, 660, 800, 'Foundations — reframed from “Archive”')
parts.append(f'<circle cx="1140" cy="424" r="3.5" fill="{ORANGE}"/>')
parts.append(f'<text x="1150" y="428" font-size="12.5" font-weight="600" fill="{ORANGE}">grid pages = photographs + a story each — the model-making</text>')
parts.append(f'<text x="1150" y="446" font-size="12.5" font-weight="600" fill="{ORANGE}">showcase. Photo galleries wired; needs the photographs.</text>')
parts.append(f'<text x="1140" y="490" font-size="12" font-weight="700" letter-spacing="2" fill="{SAGE}">FEATURED ROW</text>')
cy = 508
labels = ['Fluxing — thesis', 'Pastoral Urbanity', 'Mesa Verde ✓silhouette', 'Elevate Ravenswood', 'Unit Multiplication']
cxx = 1140
for l in labels:
    w = chip(cxx, cy, l)
    cxx += w + 10
    if cxx + 160 > 1740: cxx = 1140; cy += 40
cy += 52
chip(1140, cy, '✓ Brickell residential — arrived from Work')
parts.append(f'<text x="1140" y="{cy+52}" font-size="12" font-weight="700" letter-spacing="2" fill="{SAGE}">GRID</text>')
cy += 62
cxx = 1140
for l in ['Bethlehem Riverfront', 'One Room Schoolhouse', 'Culinary Institute', 'Singular Dev + Flow']:
    w = chip(cxx, cy, l)
    cxx += w + 10
    if cxx > 1600: cxx = 1140; cy += 40
cy += 64
parts.append(f'<text x="1140" y="{cy}" font-size="12" font-weight="700" letter-spacing="2" fill="{SAGE}">PLAYABLES</text>')
cy += 14
chip(1140, cy, 'Ball Game · Unity', accent=True)
note(1310, cy+12, ['✓ Ground Is Lava removed'])
note(1140, cy+58, ['Ball Game is NOT currently playable — fix or', 'rebuild the Unity WebGL export before launch'], color=ORANGE)
note(1140, cy+100, ['Silhouette program: hand-traced linework IS physical', 'craft on a digital surface — say so in the lede.'], color=ORANGE)

# ---------- ABOUT ----------
sect(1816, 360, 396, 800, 'About')
card(1846, 420, 336, 150, 'Bio + identity', 'who this person is', ['Product designer, end-to-end, both', 'mediums (rewritten Jul 15)', 'Education · languages · contact'])
card(1846, 600, 336, 168, 'Craft strip — NEW', 'hands, not just pixels', ['Carpentry · 3D printing · model', 'making — photo strip, not a', 'sentence'], change='needs photos of the work')
note(1846, 810, ['This is where “woven physical”', 'gets its About-page anchor.'])

# ---------- moves + thread ----------
# Brickell move arrow
parts.append(f'<path d="M 545 1000 Q 880 1090 1132 660" fill="none" stroke="{SAGE}" stroke-width="1.8" stroke-dasharray="7 5" marker-end="url(#arr)"/>')
# physical thread: Trailer -> Ella -> Foundations -> Craft strip
parts.append(f'<path d="M 300 812 Q 770 900 1106 700" fill="none" stroke="{ORANGE}" stroke-width="2" stroke-dasharray="3 4"/>')
parts.append(f'<path d="M 1770 620 Q 1805 630 1844 648" fill="none" stroke="{ORANGE}" stroke-width="2" stroke-dasharray="3 4"/>')

# ---------- bottom strip ----------
py = H-110
parts.append(f'<rect x="48" y="{py}" width="{W-96}" height="76" rx="10" fill="{INK}"/>')
parts.append(f'<text x="70" y="{py+28}" font-size="12" font-weight="700" letter-spacing="2" fill="{CREAM}">STATUS — JULY 15, 2026</text>')
parts.append(f'<text x="70" y="{py+54}" font-size="13.5" fill="rgba(242,239,230,0.85)">DONE: grid of 4 · Foundations + galleries populated · tiles w/ offset images · Work page: Algoma — Product / Arquitectonica — Architecture · mini-study pipeline live      TO DO: Ella + Fluxing images · AutoEase tile · fix Ball Game · mini-study content depth · hero tagline (tabled)</text>')

svg = f'''<svg viewBox="0 0 {W} {H}" width="{W}" height="{H}" xmlns="http://www.w3.org/2000/svg" font-family="Inter, -apple-system, system-ui, sans-serif" role="img">
<title>lachler.com site structure map</title>
<desc>Proposed information architecture: Home identity layer, Work featured four, Foundations (reframed archive), About with craft strip.</desc>
<defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="{SAGE}"/></marker></defs>
{chr(10).join(parts)}
</svg>'''
open("/sessions/nifty-magical-curie/mnt/Documents--Lachler Studio/site-structure-map.svg", "w").write(svg)
print("written")
