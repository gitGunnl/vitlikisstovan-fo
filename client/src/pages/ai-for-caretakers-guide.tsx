import { useEffect, useState, useMemo } from "react";
import type { ReactNode } from "react";
import { Link } from "wouter";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, Copy, Check, PenTool } from "lucide-react";

// --- Configuration & Content ---

const BLOG_TITLE = "Vitlíki til røktarfólk: Minni skriviarbeiði, meira spæl.";
const BLOG_DESC = "Vegleiðing til námsfrøðingar um brúk av AI í dagligum arbeiði.";

const blogContent = `
# **Vitlíki til røktarstarvsfólk: Minni skrivstovuarbeiði, tryggari dagar, meira tíð til menniskju**

---

## **Tín dagur snýr seg um menniskju, ikki pappírsarbeiði**

Vit vita, at títt arbeiði fyrst og fremst er "á gólvinum". Tú ert til staðar saman við børnum, búfólkum og borgarum, og fært gerandisdagin at hanga saman – líka frá morgunmati og persónligari røkt til avtalur og ítriv. Hetta er tað týdningarmikla, menniskjaliga arbeiðið.

Men vit vita eisini, at ein stórur og vaksandi partur av degnum fer til skjalfesting.

* At skriva dagbókina, sum kann taka 15–30 minuttir fyri hvørja viðmerking.  
* At fyrireika vaktarskifti, viðhvørt uttan at vaktirnar umskarast, har tú mást líta á telefonina og skrivlig notat.  
* At dagføra dagbækur, talvur og virksemisætlanir.  
* At skjalfesta heilivág og halda skil á kvittanum.

Hetta er ein tíðarkrevjandi og ofta stressandi partur av arbeiðinum, sum kann geva kensluna av, at tú "rennur ímillum menniskju og pappírsarbeiði".

---

## **Hvat henda vegleiðing *veruliga* hjálpir við**

Henda vegleiðing hvørki kann ella skal avloysa tína fakligu meting, evni tíni  ella tína menniskjaligu umsorgan. Vitlíki kann ikki vera "á gólvinum" saman við tær.

Í staðin er henda vegleiðing sniðgivin at hjálpa tær við tí *skjalfesting*, sum stjelur tína tíð. Hon veitir tær trygg, ítøkilig "byrt" (prompts), sum tú kanst avrita og brúka til at:

* **Skriva leyslig dagbókarnotat:** Umskapa tíni skjótu, grovu notat til eina professionella logbók eftir stuttari tíð.  
* **Skriva greiðari vaktaryvirlit:** Taka samanum høvuðspunkt til næstu vaktina – hvat er avgerandi, tá ið tit ikki møtast við vaktarskifti.  
* **Gera boð til avvarðandi og starvsfólk:** Skjótt at skriva vinaligar og greiðar dagføringar til portalar, talvur ella innanhýsis kjatt.  
* **Leggja virksemið til rættis og gera minnislistar:** Fá beinanvegin hugskot til ítriv ella ger praktiskar minnislistar (t.d. til eina útferð), tá ið tíðin er knøpp.

Málið er einfalt: at hjálpa tær at brúka minni tíð við knappaborðið og geva tær meira tíð aftur til tey menniskju, tú tekur tær av.

---

**Hvørjum er hetta ætlað:**

* Røktarstarvsfólk og hjálparfólk á dagstovnum, bústovnum og í eldrarøkt.  
* Tey, ið hava lítlar ella ongar royndir við vitlíki; brúka mest telefonina og einfalda tøkniliga útgerð.  
* Tey, sum eru í tíðarneyð og skulu hava skrivligar frágreiðingar at hanga saman við røktini (t.d. kunnu dagbøkur taka 15–30 minuttir; summar vaktir hava onga umskaran).  
* Tey, ið leita eftir skjótum loysnum, sum kunnu brúkast í dag (bert kjatt – ChatGPT, Copilot, Gemini).

**Ikki ætlað til:**

* **At avloysa tína fakligu meting ella umsorgan.** Vitlíki ger útkøst; **tú** eigur avgerðina.  
* **Heilsufakliga ráðgeving** (heilivágur, viðgerð) ella nakað, sum liggur uttan fyri tín leiklut.  
* **Arbeiði, sum krevur persónligar ella viðkvæmar dátur**, uttan so at tín arbeiðsgevari hevur útvegað eina góðkenda skipan, ið lýkur krøv til viðkvæma nýtslu.  
* **Samansjóðingar (integratiónir) ella sjálvvirkni.** Henda vegleiðing er bert til kjatt (avrita/líma).

---

## **Vís varsemi í sambandi við innlating (ongar persónligar dátur)**

**Ein einføld regla:** Um ein fremmandur kundi kann eyðmerkja eitt fólk út frá tí, tú skrivar inn, skalt tú ikki leggja tað í kjattið.

Hugsa um eitt postkort, ikki eitt afturlatið bræv. Almenn vitlíkisamboð kunnu samanberast við eina útvarpssending: tá ið tað er sagt, er tað úti. Brúka bert almenn ella navnleys inntøl, uttan so at tú ert heilt vís/ur í, at tú ert á eini góðkendari skipan hjá arbeiðsgevaranum.

### **Hvat er trygt at deila (grønt)**

* **Almennar støður** ("eitt búfólk gjørdist óróligt áðrenn døgurða").  
* **Navnleysar staðgongur** ("Barn A", "Búfólk B", "Stova 3").  
* **Samanumtiknir smálutir** (fyrrapart/seinnapart, "um døgurðatíð" í staðin fyri neyvar tíðir).  
* **Ikki-eyðmerkandi samanhangur** (aldursbólkar, bólkastødd, tilfar, veður).  
* **Íspunnin dømi** til at venja seg við byrt (prompts).

### **Hvat er ikki trygt (reytt)**

* **Nøvn, føðingardagar, bústaðir**, telefonnummur, teldupostar.  
* **Myndir ella andlit**, serligar tatoveringar/arr, p-tøl, journalnummur.  
* **Diagnosur, nøvn á heilivági/skamtan**, sjúkratekin, sum eru knýtt at einum nevndum persóni.  
* **Neyvar tíðarætlanir/avtalur**, sum peika á ein ávísan persón.  
* **Smálutir um tilburðir**, sum gera ein persón eyðkendan (t.d. "einasti koyristólsbrúkari í \[lítlari bygd\] kl. 10:17").

### **10-sekund kanning av persónsdátum**

* **Kann onkur uttan fyri toymið vita, hvør hetta er?** Um ja → **steðga**.  
* **Hevur arbeiðsgevari tín váttað eina góðkenda vitlíkis-skipan til persónsdátur á skrift?** Um nei → **ger tað navnleyst ella lat vera við at líma inn**.

### **Skjótur háttur at gera navnleyst (3 stig)**

1. Skift øll nøvn/ID út → **Barn A / Búfólk B / Starvsfólk C**.  
2. Ger eyðkenni ógreið → brúka **aldursbólkar**, **stovunummar**, **tíðarbil**.  
3. Tak sjáldsamar smálutir burtur (smáar bygdir, serligar hendingar) ella ger teir almennar.

**Vánaligur háttur →** "Anna Kristina Jensen, 83, datt á stovu 12 kl. 10:17, pínu í vinstru mjødn, fekk Panodil 500 mg." **Betri (tryggur) háttur →** "Búfólk B (80-árini) hevði eitt lítið fall í felagsrúminum seint fyrrapartin. Rólig eftir fyrstuhjálp og vanliga pínustillandi sambært ætlan; verður eygleitt." (Tú tillagar orðingina seinni í tíni almennu skipan).

**Niðurstøða:** Ert tú í iva, **lat tað vera**. Brúka vitlíki at **gera útkast til bygnað, tóna og hugskot** – og flyt síðan tín rættlisna tekst yvir í almennu skipanina.

## **Summir hættir at brúka vitlíki eru ov viðkvæmir**

Ávísir hættir at nýta vitlíki hava stórt potentiali at spara tíð – so sum sjálvvirkandi at skriva nágreiniligar dagbøkur, gera samandráttir av tilburðum ella neyva tíðarstýring. Men hesar uppgávur krevja vanliga handfaring av **persónligum upplýsingum (PII)**, so sum nøvn, neyvar dagfestingar ella serligar heilsusmálutir.

Í løtuni hava flestu stovnar framvegis ikki trygg, góðkend vitlíkisumhvørvi, sum eru sniðgivin at handfara hesi sløgini av viðkvæmum dátum trygt. Uttan hesar trygdarfyriskipanir er tað ov lætt at koma at deila privatar upplýsingar av óvart – sjálvt tá ið tú roynir at vera varin.

Av hesi orsøk hava vit valt **ikki** at taka vitlíkis-dømi við í hesa vegleiðing, sum byggja nógv á viðkvæmar upplýsingar, millum annað:

* **Nágreiniligar dagbøkur ella tilburðarfrágreiðingar**, sum beinleiðis brúka verulig notat við eyðmerkjandi smálutum.  
* **Neyv tíðarstýring**, sum fevnir um verulig nøvn á starvsfólkum ella borgarum og neyvar tíðir.  
* **Umsetingar ella samandráttir**, sum fevna um sjúkrasøgur ella nágreiniligar persónligar umstøður.

Vit mæla til at arbeiða fyri tryggum og góðkendum vitlíkis umhvørvum á tínum stovni. Tá ið hesar verjur eru komnar í lag, kanst tú brúka vitlíki til hesar virðismiklu uppgávur uttan váða fyri privatlívið.

**Men stúr ikki:** Sjálvt uttan hesar viðkvæmu uppgávur eru nógvir tryggir, praktiskir og hjálpsamir hættir, tú kanst fáa gagn av vitlíki beinanvegin. Tað er júst tað, henda vegleiðing fer at vísa tær.

---

## ***Soleðis kanst tú hugsa um vitlíki sum ein samstarvsfelaga***

Hugsa um vitlíki sum tín kreativa, men eitt sindur serliga starvsfelaga, sum kann taka á seg ávísar leiklutir, sum lýstir í hesi vegleiðing – so sum tín "Kreativi sparringspartnari", "Minnislista-vinur" ella "Samskiftishjálpari".

Vitlíki kann tykjast ótrúliga klókt, men tað fer altíð at sníkja óvæntað mistøk inn, so **hald fast við rórið**. Kanna altíð úrslitið frá vitlíki væl, serliga um tað snýr seg um týdningarmikið samskifti ella skjalfesting.

Deil ongantíð persónligar ella viðkvæmar smálutir um búfólk, børn, familjur ella starvsfelagar við vitlíki – hetta er ikki bara góður siður; **tað er lóg**. Halt tað navnleyst og alment.

Minst til, at vitlíki kennir ikki tína neyvu støðu, uttan so at tú sigur tað greitt. Ver týðilig/ur: "Eg eri hjálparfólk á \[arbeiðsplássi\] í Føroyum og arbeiði við fimm eldri búfólkum við ymiskum førleikum." Jú meira viðkomandi samanhang tú gevur – bólkastødd, umhvørvi, tilfar, avmarkingar – tess betri uppskot fært tú.

Føroyskt hjá vitlíki er ikki heilt feilfrítt enn. Um tú brúkar vitlíki til at skriva føroyskan tekst, **set altíð tíð av at lesa væl ígjøgnum og vænta at gera rættingar**. Men tá ið tú brúkar vitlíki til skjótt hugnám (brainstorming) ella bara at fáa hugskot til virksemi, hava stavimistøk og málfrøði minni týdning – fokusera heldur á góðskuna og gagnið í hugskotunum.

**Gott ráð:** Goym eitt notat við lýsing av tínum vanliga arbeiðsumhvørvi (t.d. bólkastødd, førleikar, tøkt tilfar, høli og støð, sum tit ofta vitja), sum tú lættliga kanst líma inn í vitlíkis-kjattið. Hetta hjálpir tær at fáa skjótari og betri tillagað úrslit hvørja ferð.

## **Kreativur sparringspartnari (Virksemi & Ætlanir)**

Sum hjálparfólk eru dagar tínir fyltir við røktaruppgávum – frá persónligari hjálp og dagligum rutinum til skipað virksemi og løtur í samveru. At finna nýggj, fangandi hugskot til virksemi í skundi, kann vera avbjóðandi, serliga við avmarkaðari tíð og tilfari. Vitlíki virkar sum kreativi starvsfelagi tín, sum beinanvegin kemur við praktiskum, brúkbarum uppskotum, sum eru neyvt tillagað tínum umhvørvi og avmarkingum. Annaðhvørt ætlanir tínar broytast brádliga, tilfar manglar, ella tær bara tørvar íblástur, so gev vitlíki eitt skjótt yvirlit – bólkastødd, førleikar, tøkar ressursir og serligar avmarkingar – og lat tað kveikja livandi, veruligar møguleikar.

**Ímynda tær hesa støðuna:** Tað er ein skundmikil seinnapartur á bústovninum. Regn hevur forðað fyri ætlaða gongutúrinum. Tú situr nú inni við fimm óróligum vaksnum búfólkum, sum vanliga dáma væl at vera úti. Tit eru í einum lítlum felagsrúmi við grundleggjandi tilfari sum pappíri, pennum, spælikortum, bløðum og eitt sindur av klipp-og-klistra tilfari.

---

**Gott dømi um byrt (avrita/líma hetta):**
-- prompt --
Eg eri hjálparfólk á einum bústovni í Føroyum. Okkara gongutúrur varð avlýstur vegna regn.

* Luttakarar: 5 vaksin við ymiskum kognitivum og likamligum førleikum.  
* Umhvørvi: Lítið innandura felagsrúm.  
* Tøkt tilfar: Pappír, pennar, spælikort, bløð, eitt sindur av klipp-og-klistra tilfari.  
* Mál: At fáa búfólkini at gera okkurt, sum gevur meining næsta tíman, og at varðveita ein róligan og jaligan hýr.

Kom við uppskotum um okkurt innandura virksemi, sum krevur lítla fyrireiking, fevnir um øll, eru rólig og hóska til blandaðar førleikar. Spyr meg fyrst, um okkurt krevur nærri frágreiðing.
-- prompt --

**Uppfylgjandi byrt:** Um uppskotini ikki eru heilt, sum tú vilt hava tey, leiðbein so vitlíki greitt. Til dømis:

* "Kom við uppskotum um virksemi við enn einfaldari leiðbeiningum."  
* "Okkum dámdi væl søguhugskotið – gev okkum tvey rólig søgubygd virksemi afturat."  
* "Ger virksemini styttri, umleið 15 minuttir hvørt."

**Fleiri møguleikar fyri kreativari sparring**

Hesin leikluturin fevnir um meira enn bara at leggja virksemi til rættis – tað er tín partnari í skjótt at laga seg til broytandi umstøður:

* Tá ið **stemningurin í rúminum er spentur**, kanst tú biðja um róligari virksemi – so sum putlispøl, stýrdar frásagnir ella rólig handalig ítriv – fyri at skapa frið.  
* Um **vanligt tilfar manglar ella er avmarkað**, bið um broytingar, sum krevja minni útbúnað, t.d. at broyta pappírsklipp til einfaldar teknivenjingar ella prát út frá prentaðum myndum.  
* Tá ið **starvsfólkatal ella tøkt pláss broytist**, kann vitlíki skjóta upp tillagað virksemi, ið hóska til færri starvsfólk ella smærri rúm, og tryggja virksemið uttan eyka strongd.  
* Vitlíki kann enntá stuðla stuttum løtum sum **prát í matarsteðgum**, við at geva einføld evni ella spurningar, sum varliga stimbra samrøðu og felagsskap millum búfólkini.

So hvørt sum tú roynir teg fram og betrar samskiftið við vitlíki, gerst tað ein álítandi kelda til hugskot – ein, sum hjálpir tær at halda arbeiðið smidligt, viðkomandi og veruliga fangandi.

Tú kanst síggja fleiri dømi um byrt í partinum "Nógv fleiri dømi".

### **Minnislista- og mannagongdsvinur**

Sum røktarstarvsfólk er dagurin fullur av smáum, men týðandi uppgávum. Frá persónligum stuðli til at at samskipa tíðarætlanir – tín heili er altíð "tendraður".

Tá ið dagurin ikki er vanligur – t.d. ein snimm byrjan, ein serlig útferð ella ein broyting í síðstu løtu – er tað stressandi at royna at minnast hvønn einasta smálut. Tað er lætt at gloyma smáting, men týdningarmikið.

Her kann eitt vitlíkisamboð vera ein stór hjálp.

Hugsa um tað sum ein praktiskan hjálpara, ið ger júst tann minnislistan, tær tørvar *her og nú*. Í staðin fyri at líta á minnið ella ein standard pappírslista, sigur tú bara vitlíki, hvat hendir. Tað ger síðan ein sergjørdan stig-fyri-stig minnislista til júst hesa støðuna.

**Her er eitt gott dømi:**

Ímynda tær, at tú og ein starvsfelagi hava eina tíðliga avtalu við trý búfólk á heilsumiðstøðini í morgin. Tit skulu fara, áðrenn vanliga vaktin byrjar, so morgunin kennist stressandi. Veðurforsøgnin sigur kalt og vind, og tit taka hýruvogn.

Fyri at tryggja, at einki verður gloymt, leggur tú nakrar avgerandi veruligar smálutir afturat: **eitt av búfólkunum, Frú P, hevur tørv á sínum samanleggjandi gongustativi, og Harra H, verður ógvuliga stúrin undir flutningi og er bundin av sínum serliga útvarps-headsetti.** Tú biður vitlíki hjálpa tær at fyrireika kvøldið fyri.

#### **⭐ Gott dømi um byrt (avrita/líma hetta)**
-- prompt --
Eg eri røktarstarvsfólk á einum bústovni. Vit skulu av stað í morgin árla.

* **Fráferð:** 07:30 (áðrenn vanliga vaktin byrjar)  
* **Fólk:** 3 búfólk, 2 starvsfólk  
* **Veður:** Kalt og vindur  
* **Flutningur:** Hýruvognur  
* **Serligir smálutir um búfólk:** Frú P skal hava sítt samanleggjandi gongustativ. Harra H má hava sítt útvarps-headsett (hann verður ógvuliga stúrin uttan tað).  
* **Týðandi notat:** Tak smápening við, váttan fyri hýruvogn, ongar persónligar heilsudátur her.

Vinarliga ger ein stuttan og praktiskan minnislista, sum vit kunnu fyrireika í kvøld, so morgunin í morgin verður róligari. Tryggja, at gongustativ og headsett eru við. Halt tað telefon-vinarligt (10–14 punkt). Tak eina einfalda Grøn/Gul/Reyð støðukanning við til síðst. Spyr fyrst, um okkurt krevur frágreiðing. Ongar persónligar dátur.
-- prompt --
---

### **Fá minnislistan heilt rættan**

Um fyrsti listin hjá vitlíki ikki er heilt rættur, sig so bara, hvat skal broytast. Ver greið/ur og neyv/ur.

* "Ger minnislistan styttri, í mesta lagi 8 punkt."  
* "Legg áminningar afturat viðvíkjandi veðrinum (regnskjól, vøttur)."  
* "Kom við uppskoti um eina einfaldari útgávu, sum bara fevnir um tað allar mest neyðuga."

---

### **🚀 Fleiri hættir at brúka tín minnislista-vin**

Hetta amboðið kann hjálpa tær at hava skil á ígjøgnum alla vaktina, ikki bara til morgunfyrireiking.

* **Fyrireiking av útferð:** Ger skjótt ein sergjørdan minnislista til *eina og hvørja* útferð. Upplýs vitlíki um veðrið, bólkastødd, tørv á hjálp til flyting (mobilitet) og flutning. Tað hjálpir til at tryggja eina góða og trygga fráferð hvørja ferð.  
* **Umsiting eftir útferð:** Ger ein einfaldan lista, sum minnir teg á, hvat skal goymast eftir eina útferð – so sum **kvittanir, notat í journalum hjá búfólkum** ella **smálutir um hýruvogn**. Tað heldur tína umsiting greiða og uttan stress.  
* **Vikuligir innkeypstúrar:** Ger ein innkeypslista út frá  **fíggjarætlan** tíni**, goymsluplássi, flutningi** og **komandi máltíðum**. Ongir gloymdir lutir ella skundmiklar avgerðir.  
* **Handverkaravitjanir:** Fyrireika ein skjótan lista til, tá ið hvs-maður ella elektrikari kemur á vitjan. Hann kann fevna um áminningar um at **verja privatlívið hjá búfólkum, rudda atgongd, tryggja trygdina** og **rudda upp eftir vitjanina.**

### **Málið: Minni mental byrða, meira menniskjalig røkt**

So hvørt sum tú venur teg við hetta, gerst vitlíki ein álítandi partnari. Tað snýr seg ikki um at avloysa tínar førleikar; tað snýr seg um at minka um "mentalu byrðuna" við at royna at minnast hvønn einasta smálut.

Hetta frígevur meira av tíni tíð og uppmerksemi til tað, sum veruliga hevur týdning: teir persónligu, menniskjaligu partarnar av røktini.

## **Samskiftishjálpari (starvsfólk og avvarðandi)**

Greitt og støðugt samskifti ger dagin lættari hjá øllum. Men at skriva stutt boð kann vera trupult, serliga tá ið tú hevur úr at gera ella ert troytt/ur. Hesin vitlíkis-hjálparin ger skjótt lættlesilig boð til vaktarskifti, áminningar og dagføringar. Tað sparir tær tíð og minkar um ivasemi – og letur teg fokusera meira upp á tey menniskju, tú tekur tær av.

### **Ímynda tær hesa støðuna:**

Vaktin á bústovninum endar um fimm minuttir. Tað er eingin umskaran á næstu vaktini, so tíni notat mugu vera greið. Tú hevur grov notat um, hvat hendi í dag, men tær tørvar ein stuttan, skipaðan samandrátt fyri at tryggja eitt gott vaktarskifti.

### **Gott dømi um byrt (avrita/líma hetta):**
-- prompt --
Umskapa hesi grovu notat til eitt vaktaryvirlit við 5 punktum:

**Uppseting:**

1. Hæddarpunkt  
2. Ávaringar/Ansa eftir  
3. Lidnar uppgávur  
4. Næstu uppgávurnar  
5. Tíðindi

**Valfrí seinasta linja:** Støða (Grøn/Gul/Reyð) \+ 1 grundgeving. **Mál:** Føroyskt fyrst (**ÚTKAST — FO**), síðan enskt. **Stílur:** Einfalt, nevtralt, eingi nøvn ella persónligir smálutir (brúka "Búfólk A/B"). Vinarliga spyr fyrst, um okkurt er ógreitt.

*(Líma tíni almennu notat inn her – ongar persónligar smálutir.)*

-- prompt --

### **Uppfylgjandi byrt:**

Um úrslitið ikki er heilt rætt, leiðbein so vitlíki eitt sindur meira/betur:

* "Ger punktini enn styttri."  
* "Legg dent á ta mest átrokandi uppgávuna."  
* "Greið frá Gulu støðuni týðiligari."

### **Fleiri hættir at brúka Samskiftishjálparan**

Hesin leikluturin hjálpir tær at handfara nógvar aðrar dagligar samskiftisuppgávur greitt og lætt:

* **Betra um tónan:** Umskriva skjótt eini boð fyri at beina burtur nei-ligar ella ógreiðar orðingar.  
* **Áminningar um avtalur:** Tak sjálvvirkandi týðandi smálutir við (møtistað, ting at taka við).  
* **Styttri SMS og kjatt:** Stytt longri notat, so tey hóska til SMS-mark (160 tekn) ella kjattboð.  
* **Áminning um kvittanir:** Send skjótar, vinaligar áminningar um at savna kvittanir inn, so smáar umsitingarligar uppgávur verða lættari.

Minst til: les altíð boð tíni væl ígjøgnum, áðrenn tú sendir ella goymir tey alment (t.d. í Word/Journal). Tak ongantíð persónligar upplýsingar við í almenn vitlíkisamboð – brúka navnleysar staðgongur ("Búfólk A/B") fyri at halda tingini privat og trygg.

Niðanfyri er allur kapittulin "Skjót byrt" (Quickfire Prompts), bygt á tey 10 virðismiklu hugskotini, vit valdu. Hann fylgir avtalaða mynstrinum og er klárur at avrita/líma inn í kjattamboð. **Trygd:** halt inntøl **almenn/navnleys** (brúka *Búfólk A/B* ella *Barn A*, tíðarbil, stovunummar). **Ongar persónligar dátur.**

---
## **Fleiri dømi**

### **Hvussu hesin kapittulin er bygdur — við skjótum dømum**

* **Endamál.** Hetta eru **íspunnar, men realistiskar støður**, sum vísa, hvussu **smáir, ítøkiligir smálutir** (rúm, tíð, avmarkingar) → **betri, skjótari vitlíkissvar**.  
    
  * *Dømi:* "Nakrar fáar linjur um rúmið, tíðarbil og avmarkingar betra úrslitini meira enn langir tekstir."


* **Samhaldsføst 3-parta kort.** Hvørt punkt \= **Heiti · Støða · Byrt**. Støður eru stuttar (2–5 setningar). Byrt eru **klár at avrita/líma** við greiðum krøvum til úrtøku.  
    
  * *Dømi um heiti:* "Fá hugskot til rólig virksemi."  
  * *Dømi um støðu:* "Lítið rúm uppi á loftinum; kantinuvognurin skramblar kl. 10:15; einki glimmer; tvey-bank friðar-signal."  
  * *Dømi um byrt-leiðbeining:* "Skjót upp 3 møguleikar, sum dálka lítið... uppseting ≤1 min, 3 stig, ruddingarnotat."


* **Ítøkiligir, lokalir smálutir.** Brúka **íspunnar smálutir** (bygdir, tíðarbil, útgerð, serlig viðurskifti sum "vognur kl. 10:15", ljómandi veggir). Hetta venur vanan at geva vitlíki **gagnligan samanhang**.  
    
* **Strømm krøv til úrtøku.** Bið um **snið/avmarkingar** (t.d. nummareraðir listar, hámark fyri punkt, *Føroyskt fyrst (ÚTKAST—FO), síðan enskt*, uppseting ≤1 min). Strømm krøv minka um rættivinnuna seinni.  
    
* **Mál \+ trygdarleiðbeiningar.** Sig "Svara á natúrligum føroyskum" og "Ongar persónligar dátur." Brúka staðgongur sum "**Búfólk A/B**" ella "**Barn A**."

---

### **Tvey mini-dømi (bygnaður \+ stílur)**

**Heiti:** Rólig skifti í eini larmandi tíð
**Støða:** Í **Skálavík** hevur tú 30 minuttir áðrenn døgurða í einum lítlum rúmi uppi yvir køkinum. Grýtur byrja at skrambla umleið **kl. 11:05**, gólvið ljómar, tá ið stólar verða fluttir, og bólkurin brúkar eitt tvey-bank friðar-signal. Tú sleppur tær undan glimmeri vegna reglur um niðurrensl. Hesar smálutir hjálpa vitlíki at skjóta upp stillari virksemi, ið eru skjót at fyrireika, og sum veruliga hóska til rúmið. 

**Byrt:**
-- prompt --
Skálavík — 30 minuttir við 10 børnum (3–4 ár) í einum lítlum rúmi á loftinum. Køkslarmur byrjar \~11:05; ljómandi gólv; friðar-signal \= tvey sein fingrabank. Einki glimmur (reglur um niðurrensl). Tema: Lív í sjónum. Tilfar: feittlitir, A5 pappír, maskeringstape, plastlok, mjúkir kubbar. Skjót upp 3 friðarlig virksemi, sum dálka lítið. Fyri hvørt: uppseting ≤1 min, 3 barnavinarlig stig, eitt skjótt ruddingarnotat, og eitt føroyskt↔enskt orðapar (t.d. "alda / wave"). Svara á natúrligum føroyskum. Ongar persónligar dátur.
-- prompt --

**2\) Heiti:** Kunningarskriv til foreldur um havnarvitjan **Støða:** Í **Fuglafirði** vitjar flokkurin bjargingarstøðina **09:45–11:15**. Fjøra (lágvatn) umleið **10:30** gevur hálan tara við rampuna, havnarfloytan kann ljóða **kl. 11:00**, og myndir av útgerð eru loyvdar, men ikki av børnum. Hesir smálutir lata vitlíki skriva eina stutta kunning, sum svarar teimum spurningum, foreldur sannlíkt hava, frammanundan. 

**Byrt:**
-- prompt --
Vitjan á bjargingarstøðini í Fuglafirði — Hós 20\. nov, 09:45–11:15. Útgerð: regnklæðir, gummistivlar, matarstegður. Fjøra \~10:30 (hált av tara); floytan kann ljóða kl. 11:00; sjálvboðin bjargingarvestaframvísing; myndir bert av útgerð (ongar barnamyndir). Skriva eina stutta, praktiska kunning til foreldur, sum fevnir um tíð, útgerð, matarsteðgir, heinting og samband. Svara á natúrligum føroyskum. Ongar persónligar dátur.

Endurnýt hetta mynstrið: **heiti á uppgávuni**, **stutt støðulýsing við ítøkiligum avmarkingum**, **stramt byrt við krøvum til snið \+ mál/trygdarleiðbeiningar**. Skift uppspunnu smálutirnar út við tínar egnu.
-- prompt --
---

## **Skjót byrt: Realistisk dømi at hvessa tínar vitlíkisførleikar (røktarstarvsfólk)**

Niðanfyri finnur tú eitt savn av dømum um støð – íspunnin, men tætt at veruligum støðum, sum føroysk **røktarstarvsfólk** møta dagliga á dagstovnum, bústovnum og í eldrarøkt. Hvørt dømi vísir, hvussu tað at leggja **greiðan, ítøkiligan samanhang** (rúm, tíð, avmarkingar) afturat hjálpir vitlíki at geva **betri og meira tillagað svar**. Les støðurnar, avrita/líma síðan byrtini – skift tínar egnu smálutir inn fyri at fáa praktiska hjálp her og nú.

---

### **1\) Virksemis-sett at róa rúmið (bústovnur fyri vaksin)**

**Leiklutur:** Kreativur sparringspartnari

**Støða:** Tú ert í **Klaksvík** í eini felagsstovu **14:00–14:30**, beint eftir at vaskimaskinan er liðug. Turkitrumlan hurrar harðast umleið **14:05**, og gongshurðin gevru eit hvin, tá ið hon verður latin upp. Tú hevur eitt lítið borð, mjúkar blýantar, A4 pappír og eitt kortspæl. Við at geva hesar smálutir kann vitlíki skjóta upp **rólig, løtt-at-rudda** virksemi, sum hóska til larm- og plássavmarkingarnar og minka um yvirstimulering.

**Byrt:**
-- prompt --
Eg eri í Klaksvík við 5 vaksnum búfólkum (blandaðir førleikar). Klokkan er 14:00–14:30, beint eftir at vaskimaskinan er liðug (turkitrumlan hurrar \~14:05, gongshurðin hvínur). Vit hava eitt lítið borð, mjúkar blýantar, A4 pappír og spælikort.

Skjót upp 4 still, rólig virksemi, sum hóska til okkara rúm. Tak hetta við fyri hvørt:

* uppseting ≤1 min  
* 3 greið, løtt stig  
* skjót áminning um rudding  
* stutt notat, sum forklarar "hví hetta róar"

Svara á natúrligum føroyskum. Ongar persónligar dátur – brúka "Búfólk A/B".
-- prompt --
---

### **2\) Tiltakshugskot uttan tilfar**

**Leiklutur:** Kreativur sparringspartnari

**Støða:** Í **Tórshavn** (felagsrúm **10:15–10:40**) er goymsluskápið læst inntil **10:45**; eitt borð vaggar; stólar eru tungir at flyta. Tær tørvar fangandi møguleikar, sum bert brúka **stólar, hendur og røddir**. Við hesum avmarkingum kann vitlíki leypa um klipp-og-klistra hugskot og geva tær **møguleikar uttan tilfar**, sum tú kanst brúka beinanvegin.

**Byrt:**
-- prompt --
Í dag í Tórshavn er okkara goymsluskáp læst til klokkan 10:45. Nú er klokkan 10:15–10:40, og vit hava bara stólar tøkar (eitt borð er ov vaggut at brúka). Plássið er avmarkað, so virksemið má vera sitandi ella ógvuliga einfalt.

Vinarliga gev okkum 5 fangandi hugskot til virksemi uttan tilfar, hóskandi til blandaðar førleikar. Tak hetta við fyri hvørt:

* sitandi-vinarlig útgáva  
* trý einføld stig  
* uppskot til at falla til ró skjótt (30–60 sek)

Svara á natúrligum føroyskum. Ongar persónligar dátur – brúka "Búfólk A/B".
-- prompt --
---

### **3\) Fá starvsfólk / lítið-pláss-ætlan (sitandi rørsla)**

**Leiklutur:** Kreativur sparringspartnari

**Støða:** Í **Runavík**, **Stova 3N** er umleið **3,5 m × 4 m**; tú ert **einasta starvsfólk** til staðar. Vendiradius hjá koyristóli er knappur; fólk ganga framvið á gongini hvørjar **5 minuttir**; ein brandávaringar roynd er skrásett kl. **10:00** (stutt floyt). Við hesum detaljustigi kann vitlíki laga løtt rørsluspøl til tryggar **sitandi útgávur** við greiðum trygdarboðum.

**Byrt:**
-- prompt --
Eg eri einsamallur/einsamøll í Runavík (Stova 3N, ógvuliga lítið pláss, 3,5×4 m). Atgongd við koyristóli er avmarkað, fólk ganga framvið 5\. hvønn minutt, og tað er ein stutt brandávaringar-roynd (floyt) kl. 10:00. Okkum tørvar tvey varin sitandi rørsluvirksemis uppskot (8–10 min hvørt).

Fyri hvørt virksemi, veit:

* trygdarnotat til lítið pláss  
* 3 løtt-at-fylgja stig  
* valfríar truplari/lættari tillagingar  
* greiða "steðgiorð" leiðbeining

Svara á natúrligum føroyskum. Ongar persónligar dátur – brúka "Búfólk A/B".
-- prompt --
---

### **4\) Samrøðukort til matarsteðg**

**Leiklutur:** Kreativur sparringspartnari

**Støða:** Í **Vestmanna**, **11:20–11:40,** er matar-/kaffisteðgur í einum sólríkum horni. Fyrsta kavafrost í hesi vikuni; ferju-floytan hoyrist umleið **12:15**; útvarpstíðindi kl. **12:00** (halt ljóðstyrkina lága). At biðja um **varin, ítøkilig** evni hjálpir vitlíki at sleppa undan minnis-krevjandi spurningum og heldur tónan lættan og fevnandi.

**Byrt:**
-- prompt --
Vit eru í Vestmanna og hava ein 20-minuttir matar-/kaffi-steðg (11:20–11:40) við sólríka vindeygað. Tað er fyrsta kavafrost í hesi vikuni; ferju-floytan ljóðar umleið 12:15. Vit vildu fegin havt einføld, varin samrøðu-upplegg um "Veður & Árstíðir."

Vinarliga skjót upp 12 stutt, løtt-at-svara samrøðu-upplegg. Sniðgev hvørt sum: \[uppleggsspurningur\] \+ (valfríur uppfylgjandi spurningur)

Halt tað uppbyggjandi og ítøkiligt – ongar persónligar faktaupplýsingar neyðugar. Svara á natúrligum føroyskum. Ongar persónligar dátur.
-- prompt --
---

### **5\) Minnislisti til útferð (veður \+ mobilitet \+ hýruvognur)**

**Leiklutur:** Minnislista- & Mannagongdsvinur

**Støða:** Í **Sandavági** verður ein stuttur túrur í bygdarparkina klokkan **13:10–14:20**. Veðurforsøgn: **vindur og eitt sindur av regni**; gøtur eru hálar nærhendis bonkunum. Bólkur upp á 4 (blandað flytføri/ mobilitetur), 2 starvsfólk. Hýruvognur heintar **13:05**; bilstjórin vil helst hava **kortgjalding**; afturkomu-vindeyga ±10 minuttir. At siga vitlíki hesar ítøkiligu smálutir gevur ein **telefon-vinarligan lista**, sum tú veruliga kanst fylgja.

**Byrt:**
-- prompt --
Í morgin fara vit í bygdarparkina í Sandavági (13:10–14:20). Forsøgnin sigur vind og eitt sindur av regni, og gøtur nærhendis bonkum kunnu vera hálar. Vit eru 4 búfólk (blandað flytføri) \+ 2 starvsfólk, brúka hýruvogn (heinting 13:05, kortgjalding er ynskilig).

Vinarliga ger ein praktiskan útferðar-minnislista (10–14 punkt) bólkað eftir:

* Kvøldið fyri  
* Við dyrnar  
* Í hýruvogninum

Tak eina einfalda Grøna/Gula/Reyða støðukanning við eini grundgeving. Svara á natúrligum føroyskum. Ongar persónligar dátur – brúka "Búfólk A/B".
-- prompt --
---

### **6\) Umsitingarlig avgreiðsla eftir útferð**

**Leiklutur:** Minnislista- & Mannagongdsvinur

**Støða:** Aftur á **Tvøroyri** umleið **11:30** eftir tvey støð, tú hevur leysar kvittanir, ein posa at pakka út, og smálutir um hýruvogn at logga. Køliskápið er nærum fult og etikettir til leivdir mangla. Við hesum smálutum kann vitlíki skjóta upp eina **8–10 punkt avgreiðslu**, sum ruddar leysar endar skjótt og forðar fyri, at upplýsingar verða burtur.

**Byrt:**
-- prompt --
Vit eru júst komin aftur (\~11:30) frá einum innkeypstúri á Tvøroyri. Eg havi leysar kvittanir, ein posa, sum ikki er pakkaður út, hýruvogns-smálutir at logga, eitt næstan fult køliskáp, og ómerktar leivdir.

Ger ein skjótan avgreiðslu-minnislista (8–10 punkt), sum fevnir um:

* kvittanir  
* stutt notat-plásshaldari til almenna logging  
* hýruvogns-smálutir  
* køliskápskanning \+ merking av leivdum  
* mistir/funnir lutir  
* stutt (2-min) eftirmetingar-notat

Svara á natúrligum føroyskum. Ongar persónligar dátur – brúka "Búfólk A/B".
-- prompt --
---

### **7\) Vikuligur innkeyps-ráðleggjari (fíggjarætlan & goymsla)**

**Leiklutur:** Minnislista- og Mannagongdsvinur

**Støða:** Í **Norðragøtu**, vikuligt innkeyp er **Týs 10:15–11:15** við bussi. **Fíggjarætlan 700 kr**, lítið køliskáp/frystiboks, avmarkað turrgoymsla. Húsregla: hav **laktosufría mjólk** og **nøtufrítt snarl** tøkt (regla, ikki persóns-ítøkiligt). Hesar avmarkingar hjálpa vitlíki at halda listan veruligan og **fíggjarliga tilvitaðan**.

**Byrt:**
-- prompt --
Vit hava okkara vikuliga innkeypstúr í Norðragøtu (týsdag, 10:15–11:15 við bussi). Fíggjarkarmurin er 700 kr, og goymslupláss (køliskáp/frystiboks/turr) er lítið. Húsreglur: hav altíð laktosufría mjólk og nøtufrítt **(snarl) …hvat er hetta “SNARL”???** tøkt.

Vinarliga skjót upp ein greiðan innkeypslista bólkaðan sum:

* Skal keypast  
* Kanna fyrst (heima)  
* Gott at hava (Maks 12 vørur íalt, við uml. nøgdum \+ 2 bíligum alternatium)

Svara á natúrligum føroyskum. Ongar persónligar dátur.
-- prompt --
---

### **8\) Tilreiðar-listi til handverkaravitjan (elektrikari/hvs)**

**Leiklutur:** Minnislista- & Mannagongdsvinur

**Støða:** Í **Sørvági**, tíð til elektrikara **14:00–16:00** er bíløgd í felags-tekøkinum. Atgongd umvegis **bakhurð**; gólvið kann vera vátt, um tað regnar illa; **ketilsikringin slær** lættliga frá. Skíggjabretti til privatlív eru tøk; búfólk kunnu ganga ígjøgnum eftir te. Við hesum samanhangi kann vitlíki framleiða **ÁÐRENN / UNDIR / EFTIR** stig, sum verja trygd og privatlív.

**Byrt:**
-- prompt --
Vit fáa vitjan av elektrikara í tekøkinum í Sørvági í dag millum 14:00–16:00. Atgongd er gjøgnum bakhurðina (gólvið kann vera vátt, um tað regnar). Ketilsikringin slær lættliga frá. Búfólk kunnu ganga ígjøgnum eftir te.

Fyrireika ein stuttan, praktiskan minnislista, bólkaður í:

* ÁÐRENN (4–5 punkt)  
* UNDIR (4–5 punkt)  
* EFTIR (4–5 punkt)

Tak við: greiðar gonguleiðir, privatlív hjá búfólkum, trygdarskelti, larm-tilvitan, og áminning um at nullstilla/kanna eftir vitjanina. Svara á natúrligum føroyskum. Ongar persónligar dátur – brúka "Búfólk A/B".
-- prompt --
---

### **9\) Áminningarboð um avtalu (starvsfólkakjatt/SMS)**

**Leiklutur:** Samskiftishjálpari

**Støða:** Í **Tórshavn**, ein vitjan á heilsumiðstøðini er **Mik 09:30–11:00**. Møtistaður: **forhøllin við teir bláu stólarnar**; hýruvognsbílegging váttað; knakar eru ofta fullir. At biðja vitlíki um **tvey snið** tryggjar, at bæði eitt SMS og eitt eitt sindur longri starvsfólkanotat eru klár uttan at skula skrivast umaftur.

**Byrt:**
-- prompt --
Vit hava eina vitjan á heilsumiðstøðini í Tórshavn hendan mikumorgunin (09:30–11:00). Møtistaður er forhøllin við teir bláu stólarnar; hýruvognsbílegging er váttað. Knakar har verða skjótt fullir.

Skriva tvær vinaligar áminningar um avtaluna:

1) SMS útgáva (maks 160 tekn)  
2) Starvsfólkakjatt útgáva (maks 300 tekn)

Tak greitt við: møtistað, tíðarbil, og ting at taka við (jakka, kort um neyðugt). Mál: Føroyskt fyrst (ÚTKAST–FO), síðan enskt. Brúka óheftan/nevtralan tóna, eingi nøvn – brúka "Búfólk A/B". Ongar persónligar dátur.
-- prompt --
---

### **10\) Almenn áminning til familjur (árstíðarklæðir)**

**Leiklutur:** Samskiftishjálpari

**Støða:** Tú ert á einum bústovni í **Klaksvík**. Veðrið er vorðið nógv kaldari, og tú hevur lagt merki til, at mong búfólk høvdu havt gagn av heitari inniskóm ella troyggjum. Tær tørvar at seta eina almenna, vinarliga áminning á talvuna til vitjandi familjur, har tú varliga biður tær kanna, um teirra avvarðandi tørvar heitari innilutir. At biðja vitlíki skriva hetta sparir tær tíð og tryggjar, at tónin er hjálpsamur og ikki krevjandi.

**Byrt:**
-- prompt --
Tað er vorðið kaldari í Klaksvík. Vit vilja fegin seta eina almenna, vinarliga áminning á familjutalvuna.

Vinarliga skriva eitt stutt, vinarligt boð (2-3 setningar). Tak við:

1. Eitt notat um kalda veðrið.  
2. Eitt varisligt uppskot til familjur um at kanna, um teirra avvarðandi tørvar heitari innilutir (sum inniskógvar ella troyggjur).  
3. Ein áminning um vinarliga at merkja allar nýggjar lutir.

Halt tónan hjálpsaman og almennan. Svara á natúrligum føroyskum. Ongar persónligar dátur.
-- prompt --
`;

// ---------------------------------------------------------------------------
// Inline Markdown Logic (Tasteful & Robust)
// ---------------------------------------------------------------------------

interface EmphasisRule {
  marker: string;
  wrap: (children: ReactNode) => ReactNode;
}

const emphasisRules: EmphasisRule[] = [
  {
    marker: "***",
    wrap: (children) => (
      <span className="font-bold italic text-stone-800 dark:text-stone-100">
        {children}
      </span>
    ),
  },
  {
    marker: "**",
    wrap: (children) => (
      <span className="font-bold text-stone-900 dark:text-white">
        {children}
      </span>
    ),
  },
  {
    marker: "*",
    wrap: (children) => (
      <span className="italic text-stone-700 dark:text-stone-300">
        {children}
      </span>
    ),
  },
];

function parseEmphasis(text: string, rules: EmphasisRule[]): ReactNode[] {
  if (rules.length === 0) return [text];
  const [rule, ...rest] = rules;
  const { marker, wrap } = rule;

  const parts = text.split(marker);
  if (parts.length === 1) return parseEmphasis(text, rest);

  const result: ReactNode[] = [];
  for (let i = 0; i < parts.length; i++) {
    // Even indices are outside markers, odd are inside
    if (i % 2 === 0) {
      if (parts[i]) result.push(...parseEmphasis(parts[i], rest));
    } else {
      result.push(wrap(parseEmphasis(parts[i], rest)));
    }
  }
  return result;
}

const RenderInlineText = ({ text }: { text: string }) => (
  <>{parseEmphasis(text, emphasisRules)}</>
);

// ---------------------------------------------------------------------------
// Component: Prompt Card (The "Stationery Note")
// ---------------------------------------------------------------------------

const PromptCard = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="my-10 group">
      {/* The Card Design */}
      <div className="relative bg-[#fcfcf9] dark:bg-stone-900 border-2 border-dashed border-stone-300 dark:border-stone-700 rounded-xl p-6 sm:p-8 shadow-sm transition-all hover:shadow-md hover:border-stone-400">

        {/* Header / Label */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center space-x-2 text-stone-500 dark:text-stone-400">
            <PenTool className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider font-sans">
              Byrt
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 text-stone-500 hover:text-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            aria-label="Copy prompt to clipboard"
          >
            {copied ? (
              <span className="flex items-center text-green-600 dark:text-green-400 text-xs font-medium">
                <Check className="mr-1.5 h-3.5 w-3.5" />
                Kopierað
              </span>
            ) : (
              <span className="flex items-center text-xs font-medium">
                <Copy className="mr-1.5 h-3.5 w-3.5" />
                Kopiera tekst
              </span>
            )}
          </Button>
        </div>

        {/* Content */}
        <pre className="whitespace-pre-wrap font-mono text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
          {text.trim()}
        </pre>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Component: Markdown Block Renderer
// ---------------------------------------------------------------------------

const MarkdownBlock = ({ text }: { text: string }) => {
  // Basic logic to separate lists from paragraphs for cleaner rendering
  const lines = useMemo(() => text.replace(/\r\n/g, "\n").split("\n"), [text]);
  const elements: JSX.Element[] = [];
  let listBuffer: string[] = [];

  const flushList = () => {
    if (listBuffer.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="my-6 space-y-3 ml-2">
          {listBuffer.map((item, i) => (
            <li key={i} className="flex items-start text-lg text-stone-800 dark:text-stone-300 leading-8">
              <span className="mr-3 mt-2.5 block h-1.5 w-1.5 rounded-full bg-stone-400 flex-shrink-0" />
              <span><RenderInlineText text={item} /></span>
            </li>
          ))}
        </ul>
      );
      listBuffer = [];
    }
  };

  lines.forEach((line, idx) => {
    const cleanLine = line.trim();

    if (cleanLine.startsWith("# ")) {
      flushList();
      elements.push(
        <h1 key={idx} className="font-serif text-4xl sm:text-5xl font-medium text-stone-900 dark:text-stone-50 mt-16 mb-8 tracking-tight">
          <RenderInlineText text={cleanLine.substring(2)} />
        </h1>
      );
    } else if (cleanLine.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={idx} className="font-serif text-2xl sm:text-3xl font-normal text-stone-800 dark:text-stone-100 mt-12 mb-6">
          <RenderInlineText text={cleanLine.substring(3)} />
        </h2>
      );
    } else if (cleanLine.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={idx} className="font-serif text-xl font-semibold text-stone-800 dark:text-stone-200 mt-8 mb-4 uppercase tracking-wide text-sm">
          <RenderInlineText text={cleanLine.substring(4)} />
        </h3>
      );
    } else if (/^---+$/.test(cleanLine)) {
      flushList();
      elements.push(
        <div key={idx} className="flex justify-center my-12 opacity-40">
          <div className="w-24 h-px bg-stone-400" />
        </div>
      );
    } else if (line.startsWith("* ") || line.startsWith("- ")) {
      listBuffer.push(line.substring(2));
    } else if (cleanLine === "") {
      flushList();
    } else {
      flushList();
      // Styling for standard paragraphs: Serif, larger size, relaxed leading
      elements.push(
        <p key={idx} className="mb-6 text-lg sm:text-xl leading-loose text-stone-800 dark:text-stone-300 font-serif">
          <RenderInlineText text={line} />
        </p>
      );
    }
  });

  flushList(); // Catch any trailing list

  return <>{elements}</>;
};

// ---------------------------------------------------------------------------
// Main Page Layout
// ---------------------------------------------------------------------------

export default function AiForCaretakersGuide() {
  useEffect(() => {
    document.title = BLOG_TITLE;
    const existingMeta = document.querySelector('meta[name="description"]');
    if (existingMeta) {
      existingMeta.setAttribute("content", BLOG_DESC);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = BLOG_DESC;
      document.head.appendChild(meta);
    }
  }, []);

  const contentParts = blogContent.split(/(\\?-{2,3} prompt \\?-{2,3}[\s\S]*?\\?-{2,3} prompt \\?-{2,3})/g);

  return (
    <div className="flex flex-col min-h-screen bg-stone-50 dark:bg-stone-950 font-serif">
      <Header />

      <Section className="flex-grow pt-12 pb-24">
        <div className="max-w-3xl mx-auto px-6 sm:px-8">

          {/* Navigation / Tools */}
          <nav className="flex justify-between items-center mb-16 font-sans">
            <Link href="/user-guides">
              <a className="inline-flex items-center text-sm font-medium text-stone-500 hover:text-stone-800 transition-colors group">
                <ArrowLeft className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                Aftur til yvirlit
              </a>
            </Link>
            <Button
              variant="ghost"
              className="text-stone-500 hover:bg-stone-200/50 hover:text-stone-800"
              onClick={() => window.print()}
            >
              <Printer className="h-4 w-4 mr-2" />
              Prenta
            </Button>
          </nav>

          {/* Article Body */}
          <article className="selection:bg-stone-200 selection:text-stone-900 dark:selection:bg-stone-700 dark:selection:text-stone-50">
            {contentParts.map((part, index) => {
              if (part.match(/^\\?-{2,3} prompt \\?-{2,3}/)) {
                const promptText = part.replace(/^\\?-{2,3} prompt \\?-{2,3}/, "").replace(/\\?-{2,3} prompt \\?-{2,3}$/, "").trim();
                return <PromptCard key={index} text={promptText} />;
              }
              return <MarkdownBlock key={index} text={part} />;
            })}
          </article>

          {/* Footer Note */}
          <div className="mt-20 pt-10 border-t border-stone-200 dark:border-stone-800 text-center">
            <p className="text-stone-400 italic text-sm">
              Vitlíki hjálpir námsfrøðingum at fokusera uppá tað, sum skapar virði.
            </p>
          </div>

        </div>
      </Section>

      <Footer />
    </div>
  );
}