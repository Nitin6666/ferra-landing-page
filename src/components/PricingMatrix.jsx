// src/components/PricingMatrix.jsx
import { useEffect, useRef } from "react";
import { TIERS, CURRENCIES, CURRENCY_META } from "../data/pricingMatrix";
import { computePrice, formatMoney } from "../data/pricingEngine";

/**
 * RE-RENDER GUARDRAIL:
 * currency + billing cycle are NOT React state. They live in plain refs.
 * Toggling either calls `applyPricing()`, which writes directly into the
 * DOM text nodes via refs (price.textContent = ...). No setState fires,
 * so this component and its parent never re-render on toggle — verified
 * by watching the React DevTools "Highlight updates" overlay, which stays
 * dark on every currency/cycle change.
 */
export default function PricingMatrix() {
  const currencyRef = useRef("USD");
  const cycleRef = useRef("monthly");

  const priceNodeRefs = useRef({});   // tierId -> <span> for the big number
  const periodNodeRefs = useRef({});  // tierId -> <span> for "/mo" suffix
  const totalNodeRefs = useRef({});   // tierId -> <span> for billed-annually note
  const symbolNodeRefs = useRef({});  // tierId -> <span> for currency symbol

  const currencyBtnRefs = useRef({});
  const cycleBtnRefs = useRef({});
  const badgeRef = useRef(null);

  function applyPricing() {
    const currency = currencyRef.current;
    const cycle = cycleRef.current;

    TIERS.forEach((tier) => {
      const { value, billedTotal, symbol } = computePrice(tier, currency, cycle);
      const priceEl = priceNodeRefs.current[tier.id];
      const symbolEl = symbolNodeRefs.current[tier.id];
      const periodEl = periodNodeRefs.current[tier.id];
      const totalEl = totalNodeRefs.current[tier.id];

      if (symbolEl) symbolEl.textContent = symbol;
      if (priceEl) priceEl.textContent = formatMoney(value, currency);
      if (periodEl) periodEl.textContent = "/mo";
      if (totalEl) {
        totalEl.textContent =
          cycle === "annual"
            ? `Billed ${formatMoney(billedTotal, currency)} annually`
            : `Billed monthly · switch to annual for 20% off`;
      }
    });

    // Update control affordances directly via classList, not via React state
    CURRENCIES.forEach((c) => {
      const btn = currencyBtnRefs.current[c];
      if (!btn) return;
      btn.classList.toggle("is-active", c === currency);
      btn.setAttribute("aria-pressed", String(c === currency));
    });
    ["monthly", "annual"].forEach((c) => {
      const btn = cycleBtnRefs.current[c];
      if (!btn) return;
      btn.classList.toggle("is-active", c === cycle);
      btn.setAttribute("aria-pressed", String(c === cycle));
    });
    if (badgeRef.current) {
      badgeRef.current.style.opacity = cycle === "annual" ? "1" : "0";
      badgeRef.current.style.transform =
        cycle === "annual" ? "scale(1)" : "scale(0.85)";
    }
  }

  useEffect(() => {
    applyPricing(); // initial paint only — not a toggle
  }, []);

  function selectCurrency(c) {
    if (currencyRef.current === c) return;
    currencyRef.current = c;
    applyPricing();
  }

  function selectCycle(c) {
    if (cycleRef.current === c) return;
    cycleRef.current = c;
    applyPricing();
  }

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative mx-auto max-w-6xl px-6 py-28"
    >
      <div className="mb-12 max-w-xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-signal)]">
          02 · Pricing matrix
        </p>
        <h2
          id="pricing-heading"
          className="mt-3 font-display text-3xl font-medium leading-tight text-[var(--color-text)] sm:text-4xl"
        >
          One ledger, three currencies, two cycles.
        </h2>
        <p className="mt-3 text-[var(--color-text-dim)]">
          Every figure below is computed live from a single rate matrix —
          base tier rate × regional tariff × billing multiplier. Switching
          currency or cycle updates only the price text, nothing else on
          the page moves.
        </p>
      </div>

      {/* Controls */}
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="group"
          aria-label="Select currency"
          className="inline-flex w-fit gap-1 rounded-full border border-[var(--color-hairline)] bg-[var(--color-panel)] p-1"
        >
          {CURRENCIES.map((c) => (
            <button
              key={c}
              ref={(el) => (currencyBtnRefs.current[c] = el)}
              type="button"
              aria-pressed={c === currencyRef.current}
              onClick={() => selectCurrency(c)}
              className="currency-btn rounded-full px-4 py-1.5 font-mono text-sm text-[var(--color-text-dim)] transition-colors duration-[180ms]"
              style={{ transitionTimingFunction: "var(--ease-out-micro)" }}
            >
              {c}
              <span className="ml-1 opacity-60">{CURRENCY_META[c].symbol}</span>
            </button>
          ))}
        </div>

        <div className="inline-flex items-center gap-3">
          <div
            role="group"
            aria-label="Select billing cycle"
            className="inline-flex w-fit gap-1 rounded-full border border-[var(--color-hairline)] bg-[var(--color-panel)] p-1"
          >
            {["monthly", "annual"].map((c) => (
              <button
                key={c}
                ref={(el) => (cycleBtnRefs.current[c] = el)}
                type="button"
                aria-pressed={c === cycleRef.current}
                onClick={() => selectCycle(c)}
                className="cycle-btn rounded-full px-4 py-1.5 text-sm capitalize text-[var(--color-text-dim)] transition-colors duration-[180ms]"
                style={{ transitionTimingFunction: "var(--ease-out-micro)" }}
              >
                {c}
              </button>
            ))}
          </div>
          <span
            ref={badgeRef}
            className="rounded-full bg-[var(--color-signal)]/15 px-3 py-1 font-mono text-xs text-[var(--color-signal)] transition-all duration-[180ms]"
          >
            −20%
          </span>
        </div>
      </div>

      {/* Tier cards */}
      <div className="grid gap-6 sm:grid-cols-3">
        {TIERS.map((tier) => (
          <article
            key={tier.id}
            aria-labelledby={`tier-${tier.id}-name`}
            className={[
              "flex flex-col rounded-2xl border p-6",
              tier.featured
                ? "border-[var(--color-accent)] bg-[var(--color-panel-raised)] shadow-[0_0_0_1px_rgba(124,156,255,0.25)]"
                : "border-[var(--color-hairline)] bg-[var(--color-panel)]",
            ].join(" ")}
          >
            {tier.featured && (
              <span className="mb-3 inline-flex w-fit items-center rounded-full bg-[var(--color-accent)]/15 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wide text-[var(--color-accent)]">
                Most deployed
              </span>
            )}
            <h3
              id={`tier-${tier.id}-name`}
              className="font-display text-xl font-medium text-[var(--color-text)]"
            >
              {tier.name}
            </h3>
            <p className="mt-1 text-sm text-[var(--color-text-dim)]">
              {tier.tagline}
            </p>

            <div className="mt-6 flex items-baseline gap-1 font-mono">
              <span
                ref={(el) => (symbolNodeRefs.current[tier.id] = el)}
                className="text-2xl text-[var(--color-text-dim)]"
              />
              <span
                ref={(el) => (priceNodeRefs.current[tier.id] = el)}
                className="text-4xl font-medium text-[var(--color-text)] tabular-nums"
              />
              <span
                ref={(el) => (periodNodeRefs.current[tier.id] = el)}
                className="text-sm text-[var(--color-text-dim)]"
              />
            </div>
            <p
              ref={(el) => (totalNodeRefs.current[tier.id] = el)}
              className="mt-1 font-mono text-xs text-[var(--color-text-dim)]"
            />

            <ul className="mt-6 flex-1 space-y-2.5 text-sm text-[var(--color-text)]">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-[var(--color-signal)]"
                  >
                    <path
                      d="M2 7.5L5.2 10.7L12 3.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className={[
                "mt-6 w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-[180ms]",
                tier.featured
                  ? "bg-[var(--color-accent)] text-[var(--color-ink)] hover:bg-[var(--color-accent)]/90"
                  : "border border-[var(--color-hairline)] text-[var(--color-text)] hover:border-[var(--color-accent)]",
              ].join(" ")}
              style={{ transitionTimingFunction: "var(--ease-out-micro)" }}
            >
              Start with {tier.name}
            </button>
          </article>
        ))}
      </div>

      <style>{`
        .currency-btn.is-active, .cycle-btn.is-active {
          background: var(--color-hairline);
          color: var(--color-text);
        }
      `}</style>
    </section>
  );
}
