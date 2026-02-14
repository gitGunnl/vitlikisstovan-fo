import { Workshop, Lab, WorkshopStep } from "./types";
import { bakkafrost } from "./bakkafrost";
import { hugsnotid } from "./hugsnotid";
import { betri } from "./betri";
import { visit } from "./visit";
import { kontrast } from "./kontrast";

export type { Workshop, Lab, WorkshopStep };

export const workshops: Record<string, Workshop> = {
  bakkafrost,
  "hugskotið": hugsnotid,
  betri,
  visit,
  kontrast
};

export function normalizePassword(input: string): string {
  return input.toLowerCase().replace(/\s/g, '').trim();
}

export function getWorkshopByPassword(password: string): Workshop | null {
  const normalized = normalizePassword(password);
  return workshops[normalized] || null;
}

export function getWorkshopByKey(key: string): Workshop | undefined {
  const normalizedKey = key.toLowerCase().trim().replace(/\s+/g, "");
  return workshops[normalizedKey];
}

export function getLabById(workshop: Workshop, labId: string): Lab | undefined {
  return workshop.labs.find(lab => lab.id === labId);
}

export function getStepByIndex(lab: Lab, stepIndex: number): WorkshopStep | undefined {
  return lab.steps[stepIndex];
}
