import Link from "next/link";
import { exo } from "@/app/font";

export default function UseCasePage() {
  return (
    <>
      <UseHero />
      <Brief />
      <Timeline />
      <Outcomes />
      <Footnote />
    </>
  );
}

function UseHero() {
  return (
    <section className="relative min-h-[60vh] overflow-hidden border-b border-white/5 bg-background scanlines">
      <div className="absolute inset-0 bg-tactical-grid opacity-60"></div>
      <div className="absolute inset-0 bg-spotlight"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-16 lg:px-10">
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
          <span className="h-1.5 w-1.5 bg-primary"></span>
          Case File · 04-2761
          <span className="text-muted">/</span>
          <span className="text-muted">Declassified Excerpt</span>
        </div>
        <h1
          className={`${exo.className} mt-6 text-5xl font-black leading-[0.95] tracking-tight text-foreground sm:text-7xl lg:text-[5.5rem]`}
        >
          Operation
          <br />
          <span className="text-glow-primary text-primary">Northstar.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
          A 72-hour multi-domain engagement, simulated end-to-end in 4 hours.
          What follows is the operator-side after-action — actors, decisions,
          inflection points, and what we&apos;d do differently.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["Domain", "Multi-domain"],
            ["Duration (sim)", "72 hours"],
            ["Wall-time", "4 hours"],
            ["Actors", "1,840"],
          ].map(([k, v]) => (
            <div
              key={k}
              className="border border-white/10 bg-white/[0.02] p-3"
            >
              <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-muted">
                {k}
              </div>
              <div className="mt-1 text-xs font-bold text-foreground">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Brief() {
  return (
    <section className="relative border-b border-white/5 px-6 py-32 lg:px-10">
      <div className="absolute inset-0 bg-tactical-grid-fine opacity-30 pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl">
        <SectionLabel index="01" label="The Brief" />

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2
              className={`${exo.className} text-3xl font-black leading-[1.1] sm:text-4xl`}
            >
              A contested logistics corridor.
              <br />
              <span className="text-primary">A 72-hour decision window.</span>
            </h2>
            <p className="mt-8 text-base leading-relaxed text-muted">
              Blue force commander has a 72-hour window to reposition critical
              supply across a contested corridor. Three primary routes, each
              with different exposure profiles. Adversary intent is partially
              known. Sensor coverage is degraded across two of the three
              routes.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              The question isn&apos;t which route is safest. It&apos;s which
              route still works after the adversary observes our first move.
              Sigil ran 1,840 actors across 480 parallel branches and surfaced
              the inflection in 4 hours.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="corner-brackets relative border border-primary/30 bg-white/[0.02] p-6">
              <span className="corner-bl"></span>
              <span className="corner-br"></span>
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                Actors Deployed
              </div>
              <div className="mt-4 space-y-3">
                {[
                  ["STRATAGEM-7", "Theater planner"],
                  ["CASCADE-3", "Logistics coordinator"],
                  ["WARDEN-9", "Reconnaissance"],
                  ["SHADOW-RED", "Adversarial engine"],
                ].map(([code, role]) => (
                  <div
                    key={code}
                    className="flex items-center justify-between border border-white/10 bg-black/30 px-4 py-3"
                  >
                    <div
                      className={`${exo.className} text-sm font-black tracking-wider text-primary`}
                    >
                      {code}
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                      {role}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  const events = [
    {
      t: "T+00:00",
      title: "Cycle initialized",
      body: "1,840 actors instantiated. Parallel branch count: 480. World state seeded from declassified theater intel.",
    },
    {
      t: "T+04:12",
      title: "Adversary repositions",
      body: "SHADOW-RED detects unusual sensor sweep on Route A. Pivots to a posture STRATAGEM-7 had not modeled in the first 60 branches.",
    },
    {
      t: "T+12:48",
      title: "Supply line rerouted",
      body: "CASCADE-3 commits 60% of the convoy to Route B. Yields a 15% time penalty in exchange for a 4× drop in exposure.",
    },
    {
      t: "T+24:30",
      title: "Comms degradation",
      body: "Simulated EW event drops uplink across two relay nodes. Actors transition to autonomous-comms protocol; degraded-mode policy holds.",
    },
    {
      t: "T+48:00",
      title: "Inflection surfaced",
      body: "Branch-cluster analysis flags a single decision at T+04:12 as the dominant determinant of mission success across 73% of viable branches.",
    },
    {
      t: "T+72:00",
      title: "Mission complete",
      body: "Convoy reaches objective. AAR auto-generated, attribution-mapped to 11 named decisions and 3,200 atomic actor actions.",
    },
  ];

  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-black px-6 py-32 lg:px-10">
      <div className="absolute inset-0 bg-tactical-grid opacity-50 pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl">
        <SectionLabel index="02" label="Engagement Timeline" />

        <div className="mt-12 grid gap-4">
          {events.map((e, i) => (
            <article
              key={e.t}
              className="group corner-brackets relative border border-white/10 bg-white/[0.02] p-6 transition hover:border-primary/50"
            >
              <span className="corner-bl"></span>
              <span className="corner-br"></span>
              <div className="grid grid-cols-12 items-start gap-6">
                <div className="col-span-12 sm:col-span-2">
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                    Event {String(i + 1).padStart(2, "0")}
                  </div>
                  <div
                    className={`${exo.className} mt-1 text-2xl font-black tabular-nums text-foreground`}
                  >
                    {e.t}
                  </div>
                </div>
                <div className="col-span-12 sm:col-span-10">
                  <h3
                    className={`${exo.className} text-xl font-black leading-tight text-foreground`}
                  >
                    {e.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {e.body}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Outcomes() {
  const metrics = [
    { label: "AAR Speed", before: "5 days", after: "4 hours", delta: "30×" },
    { label: "Live-ex Cost", before: "$1.2M", after: "$0", delta: "−100%" },
    { label: "Decision Velocity", before: "Q1 review", after: "Same day", delta: "+35%" },
    { label: "Branches Explored", before: "8", after: "480", delta: "60×" },
  ];

  return (
    <section className="relative border-b border-white/5 px-6 py-32 lg:px-10">
      <div className="absolute inset-0 bg-tactical-grid-fine opacity-30 pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl">
        <SectionLabel index="03" label="Outcomes" />

        <div className="mt-12 max-w-3xl">
          <h2
            className={`${exo.className} text-3xl font-black leading-[1.1] sm:text-4xl`}
          >
            Measured against
            <br />
            <span className="text-primary">the live-exercise baseline.</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="corner-brackets relative border border-primary/30 bg-white/[0.02] p-6"
            >
              <span className="corner-bl"></span>
              <span className="corner-br"></span>
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                {m.label}
              </div>
              <div className="mt-4 space-y-3">
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-muted">
                    Before
                  </div>
                  <div
                    className={`${exo.className} text-xl font-black text-muted line-through`}
                  >
                    {m.before}
                  </div>
                </div>
                <div className="border-t border-dashed border-white/10 pt-3">
                  <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-muted">
                    After
                  </div>
                  <div
                    className={`${exo.className} text-2xl font-black text-foreground`}
                  >
                    {m.after}
                  </div>
                </div>
                <div className="border-t border-primary/30 pt-3 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                  Δ {m.delta}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footnote() {
  return (
    <section className="relative px-6 py-32 lg:px-10">
      <div className="absolute inset-0 bg-spotlight"></div>
      <div className="relative mx-auto max-w-4xl">
        <div className="corner-brackets relative border border-primary/40 bg-background/60 p-10 backdrop-blur-sm">
          <span className="corner-bl"></span>
          <span className="corner-br"></span>

          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
            Operator Note
          </div>
          <p
            className={`${exo.className} mt-4 text-2xl font-black leading-tight text-foreground sm:text-3xl`}
          >
            &quot;The decision at T+04:12 looked routine in the moment.
            Sigil&apos;s branch analysis showed it was the entire engagement.
            That&apos;s the kind of thing you don&apos;t learn from a
            briefing deck.&quot;
          </p>
          <div className="mt-6 text-[11px] font-bold uppercase tracking-[0.25em] text-muted">
            — Operator, Pacific Theater Lead
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/#rehearse"
              className="btn-tactical group inline-flex items-center justify-center gap-3 border border-primary bg-primary px-7 py-3 text-sm font-bold uppercase tracking-[0.2em] text-background transition hover:bg-primary/90"
            >
              Run Your Own Rehearsal
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="/contact"
              className="btn-tactical group inline-flex items-center justify-center gap-3 border border-white/20 bg-white/5 px-7 py-3 text-sm font-bold uppercase tracking-[0.2em] text-foreground transition hover:border-primary"
            >
              Request Full Case File
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <div
        className={`${exo.className} text-sm font-black tracking-[0.3em] text-primary`}
      >
        // {index}
      </div>
      <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-primary to-transparent"></div>
      <div className="text-[11px] font-bold uppercase tracking-[0.35em] text-muted">
        {label}
      </div>
    </div>
  );
}
