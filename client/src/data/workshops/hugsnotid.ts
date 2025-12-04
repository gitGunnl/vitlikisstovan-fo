import { Workshop } from "./types";

export const hugsnotid: Workshop = {
  name: "Vitlíkisverkstova",
  company: "Hugskotið",
  labs: [
    {
      id: "innovation-lab",
      name: "Venjing 1: Nýtslu spurtur",
      description: "Hvat kann TÚ nýta ChatGPT til?",
      steps: [
        {
          title: "Stig 1: Ein samrøða við vitlíki",
          description: "Koyr fyrst ChatGPT á vanliga GPT 5.1 myndilin. Um tú hevur nakra fílu sum lýsur teg, so kann tú skoyta hettar uppí nú. Kopiera so byrtið niðanfyri og koyr tað inn í ChatGPT og send. Svara síðan spurningunum, sum verða settir.",
          prompt: `
        Du er en **neutral, professionel interviewer** med det formål at forstå personens arbejde **dybt og konkret**. Denne indsigt skal gøre det muligt for en kollega at kortlægge detaljerne til potentielle AI/ChatGPT-anvendelser i næste trin. På dette stadie må du **aldrig** foreslå løsninger eller bringe AI-brug op – din eneste opgave er at stille spørgsmål og indsamle information.

        ---

        ### Rolle og adfærd (prioriteret)
        1. **Neutral interviewer:** Stil kun spørgsmål; ingen rådgivning eller forslag.
        2. **Struktureret og effektiv:** Gennemgå de vigtigste områder systematisk: rolle, kalender, opgaver, kommunikation, artefakter, workflows, værktøjer, regler, smertepunkter, ønskeliste.
        3. **Kort og klart:** Spørgsmålene skal være præcise, lette at svare på og uden fagjargon.

        ---

        ### Plan for interviewforløb
        Begin with a concise checklist (3-7 bullets) of de primære delopgaver i interviewet:
        - Etablere grundlæggende rolle/kontekst
        - Udforske centrale arbejdsområder og processer
        - Indsamle eksempler og detaljer om opgaver
        - Optegne eksisterende værktøjer, artefakter og workflows
        - Identificere smertepunkter og ønskeliste
        - Opsummere relevante arbejdsmønstre
        - Validere forståelse løbende
        Følg denne konceptuelle struktur, men tilpas rækkefølge og fokus ud fra samtalens indhold.

        ### Sådan gennemfører du interviewet
        - **Stil & tempo:**
          - Stil **1-2 præcise spørgsmål ad gangen**.
          - Formuler dem, så de besvares i **2-5 sætninger eller korte bullets**.
          - Undgå både alt for brede ("Fortæl alt om…") og snævre ("Hvilken knap?") spørgsmål.

        - **Arbejdsnoter (Working Notes):**
          - Hold korte **Arbejdsnoter**, opdateret ca. hver **2-3 interaktioner** (kun bullets).
          - Brug dem til at holde styr på det væsentlige; vis dem kun ved korte recaps.
          - Ved risiko for misforståelse, brug eksempelvis:
            - "Jeg har forstået X → Y → Z. Har jeg fanget det rigtigt?"

        - **Post-action Validering:**
          - Efter hver større afklaring eller opdatering af Arbejdsnoter, valider forståelsen kort i 1-2 linjer og tilbyd at afklare evt. uklarheder, før du fortsætter til næste emne.

        - **Varighed:**
          - Fortsæt interviewet, indtil personen beder dig stoppe **og** giver dig din næste opgave.

        - **Sikkerhed & privatliv:**
          - Anmod om **anonymiserede/redigerede** eksempler, hvis det gavner forståelsen.
          - Bed **aldrig** om adgangskoder, login, personnumre eller andre fortrolige oplysninger.

        - **Sprog:**
          - Tilpas sprog og tone som brugeren (dansk, engelsk mv.).
          - Brug **klar og enkel dansk** ved tvivl.

        ---

        ### Hvad du især skal lytte efter
        *(Brug kun som linse for dine spørgsmål – du må stadig ikke foreslå løsninger)*
        - Tunge skrive- og omskrivningsopgaver
        - Opsummering af dokumenter, e-mails, møder
        - Idégenerering & sparring
        - Syntese & videnhentning
        - Klassifikation, tagging, routing af henvendelser
        - Datahåndtering (udtræk af info fra tekst/tal/diagram)
        - Kundekommunikation/support
        - Oversættelse & tone-skift
        - Planlægning & koordinering
        - Repetitive processer med klare input/output
        - Dokumentoprettelse fra skabeloner

        ---

        ### Dækningsområder (metodisk gennemgang)
        1. **Rolle & kontekst:** titel, team, forretningsområde, mission, succeskriterier
        2. **Kalender-realitet:** faste møder, deadlines, sæson/årshjul
        3. **Daglige/ugentlige opgaver:** frekvens, volumen, varighed, input/output
        4. **Kommunikation:** samarbejdspartnere, kanaler, typiske beskeder
        5. **Artefakter:** dokumenter, regneark, præsentationer, systemer
        6. **Workflows & godkendelser:** rækkefølge, overleveringer, beslutningspunkter
        7. **Værktøjer & systemer:** M365/Google, CRM/ERP, fagsystemer, tickets, datakilder
        8. **Regler & begrænsninger:** compliance, fortrolighed, kvalitetskrav, SLA/KPI’er
        9. **Smertepunkter:** flaskehalse, fejl, ventetid, copy-paste-arbejde
        10. **Ønskeliste & idealbillede:** hvad "rigtig godt" ville være (uden at nævne AI)

        ---

        ### Spørgsmål-heuristikker (Guldhårs-testen)
        - Omformulér "Fortæl om X" til fx:
          - "I en typisk uge, hvor mange X? Hvor lang tid varer de? Hvad adskiller en nem fra en svær?"
        - Kvantificér hvor muligt:
          - "Circa hvor mange om ugen? Minutter pr. opgave? Hvor stor andel skal rettes/godkendes?"
        - Følg processen:
          - "Hvad er inputtene? Hvor kommer de fra? Hvad sker derefter? Hvem bruger output?"
        - Stil spørgsmål om variation:
          - "Hvad er de 3 mest almindelige undtagelser? Hvor tit sker de?"

        ---

        ### Arbejdsnoter (struktur)
        Opdater løbende bullets som:
        - **Rolle & mål:** …
        - **Højvolumen-opgaver (frekvens/tid):** …
        - **Artefakter & værktøjer:** …
        - **Workflows & beslutningspunkter:** …
        - **Begrænsninger/KPI’er:** …
        - **Observeret friktion:** …
        Vis kun Arbejdsnoter ved recaps, og brug "Har jeg fanget det rigtigt?" kun hvor reel misforståelsesfare er til stede.

        ---

        ### Vigtig begrænsning
        Du må **aldrig** i interviewet foreslå eller beskrive, hvordan ChatGPT/AI kan hjælpe. Din opgave er udelukkende at indsamle **præcis og grundig kontekst** til senere analyse.

        ---

        ### Startlogik
        **Hvis brugeren har vedhæftet en fil med baggrundsinformation (rolle, team, ansvar eller arbejdskontekst):**
        1. **Læs filen grundigt før interviewet.**
        2. **Integrér filens indhold** i din indledende forståelse.
        3. **Tilpas dine første spørgsmål,** så du undgår at spørge om ting, filen allerede forklarer.
        4. Brug filen til et første udkast til **Arbejdsnoter**.

        **Hvis der ikke er vedhæftet en fil:**
        - Hilse kort, forklar din rolle, og stil disse åbningsspørgsmål:

        1. "Hvad er din **rolle/titel**, og hvilket **team/område** arbejder du i? Kan du i én sætning beskrive jeres **overordnede mission**?"
        2. "Gennemgå en **typisk uge**. Hvad er de **3 vigtigste tilbagevendende opgaver**, som tager mest af din tid?"

        **Start nu.**


                    `,
          requiresConfirmation: false
        },
        {
          title: "Stig 2: Samandráttur (við Thinking-modellinum)",
          description: "Skift fyrst til 'Thinking'-modellið. Kopiera samandráttar birtið niðanfyri, set tað aftast í somu samrøðu, sum tú júst hevði við ChatGPT, og send.",
          prompt: `
        Stop interviewet nu og opsummér mit arbejde udelukkende ud fra den information jeg har givet dig. 

        Din opgave er at producere et detaljeret, velstruktureret resumé, der kan bruges som grundlag for at finde ChatGPT-anvendelser senere.

        Brug kun information, der kommer direkte fra mine input. 
        - Ingen gæt, ingen udfyldning af huller.
        - Hvis noget ikke er nævnt, så lad det være usagt.

        Returnér præcis disse sektioner og overskrifter:

        1) Rolle-overblik
           - Kort beskrivelse af hvad jeg gør, hvem jeg betjener, og hvilke hovedresultater jeg bliver målt på.

        2) Kerneansvar
           - Punktliste med stærke udsagnsord i starten (fx “Udarbejder…”, “Koordinerer…”, “Godkender…”).
           - Én linje pr. punkt.

        3) Tilbagevendende workflows & leverancer
           - For hvert workflow: beskriv typiske input → output (hver del maks. 8 ord).
           - Angiv frekvens, hvis jeg har nævnt den (fx “ugentligt”, “dagligt”, “månedligt”).

        4) Værktøjer, systemer & begrænsninger
           - Punktliste over apps, systemer, datakilder, adgangsgrænser, compliance-/fortrolighedsforhold, jeg har nævnt.

        Generelle begrænsninger:
        - Ingen generelle påstande om AI.
        - Ingen råd, vejledning eller tutorials.
        - Ingen marketing-sprog eller “flotte” formuleringer – skriv nøgternt og konkret.
        - Ingen information, der ikke kan spores tilbage til noget, jeg faktisk har sagt.

                    `,
          requiresConfirmation: true,
          confirmationText: "Eg vátti, at eg havi fingið ein fullfíggjaðan samandrátt, lisið hann og staðfest, at hann er rættur."
        },
        {
          title: "Stig 3: Opna nýggjan glugga og fær aftur inn á ChatGPT",
          description: "Opna eitt nýtt vindeyga í kaganum og lat upp ChatGPT aftur. Læt fyrra vindeyga við samandráttinum vera opið.",
          requiresConfirmation: false
        },
        {
          title: "Stig 4: Deep Research",
          description: "Kopiera birti niðanfyri inn í nýggja ChatGPT-vindeyga, skoyt samandráttin inn har tað er merkt, tendra Deep Research og send so.",
          prompt: `
        Du skal bruge Deep Research til at skrive en samlet rapport til ledere om, hvordan personer i en given rolle faktisk bruger ChatGPT og lignende LLM-værktøjer i deres arbejde.

        Rollen beskrives her:

        <arbejds_beskrivelse>
        <------------Indsæt her--------------->
        </arbejds_beskrivelse>

        ---

        ## Formål

        Rapporten skal hjælpe en leder med at forstå:

        - Hvilke typer opgaver og arbejdssituationer folk i lignende roller bruger ChatGPT til.
        - De forskellige “arbejdsmåder”/roller, som ChatGPT typisk indtager i deres hverdag (du finder selv de bedste betegnelser ud fra kilderne).
        - Forskellen mellem:
          - Overfladisk brug (primært skrivning, omskrivning, opsummering) og  
          - Dybere brug, hvor ChatGPT bruges som reel sparringspartner, tænkende medspiller og beslutningsstøtte.
        - Hvad brugere typisk oplever som begrænsninger og faldgruber.

        Fokus: Rapporten skal være forklarende og narrativ, ikke en punktliste med “top 50 use cases”.

        ---

        ## Researchfokus (Deep Research)

        Brug dine Deep Research-evner til at:

        1. Identificere kilder, hvor personer med lignende roller beskriver, hvordan de bruger ChatGPT/LLM’er i praksis, fx:
           - Blogindlæg, personlige erfaringer, case stories.
           - Community-tråde og fora (Q&A, diskussionsfora, LinkedIn-indlæg m.m.).
           - Artikler, interviews og officielle eksempler, hvor konkrete arbejdssituationer gennemgås.

        2. Udlede mønstre:
           - Hvilke typer opgaver og situationer går igen?
           - Hvordan beskriver de interaktionen med ChatGPT (dialog, iterativ sparring, “rolle-spil” osv.)?
           - Hvor oplever de størst værdi? Hvor oplever de typisk skuffelse eller begrænsninger?

        3. Læg særlig vægt på kilder, hvor ChatGPT omtales som:
           - sparringspartner / medtænker,
           - problemløsningsmakker,
           - beslutnings- og refleksionsstøtte.

        Altså der, hvor værktøjet bruges til at tænke, strukturere og udvikle løsninger, ikke kun til at skrive pænt eller oversætte tekst.

        Hvis kilderne er uenige, eller der findes forskellige erfaringer, skal det tydeligt fremgå i rapporten.

        ---

        ## Inspiration til gode kilder (vejledende)

        Som del af din research kan du med fordel orientere dig mod:

        - Rollebaserede playbooks fra modelleverandører, fx:
          - OpenAI-materiale om “ChatGPT for work/for any role” og tilhørende prompt-pakker for specifikke funktioner.
          - Googles Gemini-materiale med “role-specific prompts & use cases” og Workspace-handbooks for forskellige roller.
          - Microsoft Copilot-guides om “top use cases by role”, “Copilot for work” og adoption-playbooks.
          - Claude-guides til almindelige use cases og prompt-biblioteker.

        - Kataloger og dossierer fra de store konsulenthuse, fx:
          - McKinsey-rapporter om økonomisk potentiale og funktionsopdelte GenAI-use cases.
          - Deloitte-dossier(er) med generative AI-use cases på tværs af brancher.
          - PwC’s interaktive “use case compass” og relaterede whitepapers.
          - Accenture, BCG, EY, KPMG og World Economic Forum-publikationer, der samler og strukturerer GenAI-anvendelser.

        Du skal ikke liste eller referere alle disse eksplicit; brug dem som inspiration og kildebase for at forstå de mest udbredte og modne mønstre på tværs af roller og brancher.

        ---

        ## Rapportens struktur

        Skriv en sammenhængende rapport i klart, enkelt dansk, rettet mod en travl leder. Brug overskrifter og korte underafsnit.

        Brug denne struktur:

        ### 1. Executive summary (ca. 1–1½ side)

        - Kort beskrivelse af rollen (som du forstår den ud fra <job_summary>).  
        - De vigtigste indsigter om, hvad folk i lignende roller faktisk bruger ChatGPT til.  
        - En klar forklaring af forskellen mellem:
          - Overfladisk brug (skrivning/opsummering), og  
          - Dybere brug (sparring, tænkning, beslutningsstøtte).  
        - 3–5 hovedpointer, som en leder bør tage med sig.

        ### 2. Rolle og arbejdskontekst (kort)

        - Din syntese af, hvordan rollen typisk arbejder: opgavetyper, ansvar, arbejdsrytme.  
        - Hvilke dele af arbejdet der ser ud til at være mest tekst-, viden- og beslutningstungt.  
        - Hvor der – ud fra kilderne – typisk opstår kompleksitet, usikkerhed og behov for sparring.

        ### 3. Typiske brugsmønstre for ChatGPT i lignende roller

        Beskriv de mest almindelige måder, folk bruger ChatGPT på i lignende jobs – som arbejdsmåder/roller værktøjet kan indtage, ikke som løse enkeltfunktioner.

        Del dette i to niveauer:

        3.1 Overfladiske brugsscenarier (første lag af værdi)  
        - Forklar, hvordan ChatGPT bruges til at skrive, omskrive, forkorte, oversætte og opsummere.  
        - Beskriv med ord, hvorfor det er nyttigt (tid, kvalitet, struktur) – men også hvorfor det kun er “første lag” af værdien.

        3.2 Dybere brugsscenarier (sparring, tænkning og beslutningsstøtte)  
        - Beskriv de arbejdsmåder, hvor ChatGPT bruges til fx:
          - at strukturere komplekse problemstillinger og cases,  
          - at udforske muligheder, scenarier og konsekvenser,  
          - at forberede beslutninger, møder og forhandlinger,  
          - at teste argumenter og modargumenter,  
          - at planlægge, designe og forbedre workflows, processer og kommunikation.
        - For hver arbejdsmåde:
          - Giv den et kort, men sigende navn (ud fra kilderne).  
          - Forklar hvad den går ud på, hvad den typisk bruges til, og hvorfor brugerne oplever høj værdi.  
          - Brug konkrete, kortfattede eksempler fra kilderne til at illustrere.

        ### 4. Begrænsninger og typiske faldgruber

        - Hvilke typer opgaver fortæller brugere, at ChatGPT ikke er godt til alene?  
        - Hvor ser de risiko (fx faktuel nøjagtighed, lokal lovgivning, compliance, domænespecifik viden)?  
        - Hvilke arbejdssituationer kræver, at mennesket bevarer kontrol, dømmekraft og ansvar?  
        - Beskriv typiske faldgruber og misforståelser (fx “AI som sandhedsorakel”) i tekstform – ikke som ren tjekliste.

        ### 5. Implikationer og refleksionsspørgsmål for kunden

        - Forklar, hvad denne viden betyder for en leder, der overvejer at udbrede brugen af ChatGPT i sin afdeling.  
        - Fremhæv især:
          - at den største værdi opstår, når medarbejdere lærer at bruge ChatGPT som sparringspartner og tænkende makker,  
          - at skrivning/opsummering er vigtige, men kun det første skridt.  
        - Afslut med 5–8 konkrete refleksionsspørgsmål, der hjælper lederen med at kigge på egne workflows og spørge fx:
          - “Hvor i vores arbejde kunne disse arbejdsmåder give mening?”  
          - “Hvor ville sparring og scenarie-tænkning med ChatGPT konkret aflaste os?”  
          - “Hvordan kan vi eksperimentere sikkert med dette – uden at gå på kompromis med compliance?”  
          - “Hvor skal vi ikke læne os for tungt op ad AI?”

        ---

        ## Kvalitetskrav

        - Skriv i et roligt, nøgternt, ikke-hypet sprog.  
        - Gør rapporten behagelig og hurtig at læse for en chef, med tydelige overskrifter og korte afsnit.  
        - Undgå punktlister over “use cases”; fokusér på typer af arbejde og måder at samarbejde med ChatGPT på.  
        - Inddrag konkrete eksempler fra dine kilder i kort form, og brug kildehenvisninger efter behov.  
        - Hvis der er usikkerhed eller uenighed i kilderne, så sig det direkte.

        Rapporten skal kunne læses selvstændigt af en leder, der aldrig har brugt ChatGPT før men kender til det, men som har stærk faglig forståelse for sin egen rolle og organisation.

        `,
          requiresConfirmation: false
        },
        {
          title: "Stig 5: Nýggjur gluggi og møguleikalisti",
          description: "Opna ein nýggjan glugga við ChatGPT. Kopiera birtið, fyll inn tín samandrátt. Broyt nú myndilin til [ChatGPT 5.1 Thinking] og send avstað. Skoðað so listan av møguleikum; er úrslitið skilagott? Stundum kemur modellið inn á skeiva leið; royn umaftur, um tað hendir.",
          prompt: `
        ## Introduktion

        Vi undersøger, hvordan sprogmodeller (LLM’er) kan automatisere opgaver i et kontormiljø på Færøerne. Målet er at finde opgaver, hvor automation strømliner arbejdsgange, sparer tid, fjerner kedeligt arbejde og sparer penge – især ved at bruge ChatGPT som **tænke‑partner og sparringspartner**, ikke kun som “dokumentmaskine”.

        Jeg vil have dig til at foreslå en liste med de **15** bedste ting, min klient kan bruge ChatGPT til. Her er information om klienten:

        <arbejds_beskrivelse>
        <------------Indsæt her--------------->
        </arbejds_beskrivelse>

        Nedenfor er vejledning om, hvilke typer opgaver ChatGPT er god til. Brug den til at forme dine ideer og undgå at foreslå ting, modellen ikke kan.

        <tasks_types>

        ### Hvad ChatGPT kan og ikke kan (2025)

        ---

        #### Introduktion

        ChatGPT er en alsidig sprogmodel, der er stærk til at strukturere, forklare, oversætte, brainstorme, spille roller, lave simple visualiseringer, lave research og støtte analyser. Den er bedst, når der er klare mål, konkrete input og et menneske, der kvalitetssikrer output. Nedenfor beskrives, hvad den typisk er **god til**, hvor den er **svagere**, og hvilke mønstre der giver mest værdi i praksis.

        ---

        ### Højværdimønstre (brug disse først)

        Når du foreslår anvendelser, bør du især lede efter opgaver, hvor ChatGPT:

        * **Hjælper mennesker med at tænke og beslutte**
          – fx strategisparring, scenarier, trade‑off‑analyser, prioritering.
        * **Omdanner rodede input til struktur**
          – fx planer, tjeklister, SOP’er, risikoregistre, skemaer, taxonomier.
        * **Forstærker tilbagevendende processer**
          – fx standardsvar, skabelonbaserede breve, faste rapporter.
        * **Understøtter flersproget arbejde (EN/DK ↔ FO)**
          – fx kladder på engelsk/dansk, efterfulgt af oversættelse til færøsk og kort menneskelig redigering.

        Når du vælger og rangerer ideer, skal du **prioritere disse mønstre** over ren “dokumentskrivning”.

        ---

        ### Mest værdifuldt: Sparring, beslutningsstøtte og tænke‑partner

        ChatGPT er særlig værdifuld, når den bruges som en interaktiv partner, der stiller spørgsmål, udfordrer antagelser og hjælper med beslutninger:

        * **Beslutnings‑ & strategisparring**
          God til at skærpe mål, synliggøre antagelser, udvide mulige løsninger og sammenligne trade‑offs for fx projektprioritering, bemanding, leverandørvalg og ændringer i retningslinjer/politikker.

        * **Kvalitetsfeedback på udkast**
          God til struktureret feedback på klarhed, logik, evidens, tone og konsistens – og til at hjælpe med at skrive korte, skarpe ledelsesresuméer.

        * **Rollespil & kommunikationstræning**
          God til at simulere kolleger, ledere, borgere/kunder eller andre interessenter, inkl. svære samtaler, indvendinger, forhandling og feedback‑dialoger.

        * **Kreativitet & idéudvikling**
          Meget god til idéspurt, laterale vinkler og mange mulige forslag til kampagner, forbedringer af arbejdsgange, nye servicekoncepter m.m.

        * **Risikotænkning & “hvad‑nu‑hvis”**
          God til pre‑mortems (“hvad kan gå galt?”), red‑teaming vs. steelmanning, scenarie‑skitser og konkrete forslag til risikoreduktion.

        * **Faglig forklaring & mikrosparring:** God til at forklare komplekse faglige emner i forskellige sværhedsgrader, give eksempler og små øvelser, så medarbejdere hurtigt kan sætte sig ind i nye regler, værktøjer eller metoder.

        * **HR‑ & udviklingssparring:** God til at beskrive roller og kompetenceprofiler, forberede MUS‑/udviklingssamtaler, formulere udviklingsmål og rolle‑spille svære HR‑dialoger.

        > **Vigtigt:** Når du senere foreslår anvendelser, skal **mindst 5** af de 15 ideer ligge i denne kategori (sparring / beslutningsstøtte / feedback / rolle‑spil / risikotænkning). Behandl disse som **kerne‑anvendelser**.

        ---

        ### Research & analyse

        * **Aktuelle faktaopslag med kilder:**
          God til at finde opdateret information via indbygget Search og give korte svar med kildehenvisninger, når emner ændrer sig over tid (fx regler, priser, datoer, nyheder).

        * **Fordybelsesresearch (multi‑step undersøgelser):**
          God til at planlægge en research‑sti, sammenholde flere kilder, syntetisere synspunkter og lave refererede sammenfatninger – med et menneske, der tjekker de vigtigste konklusioner. Prioritér research, der bruges til **konkrete beslutninger eller tilbagevendende opgaver**.

        * **Datafortolkning:**
          God til at forklare mønstre og indsigter fra brugerleverede tabeller, rapporter eller resumeer og foreslå simple nøgletal eller næste analytiske skridt.

        * **Avanceret dataanalyse (ADA / Python):**
          God til beregninger, hurtige prognoser og visualiseringer med tydelige antagelser, som et menneske derefter sanity‑checker.

        * **Logik‑, fejlslutnings‑ og bias‑tjek:**
          God til at gennemgå tekst for argumentationsfejl, uunderbyggede påstande og mulige bias og mærke “påstande, der kræver kilder”.

        ---

        ### Dokumentation & viden (sekundært og gentagende)

        Denne kategori er vigtig, men bør typisk **nedprioriteres ift. sparring og beslutningsstøtte**, medmindre opgaven er tilbagevendende og tidskrævende.

        * **At omdanne noter til struktur:**
          God til at gøre løse noter til tabeller, tjeklister, JSON/CSV‑skemaer, som kan genbruges.

        * **SOP’er & tjeklister:**
          God til at udkaste og vedligeholde standardprocedurer med klare roller, trin og forventede resultater.

        * **Content‑repurposing pipelines:**
          God til at omdanne én kilde (fx en rapport) til slide‑oversigt, manus og målgruppespecifikke opslag, mens kernebudskaber bevares.

        * **Regel‑ & politikfortolkning til praksis:** God til at forklare love, regler og interne politikker i almindeligt sprog for forskellige målgrupper og omsætte dem til tjeklister, FAQ og enkle beslutningstræer (ikke som juridisk rådgivning, men som støtte til forståelse).

        * **Dokumentopsummering & Q&A:** God til at læse et indsat dokument (fx rapport, kontrakt, notat), trække nøglepunkter ud, forklare indholdet i forskellige niveauer af detaljer og besvare konkrete spørgsmål til dokumentet.

        * **Mødeforberedelsespakker (uden mødedeltagelse):**
          God til agendaer, mål, talepunkter og forslag til smarte spørgsmål – baseret på input, du giver.

        * **E‑mail‑/trådresuméer:**
          God til at opsummere indsatte samtaler, udtrække beslutninger, actions og ansvarlige.

        * **Tværfaglig kommunikation:**
          God til at oversætte teknisk sprog til almindeligt sprog og tilpasse budskaber til forskellige målgrupper.

        * **Sags‑ & henvendelsestriage:** God til at klassificere indkomne henvendelser (e‑mails, formularer), foreslå prioritet og udkaste standardsvar eller tekst‑moduler, som medarbejderen kan tilpasse – uden at ChatGPT selv sender noget.

        * **Persona / user‑stories / JTBD:**
          God til at omsætte interview/antagelser til personas, user stories, acceptance criteria og målbare effekter.

        * **Lokaliserings‑QA (EN/DK → FO):**
          God til back‑oversættelse, håndhævelse af ordliste/glossar og tonekontrol på tværs af sprog – altid med et sidste menneskeligt tjek for færøsk kvalitet.

        * **Vidensarkitektur:**
          God til at kategorisere/tilføje tags til indhold samt foreslå taksonomier og navngivningskonventioner.

        * **Promptbibliotek & QA:**
          God til at udkaste genbrugelige prompts, rubrikker og stilguides og teste prompts for konsistens.

        * **Læringsmaterialer:**
          God til mikrokurser, quizzer og flashcards til onboarding eller policy‑træning.

        * **Dokumentations‑ & skrivesupport (sekundært):**
          God til at lave dispositioner, skrive første udkast og revidere for klarhed og tone – især når der er tale om **standardiserede/skabelonbaserede tekster**, ikke engangs‑emails.

        ---

        ### Drift & eksekveringsstøtte (ofte kombineret med sparring)

        * **Opgaveprioritering & organisering:**
          God til at gøre rodede todo‑lister til prioriterede oversigter, simple planer eller kanban‑opdelinger.

        * **Kapacitetsplanlægningsudkast (ingen kalenderkontrol):**
          God til at skitsere mulige fordeling‑scenarier af opgaver ud fra angivne begrænsninger og fairness‑hensyn, som mennesker senere lægger i kalenderen.

        * **Regneark/regex/SQL‑hjælp:**
          God til at formulere Excel/Sheets‑formler, regex‑mønstre og små SQL‑snipper med eksempler.

        * **Testcases & edgecases:**
          God til at opstille testscenarier for funktioner, processer eller politikker (ud over klassiske unit‑tests).

        * **Proceskortlægning & forbedring:** God til at omsætte beskrivelser af arbejdsgange til simple procesflows, pege på flaskehalse og foreslå “as‑is” vs. “to‑be” forbedringer – ofte kombineret med sparring om konsekvenser.

        * **Risikoregistre:**
          God til at udkaste og vedligeholde risici, triggere, mitigeringer og ejere for igangværende projekter.

        > Mange af disse opgaver bliver endnu stærkere, når ChatGPT samtidig bruges som **sparringspartner** til at udfordre antagelser og valg.

        ---

        ### Billeder, kode & stemme (kun hvis relevant)

        * **Billedgenerering:**
          God til enkle illustrationer, mockups, ikoner eller “slide‑stemninger”, der støtter kommunikation.

        * **Billedinput:**
          God til at analysere skærmbilleder/diagrammer og finde struktur (fx skemaer fra et foto, simple CSS‑forslag ud fra et billede).

        * **Kodehjælp (små ting):**
          Meget god til små scripts og hjælpeværktøjer til fx datarensning eller simple automatiseringer – **ikke** til store, komplekse systemer.

        * **Stemme (Voice):**
          God til øvelse i tone og tempo, sproglig træning og håndfri brainstorming, hvis stemmetilstand er tilgængelig.

        > Foreslå kun billed‑, kode‑ eller stemme‑anvendelser, hvis de **klart matcher klientens kontekst** og er mere værdifulde end andre muligheder.

        ---

        ### Færøsk & sprogvejledning

        * **Forståelse vs. skrivekvalitet:**
          ChatGPT forstår færøsk udmærket, men skriver relativt svagere på færøsk. Kvaliteten bliver højere, hvis man **skriver kladder på engelsk eller dansk** og derefter **oversætter til færøsk** med kort manuel redigering.

        * **Standard‑workflow for FO‑tekster:**
          Antag som udgangspunkt, at:

          1. ChatGPT hjælper med at udvikle indhold på **engelsk eller dansk**,
          2. ChatGPT oversætter til **færøsk**,
          3. Et menneske laver en **kort sproglig og faglig gennemgang**.

        * **Ordliste & konsistens:**
          En lille ordliste over foretrukne færøske begreber forbedrer konsistensen; usikre begreber kan markeres til menneskelig vurdering.

        > Du må gerne foreslå arbejdsgange, hvor ChatGPT **udnytter EN/DK + FO‑kombinationen** (fx EN‑udkast → FO‑brevskabelon → menneskelig finpudsning).

        ---

        ### Værktøjstags til “How ChatGPT helps”

        I dine forslag skal du – når relevant – nævne, hvilke værktøjer der bruges:

        * **Search:** Indbygget web‑søgning til opdateret viden med kilder.
        * **ADA:** Advanced Data Analysis (Python) til beregninger, analyser og simple grafer.
        * **Image:** Billedgenerering eller billedforståelse (hvis slået til).
        * **Voice:** Stemmetilstand til øvelser, diktering og dialog.
        * **Sparring:** Interaktivt frem‑og‑tilbage, spørgsmål, rolle‑spil og kritik.

        ---

        ### Hvor ChatGPT er svagere (og typiske workarounds)

        * **Højpræcist udtræk på tværs af mange dokumenter:**
          Svagere til perfekt konsistente tal på tværs af store dokumentmængder; brug citater fra kilder og menneskelig verifikation af nøgletal.

        * **Kompleks eller reguleret analyse i stor skala:**
          Svagere på meget store datasæt eller højrisiko‑økonomi/statistik; brug ChatGPT til rammesætning, forklaringer og skitser, og lad specialværktøjer klare kerneanalysen.

        * **Meget lange dokumenter i ét hug:**
          Svagere til fuld konsistens i meget lange tekster; kvaliteten øges ved at arbejde i sektioner med en overordnet disposition og en afsluttende konsistensgennemgang.

        * **Direkte kontrol af værktøjer og systemer:**
          ChatGPT kan **ikke** styre kalendere, sende e‑mails, ændre data i systemer eller integrere direkte med virksomhedens it‑værktøjer. Det kan kun udkaste indhold, planer og forslag, som mennesker bagefter udfører.

        * **Live mødedeltagelse:**
          ChatGPT deltager ikke i møder eller lytter til møder på færøsk; det kan hjælpe med forberedelse og opsamling baseret på input, du giver.

        * **Forståelse af virkelig kontekst:**
          ChatGPT mangler fuld real‑world kontekst og bør typisk bruges til de **første ~80%** (idéer, strukturer, udkast). Mennesker vælger de bedste muligheder og tjekker, at det giver mening i praksis.

        ---

        ### Hvad der bør nedprioriteres i top‑15‑listen

        Medmindre der er en **meget stærk, klientspecifik grund**, bør følgende **ikke fylde** i top‑15‑listen:

        * Engangs‑opgaver som “omskriv denne ene e‑mail” eller små, sporadiske tekstrettelser.
        * Generiske blogindlæg eller sociale medier‑opslag uden klart forretningsmål.
        * Store, komplekse softwareprojekter eller hele systemer.
        * Meget nichepræget eller hårdt reguleret analyse, hvor specialister og systemer er afgørende.
        * Billed‑ eller kodeprojekter uden tydelig kobling til klientens kerneopgaver.

        ---

        ### Sådan vælger du de bedste anvendelser (selektionsheuristik)

        Når du vælger og rangerer ideer for denne klient, skal du foretrække opgaver, der:

        * Forekommer **ofte** (fx ugentligt eller månedligt).
        * Opleves som **kedelige, monotone eller tidskrævende** for mennesker.
        * Involverer **tænkning, vurdering eller trade‑offs**, ikke kun formatering.
        * Kan udføres **direkte i ChatGPT**, uden integrationer til andre systemer.
        * Har tydelige **tids‑ eller omkostningsbesparelser** eller forbedrer kvalitet/ensartethed.
        * Gør det **nemmere at træffe bedre beslutninger** eller at lære hurtigere.

        Brug disse kriterier – sammen med klientinformationen – når du vælger, hvilke ideer der skal på top‑15‑listen, og hvordan de skal prioriteres.

        </tasks_types>

        ### Din opgave

        Lav en **gennemtænkt liste med 15 ideer**, som min klient kan bruge ChatGPT til. **Rangordn dem efter nytteværdi** ud fra:

        * Tidsbesparelse
        * Lethed ved implementering
        * Hvor kedelig/monoton opgaven er (mere kedelig → højere prioritet)
        * Andre relevante faktorer for denne klient (fx kvalitet, risiko, læring)

        **Vigtige begrænsninger**

        * Foreslå **ikke** handlinger, der kræver at ChatGPT styrer kalendere, sender e‑mails, deltager i møder eller på anden måde tager direkte handling i eksterne systemer. Det kan den ikke.
        * Foretræk ideer, som klienten kan gennemføre **direkte i ChatGPT**, uden integrationer.
        * Inkludér **mindst 5 interaktive** ideer inden for **sparring/coaching/rolle‑spil** (beslutningsstøtte, feedback/kritik, rolle‑spil, brainstorming eller risikotænkning).
        * Brug vejledningen i <tasks_types> til at fokusere på de mest værdifulde mønstre (tænke‑partner, strukturering af rodede input, tilbagevendende processer og flersproget arbejde).

        **Output‑format (hold hvert punkt kort og konkret):**

        1. **Titel (fed)** — én sætning, der beskriver ideen.

           * **Hvorfor det er vigtigt:** (1 linje)
           * **Hvordan ChatGPT hjælper:** (1 linje;)
           * **Indsats:** Lav / Mellem / Høj

        Skriv ideerne kort, konkrete og tilpasset denne klient. Undgå generiske forslag som “omskriv min e‑mail”, medmindre det i denne klients kontekst er **ekstraordinært** værdifuldt og tilbagevendende.

                    `,
          requiresConfirmation: true,
          confirmationText: "Eg havi skoðað listan og vátti, at hann gevur skilagóðar møguleikar (ella at eg royndi umaftur, tá ið tað ikki gjørdi tað)."
        },
        {
          title: "Stig 6: Bygg víðari – partur 1",
          description: "Kopiera birti niðanfyri og send.",
          prompt: "Rigtig godt. Nu vil jeg gerne have, at du tænker ud af boksen. Lav en ny analyse af opgaver, som min klient kan bruge ChatGPT til. I denne analyse vil jeg have dig til at finde opgaver, der kunne revolutionere deres arbejdsliv og branche. Giv disse ideer en vurdering af, hvor svære de er at implementere, og hvor stor en positiv effekt de kunne have på deres arbejdsliv. Præsenter de 3 bedste ideer, du finder.",
          requiresConfirmation: false
        },
        {
          title: "Stig 7: Bygg víðari – partur 2",
          description: "Kopiera birtið niðanfyri inn í sama kjatt og send.",
          prompt: `
                    Rigtig godt. Nu, en sidste gang: Slip alle forudfattede meninger om, hvordan min klients opgaver bør løses, og giv mig en liste over revolutionerende måder at udføre deres arbejde på med AI, baseret på 'first principles'-tænkning.

                    Giv disse ideer en vurdering af, hvor svære de er at implementere, og hvor stor en positiv effekt de kan have på deres arbejdsliv. Præsenter de 3 bedste ideer, du finder.

                    Vær opmærksom på, at ideerne ikke må falde uden for det, de rent faktisk laver, men skal være forslag til, hvordan de kan udføre deres job på en helt ny og forbedret måde.
        `,
          requiresConfirmation: false
        },
        {
          title: "Stig 8: Ger listan",
          description: "Kopiera birtið inn í ChatGPT og send.",
          prompt: `Find nu på meget relevante metrikker til at måle effektiviteten af disse ideer. Gennemgå derefter alle ideerne, og ranger dem ud fra dine metrikker. Præsenter til sidst en sorteret liste over alle 21 idéer.`,
          requiresConfirmation: false
        },
        {
          title: "Stig 9: Skoyt uppí meira forkláring",
          description: "Kopiera birtið inn í ChatGPT og send.",
          prompt: `
        "Til sidst skal du tilføje følgende elementer til alle ideerne på listen:

        1.  **Idé-titel** – en kort, handlingsorienteret titel.
        2.  **Hvad det er, og hvad man får** – 2-3 sætninger, der forklarer, hvad brugeren skal bruge ChatGPT til, og hvilket konkret udbytte de får (f.eks. tydeligere e-mails, hurtigere resuméer, bedre beslutninger).
        3.  **Eksempel fra deres arbejde** – 2-4 sætninger, der beskriver en konkret situation fra klientens arbejdsuge. Gør det i eksemplet helt tydeligt, hvad brugeren skal indsætte i ChatGPT (f.eks. 'den seneste e-mail i tråden', 'dine stikord fra mødet', 'et rodet udkast'), og hvad de skal bede ChatGPT om at gøre med det.

        Hold hver beskrivelse kort og praktisk, så en kontormedarbejder med det samme kan se, hvordan de kan afprøve det i virkeligheden.

        Output nu den fulde færdige liste, klar til at printe.
                    `,
          requiresConfirmation: false
        },
        {
          title: "Stig 10: Send listan til Hannu.",
          description: "Um tit ynskja tað so kann Vitlíkisstovan hyggja eftir tykkara listar og gera teir til virðismikklar vegleiðingar tit altíð kunna hava hjá, tí kunnu tit senda listan við hugskotum til Hannu á [HACA@betri.fo], um tit ynskja ein tílíkan lista. ",
          requiresConfirmation: false
        },
        {
          title: "Stig 11: Liðugt – takk fyri!",
          description: "Hattar var venjingin – vónandi hevur tú nú ein góðan lista.",
          requiresConfirmation: false
        }
      ]
    }
  ]
};
