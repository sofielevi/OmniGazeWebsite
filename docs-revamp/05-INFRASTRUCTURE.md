# 05 - Infrastructure Pages

## Objective
Document the infrastructure discovery features (Community tier).

---

## Pages to Create

### 1. Asset Discovery (`/dashboard/docs/infrastructure/discovery`)
- [x] Create folder and `page.tsx`
- [x] How auto-discovery works
- [x] Scan targets: IP ranges, CIDR, hostnames
- [x] Discovery methods (WMI, WinRM, SSH)
- [x] Scheduling scans
- [x] Discovery pipeline explanation

### 2. Network Scanning (`/dashboard/docs/infrastructure/scanning`)
- [x] Create folder and `page.tsx`
- [x] Scan configuration options (depth, parallelism)
- [x] Port scanning table
- [x] Scan progress monitoring
- [x] Handling scan errors (4 common errors)
- [x] Performance optimization tips

### 3. Server Details (`/dashboard/docs/infrastructure/servers`)
- [x] Create folder and `page.tsx`
- [x] Server overview page with stats
- [x] Hardware info (CPU, RAM, disk, network)
- [x] Installed software table
- [x] Running services table
- [x] Network connections view
- [x] CLI export commands

### 4. Clusters (`/dashboard/docs/infrastructure/clusters`)
- [x] Create folder and `page.tsx`
- [x] Windows Failover Clusters
- [x] SQL Server clusters (AG, FCI)
- [x] Cluster detection algorithm steps
- [x] Cluster view with nodes and resources
- [x] CLI cluster commands

### 5. SQL Instances (`/dashboard/docs/infrastructure/sql`)
- [x] Create folder and `page.tsx`
- [x] SQL Server discovery methods
- [x] Instance details with database list
- [x] Connection tracking view
- [x] SQL cluster support
- [x] CLI SQL commands

### 6. 3D Visualization (`/dashboard/docs/infrastructure/3d-view`)
- [x] Create folder and `page.tsx`
- [x] Navigating the 3D view
- [x] Mouse and keyboard controls
- [x] Node types and shapes
- [x] Filtering and highlighting (5 filter types)
- [x] Color schemes (4 schemes)
- [x] Performance tips
- [x] Export and sharing options

---

## Content Sources
| Page | Source |
|------|--------|
| Asset Discovery | `OneClickDiscoveryAlgorithm.md`, `DiscoveryPipeline.md` |
| Network Scanning | `OmniGazeScanningAlgorithm.md` |
| Server Details | `VMComputer_Attributes.md` |
| Clusters | `Cluster_Detection_Integration.md`, `SQL-Cluster-Architecture-Design.md` |
| SQL Instances | `SQL_Instance_Discovery_Algorithm.md` |
| 3D Visualization | New content + screenshots |

---

## Folder Structure
```
src/app/(dashboard)/docs/infrastructure/
├── discovery/
│   └── page.tsx    # ✓
├── scanning/
│   └── page.tsx    # ✓
├── servers/
│   └── page.tsx    # ✓
├── clusters/
│   └── page.tsx    # ✓
├── sql/
│   └── page.tsx    # ✓
└── 3d-view/
    └── page.tsx    # ✓
```

---

## Verification
- [x] All 6 pages accessible
- [x] Build succeeds
- [x] Links between pages work
- [x] Uses doc components (CommandBlock, Callout, StepList)

---

## Files Created

| File | Purpose |
|------|---------|
| `infrastructure/discovery/page.tsx` | Asset discovery guide |
| `infrastructure/scanning/page.tsx` | Network scanning configuration |
| `infrastructure/servers/page.tsx` | Server detail view docs |
| `infrastructure/clusters/page.tsx` | Cluster detection and viewing |
| `infrastructure/sql/page.tsx` | SQL Server instance discovery |
| `infrastructure/3d-view/page.tsx` | 3D visualization controls |
