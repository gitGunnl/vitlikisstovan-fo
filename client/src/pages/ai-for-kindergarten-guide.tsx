import { useEffect, useState, useMemo } from "react";
import type { ReactNode } from "react";
import { Link } from "wouter";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, Copy, Check, PenTool } from "lucide-react";
import kindergartenHeroImg from "@assets/guides/kindergarten-hero.jpg";

// --- Configuration & Content ---

const BLOG_TITLE = "Vitlíki til dagstovnar: Minni skriviarbeiði, meira spæl.";
const BLOG_DESC = "Lættir og tryggir hættir at minka um dagligu umsitingina, so tú kanst nýta meira tíð saman við børnunum.";

const blogContent = `
# **Vitlíki til dagstovnar: Minni skriviarbeiði, meira spæl.**

## ***Lættir og tryggir hættir at minka um dagligu umsitingina, so tú kanst nýta meira tíð saman við børnunum.***

---

**Hendan vegleiðing er til tín, um tú:**

* ert starvsfólk á einum dagstovni og arbeiður við børnum.  
* hevur roynt eitt vitlíki amboð, men annars hevur lítlar royndir við vitlíki.  
* mest brúkar telefonina ella aðra einfalda tøkniliga útgerð.  
* leitar eftir skjótum loysnum, sum tú kanst brúka í dag.

**Vegleiðingin er ikki ætlað til:**

* **At avloysa tína fakligu meting ella umsorgan.** Vitlíki kann gera útkøst og geva uppskot; tú hevur síðsta orði og tú tekur avgerðina.  
* **Djúpt ástøði.** Her eru ongar tøkniligar lýsingar – bara einføld nýtsla av kjatti (ChatGPT, Gemini, Copilot, o.s.fr.).  
* **Arbeiði, sum krevur persónligar ella viðkvæmar dátur.** Henda vegleiðingin nýtir bara navnleyst ella alment tilfar

# **Vís varsemi við, hvat tú letur inn (ongar persónligar dátur)**

**Ein einføld regla: Gev ongantíð vitlíki persónligar dátur um onnur**

Ímynda tær, at tú skrivar eitt bræv til eina fyritøku. Tá ið tú hevur lagt brævið í postkassan, er tað úti – øll, sum hava lykil til postkassan, kunnu lesa, hvat tú skrivar, og tú kanst ikki taka tað aftur. Vitlíkis-kjattamboð rigga á sama hátt; tá ið tú deilir upplýsingar, missir tú tamarhald á, hvør kann fáa atgongd til tær. Og hvat, um onkur brýtur inn í postkassan? So kunnu øll brádliga síggja tað, sum annars átti at veri loyniligt.

Tú kanst sjálvandi tosa frítt um teg sjálvan, títt lív kann tú gera við sum tú vil, men tú eigur at verja privatlívið hjá øðrum. Tað eru nógvir hjálpsamir hættir at brúka vitlíki – hugskot til undirvísing, frásøgur, ætlanir fyri virksemi – uttan at tað er neyðugt at hava persónligar upplýsingar við. Um tú ikki vildi skriva tað í eitt bræv, skalt tú ikki skriva tað inn í vitlíkisamboðini.

Summi arbeiðspláss útvega serlig, trygg vitlíkisamboð, sum eru góðkend til at handfara viðkvæmar upplýsingar. Men uttan so, at tú heilt víst veit, at tín skipan er góðkend til privatar dátur, skalt tú ongantíð deila persónligar upplýsingar um børn ella starvsfelagar – so sum nøvn, bústaðir, heilsutilfar ella aðrar trúnaðarupplýsingar.

**Hvat er trygt at deila:**

* **Almennir upplýsingar**: Nøvn, søgur ella spurningar, sum longu eru alment kend.  
* **Alment tilfar**: Almenn vitan ella undirvísingartilfar, sum ikki kann knýtast at ávísum einstaklingum.  
* **Navnleyst tilfar**: Lýsingar sum "Eg havi eitt barn, sum er smæðið" ella "Eg havi eitt ógvuliga gløgt barn" eru í lagi, tí tær avdúka ongan persónsamleika.  
* **Íspunnin dømi**: At brúka uppspunna ella almenna vitan kann eisini hjálpa til at varðveita trygdina.

**Hvat er ikki trygt:**

* **Persónligar upplýsingar**: Nøvn, sambandsupplýsingar ella okkurt, sum beinleiðis kann eyðmerkja onkran.  
* **Viðkvæmar dátur**: Heilsutilfar, p-tøl ella aðrar upplýsingar, sum krevja strangan trúnað.  
* **Okkurt, ið kann sporast aftur**: Sjálvt um tú brúkar eitt dømi, er tað betri at lata tað vera, um tað er ov tætt at veruligum fólkum, ella kann sporast aftur til tey.

Við at fylgja hesum einføldu leiðbeiningum hjálpir tú við at verja privatlívið og tryggja, at tíni vitlíkisamboð verða nýtt á tryggan og ábyrgdarfullan hátt.

# **Vitlíki sum ein samstarvsfelagi**

Hugsa um vitlíki sum tín hjálpsama, kvika starvsfelaga, sum altíð er til reiðar at koma við einum góðum hugskotið ella skriva okkurt fyri teg. Eins og við øllum góðum starvsfeløgum:

Jú greiðari tú lýsir, hvat tú hevur tørv á, tess betri hjálp fært tú.

Men vitlíki er eisini heilt øðrvísi: tað møðist ikki, keðir seg ongantíð við endurtiknum spurningum, og hevur hugskot til ting og virksemi, ið tú ongantíð hevði ímyndað tær. Men tað kann eisini bera seg óvæntað at: misskilja einføld boð, skjóta upp løgin ella óbrúkilig hugskot ella yvirsíggja ting, sum vit halda vera sjálvsøgd. Hugsa um tað sum ein kreativan, men eitt sindur serligan starvsfelaga – tú mást vegleiða greitt, eftirkanna uppskotini væl, og ongantíð líta fult á svar uttan tína egnu fakligu meting. Minst til, tú ert framvegis serfrøðingurin á tínari stovu, tá ið tað kemur til tíni børn og tínar dagligu rutinur – vitlíki hjálpir tær bara at umseta vitan tína og tínar tørvir til skjót, brúkilig hugskot.

Tær tørvar onga tøkniliga serfrøði fyri at brúka vitlíki væl. Lýs bara tína støðu við einføldum gerandismáli, sum um tú greiddi einum starvsfelaga frá. Nevn týðiliga tínar treytir (aldur á børnunum, bólkastødd, stað, tøkt tilfar og avmarkingar sum t.d. veður ella tíð), og lat vitlíki geva tær tillagaðar, verkligar loysnir. Fyri at brúka hesa vegleiðingina skalt tú bara avrita dømini við byrtum yvir í títt vitlíkis-kjattamboð (sum ChatGPT, Gemini ella Copilot), tillaga eftir tørvi og byrja at brúka uppskotini beinanvegin.

**Frágreiðing: Byrt \-** Eitt byrt er tað føroyska orði fyri tað ið á enskum verur rópt eitt “prompt”. Tað er stutt sagt bara tað man kallar boðini man sendur til vitlíki. So um tú skrivartil vitlíki “Hvat eru nøkur stuttlig spøl at spæla við 5 ára gomul?”, so er hettar byrtið.

---

Nú fara vit at hyggja eftir hvussu vitlíki kann hjálpa tær í tínum arbeiði á dagstovni. Vit fara at hyggja at 4 ymiskar háttir at hugsa um hvussu vitlíki kann hjálpa. Hettar eru 4 ymiskar rollur sum vitlíki kann taka uppá seg, fyri at hjálpa tær:

* Kreativur sparringspartnari  
* Trygdarhjálpari og eftirlitsfelagi  
* Søgusmiður, spælskipari og myndamakari  
* Tín hjálpari til samskifti og skjalfesting

## **Kreativur sparringspartnari**

Vitlíki er í essinum, tá ið tínar føstu rutinur verða órógvaðar, ella tær brádliga tørvar nýggj tillagingarfør hugskot. Tað er sum at hava ein kreativan toymisfelaga, sum beinanvegin gevur tær ein hóp av spennandi, handaligum hugskotum, ið eru neyvt tillagað tínum tørvi. Antin tínar ætlanir brádliga broytast, ella tær tørvar nýggjan íblástur, so gevur tú bara vitlíki tína støðu – tema, tøkt tilfar, tal av vaksnum, aldur á børnunum, serligar avmarkingar osv.

**Ímynda tær hesa støðuna:**

Tað er farið at oysregna í Vestmanna, har tú arbeiðir. Tínar útiætlanir renna í vaskið, og tú situr innandura við tólv lívligum 3-4 ára gomlum børnum. Títt mánaðartema er "Lív í sjónum", og tú hevur avmarkað pláss og vanligt tilfar sum krit, pappír, kubbar, vesirullur og vendispøl.

---

**Gott dømi um byrt (avrita og set inn í títt kjattamboð):**

\--- prompt \---

Eg eri námsfrøðingur í einum barnagarði í Vestmanna. Tað regnar, so vit eru innandura í dag.

\- Børn: 12 børn, 3-4 ár, orkufull, men løtt at yvirstimulera

\- Tema hendan mánaðin: Lív í sjónum

\- Tøkt tilfar: Krit, pappír, kubbar, vesirullur vendispøl og annað sum vanliga er til staðar á einum dagstovni

\- Avmarkingar (pláss): Bara eitt lítið øki innandura

Vit arbeiða eisini við hesum føroysku orðunum í dag: "alda", "hvalur", "fiskur" og "tara".

Kundi tú spunnið okkurt stuttligt upp sum vit kunna gera í dag, kom helst við fleiri góðum hugskotum.

Um okkurt er ógreitt, vinarliga spyr meg áðrenn tú svarar endaligt.

\--- prompt \---

**Uppfylgjandi byrt:** Um tað er okkurt við svarinum/hugskotinum tær ikki dámar, so sig bara vitlíki neyvt, hvat tað er. Her eru nøkur hugskot:

* "Ger hesi tiltøkini einfaldari og skjótari at rudda upp eftir."  
* "Okkum dámdi væl søguløtuna. Skjót upp trý líknandi tiltøk við sjóvartema."

**Fleiri møguleikar fyri kreativari sparring**

Umframt at leggja tiltøk og virksemi til rættis, kann hesin leikluturin hjá vitlíki blása nýtt lív í næstan allar partar av tínum degi. Tá ið **orkan á stovuni er høg**, kanst tú biðja tað um stillari/róligari útgávur av tí, tú longu hevði ætlað.

Um **tilfar brádliga manglar**, kann vitlíki skifta tað út beinanvegin – "sama hugskot, nýggj amboð" – og broyta eina máliverkætlan til eina útgávu við kriti ella klipp-og-klistran, uttan at tað steðgar gongdini.

Tá ið **umstøður broytast** (t.d. tøkt pláss ella tal av starvsfólki), kann vitlíki endurbyggja ætlanina til eina loysn, sum nú skal rigga í gongini, til eina úti-útgávu av ætlanini, ella til eina "lætta dagskrá" til eina stovu, ið manglar ein vaksnan.

Tað hóskar enntá til smærri løtur – skjót **prát í fruktsteðginum**, sum menna málið, ella stuttar **eftirmetingar eftir ein túr**, har børnini tekna, siga frá og minnast, hvat tey løgdu til merkis á túrinum.

Jú meira tú roynir teg, tess betur verur tú til at nýta vitlíki sum ein kreativur makkari – ein, sum heldur arbeiði títt frískt, smidligt og fult av smáum, ítøkiligum og lívgandi hugskotum.

Fleiri dømi um byrt eru at finna í brotinum: “Skjót byrt: sannroynd dømi at hvessa tínar vitlíkisførleikar”.

## **Trygdarhjálpari og eftirlitsfelagi**

Vitlíki kann vera tíni eyka eygu, sum skjótt gjøgnumganga tínar ætlanir og kannar, um tú hevur gloymt ella yvirsæð okkurt. Hetta minkar um vandan fyri, at týðandi smálutir verða gloymdir. Tað er sum at hava ein árvaknan starvsfelaga, ið hjálpir tær at betra tínar loysnir, vísir á møguligar yvirsæddar smálutir, og skjýtur upp hentar ábøtur. Hvørja ferð, tú stendur fyri eini avgerð – antin tú leggur eina útferð til rættis, handfert eina torføra støðu á stovuni ella skalt taka støðu til eina óvæntaða hending – kanst tú stutt lýsa tilgongdina ella loysnina fyri vitlíki. Tað kann skjótt vísa á møguligar trupulleikar, sum tú kanska ikki hevur hugsað um, koma við hugskotum til bøtur ella spakuliga bjóða tínum hugsanarhátt av fyri at tryggja, at tú hevur fingið allar týðandi smálutir við.

**Ímynda tær hesa støðuna:** Tú skalt við átjan 5-ára gomlum børnum og trimum vaksnum til ein væl vitjaðan, landsumfatandi rennidag. Har vera nógv fólk og nógvur larmur, og tú vilt hava vitlíki at eftirkanna okkurt ávíst: tín **"minnislista til tey vaksnu"** – bæði fyri at vita, um **týðandi lutir eru gloymdir**, og um **einfaldir eykalutir**, ið gera dagin lættari, mangla.

---

**Gott dømi um byrt (avrita/líma hetta inn):**

\--- prompt \---

Vit fara við átjan 5-ára gomlum børnum og 3 vaksnum til ein væl vitjaðan, landsumfatandi rennidag í Havn. Vit taka bussin oman í býðin og heim aftur aftaná. Har vera nógv fólk, nógvur larmur og skiftandi veður. **Her er okkara "minnislisti til tey vaksnu", sum hann sær út nú:**

* 3 eyðsýndar vestar til vaksin \+ 6 eyka vestar til børn  
* Bólkamerki: A/B/C band um hálsin \+ hóskandi klistrimerki  
* Einføld armbond til børnini við **bólkastavi**  
* Skrivipláta við rutukorti, avtalaðum møtistøðum og skrá fyri tiltakið  
* Lítil fyrstahjálparútgerð (plástur, reinsilappar, kuldaposi)  
* Vátlappar \+ hondspritt  
* Regnsløg til vaksin  
* 2 ruskposar (til vát klæðir)  
* Floytur til vaksin (1 í part)  
* Vatnfasta túsj \+ gaffateyp \+ minigrip-posar

Vinarliga **gjøgnumgang listan** og:

1. Ger vart við **týðandi lutir**, vit møguliga hava gloymt.  
2. Skjót upp nakrar **hentar eykalutir**, ið minka um ólag, og  
3. Kom við uppskoti um **einfaldar hættir at halda skil á** øllum so dagurin eydnast væl.

Svarið skal vera stutt og hent. Spyr vinaliga fyrst, um okkurt er ógreitt.

\--- prompt \---

---

**Uppfylgjandi byrt:** Um listin kennist ov rúgvismikil ella skal lagast til, skalt tú greitt tilskila, hvørjar broytingar tú vilt hava. Her eru nøkur dømi:

* "Ger minnislistan styttri – tak bara tað allar mest týðandi við."  
* "Gev mær eitt einfalt uppskot til eitt innandura eyka ítriv, um tað skuldi farið at pissa niður."

### Annað man kann nýta hesa rolluna til

Nú hyggja vit at aðrir hættir, hesin ‘eftirlitsfelagin’ kann stuðla tær í ymiskum støðum í arbeiðinum.

Hugsa um allar løturnar, tá ið eyka eygu kundu hjálpt:

* Ger skjótt eina **"hvat-kann-ganga-galið" kanning av ætlanini:** bið um 5 ting, ið kunnu ganga galið, og einfaldar loysnir fyri tey.  
* Royn tína avgerð við eini skjótari **"devulsins advokatur" kanning:** greið stutt frá ætlan tíni og fá 3 væl umhugsaðar avbjóðingar aftur.  
* Ger eina skjóta **inkluderings- & sansakanning:** fá at vita, hvør kundi kent seg uttanfyri, og fá uppskot til lættar tillagingar, so øll eru við.  
* Fá eina skjóta **váðamynd:** lat vitlíki gera eitt greitt Grønt/Gult/Reytt yvirlit yvir høvuðsváðarnar við stuttum grundgevingum.

Við at innlima henda stuðlandi vitlíkis-hjálparan í gerandisdagin, ert tú við til at skapa eitt tryggari, friðarligari og meira inkluderandi umhvørvi fyri øll.

Tú kanst síggja fleiri dømi um byrt í síðsta parti av vegleiðingini.

## **Søgusmiður, spælskipari og myndamakari**

Tá ið tær tørvar ein skjótan hátt at fanga áhugan hjá børnunum ella til at viðgera gerandisavbjóðingar, gerst hesin vitlíkis-leikluturin tín beinrakni, skapandi hjálpari. Ímynda tær at hava ein kláran søgusmið, sum kvikliga kann geva stuttar, minniligar frásøgur, ið eru nágreiniliga tillagaðar tínum evnum, nýligum upplivingum ella atferðaravbjóðingum í bólkinum. Antin tað snýr seg um at styrkja góðar vanar, hjálpa børnum at skilja torskild hugtøk, ella handfara samspælið á stovuni, so hjálpir vitlíki tær at finna júst røttu orðini ella myndirnar – og ger dagin stuttligari uttan at leggja eyka strongd á teg.

Ímynda tær hesa støðu:

Tín bólkur av lívligum 4-ára gomlum børnum í Klaksvík gloymir ferð eftir ferð at vaska sær um hendurnar eftir at hava spælt úti. Tær tørvar eina stuttliga søgu, ið er løtt at minnast, sum spakuliga minnir tey á, hví reinar hendur hava týdning, og sum brúkar staðbundin viðurskifti fyri at fáa boðskapin at festa seg.

**Gott dømi um byrt (avrita/líma hetta inn í kjattið):**

\--- prompt \---

Skriva eina stutta, stuttliga søgu (umleið 3 minuttir langa at lesa hart) til míni 4-ára gomlu børn í Klaksvík, sum minnir tey á, hví tað er umráðandi at vaska sær um hendurnar eftir at hava spælt úti.

Vinarliga flætta hesi føroysku orðini natúrliga inn í søguna: “hendur”, “reint”, “bakteriur” og “spælipláss”.

Ger hana viðkomandi og fangandi við at nevna vanlig úti-spøl, teimum dámar væl, so sum at spæla í sandinum, klatra ella taka steinar upp.

Úrtøka:

1\) Søgan (greið og einføld).

2\) Ein stuttur, endurtakandi setningur ella rørslur, sum børnini kunnu venja saman at enda.

Vinarliga spyr fyrst, um okkurt er ógreitt.

\--- prompt \---

**Uppfylgjandi birt (skjótar tillagingar):**

* **“Gott, ger nú eina mynd av persónunum úr søguni. Ger myndina í einum barnavinarligum akvarel-stíli.”**  
* “Ger søguna styttri og einfaldari.”  
* “Tak eitt stuttligt, talandi djór við, sum børnini fara at minnast.”  
* “Gev eitt uppskot til eina lítla rørslu, vit kunnu gera hvørja ferð fyri at styrkja handvaskið.”

---

**Aðrir hentir mátar at brúka henda leiklutin**

Hesin leikluturin er ikki avmarkaður til stuttar søgur ella skjótar áminningar – hann er tín fjølbroytti stovuhjálpari, altíð til reiðar at lívga gerandisdagin, handfara truplar støður ella ríka tíni evni við hugskotum til skapandi, fangandi tilfar.

**Lættari søguskriving**

Skapa skjótt stuttligar, fangandi søgur, ið eru fullkomiliga lagaður til gerandisdagin hjá bólkinum ella tíni evni. Hesar søgurnar hjálpa børnunum at læra og mennast, og broyta gerandisløtur til minniligar lærdómar. Tú kanst brúka vitlíki til at:

* Bjóða einum **nýggjum barni** vælkomnum, so tað kennir seg gott og trygt.  
* Gera stuttlig **leikrit til dukku-leikir**, sum læra um loysnir á trupulleikum ella sosialar førleikar.  
* Styrkja vitjanir ella útferðir við **“Ævintýrunum í gjár,”** og soleiðis knýta lærdómin at kendum staðbundnum støðum sum Viðarlundini ella havnarlagnum.  
* Viðgera trupla atferð sum **at vera smæðin, banna ella smáar ósemjur** gjøgnum søgur um djór ella samfelagið.  
* Greiða týðiliga frá torskildum hugtøkum sum **brandtrygd, bakteriur ella veður** í einum vinarligum tóna, ið hóskar til børn.

**Spøl og virksemi til eina og hvørja løtu**

Vitlíki hjálpir tær skjótt at leggja stuttlig og umfevnandi virksemi til rættis, serliga tá ið lagið á stovuni ella samspælið brádliga broytist. Tú kanst brúka vitlíki til at:

* Geva uppskot til **rørsluspøl** beinanvegin, so sum at herma eftir lokalum djórum ("flúgva sum ein lundi" ella "leypa sum eitt lamb"), ið hóska væl til skifti ella tá ið orka skal brúkast.  
* Menna **borðspøl ella bólkavirksemi** her og nú, sum eru tillagað bæði smædnum og lívligum børnum, og soleiðis tryggja, at øll børn kenna seg væl at luttaka.  
* Finna upp á skjót, stuttlig spøl til smærri løtur, so sum málmennandi spøl í matsteðginum ella meðan bíðað verður.

**Skjótar myndir og plakatir**

Vitlíki kann eisini tæna sum tín stovumyndprýðari, sum beinanvegin skapar hugnaligar myndir at lívga upp títt lærurúm. Brúka vitlíki til at:

* Gera einfaldar, barnavinarligar **akvarel-myndir**, sum fullkomiliga lýsa persónar ella støð úr tínum søgum.  
* Sniðgeva skjótar og dámligar **námsfrøðiligar plakatir**, t.d. um stigini í handvaski, ruddingarmanagongdir ella føroysk djóra-stavrøð.  
* Gera flottar **skráðir ella áminningar**, sum hjálpa degnum at ganga lættliga, og sum leiðbeina ynsktum vanum og skiftum hjá børnum.

Jú meira tú roynir teg fram, tess natúrligari og hjálpsamari gerst vitlíki í tínum dagliga arbeiði – tað gevur fjølbroytni, minkar um tína arbeiðsbyrðu og tendrar smáar gleðisneistar á stovuni.

---

# **Tín hjálpari til samskifti og skjalfesting**

At vera námsfrøðingur snýr seg um børnini – at skapa tryggleika, gleði og menning. Men krevjandi skriviarbeiði, so sum foreldrasamskifti og daglig skjalfesting, tekur ofta dýrabara tíð og orku, tá ið dagurin longu hevur verið langur of strævin.

Her kann vitlíki virka sum tín hjálpsami skrivari. Hugsa um hetta sum eitt samstarv: Tú letur fakta, fakligheit og endamál, og vitlíki umskapar tíni stuttu notat til professionellan tekst – antin tað er eitt vinaligt teldubræv til foreldur ella ein neyv tilburðarfrágreiðing til dagsbókina.

Tú skal altíð hava fult tamarhald. Vitlíki er tín skriviassistent, men tú ert redaktørurin.

### **Gullkornini: Soleiðis fært tú mest burturúr**

Fyri at fáa tey bestu úrslitini, er týdningarmikið at minnast til hesar grundreglur:

1. **Føroyskt er eitt “fyrsta útkast”:** Málsliga kunnanin hjá vitlíki er í menning. Viðgera altíð tekstin sum eitt grovt útkast. Tín uppgáva er at lesa tekstin hart, rætta orðingar og tryggja, at tónin er rættur.  
2. **Kontekstur er alt:** Vitlíki veit ikki, hvat hendi í dag, uttan so at tú sigur tað. Jú meira ítøkilig fakta tú gevur (hvat, nær, hvør), jú betri verður úrslitið.  
3. **Hjálp til tónan:** Vitlíki er serliga sterkt til at raka rætta tónan. Brúka tað til at gera stuttar boðskapir *vinaligari*, *róligari* ella *meira professionellar*.

---

### **Dømi 1: Foreldrasamskifti (Tá orðini skulu vegast)**

Brúka hetta, tá tú skal senda boð, sum krevja, at tú ert týðilig/ur, men samstundis vinalig/ur og uggandi.

**Uppskrift til byrt (prompt):**

1. **Leiklutur:** "Eg eri námsfrøðingur..."  
2. **Støða:** "Vit mugu senda børnini heim tíðliga vegna veður/sjúku..."  
3. **Fakta:** Klokkutíðir, telefonnummar, eykaætlan.  
4. **Krav:** "Skriva eina vinaliga og uggandi áminning."

**Gott dømi um byrt (avrita/líma inn í kjattið):**

\--- prompt \---

*Eg eri námsfrøðingur á einum dagstovni í Tórshavn (Føroyum).* Nógvur vindur er væntandi seinnapartin. Vit vilja biðja foreldur: Um gjørligt, vinarliga heintið børnini í seinasta lagi kl. **14:30**. Vit hava opið fyri familjur, sum ikki kunnu koma tíðliga.

**Eykaætlan:** Rólig innandura støð við virksemi; vanlig manning (starvsfólk í mun til børn); trygd fremst.

**Fakta, ið skulu við:**

* Dagur:   
* Heintitíðir: Umbiðin um tíðliga avheintan (14:30) um gjørligt, annars vanlig afturlatingartíð  
* Samband: Okkara telefon nummar er 311234

**Vinaliga skriva greitt og einfalt:**

1. **Boð til foreldur:** Eini uggandi boð (100–120 orð) á **føroyskum fyrst, síðan enskum og ukrainskum**.  
2. **Stutt SMS:** Tvær reglur við áminning á føroyskum, enskum og ukrainskum.  
3. **3 spurningar:**  
   * "Hvat um vit ikki kunnu heinta tíðliga?"  
   * "Hví er tað tryggari at heinta tíðliga?"  
   * "Broytast tíðirnar í morgin?"  
4. **Orðingarsavn til telefon:** Seks vinarligir, men greiðir setningar, eg kann brúka til skjótar uppringingar til stúrin foreldur.

**Skrivistílur:** Vanligt mál, stuttir setningar, róligt, uggandi og virðiligt.

Spyr meg, um okkurt er ógreitt, áðrenn tú byrjar at skriva.

\--- prompt \---  
---

### **Soleiðis rættar tú úrslitið skjótt**

Um fyrsta útkastið frá vitlíkinum ikki er heilt gott, kanst tú nýta stutt uppfylgjandi boð til at tillaga tað (heldur enn at skriva alt av nýggjum):

* **Stytt:** “Ger boðini styttri, maks 80 orð.”  
* **Tillaga tónan:** “Ger tað meira professionelt” ella “Ger tað meira vinaligt og óformelt.”  
* **Minka um feilir:** “Umskriva hetta til neutralt mál og tak øll dømandi orð burtur.”  
* **Miðil:** “Tillaga hetta til eitt SMS (maks 160 tekn).”

Hesin álítandi skrivarin kann meira enn bara gera dagligar frásagnir ella tilburðarfrágreiðingar \- hann kann tillaga og einfalda eina rúgvu av skjalfestingaruppgávum, og hjálpa tær at minka um arbeiðið uttan fyri vanliga arbeiðstíð og hava yvirlit, sjálvt tá ið nógv er at gera:

* **Skjótt at skipa tilburðarfrágreiðingar, klárar til oyðubløð,** burturúr nøkrum fáum stuttum notum, so tú kanst skjalfesta greitt og miðvíst, sjálvt tá ið tíðin er knøpp.

* **At gera vikuligar samanumtøkur til ein stuttan og realistiskan vana,** so tú kanst festa hæddarpunkt og varligar ávaringar á blað upp á fáar minuttir heldur enn tímar \- og fáa tíni vikuskiftiskvøld aftur.

* **Einfalt at gera innihaldsríkar samanumtøkur til menningarlýsingar,** við at binda tínar skjótu eygleiðingar beinleiðis at menningarmálum og koma við einføldum hugskotum til næstu stig, so regluligar eftirmetingar kennast natúrligar og yvirkomiligar.

* **Ómakaleyst at fyrireika greiðar fráboðanir á eina síðu til avloysarar ella nýggj starvsfólk,** vís bara vitlíki hvat tit søgdu við seinast nýggja starvsfólk og sig tí so frá hvat er broytt síðani tá, ella hvat er ørvísi hesaferð, so tillegar vitlíki tað gomlu fráboðanina.

* **Neutral umorðing (“sig hetta betur”) — Innanhýsis ella til avvarðandi**. Ger boðini greiðari og vinaligari; tekur dømandi orðingar burtur.  
* **Byrt:** “Umskriva hesi navnleysu boð í einum neutralum, vinaligum og einføldum máli. Halt teg bert til fakta. **Svara á føroyskum.** Vinarliga spyr fyrst, um okkurt er ógreitt.”

* **Áminning um avtalu/vitjan (við minnislista) — Til avvarðandi**. Minkar um mistøk; sigur nær/hvar og hvat skal takast við.  
* **Byrt:** “Skriva eina stutta áminning til í morgin. **Nær:** á morgni/fyri døgurða. **Møtistað:** høvuðsinngongdin. **Tak við:** Samleikaprógv og heitan jakka. Brúka ‘Búfólk A’. **Svara á føroyskum.** Ongar persónligar dátur. Vinarliga spyr fyrst, um okkurt er ógreitt.”

* **Stytt, tillaga til miðil \+ týð — Innanhýsis/Til avvarðandi.** Tillagar boðini til **SMS (≤160 tekn)** ella **Kjatt (≤300 tekn)**; varðveitir týdningin.  
* **Byrt:** “Stytt hesi notat niður til: a) SMS ≤160 tekn, b) Kjatt ≤300 tekn. Varðveit høvuðsinnihaldið. **Svara á føroyskum**. Vinarliga spyr fyrst, um okkurt er ógreitt.”

## **Skjót byrt: Realistisk dømi at hvessa tínar vitlíkisførleikar**

Niðanfyri finnur tú eitt savn av dømum upp á støður; tær eru uppspunnar, men liggja tætt at veruligum støðum, sum man dagliga finnur á dagstovnum. Hvørt dømi vísir, hvussu tað at leggja greiðan, ítøkiligan samanhang afturat tínum byrti hjálpir vitlíki at geva betri og meira tillagað svar.  
Brúka hesi byrt sum íblástur, og tillaga tey til tínar egnu umstøður fyri skjótt at gerast meistari í praktiskari vitlíkisnýtslu.

### 1\) Vend orkuni: Frá ruðuleika til ró

**Leiklutur hjá vitlíki:** Kreativur sparringspartnari

Støða:

Tað hevur regnað allan fyrrapart, og tit hava verið inni leingi. Børnini (3-5 ár) eru vorðin ógvuliga órólig – tey renna runt, rópa, og orkan er "høgt uppi undir loftinum". Tú kennir, at tú ert við at missa yvirlitið, og tær tørvar eitt "reset" fyri at fáa ró á bólkin áðrenn døgurða. Tá larmurin er høgur, er ringt at vera kreativur sjálvur – men vitlíki verður ikki stressað av larmi.

Hetta byrtið handlar um at biðja um eitt "her-og-nú" skifti frá høgari orku til djúpa konsentrasjón, uttan at brúka tíð á fyrireiking.

\--- prompt \---

Eg havi tørv á hjálp til at venda orkuni á stovuni *nú*.

Støðan:

Eg eri á eini stovu við 12 børnum (3-5 ár). Vit hava verið inni í allan dag vegna regn. Orkan er alt ov høg júst nú – børnini renna og larma. Eg vil ikki skelda, eg vil heldur fanga teirra forvitni og fáa pulsin niður. Vit eru 2 vaksin.

Tørvur:

Gev mær 3 uppskot til friðarligt spæl, sum vit kunnu byrja upp á 30 sekund.

**Treytir:**

1. **Eingin fyrireiking:** Eg kann bara brúka tað, sum er frammi (pútur, teppi, stólar ella bara kroppin).  
2. **Fokus:** Spælið skal krevja, at tey eru heilt still fyri at "vinna" ella luttaka.  
3. **Skifti:** Hvussu fangi eg uppmerksemdi teirra, tá tey larma sum mest? (Gev mær ein byrjanarsetning).

Vinarliga svara stutt og greitt.

\--- prompt \---

---

### **2\) Skift manglandi tilfar út í skundi**

**Leiklutur hjá vitlíki:** Kreativur sparringspartnari

**Støða:** Í dag í Klaksvík er tykkara listaskáp óvæntað læst, og kopimaskinan manglar tónara. Við bert 2 barnavinarligum saksum tøkum ert tú avmarkað/ur til litblýantar, papptallerkarnar, tape, tógvrestir, fløskulok og nakrar pappeskjur. Fyrireiking til døgurða byrjar kl. 11:15, so ruddingin má ganga ógvuliga skjótt. At siga vitlíki frá hesum óvæntaðu avmarkingum hjálpir at finna kreativar, men praktiskar loysnir beinanvegin, so títt virksemi kann halda fram uttan órógv.

\--- prompt \---  
Hjálp\! Í dag í Klaksvík er okkara listaskáp læst, og kopimaskinan er tóm fyri tónara.

* Mín bólkur: 9 børn (4–5 ár). Mítt mál: fínmotorikkur \+ lit-orð (reytt, blátt, gult, osf.).  
* Manglar: Alt tað góða... máling, lím, eyka saksar, kopimaskina.  
* Hvat vit *hava*: Litblýantar, papptallerkarnar, maskeringstape, tógvrestir, fløskulok, nakrar pappeskjur... men bara 2 barnavinarligar saksar til øll.  
* Tíðarætlan: Døgurðafyrireiking byrjar kl. 11:15, so eg havi brúk fyri, at ruddingin gongur skjótt. Og ongar ballónir loyvdar.

Kanst tú geva mær 3 avloysingarvirksemi \+ 1 útgávu heilt uttan tilfar?

Fyri hvørt, vinarliga tak við:

* Lýs virksemi  
* 3 stutt stig  
* 1 ruddingar-/trygdarnotat

Skal vera veruliga praktiskt, takk\!  
\--- prompt \---

---

### **3\) Fyrireika eina "neyðætlan" til morgindagin**

**Leiklutur hjá vitlíki:** Kreativur sparringspartnari

**Støða:** Á Tvøroyri fært tú at vita, at stovan skal málast í morgin. Tað merkir, at tú og tíni 12 børn (3–5 ár) verða flutt út í eina smala gongd. Tú veitst frammanundan, at tað verður rokaligt: viftur koyra, málingaluktur merkist, og ein køksvognur skal sleppa framvið kl. 10:15. Í staðin fyri at møta upp í morgin og stressa, brúkar tú vitlíki dagin fyri at gera eina ætlan, so tú hevur tamarhald á støðuni, áðrenn hon byrjar.

\--- prompt —

Í morgin verður okkara stova málað, so eg skal vera í gongini við 12 børnum (3–5 ár) í umleið ein tíma. Eg vil fegin hava eina klára ætlan, so tað ikki endar í óskili.

* **Umhvørvið:** Gongin er smøl (bara 1,4 m), har eru knaggar á aðrari síðuni, og ljósið sløknar, um ongin rørir seg.  
* **Avbjóðingar:** Viftur larma inni á stovuni, og kl. 10:15 kemur ein køksvognur koyrandi, sum skal sleppa framvið.  
* **Tema:** Veðurorð (*regn, vindur, kavi*).

Kundi tú gjørt mær eina **45 minuttir mikroskrá** til í morgin?

Eg havi tørv á:

1. 3 skiftandi støður (virksemi), sum rigga á smølum plássi.  
2. Eini trygdarrutinu júst til kl. 10:15, tá ið vognurin kemur (so øll standa still upp at vegginum).

Ger ætlanina realistiska fyri tvey vaksin at stýra.

---

### **4\) Ger eina skjóta "hvat-kann-ganga-galið" kanning av útferð**

**Leiklutur hjá vitlíki:** Trygdar- & minnislistavinur

**Støða:** Í morgin skalt tú hava 18 5-ára gomul børn við á blaðjakt í Viðarlundini í Tórshavn. Tykkara gonguruta fer framvið larmandi vegarbeiði við smølum gongubreytum, og hál bløð gera trappurnar í viðarlundini vandamiklar. Har er ein lág girðing kring eina tjørn, og vesið í kaféini plagar at vera fult umleið kl. 10:30. Veðrið sær út til at verða regn og vindur. Við hesum smálutum kann vitlíki skjótt vísa á veruligar váðar og praktiskar loysnir fyri at tryggja eina smidliga útferð.

\--- prompt \---  
Eg leggi eina útferð til rættis í morgin og vil fegin kanna hana fyri møguligar váðar. Vit fara við 18 5-ára gomlum børnum í Viðarlundina (blaðjakt) saman við 3 vaksnum.

* Váðar á rutuni, eg stúri fyri: larmandi vegarbeiði við smølum gongubreytum; hálar trappur í viðarlundini (bløð); har er ein lág girðing rundan um tjørnina; og vesið í kaféini verður ofta fult umleið kl. 10:30.  
* Veðurforsøgn: Ikki góð. Regn, 12–15 m/s í hvirlunum, umleið 7°C.

Kanst tú geva mær eina skjóta "hvat-kann-ganga-galið" kanning? Mær tørvar:

1. Topp 5 váðar, tú sært.  
2. Einfaldar loysnir fyri hvønn.  
3. Hvat skal sigast í eini 60-sekund starvsfólkakunning, áðrenn vit fara.

Mær tørvar bara stutt, praktisk ting, ongar persónligar dátur.  
\--- prompt \---  
---

### **5\) Koyr eina inklusións- & sansakanning**

**Leiklutur hjá vitlíki:** Trygdar- & minnislistavinur

**Støða:** Tú ert við at fyrireika eitt klippimynd-virksemi (collage) fyri tíggju 3-4 ára gomul børn í Sandavági. Rúmið hevur berar veggir, so akustikkurin er ikki góður, og eitt barn verður vanliga lætt yvirstimulerað. Tvey børn eru smæðin og nýggj, og eitt annað tosar ukrainskt. At deila hesar smálutir við vitlíki tryggjar, at tað veitir tillagaðar strategir til at handfara sansatørvir og umfevna øll á ein góðan hátt.

\--- prompt \---  
Hey, eg fyrireiki eitt virksemi í Sandavági. Vit gera eina fiska-klippimynd úr endurnýtslutilfari við 10 børnum (3–4 ár).

* Mín bólkaprofilur: Eg havi 1 barn, sum lættliga verður yvirstimulerað, 2 smæðin nýggj børn, og 1 barn við øðrum móðurmáli (ukrainskt).  
* Rúmið: Tað hevur ljómandi veggir. Vit sita øll um eitt borð.

Kundi tú vinarliga gjørt eina Grøn / Gul / Reyð inklusiónskanning fyri meg?

Eg leiti eftir:

* sannlíkar forðingar \+ ítøkiligar tillagingar (tilfar, ferð, sjónlig hjálp)  
* Hugskot til hvussu løtan kann eydnast eyka væl.  
* 1 rólig enda-rutina.

Skal vera stutt og gjørligt, takk\!  
\--- prompt \---  
---

### **6\) Samskifti tvørtur um mál og stúran (Foreldraboð)**

**Leiklutur hjá vitlíki:** Hjálpari til foreldrasamskifti

**Støða:** Tín flokkur skal vitja bjargingarstøðina í Fuglafirði. Tú hevur allar upplýsingarnar klárar, men tú stúrir fyri tveimum viðurskiftum: 1\) Summi foreldur eru ógvuliga bangin fyri sjónum og krevja vissu fyri trygdini, og 2\) tú hevur fleiri foreldur, sum ikki skilja føroyskt væl, og tað tekur tær langa tíð at týða boðini til enskt. Her sparir vitlíki tær tíð við at raka rætta "trygga" tónan og týða alt beinanvegin.

\--- prompt \---

Eg skal senda boð heim um ein túr á Bjargingarstøðina í Fuglafirði (20. nov, 09:45–11:15).

**Fakta:**

* **Hvat:** Vitja bjargingarstøðina, síggja bátarnar, hoyra um trygd.  
* **Minnist til:** Regnklæði, gummistivlar og góðan matpakka.

**Mín avbjóðing:**

1. Summi foreldur eru ógvuliga stúrin viðvíkjandi sjónum. Kanst tú orða boðini soleiðis, at vit leggja dent á, at **trygdin er í hásæti** (vit halda í hond, hava vestar á og eru langt frá kantinum), uttan at tað ljóðar ógvuliga álvarsligt?  
2. Vit hava fleiri foreldur, ið bara tosa enskt.

Uppgávan:

Skriva eini stutt, vinalig boð til foreldraappina.

* Fyrst á **føroyskum**.  
* Síðani eina **enska týðing** beint undir.

\--- prompt \---

---

### **7\) Fyrireiking: Ger rudding til eitt spæl**

**Leiklutur hjá vitlíki:** Kreativur sparringspartnari

**Støða:** Tú situr kvøldið fyri og leggur dagin í morgin til rættis. Veðurforsøgnin fyri Eiði sigur storm, so tit verða innandura allan dagin. Tú veitst av royndum, at tá ið børnini (4 ár) hava verið inni allan dagin, verður ruddingartíðin ofta rokalig. Tú vilt vera til reiðar og gera eina ætlan, sum ger ruddingina til ein spennandi part av degnum heldur enn eina keðiliga plikt.

\--- prompt \---

Eg eri við at fyrireika morgindagin á stovuni. Veðurforsøgnin sigur storm, so vit verða inni allan dagin við orkufullum 4-ára gomlum børnum. Eg vil fegin hava eina klára ætlan fyri ruddingartíðina, so hon ikki endar í roki.

**Hugskotið:** Eg vil gera ruddingina til eina "bjargingar-mission" móti storminum.

* **Rekvisittir:** Vit hava ein bláan kassa (Báturin), eina Lunda-handdukku (Skiparin) og eina klokku (ávaringarsignal).  
* **Málið:** Kubbarnir skulu "bjargast" upp í bátin, áðrenn stormurin (klokkan) kemur.

**Gev mær eina stutta "leik-uppskrift", sum eg kann brúka í morgin:**

1. **Intro:** Hvat skal eg siga (sum Lundi Skipari) fyri at seta spælið í gongd? (Mest 3 setningar).  
2. **Regla:** Eina stuttliga reglu fyri, hvussu mann leggur kubbar í kassan uttan at kasta teir.  
3. **Endi:** Hvat hendi, tá ið klokkan ringir (nær hava vit vunnið)?

Svara á natúrligum føroyskum.

\--- prompt \---

---

### **8\) Umsmelta punkt-notat til dagligar loggar**

**Leiklutur hjá vitlíki:** Skjalfestingarskrivari

**Støða:** Í Hoyvík heldur regn tykkum innandura; gongirnar lukta nýmálaðar, køksútvarpið órógvar, og tit máttu flyta samlingina fram. At lýsa hesar veruleikar greitt hjálpir vitlíki skjótt at skapa neyvar, samanhangandi dagligar loggar, sum fanga dagsins stemning og spara tær skrivitíð um kvøldið.

\--- prompt —

Eg royni at fáa míni notat liðug fyri barnagarðin í Hoyvík. Í dag helt regnið okkum innandura. Gongirnar luktaðu nýmálaðar, køksútvarpið órógvaði ov nógv, og vit máttu flyta samlingina fram.

* Míni grovu notat:  
  * Barn A: staplaði kubbar; taldi til fimm sjálvstøðugt.  
  * Barn B: veruliga áhugað/ur í hvalum; teknaði eina stóra hvalatonn.  
  * Bólkur: rólig deiling av litblýantum; óljóðstigið toppaði eftir millummálan; men tey fullu til ró við einum stillum sangi. (Okkara friðar-signal er tvey bank).

Kanst tú vinarliga gera hetta til 3 neutralar dagligar logg-innføringar? Mær tørvar eisini eitt ein-linju "næsta stig" fyri hvørt barn/bólk.

Vinarliga svara á natúrligum føroyskum.

\--- prompt —

---

### **9\) Skriva eina skipaða tilburðarfrágreiðing**

**Leiklutur hjá vitlíki:** Skjalfestingarskrivari

**Støða:** Í Vestmanna gleið eitt barn, tí frárenslið við vatnbakkan var tipt, og fekk eitt stórt sár á knæið. Tú hevur uggað barnið, lagt ein ísposa á, vaskað sárið og hevur longu sett teg í samband við foreldrini. At veita vitlíki hesar ítøkiligu smálutir letur tað gera eitt útkast til eina greiða, professionella tilburðarfrágreiðing beinanvegin, ið minkar um feilir og strongd.

\--- prompt \---

Vit høvdu júst eitt óhapp í Vestmanna, og eg skal skriva frágreiðingina.

* Hvat hendi: 13\. nov 2025, umleið kl. 10:12. Vatnbakkurin floymdi yvir (frárenslið var tipt), og Barn A gleið.  
* Skaði: Stórt sár á knæið.  
* Okkara viðgerð: Vit uggaðu barnið, brúktu ein ísposa, vaskaðu sárið, og hava longu kunnað foreldrini.

Kanst tú vinarliga gera eitt útkast til eina greiða, professionella tilburðarfrágreiðing fyri meg? Mær tørvar: hvat hendi, beinleiðis átøk, støðan hjá barninum, og tilmæli til uppfylging (t.d. kanning av frárensli, gólvmátta).

Halt tað stutt og greitt. Vinarliga svara á natúrligum føroyskum.

\--- prompt —
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

          {/* Hero Section with Image */}
          <div className="mb-12 sm:mb-16">
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
              <img 
                src={kindergartenHeroImg} 
                alt="Børn í barnagarði" 
                className="w-full h-48 sm:h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-white leading-tight tracking-tight drop-shadow-lg">
                  Vitlíki til dagstovnar
                </h1>
                <p className="mt-2 text-sm sm:text-base text-stone-100/90 font-serif max-w-xl drop-shadow-md">
                  Minni skriviarbeiði, meira spæl.
                </p>
              </div>
            </div>
          </div>

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