/**
 * Formats a number for display (e.g., 1500 -> "1.5k")
 */
export function formatScore(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num.toString();
}
