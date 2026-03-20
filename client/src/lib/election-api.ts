import type { ElectionData, ElectionSubmission, Party, SubmissionFormData } from "@shared/schema";

const API_BASE = "/api/election";

interface PublicElectionData extends ElectionData {
  questions: { id: string; text: string; description: string }[];
}

export async function fetchPublicElectionData(): Promise<PublicElectionData> {
  const res = await fetch(`${API_BASE}/public`);
  if (!res.ok) throw new Error("Failed to fetch election data");
  return res.json();
}

export async function submitPartyResponse(data: SubmissionFormData): Promise<{ success: boolean; id: string }> {
  const res = await fetch(`${API_BASE}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Submission failed");
  }
  return res.json();
}

export async function fetchAdminData(adminKey: string): Promise<PublicElectionData> {
  const res = await fetch(`${API_BASE}/admin`, {
    headers: { "x-admin-key": adminKey }
  });
  if (!res.ok) throw new Error("Unauthorized or failed");
  return res.json();
}

export async function adminUpdatePartyStatus(adminKey: string, partyId: string, status: string, respondedAt?: string) {
  const res = await fetch(`${API_BASE}/admin/party/${partyId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
    body: JSON.stringify({ status, respondedAt })
  });
  if (!res.ok) throw new Error("Failed to update party");
  return res.json();
}

export async function adminAddSubmission(adminKey: string, data: any) {
  const res = await fetch(`${API_BASE}/admin/submission`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to add submission");
  return res.json();
}

export async function adminUpdateSubmission(adminKey: string, submissionId: string, updates: any) {
  const res = await fetch(`${API_BASE}/admin/submission/${submissionId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
    body: JSON.stringify(updates)
  });
  if (!res.ok) throw new Error("Failed to update submission");
  return res.json();
}

export async function adminDeleteSubmission(adminKey: string, submissionId: string) {
  const res = await fetch(`${API_BASE}/admin/submission/${submissionId}`, {
    method: "DELETE",
    headers: { "x-admin-key": adminKey }
  });
  if (!res.ok) throw new Error("Failed to delete submission");
  return res.json();
}
