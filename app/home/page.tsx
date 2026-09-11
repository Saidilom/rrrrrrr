"use client";

import Link from "next/link";
import { MODULES } from "@/lib/test";

const totalQuestions = MODULES.reduce((n, m) => n + m.questions.length, 0);

function BluebookMark({ className = "h-6 w-6" }: { className?: string }) {
  return <img src="/bluebook-star-blue.png" alt="" className={`${className} object-contain`} />;
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="white">
      <circle cx="12" cy="8.5" r="3.8" />
      <path d="M4.5 20c0-4.2 3.4-6.8 7.5-6.8s7.5 2.6 7.5 6.8z" />
    </svg>
  );
}

function TicketIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0" fill="none">
      <path
        d="M4 8a2 2 0 012-2h12a2 2 0 012 2v2a1.5 1.5 0 000 3v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a1.5 1.5 0 000-3V8z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M14 6.5v11" stroke="currentColor" strokeWidth="1.8" strokeDasharray="2 2" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0" fill="none">
      <circle cx="12" cy="12" r="9.3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10 8.3l6.2 3.7-6.2 3.7z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0" fill="none">
      <path
        d="M4.5 12.5l5 5L19.5 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckCircleFilled({ className = "text-cb-green" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-5 w-5 shrink-0 ${className}`} fill="none">
      <circle cx="12" cy="12" r="9.3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M7.5 12.3l3 3 6-6.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SegmentedToggle() {
  return (
    <div className="flex overflow-hidden rounded-full border border-gray-300 text-[14px] font-semibold">
      <span className="flex items-center gap-1.5 bg-[#1E1E1E] px-4 py-1.5 text-white">
        <CheckIcon /> Active
      </span>
      <span className="px-4 py-1.5 text-black">Past</span>
    </div>
  );
}

const dateStr = "Sat, Sep 12, 2026";
const firstName = "Behruz";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <header className="bg-cb-chrome px-8 pb-8 pt-7 sm:px-14">
        <div className="mx-auto flex max-w-6xl flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BluebookMark className="h-6 w-6" />
              <span className="text-[22px] font-extrabold tracking-tight text-cb-blue">
                Bluebook
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[16px] font-medium text-black">
                {firstName}
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1E1E1E]">
                <PersonIcon />
              </span>
            </div>
          </div>

          <h1 className="text-[34px] font-semibold leading-tight text-cb-blue sm:text-[42px]">
            Good luck, {firstName}!
          </h1>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-8 py-10 sm:px-14">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <h2 className="text-[28px] font-bold">Your Tests</h2>
            <SegmentedToggle />
          </div>
          <Link
            href="#"
            className="text-[15px] font-medium text-cb-blue underline underline-offset-2"
          >
            Don&rsquo;t see your test here?
          </Link>
        </div>

        <div className="max-w-md rounded-2xl bg-cb-panel p-8 shadow-md">
          <h3 className="text-[26px] font-bold">SAT</h3>

          <div className="mt-5 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1.5 text-[15px]">
              <p>
                <span className="font-bold">Date:</span> {dateStr}
              </p>
              <p>
                <span className="font-bold">Arrival Time:</span> 7:45 a.m.
              </p>
              <p>
                <span className="font-bold">Doors Close:</span> 8:00 a.m.
              </p>
            </div>
            <div className="space-y-2.5 text-[15px] font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-cb-blue underline underline-offset-2"
              >
                <TicketIcon />
                Admission Ticket
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 text-cb-blue underline underline-offset-2"
              >
                <PlayIcon />
                Exam Overview
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 text-cb-blue underline underline-offset-2"
              >
                <CheckIcon />
                Test Day Checklist
              </Link>
            </div>
          </div>

          <div className="mt-6 space-y-1 text-[15px]">
            <p className="font-bold">Lincoln High School</p>
            <p>Buyuk Ipak Yuli, 1-2</p>
            <p>Mirzo Ulugbek District, Tashkent</p>
          </div>

          <div className="mt-6">
            <p className="text-[15px] font-bold">Testing Accommodations:</p>
            <p className="text-[15px]">
              You have no approved accommodations for this test.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-gray-300 pt-6">
            <div className="flex items-center gap-2.5 text-[15px]">
              <CheckCircleFilled />
              <span className="font-semibold">It&rsquo;s time to check in.</span>
            </div>
            <Link
              href="/checkin"
              className="rounded-full border border-black bg-cb-yellow px-8 py-3 text-[15px] font-medium text-black transition hover:bg-cb-yellowhover"
            >
              Check In Now
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-8 pb-16 sm:px-14">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <h2 className="text-[28px] font-bold">Practice and Prepare</h2>
            <SegmentedToggle />
          </div>
          <Link
            href="#"
            className="text-[15px] font-medium text-cb-blue underline underline-offset-2"
          >
            Learn more about practice
          </Link>
        </div>

        <div className="rounded-2xl bg-cb-panel p-8">
          <h3 className="text-[20px] font-bold">Full-Length Practice Test</h3>
          <p className="mt-2 max-w-2xl text-[15px] text-cb-gray">
            {totalQuestions} questions across two adaptive sections — Reading
            and Writing, then Math — with a countdown clock and a full score
            report at the end.
          </p>
          <Link href="/checkin" className="cb-btn-yellow mt-5 inline-flex">
            Start Practice Test
          </Link>
        </div>
      </div>

      <footer className="border-t border-gray-200 px-8 py-6 sm:px-14">
        <p className="text-right text-[13px] text-cb-gray">
          VSN-0.9.724 BT-2026-08-13 12:12
        </p>
      </footer>
    </main>
  );
}
