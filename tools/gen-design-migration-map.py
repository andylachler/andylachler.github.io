#!/usr/bin/env python3
# Design-language migration map: v4 concept -> lachler.com. Flow preserved.
import html
W, H = 2200, 1300
INK, CREAM, PAPER, FOREST, ORANGE, SAGE = "#14211C", "#F2EFE6", "#E8E4D5", "#3D5448", "#D45A1B", "rgba(20,33,28,0.55)"
parts = []
def esc(t): return html.escape(t, quote=True)
def box(x, y, w, h, title, subs=(), fill=FOREST, tc="#F2EFE6", sc="rgba(242,239,230,0.72)", stroke=None, r=10, fs=15):
    parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}"{f" stroke=~{stroke}~ stroke-width=~1.6~".replace("~",chr(34)) if stroke else ""}/>')
    ty = y + 26
    parts.append(f'<text x="{x+16}" y="{ty}" font-size="{fs}" font-weight="600" fill="{tc}">{esc(title)}</text>')
    for sub in subs:
        ty += 18
        parts.append(f'<text x="{x+16}" y="{ty}" font-size="12" fill="{sc}">{esc(sub)}</text>')
def label(x, y, t, c=INK): parts.append(f'<text x="{x}" y="{y}" font-size="13" font-weight="700" letter-spacing="2.5" fill="{c}">{esc(t.upper())}</text>')
def note(x, y, lines, c=SAGE):
    ty = y
    for ln in lines:
        parts.append(f'<text x="{x}" y="{ty}" font-size="11.5" font-style="italic" fill="{c}">{esc(ln)}</text>'); ty += 15
def arrow(x1,y1,x2,y2):
    parts.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{SAGE}" stroke-width="1.8" marker-end="url(#arr)"/>')

parts.append(f'<rect width="{W}" height="{H}" fill="{PAPER}"/>')
parts.append(f'<text x="48" y="62" font-size="30" font-weight="700" fill="{INK}">Design-language migration — v4 concept → lachler.com</text>')
parts.append(f'<text x="48" y="90" font-size="14" fill="{SAGE}">The flow does not change. The skin does — in six phases, each tested in design-lab.html, each its own commit, each reversible.</text>')

# ── PRESERVED (left) ──
px, py = 48, 130
parts.append(f'<rect x="{px}" y="{py}" width="480" height="560" rx="14" fill="{CREAM}" stroke="rgba(20,33,28,0.18)"/>')
label(px+22, py+36, "Untouchable — the guarantee list")
items = [
 "SPA flow: every page, route, and next-chain stays",
 "Gate + password (loader runs AFTER the gate)",
 "Nav logic: pills, dropdowns, mobile menu, overDark",
 "Image system: manifest, galleries, tiles, videos",
 "Component stories + mini-study pipeline",
 "All copy and positioning (digital + physical)",
 "Mobile fixes (svh hero, top padding) carry over",
 "HeroBg perf pattern (idle-stop) carries into dot field",
 "SEO title/meta · OG plans · analytics-readiness",
]
ty = py + 66
for it in items:
    parts.append(f'<circle cx="{px+30}" cy="{ty-4}" r="3" fill="{FOREST}"/>')
    parts.append(f'<text x="{px+42}" y="{ty}" font-size="13" fill="rgba(20,33,28,0.75)">{esc(it)}</text>')
    ty += 28
note(px+22, ty+14, ["Explicitly OUT (not on the keep-list): custom difference-", "blend cursor. Flagged, not ported."], ORANGE)

# ── HOME BEFORE/AFTER (center) ──
cx = 570
label(cx, 160, "Home page — before → after (same slots, new skin)")
# before column
bx = cx; bw = 360
parts.append(f'<text x="{bx}" y="196" font-size="11" font-weight="700" letter-spacing="2" fill="{SAGE}">BEFORE</text>')
box(bx, 208, bw, 74, 'Hero — dark', ['Blueprint parallax canvas', 'Inter headline'])
box(bx, 294, bw, 74, 'ScrollWork — cream', ['Pinned vertical carousel of featured'], fill=CREAM, tc=INK, sc=SAGE, stroke="rgba(20,33,28,0.25)")
box(bx, 380, bw, 60, 'Foundations teaser — cream', [], fill=CREAM, tc=INK, sc=SAGE, stroke="rgba(20,33,28,0.25)")
box(bx, 452, bw, 52, 'Footer — cream', [], fill=CREAM, tc=INK, sc=SAGE, stroke="rgba(20,33,28,0.25)")
# after column
ax = cx + 420; aw = 400
parts.append(f'<text x="{ax}" y="196" font-size="11" font-weight="700" letter-spacing="2" fill="{SAGE}">AFTER</text>')
box(ax, 208, aw, 96, 'Hero — dark (the cover)', ['Dot field (mouse-reactive, perf-hardened)', 'Serif headline + line-reveal · same copy', 'Loader plays once per session, post-gate'], fill=INK)
box(ax, 316, aw, 88, 'Reel — dark, replaces ScrollWork slot', ['6 cards: featured 4 + minis door + Foundations door', 'Image cards + ghost letters · constant scroll rate', 'Mobile: stacked cards'], fill=INK)
box(ax, 416, aw, 74, 'Foundations teaser — FIRST CREAM', ['Nav + rail flip to ink here (v4 navTheme)', 'Cream continues to footer — “the book”'], fill=CREAM, tc=INK, sc=SAGE, stroke="rgba(20,33,28,0.25)")
box(ax, 502, aw, 52, 'Footer — cream + NYC clock in nav', [], fill=CREAM, tc=INK, sc=SAGE, stroke="rgba(20,33,28,0.25)")
for yy in (245, 331, 410, 478):
    arrow(bx+bw+12, yy, ax-12, yy)
# interior pages
box(cx, 560, 820, 96, 'Interior pages (About · Work · Foundations · project pages) — typography reskin ONLY', [
 'Already cream — they become “the book” for free. Serif display titles, mono eyebrows/labels/facts tables.',
 'Dark stays reserved for hero tiles. Layouts, galleries, component stories: untouched.'], fill=CREAM, tc=INK, sc=SAGE, stroke="rgba(20,33,28,0.25)")
note(cx, 692, ['The dark→cream boundary already exists on the live site (hero → ScrollWork). The migration extends dark through the reel,', 'then flips — matching v4 exactly. No page changes its position in the flow.'])

# ── PHASES (bottom) ──
label(48, 770, "Six phases — in order, each independently shippable")
phases = [
 ("P0 · Fonts + tokens", "S", ['Self-host Instrument Serif + JetBrains Mono', 'CSS vars: --ff-serif / --ff-mono', 'No visual change yet — pure foundation']),
 ("P1 · Chrome", "M", ['NYC clock in nav (desktop)', 'Mono eyebrows, labels, facts tables', 'Serif display on page titles']),
 ("P2 · Hero", "M", ['Dot field replaces blueprint canvas', 'Idle-stop + DPR cap + mobile static', 'Serif hero + rline reveal, same copy']),
 ("P3 · Loader", "S", ['AL mark stroke-draw → fill', 'Once per session (sessionStorage)', 'Runs after Gate, never before']),
 ("P4 · Reel", "L", ['Replaces ScrollWork slot on home', 'Doors wire to onNavigate (work/archive)', 'Ghost letters until tiles exist · mobile stack']),
 ("P5 · Polish", "M", ['Nav ink-flip at cream boundary', 'Interior typography audit', 'Decide: ghost letters vs SVG patterns as tile fallback']),
]
pxx, pyy, pw, ph, gap = 48, 792, 336, 150, 18
for i, (t, eff, subs) in enumerate(phases):
    x = pxx + (i % 3) * (pw + gap); y = pyy + (i // 3) * (ph + gap)
    box(x, y, pw, ph, f'{t}  ·  {eff}', subs, fill=FOREST)
    if i < 5:
        if i % 3 < 2: arrow(x+pw, y+ph/2, x+pw+gap, y+ph/2)
parts.append(f'<text x="{pxx+3*(pw+gap)+10}" y="{pyy+70}" font-size="12" fill="{SAGE}" font-style="italic">Per-phase gate:</text>')
for j, g in enumerate(['1 · build in design-lab.html', '2 · FPS meter + Phone preset check', '3 · commit (one phase, one commit)', '4 · live check, then next phase']):
    parts.append(f'<text x="{pxx+3*(pw+gap)+10}" y="{pyy+96+j*22}" font-size="12.5" fill="rgba(20,33,28,0.75)">{esc(g)}</text>')

# ── DECISIONS strip ──
dy = H-120
parts.append(f'<rect x="48" y="{dy}" width="{W-96}" height="82" rx="10" fill="{INK}"/>')
parts.append(f'<text x="70" y="{dy+30}" font-size="12" font-weight="700" letter-spacing="2" fill="#F2EFE6">OPEN DECISIONS — CHEAP TO DEFER, FLAGGED NOW</text>')
parts.append(f'<text x="70" y="{dy+56}" font-size="13" fill="rgba(242,239,230,0.85)">a · Tile fallback on interior grids: ghost serif letters (v4) vs current SVG patterns/silhouettes — silhouettes stay for Foundations either way      b · Optional manifesto line between reel and teaser      c · Custom cursor: out unless requested      d · v4 file + design-lab stay as the reference implementations</text>')

svg = f'''<svg viewBox="0 0 {W} {H}" width="{W}" height="{H}" xmlns="http://www.w3.org/2000/svg" font-family="Inter, -apple-system, system-ui, sans-serif" role="img">
<title>Design language migration map</title>
<desc>Migration plan from the v4 motion concept to lachler.com: preserved guarantees, home before/after, six phases.</desc>
<defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="{SAGE}"/></marker></defs>
{chr(10).join(parts)}
</svg>'''
open("/sessions/nifty-magical-curie/mnt/Documents--Lachler Studio/design-migration-map.svg", "w").write(svg)
print("written")
