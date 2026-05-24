"use client";

import { useCurrency } from "@/lib/currencyContext";

export default function FormattedPrice({ amount }: { amount: number }) {
  const { formatPrice } = useCurrency();
  return <>{formatPrice(amount)}</>;
}
