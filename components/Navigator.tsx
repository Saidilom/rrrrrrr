"use client";

import type { Question } from "@/lib/types";

export interface QuestionStatus {
  answered: boolean;
  flagged: boolean;
}

function LocationPin({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-5 w-5 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="10.5" r="3" />
      <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

export function FlagIcon({
  filled,
  className = "",
}: {
  filled?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-[18px] w-[18px] ${className}`}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    >
      <path d="M6.5 4h11v16.5l-5.5-3.2-5.5 3.2V4z" />
    </svg>
  );
}

export default function Navigator({
  open,
  onClose,
  title,
  questions,
  statuses,
  current,
  onJump,
  onReview,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  questions: Question[];
  statuses: QuestionStatus[];
  current: number;
  onJump: (i: number) => void;
  onReview: () => void;
}) {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onMouseDown={onClose} aria-hidden />
      <div className="absolute bottom-[92px] left-1/2 z-50 w-[560px] -translate-x-1/2 rounded-xl border border-gray-300 bg-white p-6 shadow-2xl">
        <div className="relative">
          <p className="px-8 text-center text-[20px] font-semibold leading-snug">
            {title}
            <br />
            Questions
          </p>
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-0 top-0 rounded p-1 text-cb-gray transition hover:bg-gray-100"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center gap-7 border-b border-gray-200 pb-4 text-[13px] text-cb-gray">
          <span className="flex items-center gap-1.5">
            <LocationPin className="text-cb-ink" />
            Current
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-[15px] w-[15px] rounded-[3px] border border-dashed border-cb-gray" />
            Unanswered
          </span>
          <span className="flex items-center gap-1.5">
            <FlagIcon filled className="text-[#C13030]" />
            For Review
          </span>
        </div>

        <div className="mt-5 grid grid-cols-9 gap-x-3 gap-y-5">
          {questions.map((q, i) => {
            const st = statuses[i];
            const isCurrent = i === current;
            return (
              <button
                key={q.id}
                onClick={() => {
                  onJump(i);
                  onClose();
                }}
                className="relative flex h-[34px] w-[34px] items-center justify-center"
                aria-label={`Question ${i + 1}${
                  st.answered ? ", answered" : ", unanswered"
                }${st.flagged ? ", marked for review" : ""}`}
              >
                {isCurrent ? (
                  <LocationPin className="absolute -top-[16px] h-[18px] w-[18px] text-cb-ink" />
                ) : null}
                {st.flagged ? (
                  <FlagIcon
                    filled
                    className="absolute -right-[7px] -top-[9px] text-[#C13030]"
                  />
                ) : null}
                <span
                  className={[
                    "relative flex h-[34px] w-[34px] items-center justify-center rounded-none border bg-white text-[15px] font-medium",
                    st.answered
                      ? "border-cb-blue text-cb-blue"
                      : "border-dashed border-cb-gray text-cb-blue",
                  ].join(" ")}
                >
                  {i + 1}
                  {isCurrent ? (
                    <span className="absolute bottom-[3px] left-1/2 h-[2px] w-[16px] -translate-x-1/2 bg-cb-blue" />
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-7 flex justify-center">
          <button
            className="rounded-full border border-cb-blue px-7 py-2 text-[14px] font-bold text-cb-blue transition hover:bg-[#EEF1FE]"
            onClick={() => {
              onReview();
              onClose();
            }}
          >
            Go to Review Page
          </button>
        </div>
      </div>
    </>
  );
}
