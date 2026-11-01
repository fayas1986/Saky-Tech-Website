import fs from 'node:fs';
import path from 'node:path';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { defineConfig, loadEnv, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-ignore - Serverless JS handler
import zatcaEnquiryHandler from './api/zatca-enquiry.js';

function attachApiMiddleware(middlewares: {
  use: (fn: (req: IncomingMessage, res: ServerResponse, next: () => void) => void) => void;
}) {
  middlewares.use((req, res, next) => {
    if (!req.url) return next();
    const urlObj = new URL(req.url, 'http://localhost');
    if (urlObj.pathname !== '/api/zatca-enquiry') {
      return next();
    }

    let rawBody = '';
    req.on('data', (chunk) => {
      rawBody += chunk.toString('utf8');
    });
    req.on('end', async () => {
      const vercelLikeReq = Object.assign(req, {
        body: rawBody ? rawBody : {},
      });
      const vercelLikeRes = Object.assign(res, {
        status(code: number) {
          res.statusCode = code;
          return this;
        },
        json(payload: unknown) {
          if (!res.headersSent) {
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
          }
          res.end(JSON.stringify(payload));
          return this;
        },
      });
      try {
        await zatcaEnquiryHandler(vercelLikeReq, vercelLikeRes);
      } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(
          JSON.stringify({
            ok: false,
            code: 'INTERNAL_ERROR',
            message: err instanceof Error ? err.message : 'Internal server error',
          })
        );
      }
    });
  });
}

function vercelCleanUrlsPreviewPlugin(): Plugin {
  return {
    name: 'vercel-clean-urls-preview',
    configureServer(server) {
      attachApiMiddleware(server.middlewares);
    },
    configurePreviewServer(server) {
      attachApiMiddleware(server.middlewares);
      const distDir = path.resolve(__dirname, 'dist');
      server.middlewares.use((req, res, next) => {
        if (!req.url || (req.method !== 'GET' && req.method !== 'HEAD')) {
          return next();
        }

        const urlObj = new URL(req.url, 'http://localhost');
        const pathname = decodeURIComponent(urlObj.pathname);
        if (pathname.startsWith('/api/')) {
          return next();
        }

        // Enforce trailingSlash: false (redirect /path/ -> /path)
        if (pathname.length > 1 && pathname.endsWith('/')) {
          const cleanLocation = pathname.replace(/\/+$/, '') + urlObj.search;
          res.statusCode = 308;
          res.setHeader('Location', cleanLocation);
          res.end();
          return;
        }

        const exactPath = path.join(distDir, pathname);
        const indexHtmlPath = path.join(distDir, pathname, 'index.html');
        const cleanHtmlPath = path.join(distDir, `${pathname}.html`);

        // 1. Exact static asset (e.g., /robots.txt, /sitemap.xml, /assets/*)
        if (fs.existsSync(exactPath) && fs.statSync(exactPath).isFile()) {
          return next();
        }

        // 2. Clean URL matching pre-rendered directory index (e.g., /about -> dist/about/index.html)
        if (fs.existsSync(indexHtmlPath) && fs.statSync(indexHtmlPath).isFile()) {
          req.url = pathname === '/' ? '/index.html' : `${pathname}/index.html`;
          return next();
        }

        // 3. Clean URL matching pre-rendered .html file
        if (fs.existsSync(cleanHtmlPath) && fs.statSync(cleanHtmlPath).isFile()) {
          req.url = `${pathname}.html`;
          return next();
        }

        // 4. Unknown route -> return HTTP 404 with pre-rendered 404.html
        const notFoundFile = path.join(distDir, '404.html');
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        if (fs.existsSync(notFoundFile)) {
          res.end(req.method === 'HEAD' ? undefined : fs.readFileSync(notFoundFile, 'utf-8'));
        } else {
          res.end('404 Not Found');
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    appType: 'spa',
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    preview: {
      port: 4173,
      host: '0.0.0.0',
    },
    plugins: [react(), vercelCleanUrlsPreviewPlugin()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
