# 06 - Security & Credentials

## Objective
Document credential setup using the "Route to Least Privilege" approach.

## Sources
- `DocsInput/Route_to_Least_Privilege.pdf`
- `DocsInput/WinRM-NonAdmin-Setup-Guide.pdf`
- `DocsInput/Setup-WinRMNonAdmin.zip`

---

## Pages to Create

### 1. Security Overview (`/dashboard/docs/security`)
- [x] Create `src/app/(dashboard)/docs/security/page.tsx`
- [x] Why credential security matters
- [x] Quick summary of 4 methods
- [x] Recommendation: WinRM Read-Only
- [x] Links to detailed guides

### 2. Route to Least Privilege (`/dashboard/docs/security/credential-journey`)
- [x] Create folder and `page.tsx`
- [x] The Privilege Spectrum diagram:
  - [x] WMI + Admin (6/10) - POC only
  - [x] WMI Limited (7.5/10) - Transitioning
  - [x] WinRM Read-Only (9.5/10) - **Recommended**
  - [x] Log Analytics (10/10) - Cloud-first
- [x] Comparison table with all factors
- [x] Decision guide: "Which should I use?"

### 3. WinRM Setup (`/dashboard/docs/security/winrm-setup`)
- [x] Create folder and `page.tsx`
- [x] Prerequisites:
  - [x] Windows Server 2012 R2+
  - [x] PowerShell 5.1+
  - [x] Ports 5985/5986
- [x] One-command setup:
  ```
  .\Setup-WinRMNonAdmin.ps1 -ServiceAccount "DOMAIN\svc-omnigaze"
  ```
- [x] Download link for script
- [x] What the script does (expandable)
- [x] Verification commands
- [x] Link to troubleshooting

### 4. Troubleshooting (`/dashboard/docs/security/troubleshooting`)
- [x] Create folder and `page.tsx`
- [x] Common issues table:
  - [x] Connection refused → Enable WinRM
  - [x] Access denied → Check permissions
  - [x] Auth error → Check Kerberos/SPN
  - [x] Firewall → Check ports
- [x] Diagnostic commands
- [x] Log locations
- [x] When to contact support

---

## File Operations
- [x] Copy `DocsInput/Setup-WinRMNonAdmin.zip` to `public/downloads/`
- [x] Verify download works at `/downloads/Setup-WinRMNonAdmin.zip`

---

## Key Content from PDFs

### Privilege Spectrum (extract and convert to component)
| Method | Security Score | Setup | Risk | Recommended For |
|--------|---------------|-------|------|-----------------|
| WMI + Admin | 6/10 | Easy | High | POC only |
| WMI Limited | 7.5/10 | Medium | Medium | Transitioning |
| **WinRM Read-Only** | **9.5/10** | Easy | Low | **Production** |
| Log Analytics | 10/10 | Medium | Minimal | Cloud-first |

### One-Command Setup
```powershell
.\Setup-WinRMNonAdmin.ps1 -ServiceAccount "DOMAIN\svc-omnigaze" -Verbose
```

### Verification
```powershell
Test-WSMan -ComputerName "targetserver.domain.com"
```

---

## Verification
- [x] All 4 pages accessible
- [x] Privilege spectrum renders correctly
- [x] Script download works
- [x] PowerShell commands have copy buttons
- [x] Troubleshooting table is complete
