# WEB-06: Download & Documentation

**Priority:** P2 (Medium)
**Estimated Hours:** 8h
**Status:** Not Started
**Owner:** ___________
**Due Date:** ___________
**Depends On:** WEB-01 (Infrastructure)

---

## Objective

Create the download page for OmniGaze installer and basic documentation/getting started guides.

---

## Prerequisites

- [ ] WEB-01-INFRASTRUCTURE complete
- [ ] Installer file hosted (CDN or blob storage)
- [ ] System requirements documented
- [ ] Getting started content written

---

## Tasks

### 1. Download Page (`/download`)

- [ ] **Hero Section**
  - "Download OmniGaze" headline
  - Brief description
  - Version number badge

- [ ] **Primary Download Card**
  - Windows installer (.exe)
  - File size
  - Version number
  - Download button (prominent)
  - SHA256 checksum

- [ ] **System Requirements**
  | Requirement | Minimum | Recommended |
  |-------------|---------|-------------|
  | OS | Windows 10 | Windows 11 |
  | RAM | 4 GB | 8 GB |
  | Disk | 500 MB | 1 GB |
  | .NET | .NET 8 Runtime | .NET 8 Runtime |

- [ ] **Installation Steps**
  1. Download the installer
  2. Run OmniGazeSetup.exe
  3. Follow the installation wizard
  4. Launch OmniGaze
  5. Register with your email

- [ ] **What's New Section**
  - Latest version release notes
  - Link to full changelog

- [ ] **Alternative Downloads** (if applicable)
  - Previous versions
  - MSI installer (enterprise)
  - Portable version

### 2. Documentation Structure

```
/docs
+-- /docs                       # Docs index
+-- /docs/getting-started       # Quick start guide
+-- /docs/installation          # Installation guide
+-- /docs/registration          # Registration guide
+-- /docs/features              # Feature documentation
+-- /docs/api                   # API reference (link to external?)
+-- /docs/faq                   # FAQ
```

### 3. Getting Started Page (`/docs/getting-started`)

- [ ] **Overview**
  - What is OmniGaze?
  - Key capabilities
  - Typical use cases

- [ ] **Step-by-Step Guide**
  1. **Install OmniGaze**
     - Download link
     - Installation steps
     - Screenshots

  2. **Register Your Account**
     - Email registration
     - Verification code
     - License key

  3. **First Scan**
     - Add IP range
     - Run discovery
     - View results

  4. **Explore Your Data**
     - CMDB view
     - Diagram view
     - Tags and filters

- [ ] **Next Steps**
  - Link to features docs
  - Link to video tutorials (if available)
  - Support contact

### 4. Installation Guide (`/docs/installation`)

- [ ] **Requirements**
  - System requirements table
  - Network requirements (ports)
  - Permission requirements

- [ ] **Installation Methods**
  - Standard installer (GUI)
  - Silent installation (command line)
  - MSI for enterprise deployment

- [ ] **Configuration**
  - Default settings
  - Configuration file location
  - Environment variables

- [ ] **Troubleshooting**
  - Common installation issues
  - .NET Runtime installation
  - Antivirus considerations

### 5. Registration Guide (`/docs/registration`)

- [ ] **New Registration**
  - In-app registration flow
  - Website registration flow
  - Email verification

- [ ] **Managing Your License**
  - View license key
  - Activation limits
  - Deactivating machines

- [ ] **Upgrading Your Tier**
  - Available tiers
  - Upgrade process
  - What happens after upgrade

### 6. FAQ Page (`/docs/faq`)

- [ ] **General Questions**
  - What is OmniGaze?
  - How does discovery work?
  - Is an agent required?

- [ ] **Pricing Questions**
  - What counts as a server?
  - Can I upgrade/downgrade?
  - What payment methods accepted?

- [ ] **Technical Questions**
  - What ports are required?
  - Does it work with firewalls?
  - Linux support?

- [ ] **Account Questions**
  - How do I reset my password?
  - Can I transfer my license?
  - How do I cancel?

### 7. Documentation Components

- [ ] **Docs Layout**
  - Sidebar navigation
  - Table of contents (on-page)
  - Previous/Next navigation
  - Search (optional)

- [ ] **MDX Support** (optional)
  - Code blocks with syntax highlighting
  - Callout boxes (info, warning)
  - Tabs for different scenarios

- [ ] **Shared Components**
  - Code block
  - Callout (info, warning, tip)
  - Screenshot with caption
  - Step indicator

---

## Download Analytics

- [ ] Track download clicks (GA4 event)
- [ ] Track installer downloads (if hosting directly)
- [ ] Track documentation page views

---

## SEO for Documentation

```typescript
// Example for getting-started page
export const metadata: Metadata = {
  title: 'Getting Started with OmniGaze | Documentation',
  description: 'Learn how to install OmniGaze, register your account, and run your first infrastructure discovery scan.',
  openGraph: {
    title: 'Getting Started with OmniGaze',
    description: '...',
  },
};
```

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/app/(marketing)/download/page.tsx` | Download page |
| `src/app/docs/page.tsx` | Docs index |
| `src/app/docs/getting-started/page.tsx` | Getting started |
| `src/app/docs/installation/page.tsx` | Installation guide |
| `src/app/docs/registration/page.tsx` | Registration guide |
| `src/app/docs/faq/page.tsx` | FAQ |
| `src/app/docs/layout.tsx` | Docs layout |
| `src/components/docs/sidebar.tsx` | Docs sidebar |
| `src/components/docs/toc.tsx` | Table of contents |
| `src/components/docs/callout.tsx` | Callout box |
| `src/components/docs/code-block.tsx` | Code block |
| `src/components/download/download-card.tsx` | Download card |
| `src/components/download/requirements.tsx` | Requirements table |

---

## Content Required

- [ ] System requirements (confirmed)
- [ ] Installation steps (screenshots)
- [ ] Getting started guide (text + screenshots)
- [ ] FAQ questions and answers
- [ ] Release notes / changelog
- [ ] Installer file URL
- [ ] File size and checksum

---

## Testing Scenarios

- [ ] Download page loads
- [ ] Download button works (file downloads)
- [ ] All docs pages render
- [ ] Navigation between docs works
- [ ] Mobile responsive
- [ ] Code blocks display correctly
- [ ] Links to external resources work

---

## Verification Checklist

- [ ] Download page complete
- [ ] Installer downloads successfully
- [ ] All documentation pages created
- [ ] Content reviewed for accuracy
- [ ] Screenshots up to date
- [ ] Mobile responsive
- [ ] SEO metadata configured

---

## Completion Criteria

- [ ] All tasks above completed
- [ ] Content reviewed and approved
- [ ] Links verified working
