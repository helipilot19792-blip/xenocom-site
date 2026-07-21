'use client';

import { useRef, useState } from 'react';
import BootSequence from './boot-sequence';
import TerminalDemo from './terminal-demo';

const navItems = [
  { label: 'Features', href: '#features' },
  { label: 'Download', href: '#download' },
  { label: 'Changelog', href: '#changelog' },
  { label: 'Privacy', href: '#privacy' },
];

const featureCards = [
  {
    title: 'SMS Messaging',
    body: 'Text threads stay crisp and readable with a dedicated terminal layout built for quick scanning.',
  },
  {
    title: 'MMS Support',
    body: 'Share images and attachments without sacrificing the focused industrial interface.',
  },
  {
    title: 'Character Animation',
    body: 'Animated glyphs bring conversations to life in a restrained, sci-fi inspired cadence.',
  },
  {
    title: 'Sound Profiles',
    body: 'Choose from tuned alert styles that reflect different communication environments.',
  },
  {
    title: 'Contact Integration',
    body: 'Roster syncing and presence markers keep active contacts easy to identify.',
  },
  {
    title: 'Local-First Privacy',
    body: 'Core messaging stays on device when possible, with transparent controls for testers.',
  },
];

export default function XenocomHome() {
  const [demoOpen, setDemoOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <BootSequence />
      {demoOpen ? <TerminalDemo onClose={() => setDemoOpen(false)} triggerRef={triggerRef} /> : null}
      <div className="relative min-h-screen overflow-hidden bg-[#030706] text-[#9dffb4]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(58,255,140,0.16),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(255,198,70,0.08),_transparent_30%)]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-full border border-emerald-400/30 bg-black/70 px-4 py-3 shadow-[0_0_0_1px_rgba(157,255,180,0.15),0_0_40px_rgba(36,255,121,0.08)] backdrop-blur sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <a href="#top" className="font-mono text-sm uppercase tracking-[0.4em] text-emerald-200">
              XENOCOM
            </a>
            <nav className="flex flex-wrap items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-emerald-200/80 sm:gap-5">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} className="transition hover:text-emerald-100">
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        <main id="top" className="flex-1 space-y-8 pb-10 sm:space-y-10">
          <section className="grid items-center gap-8 rounded-[2rem] border border-emerald-400/25 bg-[#040b09]/85 p-6 shadow-[0_0_60px_rgba(22,255,120,0.08)] sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
            <div className="max-w-2xl">
              <p className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.4em] text-amber-300/80">
                Industrial communications platform
              </p>
              <h1 className="text-4xl font-semibold uppercase tracking-[0.35em] text-emerald-100 sm:text-5xl lg:text-6xl">
                XENOCOM
              </h1>
              <p className="mt-4 font-mono text-sm uppercase tracking-[0.3em] text-emerald-200/90 sm:text-base">
                Terminal-inspired messaging for Android.
              </p>
              <p className="mt-6 max-w-xl text-base leading-7 text-emerald-100/80 sm:text-lg">
                Experience SMS with animated character rendering, configurable sound profiles, and a clean industrial interface inspired by classic science-fiction computer terminals.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#download"
                  className="inline-flex items-center justify-center rounded-full border border-emerald-400/60 bg-emerald-400/10 px-5 py-3 font-mono text-[0.72rem] uppercase tracking-[0.32em] text-emerald-200 transition hover:bg-emerald-400/20 hover:text-white"
                >
                  Download Alpha
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-full border border-amber-400/40 px-5 py-3 font-mono text-[0.72rem] uppercase tracking-[0.32em] text-amber-200 transition hover:border-amber-300 hover:bg-amber-400/10"
                >
                  Learn More
                </a>
              </div>

              <div className="mt-4">
                <button
                  ref={triggerRef}
                  type="button"
                  onClick={() => setDemoOpen(true)}
                  className="rounded-full border border-emerald-400/50 bg-emerald-400/10 px-5 py-3 font-mono text-[0.72rem] uppercase tracking-[0.32em] text-emerald-200 transition hover:bg-emerald-400/20"
                >
                  Open Relay Console
                </button>
                <p className="mt-3 text-[0.68rem] uppercase tracking-[0.3em] text-emerald-200/70">
                  Simulated relay console — no live signals accessed
                </p>
              </div>

              <p className="mt-5 max-w-xl text-sm leading-7 text-emerald-100/75">
                Experience XenoCom’s character-by-character message rendering and industrial terminal interface directly in your browser.
              </p>

              <div className="mt-8 grid gap-3 rounded-2xl border border-emerald-400/20 bg-black/40 p-4 text-[0.7rem] uppercase tracking-[0.3em] text-emerald-100/80 sm:grid-cols-3">
                <div>
                  <span className="block text-emerald-200/60">Status</span>
                  <span className="mt-1 block text-sm text-emerald-100">Alpha</span>
                </div>
                <div>
                  <span className="block text-emerald-200/60">Platform</span>
                  <span className="mt-1 block text-sm text-emerald-100">Android</span>
                </div>
                <div>
                  <span className="block text-emerald-200/60">Network</span>
                  <span className="mt-1 block text-sm text-emerald-100">SMS / MMS</span>
                </div>
              </div>
            </div>

            <div className="terminal-panel relative overflow-hidden rounded-[1.5rem] border border-emerald-400/35 bg-[#020705] p-3 shadow-[0_0_50px_rgba(67,255,140,0.12)] sm:p-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-200/70" />
              </div>
              <div className="terminal-screen relative overflow-hidden rounded-[1rem] border border-emerald-400/30 bg-[#02110a]/95 p-4 sm:p-6">
                <div className="relative z-10 space-y-2 font-mono text-[0.72rem] uppercase tracking-[0.3em] text-emerald-100/80 sm:text-sm">
                  <div className="text-emerald-200/60">secure relay</div>
                  <div>&gt; query network</div>
                  <div>&gt; init sms channel</div>
                  <div>&gt; render character 17</div>
                  <div className="text-amber-200/90">&gt; sound profile: deep space</div>
                  <div>&gt; local interface ready</div>
                  <div className="pt-3 text-[0.65rem] text-emerald-200/50">
                    <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-emerald-300" />
                    relay status: active
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="features" className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.35em] text-amber-300/80">
                  Feature grid
                </p>
                <h2 className="mt-2 text-2xl uppercase tracking-[0.26em] text-emerald-100 sm:text-3xl">
                  Communications, tuned.
                </h2>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {featureCards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-[1.25rem] border border-emerald-400/20 bg-black/50 p-5 shadow-[0_0_30px_rgba(36,255,121,0.06)]"
                >
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-emerald-200/60">
                    / {card.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-emerald-100/80">{card.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="changelog" className="rounded-[1.75rem] border border-amber-400/25 bg-[#0b0b04]/85 p-6 shadow-[0_0_30px_rgba(255,198,70,0.08)] sm:p-8">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.35em] text-amber-300/80">
              Alpha notice
            </p>
            <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl uppercase tracking-[0.26em] text-emerald-100 sm:text-3xl">
                  Early access for testers.
                </h2>
                <p className="mt-4 text-base leading-7 text-emerald-100/80">
                  This release is an early alpha intended for testers, feedback, and calibration. Expect rapid iteration, occasional rough edges, and a shifting set of features as the terminal experience evolves.
                </p>
              </div>
              <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.32em] text-emerald-200/90">
                Testing build · Android only
              </div>
            </div>
          </section>

          <section id="download" className="rounded-[2rem] border border-emerald-400/25 bg-[#040b09]/85 p-6 shadow-[0_0_60px_rgba(22,255,120,0.08)] sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.35em] text-amber-300/80">
                  Download
                </p>
                <h2 className="mt-2 text-2xl uppercase tracking-[0.26em] text-emerald-100 sm:text-3xl">
                  Download alpha APK
                </h2>
                <p className="mt-4 text-base leading-7 text-emerald-100/80">
                  The installer is preparing for release. Until then, this page keeps the download path ready for the first public build.
                </p>
              </div>
              <a
                href="#top"
                className="inline-flex min-w-[260px] items-center justify-center rounded-full border border-emerald-400/60 bg-emerald-400/15 px-6 py-4 font-mono text-[0.78rem] uppercase tracking-[0.32em] text-emerald-200 shadow-[0_0_25px_rgba(94,255,144,0.2)] transition hover:bg-emerald-400/25"
              >
                <span className="mr-2">⬢</span>
                Coming Soon
              </a>
            </div>
          </section>
        </main>

        <footer id="privacy" className="border-t border-emerald-400/20 py-6 text-center text-[0.74rem] uppercase tracking-[0.3em] text-emerald-200/70 sm:text-sm">
          <p>Independent software.</p>
          <p className="mt-2 text-emerald-200/60">
            Not affiliated with any movie, game, or entertainment franchise.
          </p>
        </footer>
      </div>
    </div>
    </>
  );
}
