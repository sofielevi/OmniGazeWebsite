# 07 - Advanced & API

## Objective
Document advanced features and API reference (Pro+ tiers).

---

## Pages to Create

### Applications Section (Starter+)

#### 1. App Discovery (`/dashboard/docs/applications/discovery`)
- [ ] Create folder and `page.tsx`
- [ ] How apps are detected from processes
- [ ] Application inventory view
- [ ] Filtering and searching apps
- [ ] Tier: Starter+

#### 2. App Mapping (`/dashboard/docs/applications/mapping`)
- [ ] Create folder and `page.tsx`
- [ ] Creating FactSheets
- [ ] Mapping processes to apps
- [ ] IsBusinessApplication flag
- [ ] Tier: Starter+

### Capabilities Section (Pro+)

#### 3. Business Capabilities (`/dashboard/docs/capabilities/overview`)
- [ ] Create folder and `page.tsx`
- [ ] What are business capabilities
- [ ] Capability hierarchy
- [ ] Linking apps to capabilities
- [ ] Tier: Professional+

### Advanced Section (Pro+)

#### 4. Architecture Mapping (`/dashboard/docs/advanced/architecture`)
- [ ] Create folder and `page.tsx`
- [ ] FactSheet types overview
- [ ] Relationships between entities
- [ ] Architecture diagrams
- [ ] Tier: Professional+

### API Reference (Pro+)

#### 5. REST API (`/dashboard/docs/api/rest`)
- [ ] Create folder and `page.tsx`
- [ ] Authentication
- [ ] Endpoints overview
- [ ] Request/response examples
- [ ] Tier: Professional+

#### 6. OData Endpoints (`/dashboard/docs/api/odata`)
- [ ] Create folder and `page.tsx`
- [ ] OData configuration
- [ ] Available entities
- [ ] Query examples ($filter, $expand)
- [ ] Tier: Professional+

---

## Content Sources
| Page | Source |
|------|--------|
| App Discovery | `APPLICATION_DISCOVERY_GUIDE.md` |
| App Mapping | `FactSheets_Documentation.md`, `ApplicationGrouping.md` |
| Capabilities | `BusinessCapabilityHierarchy.md` |
| Architecture | `FactSheets_Documentation.md` |
| REST API | `API_DOCUMENTATION.md` |
| OData | `ODataExposureUserGuide.md` |

---

## Tier Gating
- [ ] Apps pages check for `starter` tier minimum
- [ ] Capabilities pages check for `professional` tier
- [ ] API pages check for `professional` tier
- [ ] Show upgrade prompt for locked pages

---

## Verification
- [ ] All pages accessible with correct tier
- [ ] Lower tiers see "Upgrade to access" message
- [ ] API examples are accurate
- [ ] Code blocks have copy buttons
