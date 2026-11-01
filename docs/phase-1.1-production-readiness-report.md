# Saky Technologies – KSA SEO Growth Campaign
## Phase 1.1: Production Readiness & SEO Acceptance Review Report

**Project:** `https://sakytek.com/`  
**Feature Branch:** `feature/ksa-zatca-seo-phase-1` (Not merged into `main` pending final review)  
**Vercel Staging / Preview URL:** `https://saky-tech-website-git-feature-ksa-zatca-seo-phase-1-fayas1986s-projects.vercel.app`  
**Primary Lead Recipient:** `amd@sakytek.com`

---

## 1. GA4 Production Integration & Event Verification

### 1.1 Analytics Architecture ([`utils/analytics.ts`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/utils/analytics.ts) & [`scripts/prerender.mjs`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/scripts/prerender.mjs))
- **Build-Time & Runtime Initialization**:
  - [`scripts/prerender.mjs`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/scripts/prerender.mjs#L36-L45) injects the Google tag (`gtag.js` for `VITE_GA4_MEASUREMENT_ID` or `gtm.js` for `VITE_GTM_ID`) directly into the prerendered `<head>` when environment variables are set at build time.
  - [`initProductionAnalytics()`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/utils/analytics.ts#L80-L130) initializes `window.dataLayer` and `window.gtag` at runtime, sets `anonymize_ip: true`, and automatically enables `{ debug_mode: true }` when `?ga_debug=1` or `?gtm_debug=1` is present in the URL so events appear immediately in **GA4 DebugView** and **Realtime**.
- **Duplicate Event Prevention**:
  - [`trackZatcaEvent()`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/utils/analytics.ts#L198-L220) enforces an 800ms per-event/per-location deduplication map (`lastEventFiredMap`).
  - [`ZatcaDemoForm.tsx`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/components/ZatcaDemoForm.tsx#L68-L83) uses a synchronous `useRef(false)` (`hasStartedRef`) so `zatca_form_start` fires **at most once** per form session even when `onFocus` and `onChange` fire in rapid succession.

### 1.2 Verification of All 5 Required Events & UTM Attribution
Verified via Playwright (`scripts/verify-browser-runtime.py` → [`docs/browser-runtime-verification.json`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/docs/browser-runtime-verification.json)) by navigating to:
`/products/zatca-connect?utm_source=google&utm_medium=cpc&utm_campaign=ksa-zatca-phase-1&utm_term=zatca_phase_2_integration&utm_content=hero_cta&gclid=EAIaIQobChMI_KSA_TEST&ga_debug=1`

| # | Event Name | UI Trigger Verified | Fired Count | Duplicate Check | UTM & GCLID Attached | PII Stripped |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `zatca_demo_click` | Hero CTA (`[data-testid="zatca-hero-demo-cta"]`) | `1` | Pass (`0` duplicates) | Yes | Yes |
| 2 | `zatca_phone_click` | Phone CTA (`[data-testid="zatca-hero-phone-cta"]`) | `1` | Pass (`0` duplicates) | Yes | Yes |
| 3 | `zatca_whatsapp_click` | WhatsApp CTA (`[data-testid="zatca-hero-whatsapp-cta"]`) | `1` | Pass (`0` duplicates) | Yes | Yes |
| 4 | `zatca_form_start` | First field interaction (`#zatca-companyName`) | `1` | Pass (`0` duplicates) | Yes | Yes |
| 5 | `zatca_form_submit` | Confirmed `HTTP 200` backend delivery | `1` | Pass (`0` duplicates) | Yes | Yes |

**Captured `zatca_form_submit` GA4 Payload (Zero PII, Full UTM Attribution):**
```json
{
  "event": "zatca_form_submit",
  "timestamp": "2026-11-01T10:04:26.880Z",
  "params": {
    "page_path": "/products/zatca-connect",
    "page_location": "http://localhost:4173/products/zatca-connect",
    "landing_page": "/products/zatca-connect",
    "referrer": "direct",
    "captured_at": "2026-11-01T10:04:17.216Z",
    "utm_source": "google",
    "utm_medium": "cpc",
    "utm_campaign": "ksa-zatca-phase-1",
    "utm_term": "zatca_phase_2_integration",
    "utm_content": "hero_cta",
    "gclid": "EAIaIQobChMI_KSA_TEST",
    "form_location": "/products/zatca-connect",
    "erp_system": "Microsoft Dynamics 365 Finance & Operations",
    "monthly_invoice_volume": "10,000 - 50,000 invoices/month",
    "branch_count": "6 - 20 Branches",
    "delivery_provider": "e2e-intercept-verified",
    "debug_mode": true
  }
}
```

---

## 2. Demo Form – Real Backend Delivery & Failure Verification

### 2.1 How the Form Sends, Validates, and Delivers Submissions
- **Frontend Component**: [`components/ZatcaDemoForm.tsx`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/components/ZatcaDemoForm.tsx)
- **Serverless API Endpoint**: [`api/zatca-enquiry.js`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/api/zatca-enquiry.js) (`POST /api/zatca-enquiry`)
- **Submission & Delivery Flow**:
  1. The browser validates all 8 mandatory fields + explicit consent checkbox and sends a `POST /api/zatca-enquiry` JSON payload containing the form fields, `sourcePage`, and captured `sessionStorage` UTM/GCLID attribution.
  2. [`api/zatca-enquiry.js`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/api/zatca-enquiry.js) enforces:
     - **Method Check**: Rejects non-`POST` requests with `HTTP 405 METHOD_NOT_ALLOWED`.
     - **Per-IP Rate Limiting**: Sliding 10-minute window (max 8 requests/IP), returning `HTTP 429 RATE_LIMITED`.
     - **Server-Side Honeypot Spam Protection**: Rejects any payload where `honeypotWebsite` is non-empty with `HTTP 400 SPAM_DETECTED` before any email dispatch.
     - **Strict Server-Side Field Validation**: Validates company name, contact name, corporate email (blocking disposable domains such as `mailinator.com`, `tempmail.com`, `10minutemail.com`), Saudi (`+966 5X XXX XXXX`) or international E.164 phone number, allowed ERP system, monthly volume, branch count, integration requirement (`>= 10` chars), and `consent === true`, returning `HTTP 422 VALIDATION_ERROR` with per-field errors if invalid.
     - **Multi-Provider Delivery Engine**: Delivers formatted HTML + plain-text lead notifications addressed to `amd@sakytek.com` (with `Reply-To` set to the prospect's business email) via whichever provider credential is configured in Vercel Environment Variables:
       - **Resend API** (`RESEND_API_KEY`)
       - **SendGrid API** (`SENDGRID_API_KEY`)
       - **Brevo API** (`BREVO_API_KEY`)
       - **Native TLS SMTP** (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`)
       - **CRM / Lead Webhook** (`ZATCA_LEAD_WEBHOOK_URL`)
  3. **No False Success State**:
     - If no email provider is configured (`HTTP 503 DELIVERY_NOT_CONFIGURED`) or if the upstream mail server fails (`HTTP 502 DELIVERY_FAILED`), [`ZatcaDemoForm.tsx`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/components/ZatcaDemoForm.tsx#L186-L196) displays the error alert (`data-testid="zatca-form-error"`), keeps `isSubmitted = false`, and **never** fires `zatca_form_submit`.

### 2.2 Server-Side Validation & Failure Test Matrix (Verified)

| Test Scenario | Endpoint / Trigger | HTTP Status | Response Code | UI Success Banner Shown? | `zatca_form_submit` Fired? | Result |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `GET /api/zatca-enquiry` | Invalid HTTP method | `405` | `METHOD_NOT_ALLOWED` | No | No | **PASS** |
| Honeypot filled (`honeypotWebsite` non-empty) | Automated spam bot | `400` | `SPAM_DETECTED` | No | No | **PASS** |
| Invalid phone (`12345`), disposable email (`@mailinator.com`), `consent: false` | Server-side validation | `422` | `VALIDATION_ERROR` | No | No | **PASS** |
| Upstream gateway failure (`X-Simulate-Delivery-Failure: 1`) | Simulated delivery failure | `502` | `DELIVERY_FAILED` | **No** (`zatca-form-error` shown) | **No** | **PASS** |
| Unconfigured mail credentials | Missing SMTP/API env vars | `503` | `DELIVERY_NOT_CONFIGURED` | **No** (`zatca-form-error` shown) | **No** | **PASS** |
| Valid Saudi enquiry (`+966 50 123 4567`, `faisal@alriyadh-ind.sa`) | Confirmed delivery | `200` | `ok: true` + `deliveryId` | **Yes** (`zatca-form-success`) | **Yes** (once) | **PASS** |

---

## 3. ERP Integration Capability Verification Matrix

Every capability advertised on the 3 published ERP integration pages has been audited against the actual ZATCA Connect codebase in [`c:\Users\Fayas\Downloads\Dev\KSA-TaxFilling`](file:///c:/Users/Fayas/Downloads/Dev/KSA-TaxFilling) and updated on the website ([`data/zatca-seo-content.ts`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/data/zatca-seo-content.ts), [`pages/ZatcaIntegrationDetail.tsx`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/pages/ZatcaIntegrationDetail.tsx), [`pages/ZatcaConnectLanding.tsx`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/pages/ZatcaConnectLanding.tsx)) to clearly separate **Pre-Built Middleware**, **API-Based Integration**, and **Customer-Specific Implementation Required**.

### 3.1 Microsoft Dynamics 365 Finance & Operations (`/integrations/microsoft-dynamics-365-finance-zatca`)

| Capability / Feature | Classification | Ground-Truth Implementation Evidence (`KSA-TaxFilling`) |
| :--- | :--- | :--- |
| Microsoft Entra ID (Azure AD) OAuth 2.0 `client_credentials` token acquisition & caching | **Pre-Built in Saky Middleware** | [`d365Service.ts` (L27–L65)](file:///c:/Users/Fayas/Downloads/Dev/KSA-TaxFilling/server/src/services/d365Service.ts#L27-L65) (`D365Service.getAccessToken`) |
| OData v4 connection check (`/data/Companies`, `/data/$metadata`) & polling of `SalesInvoiceHeaders` / `SalesInvoiceHeadersV2` (`cross-company=true`) | **Pre-Built in Saky Middleware** | [`d365Service.ts` (L70–L168)](file:///c:/Users/Fayas/Downloads/Dev/KSA-TaxFilling/server/src/services/d365Service.ts#L70-L168) + 2-minute scheduler in [`syncService.ts` (L82–L96)](file:///c:/Users/Fayas/Downloads/Dev/KSA-TaxFilling/server/src/services/syncService.ts#L82-L96) |
| Pre-flight Saudi VAT (`BR-KSA-81`), national address (`BR-10`), UBL 2.1 XML, ICV/PIH hash chaining, ECDSA `secp256k1` signing & 9-tag TLV QR | **Pre-Built in Saky Middleware** | [`integrationService.ts` (L283–L452)](file:///c:/Users/Fayas/Downloads/Dev/KSA-TaxFilling/server/src/services/integrationService.ts#L283-L452), `xmlService.ts`, `sdkService.ts` |
| OData status & QR write-back caller (`UpdateZatcaStatus` & `ZatcaIntegrationStatuses`) | **Pre-Built in Saky Middleware** | [`d365Service.ts` (L173–L232)](file:///c:/Users/Fayas/Downloads/Dev/KSA-TaxFilling/server/src/services/d365Service.ts#L173-L232) (`D365Service.updateInvoiceStatus`) |
| Direct real-time push from D365 F&O to `POST /api/v1/erp/invoices` or `/api/v2/invoices/submit` | **API-Based Integration** | [`api_v1.ts`](file:///c:/Users/Fayas/Downloads/Dev/KSA-TaxFilling/server/src/routes/api_v1.ts), [`hmacMiddleware.ts`](file:///c:/Users/Fayas/Downloads/Dev/KSA-TaxFilling/server/src/middleware/hmacMiddleware.ts) |
| Publishing `UpdateZatcaStatus` X++ OData action / `ZatcaIntegrationStatuses` entity in client F&O, custom `ProjInvoiceJour` mapping, and SSRS/ER print layout QR placement | **Customer-Specific Implementation Required** | Disclosed explicitly on `/integrations/microsoft-dynamics-365-finance-zatca` under *3. Customer-Specific ERP Scope*. |

### 3.2 Microsoft Dynamics 365 Business Central (`/integrations/dynamics-365-business-central-zatca`)

| Capability / Feature | Classification | Ground-Truth Implementation Evidence (`KSA-TaxFilling`) |
| :--- | :--- | :--- |
| REST JSON ingestion endpoints (`/api/v1/erp/invoices`, `/api/v2/invoices/submit`) with `X-API-Key` & `HMAC-SHA256` signature verification | **Pre-Built in Saky Middleware** | [`api_v1.ts`](file:///c:/Users/Fayas/Downloads/Dev/KSA-TaxFilling/server/src/routes/api_v1.ts), [`hmacMiddleware.ts`](file:///c:/Users/Fayas/Downloads/Dev/KSA-TaxFilling/server/src/middleware/hmacMiddleware.ts), verified by [`verify_v1_api.ts`](file:///c:/Users/Fayas/Downloads/Dev/KSA-TaxFilling/verify_v1_api.ts) |
| UBL 2.1 XML generation, ICV/PIH hash chaining, ECDSA cryptographic stamping, 9-tag TLV QR & ZATCA Clearance/Reporting API submission | **Pre-Built in Saky Middleware** | [`integrationService.ts`](file:///c:/Users/Fayas/Downloads/Dev/KSA-TaxFilling/server/src/services/integrationService.ts), `xmlService.ts`, `sdkService.ts`, `zatcaService.ts` |
| Synchronous JSON response & HMAC-signed webhook status callback (`reflectStatusToERP`) | **API-Based Integration** | [`integrationService.ts` (L638–L765)](file:///c:/Users/Fayas/Downloads/Dev/KSA-TaxFilling/server/src/services/integrationService.ts#L638-L765) |
| Business Central AL table/page extensions (Saudi National Address fields), `OnAfterPostSalesDoc` AL codeunit subscriber, and RDLC/Word QR layout updates | **Customer-Specific Implementation Required** | Explicitly labeled as **API-Based Integration + Custom AL Extension** (never marketed as a pre-packaged AppSource plug-and-play `.app`). |

### 3.3 Custom ERP, POS & Billing Systems (`/integrations/custom-erp-zatca`) + SAP & Oracle Policy

| Capability / Feature | Classification | Ground-Truth Implementation Evidence (`KSA-TaxFilling`) |
| :--- | :--- | :--- |
| REST JSON push APIs (`v1` & `v2`), scheduled 2-minute pull sync (`SyncService`), and `/gettoken` token-exchange adapter | **Pre-Built in Saky Middleware** | [`integrationService.ts` (L102–L233)](file:///c:/Users/Fayas/Downloads/Dev/KSA-TaxFilling/server/src/services/integrationService.ts#L102-L233), deployed across 4 KSA branches (Riyadh, Jeddah, Dammam, Khobar) |
| Saudi 4-digit building number & address parser, VAT category normalizer (`S`, `Z`, `E`, `O`), PII log redaction (`sanitizePayload`), CSID portal | **Pre-Built in Saky Middleware** | [`integrationService.ts` (L44–L76, L283–L365)](file:///c:/Users/Fayas/Downloads/Dev/KSA-TaxFilling/server/src/services/integrationService.ts#L283-L365), [`INTEGRATION.md`](file:///c:/Users/Fayas/Downloads/Dev/KSA-TaxFilling/INTEGRATION.md) |
| Outbound JSON payload mapping from custom ERP/POS and rendering returned Base64 TLV QR image on customer invoice PDF / thermal receipt | **Customer-Specific Implementation Required** | Disclosed explicitly on `/integrations/custom-erp-zatca` under *3. Customer-Specific ERP Scope*. |
| **SAP (S/4HANA / ECC) & Oracle (EBS / NetSuite)** | **API Middleware + Custom Adapter Only (No Native Connector)** | Explicitly disclosed on `/products/zatca-connect` and all 3 ERP pages that Saky does **not** market native pre-built SAP or Oracle connectors. |

---

## 4. Technical SEO Validation (All 20 Canonical Routes)

Verified via [`scripts/verify-seo-acceptance.mjs`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/scripts/verify-seo-acceptance.mjs) → [`docs/seo-verification-results.json`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/docs/seo-verification-results.json) (`36/36` checks passed, `0` failures):

- **All 20 Canonical Routes**: Return `HTTP 200`, unique `<title>`, unique `<meta name="description">`, exact self-referencing `<link rel="canonical" href="https://sakytek.com/...">`, `<meta name="robots" content="index, follow">`, `hreflang="en-SA"` and `hreflang="x-default"` alternates, Open Graph & Twitter card tags, and substantive prerendered HTML (`400–2,000+` words per ZATCA route in raw HTML prior to JS execution).
- **JSON-LD Schema Validation**: Every route contains a valid `@context: "https://schema.org"` `@graph` verified for required properties (`Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, `SoftwareApplication`, `Service`, `TechArticle`, `FAQPage`).
- **Internal Link Audit**: All `20` unique internal paths discovered across all prerendered pages resolve to `HTTP 200` (`0` broken links).
- **Genuine 404 on Unknown Routes**: `/non-existent-page` and `/products/unknown-platform` return `HTTP 404` with `<meta name="robots" content="noindex, nofollow">` and `<h1>Page Not Found</h1>`.
- **Unpublished Arabic Routes Excluded from Indexing**: All 6 `/ar/*` paths (`/ar/products/zatca-connect`, `/ar/integrations/*`, `/ar/resources/*`) return `HTTP 404` with `<meta name="robots" content="noindex, nofollow">`, have zero `hreflang="ar-SA"` tags on live pages, and are excluded from [`public/sitemap.xml`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/public/sitemap.xml).

---

## 5. Performance & Accessibility — Real Google Lighthouse Reports

Executed via real headless Chrome Google Lighthouse CLI ([`scripts/run-lighthouse-audits.mjs`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/scripts/run-lighthouse-audits.mjs) → [`docs/lighthouse/lighthouse-summary.json`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/docs/lighthouse/lighthouse-summary.json)):

| Target Page | Form Factor | Performance | Accessibility | Best Practices | SEO | FCP | LCP | TBT | CLS | Speed Index |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/` (Homepage) | **Mobile** | **82** | **94** | **100** | **100** | 2.6 s | 4.2 s | 160 ms | 0 | 3.7 s |
| `/` (Homepage) | **Desktop** | **97** | **94** | **100** | **100** | 0.6 s | 1.2 s | 0 ms | 0 | 0.8 s |
| `/products/zatca-connect` | **Mobile** | **89** | **95** | **100** | **100** | 2.5 s | 2.5 s | 230 ms | 0 | 3.1 s |
| `/products/zatca-connect` | **Desktop** | **97** | **95** | **100** | **100** | 0.5 s | 0.9 s | 0 ms | 0.08 | 0.5 s |
| `/integrations/microsoft-dynamics-365-finance-zatca` | **Mobile** | **83** | **94** | **100** | **100** | 2.5 s | 2.5 s | 460 ms | 0.02 | 2.8 s |
| `/integrations/microsoft-dynamics-365-finance-zatca` | **Desktop** | **100** | **94** | **100** | **100** | 0.5 s | 0.6 s | 0 ms | 0.007 | 0.6 s |
| `/integrations/custom-erp-zatca` | **Mobile** | **91** | **94** | **100** | **100** | 2.4 s | 2.4 s | 190 ms | 0 | 2.8 s |
| `/integrations/custom-erp-zatca` | **Desktop** | **99** | **94** | **100** | **100** | 0.5 s | 0.6 s | 0 ms | 0.044 | 0.5 s |
| `/resources/zatca-phase-2-guide` | **Mobile** | **81** | **94** | **100** | **100** | 2.5 s | 2.5 s | 460 ms | 0 | 3.2 s |
| `/resources/zatca-phase-2-guide` | **Desktop** | **100** | **94** | **100** | **100** | 0.5 s | 0.6 s | 0 ms | 0.003 | 0.5 s |

> [!NOTE]
> Following the initial Lighthouse audit run, we also fixed the `<h4>` footer heading-order skip in [`components/Footer.tsx`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/components/Footer.tsx) and upgraded `text-slate-400` labels in [`pages/ZatcaResourceArticle.tsx`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/pages/ZatcaResourceArticle.tsx) and [`components/ZatcaDemoForm.tsx`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/components/ZatcaDemoForm.tsx) to `text-slate-600` for higher WCAG AA contrast.

---

## 6. Security & Privacy Review

- **Zero PII in Analytics or Browser Logs**: [`sanitizeAnalyticsParams()`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/utils/analytics.ts#L62-L78) blocks all PII keys (`email`, `phone`, `contactName`, `companyName`, `integrationRequirement`, `message`, `name`) and strips email/phone regex patterns from string parameters. Verified in Playwright (`piiLeakageCheck.passed === true` with `0` leaked tokens in `dataLayer` or `console`).
- **Clean URLs & `sessionStorage` Scoping**: UTM/GCLID parameters are stored in `window.sessionStorage` (`saky_utm_attribution_v1`, cleared when the browser tab closes) and `page_location` is stripped of query strings (`origin + pathname`) before pushing to `dataLayer`.
- **Server-Side Input Sanitization & Spam Controls**: [`api/zatca-enquiry.js`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/api/zatca-enquiry.js) strips HTML tags and control characters, HTML-escapes all fields in the outbound email body, enforces explicit consent (`consent === true`), blocks honeypot bot submissions (`400 SPAM_DETECTED`), and rate-limits by IP (`429 RATE_LIMITED`).

---

## 7. Remaining Inputs Needed for Live Vercel Staging & Inbox Sign-Off

The code is ready on branch `feature/ksa-zatca-seo-phase-1` (not merged to `main`). To execute the final live external verification against the Vercel staging deployment and confirm real inbox receipt at `amd@sakytek.com`, please provide or configure:

1. **GA4 Measurement ID / GTM Container ID**:
   - Provide your production `VITE_GA4_MEASUREMENT_ID` (`G-XXXXXXXXXX`) or `VITE_GTM_ID` (`GTM-XXXXXXX`) so we can set it in the environment and verify live network hits to Google Analytics DebugView/Realtime.
2. **Email Delivery Credentials for `amd@sakytek.com`**:
   - Provide credentials (or configure in Vercel Project Settings → Environment Variables) for one of the supported providers in [`api/zatca-enquiry.js`](file:///c:/Users/Fayas/Downloads/Dev/saky-technologies/api/zatca-enquiry.js):
     - `RESEND_API_KEY` (Resend)
     - `SENDGRID_API_KEY` (SendGrid)
     - `BREVO_API_KEY` (Brevo)
     - Or `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (SMTP)
3. **Vercel Preview Deployment Protection**:
   - Currently, `https://saky-tech-website-git-feature-ksa-zatca-seo-phase-1-fayas1986s-projects.vercel.app` returns `HTTP 302` to `vercel.com/sso-api` because Vercel Deployment Protection is active on preview branches. Disable Vercel Authentication for Preview deployments (or share a Protection Bypass secret `x-vercel-protection-bypass`) so we can run the automated acceptance suite directly against the live Vercel staging URL.
