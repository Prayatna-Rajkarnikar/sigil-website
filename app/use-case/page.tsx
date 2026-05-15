import Link from "next/link";
import { exo } from "@/app/font";
import { BlobBackdrop } from "@/component/SectionBackdrops";

export default function UseCasePage() {
  const steps = [
    {
      title: "Situation",
      content:
        "E-commerce platform experiencing 40% cart abandonment rate during checkout.",
    },
    {
      title: "Actor Involved",
      content: "AI Agent: Dynamic Pricing Optimizer",
    },
    {
      title: "Decision Made",
      content:
        "Agent detects price sensitivity at checkout and applies a strategic 8% discount to high-value carts.",
      showFlow: true,
    },
    {
      title: "Environmental Impact",
      content:
        "Cart abandonment reduced to 22%. Revenue increased by 15% over 30 days.",
      showMetrics: true,
    },
  ];

  return (
    <>
      <UseHero />
      <main className="relative overflow-hidden px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
        <BlobBackdrop />
        <div className="absolute inset-0 bg-tactical-grid-fine opacity-30 pointer-events-none"></div>

        <div className="relative mx-auto max-w-5xl">
          {/* Use case card header */}
          <div className="corner-brackets relative border border-primary/40 bg-background/60 p-6 backdrop-blur-sm sm:p-8 lg:p-10">
            <span className="corner-bl"></span>
            <span className="corner-br"></span>

            <div className="absolute -top-2.5 left-4 flex items-center gap-2 bg-background px-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary sm:left-6">
              <span className="h-1.5 w-1.5 bg-primary"></span>
              Case File · Dynamic Pricing
            </div>

            <h2
              className={`${exo.className} text-2xl font-black text-foreground sm:text-3xl lg:text-4xl`}
            >
              Use Case: Dynamic Pricing Agent
            </h2>
            <p className="mt-2 text-sm text-muted sm:text-base">
              E-commerce checkout optimization
            </p>
          </div>

          {/* Steps timeline */}
          <div className="mt-8 space-y-4">
            {steps.map((s, idx) => (
              <div key={idx} className="relative">
                <Step index={idx + 1} title={s.title} content={s.content}>
                  {s.showFlow && <DecisionFlow />}
                  {s.showMetrics && <Metrics />}
                </Step>

                {/* Connector line between steps */}
                {idx < steps.length - 1 && (
                  <div className="flex justify-center py-2">
                    <div className="h-6 w-px bg-primary/40"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Closing note */}
          <div className="corner-brackets relative mt-10 border border-primary/30 bg-white/[0.02] p-6 sm:mt-12 sm:p-8">
            <span className="corner-bl"></span>
            <span className="corner-br"></span>
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-3">
              Continuous Learning
            </div>
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              The agent continuously learns from each decision outcome,
              refining its pricing strategy to maximize both conversion rates
              and revenue over time.
            </p>
          </div>
        </div>
      </main>
      <CTA />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO
   ───────────────────────────────────────────────────────────── */
function UseHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-background scanlines">
      <BlobBackdrop />
      <div className="absolute inset-0 bg-tactical-grid opacity-60 pointer-events-none"></div>
      <div className="absolute inset-0 bg-spotlight pointer-events-none"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-12 sm:pt-32 sm:pb-16 lg:px-10">
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
          <span className="h-1.5 w-1.5 bg-primary"></span>
          Use Case
        </div>
        <h1
          className={`${exo.className} mt-5 text-3xl font-black leading-[1] tracking-tight text-foreground sm:mt-6 sm:text-5xl lg:text-7xl`}
        >
          Agentic Decision
          <br />
          <span className="text-glow-primary text-primary">Modeling.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:mt-6 sm:text-lg">
          A real-world demonstration of how a Sigil actor perceives, decides,
          and acts inside a live commercial environment.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   STEP — numbered card with optional embedded sub-section
   ───────────────────────────────────────────────────────────── */
function Step({
  index,
  title,
  content,
  children,
}: {
  index: number;
  title: string;
  content: string;
  children?: React.ReactNode;
}) {
  return (
    <article className="corner-brackets relative border border-white/10 bg-white/[0.02] p-5 sm:p-6 lg:p-8">
      <span className="corner-bl"></span>
      <span className="corner-br"></span>

      <div className="flex items-start gap-4 sm:gap-5">
        <div className="flex h-10 w-10 flex-none items-center justify-center border-2 border-primary bg-primary/10 sm:h-12 sm:w-12">
          <span
            className={`${exo.className} text-base font-black text-primary sm:text-xl`}
          >
            {String(index).padStart(2, "0")}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={`${exo.className} text-lg font-black leading-tight text-foreground sm:text-xl lg:text-2xl`}
          >
            {title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
            {content}
          </p>
        </div>
      </div>

      {children && (
        <div className="mt-6 border-t border-white/10 pt-6">{children}</div>
      )}
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────
   DECISION FLOW — Monitor → Analyze → Decide → Execute
   ───────────────────────────────────────────────────────────── */
function DecisionFlow() {
  const flow = [
    {
      num: "1",
      title: "Monitor",
      desc: "Track user behavior and cart value in real-time.",
    },
    {
      num: "2",
      title: "Analyze",
      desc: "Detect abandonment signals and calculate optimal intervention.",
    },
    {
      num: "3",
      title: "Decide",
      desc: "Apply dynamic discount based on cart value and user segment.",
    },
    {
      num: "4",
      title: "Execute",
      desc: "Present personalized offer and track conversion outcome.",
    },
  ];

  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-5">
        Agent Decision Flow
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {flow.map((f) => (
          <div
            key={f.num}
            className="border border-white/10 bg-black/40 p-4"
          >
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full border border-primary bg-primary/10 text-xs font-black text-primary">
              {f.num}
            </div>
            <div
              className={`${exo.className} text-sm font-black uppercase tracking-wider text-foreground`}
            >
              {f.title}
            </div>
            <div className="mt-1 text-xs leading-relaxed text-muted">
              {f.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   IMPACT METRICS — before / after / delta
   ───────────────────────────────────────────────────────────── */
function Metrics() {
  const metrics = [
    { label: "Cart Abandonment", before: "40%", after: "22%", change: "−45%" },
    { label: "Conversion Rate", before: "2.3%", after: "3.8%", change: "+65%" },
    { label: "Revenue Impact", before: "$125K", after: "$144K", change: "+15%" },
  ];
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-5">
        Impact Metrics
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {metrics.map((m) => (
          <div key={m.label} className="border border-primary/30 bg-black/40 p-5">
            <div className="border-b border-white/10 pb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-muted">
              {m.label}
            </div>
            <div className="mt-3">
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted">
                Before
              </div>
              <div
                className={`${exo.className} text-xl font-black text-muted line-through`}
              >
                {m.before}
              </div>
            </div>
            <div className="mt-3 border-t border-dashed border-white/10 pt-3">
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted">
                After
              </div>
              <div
                className={`${exo.className} text-2xl font-black text-foreground`}
              >
                {m.after}
              </div>
            </div>
            <div className="mt-3 inline-block bg-primary px-2 py-1 text-xs font-black tracking-wider text-background">
              Δ {m.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CTA
   ───────────────────────────────────────────────────────────── */
function CTA() {
  return (
    <section className="relative overflow-hidden px-6 py-20 sm:py-24 lg:px-10">
      <BlobBackdrop />
      <div className="absolute inset-0 bg-spotlight pointer-events-none"></div>
      <div className="relative mx-auto max-w-3xl">
        <h2
          className={`${exo.className} text-2xl font-black leading-tight text-foreground sm:text-4xl lg:text-5xl`}
        >
          Different scenario?
          <br />
          <span className="text-primary">Tell us about it.</span>
        </h2>
        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
          <Link
            href="/contact"
            className="btn-tactical btn-glow inline-flex items-center justify-center gap-3 rounded-lg border border-primary/70 bg-primary/8 px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-primary transition hover:border-primary hover:bg-primary/18 sm:px-7 sm:text-sm sm:tracking-[0.2em]"
          >
            Contact Us
            <span>→</span>
          </Link>
          <Link
            href="/"
            className="btn-tactical inline-flex items-center justify-center gap-3 rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-foreground transition hover:border-primary hover:bg-primary/10 sm:px-7 sm:text-sm sm:tracking-[0.2em]"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
