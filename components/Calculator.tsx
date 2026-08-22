"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    // Loaded on demand from the Desmos CDN.
    Desmos?: any;
  }
}

const DESMOS_SRC =
  "https://www.desmos.com/api/v1.10/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6";

/**
 * The graphing calculator shown on math questions. Desmos is loaded lazily the
 * first time a student opens the panel; if it can't be reached we fall back to
 * a plain expression evaluator so the tool is never simply missing.
 */
export default function Calculator() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const instanceRef = useRef<any>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "failed">(
    "loading"
  );

  useEffect(() => {
    let cancelled = false;

    function init() {
      if (cancelled || !hostRef.current || !window.Desmos) return;
      try {
        instanceRef.current = window.Desmos.GraphingCalculator(hostRef.current, {
          keypad: true,
          expressions: true,
          settingsMenu: false,
          zoomButtons: true,
          border: false,
        });
        setStatus("ready");
      } catch {
        setStatus("failed");
      }
    }

    if (window.Desmos) {
      init();
      return () => {
        cancelled = true;
      };
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-desmos="1"]`
    );
    const script = existing ?? document.createElement("script");
    if (!existing) {
      script.src = DESMOS_SRC;
      script.async = true;
      script.dataset.desmos = "1";
      document.head.appendChild(script);
    }
    script.addEventListener("load", init);
    script.addEventListener("error", () => !cancelled && setStatus("failed"));

    return () => {
      cancelled = true;
      script.removeEventListener("load", init);
    };
  }, []);

  useEffect(() => {
    return () => {
      try {
        instanceRef.current?.destroy?.();
      } catch {
        /* nothing to clean up */
      }
    };
  }, []);

  if (status === "failed") return <FallbackCalculator />;

  return (
    <div className="relative h-full w-full">
      <div ref={hostRef} className="h-full w-full" />
      {status === "loading" ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white text-[14px] text-cb-gray">
          Loading calculator…
        </div>
      ) : null}
    </div>
  );
}

/** Minimal arithmetic evaluator used only when the Desmos CDN is unreachable. */
function FallbackCalculator() {
  const [expr, setExpr] = useState("");
  const [out, setOut] = useState<string>("");

  function evaluate() {
    const cleaned = expr.replace(/\s+/g, "");
    if (!/^[0-9+\-*/().^%]*$/.test(cleaned)) {
      setOut("Unsupported characters");
      return;
    }
    try {
      // eslint-disable-next-line no-new-func
      const value = Function(
        `"use strict"; return (${cleaned.replace(/\^/g, "**")});`
      )();
      setOut(Number.isFinite(value) ? String(value) : "Undefined");
    } catch {
      setOut("Invalid expression");
    }
  }

  return (
    <div className="flex h-full flex-col gap-3 p-5">
      <p className="text-[13px] text-cb-gray">
        The graphing calculator could not be loaded. A basic calculator is
        available instead.
      </p>
      <input
        value={expr}
        onChange={(e) => setExpr(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && evaluate()}
        placeholder="e.g. (3+4)*2^3"
        className="rounded-lg border border-cb-line px-4 py-3 text-[18px] outline-none focus:border-cb-blue"
      />
      <button className="cb-btn-blue self-start" onClick={evaluate}>
        Evaluate
      </button>
      {out ? (
        <p className="rounded-lg bg-cb-panel px-4 py-3 cb-prose-math text-[20px]">
          {out}
        </p>
      ) : null}
    </div>
  );
}
