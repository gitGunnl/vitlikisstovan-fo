const quotes = [
  { quote: "Sera væl nøgd – tillagað til júst tað, vit høvdu tørv á.", name: "Hildur Durhuus", role: "Nýskapan í ferðavinnuni 2026", org: "Samskipar", color: "bg-teal-600" },
  { quote: "Bæði hugvekjandi og læruríkt – viðkomandi fyri leiðarar og starvsfólk.", name: "Reidar Luid", role: "Forritan og menning", org: "Betri Banki", color: "bg-amber-600" },
  { quote: "Greið, viðkomandi og beinanvegin gagnlig í praksis.", name: "Elin Brimnes", role: "Arkitekt", org: "Kontrast", color: "bg-indigo-600" },
  { quote: "Gav okkum betri fatan og fleiri góð hugskot at taka víðari.", name: "Sigrið Zachariasen", role: "Dagligur leiðari", org: "Reyði Krossur Føroya", color: "bg-rose-600" },
];

export function SectionAvatars() {
  return (
    <div className="bg-slate-50 p-6 font-sans">
      <div className="max-w-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex -space-x-2">
            {quotes.map((q, i) => (
              <div
                key={i}
                className={`w-9 h-9 rounded-full ${q.color} flex items-center justify-center text-white text-sm font-bold ring-2 ring-slate-50`}
              >
                {q.name.charAt(0)}
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 leading-tight">
              Hetta siga 4 leiðarar í Føroyum
            </h2>
            <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
              Roynsla frá fyritøkum, ið longu hava brúkt okkum
            </p>
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
