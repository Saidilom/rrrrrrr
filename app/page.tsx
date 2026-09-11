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
    <img
      src="/signin-illustration.png"
      alt=""
      className="pointer-events-none absolute inset-x-0 -bottom-16 w-full object-contain object-bottom opacity-25"
      aria-hidden="true"
    />
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
