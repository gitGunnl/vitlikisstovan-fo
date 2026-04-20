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

export function InlineStack() {
  return (
    <div className="bg-slate-50 p-6 font-sans">
      <div className="max-w-md">
        <p className="text-[11px] text-slate-500 mb-3 tracking-wider uppercase font-semibold">
          Hvat siga aðrir
        </p>
        <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden">
          {quotes.map((item, i) => (
            <div key={i} className="p-3.5 flex gap-3 items-start">
              <div className="w-1 self-stretch bg-teal-500 rounded-full flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-slate-800 leading-snug mb-1.5 font-medium">
                  "{item.quote}"
                </p>
                <p className="text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">{item.name}</span>
                  <span className="text-slate-400"> · {item.role}, {item.org}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
