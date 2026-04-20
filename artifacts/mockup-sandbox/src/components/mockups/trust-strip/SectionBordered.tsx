import { Users } from "lucide-react";

const quotes = [
  { quote: "Sera væl nøgd – tillagað til júst tað, vit høvdu tørv á.", name: "Hildur Durhuus", role: "Nýskapan í ferðavinnuni 2026", org: "Samskipar" },
  { quote: "Bæði hugvekjandi og læruríkt – viðkomandi fyri leiðarar og starvsfólk.", name: "Reidar Luid", role: "Forritan og menning", org: "Betri Banki" },
  { quote: "Greið, viðkomandi og beinanvegin gagnlig í praksis.", name: "Elin Brimnes", role: "Arkitekt", org: "Kontrast" },
  { quote: "Gav okkum betri fatan og fleiri góð hugskot at taka víðari.", name: "Sigrið Zachariasen", role: "Dagligur leiðari", org: "Reyði Krossur Føroya" },
];

export function SectionBordered() {
  return (
    <div className="bg-slate-50 p-6 font-sans">
      <div className="max-w-md">
        <div className="bg-white border-2 border-slate-900 rounded-xl overflow-hidden">
          <div className="bg-slate-900 text-white px-4 py-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-teal-400" />
            <p className="text-[11px] font-bold uppercase tracking-wider">
              Hvat 4 føroyskir leiðarar siga
            </p>
          </div>
          <div className="p-4 space-y-2">
            {quotes.map((item, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <p className="text-[13px] text-slate-700 leading-snug mb-1.5">"{item.quote}"</p>
                <p className="text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-800">{item.name}</span>, {item.role} · {item.org}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
