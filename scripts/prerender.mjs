import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const ssrDir = path.resolve(rootDir, 'dist-ssr');

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildSeoHeadHtml(seo) {
  const title = escapeHtml(seo.title);
  const desc = escapeHtml(seo.description);
  const canonical = escapeHtml(seo.canonical);
  const robots = escapeHtml(seo.robots);
  const ogType = escapeHtml(seo.ogType);
  const ogImage = escapeHtml(seo.ogImage);
  const ogImageAlt = escapeHtml(seo.ogImageAlt);
  const jsonLdString = JSON.stringify(seo.jsonLd);
  const alternatesHtml = Array.isArray(seo.alternates)
    ? seo.alternates
        .map(
          (alt) =>
            `\n    <link rel="alternate" hreflang="${escapeHtml(alt.hreflang)}" href="${escapeHtml(alt.href)}" />`
        )
        .join('')
    : '';

  const ga4Id = (process.env.VITE_GA4_MEASUREMENT_ID || '').trim();
  const gtmId = (process.env.VITE_GTM_ID || '').trim();
  const gaScriptHtml =
    ga4Id && /^G-[A-Z0-9]+$/i.test(ga4Id)
      ? `\n    <script async src="https://www.googletagmanager.com/gtag/js?id=${escapeHtml(ga4Id)}"></script>\n    <script>window.__SAKY_GA4_ID="${escapeHtml(ga4Id)}";window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${escapeHtml(ga4Id)}',{anonymize_ip:true});</script>`
      : '';
  const gtmScriptHtml =
    gtmId && /^GTM-[A-Z0-9]+$/i.test(gtmId)
      ? `\n    <script>window.__SAKY_GTM_ID="${escapeHtml(gtmId)}";(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${escapeHtml(gtmId)}');</script>`
      : '';

  return `<!--seo-head-start-->
    <title>${title}</title>
    <meta name="description" content="${desc}" />
    <meta name="robots" content="${robots}" />
    <link rel="canonical" href="${canonical}" />${alternatesHtml}
    <meta property="og:type" content="${ogType}" />
    <meta property="og:site_name" content="Saky Technologies" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${ogImageAlt}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${desc}" />
    <meta name="twitter:image" content="${ogImage}" />
    <meta name="twitter:image:alt" content="${ogImageAlt}" />
    <script id="seo-json-ld" type="application/ld+json">${jsonLdString}</script>${gaScriptHtml}${gtmScriptHtml}
    <!--seo-head-end-->`;
}

async function runPrerender() {
  const templatePath = path.join(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Missing client build template at ${templatePath}`);
  }

  const template = fs.readFileSync(templatePath, 'utf-8');
  const ssrEntryPath = pathToFileURL(path.join(ssrDir, 'entry-server.js')).href;
  const { renderRoute, getRouteSEO, ALL_PUBLIC_ROUTES } = await import(ssrEntryPath);

  console.log(`[prerender] Generating static HTML for ${ALL_PUBLIC_ROUTES.length} public routes + 404.html...`);

  for (const route of ALL_PUBLIC_ROUTES) {
    const appHtml = renderRoute(route);
    const seo = getRouteSEO(route);
    const seoHeadHtml = buildSeoHeadHtml(seo);

    const fullHtml = template
      .replace(/<!--seo-head-start-->[\s\S]*?<!--seo-head-end-->/, seoHeadHtml)
      .replace('<!--app-html-->', appHtml);

    if (route === '/') {
      fs.writeFileSync(path.join(distDir, 'index.html'), fullHtml, 'utf-8');
      console.log(`  [✓] / -> dist/index.html`);
    } else {
      const cleanRoute = route.replace(/^\/+/, '');
      const routeDir = path.join(distDir, cleanRoute);
      fs.mkdirSync(routeDir, { recursive: true });
      fs.writeFileSync(path.join(routeDir, 'index.html'), fullHtml, 'utf-8');
      fs.writeFileSync(path.join(distDir, `${cleanRoute}.html`), fullHtml, 'utf-8');
      console.log(`  [✓] ${route} -> dist/${cleanRoute}/index.html`);
    }
  }

  // Generate 404.html
  const notFoundHtml = renderRoute('/404');
  const notFoundSeo = getRouteSEO('/404');
  const notFoundFullHtml = template
    .replace(/<!--seo-head-start-->[\s\S]*?<!--seo-head-end-->/, buildSeoHeadHtml(notFoundSeo))
    .replace('<!--app-html-->', notFoundHtml);

  fs.writeFileSync(path.join(distDir, '404.html'), notFoundFullHtml, 'utf-8');
  console.log(`  [✓] /404 -> dist/404.html`);

  // Verify sitemap.xml and robots.txt exist in dist/
  const publicDir = path.resolve(rootDir, 'public');
  for (const staticFile of ['sitemap.xml', 'robots.txt']) {
    const destPath = path.join(distDir, staticFile);
    const srcPath = path.join(publicDir, staticFile);
    if (!fs.existsSync(destPath) && fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
    }
    if (!fs.existsSync(destPath)) {
      throw new Error(`Missing required SEO static file: ${destPath}`);
    }
    console.log(`  [✓] Verified dist/${staticFile}`);
  }

  // Clean up temporary SSR build folder
  fs.rmSync(ssrDir, { recursive: true, force: true });
  console.log(`[prerender] Complete.`);
}

runPrerender().catch((err) => {
  console.error('[prerender] Failed:', err);
  process.exit(1);
});

