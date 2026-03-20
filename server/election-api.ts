import { Router, json } from "express";
import {
  getPublicData,
  getAllData,
  addSubmission,
  addAdminSubmission,
  updatePartyStatus,
  updateSubmission,
  deleteSubmission,
  loadElectionData,
  saveElectionData
} from "./election-storage.js";
import {
  submissionFormSchema,
  adminUpdatePartySchema,
  adminUpdateSubmissionSchema,
  ELECTION_QUESTIONS
} from "../shared/schema.js";

const ADMIN_KEY = process.env.ELECTION_ADMIN_KEY || "vitliki-admin-2026";

function requireAdmin(req: any, res: any, next: any) {
  const key = req.headers["x-admin-key"];
  if (key !== ADMIN_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

export function createElectionRouter(): Router {
  const router = Router();
  router.use(json());

  router.get("/api/election/public", (_req, res) => {
    try {
      const data = getPublicData();
      res.json({ ...data, questions: ELECTION_QUESTIONS });
    } catch (err) {
      console.error("Error loading election data:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.post("/api/election/submit", (req, res) => {
    try {
      const parsed = submissionFormSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Validation failed", details: parsed.error.flatten() });
      }

      const data = loadElectionData();
      const matchedParty = data.parties.find(
        p => p.name.toLowerCase() === parsed.data.partyName.toLowerCase()
      );

      const submission = addSubmission({
        partyId: matchedParty?.id || "unknown",
        partyName: parsed.data.partyName,
        respondentName: parsed.data.respondentName,
        respondentRole: parsed.data.respondentRole,
        email: parsed.data.email,
        phone: parsed.data.phone,
        isOfficialResponse: parsed.data.isOfficialResponse,
        answers: parsed.data.answers,
        extraComment: parsed.data.extraComment,
        consentGiven: parsed.data.consentGiven
      });

      res.status(201).json({ success: true, id: submission.id });
    } catch (err) {
      console.error("Error submitting:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.get("/api/election/admin", requireAdmin, (_req, res) => {
    try {
      const data = getAllData();
      res.json({ ...data, questions: ELECTION_QUESTIONS });
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.post("/api/election/admin/submission", requireAdmin, (req, res) => {
    try {
      const { partyId, partyName, respondentName, respondentRole, email, phone, isOfficialResponse, answers, extraComment, published } = req.body;

      const submission = addAdminSubmission({
        partyId,
        partyName,
        respondentName,
        respondentRole,
        email: email || "",
        phone,
        isOfficialResponse: isOfficialResponse ?? true,
        answers: answers || {},
        extraComment,
        consentGiven: true,
        published: published ?? true,
        addedByAdmin: true
      });

      res.status(201).json(submission);
    } catch (err) {
      console.error("Error adding admin submission:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.patch("/api/election/admin/party/:partyId", requireAdmin, (req, res) => {
    try {
      const parsed = adminUpdatePartySchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Validation failed", details: parsed.error.flatten() });
      }

      const party = updatePartyStatus(req.params.partyId, parsed.data.status, parsed.data.respondedAt);
      if (!party) {
        return res.status(404).json({ error: "Party not found" });
      }
      res.json(party);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.patch("/api/election/admin/submission/:submissionId", requireAdmin, (req, res) => {
    try {
      const parsed = adminUpdateSubmissionSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Validation failed", details: parsed.error.flatten() });
      }

      const submission = updateSubmission(req.params.submissionId, parsed.data);
      if (!submission) {
        return res.status(404).json({ error: "Submission not found" });
      }
      res.json(submission);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.delete("/api/election/admin/submission/:submissionId", requireAdmin, (req, res) => {
    try {
      const success = deleteSubmission(req.params.submissionId);
      if (!success) {
        return res.status(404).json({ error: "Submission not found" });
      }
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.patch("/api/election/admin/deadline", requireAdmin, (req, res) => {
    try {
      const { deadline } = req.body;
      if (!deadline) {
        return res.status(400).json({ error: "Deadline is required" });
      }
      const data = loadElectionData();
      data.deadline = deadline;
      saveElectionData(data);
      res.json({ success: true, deadline });
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  return router;
}
