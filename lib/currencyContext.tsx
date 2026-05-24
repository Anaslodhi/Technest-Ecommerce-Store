"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Currency = "USD" | "PKR";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (priceInUSD: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD");

  useEffect(() => {
    // Load currency preference from localStorage if available
    const savedCurrency = localStorage.getItem("preferred_currency") as Currency;
    if (savedCurrency === "USD" || savedCurrency === "PKR") {
      setCurrency(savedCurrency);
    }
  }, []);

  const handleSetCurrency = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    localStorage.setItem("preferred_currency", newCurrency);
  };

  const formatPrice = (priceInUSD: number) => {
    if (currency === "PKR") {
      const priceInPKR = priceInUSD * 280;
      return `Rs. ${priceInPKR.toLocaleString("en-PK", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    } else {
      return `$${priceInUSD.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: handleSetCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
