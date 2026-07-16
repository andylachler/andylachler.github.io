#!/usr/bin/env python3
# AutoEase flow & decision map — v2, research-first framing.
import html

W, H = 2340, 1700
FOREST, SAGE, BONE, STONE, KHAKI, AMBER, CHAR = "#2B3A2F", "#7A8471", "#EDE7D8", "#E0D7C2", "#C4B393", "#D9A441", "#1C1C1A"
CREAM = "#F6F2E7"
parts = []
def esc(s): return html.escape(s, quote=True)

def stage(x, y, w, h, title, subs=(), fill=FOREST, tcol=CREAM, scol="rgba(246,242,231,0.72)", r=10, fs=15.5):
    parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}"/>')
    ty = y + 26
    parts.append(f'<text x="{x+18}" y="{ty}" font-size="{fs}" font-weight="600" fill="{tcol}">{esc(title)}</text>')
    for s in subs:
        ty += 19
        parts.append(f'<text x="{x+18}" y="{ty}" font-size="12.5" fill="{scol}">{esc(s)}</text>')

def stage_light(x, y, w, h, title, subs=()):
    stage(x, y, w, h, title, subs, fill=CREAM, tcol=CHAR, scol="rgba(28,28,26,0.6)")
    parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="10" fill="none" stroke="{SAGE}" stroke-width="1.2"/>')

def diamond(cx, cy, w, h, lines):
    parts.append(f'<path d="M {cx} {cy-h/2} L {cx+w/2} {cy} L {cx} {cy+h/2} L {cx-w/2} {cy} Z" fill="{BONE}" stroke="{AMBER}" stroke-width="2.2"/>')
    n = len(lines); ty = cy - (n-1)*8
    for ln in lines:
        parts.append(f'<text x="{cx}" y="{ty+4}" font-size="12.5" font-weight="600" fill="{CHAR}" text-anchor="middle">{esc(ln)}</text>')
        ty += 16

def exitpill(cx, cy, w, label, sub=None, fill=AMBER, tcol=CHAR):
    h = 54 if sub else 40
    sc = 'rgba(28,28,26,0.7)' if fill == AMBER else 'rgba(246,242,231,0.75)'
    parts.append(f'<rect x="{cx-w/2}" y="{cy-h/2}" width="{w}" height="{h}" rx="{h/2}" fill="{fill}"/>')
    if sub:
        parts.append(f'<text x="{cx}" y="{cy-3}" font-size="13.5" font-weight="700" fill="{tcol}" text-anchor="middle">{esc(label)}</text>')
        parts.append(f'<text x="{cx}" y="{cy+15}" font-size="11.5" fill="{sc}" text-anchor="middle">{esc(sub)}</text>')
    else:
        parts.append(f'<text x="{cx}" y="{cy+5}" font-size="13.5" font-weight="700" fill="{tcol}" text-anchor="middle">{esc(label)}</text>')

def arrow(x1, y1, x2, y2, dashed=False, label=None, lx=None, ly=None, curve=None):
    dash = ' stroke-dasharray="6 5"' if dashed else ''
    if curve:
        parts.append(f'<path d="M {x1} {y1} Q {curve[0]} {curve[1]} {x2} {y2}" fill="none" stroke="{SAGE}" stroke-width="1.8"{dash} marker-end="url(#arr)"/>')
    else:
        parts.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{SAGE}" stroke-width="1.8"{dash} marker-end="url(#arr)"/>')
    if label:
        lx = lx if lx is not None else (x1+x2)/2
        ly = ly if ly is not None else (y1+y2)/2 - 8
        tw = len(label)*6.4 + 12
        parts.append(f'<rect x="{lx-tw/2}" y="{ly-12}" width="{tw}" height="18" rx="9" fill="{BONE}"/>')
        parts.append(f'<text x="{lx}" y="{ly+1}" font-size="11.5" font-weight="600" fill="{CHAR}" text-anchor="middle">{esc(label)}</text>')

def note(x, y, lines, anchor="start"):
    ty = y
    for ln in lines:
        parts.append(f'<text x="{x}" y="{ty}" font-size="11.5" font-style="italic" fill="{SAGE}" text-anchor="{anchor}">{esc(ln)}</text>')
        ty += 15

def lanehead(cx, y, label):
    parts.append(f'<text x="{cx}" y="{y}" font-size="12" font-weight="700" letter-spacing="2.5" fill="{SAGE}" text-anchor="middle">{esc(label.upper())}</text>')

# ---------- canvas / title / legend ----------
parts.append(f'<rect width="{W}" height="{H}" fill="{BONE}"/>')
parts.append(f'<text x="48" y="64" font-size="30" font-weight="700" fill="{CHAR}">AutoEase — flow &amp; decision map</text>')
parts.append(f'<text x="48" y="92" font-size="14" fill="rgba(28,28,26,0.65)">Decision-first, research-backed. The vehicle is the unit of research — buying is a door at the edge of the map, not the destination.</text>')
lx0 = 1660
parts.append(f'<rect x="{lx0}" y="34" width="640" height="70" rx="10" fill="{CREAM}" stroke="{KHAKI}" stroke-width="1"/>')
parts.append(f'<rect x="{lx0+18}" y="52" width="70" height="26" rx="7" fill="{FOREST}"/>')
parts.append(f'<text x="{lx0+98}" y="69" font-size="12" fill="{CHAR}">Stage</text>')
parts.append(f'<path d="M {lx0+180} 65 L {lx0+202} 52 L {lx0+224} 65 L {lx0+202} 78 Z" fill="{BONE}" stroke="{AMBER}" stroke-width="2"/>')
parts.append(f'<text x="{lx0+234}" y="69" font-size="12" fill="{CHAR}">Decision point</text>')
parts.append(f'<rect x="{lx0+340}" y="52" width="76" height="26" rx="13" fill="{AMBER}"/>')
parts.append(f'<text x="{lx0+426}" y="69" font-size="12" fill="{CHAR}">Exit</text>')
parts.append(f'<line x1="{lx0+490}" y1="65" x2="{lx0+540}" y2="65" stroke="{SAGE}" stroke-width="1.8" stroke-dasharray="6 5"/>')
parts.append(f'<text x="{lx0+550}" y="69" font-size="12" fill="{CHAR}">Cross-flow</text>')

# ---------- HUB ----------
hubx = 1170
stage(hubx-160, 118, 320, 66, 'Home — “Every car, known.”', ['Information for the consumer — no signup gate'])
diamond(hubx, 266, 300, 96, ['What do you need?'])
arrow(hubx, 184, hubx, 216)

GX, RX, PX, SX = 300, 855, 1560, 2040
lanehead(GX, 392, 'Guided — “Answers”')
lanehead(RX, 392, 'Research — the core')
lanehead(PX, 392, 'Price check')
lanehead(SX, 392, 'Sell')

arrow(hubx-150, 266, GX+30, 405, label='not sure what to want', lx=620, ly=316, curve=(GX+150, 276))
arrow(hubx-70, 302, RX, 405, label='research a car or brand', lx=980, ly=368, curve=(RX+60, 330))
arrow(hubx+150, 266, PX-20, 405, label='checking a listing', lx=1430, ly=322, curve=(PX-110, 280))
arrow(hubx+130, 292, SX-40, 405, label='selling a car', lx=1850, ly=350, curve=(SX-170, 300))

# ---------- GUIDED LANE ----------
gw, gh, ggap = 370, 56, 12
gy = 414
qs = [
    ('Q1 · Purpose', 'Daily driver · family · out of town · occasional'),
    ('Q2 · Budget', 'Total price ↔ per month toggle'),
    ('Q3 · Condition', 'Newer only · ≤5 yr/60k · reliability-first'),
    ('Q4 · Must-haves', 'AWD · 3rd row · hybrid/EV · cargo — skippable'),
    ('Q5 · Location + timeline', 'ZIP · this week → flexible'),
]
for i, (t, s) in enumerate(qs):
    stage(GX-gw/2, gy, gw, gh, t, [s], fs=14.5)
    if i < len(qs)-1: arrow(GX, gy+gh, GX, gy+gh+ggap)
    gy += gh + ggap
stage_light(GX-gw/2, gy, gw, 58, 'Thinking — cross-checking sources', ['KBB · Edmunds · JD Power · NHTSA'])
arrow(GX, gy-12, GX, gy)
gy += 72
stage(GX-gw/2, gy, gw, 62, 'Results — 3 ranked matches', ['Fit-ranked with “here’s why” — rank, don’t list'])
arrow(GX, gy-14, GX, gy)
resy = gy + 31
arrow(GX+gw/2, resy, 545, resy-30, curve=(515, resy-4))
note(GX-gw/2, resy+52, ['each of the 3 matches opens its vehicle research hub →'])

# ---------- RESEARCH LANE ----------
stage(RX-215, 414, 430, 72, 'Search or browse', ['Car, brand, or body style — the make → model → year', 'library: every model-year is a real page'])

# hub container
hx, hy, hw, hh = 545, 560, 620, 512
parts.append(f'<rect x="{hx}" y="{hy}" width="{hw}" height="{hh}" rx="14" fill="{CREAM}" stroke="{FOREST}" stroke-width="2"/>')
parts.append(f'<text x="{hx+24}" y="{hy+34}" font-size="17" font-weight="700" fill="{CHAR}">Vehicle research hub — the core surface</text>')
parts.append(f'<text x="{hx+24}" y="{hy+55}" font-size="12.5" fill="rgba(28,28,26,0.6)">One page per model-year. Everything knowable, every claim sourced. The listing is an afterthought.</text>')
arrow(RX, 486, RX, hy, label='pick a vehicle')

# featured module: KBB fair value + mileage slider
kx, ky, kw, kh = hx+22, hy+74, hw-44, 128
parts.append(f'<rect x="{kx}" y="{ky}" width="{kw}" height="{kh}" rx="10" fill="{FOREST}"/>')
parts.append(f'<rect x="{kx}" y="{ky}" width="{kw}" height="{kh}" rx="10" fill="none" stroke="{AMBER}" stroke-width="2.4"/>')
parts.append(f'<text x="{kx+18}" y="{ky+27}" font-size="15" font-weight="600" fill="{CREAM}">KBB fair value · mileage slider</text>')
parts.append(f'<text x="{kx+18}" y="{ky+46}" font-size="12.5" fill="rgba(246,242,231,0.72)">Live fair value for the selected vehicle — drag the miles, watch the price move</text>')
sx0, sy0, sw0 = kx+18, ky+92, kw-220
parts.append(f'<line x1="{sx0}" y1="{sy0}" x2="{sx0+sw0}" y2="{sy0}" stroke="rgba(246,242,231,0.35)" stroke-width="4" stroke-linecap="round"/>')
parts.append(f'<line x1="{sx0}" y1="{sy0}" x2="{sx0+sw0*0.42}" y2="{sy0}" stroke="{AMBER}" stroke-width="4" stroke-linecap="round"/>')
parts.append(f'<circle cx="{sx0+sw0*0.42}" cy="{sy0}" r="8" fill="{CREAM}" stroke="{AMBER}" stroke-width="2.5"/>')
parts.append(f'<text x="{sx0}" y="{sy0+22}" font-size="10.5" fill="rgba(246,242,231,0.55)">20k mi</text>')
parts.append(f'<text x="{sx0+sw0}" y="{sy0+22}" font-size="10.5" fill="rgba(246,242,231,0.55)" text-anchor="end">120k mi</text>')
parts.append(f'<text x="{sx0+sw0*0.42}" y="{sy0-16}" font-size="11" font-weight="600" fill="{CREAM}" text-anchor="middle">62k mi</text>')
parts.append(f'<text x="{kx+kw-18}" y="{sy0-6}" font-size="20" font-weight="700" fill="{AMBER}" text-anchor="end" font-family="JetBrains Mono, monospace">$21,940</text>')

# module grid 2x3 (wait: 5 remaining modules -> 2 cols, rows of 2/2/1)
mods = [
    ('Specs & trims', ['Engines, dimensions, features', 'by trim and model-year']),
    ('Reliability & 5-yr true cost', ['JD Power scores · Edmunds-style', 'cost composition over 60 months']),
    ('Recalls & safety', ['NHTSA recalls + investigations,', 'first-class — never buried']),
    ('News — live scraped', ['Long-term tests, comparisons,', 'known-issue reporting, refresh news']),
    ('Owner reviews', ['Real owners, dimension ratings —', 'reliability · cost surprises · livability']),
]
mw, mh, mgap = (hw-44-16)/2, 84, 16
for i, (t, subs) in enumerate(mods):
    col, row = i % 2, i // 2
    mx = hx+22 + col*(mw+16)
    my = ky+kh+14 + row*(mh+mgap)
    stage(mx, my, mw, mh, t, subs, fs=14)
note(hx+hw-292, ky+kh+14+2*(mh+mgap)+30, ['sourced logos visible on every claim —', 'no house score, no black box'])

# ---------- after the hub: where next ----------
d1y = hy+hh+68
diamond(RX, d1y, 260, 96, ['Where to', 'next?'])
arrow(RX, hy+hh, RX, d1y-48)
# loop: another vehicle — routed around the hub's right side
parts.append(f'<path d="M {RX+130} {d1y} Q 1235 {d1y-20} 1235 800 Q 1235 520 1085 484" fill="none" stroke="{SAGE}" stroke-width="1.8" stroke-dasharray="6 5" marker-end="url(#arr)"/>')
parts.append(f'<rect x="1176" y="778" width="160" height="18" rx="9" fill="{BONE}"/>')
parts.append(f'<text x="1256" y="791" font-size="11.5" font-weight="600" fill="{CHAR}" text-anchor="middle">research another vehicle</text>')
# informed exit
exitpill(370, d1y+130, 300, 'Done — informed', 'a successful session, no purchase', fill=FOREST, tcol=CREAM)
arrow(RX-90, d1y+34, 522, d1y+120, label='that’s all I needed', lx=610, ly=d1y+92)
note(240, d1y+180, ['the design statement: research alone is success'])
# opt-in buying
by = d1y + 92
stage(RX-215, by, 430, 76, 'Buying options near you — opt-in', ['Listings near your ZIP, each price-checked vs fair range', 'A door, not a funnel — appears only when you ask'])
arrow(RX, d1y+48, RX, by, label='“show me one near me”', lx=RX+118, ly=by-24)
uy = by + 76 + 34
stage(RX-215, uy, 430, 84, 'Unlock — “This is where you choose.”', ['72-hour price hold · free to cancel', 'Share name + ZIP + email — you set the rules'], fill=CHAR)
parts.append(f'<rect x="{RX-215}" y="{uy}" width="430" height="84" rx="10" fill="none" stroke="{AMBER}" stroke-width="2.4"/>')
arrow(RX, by+76, RX, uy, label='reach out on your terms', lx=RX+130, ly=uy-16)
d2y = uy + 84 + 52
diamond(RX, d2y, 250, 88, ['Share contact', 'with dealer?'])
arrow(RX, uy+84, RX, d2y-44)
exitpill(RX+340, d2y, 260, 'Dealer handoff', 'on the buyer’s terms — price held')
arrow(RX+125, d2y, RX+210, d2y, label='yes', lx=RX+166, ly=d2y-12)
arrow(RX-125, d2y, 520, d1y+152, dashed=True, label='walk away — still informed', lx=470, ly=d2y-40, curve=(430, d2y-60))

# ---------- PRICE CHECK LANE ----------
pw = 380
stage(PX-pw/2, 414, pw, 66, 'Price check — “Is this deal fair?”', ['Paste any listing URL · enter manually · sample'])
arrow(PX, 480, PX, 504)
stage(PX-pw/2, 504, pw, 84, 'Verdict', ['Asking vs. sourced fair-market range (KBB…)', 'e.g. asking $27,900 · fair $25,900 → “Overpriced”'])
d4y = 588 + 58
diamond(PX, d4y, 230, 90, ['Fair deal?'])
arrow(PX, 588, PX, d4y-45)
exitpill(PX+40, d4y+136, 280, 'Negotiate / buy with data', 'the fair range is your leverage')
arrow(PX, d4y+45, PX+34, d4y+108, label='fair', lx=PX-30, ly=d4y+80)
arrow(PX-115, d4y, hx+hw, hy+120, dashed=True, label='overpriced — research alternatives', lx=1300, ly=622, curve=(1290, 660))

# ---------- SELL LANE ----------
sw, sy = 380, 414
stage(SX-sw/2, sy, sw, 62, 'Sell — instant cash offer', ['License plate or 17-char VIN · priced in 2 minutes'])
arrow(SX, sy+62, SX, sy+86); sy += 86
stage(SX-sw/2, sy, sw, 62, 'Step 1 · “We found your car.”', ['Matched vs NHTSA · IHS Markit · DMV — confirm'])
d5y = sy + 62 + 46
diamond(SX, d5y, 200, 76, ['Your car?'])
arrow(SX, sy+62, SX, d5y-38)
arrow(SX+100, d5y, SX+148, d5y-4, dashed=True)
parts.append(f'<text x="{SX+156}" y="{d5y}" font-size="11.5" font-style="italic" fill="{SAGE}">no → edit / re-enter VIN</text>')
sy = d5y + 38 + 20
stage(SX-sw/2, sy, sw, 78, 'Step 2 · Condition', ['Exterior + interior — “be honest, we’d rather', 'quote accurately now than surprise you”'])
arrow(SX, d5y+38, SX, sy, label='yes', lx=SX-40, ly=d5y+48)
arrow(SX, sy+78, SX, sy+100); sy += 100
stage(SX-sw/2, sy, sw, 84, 'Your offer — locked 7 days', ['Cash offer as % of market retail, itemized —', '“How we got there” — information for sellers'])
d6y = sy + 84 + 50
diamond(SX, d6y, 230, 88, ['Accept', 'the offer?'])
arrow(SX, sy+84, SX, d6y-44)
exitpill(SX, d6y+126, 250, 'Handoff + payment')
arrow(SX, d6y+44, SX, d6y+106, label='yes', lx=SX+34, ly=d6y+76)
arrow(SX+115, d6y, SX+182, d6y-4, dashed=True)
parts.append(f'<text x="{SX+120}" y="{d6y-14}" font-size="11.5" font-style="italic" fill="{SAGE}">no → keep the car</text>')
arrow(SX-115, d6y, hubx+170, 184, dashed=True, label='“selling is shopping” — sellers research their next car', lx=1650, ly=200, curve=(1760, 170))

# ---------- principles strip ----------
py = H-96
parts.append(f'<rect x="48" y="{py}" width="{W-96}" height="64" rx="10" fill="{STONE}"/>')
parts.append(f'<text x="70" y="{py+26}" font-size="12" font-weight="700" letter-spacing="2" fill="{CHAR}">DESIGN PRINCIPLES BEHIND THE MAP</text>')
principles = '1 · The vehicle is the unit of research, not the listing    2 · Source every claim to a neutral third party    3 · Research alone is a successful session    4 · Buying is a door, not a funnel    5 · No contact info until Unlock    6 · One decision per screen'
parts.append(f'<text x="70" y="{py+48}" font-size="13" fill="rgba(28,28,26,0.75)">{esc(principles)}</text>')

svg = f'''<svg viewBox="0 0 {W} {H}" width="{W}" height="{H}" xmlns="http://www.w3.org/2000/svg" font-family="Inter, -apple-system, system-ui, sans-serif" role="img">
<title>AutoEase flow and decision map — research-first</title>
<desc>Research-first map: guided answers, vehicle research hub with KBB fair-value mileage slider, price check, and sell flows, with buying as an opt-in exit.</desc>
<defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="{SAGE}"/></marker></defs>
{chr(10).join(parts)}
</svg>'''
open("/sessions/nifty-magical-curie/mnt/Documents--Lachler Studio/autoease/autoease-flow-map.svg", "w").write(svg)
print("written")
