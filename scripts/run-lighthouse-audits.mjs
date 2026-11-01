import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'docs', 'lighthouse');

const BASE_URL = process.env.LIGHTHOUSE_BASE_URL || 'http://localhost:4173';

const TARGET_PAGES = [
  { name: 'homepage', route: '/' },
  { name: 'zatca-connect', route: '/products/zatca-connect' },
  {
    name: 'dynamics-365-fo-zatca',
    route: '/integrations/microsoft-dynamics-365-finance-zatca',
  },
  { name: 'custom-erp-zatca', route: '/integrations/custom-erp-zatca' },
  { name: 'zatca-phase-2-guide', route: '/resources/zatca-phase-2-guide' },
];

const PRESETS = ['mobile', 'desktop'];

function findChromeExecutable() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  ].filter(Boolean);

  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return undefined;
}

function runAudits() {
  fs.mkdirSync(outDir, { recursive: true });
  const chromePath = findChromeExecutable();
  console.log(`[lighthouse] Using browser executable: ${chromePath || 'default'}`);

  const summary = {
    generatedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    audits: [],
  };

  for (const page of TARGET_PAGES) {
    for (const preset of PRESETS) {
      const url = `${BASE_URL}${page.route}`;
      const jsonFile = path.join(outDir, `${page.name}-${preset}.json`);
      console.log(`[lighthouse] Auditing ${url} (${preset})...`);

      const args = [
        '--yes',
        'lighthouse',
        url,
        '--output=json',
        `--output-path=${jsonFile}`,
        '--only-categories=performance,accessibility,best-practices,seo',
        '--chrome-flags=--headless=new --no-sandbox --disable-gpu --disable-dev-shm-usage',
        '--quiet',
      ];
      if (preset === 'desktop') {
        args.push('--preset=desktop');
      }

      const env = { ...process.env };
      if (chromePath) {
        env.CHROME_PATH = chromePath;
      }

      const res = spawnSync(process.platform === 'win32' ? 'npx.cmd' : 'npx', args, {
        env,
        stdio: 'inherit',
        shell: process.platform === 'win32',
      });

      if (res.status !== 0 || !fs.existsSync(jsonFile)) {
        console.error(`[lighthouse] Failed on ${url} (${preset})`);
        continue;
      }

      const report = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));
      const categories = report.categories || {};
      const audits = report.audits || {};

      const entry = {
        page: page.name,
        route: page.route,
        formFactor: preset,
        scores: {
          performance: Math.round((categories.performance?.score || 0) * 100),
          accessibility: Math.round((categories.accessibility?.score || 0) * 100),
          bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
          seo: Math.round((categories.seo?.score || 0) * 100),
        },
        metrics: {
          FCP_ms: Math.round(audits['first-contentful-paint']?.numericValue || 0),
          FCP_display: audits['first-contentful-paint']?.displayValue || 'N/A',
          LCP_ms: Math.round(audits['largest-contentful-paint']?.numericValue || 0),
          LCP_display: audits['largest-contentful-paint']?.displayValue || 'N/A',
          TBT_ms: Math.round(audits['total-blocking-time']?.numericValue || 0),
          TBT_display: audits['total-blocking-time']?.displayValue || 'N/A',
          CLS: Number((audits['cumulative-layout-shift']?.numericValue || 0).toFixed(4)),
          CLS_display: audits['cumulative-layout-shift']?.displayValue || '0',
          SI_ms: Math.round(audits['speed-index']?.numericValue || 0),
          SI_display: audits['speed-index']?.displayValue || 'N/A',
        },
      };

      summary.audits.push(entry);
      console.log(
        `  [✓] ${page.route} (${preset}) -> Perf: ${entry.scores.performance} | A11y: ${entry.scores.accessibility} | SEO: ${entry.scores.seo} | LCP: ${entry.metrics.LCP_display} | TBT: ${entry.metrics.TBT_display} | CLS: ${entry.metrics.CLS_display}`
      );
    }
  }

  const summaryPath = path.join(outDir, 'lighthouse-summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf-8');
  console.log(`[lighthouse] Saved summary to ${summaryPath}`);
}

runAudits();

