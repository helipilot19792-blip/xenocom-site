'use client';

import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

type Message = {
  id: number;
  role: 'incoming' | 'outgoing';
  text: string;
  timestamp: string;
  status: string;
};

type DemoStep = {
  line: string;
};

const initialLines: DemoStep[] = [
  { line: '> BOOT SEQUENCE ENGAGED' },
  { line: '> SCANLINE ARRAY CALIBRATING...' },
  { line: '> SIGNAL QUEUE LOCKED' },
  { line: '> OPERATOR LINK READY' },
  { line: '> AWAITING INTERLEAVE...' },
];

const demoMessages: Message[] = [
  {
    id: 1,
    role: 'incoming',
    text: 'BEACON LOCK ACQUIRED.',
    timestamp: '07:14',
    status: 'received',
  },
  {
    id: 2,
    role: 'outgoing',
    text: 'PRIORITY LANE THREE ENGAGED.',
    timestamp: '07:15',
    status: 'sent',
  },
  {
    id: 3,
    role: 'incoming',
    text: 'SECONDARY CARRIER CLEAN.',
    timestamp: '07:16',
    status: 'received',
  },
  {
    id: 4,
    role: 'outgoing',
    text: 'ACKNOWLEDGED. FINAL HANDOFF QUEUED.',
    timestamp: '07:17',
    status: 'sent',
  },
];

const STATUS_TEXT = {
  incoming: 'INCOMING',
  outgoing: 'OUTGOING',
};

export default function TerminalDemo({
  onClose,
  triggerRef,
}: {
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [displayLines, setDisplayLines] = useState<string[]>([]);
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [activeRole, setActiveRole] = useState<'incoming' | 'outgoing'>('incoming');
  const [activeText, setActiveText] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [announcement, setAnnouncement] = useState('Relay console ready.');
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const historyEntryActiveRef = useRef(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const testTonePlayedRef = useRef(false);
  const tickIntervalRef = useRef<number | null>(null);
  const timeoutIdsRef = useRef<number[]>([]);
  const soundOnRef = useRef(soundOn);

  useEffect(() => {
    soundOnRef.current = soundOn;
  }, [soundOn]);

  const clearTimers = () => {
    if (tickIntervalRef.current !== null) {
      window.clearInterval(tickIntervalRef.current);
      tickIntervalRef.current = null;
    }

    timeoutIdsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutIdsRef.current = [];
  };

  const scheduleTimeout = (callback: () => void, delay: number) => {
    const id = window.setTimeout(() => {
      timeoutIdsRef.current = timeoutIdsRef.current.filter((timeoutId) => timeoutId !== id);
      callback();
    }, delay);

    timeoutIdsRef.current.push(id);
    return id;
  };

  const stopAudio = () => {
    if (gainRef.current) {
      gainRef.current.disconnect();
      gainRef.current = null;
    }

    if (audioContextRef.current) {
      void audioContextRef.current.close();
      audioContextRef.current = null;
    }

    testTonePlayedRef.current = false;
  };

  const ensureAudio = useCallback(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    const AudioContextCtor = window.AudioContext || (window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextCtor) {
      return null;
    }

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContextCtor();
      gainRef.current = audioContextRef.current.createGain();
      gainRef.current.gain.value = 0.025;
      gainRef.current.connect(audioContextRef.current.destination);
    }

    if (audioContextRef.current.state === 'suspended') {
      void audioContextRef.current.resume();
    }

    return audioContextRef.current;
  }, []);

  const playTone = (type: 'incoming' | 'outgoing') => {
    if (!soundOnRef.current || typeof window === 'undefined') {
      return;
    }

    const context = ensureAudio();
    if (!context || !gainRef.current) {
      return;
    }

    const sampleRate = context.sampleRate;
    const duration = 0.16;
    const frameCount = sampleRate * duration;
    const buffer = context.createBuffer(1, frameCount, sampleRate);
    const channelData = buffer.getChannelData(0);
    const frequency = type === 'incoming' ? 760 : 680;

    for (let i = 0; i < frameCount; i += 1) {
      const t = i / sampleRate;
      const envelope = Math.exp(-4.2 * t / duration);
      channelData[i] = envelope * Math.sin(2 * Math.PI * frequency * t);
    }

    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(gainRef.current);
    source.start();
  };

  const playTestTone = useCallback(() => {
    if (!soundOnRef.current) {
      return;
    }

    const context = ensureAudio();
    if (!context || !gainRef.current || testTonePlayedRef.current) {
      return;
    }

    testTonePlayedRef.current = true;
    playTone('incoming');
  }, [ensureAudio]);

  const closeDemo = useCallback(() => {
    clearTimers();
    stopAudio();
    setIsOpen(false);
    if (historyEntryActiveRef.current) {
      historyEntryActiveRef.current = false;
      window.history.back();
    }
    scheduleTimeout(() => onClose(), 120);
  }, [onClose]);

  const setSoundEnabled = (nextValue: boolean) => {
    soundOnRef.current = nextValue;
    setSoundOn(nextValue);

    if (nextValue) {
      void ensureAudio();
      playTestTone();
    }
  };

  const startDemo = () => {
    clearTimers();
    setStarted(true);
    setPaused(false);
    setDisplayLines([]);
    setVisibleMessages([]);
    setActiveRole('incoming');
    setActiveText('');
    setMessageIndex(0);
    setIsTyping(false);
    setAnnouncement('Demo started.');

    if (soundOnRef.current) {
      void ensureAudio();
      playTestTone();
    }

    initialLines.forEach((line, index) => {
      scheduleTimeout(() => {
        setDisplayLines((current) => [...current, line.line]);
      }, index * 250);
    });

    scheduleTimeout(() => {
      typeMessage(0, '');
    }, initialLines.length * 250 + 250);
  };

  const restartDemo = () => {
    clearTimers();
    setPaused(false);
    setDisplayLines([]);
    setVisibleMessages([]);
    setActiveRole('incoming');
    setActiveText('');
    setMessageIndex(0);
    setIsTyping(false);
    setAnnouncement('Restarting demo.');
    scheduleTimeout(() => {
      startDemo();
    }, 180);
  };

  const togglePause = () => {
    if (!started) {
      return;
    }

    if (paused) {
      setPaused(false);
      setAnnouncement('Demo resumed.');
      typeMessage(messageIndex, activeText);
      return;
    }

    clearTimers();
    setPaused(true);
    setAnnouncement('Demo paused.');
  };

  const toggleSound = () => {
    setSoundEnabled(!soundOnRef.current);
  };

  const typeMessage = (messageIndexValue: number, currentText: string) => {
    const currentMessage = demoMessages[messageIndexValue];
    if (!currentMessage) {
      setIsTyping(false);
      setAnnouncement('Conversation complete.');
      return;
    }

    clearTimers();
    setMessageIndex(messageIndexValue);
    setActiveRole(currentMessage.role);
    setActiveText(currentText);
    setIsTyping(true);
    setAnnouncement(`${STATUS_TEXT[currentMessage.role]} message received.`);

    let charIndex = currentText.length;

    tickIntervalRef.current = window.setInterval(() => {
      charIndex += 1;
      const nextText = currentMessage.text.slice(0, charIndex);
      setActiveText(nextText);

      if (soundOnRef.current && charIndex % 2 === 0) {
        playTone(currentMessage.role);
      }

      if (charIndex >= currentMessage.text.length) {
        window.clearInterval(tickIntervalRef.current ?? 0);
        tickIntervalRef.current = null;
        setVisibleMessages((list) => [...list, { ...currentMessage, text: nextText }]);
        setIsTyping(false);
        setAnnouncement(`${STATUS_TEXT[currentMessage.role]} message completed.`);

        scheduleTimeout(() => {
          const nextIndex = messageIndexValue + 1;
          if (nextIndex < demoMessages.length) {
            typeMessage(nextIndex, '');
          } else {
            setAnnouncement('Conversation complete.');
          }
        }, 900);
      }
    }, 70);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    historyEntryActiveRef.current = true;
    window.history.pushState({ xenocomDemo: true }, '', window.location.href);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeDemo();
      }

      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );

        if (!focusable || focusable.length === 0) {
          event.preventDefault();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    const handlePopState = () => {
      if (historyEntryActiveRef.current) {
        closeDemo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
      clearTimers();
      stopAudio();
      triggerRef.current?.focus();
    };
  }, [closeDemo, triggerRef]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[#010203]/90 px-3 py-4 text-emerald-100 sm:px-5"
      role="dialog"
      aria-modal="true"
      aria-label="Signal relay console"
      ref={dialogRef}
      onClick={closeDemo}
    >
      <div
        className="relative flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-emerald-400/30 bg-[#030706]/95 shadow-[0_0_90px_rgba(36,255,121,0.12)] sm:h-[90vh]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(93,255,146,0.16),_transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:repeating-linear-gradient(to_bottom,rgba(157,255,180,0.07)_0,rgba(157,255,180,0.07)_1px,transparent_1px,transparent_4px)]" />

        <div className="relative flex items-center justify-between border-b border-emerald-400/20 px-4 py-3 text-[0.7rem] uppercase tracking-[0.34em] text-emerald-200/80 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-200/70" />
          </div>
          <div className="flex items-center gap-3">
            <div className="text-[0.65rem] text-emerald-200/70">SIMULATED OPERATOR CHANNEL</div>
            <button
              type="button"
              onClick={closeDemo}
              ref={closeButtonRef}
              className="rounded-full border border-emerald-400/35 px-2.5 py-1.5 text-[0.62rem] uppercase tracking-[0.3em] text-emerald-200 transition hover:bg-emerald-400/10"
            >
              Close
            </button>
          </div>
        </div>

        <div className="relative flex flex-1 flex-col gap-4 p-3 sm:p-6 lg:flex-row">
          <section className="flex min-h-[280px] flex-1 flex-col rounded-[1.25rem] border border-emerald-400/25 bg-[#06110a]/90 p-3 sm:p-4 lg:min-h-0">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-emerald-400/20 pb-2 text-[0.64rem] uppercase tracking-[0.3em] text-emerald-200/70">
              <span>Signal Queue</span>
              <span>{started ? 'ACTIVE' : 'STANDBY'}</span>
            </div>
            <div className="flex-1 overflow-y-auto rounded-[1rem] border border-emerald-400/20 bg-black/55 p-3 sm:p-4">
              <div className="space-y-3 font-mono text-[0.72rem] leading-7 uppercase tracking-[0.2em] text-emerald-100/90 sm:text-sm">
                {displayLines.map((line) => (
                  <div key={line} className="whitespace-pre-wrap text-emerald-200/80">
                    {line}
                  </div>
                ))}
                {visibleMessages.map((message) => (
                  <div key={message.id} className={`rounded border px-3 py-2 ${message.role === 'incoming' ? 'border-amber-400/25 bg-amber-400/10' : 'border-emerald-400/25 bg-emerald-400/10'}`}>
                    <div className="mb-1 flex items-center justify-between text-[0.58rem] uppercase tracking-[0.28em] text-emerald-200/70">
                      <span>{STATUS_TEXT[message.role]}</span>
                      <span>{message.timestamp}</span>
                    </div>
                    <div>{message.text}</div>
                    <div className="mt-2 text-[0.58rem] uppercase tracking-[0.28em] text-emerald-200/60">
                      {message.status}
                    </div>
                  </div>
                ))}
                {started && !paused && isTyping && (
                  <div className={`rounded border px-3 py-2 ${activeRole === 'incoming' ? 'border-amber-400/25 bg-amber-400/10' : 'border-emerald-400/25 bg-emerald-400/10'}`}>
                    <div className="mb-1 flex items-center justify-between text-[0.58rem] uppercase tracking-[0.28em] text-emerald-200/70">
                      <span>{STATUS_TEXT[activeRole]}</span>
                      <span>NOW</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>{activeText}</span>
                      <span className="ml-1 h-4 w-2 animate-pulse bg-emerald-100" aria-hidden="true" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          <aside className="flex w-full flex-col gap-3 rounded-[1.25rem] border border-emerald-400/25 bg-[#06110a]/90 p-3 sm:p-4 lg:w-[280px]">
            <div className="rounded-[1rem] border border-emerald-400/20 bg-black/40 p-3">
              <div className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-amber-300/80">Relay Status</div>
              <div className="mt-3 space-y-2 font-mono text-[0.68rem] uppercase tracking-[0.28em] text-emerald-100/80">
                <div className="flex items-center justify-between">
                  <span>Carrier</span>
                  <span>Primary Link</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Channel</span>
                  <span>{started ? 'ACTIVE' : 'IDLE'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Node</span>
                  <span>Local Array</span>
                </div>
              </div>
            </div>

            <div aria-live="polite" className="rounded-[1rem] border border-emerald-400/20 bg-black/40 p-3 font-mono text-[0.68rem] leading-6 uppercase tracking-[0.2em] text-emerald-100/80">
              <div className="text-[0.6rem] uppercase tracking-[0.3em] text-amber-300/80">Operator Notes</div>
              <p className="mt-2">{announcement}</p>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              <button
                type="button"
                onClick={startDemo}
                className="rounded-full border border-emerald-400/45 bg-emerald-400/12 px-3 py-2 text-[0.72rem] uppercase tracking-[0.3em] text-emerald-200 transition hover:bg-emerald-400/20"
              >
                Start
              </button>
              <button
                type="button"
                onClick={restartDemo}
                className="rounded-full border border-amber-400/35 bg-amber-400/10 px-3 py-2 text-[0.72rem] uppercase tracking-[0.3em] text-amber-200 transition hover:bg-amber-400/20"
              >
                Restart
              </button>
              <button
                type="button"
                onClick={togglePause}
                className="rounded-full border border-emerald-400/35 px-3 py-2 text-[0.72rem] uppercase tracking-[0.3em] text-emerald-200 transition hover:bg-emerald-400/10"
              >
                {paused ? 'Resume' : 'Pause'}
              </button>
              <button
                type="button"
                onClick={toggleSound}
                className="rounded-full border border-emerald-400/35 px-3 py-2 text-[0.72rem] uppercase tracking-[0.3em] text-emerald-200 transition hover:bg-emerald-400/10"
              >
                Sound: {soundOn ? 'ON' : 'OFF'}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
