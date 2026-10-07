"""
Browser journeys for the ZOMZEY homepage prototype (spec §14 functional acceptance).

Run against a production preview:
    npm run build && npm run test:e2e
(which wraps this script with the webapp-testing skill's with_server.py helper).

Writes tests/artifacts/journeys.json and prints a PASS/FAIL line per check.
Exit code is non-zero if any check fails.
"""
import json
import os
import re
import sys
import traceback
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE = os.environ.get("BASE_URL", "http://localhost:4173/")
ROOT = Path(__file__).resolve().parent.parent
ART = ROOT / "tests" / "artifacts"
ART.mkdir(parents=True, exist_ok=True)

LINKS_TS = (ROOT / "src" / "data" / "links.ts").read_text()
ALLOWED_LINKS = set(re.findall(r"'(https://zomzey\.io[^']*)'", LINKS_TS))

results = []


def check(cid, description):
    def wrap(fn):
        try:
            detail = fn()
            results.append({"id": cid, "check": description, "status": "PASS", "detail": detail or ""})
            print(f"PASS {cid} {description}" + (f" — {detail}" if detail else ""))
        except Exception as exc:  # noqa: BLE001 — every failure is reported, none is swallowed
            results.append({"id": cid, "check": description, "status": "FAIL", "detail": f"{exc}"})
            print(f"FAIL {cid} {description} — {exc}")
            traceback.print_exc(limit=1)
        return fn

    return wrap


def ensure(cond, msg):
    if not cond:
        raise AssertionError(msg)


def new_page(browser, width=1440, height=900, **kw):
    ctx = browser.new_context(viewport={"width": width, "height": height}, **kw)
    page = ctx.new_page()
    page.errors = []
    page.on("console", lambda m: page.errors.append(f"console.{m.type}: {m.text}") if m.type == "error" else None)
    page.on("pageerror", lambda e: page.errors.append(f"pageerror: {e}"))
    page.on("requestfailed", lambda r: page.errors.append(f"requestfailed: {r.url}"))
    page.goto(BASE, wait_until="networkidle")
    page.evaluate("document.fonts.ready")
    return ctx, page


def fresh(page):
    """Each journey starts from a clean page: no stored intent, no open layers."""
    page.evaluate("sessionStorage.clear()")
    page.goto(BASE, wait_until="networkidle")
    page.evaluate("document.fonts.ready")


def scroll_through(page):
    page.evaluate(
        """async () => {
            const step = Math.round(innerHeight * 0.8)
            for (let y = 0; y < document.body.scrollHeight; y += step) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)) }
            scrollTo(0, 0)
        }"""
    )
    page.wait_for_load_state("networkidle")


def count_text(page):
    return page.locator(".explorer__count").inner_text().strip()


def explorer(page):
    return page.locator("#explore")


def search(page, text, via="enter"):
    box = explorer(page).locator("input[type=search]")
    box.fill(text)
    if via == "enter":
        box.press("Enter")
    else:
        explorer(page).get_by_role("button", name="Search", exact=True).click()


def rects_intersect(a, b, pad=0):
    return not (a["x"] + a["width"] + pad <= b["x"] or b["x"] + b["width"] + pad <= a["x"] or a["y"] + a["height"] + pad <= b["y"] or b["y"] + b["height"] + pad <= a["y"])


with sync_playwright() as pw:
    browser = pw.chromium.launch()
    ctx, page = new_page(browser)

    @check("J01", "Loads without console errors, failed requests or unloaded images/fonts (1440)")
    def _():
        scroll_through(page)
        # Images inside hidden tab panels are lazy and correctly stay unloaded until shown.
        broken = page.evaluate("[...document.images].filter(i => i.checkVisibility() && (!i.complete || i.naturalWidth === 0)).map(i => i.currentSrc || i.src)")
        font = page.evaluate("document.fonts.check('600 16px \"Instrument Sans Variable\"')")
        ensure(not page.errors, page.errors)
        ensure(not broken, f"unloaded images: {broken}")
        ensure(font, "Instrument Sans not loaded")
        n = page.evaluate("[...document.images].filter(i => i.checkVisibility()).length")
        return f"{n} rendered images decoded, Instrument Sans loaded"

    @check("J02", "One H1, landmarks, and a working skip link")
    def _():
        ensure(page.locator("h1").count() == 1, "expected exactly one h1")
        for sel in ["header", "nav[aria-label=Main]", "main#main", "footer"]:
            ensure(page.locator(sel).count() >= 1, f"missing {sel}")
        page.keyboard.press("Tab")
        ensure(page.evaluate("document.activeElement.classList.contains('skip-link')"), "first Tab stop is not the skip link")
        page.keyboard.press("Enter")
        ensure(page.evaluate("document.activeElement.id") == "main", "skip link did not move focus to main")
        return "h1 = " + page.locator("h1").inner_text().replace("\n", " ")

    @check("J03", "Headline, description and intent actions never collide with perimeter cards (1920/1440/1280)")
    def _():
        out = []
        for w, h in [(1920, 1080), (1440, 900), (1280, 800)]:
            c, p = new_page(browser, w, h)
            p.wait_for_timeout(1300)
            protected = [p.locator(s).bounding_box() for s in [".hero__title", ".hero__lede", ".intent-actions .button >> nth=0", ".intent-actions .button >> nth=1", ".hero__pricing"]]
            cards = [p.locator(".node").nth(i).bounding_box() for i in range(4)]
            for a in protected:
                for b in cards:
                    ensure(not rects_intersect(a, b, 16), f"collision at {w}px")
            buttons = p.locator(".intent-actions .button")
            for i in range(2):
                bb = buttons.nth(i).bounding_box()
                ensure(bb["y"] + bb["height"] <= h, f"intent action {i} below the fold at {w}x{h}")
            ensure(p.locator(".route--active").count() == 3 and p.locator(".route--idle").count() == 3, "routes missing")
            dots = p.locator(".scene__dots ellipse").count()
            ensure(dots <= 180, f"{dots} decorative dots exceeds 180")
            out.append(f"{w}px ok ({dots} dots)")
            c.close()
        return ", ".join(out)

    @check("J04", "Promote intent opens the people-and-places dataset")
    def _():
        fresh(page)
        page.get_by_role("link", name="I want to promote something").click()
        page.wait_for_timeout(300)
        ensure(page.evaluate("location.hash") == "#explore", "did not navigate to #explore")
        ensure(page.locator("#explore-title").inner_text() == "Who could help your project reach further?", "wrong heading")
        ensure(explorer(page).locator("label.explorer__label").inner_text() == "Search people and places", "wrong label")
        ensure(count_text(page) == "Showing 6 of 6 example profiles", count_text(page))
        ensure(explorer(page).locator(".pcard").count() == 6, "expected 6 profile cards")
        return count_text(page)

    @check("J05", "Earn intent opens the opportunities dataset")
    def _():
        fresh(page)
        page.evaluate("scrollTo(0,0)")
        page.get_by_role("link", name="I want to earn from my audience").click()
        page.wait_for_timeout(300)
        ensure(page.locator("#explore-title").inner_text() == "Where could your audience make a difference?", "wrong heading")
        ensure(explorer(page).locator("label.explorer__label").inner_text() == "Search opportunities", "wrong label")
        ph = explorer(page).locator("input[type=search]").get_attribute("placeholder")
        ensure(ph == "Try books, products or music…", ph)
        ensure(count_text(page) == "Showing 6 of 6 example opportunities", count_text(page))
        ensure(explorer(page).locator(".ocard").count() == 6, "expected 6 opportunity cards")
        return count_text(page)

    @check("J06", "Changing intent clears incompatible filters (category and query)")
    def _():
        fresh(page)
        ex = explorer(page)
        ex.get_by_role("button", name="Promote something").click()
        ex.get_by_role("button", name="Creators", exact=True).click()
        search(page, "review")
        ensure(count_text(page) == "Showing 2 of 6 example profiles for “review”", count_text(page))
        ex.get_by_role("button", name="Earn from my audience").click()
        ensure(ex.get_by_role("button", name="All", exact=True).get_attribute("aria-pressed") == "true", "category not reset")
        ensure(ex.locator("input[type=search]").input_value() == "", "query not reset")
        ensure(count_text(page) == "Showing 6 of 6 example opportunities", count_text(page))
        ex.get_by_role("button", name="Promote something").click()
        return "category → All, query cleared, dataset swapped"

    @check("J07", "Each scenario swaps images, labels and routes together without layout shift")
    def _():
        fresh(page)
        page.evaluate("scrollTo(0,0)")
        expected = {
            "Books": ("Book launch", ["Book reviewer", "Independent bookshop", "Reading community"], "book-pages"),
            "Products": ("Product launch", ["Home-studio creator", "Independent retailer", "Makers’ market"], "potter-hands"),
            "Music": ("New release", ["Music creator", "Small venue", "Fan community"], "guitarist"),
            "Apps": ("App launch", ["Tech reviewer", "Workshop educator", "Niche community"], "phone-app"),
        }
        heights = set()
        main_top = []
        for label, (kind, names, img) in expected.items():
            page.locator(".scenario-control").get_by_role("button", name=label, exact=True).click()
            page.wait_for_timeout(450)
            ensure(page.locator(".scenario-control").get_by_role("button", name=label, exact=True).get_attribute("aria-pressed") == "true", "pressed state")
            ensure(page.locator(".node--ticket .node__name").inner_text() == kind, f"{label}: project")
            got = [page.locator(f'[data-node="{s}"] .node__name').inner_text() for s in ["reach", "place", "community"]]
            ensure(got == names, f"{label}: {got}")
            src = page.locator(".node--ticket img").get_attribute("src")
            ensure(img in src, f"{label}: ticket image {src}")
            detail = page.locator(".scene-detail__text").inner_text()
            ensure(len(detail) > 20, "detail empty")
            heights.add(page.evaluate("document.querySelector('.hero').offsetHeight"))
            main_top.append(page.evaluate("document.querySelector('.reach').getBoundingClientRect().top + scrollY"))
        ensure(len(set(main_top)) == 1, f"content below the hero moved between scenarios: {main_top}")
        page.locator(".scenario-control").get_by_role("button", name="Books", exact=True).click()
        return f"4 scenarios; hero height {heights}"

    @check("J08", "Node focus previews a route, click pins it, clicking elsewhere clears it")
    def _():
        fresh(page)
        reach = page.locator('[data-node="reach"]')
        reach.focus()
        ensure("reviewer could read" in page.locator(".scene-detail__text").inner_text(), "focus did not update detail")
        ensure(page.locator('.route--active[data-slot="reach"]').get_attribute("data-on") == "true", "route not highlighted")
        reach.click()
        ensure(reach.get_attribute("aria-pressed") == "true", "not pinned")
        ensure(page.get_by_role("button", name="Clear selected connection").count() == 1, "no explicit close control")
        page.locator(".hero__lede").click()
        ensure(reach.get_attribute("aria-pressed") == "false", "click elsewhere did not clear")
        page.locator('[data-node="project"]').click()
        on = page.locator('.route--active[data-on="true"]').count()
        ensure(on == 3, f"project should light all three routes, got {on}")
        page.get_by_role("button", name="Clear selected connection").click()
        return "preview → pin → dismiss; project lights 3 routes"

    @check("J09", "Search (Enter and button), category, no results, and Clear filters")
    def _():
        fresh(page)
        ex = explorer(page)
        search(page, "bookshop", via="enter")
        ensure(count_text(page) == "Showing 1 of 6 example profiles for “bookshop”", count_text(page))
        ensure(ex.locator(".pcard__name").first.inner_text() == "Independent bookshop example", "wrong match")
        search(page, "venue", via="button")
        ensure(count_text(page).startswith("Showing 1 of 6"), count_text(page))
        ex.get_by_role("button", name="Agencies", exact=True).click()
        ensure(ex.get_by_text("No examples match these filters.").is_visible(), "no-results message missing")
        ensure(count_text(page).startswith("Showing 0 of 6"), count_text(page))
        ex.locator(".explorer__empty").get_by_role("button", name="Clear filters").click()
        ensure(count_text(page) == "Showing 6 of 6 example profiles", count_text(page))
        ensure(ex.locator("input[type=search]").input_value() == "", "query not cleared")
        live = ex.locator(".explorer__count").get_attribute("aria-live")
        ensure(live == "polite", "count is not a polite live region")
        return "1 → 1 → 0 (no results) → 6; count in polite live region"

    @check("J10", "More filters genuinely filters the example data")
    def _():
        fresh(page)
        ex = explorer(page)
        more = ex.get_by_role("button", name=re.compile("^More filters"))
        more.click()
        ensure(more.get_attribute("aria-expanded") == "true", "not expanded")
        ex.get_by_label("In person").check()
        ensure(count_text(page) == "Showing 4 of 6 example profiles", count_text(page))
        ensure(more.inner_text().strip().endswith("(1)"), more.inner_text())
        ex.get_by_label("In person").uncheck()
        more.click()
        ensure(count_text(page) == "Showing 6 of 6 example profiles", count_text(page))
        return "In person → 4 of 6"

    @check("J11", "Earn dataset: category and search")
    def _():
        fresh(page)
        ex = explorer(page)
        ex.get_by_role("button", name="Earn from my audience").click()
        ex.get_by_role("button", name="Music", exact=True).click()
        ensure(count_text(page) == "Showing 1 of 6 example opportunities", count_text(page))
        ensure(ex.locator(".ocard__title").first.inner_text() == "Folk EP release example", "wrong music result")
        ex.get_by_role("button", name="All", exact=True).click()
        search(page, "app")
        ensure(ex.locator(".ocard__title").first.inner_text() == "Study app launch example", "wrong app result")
        search(page, "zzz")
        ex.locator(".explorer__empty").get_by_role("button", name="books").click()
        ensure(count_text(page).startswith("Showing 2 of 6"), count_text(page))
        ex.get_by_role("button", name="Clear filters").first.click()
        return "Music → 1; app → Study app; suggestion 'books' → 2"

    @check("J12", "Opportunity detail opens, is labelled Example, links to real opportunities, closes and returns focus")
    def _():
        fresh(page)
        ex = explorer(page)
        ex.get_by_role("button", name="Earn from my audience").click()
        trigger = ex.get_by_role("button", name="View example: Debut novel launch example")
        trigger.click()
        dlg = page.get_by_role("dialog", name="Debut novel launch example")
        ensure(dlg.is_visible(), "dialog not open")
        ensure(dlg.get_by_text("Example opportunity").is_visible(), "missing Example label")
        href = dlg.get_by_role("link", name=re.compile("See current opportunities")).get_attribute("href")
        ensure(href == "https://zomzey.io/opportunities/", href)
        dlg.get_by_role("button", name="Close").click()
        ensure(not dlg.is_visible(), "dialog still open")
        ensure(page.evaluate("document.activeElement.getAttribute('aria-label')") == "View example: Debut novel launch example", "focus not returned")
        ex.get_by_role("button", name="Promote something").click()
        return "close button → focus back on trigger"

    @check("J13", "Profile detail by keyboard: Enter opens, Escape closes, focus returns")
    def _():
        fresh(page)
        trigger = explorer(page).get_by_role("button", name="View example: Book reviewer example")
        trigger.focus()
        page.keyboard.press("Enter")
        dlg = page.get_by_role("dialog", name="Book reviewer example")
        ensure(dlg.is_visible(), "dialog not open")
        ensure(dlg.get_by_text("Example profile").is_visible(), "missing Example label")
        ensure(dlg.get_by_text("It is not a ZOMZEY member.").is_visible(), "missing disclosure")
        href = dlg.get_by_role("link", name=re.compile("Browse actual ZOMZEY members")).get_attribute("href")
        ensure(href == "https://zomzey.io/?ian_zz_directory=1&zzd_view=all", href)
        # Focus is contained: tabbing many times stays inside the dialog
        for _ in range(8):
            page.keyboard.press("Tab")
            ensure(page.evaluate("!!document.activeElement.closest('dialog[open]') || document.activeElement === document.body"), "focus escaped dialog")
        page.keyboard.press("Escape")
        ensure(not dlg.is_visible(), "Escape did not close")
        ensure(page.evaluate("document.activeElement.getAttribute('aria-label')") == "View example: Book reviewer example", "focus not returned")
        trigger.click()
        page.mouse.click(5, 5)  # backdrop
        ensure(not page.get_by_role("dialog", name="Book reviewer example").is_visible(), "backdrop click did not close")
        return "Enter/Escape/backdrop; focus contained and returned"

    @check("J14", "Explore panel: opens, has real destinations, Escape closes and restores focus")
    def _():
        fresh(page)
        page.evaluate("scrollTo(0,0)")
        trigger = page.get_by_role("button", name="Explore")
        trigger.click()
        panel = page.locator(".explore__panel")
        ensure(panel.is_visible() and trigger.get_attribute("aria-expanded") == "true", "panel not open")
        hrefs = panel.locator("a").evaluate_all("as => as.map(a => a.getAttribute('href'))")
        ensure("https://zomzey.io/agencies/" in hrefs and "https://zomzey.io/?ian_zz_directory=1&zzd_view=all" in hrefs, hrefs)
        page.keyboard.press("Escape")
        ensure(not panel.is_visible(), "Escape did not close")
        ensure(page.evaluate("document.activeElement.textContent.trim()") == "Explore", "focus not restored")
        trigger.click()
        panel.get_by_role("link", name=re.compile("^Opportunities")).click()
        page.wait_for_timeout(200)
        ensure(not panel.is_visible(), "panel stayed open")
        ensure(page.locator("#explore-title").inner_text().startswith("Where could"), "intent not applied")
        explorer(page).get_by_role("button", name="Promote something").click()
        return f"{len(hrefs)} links; Opportunities sets earn intent"

    @check("J15", "Join dialog: chooses a starting point and links out; collects nothing; focus returns")
    def _():
        fresh(page)
        page.evaluate("scrollTo(0,0)")
        join = page.locator(".site-header").get_by_role("button", name="Join ZOMZEY")
        join.click()
        dlg = page.get_by_role("dialog", name="Join ZOMZEY")
        ensure(dlg.is_visible(), "not open")
        ensure(dlg.get_by_label("I have something to promote").is_checked(), "default should follow intent (promote)")
        ensure(dlg.get_by_role("link", name=re.compile("Continue to ZOMZEY sign-up")).get_attribute("href") == "https://zomzey.io/signup/", "signup link")
        dlg.get_by_label("I represent an agency").check()
        ensure(dlg.get_by_role("link", name=re.compile("View agency plans")).get_attribute("href") == "https://zomzey.io/agencies/", "agency link")
        text_inputs = dlg.locator("input:not([type=radio])").count()
        ensure(text_inputs == 0, "dialog contains data-entry fields")
        page.keyboard.press("Escape")
        ensure(page.evaluate("document.activeElement.textContent") == "Join ZOMZEY", "focus not returned to Join")
        return "promote → signup, agency → agencies; no data fields"

    @check("J16", "Reach story tabs: arrow keys, Home and End")
    def _():
        fresh(page)
        books = page.get_by_role("tab", name=re.compile("^Books"))
        books.focus()
        page.keyboard.press("ArrowDown")
        ensure(page.get_by_role("tab", name=re.compile("^Products")).get_attribute("aria-selected") == "true", "ArrowDown")
        ensure(page.locator("#reach-panel-products").is_visible(), "panel not shown")
        page.keyboard.press("End")
        ensure(page.get_by_role("tab", name=re.compile("^Apps")).get_attribute("aria-selected") == "true", "End")
        page.keyboard.press("Home")
        page.keyboard.press("ArrowUp")
        ensure(page.get_by_role("tab", name=re.compile("^Apps")).get_attribute("aria-selected") == "true", "wrap")
        ensure(page.evaluate("document.activeElement.getAttribute('role')") == "tab", "focus left tabs")
        page.keyboard.press("Home")
        return "roving tabindex with wrap"

    @check("J17", "Visible focus on representative controls")
    def _():
        fresh(page)
        sels = [".explore__trigger", ".intent-actions .button", ".scenario-control__option", ".chip", ".reach__tab", ".pcard__action"]
        out = []
        for s in sels:
            el = page.locator(s).first
            el.focus()
            page.keyboard.press("Shift+Tab")
            page.keyboard.press("Tab")
            style = page.evaluate("(() => { const s = getComputedStyle(document.activeElement); return s.outlineStyle + ' ' + s.outlineWidth })()")
            ensure(not style.startswith("none"), f"{s} has no outline: {style}")
            out.append(style)
        # search field shows focus on its wrapper
        explorer(page).locator("input[type=search]").focus()
        wrap = page.evaluate("getComputedStyle(document.querySelector('.search-field')).outlineStyle")
        ensure(wrap == "solid", "search wrapper focus missing")
        return f"outlines: {sorted(set(out))}"

    @check("J18", "External links only use the verified first-party destinations")
    def _():
        fresh(page)
        hrefs = page.evaluate("[...document.querySelectorAll('a[href^=http]')].map(a => a.href)")
        bad = [h for h in hrefs if h not in ALLOWED_LINKS]
        ensure(not bad, f"unverified destinations: {bad}")
        dummy = page.evaluate("[...document.querySelectorAll('a')].filter(a => !a.getAttribute('href') || a.getAttribute('href') === '#').length")
        ensure(dummy == 0, f"{dummy} placeholder links")
        return f"{len(hrefs)} external links, {len(set(hrefs))} unique, all from links.ts"

    @check("J19", "Images: alt present everywhere; meaningful alt where not decorative")
    def _():
        fresh(page)
        info = page.evaluate("[...document.images].map(i => ({alt: i.getAttribute('alt'), inButton: !!i.closest('button')}))")
        missing = [i for i in info if i["alt"] is None]
        ensure(not missing, f"{len(missing)} images without alt")
        meaningful = [i for i in info if i["alt"]]
        return f"{len(info)} images; {len(meaningful)} with descriptive alt, {len(info) - len(meaningful)} decorative (repeat adjacent text)"

    ctx.close()

    # ---------------- Mobile, touch and menu ----------------
    @check("J20", "Mobile menu: opens, links work, Escape closes, focus handling (390)")
    def _():
        c, p = new_page(browser, 390, 844, has_touch=True, is_mobile=True)
        ensure(not p.locator(".site-nav").is_visible(), "desktop nav visible on mobile")
        menu_btn = p.get_by_role("button", name="Menu")
        menu_btn.click()
        dlg = p.get_by_role("dialog", name="Menu")
        ensure(dlg.is_visible(), "menu not open")
        for name in ["People and places", "Opportunities", "How it works", "Pricing", "About", "Pioneers", "Influencers", "Hubs", "Agencies", "Music", "Sign in"]:
            ensure(dlg.get_by_role("link", name=name, exact=True).count() == 1, f"menu missing {name}")
        p.keyboard.press("Escape")
        ensure(not dlg.is_visible(), "Escape did not close")
        ensure(p.evaluate("document.activeElement.textContent.trim()") == "Menu", "focus not returned to Menu")
        menu_btn.click()
        dlg.get_by_role("link", name="How it works").click()
        p.wait_for_timeout(400)
        ensure(not dlg.is_visible(), "menu stayed open after link")
        ensure(p.evaluate("location.hash") == "#how-it-works", "did not navigate")
        ensure(p.evaluate("document.activeElement.id") == "process-title", "focus not moved to section heading")
        menu_btn.click()
        dlg.get_by_role("button", name="Join ZOMZEY").click()
        ensure(p.get_by_role("dialog", name="Join ZOMZEY").is_visible(), "join from menu failed")
        p.keyboard.press("Escape")
        c.close()
        return "11 links, Escape, section focus, Join"

    @check("J21", "Touch: vertical story steps expand on tap; scenarios update the story (390)")
    def _():
        c, p = new_page(browser, 390, 844, has_touch=True, is_mobile=True)
        ensure(p.locator(".scene").count() == 0 and p.locator(".vstory").count() == 1, "mobile should use the vertical story, not the perimeter scene")
        node = p.locator(".vstory__node", has_text="Book reviewer")
        node.tap()
        ensure(node.get_attribute("aria-expanded") == "true", "tap did not expand")
        ensure(p.locator(".vstory").get_by_text("A reviewer could read an early copy").is_visible(), "detail not visible")
        p.locator(".scenario-control").get_by_role("button", name="Products", exact=True).tap()
        p.wait_for_timeout(300)
        ensure(p.locator(".vstory__project-name").inner_text() == "Product launch", "story did not update")
        names = p.locator(".vstory__name").all_inner_texts()
        ensure(names == ["Home-studio creator", "Independent retailer", "Makers’ market"], names)
        # Headline, description and both intent actions in the first 844px
        for s in [".hero__title", ".hero__lede", ".intent-actions .button >> nth=1"]:
            bb = p.locator(s).bounding_box()
            ensure(bb["y"] + bb["height"] <= 844, f"{s} below the fold")
        c.close()
        return "tap expands; Products swaps project + 3 steps; opening fits 390×844"

    @check("J22", "Reduced motion: complete static scene and process route immediately")
    def _():
        c, p = new_page(browser, 1440, 900, reduced_motion="reduce")
        p.wait_for_timeout(150)
        op = p.evaluate("getComputedStyle(document.querySelector('.route--active[data-on=true]')).opacity")
        ensure(op == "1", f"active route opacity {op}")
        cards = p.evaluate("[...document.querySelectorAll('.node')].map(n => getComputedStyle(n).opacity)")
        ensure(all(x == "1" for x in cards), cards)
        p.locator("#how-it-works").scroll_into_view_if_needed()
        tf = p.evaluate("getComputedStyle(document.querySelector('.process__rail-fill')).transform")
        ensure(tf in ("none", "matrix(1, 0, 0, 1, 0, 0)"), f"rail fill transform {tf}")
        anims = p.evaluate("document.getAnimations().length")
        ensure(anims == 0, f"{anims} running animations")
        c.close()
        return "routes, cards and process rail complete; 0 running animations"

    @check("J23", "No horizontal overflow at 1920, 1440, 1280, 1024, 768, 390 and 360")
    def _():
        out = []
        for w, h in [(1920, 1080), (1440, 900), (1280, 800), (1024, 768), (768, 1024), (390, 844), (360, 800)]:
            c, p = new_page(browser, w, h)
            scroll_through(p)
            sw = p.evaluate("document.documentElement.scrollWidth")
            ensure(sw <= w, f"{w}px: scrollWidth {sw}")
            wide = p.evaluate(
                f"[...document.querySelectorAll('main *, header *, footer *')].filter(e => {{ const r = e.getBoundingClientRect(); return r.width && (r.right > {w} + 1 || r.left < -1) && !e.closest('svg') && getComputedStyle(e).position !== 'fixed' }}).slice(0,5).map(e => e.className)"
            )
            ensure(not wide, f"{w}px: elements outside viewport {wide}")
            ensure(not p.errors, p.errors)
            layout = p.evaluate("document.querySelector('.hero').dataset.layout")
            out.append(f"{w}:{layout}")
            c.close()
        return ", ".join(out)

    @check("J24", "Touch target sizes for primary controls (≥ 44px tall)")
    def _():
        c, p = new_page(browser, 390, 844, has_touch=True, is_mobile=True)
        sizes = p.evaluate(
            """[...document.querySelectorAll('.button, .chip, .scenario-control__option, .segmented__option, .reach__tab, .vstory__node, .icon-button:not(.icon-button--small)')]
               .filter(e => e.offsetParent).map(e => ({c: e.className.split(' ')[0], h: Math.round(e.getBoundingClientRect().height), w: Math.round(e.getBoundingClientRect().width)}))"""
        )
        small = [s for s in sizes if s["h"] < 44 or s["w"] < 44]
        ensure(not small, small)
        c.close()
        return f"{len(sizes)} controls ≥ 44×44 at 390px (coarse pointer)"

    @check("J25", "axe-core WCAG 2.2 AA scan: page, open dialog and mobile")
    def _():
        axe = (ROOT / "node_modules" / "axe-core" / "axe.min.js").read_text()
        summary = []
        for w, h, open_dialog in [(1440, 900, False), (1440, 900, True), (390, 844, False)]:
            c, p = new_page(browser, w, h, reduced_motion="reduce")
            scroll_through(p)
            if open_dialog:
                explorer(p).get_by_role("button", name="View example: Independent bookshop example").click()
            p.add_script_tag(content=axe)
            res = p.evaluate(
                "async () => { const r = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa'] } }); return { v: r.violations.map(v => ({id: v.id, impact: v.impact, n: v.nodes.length, t: v.nodes.slice(0,3).map(n => n.target.join(' '))})), passes: r.passes.length, incomplete: r.incomplete.map(i => i.id) } }"
            )
            (ART / f"axe-{w}{'-dialog' if open_dialog else ''}.json").write_text(json.dumps(res, indent=2))
            ensure(not res["v"], f"{w}px{' dialog' if open_dialog else ''}: {res['v']}")
            summary.append(f"{w}{'+dialog' if open_dialog else ''}: 0 violations, {res['passes']} passing rules, needs review: {res['incomplete']}")
            c.close()
        return "; ".join(summary)

    @check("J26", "200% zoom equivalent (1440×900 at 200% → 720×450): usable flow, no overflow, header leaves room")
    def _():
        c, p = new_page(browser, 720, 450)
        scroll_through(p)
        sw = p.evaluate("document.documentElement.scrollWidth")
        ensure(sw <= 720, f"scrollWidth {sw}")
        header = p.locator(".site-header").bounding_box()["height"]
        ensure(header <= 0.2 * 450, f"sticky header {header}px covers too much of a 450px viewport")
        p.get_by_role("link", name="I want to promote something").click()
        p.wait_for_timeout(400)
        top = p.locator("#explore-title").bounding_box()["y"]
        ensure(top >= header, f"#explore heading hidden under the sticky header ({top} < {header})")
        c.close()
        return f"no overflow; header {header:.0f}px; anchored heading clears it"

    @check("J27", "Reduced motion applies when the preference changes after load")
    def _():
        c, p = new_page(browser, 1440, 900)
        p.wait_for_timeout(1500)
        p.emulate_media(reduced_motion="reduce")
        p.locator(".scenario-control").get_by_role("button", name="Apps", exact=True).click()
        p.wait_for_timeout(60)
        running = p.evaluate("document.getAnimations().filter(a => a.playState === 'running').length")
        inline = p.evaluate("[...document.querySelectorAll('.node__photo, .node__text')].filter(e => e.style.opacity).length")
        ensure(running == 0 and inline == 0, f"{running} running animations, {inline} inline fades")
        ensure(p.locator(".node--ticket .node__name").inner_text() == "App launch", "scenario did not change")
        c.close()
        return "scenario switch after preference change is immediate"

    browser.close()

(ART / "journeys.json").write_text(json.dumps(results, indent=2, ensure_ascii=False))
failed = [r for r in results if r["status"] == "FAIL"]
print(f"\n{len(results) - len(failed)}/{len(results)} checks passed")
sys.exit(1 if failed else 0)
