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

function fetchUrl(urlPath) {
  return new Promise((resolve, reject) => {
    const fullUrl = `${BASE_URL}${urlPath}`;
    const client = fullUrl.startsWith('https://') ? https : http;
    const req = client.get(fullUrl, (res) => {
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
    });
    req.on('error', reject);
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

async function runVerification() {
  const results = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    routes: [],
    unknownRoutes: [],
    redirects: [],
    robotsTxt: null,
    sitemapXml: null,
    summary: { passed: 0, failed: 0, failures: [] },
  };

  const titles = new Set();
  const descriptions = new Set();
  const canonicals = new Set();

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

    const rootMatch = res.body.match(/<div id="root">([\s\S]*?)<\/div>\s*<script/i);
    const rawTextWords = stripHtmlTags(res.body).split(/\s+/).filter(Boolean).length;

    let jsonLdValid = false;
    let schemaTypes = [];
    if (jsonLdRaw) {
      try {
        const parsed = JSON.parse(jsonLdRaw);
        jsonLdValid = parsed['@context'] === 'https://schema.org' && Array.isArray(parsed['@graph']);
        if (jsonLdValid) {
          schemaTypes = parsed['@graph'].map((item) => item['@type']);
        }
      } catch {
        jsonLdValid = false;
      }
    }

    const expectedCanonical = route === '/' ? 'https://sakytek.com/' : `https://sakytek.com${route}`;
    const hasTailwindCdn = res.body.includes('cdn.tailwindcss.com');
    const hreflangEnSa = extractTag(res.body, /<link\s+rel="alternate"\s+hreflang="en-SA"\s+href="([^"]*)"/i);
    const hreflangDefault = extractTag(res.body, /<link\s+rel="alternate"\s+hreflang="x-default"\s+href="([^"]*)"/i);

    const checks = {
      status200: res.statusCode === 200,
      hasTitle: Boolean(title && title.length > 10),
      uniqueTitle: !titles.has(title),
      hasDescription: Boolean(description && description.length > 40),
      uniqueDescription: !descriptions.has(description),
      canonicalMatches: canonical === expectedCanonical,
      uniqueCanonical: !canonicals.has(canonical),
      hasHreflang: hreflangEnSa === expectedCanonical && hreflangDefault === expectedCanonical,
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
      results.summary.failures.push({ route, checks });
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
    !locMatches.some((loc) => loc.includes('404'));
  results.sitemapXml = {
    statusCode: sitemapRes.statusCode,
    urlCount: locMatches.length,
    urls: locMatches,
    passed: sitemapPassed,
  };
  if (sitemapPassed) results.summary.passed++;
  else results.summary.failed++;

  const outPath = path.join(rootDir, 'docs', 'seo-verification-results.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf-8');

  console.log(`=== SEO Verification Summary ===`);
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

