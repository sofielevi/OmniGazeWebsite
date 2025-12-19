# 07 - Advanced & API

## Objective
Document advanced features and API reference (Pro+ tiers).

---

## Pages to Create

### Applications Section (Starter+)

#### 1. App Discovery (`/docs/applications/discovery`)
- [x] Create folder and `page.tsx`
- [x] How apps are detected from processes
- [x] Application inventory view
- [x] Filtering and searching apps
- [x] Tier: Starter+

#### 2. App Mapping (`/docs/applications/mapping`)
- [x] Create folder and `page.tsx`
- [x] Creating FactSheets
- [x] Mapping processes to apps
- [x] IsBusinessApplication flag
- [x] Tier: Starter+

### Capabilities Section (Pro+)

#### 3. Business Capabilities (`/docs/capabilities/overview`)
- [x] Create folder and `page.tsx`
- [x] What are business capabilities
- [x] Capability hierarchy
- [x] Linking apps to capabilities
- [x] Tier: Professional+

### Advanced Section (Pro+)

#### 4. Architecture Mapping (`/docs/advanced/architecture`)
- [x] Create folder and `page.tsx`
- [x] FactSheet types overview
- [x] Relationships between entities
- [x] Architecture diagrams
- [x] Tier: Professional+

### API Reference (Pro+)

#### 5. REST API (`/docs/api/rest`)
- [x] Create folder and `page.tsx`
- [x] Authentication
- [x] Endpoints overview
- [x] Request/response examples
- [x] Tier: Professional+

#### 6. OData Endpoints (`/docs/api/odata`)
- [x] Create folder and `page.tsx`
- [x] OData configuration
- [x] Available entities
- [x] Query examples ($filter, $expand)
- [x] Tier: Professional+

---

## Content Sources
| Page | Source |
|------|--------|
| App Discovery | `ApplicationGrouping.md` |
| App Mapping | `FactSheets_Documentation.md`, `ApplicationGrouping.md` |
| Capabilities | `BusinessCapabilityHierarchy.md` |
| Architecture | `FactSheets_Documentation.md` |
| REST API | `API_DOCUMENTATION.md` |
| OData | `ODataExposureUserGuide.md` |

---

## Tier Gating
- [x] Apps pages check for `starter` tier minimum
- [x] Capabilities pages check for `professional` tier
- [x] API pages check for `professional` tier
- [x] Show upgrade prompt for locked pages

---

## Verification
- [x] All pages accessible with correct tier
- [x] Lower tiers see "Upgrade to access" message
- [x] API examples are accurate
- [x] Code blocks have copy buttons
