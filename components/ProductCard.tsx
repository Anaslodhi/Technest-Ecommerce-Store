import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import { cn } from "@/lib/utils";
import FormattedPrice from "@/components/FormattedPrice";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] transition-all duration-300 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/5 hover:-translate-y-1",
        className
      )}
    >
      {/* Badge */}
      {product.badge && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-violet-500/25">
          {product.badge}
        </span>
      )}

      {/* Discount Badge */}
      {discount > 0 && (
        <span className="absolute right-3 top-3 z-10 rounded-full bg-emerald-500/90 px-2.5 py-1 text-xs font-bold text-white">
          -{discount}%
        </span>
      )}

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[var(--background-secondary)] to-[var(--card-bg)]">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-800/50 to-slate-900/50">
              <div className="text-center">
                <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10">
                  <ShoppingCart className="h-8 w-8 text-violet-400/60" />
                </div>
                <span className="text-xs text-[var(--text-muted)]">{product.category}</span>
              </div>
            </div>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Quick View Button */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 transition-all duration-300 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
          <span className="rounded-full bg-white/95 px-5 py-2 text-sm font-semibold text-gray-900 shadow-lg backdrop-blur-sm">
            View Details
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Category */}
        <span className="mb-1.5 text-xs font-medium uppercase tracking-wider text-violet-400">
          {product.category}
        </span>

        {/* Name */}
        <h3 className="mb-2 line-clamp-2 text-sm font-semibold leading-snug text-[var(--text-primary)] transition-colors group-hover:text-violet-300 sm:text-base">
          {product.name}
        </h3>

        {/* Short Description */}
        <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-[var(--text-muted)] sm:text-sm">
          {product.shortDescription}
        </p>

        {/* Rating */}
        <div className="mb-3 flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3.5 w-3.5",
                  i < Math.floor(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : i < product.rating
                    ? "fill-amber-400/50 text-amber-400/50"
                    : "fill-gray-600 text-gray-600"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-[var(--text-muted)]">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price — pushed to bottom */}
        <div className="mt-auto flex items-center gap-2">
          <span className="text-lg font-bold text-[var(--text-primary)] sm:text-xl">
            <FormattedPrice amount={product.price} />
          </span>
          {product.originalPrice && (
            <span className="text-sm text-[var(--text-muted)] line-through">
              <FormattedPrice amount={product.originalPrice} />
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
