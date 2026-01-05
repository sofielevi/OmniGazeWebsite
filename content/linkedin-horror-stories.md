# IT Horror Stories - LinkedIn Posts

Copy/paste direkte til LinkedIn. Hver post er optimeret til engagement.

---

## Post 1: De 47 Glemte Servere

**Hook:** True story fra en dansk virksomhed.

---

True story:

En virksomhed hyrede os til at kortlægge deres infrastruktur.

De sagde: "Vi har cirka 200 servere."

Efter en uge med OmniGaze fandt vi 247.

47 servere ingen vidste eksisterede.

12 af dem kørte i en kælder.
3 var under en trappe.
1 stod bogstaveligt talt bag en sofa i mødelokale B.

Den vildeste?

En produktionskritisk database-server fra 2014 der håndterede alle kundeordrer - kørt af en praktikant der ikke længere arbejdede der.

Ingen vidste den eksisterede.
Ingen patchede den.
Ingen tog backup.

Men den kørte stadig.

Morale: Du kan ikke beskytte hvad du ikke ved eksisterer.

---

Har I styr på jeres "skjulte" infrastruktur?

#ITinfrastructure #CMDB #EnterpriseArchitecture #ITOperations

---

## Post 2: Migrationen Der Tog 18 Måneder

**Hook:** Budgettet sagde 3 måneder...

---

"Cloud-migrationen tager 3 måneder."

Det sagde konsulenten.

18 måneder senere var de stadig i gang.

Hvad gik galt?

Ingen havde overblik over afhængigheder.

De startede med at flytte en "simpel" applikation.

Den "simple" applikation:
- Kaldte 14 andre systemer
- Havde 3 undokumenterede database-forbindelser
- Brugte en fil-share ingen vidste eksisterede
- Var afhængig af en Windows-service fra 2009

Hver gang de flyttede noget, gik noget andet i stykker.

3 måneder blev til 6.
6 blev til 12.
12 blev til 18.

Budgettet? Tredoblet.
Morale i IT-afdelingen? Ødelagt.
Tillid fra ledelsen? Væk.

Hele projektet kunne have været undgået med én ting:

Et komplet overblik FØR de startede.

---

Næste gang nogen siger "det tager 3 måneder" - spørg dem: "Har I kortlagt alle afhængigheder?"

#CloudMigration #ITProjects #LessonsLearned #DigitalTransformation

---

## Post 3: Den Ene Person Der Vidste Alt

**Hook:** Hans navn var Lars.

---

Hans navn var Lars.

Lars havde været i virksomheden i 23 år.

Lars vidste alt.

- Hvorfor serveren i kælderen ikke måtte genstartes om tirsdagen
- Hvilke 3 systemer der gik ned hvis man patchede firewall'en
- Password til den gamle AS400 (det eneste sted kundedata fra før 2010 lå)
- Hvorfor Job #47 i scheduleren ALDRIG måtte slettes

Lars var virksomhedens Wikipedia.

Så sagde Lars op.

De havde 2 ugers opsigelse til at dokumentere 23 års viden.

Resultat:
- 3 systemer gik ned første uge efter Lars stoppede
- 2 måneders kaos med at rekonstruere viden
- 1 kritisk kundesystem ingen kunne vedligeholde

Den "billige" løsning (at lade Lars huske alt) kostede dem 6 måneders produktivitet.

---

Spørgsmål: Hvem er jeres Lars? Og hvad sker der når de stopper?

#KnowledgeManagement #DocumentEverything #SinglePointOfFailure #ITRisk

---

## Post 4: Audit-Mareridtet

**Hook:** "Vis os jeres infrastruktur." De havde 48 timer.

---

Fredag kl. 14:

"Vi kommer mandag til audit. Vi skal se komplet overblik over jeres infrastruktur."

De havde 48 timer.

IT-chefen ringede i panik.

Problemet: Deres "dokumentation" var:
- Excel-ark fra 2019 (måske opdateret)
- Visio-diagrammer der ikke matchede virkeligheden
- Et whiteboard i serverrummet med post-its
- Lars' hoved (se post #3)

Weekenden så sådan ud:
- Fredag aften: Panik-møde
- Lørdag: Manuel scanning af netværk
- Søndag: Desperat forsøg på at samle data
- Mandag morgen: Print 47 sider "dokumentation"

Audit-resultat: "Utilfredsstillende kontrol over IT-aktiver."

Konsekvens: 6 måneders intensiv oprydning. Under opsyn.

---

Den rigtige løsning? Kontinuerlig auto-discovery.

Så er du altid audit-ready.

#ITAudit #Compliance #ITGovernance #CMDB #AutoDiscovery

---

## Post 5: Shadow IT - 200 Ukendte Cloud-Instanser

**Hook:** CTO'en troede de havde 30 cloud-servere.

---

CTO: "Vi har fuld kontrol over vores cloud. Cirka 30 instanser i Azure."

Virkelighed: 230 instanser. Spredt over Azure, AWS, og GCP.

Hvordan?

- Marketing havde oprettet deres egen AWS-konto til "et lille eksperiment"
- En udvikler testede noget i GCP - og glemte at slukke
- Salg kørte deres CRM-integration på en personlig Azure-konto
- 47 "midlertidige" test-servere fra 2022 kørte stadig

Månedlig cloud-regning de kendte til: 45.000 kr
Reel månedlig udgift: 180.000 kr

Det værste?

12 af instanserne indeholdt kundedata.
Uden for deres compliance-perimeter.
Uden backup.
Uden sikkerhedsopdateringer.

---

Shadow IT er ikke et "nice-to-have" problem at løse.

Det er et sikkerhedshul, et compliance-problem, og en pengelomme der lækker.

#ShadowIT #CloudGovernance #ITSecurity #CloudCost #FinOps

---

## Bonus: Template til egen historie

```
Hook: [Dramatisk one-liner]

---

[Kontekst - hvad troede de]

[Virkelighed - hvad var sandt]

[Konsekvens - hvad gik galt]

---

[Morale/CTA]

#relevante #hashtags
```

---

## Tips til posting

1. **Timing:** Tirsdag-torsdag, 8-10 eller 12-14
2. **Format:** Korte linjer, masser af whitespace
3. **Engagement:** Stil spørgsmål til sidst
4. **Hashtags:** 3-5 relevante
5. **Billede:** Overvej simpel grafik eller screenshot
