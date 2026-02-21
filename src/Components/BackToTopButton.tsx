import { useEffect, useState } from "react";

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // show after user scrolls ~300px
      setVisible(window.scrollY > 300);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={goTop}
      className={[
        "fixed bottom-5 right-5 z-40",
        "rounded-full border border-border bg-card/40 backdrop-blur",
        "shadow-sm transition",
        "hover:bg-card/70 hover:shadow-md",
        "focus:outline-none focus:ring-2 focus:ring-primary/40",
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 pointer-events-none",
      ].join(" ")}
      style={{ padding: "10px 12px" }}
    >
      {/* simple chevron-up icon (no library) */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        className="text-ink/70"
        aria-hidden="true"
      >
        <path
          d="M6 15l6-6 6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
