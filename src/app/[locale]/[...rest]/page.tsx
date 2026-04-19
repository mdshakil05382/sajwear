import { notFound } from "next/navigation";

/**
 * Catches any /[locale]/… path that is not matched by a more specific route and
 * delegates to `not-found.tsx` so the storefront 404 UI always renders (Next can
 * otherwise fall back to the generic framework 404 for unknown segments).
 */
export default function UnmatchedLocalePath() {
  notFound();
}
