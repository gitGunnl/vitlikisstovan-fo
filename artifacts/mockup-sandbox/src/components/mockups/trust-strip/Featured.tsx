import { Star } from "lucide-react";

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

export function Featured() {
  const featured = quotes[0];
  const others = quotes.slice(1);
  return (
    <div className="bg-slate-50 p-6 font-sans">
      <div className="max-w-md">
        <h2 className="text-lg font-bold text-slate-900 mb-3">
          Hetta siga okkara kundar
        </h2>
        <div className="bg-gradient-to-br from-teal-700 to-teal-900 rounded-xl p-5 text-white shadow-md">
          <div className="flex gap-0.5 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            ))}
          </div>
          <p className="text-base font-medium leading-snug mb-4">
            "{featured.quote}"
          </p>
          <div className="border-t border-white/20 pt-3">
            <p className="text-sm font-semibold">{featured.name}</p>
            <p className="text-xs text-teal-100">
              {featured.role} · {featured.org}
            </p>
          </div>
        </div>
        <div className="mt-3 space-y-1.5">
          {others.map((item, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-md px-3 py-2 flex items-center gap-2"
            >
              <div className="w-1 h-8 bg-teal-400 rounded-full flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-[12px] text-slate-700 leading-snug truncate">
                  "{item.quote}"
                </p>
                <p className="text-[10px] text-slate-500 truncate">
                  {item.name} · {item.org}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
