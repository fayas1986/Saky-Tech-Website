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
    __sakyAnalyticsEvents?: Array<{
      event: ZatcaEventName;
      timestamp: string;
      params: Record<string, unknown>;
    }>;
  }
}

const UTM_STORAGE_KEY = 'saky_utm_attribution_v1';

export function captureUtmParameters(): UtmAttribution {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const existingRaw = window.sessionStorage.getItem(UTM_STORAGE_KEY);
    const existing: UtmAttribution = existingRaw ? JSON.parse(existingRaw) : {};

    const searchParams = new URLSearchParams(window.location.search);
    const updated: UtmAttribution = {
      ...existing,
      landing_page: existing.landing_page || window.location.pathname,
      referrer: existing.referrer || document.referrer || 'direct',
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
        updated[key] = val;
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

  const utm = getCapturedUtmParameters();
  const enrichedParams: Record<string, unknown> = {
    page_path: window.location.pathname,
    page_location: window.location.href,
    ...utm,
    ...params,
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

