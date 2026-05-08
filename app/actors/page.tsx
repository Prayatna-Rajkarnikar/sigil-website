import Link from "next/link";
import { exo } from "@/app/font";
import Actor3D from "@/component/Actor3DClient";

export default function ActorsPage() {
  return (
    <>
      <ActorHero />
      <ActorAnatomy />
      <DecisionLoop />
      <Capabilities />
      <Variants />
      <ActorCTA />
    </>
  );
}

function ActorHero() {
  return (
    <section className="relative min-h-[80vh] overflow-hidden border-b border-white/5 bg-background scanlines">
      <div className="absolute inset-0 bg-tactical-grid opacity-60"></div>
      <div className="absolute inset-0 bg-spotlight"></div>

      <div className="relative z-10 mx-auto grid min-h-[80vh] max-w-7xl gap-16 px-6 pt-32 pb-16 lg:grid-cols-12 lg:items-center lg:px-10">
        <div className="lg:col-span-7">
          <div className="mb-6 inline-flex items-center gap-3 border border-primary/40 bg-primary/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
            <span className="h-1.5 w-1.5 bg-primary"></span>
            Actor.Schema / v4
          </div>
          <h1
            className={`${exo.className} text-5xl font-black leading-[0.95] tracking-tight text-foreground sm:text-7xl lg:text-[6rem]`}
          >
            One Actor.
            <br />
            <span className="text-glow-primary text-primary">Ten thousand</span>
            <br />
            outcomes.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
            The atomic unit of the Sigil platform. An autonomous AI agent
            with goals, memory, sensory input, and a policy for action — drop
            it into any environment and it pursues an objective.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["Goals", "Hierarchical"],
              ["Memory", "Episodic + Semantic"],
              ["Sensors", "All-Domain"],
              ["Policy", "Adaptive"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="rounded-lg border border-white/10 bg-white/[0.02] p-3"
              >
                <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-muted">
                  {k}
                </div>
                <div className="mt-1 text-xs font-bold text-foreground">
                  {v}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <Actor3D />
        </div>
      </div>
    </section>
  );
}

function ActorAnatomy() {
  const blocks = [
    {
      tag: "PERCEPTION",
      title: "Multi-modal sensory ingestion",
      desc: "Visual, acoustic, textual, telemetric. The actor builds a unified situational picture from sparse, contradictory, and intermittent signals.",
    },
    {
      tag: "MEMORY",
      title: "Episodic and semantic recall",
      desc: "Long-term memory of past engagements plus structured world knowledge. Actors learn from every cycle, individually and across the swarm.",
    },
    {
      tag: "GOALS",
      title: "Hierarchical objective decomposition",
      desc: "Strategic intent flows downward. The actor breaks high-level mission goals into sub-tasks it can actually execute against its environment.",
    },
    {
      tag: "POLICY",
      title: "Goal-directed planning",
      desc: "The decision engine. Plans, simulates outcomes, hedges, and commits — under uncertainty, partial information, and adversarial pressure.",
    },
    {
      tag: "ACTION",
      title: "Tool use and inter-actor coordination",
      desc: "From single tool calls to coordinated swarm maneuvers. Actions are auditable, attributable, and tied back to the goal that produced them.",
    },
  ];

  return (
    <section className="relative border-b border-white/5 px-6 py-32 lg:px-10">
      <div className="absolute inset-0 bg-tactical-grid-fine opacity-30 pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl">
        <SectionLabel index="01" label="Anatomy of an Actor" />

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2
              className={`${exo.className} text-4xl font-black leading-[1.05] sm:text-5xl`}
            >
              Five subsystems.
              <br />
              <span className="text-primary">One operator.</span>
            </h2>
            <p className="mt-8 text-base leading-relaxed text-muted">
              Every Sigil actor is built from five composable subsystems.
              Replace any one of them with your own model — or drop in ours
              and start running cycles in minutes.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-4">
            {blocks.map((b, i) => (
              <article
                key={b.tag}
                className="group corner-brackets relative border border-white/10 bg-white/[0.02] p-6 transition hover:border-primary/50 hover:bg-primary/[0.04]"
              >
                <span className="corner-bl"></span>
                <span className="corner-br"></span>
                <div className="grid grid-cols-12 items-start gap-6">
                  <div className="col-span-2">
                    <div
                      className={`${exo.className} text-4xl font-black text-primary/30 group-hover:text-primary/60 transition`}
                    >
                      0{i + 1}
                    </div>
                  </div>
                  <div className="col-span-10">
                    <div className="mb-2 inline-block border border-primary/40 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                      {b.tag}
                    </div>
                    <h3
                      className={`${exo.className} text-xl font-black leading-tight text-foreground`}
                    >
                      {b.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {b.desc}
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

function DecisionLoop() {
  const steps = [
    {
      n: "T+0.0s",
      label: "PERCEIVE",
      body: "Sensors stream in. Actor refreshes its world model with the freshest observations available, weighted by source confidence.",
    },
    {
      n: "T+0.2s",
      label: "RECALL",
      body: "Working memory pulls the last N relevant frames; long-term memory surfaces priors from past engagements with similar topology.",
    },
    {
      n: "T+0.6s",
      label: "PLAN",
      body: "Policy generates candidate courses of action. Each is forward-simulated against the current world model to estimate yield and risk.",
    },
    {
      n: "T+0.9s",
      label: "DECIDE",
      body: "The actor commits to a course of action — or escalates to a coordinator actor if the decision exceeds its authority envelope.",
    },
    {
      n: "T+1.0s",
      label: "ACT",
      body: "Action emitted into the environment. Outcome captured. The cycle restarts with the new observed state.",
    },
  ];

  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-black px-6 py-32 lg:px-10">
      <div className="absolute inset-0 bg-tactical-grid opacity-50 pointer-events-none"></div>
      <div className="absolute inset-0 bg-spotlight"></div>

      <div className="relative mx-auto max-w-7xl">
        <SectionLabel index="02" label="The Decision Loop" />

        <div className="mt-12 max-w-3xl">
          <h2
            className={`${exo.className} text-4xl font-black leading-[1.05] sm:text-5xl`}
          >
            One second.
            <br />
            <span className="text-primary">Five subsystems firing in sequence.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-4 lg:grid-cols-5">
          {steps.map((s, i) => (
            <div
              key={s.label}
              className="corner-brackets relative border border-white/10 bg-white/[0.02] p-6"
            >
              <span className="corner-bl"></span>
              <span className="corner-br"></span>

              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                {s.n}
              </div>
              <div
                className={`${exo.className} mt-2 text-2xl font-black text-foreground`}
              >
                {s.label}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted">{s.body}</p>

              <div className="mt-5 flex items-center gap-2">
                <div className="h-px flex-1 bg-primary/30"></div>
                <div className="text-[10px] font-bold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  const caps = [
    {
      tag: "ADAPTATION",
      title: "Real-time policy adaptation",
      desc: "Actors update their decision policy mid-engagement. By the third turn, the adversary you trained against is not the adversary you face.",
    },
    {
      tag: "COORDINATION",
      title: "Hierarchical multi-actor coordination",
      desc: "Squads, platoons, fleets. Actors negotiate, delegate, and form ad-hoc command structures without a centralized scheduler.",
    },
    {
      tag: "EXPLAINABILITY",
      title: "Attribution-grade decision logs",
      desc: "Every action is traceable to the goals, observations, and counterfactuals that produced it. Audit-ready by default.",
    },
    {
      tag: "RESILIENCE",
      title: "Degraded-mode operations",
      desc: "Actors gracefully shed capability under sensor loss, comms outage, or policy contamination — never silent-failing.",
    },
  ];

  return (
    <section className="relative border-b border-white/5 px-6 py-32 lg:px-10">
      <div className="absolute inset-0 bg-tactical-grid-fine opacity-30 pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl">
        <SectionLabel index="03" label="Core Capabilities" />

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {caps.map((c) => (
            <article
              key={c.tag}
              className="corner-brackets relative border border-white/10 bg-white/[0.02] p-8 transition hover:border-primary/50"
            >
              <span className="corner-bl"></span>
              <span className="corner-br"></span>
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Variants() {
  const v = [
    { name: "RECON", role: "Scout / Pattern-of-life" },
    { name: "STRIKE", role: "Effects / Engagement" },
    { name: "LOGI", role: "Resource flow" },
    { name: "SENTINEL", role: "Defensive posture" },
    { name: "ANALYST", role: "Decision support" },
    { name: "MEDIC", role: "Casualty triage" },
    { name: "COMMS", role: "Network relay" },
    { name: "COMMAND", role: "Coordination" },
  ];

  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-black px-6 py-32 lg:px-10">
      <div className="absolute inset-0 bg-tactical-grid opacity-50 pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl">
        <SectionLabel index="04" label="Actor Variants" />

        <div className="mt-12 max-w-3xl">
          <h2
            className={`${exo.className} text-4xl font-black leading-[1.05] sm:text-5xl`}
          >
            Drop-in roles.
            <br />
            <span className="text-primary">Tuned for the mission.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted">
            Each variant is a pre-trained policy shell with role-specific
            sensors, tools, and reward shaping. Compose them, swap them, or
            train your own.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {v.map((x) => (
            <div
              key={x.name}
              className="corner-brackets relative border border-white/10 bg-white/[0.02] p-5 transition hover:border-primary/50"
            >
              <span className="corner-bl"></span>
              <span className="corner-br"></span>
              <div
                className={`${exo.className} text-xl font-black tracking-wider text-primary`}
              >
                {x.name}
              </div>
              <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                {x.role}
              </div>
              <div className="mt-4 h-px w-full bg-gradient-to-r from-primary/60 via-primary/20 to-transparent"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ActorCTA() {
  return (
    <section className="relative px-6 py-32 lg:px-10">
      <div className="absolute inset-0 bg-spotlight"></div>
      <div className="relative mx-auto max-w-4xl text-center">
        <h2
          className={`${exo.className} text-4xl font-black leading-[1.05] sm:text-6xl`}
        >
          Inspect the Actor.
          <br />
          <span className="text-primary">Then deploy a thousand.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted">
          Spin up a sandbox in your environment. We&apos;ll seed it with the
          base actor library and a starter scenario.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="btn-tactical btn-glow group relative inline-flex items-center justify-center gap-3 rounded-lg border border-primary/70 bg-primary/8 px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-primary transition hover:border-primary hover:bg-primary/18"
          >
            Request Sandbox Access
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
          <Link
            href="/#rehearse"
            className="btn-tactical group inline-flex items-center justify-center gap-3 rounded-lg border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-foreground transition hover:border-primary hover:bg-primary/10"
          >
            Run a Live Rehearsal
          </Link>
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
