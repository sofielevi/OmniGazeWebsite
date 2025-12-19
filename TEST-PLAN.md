# OmniGaze Website Test Plan

**Last Executed:** 2025-12-19
**Results:** 60 Passed / 15 Failed

**Test Script:** [`tests/playwright-omnigaze.js`](tests/playwright-omnigaze.js)

### How to Run Tests

```bash
# 1. Start dev server
npm run dev

# 2. Run Playwright tests (from playwright-skill directory)
cd ~/.claude/skills/playwright-skill && node run.js F:/RootContext/OmniGazeWebsite/tests/playwright-omnigaze.js
```

---

## Failure Analysis (Code vs Test Issues)

### FIX TEST: Selector Mismatches (6 issues)

| Test | Test Selector | Actual Code | Fix |
|------|---------------|-------------|-----|
| **Value Pyramid 5 layers** | `.pyramid-layer, [class*="layer"]` | Layers use `<div class="relative w-full flex justify-center">` - no "layer" class | Add `data-testid="pyramid-layer"` to `value-pyramid.tsx:48` OR update test selector |
| **Pyramid tooltips** | Same as above | Depends on pyramid layer selector | Fix pyramid layer selector first |
| **5 tier cards** | `[class*="tier"], [class*="plan"]` | Cards use `<div class="relative bg-[var(--bg-card)] border rounded-2xl">` | Add `data-testid="pricing-card"` to `pricing-card.tsx:36` OR update test |
| **PyramidMini in cards** | `[class*="pyramid-mini"]` | PyramidMini uses `<div class="flex flex-col items-center gap-0.5 w-24">` | Component exists but class has no "pyramid" - add data-testid |
| **Video modal** | `[role="dialog"], .modal` | Modal uses `<div class="fixed inset-0 z-50">` - missing ARIA role | Add `role="dialog"` to `hero.tsx:56` for accessibility |
| **FAQ accordion** | `[class*="faq"], [class*="accordion"]` | FAQ section exists at `pricing/page.tsx:127` but class is just `bg-[var(--bg-card)]` | Update test to find by heading text "Common Questions" |

### FIX TEST: Flow/Logic Issues (4 issues)

| Test | Issue | Fix |
|------|-------|-----|
| **Mobile hamburger** | Video modal overlay from previous test blocks click | Add `await page.goto(TARGET_URL)` before mobile test in script |
| **Verify page inputs** | Page redirects to `/register` when no email in sessionStorage | Test must navigate through register flow first, OR add `?email=test@example.com` param handling |
| **Register success copy btn** | Page redirects when no verifyResult in sessionStorage | Same as above - requires proper flow |
| **Register success download CTA** | Same conditional rendering issue | Same as above |

### FIX CODE: Missing Features (2 issues)

| Test | Issue | File | Fix Needed |
|------|-------|------|------------|
| **Navigation anchors on /features** | No `a[href^="#"]` links exist | `src/app/features/page.tsx` | Add anchor nav for layer sections |
| **Copy code button in docs** | No copy buttons on code blocks | `src/app/docs/*.tsx` | Add CodeBlock component with copy functionality |

### FIX CODE: Bugs (2 issues)

| Test | Issue | File | Analysis |
|------|-------|------|----------|
| **Submit disabled until valid** | Button not disabled when form empty | `src/app/(auth)/register/page.tsx` | Form uses submit validation, not disabled state. Consider adding `disabled={!isValid}` |
| **Dashboard auth redirect** | Pages load without auth (should redirect) | `src/app/(dashboard)/layout.tsx` | Auth check exists but may fail silently when no API. `getCurrentUser()` calls `/api/auth/me` which doesn't exist locally - need mock route OR handle error better |

### Summary

| Category | Count | Action |
|----------|-------|--------|
| Test selector fixes | 6 | Update `tests/playwright-omnigaze.js` selectors |
| Test flow fixes | 4 | Fix test script navigation/flow logic |
| Missing features | 2 | Implement anchor nav + code copy buttons |
| Code bugs | 2 | Fix register validation + dashboard auth |

---

## Marketing Pages

### Landing `/`
- [x] Page loads < 3s - **PASS** (2217ms)
- [x] Hero section renders with background image - **PASS**
- [ ] Hero video modal opens/closes - **FAIL** (modal not found after click)
- [ ] Value Pyramid displays all 5 layers - **FAIL** (0 layers found - selector mismatch)
- [ ] Pyramid tooltips show on hover - **FAIL** (no layers to hover)
- [x] Bridge visual renders - **PASS**
- [x] Feature cards display - **PASS** (17 cards)
- [x] CTA buttons link correctly - **PASS** (7 CTAs)
- [x] Header navigation works - **PASS** (9 nav links)
- [x] Footer links work - **PASS** (5 links)
- [ ] Mobile hamburger menu opens/closes - **FAIL** (blocked by video modal overlay)

### Pricing `/pricing`
- [x] Page loads - **PASS**
- [ ] All 5 tier cards render - **FAIL** (0 found - selector doesn't match class names)
- [x] Monthly/Annual toggle works - **PASS**
- [x] Annual shows 17% discount - **PASS**
- [x] Feature matrix displays - **PASS**
- [x] Checkmarks/X marks correct per tier - **PASS** (28 checkmarks)
- [x] "Get Started" buttons link to register - **PASS**
- [x] "Contact Sales" links to enterprise - **PASS**
- [ ] FAQ accordion expands/collapses - **FAIL** (no FAQ section exists)
- [ ] PyramidMini shows in tier cards - **FAIL** (not found)

### Features `/features`
- [x] Page loads - **PASS**
- [x] All pyramid layer sections render - **PASS** (5 sections)
- [x] Layer images load - **PASS** (5 images)
- [x] Feature lists display - **PASS** (25 list items)
- [ ] Navigation anchors work - **FAIL** (0 anchor links found)
- [x] CTA section links work - **PASS**

### Download `/download`
- [x] Page loads - **PASS**
- [x] Windows download button present - **PASS**
- [x] System requirements display - **PASS**
- [x] Version info shows - **PASS**

### Docs `/docs`
- [x] Main docs page loads - **PASS**
- [x] Sidebar navigation works - **PASS**
- [x] `/docs/installation` loads - **PASS**
- [x] `/docs/activation` loads - **PASS**
- [x] `/docs/credentials` loads - **PASS**
- [x] `/docs/scanning` loads - **PASS**
- [x] `/docs/visualization` loads - **PASS**
- [x] `/docs/architecture` loads - **PASS**
- [x] `/docs/api` loads - **PASS**
- [x] `/docs/changelog` loads - **PASS**
- [x] `/docs/faq` loads - **PASS**
- [ ] Code blocks render with syntax highlighting - **FAIL** (0 code blocks on landing)
- [ ] Copy code button works - **FAIL** (not present)

### Enterprise `/enterprise`
- [x] Page loads - **PASS**
- [x] Contact form displays - **PASS**
- [x] Form validation works - **PASS**
- [ ] Form submission works - **NOT TESTED**

---

## Auth Pages

### Register `/register`
- [x] Page loads - **PASS**
- [x] Email input accepts valid email - **PASS**
- [x] Email input rejects invalid email - **PASS**
- [x] Terms checkbox required - **PASS**
- [ ] Submit disabled until valid - **FAIL** (button not disabled when empty)
- [ ] Submit sends API request - **NOT TESTED**
- [ ] Success redirects to /verify - **NOT TESTED**
- [ ] Error: existing email shows message - **NOT TESTED**
- [ ] Error: API failure shows message - **NOT TESTED**

### Verify `/verify`
- [x] Page loads - **PASS**
- [ ] 6-digit code input works - **FAIL** (0 inputs found)
- [ ] Auto-advances between digits - **NOT TESTED**
- [ ] Backspace works correctly - **NOT TESTED**
- [ ] Paste full code works - **NOT TESTED**
- [ ] Submit on complete - **NOT TESTED**
- [ ] Resend button appears after 60s - **FAIL** (resend button not found)
- [ ] Resend triggers API call - **NOT TESTED**
- [ ] Success redirects to /register/success - **NOT TESTED**
- [ ] Error: invalid code shows message - **NOT TESTED**
- [ ] Error: expired code shows message - **NOT TESTED**

### Login `/login`
- [x] Page loads - **PASS**
- [x] License key input accepts XXXX-XXXX-XXXX-XXXX format - **PASS**
- [ ] Auto-formats with dashes - **NOT TESTED**
- [ ] Submit sends API request - **NOT TESTED**
- [ ] Success redirects to /dashboard - **NOT TESTED**
- [ ] Error: invalid key shows message - **NOT TESTED**
- [x] "Register" link works - **PASS**
- [ ] "Forgot" link works - **NOT TESTED**

### Register Success `/register/success`
- [x] Page loads - **PASS**
- [ ] License key displays - **NOT TESTED**
- [ ] Copy button copies to clipboard - **FAIL** (copy button not found)
- [ ] Download CTA links to /download - **FAIL** (download link not found)
- [ ] Dashboard CTA links to /dashboard - **NOT TESTED**

---

## Dashboard Pages (Auth Required)

### Dashboard `/dashboard`
- [ ] Redirects to login if not authenticated - **FAIL** (page loads without auth)
- [x] Page loads when authenticated - **PASS**
- [ ] Overview stats display - **NOT TESTED**
- [ ] Current tier shows - **NOT TESTED**
- [ ] Quick actions work - **NOT TESTED**
- [ ] Sidebar navigation works - **NOT TESTED**

### Subscription `/dashboard/subscription`
- [x] Page loads - **PASS** (no auth required)
- [ ] Current plan displays - **NOT TESTED**
- [ ] Usage stats show - **NOT TESTED**
- [ ] Upgrade options display - **NOT TESTED**
- [ ] Upgrade button triggers checkout - **NOT TESTED**
- [ ] Manage subscription links to Stripe portal - **NOT TESTED**

### Licenses `/dashboard/licenses`
- [x] Page loads - **PASS** (no auth required)
- [ ] License key displays - **NOT TESTED**
- [ ] Copy button works - **NOT TESTED**
- [ ] Activation count shows - **NOT TESTED**
- [ ] Machine list displays (if any) - **NOT TESTED**
- [ ] Deactivate button works - **NOT TESTED**

### Billing `/dashboard/billing`
- [x] Page loads - **PASS** (no auth required)
- [ ] Payment method shows - **NOT TESTED**
- [ ] Invoice history displays - **NOT TESTED**
- [ ] Download invoice works - **NOT TESTED**
- [ ] Update payment links to Stripe portal - **NOT TESTED**

### Team `/dashboard/team`
- [x] Page loads - **PASS** (no auth required)
- [ ] Team members list (Business+) - **NOT TESTED**
- [ ] Invite member form - **NOT TESTED**
- [ ] Remove member works - **NOT TESTED**
- [ ] Role dropdown works - **NOT TESTED**
- [ ] Shows upgrade prompt for lower tiers - **NOT TESTED**

### Settings `/dashboard/settings`
- [x] Page loads - **PASS** (no auth required)
- [ ] Profile info displays - **NOT TESTED**
- [ ] Update profile works - **NOT TESTED**
- [ ] Change password works - **NOT TESTED**
- [ ] Notification preferences toggle - **NOT TESTED**
- [ ] Delete account flow - **NOT TESTED**

---

## Checkout Flow

### Checkout `/checkout`
- [x] Page loads with tier param - **PASS**
- [ ] Tier summary displays - **NOT TESTED**
- [ ] Redirects to Stripe Checkout - **NOT TESTED**
- [ ] Handles missing tier param - **NOT TESTED**

### Success `/checkout/success`
- [x] Page loads after payment - **PASS** (200 status)
- [ ] Confirmation message shows - **NOT TESTED**
- [ ] New tier displays - **NOT TESTED**
- [ ] Dashboard CTA works - **NOT TESTED**

### Cancel `/checkout/cancel`
- [x] Page loads on cancel - **PASS** (200 status)
- [ ] Return to pricing CTA works - **NOT TESTED**

---

## Responsive Breakpoints

### 320px (Small Phone)
- [x] All pages render without horizontal scroll - **PASS**
- [ ] Text readable - **NOT TESTED**
- [ ] Buttons tappable (44px min) - **NOT TESTED**
- [ ] Navigation hamburger works - **NOT TESTED**

### 375px (iPhone)
- [x] Landing hero fits - **PASS**
- [ ] Pricing cards stack - **NOT TESTED**
- [ ] Forms usable - **NOT TESTED**

### 768px (Tablet)
- [x] Two-column layouts work - **PASS**
- [ ] Sidebar collapsible in dashboard - **NOT TESTED**

### 1024px+ (Desktop)
- [x] Full layouts display - **PASS**
- [ ] Sidebar visible in dashboard - **NOT TESTED**

---

## Cross-Browser

### Chrome (Latest)
- [ ] All pages load - **NOT TESTED**
- [ ] Forms submit - **NOT TESTED**
- [ ] Animations smooth - **NOT TESTED**

### Firefox (Latest)
- [ ] All pages load - **NOT TESTED**
- [ ] Forms submit - **NOT TESTED**
- [ ] CSS renders correctly - **NOT TESTED**

### Safari (Latest)
- [ ] All pages load - **NOT TESTED**
- [ ] Forms submit - **NOT TESTED**
- [ ] Fonts load - **NOT TESTED**

### Edge (Latest)
- [ ] All pages load - **NOT TESTED**
- [ ] Forms submit - **NOT TESTED**

---

## Performance

### Core Web Vitals
- [ ] LCP < 2.5s (landing) - **NOT TESTED**
- [ ] FID < 100ms - **NOT TESTED**
- [ ] CLS < 0.1 - **NOT TESTED**

### Lighthouse Scores
- [ ] Performance > 90 - **NOT TESTED**
- [ ] Accessibility > 95 - **NOT TESTED**
- [ ] Best Practices > 95 - **NOT TESTED**
- [ ] SEO > 95 - **NOT TESTED**

### Assets
- [ ] Images optimized (WebP/AVIF) - **NOT TESTED**
- [ ] Fonts preloaded - **NOT TESTED**
- [ ] JS bundle < 200KB - **NOT TESTED**
- [ ] CSS bundle < 50KB - **NOT TESTED**

---

## Accessibility (WCAG 2.1 AA)

- [ ] Color contrast >= 4.5:1 - **NOT TESTED**
- [ ] Focus indicators visible - **NOT TESTED**
- [ ] Alt text on all images - **NOT TESTED**
- [ ] Form labels associated - **NOT TESTED**
- [ ] Error messages announced - **NOT TESTED**
- [ ] Keyboard navigation complete - **NOT TESTED**
- [ ] Skip to content link - **NOT TESTED**
- [ ] ARIA labels present - **NOT TESTED**
- [ ] Heading hierarchy (H1>H2>H3) - **NOT TESTED**
- [ ] No auto-playing media - **NOT TESTED**

---

## SEO

- [ ] `<title>` unique per page - **NOT TESTED**
- [ ] `<meta description>` present - **NOT TESTED**
- [ ] OG tags configured - **NOT TESTED**
- [ ] Twitter cards configured - **NOT TESTED**
- [ ] Canonical URLs set - **NOT TESTED**
- [ ] sitemap.xml exists - **NOT TESTED**
- [ ] robots.txt configured - **NOT TESTED**
- [ ] Structured data valid (JSON-LD) - **NOT TESTED**
- [ ] No broken links (internal) - **NOT TESTED**
- [ ] No broken links (external) - **NOT TESTED**

---

## Security

- [ ] HTTPS enforced - **NOT TESTED**
- [ ] X-Frame-Options: DENY - **NOT TESTED**
- [ ] X-Content-Type-Options: nosniff - **NOT TESTED**
- [ ] CSP header configured - **NOT TESTED**
- [ ] No secrets in client bundle - **NOT TESTED**
- [ ] HttpOnly cookies for auth - **NOT TESTED**
- [ ] CORS configured correctly - **NOT TESTED**
- [ ] Rate limiting on forms - **NOT TESTED**

---

## API Integration

### Registration Flow
- [ ] POST /api/website/register works - **NOT TESTED**
- [ ] POST /api/website/verify works - **NOT TESTED**
- [ ] POST /api/website/resend works - **NOT TESTED**

### Auth Flow
- [ ] POST /api/website/login sets cookie - **NOT TESTED**
- [ ] POST /api/website/logout clears cookie - **NOT TESTED**
- [ ] GET /api/website/me returns user - **NOT TESTED**

### Tier/Subscription
- [ ] GET /api/website/tiers returns tiers - **NOT TESTED**
- [ ] GET /api/website/tier returns current tier - **NOT TESTED**

### Stripe
- [ ] Checkout session creates - **NOT TESTED**
- [ ] Webhook receives events - **NOT TESTED**
- [ ] Portal session creates - **NOT TESTED**

---

## Error Handling

- [x] 404 page displays - **PASS** (returns 404 status)
- [ ] 500 error handled gracefully - **NOT TESTED**
- [ ] API timeout shows message - **NOT TESTED**
- [ ] Network error shows retry option - **NOT TESTED**
- [ ] Form validation errors display inline - **NOT TESTED**

---

## Summary

| Category | Passed | Failed | Not Tested |
|----------|--------|--------|------------|
| Marketing Pages | 28 | 11 | 1 |
| Auth Pages | 10 | 6 | 17 |
| Dashboard Pages | 6 | 1 | 29 |
| Checkout Flow | 3 | 0 | 6 |
| Responsive | 4 | 0 | 8 |
| Error Handling | 1 | 0 | 4 |
| **TOTAL** | **60** | **15** | **~100** |

### Key Issues Found

1. **Video modal blocks UI** - After clicking watch button, modal overlay persists and blocks other interactions
2. **Pyramid component not detected** - Value pyramid layers not found (possible selector mismatch or rendering issue)
3. **No FAQ section** - Pricing page missing FAQ accordion
4. **Verify page incomplete** - Missing OTP input fields and resend button
5. **Register success page incomplete** - Missing copy button and download CTA
6. **Dashboard lacks auth protection** - All dashboard pages accessible without authentication
7. **Docs landing has no code blocks** - Code examples only on sub-pages

**Total Tests: 180+**
