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
| 07 | [Advanced & API](./07-ADVANCED.md) | 3h | ⬜ Not Started |
| 08 | [Search & Polish](./08-SEARCH.md) | 3h | ⬜ Not Started |

**Total Estimate:** ~28 hours (3-4 days)

---

## Quick Reference

### Page Counts by Section
| Section | Pages | Tier |
|---------|-------|------|
| Getting Started | 4 | Community |
| Infrastructure | 6 | Community |
| Security & Credentials | 4 | Community |
| Applications | 4 | Starter+ |
| Capabilities | 3 | Pro+ |
| Advanced/API | 4 | Pro+ |
| **Total** | **25** | - |

### Key Decisions
- [x] Use Next.js App Router (not pages)
- [x] Protect via dashboard layout auth
- [x] Tier gating via user context
- [x] MDX for content (or TSX pages)
- [x] Reuse existing dashboard sidebar pattern

---

## Definition of Done
- [ ] All pages created and accessible
- [ ] Auth redirects unauthenticated users
- [ ] Tier badges show on locked content
- [ ] Navigation sidebar works
- [ ] Search finds content
- [ ] Mobile responsive
- [ ] Downloads work (scripts, etc.)
