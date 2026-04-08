import { useEffect, useRef, useState } from "react";
import { useSEO } from "../hooks/useSEO";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "flexible" | "compact";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

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

export default function ContactPage() {
  useSEO({
    title: "Contact Us | B Skin & Body",
    description:
      "Questions, booking requests, or skincare goals—contact B Skin & Body in Debary, FL.",
  });

  const widgetRef = useRef<HTMLDivElement | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [widgetId, setWidgetId] = useState<string | null>(null);
  const endpoint = "/api/contact";

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

  // 1. ONE UNIFIED USE-EFFECT FOR TURNSTILE
  useEffect(() => {
    let id: string | undefined;

    const renderWidget = () => {
      if (!widgetRef.current || !window.turnstile) return;
      id = window.turnstile.render(widgetRef.current, {
        sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY,
        theme: "light",
        size: "flexible",
        callback: (token: string) => setTurnstileToken(token),
        "expired-callback": () => setTurnstileToken(""),
        "error-callback": () => setTurnstileToken(""),
      });
      setWidgetId(id);
    };

    const scriptId = "turnstile-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    if (window.turnstile) {
      renderWidget();
    } else {
      script.addEventListener("load", renderWidget);
    }

    // Cleanup: removes the widget cleanly when you navigate away
    return () => {
      if (script) script.removeEventListener("load", renderWidget);
      if (window.turnstile && id !== undefined) {
        window.turnstile.remove(id);
      }
    };
  }, []);

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const validate = () => {
    if (!form.firstName.trim()) return "Please enter your first name.";
    if (!form.lastName.trim()) return "Please enter your last name.";
    if (!form.email.trim()) return "Please enter your email address.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
      return "Please enter a valid email address.";
    if (!form.message.trim()) return "Please enter a message.";
    if (form.message.trim().length < 10)
      return "Please add a little more detail (at least 10 characters).";
    if (!turnstileToken) return "Please complete the verification.";
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
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          turnstileToken,
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
      setTurnstileToken("");
      if (window.turnstile && widgetId) window.turnstile.reset(widgetId);
    } catch (error: any) {
      setStatus({
        kind: "error",
        msg: error?.message || "Something went wrong. Please try again.",
      });
      setTurnstileToken("");
      if (window.turnstile && widgetId) window.turnstile.reset(widgetId);
    } finally {
      setSubmitting(false);
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: BUSINESS.name,
    image: "YOUR_WEBSITE_URL/Assets/Portrait.webp",
    "@id": "YOUR_WEBSITE_URL",
    url: "YOUR_WEBSITE_URL",
    telephone: BUSINESS.phoneTel,
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.addressLines[0],
      addressLocality: "Debary",
      addressRegion: "FL",
      postalCode: "32713",
      addressCountry: "US",
    },
  };

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-24 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className="rounded-3xl border border-border bg-card/60 backdrop-blur p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-ink">Contact</h1>
        <p className="mt-2 text-sm text-muted">
          Questions, booking requests, or skincare goals—send a message and
          we’ll get back to you.
        </p>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[360px_1fr]">
        <aside className="rounded-3xl border border-border bg-card/60 backdrop-blur p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-ink">{BUSINESS.name}</h2>
          <address className="mt-4 space-y-4 text-sm text-muted not-italic">
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
          </address>
        </aside>

        <section className="rounded-3xl border border-border bg-card/60 backdrop-blur p-6 sm:p-8 flex flex-col justify-center">
          {/* 2. SUCCESS SCREEN: Hidden by default, shown when successful */}
          <div
            className={`text-center py-10 ${status.kind === "success" ? "block" : "hidden"}`}
          >
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 mb-6">
              <svg
                className="h-8 w-8 text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-ink">Message Sent!</h3>
            <p className="mt-2 text-muted">
              {status.kind === "success" ? status.msg : ""} We will get back to
              you shortly.
            </p>
            <button
              onClick={() => setStatus({ kind: "idle" })}
              className="mt-8 text-sm font-medium text-primary hover:underline"
            >
              Send another message
            </button>
          </div>

          {/* 3. FORM SCREEN: Shown by default, hidden when successful */}
          <form
            onSubmit={onSubmit}
            className={`space-y-5 ${status.kind !== "success" ? "block" : "hidden"}`}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-semibold text-ink"
                >
                  First name
                </label>
                <input
                  id="firstName"
                  value={form.firstName}
                  onChange={onChange("firstName")}
                  className="mt-2 w-full rounded-2xl border border-border bg-white/70 px-4 py-3 text-sm text-ink outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="First name"
                  autoComplete="given-name"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-semibold text-ink"
                >
                  Last name
                </label>
                <input
                  id="lastName"
                  value={form.lastName}
                  onChange={onChange("lastName")}
                  className="mt-2 w-full rounded-2xl border border-border bg-white/70 px-4 py-3 text-sm text-ink outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Last name"
                  autoComplete="family-name"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-ink"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={onChange("email")}
                className="mt-2 w-full rounded-2xl border border-border bg-white/70 px-4 py-3 text-sm text-ink outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="you@email.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-ink"
              >
                Message
              </label>
              <textarea
                id="message"
                value={form.message}
                onChange={onChange("message")}
                className="mt-2 w-full min-h-[150px] resize-none rounded-2xl border border-border bg-white/70 px-4 py-3 text-sm text-ink outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Tell us what you’re looking to book or any questions you have…"
              />
            </div>

            <div ref={widgetRef} className="pt-2 w-full" />

            {status.kind === "error" && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
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
          </form>
        </section>
      </div>
    </main>
  );
}
