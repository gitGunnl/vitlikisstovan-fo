// client/src/content/blog/foroyskt-vitliki-2025-hvat-riggar-nu.ts

const post = {
  title:
    "Føroyskt vitlíki 2025: Hvat riggar nú, hvar er fløskuhálsurin – og hvat eigur at mennast",
  slug: "foroyskt-vitliki-2025-hvat-riggar-nu",
  excerpt:
    "Eitt skjótt yvirlit yvir modellini, meting av avrikum og ein hugleiðing um hvat eigur at mennast næst — við greiðum stigum fyri fyritøkur og gransking.",
  date: "2025-09-09",
  readTime: "12 min",
  author: "Vitlíkisstovan",
  // IMPORTANT: content is semantic HTML. Text is unchanged.
  content: `
<!-- Keep H1 for accessibility but hide visually to avoid duplicate page titles -->
<h1 class="sr-only">Føroyskt vitlíki 2025: Hvat riggar nú, hvar er fløskuhálsurin – og hvat eigur at mennast</h1>

<hr class="my-8 border-border/60" />

<section aria-labelledby="sec-1">
  <h2 id="sec-1">1) Hvat fært tú burtur úr at lesa hetta?</h2>
  <p>Hetta er títt skjóta innlit í føroyskt <strong>vitlíki</strong> í 2025: <em>Hvat finst, hvussu væl tað riggar í verki, og hvat eiga vit at raðfesta næstu 12 mánaðirnar.</em> Tú sært:</p>
  <ul>
    <li>eitt <strong>yvirlit</strong> yvir ymisku føroysku modellini,</li>
    <li>eina <strong>greiða strategi</strong>: set <strong>EN→FO týðing</strong> og <strong>føroyska talu til tekst</strong> fremst,</li>
    <li>og <strong>hví dátur er fløskuhálsurin</strong> — og hvussu vit fáa gongd á eitt føroyskt dátuinfrakervi.</li>
  </ul>
  <p><em>Myndburðurin, vit brúka her, er einfaldur:</em> modell eru sum <strong>hamarar og sagir</strong>. Men ein hamari byggir ikki eitt hús — ein dugnaligur persónur við røttum amboðum og røttum arbeiðsgongdum byggir hús við hamara.</p>

  <figure class="not-prose my-6">
    <img
      src="/images/blog/foroyskt-vitliki-2025/house-tools-analogy.png"
      alt="Analogy: models are tools like hammers and saws; people and workflows build the house"
      class="w-full max-w-3xl mx-auto rounded-lg border shadow-sm"
      loading="lazy" decoding="async"
    />
  </figure>

  <hr class="my-8 border-border/60" />
</section>

<section aria-labelledby="sec-2">
  <h2 id="sec-2">2) Í stuttum</h2>
  <ul>
    <li>Vit hava eina fyrstu bylgju av <strong>føroyskum vitlíki‑amboðum</strong>. Tey eru <strong>brúkilig til nógv ting</strong> — men ikki klár til at gera veruligan mun allastaðni.</li>
    <li><strong>Fløskuhálsurin er dátur</strong>: Amboðini hava alt ov lítið av føroyskum dátum at arbeiða við, og loyvini í hesum sambandi eru ofta ógreið. Hetta er ein <strong>infrakervisuppgáva</strong>, ikki eitt frítíðarítriv. Onkur má fáa løn fyri at loysa hetta.</li>
    <li><strong>Strategi nú:</strong> Raðfest <strong>enskt→føroyska týðing</strong> og <strong>føroyska talu→tekst (ASR)</strong> modell. Tey geva skjótast virði og leggja lunnar undir alt hitt.</li>
    <li><strong>Ikki jagstra eitt fullkomið føroyskt ChatGPT beint nú.</strong> Brúka heldur tað, vit hava (týðing + ASR) til <strong>smáar, álítandi loysnir</strong> — og fóðrið skipanirnar við <strong>betri dátum</strong>.</li>
    <li><strong>Fyritøkur kunnu byrja í dag</strong>: arbeið á enskum → týð til føroyskt at enda; avskriva reinar ljóð upptøkur á Føroyskum; geva innanhýsis amboðum eina <strong>føroyska rødd</strong>.</li>
  </ul>
  <hr class="my-8 border-border/60" />
</section>

<section aria-labelledby="sec-3">
  <h2 id="sec-3">3) Yvirlit: Hvat finst í dag?</h2>

  <p><strong>Ikon‑legend:</strong> 🟩 klárt / 🟨 brúkilig roynd / 🟥 á granskingarstigi</p>

  <!-- Original Table Layout -->
  <div class="not-prose my-6 overflow-x-auto">
    <table class="table-auto w-full border border-border/60 rounded-lg overflow-hidden">
      <thead class="bg-muted/50">
        <tr>
          <th class="px-3 py-2 text-left">Evni</th>
          <th class="px-3 py-2 text-left">Modell / Tól</th>
          <th class="px-3 py-2 text-left">Støða</th>
          <th class="px-3 py-2 text-left">Styrkir</th>
          <th class="px-3 py-2 text-left">Veikleikar</th>
          <th class="px-3 py-2 text-left">Hvat hóskar til nú</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-border/50">
        <tr>
          <td class="px-3 py-3"><strong>EN→FO týðing</strong></td>
          <td class="px-3 py-3">barbaroo/<strong>nllb_200_1.3B_en_fo</strong></td>
          <td class="px-3 py-3">🟨</td>
          <td class="px-3 py-3">Lætt at koyra á egnan <strong>servara</strong>; ofta javnbjóðis <strong>ChatGPT‑4o</strong></td>
          <td class="px-3 py-3">Slær ikki <strong>Gemini 2.5 Pro</strong></td>
          <td class="px-3 py-3">Týða LLM‑úrslit til føroyskt; trygg dátustýring</td>
        </tr>
        <tr>
          <td class="px-3 py-3"><strong>ASR (talu→tekst)</strong></td>
          <td class="px-3 py-3"><strong>Whisper‑large</strong> (føroyskt tillagað)</td>
          <td class="px-3 py-3">🟨</td>
          <td class="px-3 py-3">Reinar upptøkur → <strong>lesiligur tekstur</strong></td>
          <td class="px-3 py-3">Óljóð, um tvey tosa í senn, málføri/fakmál</td>
          <td class="px-3 py-3">Notatir, protokollar</td>
        </tr>
        <tr>
          <td class="px-3 py-3"><strong>TTS (tekst→talu)</strong></td>
          <td class="px-3 py-3"><strong>Meta MMS TTS (fao)</strong></td>
          <td class="px-3 py-3">🟨</td>
          <td class="px-3 py-3">Klárt og skiljandi</td>
          <td class="px-3 py-3">Mekanisk, fáar røddir</td>
          <td class="px-3 py-3">Fráboðanir, innanhýsis amboð</td>
        </tr>
        <tr>
          <td class="px-3 py-3"><strong>Føroyskt LLM</strong></td>
          <td class="px-3 py-3"><strong>gptfo_instruct_6.7B</strong></td>
          <td class="px-3 py-3">🟥</td>
          <td class="px-3 py-3">Konseptprógv</td>
          <td class="px-3 py-3">Óstøðugt, klombrut</td>
          <td class="px-3 py-3">Gransking/royndir</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="not-prose grid gap-6 md:grid-cols-2 my-6">
    <!-- EN→FO Card -->
    <div class="border border-border/60 rounded-lg p-6 bg-background shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <h5 class="font-bold text-lg">EN→FO týðing</h5>
        <span class="text-2xl">🟨</span>
      </div>
      <p class="text-sm text-muted-foreground mb-3">
        <strong>Modell:</strong> barbaroo/nllb_200_1.3B_en_fo
      </p>
      <div class="space-y-3">
        <div>
          <span class="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Styrkir</span>
          <p class="text-sm mt-2">Lætt at koyra á egnan <strong>servara</strong>; ofta javnbjóðis <strong>ChatGPT‑4o</strong></p>
        </div>
        <div>
          <span class="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">Veikleikar</span>
          <p class="text-sm mt-2">Slær ikki <strong>Gemini 2.5 Pro</strong></p>
        </div>
        <div>
          <span class="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Nýtist til</span>
          <p class="text-sm mt-2">Týða LLM‑úrslit til føroyskt; trygg dátustýring</p>
        </div>
      </div>
    </div>

    <!-- ASR Card -->
    <div class="border border-border/60 rounded-lg p-6 bg-background shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <h5 class="font-bold text-lg">ASR (talu→tekst)</h5>
        <span class="text-2xl">🟨</span>
      </div>
      <p class="text-sm text-muted-foreground mb-3">
        <strong>Modell:</strong> Whisper-large (føroyskt tillagað)
      </p>
      <div class="space-y-3">
        <div>
          <span class="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Styrkir</span>
          <p class="text-sm mt-2">Reinar upptøkur → <strong>lesiligur tekstur</strong></p>
        </div>
        <div>
          <span class="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">Veikleikar</span>
          <p class="text-sm mt-2">Óljóð, um tvey tosa í senn, málføri/fakmál</p>
        </div>
        <div>
          <span class="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Nýtist til</span>
          <p class="text-sm mt-2">Notatir, protokollar</p>
        </div>
      </div>
    </div>

    <!-- TTS Card -->
    <div class="border border-border/60 rounded-lg p-6 bg-background shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <h5 class="font-bold text-lg">TTS (tekst→talu)</h5>
        <span class="text-2xl">🟨</span>
      </div>
      <p class="text-sm text-muted-foreground mb-3">
        <strong>Modell:</strong> Meta MMS TTS (fao)
      </p>
      <div class="space-y-3">
        <div>
          <span class="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Styrkir</span>
          <p class="text-sm mt-2">Klárt og skiljandi</p>
        </div>
        <div>
          <span class="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">Veikleikar</span>
          <p class="text-sm mt-2">Mekanisk, fáar røddir</p>
        </div>
        <div>
          <span class="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Nýtist til</span>
          <p class="text-sm mt-2">Fráboðanir, innanhýsis amboð</p>
        </div>
      </div>
    </div>

    <!-- LLM Card -->
    <div class="border border-border/60 rounded-lg p-6 bg-background shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <h5 class="font-bold text-lg">Føroyskt LLM</h5>
        <span class="text-2xl">🟥</span>
      </div>
      <p class="text-sm text-muted-foreground mb-3">
        <strong>Modell:</strong> gptfo_instruct_6.7B
      </p>
      <div class="space-y-3">
        <div>
          <span class="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Styrkir</span>
          <p class="text-sm mt-2">Konseptprógv</p>
        </div>
        <div>
          <span class="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">Veikleikar</span>
          <p class="text-sm mt-2">Óstøðugt, klombrut</p>
        </div>
        <div>
          <span class="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Nýtist til</span>
          <p class="text-sm mt-2">Gransking/royndir</p>
        </div>
      </div>
    </div>
  </div>

  <hr class="my-8 border-border/60" />
</section>

<section aria-labelledby="sec-4">
  <h2 id="sec-4">4) Hvussu gott er hetta í verki?</h2>

  <h3 class="mt-8">🛠️ Enskt→ føroyskt (EN→ FO)</h3>

  <figure class="not-prose my-6">
    <img
      src="/images/blog/foroyskt-vitliki-2025/en-to-fo-translation.gif"
      alt="Hvussu tað riggar: enskan tekst in → føroyskan tekst út"
      class="w-full max-w-3xl mx-auto rounded-lg border shadow-sm"
      loading="lazy" decoding="async"
    />
    <figcaption class="mt-2 text-sm text-muted-foreground text-center"><em>[small image showing english text goes in and Faroese text goes out. gif]</em></figcaption>
  </figure>

  <p><strong>Hví hetta hevur týdning:</strong> Um ensk→føroysk týðing riggar væl, ber til at leggja hana oman á ChatGPT, Gemini ella onnur stór málmodell og fáa úrslit á <strong>føroyskum, ið kennast heilt natúrlig</strong>. Sí mynd niðanfyri.</p>

  <p><strong>Hvat er tøkt:</strong></p>
  <ul>
    <li><strong>barbaroo/nllb_200_1.3B_en_fo:</strong> Lutfalsliga <strong>lítið</strong> samanborið við ChatGPT; kann <strong>koyrast á einum servara</strong>.</li>
  </ul>

  <p><strong>Úrslit:</strong> ofta <strong>javnbjóðis ChatGPT‑4o</strong>, men <strong>slær ikki</strong> Gemini 2.5 Pro.</p>

  <div class="my-4 rounded-lg border bg-muted/40 p-4">
    <p class="m-0"><strong>Niðurstøða:</strong> 🟨 <strong>Brúkiligt amboð longu nú.</strong> <em>nllb_200_1.3B_en_fo</em> er eitt sterkt, opið val, sum í mongum førum <strong>er á støði við ChatGPT‑4o</strong>.</p>
  </div>

  <p><strong>Fyrimunir:</strong> Man kann hýsa tað sjálvur, krevur <strong>ikki serstøk birt</strong> (prompt) og brúkar nógv minni orku enn tildømis Gemini 2.5 Pro.</p>

  <p><strong>Hvat er so best:</strong> Undir røttum umstøðum er <strong>Gemini 2.5 Pro</strong> best til <strong>føroyskt</strong> sambært mínum royndum; tó krevur tað eitt gott birt og man kann ikki sjálv/ur hýsa modellinum.</p>

  <p>Tú kann royna modellið her: <em>[link]</em></p>

  <figure class="not-prose my-6">
    <img
      src="/images/blog/foroyskt-vitliki-2025/translation-pipeline-diagram.png"
      alt="Diagram of translation setup layered over general LLM output"
      class="w-full max-w-3xl mx-auto rounded-lg border shadow-sm"
      loading="lazy" decoding="async"
    />
    <figcaption class="mt-2 text-sm text-muted-foreground text-center"><em>[diagram of translation setup]</em></figcaption>
  </figure>

  <hr class="my-8 border-border/60" />

  <h3 class="mt-8">🗣️ Føroysk tala→ tekst (ASR)</h3>

  <figure class="not-prose my-6">
    <img
      src="/images/blog/foroyskt-vitliki-2025/asr-speech-to-text.gif"
      alt="Faroese speech goes in, text comes out"
      class="w-full max-w-3xl mx-auto rounded-lg border shadow-sm"
      loading="lazy" decoding="async"
    />
    <figcaption class="mt-2 text-sm text-muted-foreground text-center"><em>[small image of faroese speech goes in, text comes out.]</em></figcaption>
  </figure>

  <p><strong>Hví hetta hevur týdning:</strong> Tað letur upp fyri tveimum vanligum nýtsluháttum:</p>
  <ol>
    <li><strong>Fundarsamandráttir</strong></li>
    <li><strong>At tosa við vitlíki</strong> heldur enn at skriva.</li>
  </ol>

  <p><strong>Bakgrund:</strong> <strong>Verkætlanarbólkurin Ravnur</strong> undir <strong>Grunninum Talutøkni</strong> bygdi BLARK 1.0 og savnaði inn meira enn 100 tímar av føroyskari talu til sonevnda <strong>Ravnursson</strong>-savnið. Við hesum dátum hevur <strong>Carlos Daniel Hernández Mena</strong> (<strong>Reykjavík University / Language and Voice Lab</strong>) og <strong>Annika Simonsen</strong> (<strong>University of Iceland</strong>) tillagað <strong>Whisper-large</strong> til føroyskt mál.</p>

  <p><strong>Soleiðis riggar tað í dag:</strong></p>
  <ul>
    <li><strong>Styrkir:</strong> Reinar og stillar upptøkur verða avskrivaðar til <strong>lesiligan tekst</strong> við lutfalsliga fáum feilum.</li>
    <li><strong>Veikleikar:</strong> <strong>Óljóð, fólk ið tosa í munnin á hvørjum øðrum, málføri og fakmál</strong> eru framvegis ein avbjóðing.</li>
    <li><strong>Kann longu brúkast til:</strong> <strong>At avskriva</strong> og til fyrstu royndir við fundarupptøkum.</li>
    <li><strong>Næsta stigið:</strong> Tørvur er á meira dátum: <strong>fjøltáttaðum ljóðupptøkum við rætta loyvi</strong>, betri <strong>tolsemi fyri óljóði og at skipanin skilir, hvør tosar</strong>.</li>
  </ul>

  <div class="my-4 rounded-lg border bg-muted/40 p-4">
    <p class="m-0"><strong>Niðurstøða:</strong> 🟨 <strong>Ein sterk byrjan.</strong> Hent í skipaðum umhvørvi, men riggar ikki í óskipaðum umhvørvi, har fleiri tosa í senn, enn</p>
  </div>

  <figure class="not-prose my-6">
    <img
      src="/images/blog/foroyskt-vitliki-2025/asr-pipeline-diagram.png"
      alt="Diagram of Faroese ASR setup"
      class="w-full max-w-3xl mx-auto rounded-lg border shadow-sm"
      loading="lazy" decoding="async"
    />
    <figcaption class="mt-2 text-sm text-muted-foreground text-center"><em>[diagram of speech setup]</em></figcaption>
  </figure>

  <hr class="my-8 border-border/60" />

  <h3 class="mt-8">📣 Føroyskur tekstur→ talu (TTS)</h3>

  <figure class="not-prose my-6">
    <img
      src="/images/blog/foroyskt-vitliki-2025/tts-text-to-speech.gif"
      alt="Faroese text to speech block"
      class="w-full max-w-3xl mx-auto rounded-lg border shadow-sm"
      loading="lazy" decoding="async"
    />
    <figcaption class="mt-2 text-sm text-muted-foreground text-center"><em>[small diagram showing faroese text goes in and faroese sound comes out.]</em></figcaption>
  </figure>

  <p><strong>Hví hetta hevur týdning:</strong> Gevur skipanum eina <strong>føroyska rødd</strong> til fráboðanir og hondfría vitlíksnýtslu – og nógvar møguleikar fyri sjónveik.</p>
  <p><strong>Hvat vit hava:</strong> <strong>Meta MMS TTS (fao)</strong> — ein rødd, <strong>klár men mekanisk</strong>.</p>
  <p><strong>Hóskar nú til:</strong> Fráboðanir og innanhýsis amboð.</p>
  <p><strong>Næsta stigið:</strong> <strong>At gera tað meira veruleikakent</strong> og <strong>fleiri røddir</strong>.</p>

  <div class="my-4 rounded-lg border bg-muted/40 p-4">
    <p class="m-0"><strong>Niðurstøða:</strong> 🟨 <strong>Brúkilig royndarútgáva.</strong> Hóskar væl til stutta talu frá skipanum; ikki til livandi upplestur.</p>
  </div>

  <hr class="my-8 border-border/60" />

  <h3 class="mt-8">✍️ Føroyskt LLM (Føroyskt “ChatGPT”)</h3>

  <p><strong>Hugskotið:</strong> <em>gptfo_instruct_6.7B</em> (Barbara Scalvini) tekur ímóti føroyskum boðum, t.d. “Ger hetta meira vinarligt”, og umskrivar tekstin.</p>
  <p><strong>Veruleikin:</strong> <strong>Riggar</strong> sum eitt konseptprógv, men úrslitini eru <strong>klombrut</strong> og <strong>óstøðug</strong>. Sjálvt við mentanarligum birtum <strong>megnar tað ikki at standa seg</strong> ímóti Gemini ella ChatGPT.</p>
  <p><strong>Hóskar nú til:</strong> Gransking og royndir.</p>
  <p><strong>Tað vantar:</strong> <strong>Nógv meira føroyskan tekst</strong> at venja seg uppá. (Dátatrupulleikin aftur!)</p>

  <div class="my-4 rounded-lg border bg-muted/40 p-4">
    <p class="m-0"><strong>Niðurstøða:</strong> 🟥 Á granskingarstigi, ikki klárt til vanliga nýtslu — og tað verður tað ikki uttan meira dátur.</p>
  </div>

  <hr class="my-8 border-border/60" />
</section>

<section aria-labelledby="sec-5">
  <h2 id="sec-5">5) Hvat kunnu fyritøkur gera í dag?</h2>

  <p>Amboð á byrjunarstigi kunnu gagna, um tey verða brúkt rætt.</p>

  <h3 class="mt-6">✅ Arbeið á enskum, týð at enda til føroyskt</h3>
  <p>Skriva uppkøst, legg til rættis og tak samanum á enskum við Copilot, Gemini ella ChatGPT. <strong>Týð síðani úrslitini til føroyskt</strong>, tá ið tað er neyðugt. Henda <strong>tvídeilda arbeiðsgongdin</strong> gevur tær størsta fyrimunin longu nú.</p>

  <h3 class="mt-6">🗣️ Avskriva reinar ljóðupptøkur</h3>
  <p>Føroyska talu‑til‑tekst‑modelli (ASR) megnar hampuliga væl at avskriva <strong>reinar ljóðupptøkur við einum, ið tosar í senn</strong>. Brúka tað til at goyma notatir, samandráttir og uppkøst – og rætta tekstin til aftaná.</p>

  <h3 class="mt-6">📣 Legg eina føroyska rødd afturat</h3>
  <p>Núverandi tekst‑til‑talu ljóðar eitt sindur mekaniskt, men er væl skiljandi. Tað hóskar væl til ymisk innanhýsis amboð.</p>

  <p><strong>Niðurstøðan:</strong> Tær tørvar ikki fullkomin amboð fyri at byrja. Við røttum birtum og einføldum arbeiðsgongdum <strong>kanst tú skapa gagnlig føroysk úrslit longu í dag.</strong></p>

  <hr class="my-8 border-border/60" />
</section>

<section aria-labelledby="sec-6">
  <h2 id="sec-6">6) Hvat skal raðfestast næstu 12 mánaðirnar</h2>
  <ol>
    <li><strong>Ein sterkur EN→FO týðari</strong> við nóg góðari góðsku at varðveita týdning og tónalag. Letur upp fyri <strong>føroyskum úrslitum</strong>, ið kennast natúrlig, bygd oman á altjóða stór málmodell. <strong>Samstundis:</strong> víðka og deil føroysk tekstsøvn tvørtur um fakøki; <em>men onkur má fáa fyri løn at gera hetta!</em></li>
    <li><strong>ASR (tala→tekst), sum klárar fundir</strong>. Amboðið má klára ymiskan máldám, fólk ið tosa í munnin á hvørjum øðrum, og skrivstovuljóð; grundleggjandi skil á, hvør tosar (diarisering). <strong>Samstundis:</strong> savna fjølbroyttar, lógligar ljóðupptøkur við avskriftum; miðið eftir veruligum arbeiðstilburðum.</li>
    <li><strong>Einfalt, neutralt føroyskt TTS (tekst→talu)</strong> — ein týðilig, natúrlig rødd. <strong>Samstundis:</strong> røkta útalu-orðabók;.</li>
  </ol>
  <p><strong>Leggið til viks í løtuni:</strong> Eitt fullkomið føroyskt LLM. Hjálpið heldur vinnuni við amboðum, tey hava brúk fyri.</p>

  <hr class="my-8 border-border/60" />
</section>

<section aria-labelledby="sec-7">
  <h2 id="sec-7">7) Dátur eru fløskuhálsurin – soleiðis loysa vit tað</h2>
  <p>Góðska í vitlíki fylgir <strong>dátugóðsku</strong>. Okkum tørvar <strong>føroysk tekst‑ og ljóðsøvn</strong> við <strong>hágóðsku, breidd og røttum loyvum</strong>. Hetta er ein <strong>mál‑infrakervisuppgáva</strong>, ikki eitt frítíðarítriv — so onkur má fáa pengar fyri at arbeiða við hesum.</p>

  <p>Hvat krevst nú:</p>
  <ul>
    <li>Eitt <strong>greitt yvirlit</strong> yvir, hvørjar dátur finnast, og hvørji rættindi fylgja við.</li>
    <li>Ein <strong>ætlan</strong> fyri, hvussu man skjótast og snildast kann víðkað savnið.</li>
    <li>Lærdómar frá <strong>øðrum smámálslondum</strong>.</li>
    <li>Fólk, sum verða <strong>lønt</strong> fyri at gera arbeiðið.</li>
  </ul>

  <hr class="my-8 border-border/60" />
</section>

<section aria-labelledby="sec-9">
  <h2 id="sec-9">9) Ein tøkk skal ljóðað</h2>
  <p>Hesi amboð eru til, tí onkur hevur gjørt tey. Takk til <strong>Barbaru Scalvini</strong> og toymið á <strong>Máltøknideplinum á Setrinum</strong> fyri føroyska máltøknimenning; til <strong>Verkætlanarbólkin Ravnur</strong> undir <strong>Grunninum Talutøkni</strong> fyri <strong>BLARK 1.0</strong>; og til <strong>Carlos Daniel Hernández Mena</strong> (<strong>Language and Voice Lab, Háskólinn í Reykjavík</strong>) og <strong>Anniku Simonsen</strong> (<strong>Háskóli Íslands</strong>) fyri <strong>Ravnursson</strong>‑savnið og tillaging av <strong>Whisper‑large</strong> til føroyskt.</p>
  <p><em>Um onkur viðurkenning vantar ella er skeiv, sigið mær frá — eg vil gjarna hava at hetta er rætt.</em></p>

  <hr class="my-8 border-border/60" />
</section>

<section aria-labelledby="sec-10">
  <h2 id="sec-10">10) Niðurstøður og endi (og hvat tit gera nú)</h2>

  <p><strong>Niðurstøður:</strong></p>
  <ul>
    <li>Føroysku vitlíkismodellini eru <strong>amboð,</strong> sum vinnan kann nýta at byggja spennandi ting burturúr.</li>
    <li><strong>EN→FO</strong> <strong>týðing</strong> og <strong>talu til tekst modell</strong> geva <strong>skjótast virði</strong> og leggja <strong>lunnar</strong> undir alt víðari arbeiðir við vitlíki.</li>
    <li><strong>nllb_200_1.3B_en_fo</strong> er eitt <strong>sterkt opið val</strong>; <strong>Gemini 2.5 Pro</strong> er <strong>best</strong> í natúrligum føroyskum sambært mínum royndum.</li>
    <li><strong>Dátur</strong> (góðska, breidd og loyvisviðurskifti) eru <strong>høvuðsforðingin</strong> í víðarimenningini av føroyskum vitlíki — og loysnin er eitt toymi við greiðum leiklutum og veruligari fígging, so fólk kunnu fáa løn fyri at loysa hesa forðing.</li>
  </ul>

  <p><strong>Vitlíkisstovan</strong> byggir ikki amboð. <strong>Vit byggja hús.</strong></p>

  <p>Um tykkara toymi vil royna eitt av hesum verkfløðum — ella vil hava eina erliga meting av, hvat er vert at gera — so hjálpa vit fegin.</p>
</section>
  `,
} as const;

export default post;
