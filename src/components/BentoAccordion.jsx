// src/components/BentoAccordion.jsx
import { useEffect, useRef, useState } from "react";

const FEATURES = [
  {
    id: "ingest",
    title: "Ingest anything",
    short: "200+ connectors, schema drift handled automatically.",
    long:
      "Pull from databases, SaaS tools, event streams, and flat files through one connector layer. The platform watches upstream schemas and reshapes pipelines in place when a source changes, instead of breaking the run.",
    size: "lg",
  },
  {
    id: "transform",
    title: "AI-assisted transforms",
    short: "Describe the shape you want, get production SQL/Python.",
    long:
      "Describe the output you need in plain language and the model proposes a transform step — SQL, Python, or a visual mapping — that you can edit, pin, and version like any other part of the pipeline.",
    size: "md",
  },
  {
    id: "orchestrate",
    title: "Orchestration that self-heals",
    short: "Retries, backfills, and alerting without extra config.",
    long:
      "Every pipeline run carries its own retry policy and backfill plan. When a step fails, the platform isolates the failure, retries with backoff, and only pages a human when its own recovery attempts are exhausted.",
    size: "md",
  },
  {
    id: "observe",
    title: "Live lineage graph",
    short: "Trace any field back to its source in two clicks.",
    long:
      "Every column in every output table carries a lineage trail back to its origin field, transform-by-transform. Useful for audits, and for the moment someone asks 'where did this number come from?'",
    size: "sm",
  },
  {
    id: "govern",
    title: "Governance built in",
    short: "Row-level access, audit trails, residency controls.",
    long:
      "Access policies travel with the data, not just the dashboard in front of it. Set residency and row-level rules once, and they're enforced consistently across every pipeline and every downstream consumer.",
    size: "sm",
  },
];

const MOBILE_QUERY = "(max-width: 767px)";

/**
 * CONTEXT LOCK:
 * `activeIndex` is the single source of truth for "which node is currently
 * engaged," shared by both the desktop bento grid and the mobile accordion.
 * Hovering/focusing a bento node sets it; opening an accordion panel sets
 * it. A matchMedia listener watches the breakpoint — it never resets
 * activeIndex, it only swaps which layout reads it, so whatever was active
 * the instant the breakpoint is crossed stays open after the transition.
 */
export default function BentoAccordion() {
  const [activeIndex, setActiveIndex] = useState(1); // sensible default: the AI-transform node
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const onChange = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="relative mx-auto max-w-6xl px-6 py-28"
    >
      <div className="mb-12 max-w-xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
          01 · Platform surface
        </p>
        <h2
          id="features-heading"
          className="mt-3 font-display text-3xl font-medium leading-tight text-[var(--color-text)] sm:text-4xl"
        >
          Five systems, one running context.
        </h2>
        <p className="mt-3 text-[var(--color-text-dim)]">
          Hover a node on desktop. Shrink the window mid-hover — the same
          node stays open as the layout folds into an accordion.
        </p>
      </div>

      {isMobile ? (
        <MobileAccordion
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      ) : (
        <DesktopBento activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      )}
    </section>
  );
}

function DesktopBento({ activeIndex, setActiveIndex }) {
  const sizeClass = {
    lg: "sm:col-span-2 sm:row-span-2",
    md: "sm:col-span-1 sm:row-span-1",
    sm: "sm:col-span-1 sm:row-span-1",
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:grid-rows-2">
      {FEATURES.map((f, i) => {
        const active = activeIndex === i;
        return (
          <button
            key={f.id}
            type="button"
            onMouseEnter={() => setActiveIndex(i)}
            onFocus={() => setActiveIndex(i)}
            aria-pressed={active}
            className={[
              "group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 text-left",
              "transition-[border-color,background-color,transform] duration-[180ms]",
              sizeClass[f.size],
              active
                ? "border-[var(--color-accent)] bg-[var(--color-panel-raised)]"
                : "border-[var(--color-hairline)] bg-[var(--color-panel)] hover:border-[var(--color-text-dim)]",
            ].join(" ")}
            style={{ transitionTimingFunction: "var(--ease-out-micro)" }}
          >
            <span
              aria-hidden="true"
              className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[var(--color-accent)]/10 opacity-0 transition-opacity duration-[180ms] group-hover:opacity-100"
              style={{ transitionTimingFunction: "var(--ease-out-micro)" }}
            />
            <div>
              <h3 className="font-display text-lg font-medium text-[var(--color-text)]">
                {f.title}
              </h3>
              <p className="mt-1.5 text-sm text-[var(--color-text-dim)]">
                {f.short}
              </p>
            </div>
            <p
              className={[
                "mt-4 text-sm text-[var(--color-text)] transition-[max-height,opacity] duration-[200ms] overflow-hidden",
                active ? "max-h-32 opacity-100" : "max-h-0 opacity-0",
              ].join(" ")}
              style={{ transitionTimingFunction: "var(--ease-out-micro)" }}
            >
              {f.long}
            </p>
          </button>
        );
      })}
    </div>
  );
}

function MobileAccordion({ activeIndex, setActiveIndex }) {
  return (
    <div className="flex flex-col divide-y divide-[var(--color-hairline)] rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-panel)]">
      {FEATURES.map((f, i) => {
        const open = activeIndex === i;
        return (
          <div key={f.id} className="px-5">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`panel-${f.id}`}
              onClick={() => setActiveIndex(open ? -1 : i)}
              className="flex w-full items-center justify-between gap-4 py-4 text-left"
            >
              <span className="font-display text-base font-medium text-[var(--color-text)]">
                {f.title}
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                aria-hidden="true"
                className="shrink-0 text-[var(--color-text-dim)] transition-transform duration-[200ms]"
                style={{
                  transitionTimingFunction: "var(--ease-out-micro)",
                  transform: open ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <path
                  d="M2.5 5L7 9.5L11.5 5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {/* grid-rows 0fr<->1fr trick: native CSS animation, no JS height measuring */}
            <div
              id={`panel-${f.id}`}
              className="grid transition-[grid-template-rows] duration-[360ms]"
              style={{
                gridTemplateRows: open ? "1fr" : "0fr",
                transitionTimingFunction: "var(--ease-inout-layout)",
              }}
            >
              <div className="overflow-hidden">
                <p className="pb-4 text-sm text-[var(--color-text-dim)]">
                  {f.long}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
