import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import teethImg from "../assets/TeethWhiteningPicture2.webp";
import skinImg from "../assets/FaceMaskWoman.png";
import electrolysisImg from "../assets/Waxing.jpeg";

type Section = {
  id: string;
  label: string;
  description?: string;
};

type ServiceItem = {
  name: string;
  description: string;
  price?: string; // keep as string so you can do "$125" or "Starting at $..."
  duration?: string; // "50 minutes", "1 hour", etc.
  note?: string; // optional additional detail
};

export default function Services() {
  const navigate = useNavigate();

  const sections: Section[] = useMemo(
    () => [
      {
        id: "teeth",
        label: "Teeth Whitening",
        description: "Brightening treatments and aftercare.",
      },
      {
        id: "skin",
        label: "Skin",
        description: "Customized services for your skin goals.",
      },

      // Skin sub-sections
      { id: "skin-facials", label: "Facials" },
      { id: "skin-dermaplaning", label: "Dermaplaning" },
      { id: "skin-microneedling", label: "Microneedling" },
      { id: "skin-chemical-peels", label: "Chemical Peels" },

      // Hair removal
      { id: "electrolysis", label: "Electrolysis" },
    ],
    [],
  );

  // Scrollspy
  const [activeId, setActiveId] = useState<string>("teeth");

  useEffect(() => {
    const ids = sections.map((s) => s.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0),
          )[0];

        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      {
        threshold: [0.15, 0.25, 0.5],
        rootMargin: "-80px 0px -65% 0px",
      },
    );

    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sections]);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const main = sections.filter((s) =>
    ["teeth", "skin", "electrolysis"].includes(s.id),
  );

  // ========= DATA =========

  const TEETH: ServiceItem[] = [
    {
      name: "Teeth Whitening",
      description:
        "Tired of yellow or stained teeth? This treatment can whiten your teeth 4–7 shades in one visit. We offer different strengths depending on tooth and gum sensitivities.",
      price: "$125",
      duration: "90 minutes",
      note: "2nd treatment (if needed): $99 • 60 minutes",
    },
  ];

  const FACIALS: ServiceItem[] = [
    {
      name: "Skin Brightening Facial",
      description:
        "For dull or tired skin—designed to brighten, refresh, and restore glow.",
      price: "$85",
      duration: "50 minutes",
    },
    {
      name: "Anti-Aging Facial",
      description:
        "Targets the appearance of fine lines and wrinkles with firming, smoothing support.",
      price: "$85",
      duration: "50 minutes",
    },
    {
      name: "Acne Facial",
      description:
        "Deep cleansing and treatment-focused facial with at-home recommendations to support clearer skin.",
      price: "$85",
      duration: "50 minutes",
    },
    {
      name: "Sensitive Skin Facial",
      description:
        "Gentle, effective products for skin that can’t tolerate harsh ingredients—calm, hydrate, and strengthen.",
      price: "$85",
      duration: "50 minutes",
    },
  ];

  const DERMAPLANING: ServiceItem[] = [
    {
      name: "Dermaplaning Facial",
      description:
        "Combine any custom facial with dermaplaning (manual exfoliation) to remove dead skin cells and peach fuzz. Makeup applies smoother and skincare absorbs better.",
      price: "$125",
      duration: "1 hour",
    },
    {
      name: "Go + Glow (Mini Facial + Dermaplaning)",
      description: "A faster option for instant smoothness and glow.",
      price: "$79",
      duration: "30 minutes",
    },
  ];

  const MICRONEEDLING: ServiceItem[] = [
    {
      name: "Microneedling Treatment",
      description:
        "Also known as collagen induction therapy—supports fine lines, skin tightening, acne scars, and pore appearance.",
      price: "$175",
      duration: "1 hour",
      note: "Recommended monthly for 3–4 months for best results. (Claims about collagen % removed here for compliance/accuracy—add only if you can substantiate clinically.)",
    },
  ];

  const PEELS: ServiceItem[] = [
    {
      name: "Chemical Peels",
      description:
        "Uses a chemical solution to exfoliate and peel layers to improve tone and texture. Can help with fine lines, acne, scars, melasma, freckles, age spots, discoloration, and other concerns.",
      note: "Peel depth is determined by the concern being treated and your skin’s needs.",
    },
  ];

  const ELECTROLYSIS: ServiceItem[] = [
    {
      name: "Electrolysis (Permanent Hair Removal)",
      description:
        "A hair removal method that works on all skin types and hair colors. Targets the root of the hair to permanently destroy it.",
      note: "Number of treatments varies based on density of hair and size of the area.",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-24 pb-16">
      {/* Mobile Table of Contents */}
      <div className="md:hidden mt-6 rounded-2xl border border-border bg-card/70 backdrop-blur overflow-hidden mb-8">
        <div className="px-4 py-3 border-b border-border">
          <h2 className="text-sm font-semibold text-ink">Jump to a service</h2>
        </div>

        <nav className="flex flex-col">
          {[
            { id: "teeth", label: "Teeth" },
            { id: "skin", label: "Skin" },
            { id: "electrolysis", label: "Electrolysis" },
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
                   hover:text-ink hover:bg-primary/30 "
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
                    "w-full text-left rounded-xl px-3 py-2 text-sm transition cursor-pointer",
                    activeId === s.id
                      ? "bg-primary/10 text-ink"
                      : "text-muted hover:text-ink hover:bg-card/60",
                  ].join(" ")}
                >
                  {s.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="space-y-10">
          {/* Page header */}
          <header className="rounded-3xl border border-border bg-card/60 backdrop-blur p-6 sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-ink">
                  Services
                </h1>
                <p className="mt-1 text-sm text-muted">
                  Choose a category to learn more. Pricing and duration listed
                  where applicable.
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/contact")}
                className="cursor-pointer inline-flex items-center justify-center rounded-2xl border border-border bg-white px-4 py-2 text-sm font-semibold text-ink shadow-sm hover:bg-neutral-50 transition"
              >
                Ask a Question
              </button>
            </div>
          </header>

          {/* Teeth */}
          <section id="teeth" className="scroll-mt-32 md:scroll-mt-24">
            <ServiceCard
              title="Teeth Whitening"
              subtitle="You always wear your smile. Why not make it brighter?"
              imageSrc={teethImg}
              imageAlt="Teeth whitening treatment"
            >
              <ServiceList items={TEETH} />
            </ServiceCard>
          </section>

          {/* Skin overview */}
          <section id="skin" className="scroll-mt-32 md:scroll-mt-24">
            <ServiceCard
              title="Skin"
              subtitle="You’re already radiant on the inside—let your skin match."
              imageSrc={skinImg}
              imageAlt="Facial treatment in a clean clinic setting"
            >
              <p className="mt-2 text-sm text-muted">
                We offer multiple facials and advanced treatments to help you
                reach your skin goals.
              </p>
            </ServiceCard>
          </section>

          {/* Facials */}
          <section id="skin-facials" className="scroll-mt-32 md:scroll-mt-24">
            <SubSectionHeader
              title="Facials"
              subtitle="Customized facials for glow, clarity, and long-term skin health."
            />
            <GridServiceList items={FACIALS} />
          </section>

          {/* Dermaplaning */}
          <section
            id="skin-dermaplaning"
            className="scroll-mt-32 md:scroll-mt-24"
          >
            <SubSectionHeader
              title="Dermaplaning"
              subtitle="Manual exfoliation for smoother texture and better product absorption."
            />
            <GridServiceList items={DERMAPLANING} />
          </section>

          {/* Microneedling */}
          <section
            id="skin-microneedling"
            className="scroll-mt-32 md:scroll-mt-24"
          >
            <SubSectionHeader
              title="Microneedling"
              subtitle="Collagen-supporting treatment for texture, pores, and scarring concerns."
            />
            <GridServiceList items={MICRONEEDLING} />
          </section>

          {/* Chemical Peels */}
          <section
            id="skin-chemical-peels"
            className="scroll-mt-32 md:scroll-mt-24"
          >
            <SubSectionHeader
              title="Chemical Peels"
              subtitle="Refine tone and texture with peel depth tailored to your skin."
            />
            <GridServiceList items={PEELS} />
          </section>

          {/* Electrolysis */}
          <section id="electrolysis" className="scroll-mt-32 md:scroll-mt-24">
            <ServiceCard
              title="Electrolysis"
              subtitle="Permanent hair removal for all skin types and hair colors."
              imageSrc={electrolysisImg}
              imageAlt="Electrolysis hair removal treatment"
            >
              <ServiceList items={ELECTROLYSIS} />
            </ServiceCard>
          </section>
        </main>
      </div>
    </div>
  );
}

function ServiceCard({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  children,
}: {
  title: string;
  subtitle: string;
  imageSrc?: string;
  imageAlt?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card/60 backdrop-blur overflow-hidden">
      {/* Mobile image (top of card) */}
      {imageSrc && (
        <div className="relative h-48 sm:h-56 md:h-90 lg:h-100 w-full  ">
          <img
            src={imageSrc}
            alt={imageAlt ?? title}
            className="h-full w-full object-cover bg-white"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}

      <div className="p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-ink">{title}</h2>
        <p className="mt-2 text-muted">{subtitle}</p>

        {/* Desktop image (moved down with spacing) */}

        {children}
      </div>
    </div>
  );
}

function SubSectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card/60 backdrop-blur p-6 sm:p-8">
      <h3 className="text-lg sm:text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm text-muted">{subtitle}</p>
    </div>
  );
}

function ServiceList({ items }: { items: ServiceItem[] }) {
  return (
    <div className="mt-5 space-y-4">
      {items.map((item) => (
        <div
          key={item.name}
          className="rounded-2xl border border-border bg-white/60 p-5"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="text-base font-semibold text-ink">
                {item.name}
              </div>
              <p className="mt-1 text-sm text-muted">{item.description}</p>
            </div>

            {(item.price || item.duration) && (
              <div className="shrink-0 rounded-xl border border-border bg-card/60 px-3 py-2 text-sm">
                {item.price && (
                  <div className="font-semibold text-ink">{item.price}</div>
                )}
                {item.duration && (
                  <div className="text-xs text-muted">{item.duration}</div>
                )}
              </div>
            )}
          </div>

          {item.note && <p className="mt-3 text-xs text-muted">{item.note}</p>}
        </div>
      ))}
    </div>
  );
}

/**
 * Grid layout is the key for "Skin has more than Teeth":
 * - Teeth can be 1–2 cards and still look intentional.
 * - Skin can show many offerings without becoming a long wall of text.
 */
function GridServiceList({ items }: { items: ServiceItem[] }) {
  return (
    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.name}
          className="rounded-2xl border border-border bg-white/60 p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-base font-semibold text-ink">
                {item.name}
              </div>
              <p className="mt-1 text-sm text-muted">{item.description}</p>
            </div>
            {(item.price || item.duration) && (
              <div className="shrink-0 text-right">
                {item.price && (
                  <div className="text-sm font-semibold text-ink">
                    {item.price}
                  </div>
                )}
                {item.duration && (
                  <div className="text-xs text-muted">{item.duration}</div>
                )}
              </div>
            )}
          </div>
          {item.note && <p className="mt-3 text-xs text-muted">{item.note}</p>}
        </div>
      ))}
    </div>
  );
}
