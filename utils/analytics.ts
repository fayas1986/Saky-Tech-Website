export type ZatcaEventName =
  | 'zatca_demo_click'
  | 'zatca_form_start'
  | 'zatca_form_submit'
  | 'zatca_phone_click'
  | 'zatca_whatsapp_click';

export interface UtmAttribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  landing_page?: string;
  referrer?: string;
  captured_at?: string;
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown> | unknown[]>;
    gtag?: (...args: unknown[]) => void;
    __SAKY_GA4_ID?: string;
    __SAKY_GTM_ID?: string;
    __sakyAnalyticsInitialized?: boolean;
    __sakyAnalyticsEvents?: Array<{
      event: ZatcaEventName;
      timestamp: string;
      params: Record<string, unknown>;
    }>;
  }
}

const UTM_STORAGE_KEY = 'saky_utm_attribution_v1';
const DEDUPE_WINDOW_MS = 800;
const lastEventFiredMap = new Map<string, number>();

const FORBIDDEN_PII_KEYS = new Set([
  'email',
  'businessemail',
  'phone',
  'mobile',
  'contactname',
  'contact_name',
  'companyname',
  'company_name',
  'requirement',
  'integrationrequirement',
  'message',
  'name',
]);

function sanitizeValue(val: string, maxLen = 100): string {
  // Strip any accidental email or phone pattern from UTM or string values
  const redacted = val
    .replace(/[^\s@]+@[^\s@]+\.[^\s@]+/g, '[redacted-email]')
    .replace(/\+?\d[\d\s\-()]{7,16}\d/g, '[redacted-phone]');
  return redacted.slice(0, maxLen).trim();
}

export function sanitizeAnalyticsParams(
  rawParams: Record<string, unknown>
): Record<string, unknown> {
  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(rawParams)) {
    const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (FORBIDDEN_PII_KEYS.has(normalizedKey)) {
      continue;
    }
    if (typeof value === 'string') {
      clean[key] = sanitizeValue(value, 150);
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      clean[key] = value;
    }
  }
  return clean;
}

export function initProductionAnalytics(): void {
  if (typeof window === 'undefined' || window.__sakyAnalyticsInitialized) {
    return;
  }
  window.__sakyAnalyticsInitialized = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments as unknown as Record<string, unknown>);
    };

  const env = (import.meta as unknown as { env?: Record<string, string> }).env || {};
  const ga4Id = (window.__SAKY_GA4_ID || env.VITE_GA4_MEASUREMENT_ID || '').trim();
  const gtmId = (window.__SAKY_GTM_ID || env.VITE_GTM_ID || '').trim();

  if (ga4Id && /^G-[A-Z0-9]+$/i.test(ga4Id)) {
    const existingScript = document.querySelector(
      `script[src*="googletagmanager.com/gtag/js?id=${ga4Id}"]`
    );
    if (!existingScript) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4Id)}`;
      document.head.appendChild(script);
    }
    const isDebug =
      window.location.search.includes('ga_debug=1') ||
      window.location.search.includes('gtm_debug=1');
    window.gtag('js', new Date());
    window.gtag('config', ga4Id, {
      send_page_view: true,
      anonymize_ip: true,
      ...(isDebug ? { debug_mode: true } : {}),
    });
  }

  if (gtmId && /^GTM-[A-Z0-9]+$/i.test(gtmId)) {
    const existingGtm = document.querySelector(
      `script[src*="googletagmanager.com/gtm.js?id=${gtmId}"]`
    );
    if (!existingGtm) {
      window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
      document.head.appendChild(script);
    }
  }
}

export function captureUtmParameters(): UtmAttribution {
  if (typeof window === 'undefined') {
    return {};
  }

  initProductionAnalytics();

  try {
    const existingRaw = window.sessionStorage.getItem(UTM_STORAGE_KEY);
    const existing: UtmAttribution = existingRaw ? JSON.parse(existingRaw) : {};

    const searchParams = new URLSearchParams(window.location.search);
    const referrerHost = (() => {
      if (!document.referrer) return 'direct';
      try {
        return new URL(document.referrer).hostname || 'direct';
      } catch {
        return 'direct';
      }
    })();

    const updated: UtmAttribution = {
      ...existing,
      landing_page: existing.landing_page || window.location.pathname,
      referrer: existing.referrer || referrerHost,
      captured_at: existing.captured_at || new Date().toISOString(),
    };

    const keys: Array<keyof UtmAttribution> = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
      'gclid',
    ];

    for (const key of keys) {
      const val = searchParams.get(key);
      if (val) {
        updated[key] = sanitizeValue(val, 80);
      }
    }

    window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return {};
  }
}

export function getCapturedUtmParameters(): UtmAttribution {
  if (typeof window === 'undefined') {
    return {};
  }
  try {
    const raw = window.sessionStorage.getItem(UTM_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as UtmAttribution;
    }
  } catch {
    // ignore storage errors
  }
  return captureUtmParameters();
}

export function trackZatcaEvent(
  eventName: ZatcaEventName,
  params: Record<string, unknown> = {}
): void {
  if (typeof window === 'undefined') {
    return;
  }

  const sanitizedCustomParams = sanitizeAnalyticsParams(params);
  const locationKey = String(
    sanitizedCustomParams.cta_location ||
      sanitizedCustomParams.form_location ||
      sanitizedCustomParams.click_location ||
      window.location.pathname
  );
  const dedupeKey = `${eventName}:${locationKey}`;
  const now = Date.now();
  const prevTime = lastEventFiredMap.get(dedupeKey) || 0;

  if (now - prevTime < DEDUPE_WINDOW_MS) {
    return;
  }
  lastEventFiredMap.set(dedupeKey, now);

  const utm = getCapturedUtmParameters();
  const cleanPageLocation = `${window.location.origin}${window.location.pathname}`;
  const isDebug =
    window.location.search.includes('ga_debug=1') ||
    window.location.search.includes('gtm_debug=1');

  const enrichedParams: Record<string, unknown> = {
    page_path: window.location.pathname,
    page_location: cleanPageLocation,
    ...utm,
    ...sanitizedCustomParams,
    ...(isDebug ? { debug_mode: true } : {}),
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...enrichedParams,
  });

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, enrichedParams);
  }

  window.__sakyAnalyticsEvents = window.__sakyAnalyticsEvents || [];
  window.__sakyAnalyticsEvents.push({
    event: eventName,
    timestamp: new Date().toISOString(),
    params: enrichedParams,
  });

  window.dispatchEvent(
    new CustomEvent('saky:analytics', {
      detail: { event: eventName, params: enrichedParams },
    })
  );
}
