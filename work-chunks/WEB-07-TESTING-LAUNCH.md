# WEB-07: Testing & Launch

**Priority:** P0 (Critical Path)
**Estimated Hours:** 12h
**Status:** Not Started
**Owner:** ___________
**Due Date:** ___________
**Depends On:** All other work chunks (WEB-01 through WEB-06)

---

## Objective

Comprehensive testing, performance optimization, and production deployment of the OmniGaze website.

---

## Prerequisites

- [ ] WEB-01 through WEB-06 complete
- [ ] Production environment ready
- [ ] DNS access for omnigaze.com
- [ ] SSL certificate configured

---

## Tasks

### 1. End-to-End Testing

- [ ] **Test Framework Setup**
  ```bash
  npm install -D playwright @playwright/test
  npx playwright install
  ```

- [ ] **E2E Test Scenarios**

  **Marketing Pages:**
  - [ ] Landing page loads correctly
  - [ ] Pricing page renders all tiers
  - [ ] Features page loads
  - [ ] Navigation works
  - [ ] Footer links work
  - [ ] Mobile responsive

  **Registration Flow:**
  - [ ] Register with new email
  - [ ] Receive verification code
  - [ ] Enter valid code
  - [ ] Account created successfully
  - [ ] Error: invalid email
  - [ ] Error: existing email
  - [ ] Error: invalid code
  - [ ] Error: expired code

  **Login Flow:**
  - [ ] Login with valid credentials
  - [ ] Login with invalid credentials
  - [ ] Forgot password flow
  - [ ] Reset password flow
  - [ ] Session persistence

  **Purchase Flow:**
  - [ ] Select tier from pricing page
  - [ ] Redirect to Stripe Checkout
  - [ ] Complete payment (test mode)
  - [ ] Return to success page
  - [ ] Tier updated in dashboard
  - [ ] Cancel payment flow

  **Dashboard:**
  - [ ] Dashboard loads
  - [ ] Subscription page shows correct tier
  - [ ] Licenses page shows license key
  - [ ] Billing page shows invoices
  - [ ] Team page (Business+ only)
  - [ ] Settings page updates work

### 2. Cross-Browser Testing

- [ ] **Browsers to Test**
  | Browser | Version | Platform |
  |---------|---------|----------|
  | Chrome | Latest | Windows, Mac |
  | Firefox | Latest | Windows, Mac |
  | Safari | Latest | Mac |
  | Edge | Latest | Windows |
  | Chrome Mobile | Latest | Android |
  | Safari Mobile | Latest | iOS |

- [ ] **Testing Checklist per Browser**
  - [ ] Pages render correctly
  - [ ] Forms submit
  - [ ] Animations smooth
  - [ ] Fonts load
  - [ ] Images display

### 3. Mobile Responsiveness

- [ ] **Breakpoints to Test**
  - [ ] 320px (small phone)
  - [ ] 375px (iPhone)
  - [ ] 414px (iPhone Plus)
  - [ ] 768px (tablet portrait)
  - [ ] 1024px (tablet landscape)
  - [ ] 1280px+ (desktop)

- [ ] **Mobile-Specific Tests**
  - [ ] Navigation hamburger menu
  - [ ] Touch targets sufficient size (44px)
  - [ ] No horizontal scroll
  - [ ] Forms usable on mobile
  - [ ] Modals/sheets work

### 4. Accessibility Audit

- [ ] **Automated Testing**
  ```bash
  # Run axe-core audit
  npm install -D @axe-core/playwright
  ```

- [ ] **WCAG 2.1 AA Checklist**
  - [ ] Color contrast ratio >= 4.5:1
  - [ ] Focus indicators visible
  - [ ] Alt text on images
  - [ ] Form labels associated
  - [ ] Error messages announced
  - [ ] Keyboard navigation works
  - [ ] Skip to content link
  - [ ] ARIA labels where needed
  - [ ] Heading hierarchy correct

- [ ] **Screen Reader Testing**
  - [ ] NVDA (Windows)
  - [ ] VoiceOver (Mac/iOS)
  - [ ] Content reads logically

### 5. Performance Optimization

- [ ] **Lighthouse Audit**
  Target scores:
  | Metric | Target |
  |--------|--------|
  | Performance | > 90 |
  | Accessibility | > 95 |
  | Best Practices | > 95 |
  | SEO | > 95 |

- [ ] **Core Web Vitals**
  | Metric | Target |
  |--------|--------|
  | LCP | < 2.5s |
  | FID | < 100ms |
  | CLS | < 0.1 |

- [ ] **Optimization Tasks**
  - [ ] Image optimization (next/image)
  - [ ] Font optimization (next/font)
  - [ ] Code splitting verified
  - [ ] Unused CSS removed
  - [ ] Bundle size analyzed
  - [ ] Static pages pre-rendered

- [ ] **Caching Configuration**
  - [ ] Static assets cached (31536000s)
  - [ ] API responses cached appropriately
  - [ ] Edge caching configured

### 6. Security Audit

- [ ] **Security Headers**
  ```typescript
  // next.config.js
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=()' },
      ],
    },
  ]
  ```

- [ ] **Security Checklist**
  - [ ] HTTPS enforced
  - [ ] CSRF protection (built into Next.js)
  - [ ] Input sanitization
  - [ ] SQL injection prevented (API side)
  - [ ] XSS prevented
  - [ ] Rate limiting on forms
  - [ ] Secrets not exposed in client

### 7. SEO Verification

- [ ] **Technical SEO**
  - [ ] sitemap.xml generated
  - [ ] robots.txt configured
  - [ ] Canonical URLs set
  - [ ] Meta descriptions present
  - [ ] OG tags configured
  - [ ] Twitter cards configured
  - [ ] Structured data valid

- [ ] **Content SEO**
  - [ ] Heading hierarchy (H1 -> H2 -> H3)
  - [ ] Alt text on images
  - [ ] Internal linking
  - [ ] Page titles unique

### 8. Analytics Setup

- [ ] **Google Analytics 4**
  - [ ] GA4 property created
  - [ ] Tracking code installed
  - [ ] Page views tracked
  - [ ] Events configured:
    - [ ] Download clicks
    - [ ] Registration starts
    - [ ] Registration completes
    - [ ] Checkout starts
    - [ ] Checkout completes

- [ ] **Vercel Analytics** (if using Vercel)
  - [ ] Web Analytics enabled
  - [ ] Speed Insights enabled

### 9. Error Tracking

- [ ] **Sentry Setup**
  ```bash
  npm install @sentry/nextjs
  npx @sentry/wizard@latest -i nextjs
  ```

- [ ] **Configure Sentry**
  - [ ] DSN configured
  - [ ] Source maps uploaded
  - [ ] Alerts configured
  - [ ] Performance monitoring enabled

### 10. Stakeholder Review

- [ ] **Stakeholder Review**
  - [ ] Product owner signoff
  - [ ] Design review passed
  - [ ] Content review passed

### 11. Production Deployment

- [ ] **Pre-Deployment**
  - [ ] Environment variables set in production
  - [ ] Stripe live keys configured
  - [ ] OmniGaze API URL confirmed
  - [ ] DNS records prepared

- [ ] **Deployment Steps**
  1. [ ] Merge to main branch
  2. [ ] Vercel auto-deploys (or manual trigger)
  3. [ ] Verify deployment successful
  4. [ ] Run smoke tests on production

- [ ] **DNS Cutover**
  - [ ] A/AAAA records updated
  - [ ] CNAME for www
  - [ ] SSL certificate verified
  - [ ] Old DNS TTL lowered beforehand

- [ ] **Post-Deployment**
  - [ ] Smoke test all critical flows
  - [ ] Verify Stripe webhooks receiving
  - [ ] Verify email delivery
  - [ ] Monitor error tracking
  - [ ] Monitor analytics

### 12. Rollback Plan

- [ ] **If Issues Detected**
  1. Revert to previous deployment (Vercel instant rollback)
  2. DNS rollback procedure documented
  3. Communication plan for users
  4. Hotfix procedure documented

---

## Launch Checklist

### T-7 Days
- [ ] All work chunks complete
- [ ] Content finalized
- [ ] Stakeholder reviews complete

### T-3 Days
- [ ] DNS TTL lowered
- [ ] Production environment verified
- [ ] Stripe live mode tested (small transaction)
- [ ] Team briefed on launch

### T-1 Day
- [ ] Deployment rehearsal
- [ ] Rollback plan confirmed
- [ ] On-call schedule confirmed

### Launch Day (T-0)
- [ ] Deploy to production
- [ ] DNS cutover
- [ ] Smoke tests
- [ ] Monitor for 24 hours

### T+1 Day
- [ ] Review analytics
- [ ] Review error logs
- [ ] Address any issues
- [ ] Collect feedback

---

## Files to Create

| File | Purpose |
|------|---------|
| `playwright.config.ts` | Playwright configuration |
| `e2e/marketing.spec.ts` | Marketing pages tests |
| `e2e/auth.spec.ts` | Auth flow tests |
| `e2e/checkout.spec.ts` | Checkout flow tests |
| `e2e/dashboard.spec.ts` | Dashboard tests |
| `sentry.client.config.ts` | Sentry client config |
| `sentry.server.config.ts` | Sentry server config |

---

## Testing Commands

```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests in headed mode
npm run test:e2e -- --headed

# Run specific test file
npm run test:e2e -- e2e/auth.spec.ts

# Run Lighthouse audit
npm run lighthouse

# Run accessibility audit
npm run a11y
```

---

## Verification Checklist

- [ ] All E2E tests passing
- [ ] Cross-browser testing complete
- [ ] Mobile responsive verified
- [ ] Accessibility audit passed
- [ ] Lighthouse scores met
- [ ] Security headers configured
- [ ] Analytics tracking
- [ ] Error tracking working
- [ ] Production deployed
- [ ] DNS cutover complete
- [ ] Smoke tests passed

---

## Completion Criteria

- [ ] All tasks above completed
- [ ] Production site live at omnigaze.com
- [ ] All critical flows working
- [ ] Monitoring in place
- [ ] Launch successful
