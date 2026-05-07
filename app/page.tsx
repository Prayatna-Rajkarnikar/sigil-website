import Link from "next/link";
import { exo } from "./font";
import HeroAgent3D from "@/component/HeroAgent3DClient";
import HeroOrbitLabels from "@/component/HeroOrbitLabels";
import MissionAgent3D from "@/component/MissionAgent3DClient";
import ActorDemoRobot from "@/component/ActorDemoRobotClient";
import CTAAgent3D from "@/component/CTAAgent3DClient";
import TraitCard, { type TraitKind } from "@/component/TraitCard";
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
      <div className="absolute inset-0 bg-section-glow pointer-events-none"></div>
      <div className="absolute inset-0 bg-tactical-grid opacity-50"></div>

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
          Sigil sets up autonomous AI{" "}
          <span className="text-foreground">actors</span> in realistic
          simulations, so you can try out plans, train your team, and see
          what actually works —{" "}
          <span className="text-foreground">before</span> it really matters.
        </p>

        <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row">
          <MagneticButton>
            <Link
              href="/use-case"
              className="btn-tactical bg-primary-gradient group relative inline-flex items-center justify-center gap-3 border border-primary px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-background transition"
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
    "AGENTIC AI",
    "REALISTIC SIMULATION",
    "SCENARIO PLANNING",
    "WHAT-IF MODELING",
    "DECISION SUPPORT",
    "AUTONOMOUS AGENTS",
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
      className="relative overflow-hidden border-b border-white/5 px-6 py-32 lg:px-10"
    >
      <div className="absolute inset-0 bg-section-glow pointer-events-none"></div>
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
              We don&apos;t try to predict
              <br />
              the future.
              <br />
              <span className="text-primary">We help you practice it.</span>
            </h2>
            <p className="mt-8 text-base leading-relaxed text-muted">
              Things move fast now. Strategy, supply chains, even the
              systems we depend on every day change quicker than any team
              can keep up with. Sigil turns months of planning into hours
              of realistic simulation — letting autonomous actors
              perceive, reason, and act on your behalf.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              By the time the real situation shows up, your team has
              already worked through it.{" "}
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
                label="Scenarios per run"
                desc="Thousands of agents explore what-ifs in parallel."
              />
              <div className="my-6 h-px w-full bg-white/10"></div>
              <MissionStat
                value="40×"
                label="Faster decisions"
                desc="From months of review to a few days."
              />
              <div className="my-6 h-px w-full bg-white/10"></div>
              <MissionStat
                value="Zero"
                label="Real-world risk"
                desc="Try things safely. Keep what works."
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
   ACTOR CONCEPT — asymmetric editorial: free-floating robot on
   the LEFT (no frame), big headline on the right with a 2×2
   trait matrix beneath, CTA at the bottom. Distinct from the
   Mission section's symmetric 3-column composition.
   ───────────────────────────────────────────────────────────── */
function ActorConcept() {
  const traits = [
    { kind: "perceive", name: "Perceives", desc: "Multi-modal sensory input — vision, audio, telemetry, intent." },
    { kind: "remember", name: "Remembers", desc: "Episodic + semantic memory — recall, reflect, learn." },
    { kind: "reason",   name: "Reasons",   desc: "Goal-directed planning under uncertainty and time pressure." },
    { kind: "act",      name: "Acts",      desc: "Tool use and multi-actor coordination across domains." },
  ] as { kind: TraitKind; name: string; desc: string }[];

  return (
    <section
      id="actor"
      className="relative overflow-hidden border-b border-white/5 px-6 py-32 lg:px-10"
    >
      <div className="absolute inset-0 bg-section-glow pointer-events-none"></div>
      <div className="absolute inset-0 bg-tactical-grid opacity-40 pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="02" label="The Actor" />
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
          {/* LEFT — tactical actor feed */}
          <Reveal
            dir="left"
            delay={160}
            className="order-2 lg:order-1 lg:col-span-5"
          >
            <div className="relative">
              <ActorDemoRobot />
              {/* faint horizontal podium line under the stage */}
              <div className="mx-auto mt-2 h-px w-2/3 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
            </div>
          </Reveal>

          {/* RIGHT — headline + 2x2 trait matrix + CTA */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <Reveal delay={120}>
              <h2
                className={`${exo.className} text-5xl font-black leading-[0.98] sm:text-6xl lg:text-7xl`}
              >
                Meet the
                <br />
                <span className="text-primary">Actor.</span>
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {traits.map((trait, i) => (
                <Reveal key={trait.kind} delay={240 + i * 90}>
                  <TraitCard kind={trait.kind} name={trait.name} desc={trait.desc} />
                </Reveal>
              ))}
            </div>

            <Reveal delay={620}>
              <Link
                href="/actors"
                className="btn-tactical group mt-10 inline-flex items-center gap-3 border border-primary/60 bg-primary/5 px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-primary transition hover:bg-primary/10"
              >
                Inspect the Actor
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </Reveal>
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
      role: "Stress-Test Engine",
      desc: "An adaptive counter-actor that learns your decisions in real time. Surfaces blind spots before they become costly.",
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
      className="relative overflow-hidden border-b border-white/5 px-6 py-32 lg:px-10"
    >
      <div className="absolute inset-0 bg-section-glow pointer-events-none"></div>
      <div className="absolute inset-0 bg-tactical-grid opacity-40 pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="04" label="AI Models" />
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4" delay={120}>
            <h2
              className={`${exo.className} text-4xl font-black leading-[1.05] sm:text-5xl`}
            >
              Built
              <br />
              <span className="text-primary">for the job.</span>
            </h2>
            <p className="mt-8 text-base leading-relaxed text-muted">
              Sigil comes with a small set of foundation models, each
              tuned for a role inside the actor stack. Mix them, swap
              them, or train your own on top.
            </p>
          </Reveal>

          <div className="lg:col-span-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {models.map((m, i) => (
                <Reveal key={m.codename} delay={200 + i * 90}>
                  <article
                    className="corner-brackets group relative border border-white/10 bg-white/[0.02] p-6 transition hover:border-primary/50 hover:bg-primary/[0.04]"
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
      <div className="absolute inset-0 bg-section-glow pointer-events-none"></div>
      <div className="absolute inset-0 bg-tactical-grid opacity-40 pointer-events-none"></div>

      <Reveal className="relative mx-auto max-w-5xl">
        <div className="luminous-card corner-brackets relative overflow-hidden p-10 backdrop-blur-sm sm:p-16">
          <span className="corner-bl"></span>
          <span className="corner-br"></span>

          <div className="absolute -top-3 left-10 flex items-center gap-2 bg-background px-4 text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
            <span className="h-1.5 w-1.5 bg-primary animate-pulse"></span>
            Get in touch
          </div>

          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-muted">
            // 06 · Talk to us
          </p>

          <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
            {/* LEFT — title + paragraph */}
            <div className="lg:col-span-8">
              <h2
                className={`${exo.className} text-4xl font-black leading-[1.05] sm:text-6xl lg:text-7xl`}
              >
                Stop guessing.
                <br />
                <span className="text-primary">Start practicing.</span>
              </h2>

              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
                Most platforms give you another dashboard. We give you
                back the time you&apos;d have spent learning the hard
                way. A 30-minute call with our team is the easiest way
                to see if it&apos;s a fit.
              </p>
            </div>

            {/* RIGHT — waving robot, signaling "let's chat" */}
            <div className="relative aspect-square w-full max-w-[280px] mx-auto lg:col-span-4 lg:max-w-none">
              <CTAAgent3D />
            </div>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <Link
              href="/use-case"
              className="btn-tactical bg-primary-gradient group corner-brackets relative border border-primary p-6 transition"
            >
              <span className="corner-bl"></span>
              <span className="corner-br"></span>
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-background/70">
                Real example · Dynamic Pricing
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
                Book a 30-min call
              </div>
              <div
                className={`${exo.className} mt-2 text-3xl font-black text-foreground`}
              >
                Talk to a human
              </div>
              <div className="mt-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-muted group-hover:text-foreground transition">
                Get in touch
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
              GDPR-compliant
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              SSO ready
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              On-prem available
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
