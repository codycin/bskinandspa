// src/hooks/useSEO.ts
import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
}

export function useSEO({ title, description }: SEOProps) {
  useEffect(() => {
    // 1. Update the document title (the text in the browser tab)
    document.title = title;

    // 2. Find the existing meta description, or create it if it doesn't exist
    let metaDescription = document.querySelector('meta[name="description"]');

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }

    // 3. Update the content to match the current page
    metaDescription.setAttribute("content", description);
  }, [title, description]);
}
