import type { CSSProperties } from "react";

/** Cast a map of CSS custom properties (--x, --y, …) to a React style object.
 * TypeScript's CSSProperties doesn't know arbitrary custom properties. */
export function cssVars(vars: Record<string, string | number>): CSSProperties {
  return vars as CSSProperties;
}
