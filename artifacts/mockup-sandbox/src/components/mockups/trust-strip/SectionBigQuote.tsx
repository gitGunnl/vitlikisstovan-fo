const quotes = [
  { quote: "Sera væl nøgd – tillagað til júst tað, vit høvdu tørv á.", name: "Hildur Durhuus", role: "Nýskapan í ferðavinnuni 2026", org: "Samskipar" },
  { quote: "Bæði hugvekjandi og læruríkt – viðkomandi fyri leiðarar og starvsfólk.", name: "Reidar Luid", role: "Forritan og menning", org: "Betri Banki" },
  { quote: "Greið, viðkomandi og beinanvegin gagnlig í praksis.", name: "Elin Brimnes", role: "Arkitekt", org: "Kontrast" },
  { quote: "Gav okkum betri fatan og fleiri góð hugskot at taka víðari.", name: "Sigrið Zachariasen", role: "Dagligur leiðari", org: "Reyði Krossur Føroya" },
];

export function SectionBigQuote() {
  return (
    <div className="bg-slate-50 p-6 font-sans">
      <div className="max-w-md">
        <div className="flex items-start gap-3 mb-5">
          <div className="text-7xl font-['Playfair_Display'] text-teal-600 leading-[0.7] mt-1 select-none" aria-hidden="true">
            &ldquo;
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold text-teal-700 uppercase tracking-widest mb-1">
              Veruligar royndir
            </p>
            <h2 className="text-xl font-bold text-slate-900 leading-tight mb-1">
              Hetta siga okkara kundar
            </h2>
            <p className="text-[12px] text-slate-500 leading-snug">
              Frá veruligum fyritøkum og stovnum í Føroyum
            </p>
          </div>
        </div>
        <div className="space-y-2">
          {quotes.map((item, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-lg p-3">
              <p className="text-[13px] text-slate-700 leading-snug mb-1.5">"{item.quote}"</p>
              <p className="text-[11px] text-slate-500">
                <span className="font-semibold text-slate-800">{item.name}</span>, {item.role} · {item.org}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
