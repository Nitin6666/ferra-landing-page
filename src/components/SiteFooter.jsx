// src/components/SiteFooter.jsx
export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-hairline)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 font-mono text-xs text-[var(--color-text-dim)] sm:flex-row">
        <p>© {new Date().getFullYear()} Ferra Data, Inc.</p>
        <p>Built for the Phase 1 speed run.</p>
      </div>
    </footer>
  );
}
