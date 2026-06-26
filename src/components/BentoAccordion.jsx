// src/components/BentoAccordion.jsx
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

const FEATURES = [
  {
    id: "ingest",
    icon: "arrow-path",
    title: "Ingest anything",
    short: "200+ connectors, schema drift handled automatically.",
    long:
      "Pull from databases, SaaS tools, event streams, and flat files through one connector layer. The platform watches upstream schemas and reshapes pipelines in place when a source changes, instead of breaking the run.",
    size: "lg",
  },
  {
    id: "transform",
    icon: "cube",
    title: "AI-assisted transforms",
    short: "Describe the shape you want, get production SQL/Python.",
    long:
      "Describe the output you need in plain language and the model proposes a transform step — SQL, Python, or a visual mapping — that you can edit, pin, and version like any other part of the pipeline.",
    size: "md",
  },
  {
    id: "orchestrate",
    icon: "cog",
    title: "Orchestration that self-heals",
    short: "Retries, backfills, and alerting without extra config.",
    long:
      "Every pipeline run carries its own retry policy and backfill plan. When a step fails, the platform isolates the failure, retries with backoff, and only pages a human when its own recovery attempts are exhausted.",
    size: "md",
  },
  {
    id: "observe",
    icon: "chart-pie",
    title: "Live lineage graph",
    short: "Trace any field back to its source in two clicks.",
    long:
      "Every column in every output table carries a lineage trail back to its origin field, transform-by-transform. Useful for audits, and for the moment someone asks 'where did this number come from?'",
    size: "sm",
  },
  {
    id: "govern",
    icon: "link-solid",
    title: "Governance built in",
    short: "Row-level access, audit trails, residency controls.",
    long:
      "Access policies travel with the data, not just the dashboard in front of it. Set residency and row-level rules once, and they're enforced consistently across every pipeline and every downstream consumer.",
    size: "sm",
  },
];

const MOBILE_QUERY = "(max-width: 767px)";

export default function BentoAccordion() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-dim)]">
        Platform capabilities
      </p>
      <h2 className="mt-4 font-display text-3xl font-medium text-[var(--color-text)] sm:text-4xl">
        Everything your data stack needs.
      </h2>

      {isMobile ? (
        <MobileAccordion features={FEATURES} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      ) : (
        <DesktopBento features={FEATURES} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      )}
    </section>
  );
}

function DesktopBento({ features, activeIndex, setActiveIndex }) {
  return (
    <div className="mt-10 grid grid-cols-3 grid-rows-2 gap-4" style={{ minHeight: 420 }}>
      {features.map((f, i) => {
        const isActive = activeIndex === i;
        const colSpan = f.size === "lg" ? "col-span-2" : "col-span-1";
        return (
          <button
            key={f.id}
            onMouseEnter={() => setActiveIndex(i)}
            onFocus={() => setActiveIndex(i)}
            onClick={() => setActiveIndex(i)}
            className={[
              "group relative flex flex-col justify-between rounded-2xl border p-6 text-left transition-all",
              colSpan,
              isActive
                ? "border-[var(--color-accent)] bg-[var(--color-panel-raised)]"
                : "border-[var(--color-hairline)] bg-[var(--color-panel)] hover:border-[var(--color-accent)]/50",
            ].join(" ")}
            style={{ transitionDuration: "var(--dur-micro)", transitionTimingFunction: "var(--ease-out-micro)" }}
          >
            <div>
              <Icon
                name={f.icon}
                size={22}
                className={isActive ? "text-[var(--color-accent)]" : "text-[var(--color-text-dim)]"}
                style={{ transition: "color var(--dur-micro)" }}
              />
              <p className="mt-4 font-display text-lg font-medium text-[var(--color-text)]">{f.title}</p>
              <p className="mt-2 text-sm text-[var(--color-text-dim)]">
                {isActive ? f.long : f.short}
              </p>
            </div>
            {isActive && (
              <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-[var(--color-accent)]">
                Active
                <Icon name="arrow-trending-up" size={14} className="text-[var(--color-accent)]" />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function MobileAccordion({ features, activeIndex, setActiveIndex }) {
  return (
    <div className="mt-8 flex flex-col gap-3">
      {features.map((f, i) => {
        const isOpen = activeIndex === i;
        return (
          <div
            key={f.id}
            className={[
              "rounded-2xl border transition-colors",
              isOpen
                ? "border-[var(--color-accent)] bg-[var(--color-panel-raised)]"
                : "border-[var(--color-hairline)] bg-[var(--color-panel)]",
            ].join(" ")}
          >
            <button
              className="flex w-full items-center justify-between px-5 py-4 text-left"
              onClick={() => setActiveIndex(isOpen ? -1 : i)}
            >
              <div className="flex items-center gap-3">
                <Icon
                  name={f.icon}
                  size={18}
                  className={isOpen ? "text-[var(--color-accent)]" : "text-[var(--color-text-dim)]"}
                />
                <span className="font-display text-sm font-medium text-[var(--color-text)]">{f.title}</span>
              </div>
              <Icon
                name={isOpen ? "chevron-up" : "chevron-down"}
                size={16}
                className="text-[var(--color-text-dim)]"
              />
            </button>
            {isOpen && (
              <p className="px-5 pb-5 text-sm text-[var(--color-text-dim)]">{f.long}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
