"""
Exports the contest mock-ups, alternate states and presentation boards from the
running production preview. Run with:  npm run build && npm run export

Outputs (exports/):
  ZOMZEY-desktop-hero-1440.png   1440 × 900 opening viewport (1×)
  ZOMZEY-desktop-full-1440.png   full homepage at 1440 (1×)
  ZOMZEY-mobile-hero-390.png     390 × 844 opening viewport (1×)
  ZOMZEY-mobile-full-390.png     full homepage at 390 (1×)
  *@2x.png                       high-resolution versions used on the boards
  states/*.png                   deliberate alternate UI states (2×)
  ZOMZEY-board-01..04.png        2400 × 1600 presentation boards
"""
import os
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE = os.environ.get("BASE_URL", "http://localhost:4173/")
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "exports"
STATES = OUT / "states"
STATES.mkdir(parents=True, exist_ok=True)


def open_page(browser, w, h, dpr=1, reduced=False, touch=False):
    ctx = browser.new_context(
        viewport={"width": w, "height": h},
        device_scale_factor=dpr,
        reduced_motion="reduce" if reduced else "no-preference",
        has_touch=touch,
        is_mobile=touch,
    )
    page = ctx.new_page()
    page.goto(BASE, wait_until="networkidle")
    page.evaluate("sessionStorage.clear()")
    page.evaluate("document.fonts.ready")
    return ctx, page


def settle(page):
    """Load every lazy image, return to the top and wait until the scene is stable."""
    page.evaluate(
        """async () => {
            const step = Math.round(innerHeight * 0.75)
            for (let y = 0; y <= document.body.scrollHeight; y += step) { scrollTo(0, y); await new Promise(r => setTimeout(r, 80)) }
            await Promise.all([...document.images].filter(i => i.checkVisibility()).map(i => i.decode().catch(() => null)))
            scrollTo(0, 0)
        }"""
    )
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(600)


def scroll_to(page, selector, offset=0):
    page.evaluate(
        "([s, o]) => { const el = document.querySelector(s); scrollTo(0, el.getBoundingClientRect().top + scrollY - o) }",
        [selector, offset],
    )
    page.wait_for_timeout(500)


def shot(page, name, **kw):
    page.screenshot(path=str(name), **kw)
    print("✓", Path(name).relative_to(ROOT))


with sync_playwright() as pw:
    browser = pw.chromium.launch()

    # ---------- Required mock-ups ----------
    for dpr, suffix in [(1, ""), (2, "@2x")]:
        ctx, p = open_page(browser, 1440, 900, dpr)
        p.wait_for_timeout(2200)  # opening sequence complete; deterministic default scene
        shot(p, OUT / f"ZOMZEY-desktop-hero-1440{suffix}.png")
        ctx.close()

        ctx, p = open_page(browser, 390, 844, dpr, touch=True)
        p.wait_for_timeout(800)
        shot(p, OUT / f"ZOMZEY-mobile-hero-390{suffix}.png")
        ctx.close()

    # Full pages: reduced motion gives the complete, settled state of every section
    ctx, p = open_page(browser, 1440, 900, 1, reduced=True)
    settle(p)
    shot(p, OUT / "ZOMZEY-desktop-full-1440.png", full_page=True)
    ctx.close()
    for dpr, suffix in [(1, ""), (2, "@2x")]:
        ctx, p = open_page(browser, 390, 844, dpr, reduced=True, touch=True)
        settle(p)
        shot(p, OUT / f"ZOMZEY-mobile-full-390{suffix}.png", full_page=True)
        ctx.close()

    # ---------- Desktop states (2×) ----------
    ctx, p = open_page(browser, 1440, 900, 2)
    p.wait_for_timeout(2200)
    shot(p, STATES / "desktop-default.png")
    p.locator('[data-node="reach"]').focus()
    p.wait_for_timeout(400)
    shot(p, STATES / "desktop-node-focus.png")
    p.locator('[data-node="project"]').click()
    p.mouse.move(720, 20)
    p.wait_for_timeout(900)
    shot(p, STATES / "desktop-project-selected.png")
    p.get_by_role("button", name="Clear selected connection").click()
    p.locator(".scenario-control").get_by_role("button", name="Music", exact=True).click()
    p.mouse.move(720, 20)
    p.wait_for_timeout(900)
    shot(p, STATES / "desktop-scenario-music.png")
    p.locator(".scenario-control").get_by_role("button", name="Books", exact=True).click()
    p.get_by_role("button", name="Explore").click()
    p.wait_for_timeout(300)
    shot(p, STATES / "desktop-explore-panel.png")
    p.keyboard.press("Escape")
    p.locator(".site-header").get_by_role("button", name="Join ZOMZEY").click()
    p.wait_for_timeout(400)
    shot(p, STATES / "desktop-join-dialog.png")
    p.keyboard.press("Escape")
    ctx.close()

    ctx, p = open_page(browser, 1440, 900, 2, reduced=True)
    settle(p)
    p.get_by_role("link", name="I want to earn from my audience").click()
    p.wait_for_timeout(300)
    scroll_to(p, "#explore", 80)
    shot(p, STATES / "desktop-explorer-earn.png")
    ex = p.locator("#explore")
    ex.get_by_role("button", name="Promote something").click()
    ex.get_by_role("button", name="Shops and communities", exact=True).click()
    ex.locator("input[type=search]").fill("bookshop")
    ex.locator("input[type=search]").press("Enter")
    p.wait_for_timeout(300)
    scroll_to(p, "#explore", 80)
    shot(p, STATES / "desktop-explorer-filtered.png")
    ex.get_by_role("button", name="Agencies", exact=True).click()
    p.wait_for_timeout(300)
    scroll_to(p, "#explore", 80)
    shot(p, STATES / "desktop-no-results.png")
    ex.locator(".explorer__empty").get_by_role("button", name="Clear filters").click()
    p.wait_for_timeout(200)
    scroll_to(p, ".profile-grid", 160)
    ex.get_by_role("button", name="View example: Independent bookshop example").click()
    p.wait_for_timeout(400)
    shot(p, STATES / "desktop-detail-dialog.png")
    p.keyboard.press("Escape")
    ctx.close()

    for w, h in [(1280, 800), (1024, 768), (768, 1024)]:
        ctx, p = open_page(browser, w, h, 1)
        p.wait_for_timeout(2200)
        shot(p, STATES / f"responsive-{w}.png")
        ctx.close()

    # ---------- Mobile states (2×) ----------
    ctx, p = open_page(browser, 390, 844, 2, touch=True)
    p.wait_for_timeout(600)
    scroll_to(p, ".hero__story", 76)
    p.locator(".vstory__node", has_text="Book reviewer").tap()
    p.wait_for_timeout(400)
    shot(p, STATES / "mobile-story-expanded.png")
    p.locator(".scenario-control").get_by_role("button", name="Apps", exact=True).tap()
    p.wait_for_timeout(600)
    shot(p, STATES / "mobile-scenario-apps.png")
    p.evaluate("scrollTo(0, 0)")
    p.get_by_role("button", name="Menu").tap()
    p.wait_for_timeout(500)
    shot(p, STATES / "mobile-menu.png")
    p.keyboard.press("Escape")
    p.wait_for_timeout(200)
    p.get_by_role("button", name="Menu").tap()
    p.get_by_role("dialog", name="Menu").get_by_role("button", name="Join ZOMZEY").tap()
    p.wait_for_timeout(500)
    shot(p, STATES / "mobile-join.png")
    p.keyboard.press("Escape")
    ctx.close()

    ctx, p = open_page(browser, 390, 844, 2, reduced=True, touch=True)
    settle(p)
    p.get_by_role("link", name="I want to earn from my audience").tap()
    p.wait_for_timeout(400)
    scroll_to(p, "#explore", 64)
    shot(p, STATES / "mobile-explorer-earn.png")
    p.locator("#explore").get_by_role("button", name="Promote something").tap()
    scroll_to(p, ".profile-grid", 120)
    p.locator("#explore").get_by_role("button", name="View example: Independent bookshop example").tap()
    p.wait_for_timeout(500)
    shot(p, STATES / "mobile-detail.png")
    ctx.close()

    # ---------- Boards (2400 × 1600) ----------
    ctx = browser.new_context(viewport={"width": 2400, "height": 1600}, device_scale_factor=1)
    p = ctx.new_page()
    p.goto(BASE + "styleguide.html", wait_until="networkidle")
    p.evaluate("document.fonts.ready")
    p.wait_for_timeout(500)
    shot(p, OUT / "ZOMZEY-board-03-style-guide.png")
    for n, name in [("01", "desktop"), ("02", "mobile"), ("04", "interactions")]:
        p.goto((ROOT / "scripts" / "boards" / f"board-{n}.html").as_uri(), wait_until="load")
        p.evaluate("document.fonts.ready")
        p.evaluate("Promise.all([...document.images].map(i => i.decode()))")
        p.wait_for_timeout(300)
        broken = p.evaluate("[...document.images].filter(i => !i.naturalWidth).map(i => i.src)")
        if broken:
            raise SystemExit(f"board {n} has missing images: {broken}")
        shot(p, OUT / f"ZOMZEY-board-{n}-{name}.png")
    ctx.close()
    browser.close()
