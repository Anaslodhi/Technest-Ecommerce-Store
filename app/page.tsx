import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Truck,
  Shield,
  Headphones,
  RotateCcw,
  ChevronRight,
  Sparkles,
  Star,
  Send,
  Clock,
} from "lucide-react";
import { getFeaturedProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import NewsletterForm from "@/components/NewsletterForm";
import FormattedPrice from "@/components/FormattedPrice";

const valueProps = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: (
      <>
        Free delivery on all orders over <FormattedPrice amount={50} />. Fast, reliable shipping worldwide.
      </>
    ),
    gradient: "from-blue-500 to-cyan-500",
    shadow: "shadow-blue-500/25",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "256-bit SSL encryption. Your payment information is always protected.",
    gradient: "from-emerald-500 to-teal-500",
    shadow: "shadow-emerald-500/25",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "AI-powered chatbot and human support team, available around the clock.",
    gradient: "from-violet-500 to-purple-500",
    shadow: "shadow-violet-500/25",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day hassle-free returns. Not satisfied? Get a full refund, no questions asked.",
    gradient: "from-amber-500 to-orange-500",
    shadow: "shadow-amber-500/25",
  },
];

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "500+", label: "Products" },
  { value: "99.9%", label: "Uptime" },
  { value: "4.8★", label: "Average Rating" },
];

export default function Home() {
  const featuredProducts = getFeaturedProducts().slice(0, 6);

  return (
    <>
      {/* ═══════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="pointer-events-none absolute inset-0">
          {/* Primary glow */}
          <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-violet-600/15 blur-3xl" />
          {/* Secondary glow */}
          <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-indigo-600/10 blur-3xl" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            {/* Pill Badge */}
            <div className="mb-8 inline-flex animate-pulse items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2 text-sm font-medium text-violet-300">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Shopping Experience</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Discover the{" "}
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Future
              </span>
              <br />
              of Technology
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg md:text-xl">
              Your premium destination for cutting-edge electronics and gadgets.
              Laptops, smartphones, headphones, and more — all at unbeatable prices.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/products"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-violet-500/25 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/40 sm:text-base"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Shop Now
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-color)] bg-white/5 px-8 py-4 text-sm font-bold text-[var(--text-secondary)] backdrop-blur-sm transition-all duration-300 hover:border-violet-500/30 hover:bg-white/10 hover:text-violet-300 sm:text-base"
              >
                Learn More
              </Link>
            </div>

            {/* Stats Row */}
            <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-extrabold text-[var(--text-primary)] sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-medium text-[var(--text-muted)] sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--background)] to-transparent" />
      </section>

      {/* ═══════════════════════════════════════════════
          FEATURED PRODUCTS
          ═══════════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-12 flex flex-col items-center text-center sm:mb-16">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-violet-400">
              <Zap className="h-3.5 w-3.5" />
              Curated Selection
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Featured{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Products
              </span>
            </h2>
            <p className="mt-4 max-w-2xl text-base text-[var(--text-secondary)] sm:text-lg">
              Hand-picked by our team. These are the top-rated electronics and
              gadgets our customers can&apos;t stop raving about.
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* View All CTA */}
          <div className="mt-12 text-center sm:mt-16">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] px-8 py-3.5 text-sm font-semibold text-[var(--text-secondary)] transition-all duration-300 hover:border-violet-500/30 hover:bg-[var(--card-bg-hover)] hover:text-violet-300"
            >
              View All Products
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          VALUE PROPOSITIONS
          ═══════════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28">
        {/* Background accent */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 -translate-x-1/2 rounded-full bg-violet-600/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-12 flex flex-col items-center text-center sm:mb-16">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-violet-400">
              <Star className="h-3.5 w-3.5" />
              Why TechNest
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Why Shop{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                With Us
              </span>
            </h2>
            <p className="mt-4 max-w-2xl text-base text-[var(--text-secondary)] sm:text-lg">
              We don&apos;t just sell electronics — we deliver an experience. Here&apos;s what
              sets TechNest apart from the rest.
            </p>
          </div>

          {/* Value Cards Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {valueProps.map((prop) => (
              <div
                key={prop.title}
                className="group relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 transition-all duration-300 hover:border-violet-500/20 hover:shadow-xl hover:shadow-violet-500/5 sm:p-8"
              >
                {/* Icon */}
                <div
                  className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${prop.gradient} shadow-lg ${prop.shadow} transition-transform duration-300 group-hover:scale-110`}
                >
                  <prop.icon className="h-7 w-7 text-white" />
                </div>

                {/* Title */}
                <h3 className="mb-2 text-lg font-bold text-[var(--text-primary)]">
                  {prop.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  {prop.description}
                </p>

                {/* Hover glow */}
                <div className="pointer-events-none absolute -bottom-1/2 -right-1/2 h-full w-full rounded-full bg-violet-500/5 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA / NEWSLETTER SECTION
          ═══════════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-950/80 via-indigo-950/80 to-purple-950/80 p-8 sm:p-12 lg:p-16">
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-violet-500/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-indigo-500/10 blur-3xl" />
              {/* Grid dots */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
            </div>

            <div className="relative z-10 mx-auto max-w-2xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-violet-300">
                <Send className="h-3.5 w-3.5" />
                Stay Connected
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Get{" "}
                <span className="bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
                  Exclusive Deals
                </span>
              </h2>

              <p className="mt-4 text-base leading-relaxed text-violet-200/70 sm:text-lg">
                Subscribe to our newsletter for early access to new products,
                exclusive discounts, and tech insights delivered straight to your
                inbox.
              </p>

              {/* Email Input */}
              <NewsletterForm />

              <p className="mt-4 text-xs text-violet-300/40">
                No spam, ever. Unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
