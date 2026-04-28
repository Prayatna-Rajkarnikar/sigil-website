import Image from "next/image";
import Link from "next/link";
import { exo } from "./font";

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <Mission />
      <ActorConcept />
      <TrainArmy />
      <AIModels />
      <UseCaseTeaser />
      <SalesCTA />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO — full-bleed video, classified terminal overlay
   ───────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background scanlines">
      {/* Video backdrop */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>

      {/* Layered overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background"></div>
      <div className="absolute inset-0 bg-tactical-grid opacity-60"></div>
      <div className="absolute inset-0 bg-spotlight"></div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-6 pt-28 pb-12 lg:px-10">
        {/* Top tactical readout */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] uppercase tracking-[0.3em] text-muted">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping-slow"></span>
            <span className="text-primary">// SIGIL.OPS — LIVE</span>
            <span className="hidden sm:inline">/ NODE 04</span>
          </div>
          <div className="hidden gap-6 md:flex">
            <span>LAT 38.8951</span>
            <span>LON -77.0364</span>
            <span>UTC 04:28:01</span>
          </div>
        </div>

        {/* Center hero block */}
        <div className="my-auto py-16">
          <div className="max-w-5xl">
            <p className="mb-6 inline-flex items-center gap-3 border border-primary/40 bg-primary/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              <span className="h-1.5 w-1.5 bg-primary"></span>
              Strategic Simulation Systems
            </p>

            <h1
              className={`${exo.className} text-5xl font-black leading-[0.95] tracking-tight text-foreground sm:text-7xl lg:text-[7.5rem]`}
            >
              Rehearse
              <br />
              <span className="text-glow-primary text-primary">
                the future
              </span>
              <span className="animate-blink text-primary">_</span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Sigil deploys autonomous AI{" "}
              <span className="text-foreground">actors</span> into high-fidelity
              simulated environments — so your operators, your models, and
              your strategy are battle-tested{" "}
              <span className="text-foreground">before</span> the real world
              ever sees them.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="btn-tactical group relative inline-flex items-center justify-center gap-3 border border-primary bg-primary px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-background transition hover:bg-primary/90"
              >
                Request Live Demo
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <a
                href="tel:+15558007445"
                className="btn-tactical group inline-flex items-center justify-center gap-3 border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-foreground transition hover:border-primary hover:bg-primary/10"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
                Speak to Sales
              </a>
            </div>
          </div>
        </div>

        {/* Bottom system panel */}
        <div className="corner-brackets relative border border-primary/40 bg-background/60 p-6 backdrop-blur-sm">
          <span className="corner-bl"></span>
          <span className="corner-br"></span>

          <div className="absolute -top-2.5 left-6 flex items-center gap-2 bg-background px-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
            <span className="h-1.5 w-1.5 bg-primary animate-pulse"></span>
            System Active
          </div>
          <div className="absolute -top-2.5 right-6 bg-background px-3 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
            Classified // 04
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <SpecBlock label="Adaptive" value="98.4" suffix="%" pulse />
            <SpecBlock label="Throughput" value="1.2M" suffix=" sims/h" />
            <SpecBlock label="Autonomy" value="L4" suffix=" sovereign" />
            <SpecBlock label="Latency" value="12" suffix=" ms p99" />
          </div>
        </div>
      </div>
    </section>
  );
}

function SpecBlock({
  label,
  value,
  suffix,
  pulse,
}: {
  label: string;
  value: string;
  suffix?: string;
  pulse?: boolean;
}) {
  return (
    <div className="group relative">
      <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
        {label}
      </div>
      <div className="flex items-baseline gap-1">
        <span
          className={`${exo.className} text-3xl font-black text-foreground ${pulse ? "animate-pulse" : ""}`}
        >
          {value}
        </span>
        {suffix && (
          <span className="text-xs uppercase tracking-wider text-primary">
            {suffix}
          </span>
        )}
      </div>
      <div className="mt-2 h-px w-full bg-gradient-to-r from-primary/60 via-primary/20 to-transparent"></div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TICKER — scrolling status bar
   ───────────────────────────────────────────────────────────── */
function Ticker() {
  const items = [
    "AGENTIC DECISION MODELING",
    "MULTI-DOMAIN SIMULATION",
    "ADVERSARIAL RED TEAMING",
    "DOCTRINE STRESS-TEST",
    "STRATEGIC FORESIGHT",
    "AUTONOMOUS ACTOR NETWORKS",
  ];
  const stream = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-primary/30 bg-primary/5 py-4">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.4em] text-primary">
        {stream.map((item, i) => (
          <span key={i} className="flex items-center gap-12">
            <span>{item}</span>
            <span className="text-foreground/30">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MISSION
   ───────────────────────────────────────────────────────────── */
function Mission() {
  return (
    <section
      id="mission"
      className="relative border-b border-white/5 px-6 py-32 lg:px-10"
    >
      <div className="absolute inset-0 bg-tactical-grid-fine opacity-30 pointer-events-none"></div>
      <div className="relative mx-auto max-w-7xl">
        <SectionLabel index="01" label="Our Mission" />

        <div className="mt-12 grid gap-16 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-7">
            <h2
              className={`${exo.className} text-4xl font-black leading-[1.05] sm:text-5xl lg:text-6xl`}
            >
              We don&apos;t predict
              <br />
              the future.
              <br />
              <span className="text-primary">
                We let you rehearse it.
              </span>
            </h2>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted">
              The cost of being wrong is rising. Combat doctrine, supply
              chains, financial systems, and critical infrastructure now
              evolve faster than any human committee can review. Sigil
              compresses years of contingency planning into hours of
              high-fidelity simulation — populating scenarios with autonomous
              actors that perceive, reason, and act with purpose.
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              When the real world finally arrives, your team has already
              fought it.{" "}
              <span className="text-foreground">A thousand times.</span>
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="corner-brackets relative space-y-0 border border-primary/30 bg-white/[0.02] p-8 backdrop-blur-sm">
              <span className="corner-bl"></span>
              <span className="corner-br"></span>

              <MissionStat
                value="10⁶"
                label="Scenarios per cycle"
                desc="Parallel actor populations explore branching futures."
              />
              <div className="my-6 h-px w-full bg-white/10"></div>
              <MissionStat
                value="40×"
                label="Decision velocity"
                desc="Compress strategic review from quarters to days."
              />
              <div className="my-6 h-px w-full bg-white/10"></div>
              <MissionStat
                value="Zero"
                label="Real-world cost"
                desc="Fail in simulation. Win in the field."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MissionStat({
  value,
  label,
  desc,
}: {
  value: string;
  label: string;
  desc: string;
}) {
  return (
    <div>
      <div className="flex items-baseline gap-4">
        <span
          className={`${exo.className} text-5xl font-black text-primary`}
        >
          {value}
        </span>
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-foreground">
          {label}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">{desc}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ACTOR CONCEPT
   ───────────────────────────────────────────────────────────── */
function ActorConcept() {
  return (
    <section
      id="actor"
      className="relative overflow-hidden border-b border-white/5 bg-black px-6 py-32 lg:px-10"
    >
      <div className="absolute inset-0 bg-tactical-grid opacity-50 pointer-events-none"></div>
      <div className="absolute inset-0 bg-spotlight"></div>

      <div className="relative mx-auto max-w-7xl">
        <SectionLabel index="02" label="The Actor" />

        <div className="mt-12 grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-24">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <h2
              className={`${exo.className} text-4xl font-black leading-[1.05] sm:text-5xl lg:text-6xl`}
            >
              Meet the
              <br />
              <span className="text-primary">Actor.</span>
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-muted">
              An <span className="text-foreground">Actor</span> is the atomic
              unit of the Sigil platform — an autonomous AI agent with goals,
              memory, sensory input, and a policy for action. Drop one into
              an environment, it pursues an objective. Drop a thousand in,
              they form an economy, an army, a city.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                { name: "Perceives", desc: "Multi-modal sensory input" },
                { name: "Remembers", desc: "Episodic + semantic memory" },
                { name: "Reasons", desc: "Goal-directed planning" },
                { name: "Acts", desc: "Tool use & coordination" },
              ].map((trait) => (
                <div
                  key={trait.name}
                  className="border border-white/10 bg-white/[0.02] p-4 transition hover:border-primary/50 hover:bg-primary/5"
                >
                  <div className="mb-1 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary">
                    <span className="h-1 w-1 bg-primary"></span>
                    {trait.name}
                  </div>
                  <div className="text-xs text-muted">{trait.desc}</div>
                </div>
              ))}
            </div>

            <Link
              href="/actors"
              className="btn-tactical group mt-10 inline-flex items-center gap-3 border border-white/20 px-7 py-3 text-sm font-bold uppercase tracking-[0.2em] text-foreground transition hover:border-primary hover:text-primary"
            >
              Inspect the Actor
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          {/* Actor diagram */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <ActorDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}

function ActorDiagram() {
  const ring = [
    { label: "PERCEPTION", angle: 0 },
    { label: "MEMORY", angle: 72 },
    { label: "GOALS", angle: 144 },
    { label: "POLICY", angle: 216 },
    { label: "ACTION", angle: 288 },
  ];
  return (
    <div className="corner-brackets relative aspect-square w-full max-w-md mx-auto border border-primary/30 bg-background/60 p-6 backdrop-blur-sm">
      <span className="corner-bl"></span>
      <span className="corner-br"></span>

      <div className="absolute top-3 left-6 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
        ACTOR.SCHEMA / v4
      </div>
      <div className="absolute top-3 right-6 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
        ID #04-2761
      </div>

      <div className="relative flex h-full items-center justify-center">
        {/* Outer ring */}
        <div className="absolute inset-8 rounded-full border border-white/10 animate-spin-slow"></div>
        <div className="absolute inset-16 rounded-full border border-primary/30"></div>
        <div className="absolute inset-24 rounded-full border border-white/10 animate-spin-slow" style={{ animationDirection: "reverse" }}></div>

        {/* Core */}
        <div className="relative z-10 flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping-slow"></div>
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-background">
            <div
              className={`${exo.className} text-2xl font-black text-primary`}
            >
              ACT
            </div>
          </div>
        </div>

        {/* Orbiting nodes */}
        {ring.map((r) => {
          const rad = (r.angle * Math.PI) / 180;
          const radius = 38;
          const x = 50 + radius * Math.cos(rad - Math.PI / 2);
          const y = 50 + radius * Math.sin(rad - Math.PI / 2);
          return (
            <div
              key={r.label}
              className="absolute"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="flex flex-col items-center gap-1.5">
                <div className="relative h-3 w-3">
                  <div className="absolute inset-0 rounded-full bg-primary"></div>
                  <div className="absolute -inset-1 rounded-full border border-primary/40"></div>
                </div>
                <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground whitespace-nowrap">
                  {r.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-3 left-6 right-6 flex justify-between text-[9px] uppercase tracking-[0.3em] text-muted">
        <span>STATUS · NOMINAL</span>
        <span className="text-primary">●</span>
        <span>UPLINK · OPEN</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TRAIN YOUR ARMY
   ───────────────────────────────────────────────────────────── */
function TrainArmy() {
  const capabilities = [
    {
      tag: "DOCTRINE",
      title: "Stress-test command doctrine",
      desc: "Run blue-vs-red engagements with thousands of autonomous actors. Identify breakage in chain-of-command, comms latency, and rules of engagement before live exercise.",
    },
    {
      tag: "LOGISTICS",
      title: "Pre-position for the real fight",
      desc: "Simulate supply chains under contested conditions. Surface single points of failure across fuel, ammunition, medical, and information flow.",
    },
    {
      tag: "OPERATORS",
      title: "Train operators against adversarial AI",
      desc: "Each Sigil actor adapts to your team's tactics in real time. Operators face an opponent that learns — not a script.",
    },
  ];

  return (
    <section
      id="train"
      className="relative border-b border-white/5 px-6 py-32 lg:px-10"
    >
      <div className="absolute inset-0 bg-tactical-grid-fine opacity-30 pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl">
        <SectionLabel index="03" label="Train Your Army" />

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2
              className={`${exo.className} text-4xl font-black leading-[1.05] sm:text-5xl lg:text-6xl`}
            >
              Sweat in
              <br />
              simulation.
              <br />
              <span className="text-primary">Bleed less in war.</span>
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-muted">
              Sigil environments are physics-grounded, sensor-accurate, and
              populated by adversarial actors that don&apos;t care about your
              feelings. Every drill ends with a forensic readout: what
              decisions were made, by whom, and why they failed.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {[
                "Air & Space",
                "Maritime",
                "Land",
                "Cyber",
                "Information",
                "Logistics",
              ].map((domain) => (
                <span
                  key={domain}
                  className="border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground"
                >
                  {domain}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {capabilities.map((c, i) => (
              <article
                key={c.tag}
                className="group corner-brackets relative border border-white/10 bg-white/[0.02] p-8 transition hover:border-primary/50 hover:bg-primary/[0.04]"
              >
                <span className="corner-bl"></span>
                <span className="corner-br"></span>
                <div className="grid grid-cols-12 items-start gap-6">
                  <div className="col-span-2">
                    <div
                      className={`${exo.className} text-5xl font-black text-primary/30 group-hover:text-primary/60 transition`}
                    >
                      0{i + 1}
                    </div>
                  </div>
                  <div className="col-span-10">
                    <div className="mb-3 inline-block border border-primary/40 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                      {c.tag}
                    </div>
                    <h3
                      className={`${exo.className} text-2xl font-black leading-tight text-foreground`}
                    >
                      {c.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {c.desc}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   AI MODELS
   ───────────────────────────────────────────────────────────── */
function AIModels() {
  const models = [
    {
      codename: "STRATAGEM-7",
      role: "Strategic Planner",
      desc: "Long-horizon planning across multi-domain operations. Hierarchical goal decomposition with sub-actor delegation.",
      stats: [
        ["Horizon", "180 d"],
        ["Branching", "10⁵"],
      ],
    },
    {
      codename: "SHADOW-RED",
      role: "Adversarial Engine",
      desc: "Adaptive opponent that learns your tactics in real time. Trained on declassified doctrine and open-source threat intel.",
      stats: [
        ["Adapt", "<2 turns"],
        ["Modes", "12"],
      ],
    },
    {
      codename: "CASCADE-3",
      role: "Logistics Coordinator",
      desc: "Multi-actor resource allocation under contested, degraded, and intermittent conditions. Optimal under uncertainty.",
      stats: [
        ["Nodes", "65k+"],
        ["Latency", "12 ms"],
      ],
    },
    {
      codename: "WARDEN-9",
      role: "Reconnaissance",
      desc: "Sensor fusion and pattern-of-life analysis. Builds high-fidelity environment state from sparse, noisy observations.",
      stats: [
        ["Sensors", "ALL-DOMAIN"],
        ["Recall", "94.1%"],
      ],
    },
  ];

  return (
    <section
      id="models"
      className="relative overflow-hidden border-b border-white/5 bg-black px-6 py-32 lg:px-10"
    >
      <div className="absolute inset-0 bg-tactical-grid opacity-50 pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl">
        <SectionLabel index="04" label="AI Models" />

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2
              className={`${exo.className} text-4xl font-black leading-[1.05] sm:text-5xl`}
            >
              Purpose-built
              <br />
              <span className="text-primary">for the mission.</span>
            </h2>
            <p className="mt-8 text-base leading-relaxed text-muted">
              Sigil ships a curated arsenal of foundation models, each
              specialized for a role inside the actor stack. Compose them.
              Replace them. Train your own on top.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {models.map((m) => (
                <article
                  key={m.codename}
                  className="corner-brackets group relative border border-white/10 bg-white/[0.02] p-6 transition hover:border-primary/50"
                >
                  <span className="corner-bl"></span>
                  <span className="corner-br"></span>

                  <div className="mb-4 flex items-center justify-between">
                    <div
                      className={`${exo.className} text-xl font-black tracking-wider text-primary`}
                    >
                      {m.codename}
                    </div>
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                  </div>

                  <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-foreground">
                    {m.role}
                  </div>
                  <p className="mb-6 text-sm leading-relaxed text-muted">
                    {m.desc}
                  </p>

                  <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
                    {m.stats.map(([k, v]) => (
                      <div key={k}>
                        <div className="text-[9px] uppercase tracking-[0.2em] text-muted">
                          {k}
                        </div>
                        <div
                          className={`${exo.className} text-lg font-black text-foreground`}
                        >
                          {v}
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   USE CASE TEASER
   ───────────────────────────────────────────────────────────── */
function UseCaseTeaser() {
  return (
    <section className="relative border-b border-white/5 px-6 py-32 lg:px-10">
      <div className="absolute inset-0 bg-tactical-grid-fine opacity-30 pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl">
        <SectionLabel index="05" label="In the Field" />

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div className="corner-brackets relative overflow-hidden border border-primary/30 bg-background/60 p-2 backdrop-blur-sm">
              <span className="corner-bl"></span>
              <span className="corner-br"></span>
              <Image
                src="/pic.png"
                width={800}
                height={600}
                alt="Strategic simulation visualisation"
                className="w-full opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                    REPLAY · Operation Northstar
                  </div>
                  <div
                    className={`${exo.className} text-2xl font-black text-foreground`}
                  >
                    72-hour engagement, recovered in 4 hours.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h2
              className={`${exo.className} text-4xl font-black leading-[1.05] sm:text-5xl`}
            >
              When the brief
              <br />
              becomes <span className="text-primary">the after-action.</span>
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-muted">
              Every Sigil engagement is fully replayable, frame-for-frame,
              with attribution for every decision an actor made. Argue with
              the past. Find the inflection. Train the next generation on
              the actual fight, not the polished briefing deck.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6">
              <ResultStat value="4.2×" label="Faster AAR" />
              <ResultStat value="−68%" label="Live-ex cost" />
              <ResultStat value="+35%" label="Decision speed" />
            </div>

            <Link
              href="/use-case"
              className="btn-tactical group mt-10 inline-flex w-fit items-center gap-3 border border-primary bg-primary/10 px-7 py-3 text-sm font-bold uppercase tracking-[0.2em] text-primary transition hover:bg-primary hover:text-background"
            >
              Read the Use Case
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l-2 border-primary pl-4">
      <div
        className={`${exo.className} text-3xl font-black text-foreground`}
      >
        {value}
      </div>
      <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
        {label}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SALES CTA
   ───────────────────────────────────────────────────────────── */
function SalesCTA() {
  return (
    <section className="relative overflow-hidden bg-background px-6 py-32 lg:px-10">
      <div className="absolute inset-0 bg-tactical-grid opacity-50 pointer-events-none"></div>
      <div className="absolute inset-0 bg-spotlight"></div>

      <div className="relative mx-auto max-w-5xl">
        <div className="corner-brackets relative border border-primary/40 bg-background/60 p-10 backdrop-blur-sm sm:p-16">
          <span className="corner-bl"></span>
          <span className="corner-br"></span>

          <div className="absolute -top-3 left-10 flex items-center gap-2 bg-background px-4 text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
            <span className="h-1.5 w-1.5 bg-primary animate-pulse"></span>
            Open Channel
          </div>

          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-muted">
            // 06 · Engage Command
          </p>

          <h2
            className={`${exo.className} text-4xl font-black leading-[1.05] sm:text-6xl lg:text-7xl`}
          >
            Stop guessing.
            <br />
            <span className="text-primary">Start rehearsing.</span>
          </h2>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
            Most platforms sell you another dashboard. Sigil sells you the
            time you would have spent learning the hard way. A 30-minute
            briefing with our team is the fastest way to see if it&apos;s
            real.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <a
              href="tel:+15558007445"
              className="btn-tactical group corner-brackets relative border border-primary bg-primary p-6 transition hover:bg-primary/90"
            >
              <span className="corner-bl"></span>
              <span className="corner-br"></span>
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-background/70">
                Call sales · 24/7
              </div>
              <div
                className={`${exo.className} mt-2 text-3xl font-black text-background`}
              >
                +1 (555) 800-SIGIL
              </div>
              <div className="mt-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-background/80">
                Speak to a Specialist
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </a>

            <Link
              href="/contact"
              className="btn-tactical group corner-brackets relative border border-white/20 bg-white/[0.02] p-6 transition hover:border-primary"
            >
              <span className="corner-bl"></span>
              <span className="corner-br"></span>
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                Schedule a Briefing
              </div>
              <div
                className={`${exo.className} mt-2 text-3xl font-black text-foreground`}
              >
                30-min · NDA-ready
              </div>
              <div className="mt-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-muted group-hover:text-foreground transition">
                Open the Form
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.25em] text-muted">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              SOC 2
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              ITAR-aware
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              FedRAMP track
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              Air-gap deploy
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Shared
   ───────────────────────────────────────────────────────────── */
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
