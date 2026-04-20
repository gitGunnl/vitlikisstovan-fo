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

const initialColors = [
  "bg-teal-600",
  "bg-amber-600",
  "bg-indigo-600",
  "bg-rose-600",
];

export function InlineAttribution() {
  return (
    <div className="bg-slate-50 p-6 font-sans">
      <div className="max-w-md">
        <p className="text-[11px] text-slate-500 mb-3 tracking-wider uppercase font-semibold">
          Hvat siga aðrir
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {quotes.map((item, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-lg p-3.5 flex flex-col"
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                <div
                  className={`w-9 h-9 rounded-full ${initialColors[i]} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
                >
                  {item.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-[12px] font-bold text-slate-900 leading-tight truncate">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate">
                    {item.role} · {item.org}
                  </p>
                </div>
              </div>
              <p className="text-[12px] text-slate-700 leading-relaxed">
                "{item.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
