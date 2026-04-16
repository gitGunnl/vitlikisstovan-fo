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

export function AccentBar() {
  return (
    <div className="bg-slate-50 py-12 px-4 sm:px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm text-slate-400 mb-8 text-center tracking-wide uppercase">
          Viðkomandi fyri fyritøkur og stovnar í Føroyum
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {quotes.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-sm pl-4 pr-5 py-5 border-l-[3px] border-teal-500"
            >
              <p className="text-sm text-slate-700 leading-relaxed mb-4">
                "{item.quote}"
              </p>
              <p className="text-sm font-semibold text-slate-800">{item.name}</p>
              <p className="text-xs text-slate-400">
                {item.role} · {item.org}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
