"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function BluebookMark({ className = "h-8 w-8" }: { className?: string }) {
  return <img src="/bluebook-star.png" alt="" className={`${className} object-contain`} />;
}

function LaptopIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <rect x="3" y="4" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M1 19h22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function KeyboardIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
      <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6 9h.01M10 9h.01M14 9h.01M18 9h.01M6 13h.01M18 13h.01M9 13h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CaretDown() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MegaphoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0" fill="none">
      <path
        d="M3 10v4a1 1 0 001 1h2l7 4V5L6 9H4a1 1 0 00-1 1z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M18 9a4 4 0 010 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function EyeIcon({ off }: { off: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path
        d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
      {off ? <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /> : null}
    </svg>
  );
}

export default function SignInStudent() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const canSubmit = email.trim().length > 0 && password.length > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    router.push("/home");
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#3D4EDD]">
      <div className="flex h-11 shrink-0 items-center justify-between bg-[#111124] px-4 text-white">
        <div className="flex items-center gap-2 text-[13px] font-medium">
          <BluebookMark className="h-4 w-4" />
          Bluebook
        </div>
        <div className="flex items-center gap-4 text-white/80">
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none">
            <path d="M5 19h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
            <rect x="4" y="4" width="16" height="16" rx="1.5" stroke="currentColor" strokeWidth="2" />
          </svg>
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
            <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <main className="relative flex flex-1 flex-col items-center overflow-hidden px-6 py-8">
        <Link
          href="#"
          className="absolute right-6 top-8 flex items-center gap-2 rounded-full bg-white/25 px-5 py-2.5 text-[14px] font-bold text-white backdrop-blur-sm transition hover:bg-white/35"
        >
          <LaptopIcon />
          Test Your Device
        </Link>

        <div className="mt-4 flex items-center gap-2.5 sm:mt-6">
          <BluebookMark className="h-7 w-7 sm:h-8 sm:w-8" />
          <span className="relative text-[28px] font-extrabold tracking-tight text-white sm:text-[32px]">
            Bluebook
            <sup className="absolute -right-3.5 top-0.5 text-[10px] font-semibold sm:text-[11px]">TM</sup>
          </span>
        </div>

        <div className="relative z-10 mt-8 w-full max-w-[600px] rounded-[28px] bg-white px-8 py-9 shadow-xl sm:px-11">
          <Link
            href="/"
            className="flex w-fit items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-[14px] font-bold text-black transition hover:bg-gray-50"
          >
            <ChevronLeft />
            Back
          </Link>

          <h1 className="mt-6 text-[28px] font-extrabold tracking-tight text-black sm:text-[30px]">
            Sign In with a Student Account
          </h1>

          <div className="mt-6 flex items-start gap-3 rounded-xl border border-gray-300 px-5 py-4 text-[15px] leading-relaxed text-black">
            <MegaphoneIcon />
            <p>
              You&rsquo;re using a non-English keyboard. To switch to English,
              press <strong>Alt + Shift</strong>.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <label className="mt-6 block text-[16px] font-bold text-black">
              Email Address
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-[16px] font-normal outline-none focus:border-cb-blue"
              />
            </label>

            <label className="mt-5 block text-[16px] font-bold text-black">
              Password
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 text-[16px] font-normal outline-none focus:border-cb-blue"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-cb-gray"
                >
                  <EyeIcon off={showPassword} />
                </button>
              </div>
            </label>

            <Link
              href="#"
              className="mt-3 inline-block text-[15px] font-medium text-cb-blue underline underline-offset-2"
            >
              Forgot password?
            </Link>

            <button
              type="submit"
              disabled={!canSubmit}
              className={`mt-7 w-full rounded-full px-6 py-3.5 text-[16px] font-bold transition ${
                canSubmit
                  ? "bg-black text-white hover:bg-[#222]"
                  : "cursor-not-allowed bg-[#EDEDED] text-[#B0B0B0]"
              }`}
            >
              Submit
            </button>
          </form>

          <div className="mt-6 flex justify-center">
            <Link href="#" className="text-[15px] font-medium text-cb-blue underline underline-offset-2">
              Need help signing in?
            </Link>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2 rounded-full bg-[#12123A] px-4 py-2.5 text-[14px] font-semibold text-white">
          <KeyboardIcon />
          Русский
          <CaretDown />
        </div>
      </main>

      <p className="absolute bottom-3 right-4 rounded-md border border-gray-300 bg-white px-2 py-1 text-[11px] font-medium text-cb-gray">
        VSN-0.9.724 BT-2026-08-13 12:12
      </p>
    </div>
  );
}
