# Saky Technologies — P0 Technical SEO Recovery & Crawlability Evidence Report

**Project**: `https://sakytek.com/`  
**Workspace**: `c:\Users\Fayas\Downloads\Dev\saky-technologies`  
**Backup Branch Created**: `backup/pre-p0-seo-recovery`  
**Status**: **Verified & Ready for Production Deployment Review** (Not pushed to production per deployment constraint)

---

## 1. Root Cause Analysis of Original 404s & Crawlability Failure

### 1.1 Production Hosting Investigation
Live HTTP header inspection of `https://sakytek.com` confirmed:
- **Hosting Platform**: **Vercel** (`server: Vercel`, `x-vercel-id: bom1::...`, `A` record `216.198.79.1`, `www.sakytek.com` CNAME to Vercel DNS).
- **HTTP/HTTPS & Host Redirects on Live Edge**:
  - `http://sakytek.com/` → `308 Permanent Redirect` to `https://sakytek.com/`
  - `https://www.sakytek.com/` → `307 Temporary Redirect` to `https://sakytek.com/`

### 1.2 Why All 11 Internal Routes Returned `HTTP 404`
1. **Single-File Client-Side SPA Output**: The Vite build (`vite build`) previously emitted only a single `dist/index.html` containing an empty `<div id="root"></div>` shell and no route-specific HTML files (`dist/about/index.html`, `dist/products/zatca-connect/index.html`, etc.).
2. **Missing Vercel Routing Configuration**: The repository contained no [`vercel.json`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/vercel.json) file. When a user or search engine crawler requested any deep route directly (e.g., `GET https://sakytek.com/products/zatca-connect` or refreshed a nested route), Vercel's static file router looked for `/products/zatca-connect` or `/products/zatca-connect.html` in `dist/`, failed to find it, and immediately returned **`HTTP 404 NOT_FOUND`** (`x-vercel-error: NOT_FOUND`).
3. **Empty Raw HTML for Non-JS Crawlers**: Even on `/` (`HTTP 200`), the raw HTML returned to crawlers had **0 `<meta name="description">` tags**, **0 `<link rel="canonical">` tags**, **0 `<h1>` tags in raw HTML**, **0 Open Graph tags**, and **0 Schema.org JSON-LD blocks**.

---

## 2. Hosting Configuration & Build-Time Prerendering Architecture

Without migrating to Next.js and while retaining **React 19, Vite 6, TypeScript, and React Router v7**, we implemented:

1. **Build-Time Static HTML Prerendering**:
   - [`entry-server.tsx`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/entry-server.tsx): Uses `renderToString` from `react-dom/server` and `StaticRouter` from `react-router` to render the full React component tree for any route at build time.
   - [`scripts/prerender.mjs`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/scripts/prerender.mjs): Executed automatically during `npm run build` (`npm run build:client && npm run build:ssr && node scripts/prerender.mjs`). Generates static HTML for all **13 canonical routes** (`dist/<route>/index.html` and `dist/<route>.html`) plus a dedicated **`dist/404.html`** (`noindex, nofollow`).
   - [`index.tsx`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/index.tsx): Uses `hydrateRoot` when prerendered DOM nodes are present and falls back to `createRoot` during local `vite dev`.
   - [`components/FAQ.tsx`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/components/FAQ.tsx): Updated to keep FAQ answer nodes in the prerendered DOM (toggled via `block`/`hidden` classes and `aria-expanded`) so search engines index all FAQ answers in the raw HTML.

2. **Vercel Production Configuration ([`vercel.json`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/vercel.json))**:
   - `"cleanUrls": true` and `"trailingSlash": false`: Serves prerendered static files at clean URLs (`/about`, `/products/zatca-connect`, etc.) with `HTTP 200`, redirects trailing slashes (`/about/` → `/about` with `308`), and serves `dist/404.html` with true **`HTTP 404`** for any unknown route (eliminating soft-404s).
   - Permanent `308` redirect rule from `www.sakytek.com` to `https://sakytek.com/:path*`.
   - Immutable cache headers for hashed `/assets/*` bundles.

3. **Vite Preview Server Parity ([`vite.config.ts`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/vite.config.ts))**:
   - Added `vercelCleanUrlsPreviewPlugin` so `npm run preview` faithfully emulates Vercel's `cleanUrls: true`, `trailingSlash: false` (`308` redirect), and true `HTTP 404` status with `dist/404.html` on unknown routes.

---

## 3. Before / After HTTP Status Results

Verified via automated test suite ([`scripts/verify-seo-acceptance.mjs`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/scripts/verify-seo-acceptance.mjs) → [`docs/seo-verification-results.json`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/docs/seo-verification-results.json)) and Playwright browser verification ([`scripts/verify-browser-runtime.py`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/scripts/verify-browser-runtime.py) → [`docs/browser-runtime-verification.json`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/docs/browser-runtime-verification.json)):

| Route | Before Fix (Live `sakytek.com`) | After Fix (Prerendered Build) | Direct Nav | Nested Reload | Raw HTML Words |
| :--- | :---: | :---: | :---: | :---: | :---: |
| `/` | `200 OK` (Empty SPA shell) | **`200 OK`** (Prerendered HTML) | PASS | PASS | 2,382 |
| `/about` | `404 NOT_FOUND` | **`200 OK`** (Prerendered HTML) | PASS | PASS | 323 |
| `/contact` | `404 NOT_FOUND` | **`200 OK`** (Prerendered HTML) | PASS | PASS | 357 |
| `/solutions` | `404 NOT_FOUND` | **`200 OK`** (Prerendered HTML) | PASS | PASS | 565 |
| `/solutions/erp-integration` | `404 NOT_FOUND` | **`200 OK`** (Prerendered HTML) | PASS | PASS | 550 |
| `/solutions/custom-development` | `404 NOT_FOUND` | **`200 OK`** (Prerendered HTML) | PASS | PASS | 561 |
| `/products/taxflow` | `404 NOT_FOUND` | **`200 OK`** (Prerendered HTML) | PASS | PASS | 591 |
| `/products/zatca-connect` | `404 NOT_FOUND` | **`200 OK`** (Prerendered HTML) | PASS | PASS | 619 |
| `/products/talentsense-hrms` | `404 NOT_FOUND` | **`200 OK`** (Prerendered HTML) | PASS | PASS | 551 |
| `/products/mednext-hims` | `404 NOT_FOUND` | **`200 OK`** (Prerendered HTML) | PASS | PASS | 567 |
| `/products/procure-ai` | `404 NOT_FOUND` | **`200 OK`** (Prerendered HTML) | PASS | PASS | 543 |
| `/products/logisud` | `404 NOT_FOUND` | **`200 OK`** (Prerendered HTML) | PASS | PASS | 546 |
| `/products/nova-crm` | `404 NOT_FOUND` | **`200 OK`** (Prerendered HTML) | PASS | PASS | 563 |
| `/non-existent-page` (Unknown URL) | `404` (Generic Vercel error) | **`404 Not Found`** (Branded 404, `noindex, nofollow`) | PASS | PASS | 109 |
| `/products/unknown-platform` (Unknown URL) | `404` (Generic Vercel error) | **`404 Not Found`** (Branded 404, `noindex, nofollow`) | PASS | PASS | 109 |
| `/about/` (Trailing slash redirect) | `404 NOT_FOUND` | **`308 Permanent Redirect` → `/about`** | PASS | N/A | N/A |

---

## 4. Raw HTML Evidence for Representative Routes

Each generated file in `dist/` contains complete server-rendered `<head>` tags, JSON-LD structured data, and full `<body>` markup without requiring client-side JavaScript execution.

### Example: `dist/products/zatca-connect/index.html` (Raw `<head>` & `<h1>` Excerpt)
```html
<title>ZATCA Connect — Enterprise Integration Middleware for Saudi Phase 2 E-Invoicing | Saky Technologies</title>
<meta name="description" content="High-throughput compliance middleware engineered specifically for the Kingdom of Saudi Arabia. Seamlessly handles CSID cryptographic stamping, UBL 2.1 XML transformation, QR codes, and real-time clearance with the ZATCA portal. Built for Kingdom of Saudi Arabia (KSA).">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://sakytek.com/products/zatca-connect">
<meta property="og:type" content="product">
<meta property="og:site_name" content="Saky Technologies">
<meta property="og:title" content="ZATCA Connect — Enterprise Integration Middleware for Saudi Phase 2 E-Invoicing | Saky Technologies">
<meta property="og:description" content="High-throughput compliance middleware engineered specifically for the Kingdom of Saudi Arabia. Seamlessly handles CSID cryptographic stamping, UBL 2.1 XML transformation, QR codes, and real-time clearance with the ZATCA portal. Built for Kingdom of Saudi Arabia (KSA).">
<meta property="og:url" content="https://sakytek.com/products/zatca-connect">
<meta property="og:image" content="https://sakytek.com/assets/img/og-preview.png">
<meta name="twitter:card" content="summary_large_image">
<script id="saky-jsonld" type="application/ld+json">{"@context":"https://schema.org","@graph":[...]}</script>
...
<h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#2d465e] mb-6 leading-tight">
  ZATCA Connect<span class="text-slate-400 font-normal">:</span> Enterprise Integration Middleware for Saudi Phase 2 E-Invoicing
</h1>
```

---

## 5. Metadata & Canonical URL Audit

All 13 public routes enforce the canonical domain policy (`https://sakytek.com`, non-www, HTTPS, no trailing slash except `/`) via [`data/seo.ts`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/data/seo.ts) and [`components/SEOHead.tsx`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/components/SEOHead.tsx):

| Route | Canonical URL | Unique `<title>` | Unique `<meta name="description">` | `<h1>` in Raw HTML | OG & Twitter Tags |
| :--- | :--- | :--- | :--- | :--- | :---: |
| `/` | `https://sakytek.com/` | `Saky Technologies \| Enterprise B2B SaaS & Microsoft Dynamics 365 ERP Practice` | 237 chars | `Business software built around the way you work.` | Present |
| `/about` | `https://sakytek.com/about` | `About Saky Technologies \| Enterprise Software Engineering & Global Delivery` | 155 chars | `Enterprise software engineered around your operations` | Present |
| `/contact` | `https://sakytek.com/contact` | `Contact Saky Technologies \| Enterprise Enquiries & Architecture Consultation` | 178 chars | `Enterprise Enquiries & Consultation` | Present |
| `/solutions` | `https://sakytek.com/solutions` | `Enterprise ERP Integration & Custom Software Solutions \| Saky Technologies` | 169 chars | `Enterprise Integration & Engineering Practices` | Present |
| `/solutions/erp-integration` | `https://sakytek.com/solutions/erp-integration` | `Microsoft Dynamics 365 & ERP Integration \| Saky Technologies` | 380 chars | `Microsoft Dynamics 365 & ERP Integration` | Present |
| `/solutions/custom-development` | `https://sakytek.com/solutions/custom-development` | `Custom Software Development & Business Intelligence \| Saky Technologies` | 287 chars | `Custom Software Development & Business Intelligence` | Present |
| `/products/taxflow` | `https://sakytek.com/products/taxflow` | `TaxFlow — Automated GST Reconciliation & Corporate Tax Filing Engine \| Saky Technologies` | 228 chars | `TaxFlow : Automated GST Reconciliation & Corporate Tax Filing Engine` | Present |
| `/products/zatca-connect` | `https://sakytek.com/products/zatca-connect` | `ZATCA Connect — Enterprise Integration Middleware for Saudi Phase 2 E-Invoicing \| Saky Technologies` | 269 chars | `ZATCA Connect : Enterprise Integration Middleware for Saudi Phase 2 E-Invoicing` | Present |
| `/products/talentsense-hrms` | `https://sakytek.com/products/talentsense-hrms` | `TalentSense HRMS — Consolidated Workforce Operations, Biometric Attendance & Payroll Engine \| Saky Technologies` | 284 chars | `TalentSense HRMS : Consolidated Workforce Operations, Biometric Attendance & Payroll Engine` | Present |
| `/products/mednext-hims` | `https://sakytek.com/products/mednext-hims` | `MedNext HIMS — Unified Clinical Workflows, Electronic Medical Records & Hospital Operations \| Saky Technologies` | 275 chars | `MedNext HIMS : Unified Clinical Workflows, Electronic Medical Records & Hospital Operations` | Present |
| `/products/procure-ai` | `https://sakytek.com/products/procure-ai` | `Procure AI — Strategic Requisition Workflows, 3-Way Matching & Vendor Intelligence \| Saky Technologies` | 246 chars | `Procure AI : Strategic Requisition Workflows, 3-Way Matching & Vendor Intelligence` | Present |
| `/products/logisud` | `https://sakytek.com/products/logisud` | `LogiSud — Consignment Dispatching, Fleet Manifests & Electronic Proof of Delivery \| Saky Technologies` | 261 chars | `LogiSud : Consignment Dispatching, Fleet Manifests & Electronic Proof of Delivery` | Present |
| `/products/nova-crm` | `https://sakytek.com/products/nova-crm` | `Nova CRM — B2B Opportunity Management, Proposal Workflows & Pipeline Clarity \| Saky Technologies` | 252 chars | `Nova CRM : B2B Opportunity Management, Proposal Workflows & Pipeline Clarity` | Present |

---

## 6. `robots.txt` and `sitemap.xml` Validation

- **[`public/robots.txt`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/public/robots.txt)**:
  - Returns `HTTP 200` with `User-agent: *`, `Allow: /`, `Disallow: /404`, `Disallow: /contact?*` (preventing duplicate crawl budget waste on query-string prefill links), and `Sitemap: https://sakytek.com/sitemap.xml`.
- **[`public/sitemap.xml`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/public/sitemap.xml)**:
  - Returns `HTTP 200` (`application/xml`).
  - Contains exactly **13 canonical, indexable HTTPS URLs** (`https://sakytek.com/` through `https://sakytek.com/products/nova-crm`).
  - Excludes 404 pages, redirected URLs, query-parameter variants, and non-indexable routes.
  - Uses static `lastmod` (`2026-10-30`) rather than regenerating timestamps on every build.

---

## 7. Structured Data (JSON-LD) Validation Report

All 13 routes include validated `@context: "https://schema.org"` `@graph` payloads in [`data/seo.ts`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/data/seo.ts) using **only verified business facts** from the repository (Singapore HQ, Muscat Oman, Chennai India addresses/phones/email `info@sakytek.com`; zero fabricated ratings, reviews, pricing, or unverified certifications):

| Route Pattern | Schema.org `@type` Entities | Validation Result |
| :--- | :--- | :---: |
| `/` | `Organization`, `WebSite`, `WebPage` | Valid JSON-LD |
| `/about` | `Organization`, `WebSite`, `AboutPage`, `BreadcrumbList` | Valid JSON-LD |
| `/contact` | `Organization`, `WebSite`, `ContactPage`, `BreadcrumbList` | Valid JSON-LD |
| `/solutions` | `Organization`, `WebSite`, `Service` (x2), `BreadcrumbList` | Valid JSON-LD |
| `/solutions/*` (2 pages) | `Organization`, `WebSite`, `Service`, `BreadcrumbList` | Valid JSON-LD |
| `/products/*` (7 pages) | `Organization`, `WebSite`, `SoftwareApplication`, `BreadcrumbList` | Valid JSON-LD |

---

## 8. JavaScript Runtime Exception (`tailwind is not defined`) & Console Verification

### 8.1 Root Cause of `tailwind is not defined`
[`index.html`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/index.html) previously loaded `<script src="https://cdn.tailwindcss.com"></script>` followed by an inline `<script>tailwind.config = { ... }</script>`. Because `https://cdn.tailwindcss.com` issues a `302` redirect to `https://cdn.tailwindcss.com/3.4.17`, headless crawlers blocking cross-origin script redirects or experiencing CDN latency executed the inline script when `window.tailwind` was undefined, throwing `Uncaught ReferenceError: tailwind is not defined`.

### 8.2 Resolution & Verification
- Installed `tailwindcss@^3.4.17`, `postcss`, and `autoprefixer` in [`package.json`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/package.json).
- Configured [`tailwind.config.js`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/tailwind.config.js), [`postcss.config.js`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/postcss.config.js), and [`index.css`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/index.css) so all Tailwind utility classes compile into a static 53.25 kB CSS asset (`dist/assets/index-C5IR-iBd.css`).
- Removed `<script src="https://cdn.tailwindcss.com"></script>`, inline `tailwind.config`, and unused `importmap` from [`index.html`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/index.html).
- **Playwright Browser Verification ([`docs/browser-runtime-verification.json`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/docs/browser-runtime-verification.json))**:
  - **13 / 13 routes** rendered in headless Chromium across Desktop (`1440x900`) and Mobile (`390x844`).
  - **Total console errors / page exceptions**: **`0`**.
  - **Computed CSS verification**: Hero `<h1>` `fontSize: 60px`, subpage `<h1>` `fontSize: 48px`, mobile horizontal overflow: `false` across all 13 routes.

---

## 9. Lighthouse Report, BeyondSEO Comparison & Search Engine Integration Steps

### 9.1 Lighthouse Audit Results ([`docs/lighthouse-summary.json`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/docs/lighthouse-summary.json))
| Category | Score | Key Metrics & Passed Audits |
| :--- | :---: | :--- |
| **SEO** | **100 / 100** | Passed all 10 audits (`is-crawlable`, `document-title`, `meta-description`, `http-status-code`, `link-text`, `crawlable-anchors`, `robots-txt`, `image-alt`, `hreflang`, `canonical`) |
| **Best Practices** | **100 / 100** | Zero console errors, valid doctype, safe external links |
| **Accessibility** | **94 / 100** | Valid ARIA attributes, mobile tap targets, document title & language |
| **Performance** | **92 / 100** | FCP: `2.3 s`, LCP: `2.3 s`, TBT: `140 ms`, **CLS: `0`** |

### 9.2 BeyondSEO Crawl Comparison (Before vs. After)
| Metric | Before Fix (`beyondseo_run`) | After Fix (`beyondseo_after_fix`) | Delta |
| :--- | :---: | :---: | :---: |
| **Attempted URLs** | 12 | 22 (13 canonical routes + 9 query links) | +10 discovered nested links |
| **HTTP 200 HTML Documents** | 1 (`/`) | **22 (100% of attempted URLs)** | **+21 working URLs** |
| **HTTP 404 Errors** | **11 (91.7% failure rate)** | **0 (0% failure rate)** | **-11 (All 404s eliminated)** |
| **High-Severity Findings** | **23** | **0** | **-23 (100% resolved)** |
| **JS Runtime Error Pages (`tailwind is not defined`)** | **1 (`100%` of rendered pages)** | **0** | **Eliminated** |
| **`robots.txt` & `sitemap.xml`** | Both `404` | Both **`200 OK`** | **Fixed** |

### 9.3 Build, Lint & Acceptance Test Summary
- `npm run lint` (`tsc --noEmit`): **PASS (0 errors)**
- `npm run build` (`vite build` + SSR bundle + prerender 13 routes & 404): **PASS (0 errors)**
- `node scripts/verify-seo-acceptance.mjs`: **PASS (18/18 checks passed, 0 failures)**
- `python scripts/verify-browser-runtime.py`: **PASS (13/13 routes, 0 console/page errors)**

### 9.4 Post-Deployment Search Engine Integration Checklist (GSC & Bing)
Once you review and approve pushing these changes to production (`origin/main`):
1. **Google Search Console (`https://search.google.com/search-console`)**:
   - Add Domain property `sakytek.com` and verify ownership via DNS TXT record at your domain registrar.
   - Navigate to **Sitemaps** → submit `https://sakytek.com/sitemap.xml`.
   - Use **URL Inspection** → **Request Indexing** on `/`, `/about`, `/contact`, `/solutions`, `/solutions/erp-integration`, `/solutions/custom-development`, `/products/zatca-connect`, and `/products/taxflow`.
2. **Bing Webmaster Tools (`https://www.bing.com/webmasters`)**:
   - Import verified site directly from Google Search Console (1-click import) or verify via DNS TXT.
   - Submit `https://sakytek.com/sitemap.xml` under **Sitemaps**.
3. **Rich Results Validation**:
   - Test `https://sakytek.com/` and `https://sakytek.com/products/zatca-connect` in [Google Rich Results Test](https://search.google.com/test/rich-results) and [Schema.org Validator](https://validator.schema.org/).
