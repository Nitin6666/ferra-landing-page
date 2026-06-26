// src/data/pricingMatrix.js
//
// Multi-dimensional pricing matrix required by Feature 1.
// Dimensions: tier -> currency -> { symbol, baseMonthly, tariff }
// Derived values (annual discount, final totals) are computed at runtime
// in pricingEngine.js — nothing here is a pre-baked display string.

export const ANNUAL_DISCOUNT_MULTIPLIER = 0.8; // flat 20% off when billed annually

export const CURRENCIES = ["INR", "USD", "EUR"];

export const CURRENCY_META = {
  INR: { symbol: "₹", locale: "en-IN" },
  USD: { symbol: "$", locale: "en-US" },
  EUR: { symbol: "€", locale: "de-DE" },
};

// Regional tariff variables: a small runtime adjustment layered on top of
// the base rate per currency, distinct from a straight FX conversion —
// this is what makes the matrix "multi-dimensional" rather than a single
// converted number.
export const REGIONAL_TARIFF = {
  INR: 0.0,     // no added tariff in home market
  USD: 0.04,    // +4% cross-border processing variable
  EUR: 0.06,    // +6% cross-border processing variable
};

export const TIERS = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For solo builders automating their first pipeline.",
    featured: false,
    base: {
      INR: 1499,
      USD: 19,
      EUR: 18,
    },
    features: [
      "3 active pipelines",
      "10k rows / month processed",
      "Community support",
      "Core connector pack",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "For teams scaling automation across functions.",
    featured: true,
    base: {
      INR: 4999,
      USD: 59,
      EUR: 55,
    },
    features: [
      "Unlimited pipelines",
      "1M rows / month processed",
      "Priority support, 4h SLA",
      "Full connector + webhook pack",
      "Role-based access control",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "For orgs running AI automation at production scale.",
    featured: false,
    base: {
      INR: 14999,
      USD: 179,
      EUR: 165,
    },
    features: [
      "Unlimited pipelines + sandboxes",
      "Unlimited rows processed",
      "Dedicated solutions engineer",
      "Custom SLAs & audit logs",
      "SSO / SAML + on-prem option",
    ],
  },
];
