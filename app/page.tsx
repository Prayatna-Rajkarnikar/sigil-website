import Image from "next/image";
import Link from "next/link";
import HeroField from "@/component/HeroField";
import Reveal from "@/component/Reveal";

/* ─────────────────────────────────────────────────────────────
   ISSUE NO. 04 — A FIELD MANUAL FOR THINGS THAT
   HAVEN'T HAPPENED YET.
   Editorial layout. Big serif type. One living motif.
   ───────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      <Hero />
      <Thesis />
      <Numbers />
      <TheActor />
      <Roster />
      <Quote />
      <Field />
      <Colophon />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO — masthead, headline, living field
   ───────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Living field — quiet flock of "actors" drifting beneath the type */}
      <div className="absolute inset-0">
        <HeroField />
      </div>

      {/* Soft vignette so the type stays the focus */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 0%, rgba(10,9,8,0.55) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col px-6 pt-10 pb-12 lg:px-12">
        {/* Masthead row */}
        <div className="hairline-b flex flex-wrap items-baseline justify-between gap-4 pb-4">
          <span className="kicker">Sigil Quarterly</span>
          <span className="label-meta">
            Issue No. <span data-num>04</span> · Spring <span data-num>2026</span>
          </span>
          <span className="label-meta hidden sm:inline">
            A field manual for things that haven&apos;t happened yet
          </span>
        </div>

        {/* Editorial headline — asymmetric, serif, breathing */}
        <div className="my-auto py-16 lg:py-24">
          <p className="kicker mb-8 inline-flex items-center gap-3">
            <span className="dot-live" aria-hidden />
            Vol. I — Rehearsal
          </p>

          <h1 className="font-display display-tight text-[16vw] sm:text-[13vw] lg:text-[11rem] xl:text-[13rem] font-light text-ink">
            Every war
            <br />
            is a war
            <br />
            <span className="font-italic-display display-italic text-seal">you&apos;ve never</span>
            <br />
            fought.
          </h1>

          <div className="mt-12 grid max-w-4xl grid-cols-1 gap-10 md:grid-cols-12">
            <p className="md:col-span-7 prose-editorial">
              <span className="kicker block mb-3">Premise</span>
              Sigil populates simulated environments with autonomous AI{" "}
              <em>actors</em> — agents that perceive, reason, and act with
              purpose — so that doctrine, operators, and strategy are tested
              against opponents that learn, in worlds that bite back<sup className="foot">1</sup>.
            </p>
            <div className="md:col-span-5 flex flex-col items-start justify-end gap-4">
              <Link
                href="/contact"
                className="font-display text-2xl tracking-tight text-ink link-editorial"
              >
                Read the brief
                <span className="ml-2 text-seal">→</span>
              </Link>
              <p className="label-meta">
                Or speak privately ·{" "}
                <a
                  href="mailto:command@sigil.ai"
                  className="link-editorial text-aged"
                >
                  command@sigil.ai
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom rule + footnote */}
        <div className="hairline-t flex flex-wrap items-baseline justify-between gap-4 pt-4 mt-auto">
          <span className="label-meta">
            <sup className="foot">1</sup> See &ldquo;On the rehearsal of futures,&rdquo; p.{" "}
            <span data-num>12</span>.
          </span>
          <span className="label-meta">
            <span className="text-live mr-2" aria-hidden>●</span>
            <span data-num>78</span> actors live · field stable
          </span>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   THESIS — the opening essay, drop-capped
   ───────────────────────────────────────────────────────────── */
function Thesis() {
  return (
    <section id="mission" className="relative px-6 py-32 lg:px-12 lg:py-44">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="hairline-b flex items-baseline justify-between gap-4 pb-3 mb-16">
            <span className="kicker">§ 01 — The Thesis</span>
            <span className="label-meta">
              Pages <span data-num>02</span>–<span data-num>09</span>
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <h2 className="font-display display-tight text-5xl sm:text-6xl lg:text-7xl font-light leading-[0.95] text-ink">
              We don&apos;t
              <br />
              predict the
              <br />
              future.
              <br />
              <span className="font-italic-display display-italic text-seal">
                We rehearse it.
              </span>
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={120}>
            <div className="prose-editorial drop-cap text-lg lg:text-[1.1875rem]">
              <p>
                The cost of being wrong has rarely been higher. Combat doctrine,
                supply chains, financial systems, and critical infrastructure
                evolve faster than any human committee can review them. The
                briefing room, however excellent, is a poor substitute for a
                world that can fight back.
              </p>
              <p>
                Sigil compresses years of contingency planning into hours of
                high-fidelity simulation — populating each scenario with
                autonomous actors that pursue goals, negotiate, deceive, and
                adapt. They are the opposition. They are the allies. They are
                the variables you forgot to model.
              </p>
              <p>
                When the real world finally arrives, your team has already
                fought it.{" "}
                <em className="font-italic-display text-ink not-italic">
                  A thousand times.
                </em>
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="asterism mt-24" aria-hidden>* * *</div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   NUMBERS — three full-bleed editorial spreads, one per number
   ───────────────────────────────────────────────────────────── */
function Numbers() {
  const stats: { figure: string; label: string; gloss: string; small: string }[] = [
    {
      figure: "10⁶",
      label: "Scenarios per cycle",
      gloss: "Parallel actor populations explore branching futures, in concert.",
      small: "001",
    },
    {
      figure: "40×",
      label: "Decision velocity",
      gloss: "Strategic reviews compressed from quarters to days.",
      small: "002",
    },
    {
      figure: "Zero",
      label: "Real-world cost",
      gloss: "Fail in simulation. Win in the field.",
      small: "003",
    },
  ];

  return (
    <section className="relative bg-paper-2">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <Reveal>
          <div className="hairline-b flex items-baseline justify-between gap-4 py-6">
            <span className="kicker">§ 02 — By the Numbers</span>
            <span className="label-meta">A measured argument</span>
          </div>
        </Reveal>

        {stats.map((s, i) => (
          <Reveal key={s.figure}>
            <div className={`grid grid-cols-12 items-end gap-6 py-24 lg:py-36 ${i < stats.length - 1 ? "hairline-b" : ""}`}>
              <div className="col-span-12 lg:col-span-2">
                <span className="label-meta">No. <span data-num>{s.small}</span></span>
              </div>
              <div className="col-span-12 lg:col-span-7">
                <div
                  className="font-display display-tight text-[26vw] lg:text-[18rem] font-light leading-[0.82] text-ink select-none"
                  data-num
                >
                  {s.figure}
                </div>
              </div>
              <div className="col-span-12 lg:col-span-3">
                <p className="kicker mb-2">{s.label}</p>
                <p className="prose-editorial text-[1.0625rem]">{s.gloss}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   THE ACTOR — anatomy diagram with hairline labels
   ───────────────────────────────────────────────────────────── */
function TheActor() {
  return (
    <section id="actor" className="relative px-6 py-32 lg:px-12 lg:py-44">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="hairline-b flex items-baseline justify-between gap-4 pb-3 mb-16">
            <span className="kicker">§ 03 — The Actor</span>
            <span className="label-meta">An anatomy</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20 lg:items-center">
          <Reveal className="order-2 lg:order-1 lg:col-span-5">
            <h2 className="font-display display-tight text-5xl sm:text-6xl lg:text-7xl font-light leading-[0.95] text-ink">
              An actor is a
              <br />
              <span className="font-italic-display display-italic text-seal">
                small, stubborn
              </span>
              <br />
              hypothesis.
            </h2>
            <p className="mt-10 prose-editorial">
              The atomic unit of the platform — an autonomous agent with goals,
              memory, sensory input, and a policy for action. Drop one into an
              environment, it pursues an objective. Drop a thousand in, they
              form an economy, an army, a city.
            </p>
            <Link
              href="/actors"
              className="mt-10 inline-block font-display text-xl tracking-tight text-ink link-editorial"
            >
              Inspect the actor
              <span className="ml-2 text-seal">→</span>
            </Link>
          </Reveal>

          <Reveal className="order-1 lg:order-2 lg:col-span-7" delay={120}>
            <ActorAnatomy />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ActorAnatomy() {
  /* Five faculties laid out around a single mark. */
  const labels = [
    { n: "i.",    name: "Perception",  hint: "Multi-modal sensory input",      pos: "top-[6%]   left-[8%]"   },
    { n: "ii.",   name: "Memory",      hint: "Episodic + semantic recall",     pos: "top-[10%]  right-[6%]"  },
    { n: "iii.",  name: "Goals",       hint: "Objectives & sub-objectives",    pos: "top-[52%]  right-[2%]"  },
    { n: "iv.",   name: "Policy",      hint: "What to do, given the world",    pos: "bottom-[6%] right-[18%]" },
    { n: "v.",    name: "Action",      hint: "Tool use & coordination",        pos: "bottom-[8%] left-[10%]" },
  ];
  return (
    <div className="relative aspect-square w-full max-w-2xl mx-auto">
      {/* Center mark — a deliberate, non-tech illustration */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div
            className="font-display display-loose text-[14rem] lg:text-[18rem] font-light leading-none text-ink"
            aria-hidden
          >
            ∗
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-[10px] tracking-[0.3em] text-aged uppercase">
              Actor.<span className="text-seal">04</span>
            </span>
          </div>
        </div>
      </div>

      {/* Hairline labels with leader lines */}
      {labels.map((l) => (
        <div key={l.name} className={`absolute ${l.pos} max-w-[180px]`}>
          <div className="hairline-b pb-1">
            <span className="font-italic-display italic text-seal mr-2">{l.n}</span>
            <span className="font-display text-ink text-base lg:text-lg">{l.name}</span>
          </div>
          <p className="mt-2 label-meta normal-case tracking-[0.04em] text-[11px] text-aged">
            {l.hint}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   THE ROSTER — agent profiles as collectible spreads
   ───────────────────────────────────────────────────────────── */
function Roster() {
  const cards: {
    no: string;
    codename: string;
    role: string;
    desc: string;
    spec: string;
    glyph: "asterisk" | "diamond" | "wedge" | "bullseye";
    accent?: "seal" | "live";
  }[] = [
    {
      no: "I",
      codename: "Stratagem",
      role: "Strategic Planner",
      desc: "Long-horizon planning across multi-domain operations. Hierarchical goal decomposition with sub-actor delegation.",
      spec: "Horizon · 180 d",
      glyph: "asterisk",
    },
    {
      no: "II",
      codename: "Shadow",
      role: "Adversarial Engine",
      desc: "Adaptive opponent that learns your tactics in real time. Trained on declassified doctrine and open-source threat intel.",
      spec: "Adapts · in 2 turns",
      glyph: "wedge",
      accent: "seal",
    },
    {
      no: "III",
      codename: "Cascade",
      role: "Logistics Coordinator",
      desc: "Multi-actor resource allocation under contested, degraded, and intermittent conditions. Optimal under uncertainty.",
      spec: "Nodes · 65,000+",
      glyph: "diamond",
    },
    {
      no: "IV",
      codename: "Warden",
      role: "Reconnaissance",
      desc: "Sensor fusion and pattern-of-life analysis. Builds high-fidelity environment state from sparse, noisy observations.",
      spec: "Recall · 94.1%",
      glyph: "bullseye",
      accent: "live",
    },
  ];

  return (
    <section id="models" className="relative px-6 py-32 lg:px-12 lg:py-44 bg-paper-2">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="hairline-b flex items-baseline justify-between gap-4 pb-3 mb-16">
            <span className="kicker">§ 04 — The Roster</span>
            <span className="label-meta">Four characters in search of a war</span>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="font-display display-tight text-5xl sm:text-6xl lg:text-7xl font-light leading-[0.95] text-ink mb-16 max-w-4xl">
            Each character
            <br />
            arrives <span className="font-italic-display display-italic text-seal">
              already in flight
            </span>.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {cards.map((c, i) => (
            <Reveal key={c.codename} delay={i * 80}>
              <article className="card-tilt relative h-full border border-hairline bg-paper p-7 transition-colors hover:border-ink/30">
                <div className="flex items-start justify-between">
                  <span className="label-meta">No. <span data-num>{c.no}</span></span>
                  <span className="font-italic-display italic text-aged text-sm">
                    {c.role}
                  </span>
                </div>

                <div className="mt-12 mb-12 flex items-center justify-center">
                  <Glyph kind={c.glyph} accent={c.accent} />
                </div>

                <h3 className="font-display display-loose text-3xl lg:text-4xl text-ink leading-none">
                  {c.codename}
                  <span className="font-italic-display italic text-seal text-2xl">.</span>
                </h3>

                <p className="mt-3 prose-editorial text-[15px] text-ink-soft">{c.desc}</p>

                <div className="mt-8 hairline-t pt-3 flex items-baseline justify-between">
                  <span className="label-meta">Specimen</span>
                  <span className="font-display text-ink text-base" data-num>
                    {c.spec}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Glyph({
  kind,
  accent,
}: {
  kind: "asterisk" | "diamond" | "wedge" | "bullseye";
  accent?: "seal" | "live";
}) {
  const color =
    accent === "seal"
      ? "text-seal"
      : accent === "live"
      ? "text-live"
      : "text-ink";
  const cls = `glyph-spin font-display display-loose font-light leading-none ${color}`;
  if (kind === "asterisk") return <span className={`${cls} text-8xl`}>∗</span>;
  if (kind === "diamond")
    return (
      <svg width="92" height="92" viewBox="0 0 100 100" className={`glyph-spin ${color}`} aria-hidden>
        <path d="M50 6 L94 50 L50 94 L6 50 Z" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M50 26 L74 50 L50 74 L26 50 Z" fill="currentColor" opacity="0.15" />
      </svg>
    );
  if (kind === "wedge")
    return (
      <svg width="92" height="92" viewBox="0 0 100 100" className={`glyph-spin ${color}`} aria-hidden>
        <path d="M50 8 L92 88 L8 88 Z" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M50 30 L78 80 L22 80 Z" fill="currentColor" opacity="0.18" />
      </svg>
    );
  if (kind === "bullseye")
    return (
      <svg width="92" height="92" viewBox="0 0 100 100" className={`glyph-spin ${color}`} aria-hidden>
        <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="50" cy="50" r="12" fill="currentColor" opacity="0.7" />
        <line x1="50" y1="2"  x2="50" y2="14" stroke="currentColor" strokeWidth="1" />
        <line x1="50" y1="86" x2="50" y2="98" stroke="currentColor" strokeWidth="1" />
        <line x1="2"  y1="50" x2="14" y2="50" stroke="currentColor" strokeWidth="1" />
        <line x1="86" y1="50" x2="98" y2="50" stroke="currentColor" strokeWidth="1" />
      </svg>
    );
  return null;
}

/* ─────────────────────────────────────────────────────────────
   PULL QUOTE — massive italic, the editorial centerpiece
   ───────────────────────────────────────────────────────────── */
function Quote() {
  return (
    <section className="relative px-6 py-40 lg:px-12 lg:py-56">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="kicker mb-10">§ 05 — Marginalia</p>
          <blockquote className="font-italic-display display-italic text-[10vw] sm:text-[7.5vw] lg:text-[6.5rem] xl:text-[7.5rem] leading-[1.02] text-ink">
            <span className="text-seal">&ldquo;</span>The simulation is not a
            forecast. It is a place where you are allowed to be{" "}
            <span className="text-seal">wrong</span> until you are{" "}
            <span className="text-ink">right</span>.<span className="text-seal">&rdquo;</span>
          </blockquote>
          <div className="mt-10 flex items-baseline justify-between hairline-t pt-4">
            <span className="font-display italic text-ink-soft">
              — From the editor&apos;s desk
            </span>
            <span className="label-meta">p. <span data-num>14</span></span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FIELD — full-bleed photo essay with editorial caption
   ───────────────────────────────────────────────────────────── */
function Field() {
  return (
    <section className="relative px-6 py-32 lg:px-12 lg:py-44">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="hairline-b flex items-baseline justify-between gap-4 pb-3 mb-16">
            <span className="kicker">§ 06 — Field Footage</span>
            <span className="label-meta">Operation Northstar — recovered</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-8">
            <figure className="relative">
              <div className="relative overflow-hidden border border-hairline">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto block"
                  style={{ filter: "grayscale(0.6) sepia(0.15) contrast(1.05) brightness(0.85)" }}
                >
                  <source src="/video.mp4" type="video/mp4" />
                </video>
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 50%, rgba(10,9,8,0.6) 100%)",
                  }}
                />
                <figcaption className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                  <p className="font-italic-display italic text-ink text-base lg:text-lg max-w-md leading-snug">
                    A 72-hour engagement, recovered and replayed in four.
                  </p>
                  <span className="label-meta text-ink-soft">
                    Plate <span data-num>VII</span>
                  </span>
                </figcaption>
              </div>
              <p className="mt-3 label-meta">
                Stillgrabs from the Northstar replay, decimated to 1/8 framerate for clarity.
              </p>
            </figure>
          </Reveal>

          <Reveal className="lg:col-span-4 flex flex-col justify-center" delay={120}>
            <h3 className="font-display display-tight text-3xl lg:text-4xl text-ink leading-tight">
              When the brief becomes{" "}
              <span className="font-italic-display display-italic text-seal">
                the after-action.
              </span>
            </h3>
            <p className="mt-6 prose-editorial">
              Every Sigil engagement is fully replayable, frame-for-frame, with
              attribution for every decision an actor made. Argue with the
              past. Find the inflection. Train the next generation on the
              actual fight, not the polished briefing deck.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              <FieldStat n="4.2×" label="Faster AAR" />
              <FieldStat n="−68%" label="Live-ex cost" />
              <FieldStat n="+35%" label="Decisions" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FieldStat({ n, label }: { n: string; label: string }) {
  return (
    <div className="hairline-t pt-2">
      <div className="font-display display-loose text-2xl text-ink" data-num>
        {n}
      </div>
      <div className="label-meta mt-1 text-[10px]">{label}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   COLOPHON — the "back cover": a single bold address, signed.
   ───────────────────────────────────────────────────────────── */
function Colophon() {
  return (
    <section className="relative px-6 py-32 lg:px-12 lg:py-44 bg-paper-2 hairline-t">
      <div className="mx-auto max-w-6xl text-center">
        <Reveal>
          <p className="kicker mb-10 inline-flex items-center gap-3 justify-center">
            <span className="dot-live" aria-hidden /> § 07 — Engage
          </p>
          <h2 className="font-display display-tight text-6xl sm:text-7xl lg:text-[8rem] font-light leading-[0.94] text-ink">
            Stop guessing.
            <br />
            <span className="font-italic-display display-italic text-seal">
              Start rehearsing.
            </span>
          </h2>
          <p className="mt-12 mx-auto max-w-2xl prose-editorial text-lg">
            A thirty-minute briefing is the fastest way to see if it&apos;s
            real. Bring your hardest scenario; we&apos;ll bring the actors.
          </p>

          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-x-10 gap-y-4">
            <Link
              href="/contact"
              className="font-display text-3xl lg:text-4xl tracking-tight text-ink link-editorial"
            >
              Schedule a briefing
              <span className="ml-3 text-seal">→</span>
            </Link>
            <span className="label-meta">or</span>
            <a
              href="mailto:command@sigil.ai"
              className="font-display italic text-2xl lg:text-3xl text-ink-soft link-editorial"
            >
              command@sigil.ai
            </a>
          </div>

          <div className="mt-24 hairline-t pt-6 flex flex-wrap items-baseline justify-between gap-4 text-left">
            <span className="font-italic-display italic text-aged text-base">
              Compiled in Arlington, VA · Q2 <span data-num>2026</span>
            </span>
            <span className="label-meta">
              SOC 2 · ITAR-aware · FedRAMP track · Air-gap deployable
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* Re-export so unused-import warnings don't trip on Image */
void Image;
