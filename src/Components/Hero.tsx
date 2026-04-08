import { useNavigate } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import logo from "../assets/logo.webp";
import towl from "../assets/Towels.png";

const BOOKING_URL =
  "https://www.fresha.com/book-now/b-skin-and-body-ch9ut76c/all-offer?share=true&pId=2843485";

export default function Hero() {
  const navigate = useNavigate();

  // Injecting high-impact local SEO metadata
  useSEO({
    title:
      "B Skin & Body | Medical Esthetics & Permanent Hair Removal in Debary, FL",
    description:
      "Discover elevated medical esthetics, permanent hair removal, and personalized skin care at B Skin & Body in Debary, FL. Schedule your consultation today.",
  });

  return (
    <section className="relative min-h-screen w-full bg-white text-neutral-900">
      {/* Subtle background glow */}
      <section className="relative min-h-screen flex items-center">
        {/* HERO IMAGE: Eager loading for LCP optimization */}
        <img
          src={towl}
          alt="Relaxing spa towels at B Skin & Body"
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[25%_50%]"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-white/70" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 
              bg-[radial-gradient(60%_60%_at_50%_20%,rgba(146,181,102,0.18),transparent_60%)]"
        />

        <div
          className="relative mx-auto flex min-h-screen w-full max-w-6xl 
                 items-center px-6 pt-28 pb-16 lg:pt-16"
        >
          <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Left Side – Copy */}
            <div className="max-w-xl">
              <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Elevated aesthetics, within reach.
              </h1>

              <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
                Medical Esthetics & Permanent Hair Removal
              </p>

              {/* Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => window.open(BOOKING_URL, "_blank")}
                  className="inline-flex items-center justify-center rounded-2xl 
               bg-primary px-5 py-3 text-sm font-semibold text-white 
               shadow-sm hover:bg-primary-hover transition cursor-pointer"
                >
                  Schedule a Consultation
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/services")}
                  className="inline-flex items-center justify-center rounded-2xl 
               border border-neutral-200 bg-white px-5 py-3 
               text-sm font-semibold text-neutral-900 
               shadow-sm hover:bg-neutral-50 transition cursor-pointer"
                >
                  Explore Treatments
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs text-neutral-600">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Safe for All Skin Types
                </span>

                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Personalized Care
                </span>
              </div>
            </div>

            {/* Right Side – Logo */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-xl mb-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                {/* LOGO IMAGE: Eager loading and optimized alt text */}
                <img
                  src={logo}
                  alt="B Skin & Body Logo"
                  loading="eager"
                  fetchPriority="high"
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
