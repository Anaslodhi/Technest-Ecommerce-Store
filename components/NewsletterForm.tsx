"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      alert("Subscribed Successfully!");
      setTimeout(() => setStatus("idle"), 3000);
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
      <input
        type="email"
        aria-label="Email address"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === "loading" || status === "success"}
        required
        className="flex-1 rounded-xl border border-violet-500/30 bg-white/5 px-5 py-3.5 text-sm text-white placeholder-violet-300/40 outline-none backdrop-blur-sm transition-all duration-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/25 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/40 disabled:opacity-50"
      >
        {status === "loading" ? (
          "Subscribing..."
        ) : status === "success" ? (
          "Subscribed!"
        ) : (
          <>
            Subscribe
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}
