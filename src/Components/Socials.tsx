import { Instagram } from "lucide-react";

// 1. Added a TypeScript interface for your props
interface SocialsProps {
  iconClass?: string;
}

export default function Socials({ iconClass = "h-5 w-5" }: SocialsProps) {
  // 2. Removed the unnecessary <> </> fragment wrapper
  return (
    <a
      href="https://www.instagram.com/bskinandbody/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Visit us on Instagram"
    >
      <Instagram
        className={`${iconClass} text-primary hover:opacity-80 transition`}
      />
    </a>
  );
}
