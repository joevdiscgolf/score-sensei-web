/**
 * Interpolates between two colors.
 * @param color1 The start color as a hex string (e.g., '#FF0000')
 * @param color2 The end color as a hex string
 * @param factor The interpolation factor (0-1)
 * @returns The interpolated color as a hex string
 */
function lerpColor(color1: string, color2: string, factor: number): string {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);

  const r = Math.round(c1.r + (c2.r - c1.r) * factor);
  const g = Math.round(c1.g + (c2.g - c1.g) * factor);
  const b = Math.round(c1.b + (c2.b - c1.b) * factor);

  return rgbToHex(r, g, b);
}

/**
 * Converts a hex color to RGB components.
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}

/**
 * Converts RGB components to a hex color string.
 */
function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

/**
 * Returns a semantic color based on percentage value.
 *
 * For "higher is better" stats (putting %, fairway hits, etc.):
 * - 75-100% → Green (excellent)
 * - 50-75% → Teal/Cyan (good)
 * - 25-50% → Gold (below average)
 * - 0-25% → Red (poor)
 *
 * Uses smooth linear interpolation between color stops.
 * All colors are chosen for good contrast and visual appeal.
 */
export function getSemanticColor(percentage: number): string {
  const p = Math.max(0, Math.min(100, percentage)) / 100;

  // Clean color gradient: Red → Gold → Teal → Green (Tailwind colors)
  const red = '#EF4444';   // Tailwind red-500
  const gold = '#FBBF24';  // Tailwind yellow-400
  const teal = '#14B8A6';  // Tailwind teal-500
  const green = '#10B981'; // Tailwind emerald-500

  if (p >= 0.75) {
    // Teal to Green (75-100%)
    return lerpColor(teal, green, (p - 0.75) / 0.25);
  } else if (p >= 0.5) {
    // Gold to Teal (50-75%)
    return lerpColor(gold, teal, (p - 0.5) / 0.25);
  } else if (p >= 0.25) {
    // Red to Gold (25-50%)
    return lerpColor(red, gold, (p - 0.25) / 0.25);
  } else {
    // Pure red (0-25%)
    return red;
  }
}

/**
 * Returns a discrete color based on 10 percentage buckets (0-100%).
 * Colors are sampled from the continuous getSemanticColor gradient
 * at each bucket's midpoint for visual consistency.
 *
 * Buckets: 0-10%, 10-20%, 20-30%, 30-40%, 40-50%,
 *          50-60%, 60-70%, 70-80%, 80-90%, 90-100%
 */
export function getSemanticColorDiscrete(percentage: number): string {
  const p = Math.max(0, Math.min(100, percentage));

  // Calculate bucket index (0-9)
  const bucketIndex = Math.min(9, Math.max(0, Math.floor(p / 10)));

  // Bucket midpoints: 5, 15, 25, 35, 45, 55, 65, 75, 85, 95
  const midpoint = (bucketIndex * 10) + 5;

  // Sample from the continuous function at the midpoint
  return getSemanticColor(midpoint);
}

/**
 * Converts a hex color to rgba format with alpha transparency.
 */
export function hexToRgba(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Color palette matching the Flutter app's SenseiColors.
 */
export const SenseiColors = {
  gray: {
    50: '#F7F7F7',
    100: '#EBEBEB',
    200: '#DDDDDD',
    300: '#B0B0B0',
    350: '#949494',
    400: '#717171',
    500: '#535353',
    600: '#3F3F3F',
    700: '#212121',
    800: '#111111',
    900: '#000000',
  },
  darkGray: '#111111',
  blue: '#2196F3',
  darkBlue: '#0E7DD6',
  white: '#FFFFFF',
  senseiBlue: '#1F4DB8',
  forestGreen: '#137e66',
  cleanAccentColor: '#3B82F6',
  cleanAccentColorDark: '#2563EB',
  cyan: '#4DD0E1',
  cyanLight: '#80DEEA',
  cyanDark: '#26C6DA',
  darkBg1: '#1a1a2e',
  darkBg2: '#16213e',
  darkBg3: '#0f0f23',
} as const;
