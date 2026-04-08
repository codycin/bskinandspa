import { Link } from "react-router-dom";
import portrait from "../Assets/Portrait.webp";

const BOOKING_URL =
  "https://www.fresha.com/book-now/b-skin-and-body-ch9ut76c/all-offer?share=true&pId=2843485";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Top spacing to clear a fixed navbar on mobile */}
      <section className="mx-auto w-full max-w-6xl px-6 pt-28 pb-16">
        {/* Header Section */}
        <header className="max-w-3xl mb-16">
          <p className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium tracking-wide text-neutral-600">
            About Us
          </p>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            Clinical care with a boutique experience.
          </h1>

          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            We combine medical-grade technology with personalized treatment
            plans to help you feel confident in your skin—whether you’re here
            for laser hair removal, corrective skincare, or long-term skin
            health.
          </p>
        </header>

        {/* Meet the Provider: Front & Center (Side-by-side on desktop) */}
        <div className="mb-20 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
          {/* Portrait */}
          <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
            <img
              src={portrait}
              alt="Brandi Concolino - Provider portrait"
              className="h-auto w-full object-cover"
              loading="eager"
            />
          </div>

          {/* Bio */}
          <div className="max-w-lg">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Meet Brandi
            </h2>
            <p className="mt-3 text-sm font-medium text-neutral-500 pb-6 border-b border-neutral-100">
              Florida Native • Aesthetic Specialist Since 2011
            </p>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
              <p>
                Hi, I’m Brandi. I help clients feel more confident, refreshed
                and like their best selves through results-driven treatments for
                the face, body and smile.
              </p>
              <p>
                Every treatment is tailored towards you. Helping you love what
                you see in the mirror is what fuels my passion for what I do.
              </p>
              <p>
                I’ve created a soft, welcoming space, so every visit is as
                relaxing as it is transformative.
              </p>
            </div>
          </div>
        </div>

        {/* Business Philosophy / Details (Underneath) */}
        <div className="border-t border-neutral-200 pt-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {/* Approach */}
            <div>
              <h3 className="text-xl font-semibold tracking-tight">
                Our approach
              </h3>
              <p className="mt-3 leading-relaxed text-neutral-600">
                Every client starts with a consultation so we can understand
                your goals, review your health history when relevant, and choose
                the safest, most effective plan for your skin type. We
                prioritize results you can see and protocols you can trust—no
                pressure, no one-size-fits-all packages.
              </p>
            </div>

            {/* Specialties */}
            <div>
              <h3 className="text-xl font-semibold tracking-tight">
                What we specialize in
              </h3>
              <ul className="mt-3 space-y-3 text-neutral-600">
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    Laser hair removal designed for comfort, safety, and
                    long-lasting smoothness
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    Corrective skincare for concerns like texture,
                    hyperpigmentation, and acne
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    Maintenance plans that support healthy skin over time—not
                    quick fixes
                  </span>
                </li>
              </ul>
            </div>

            {/* Promise */}
            <div>
              <h3 className="text-xl font-semibold tracking-tight">
                Our promise
              </h3>
              <p className="mt-3 leading-relaxed text-neutral-600">
                You’ll always know what we’re doing, why we’re doing it, and
                what to expect next. We focus on education, consistency, and
                realistic outcomes so you can make confident decisions about
                your care.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            {/* FIXED: Swapped <a> for <Link> */}
            <Link
              to="/services"
              className="inline-flex items-center justify-center rounded-2xl border border-neutral-200 bg-white px-6 py-3.5 text-sm font-semibold text-neutral-900 shadow-sm hover:bg-neutral-50 transition"
            >
              Explore Treatments
            </Link>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition"
            >
              Schedule a Consultation
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
