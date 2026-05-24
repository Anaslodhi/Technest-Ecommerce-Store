"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, ArrowRight, Trash2, ArrowLeft, X, CreditCard, Lock } from "lucide-react";
import { useCart } from "@/lib/cartContext";
import { useCurrency } from "@/lib/currencyContext";
import CartItemRow from "@/components/CartItem";

const SHIPPING_THRESHOLD = 50;
const TAX_RATE = 0.08;

export default function CartPage() {
  const { items, clearCart, getSubtotal, getItemCount } = useCart();
  const { formatPrice } = useCurrency();

  const subtotal = getSubtotal();
  const itemCount = getItemCount();
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : 9.99;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;
  const router = useRouter();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check mock authentication state
    const authState = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(authState === "true");
  }, []);

  const handleProceedToCheckout = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setShowCheckoutModal(true);
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowCheckoutModal(false);
      alert("Order placed successfully. Confirmation email sent!");
      clearCart();
      router.push("/");
    }, 1500);
  };
  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)]">
          <ShoppingCart className="h-12 w-12 text-[var(--text-muted)]" />
        </div>
        <h1 className="mb-3 text-2xl font-extrabold sm:text-3xl">
          Your Cart is Empty
        </h1>
        <p className="mb-8 max-w-md text-base text-[var(--text-secondary)]">
          Looks like you haven&apos;t added anything to your cart yet. Explore
          our collection and find something you love!
        </p>
        <Link
          href="/products"
          className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/40"
        >
          Continue Shopping
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="border-b border-[var(--border-color)] bg-[var(--background-secondary)]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Shopping{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Cart
            </span>
          </h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>
      </section>

      {/* Cart Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-violet-400"
              >
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-red-400/80 transition-colors hover:bg-red-500/10 hover:text-red-400"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear Cart
              </button>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <CartItemRow key={item.product.id} item={item} />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6">
              <h2 className="mb-6 text-lg font-bold text-[var(--text-primary)]">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">
                    Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
                  </span>
                  <span className="font-semibold text-[var(--text-primary)]">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Shipping</span>
                  <span className="font-semibold text-[var(--text-primary)]">
                    {shipping === 0 ? (
                      <span className="text-emerald-400">FREE</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>

                {shipping === 0 && (
                  <p className="text-xs text-emerald-400/70">
                    ✓ You qualify for free shipping!
                  </p>
                )}

                {shipping > 0 && (
                  <p className="text-xs text-[var(--text-muted)]">
                    Add {formatPrice(SHIPPING_THRESHOLD - subtotal)} more for
                    free shipping
                  </p>
                )}

                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">
                    Estimated Tax
                  </span>
                  <span className="font-semibold text-[var(--text-primary)]">
                    {formatPrice(tax)}
                  </span>
                </div>

                <hr className="border-[var(--border-color)]" />

                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-[var(--text-primary)]">
                    Total
                  </span>
                  <span className="text-xl font-extrabold text-[var(--text-primary)]">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                className="group relative mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-4 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/40"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </button>

              {/* Security note */}
              <p className="mt-4 text-center text-[10px] text-[var(--text-muted)]">
                🔒 Secure checkout with 256-bit SSL encryption
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] px-6 py-4">
              <h2 className="text-lg font-bold text-[var(--text-primary)]">
                Payment Details
              </h2>
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="rounded-lg p-1 text-[var(--text-muted)] hover:bg-[var(--background-secondary)] hover:text-[var(--text-primary)]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handlePaymentSubmit} className="p-6">
              <div className="mb-4">
                <label htmlFor="cardName" className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
                  Name on Card
                </label>
                <input
                  id="cardName"
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--background-secondary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="cardNumber" className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
                  Card Number
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    id="cardNumber"
                    type="text"
                    required
                    placeholder="0000 0000 0000 0000"
                    pattern="\d{4}\s?\d{4}\s?\d{4}\s?\d{4}"
                    className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--background-secondary)] py-3 pl-10 pr-4 text-sm text-[var(--text-primary)] outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
                  />
                </div>
              </div>
              
              <div className="mb-6 flex gap-4">
                <div className="flex-1">
                  <label htmlFor="expiryDate" className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
                    Expiry Date
                  </label>
                  <input
                    id="expiryDate"
                    type="text"
                    required
                    placeholder="MM/YY"
                    pattern="\d{2}/\d{2}"
                    className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--background-secondary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="cvc" className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
                    CVC
                  </label>
                  <input
                    id="cvc"
                    type="text"
                    required
                    placeholder="123"
                    pattern="\d{3,4}"
                    className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--background-secondary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="shippingAddress" className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
                  Shipping Address
                </label>
                <textarea
                  id="shippingAddress"
                  required
                  rows={2}
                  placeholder="123 Tech Street, Silicon Valley, CA"
                  className="w-full resize-none rounded-xl border border-[var(--border-color)] bg-[var(--background-secondary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3.5 text-sm font-bold text-white transition-colors hover:bg-violet-700 disabled:bg-violet-600/70"
              >
                {isProcessing ? (
                  "Processing..."
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    Pay {formatPrice(total)}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
