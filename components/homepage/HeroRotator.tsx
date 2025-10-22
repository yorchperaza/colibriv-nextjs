'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

type Props = {
  sideLabel?: string;
  sideText?: string;
  sideButtonText?: string;
  sideButtonHref?: string;
  intervalMs?: number;
  brandLingerMs?: number;
  brandExitMs?: number;
};

export default function HeroRotator({
                                      sideLabel = 'Open Round',
                                      sideText = 'Engines first, aircraft next. Join our pre-seed to reach pressurized hot-fire, emissions maps, and a cert-ready plan from Guanacaste, Costa Rica.',
                                      sideButtonText = 'Contact the Team',
                                      sideButtonHref = '/contact',
                                      intervalMs = 2000,
                                      brandLingerMs = 700,  // ⬅️ was 2000
                                      brandExitMs = 380,    // ⬅️ was 600
                                    }: Props) {
  const words = useMemo(
    () => ['Vision', 'Velocity', 'Vector', 'Vanguard', 'Vigilance'],
    []
  );

  const [idx, setIdx] = useState(0);
  const [brandPhase, setBrandPhase] = useState<'show' | 'exit' | 'hidden'>('show');

  // Phase 1: linger, then trigger exit
  useEffect(() => {
    if (brandPhase !== 'show') return;
    const t = setTimeout(() => setBrandPhase('exit'), brandLingerMs);
    return () => clearTimeout(t);
  }, [brandPhase, brandLingerMs]);

  // Phase 2: after exit animation, hide brand & start rotation
  useEffect(() => {
    if (brandPhase !== 'exit') return;
    const t = setTimeout(() => setBrandPhase('hidden'), brandExitMs);
    return () => clearTimeout(t);
  }, [brandPhase, brandExitMs]);

  // Start V-word interval only when brand is hidden
  useEffect(() => {
    if (brandPhase !== 'hidden') return;
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [brandPhase, intervalMs, words.length]);

  return (
    <section className="bg-white pt-20 lg:pt-24 lg:pb-10">
      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideDown {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(-100%); opacity: 0; }
        }
        @keyframes expandWidth {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .word-enter {
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .word-exit {
          animation: slideDown 0.5s cubic-bezier(0.7, 0, 0.84, 0) forwards;
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[2fr_1fr]">
          {/* Left: Headline + subhead + CTAs */}
          <div>
            <h1 className="font-extrabold leading-[0.95] tracking-[-0.015em] text-slate-900 text-5xl sm:text-6xl lg:text-7xl xl:text-[6.5rem]">
              {/* Word container - fixed width to prevent layout shift */}
              <span
                className="relative inline-block align-baseline overflow-hidden h-[1.1em] min-w-[9ch] border-b-4 border-slate-900"
                style={{ clipPath: 'inset(0 -100% -0.22em -100%)' }}
              >
                {/* Colibri */}
                <span
                  className="absolute inset-0 flex items-center font-black text-slate-900"
                  style={{
                    opacity: brandPhase === 'show' ? 1 : 0,
                    transform: brandPhase === 'show' ? 'translateY(0)' : 'translateY(-20%)',
                    transition: 'all 0.6s cubic-bezier(0.7, 0, 0.84, 0)',
                    pointerEvents: brandPhase === 'hidden' ? 'none' : 'auto',
                  }}
                >
                  Colibri
                </span>

                {/* V-words */}
                <span
                  className="absolute inset-0"
                  style={{
                    opacity: brandPhase === 'hidden' ? 1 : 0,
                    transition: 'opacity 0.3s ease-in',
                  }}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {words.map((w, i) => {
                    const isActive = i === idx;
                    const isPrev = i === (idx - 1 + words.length) % words.length;

                    return (
                      <span
                        key={w}
                        className={`absolute left-0 top-0 h-full flex items-center font-black text-slate-900 whitespace-nowrap ${isActive ? 'word-enter' : isPrev ? 'word-exit' : ''}`}
                        style={{
                          zIndex: 100,
                          opacity: isActive ? 1 : 0,
                          transform: !isActive && !isPrev ? 'translateY(100%)' : undefined,
                        }}
                      >
                        {w}
                      </span>
                    );
                  })}
                </span>

                {/* Animated underline accent */}
                <span
                  className="absolute bottom-0 left-0 h-1 origin-left"
                  style={{
                    backgroundColor: '#d80e0e',
                    width: '100%',
                    transform: brandPhase === 'hidden' ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: brandPhase === 'hidden' ? '0.3s' : '0s',
                  }}
                />
              </span>

              {/* Tagline */}
              <span
                className="inline-block ml-3 font-semibold text-slate-600"
                style={{
                  opacity: brandPhase === 'hidden' ? 1 : 0,
                  transform: brandPhase === 'hidden' ? 'translateX(0)' : 'translateX(-10px)',
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: brandPhase === 'hidden' ? '0.5s' : '0s',
                }}
              >
                for Sustainable Aviation
              </span>
            </h1>

            <div
              style={{
                opacity: brandPhase === 'hidden' ? 1 : 0.7,
                transform: brandPhase === 'hidden' ? 'translateY(0)' : 'translateY(10px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: brandPhase === 'hidden' ? '0.6s' : '0s',
              }}
            >
              <p className="mt-6 text-xl sm:text-2xl font-semibold text-slate-800">
                Driving Global Innovation in Hydrogen-Combustion Flight
              </p>
              <p className="mt-3 max-w-3xl text-slate-600 text-base sm:text-lg leading-relaxed">
                Phase 1: hydrogen-combustion <strong>turbofans</strong> using compressed gaseous H₂ — no cryogenics.
                Phase 2: <strong>passenger aircraft</strong> built around them. Safety and certification from day one in
                <strong> Guanacaste, Costa Rica (LIR)</strong>.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/investors#overview"
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3.5 text-base font-semibold text-white transition-all hover:bg-slate-800 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/50 focus-visible:ring-offset-2"
                >
                  Investor Overview
                </Link>
                <Link
                  href="/technology/engines"
                  className="inline-flex items-center justify-center rounded-full border-2 border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-900 transition-all hover:border-slate-900 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 focus-visible:ring-offset-2"
                >
                  Explore the Technology
                </Link>
              </div>
            </div>
          </div>

          {/* Right: label + text + button */}
          <div
            style={{
              opacity: brandPhase === 'hidden' ? 1 : 0.7,
              transform: brandPhase === 'hidden' ? 'translateY(0)' : 'translateY(10px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: brandPhase === 'hidden' ? '0.8s' : '0s',
            }}
          >
            <div className="grid h-full gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7 lg:p-8 transition-all hover:border-slate-300 hover:shadow-lg overflow-hidden">
              <div>
                <span className="inline-block rounded-full bg-slate-900 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                  {sideLabel}
                </span>
                <h2 className="mt-4 text-xl font-bold text-slate-900">
                  Hydrogen-Combustion Turbofans
                </h2>
                <p className="mt-2 text-slate-800 font-medium">
                  {sideText}
                </p>
              </div>

              <div className="mt-2">
                <Link
                  href={sideButtonHref}
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-base font-semibold text-white transition-all hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/50 focus-visible:ring-offset-2"
                >
                  {sideButtonText}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Screen reader hint */}
        <span className="sr-only">
          {brandPhase !== 'hidden' ? 'Showing: Colibri.' : `Now showing: ${words[idx]}.`}
        </span>
      </div>
    </section>
  );
}
