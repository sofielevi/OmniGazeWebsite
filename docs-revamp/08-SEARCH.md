# 08 - Search & Polish

## Objective
Add search functionality and final polish.

---

## Tasks

### Search Implementation
- [ ] Choose search approach:
  - [ ] Option A: Pagefind (static, build-time) - Recommended for static export
  - [ ] Option B: Simple client-side filter
  - [ ] Option C: Algolia DocSearch (hosted)
- [ ] Install chosen search package
- [ ] Create search index at build time
- [ ] Add search UI to docs header
- [ ] Filter results by user's tier

### Search UI
- [ ] Search input in docs header
- [ ] Keyboard shortcut: `Cmd/Ctrl + K`
- [ ] Results dropdown with:
  - [ ] Page title
  - [ ] Section
  - [ ] Excerpt with highlights
  - [ ] Tier badge
- [ ] "No results" state
- [ ] Loading state

### Mobile Polish
- [ ] Test all pages on mobile
- [ ] Fix any layout issues
- [ ] Ensure sidebar collapses properly
- [ ] Touch targets are large enough
- [ ] Code blocks scroll horizontally

### Accessibility
- [ ] All images have alt text
- [ ] Headings are hierarchical (h1 → h2 → h3)
- [ ] Links are descriptive
- [ ] Keyboard navigation works
- [ ] Color contrast meets WCAG

### Performance
- [ ] Images optimized
- [ ] No layout shift on load
- [ ] Fast page transitions
- [ ] Lazy load images below fold

### Final Checks
- [ ] All links work (no 404s)
- [ ] All downloads work
- [ ] Copy buttons work
- [ ] Tier gating works correctly
- [ ] Auth redirect works
- [ ] Test on Chrome, Firefox, Safari

---

## Search Options Comparison

| Option | Pros | Cons |
|--------|------|------|
| Pagefind | Static, fast, no server | Build-time only |
| Client filter | Simple, no deps | Slower with many pages |
| Algolia | Powerful, hosted | External dependency |

**Recommendation:** Start with Pagefind for static export compatibility.

---

## Verification
- [ ] Search returns relevant results
- [ ] Tier-locked content filtered for user
- [ ] Mobile experience is smooth
- [ ] No console errors
- [ ] Lighthouse score > 90

---

## Optional Enhancements (Future)
- [ ] Table of contents on right sidebar
- [ ] "Was this helpful?" feedback
- [ ] Edit on GitHub links
- [ ] Version selector
- [ ] Print-friendly styles
