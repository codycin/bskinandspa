import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import teethImg from "../assets/TeethWhiteningPicture2.webp";
import skinImg from "../assets/FaceMaskWoman.png";
import electrolysisImg from "../assets/Electrolysis.webp";
import chemicalPeel from "../Assets/ChemicalPeel.webp";
import dermaplaningImg from "../Assets/Dermaplaning.webp";
import dermaplaning2 from "../Assets/Dermaplaning2.webp";
import microneedlingBA from "../Assets/MicroneedlingBA.webp";
import SkinScript from "./SkinScript";

const BOOKING_URL =
  "https://www.fresha.com/book-now/b-skin-and-body-ch9ut76c/all-offer?share=true&pId=2843485";
type Section = {
  id: string;
  label: string;
  description?: string;
};

type ServiceItem = {
  name?: string;
  description?: string;
  price?: string; // keep as string so you can do "$125" or "Starting at $..."
  duration?: string; // "50 minutes", "1 hour", etc.
  note?: string; // optional additional detail
  highlights?: string[];
  imageSrc?: string;
};

export default function Services() {
  const navigate = useNavigate();

  // Injecting service-specific local SEO metadata
  useSEO({
    title:
      "Med Spa Services | Facials, Microneedling & Electrolysis in Debary, FL",
    description:
      "Explore professional med spa services at B Skin & Body in Debary. We offer teeth whitening, dermaplaning, chemical peels, microneedling, and permanent hair removal via electrolysis.",
  });

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
      { id: "skinscript", label: "Skin Script" },
    ],
    [],
  );

  // Scrollspy
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;

    // small delay ensures layout/images have rendered
    const t = window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);

    return () => window.clearTimeout(t);
  }, [location.hash]);

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
    ["teeth", "skin", "electrolysis", "skinscript"].includes(s.id),
  );

  // ========= DATA =========

  // TEETH
  const TEETH: ServiceItem[] = [
    {
      name: "Teeth Whitening",
      description:
        "A safe, effective in-office treatment designed to visibly whiten your smile using professional-grade solutions.",
      price: "$125",
      duration: "90 minutes",
      note: "Touch-up (if needed): $99 • 60 minutes",
      highlights: [
        "Professional-grade whitening solutions for enhanced results",
        "Quick, comfortable in-office treatment",
        "Helps remove stains from coffee, tea, wine, smoking, and aging",
        "Ideal before special events, photos, or celebrations",
      ],
    },
  ];

  // FACIALS (keep your “types” but add the general facial benefits)
  // If your UI shows 4 facial types, this keeps them while still meeting the new “Facials:” requirements.
  const FACIALS: ServiceItem[] = [
    {
      name: "Skin Brightening Facial",
      description:
        "Personalized facial designed to brighten, refresh, and restore glow based on your skin’s needs.",
      price: "$85",
      duration: "50 minutes",
      highlights: [
        "Deeply cleanses, exfoliates, and nourishes the skin",
        "Helps restore hydration and balance",
        "Reduces congestion and breakouts",
        "Suitable for all skin types",
        "Improves skin tone and texture",
      ],
    },
    {
      name: "Anti-Aging Facial",
      description:
        "Personalized facial targeting fine lines and supporting firmer, smoother-looking skin.",
      price: "$85",
      duration: "50 minutes",
      highlights: [
        "Deeply cleanses, exfoliates, and nourishes the skin",
        "Helps restore hydration and balance",
        "Suitable for all skin types",
        "Improves skin tone and texture",
      ],
    },
    {
      name: "Acne Facial",
      description:
        "Treatment-focused facial to reduce congestion and support clearer-looking skin.",
      price: "$85",
      duration: "50 minutes",
      highlights: [
        "Deeply cleanses and exfoliates to reduce congestion",
        "Helps reduce breakouts",
        "Supports hydration and balance",
        "Improves skin tone and texture",
      ],
    },
    {
      name: "Sensitive Skin Facial",
      description:
        "Gentle, personalized facial designed to calm, hydrate, and support the skin barrier.",
      price: "$85",
      duration: "50 minutes",
      highlights: [
        "Personalized for sensitive/reactive skin",
        "Helps restore hydration and balance",
        "Suitable for all skin types",
        "Improves skin tone and texture",
      ],
    },
  ];

  // DERMAPLANING
  const DERMAPLANING: ServiceItem[] = [
    {
      name: "Dermaplaning Facial",
      description:
        "Instant exfoliation + peach fuzz removal for smoother makeup application and better skincare absorption.",
      price: "$135",
      duration: "60 minutes",
      highlights: [
        "Instantly reveals brighter, smoother, more radiant skin",
        "Improves skin texture and tone",
        "Zero downtime",
        "Safe for most skin types",
        "Enhances product absorption",
        "Smoother makeup application",
      ],
    },
    {
      imageSrc: dermaplaning2,
    },
  ];

  // MICRONEEDLING
  const MICRONEEDLING: ServiceItem[] = [
    {
      name: "Microneedling Treatment",
      description:
        "Collagen induction treatment to support smoother texture, firmer-looking skin, and a more even complexion.",
      price: "$175",
      duration: "60 minutes",
      highlights: [
        "Improves overall texture, tone, and firmness",
        "Softens the appearance of fine lines and wrinkles",
        "Helps reduce acne and other types of scarring",
        "Minimizes the appearance of large pores",
        "Natural collagen stimulation",
        "More even complexion",
      ],
      note: "Recommended in a series for best results (your provider will guide timing).",
    },
    {
      name: "Microneedling with Exosomes",
      description:
        "Microneedling paired with exosomes for enhanced skin-support benefits and a boosted glow-focused finish.",
      price: "$250",
      duration: "60 minutes",
      highlights: [
        "Improves overall texture, tone, and firmness",
        "Supports a more even complexion",
        "Targets the look of fine lines, pores, and scarring",
        "Glow-forward enhancement",
      ],
      note: "Ask about ideal candidacy and recommended treatment series.",
    },
  ];

  // CHEMICAL PEELS
  const PEELS: ServiceItem[] = [
    {
      name: "Chemical Peel",
      description:
        "Targeted exfoliation to improve clarity, tone, and overall radiance—strength selected based on your skin goals.",
      price: "$115",
      highlights: [
        "Fades hyperpigmentation, sun damage, and dark spots",
        "Softens the appearance of fine lines and wrinkles",
        "Improves skin texture, tone, and overall clarity",
        "Improved radiance and glow",
        "Available in light, medium, and advanced strengths",
      ],
      note: "Peel depth is chosen based on your skin and the concern being treated.",
    },
  ];

  // ELECTROLYSIS (pricing tiers as separate items keeps it super readable on mobile)
  const ELECTROLYSIS: ServiceItem[] = [
    {
      name: "Electrolysis",
      description:
        "Permanent hair removal using an FDA-approved method that disables the follicle’s ability to regrow hair.",
      price: "$40 / 15min | $80 / 30min | $120 / 45min | $160 / 60min",
      highlights: [
        "FDA-approved method of permanent hair removal",
        "Permanently destroys the follicle’s ability to regrow hair",
        "Can treat almost anywhere on the face or body",
        "Effective on all hair colors and skin types",
      ],
      note: "Longer sessions available. Number of sessions varies by area, density, and growth cycle.",
    },
  ];

  const FACIALS_HIGHLIGHTS = [
    "Personalized treatment designed for your unique skin needs",
    "Deeply cleanses, exfoliates, and nourishes the skin",
    "Reduces congestion and breakouts",
    "Suitable for all skin types",
    "Helps restore hydration and balance",
    "Improves skin tone and texture",
  ];
  const DERMAPLANING_HIGHLIGHTS = [
    "Instantly reveals brighter, smoother, more radiant skin",
    "Improves skin texture and tone",
    "Zero downtime",
    "Safe for most skin types",
    "Enhances product absorption",
    "Smoother makeup application",
  ];

  const MICRONEEDLING_HIGHLIGHTS = [
    "Improves overall texture, tone, and firmness",
    "Softens the appearance of fine lines and wrinkles",
    "Helps reduce acne and other types of scarring",
    "Minimizes the appearance of large pores",
    "Natural collagen stimulation",
    "More even complexion",
  ];

  const PEELS_HIGHLIGHTS = [
    "Fades hyperpigmentation, sun damage, and dark spots",
    "Softens the appearance of fine lines and wrinkles",
    "Improves skin texture, tone, and overall clarity",
    "Improved radiance and glow",
    "Available in light, medium, and advanced strengths",
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
            { id: "skinscript", label: "Skin Script" },
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
              imageAlt="Professional teeth whitening treatment results"
              isFirstImage={true} // Passed flag to trigger eager loading
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
              imageAlt="Relaxing facial treatment at a med spa in Debary"
            ></ServiceCard>
          </section>

          {/* Facials */}
          <section id="skin-facials" className="scroll-mt-32 md:scroll-mt-24">
            <SubSectionHeader
              title="Facials"
              subtitle="Customized facials for glow, clarity, and long-term skin health."
              highlights={FACIALS_HIGHLIGHTS}
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
              highlights={DERMAPLANING_HIGHLIGHTS}
              imageAlt="Dermaplaning facial tool exfoliating skin"
              imageSrc={dermaplaningImg}
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
              highlights={MICRONEEDLING_HIGHLIGHTS}
            />
            <GridServiceList items={MICRONEEDLING} />
            <div className="mt-6 rounded-2xl border border-border bg-white/60 p-4 sm:p-5">
              <div className="mb-3">
                <div className="text-sm font-semibold text-ink">
                  Microneedling Before and After
                </div>
              </div>

              <div className="relative w-full rounded-xl overflow-hidden">
                <img
                  src={microneedlingBA}
                  alt="Microneedling before and after skin texture results"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </section>

          {/* Chemical Peels */}
          <section
            id="skin-chemical-peels"
            className="scroll-mt-32 md:scroll-mt-24"
          >
            <SubSectionHeader
              title="Chemical Peels"
              subtitle="Refine tone and texture with peel depth tailored to your skin."
              highlights={PEELS_HIGHLIGHTS}
              imageSrc={chemicalPeel}
              imageAlt="Chemical peel skincare application process"
            />

            <GridServiceList items={PEELS} />
          </section>

          {/* Electrolysis */}
          <section id="electrolysis" className="scroll-mt-32 md:scroll-mt-24">
            <ServiceCard
              title="Electrolysis"
              subtitle="Permanent hair removal for all skin types and hair colors."
              imageSrc={electrolysisImg}
              imageAlt="Electrolysis permanent hair removal treatment process"
            >
              <ServiceList items={ELECTROLYSIS} />
            </ServiceCard>
          </section>
          <section id="skinscript" className="scroll-mt-32 md:scroll-mt-24">
            <SkinScript />
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
  isFirstImage = false,
  children,
}: {
  title: string;
  subtitle: string;
  imageSrc?: string;
  imageAlt?: string;
  isFirstImage?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card/60 backdrop-blur">
      <div className="p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-ink">{title}</h2>
        <p className="mt-2 text-muted">{subtitle}</p>

        {imageSrc && (
          <div className="mt-6">
            <div className="relative w-full min-h-[260px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[460px] rounded-3xl overflow-hidden border border-border bg-white">
              <img
                src={imageSrc}
                alt={imageAlt ?? title}
                className="absolute inset-0 h-full w-full object-cover"
                loading={isFirstImage ? "eager" : "lazy"} // Conditional loading
                fetchPriority={isFirstImage ? "high" : "auto"} // Conditional fetch priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

function SubSectionHeader({
  title,
  subtitle,
  highlights,
  imageSrc,
  imageAlt,
}: {
  title: string;
  subtitle: string;
  highlights?: string[];
  imageSrc?: string;
  imageAlt?: string;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card/60 backdrop-blur overflow-hidden">
      <div className="flex flex-col md:flex-row gap-6 p-6 sm:p-8 items-stretch">
        {/* TEXT */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-ink">
              {title}
            </h3>
            <p className="mt-2 text-sm text-muted">{subtitle}</p>

            <Highlights items={highlights} />
          </div>

          {/* Button inside text column keeps alignment clean */}
          <div className="mt-6">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-primary px-3 py-2
                text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover"
            >
              Book Now
            </a>
          </div>
        </div>

        {/* IMAGE */}
        {imageSrc && (
          <div className="flex-1 max-w-md">
            <div className="relative w-full h-full min-h-[220px] rounded-2xl overflow-hidden">
              <img
                src={imageSrc}
                alt={imageAlt ?? title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
function Highlights({ items }: { items?: string[] }) {
  if (!items?.length) return null;

  return (
    <ul className="mt-3 space-y-1 text-sm text-muted">
      {items.map((h) => (
        <li key={h} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/80" />
          <span>{h}</span>
        </li>
      ))}
    </ul>
  );
}

function ServiceList({ items }: { items: ServiceItem[] }) {
  return (
    <div className="mt-5 space-y-4">
      {items.map((item) => {
        if (item.imageSrc) {
          return (
            <div
              key={item.name}
              className="rounded-2xl border border-border overflow-hidden"
            >
              <div className="relative w-full aspect-[4/3]">
                <img
                  src={item.imageSrc}
                  alt={`${item.name} demonstration`} // Better fallback alt text
                  className="absolute inset-0 block h-full w-full object-cover"
                  loading="lazy"
                />

                {/* Optional overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

                {/* Optional text overlay */}
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <div className="font-semibold">{item.name}</div>
                  {item.description && (
                    <p className="text-xs opacity-90">{item.description}</p>
                  )}
                </div>
              </div>
            </div>
          );
        }

        return (
          <div
            key={item.name}
            className="rounded-2xl border border-border bg-white/60 p-5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <div className="text-base font-semibold text-ink">
                  {item.name}
                </div>
                <p className="mt-1 text-sm text-muted">{item.description}</p>
                <Highlights items={item.highlights} />
              </div>

              {/* UPDATED PRICING BLOCK */}
              {(item.price || item.duration) && (
                <div className="shrink-0 rounded-xl border border-border bg-card/60 px-4 py-3 text-sm min-w-[120px]">
                  {item.price && (
                    <div className="font-semibold text-ink flex flex-col gap-1">
                      {/* We check if the price includes our separator (|). 
                          If yes, we split it into an array and map over it to stack them.
                          If no, we just show the normal string.
                      */}
                      {item.price.includes("|")
                        ? item.price.split("|").map((priceTier, index) => (
                            <span
                              key={index}
                              className="block whitespace-nowrap"
                            >
                              {priceTier.trim()}
                            </span>
                          ))
                        : item.price}
                    </div>
                  )}
                  {item.duration && (
                    <div className="mt-1 text-xs text-muted border-t border-border pt-1">
                      {item.duration}
                    </div>
                  )}
                </div>
              )}
            </div>

            {item.note && (
              <p className="mt-3 text-xs text-muted">{item.note}</p>
            )}

            <div className="mt-6 flex justify-end">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer" // Added noopener!
                className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2.5
                text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover"
              >
                Book Now
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function GridServiceList({ items }: { items: ServiceItem[] }) {
  return (
    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((item) => {
        if (item.imageSrc) {
          return (
            <div
              key={item.name}
              className="rounded-2xl border border-border overflow-hidden bg-white/60"
            >
              <div className="relative w-full aspect-[4/3]">
                <img
                  src={item.imageSrc}
                  alt={`${item.name} result`}
                  className="absolute inset-0 block h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          );
        }

        // 🔹 NORMAL GRID CARD
        return (
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

            {item.note && (
              <p className="mt-3 text-xs text-muted">{item.note}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
