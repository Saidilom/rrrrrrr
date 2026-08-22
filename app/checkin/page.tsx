"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CodeInput from "@/components/CodeInput";
import { MODULES } from "@/lib/test";
import { clearAll, saveSession } from "@/lib/session";

const TOTAL_STEPS = 10;

/* ------------------------------------------------------------------ chrome */

function HelpIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none">
      <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M9.6 9.3a2.5 2.5 0 114.05 2.2c-.9.72-1.65 1.2-1.65 2.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="17" r="1" fill="currentColor" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[24px] w-[24px]" fill="none">
      <path
        d="M3.5 11.2L12 4l8.5 7.2M5.8 10v9.2h12.4V10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="10.2"
        y="14"
        width="3.6"
        height="5.2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function CheckCircle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-6 w-6 ${className}`} fill="none">
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path
        d="M7.5 12.3l3 3 6-6.4"
        stroke="#fff"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Shell({
  children,
  green = false,
}: {
  children: React.ReactNode;
  green?: boolean;
}) {
  return (
    <div
      className={`flex-1 overflow-y-auto ${green ? "bg-cb-greenbg" : "bg-cb-panel"}`}
    >
      {children}
    </div>
  );
}

function StepTitle({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="text-center">
      <h1 className="pt-14 text-[46px] font-normal leading-tight tracking-tight">
        {title}
      </h1>
      {children ? (
        <div className="mx-auto mt-6 max-w-2xl space-y-4 text-[19px] leading-relaxed text-cb-ink">
          {children}
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------- steps */

function DeviceCheck() {
  const items = useMemo(
    () => [
      "Browser version supported",
      "Screen size sufficient",
      "Local storage available",
      "Connection to the practice server",
    ],
    []
  );
  const [done, setDone] = useState(0);

  useEffect(() => {
    if (done >= items.length) return;
    const t = setTimeout(() => setDone((d) => d + 1), 550);
    return () => clearTimeout(t);
  }, [done, items.length]);

  return (
    <ul className="mx-auto mt-10 max-w-md space-y-3 text-left">
      {items.map((label, i) => (
        <li
          key={label}
          className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-4 text-[16px]"
        >
          {i < done ? (
            <CheckCircle className="shrink-0 text-cb-green" />
          ) : (
            <span
              className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-gray-300 border-t-cb-blue"
              aria-hidden
            />
          )}
          <span className={i < done ? "" : "text-cb-gray"}>{label}</span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------- page */

export default function CheckInPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [phase, setPhase] = useState<"steps" | "startcode">("steps");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [startCode, setStartCode] = useState("");
  const [showDirections, setShowDirections] = useState(false);

  const roomComplete = roomCode.length === 5;
  const startComplete = startCode.length === 6;

  const canAdvance = useMemo(() => {
    if (step === 1) return firstName.trim().length > 0 && lastName.trim().length > 0;
    if (step === 2) return agreed;
    if (step === 3) return roomComplete;
    return true;
  }, [step, firstName, lastName, agreed, roomComplete]);

  const beginTest = useCallback(() => {
    clearAll();
    saveSession({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      roomCode,
      startCode,
      startedAt: Date.now(),
    });
    router.push("/test");
  }, [firstName, lastName, roomCode, startCode, router]);

  /* --------------------------------------------------------- start code */

  if (phase === "startcode") {
    return (
      <div className="flex h-screen flex-col bg-white">
        <header className="flex h-[74px] shrink-0 items-center justify-between border-b border-gray-200 bg-white px-8">
          <button className="flex items-center gap-2.5 text-[17px] font-medium">
            <HelpIcon />
            Help
          </button>
          <Link href="/home" className="flex items-center gap-2.5 text-[17px] font-medium">
            Return to Home
            <HomeIcon />
          </Link>
        </header>

        <Shell green>
          <div className="mx-auto flex min-h-full max-w-4xl flex-col px-6 pb-10">
            <StepTitle title="Start Code">
              <p>Enter your start code now to begin testing. Good luck!</p>
              <p>
                The start code contains <strong className="font-semibold">numbers only</strong>.
              </p>
            </StepTitle>

            <div className="mt-10">
              <CodeInput
                length={6}
                mode="numbers"
                value={startCode}
                onChange={setStartCode}
                tone="onGreen"
                autoFocus
                label="Start code"
              />
            </div>

            <div className="mt-9 flex justify-center">
              <button
                className="cb-btn-yellow px-9"
                disabled={!startComplete}
                onClick={beginTest}
              >
                Start Test
              </button>
            </div>

            <p className="mt-auto pt-16 text-center text-[17px]">
              You can{" "}
              <button
                className="text-cb-blue underline underline-offset-2"
                onClick={() => setShowDirections(true)}
              >
                review the instructions
              </button>{" "}
              that the proctor reads aloud.
            </p>
          </div>
        </Shell>

        {showDirections ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
            <div className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-8 shadow-xl">
              <h2 className="mb-4 text-[26px] font-semibold">
                Instructions read aloud by the proctor
              </h2>
              <div className="space-y-3 text-[15px] leading-relaxed text-cb-gray">
                <p>
                  You will now begin the test. Once you enter the start code,
                  your timer will begin and you may not stop it.
                </p>
                <p>
                  Each section has two modules. When time runs out on a module,
                  it is submitted automatically and you cannot return to it.
                </p>
                <p>
                  You may not leave the testing window. In this practice
                  environment, leaving costs you 30 seconds of testing time each
                  time it happens.
                </p>
                <p>
                  If you finish a module early, you may review your answers
                  within that module until time expires.
                </p>
              </div>
              <div className="mt-7 flex justify-end">
                <button
                  className="cb-btn-blue"
                  onClick={() => setShowDirections(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  /* ------------------------------------------------------------- steps */

  const stepBody = (() => {
    switch (step) {
      case 1:
        return (
          <>
            <StepTitle title="Confirm Your Information">
              <p>
                Check that your name is spelled the way it appears on your photo
                ID. It will be shown at the bottom of your screen while you test.
              </p>
            </StepTitle>
            <div className="mx-auto mt-10 grid max-w-md gap-5 text-left">
              <label className="block">
                <span className="mb-1.5 block text-[14px] font-semibold">
                  First name
                </span>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded-lg border border-cb-line bg-white px-4 py-3 text-[16px] outline-none focus:border-cb-blue"
                  placeholder="First name"
                  autoFocus
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[14px] font-semibold">
                  Last name
                </span>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full rounded-lg border border-cb-line bg-white px-4 py-3 text-[16px] outline-none focus:border-cb-blue"
                  placeholder="Last name"
                />
              </label>
              <p className="text-[13px] text-cb-gray">
                Nothing you type here leaves your browser.
              </p>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <StepTitle title="Testing Rules">
              <p>Read the rules below, then confirm that you agree to follow them.</p>
            </StepTitle>
            <ul className="mx-auto mt-9 max-w-2xl space-y-3 text-left">
              {[
                "Do not open any other application or browser tab while testing.",
                "Do not share or discuss test questions with anyone.",
                "Do not take photographs or screenshots of the test.",
                "Use only the tools provided inside the testing app.",
                "Remain at your desk until the test is submitted.",
              ].map((r) => (
                <li
                  key={r}
                  className="flex gap-3 rounded-xl border border-gray-200 bg-white px-5 py-4 text-[16px]"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cb-ink" />
                  {r}
                </li>
              ))}
            </ul>
            <label className="mx-auto mt-8 flex max-w-2xl cursor-pointer items-center gap-3 text-[16px]">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="h-5 w-5 accent-cb-blue"
              />
              I agree to the testing rules.
            </label>
          </>
        );

      case 3:
        return (
          <>
            <StepTitle title="Room Code">
              <p>Enter your room code now to complete check-in.</p>
              <p>
                The room code contains{" "}
                <strong className="font-semibold">letters only</strong>.
              </p>
            </StepTitle>

            <div className="mt-6 flex h-8 items-center justify-center">
              {roomComplete ? (
                <p className="flex items-center gap-2.5 text-[17px] font-semibold text-cb-green">
                  <CheckCircle className="text-cb-green" />
                  Success! Click the Next button to complete check-in.
                </p>
              ) : null}
            </div>

            <div className="mt-4">
              <CodeInput
                length={5}
                mode="letters"
                value={roomCode}
                onChange={setRoomCode}
                autoFocus
                label="Room code"
              />
            </div>
            <p className="mt-8 text-center text-[14px] text-cb-gray">
              Any five letters will be accepted in this practice build.
            </p>
          </>
        );

      case 4:
        return (
          <>
            <StepTitle title="Device Check">
              <p>We&rsquo;re making sure this device is ready to test.</p>
            </StepTitle>
            <DeviceCheck />
          </>
        );

      case 5:
        return (
          <>
            <StepTitle title="Your Testing Room">
              <p>Before you continue, take a moment to set up your space.</p>
            </StepTitle>
            <div className="mx-auto mt-9 grid max-w-2xl gap-3 sm:grid-cols-2">
              {[
                "Clear your desk of everything except your device and scratch paper.",
                "Put your phone away and silence notifications.",
                "Plug in your device or make sure the battery is above 50%.",
                "Close every other application and browser tab.",
              ].map((t) => (
                <div
                  key={t}
                  className="rounded-xl border border-gray-200 bg-white px-5 py-4 text-[15px] leading-relaxed"
                >
                  {t}
                </div>
              ))}
            </div>
          </>
        );

      case 6:
        return (
          <>
            <StepTitle title="About the Test">
              <p>
                The test has two sections. Each section is split into two
                modules, and each module is timed separately.
              </p>
            </StepTitle>
            <ol className="mx-auto mt-9 max-w-2xl space-y-3">
              {MODULES.map((m, i) => (
                <li
                  key={m.id}
                  className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cb-blue text-[13px] font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-left text-[15px] font-medium">
                    {m.title}
                  </span>
                  <span className="text-[14px] tabular-nums text-cb-gray">
                    {m.questions.length} questions · {m.minutes} min
                  </span>
                </li>
              ))}
            </ol>
            <p className="mx-auto mt-6 max-w-2xl text-center text-[15px] text-cb-gray">
              There is a 10-minute break between Section 1 and Section 2.
            </p>
          </>
        );

      case 7:
        return (
          <>
            <StepTitle title="Test Tools">
              <p>These tools are available to you throughout the test.</p>
            </StepTitle>
            <div className="mx-auto mt-9 grid max-w-3xl gap-3 sm:grid-cols-2">
              {[
                ["Timer", "Counts down the time left in the module. You can hide it."],
                ["Mark for Review", "Flag a question and come back to it later."],
                ["Answer Eliminator", "Cross out choices you have ruled out."],
                ["Highlights & Notes", "Highlight passage text as you read."],
                ["Calculator", "A graphing calculator, available on all math questions."],
                ["Reference Sheet", "Common formulas, available on all math questions."],
              ].map(([t, d]) => (
                <div
                  key={t}
                  className="rounded-xl border border-gray-200 bg-white px-5 py-4 text-left"
                >
                  <p className="mb-1 text-[15px] font-semibold">{t}</p>
                  <p className="text-[14px] leading-relaxed text-cb-gray">{d}</p>
                </div>
              ))}
            </div>
          </>
        );

      case 8:
        return (
          <>
            <StepTitle title="Test Directions">
              <p>
                You can reopen these directions at any time from the header
                during the test.
              </p>
            </StepTitle>
            <div className="mx-auto mt-9 max-w-2xl space-y-4 rounded-xl border border-gray-200 bg-white px-7 py-6 text-left text-[15px] leading-relaxed text-cb-gray">
              <p>
                Answer every question. There is no penalty for an incorrect
                answer, so it is always to your advantage to guess.
              </p>
              <p>
                You may move freely between questions within a module. Once a
                module is submitted, you cannot return to it.
              </p>
              <p>
                A module is submitted automatically when its timer reaches
                zero. Anything you have entered is kept.
              </p>
            </div>
          </>
        );

      case 9:
        return (
          <>
            <StepTitle title="Staying in the Test">
              <p>
                The official app locks your device. This practice build does not
                — but it does keep score.
              </p>
            </StepTitle>
            <div className="mx-auto mt-9 max-w-2xl rounded-xl border border-amber-300 bg-amber-50 px-7 py-6 text-left">
              <p className="mb-2 text-[16px] font-semibold">
                Leaving the test window costs you 30 seconds.
              </p>
              <p className="text-[15px] leading-relaxed text-cb-gray">
                Switching tabs, opening another application, or minimizing the
                window removes 30 seconds from the current module&rsquo;s clock.
                You&rsquo;ll see a warning when you come back, and every switch
                is counted in your score report.
              </p>
            </div>
          </>
        );

      case 10:
        return (
          <>
            <StepTitle title="You&rsquo;re All Set">
              <p>
                Check-in is complete. When your proctor tells you to begin,
                continue to the start code screen.
              </p>
            </StepTitle>
            <div className="mx-auto mt-10 flex max-w-md flex-col items-center gap-4 rounded-xl border border-gray-200 bg-white px-7 py-8">
              <CheckCircle className="h-10 w-10 text-cb-green" />
              <p className="text-center text-[16px]">
                {firstName} {lastName}
                <span className="mt-1 block text-[14px] text-cb-gray">
                  Room code {roomCode || "—"}
                </span>
              </p>
            </div>
          </>
        );

      default:
        return null;
    }
  })();

  return (
    <div className="flex h-screen flex-col bg-white">
      <header className="flex h-[74px] shrink-0 items-center justify-between border-b border-gray-200 bg-white px-8">
        <button className="flex items-center gap-2.5 text-[17px] font-medium">
          <HelpIcon />
          Help
        </button>
        <Link href="/home" className="flex items-center gap-2.5 text-[17px] font-medium">
          Return to Home
          <HomeIcon />
        </Link>
      </header>

      <Shell>
        <div className="mx-auto max-w-4xl px-6 pb-16">{stepBody}</div>
      </Shell>

      <footer className="flex h-[104px] shrink-0 items-center border-t border-gray-200 bg-white px-8">
        <div className="w-[220px]">
          {step > 1 ? (
            <button
              className="cb-btn-outline px-12"
              onClick={() => setStep((s) => s - 1)}
            >
              Back
            </button>
          ) : (
            <Link href="/home" className="cb-btn-outline px-12">
              Exit
            </Link>
          )}
        </div>

        <div className="flex flex-1 flex-col items-center gap-2.5">
          <p className="text-[17px]">
            Step {step} of {TOTAL_STEPS}
          </p>
          <div
            className="h-[7px] w-[300px] overflow-hidden rounded-full bg-[#E4E8F7]"
            role="progressbar"
            aria-valuenow={step}
            aria-valuemin={1}
            aria-valuemax={TOTAL_STEPS}
          >
            <div
              className="h-full rounded-full bg-cb-blue transition-all duration-300"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex w-[220px] justify-end">
          <button
            className="cb-btn-yellow px-12"
            disabled={!canAdvance}
            onClick={() => {
              if (step < TOTAL_STEPS) setStep((s) => s + 1);
              else setPhase("startcode");
            }}
          >
            Next
          </button>
        </div>
      </footer>
    </div>
  );
}
