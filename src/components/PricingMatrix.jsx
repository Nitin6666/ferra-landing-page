// src/components/PricingMatrix.jsx
import { useState } from "react";
import Icon from "./Icon";
import { TIERS, CURRENCIES, CURRENCY_META } from "../data/pricingMatrix";
import { computePrice, formatMoney } from "../data/pricingEngine";

const TIER_ICONS = { starter: "link", growth: "cube", scale: "arrow-trending-up" };

export default function PricingMatrix() {
  const [currency, setCurrency] = useState("USD");
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-dim)]">
        Pricing matrix
      </p>
      <h2 className="mt-4 font-display text-3xl font-medium text-[var(--color-text)] sm:text-4xl">
        Pay for what you move.
      </h2>

      {/* Controls */}
      <div className="mt-10 flex flex-wrap items-center gap-4">
        <div className="flex rounded-lg border border-[var(--color-hairline)] p-1">
          {CURRENCIES.map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={[
                "rounded-md px-3 py-1.5 font-mono text-xs transition-colors",
                currency === c
                  ? "bg-[var(--color-accent)] text-[var(--color-ink)]"
                  : "text-[var(--color-text-dim)] hover:text-[var(--color-text)]",
              ].join(" ")}
            >
              {CURRENCY_META[c].symbol} {c}
            </button>
          ))}
        </div>
        <button
          onClick={() => setAnnual((a) => !a)}
          className={[
            "flex items-center gap-2 rounded-lg border px-4 py-2 font-mono text-xs transition-colors",
            annual
              ? "border-[var(--color-accent)] text-[var(--color-accent)]"
              : "border-[var(--color-hairline)] text-[var(--color-text-dim)] hover:border-[var(--color-accent)]/50",
          ].join(" ")}
        >
          <Icon name={annual ? "chevron-up-solid" : "arrow-path"} size={14} />
          {annual ? "Annual (20% off)" : "Switch to annual"}
        </button>
      </div>

      {/* Plan cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {TIERS.map((tier) => {
          const { value, billedTotal, symbol } = computePrice(tier, currency, annual ? "annual" : "monthly");
          const isHighlighted = tier.featured;
          const icon = TIER_ICONS[tier.id] ?? "cube";
          return (
            <div
              key={tier.id}
              className={[
                "relative flex flex-col rounded-2xl border p-6",
                isHighlighted
                  ? "border-[var(--color-accent)] bg-[var(--color-panel-raised)]"
                  : "border-[var(--color-hairline)] bg-[var(--color-panel)]",
              ].join(" ")}
            >
              {isHighlighted && (
                <span className="absolute -top-3 left-6 rounded-full bg-[var(--color-accent)] px-3 py-0.5 font-mono text-xs font-medium text-[var(--color-ink)]">
                  Most popular
                </span>
              )}
              <div className="flex items-center gap-2">
                <Icon
                  name={icon}
                  size={18}
                  className={isHighlighted ? "text-[var(--color-accent)]" : "text-[var(--color-text-dim)]"}
                />
                <p className="font-display text-sm font-medium text-[var(--color-text)]">{tier.name}</p>
              </div>
              <p className="mt-4 font-display text-3xl font-medium text-[var(--color-text)]">
                {symbol}{formatMoney(value, currency)}
                <span className="ml-1 font-mono text-sm text-[var(--color-text-dim)]">/mo</span>
              </p>
              {annual && (
                <p className="mt-1 font-mono text-xs text-[var(--color-signal)]">
                  {symbol}{formatMoney(billedTotal, currency)} billed annually
                </p>
              )}
              <p className="mt-3 text-sm text-[var(--color-text-dim)]">{tier.tagline}</p>
              <ul className="mt-6 flex flex-col gap-2.5">
                {tier.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm text-[var(--color-text-dim)]">
                    <Icon name="chevron-right" size={14} className="mt-0.5 shrink-0 text-[var(--color-accent)]" />
                    {feat}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={[
                  "mt-8 flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                  isHighlighted
                    ? "bg-[var(--color-accent)] text-[var(--color-ink)] hover:bg-[var(--color-accent)]/90"
                    : "border border-[var(--color-hairline)] text-[var(--color-text)] hover:border-[var(--color-accent)]",
                ].join(" ")}
              >
                Get started
                <Icon name="chevron-right" size={14} />
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
