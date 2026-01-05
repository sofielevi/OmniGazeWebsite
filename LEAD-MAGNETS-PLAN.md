# Kreative Lead Magnets for OmniGaze

## Mål
Generere leads via gratis ressourcer der giver reel værdi - IKKE kedelige whitepapers.

---

## Top 10 Idéer (rangeret efter ease + impact)

### 1. Interactive Quiz: "Hvad er dit IT Visibility Score?"
**Effort:** Lav | **Impact:** Høj | **Viral potential:** Høj

- 8-10 spørgsmål om deres nuværende IT overblik
- Giver personlig score + benchmark mod andre
- Email-gate på resultat
- Shareable resultat ("Jeg scorede 67% - hvad scorer du?")

**Eksempel spørgsmål:**
- "Hvor lang tid tager det at finde alle afhængigheder til en kritisk applikation?"
- "Hvad sker der hvis jeres primære arkitekt bliver syg i morgen?"

---

### 2. Gratis Template Pack: "EA Starter Kit"
**Effort:** Lav | **Impact:** Medium-Høj

Excel/Notion/Airtable templates:
- Application Portfolio Tracker
- Infrastructure Inventory Sheet
- Dependency Mapping Matrix
- Business Capability Map (tom template)

*Bonus: Video walkthrough af hvordan man udfylder dem*

---

### 3. Infrastructure Complexity Calculator
**Effort:** Medium | **Impact:** Høj

Simpel web-calculator:
- Input: antal servere, apps, lokationer, cloud providers
- Output: Complexity Score + estimeret risiko + "sådan håndterer andre det"
- CTA: "Se hvordan OmniGaze automatiserer dette"

---

### 4. "IT Horror Stories" Blog Serie / LinkedIn Posts
**Effort:** Meget lav | **Impact:** Medium | **Viral:** Høj

Anonymiserede historier om:
- "Firmaet der glemte 47 servere i kælderen"
- "Migration der tog 18 måneder fordi ingen vidste hvad der talte sammen"
- "Den ene person der vidste alt - og så sagde op"

*Relatable, shareable, kræver ingen gating*

---

### 5. Mini-Kursus: "Infrastructure Mapping 101"
**Effort:** Medium | **Impact:** Høj

5 korte video-lektioner (5-10 min hver):
1. Hvorfor synlighed er kritisk
2. Sådan starter du med ingenting
3. Common pitfalls
4. Tools & teknikker
5. Fra kaos til klarhed

*Email-drip over 5 dage*

---

### 6. Benchmark Report: "State of IT Visibility 2025"
**Effort:** Medium | **Impact:** Høj

- Survey 100+ IT folk (via LinkedIn, communities)
- Kompiler resultater til flot rapport
- Gratis download mod email
- Årlig gentagelse = løbende leads

---

### 7. ROI Calculator: "Hvad koster dit IT-mørke?"
**Effort:** Lav | **Impact:** Høj

Input:
- Antal servere
- Gennemsnitlig incident response tid
- Timer brugt på manuel dokumentation/måned

Output:
- Estimeret årligt tab (i kr/timer)
- Potentiel besparelse med automatisering

---

### 8. Checkliste: "Er I klar til Cloud Migration?"
**Effort:** Meget lav | **Impact:** Medium

PDF/interaktiv checkliste:
- 20 punkter man skal have styr på
- Scoring system
- Links til relevante ressourcer

---

### 9. "EA Maturity Assessment" Self-Service Tool
**Effort:** Medium | **Impact:** Høj

Baseret på OmniGaze Pyramiden:
- Spørgsmål for hvert lag
- Resultat viser hvor de er stærke/svage
- Personaliserede anbefalinger
- Sammenligning med industry benchmarks

---

### 10. Gratis Community / Slack/Discord
**Effort:** Lav (ongoing moderation) | **Impact:** Langsom men stærk

- "EA & Infrastructure Professionals DK"
- Ikke OmniGaze-branded (neutral)
- Værdi først, soft promotion
- Builds trust over tid

---

## Quick Wins (kan laves på 1-2 dage)

| # | Idé | Implementering |
|---|-----|----------------|
| 1 | IT Horror Stories | 5 LinkedIn posts, ingen gating |
| 2 | Migration Checklist | 1-page PDF, email gate |
| 3 | ROI Calculator | Simple React component på website |
| 4 | Template Pack | Excel files + landing page |

---

## Anbefaling: Start Her

### Fase 1 (Denne uge)
1. **ROI Calculator** - Byg ind i website, email-gate på resultat
2. **IT Horror Stories** - 3 LinkedIn posts for awareness

### Fase 2 (Næste uge)
3. **IT Visibility Quiz** - Interaktiv, shareable, email-gate
4. **Template Pack** - Excel downloads

### Fase 3 (Senere)
5. **Mini-kursus** - Video serie
6. **Benchmark Report** - Kræver survey først

---

## Implementeringsplan

### 1. ROI Calculator (`/tools/roi-calculator`)
**Filer:**
- `src/app/(marketing)/tools/roi-calculator/page.tsx`

**Features:**
- Inputs: Antal servere, apps, incidents/måned, timer på manuel dok
- Beregning: Estimeret årligt tab + potentiel besparelse
- Email-gate på detaljeret rapport
- Share-knap til LinkedIn

---

### 2. IT Visibility Quiz (`/tools/visibility-quiz`)
**Filer:**
- `src/app/(marketing)/tools/visibility-quiz/page.tsx`
- `src/components/marketing/quiz.tsx`

**Features:**
- 8 spørgsmål med multiple choice
- Progress bar
- Animeret score reveal
- Benchmark: "Du scorer bedre end 43% af virksomheder"
- Email-gate på fuld rapport + tips
- Social share med score

**Spørgsmål (draft):**
1. Hvor hurtigt kan I finde alle afhængigheder til en kritisk app?
2. Er jeres infrastruktur-dokumentation opdateret?
3. Hvad sker der hvis jeres primære arkitekt er syg?
4. Kender I alle jeres cloud-ressourcer?
5. Hvor mange "skygge IT" systemer tror I eksisterer?
6. Kan I spore en applikation fra server til forretningsværdi?
7. Hvor lang tid tog jeres sidste migration?
8. Hvor sikre er I på jeres disaster recovery plan?

---

### 3. Template Pack (`/resources/templates`)
**Filer:**
- `src/app/(marketing)/resources/templates/page.tsx`
- `public/downloads/` (Excel filer)

**Templates at lave:**
- `application-portfolio-tracker.xlsx`
- `infrastructure-inventory.xlsx`
- `dependency-mapping-matrix.xlsx`
- `business-capability-map.xlsx`

Landing page med preview + email-gate for download

---

### 4. IT Horror Stories (LinkedIn content)
**Output:** 5 LinkedIn posts (tekst til dig)

**Historier:**
1. "De 47 glemte servere i kælderen"
2. "Migrationen der tog 18 måneder"
3. "Den ene person der vidste alt - og sagde op"
4. "Audit-mareridtet: 'Vis os jeres infrastruktur'"
5. "Shadow IT: CTO'en der opdagede 200 ukendte cloud-instanser"

---

## Prioriteret Rækkefølge

| # | Opgave | Output |
|---|--------|--------|
| 1 | IT Horror Stories | 5 LinkedIn posts (tekst) |
| 2 | ROI Calculator | Live på website |
| 3 | IT Visibility Quiz | Live på website |
| 4 | Template Pack | Excel files + landing page |

---

## Navigation Update
Tilføj til header:
- "Resources" dropdown med:
  - Tools → ROI Calculator, Visibility Quiz
  - Templates → Template downloads
