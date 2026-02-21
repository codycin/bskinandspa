import { Instagram } from "lucide-react";

export default function Socials({ iconClass = "h-5 w-5" }) {
  return (
    <>
      {" "}
      <a
        href="https://www.instagram.com/bskinandbody/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit us on Instagram"
      >
        <Instagram
          className={`${iconClass}text-primary hover:text-primary  transition`}
        />
      </a>
    </>
  );
}
