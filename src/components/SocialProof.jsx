// src/components/SocialProof.jsx
const LOGOS = ["Northwind", "Calyx Labs", "Pier Twelve", "Oslo Freight", "Manta Health", "Quill & Co"];

const QUOTES = [
  {
    quote:
      "We cut our schema-drift incidents from weekly to effectively zero in the first month.",
    name: "Asha Verma",
    role: "Head of Data, Calyx Labs",
  },
  {
    quote:
      "The lineage graph alone replaced three internal tools we'd built ourselves.",
    name: "Dee Okafor",
    role: "Platform Lead, Pier Twelve",
  },
  {
    quote:
      "Pricing in our own currency without a sales call was the moment we trusted this team.",
    name: "Lars Bjornson",
    role: "CTO, Oslo Freight",
  },
];

export default function SocialProof() {
  return (
    <section aria-labelledby="proof-heading" className="mx-auto max-w-6xl px-6 py-20">
      <h2 id="proof-heading" className="sr-only">
        Trusted by data teams
      </h2>
      <ul className="flex flex-wrap items-center justify-between gap-6 border-y border-[var(--color-hairline)] py-8 font-mono text-sm text-[var(--color-text-dim)]">
        {LOGOS.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {QUOTES.map((q) => (
          <figure
            key={q.name}
            className="rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-panel)] p-6"
          >
            <blockquote className="text-sm text-[var(--color-text)]">
              "{q.quote}"
            </blockquote>
            <figcaption className="mt-4 font-mono text-xs text-[var(--color-text-dim)]">
              {q.name} · {q.role}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
