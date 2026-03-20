import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import type { ElectionData, Party, ElectionSubmission, PartyStatus } from "../shared/schema.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "..", "data");
const DATA_FILE = join(DATA_DIR, "election.json");

function getDefaultData(): ElectionData {
  return {
    parties: [
      { id: "sambandsflokkurin", name: "Sambandsflokkurin", shortName: "B", color: "#1e40af", status: "invited", invitedAt: "2026-03-20T12:00:00Z" },
      { id: "javnadarflokkurin", name: "Javnaðarflokkurin", shortName: "A", color: "#dc2626", status: "invited", invitedAt: "2026-03-20T12:00:00Z" },
      { id: "tjodveldi", name: "Tjóðveldi", shortName: "T", color: "#16a34a", status: "invited", invitedAt: "2026-03-20T12:00:00Z" },
      { id: "folkaflokkurin", name: "Fólkaflokkurin", shortName: "E", color: "#9333ea", status: "invited", invitedAt: "2026-03-20T12:00:00Z" },
      { id: "framsokn", name: "Framsókn", shortName: "F", color: "#ea580c", status: "invited", invitedAt: "2026-03-20T12:00:00Z" },
      { id: "midflokkurin", name: "Miðflokkurin", shortName: "M", color: "#0891b2", status: "invited", invitedAt: "2026-03-20T12:00:00Z" },
      { id: "sjalvstyri", name: "Sjálvstýrisflokkurin", shortName: "D", color: "#ca8a04", status: "invited", invitedAt: "2026-03-20T12:00:00Z" }
    ],
    submissions: [],
    deadline: "2026-04-15T23:59:00Z",
    lastUpdated: new Date().toISOString()
  };
}

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function loadElectionData(): ElectionData {
  ensureDataDir();
  if (!existsSync(DATA_FILE)) {
    const defaultData = getDefaultData();
    writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2), "utf-8");
    return defaultData;
  }
  const raw = readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

export function saveElectionData(data: ElectionData): void {
  ensureDataDir();
  data.lastUpdated = new Date().toISOString();
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export function getPublicData(): {
  parties: Party[];
  submissions: ElectionSubmission[];
  deadline: string;
  lastUpdated: string;
} {
  const data = loadElectionData();
  const publishedSubmissions = data.submissions
    .filter(s => s.published)
    .map(s => ({
      ...s,
      email: "",
      phone: undefined
    }));

  return {
    parties: data.parties,
    submissions: publishedSubmissions,
    deadline: data.deadline,
    lastUpdated: data.lastUpdated
  };
}

export function addSubmission(submission: Omit<ElectionSubmission, "id" | "submittedAt" | "published" | "publishedAt" | "addedByAdmin">): ElectionSubmission {
  const data = loadElectionData();
  const newSubmission: ElectionSubmission = {
    ...submission,
    id: `sub_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    submittedAt: new Date().toISOString(),
    published: false,
    publishedAt: undefined,
    addedByAdmin: false
  };
  data.submissions.push(newSubmission);
  saveElectionData(data);
  return newSubmission;
}

export function addAdminSubmission(submission: Omit<ElectionSubmission, "id" | "submittedAt" | "publishedAt">): ElectionSubmission {
  const data = loadElectionData();
  const newSubmission: ElectionSubmission = {
    ...submission,
    id: `sub_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    submittedAt: new Date().toISOString(),
    publishedAt: submission.published ? new Date().toISOString() : undefined,
    addedByAdmin: true
  };
  data.submissions.push(newSubmission);

  const party = data.parties.find(p => p.id === submission.partyId);
  if (party && submission.published) {
    const allAnswered = Object.values(submission.answers).every(a => a.trim().length > 0);
    party.status = allAnswered ? "received" : "partial";
    party.respondedAt = new Date().toISOString();
  }

  saveElectionData(data);
  return newSubmission;
}

export function updatePartyStatus(partyId: string, status: PartyStatus, respondedAt?: string): Party | null {
  const data = loadElectionData();
  const party = data.parties.find(p => p.id === partyId);
  if (!party) return null;
  party.status = status;
  if (respondedAt) party.respondedAt = respondedAt;
  saveElectionData(data);
  return party;
}

export function updateSubmission(
  submissionId: string,
  updates: { published?: boolean; answers?: Record<string, string>; extraComment?: string }
): ElectionSubmission | null {
  const data = loadElectionData();
  const submission = data.submissions.find(s => s.id === submissionId);
  if (!submission) return null;

  if (updates.published !== undefined) {
    submission.published = updates.published;
    if (updates.published && !submission.publishedAt) {
      submission.publishedAt = new Date().toISOString();
    }
  }
  if (updates.answers) {
    submission.answers = { ...submission.answers, ...updates.answers };
  }
  if (updates.extraComment !== undefined) {
    submission.extraComment = updates.extraComment;
  }

  saveElectionData(data);
  return submission;
}

export function deleteSubmission(submissionId: string): boolean {
  const data = loadElectionData();
  const idx = data.submissions.findIndex(s => s.id === submissionId);
  if (idx === -1) return false;
  data.submissions.splice(idx, 1);
  saveElectionData(data);
  return true;
}

export function getAllData(): ElectionData {
  return loadElectionData();
}
