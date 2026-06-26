// src/components/SiteFooter.jsx
import Icon from "./Icon";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-hairline)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <div className="flex items-center gap-2 font-display text-sm text-[var(--color-text)]">
          <Icon name="cube" size={16} className="text-[var(--color-accent)]" />
          Ferra
        </div>
        <p className="font-mono text-xs text-[var(--color-text-dim)]">© {new Date().getFullYear()} Ferra Data, Inc.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="text-[var(--color-text-dim)] hover:text-[var(--color-accent)] transition-colors">
            <Icon name="link" size={16} />
          </a>
          <a href="#" className="text-[var(--color-text-dim)] hover:text-[var(--color-accent)] transition-colors">
            <Icon name="cog" size={16} />
          </a>
          <a href="#" className="text-[var(--color-text-dim)] hover:text-[var(--color-accent)] transition-colors">
            <Icon name="search" size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
