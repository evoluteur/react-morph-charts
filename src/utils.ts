export type ChartView = "bubbles" | "bars" | "pie";

export interface ChartItem {
  id?: string | number;
  label: string;
  value: number;
  color?: string;
  sublabel?: string;
}

export interface Placement {
  x: number;
  y: number;
  w: number;
  h: number;
  startAngle?: number;
  endAngle?: number;
}

export type ItemKey = string;
export type Shape = "circle" | "rect";

export const itemKey = (item: ChartItem): ItemKey =>
  String(item.id ?? item.label);

export const DEFAULT_PALETTE = [
  "#f44336",
  "#ff9800",
  "#ffc107",
  "#4caf50",
  "#00bcd4",
  "#3f51b5",
  "#9c27b0",
];

export const DEFAULT_MIN_SIZE = 60;
export const DEFAULT_BAR_MIN_HEIGHT = 40;
export const DEFAULT_VALUE_SCALE = 40;
export const DEFAULT_GAP = 6;
export const DEFAULT_BAR_GAP = 16;
export const DEFAULT_BAR_MAX_WIDTH = 80;
export const DEFAULT_PIE_MAX_RADIUS = 170;

const CLIP_STEPS = 48;
const CLUSTER_ITERATIONS = 300;
// Pulling harder on the y-axis than the x-axis flattens the relaxed
// cluster into a wide horizontal band instead of a square — bubbles stay
// circular (the pull only shapes the cluster, not individual circles).
const CLUSTER_PULL_X = 0.012;
const CLUSTER_PULL_Y = 0.05;

export interface LayoutOptions {
  minSize: number;
  barMinHeight: number;
  valueScale: number;
  gap: number;
  barGap: number;
  barMaxWidth: number;
  pieMaxRadius: number;
}

export interface Entry {
  key: ItemKey;
  value: number;
}

export interface LayoutResult {
  positions: Map<ItemKey, Placement>;
  height: number;
}

// Packs bubbles into a tight, organic cluster instead of neat rows: seed
// each circle along a spiral, then relax the whole set for a fixed number
// of iterations, pulling everything toward the center and pushing
// overlapping circles apart (bigger circles yield less, so they settle
// near the middle while smaller ones fill the gaps around them).
export function layoutBubbles(
  width: number,
  entries: Entry[],
  opts: LayoutOptions,
): LayoutResult {
  const positions = new Map<ItemKey, Placement>();

  type Circle = { key: ItemKey; r: number; x: number; y: number };
  const circles: Circle[] = entries.map((entry, i) => {
    const d = opts.minSize + entry.value * opts.valueScale;
    const angle = i * 2.4;
    const spread = 4 * Math.sqrt(i);
    return {
      key: entry.key,
      r: d / 2,
      x: Math.cos(angle) * spread,
      y: Math.sin(angle) * spread,
    };
  });

  if (circles.length === 0) return { positions, height: 0 };

  for (let iter = 0; iter < CLUSTER_ITERATIONS; iter++) {
    circles.forEach((c) => {
      c.x -= c.x * CLUSTER_PULL_X;
      c.y -= c.y * CLUSTER_PULL_Y;
    });
    for (let a = 0; a < circles.length; a++) {
      for (let b = a + 1; b < circles.length; b++) {
        const c1 = circles[a];
        const c2 = circles[b];
        const dx = c2.x - c1.x;
        const dy = c2.y - c1.y;
        const dist = Math.hypot(dx, dy) || 0.01;
        const minDist = c1.r + c2.r + opts.gap;
        if (dist < minDist) {
          const overlap = minDist - dist;
          const totalR = c1.r + c2.r;
          const ux = dx / dist;
          const uy = dy / dist;
          const push1 = overlap * (c2.r / totalR);
          const push2 = overlap * (c1.r / totalR);
          c1.x -= ux * push1;
          c1.y -= uy * push1;
          c2.x += ux * push2;
          c2.y += uy * push2;
        }
      }
    }
  }

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  circles.forEach((c) => {
    minX = Math.min(minX, c.x - c.r);
    maxX = Math.max(maxX, c.x + c.r);
    minY = Math.min(minY, c.y - c.r);
    maxY = Math.max(maxY, c.y + c.r);
  });
  const clusterWidth = Math.max(maxX - minX, 1);
  const scale = Math.min(1, (width - 20) / clusterWidth);
  const offsetX = (width - clusterWidth * scale) / 2;

  circles.forEach((c) => {
    positions.set(c.key, {
      x: offsetX + (c.x - c.r - minX) * scale,
      y: (c.y - c.r - minY) * scale,
      w: c.r * 2 * scale,
      h: c.r * 2 * scale,
    });
  });

  return { positions, height: (maxY - minY) * scale };
}

export function layoutBars(
  width: number,
  entries: Entry[],
  opts: LayoutOptions,
): LayoutResult {
  const positions = new Map<ItemKey, Placement>();
  const n = Math.max(entries.length, 1);
  const barWidth = Math.min(
    opts.barMaxWidth,
    (width - opts.barGap * (n - 1)) / n,
  );
  const totalWidth = barWidth * n + opts.barGap * (n - 1);
  const offsetX = Math.max((width - totalWidth) / 2, 0);

  const heights = entries.map(
    (e) => opts.barMinHeight + e.value * opts.valueScale,
  );
  const maxHeight = Math.max(...heights, opts.barMinHeight);

  entries.forEach((entry, i) => {
    const h = heights[i];
    positions.set(entry.key, {
      x: offsetX + i * (barWidth + opts.barGap),
      y: maxHeight - h,
      w: barWidth,
      h,
    });
  });

  return { positions, height: maxHeight };
}

export function layoutPie(
  width: number,
  entries: Entry[],
  opts: LayoutOptions,
): LayoutResult {
  const positions = new Map<ItemKey, Placement>();
  const total = entries.reduce((sum, e) => sum + e.value, 0) || 1;
  const R = Math.max(Math.min(opts.pieMaxRadius, width / 2 - 10), 60);
  const diameter = R * 2;
  const centerX = width / 2;
  const centerY = R;

  let angle = 0;
  entries.forEach((entry) => {
    const sweep = (entry.value / total) * 360;
    positions.set(entry.key, {
      x: centerX - R,
      y: centerY - R,
      w: diameter,
      h: diameter,
      startAngle: angle,
      endAngle: angle + sweep,
    });
    angle += sweep;
  });

  return { positions, height: diameter };
}

function pointOnShape(shape: Shape, angleDeg: number): [number, number] {
  const rad = (angleDeg * Math.PI) / 180;
  const dx = Math.sin(rad);
  const dy = -Math.cos(rad);
  if (shape === "rect") {
    const scale = 50 / Math.max(Math.abs(dx), Math.abs(dy), 0.0001);
    return [50 + dx * scale, 50 + dy * scale];
  }
  return [50 + dx * 50, 50 + dy * 50];
}

export function clipPathFor(
  shape: Shape,
  startAngle: number,
  endAngle: number,
  useCenterAnchor: boolean,
) {
  const pts: string[] = [];
  if (useCenterAnchor) {
    pts.push("50% 50%");
  } else {
    const [ax, ay] = pointOnShape(shape, startAngle);
    pts.push(`${ax}% ${ay}%`);
  }
  for (let i = 0; i <= CLIP_STEPS; i++) {
    const angle = startAngle + ((endAngle - startAngle) * i) / CLIP_STEPS;
    const [x, y] = pointOnShape(shape, angle);
    pts.push(`${x}% ${y}%`);
  }
  return `polygon(${pts.join(",")})`;
}

export function pieCenterOffset(p: Placement, distance: number) {
  if (p.startAngle === undefined) return { dx: 0, dy: 0 };
  const mid = (p.startAngle + (p.endAngle ?? 0)) / 2;
  const rad = (mid * Math.PI) / 180;
  return { dx: Math.sin(rad) * distance, dy: -Math.cos(rad) * distance };
}

export function restTransform(p: Placement) {
  return `translate(${p.x}px, ${p.y}px)`;
}
