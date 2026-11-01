import http from 'node:http';
import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:4173';

const PRIORITY_ROUTES = [
  '/',
  '/about',
  '/contact',
  '/solutions',
  '/solutions/erp-integration',
  '/solutions/custom-development',
  '/products/taxflow',
  '/products/zatca-connect',
  '/products/talentsense-hrms',
  '/products/mednext-hims',
  '/products/procure-ai',
  '/products/logisud',
  '/products/nova-crm',
  '/integrations/microsoft-dynamics-365-finance-zatca',
  '/integrations/dynamics-365-business-central-zatca',
  '/integrations/custom-erp-zatca',
  '/resources/zatca-phase-2-guide',
  '/resources/zatca-wave-25-2027',
  '/resources/zatca-csid-onboarding',
  '/resources/zatca-clearance-vs-reporting',
];

const UNPUBLISHED_ARABIC_ROUTES = [
  '/ar/products/zatca-connect',
  '/ar/integrations/microsoft-dynamics-365-finance-zatca',
  '/ar/integrations/dynamics-365-business-central-zatca',
  '/ar/integrations/custom-erp-zatca',
  '/ar/resources/zatca-phase-2-guide',
  '/ar/resources/zatca-csid-onboarding',
];

function fetchUrl(urlPath, options = {}) {
  return new Promise((resolve, reject) => {
    const fullUrl = `${BASE_URL}${urlPath}`;
    const urlObj = new URL(fullUrl);
    const client = fullUrl.startsWith('https://') ? https : http;
    const req = client.request(
      urlObj,
      {
        method: options.method || 'GET',
        headers: options.headers || {},
      },
      (res) => {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body,
          });
        });
      }
    );
    req.on('error', reject);
    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

function extractTag(html, regex) {
  const m = html.match(regex);
  return m ? m[1].trim() : null;
}

function stripHtmlTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function validateSchemaNode(node) {
  const type = node['@type'];
  if (!type) return { valid: false, reason: 'Missing @type' };
  if (type === 'Organization' && (!node.name || !node.url)) {
    return { valid: false, reason: 'Organization missing name or url' };
  }
  if (type === 'BreadcrumbList' && (!Array.isArray(node.itemListElement) || node.itemListElement.length === 0)) {
    return { valid: false, reason: 'BreadcrumbList missing itemListElement' };
  }
  if (type === 'SoftwareApplication' && (!node.name || !node.applicationCategory || !node.operatingSystem)) {
    return { valid: false, reason: 'SoftwareApplication missing required properties' };
  }
  if (type === 'FAQPage' && (!Array.isArray(node.mainEntity) || node.mainEntity.length === 0)) {
    return { valid: false, reason: 'FAQPage missing mainEntity questions' };
  }
  if (type === 'TechArticle' && (!node.headline || !node.datePublished || !node.author)) {
    return { valid: false, reason: 'TechArticle missing headline, datePublished, or author' };
  }
  return { valid: true };
}

async function runVerification() {
  const results = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    routes: [],
    unknownRoutes: [],
    unpublishedArabicRoutes: [],
    internalLinkAudit: null,
    apiValidationTests: [],
    redirects: [],
    robotsTxt: null,
    sitemapXml: null,
    summary: { passed: 0, failed: 0, failures: [] },
  };

  const titles = new Set();
  const descriptions = new Set();
  const canonicals = new Set();
  const discoveredInternalPaths = new Set();
  const routeSet = new Set(PRIORITY_ROUTES);

  for (const route of PRIORITY_ROUTES) {
    const res = await fetchUrl(route);
    const title = extractTag(res.body, /<title>([\s\S]*?)<\/title>/i);
    const description = extractTag(res.body, /<meta\s+name="description"\s+content="([^"]*)"/i);
    const robots = extractTag(res.body, /<meta\s+name="robots"\s+content="([^"]*)"/i);
    const canonical = extractTag(res.body, /<link\s+rel="canonical"\s+href="([^"]*)"/i);
    const ogTitle = extractTag(res.body, /<meta\s+property="og:title"\s+content="([^"]*)"/i);
    const ogDesc = extractTag(res.body, /<meta\s+property="og:description"\s+content="([^"]*)"/i);
    const ogUrl = extractTag(res.body, /<meta\s+property="og:url"\s+content="([^"]*)"/i);
    const ogImage = extractTag(res.body, /<meta\s+property="og:image"\s+content="([^"]*)"/i);
    const twitterCard = extractTag(res.body, /<meta\s+name="twitter:card"\s+content="([^"]*)"/i);
    const h1Raw = extractTag(res.body, /<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const h1Text = h1Raw ? stripHtmlTags(h1Raw) : null;
    const jsonLdRaw = extractTag(
      res.body,
      /<script\s+id="seo-json-ld"\s+type="application\/ld\+json">([\s\S]*?)<\/script>/i
    );

    const rawTextWords = stripHtmlTags(res.body).split(/\s+/).filter(Boolean).length;

    // Extract internal links from HTML
    const hrefMatches = [...res.body.matchAll(/href="(\/[^"#?]*)/g)].map((m) => m[1]);
    for (const href of hrefMatches) {
      if (!href.startsWith('/assets/') && !href.endsWith('.svg') && !href.endsWith('.png')) {
        discoveredInternalPaths.add(href === '' ? '/' : href);
      }
    }

    let jsonLdValid = false;
    let schemaTypes = [];
    let schemaValidationIssues = [];
    if (jsonLdRaw) {
      try {
        const parsed = JSON.parse(jsonLdRaw);
        jsonLdValid = parsed['@context'] === 'https://schema.org' && Array.isArray(parsed['@graph']);
        if (jsonLdValid) {
          schemaTypes = parsed['@graph'].map((item) => item['@type']);
          for (const node of parsed['@graph']) {
            const check = validateSchemaNode(node);
            if (!check.valid) {
              schemaValidationIssues.push(check.reason);
              jsonLdValid = false;
            }
          }
        }
      } catch {
        jsonLdValid = false;
      }
    }

    const expectedCanonical = route === '/' ? 'https://sakytek.com/' : `https://sakytek.com${route}`;
    const hasTailwindCdn = res.body.includes('cdn.tailwindcss.com');
    const hreflangEnSa = extractTag(res.body, /<link\s+rel="alternate"\s+hreflang="en-SA"\s+href="([^"]*)"/i);
    const hreflangDefault = extractTag(res.body, /<link\s+rel="alternate"\s+hreflang="x-default"\s+href="([^"]*)"/i);
    const hasArHreflang = /hreflang="ar/i.test(res.body);

    const checks = {
      status200: res.statusCode === 200,
      hasTitle: Boolean(title && title.length > 10),
      uniqueTitle: !titles.has(title),
      hasDescription: Boolean(description && description.length > 40),
      uniqueDescription: !descriptions.has(description),
      canonicalMatches: canonical === expectedCanonical,
      uniqueCanonical: !canonicals.has(canonical),
      hasHreflang: hreflangEnSa === expectedCanonical && hreflangDefault === expectedCanonical && !hasArHreflang,
      robotsIndexFollow: robots === 'index, follow',
      hasH1: Boolean(h1Text && h1Text.length > 3),
      hasSubstantiveRawHtml: rawTextWords > 120,
      hasOpenGraph: Boolean(ogTitle && ogDesc && ogUrl === expectedCanonical && ogImage),
      hasTwitterCard: twitterCard === 'summary_large_image',
      hasValidJsonLd: jsonLdValid && schemaTypes.length >= 2,
      noTailwindCdn: !hasTailwindCdn,
    };

    titles.add(title);
    descriptions.add(description);
    canonicals.add(canonical);

    const allPassed = Object.values(checks).every(Boolean);
    if (allPassed) {
      results.summary.passed++;
    } else {
      results.summary.failed++;
      results.summary.failures.push({ route, checks, schemaValidationIssues });
    }

    results.routes.push({
      route,
      statusCode: res.statusCode,
      title,
      description,
      canonical,
      robots,
      h1Text,
      rawTextWords,
      schemaTypes,
      checks,
    });
  }

  // Verify all discovered internal links resolve to valid canonical routes
  const brokenInternalLinks = [];
  for (const linkPath of discoveredInternalPaths) {
    if (!routeSet.has(linkPath)) {
      const checkRes = await fetchUrl(linkPath);
      if (checkRes.statusCode !== 200) {
        brokenInternalLinks.push({ path: linkPath, statusCode: checkRes.statusCode });
      }
    }
  }
  results.internalLinkAudit = {
    totalUniqueInternalLinksChecked: discoveredInternalPaths.size,
    brokenLinksCount: brokenInternalLinks.length,
    brokenLinks: brokenInternalLinks,
    passed: brokenInternalLinks.length === 0,
  };
  if (brokenInternalLinks.length === 0) results.summary.passed++;
  else {
    results.summary.failed++;
    results.summary.failures.push({ internalLinkAudit: brokenInternalLinks });
  }

  // Verify Unknown 404 routes
  for (const unknown of ['/non-existent-page', '/products/unknown-platform']) {
    const res = await fetchUrl(unknown);
    const robots = extractTag(res.body, /<meta\s+name="robots"\s+content="([^"]*)"/i);
    const h1Raw = extractTag(res.body, /<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const h1Text = h1Raw ? stripHtmlTags(h1Raw) : null;
    const passed = res.statusCode === 404 && robots === 'noindex, nofollow' && h1Text === 'Page Not Found';
    if (passed) results.summary.passed++;
    else {
      results.summary.failed++;
      results.summary.failures.push({ route: unknown, statusCode: res.statusCode, robots, h1Text });
    }
    results.unknownRoutes.push({ route: unknown, statusCode: res.statusCode, robots, h1Text, passed });
  }

  // Verify Unpublished Arabic routes remain excluded from indexing (404 + noindex, nofollow)
  for (const arRoute of UNPUBLISHED_ARABIC_ROUTES) {
    const res = await fetchUrl(arRoute);
    const robots = extractTag(res.body, /<meta\s+name="robots"\s+content="([^"]*)"/i);
    const passed = res.statusCode === 404 && robots === 'noindex, nofollow';
    if (passed) results.summary.passed++;
    else {
      results.summary.failed++;
      results.summary.failures.push({ arRoute, statusCode: res.statusCode, robots });
    }
    results.unpublishedArabicRoutes.push({ route: arRoute, statusCode: res.statusCode, robots, passed });
  }

  // Verify Trailing Slash Redirect (/about/ -> 308 /about)
  const redirRes = await fetchUrl('/about/');
  const redirPassed = redirRes.statusCode === 308 && redirRes.headers.location === '/about';
  if (redirPassed) results.summary.passed++;
  else {
    results.summary.failed++;
    results.summary.failures.push({ redirect: '/about/', statusCode: redirRes.statusCode, location: redirRes.headers.location });
  }
  results.redirects.push({ from: '/about/', statusCode: redirRes.statusCode, location: redirRes.headers.location, passed: redirPassed });

  // Verify robots.txt
  const robotsRes = await fetchUrl('/robots.txt');
  const robotsPassed =
    robotsRes.statusCode === 200 &&
    robotsRes.body.includes('User-agent: *') &&
    robotsRes.body.includes('Sitemap: https://sakytek.com/sitemap.xml');
  results.robotsTxt = { statusCode: robotsRes.statusCode, passed: robotsPassed, body: robotsRes.body.trim() };
  if (robotsPassed) results.summary.passed++;
  else results.summary.failed++;

  // Verify sitemap.xml
  const sitemapRes = await fetchUrl('/sitemap.xml');
  const locMatches = [...sitemapRes.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const expectedLocs = PRIORITY_ROUTES.map((r) => (r === '/' ? 'https://sakytek.com/' : `https://sakytek.com${r}`));
  const sitemapPassed =
    sitemapRes.statusCode === 200 &&
    locMatches.length === expectedLocs.length &&
    expectedLocs.every((loc) => locMatches.includes(loc)) &&
    !locMatches.some((loc) => loc.includes('404') || loc.includes('/ar/'));
  results.sitemapXml = {
    statusCode: sitemapRes.statusCode,
    urlCount: locMatches.length,
    urls: locMatches,
    passed: sitemapPassed,
  };
  if (sitemapPassed) results.summary.passed++;
  else results.summary.failed++;

  // Verify /api/zatca-enquiry server-side validation, spam protection, consent & failure handling
  const apiTests = [
    {
      name: 'GET method rejected with 405 Method Not Allowed',
      req: { method: 'GET' },
      expectStatus: 405,
      expectCode: 'METHOD_NOT_ALLOWED',
    },
    {
      name: 'Honeypot spam field rejected with 400 SPAM_DETECTED',
      req: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          companyName: 'Spam Bot Corp',
          contactName: 'Bot',
          email: 'bot@company.com',
          phone: '+966501234567',
          erpSystem: 'Custom ERP / In-House Billing',
          invoiceVolume: 'Under 1,000 invoices/month',
          branchCount: '1 Branch (Single CSID)',
          integrationRequirement: 'Automated spam test message',
          consent: true,
          honeypotWebsite: 'https://malicious-spam.example.com',
        },
      },
      expectStatus: 400,
      expectCode: 'SPAM_DETECTED',
    },
    {
      name: 'Invalid phone, disposable email & missing consent rejected with 422 VALIDATION_ERROR',
      req: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          companyName: 'Al-Noor LLC',
          contactName: 'Tariq',
          email: 'tariq@mailinator.com',
          phone: '12345',
          erpSystem: 'Microsoft Dynamics 365 Finance & Operations',
          invoiceVolume: '1,000 - 10,000 invoices/month',
          branchCount: '2 - 5 Branches',
          integrationRequirement: 'Need ZATCA Phase 2 clearance API integration.',
          consent: false,
          honeypotWebsite: '',
        },
      },
      expectStatus: 422,
      expectCode: 'VALIDATION_ERROR',
    },
    {
      name: 'Simulated delivery gateway failure returns 502 DELIVERY_FAILED (never fake 200)',
      req: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Simulate-Delivery-Failure': '1',
        },
        body: {
          companyName: 'Al-Riyadh Industrial Group',
          contactName: 'Faisal Al-Harbi',
          email: 'faisal@alriyadh-ind.sa',
          phone: '+966 50 123 4567',
          erpSystem: 'Microsoft Dynamics 365 Finance & Operations',
          invoiceVolume: '10,000 - 50,000 invoices/month',
          branchCount: '6 - 20 Branches',
          integrationRequirement: 'Integrating 12 Saudi branches on D365 F&O with ZATCA Phase 2.',
          consent: true,
          honeypotWebsite: '',
        },
      },
      expectStatus: 502,
      expectCode: 'DELIVERY_FAILED',
    },
  ];

  for (const testCase of apiTests) {
    const apiRes = await fetchUrl('/api/zatca-enquiry', testCase.req);
    let parsed = {};
    try {
      parsed = JSON.parse(apiRes.body);
    } catch {
      parsed = {};
    }
    const passed =
      apiRes.statusCode === testCase.expectStatus &&
      parsed.ok === false &&
      parsed.code === testCase.expectCode;
    results.apiValidationTests.push({
      name: testCase.name,
      statusCode: apiRes.statusCode,
      code: parsed.code,
      fieldErrors: parsed.fieldErrors,
      passed,
    });
    if (passed) results.summary.passed++;
    else {
      results.summary.failed++;
      results.summary.failures.push({ apiTest: testCase.name, statusCode: apiRes.statusCode, parsed });
    }
  }

  const outPath = path.join(rootDir, 'docs', 'seo-verification-results.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf-8');

  console.log(`=== SEO & API Acceptance Verification Summary ===`);
  console.log(`Passed: ${results.summary.passed} | Failed: ${results.summary.failed}`);
  if (results.summary.failed > 0) {
    console.error('Failures:', JSON.stringify(results.summary.failures, null, 2));
    process.exit(1);
  }
}

runVerification().catch((err) => {
  console.error(err);
  process.exit(1);
});
