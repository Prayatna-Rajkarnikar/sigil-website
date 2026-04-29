"use client";

import { useRef, useState } from "react";
import { exo } from "@/app/font";

const PRESETS = [
  "Supply chain disruption across South China Sea shipping lanes",
  "Adversarial drone swarm probing a forward operating base",
  "Cyber intrusion targeting national power grid SCADA systems",
  "Multi-domain humanitarian crisis after coastal storm surge",
];

export default function ScenarioGenerator() {
  const [scenario, setScenario] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<"idle" | "streaming" | "done" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  async function run(input: string) {
    if (!input.trim()) return;
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    setOutput("");
    setError(null);
    setStatus("streaming");

    try {
      const res = await fetch("/api/scenario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario: input }),
        signal: ctrl.signal,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || `Briefing channel returned ${res.status}.`);
        setStatus("error");
        return;
      }
      if (!res.body) {
        setError("No stream body returned.");
        setStatus("error");
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setOutput((prev) => prev + chunk);
      }
      setStatus("done");
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") {
        setStatus("idle");
        return;
      }
      setError(e instanceof Error ? e.message : "Unknown error");
      setStatus("error");
    }
  }

  function abort() {
    abortRef.current?.abort();
    setStatus("idle");
  }

  const streaming = status === "streaming";

  return (
    <section
      id="rehearse"
      className="relative border-b border-white/5 px-6 py-32 lg:px-10"
    >
      <div className="absolute inset-0 bg-tactical-grid-fine opacity-30 pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl">
        <div className="flex items-center gap-4">
          <div
            className={`${exo.className} text-sm font-black tracking-[0.3em] text-primary`}
          >
            // 05.5
          </div>
          <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-primary to-transparent"></div>
          <div className="text-[11px] font-bold uppercase tracking-[0.35em] text-muted">
            Live Rehearsal
          </div>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2
              className={`${exo.className} text-4xl font-black leading-[1.05] sm:text-5xl lg:text-6xl`}
            >
              Brief us a
              <br />
              scenario.
              <br />
              <span className="text-primary">We&apos;ll rehearse it.</span>
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-muted">
              Type any operational scenario. Sigil&apos;s briefing module will
              generate a live wargame outline — actors, courses of action, and
              decision surface — in the format your operators read every
              morning.
            </p>

            <div className="mt-8 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
                Sample scenarios
              </div>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    onClick={() => setScenario(p)}
                    disabled={streaming}
                    className="border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-muted transition hover:border-primary/50 hover:text-foreground disabled:opacity-50"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="corner-brackets relative border border-primary/40 bg-background/60 backdrop-blur-sm">
              <span className="corner-bl"></span>
              <span className="corner-br"></span>

              <div className="flex items-center justify-between border-b border-primary/30 px-5 py-3">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                  <span
                    className={`h-1.5 w-1.5 rounded-full bg-primary ${
                      streaming ? "animate-ping-slow" : "animate-pulse"
                    }`}
                  ></span>
                  SIGIL.OPS / Briefing Channel
                </div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-muted">
                  {status === "streaming"
                    ? "Generating"
                    : status === "done"
                    ? "Standby"
                    : status === "error"
                    ? "Fault"
                    : "Idle"}
                </div>
              </div>

              <div className="px-5 py-5">
                <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-muted mb-2">
                  Operator input
                </label>
                <textarea
                  value={scenario}
                  onChange={(e) => setScenario(e.target.value)}
                  placeholder="Describe an operational scenario..."
                  rows={3}
                  disabled={streaming}
                  className="w-full resize-none border border-white/15 bg-black/40 px-4 py-3 text-sm text-foreground placeholder:text-muted/60 outline-none focus:border-primary disabled:opacity-50"
                  maxLength={800}
                />
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-muted">
                    {scenario.length}/800
                  </div>
                  <div className="flex gap-3">
                    {streaming && (
                      <button
                        onClick={abort}
                        className="border border-white/20 bg-white/5 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground transition hover:border-primary hover:text-primary"
                      >
                        Abort
                      </button>
                    )}
                    <button
                      onClick={() => run(scenario)}
                      disabled={streaming || !scenario.trim()}
                      className="btn-tactical inline-flex items-center gap-2 border border-primary bg-primary px-6 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-background transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {streaming ? "Rehearsing..." : "Run Rehearsal →"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-t border-primary/30 px-5 py-5">
                <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
                  <span>Briefing output</span>
                  <span className="text-primary">CLASSIFIED // 04</span>
                </div>
                <div className="min-h-[260px] border border-white/10 bg-black/40 p-4 font-mono text-[12px] leading-relaxed text-foreground whitespace-pre-wrap">
                  {output ||
                    (status === "idle" ? (
                      <span className="text-muted">
                        // Awaiting scenario brief from operator...
                      </span>
                    ) : null)}
                  {streaming && (
                    <span className="ml-1 inline-block h-4 w-2 align-middle bg-primary animate-blink"></span>
                  )}
                </div>
                {error && (
                  <div className="mt-3 border border-red-500/40 bg-red-500/10 px-3 py-2 text-[11px] text-red-300">
                    // {error}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
