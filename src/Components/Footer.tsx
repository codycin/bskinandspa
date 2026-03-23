import { useNavigate } from "react-router-dom";

const BOOKING_URL =
  "https://thepalmsdayspa.mysalononline.com/Booking/?sid=0&guid=a057c4c1-3a24-463e-a2a5-a43ce593a20a&customerId=32864";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="mt-20 border-t border-border bg-card/60 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold text-ink">B Skin & Body</h3>
            <p className="mt-3 text-sm text-muted leading-relaxed max-w-xs mx-auto sm:mx-0">
              Professional skincare and beauty services designed to help you
              feel confident, radiant, and refreshed.
            </p>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-ink">
              Contact
            </h4>

            <div className="mt-4 space-y-4 text-sm text-muted">
              <div>
                52 Spring Vista Drive <br />
                Debary, FL 32713
              </div>

              <a
                href="tel:14072575845"
                className="block text-base font-medium text-ink hover:text-primary transition"
              >
                (407) 257-5845
              </a>

              <a
                href="mailto:bskinandbody@yahoo.com"
                className="block hover:text-primary transition"
              >
                bskinandbody@yahoo.com
              </a>
            </div>
          </div>

          {/* Booking */}
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-ink">
              Book
            </h4>

            <div className="mt-4 space-y-4">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full
                            bg-primary 
                            px-4 py-3 text-sm
                            sm:px-8 sm:py-4 sm:text-base
                            font-semibold text-white 
                            shadow-md transition hover:bg-primary-hover
                            focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-border pt-6">
          <div className="flex flex-col items-center gap-2 text-xs text-muted sm:flex-row sm:justify-between">
            <span>
              © {new Date().getFullYear()} B Skin & Body. All rights reserved.
            </span>
            <span>Designed with care in Florida.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
