import { Sparkle } from "lucide-react";

const quotes = [
  { quote: "Sera væl nøgd – tillagað til júst tað, vit høvdu tørv á.", name: "Hildur Durhuus", role: "Nýskapan í ferðavinnuni 2026", org: "Samskipar" },
  { quote: "Bæði hugvekjandi og læruríkt – viðkomandi fyri leiðarar og starvsfólk.", name: "Reidar Luid", role: "Forritan og menning", org: "Betri Banki" },
  { quote: "Greið, viðkomandi og beinanvegin gagnlig í praksis.", name: "Elin Brimnes", role: "Arkitekt", org: "Kontrast" },
  { quote: "Gav okkum betri fatan og fleiri góð hugskot at taka víðari.", name: "Sigrið Zachariasen", role: "Dagligur leiðari", org: "Reyði Krossur Føroya" },
];

export function StarsFlanking() {
  return (
    <div className="bg-slate-50 p-6 font-sans">
      <div className="max-w-md">
        <div className="text-center mb-5">
          <span className="inline-block bg-teal-100 text-teal-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-3">
            Kundaroynsla
          </span>
          <div className="flex items-center justify-center gap-2.5">
            <Sparkle className="w-4 h-4 text-amber-400 fill-amber-400" />
            <h2 className="text-xl font-bold text-slate-900 leading-tight">
              Hetta siga okkara kundar
            </h2>
            <Sparkle className="w-4 h-4 text-amber-400 fill-amber-400" />
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
