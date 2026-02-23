import portrait from "../assets/Portrait.png";

const BOOKING_URL =
  "https://thepalmsdayspa.mysalononline.com/Booking/?sid=0&guid=a057c4c1-3a24-463e-a2a5-a43ce593a20a&customerId=32864";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Top spacing to clear a fixed navbar on mobile */}
      <section className="mx-auto w-full max-w-6xl px-6 pt-28 pb-16">
        <header className="max-w-3xl">
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

        {/* Content: stacks on mobile, side-by-side from md and up */}
        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
          {/* Left: Text */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                Our approach
              </h2>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Every client starts with a consultation so we can understand
                your goals, review your health history when relevant, and choose
                the safest, most effective plan for your skin type. We
                prioritize results you can see and protocols you can trust—no
                pressure, no one-size-fits-all packages.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                What we specialize in
              </h2>
              <ul className="mt-3 space-y-2 text-neutral-600">
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#92B566]" />
                  Laser hair removal designed for comfort, safety, and
                  long-lasting smoothness
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#92B566]" />
                  Corrective skincare for concerns like texture,
                  hyperpigmentation, and acne
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#92B566]" />
                  Maintenance plans that support healthy skin over time—not
                  quick fixes
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                Our promise
              </h2>
              <p className="mt-2 leading-relaxed text-neutral-600">
                You’ll always know what we’re doing, why we’re doing it, and
                what to expect next. We focus on education, consistency, and
                realistic outcomes so you can make confident decisions about
                your care.
              </p>
            </div>

            {/* Optional: small CTA row */}
            <div className="pt-2 flex flex-col gap-3 sm:flex-row">
              <a
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 shadow-sm hover:bg-neutral-50 transition"
              >
                Explore Treatments
              </a>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-[#92B566] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition"
              >
                Schedule a Consultation
              </a>
            </div>
          </div>

          {/* Right: Portrait */}
          <aside className="md:sticky md:top-24">
            <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
              <img
                src={portrait}
                alt="Provider portrait"
                className="h-auto w-full object-cover"
              />
            </div>

            {/* Optional info card under portrait */}
            <div className="mt-4 rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold">Meet Your Provider</p>
              <p className="mt-1 text-sm text-neutral-600">
                Licensed • Evidence-based care • Personalized plans
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
