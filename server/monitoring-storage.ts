import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import {
  MAX_CLIENT_FAILURES,
  MAX_HISTORY_PER_FORM,
  MONITORED_FORMS,
} from "./monitoring-config.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "..", "data");
const DATA_FILE = join(DATA_DIR, "monitoring.json");

export interface HealthCheckResult {
  formId: string;
  checkedAt: string;
  ok: boolean;
  postOk: boolean;
  postStatus: number | null;
  schemaOk: boolean;
  missingEntryIds: string[];
  durationMs: number;
  error?: string;
  trigger: "scheduled" | "manual" | "startup";
}

export interface ClientFailureEvent {
  source: string;
  reportedAt: string;
  errorName?: string;
  errorMessage?: string;
  userAgent?: string;
}

export interface FormState {
  consecutiveFailures: number;
  alertActive: boolean;
  lastAlertAt?: string;
  lastRecoveryAt?: string;
  lastOkAt?: string;
  lastFailAt?: string;
  history: HealthCheckResult[];
}

export interface MonitoringData {
  forms: Record<string, FormState>;
  clientFailures: ClientFailureEvent[];
}

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
}

function defaultData(): MonitoringData {
  const forms: Record<string, FormState> = {};
  for (const f of MONITORED_FORMS) {
    forms[f.id] = {
      consecutiveFailures: 0,
      alertActive: false,
      history: [],
    };
  }
  return { forms, clientFailures: [] };
}

export function loadMonitoring(): MonitoringData {
  ensureDataDir();
  if (!existsSync(DATA_FILE)) {
    const d = defaultData();
    writeFileSync(DATA_FILE, JSON.stringify(d, null, 2), "utf-8");
    return d;
  }
  try {
    const raw = readFileSync(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw) as MonitoringData;
    if (!parsed.forms) parsed.forms = {};
    if (!parsed.clientFailures) parsed.clientFailures = [];
    for (const f of MONITORED_FORMS) {
      if (!parsed.forms[f.id]) {
        parsed.forms[f.id] = {
          consecutiveFailures: 0,
          alertActive: false,
          history: [],
        };
      }
    }
    return parsed;
  } catch (err) {
    console.error("Error loading monitoring data, resetting:", err);
    const d = defaultData();
    writeFileSync(DATA_FILE, JSON.stringify(d, null, 2), "utf-8");
    return d;
  }
}

export function saveMonitoring(data: MonitoringData): void {
  ensureDataDir();
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export function recordCheckResult(result: HealthCheckResult): FormState {
  const data = loadMonitoring();
  const state = data.forms[result.formId] || {
    consecutiveFailures: 0,
    alertActive: false,
    history: [],
  };
  state.history.unshift(result);
  if (state.history.length > MAX_HISTORY_PER_FORM) {
    state.history.length = MAX_HISTORY_PER_FORM;
  }
  if (result.ok) {
    state.consecutiveFailures = 0;
    state.lastOkAt = result.checkedAt;
  } else {
    state.consecutiveFailures += 1;
    state.lastFailAt = result.checkedAt;
  }
  data.forms[result.formId] = state;
  saveMonitoring(data);
  return state;
}

export function setAlertActive(formId: string, active: boolean): void {
  const data = loadMonitoring();
  const state = data.forms[formId];
  if (!state) return;
  state.alertActive = active;
  if (active) state.lastAlertAt = new Date().toISOString();
  else state.lastRecoveryAt = new Date().toISOString();
  saveMonitoring(data);
}

export function recordClientFailure(event: ClientFailureEvent): void {
  const data = loadMonitoring();
  data.clientFailures.unshift(event);
  if (data.clientFailures.length > MAX_CLIENT_FAILURES) {
    data.clientFailures.length = MAX_CLIENT_FAILURES;
  }
  saveMonitoring(data);
}
