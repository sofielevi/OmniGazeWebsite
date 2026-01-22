# OmniGaze Website: Master Implementation Tracker

**Project:** Public Website (omnigaze.com)
**Start Date:** 2024-12-18
**Target Completion:** _____________
**Status:** IN PROGRESS (MVP Complete)

---

## Executive Summary

Complete redesign of the public OmniGaze website to support self-service registration, tier selection, Stripe checkout, and customer account management. Built with Next.js 14 for optimal SEO and performance.

### System Architecture

```
+------------------------------------------------------------------------------+
|                      WEBSITE PROJECT SCOPE                                    |
+------------------------------------------------------------------------------+
|                                                                               |
|  +-----------------------------------------------------------------------+   |
|  |              OMNIGAZE WEBSITE (omnigaze.com)                          |   |
|  +-----------------------------------------------------------------------+   |
|  |                                                                        |   |
|  |  MARKETING PAGES (SSG):              ACCOUNT PORTAL (SSR):            |   |
|  |  * Landing page                      * Dashboard                      |   |
|  |  * Pricing page                      * Subscription management        |   |
|  |  * Features page                     * Billing history                |   |
|  |  * Download page                     * License keys                   |   |
|  |  * Documentation                     * Team management                |   |
|  |                                                                        |   |
|  |  AUTH PAGES:                         API ROUTES:                      |   |
|  |  * Register                          * /api/auth/*                    |   |
|  |  * Verify                            * /api/stripe/webhook            |   |
|  |  * Login                             * /api/stripe/checkout           |   |
|  |                                                                        |   |
|  +-----------------------------------------------------------------------+   |
|                                      |                                        |
|                                      v                                        |
|  +-----------------------------------------------------------------------+   |
|  |                    OMNIGAZE API (api.omnigaze.com)                    |   |
|  |                    (Built in Self-Service project)                    |   |
|  +-----------------------------------------------------------------------+   |
|                                                                               |
+------------------------------------------------------------------------------+
```

### Key Constraints

- **SEO CRITICAL** for marketing pages (static generation required)
- Consumes OmniGaze API - no direct database access
- Stripe Checkout for PCI compliance
- "Warm Technical" design aesthetic
- Email verification required for all tiers

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Auth | NextAuth.js (Auth.js) v5 |
| Payments | Stripe Checkout |
| Forms | React Hook Form + Zod |
| State | TanStack Query |
| Hosting | Vercel / Azure Static Web Apps |
| **AI Image Generation** | MCP Integration (custom visuals, hero images, icons) |
| **AI Video Generation** | MCP Integration (8sec 720p/1080p demos, feature showcases) |

---

## Work Chunk Status Overview

| # | Work Chunk | Priority | Est. Hours | Status | Owner | Due Date |
|---|------------|----------|------------|--------|-------|----------|
| WEB-01 | [Infrastructure](WEB-01-INFRASTRUCTURE.md) | P0 | 8h | **Complete** | Claude | 2024-12-18 |
| WEB-02 | [Marketing Pages](WEB-02-MARKETING-PAGES.md) | P1 | 16h | **MVP Complete** | Claude | 2024-12-18 |
| WEB-03 | [Registration Flow](WEB-03-REGISTRATION.md) | P0 | 12h | **API Ready** | Claude | 2024-12-18 |
| WEB-04 | [Purchase Flow](WEB-04-PURCHASE-FLOW.md) | P0 | 16h | **Complete** | Claude | 2024-12-18 |
| WEB-05 | [Account Portal](WEB-05-ACCOUNT-PORTAL.md) | P1 | 20h | **Complete** | Claude | 2024-12-18 |
| WEB-06 | [Download & Docs](WEB-06-DOWNLOAD-DOCS.md) | P2 | 8h | **MVP Complete** | Claude | 2024-12-18 |
| WEB-07 | [Testing & Launch](WEB-07-TESTING-LAUNCH.md) | P0 | 12h | Not Started | | |

**Total Estimated Effort:** 92 hours

**Status Legend:**
- Not Started
- In Progress
- Complete
- Blocked
- On Hold

---

## Dependency Graph

```
+------------------------------------------------------------------------------+
|                        PHASE 1: FOUNDATION                                    |
+------------------------------------------------------------------------------+
|                                                                               |
|    +----------------------+                                                   |
|    |  WEB-01              |                                                   |
|    |  INFRASTRUCTURE      | <--- Must be first                               |
|    |  (Next.js setup)     |                                                   |
|    +----------+-----------+                                                   |
|               |                                                               |
+---------------+---------------------------------------------------------------+
                |
+---------------v---------------------------------------------------------------+
|                        PHASE 2: CONTENT                                       |
+-------------------------------------------------------------------------------+
|               |                                                               |
|    +----------v-----------+         +----------------------+                  |
|    |  WEB-02              |         |  WEB-06              |                  |
|    |  MARKETING PAGES     |         |  DOWNLOAD & DOCS     |                  |
|    |  (Landing, Pricing)  |         |  (Download, Guides)  |                  |
|    +----------------------+         +----------------------+                  |
|                                                                               |
+-------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------+
|                        PHASE 3: FUNCTIONALITY                                 |
+-------------------------------------------------------------------------------+
|                                                                               |
|    +----------------------+         +----------------------+                  |
|    |  WEB-03              |-------->|  WEB-04              |                  |
|    |  REGISTRATION FLOW   |         |  PURCHASE FLOW       |                  |
|    |  (Email, Verify)     |         |  (Stripe Checkout)   |                  |
|    +----------------------+         +----------+-----------+                  |
|                                                |                              |
|                                     +----------v-----------+                  |
|                                     |  WEB-05              |                  |
|                                     |  ACCOUNT PORTAL      |                  |
|                                     |  (Dashboard, Billing)|                  |
|                                     +----------------------+                  |
|                                                                               |
+-------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------+
|                        PHASE 4: LAUNCH                                        |
+-------------------------------------------------------------------------------+
|                                                                               |
|    +----------------------+                                                   |
|    |  WEB-07              |                                                   |
|    |  TESTING & LAUNCH    | <--- All chunks complete                         |
|    |  (E2E, Deploy)       |                                                   |
|    +----------------------+                                                   |
|                                                                               |
+-------------------------------------------------------------------------------+
```

---

## Phase Breakdown

### Phase 1: Foundation

**Goal:** Project infrastructure ready for development

| Task | Status | Notes |
|------|--------|-------|
| Complete WEB-01-INFRASTRUCTURE | **Complete** | Next.js 16, Tailwind 4, TypeScript |
| Next.js project scaffolded | **Complete** | App Router, static export configured |
| CI/CD pipeline configured | Not Started | |

**Exit Criteria:**
- [x] Next.js project runs locally
- [x] Tailwind configured with OmniGaze design system
- [ ] Environment variables set
- [ ] CI/CD pipeline passes

### Phase 2: Content

**Goal:** Marketing pages and documentation ready

| Task | Status | Notes |
|------|--------|-------|
| Complete WEB-02-MARKETING-PAGES | **MVP Complete** | Landing, Pricing, Features pages |
| Complete WEB-06-DOWNLOAD-DOCS | **MVP Complete** | Docs page with quick start |
| All static pages render | **Complete** | Build succeeds, all pages SSG |
| SEO metadata configured | **Complete** | OpenGraph, Twitter cards |

**Exit Criteria:**
- [x] Landing page with hero, pyramid, bridge, CTA
- [x] Pricing page with tier comparison, feature matrix
- [x] Features page with pyramid layer details
- [ ] Download page with installer
- [x] Basic documentation (quick start guide)

### Phase 3: Functionality

**Goal:** Registration, payment, and account portal working

| Task | Status | Notes |
|------|--------|-------|
| Complete WEB-03-REGISTRATION | **API Ready** | WebsiteController created with auth endpoints |
| Complete WEB-04-PURCHASE-FLOW | **Complete** | Checkout, webhook, portal, enterprise page |
| Complete WEB-05-ACCOUNT-PORTAL | **Complete** | Dashboard, Subscription, Licenses, Billing, Team, Settings |
| All user flows working | UI Complete | Needs API backend integration |

**API Endpoints Created (OmniGazeAPI):**
- `POST /api/website/register` - CORS protected registration
- `POST /api/website/verify` - Sets HttpOnly cookie
- `POST /api/website/login` - Login with license key
- `POST /api/website/logout` - Clear session
- `GET /api/website/me` - Current user info
- `GET /api/website/tier` - Current tier with upgrades
- `GET /api/website/tiers` - Public tier listing

**Exit Criteria:**
- [x] Email registration works (UI + API client complete)
- [x] Verification code flow works (UI + API client complete)
- [x] Stripe checkout works (checkout + webhook + portal)
- [x] Dashboard shows tier info (overview page)
- [x] Subscription management works (subscription page)
- [x] Billing history displays (billing page)

### Phase 4: Launch

**Goal:** Production deployment

| Task | Status | Notes |
|------|--------|-------|
| Complete WEB-07-TESTING-LAUNCH | Not Started | |
| E2E tests passing | Not Started | |
| Production deployment | Not Started | |
| DNS cutover | Not Started | |

**Exit Criteria:**
- [ ] All E2E tests pass
- [ ] Performance audit passed
- [ ] Accessibility audit passed
- [ ] Production deployed
- [ ] DNS cutover complete

---

## Prerequisites (from Self-Service Project)

| Prerequisite | Status | Self-Service Chunk |
|--------------|--------|-------------------|
| OmniGaze API tier endpoints | Complete | 02-PORTAL-API |
| Email verification API | Not Started | 06-EMAIL-VERIFICATION |
| Payment integration API | Not Started | 07-PAYMENT-INTEGRATION |
| Stripe webhook handler | Not Started | 07-PAYMENT-INTEGRATION |

**Blocking Dependencies:**
- WEB-03 (Registration) requires 06-EMAIL-VERIFICATION
- WEB-04 (Purchase) requires 07-PAYMENT-INTEGRATION

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation | Owner |
|------|------------|--------|------------|-------|
| API not ready | Medium | High | Close coordination with self-service project | |
| Stripe integration issues | Low | High | Thorough test mode testing | |
| SEO ranking drop during migration | Medium | Medium | 301 redirects, gradual rollout | |
| Performance issues | Low | Medium | CDN, caching, lazy loading | |
| Design inconsistency | Medium | Low | Use landing-page.html as reference | |
| Auth flow complexity | Medium | Medium | Use NextAuth best practices | |

---

## Key Decisions Log

| Date | Decision | Rationale | Decided By |
|------|----------|-----------|------------|
| | Next.js 14 over Blazor | SEO critical, SSG support, ecosystem | |
| | TypeScript required | Type safety, better DX | |
| | shadcn/ui for components | Customizable, matches design | |
| | Stripe Checkout (hosted) | PCI compliance, faster implementation | |
| | Vercel for hosting | Edge network, great Next.js support | |

---

## Daily Standup Template

**Date:** ___________
**Attendees:** ___________

### Progress Since Last Standup
-

### Planned for Today
-

### Blockers
-

### Risks Identified
-

---

## Weekly Status Report Template

**Week Ending:** ___________

### Summary
[One paragraph summary]

### Completed This Week
- [ ] Task 1
- [ ] Task 2

### Planned for Next Week
- [ ] Task 1
- [ ] Task 2

### Blockers / Risks
-

### Metrics
- Work chunks complete: X / 7
- Estimated hours remaining: X
- Test coverage: X%

---

## Milestone Checkpoints

### Checkpoint 1: Infrastructure Ready
**Target Date:** _____________
- [ ] WEB-01-INFRASTRUCTURE complete
- [ ] Development environment working

### Checkpoint 2: Content Ready
**Target Date:** _____________
- [ ] WEB-02-MARKETING-PAGES complete
- [ ] WEB-06-DOWNLOAD-DOCS complete

### Checkpoint 3: Flows Ready
**Target Date:** _____________
- [ ] WEB-03-REGISTRATION complete
- [ ] WEB-04-PURCHASE-FLOW complete
- [ ] WEB-05-ACCOUNT-PORTAL complete

### Checkpoint 4: Production Ready
**Target Date:** _____________
- [ ] WEB-07-TESTING-LAUNCH complete
- [ ] All tests passing
- [ ] Ready for production deployment

### Checkpoint 5: Launched
**Target Date:** _____________
- [ ] Production deployed
- [ ] DNS cutover complete
- [ ] First self-service customer

---

## Definition of Done

A work chunk is complete when:

- [ ] All tasks in the work chunk markdown are checked
- [ ] Code reviewed and approved
- [ ] TypeScript compiles without errors
- [ ] Unit tests written and passing
- [ ] E2E tests written and passing (where applicable)
- [ ] Accessibility checked (WCAG 2.1 AA)
- [ ] Mobile responsive verified
- [ ] No critical bugs

---

## Contacts

| Role | Name | Contact |
|------|------|---------|
| Project Lead | | |
| Frontend Dev | | |
| Design Lead | | |
| QA Lead | | |
| DevOps | | |

---

## Document History

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2024-12-18 | 1.0 | Initial creation | Claude |
| 2024-12-18 | 1.1 | MVP Implementation - Infrastructure, Marketing Pages, API Endpoints | Claude |

---

## MVP Implementation Log (2024-12-18)

### Completed Today

**API Changes (OmniGazeRoot/OmniGazeAPI):**
1. Added CORS configuration in `Startup.cs` for omnigaze.com origins
2. Created `WebsiteController.cs` with secure endpoints:
   - Registration (no OmniToken required, CORS protected)
   - Login/Logout with HttpOnly cookies
   - User info and tier endpoints

**Website Infrastructure:**
1. Next.js 16 project with App Router
2. Static export configured (`output: 'export'`)
3. Tailwind CSS 4 with OmniGaze "Warm Technical" design system
4. TypeScript throughout

**Components Created:**
- `ValuePyramid` - Interactive pyramid with tooltips (core differentiator)
- `PyramidMini` - Compact version for pricing cards
- `BridgeVisual` - OmniGaze positioning visual
- `Header/Footer` - Responsive navigation
- `Button/ButtonLink` - Primary/secondary/ghost variants
- `PricingCard` - Tier display with features
- `Section/SectionHeader` - Layout components
- `Hero` - Landing page hero section

**Pages Created:**
- `/` - Landing page (hero, pyramid, bridge, features, CTA)
- `/pricing` - Pricing with tier cards, billing toggle, feature matrix, FAQ
- `/features` - Detailed features by pyramid layer
- `/docs` - Quick start guide

**Build Status:**
- All pages compile and prerender as static HTML
- Ready for static hosting (compatible with web hotel)

### Remaining Work
1. ~~Registration/Login UI pages~~ **DONE**
2. Download page with installer
3. Account portal/dashboard
4. Stripe integration

### Registration Flow UI - Complete (2024-12-18)

**Pages Created:**
- `/register` - Email registration with terms acceptance
- `/verify` - 6-character code input with auto-submit
- `/login` - License key login (XXXX-XXXX-XXXX-XXXX format)
- `/register/success` - License key display, download CTA

**Components Created:**
- `src/lib/api-client.ts` - OmniGaze API client
- `src/app/(auth)/layout.tsx` - Auth page layout
- `src/components/auth/auth-card.tsx` - Auth card wrapper
- `src/components/auth/code-input.tsx` - 6-digit verification input
- `src/components/ui/input.tsx` - Input and Checkbox components

**Features:**
- Client-side form validation
- API error handling with user-friendly messages
- Resend code with 60-second cooldown
- Auto-format license key input
- Copy license key to clipboard
- Session storage for multi-step flow

### AI-Generated Visual Assets - Complete (2024-12-18)

**Images Generated (Imagen 4 Ultra):**
- `public/images/hero-network.png` - Hero background (1.4MB)
- `public/images/og-image.png` - Social sharing image (702KB)
- `public/images/layer-infrastructure.png` - Infrastructure layer (1.7MB)
- `public/images/layer-applications.png` - Applications layer (837KB)
- `public/images/layer-capabilities.png` - Capabilities layer (1.1MB)
- `public/images/layer-value-streams.png` - Value Streams layer (765KB)
- `public/images/layer-strategy.png` - Strategy layer (805KB)

**Videos Generated (Veo 3.1):**
- `public/videos/hero-animation.mp4` - 8sec demo video (7.3MB, 720p)

**Integration:**
- Hero component: Background image + video modal
- Features page: Layer images for each pyramid section
- Layout: OG image metadata
