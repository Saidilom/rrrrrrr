"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MODULES } from "@/lib/test";
import { isCorrect, scoreTest, type AnswerMap } from "@/lib/scoring";
import { RESULT_KEY, clearAll, displayName, loadSession } from "@/lib/session";

interface StoredResult {
  answers: AnswerMap;
  violations: number;
  penaltySeconds: number;
  completedAt: number;
}

function fmt(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function ScoreCard({
  label,
  value,
  range,
}: {
  label: string;
  value: number;
  range: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-7 py-6 text-center">
      <p className="text-[13px] font-semibold uppercase tracking-wide text-cb-gray">
        {label}
      </p>
      <p className="mt-2 text-[46px] font-semibold leading-none tabular-nums">
        {value}
      </p>
      <p className="mt-2 text-[13px] text-cb-gray">{range}</p>
    </div>
  );
}

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<StoredResult | null>(null);
  const [ready, setReady] = useState(false);
  const [openQ, setOpenQ] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "wrong">("all");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(RESULT_KEY);
      if (raw) setResult(JSON.parse(raw) as StoredResult);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const report = useMemo(
    () => (result ? scoreTest(result.answers) : null),
    [result]
  );

  if (!ready) {
    return (
      <div className="flex h-screen items-center justify-center text-[15px] text-cb-gray">
        Loading your score report…
      </div>
    );
  }

  if (!result || !report) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="text-[32px] font-semibold">No score report yet</h1>
        <p className="mt-4 max-w-md text-[15px] text-cb-gray">
          Finish a practice test and your score report will appear here.
        </p>
        <Link href="/checkin" className="cb-btn-yellow mt-8">
          Start a test
        </Link>
      </main>
    );
  }

  const session = loadSession();

  return (
    <main className="min-h-screen bg-cb-panel pb-20">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link href="/home" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-cb-blue text-[13px] font-bold text-white">
              BB
            </div>
            <span className="text-[16px] font-semibold">Score Report</span>
          </Link>
          <button
            className="text-[14px] font-medium text-cb-blue hover:underline"
            onClick={() => {
              clearAll();
              router.push("/checkin");
            }}
          >
            Take the test again
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6">
        <section className="pt-12 text-center">
          <p className="text-[14px] text-cb-gray">
            {displayName(session)} · Practice Test 1
          </p>
          <h1 className="mt-2 text-[40px] font-semibold tracking-tight">
            Your Practice Score
          </h1>
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-3">
          <ScoreCard
            label="Total"
            value={report.totalScale}
            range="400–1600 scale"
          />
          {report.sections.map((s) => (
            <ScoreCard
              key={s.section}
              label={s.label}
              value={s.scaled}
              range="200–800 scale"
            />
          ))}
        </section>

        <section className="mt-4 grid gap-4 sm:grid-cols-2">
          {report.sections.map((s) => (
            <div
              key={s.section}
              className="rounded-2xl border border-gray-200 bg-white px-7 py-6"
            >
              <h2 className="text-[17px] font-semibold">{s.label}</h2>
              <p className="mt-1 text-[14px] text-cb-gray">
                {s.raw} of {s.total} correct
              </p>
              <dl className="mt-4 space-y-2 text-[14px]">
                <div className="flex justify-between">
                  <dt className="text-cb-gray">Module 1</dt>
                  <dd className="tabular-nums">
                    {s.module1Raw} / {s.module1Total}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-cb-gray">Module 2</dt>
                  <dd className="tabular-nums">
                    {s.module2Raw} / {s.module2Total}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2">
                  <dt className="text-cb-gray">Routed to</dt>
                  <dd className="font-medium">
                    {s.routed === "upper"
                      ? "Higher-difficulty module 2"
                      : "Lower-difficulty module 2"}
                  </dd>
                </div>
              </dl>
              {s.routed === "lower" ? (
                <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-[13px] leading-relaxed text-amber-900">
                  Because module 1 fell below the routing threshold, this
                  section&rsquo;s score is capped well below 800 — the same way
                  it works on the real test.
                </p>
              ) : null}
            </div>
          ))}
        </section>

        <section className="mt-4 grid gap-4 sm:grid-cols-2">
          {(["rw", "math"] as const).map((kind) => (
            <div
              key={kind}
              className="rounded-2xl border border-gray-200 bg-white px-7 py-6"
            >
              <h2 className="mb-4 text-[17px] font-semibold">
                {kind === "rw" ? "Reading and Writing" : "Math"} by domain
              </h2>
              <ul className="space-y-3">
                {report.domains[kind].map((d) => {
                  const pct = Math.round((d.correct / d.total) * 100);
                  return (
                    <li key={d.domain}>
                      <div className="mb-1 flex items-baseline justify-between text-[13px]">
                        <span>{d.domain}</span>
                        <span className="tabular-nums text-cb-gray">
                          {d.correct}/{d.total}
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-cb-blue"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </section>

        <section className="mt-4 rounded-2xl border border-gray-200 bg-white px-7 py-6">
          <h2 className="text-[17px] font-semibold">Test conduct</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3 text-[14px]">
            <div>
              <p className="text-cb-gray">Questions answered</p>
              <p className="mt-1 text-[22px] font-semibold tabular-nums">
                {report.answered} / {report.totalQuestions}
              </p>
            </div>
            <div>
              <p className="text-cb-gray">Times you left the window</p>
              <p className="mt-1 text-[22px] font-semibold tabular-nums">
                {result.violations}
              </p>
            </div>
            <div>
              <p className="text-cb-gray">Testing time lost</p>
              <p className="mt-1 text-[22px] font-semibold tabular-nums">
                {fmt(result.penaltySeconds)}
              </p>
            </div>
          </div>
        </section>

        {/* Question review */}
        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-[26px] font-semibold tracking-tight">
              Review your answers
            </h2>
            <div className="flex gap-2 text-[13px]">
              {(
                [
                  ["all", "All"],
                  ["wrong", "Missed only"],
                ] as const
              ).map(([k, label]) => (
                <button
                  key={k}
                  onClick={() => setFilter(k)}
                  className={`rounded-full px-4 py-1.5 font-medium transition ${
                    filter === k
                      ? "bg-cb-blue text-white"
                      : "border border-gray-300 bg-white hover:bg-gray-50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {MODULES.map((m) => {
              const rows = m.questions.filter(
                (q) => filter === "all" || !isCorrect(q, result.answers[q.id])
              );
              if (rows.length === 0) return null;
              return (
                <div key={m.id}>
                  <h3 className="mb-3 text-[15px] font-semibold text-cb-gray">
                    {m.title}
                  </h3>
                  <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                    {rows.map((q) => {
                      const idx = m.questions.indexOf(q) + 1;
                      const a = result.answers[q.id];
                      const given = q.type === "mc" ? a?.choice : a?.spr;
                      const ok = isCorrect(q, a);
                      const open = openQ === q.id;
                      return (
                        <div
                          key={q.id}
                          className="border-b border-gray-100 last:border-b-0"
                        >
                          <button
                            onClick={() => setOpenQ(open ? null : q.id)}
                            className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-gray-50"
                          >
                            <span
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[14px] font-semibold ${
                                ok
                                  ? "bg-green-100 text-cb-green"
                                  : "bg-red-100 text-[#B42318]"
                              }`}
                            >
                              {idx}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-[14px] font-medium">
                                {q.skill}
                              </span>
                              <span className="block text-[13px] text-cb-gray">
                                {q.domain} ·{" "}
                                {q.difficulty === "E"
                                  ? "Easy"
                                  : q.difficulty === "M"
                                  ? "Medium"
                                  : "Hard"}
                              </span>
                            </span>
                            <span className="hidden shrink-0 text-[13px] text-cb-gray sm:block">
                              Your answer:{" "}
                              <strong className="font-semibold text-cb-ink">
                                {given || "—"}
                              </strong>
                              {"  ·  "}
                              Correct:{" "}
                              <strong className="font-semibold text-cb-ink">
                                {q.correct.split("|")[0]}
                              </strong>
                            </span>
                            <span
                              className={`shrink-0 rounded-md px-2 py-0.5 text-[12px] font-semibold ${
                                ok
                                  ? "bg-green-100 text-cb-green"
                                  : "bg-red-100 text-[#B42318]"
                              }`}
                            >
                              {ok ? "Correct" : "Incorrect"}
                            </span>
                          </button>

                          {open ? (
                            <div className="border-t border-gray-100 bg-cb-panel px-5 py-6">
                              {q.stimulus ? (
                                <div
                                  className="cb-prose mb-4 rounded-xl border border-gray-200 bg-white p-5"
                                  dangerouslySetInnerHTML={{
                                    __html: q.stimulus,
                                  }}
                                />
                              ) : null}
                              <div
                                className="cb-prose mb-4 font-medium"
                                dangerouslySetInnerHTML={{ __html: q.prompt }}
                              />
                              {q.choices ? (
                                <ul className="mb-5 space-y-2">
                                  {q.choices.map((c) => {
                                    const isRight = c.label === q.correct;
                                    const isGiven = c.label === given;
                                    return (
                                      <li
                                        key={c.label}
                                        className={`flex items-start gap-3 rounded-lg border px-4 py-2.5 text-[15px] ${
                                          isRight
                                            ? "border-cb-green bg-green-50"
                                            : isGiven
                                            ? "border-[#B42318] bg-red-50"
                                            : "border-gray-200 bg-white"
                                        }`}
                                      >
                                        <span className="font-semibold">
                                          {c.label}
                                        </span>
                                        <span
                                          dangerouslySetInnerHTML={{
                                            __html: c.text,
                                          }}
                                        />
                                      </li>
                                    );
                                  })}
                                </ul>
                              ) : (
                                <p className="mb-5 text-[15px]">
                                  Accepted answer:{" "}
                                  <strong className="font-semibold">
                                    {q.correct.split("|").join(" or ")}
                                  </strong>
                                </p>
                              )}
                              <div className="rounded-xl border border-gray-200 bg-white p-5">
                                <p className="mb-1.5 text-[13px] font-semibold uppercase tracking-wide text-cb-gray">
                                  Explanation
                                </p>
                                <p className="text-[15px] leading-relaxed">
                                  {q.rationale}
                                </p>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="mt-12 flex justify-center gap-4">
          <button
            className="cb-btn-yellow"
            onClick={() => {
              clearAll();
              router.push("/checkin");
            }}
          >
            Take another test
          </button>
          <Link href="/home" className="cb-btn-outline">
            Return to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
