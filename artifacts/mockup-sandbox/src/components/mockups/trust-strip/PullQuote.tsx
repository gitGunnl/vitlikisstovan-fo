const quotes = [
  {
    highlight: "Sera væl nøgd",
    rest: "tillagað til júst tað, vit høvdu tørv á.",
    name: "Hildur Durhuus",
    org: "Samskipar",
  },
  {
    highlight: "Hugvekjandi og læruríkt",
    rest: "viðkomandi fyri leiðarar og starvsfólk.",
    name: "Reidar Luid",
    org: "Betri Banki",
  },
  {
    highlight: "Beinanvegin gagnlig",
    rest: "greið, viðkomandi og brúkilig í praksis.",
    name: "Elin Brimnes",
    org: "Kontrast",
  },
  {
    highlight: "Betri fatan",
    rest: "og fleiri góð hugskot at taka víðari.",
    name: "Sigrið Zachariasen",
    org: "Reyði Krossur Føroya",
  },
];

export function PullQuote() {
  return (
    <div className="bg-slate-50 p-6 font-sans">
      <div className="max-w-md">
        <h2 className="text-lg font-bold text-slate-900 mb-4">
          Hetta siga okkara kundar
        </h2>
        <div className="space-y-3">
          {quotes.map((item, i) => (
            <div key={i} className="bg-white rounded-lg p-4 border border-slate-200">
              <p className="text-[14px] text-slate-700 leading-snug mb-2">
                <span className="bg-teal-100 text-teal-900 font-semibold px-1.5 py-0.5 rounded">
                  {item.highlight}
                </span>{" "}
                – {item.rest}
              </p>
              <p className="text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700">{item.name}</span>
                <span className="text-slate-400">, {item.org}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
