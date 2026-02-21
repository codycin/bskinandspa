import { useEffect, useMemo, useState } from "react";

type Section = {
  id: string;
  label: string;
  description?: string;
};

export default function Services() {
  const sections: Section[] = useMemo(
    () => [
      {
        id: "teeth",
        label: "Teeth Whitening",
        description: "Brightening treatments and aftercare.",
      },
      {
        id: "skin",
        label: "Skin Treatments",
        description: "Customized services for your skin goals.",
      },

      // Skin sub-services (6)
      { id: "skin-facials", label: "Facials" },
      { id: "skin-dermaplaning", label: "Dermaplaning" },
      { id: "skin-chemical-peels", label: "Chemical Peels" },
      { id: "skin-microneedling", label: "Microneedling" },
      { id: "skin-led", label: "LED Therapy" },
      { id: "skin-acne", label: "Acne Program" },

      {
        id: "microblading",
        label: "Microblading",
        description: "Brow artistry + touch-up schedule.",
      },
    ],
    [],
  );

  // Scrollspy: track which section is currently in view
  const [activeId, setActiveId] = useState<string>("teeth");

  useEffect(() => {
    const ids = sections.map((s) => s.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0),
          )[0];

        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      {
        // Tune this based on your header height (you have a fixed h-16 navbar)
        root: null,
        threshold: [0.15, 0.25, 0.5],
        rootMargin: "-80px 0px -65% 0px", // top offset + prefer the section near top
      },
    );

    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sections]);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    // If you have a fixed navbar, you want scroll offset. Easiest: use scroll-mt on sections.
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Grouping: main categories + skin sub-services
  const main = sections.filter((s) =>
    ["teeth", "skin", "microblading"].includes(s.id),
  );
  const skinSubs = sections.filter((s) => s.id.startsWith("skin-"));

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-24 pb-16 ">
      {/* Mobile Table of Contents */}
      <div className="md:hidden mt-6 rounded-2xl border border-border bg-card/70 backdrop-blur overflow-hidden mb-8">
        <div className="px-4 py-3 border-b border-border">
          <h2 className="text-sm font-semibold text-ink">Jump to a service</h2>
        </div>

        <nav className="flex flex-col">
          {[
            { id: "teeth", label: "Teeth" },
            { id: "skin", label: "Skin" },
            { id: "microblading", label: "Microblading" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                document
                  .getElementById(item.id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              className="text-left px-4 py-3 text-sm font-medium text-muted
                   transition border-b border-border last:border-b-0
                   hover:text-ink hover:bg-primary/30"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
        {/* Sticky side nav (desktop) */}
        <aside className="hidden md:block">
          <div className="sticky top-24 rounded-2xl border border-border bg-card/70 backdrop-blur p-4">
            <div className="mb-3">
              <div className="text-sm font-semibold text-ink">Services</div>
              <div className="text-xs text-muted mt-1">Jump to a section</div>
            </div>

            <nav className="space-y-1">
              {main.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goTo(s.id)}
                  className={[
                    "w-full text-left rounded-xl px-3 py-2 text-sm transition",
                    activeId === s.id
                      ? "bg-primary/10 text-ink"
                      : "text-muted hover:text-ink hover:bg-card/60",
                  ].join(" ")}
                >
                  {s.label}
                </button>
              ))}

              <div className="mt-4 pt-3 border-t border-border">
                <div className="text-xs font-semibold text-muted px-3 mb-2">
                  Skin Treatments
                </div>
                <div className="space-y-1">
                  {skinSubs.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => goTo(s.id)}
                      className={[
                        "w-full text-left rounded-xl px-3 py-2 text-sm transition",
                        activeId === s.id
                          ? "bg-primary/10 text-ink"
                          : "text-muted hover:text-ink hover:bg-card/60",
                      ].join(" ")}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="space-y-10">
          {/* Top hero */}
          <header className="rounded-3xl border border-border bg-card/60 backdrop-blur p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-semibold text-ink">
              Services
            </h1>
          </header>

          {/* Teeth */}
          <section id="teeth" className="scroll-mt-24">
            <ServiceCard
              title="Teeth Whitening"
              subtitle="Brighten your smile with safe, effective whitening."
              bullets={[
                "Ideal for events or ongoing maintenance",
                "Aftercare guidance included",
                "Discuss sensitivity and goals before we begin",
              ]}
            />
          </section>

          {/* Skin main */}
          <section id="skin" className="scroll-mt-24">
            <ServiceCard
              title="Skin Treatments"
              subtitle="You’re already radiant on the inside, let your skin match."
              bullets={[
                "Personalized plan based on your skin goals",
                "Professional-grade products + techniques",
                "Results-focused with comfort in mind",
              ]}
            />
          </section>

          {/* Skin sub-services */}
          <section id="skin-facials" className="scroll-mt-24">
            <MiniService
              title="Facials"
              text="Deep cleanse, exfoliation, extractions (as needed), and hydration."
            />
          </section>
          <section id="skin-dermaplaning" className="scroll-mt-24">
            <MiniService
              title="Dermaplaning"
              text="Gentle exfoliation to smooth texture and enhance product absorption."
            />
          </section>
          <section id="skin-chemical-peels" className="scroll-mt-24">
            <MiniService
              title="Chemical Peels"
              text="Refine tone and texture with tailored peel strength and aftercare."
            />
          </section>
          <section id="skin-microneedling" className="scroll-mt-24">
            <MiniService
              title="Microneedling"
              text="Support collagen for texture, pores, and overall skin resilience."
            />
          </section>
          <section id="skin-led" className="scroll-mt-24">
            <MiniService
              title="LED Therapy"
              text="Calming light therapy to support recovery and reduce inflammation."
            />
          </section>
          <section id="skin-acne" className="scroll-mt-24">
            <MiniService
              title="Acne Program"
              text="Structured approach with consistent treatments + home care coaching."
            />
          </section>

          {/* Microblading */}
          <section id="microblading" className="scroll-mt-24">
            <ServiceCard
              title="Microblading"
              subtitle="Natural-looking brows designed for your face."
              bullets={[
                "Consultation + shape mapping",
                "Aftercare instructions and healing timeline",
                "Touch-up scheduling guidance",
              ]}
            />
          </section>
        </main>
      </div>
    </div>
  );
}

function ServiceCard({
  title,
  subtitle,
  bullets,
}: {
  title: string;
  subtitle: string;
  bullets: string[];
}) {
  return (
    <div className="rounded-3xl border border-border bg-card/60 backdrop-blur p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-semibold text-ink">{title}</h2>
      <p className="mt-2 text-muted">{subtitle}</p>
      <ul className="mt-4 space-y-2 text-sm text-ink/90">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MiniService({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface/60 backdrop-blur p-5">
      <h3 className="text-base font-semibold text-ink">{title}</h3>
      <p className="mt-1 text-sm text-muted">{text}</p>
    </div>
  );
}
