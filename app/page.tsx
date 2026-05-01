import Image from "next/image";
import Link from "next/link";
import { exo } from "./font";
import Actor3D from "@/component/Actor3DClient";
import HeroAgent3D from "@/component/HeroAgent3DClient";
import HeroOrbitLabels from "@/component/HeroOrbitLabels";
import MissionAgent3D from "@/component/MissionAgent3DClient";
import Reveal from "@/component/Reveal";
import MagneticButton from "@/component/MagneticButton";
import CycleHeadline from "@/component/CycleHeadline";
import CountUp from "@/component/CountUp";

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <Mission />
      <ActorConcept />
      <AIModels />
      <SalesCTA />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO — centered composition: 3D agent + orbital labels above,
   eyebrow / headline / subtitle / CTAs below
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
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>

      {/* Layered overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background"></div>
      <div className="absolute inset-0 bg-tactical-grid opacity-60"></div>
      <div className="absolute inset-0 bg-spotlight"></div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center px-6 pt-6 pb-10 lg:px-10">
        {/* ─────────────────────────────────────────────
            3D AGENT + ORBITAL LABELS
           ───────────────────────────────────────────── */}
        <div className="relative w-full max-w-3xl mx-auto mt-0 h-[22vh] sm:h-[26vh] lg:h-[30vh]">
          {/* the 3D head canvas */}
          <HeroAgent3D />

          {/* labels orbit the head along an elliptical ring */}
          <HeroOrbitLabels />
        </div>

        {/* ─────────────────────────────────────────────
            CENTER COPY BLOCK
           ───────────────────────────────────────────── */}
        <p className="mt-3 text-center text-xs font-bold uppercase tracking-[0.32em] text-muted">
          Strategic Simulation Systems · Agentic Decision Modeling
        </p>

        <h1
          className={`${exo.className} mt-3 text-center text-5xl font-black leading-[0.98] tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-[5.5rem] max-w-5xl`}
        >
          Rehearse{" "}
          <CycleHeadline className="text-glow-primary text-primary" />
        </h1>

        <p className="mt-4 max-w-2xl text-center text-base leading-relaxed text-muted sm:text-lg">
          Sigil deploys autonomous AI{" "}
          <span className="text-foreground">actors</span> into high-fidelity
          simulated environments — so your operators, your models, and your
          strategy are battle-tested{" "}
          <span className="text-foreground">before</span> the real world ever
          sees them.
        </p>

        <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row">
          <MagneticButton>
            <Link
              href="/use-case"
              className="btn-tactical group relative inline-flex items-center justify-center gap-3 border border-primary bg-primary px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-background transition hover:bg-primary/90"
            >
              Read the Use Case
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link
              href="/contact"
              className="btn-tactical group inline-flex items-center justify-center gap-3 border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-foreground transition hover:border-primary hover:bg-primary/10"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
              Contact Us
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
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
        <Reveal>
          <SectionLabel index="01" label="Our Mission" />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* LEFT — headline + paragraph */}
          <Reveal className="lg:col-span-4" delay={120}>
            <h2
              className={`${exo.className} text-4xl font-black leading-[1.05] sm:text-5xl`}
            >
              We don&apos;t predict
              <br />
              the future.
              <br />
              <span className="text-primary">We let you rehearse it.</span>
            </h2>
            <p className="mt-8 text-base leading-relaxed text-muted">
              The cost of being wrong is rising. Combat doctrine, supply
              chains, financial systems, and critical infrastructure now
              evolve faster than any human committee can review. Sigil
              compresses years of contingency planning into hours of
              high-fidelity simulation — populating scenarios with autonomous
              actors that perceive, reason, and act with purpose.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              When the real world finally arrives, your team has already
              fought it.{" "}
              <span className="text-foreground">A thousand times.</span>
            </p>
          </Reveal>

          {/* CENTER — saluting robot, free-floating (no frame, no labels) */}
          <Reveal className="lg:col-span-4" delay={200}>
            <div className="relative aspect-square w-full max-w-sm mx-auto">
              <MissionAgent3D />
            </div>
          </Reveal>

          {/* RIGHT — 3 stats stacked vertically with hairline dividers */}
          <Reveal className="lg:col-span-4" delay={280}>
            <div className="flex flex-col">
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
          </Reveal>
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
        <CountUp
          target={value}
          className={`${exo.className} text-5xl font-black text-primary`}
        />
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-foreground">
          {label}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">{desc}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ACTOR CONCEPT — now with 3D actor diagram
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
        <Reveal>
          <SectionLabel index="02" label="The Actor" />
        </Reveal>

        <div className="mt-12 grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-24">
          <Reveal className="lg:col-span-6 order-2 lg:order-1" delay={120}>
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
          </Reveal>

          {/* 3D actor diagram */}
          <Reveal className="lg:col-span-6 order-1 lg:order-2" delay={260}>
            <Actor3D />
          </Reveal>
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
        <Reveal>
          <SectionLabel index="04" label="AI Models" />
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4" delay={120}>
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
          </Reveal>

          <div className="lg:col-span-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {models.map((m, i) => (
                <Reveal key={m.codename} delay={200 + i * 90}>
                  <article
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
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
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

      <Reveal className="relative mx-auto max-w-5xl">
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
            <Link
              href="/use-case"
              className="btn-tactical group corner-brackets relative border border-primary bg-primary p-6 transition hover:bg-primary/90"
            >
              <span className="corner-bl"></span>
              <span className="corner-br"></span>
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-background/70">
                Field-tested · Operation Northstar
              </div>
              <div
                className={`${exo.className} mt-2 text-3xl font-black text-background`}
              >
                Read the Use Case
              </div>
              <div className="mt-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-background/80">
                Open the brief
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>

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
      </Reveal>
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
