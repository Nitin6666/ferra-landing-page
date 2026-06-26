// src/components/SiteHeader.jsx
import Icon from "./Icon";

export default function SiteHeader() {
  return (
    <nav
      aria-label="Primary"
      className="sticky top-0 z-50 border-b border-[var(--color-hairline)] bg-[var(--color-ink)]/85 backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2.5 font-display text-lg font-medium text-[var(--color-text)]">
          <Icon name="cube" size={20} className="text-[var(--color-accent)]" />
          Ferra
        </a>
        <div className="hidden items-center gap-8 font-mono text-sm text-[var(--color-text-dim)] sm:flex">
          <a href="#features" className="flex items-center gap-1.5 hover:text-[var(--color-text)] transition-colors">
            <Icon name="cog" size={14} />
            Platform
          </a>
          <a href="#pricing" className="flex items-center gap-1.5 hover:text-[var(--color-text)] transition-colors">
            <Icon name="chart-pie" size={14} />
            Pricing
          </a>
          <a href="#proof" className="flex items-center gap-1.5 hover:text-[var(--color-text)] transition-colors">
            <Icon name="link" size={14} />
            Customers
          </a>
        </div>
        <a
          href="#pricing"
          className="flex items-center gap-2 rounded-lg border border-[var(--color-hairline)] px-4 py-2 text-sm text-[var(--color-text)] transition-colors duration-[180ms] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          style={{ transitionTimingFunction: "var(--ease-out-micro)" }}
        >
          Get started
          <Icon name="chevron-right" size={14} />
        </a>
      </div>
    </nav>
  );
}
