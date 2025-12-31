import { useEffect, useState, useMemo } from "react";
import type { ReactNode } from "react";
import { Link } from "wouter";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, Copy, Check, PenTool } from "lucide-react";

// --- Configuration & Content ---

const BLOG_TITLE = "Hvussu tú kann nýta vitlíki sum røktarstarvsfólk: Meira tíð til tær heitu hendurnar.";
const BLOG_DESC = "Ein handalig vegleiðing, sum ger røktarstarvsfólk før fyri at brúka vitlíki trygt til skjalfesting og tilrættislegging, so meira tíð verður til sjálva umsorganina.";

const blogContent = `
# Hvussu tú kann nýta vitlíki sum røktarstarvsfólk: Meira tíð til tær heitu hendurnar

---

## Tín dagur snýr seg um menniskju, ikki pappírsarbeiði

Vit vita, at títt arbeiði fyrst og fremst er "á gólvinum". Tú ert til staðar saman við búfólkum og borgarum, og fært gerandisdagin at hanga saman – líka frá morgunmati og persónligari røkt til avtalur og ítriv. Hetta er tað týdningarmikla, menniskjaliga arbeiðið.

Men vit vita eisini, at ein stórur og vaksandi partur av degnum fer til skjalfesting.

* At skriva dagbókina, sum kann taka 15–30 minuttir fyri hvørja viðmerking.  
* At fyrireika vaktarskifti, viðhvørt uttan at vaktirnar umskarast, har tú mást líta á telefonina og skrivlig notat.  
* At dagføra dagbøkur, talvur og virksemisætlanir.  
* At skjalfesta heilivág og halda skil á kvittanum.

Hetta er ein tíðarkrevjandi og ofta stressandi partur av arbeiðinum, sum kann geva kensluna av, at tú "rennur ímillum menniskju og pappírsarbeiði".

---

## Hvat henda vegleiðing *veruliga* hjálpir við

Henda vegleiðing hvørki kann ella skal avloysa tína fakligu meting, evni tíni ella tína menniskjaligu umsorgan. Vitlíki kann ikki vera "á gólvinum" saman við tær.

Í staðin er henda vegleiðing sniðgivin at hjálpa tær við tí *skjalfesting*, sum stjelur tína tíð. Hon veitir tær trygg, ítøkilig "byrt" (prompts), sum tú kanst avrita og brúka til at:

* **Skriva leyslig dagbókarnotat:** Umskapa skjótt tíni grovu notat til eina professionella logbók.  
* **Skriva greiðari vaktaryvirlit:** Taka samanum høvuðspunkt til næstu vaktina – hvat er avgerandi, tá ið tit ikki møtast við vaktarskifti.  
* **Gera boð til avvarðandi og starvsfólk:** Skjótt at skriva vinaligar og greiðar dagføringar til portalar, talvur ella innanhýsis kjatt.  
* **Leggja virksemið til rættis og gera minnislistar:** Fá beinanvegin hugskot til ítriv ella ger praktiskar minnislistar (t.d. til eina útferð), tá ið tíðin er knøpp.

Málið er einfalt: at hjálpa tær at brúka minni tíð við knappaborðið og geva tær meira tíð aftur til tey menniskju, tú tekur tær av.

---

Hvørjum er hetta ætlað:

* Røktarstarvsfólk og hjálparfólk á dagstovnum, bústovnum og í eldrarøkt.  
* Tey, ið hava lítlar ella ongar royndir við vitlíki; brúka mest telefonina og einfalda tøkniliga útgerð.  
* Tey, sum eru í tíðarneyð og skulu hava skrivligar frágreiðingar at hanga saman við røktini (t.d. kunnu dagbøkur taka 15–30 minuttir; summar vaktir hava onga umskaran).  
* Tey, ið leita eftir skjótum loysnum, sum kunnu brúkast í dag.

Ikki ætlað til:

* At avloysa tína fakligu meting ella umsorgan. Vitlíki ger útkøst; tú eigur avgerðina.  
* Heilsufakliga avgerðir (heilivágur, viðgerð) ella til nakað, sum liggur uttan fyri tín leiklut.  
* Arbeiði, sum krevur persónligar ella viðkvæmar dátur, uttan so at tín arbeiðsgevari hevur útvegað eina góðkenda skipan, ið lýkur krøv til viðkvæma nýtslu.  
* Samansjóðingar (integratiónir) ella sjálvvirkni. Henda vegleiðing er bert til kjatt (avrita/líma).

---

## Vís varsemi í sambandi við innlating (ongar persónligar dátur)

Ímynda tær, at tú skrivar eitt bræv til eina fyritøku. Tá ið tú hevur lagt brævið í postkassan, er tað úti – øll, sum hava lykil til postkassan, kunnu lesa, hvat tú skrivar, og tú kanst ikki taka tað aftur. Vitlíkis-kjattamboð rigga á sama hátt; tá ið tú deilir upplýsingar, missir tú tamarhald á, hvør kann fáa atgongd til tær. Og hvat, um onkur brýtur inn í postkassan? So kunnu øll brádliga síggja tað, sum annars átti at veri loyniligt.

Tú kanst sjálvandi tosa frítt um teg sjálvan, títt lív kann tú gera við sum tú vil, men tú eigur at verja privatlívið hjá øðrum. Tað eru nógvir hjálpsamir hættir at brúka vitlíki, uttan at tað er neyðugt at hava persónligar upplýsingar við. Um tú ikki vildi skriva tað í eitt bræv, skalt tú ikki skriva tað inn í vitlíkisamboðini.

Summi arbeiðspláss útvega serlig, trygg vitlíkisamboð, sum eru góðkend til at handfara viðkvæmar upplýsingar. Men uttan so, at tú heilt víst veit, at tín skipan er góðkend til privatar dátur, skalt tú ongantíð deila persónligar upplýsingar um børn ella starvsfelagar – so sum nøvn, bústaðir, heilsutilfar ella aðrar trúnaðarupplýsingar.

### Hvat er trygt at deila (grønt)

* Almennar støður ("eitt búfólk gjørdist óróligt áðrenn døgurða").  
* Navnleysar staðgongur ("Barn A", "Búfólk B", "Stova 3").  
* Samanumtiknir smálutir (fyrrapart/seinnapart, "um døgurðatíð" í staðin fyri neyvar tíðir).  
* Ikki-eyðmerkandi samanhangur (aldursbólkar, bólkastødd, tilfar, veður).  
* Íspunnin dømi.

### Hvat er ikki trygt (reytt)

* Nøvn, føðingardagar, bústaðir, telefonnummur, teldupostar.  
* Myndir ella andlit, serligar tatoveringar/arr, p-tøl, journalnummur.  
* Diagnosur, nøvn á heilivági/skamtan, sjúkratekin, sum eru knýtt at einum nevndum persóni.  
* Neyvar tíðarætlanir/avtalur, sum peika á ein ávísan persón.  
* Smálutir um tilburðir, sum gera ein persón eyðkendan (t.d. "einasti koyristólsbrúkari í lítlari bygd kl. 10:17").

### Kanning av persónsdátum

* Kann onkur uttan fyri toymið vita, hvør hetta er? Um ja → steðga.

### Skjótur háttur at gera navnleyst (3 stig)

1. Skift øll nøvn/ID út → Barn A / Búfólk B / Starvsfólk E.  
2. Ger eyðkenni ógreið → brúka aldursbólkar, stovunummar, tíðarbil.  
3. Tak sjáldsamar smálutir burtur (smáar bygdir, serligar hendingar) ella lýs tað á ein almennan hátt, soleiðis at man ikki kann rokna út hvønn verur tosa um.

Dømi upp á ikki tryggan skrivihátt:

- "Anna Kristina Jensen, 83, datt á stovu 12 kl. 10:17, pínu í vinstru mjødn, fekk Panodil 500 mg."

Betri (tryggur) háttur:

- "Búfólk B (80-árini) hevði eitt fall í felagsrúminum seint fyrrapartin. Rólig eftir fyrstuhjálp og vanliga pínustillandi sambært ætlan; verður eygleitt."

Niðurstøða: Ert tú í iva, lat so vera við at skriva tað inn. Brúka vitlíki at gera útkast til bygnað, tóna og hugskot – og flyt síðan tín rættlisna tekst yvir í almennu skipanina, har tit t.d. vanliga journalisera.

## Summir hættir at brúka vitlíki eru ov viðkvæmir

Ávísir hættir at nýta vitlíki hava stórt potentiali at spara tíð – so sum sjálvvirkandi at skriva nágreiniligar dagbøkur, gera samandráttir av tilburðum ella neyva tíðarstýring. Men hesar uppgávur krevja vanliga handfaring av persónligum upplýsingum (PII), so sum nøvn, neyvar dagfestingar ella serligar heilsusmálutir.

Í løtuni hava flestu stovnar framvegis ikki trygg, góðkend vitlíkisumhvørvi, sum eru sniðgivin at handfara hesi sløgini av viðkvæmum dátum trygt. Uttan hesar trygdarfyriskipanir er tað ov lætt at koma at deila privatar upplýsingar av óvart – sjálvt tá ið tú roynir at vera varin.

Av hesi orsøk hava vit valt ikki at taka vitlíkis-dømi við í hesa vegleiðing, sum byggja nógv á viðkvæmar upplýsingar, millum annað:

* Nágreiniligar dagbøkur ella tilburðarfrágreiðingar, sum beinleiðis brúka verulig notat við eyðmerkjandi smálutum.  
* Neyv tíðarstýring, sum fevnir um verulig nøvn á starvsfólkum ella borgarum og neyvar tíðir.  
* Umsetingar ella samandráttir, sum fevna um nágreiniligar sjúkrasøgur ella persónligar umstøður.

Vit mæla til at tú biður um at fáa tryggar og góðkend vitlíkis umhvørvi á tín stovn. Tá ið hesar verjur eru komnar í lag, kanst tú brúka vitlíki til hesar virðismiklu uppgávur uttan váða fyri privatlívið.

Men stúr ikki: Sjálvt uttan hesar viðkvæmu uppgávur eru nógvir tryggir, praktiskir og hjálpsamir hættir, tú kanst fáa gagn av vitlíki beinanvegin. Tað er júst tað, henda vegleiðing fer at vísa tær.

---

## *Soleðis kanst tú hugsa um vitlíki sum ein samstarvsfelaga*

Hugsa um vitlíki sum tín kreativa, men eitt sindur serliga starvsfelaga, sum kann taka á seg ávísar leiklutir, sum lýstir í hesi vegleiðing – so sum tín "Kreativi sparringspartnari", "Minnislista-vinur" ella "Samskiftishjálpari".

Vitlíki kann tykjast ótrúliga klókt, men tað fer altíð at sníkja óvæntað mistøk inn, so hald allatíð fast við rórið tá ið tú nýtur vitlíki. Kanna altíð úrslitið frá vitlíki væl, serliga um tað snýr seg um týdningarmikið samskifti ella skjalfesting.

Minst til, at vitlíki kennir ikki tína neyvu støðu, uttan so at tú sigur tað greitt. Ver týðilig/ur: "Eg eri hjálparfólk á arbeiðsplássi í Føroyum og arbeiði við fimm eldri búfólkum við ymiskum førleikum." Jú meira viðkomandi samanhang tú gevur – bólkastødd, umhvørvi, tilfar, avmarkingar – tess betri uppskot fært tú.

Føroyskt hjá vitlíki er ikki heilt feilfrítt enn. Um tú brúkar vitlíki til at skriva føroyskan tekst, set altíð tíð av at lesa væl ígjøgnum og vænta at gera rættingar. Men tá ið tú brúkar vitlíki til hugskot ella bara at fáa viðmerkingar til virksemi, hava stavimistøk og málfrøði minni týdning – fokusera heldur á góðskuna og gagnið í hugskotunum.

Gott ráð: Goym eitt notat við lýsing av tínum vanliga arbeiðsumhvørvi í einum Word skjali ella notati á telduni ella telefonini (t.d. bólkastødd, førleikar, tøkt tilfar, høli og støð, sum tit ofta vitja), sum tú lættliga kanst seta inn í vitlíkis-kjattið. Hetta hjálpir tær at fáa skjótari og betri tillagað úrslit hvørja ferð.

## Kreativur sparringspartnari (Virksemi og ætlanir)

Sum hjálparfólk eru dagar tínir fyltir við alskyns uppgávum – frá persónligari hjálp og dagligum rutinum til skipað virksemi og løtur í samveru. At finna nýggj, fangandi hugskot til virksemi í skundi, kann vera avbjóðandi, serliga við avmarkaðari tíð og tilfari. Vitlíki virkar sum kreativi starvsfelagi tín, sum beinanvegin kemur við praktiskum, brúkbarum uppskotum, sum eru neyvt tillagað tínum umhvørvi og avmarkingum. Annaðhvørt ætlanir tínar broytast brádliga, tilfar manglar, ella tær bara tørvar íblástur, so gev vitlíki eitt skjótt yvirlit – bólkastødd, førleikar, tøkar ressursir og serligar avmarkingar – og lat tað kveikja livandi, veruligar møguleikar.

**Her er eitt dømi**

Ímynda tær hesa støðuna: Tað er ein skundmikil seinnapartur á stovninum. Vindur hevur forðað fyri ætlaða gongutúrinum. Tú situr nú inni við fimm óróligum vaksnum búfólkum, sum vanliga dáma væl at vera úti. Tit eru í einum lítlum felagsrúmi við grundleggjandi tilfari sum pappíri, pennum, spælikortum, bløðum og eitt sindur av klipp-og-klistra tilfari.

\--- prompt \---  
Eg eri hjálparfólk á einum bústovni í Føroyum. Okkara gongutúrur varð avlýstur vegna veður.

* Luttakarar: 5 vaksin við ymiskum kognitivum og likamligum førleikum.  
* Umhvørvi: Lítið innandura felagsrúm.  
* Tøkt tilfar: Pappír, pennar, spælikort, bløð, eitt sindur av klipp-og-klistra tilfari og annað sum vanliga finst á tílíkum økjum.  
* Mál: At fáa búfólkini at gera okkurt næsta tíman, og at varðveita ein róligan og jaligan hýr.

Kom við uppskotum um okkurt innandura virksemi, sum krevur lítla fyrireiking, fevnir um øll, eru rólig og hóska til blandaðar førleikar. Spyr meg fyrst, um okkurt krevur nærri frágreiðing.   
\--- prompt \---

Uppfylgjandi byrt: Um uppskotini ikki eru heilt, sum tú vilt hava tey, leiðbein so vitlíki greitt. Til dømis:

* "Kom við uppskotum um virksemi við enn einfaldari leiðbeiningum."  
* "Okkum dámdi væl søguhugskotið – gev okkum tvey rólig søgubygd virksemi afturat."  
* "Ger virksemini styttri, umleið 15 minuttir hvørt."

**Fleiri møguleikar fyri kreativari sparring**

Hesin leikluturin fevnir um meira enn bara at leggja virksemi til rættis – tað er tín partnari í skjótt at laga seg til broytandi umstøður:

* Tá ið stemningurin í rúminum er spentur, kanst tú biðja um róligari virksemi – so sum putlispøl, stýrdar frásagnir ella rólig handalig ítriv – fyri at skapa frið.  
* Um vanligt tilfar manglar ella er avmarkað, bið um broytingar, sum krevja minni útbúnað, t.d. at broyta pappírsklipp til einfaldar teknivenjingar ella prát út frá prentaðum myndum.  
* Tá ið starvsfólkatal ella tøkt pláss broytist, kann vitlíki skjóta upp tillagað virksemi, ið hóska til færri starvsfólk ella smærri rúm, og tryggja virksemið uttan eyka strongd.  
* Vitlíki kann enntá stuðla í løtum sum prát í matarsteðgum, við at geva einføld evni ella spurningar, sum varliga stimbra samrøðu og felagsskap millum búfólkini.

So hvørt sum tú roynir teg fram og betrar samskiftið við vitlíki, gerst tað ein álítandi kelda til hugskot – ein, sum hjálpir tær at halda arbeiðið smidligt, viðkomandi og veruliga fangandi.

Tú kanst síggja fleiri dømi um byrt í partinum "Nógv fleiri dømi".

Nú fara vit víðari til tann næsta leiklutin tú kanst nýta vitlíki til.

### Minnislista- og mannagongdsvinur

Sum røktarstarvsfólk er dagurin fullur av smáum, men týðandi uppgávum. Frá persónligum stuðli til at at samskipa tíðarætlanir – tín heili er altíð "tendraður".

Tá ið dagurin ikki er vanligur – t.d. ein snimm byrjan, ein serlig útferð ella ein broyting í síðstu løtu – er tað stressandi at royna at minnast hvønn einasta smálut. Tað er lætt at gloyma smáting hóast tað er týdningarmikið.

Her kann eitt vitlíkisamboð vera ein stór hjálp.

Hugsa um tað sum ein praktiskan hjálpara, ið ger minnislistan, tær tørvar *her og nú*. Í staðin fyri bara at líta á minnið ella ein standard pappírslista, sigur tú vitlíki hvat hendir og hvat tú ætlar at taka við. Vitlíki kann nú skjótt reinskriva listanir og koma við hugskotum til hvat annað kundi veri hent at tikið við ella ting tú møguliga hevur gloymt at hugsa um.

Her er eitt gott dømi:

Ímynda tær, at tú og ein starvsfelagi hava eina tíðliga avtalu við trý búfólk á heilsumiðstøðini í morgin. Tit skulu fara, áðrenn vanliga vaktin byrjar, so morgunin kennist stressandi. Veðurforsøgnin sigur kalt og vindur, og tit taka hýruvogn.

Fyri at fáa betur svar frá vitlíki leggur tú nakrar avgerandi veruligar smálutir afturat: eitt av búfólkunum, Frú P, hevur tørv á sínum samanleggjandi gongustativi, og Harra H, verður ógvuliga stúrin undir flutningi og er bundin av sínum serliga útvarps-headsetti. Tú biður vitlíki hjálpa tær at fyrireika túrin.

### Gott dømi um byrt (avrita/líma hetta)

\--- prompt \---

* Eg eri røktarstarvsfólk á einum bústovni. Vit skulu av stað í morgin árla. Fráferð: 07:30 (áðrenn vanliga vaktin byrjar)  
* Fólk: 3 búfólk, 2 starvsfólk  
* Veður: Kalt og vindur  
* Flutningur: Hýruvognur  
* Serligir smálutir um búfólk: Frú P skal hava sítt samanleggjandi gongustativ. Harra H má hava sítt útvarps-headsett (hann verður ógvuliga stúrin uttan tað).  
* Týðandi notat: Tak smápening við, váttan fyri hýruvogn.

***Vinarliga ger ein stuttan og praktiskan minnislista, sum vit kunnu fyrireika í kvøld, so morgunin í morgin verður róligari. Tryggja, at gongustativ og headsett eru við. Kom við hugskot til ting eg møguliga vil hava við. Tak eina einfalda Grøn/Gul/Reyð støðukanning við til síðst. Spyr meg fyrst onkran spurning, um okkurt krevur frágreiðing, áðrenn tú kemur við tínum endaliga svari.*** 

\--- prompt \---

### Fá minnislistan heilt rættan

Um fyrsti listin hjá vitlíki ikki er heilt rættur, sig so bara, hvat skal broytast. Greiðleiki og neyvleiki ger úrslitið betur.

* "Ger minnislistan styttri, í mesta lagi 8 punkt."  
* "Legg áminningar afturat viðvíkjandi veðrinum (regnskjól, vøttur)."  
* "Kom við nógv fleiri hugskot til hvat eg møguliga havi gloymt."

---

### Fleiri hættir at brúka tín minnislista-vin

Hetta amboðið kann hjálpa tær at hava skil á alskyns uppgávum og smálutum ígjøgnum alla vaktina, ikki bara til morgunfyrireiking.

* Fyrireiking av útferð: Ger skjótt ein sergjørdan minnislista til *eitt og hvørt átak* (útferð, spæl, samling osv.). Upplýs vitlíki um veðrið, bólkastødd, tørv á hjálp til flyting (mobilitet) og umstøður. Málið er sum oftast bara at fáa íblśtur til ting man kanska hevur gloymt, meira enn at vitlíki skal minnast til alt.  
* Umsiting eftir útferð: Ger ein einfaldan lista, sum minnir teg á, hvat skal goymast eftir eina útferð – so sum kvittanir, notat í journalum hjá búfólkum ella smálutir um hýruvogn. Tað heldur tína umsiting greiða og uttan stress.  
* Vikuligir innkeypstúrar: Ger ein innkeypslista út frá fíggjarætlan tíni, goymsluplássi, flutningi og komandi máltíðum.  
* Handverkaravitjanir: Fyrireika ein skjótan lista til, tá ið hvs-maður ella elektrikari kemur á vitjan. Hann kann fevna um áminningar um at verja privatlívið hjá búfólkum, rudda atgongd, tryggja trygdina og rudda upp eftir vitjanina.

### Málið: Minni mental byrða, meira menniskjalig røkt

So hvørt sum tú venur teg við hetta, gerst vitlíki ein álítandi partnari. Tað snýr seg ikki um at avloysa tínar førleikar; tað snýr seg um at minka um "mentalu byrðuna" tá ið man sjálvur má minnast hvønn einasta smálut.

Hetta frígevur meira av tíni tíð og uppmerksemi til tað, sum veruliga hevur týdning: teir persónligu, menniskjaligu partarnar av røktini.

## Samskiftishjálpari (starvsfólk og avvarðandi)

Greitt og støðugt samskifti ger dagin lættari hjá øllum. Men at skriva stutt boð kann vera trupult, serliga tá ið tú hevur úr at gera ella tín orka er lág. Hesin vitlíkis-hjálparin ger skjótt lættlesilig boð til vaktarskifti, áminningar og dagføringar. Tað sparir tær tíð og minkar um ivasemi – og letur teg fokusera meira upp á tey menniskju, tú tekur tær av.

### Ímynda tær hesa støðuna:

Vaktin á bústovninum endar um fimm minuttir. Tað er eingin umskaran á næstu vaktini, so tíni notat mugu vera greið. Tú hevur grov notat um, hvat hendi í dag, men tær tørvar ein stuttan, skipaðan samandrátt fyri at tryggja eitt gott vaktarskifti.

### Gott dømi um byrt (avrita/líma hetta):

\--- prompt \--- 

*\[Líma tíni grovu notat inn her – ongar persónligar smálutir.\]*

Umskapa hesi grovu notat til eitt vaktaryvirlit við 5 punktum: Uppseting:

1. Hæddarpunkt  
2. Ávaringar/ansa eftir  
3. Lidnar uppgávur  
4. Næstu uppgávurnar  
5. Tíðindi

Valfrí seinasta linja: Støða (Grøn/Gul/Reyð) \+ 1 grundgeving.  
Stílur: Einfalt, nevtralt. Vinarliga spyr fyrst, um okkurt er ógreitt.

\--- prompt \---

### Uppfylgjandi byrt:

Um úrslitið ikki er heilt rætt, leiðbein so vitlíki eitt sindur meira:

* "Ger punktini enn styttri."  
* "Legg dent á ta mest átrokandi uppgávuna."  
* "Greið frá ‘gulu støðuni’ týðiligari."

### Fleiri hættir at brúka Samskiftishjálparan

Hesin leikluturin hjálpir tær at handfara nógvar aðrar dagligar samskiftisuppgávur greitt og lætt:

* Betra um tónan: Umskriva skjótt eini boð tú longu hevur klár, fyri at beina burtur neiligar ella ógreiðar orðingar.  
* Áminningar um avtalur: Tak sjálvvirkandi týðandi smálutir við (møtistað, ting at taka við).  
* Styttri SMS og kjatt: Stytt eitt longri notat sum longu er klárt, so tey hóska til SMS boð ella kjattboð.  
* Áminningar: Send skjótar, vinaligar áminningar um ymiskt, so smáar umsitingarligar uppgávur verða lættari.

Minst til: les altíð boð tíni væl ígjøgnum, áðrenn tú sendir ella goymir tey alment (t.d. í  Word/Journal). Tak ongantíð persónligar upplýsingar við í almenn vitlíkisamboð – brúka navnleysar staðgongur ("Búfólk A/B") fyri at halda tingini privat og trygg.

---

## Skjót byrt: Realistisk dømi at hvessa tínar vitlíkisførleikar sum røktarstarvsfólk

Niðanfyri finnur tú eitt savn av dømum um støður – íspunnin, men tætt at veruligum støðum, sum føroysk røktarstarvsfólk møta dagliga á dagstovnum, bústovnum og í eldrarøkt. Hvørt dømi vísir, hvussu tað at leggja greiðan, ítøkiligan samanhang (rúm, tíð, avmarkingar) afturat hjálpir vitlíki at geva betri og meira tillagað svar. Les støðurnar, avrita/líma síðan byrtini – skift tínar egnu smálutir inn fyri at fáa praktiska hjálp her og nú.

---

### 1\) Virksemis-sett at fáa ró í rúmið (bústovnur fyri vaksin)

Leiklutur hjá vitlíki: Kreativur sparringspartnari

Støða: Tú ert í Klaksvík í eini felagsstovu kl.14:00–14:30, beint eftir at vaskimaskinan er liðug. Turkitrumlan hurrar harðast umleið 14:05, og gongshurðin gevur eitt hvin, tá ið hon verður latin upp. Tú hevur eitt lítið borð, blýantar, A4 pappír og eitt kortspæl. Við at geva hesar smálutir kann vitlíki skjóta upp rólig, løtt-at-rudda virksemi, sum hóska til larm- og plássavmarkingarnar og minka um yvirstimulering.

\--- prompt \---   
Eg eri í Klaksvík við 5 vaksnum búfólkum (blandaðir førleikar). Klokkan er 14:00–14:30, beint eftir at vaskimaskinan er liðug (turkitrumlan hurrar \\\~14:05, gongshurðin hvínur). Vit hava eitt lítið borð, blýantar, A4 pappír og spælikort.

Skjót upp 4 still, rólig virksemi, sum hóska til okkara rúm. Tak hetta við fyri hvørt:

* uppseting ≤1 min  
* 3 greið, løtt stig  
* skjót áminning um rudding  
* stutt notat, sum forklarar "hví hetta gevur ró"

Svara á natúrligum føroyskum.  
\--- prompt \---

### 2\) Tiltakshugskot uttan tilfar

Leiklutur hjá vitlíki: Kreativur sparringspartnari

Støða: Í Tórshavn (felagsrúm 10:15–10:40) er goymsluskápið læst inntil 10:45; eitt borð vaggar; stólar eru tungir at flyta. Tær tørvar fangandi møguleikar, sum bert brúka stólar, hendur og røddir. Við hesum avmarkingum kann vitlíki leypa um klipp-og-klistra hugskot og geva tær møguleikar uttan tilfar, sum tú kanst brúka beinanvegin.

\--- prompt \---

Í dag í Tórshavn er okkara goymsluskáp læst til klokkan 10:45. Nú er klokkan 10:15–10:40, og vit hava bara stólar tøkar (eitt borð er ov vaggut at brúka). Plássið er avmarkað, so virksemið má vera sitandi ella ógvuliga einfalt.

Vinarliga gev okkum 5 fangandi hugskot til virksemi uttan tilfar, hóskandi til blandaðar førleikar. Tak hetta við fyri hvørt:

* sitandi-vinarlig útgáva  
* trý einføld stig  
* uppskot til at falla til ró skjótt (30–60 sek)

Svara á natúrligum føroyskum.

\--- prompt \---

### 3\) Fá starvsfólk / lítið-pláss-ætlan (sitandi rørsla)

Leiklutur hjá vitlíki: Kreativur sparringspartnari

Støða: Í Runavík, Stova 3N er umleið 3,5 m × 4 m; tú ert einasta starvsfólk til staðar. Vendiradius hjá koyristóli er knappur; fólk ganga framvið á gongini hvørjar 5 minuttir; ein brandávaringar roynd er skrásett kl. 10:00 (stutt floyt). Við hesum detaljustigi kann vitlíki laga løtt rørsluspøl til sitandi útgávur við greiðum trygdarboðum.

\--- prompt \---

Eg eri einsamallur í Runavík (Stova 3N, ógvuliga lítið pláss, 3,5×4 m). Atgongd við koyristóli er avmarkað, fólk ganga framvið 5\. hvønn minutt, og tað er ein stutt brandávaringar-roynd (floyt) kl. 10:00. Okkum tørvar tvey uppskot til róligt, sitandi rørsluvirksemi (8–10 min hvørt).

Fyri hvørt virksemi, veit:

* trygdarnotat til lítið pláss  
* 3 løtt-at-fylgja stig  
* valfríar truplari/lættari tillagingar  
* greiða "steðgiorð" leiðbeining

Svara á natúrligum føroyskum.

\--- prompt \---

### 4\) Samrøðukort til matarsteðg

Leiklutur hjá vitlíki: Kreativur sparringspartnari

Støða: Í Vestmanna, 11:20–12:00, er matar-/kaffisteðgur í einum sólríkum horni. Í dag er fyrsta kavafrost í ár. Tað kennist ofta tungt at finn auppá okkurt nýtt at siga allatíð, her hyggja vit uppá at fyri reika hesa løtuna við nøkur ting man kann tosa við íbúgvarnar um.

\--- prompt \---

Vit eru í Vestmanna og hava ein 40-minuttir matar-/kaffi-steðg (11:20–12:00) við sólríka vindeygað. Tað er fyrsta kavafrost í hesi vikuni. Vit vilja fegin hava nøkur einføld samrøðu-upplegg um "Veður & Árstíðir, at kunna brúka í matar-/kaffisteðginum."

Vinarliga skjót upp 12 stutt, løtt-at-svara samrøðu-upplegg. Sniðgev hvørt sum: uppleggsspurningur \+ (valfríur uppfylgjandi spurningur)  
Halt tað uppbyggjandi og ítøkiligt – ongar persónligar faktaupplýsingar neyðugar. Svara á natúrligum føroyskum.

\--- prompt \---

### 5\) Minnislisti til útferð (veður \+ flytføri \+ hýruvognur)

Leiklutur hjá vitlíki: Minnislista- & mannagongdsvinur

Støða: Í Sandavági verður ein stuttur gengi túrur klokkan 13:10–14:20. Veðurforsøgn: vindur og eitt sindur av regni; gøtur eru hálar. Bólkur upp á 4 (blandað flytføri/ mobilitetur), 2 starvsfólk. Hýruvognur heintar 13:05; bilstjórin vil helst hava kortgjalding; afturkomu-vindeyga ±10 minuttir.

\--- prompt \---

Í morgin fara vit ein gongutúr í Sandavági (13:10–14:20). Forsøgnin sigur vind og eitt sindur av regni, og gøtur kunnu vera hálar. Vit eru 4 búfólk (blandað flytføri) \+ 2 starvsfólk, brúka hýruvogn (heinting 13:05, kortgjalding er ynskilig).

Vinarliga ger ein praktiskan útferðar-minnislista (10–14 punkt) bólkað eftir:

* Kvøldið fyri  
* Við dyrnar  
* Í hýruvogninum

Tak eina einfalda Grøna/Gula/Reyða støðukanning við eini grundgeving. Svara á natúrligum føroyskum.

\--- prompt \---  
Her eru rættlisnu útgávurnar av tínum tekstbrotum (prompts). Eg havi lagt dent á at nýta rættar fyrisetingar við staðarnøvn, føroysk orð í staðin fyri danismur og rætta málfrøði samsvarandi viðfestu reglunum.

---

### 

### **6\) Túrfrásøgn til avvarðandi**

**Leiklutur hjá vitlíki:** Samskiftishjálpari

**Støða:** Tit eru júst komin aftur av Tvøroyri. Túrurin var góður, men øll eru troytt, og tú orkar næstan ikki at seta teg at "yrkja" eina frásøgn til avvarðandi á samskiftisappini ella til talvuna. Tær tørvar ein tekst, sum er fittur, lívligur og positivur, men sum heldur fullan trúnað (ongi nøvn ella persónligar myndir).

\--- prompt \---

Vit eru júst komin aftur av einum túri á Tvøroyri (kl. 10–14).

* **Høvuðsløtur:** Vit fingu kaffi og køku á kaffistovuni, sóu ferjuna koma inn, og veðrið var frálíkt, hóast eitt sindur kalt.  
* **Stemningur:** Hugnaligur, men nú eru øll troytt og púra rólig.

Skriva eina stutta, hjartaliga dagføring (100–150 orð) til "Tíðindaveggin" hjá avvarðandi.

* **Tóni:** Lívligur og takksamur.  
* **Endi:** Enda við einum spurningi til tey avvarðandi, sum kann skapa samrøðu næstu ferð, tey vitja (t.d. um teirra yndiskaffistovu).

Svara á natúrligum føroyskum.

\--- prompt \---

---

### 

### **7\) Matskrá**

**Leiklutur hjá vitlíki:** Kreativur sparringspartnari

**Støða:** Í Norðragøtu. Fíggjarætlanin er avmarkað hesa vikuna (700 kr. eftir), og tit hava eina rúgvu av restum, sum tit vilja brúka upp, áðrenn tit keypa nýtt. Tað kann vera ringt at síggja "ein rætt" í einum hálvum pakka av fiski og nøkrum gularótum, men vitlíki er meistari í at seta restir saman til leskiligar máltíðir.

\--- prompt \---

Vit skulu gera matskrá fyri næstu 2 dagarnar í Norðragøtu, og vit vilja tøma frystiboksina/køliskápið, áðrenn vit keypa inn.

Vit eiga tað mesta av tí vanliga man hevur í einum køki.

Her er tað, vit hava á goymslu:

* **Frystiboks:** 1 pakki av toskastykkjum (panerað), ein hálvur posi av frystum ertra- og maisblanding.  
* **Køliskáp:** Ein stórur posi av gularótum, 10 egg, hálvur ostur, mjólk.  
* **Turrgoymsla:** Eplir, pasta, mjøl, havragrýn og vanligt krydd.

Kom við uppskoti til eina matskrá:

1. Tveir døgurðar (høvuðsmáltíðir).  
2. Ein leskiligan, heimagjørdan millummála (t.d. bakstur) til kaffið.  
3. Ein lítlan "ískoytisinnkeypslista" (t.d. um tað manglar eitt einstakt ting fyri at fáa rættin at hanga saman, í mesta lagi 3 ting).

Krav: Rættirnir skulu vera lættir at tyggja og hóska til eldri.

Svara á natúrligum føroyskum.

\--- prompt \---

---

### 

### **8\) Handverkaravitjan: Frá órógvi til uppliving**

**Leiklutur hjá vitlíki:** Kreativur sparringspartnari

**Støða:** Í Sørvági fáa tit vitjan av einum elektrikara í felagstekøkinum kl. 14:00–16:00. Vanliga mannagongdin fyri trygd (frástøða, ruddan o.s.fr.) er upp á pláss. Avbjóðingin er "trivnaður": Búfólk A verður ógvuliga stúrin av ókendum monnum og larmi (borimaskina), men Búfólk B er gamal hondverkari og vil fegin "hjálpa" ella hyggja. Mær tørvar eina ætlan fyri at gera hetta til eina góða løtu fyri bæði heldur enn eina strongda tíð.

\--- prompt \---

Vit fáa elektrikara á vitjan í dag (kl. 14–16) í felagshølinum. Trygdin er komin upp á pláss, men mær tørvar hjálp til tað pedagogiska/menniskjaliga:

* **Búfólk A** (verður stúrin/bangin fyri larmi): Tørvar skjól og avleiðing.  
* **Búfólk B** (gamal hondverkari, forvitin): Vil fegin "blanda seg" og hyggja.

Kom við eini "Trivnaðarætlan" fyri hesa løtuna við 3 punktum:

1. **Orðing til Búfólk A:** Hvat kann eg siga við hann *áðrenn* larmurin byrjar, fyri at gera hann tryggan? (Ger tað stutt og róligt).  
2. **Uppskot til "Áskoðarapláss" til Búfólk B:** Hvussu kunnu vit seta ein stól upp ella geva honum eina uppgávu, so hann følir, at hann er við, uttan at hann órógvar elektrikaran?  
3. **Avleiðingarvirksemi:** Eitt uppskot til eitt virksemi í hinum endanum av húsinum, sum kann yvirdoyva ljóðið av borimaskinuni (t.d. tónleikur/upplestur).

Svara á natúrligum føroyskum.

\--- prompt \---

### 9\) Áminningarboð um avtalu (starvsfólkakjatt/SMS)

Leiklutur hjá vitlíki: Samskiftishjálpari

Støða: Í Tórshavn, ein vitjan á bókasavninum er mikudag ímillum kl.09:30–11:00. Møtistaður: forhøllin við teir bláu stólarnar; hýruvognsbílegging váttað; knakar eru ofta fullir. At biðja vitlíki um tvey snið tryggjar, at bæði eitt SMS og eitt eitt sindur longri starvsfólkanotat eru klár uttan at skula skrivast umaftur.

\--- prompt \---

Vit hava eina vitjan á bókasavninum í Tórshavn mikumorgunin (09:30–11:00). Møtistaður er forhøllin við teir bláu stólarnar; hýruvognsbílegging er váttað. Knakar har verða skjótt fullir.

Skriva tvær vinaligar áminningar um avtaluna:

1) SMS útgáva (maks 160 tekn)  
2) Starvsfólka útgáva (maks 300 tekn)

Tak við: møtistað, tíðarbil, og ting at taka við (jakka, kort um neyðugt). Brúka óheftan/nevtralan tóna.

\--- prompt \---

### 10\) Almenn áminning til familjur (árstíðarklæðir)

Leiklutur hjá vitlíki: Samskiftishjálpari

Støða: Tú ert á einum bústovni í Klaksvík. Veðrið er vorðið nógv kaldari, og tú hevur lagt merki til, at mong búfólk høvdu havt gagn av heitari inniskóm og troyggjum. Tær tørvar at seta eina almenna, vinarliga áminning á talvuna til vitjandi familjur, har tú vinarliga biður tær kanna, um teirra avvarðandi tørvar heitari innilutir. At biðja vitlíki skriva hetta sparir tær tíð og tryggjar, at tónin er hjálpsamur og ikki krevjandi.

\--- prompt \---   
Tað er vorðið kaldari í Klaksvík. Vit vilja fegin seta eina almenna, vinarliga áminning á familjutalvuna.

Vinarliga skriva eitt stutt, vinarligt boð (2-3 setningar). Tak við:

1. Eitt notat um kalda veðrið.  
2. Eitt vinarligt uppskot til familjur um at kanna, um teirra avvarðandi tørvar heitari innilutir (sum inniskógvar ella troyggjur).  
3. Ein áminning um vinarliga at eyðmerkja allar nýggjar lutir.

Halt tónan hjálpsaman og almennan. Svara á natúrligum føroyskum.

\--- prompt \---

## Tú arbeiður saman við vitlíki, men tú hevur síðsta orði.

Tøknin skal ongantíð koma í staðin fyri tað heita smílið, ta troystandi hondina ella tað fakliga yvirlitið, sum tú hevur. Málið við hesi vegleiðing er ikki at gera teg til ein **tøkninørd**, men at geva tær tíð aftur.

Hugsa um vitlíki sum ein **íbindandi**, men óroyndan lærling.

Lærlingurin er ógvuliga skjótur at skriva og hevur nógv góð hugskot.

Men lærlingurin kennir ikki Búfólk A líka væl sum tú.

Lærlingurin veit ikki, hvussu stemningurin er á stovuni júst nú.

Tí er tað altíð tú, sum situr við rórið. Tú eigur síðsta orðið. Brúka vitlíki til at lyfta tær tungu, keðiligu byrðarnar, so tú hevur meira orku eftir til tað, sum veruliga telur: menniskjuni.

Hvat er næsta stigið? Ikki gapa yvir ov nógv. **Tú noyðist ikki** at broyta allar tínar mannagongdir í dag.

Vel tær eitt av dømunum omanfyri – kanska hugskots menning ella viðmerkingar til ein minnislista til ein túr – og royn tað á tíni næstu vakt. Hettar er ein nýggj og ørvísi tøkni, so tað tekur eina løtu at venja seg við. Sær tað løgið út? Sig amboðinum frá hvat skal broytast. Sær tað gott út? Brúka tað.

Góðan arbeiðshug\!
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