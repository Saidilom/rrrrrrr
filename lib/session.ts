"use client";

export interface StudentSession {
  firstName: string;
  lastName: string;
  startCode: string;
  startedAt: number;
}

const SESSION_KEY = "bb_session";
export const STATE_KEY = "bb_test_state";
export const RESULT_KEY = "bb_test_result";

export function saveSession(s: StudentSession) {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(s));
  } catch {
    /* storage unavailable — the test still runs, just without persistence */
  }
}

export function loadSession(): StudentSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as StudentSession) : null;
  } catch {
    return null;
  }
}

export function clearAll() {
  try {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(STATE_KEY);
    localStorage.removeItem(RESULT_KEY);
  } catch {
    /* ignore */
  }
}

export function displayName(s: StudentSession | null): string {
  if (!s) return "Practice Student";
  const full = `${s.firstName} ${s.lastName}`.trim();
  return full || "Practice Student";
}
