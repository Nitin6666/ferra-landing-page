// src/components/Icon.jsx
// Central icon component — all SVGs use currentColor so they
// inherit the parent's text color and respond to the theme.

import xMark        from "../assets/svg/x-mark.svg?raw";
import search       from "../assets/svg/search.svg?raw";
import link         from "../assets/svg/link.svg?raw";
import linkSolid    from "../assets/svg/link-solid.svg?raw";
import cube         from "../assets/svg/cube.svg?raw";
import cog          from "../assets/svg/cog.svg?raw";
import chevronUp    from "../assets/svg/chevron-up.svg?raw";
import chevronUpSolid from "../assets/svg/chevron-up-solid.svg?raw";
import chevronRight from "../assets/svg/chevron-right.svg?raw";
import chevronLeft  from "../assets/svg/chevron-left.svg?raw";
import chevronDown  from "../assets/svg/chevron-down.svg?raw";
import chartPie     from "../assets/svg/chart-pie.svg?raw";
import arrowTrending from "../assets/svg/arrow-trending-up.svg?raw";
import arrowPath    from "../assets/svg/arrow-path.svg?raw";

const ICONS = {
  "x-mark":          xMark,
  "search":          search,
  "link":            link,
  "link-solid":      linkSolid,
  "cube":            cube,
  "cog":             cog,
  "chevron-up":      chevronUp,
  "chevron-up-solid": chevronUpSolid,
  "chevron-right":   chevronRight,
  "chevron-left":    chevronLeft,
  "chevron-down":    chevronDown,
  "chart-pie":       chartPie,
  "arrow-trending-up": arrowTrending,
  "arrow-path":      arrowPath,
};

/**
 * <Icon name="chevron-down" size={20} className="text-[var(--color-accent)]" />
 *
 * All strokes/fills are overridden to currentColor so icons
 * respond to Tailwind text-color utilities and CSS color vars.
 */
export default function Icon({ name, size = 20, className = "", style = {} }) {
  const raw = ICONS[name];
  if (!raw) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  // Replace hardcoded fill/stroke colors with currentColor
  const themed = raw
    .replace(/fill="#[0-9a-fA-F]{3,6}"/g, 'fill="currentColor"')
    .replace(/stroke="#[0-9a-fA-F]{3,6}"/g, 'stroke="currentColor"')
    .replace(/fill="none"/g, 'fill="none"');   // preserve structural fill="none"

  return (
    <span
      role="img"
      aria-hidden="true"
      className={className}
      style={{ display: "inline-flex", width: size, height: size, ...style }}
      dangerouslySetInnerHTML={{ __html: themed
        .replace(/<svg/, `<svg width="${size}" height="${size}"`)
      }}
    />
  );
}
