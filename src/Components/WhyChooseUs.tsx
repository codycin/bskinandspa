type WhyChooseUsItem = {
  title: string;
  description: string;
};

const BOOKING_URL =
  "https://www.fresha.com/book-now/b-skin-and-body-ch9ut76c/all-offer?share=true&pId=2843485";

const WHY_CHOOSE_US_ITEMS: WhyChooseUsItem[] = [
  {
    title: "Personalized Treatments",
    description:
      "Every service is tailored to your skin goals, concerns, and comfort level for a more customized experience.",
  },
  {
    title: "Professional-Grade Products",
    description:
      "We use high-quality skincare, including Skin Script, to support visible results during treatments and at home.",
  },
  {
    title: "Results-Focused Care",
    description:
      "From glow and hydration to texture and clarity, each treatment is selected with real skin progress in mind.",
  },
  {
    title: "Welcoming, Relaxing Environment",
    description:
      "Enjoy advanced skincare in a clean, calming space designed to help you feel comfortable and cared for.",
  },
];

export default function WhyChooseUs() {
  return (
    <>
      <section className="mx-auto mt-12 max-w-6xl rounded-3xl border border-border bg-card/60 p-6 backdrop-blur sm:p-8">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-semibold text-ink sm:text-3xl">
            Why Choose Us
          </h2>
          <p className="mt-2 text-sm text-muted sm:text-base">
            Thoughtful care, advanced treatments, and quality products. All
            chosen to help you feel confident in your skin.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {WHY_CHOOSE_US_ITEMS.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-white/60 p-5"
            >
              <div className="flex gap-3">
                <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                <div>
                  <h3 className="text-base font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <a
            href={BOOKING_URL}
            target="_blank"
            // FIXED: Added noopener for better security
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2.5
          text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover
          focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            Book Now
          </a>
        </div>
      </section>
    </>
  );
}
