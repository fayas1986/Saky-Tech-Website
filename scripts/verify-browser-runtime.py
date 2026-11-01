import json
from playwright.sync_api import sync_playwright

BASE = "http://localhost:4173"
ROUTES = [
    "/",
    "/about",
    "/contact",
    "/solutions",
    "/solutions/erp-integration",
    "/solutions/custom-development",
    "/products/taxflow",
    "/products/zatca-connect",
    "/products/talentsense-hrms",
    "/products/mednext-hims",
    "/products/procure-ai",
    "/products/logisud",
    "/products/nova-crm",
]


def main():
    report = {
        "routes": [],
        "unknownRoute404": None,
        "internalNav": None,
        "reloadTest": None,
        "totalConsoleErrors": 0,
    }

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        for route in ROUTES:
            page = browser.new_page(viewport={"width": 1440, "height": 900})
            console_errors = []
            page_errors = []
            page.on(
                "console",
                lambda msg, ce=console_errors: ce.append(msg.text)
                if msg.type == "error"
                else None,
            )
            page.on("pageerror", lambda err, pe=page_errors: pe.append(str(err)))

            resp = page.goto(BASE + route, wait_until="networkidle")
            status = resp.status if resp else 0
            title = page.title()
            h1 = page.locator("h1").first.inner_text()
            canonical = page.locator('link[rel="canonical"]').get_attribute("href")
            ld_count = page.locator('script[type="application/ld+json"]').count()
            h1_font_size = page.locator("h1").first.evaluate(
                "el => window.getComputedStyle(el).fontSize"
            )

            # Mobile viewport check
            page.set_viewport_size({"width": 390, "height": 844})
            mobile_h1_visible = page.locator("h1").first.is_visible()
            mobile_horizontal_overflow = page.evaluate(
                "() => document.documentElement.scrollWidth > window.innerWidth + 4"
            )

            report["routes"].append(
                {
                    "route": route,
                    "status": status,
                    "title": title,
                    "h1": h1.replace("\n", " ").strip(),
                    "canonical": canonical,
                    "jsonLdScripts": ld_count,
                    "h1FontSize": h1_font_size,
                    "mobileH1Visible": mobile_h1_visible,
                    "mobileHorizontalOverflow": mobile_horizontal_overflow,
                    "consoleErrors": console_errors,
                    "pageErrors": page_errors,
                }
            )
            report["totalConsoleErrors"] += len(console_errors) + len(page_errors)
            page.close()

        # Test reload on nested route /products/zatca-connect
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto(BASE + "/products/zatca-connect", wait_until="networkidle")
        reload_resp = page.reload(wait_until="networkidle")
        report["reloadTest"] = {
            "route": "/products/zatca-connect",
            "status": reload_resp.status if reload_resp else 0,
            "title": page.title(),
            "h1": page.locator("h1").first.inner_text().replace("\n", " ").strip(),
        }

        # Test internal navigation from / to /about
        page.goto(BASE + "/", wait_until="networkidle")
        page.locator('a[href="/about"]').first.click()
        page.wait_for_url(BASE + "/about")
        page.wait_for_timeout(300)
        report["internalNav"] = {
            "from": "/",
            "to": "/about",
            "urlAfterClick": page.url,
            "titleAfterClick": page.title(),
            "canonicalAfterClick": page.locator('link[rel="canonical"]').get_attribute(
                "href"
            ),
            "h1AfterClick": page.locator("h1")
            .first.inner_text()
            .replace("\n", " ")
            .strip(),
        }
        page.close()

        # Test unknown route 404
        page404 = browser.new_page()
        resp404 = page404.goto(
            BASE + "/non-existent-route-xyz", wait_until="networkidle"
        )
        report["unknownRoute404"] = {
            "route": "/non-existent-route-xyz",
            "status": resp404.status if resp404 else 0,
            "title": page404.title(),
            "h1": page404.locator("h1").first.inner_text().replace("\n", " ").strip(),
            "robots": page404.locator('meta[name="robots"]').get_attribute("content"),
        }
        page404.close()
        browser.close()

    with open("docs/browser-runtime-verification.json", "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)

    print(
        f"Verified {len(report['routes'])} routes. Total console/page errors: {report['totalConsoleErrors']}"
    )
    print(f"Reload test: {report['reloadTest']}")
    print(f"Internal nav test: {report['internalNav']}")
    print(f"404 test: {report['unknownRoute404']}")


if __name__ == "__main__":
    main()

