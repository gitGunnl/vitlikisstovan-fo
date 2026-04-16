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

export function Minimal() {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm text-slate-400 mb-10 text-center tracking-wide uppercase">
          Viðkomandi fyri fyritøkur og stovnar í Føroyum
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-slate-200">
          {quotes.map((item, i) => (
            <div key={i} className="px-6 text-center">
              <p className="text-sm text-slate-600 italic leading-relaxed mb-4">
                "{item.quote}"
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-xs font-bold">
                  {item.name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-slate-800">{item.name}</p>
                  <p className="text-[11px] text-slate-400">{item.org}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
