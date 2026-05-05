import { exo } from "@/app/font";
import ContactForm from "./contact-form";

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactGrid />
    </>
  );
}

function ContactHero() {
  return (
    <section className="relative min-h-[40vh] overflow-hidden border-b border-white/5 bg-background scanlines">
      <div className="absolute inset-0 bg-tactical-grid opacity-60"></div>
      <div className="absolute inset-0 bg-spotlight"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-12 lg:px-10">
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
          <span className="h-1.5 w-1.5 bg-primary animate-pulse"></span>
          Contact
        </div>
        <h1
          className={`${exo.className} mt-6 text-5xl font-black leading-[0.95] tracking-tight text-foreground sm:text-7xl`}
        >
          Get in
          <br />
          <span className="text-glow-primary text-primary">touch.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          Demos, questions, partnerships — drop us a note and we&apos;ll route
          it to the right person.
        </p>
      </div>
    </section>
  );
}

function ContactGrid() {
  return (
    <section className="relative border-b border-white/5 px-6 py-24 lg:px-10">
      <div className="absolute inset-0 bg-tactical-grid-fine opacity-30 pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-7">
            <div className="corner-brackets relative border border-primary/40 bg-background/60 p-8 backdrop-blur-sm sm:p-10">
              <span className="corner-bl"></span>
              <span className="corner-br"></span>

              <div className="absolute -top-2.5 left-6 flex items-center gap-2 bg-background px-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                <span className="h-1.5 w-1.5 bg-primary animate-pulse"></span>
                Send a message
              </div>

              <ContactForm />
            </div>
          </div>

          {/* Direct channels */}
          <div className="lg:col-span-5 space-y-6">
            <Channel
              tag="General"
              email="hello@sigil.ai"
              desc="Questions, intros, anything else."
            />
            <Channel
              tag="Sales"
              email="sales@sigil.ai"
              desc="Demo a 30-minute walk-through with our team."
            />
            <Channel
              tag="Press"
              email="press@sigil.ai"
              desc="Media inquiries and interviews."
            />
            <Channel
              tag="Careers"
              email="careers@sigil.ai"
              desc="Open roles across engineering, research, and design."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Channel({
  tag,
  email,
  desc,
}: {
  tag: string;
  email: string;
  desc: string;
}) {
  return (
    <div className="corner-brackets relative border border-white/10 bg-white/[0.02] p-6 transition hover:border-primary/50">
      <span className="corner-bl"></span>
      <span className="corner-br"></span>
      <div className="mb-2 inline-block border border-primary/40 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
        {tag}
      </div>
      <a
        href={`mailto:${email}`}
        className={`${exo.className} block text-xl font-black text-foreground hover:text-primary transition`}
      >
        {email}
      </a>
      <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
    </div>
  );
}

function Compliance() {
  const items = [
    { name: "SOC 2 Type II", note: "Audited annually" },
    { name: "ITAR-aware", note: "U.S. persons only on cleared systems" },
    { name: "FedRAMP track", note: "In-progress authorization" },
    { name: "Air-gap deploy", note: "On-prem and disconnected modes" },
  ];

  return (
    <section className="relative px-6 py-24 lg:px-10">
      <div className="absolute inset-0 bg-tactical-grid opacity-50 pointer-events-none"></div>
      <div className="relative mx-auto max-w-7xl">
        <div className="flex items-center gap-4">
          <div
            className={`${exo.className} text-sm font-black tracking-[0.3em] text-primary`}
          >
            // 02
          </div>
          <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-primary to-transparent"></div>
          <div className="text-[11px] font-bold uppercase tracking-[0.35em] text-muted">
            Compliance
          </div>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((c) => (
            <div
              key={c.name}
              className="border border-white/10 bg-white/[0.02] p-5"
            >
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                <span
                  className={`${exo.className} text-sm font-black uppercase tracking-[0.15em] text-foreground`}
                >
                  {c.name}
                </span>
              </div>
              <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                {c.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
