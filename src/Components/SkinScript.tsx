import { Link } from "react-router-dom";
import imageSrc from "../Assets/SkincareProduct.webp";

export default function SkinScript() {
  return (
    <>
      <div className="rounded-3xl border border-border bg-card/60 backdrop-blur overflow-hidden">
        <div className="flex flex-col md:flex-row gap-6 p-6 sm:p-8 items-stretch">
          {/* TEXT */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-ink">
                Skin Script Skincare
              </h3>

              <p className="mt-2 text-sm text-muted">
                Professional-grade skincare used in our treatments and available
                for at-home results.
              </p>

              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                  Targets acne, aging, pigmentation, and texture
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                  Enzyme + botanical formulas for gentle, effective exfoliation
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                  Clinical-grade ingredients like retinol, AHAs, and peptides
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                  Supports hydration, barrier repair, and long-term skin health
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                  Customized for all skin types—even sensitive skin
                </li>
              </ul>
            </div>

            <div className="mt-6">
              {/* Swapped <a> tag for React Router's <Link> to prevent full page reloads */}
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2
                text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover"
              >
                Ask About Products
              </Link>
            </div>
          </div>

          {/* IMAGE */}
          {imageSrc && (
            <div className="flex-1 max-w-md">
              <div className="relative w-full min-h-[260px] sm:min-h-[320px] md:h-full rounded-2xl overflow-hidden border border-border bg-white">
                <img
                  src={imageSrc}
                  alt="Skin Script skincare products"
                  className="absolute inset-0 block h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
