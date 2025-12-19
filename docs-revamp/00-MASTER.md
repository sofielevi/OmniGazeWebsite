# Documentation Revamp - Master Tracker

## Goal
Move documentation from public `/docs` to protected `/dashboard/docs` with tier-based access.

## Sources
- `OmniGazeRoot/Documentation/` - 90+ markdown files
- `DocsInput/` - Security PDFs and setup scripts

---

## Progress

| # | Work Chunk | Est. | Status |
|---|------------|------|--------|
| 01 | [Architecture & Auth](./01-ARCHITECTURE.md) | 4h | ✅ Complete |
| 02 | [Navigation & Layout](./02-NAVIGATION.md) | 3h | ✅ Complete |
| 03 | [Core Components](./03-COMPONENTS.md) | 4h | ✅ Complete |
| 04 | [Getting Started Pages](./04-GETTING-STARTED.md) | 3h | ✅ Complete |
| 05 | [Infrastructure Pages](./05-INFRASTRUCTURE.md) | 4h | ✅ Complete |
| 06 | [Security & Credentials](./06-SECURITY.md) | 4h | ✅ Complete |
| 07 | [Advanced & API](./07-ADVANCED.md) | 3h | ✅ Complete |
| 08 | [Search & Polish](./08-SEARCH.md) | 3h | ✅ Complete |

**Total Estimate:** ~28 hours (3-4 days)

---

## Quick Reference

### Page Counts by Section
| Section | Pages | Tier |
|---------|-------|------|
| Getting Started | 4 | Community |
| Infrastructure | 6 | Community |
| Security & Credentials | 4 | Community |
| Applications | 2 | Starter+ |
| Capabilities | 2 | Pro+ |
| Advanced | 2 | Pro+/Business |
| API | 2 | Pro+ |
| **Total** | **22** | - |

### Key Decisions
- [x] Use Next.js App Router (not pages)
- [x] Protect via dashboard layout auth
- [x] Tier gating via user context
- [x] TSX pages (not MDX)
- [x] Reuse existing dashboard sidebar pattern
- [x] Client-side search with tier filtering

---

## Definition of Done
- [x] All pages created and accessible
- [x] Auth redirects unauthenticated users
- [x] Tier badges show on locked content
- [x] Navigation sidebar works
- [x] Search finds content
- [x] Mobile responsive
- [x] Downloads work (scripts, etc.)

---

## Summary

All 8 work chunks are complete. The documentation revamp includes:

### Features Implemented
- **22 documentation pages** across 7 sections
- **Tier-based access control** (Community, Starter, Professional, Business)
- **Search functionality** with Cmd/Ctrl+K shortcut
- **Mobile-responsive layout** with collapsible sidebar
- **Breadcrumb navigation** for context
- **Reusable components**: Callout, CommandBlock, StepList, TierBadge, etc.

### Sections
1. **Getting Started** - Overview, Installation, Activation, First Scan
2. **Infrastructure** - Discovery, Scanning, Servers, 3D View, SQL, Clusters
3. **Security** - Overview, Credential Journey, WinRM Setup, Troubleshooting
4. **Applications** - Discovery, Mapping (Starter+)
5. **Capabilities** - Overview, Mapping (Professional+)
6. **Advanced** - Architecture, Value Streams (Professional+/Business)
7. **API Reference** - REST API, OData Endpoints (Professional+)

### Routes
All docs are protected under the `(dashboard)` route group and accessible at `/docs/*`.
