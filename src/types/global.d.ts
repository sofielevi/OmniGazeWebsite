/**
 * Global TypeScript declarations
 */

/**
 * Google Analytics gtag.js function
 * Loaded via @next/third-parties/google when user accepts cookies
 */
interface GtagFunction {
  (command: 'config', targetId: string, config?: Record<string, unknown>): void;
  (command: 'event', eventName: string, eventParams?: Record<string, unknown>): void;
  (command: 'set', config: Record<string, unknown>): void;
  (command: 'js', date: Date): void;
  (command: 'consent', action: 'default' | 'update', config: Record<string, unknown>): void;
}

declare global {
  interface Window {
    gtag?: GtagFunction;
    dataLayer?: unknown[];
  }
}

export {};
