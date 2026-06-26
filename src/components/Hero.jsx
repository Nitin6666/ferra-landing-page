// src/components/Hero.jsx
import { useEffect, useRef } from "react";

/**
 * LOADING SEQUENCE PERFORMANCE:
 * The entry orchestration is four staggered CSS transitions on opacity/
 * transform only (GPU-cheap), driven by adding a single `.is-in` class
 * after mount. Stagger steps are 0 / 90 / 160 / 230ms with a 200ms
 * transition each, so the whole sequence resolves at ~430ms — inside the
 * 500ms cap — and nothing here delays hydration or blocks interaction;
 * the class flip happens post-paint via requestAnimationFrame.
 */
export default function Hero() {
  const rootRef = useRef(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      rootRef.current?.classList.add("is-in");
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <header
      ref={rootRef}
      className="relative mx-auto max-w-6xl px-6 pt-28 pb-20 entry-root"
    >
      <div className="bg-grain pointer-events-none absolute inset-0 -z-10 opacity-40" />

      <p className="entry-item font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-dim)] delay-0">
        Data automation, run by a model that reads your schema
      </p>

      <h1 className="entry-item delay-1 mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] text-[var(--color-text)] sm:text-6xl">
        Pipelines that rewrite themselves when your data does.
      </h1>

      <p className="entry-item delay-2 mt-6 max-w-xl text-lg text-[var(--color-text-dim)]">
        Ferra ingests, transforms, and ships your data across every system
        you run — and adapts the pipeline the moment a source schema
        shifts, instead of paging someone at 2am.
      </p>

      <div className="entry-item delay-3 mt-9 flex flex-wrap items-center gap-4">
        <a
          href="#pricing"
          className="rounded-lg bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-[var(--color-ink)] transition-colors duration-[180ms] hover:bg-[var(--color-accent)]/90"
          style={{ transitionTimingFunction: "var(--ease-out-micro)" }}
        >
          See pricing matrix
        </a>
        <a
          href="#features"
          className="rounded-lg border border-[var(--color-hairline)] px-5 py-3 text-sm font-medium text-[var(--color-text)] transition-colors duration-[180ms] hover:border-[var(--color-accent)]"
          style={{ transitionTimingFunction: "var(--ease-out-micro)" }}
        >
          Explore the platform
        </a>
      </div>

      <dl className="entry-item delay-3 mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-[var(--color-hairline)] pt-8 font-mono">
        <div>
          <dd className="text-2xl text-[var(--color-text)]">4.2B</dd>
          <dt className="mt-1 text-xs text-[var(--color-text-dim)]">rows processed / day</dt>
        </div>
        <div>
          <dd className="text-2xl text-[var(--color-text)]">99.97%</dd>
          <dt className="mt-1 text-xs text-[var(--color-text-dim)]">pipeline uptime</dt>
        </div>
        <div>
          <dd className="text-2xl text-[var(--color-text)]">11min</dd>
          <dt className="mt-1 text-xs text-[var(--color-text-dim)]">avg. schema-drift recovery</dt>
        </div>
      </dl>

      <style>{`
        .entry-item {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 200ms var(--ease-out-micro), transform 200ms var(--ease-out-micro);
        }
        .entry-root.is-in .entry-item.delay-0 { transition-delay: 0ms; }
        .entry-root.is-in .entry-item.delay-1 { transition-delay: 90ms; }
        .entry-root.is-in .entry-item.delay-2 { transition-delay: 160ms; }
        .entry-root.is-in .entry-item.delay-3 { transition-delay: 230ms; }
        .entry-root.is-in .entry-item {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .entry-item { opacity: 1; transform: none; transition: none; }
        }
      `}</style>
    </header>
  );
}
