// app/contact/ContactForm.tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Script from "next/script";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const hpName = "_hp_"; // honeypot

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    // ✅ Keep a stable reference to the form element
    const formEl = e.currentTarget;

    // Collect data before any awaits
    const formData = new FormData(formEl);
    const payload: Record<string, string> = {};
    formData.forEach((v, k) => {
      payload[k] = String(v);
    });

    try {
      // @ts-ignore
      if (typeof grecaptcha === "undefined") {
        throw new Error("recaptcha_unavailable");
      }
      // @ts-ignore
      const token = await grecaptcha.execute(SITE_KEY, { action: "contact" });
      payload.grecaptchaToken = token;

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "server_error");
      }

      // ✅ Reset the existing form **before** changing UI state
      if (formEl && typeof formEl.reset === "function") formEl.reset();

      setStatus("ok");
    } catch (err) {
      console.error(err);
      setStatus("err");
    }
  }, []);

  useEffect(() => {
    // Preload reCAPTCHA
    // @ts-ignore
    if (typeof grecaptcha !== "undefined") {
      // @ts-ignore
      grecaptcha.ready(() => {});
    }
  }, []);

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`}
        strategy="afterInteractive"
        onLoad={() => {
          // @ts-ignore
          if (typeof grecaptcha !== "undefined") {
            // @ts-ignore
            grecaptcha.ready(() => {});
          }
        }}
      />
      <form className="mt-6 grid gap-4" onSubmit={onSubmit} ref={formRef}>
        {/* Honeypot (hidden from users) */}
        <input
          type="text"
          name={hpName}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="text-sm font-semibold text-slate-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-slate-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="you@company.com"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="reason" className="text-sm font-semibold text-slate-700">
              Reason
            </label>
            <select
              id="reason"
              name="reason"
              defaultValue="Partnerships"
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option>Partnerships</option>
              <option>Investors</option>
              <option>Press & Media</option>
              <option>Careers</option>
              <option>General</option>
            </select>
          </div>
          <div>
            <label htmlFor="company" className="text-sm font-semibold text-slate-700">
              Company / Organization
            </label>
            <input
              id="company"
              name="company"
              type="text"
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Company name (optional)"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="text-sm font-semibold text-slate-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="How can we help?"
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            Protected by reCAPTCHA. <span className="underline">Privacy</span> &{" "}
            <span className="underline">Terms</span> apply.
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center rounded-xl bg-red-600 px-5 py-3 text-base font-semibold text-white hover:opacity-95 disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
        </div>

        {status === "ok" && (
          <p className="text-sm text-green-700 bg-green-50 rounded-md px-3 py-2">
            Thanks! Your message was sent.
          </p>
        )}
        {status === "err" && (
          <p className="text-sm text-red-700 bg-red-50 rounded-md px-3 py-2">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </>
  );
}
