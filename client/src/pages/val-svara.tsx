import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { fetchPublicElectionData, submitPartyResponse } from "@/lib/election-api";
import { ELECTION_QUESTIONS } from "@shared/schema";
import { CheckCircle2, Send, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function ValSvara() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    partyName: "",
    respondentName: "",
    respondentRole: "",
    email: "",
    phone: "",
    isOfficialResponse: true,
    answers: Object.fromEntries(ELECTION_QUESTIONS.map(q => [q.id, ""])),
    extraComment: "",
    consentGiven: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data } = useQuery({
    queryKey: ["/api/election/public"],
    queryFn: fetchPublicElectionData,
    staleTime: 60000
  });

  const mutation = useMutation({
    mutationFn: submitPartyResponse,
    onSuccess: () => setSubmitted(true),
    onError: (err: any) => {
      setErrors({ form: err.message || "Okkurt fór skeivt. Royn aftur." });
    }
  });

  useEffect(() => {
    document.title = "Send svar — Vitlíki og Valið 2026";
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.partyName.trim()) e.partyName = "Flokksnavn er kravt";
    if (!formData.respondentName.trim()) e.respondentName = "Navn er kravt";
    if (!formData.respondentRole.trim()) e.respondentRole = "Starv/títul er kravt";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = "Gilt teldupostbústaður er kravt";
    ELECTION_QUESTIONS.forEach(q => {
      if (!formData.answers[q.id]?.trim()) e[`answer_${q.id}`] = "Vinarliga svara spurninginum";
    });
    if (!formData.consentGiven) e.consent = "Tú mást samtykkja birtingini";
    return e;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    mutation.mutate({
      partyName: formData.partyName.trim(),
      respondentName: formData.respondentName.trim(),
      respondentRole: formData.respondentRole.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || undefined,
      isOfficialResponse: formData.isOfficialResponse,
      answers: formData.answers,
      extraComment: formData.extraComment.trim() || undefined,
      consentGiven: true as const
    });
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  };

  const updateAnswer = (qId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      answers: { ...prev.answers, [qId]: value }
    }));
    if (errors[`answer_${qId}`]) setErrors(prev => { const n = { ...prev }; delete n[`answer_${qId}`]; return n; });
  };

  if (submitted) {
    return (
      <>
        <Header />
        <main className="pt-16 min-h-[70vh] flex items-center">
          <div className="container mx-auto px-4 max-w-xl text-center py-20">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Takk fyri svarið!</h1>
            <p className="text-slate-600 mb-2">
              Vit hava móttikið svarið frá <strong>{formData.partyName}</strong>.
            </p>
            <p className="text-slate-600 mb-8">
              Svarið verður eftirkannað og birt á síðuni so skjótt sum gjørligt.
              Vit seta okkum í samband, um onkur spurningur er.
            </p>
            <Link
              href="/val"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Aftur til valsíðuna
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const questions = data?.questions || ELECTION_QUESTIONS;
  const parties = data?.parties || [];

  return (
    <>
      <Header />
      <main className="pt-16">
        <section className="bg-gradient-to-b from-slate-50 to-white py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <Link
              href="/val"
              className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Aftur til valsíðuna
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Send svørini inn
            </h1>
            <p className="text-slate-600 mb-2">
              Tak stöðu til 5 spurningar um vitlíki í Føroyum. Svør kunnu vera á føroyskum ella enskum.
            </p>
            <p className="text-sm text-slate-500">
              Ráðlagt: 3–5 setningar til hvørja spurning. Svørini verða eftirkannað áðrenn birting.
            </p>
          </div>
        </section>

        <section className="py-8 md:py-12 bg-white">
          <div className="container mx-auto px-4 max-w-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              {errors.form && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
                  {errors.form}
                </div>
              )}

              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-slate-900">Um teg og flokkin</h2>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Flokksnavn <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.partyName}
                    onChange={e => updateField("partyName", e.target.value)}
                    className={`w-full rounded-lg border ${errors.partyName ? "border-red-300" : "border-slate-300"} px-3 py-2.5 text-sm bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none`}
                  >
                    <option value="">Vel flokk…</option>
                    {parties.map(p => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                    <option value="__other">Annar flokkur…</option>
                  </select>
                  {formData.partyName === "__other" && (
                    <input
                      type="text"
                      placeholder="Skriva flokksnavn"
                      onChange={e => updateField("partyName", e.target.value)}
                      className="w-full mt-2 rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                    />
                  )}
                  {errors.partyName && <p className="text-xs text-red-600 mt-1">{errors.partyName}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Títt navn <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.respondentName}
                      onChange={e => updateField("respondentName", e.target.value)}
                      className={`w-full rounded-lg border ${errors.respondentName ? "border-red-300" : "border-slate-300"} px-3 py-2.5 text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none`}
                      placeholder="T.d. Jóannes Patursson"
                    />
                    {errors.respondentName && <p className="text-xs text-red-600 mt-1">{errors.respondentName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Starv / títul <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.respondentRole}
                      onChange={e => updateField("respondentRole", e.target.value)}
                      className={`w-full rounded-lg border ${errors.respondentRole ? "border-red-300" : "border-slate-300"} px-3 py-2.5 text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none`}
                      placeholder="T.d. Løgtingsliður / Flokksskrivari"
                    />
                    {errors.respondentRole && <p className="text-xs text-red-600 mt-1">{errors.respondentRole}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Teldupostur <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => updateField("email", e.target.value)}
                      className={`w-full rounded-lg border ${errors.email ? "border-red-300" : "border-slate-300"} px-3 py-2.5 text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none`}
                      placeholder="teldupostur@flokkur.fo"
                    />
                    {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Telefon <span className="text-slate-400">(valfrítt)</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => updateField("phone", e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                      placeholder="+298 …"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tegund av svari
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={formData.isOfficialResponse}
                        onChange={() => updateField("isOfficialResponse", true)}
                        className="accent-slate-900"
                      />
                      <span className="text-sm text-slate-700">Formelt flokkssvar</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={!formData.isOfficialResponse}
                        onChange={() => updateField("isOfficialResponse", false)}
                        className="accent-slate-900"
                      />
                      <span className="text-sm text-slate-700">Persónligt svar</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-slate-900">Svørini</h2>
                <p className="text-sm text-slate-500 -mt-3">
                  3–5 setningar til hvørja spurning. Svør kunnu vera á føroyskum ella enskum.
                </p>

                {questions.map((q, i) => (
                  <div key={q.id}>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-900 text-white text-xs mr-2">
                        {i + 1}
                      </span>
                      {q.text} <span className="text-red-500">*</span>
                    </label>
                    <p className="text-xs text-slate-500 mb-2 ml-7">{q.description}</p>
                    <textarea
                      value={formData.answers[q.id]}
                      onChange={e => updateAnswer(q.id, e.target.value)}
                      rows={4}
                      className={`w-full rounded-lg border ${errors[`answer_${q.id}`] ? "border-red-300" : "border-slate-300"} px-3 py-2.5 text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none resize-y`}
                      placeholder="Skriva svar her…"
                    />
                    <div className="flex justify-between mt-1">
                      {errors[`answer_${q.id}`] && <p className="text-xs text-red-600">{errors[`answer_${q.id}`]}</p>}
                      <p className="text-xs text-slate-400 ml-auto">{formData.answers[q.id].length} tekn</p>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Auka viðmerking <span className="text-slate-400">(valfrítt)</span>
                </label>
                <textarea
                  value={formData.extraComment}
                  onChange={e => updateField("extraComment", e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none resize-y"
                  placeholder="T.d. samráðing ella ítøkilig viðmerking…"
                />
              </div>

              <div className="border-t border-slate-200 pt-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentGiven}
                    onChange={e => {
                      updateField("consentGiven", e.target.checked);
                      if (errors.consent) setErrors(prev => { const n = { ...prev }; delete n.consent; return n; });
                    }}
                    className="mt-0.5 accent-slate-900"
                  />
                  <span className="text-sm text-slate-700">
                    Eg samtykkji, at svarið verður birt á hesi síðu, saman við navni, starvi og flokksnavni.
                    Svør kunnu verða lætt rættað fyri stavning og formatering, men ikki fyri innihald.
                  </span>
                </label>
                {errors.consent && <p className="text-xs text-red-600 mt-1 ml-7">{errors.consent}</p>}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {mutation.isPending ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sendir…
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send svarið inn
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
