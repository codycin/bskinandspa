import { useMemo, useState } from "react";

const BUSINESS = {
  name: "B Skin & Body",
  email: "bskinandbody@yahoo.com",
  phoneDisplay: "(407) 257-5845",
  phoneTel: "+14072575845",
  addressLines: ["52 Spring Vista Drive", "Debary, FL 32713"],
};

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

export default function Contact() {
  // ✅ Set this to your Cloudflare Worker endpoint, e.g.:
  // https://bskinandbody-contact.your-subdomain.workers.dev/api/contact
  const CONTACT_ENDPOINT = useMemo(
    () => import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined,
    [],
  );

  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<
    | { kind: "idle" }
    | { kind: "success"; msg: string }
    | { kind: "error"; msg: string }
  >({ kind: "idle" });

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const validate = () => {
    if (!form.firstName.trim()) return "Please enter your first name.";
    if (!form.lastName.trim()) return "Please enter your last name.";
    if (!form.email.trim()) return "Please enter your email address.";
    // lightweight email check
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
      return "Please enter a valid email address.";
    if (!form.message.trim()) return "Please enter a message.";
    if (form.message.trim().length < 10)
      return "Please add a little more detail (at least 10 characters).";
    if (!CONTACT_ENDPOINT)
      return "Contact form is not configured yet (missing endpoint).";
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ kind: "idle" });

    const err = validate();
    if (err) {
      setStatus({ kind: "error", msg: err });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(CONTACT_ENDPOINT!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // send metadata + form payload
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          source: "website-contact-form",
          // Optional: add page URL if you want
          // pageUrl: window.location.href,
        }),
      });

      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        message?: string;
      } | null;

      if (!res.ok || data?.ok === false) {
        throw new Error(
          data?.error || "Message failed to send. Please try again.",
        );
      }

      setStatus({
        kind: "success",
        msg: data?.message || "Thanks! Your message has been sent.",
      });
      setForm({ firstName: "", lastName: "", email: "", message: "" });
    } catch (error: any) {
      setStatus({
        kind: "error",
        msg: error?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-24 pb-16">
      {/* Header */}
      <header className="rounded-3xl border border-border bg-card/60 backdrop-blur p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-ink">Contact</h1>
        <p className="mt-2 text-sm text-muted">
          Questions, booking requests, or skincare goals—send a message and
          we’ll get back to you.
        </p>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[360px_1fr]">
        {/* Contact Info */}
        <aside className="rounded-3xl border border-border bg-card/60 backdrop-blur p-6 sm:p-8">
          <div className="text-lg font-semibold text-ink">{BUSINESS.name}</div>

          <div className="mt-4 space-y-4 text-sm text-muted">
            <div>
              {BUSINESS.addressLines.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>

            <a
              href={`tel:${BUSINESS.phoneTel}`}
              className="block text-base font-medium text-ink hover:text-primary transition"
            >
              {BUSINESS.phoneDisplay}
            </a>

            <a
              href={`mailto:${BUSINESS.email}`}
              className="block hover:text-primary transition"
            >
              {BUSINESS.email}
            </a>

            <div className="pt-4 border-t border-border text-xs text-muted">
              Prefer email? You can also click the address above to message
              directly.
            </div>
          </div>
        </aside>

        {/* Form */}
        <section className="rounded-3xl border border-border bg-card/60 backdrop-blur p-6 sm:p-8">
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-ink">
                  First name
                </label>
                <input
                  value={form.firstName}
                  onChange={onChange("firstName")}
                  className="mt-2 w-full rounded-2xl border border-border bg-white/70 px-4 py-3 text-sm text-ink outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="First name"
                  autoComplete="given-name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink">
                  Last name
                </label>
                <input
                  value={form.lastName}
                  onChange={onChange("lastName")}
                  className="mt-2 w-full rounded-2xl border border-border bg-white/70 px-4 py-3 text-sm text-ink outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Last name"
                  autoComplete="family-name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink">
                Email address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={onChange("email")}
                className="mt-2 w-full rounded-2xl border border-border bg-white/70 px-4 py-3 text-sm text-ink outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="you@email.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink">
                Message
              </label>
              <textarea
                value={form.message}
                onChange={onChange("message")}
                className="mt-2 w-full min-h-[150px] resize-none rounded-2xl border border-border bg-white/70 px-4 py-3 text-sm text-ink outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Tell us what you’re looking to book or any questions you have…"
              />
            </div>

            {/* Status */}
            {status.kind === "error" && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {status.msg}
              </div>
            )}
            {status.kind === "success" && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {status.msg}
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md hover:opacity-95 transition disabled:opacity-60"
              >
                {submitting ? "Sending..." : "Send message"}
              </button>

              <div className="text-xs text-muted">
                By submitting, you agree to be contacted back at the email
                provided.
              </div>
            </div>

            {!CONTACT_ENDPOINT && (
              <div className="text-xs text-muted">
                Tip: set{" "}
                <span className="font-semibold">VITE_CONTACT_ENDPOINT</span> in
                your env.
              </div>
            )}
          </form>
        </section>
      </div>
    </div>
  );
}
