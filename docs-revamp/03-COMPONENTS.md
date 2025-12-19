# 03 - Core Components

## Objective
Build reusable components for documentation pages.

---

## Tasks

### CommandBlock Component
Copy-able code blocks for terminal commands.
- [x] Create `src/components/docs/command-block.tsx`
- [x] Syntax highlighting (monospace font)
- [x] Copy button with feedback ("Copied!")
- [x] Language label (PowerShell, Bash, etc.)
- [x] Dark theme styling

### Callout Component
Highlighted info, warning, tip boxes.
- [x] Create `src/components/docs/callout.tsx`
- [x] Types: `info`, `warning`, `tip`, `danger`
- [x] Icon for each type
- [x] Colored left border

### TierBadge Component
Shows required tier for content.
- [x] Create `src/components/docs/tier-badge.tsx`
- [x] Variants: `community`, `starter`, `professional`, `business`, `enterprise`
- [x] Small pill style with colors

### DownloadCard Component
For downloadable scripts/files.
- [x] Create `src/components/docs/download-card.tsx`
- [x] File name and description
- [x] Download button (amber styled)
- [x] File size and version (optional)
- [x] Type icons: script, document, archive

### StepList Component
Numbered steps for tutorials.
- [x] Create `src/components/docs/step-list.tsx`
- [x] Numbered circles (amber)
- [x] Title and description per step
- [x] Optional children (buttons, links)
- [x] Also created individual `Step` component

### Index Export
- [x] Create `src/components/docs/index.ts`
- [x] Export all components

### TableOfContents Component (Optional - Skipped)
- [ ] Create `src/components/docs/toc.tsx` (P2 - defer to later)

---

## Verification
- [x] Build succeeds
- [x] CommandBlock has copy button
- [x] Callouts have 4 color variants
- [x] TierBadge has 5 tier variants
- [x] DownloadCard has download link
- [x] StepList renders numbered steps

---

## Files Created

| File | Purpose |
|------|---------|
| `src/components/docs/command-block.tsx` | Code blocks with copy |
| `src/components/docs/callout.tsx` | Info/warning boxes |
| `src/components/docs/tier-badge.tsx` | Tier indicators |
| `src/components/docs/download-card.tsx` | File downloads |
| `src/components/docs/step-list.tsx` | Tutorial steps |
| `src/components/docs/index.ts` | Barrel export |

---

## Usage Examples

### CommandBlock
```tsx
<CommandBlock language="powershell">
  .\Setup-WinRMNonAdmin.ps1 -ServiceAccount "DOMAIN\svc-omnigaze"
</CommandBlock>
```

### Callout
```tsx
<Callout type="warning" title="Important">
  Make sure to run as Administrator.
</Callout>
```

### TierBadge
```tsx
<TierBadge tier="professional" />
```

### DownloadCard
```tsx
<DownloadCard
  name="Setup-WinRMNonAdmin.ps1"
  description="One-command setup for WinRM read-only access."
  href="/downloads/Setup-WinRMNonAdmin.zip"
  version="2.1.0"
  size="12 KB"
/>
```

### StepList
```tsx
<StepList steps={[
  { title: "Download", description: "Get the installer" },
  { title: "Install", description: "Run the MSI" },
  { title: "Activate", description: "Enter license key" },
]} />
```
