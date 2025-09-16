// client/src/content/blog/foroyskt-vitliki-2025-hvat-riggar-nu.ts

const post = {
  title:
    "Føroysk vitlíki modellir 2025: Hvat er tøkt, hvussu væl rigga tey – og hvat kunna tey brúkast til?",
  slug: "foroyskt-vitliki-2025-hvat-riggar-nu",
  excerpt:
    "Eitt skjótt yvirlit yvir føroysku modellini, meting av avrikum og ein hugleiðing um hvat eigur at mennast næst — við greiðum stigum fyri fyritøkur og gransking.",
  readTime: "12 min",
  author: "Vitlíkisstovan",
  // IMPORTANT: content is semantic HTML. Text is unchanged.
  content: `
<!-- Keep H1 for accessibility but hide visually to avoid duplicate page titles -->
<h1 class="sr-only">Føroyskt vitlíki 2025: Hvat riggar nú, hvar er fløskuhálsurin – og hvat eigur at mennast</h1>

<hr class="my-8 border-border/60" />

<section aria-labelledby="sec-1">
  <h2 id="sec-1">1) Hvat fært tú burtur úr at lesa hetta?</h2>
  <p>Hetta er títt skjóta innlit í føroyskt <strong>vitlíki</strong> í 2025: <em>Hvat finst, hvussu væl tað riggar í verki, og mín meining til hvat vit eiga at raðfesta næstu 12 mánaðirnar.</em> Vit hyggja uppá:</p>
  <ul>
    <li>eitt <strong>yvirlit</strong> yvir ymisku føroysku modellini,</li>
    <li>eina <strong>greiða strategi</strong>: set <strong>EN→FO týðing</strong> og <strong>føroyska talu til tekst</strong> fremst,</li>
    <li> <strong>hví dátur er fløskuhálsurin</strong> — og hvussu vit fáa gongd á eitt føroyskt dátuinfrakervi.</li>
  </ul>
  <p><em>Myndburðurin, vit brúka her, er einfaldur:</em> modell eru sum <strong>hamarar og sagir</strong>. Men ein hamari byggir ikki eitt hús sjálvur — ein dugnaligur persónur við røttum amboðum og røttum arbeiðsgongdum byggir hús við hamara. Tí er tað eisini umroðandi at byggja vitlíki amboð sum kunna brúkast til veruligt arbeiði.</p>

  <figure class="not-prose my-6">
    <img
      src="/images/blog/foroyskt-vitliki-2025/house-tools-analogy.png"
      alt="Verkstova image"
      class="w-full max-w-3xl mx-auto rounded-lg border shadow-sm"
      loading="lazy" decoding="async"
    />
  </figure>

  <hr class="my-8 border-border/60" />
</section>

<section aria-labelledby="sec-2">
  <h2 id="sec-2">2) Í stuttum</h2>
  <ul>
    <li>Vit hava longu eina fyrstu bylgju av <strong>føroyskum vitlíki‑amboðum</strong>. Tey eru <strong>brúkilig til nógv ting</strong> — men ikki klár til at vera brúkt allataðni.</li>
    <li><strong>Fløskuhálsurin er dátur</strong>: Granskarir hava alt ov lítið av føroyskum dátum at arbeiða við, og loyvini í hesum sambandi eru ofta ógreið. Hetta er ein <strong>infrakervisuppgáva</strong> sum onkur má fáa løn fyri at loysa.</li>
    <li><strong>Strategi nú:</strong> Raðfest <strong>enskt til føroyska týðing</strong> og <strong>føroyska talu til tekst (ASR)</strong> modell. Tey geva skjótast virði og leggja lunnar undir veruliga nýttu av vitlíki á Føroyskum.</li>
    <li><strong>Ikki jagstra eitt fullkomið føroyskt ChatGPT beint nú.</strong> Brúka heldur tað, vit hava (týðing + ASR) til <strong>smáar, álítandi loysnir</strong> — og fóðrið skipanirnar við <strong>betri dátum</strong>.</li>
    <li><strong>Fyritøkur kunnu gott byrja at nýta vitlíki í dag</strong>: Men tú fær besta úrsliti um tú arbeiður á enskum og bara týður til føroyskt tá ið tað er neyðugt. Hettar er óheppi fyri tað Føroyska máli á arbeiðis plássinum.</li>
    <li>Sjálvt um føroysku vitlíki amboðini ikki eru klár til nakað kunda vent, so kunna Fyritøkur spæla við føroyskt vitlíki til innanhýsis amboð, so sum at avskriva reinar ljóð upptøkur á Føroyskum ella geva innanhýsis amboðum eina <strong>føroyska rødd</strong>. <em>(Tú kann hoyra hvussu hettar ljóðar longur nirrið!)</em> </li>
  </ul>
  <hr class="my-8 border-border/60" />
</section>

<section aria-labelledby="sec-3">
  <h2 id="sec-3">3) Yvirlit: Hvørji modell eru tøk í dag?</h2>

  <div class="not-prose grid gap-6 md:grid-cols-2 my-6">
    <!-- EN→FO Card -->
    <div class="border border-border/60 rounded-lg p-6 bg-background shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <h5 class="font-bold text-lg">EN→FO týðing</h5>
        <span class="text-2xl">🟨</span>
      </div>
      <p>Amboð at týða enskan tekst til føroyskt.</p>
      <p class="text-sm text-muted-foreground mb-3">
        <strong>Modell:</strong> barbaroo/nllb_200_1.3B_en_fo
      </p>
      <div class="space-y-3">
        <div>
          <span class="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Styrkir</span>
          <p class="text-sm mt-2">Skal ikki nýta sergjørt birt til at rigga væl; Lætt at koyra á egnan <strong>servara</strong>; ofta javnbjóðis <strong>ChatGPT‑4o</strong></p>
        </div>
        <div>
          <span class="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">Veikleikar</span>
          <p class="text-sm mt-2">Slær ikki <strong>Gemini 2.5 Pro</strong>. Ikki púra líkatil at brúka fyri flest fólk.</p>
        </div>
        <div>
          <span class="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Nýtist til</span>
          <p class="text-sm mt-2">Týða alskyns enskar tekstir til Føroyskt. Týða LLM‑úrslit til føroyskt;</p>
        </div>
      </div>
    </div>

    <!-- ASR Card -->
    <div class="border border-border/60 rounded-lg p-6 bg-background shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <h5 class="font-bold text-lg">ASR (talu→tekst)</h5>
        <span class="text-2xl">🟨</span>
      </div>
      <p>Amboð at tosa á føroyskum og so verur talan umgjørdi til tekst. (transcribering)</p>
      <p class="text-sm text-muted-foreground mb-3">
        <strong>Modell:</strong> Whisper-large (føroyskt tillagað)
      </p>
      <div class="space-y-3">
        <div>
          <span class="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Styrkir</span>
          <p class="text-sm mt-2">Reinar upptøkur vera til <strong>lesiligan tekst</strong></p>
        </div>
        <div>
          <span class="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">Veikleikar</span>
          <p class="text-sm mt-2">Óljóð ger skjótt so úrslit vera væl vánaligari, kann ikki skilja ímillum tá tvey tosa í senn</p>
        </div>
        <div>
          <span class="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Nýtist til</span>
          <p class="text-sm mt-2">Notatir, skriva uttan at brúka hendurnar</p>
        </div>
      </div>
    </div>

    <!-- TTS Card -->
    <div class="border border-border/60 rounded-lg p-6 bg-background shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <h5 class="font-bold text-lg">TTS (tekst→talu)</h5>
        <span class="text-2xl">🟨</span>
      </div>
      <p>Amboð at fáa eina rødd at tosa út frá tekst man koyrur inn.</p>
      <p class="text-sm text-muted-foreground mb-3">
        <strong>Modell:</strong> Meta MMS TTS (fao)
      </p>
      
      <!-- Audio Player -->
      <div class="mb-4 p-3 bg-muted/30 rounded-lg border border-border/30">
        <div class="flex items-center gap-3">
          <button 
            id="tts-play-btn" 
            class="w-8 h-8 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center text-primary-foreground transition-colors"
            onclick="toggleTTSAudio()"
          >
            <svg id="play-icon" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <svg id="pause-icon" class="w-4 h-4 hidden" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
          </button>
          <div class="flex-1">
            <div class="text-sm font-medium mb-1">Føroysk talu dømi</div>
            <div class="flex items-center gap-2">
              <div class="flex-1 h-1 bg-border rounded-full overflow-hidden">
                <div id="progress-bar" class="h-full bg-primary transition-all duration-300" style="width: 0%"></div>
              </div>
              <span id="time-display" class="text-xs text-muted-foreground">0:00</span>
            </div>
          </div>
          <!-- Speaking Animation -->
          <div id="speaking-animation" class="hidden flex items-center gap-1">
            <div class="w-1 h-3 bg-primary rounded-full animate-pulse"></div>
            <div class="w-1 h-4 bg-primary rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
            <div class="w-1 h-2 bg-primary rounded-full animate-pulse" style="animation-delay: 0.4s"></div>
            <div class="w-1 h-5 bg-primary rounded-full animate-pulse" style="animation-delay: 0.6s"></div>
          </div>
        </div>
        <audio id="tts-audio" preload="metadata">
          <source src="/client/src/content/blog/faroese_long.wav" type="audio/wav">
          Tín browser støðir ikki audio.
        </audio>
      </div>

      <div class="space-y-3">
        <div>
          <span class="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Styrkir</span>
          <p class="text-sm mt-2">Klárt og lætt skiljandi</p>
        </div>
        <div>
          <span class="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">Veikleikar</span>
          <p class="text-sm mt-2">Mekanisk rødd, bara ein rødd</p>
        </div>
        <div>
          <span class="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Nýtist til</span>
          <p class="text-sm mt-2">Fráboðanir, innanhýsis amboð</p>
        </div>
      </div>
    </div>

    <script>
      function toggleTTSAudio() {
        const audio = document.getElementById('tts-audio');
        const playIcon = document.getElementById('play-icon');
        const pauseIcon = document.getElementById('pause-icon');
        const speakingAnimation = document.getElementById('speaking-animation');
        const progressBar = document.getElementById('progress-bar');
        const timeDisplay = document.getElementById('time-display');
        
        if (audio.paused) {
          audio.play();
          playIcon.classList.add('hidden');
          pauseIcon.classList.remove('hidden');
          speakingAnimation.classList.remove('hidden');
        } else {
          audio.pause();
          playIcon.classList.remove('hidden');
          pauseIcon.classList.add('hidden');
          speakingAnimation.classList.add('hidden');
        }
      }
      
      document.addEventListener('DOMContentLoaded', function() {
        const audio = document.getElementById('tts-audio');
        const progressBar = document.getElementById('progress-bar');
        const timeDisplay = document.getElementById('time-display');
        const playIcon = document.getElementById('play-icon');
        const pauseIcon = document.getElementById('pause-icon');
        const speakingAnimation = document.getElementById('speaking-animation');
        
        audio.addEventListener('timeupdate', function() {
          if (audio.duration) {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = progress + '%';
            
            const minutes = Math.floor(audio.currentTime / 60);
            const seconds = Math.floor(audio.currentTime % 60);
            timeDisplay.textContent = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
          }
        });
        
        audio.addEventListener('ended', function() {
          playIcon.classList.remove('hidden');
          pauseIcon.classList.add('hidden');
          speakingAnimation.classList.add('hidden');
          progressBar.style.width = '0%';
          timeDisplay.textContent = '0:00';
        });
      });
    </script>

    <!-- LLM Card -->
    <div class="border border-border/60 rounded-lg p-6 bg-background shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <h5 class="font-bold text-lg">Føroyskt LLM</h5>
        <span class="text-2xl">🟥</span>
      </div>
      <p>Eitt sindur sum ein Føroysk versión av ChatGPT.</p>
      <p class="text-sm text-muted-foreground mb-3">
        <strong>Modell:</strong> gptfo_instruct_6.7B
      </p>
      <div class="space-y-3">
        <div>
          <span class="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Styrkir</span>
          <p class="text-sm mt-2">Rættiliga lítið, kann koyrast á einum servara.</p>
        </div>
        <div>
          <span class="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">Veikleikar</span>
          <p class="text-sm mt-2">Óstøðugt, klombrut og ikki gott nokk til nakað veruligt arbeiði enn</p>
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
  <h2 id="sec-4">4) Hvussu góð eru hesi model so í verki?</h2>

  <h3 class="mt-8">🛠️ Enskt→ føroyskt (EN→ FO)</h3>

  <figure class="not-prose my-6">
    <img
      src="/images/blog/foroyskt-vitliki-2025/en-to-fo-translation.gif"
      alt="Hvussu tað riggar: enskan tekst in → føroyskan tekst út"
      class="w-full max-w-3xl mx-auto rounded-lg border shadow-sm"
      loading="lazy" decoding="async"
    />
    <figcaption class="mt-2 text-sm text-muted-foreground text-center"><em>enskur tekstur fer inn og føroyskur tekstur kemur út</em></figcaption>
  </figure>

  <p><strong>Hví hetta modelli hevur týdning:</strong> Um ensk→føroysk týðing riggar væl, ber til at leggja hana oman á ChatGPT, Gemini ella onnur stór málmodell og fáa úrslit á <strong>føroyskum, so tað kennist sum um modelli heilt natúrlig tosar Føroyskt</strong>. Sí mynd niðanfyri.</p>

<figure class="not-prose my-6">
  <img
    src="/images/blog/foroyskt-vitliki-2025/translation-pipeline-diagram.png"
    alt="Dømi um hvussu man kann nýta ein týðara saman við ChatGPT fyri at fáa svar at kennast føroysk"
    class="w-full max-w-3xl mx-auto rounded-lg border shadow-sm"
    loading="lazy" decoding="async"
  />
  <figcaption class="mt-2 text-sm text-muted-foreground text-center"><em>Dømi um hvussu man kann nýta ein týðara saman við ChatGPT fyri at fáa svar at kennast føroysk</em></figcaption>
</figure>

  <p><strong>Hvat er tøkt:</strong></p>
  <ul>
    <li><strong>barbaroo/nllb_200_1.3B_en_fo:</strong> Lutfalsliga <strong>lítið</strong> samanborið við ChatGPT; kann <strong>koyrast á einum servara</strong>.</li>
  </ul>

  <p><strong>Úrslit:</strong> ofta <strong>javnbjóðis ChatGPT‑4o</strong>, men <strong>slær ikki</strong> Gemini 2.5 Pro.</p>

  <div class="my-4 rounded-lg border bg-muted/40 p-4">
    <p class="m-0"><strong>Niðurstøða:</strong> 🟨 <strong>Brúkiligt amboð longu nú.</strong> <em>nllb_200_1.3B_en_fo</em> er eitt sterkt, opið val, sum í mongum førum <strong>er á støði við ChatGPT‑4o</strong>.</p>
  </div>

  <p><strong>Fyrimunir:</strong> Man kann hýsa tað sjálvur, krevur <strong>ikki serstøk birt</strong> (prompt) og brúkar nógv minni orku enn tildømis Gemini 2.5 Pro.</p>

  <p><strong>Hvat er so best:</strong> Undir røttum umstøðum er <strong>Gemini 2.5 Pro</strong> best til <strong>føroyskt</strong> sambært mínum royndum; tó krevur tað eitt gott birt og tað kann ikki hýsast innanhýsis.</p>

  <p>Tú kann royna modellið her: <a href="https://huggingface.co/spaces/barbaroo/English-Faroese" target="_blank" rel="noopener noreferrer">https://huggingface.co/spaces/barbaroo/English-Faroese</a></p>



  <hr class="my-8 border-border/60" />

  <h3 class="mt-8">🗣️ Føroysk tala→ tekst (ASR)</h3>

  <figure class="not-prose my-6">
    <img
      src="/images/blog/foroyskt-vitliki-2025/asr-speech-to-text.gif"
      alt="Faroese speech goes in, text comes out"
      class="w-full max-w-3xl mx-auto rounded-lg border shadow-sm"
      loading="lazy" decoding="async"
    />
    <figcaption class="mt-2 text-sm text-muted-foreground text-center"><em>føroysk tala fer inn, tekstur kemur út.</em></figcaption>
  </figure>

  <p><strong>Hví hetta modelli hevur týdning:</strong> Tað letur upp fyri tveimum vanligum nýtsluháttum:</p>
  <ol>
    <li><strong>Fundarsamandráttir</strong> (Har vitlíki skrivar alt niður sum verur tosa um á einum fundi)</li>
    <li><strong>At tosa við vitlíki</strong> heldur enn at skriva. (So man kann brúka tað í støðum har hendurnar ikki eru fríðar.)</li>
  </ol>

  <p><strong>Bakgrund:</strong> <strong>Verkætlanarbólkurin Ravnur</strong> undir <strong>Grunninum Talutøkni</strong> bygdi BLARK 1.0 og savnaði inn meira enn 100 tímar av føroyskari talu til sonevnda <strong>Ravnursson</strong>-savnið. Við hesum dátum hevur <strong>Carlos Daniel Hernández Mena</strong> (<strong>Reykjavík University / Language and Voice Lab</strong>) og <strong>Annika Simonsen</strong> (<strong>University of Iceland</strong>) tillagað <strong>Whisper-large</strong> til føroyskt mál.</p>

  <p><strong>Soleiðis riggar tað í dag:</strong></p>
  <ul>
    <li><strong>Styrkir:</strong> Reinar og stillar upptøkur verða avskrivaðar til <strong>lesiligan tekst</strong> við lutfalsliga fáum feilum.</li>
    <li><strong>Veikleikar:</strong> <strong>Óljóð, fólk ið tosa í munnin á hvørjum øðrum, málføri og fakmál</strong> eru framvegis ein avbjóðing.</li>
    <li><strong>Kann longu brúkast til:</strong> <strong>At avskriva</strong> tað sum ein einsamallur persónur sigur, tildømis ein framløga. Ella setast upp til eitt vitlíki model, so man kann tosa við vitlíki.</li>
    <li><strong>Næsta stigið:</strong> Tørvur er á meira dátum: <strong>fjøltáttaðum ljóðupptøkum við rætta loyvi</strong>, betri <strong>tolsemi fyri óljóði og at skipanin skilir, hvør tosar</strong>.</li>
  </ul>

  <div class="my-4 rounded-lg border bg-muted/40 p-4">
    <p class="m-0"><strong>Niðurstøða:</strong> 🟨 <strong>Ein sterk byrjan og er longu gott nokk til at kunna setast saman við vitlíki modellir.</strong> Hent í skipaðum umhvørvi, men riggar ikki í óskipaðum umhvørvi, har fleiri tosa í senn, enn</p>
  </div>

  <figure class="not-prose my-6">
    <img
      src="/images/blog/foroyskt-vitliki-2025/asr-pipeline-diagram.png"
      alt="Diagram of Faroese ASR setup"
      class="w-full max-w-3xl mx-auto rounded-lg border shadow-sm"
      loading="lazy" decoding="async"
    />
    <figcaption class="mt-2 text-sm text-muted-foreground text-center"><em>Dømi um hvussu modelli kann brúkast til at tosa við ChatGPT</em></figcaption>
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
    <figcaption class="mt-2 text-sm text-muted-foreground text-center"><em>føroyskur tekst fer inn og føroyskt tala kemur út.</em></figcaption>
  </figure>

  <p><strong>Hví hetta hevur týdning:</strong> Gevur skipanum eina <strong>føroyska rødd</strong> til fráboðanir og hondfría vitlíksnýtslu – og nógvar møguleikar fyri sjónveik.</p>
  <p><strong>Hvat vit hava:</strong> <strong>Meta MMS TTS (fao)</strong> — ein rødd, <strong>klár men mekanisk</strong>.</p>
  <p><strong>Hóskar nú til:</strong> Fráboðanir til sjónveik og innanhýsis amboð til fyritøkur.</p>
  <p><strong>Næsta stigið:</strong> <strong>At gera tað meira veruleika kent</strong> og <strong>fleiri røddir</strong>.</p>

  <div class="my-4 rounded-lg border bg-muted/40 p-4">
    <p class="m-0"><strong>Niðurstøða:</strong> 🟨 <strong>Brúkilig royndarútgáva.</strong> Hóskar væl til stutta talu frá skipanum; ikki til livandi upplestur ella kundavendar tænastur.</p>
  </div>

  <hr class="my-8 border-border/60" />

  <h3 class="mt-8">✍️ Føroyskt LLM (Føroyskt “ChatGPT”)</h3>

  <p><strong>Hugskotið:</strong> <em>gptfo_instruct_6.7B</em> (Barbara Scalvini) tekur ímóti føroyskum boðum, t.d. “Ger hetta meira vinarligt”, og umskrivar tekstin.</p>
  <p><strong>Veruleikin:</strong> <strong>Riggar</strong> sum eitt konsept prógv, men úrslitini eru <strong>klombrut</strong> og <strong>óstøðug</strong>. Sjálvt við góðum birtum <strong>megnar tað ikki at standa seg</strong> ímóti Gemini ella ChatGPT.</p>
  <p><strong>Hóskar nú til:</strong> Gransking og royndir.</p>
  <p><strong>Tað vantar:</strong> <strong>Nógv meira føroyskan tekst</strong> at venja seg uppá  (Dátatrupulleikin aftur!). Og so eisini meira gransking or royndir, hettar er ein ring uppgáva.</p>

  <div class="my-4 rounded-lg border bg-muted/40 p-4">
    <p class="m-0"><strong>Niðurstøða:</strong> 🟥 Á granskingarstigi, ikki klárt til nýtslu — og tað verður tað ikki uttan meira dátur.</p>
  </div>

  <hr class="my-8 border-border/60" />
</section>

<section aria-labelledby="sec-5">
  <h2 id="sec-5">5) Hvat kunnu fyritøkur gera í dag?</h2>

  <p>Amboð á byrjunarstigi kunnu gagna, um tey verða brúkt rætt.</p>

  <h3 class="mt-6">✅ Arbeið á enskum, týða at enda til føroyskt</h3>
  <p>Skriva uppkøst, legg til rættis og tak samanum á enskum við Copilot, Gemini ella ChatGPT. <strong>Týð síðani úrslitini til føroyskt</strong>, tá ið tað er neyðugt. Henda <strong>tvídeilda arbeiðsgongdin</strong> gevur tær størsta fyrimunin longu nú.</p>

  <h3 class="mt-6">🗣️ Avskriva reinar ljóðupptøkur</h3>
  <p>Føroyska talu‑til‑tekst‑modelli (ASR) megnar hampuliga væl at avskriva <strong>reinar ljóðupptøkur við einum, ið tosar í senn</strong>. Brúka tað til at goyma notatir, framløgur og uppkøst – og rætta tekstin til aftaná. Hettar kann eisini setast saman við eitt málmodel sum tildømis ChatGPT, soleiðis at man kann tosa við tað á Føroyskum.</p>

  <h3 class="mt-6">📣 Legg eina føroyska rødd afturat</h3>
  <p>Núverandi tekst‑til‑talu ljóðar eitt sindur mekaniskt, men er væl skiljandi. Tað hóskar væl til ymisk innanhýsis amboð í fyritøkuni ella til sjónveik.</p>

  <p><strong>Niðurstøðan:</strong> Tær tørvar ikki fullkomin amboð fyri at byrja. Við røttum birtum og einføldum arbeiðsgongdum <strong>kanst tú skapa gagnlig føroysk úrslit longu í dag.</strong></p>

  <hr class="my-8 border-border/60" />
</section>

<section aria-labelledby="sec-6">
  <h2 id="sec-6">6) Hvat skal raðfestast næstu 12 mánaðirnar</h2>
  <ol>
    <li><strong>Ein sterkur EN→FO týðari</strong> við nóg góðari góðsku at varðveita týdning og tónalag. Letur upp fyri <strong>føroyskum úrslitum</strong>, ið kennast natúrlig, bygd oman á altjóða stór málmodell. <strong>Samstundis:</strong> víðka og deil føroyska dátu grundarlagi við røttum loyvum. <em>Men onkur má fáa fyri løn at gera hetta!</em></li>
    <li><strong>ASR (tala→tekst), sum klárar ein vanligan fund</strong>. Amboðið má klára ymisk máldám, fólk ið tosa í munnin á hvørjum øðrum, og skrivstovu óljóð. <strong>Samstundis:</strong> savna fjølbroyttar, lógligar ljóðupptøkur við avskriftum; miðið eftir veruligum arbeiðstilburðum.</li>
    <li><strong>Betri føroyskt TTS (tekst→talu)</strong> — fleiri týðiligar og natúrligar røddir. <strong>Samstundis:</strong> røkta útalu-orðabók;.</li>
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
    <li>Føroysku vitlíkismodellini eru <strong>amboð,</strong> sum vinnan kann nýta at byggja spennandi ting burturúr longu í dag.</li>
    <li>Betri <strong>EN→FO</strong> <strong>týðing</strong> og <strong>talu til tekst modell</strong> geva <strong>skjótast virði</strong> og leggja <strong>lunnar</strong> undir alt víðari arbeiðir við vitlíki.</li>
    <li><strong>nllb_200_1.3B_en_fo</strong> er eitt <strong>sterkt opið val</strong> men <strong>Gemini 2.5 Pro</strong> er <strong>best</strong> í natúrligum føroyskum sambært mínum royndum.</li>
    <li><strong>Dátur</strong> (góðska, breidd og loyvi viðurskifti) eru <strong>høvuðsforðingin</strong> í víðarimenningini av føroyskum vitlíki — og loysnin er eitt toymi við greiðum leiklutum og veruligari fígging, so fólk kunnu fáa løn fyri at loysa hesa forðing.</li>
  </ul>

  <p><strong>Vitlíkisstovan</strong> byggir ikki amboð. <strong>Vit byggja hús.</strong></p>

  <p>Um tykkara toymi vil royna eitt av hesum amboðunum — ella vil hava eina erliga meting av, hvat er vert at gera — so hjálpa vit fegin.</p>
</section>
  `,
} as const;

export default post;
