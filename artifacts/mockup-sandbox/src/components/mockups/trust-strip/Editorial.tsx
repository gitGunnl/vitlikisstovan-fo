const quotes = [
  {
    quote: "Sera væl nøgd – tillagað til júst tað, vit høvdu tørv á.",
    name: "Hildur Durhuus",
    role: "Nýskapan í ferðavinnuni 2026",
    org: "Samskipar",
  },
  {
    quote: "Bæði hugvekjandi og læruríkt – viðkomandi fyri leiðarar og starvsfólk.",
    name: "Reidar Luid",
    role: "Forritan og menning",
    org: "Betri Banki",
  },
  {
    quote: "Greið, viðkomandi og beinanvegin gagnlig í praksis.",
    name: "Elin Brimnes",
    role: "Arkitekt",
    org: "Kontrast",
  },
  {
    quote: "Gav okkum betri fatan og fleiri góð hugskot at taka víðari.",
    name: "Sigrið Zachariasen",
    role: "Dagligur leiðari",
    org: "Reyði Krossur Føroya",
  },
];

export function Editorial() {
  return (
    <div className="bg-slate-50 p-6 font-sans">
      <div className="max-w-md">
        <h2 className="text-lg font-bold text-slate-900 mb-4">
          Hetta siga okkara kundar
        </h2>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
            {quotes.map((item, i) => (
              <div key={i} className="relative">
                <span
                  className="absolute -top-2 -left-1 text-5xl font-['Playfair_Display'] text-teal-600/30 leading-none select-none pointer-events-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p className="text-[13px] text-slate-800 leading-relaxed pl-5 mb-2 font-['Playfair_Display'] italic">
                  {item.quote}
                </p>
                <p className="text-[11px] pl-5 uppercase tracking-wider">
                  <span className="font-bold text-slate-900">{item.name}</span>
                  <span className="text-slate-500"> — {item.org}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
