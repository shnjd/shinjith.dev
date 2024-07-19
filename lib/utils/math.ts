export function getEllipseY(x: number, h: number, k: number, a: number, b: number) {
  const term = a * a - (x - h) * (x - h);
  if (term < 0) return 0;

  const sqrt = Math.sqrt(term);

  return k + (b * sqrt) / a;
}
