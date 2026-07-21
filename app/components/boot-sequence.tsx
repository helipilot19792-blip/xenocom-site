'use client';

import { useEffect, useState } from 'react';

const bootLines = [
  'XENOCOM TERMINAL',
  'INITIALIZING SYSTEM...',
  'LOADING COMMUNICATION MODULE...',
  'VERIFYING MESSAGE PROVIDER...',
  'ESTABLISHING LOCAL INTERFACE...',
  'TERMINAL READY',
];

export default function BootSequence() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const alreadySeen = window.sessionStorage.getItem('xenocom-boot-seen');

    const initialize = () => {
      if (reducedMotion || alreadySeen === 'true') {
        window.sessionStorage.setItem('xenocom-boot-seen', 'true');
        return;
      }

      setShowOverlay(true);
      window.sessionStorage.setItem('xenocom-boot-seen', 'false');

      const timers: number[] = [];

      bootLines.forEach((_, index) => {
        const timer = window.setTimeout(() => {
          setVisibleLines(index + 1);
        }, 250 * (index + 1));
        timers.push(timer);
      });

      const finishTimer = window.setTimeout(() => {
        setIsFadingOut(true);
        window.setTimeout(() => {
          window.sessionStorage.setItem('xenocom-boot-seen', 'true');
          setShowOverlay(false);
        }, 400);
      }, 250 * bootLines.length + 650);

      timers.push(finishTimer);

      return () => {
        timers.forEach((timer) => window.clearTimeout(timer));
      };
    };

    const timeoutId = window.setTimeout(initialize, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  const handleSkip = () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('xenocom-boot-seen', 'true');
    }
    setIsFadingOut(true);
    window.setTimeout(() => {
      setShowOverlay(false);
    }, 200);
  };

  if (!showOverlay) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-[#020604] px-4 transition-opacity duration-500 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}
      role="dialog"
      aria-modal="true"
      aria-label="XenoCom boot sequence"
    >
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[1.5rem] border border-emerald-400/35 bg-[#031009]/95 p-5 shadow-[0_0_80px_rgba(36,255,121,0.15)] sm:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(73,255,141,0.18),_transparent_50%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:repeating-linear-gradient(to_bottom,rgba(157,255,180,0.06)_0,rgba(157,255,180,0.06)_1px,transparent_1px,transparent_4px)]" />

        <div className="relative z-10 font-mono text-[0.82rem] leading-8 text-emerald-100/90 sm:text-base">
          {bootLines.map((line, index) => (
            <div
              key={line}
              className={`transition-all duration-300 ${index + 1 <= visibleLines ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
            >
              {line}
            </div>
          ))}
          <div className="mt-5 flex items-center gap-2 text-emerald-200/80">
            <span className="inline-block h-4 w-3 animate-pulse bg-emerald-200" aria-hidden="true" />
            <span className="text-sm sm:text-base">SYSTEM ONLINE</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSkip}
          className="absolute bottom-4 right-4 rounded-full border border-emerald-400/40 bg-black/50 px-3 py-2 text-[0.7rem] uppercase tracking-[0.3em] text-emerald-200 transition hover:border-emerald-200 hover:text-white"
        >
          Skip
        </button>
      </div>
    </div>
  );
}
