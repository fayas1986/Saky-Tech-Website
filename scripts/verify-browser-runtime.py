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
    "/integrations/microsoft-dynamics-365-finance-zatca",
    "/integrations/dynamics-365-business-central-zatca",
    "/integrations/custom-erp-zatca",
    "/resources/zatca-phase-2-guide",
    "/resources/zatca-wave-25-2027",
    "/resources/zatca-csid-onboarding",
    "/resources/zatca-clearance-vs-reporting",
]


def main():
    report = {
        "routes": [],
        "unknownRoute404": None,
        "internalNav": None,
        "reloadTest": None,
        "zatcaConversionTrackingAndFormTest": None,
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
            hreflang_en_sa = page.locator('link[rel="alternate"][hreflang="en-SA"]').get_attribute("href")
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
                    "hreflangEnSa": hreflang_en_sa,
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
        page.goto(BASE + "/products/zatca-connect?utm_source=google&utm_medium=organic&utm_campaign=ksa-zatca-phase-1", wait_until="networkidle")
        reload_resp = page.reload(wait_until="networkidle")
        report["reloadTest"] = {
            "route": "/products/zatca-connect",
            "status": reload_resp.status if reload_resp else 0,
            "title": page.title(),
            "h1": page.locator("h1").first.inner_text().replace("\n", " ").strip(),
        }

        # Test GA4 tracking + ZATCA Demo Form validation & submission on /products/zatca-connect
        page.evaluate("window.open = () => null;")
        page.locator('a[href="#zatca-demo-form"]').first.click()
        page.wait_for_timeout(200)

        # Trigger empty form submit to test validation errors
        page.locator('form button[type="submit"]').click()
        validation_error_count = page.locator("form p.text-red-600").count()

        # Fill form with valid Saudi enterprise details
        page.fill("#zatca-companyName", "Al-Riyadh Industrial Group")
        page.fill("#zatca-contactName", "Faisal Al-Harbi")
        page.fill("#zatca-email", "faisal@alriyadh-ind.sa")
        page.fill("#zatca-phone", "+966 50 123 4567")
        page.select_option("#zatca-erpSystem", "Microsoft Dynamics 365 Finance & Operations")
        page.select_option("#zatca-invoiceVolume", "10,000 - 50,000 invoices/month")
        page.select_option("#zatca-branchCount", "6 - 20 Branches")
        page.fill("#zatca-integrationRequirement", "Integrating 12 Saudi branches on D365 F&O with ZATCA Phase 2 clearance and reporting APIs.")
        page.check("#zatca-consent")

        page.locator('form button[type="submit"]').click()
        page.wait_for_selector('[data-testid="zatca-form-success"]', timeout=5000)

        success_visible = page.locator('[data-testid="zatca-form-success"]').is_visible()
        analytics_events = page.evaluate("() => window.__sakyAnalyticsEvents || []")
        event_names = [e.get("event") for e in analytics_events]

        report["zatcaConversionTrackingAndFormTest"] = {
            "validationErrorsOnEmptySubmit": validation_error_count,
            "formSuccessStateVisible": success_visible,
            "capturedAnalyticsEvents": event_names,
            "sampleEventPayload": analytics_events[-1] if analytics_events else None,
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
    print(f"ZATCA conversion & form test: {report['zatcaConversionTrackingAndFormTest']}")
    print(f"Internal nav test: {report['internalNav']}")
    print(f"404 test: {report['unknownRoute404']}")


if __name__ == "__main__":
    main()
