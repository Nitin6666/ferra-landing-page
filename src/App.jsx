import SiteHeader from "./components/SiteHeader";
import Hero from "./components/Hero";
import BentoAccordion from "./components/BentoAccordion";
import PricingMatrix from "./components/PricingMatrix";
import SocialProof from "./components/SocialProof";
import SiteFooter from "./components/SiteFooter";

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-[var(--color-ink)] text-[var(--color-text)]">
      <SiteHeader />
      <main>
        <Hero />
        <BentoAccordion />
        <PricingMatrix />
        <section id="proof">
          <SocialProof />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
