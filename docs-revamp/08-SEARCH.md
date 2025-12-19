# 08 - Search & Polish

## Objective
Add search functionality and final polish.

---

## Tasks

### Search Implementation
- [x] Choose search approach:
  - [ ] Option A: Pagefind (static, build-time) - Recommended for static export
  - [x] Option B: Simple client-side filter - **CHOSEN** (works with static export)
  - [ ] Option C: Algolia DocSearch (hosted)
- [x] Install chosen search package (no extra deps needed)
- [x] Create search index at build time (hardcoded in component)
- [x] Add search UI to docs sidebar
- [x] Filter results by user's tier

### Search UI
- [x] Search input in docs sidebar
- [x] Keyboard shortcut: `Cmd/Ctrl + K`
- [x] Results dropdown with:
  - [x] Page title
  - [x] Section
  - [x] Tier badge (for locked content)
- [x] "No results" state
- [x] Keyboard navigation (arrow keys, enter)
- [x] ESC to close

### Mobile Polish
- [x] Test all pages on mobile
- [x] Sidebar collapses properly (hamburger menu)
- [x] Search modal responsive (full width on mobile)
- [x] Touch targets large enough
- [x] Code blocks scroll horizontally

### Accessibility
- [x] Headings are hierarchical (h1 -> h2 -> h3)
- [x] Links are descriptive
- [x] Keyboard navigation works
- [x] Color contrast maintained (dark theme)

### Performance
- [x] No layout shift on load
- [x] Fast page transitions (client-side routing)

### Final Checks
- [x] All links work (no 404s) - Fixed broken links
- [x] Tier gating works correctly
- [x] Build passes successfully

---

## Fixed Issues

### Broken Links Resolved
- `/docs/infrastructure/winrm-setup` -> `/docs/security/winrm-setup`
- `/docs/advanced/automation` -> `/docs/infrastructure/scanning`
- `/docs/infrastructure/credentials` -> `/docs/security/credential-journey`
- `/docs/security/credentials` -> `/docs/security/credential-journey`

---

## Search Options Comparison

| Option | Pros | Cons |
|--------|------|------|
| Pagefind | Static, fast, no server | Build-time only |
| Client filter | Simple, no deps | Slower with many pages |
| Algolia | Powerful, hosted | External dependency |

**Chosen:** Client-side filter - Simple, no external dependencies, works with static export, performant for our page count (~20 pages).

---

## Verification
- [x] Search returns relevant results
- [x] Tier-locked content filtered for user
- [x] Mobile experience is smooth
- [x] Build completes successfully

---

## Files Created/Modified

### Created
- `src/components/docs/search.tsx` - Search component with modal UI

### Modified
- `src/components/docs/index.ts` - Export DocsSearch
- `src/app/(dashboard)/docs/layout.tsx` - Added search to sidebar
- Multiple docs pages - Fixed broken links

---

## Optional Enhancements (Future)
- [ ] Table of contents on right sidebar
- [ ] "Was this helpful?" feedback
- [ ] Edit on GitHub links
- [ ] Version selector
- [ ] Print-friendly styles
- [ ] Pagefind integration for full-text search
