// src/components/SiteHeader.jsx
export default function SiteHeader() {
  return (
    <nav
      aria-label="Primary"
      className="sticky top-0 z-50 border-b border-[var(--color-hairline)] bg-[var(--color-ink)]/85 backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-lg font-medium text-[var(--color-text)]">
          Ferra
        </a>
        <div className="hidden items-center gap-8 font-mono text-sm text-[var(--color-text-dim)] sm:flex">
          <a href="#features" className="hover:text-[var(--color-text)]">Platform</a>
          <a href="#pricing" className="hover:text-[var(--color-text)]">Pricing</a>
          <a href="#proof" className="hover:text-[var(--color-text)]">Customers</a>
        </div>
        <a
          href="#pricing"
          className="rounded-lg border border-[var(--color-hairline)] px-4 py-2 text-sm text-[var(--color-text)] transition-colors duration-[180ms] hover:border-[var(--color-accent)]"
          style={{ transitionTimingFunction: "var(--ease-out-micro)" }}
        >
          Get started
        </a>
      </div>
    </nav>
  );
}
