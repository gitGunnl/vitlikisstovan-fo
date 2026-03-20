import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { fetchPublicElectionData } from "@/lib/election-api";
import {
  ELECTION_QUESTIONS,
  PARTY_STATUSES,
  type Party,
  type ElectionSubmission
} from "@shared/schema";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Mail,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  MessageSquare
} from "lucide-react";

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; text: string; icon: any }> = {
    received: { bg: "bg-green-50 border-green-200", text: "text-green-700", icon: CheckCircle2 },
    partial: { bg: "bg-amber-50 border-amber-200", text: "text-amber-700", icon: Clock },
    invited: { bg: "bg-slate-50 border-slate-200", text: "text-slate-500", icon: Mail },
    "no-response": { bg: "bg-slate-50 border-slate-200", text: "text-slate-400", icon: AlertCircle }
  };
  const c = config[status] || config.invited;
  const Icon = c.icon;
  const label = PARTY_STATUSES[status as keyof typeof PARTY_STATUSES] || status;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${c.bg} ${c.text}`}>
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("fo-FO", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  } catch {
    return dateStr;
  }
}

function PartyAnswerCard({ party, submission, questions }: {
  party: Party;
  submission?: ElectionSubmission;
  questions: typeof ELECTION_QUESTIONS;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-slate-200 rounded-xl bg-white overflow-hidden">
      <button
        onClick={() => submission && setExpanded(!expanded)}
        className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: party.color }}
          />
          <div>
            <h3 className="font-semibold text-slate-900">{party.name}</h3>
            {submission && (
              <p className="text-xs text-slate-500 mt-0.5">
                {submission.isOfficialResponse ? "Flokkssvar" : "Persónligt svar"} · {submission.respondentName}, {submission.respondentRole}
                {submission.publishedAt && <> · Birt {formatDate(submission.publishedAt)}</>}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={party.status} />
          {submission && (
            expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </div>
      </button>

      {expanded && submission && (
        <div className="border-t border-slate-100 px-5 py-5 space-y-6">
          {questions.map((q) => (
            <div key={q.id}>
              <h4 className="text-sm font-semibold text-slate-700 mb-2">{q.text}</h4>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                {submission.answers[q.id] || <span className="italic text-slate-400">Einki svar givið</span>}
              </p>
            </div>
          ))}
          {submission.extraComment && (
            <div className="pt-3 border-t border-slate-100">
              <h4 className="text-sm font-semibold text-slate-700 mb-2">Auka viðmerking</h4>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{submission.extraComment}</p>
            </div>
          )}
        </div>
      )}

      {!submission && party.status !== "received" && party.status !== "partial" && (
        <div className="border-t border-slate-100 px-5 py-3">
          <p className="text-sm text-slate-400 italic">
            Einki svar er birta frá hesum flokki enn.
          </p>
        </div>
      )}
    </div>
  );
}

export default function Val() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/election/public"],
    queryFn: fetchPublicElectionData,
    staleTime: 30000,
    refetchInterval: 60000
  });

  useEffect(() => {
    document.title = "Vitlíki og Valið 2026 — Hvar standa flokkarnir?";
    const desc = "Vitlíkisstovan spyr føroysku politisku flokkarnir um vitlíki (AI). Hygg at svørunum og ber saman.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, []);

  const questions = data?.questions || ELECTION_QUESTIONS;
  const parties = data?.parties || [];
  const submissions = data?.submissions || [];

  const getPublishedSubmission = (partyId: string) =>
    submissions.find(s => s.partyId === partyId && s.published);

  const respondedCount = parties.filter(p => p.status === "received" || p.status === "partial").length;

  return (
    <>
      <Header />
      <main className="pt-16">
        <section className="bg-gradient-to-b from-slate-50 to-white py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <p className="text-sm font-medium text-slate-500 tracking-wide uppercase mb-4">
              Føroyavalið 2026
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
              Hvar standa flokkarnir um vitlíki?
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Vitlíki (AI) fer at broyta arbeiðslív, skúla, almenna tænastu, vinnulív, mál og samfelagstrúgv.
              Vit hava spurt føroysku politisku flokkarnir, hvar teir standa — so at veljarar og
              fjølmiðlar kunnu síggja og bera saman.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Hví er hetta umráðandi?</h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed mb-4">
                Føroyar standa framman fyri somu tøknisku broytingarnar sum stór lond — men við serligar avbjóðingar.
                Arbeiðsmegi er fá, almenni geirin hevur brúk fyri betri nýtslu av altjóðum, og føroyskt mál eigur
                onga sjálvsagda støðu í nýggjum stórtøkniligum skipanum.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Vitlíki kann vera ein stór møguleiki fyri Føroyar — men bara um vit gera meðvitnar val.
                Tí er neyðugt, at politisku flokkarnir siga greitt frá, hvussu teir vilja stýra hetta øki.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Henda síðan er hugsuð sum ein almenn tænastu: at gera tað lættari fyri veljarar, fjølmiðlar
                og ráðgevar at síggja og bera saman afstøðurnar.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Spurningarnar</h2>
            <p className="text-slate-600 mb-6">
              Vit hava sent hesar 5 spurningar til allir politisku flokkarnir á Føroya løgtingi.
              Hvør flokkur er biðin at svara við 3–5 setningum til hvørja spurning.
            </p>
            <div className="space-y-4">
              {questions.map((q, i) => (
                <div key={q.id} className="bg-white rounded-xl border border-slate-200 p-5">
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-900 text-white text-sm font-semibold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-medium text-slate-900">{q.text}</p>
                      <p className="text-sm text-slate-500 mt-1">{q.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-xl font-bold text-slate-900 mb-3">Hvussu virkar hetta?</h2>
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 space-y-3 text-sm text-slate-600">
              <p>
                <strong className="text-slate-800">Bjóðing:</strong> Allir politiskir flokkar á Føroya løgtingi hava fingið bjóðing at svara via teldupost.
              </p>
              <p>
                <strong className="text-slate-800">Frestur:</strong> {data ? formatDate(data.deadline) : "—"}
              </p>
              <p>
                <strong className="text-slate-800">Svarslongd:</strong> 3–5 setningar til hvørja spurning (umleið 500–800 tekn).
              </p>
              <p>
                <strong className="text-slate-800">Birting:</strong> Svør verða birt á hesi síðu, eitt og eitt, tá ið tey koma.
                Svør kunnu verða lætt rættað fyri stavning og formatering, men aldrin fyri innihald.
              </p>
              <p>
                <strong className="text-slate-800">Teglun:</strong> Tað verður víst, um eitt svar er eitt formelt flokkssvar ella eitt persónligt svar frá einum løgtingslimu.
              </p>
              <p>
                <strong className="text-slate-800">Einki svar:</strong> Um ein flokkur ikki svarar, verður staðan víst á síðuni, uttan fjandsligan orðalag.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Staðan hjá flokkunum</h2>
              <span className="text-sm text-slate-500">
                {respondedCount} av {parties.length} hava svarað
              </span>
            </div>

            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="h-16 bg-white rounded-xl border border-slate-200 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {parties.map(party => (
                  <PartyAnswerCard
                    key={party.id}
                    party={party}
                    submission={getPublishedSubmission(party.id)}
                    questions={questions}
                  />
                ))}
              </div>
            )}

            {data && (
              <p className="text-xs text-slate-400 mt-4 text-right">
                Síðst dagført: {formatDate(data.lastUpdated)}
              </p>
            )}
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Svar sum flokkur</h2>
            <p className="text-slate-600 mb-6">
              Ert tú løgtingsliður, flokksskrivari ella umboð fyri ein flokk? Tú kanst senda svørini inn beinleiðis hér.
              Svørini verða eftirkannað áðrenn tey verða birt.
            </p>
            <Link
              href="/val/svara"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Send svørini inn
            </Link>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <p className="text-sm text-slate-500 mb-2">
              Henda síðan er framleidd av Vitlíkisstovuni sum ein almenn tænastu.
            </p>
            <p className="text-sm text-slate-500">
              Síðan er ikki bundin at neykum politiskum flokki. Endamálið er at efla almennu umrøðuna um vitlíki í Føroyum.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
