# OmniGaze Website: Master Implementation Tracker

**Project:** Public Website (omnigaze.com)
**Start Date:** _____________
**Target Completion:** _____________
**Status:** NOT STARTED

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
| WEB-01 | [Infrastructure](WEB-01-INFRASTRUCTURE.md) | P0 | 8h | Not Started | | |
| WEB-02 | [Marketing Pages](WEB-02-MARKETING-PAGES.md) | P1 | 16h | Not Started | | |
| WEB-03 | [Registration Flow](WEB-03-REGISTRATION.md) | P0 | 12h | Not Started | | |
| WEB-04 | [Purchase Flow](WEB-04-PURCHASE-FLOW.md) | P0 | 16h | Not Started | | |
| WEB-05 | [Account Portal](WEB-05-ACCOUNT-PORTAL.md) | P1 | 20h | Not Started | | |
| WEB-06 | [Download & Docs](WEB-06-DOWNLOAD-DOCS.md) | P2 | 8h | Not Started | | |
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
| Complete WEB-01-INFRASTRUCTURE | Not Started | |
| Next.js project scaffolded | Not Started | |
| CI/CD pipeline configured | Not Started | |
| Staging environment ready | Not Started | |

**Exit Criteria:**
- [ ] Next.js project runs locally
- [ ] Tailwind + shadcn/ui configured
- [ ] Environment variables set
- [ ] Staging deployment working
- [ ] CI/CD pipeline passes

### Phase 2: Content

**Goal:** Marketing pages and documentation ready

| Task | Status | Notes |
|------|--------|-------|
| Complete WEB-02-MARKETING-PAGES | Not Started | |
| Complete WEB-06-DOWNLOAD-DOCS | Not Started | |
| All static pages render | Not Started | |
| SEO metadata configured | Not Started | |

**Exit Criteria:**
- [ ] Landing page matches design
- [ ] Pricing page with tier comparison
- [ ] Features page complete
- [ ] Download page with installer
- [ ] Basic documentation

### Phase 3: Functionality

**Goal:** Registration, payment, and account portal working

| Task | Status | Notes |
|------|--------|-------|
| Complete WEB-03-REGISTRATION | Not Started | Depends on API |
| Complete WEB-04-PURCHASE-FLOW | Not Started | Depends on Stripe |
| Complete WEB-05-ACCOUNT-PORTAL | Not Started | |
| All user flows working | Not Started | |

**Exit Criteria:**
- [ ] Email registration works
- [ ] Verification code flow works
- [ ] Stripe checkout works (test mode)
- [ ] Dashboard shows tier info
- [ ] Subscription management works
- [ ] Billing history displays

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
- [ ] Staging fully tested
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
- [ ] Staging deployment working

### Checkpoint 2: Content Ready
**Target Date:** _____________
- [ ] WEB-02-MARKETING-PAGES complete
- [ ] WEB-06-DOWNLOAD-DOCS complete
- [ ] All marketing pages live on staging

### Checkpoint 3: Flows Ready
**Target Date:** _____________
- [ ] WEB-03-REGISTRATION complete
- [ ] WEB-04-PURCHASE-FLOW complete
- [ ] WEB-05-ACCOUNT-PORTAL complete
- [ ] All user flows working on staging

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
- [ ] Deployed to staging
- [ ] Tested on staging
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
