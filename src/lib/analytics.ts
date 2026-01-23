/**
 * Google Analytics event tracking utilities
 *
 * These functions only fire if GA is loaded (respects cookie consent).
 * GA is loaded via @next/third-parties/google and only initializes
 * after user accepts cookies.
 */

/**
 * Track a custom event in Google Analytics
 *
 * @param eventName - The name of the event (e.g., 'sign_up', 'purchase')
 * @param params - Optional parameters to include with the event
 *
 * @example
 * // Track a sign up
 * trackEvent('sign_up', { method: 'email', tier: 'Community' });
 *
 * @example
 * // Track a button click
 * trackEvent('cta_click', { button_text: 'Download Now', location: 'hero' });
 */
export function trackEvent(eventName: string, params?: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}

/**
 * Track a page view in Google Analytics
 *
 * Note: Page views are automatically tracked by @next/third-parties/google,
 * but this can be used for custom virtual page views if needed.
 *
 * @param url - The URL to track
 * @param title - Optional page title
 */
export function trackPageView(url: string, title?: string): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_location: url,
      page_title: title,
    });
  }
}
