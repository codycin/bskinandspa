import { useMemo } from "react";
import { Link } from "react-router-dom";
import SkinScript from "../Components/SkinScript";

type Section = {
  id: string;
  label: string;
  description?: string;
};

export default function ServicesOverview() {
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
      {
        id: "electrolysis",
        label: "Electrolysis",
        description:
          "Permanent hair removal for all skin types and hair colors.",
      },
    ],
    [],
  );

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-12">
      <div className="flex items-end justify-between gap-4 mb-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-ink">
            Services Overview
          </h2>
          <p className="mt-2 text-sm text-muted">
            Explore our most popular offerings—then dive deeper into full
            pricing and details.
          </p>
        </div>

        {/* Swapped button for Link for SEO */}
        <Link
          to="/services"
          className="hidden sm:inline-flex items-center justify-center rounded-2xl border border-border bg-white px-4 py-2 text-sm font-semibold text-ink shadow-sm hover:bg-neutral-50 transition"
        >
          View all
        </Link>
      </div>

      <div className="mt-6 mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {sections.map((s) => (
          <div
            key={s.id}
            className="flex min-h-30 flex-col rounded-3xl border border-border bg-card/60 backdrop-blur p-6"
          >
            {/* Top content grouped */}
            <div>
              <div className="text-lg font-semibold text-ink">{s.label}</div>

              {s.description && (
                <p className="mt-2 text-sm text-muted line-clamp-2">
                  {s.description}
                </p>
              )}
            </div>

            {/* Bottom actions pinned */}
            <div className="mt-auto pt-6 flex items-center justify-between">
              {/* Swapped button for Link to allow crawlers to find the hash links */}
              <Link
                to={`/services#${s.id}`}
                className="inline-flex items-center justify-center rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition"
              >
                Learn more
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 mb-6 sm:hidden">
        {/* Swapped button for Link for SEO */}
        <Link
          to="/services"
          className="w-full inline-flex items-center justify-center rounded-2xl border border-border bg-white px-4 py-3 text-sm font-semibold text-ink shadow-sm hover:bg-neutral-50 transition"
        >
          View all services
        </Link>
      </div>
      <SkinScript />
    </section>
  );
}
