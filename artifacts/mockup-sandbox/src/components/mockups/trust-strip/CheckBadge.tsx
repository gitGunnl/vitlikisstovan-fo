import { CheckCircle2 } from "lucide-react";

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

export function CheckBadge() {
  return (
    <div className="bg-slate-50 p-6 font-sans">
      <div className="max-w-md">
        <h2 className="text-lg font-bold text-slate-900 mb-4">
          Hetta siga okkara kundar
        </h2>
        <div className="space-y-2">
          {quotes.map((item, i) => (
            <div
              key={i}
              className="bg-white border-l-4 border-teal-600 shadow-sm rounded-r-md px-4 py-3"
            >
              <p className="text-[13.5px] text-slate-800 leading-snug font-medium mb-2">
                "{item.quote}"
              </p>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                <p className="text-[11px] text-slate-600">
                  <span className="font-semibold text-slate-900">{item.name}</span>
                  <span className="text-slate-500">, {item.role} · {item.org}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
