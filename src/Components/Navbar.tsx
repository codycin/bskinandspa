import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Socials from "./Socials";

import logo from "../Assets/TitleLogo.webp";
import icon from "../Assets/Icon.webp";

const BOOKING_URL =
  "https://www.fresha.com/book-now/b-skin-and-body-ch9ut76c/all-offer?share=true&pId=2843485";

type NavItem = { label: string; to: string };

const NAV_ITEMS: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Prevent background scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* subtle translucent bar */}
      <div className="bg-surface/90 backdrop-blur border-b border-border">
        <div className="mx-auto px-4 sm:px-6">
          <div className="h-16 flex items-center">
            {/* Left: Desktop links */}
            <nav className="hidden lg:flex items-center gap-6 w-1/3">
              <ul className="flex gap-6">
                {NAV_ITEMS.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      className={({ isActive }) =>
                        [
                          "px-1 py-2 text-sm font-medium tracking-wide transition-colors",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                          isActive
                            ? "text-ink border-b-2 border-primary"
                            : "text-muted hover:text-ink border-b-2 border-transparent",
                        ].join(" ")
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile: Hamburger (left) */}
            <div className="lg:hidden flex justify-between flex-shrink-0 w-1/3">
              <button
                type="button"
                aria-label="Open menu"
                aria-expanded={open}
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center rounded-xl overflow-hidden
                           border border-border bg-card/60 px-3 py-2 text-ink shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <span className="sr-only">Menu</span>
                <div className="space-y-1.5">
                  <div className="h-0.5 w-5 bg-ink" />
                  <div className="h-0.5 w-5 bg-ink" />
                  <div className="h-0.5 w-5 bg-ink" />
                </div>
              </button>

              {/* Added eager loading to mobile icon */}
              <img
                src={icon}
                alt="B Skin and Body Spa Icon"
                loading="eager"
                fetchPriority="high"
                className="block md:hidden h-12 w-auto object-contain"
              />
            </div>

            {/* Center: Logo */}
            <div className="w-1/3 flex items-center justify-center">
              <NavLink
                to="/"
                className="flex items-center gap-3 leading-none"
                onClick={() => setOpen(false)}
                aria-label="Home page"
              >
                {/* Added eager loading to desktop icon and text logo */}
                <img
                  src={icon}
                  alt="B Skin and Body Spa Icon"
                  loading="eager"
                  fetchPriority="high"
                  className="hidden md:block h-12 w-auto object-contain"
                />
                <img
                  src={logo}
                  alt="B Skin and Body Text Logo"
                  loading="eager"
                  fetchPriority="high"
                  className="block h-10 w-auto object-contain relative -bottom-1"
                />
              </NavLink>
            </div>

            {/* Right: Book Now */}
            <div className="w-1/3 text-muted flex justify-end gap-4 items-center ml-auto">
              <div className="hidden md:block">
                <Socials />
              </div>

              {/* Book Now: desktop only */}
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-primary px-2.5 py-2.5
             text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover
             focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        {/* Backdrop (click outside to close) */}
        <button
          type="button"
          aria-label="Close menu backdrop"
          onClick={() => setOpen(false)}
          className={[
            "fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity",
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none",
          ].join(" ")}
        />

        {/* Drawer */}
        <aside
          className={[
            "fixed top-0 left-0 z-50 h-full w-[80vw] max-w-sm",
            "bg-card/95 backdrop-blur border-r border-border shadow-xl",
            "transform transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "-translate-x-full",
          ].join(" ")}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          {/* Drawer header */}
          <div className="h-16 px-4 flex items-center border-b border-border">
            {/*left logo */}
            <div className="flex items-center gap-2 leading-none flex-1 min-w-0 overflow-hidden">
              <img
                src={icon}
                alt="" // Empty alt because this is decorative and redundant in the drawer
                className="block h-10 w-auto flex-shrink-0"
              />
              <img
                src={logo}
                alt="" // Empty alt because this is decorative and redundant in the drawer
                className="block h-8 w-auto flex-shrink min-w-0 object-contain -bottom-1"
              />
            </div>

            {/* Right */}
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="ml-3 flex-shrink-0 rounded-xl border border-border bg-card/60 px-3 py-2 text-ink shadow-sm
               focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              ✕
            </button>
          </div>

          {/* Links */}
          <nav className="p-2">
            <ul className="flex flex-col space-y-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      [
                        "block rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                        isActive
                          ? "text-ink bg-primary/10"
                          : "text-muted hover:text-ink hover:bg-card/60",
                      ].join(" ")
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex gap-5 items-center mt-auto p-4 border-t border-border text-muted">
            <Socials />

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3
                         text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover"
            >
              Book Now
            </a>
          </div>
        </aside>
      </div>
    </header>
  );
}
