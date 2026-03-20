import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAdminData,
  adminUpdatePartyStatus,
  adminAddSubmission,
  adminUpdateSubmission,
  adminDeleteSubmission
} from "@/lib/election-api";
import { ELECTION_QUESTIONS, PARTY_STATUSES, type Party, type ElectionSubmission } from "@shared/schema";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  Trash2,
  Plus,
  Save,
  Lock,
  ArrowLeft,
  RefreshCw,
  Edit3
} from "lucide-react";
import { Link } from "wouter";

export default function ValAdmin() {
  const [adminKey, setAdminKey] = useState(() => localStorage.getItem("election-admin-key") || "");
  const [authenticated, setAuthenticated] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSubmission, setEditingSubmission] = useState<string | null>(null);
  const [editAnswers, setEditAnswers] = useState<Record<string, string>>({});
  const [editComment, setEditComment] = useState("");
  const qc = useQueryClient();

  const [addForm, setAddForm] = useState({
    partyId: "",
    respondentName: "",
    respondentRole: "",
    email: "",
    answers: Object.fromEntries(ELECTION_QUESTIONS.map(q => [q.id, ""])),
    extraComment: "",
    isOfficialResponse: true,
    published: true
  });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["/api/election/admin", adminKey],
    queryFn: () => fetchAdminData(adminKey),
    enabled: authenticated,
    staleTime: 10000
  });

  useEffect(() => {
    document.title = "Umsiting — Vitlíki og Valið 2026";
  }, []);

  const handleLogin = async () => {
    try {
      await fetchAdminData(adminKey);
      setAuthenticated(true);
      localStorage.setItem("election-admin-key", adminKey);
    } catch {
      alert("Skeivur lykil");
    }
  };

  const updatePartyMutation = useMutation({
    mutationFn: ({ partyId, status }: { partyId: string; status: string }) =>
      adminUpdatePartyStatus(adminKey, partyId, status),
    onSuccess: () => refetch()
  });

  const addSubmissionMutation = useMutation({
    mutationFn: (formData: any) => adminAddSubmission(adminKey, formData),
    onSuccess: () => {
      refetch();
      setShowAddForm(false);
      setAddForm({
        partyId: "",
        respondentName: "",
        respondentRole: "",
        email: "",
        answers: Object.fromEntries(ELECTION_QUESTIONS.map(q => [q.id, ""])),
        extraComment: "",
        isOfficialResponse: true,
        published: true
      });
    }
  });

  const updateSubmissionMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) =>
      adminUpdateSubmission(adminKey, id, updates),
    onSuccess: () => {
      refetch();
      setEditingSubmission(null);
    }
  });

  const deleteSubmissionMutation = useMutation({
    mutationFn: (id: string) => adminDeleteSubmission(adminKey, id),
    onSuccess: () => refetch()
  });

  const togglePublish = (sub: ElectionSubmission) => {
    updateSubmissionMutation.mutate({
      id: sub.id,
      updates: { published: !sub.published }
    });
  };

  const startEditing = (sub: ElectionSubmission) => {
    setEditingSubmission(sub.id);
    setEditAnswers({ ...sub.answers });
    setEditComment(sub.extraComment || "");
  };

  const saveEditing = () => {
    if (!editingSubmission) return;
    updateSubmissionMutation.mutate({
      id: editingSubmission,
      updates: { answers: editAnswers, extraComment: editComment }
    });
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl border border-slate-200 p-8 max-w-sm w-full">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-slate-600" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 text-center mb-6">Umsitaravirkni</h1>
          <input
            type="password"
            value={adminKey}
            onChange={e => setAdminKey(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            placeholder="Umsitaralykil"
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm mb-4 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
          />
          <button
            onClick={handleLogin}
            className="w-full py-2.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
          >
            Logga inn
          </button>
        </div>
      </div>
    );
  }

  const parties = data?.parties || [];
  const submissions = data?.submissions || [];
  const questions = data?.questions || ELECTION_QUESTIONS;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/val" className="text-slate-500 hover:text-slate-700">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-bold text-slate-900">Val Admin</h1>
          </div>
          <button onClick={() => refetch()} className="text-slate-500 hover:text-slate-700">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Flokkar og staðan</h2>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Flokkur</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Staðan</th>
                  <th className="text-right px-4 py-3 font-medium text-slate-600">Aðgerð</th>
                </tr>
              </thead>
              <tbody>
                {parties.map(party => (
                  <tr key={party.id} className="border-b border-slate-100 last:border-b-0">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: party.color }} />
                        <span className="font-medium text-slate-900">{party.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={party.status}
                        onChange={e => updatePartyMutation.mutate({ partyId: party.id, status: e.target.value })}
                        className="rounded border border-slate-300 px-2 py-1 text-xs bg-white"
                      >
                        {Object.entries(PARTY_STATUSES).map(([key, label]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {party.respondedAt && (
                        <span className="text-xs text-slate-400">
                          {new Date(party.respondedAt).toLocaleDateString("fo-FO")}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">Svør ({submissions.length})</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Legg svar afturat
            </button>
          </div>

          {showAddForm && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
              <h3 className="font-semibold text-slate-900 mb-4">Nýtt svar (umsitarasvar)</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Flokkur</label>
                    <select
                      value={addForm.partyId}
                      onChange={e => setAddForm(p => ({ ...p, partyId: e.target.value }))}
                      className="w-full rounded border border-slate-300 px-2.5 py-2 text-sm bg-white"
                    >
                      <option value="">Vel…</option>
                      {parties.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Svarandans navn</label>
                    <input
                      value={addForm.respondentName}
                      onChange={e => setAddForm(p => ({ ...p, respondentName: e.target.value }))}
                      className="w-full rounded border border-slate-300 px-2.5 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Starv / títul</label>
                    <input
                      value={addForm.respondentRole}
                      onChange={e => setAddForm(p => ({ ...p, respondentRole: e.target.value }))}
                      className="w-full rounded border border-slate-300 px-2.5 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Teldupostur</label>
                    <input
                      value={addForm.email}
                      onChange={e => setAddForm(p => ({ ...p, email: e.target.value }))}
                      className="w-full rounded border border-slate-300 px-2.5 py-2 text-sm"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      checked={addForm.isOfficialResponse}
                      onChange={() => setAddForm(p => ({ ...p, isOfficialResponse: true }))}
                      className="accent-slate-900"
                    />
                    Formelt flokkssvar
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      checked={!addForm.isOfficialResponse}
                      onChange={() => setAddForm(p => ({ ...p, isOfficialResponse: false }))}
                      className="accent-slate-900"
                    />
                    Persónligt svar
                  </label>
                </div>

                {questions.map((q, i) => (
                  <div key={q.id}>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Spurning {i + 1}: {q.text.slice(0, 80)}…
                    </label>
                    <textarea
                      value={addForm.answers[q.id]}
                      onChange={e => setAddForm(p => ({
                        ...p,
                        answers: { ...p.answers, [q.id]: e.target.value }
                      }))}
                      rows={3}
                      className="w-full rounded border border-slate-300 px-2.5 py-2 text-sm resize-y"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Auka viðmerking</label>
                  <textarea
                    value={addForm.extraComment}
                    onChange={e => setAddForm(p => ({ ...p, extraComment: e.target.value }))}
                    rows={2}
                    className="w-full rounded border border-slate-300 px-2.5 py-2 text-sm resize-y"
                  />
                </div>

                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addForm.published}
                    onChange={e => setAddForm(p => ({ ...p, published: e.target.checked }))}
                    className="accent-slate-900"
                  />
                  Birt beinleiðis
                </label>

                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 transition-colors"
                  >
                    Angra
                  </button>
                  <button
                    onClick={() => {
                      const party = parties.find(p => p.id === addForm.partyId);
                      if (!party) return alert("Vel ein flokk");
                      addSubmissionMutation.mutate({
                        partyId: addForm.partyId,
                        partyName: party.name,
                        respondentName: addForm.respondentName,
                        respondentRole: addForm.respondentRole,
                        email: addForm.email,
                        isOfficialResponse: addForm.isOfficialResponse,
                        answers: addForm.answers,
                        extraComment: addForm.extraComment,
                        published: addForm.published
                      });
                    }}
                    disabled={addSubmissionMutation.isPending}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Goym
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {submissions.length === 0 && !isLoading && (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-400">
                Eingi svør enn.
              </div>
            )}
            {submissions.map(sub => (
              <div key={sub.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100">
                  <div>
                    <span className="font-medium text-slate-900">{sub.partyName}</span>
                    <span className="text-slate-400 mx-2">·</span>
                    <span className="text-sm text-slate-600">{sub.respondentName}</span>
                    <span className="text-slate-400 mx-2">·</span>
                    <span className="text-xs text-slate-400">{sub.respondentRole}</span>
                    {sub.addedByAdmin && (
                      <span className="ml-2 text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">Umsitarasvar</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => togglePublish(sub)}
                      className={`p-1.5 rounded transition-colors ${sub.published ? "text-green-600 hover:bg-green-50" : "text-slate-400 hover:bg-slate-100"}`}
                      title={sub.published ? "Birt — trýst fyri at fjala" : "Fjalað — trýst fyri at birta"}
                    >
                      {sub.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => startEditing(sub)}
                      className="p-1.5 rounded text-slate-400 hover:bg-slate-100 transition-colors"
                      title="Rætta"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Ert tú vísur/vís?")) deleteSubmissionMutation.mutate(sub.id);
                      }}
                      className="p-1.5 rounded text-red-400 hover:bg-red-50 transition-colors"
                      title="Strika"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {editingSubmission === sub.id ? (
                  <div className="px-5 py-4 space-y-4">
                    {questions.map((q, i) => (
                      <div key={q.id}>
                        <label className="block text-xs font-medium text-slate-600 mb-1">
                          Spurning {i + 1}
                        </label>
                        <textarea
                          value={editAnswers[q.id] || ""}
                          onChange={e => setEditAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                          rows={3}
                          className="w-full rounded border border-slate-300 px-2.5 py-2 text-sm resize-y"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Auka viðmerking</label>
                      <textarea
                        value={editComment}
                        onChange={e => setEditComment(e.target.value)}
                        rows={2}
                        className="w-full rounded border border-slate-300 px-2.5 py-2 text-sm resize-y"
                      />
                    </div>
                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={() => setEditingSubmission(null)}
                        className="px-3 py-1.5 text-sm text-slate-600"
                      >
                        Angra
                      </button>
                      <button
                        onClick={saveEditing}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-800 transition-colors"
                      >
                        <Save className="w-3.5 h-3.5" />
                        Goym broytingar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="px-5 py-3">
                    <div className="text-xs text-slate-400 space-y-1">
                      <p>Teldupostur: {sub.email} {sub.phone && `· Tlf: ${sub.phone}`}</p>
                      <p>
                        Sent: {new Date(sub.submittedAt).toLocaleString("fo-FO")}
                        {sub.publishedAt && <> · Birt: {new Date(sub.publishedAt).toLocaleString("fo-FO")}</>}
                      </p>
                      <p>{sub.isOfficialResponse ? "Formelt flokkssvar" : "Persónligt svar"}</p>
                    </div>
                    <details className="mt-2">
                      <summary className="text-xs text-slate-500 cursor-pointer hover:text-slate-700">
                        Vís svørini ({Object.values(sub.answers).filter(a => a.trim()).length}/{questions.length} svarað)
                      </summary>
                      <div className="mt-2 space-y-3">
                        {questions.map((q, i) => (
                          <div key={q.id}>
                            <p className="text-xs font-medium text-slate-600">S{i + 1}: {q.text.slice(0, 60)}…</p>
                            <p className="text-sm text-slate-700 whitespace-pre-wrap mt-0.5">
                              {sub.answers[q.id] || <span className="italic text-slate-400">—</span>}
                            </p>
                          </div>
                        ))}
                        {sub.extraComment && (
                          <div>
                            <p className="text-xs font-medium text-slate-600">Auka viðmerking:</p>
                            <p className="text-sm text-slate-700 whitespace-pre-wrap mt-0.5">{sub.extraComment}</p>
                          </div>
                        )}
                      </div>
                    </details>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
