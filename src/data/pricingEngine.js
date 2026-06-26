// src/data/pricingEngine.js
import {
  ANNUAL_DISCOUNT_MULTIPLIER,
  REGIONAL_TARIFF,
  CURRENCY_META,
} from "./pricingMatrix";

/**
 * Computes the final price for a tier given currency + billing cycle.
 * Every factor (base rate, annual multiplier, regional tariff) is read
 * from the matrix at call time — nothing is hardcoded per combination.
 */
export function computePrice(tier, currency, cycle) {
  const base = tier.base[currency];
  const tariff = REGIONAL_TARIFF[currency] ?? 0;
  const withTariff = base * (1 + tariff);
  const monthly = withTariff;
  const annualMonthlyEquivalent = withTariff * ANNUAL_DISCOUNT_MULTIPLIER;

  const value = cycle === "annual" ? annualMonthlyEquivalent : monthly;
  const billedTotal = cycle === "annual" ? annualMonthlyEquivalent * 12 : monthly;

  return {
    value,
    billedTotal,
    symbol: CURRENCY_META[currency].symbol,
  };
}

export function formatMoney(amount, currency) {
  const { locale } = CURRENCY_META[currency];
  // No decimals for INR (convention), 2 decimals elsewhere — still derived,
  // not a hardcoded string per tier.
  const maximumFractionDigits = currency === "INR" ? 0 : 2;
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits,
    minimumFractionDigits: 0,
  }).format(amount);
}
