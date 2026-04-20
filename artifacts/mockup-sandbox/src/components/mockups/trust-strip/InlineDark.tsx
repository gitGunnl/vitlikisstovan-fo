import { Quote } from "lucide-react";

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

export function InlineDark() {
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
              className="bg-slate-900 rounded-lg p-3.5 flex flex-col"
            >
              <Quote className="w-3.5 h-3.5 text-teal-400 mb-2 rotate-180" />
              <p className="text-[12px] text-slate-100 leading-relaxed flex-1 mb-3">
                {item.quote}
              </p>
              <div>
                <p className="text-[11px] font-semibold text-white">{item.name}</p>
                <p className="text-[10px] text-teal-300/80">
                  {item.role} · {item.org}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
