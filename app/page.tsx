import Link from "next/link";

function BluebookMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="white">
      <path
        d="M17 1L20.2 11.6L31 15L20.2 18.4L17 29L13.8 18.4L3 15L13.8 11.6Z"
        transform="rotate(-16 17 15)"
      />
      <path d="M8 13.5L10.2 18.7L15.5 21L10.2 23.3L8 29.5L5.8 23.3L0.5 21L5.8 18.7Z" />
    </svg>
  );
}

function LaptopIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <rect x="3" y="4" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M1 19h22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function TicketIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
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

function BackgroundArt() {
  return (
    <>
      <svg
        viewBox="0 0 200 200"
        className="pointer-events-none absolute -left-10 bottom-[-40px] h-[420px] w-[420px] opacity-[0.12]"
        fill="white"
        aria-hidden="true"
      >
        <path d="M92 8L100 71L163 79L104 92L175 112L112 121L125 184L83 137L33 167L62 112L8 100L62 87L37 29L88 65Z" />
      </svg>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 overflow-hidden opacity-[0.16]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 1470 260" className="h-full w-full" fill="none">
          {/* device / tablet mockup */}
          <g transform="translate(50,50)" stroke="white" strokeWidth="4">
            <rect x="0" y="0" width="220" height="150" rx="10" />
            <circle cx="30" cy="26" r="6" fill="white" stroke="none" />
            <path d="M30 60h160M30 88h160M30 116h110" strokeLinecap="round" />
          </g>

          {/* checklist notepad */}
          <g transform="translate(340,20)" stroke="white" strokeWidth="4">
            <rect x="0" y="0" width="170" height="190" rx="12" />
            <circle cx="30" cy="55" r="9" />
            <path d="M52 55h90" strokeLinecap="round" />
            <circle cx="30" cy="95" r="9" />
            <path d="M52 95h90" strokeLinecap="round" />
            <circle cx="30" cy="135" r="9" />
            <path d="M52 135h90" strokeLinecap="round" />
          </g>

          {/* calculator */}
          <g transform="translate(600,60)" stroke="white" strokeWidth="4">
            <rect x="0" y="0" width="130" height="150" rx="12" />
            <rect x="18" y="18" width="94" height="34" rx="4" fill="white" stroke="none" />
            {[0, 1, 2].map((r) =>
              [0, 1, 2, 3].map((c) => (
                <rect
                  key={`${r}-${c}`}
                  x={18 + c * 26}
                  y={70 + r * 26}
                  width="16"
                  height="16"
                  rx="3"
                  fill="white"
                  stroke="none"
                />
              ))
            )}
          </g>

          {/* open book */}
          <g transform="translate(800,80)" stroke="white" strokeWidth="4" strokeLinejoin="round">
            <path d="M95 20C70 5 35 5 5 20v110c30-15 65-15 90 0z" />
            <path d="M95 20c25-15 60-15 90 0v110c-30-15-65-15-90 0z" />
            <path d="M95 20v110" />
          </g>

          {/* clock / stopwatch */}
          <g transform="translate(1010,55)" stroke="white" strokeWidth="4">
            <rect x="40" y="-6" width="26" height="12" rx="4" fill="white" stroke="none" />
            <circle cx="53" cy="80" r="72" />
            <path d="M53 40v42l30 20" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* building */}
          <g transform="translate(1160,60)" stroke="white" strokeWidth="4" strokeLinejoin="round">
            <path d="M0 60L75 10L150 60" />
            <path d="M10 60v90h140V60" />
            <path d="M45 150V80M75 150V80M105 150V80" />
            <path d="M0 150h150" strokeLinecap="round" />
          </g>

          {/* document + pencil */}
          <g transform="translate(1330,50)" stroke="white" strokeWidth="4" strokeLinejoin="round">
            <path d="M0 20h110M0 55h110M0 90h70" strokeLinecap="round" />
            <path d="M20 130l70-70 20 20-70 70-26 6z" />
          </g>
        </svg>
      </div>
    </>
  );
}

export default function SignIn() {
  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden bg-[#3D4EDD] px-6 py-10">
      <Link
        href="#"
        className="absolute right-6 top-8 flex items-center gap-2 rounded-full bg-white/25 px-5 py-2.5 text-[14px] font-bold text-white backdrop-blur-sm transition hover:bg-white/35"
      >
        <LaptopIcon />
        Test Your Device
      </Link>

      <div className="mt-10 flex items-center gap-3 sm:mt-16">
        <BluebookMark className="h-9 w-9 sm:h-11 sm:w-11" />
        <span className="relative text-[38px] font-extrabold tracking-tight text-white sm:text-[46px]">
          Bluebook
          <sup className="absolute -right-4 top-1 text-[13px] font-semibold sm:-right-5 sm:text-[15px]">TM</sup>
        </span>
      </div>

      <div className="relative z-10 mt-10 w-full max-w-[480px] rounded-[28px] bg-white px-8 py-10 shadow-xl sm:px-12">
        <h1 className="text-center text-[32px] font-extrabold tracking-tight text-black">
          Sign In
        </h1>

        <Link
          href="/signin-student"
          className="mt-8 flex w-full items-center justify-center gap-2.5 rounded-full border border-black bg-cb-yellow px-6 py-4 text-[16px] font-medium text-black transition hover:bg-cb-yellowhover"
        >
          <TicketIcon />
          Use a sign-in ticket from your school
        </Link>

        <div className="my-6 flex items-center gap-4 text-[14px] font-medium text-cb-gray">
          <span className="h-px flex-1 bg-gray-200" />
          OR
          <span className="h-px flex-1 bg-gray-200" />
        </div>

        <Link
          href="/signin-student"
          className="flex w-full items-center justify-center whitespace-nowrap rounded-full border border-black px-6 py-4 text-center text-[13px] font-medium text-black transition hover:bg-gray-50"
        >
          Sign in with a College Board student account
        </Link>

        <div className="mt-7 flex flex-col items-center gap-3 text-[15px]">
          <Link href="#" className="font-medium text-cb-blue underline underline-offset-2">
            I&rsquo;m an educator
          </Link>
          <Link href="#" className="font-medium text-cb-blue underline underline-offset-2">
            Need help signing in?
          </Link>
        </div>
      </div>

      <BackgroundArt />

      <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2 rounded-full bg-[#12123A] px-4 py-2.5 text-[14px] font-semibold text-white">
        <KeyboardIcon />
        Английский
        <CaretDown />
      </div>
    </main>
  );
}
