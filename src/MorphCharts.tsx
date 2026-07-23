"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type {
  CSSProperties,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
} from "react";
import "./MorphCharts.css";
import ThemeToggle, { useThemeState } from "./ThemeToggle";
import type { Theme } from "./ThemeToggle";
import {
  DEFAULT_BAR_GAP,
  DEFAULT_BAR_MAX_WIDTH,
  DEFAULT_BAR_MIN_HEIGHT,
  DEFAULT_GAP,
  DEFAULT_MIN_SIZE,
  DEFAULT_PALETTE,
  DEFAULT_PIE_MAX_RADIUS,
  DEFAULT_VALUE_SCALE,
  clipPathFor,
  itemKey,
  layoutBars,
  layoutBubbles,
  layoutPie,
  pieCenterOffset,
  restTransform,
} from "./utils";
import type {
  ChartItem,
  ChartView,
  Entry,
  ItemKey,
  LayoutOptions,
  LayoutResult,
  Placement,
  Shape,
} from "./utils";

export type { ChartItem, ChartView } from "./utils";

type CustomCSSProperties = CSSProperties & Record<`--${string}`, string>;

type SortField = "label" | "value";

// Same icon set (mdi:chart-bubble/chart-bar/chart-pie) as the view toggle
// on evoluteur-blog's topics page.
const VIEW_ICONS: Record<ChartView, JSX.Element> = {
  bubbles: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M7.2,11.2C8.97,11.2 10.4,12.63 10.4,14.4C10.4,16.17 8.97,17.6 7.2,17.6C5.43,17.6 4,16.17 4,14.4C4,12.63 5.43,11.2 7.2,11.2M14.8,16A2,2 0 0,1 16.8,18A2,2 0 0,1 14.8,20A2,2 0 0,1 12.8,18A2,2 0 0,1 14.8,16M15.2,4A4.8,4.8 0 0,1 20,8.8C20,11.45 17.85,13.6 15.2,13.6A4.8,4.8 0 0,1 10.4,8.8C10.4,6.15 12.55,4 15.2,4Z" />
    </svg>
  ),
  bars: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z" />
    </svg>
  ),
  pie: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M11,2V22C5.9,21.5 2,17.2 2,12C2,6.8 5.9,2.5 11,2M13,2V11H22C21.5,6.2 17.8,2.5 13,2M13,13V22C17.7,21.5 21.5,17.8 22,13H13Z" />
    </svg>
  ),
};

export interface MorphChartsProps {
  /** Items to display. `id` is optional; when omitted, `label` is used as the item's identity, so `label` should be unique. */
  data: ChartItem[];
  disabled?: boolean;
  className?: string;
  onItemClick?: (
    item: ChartItem,
    event: ReactMouseEvent | ReactKeyboardEvent,
  ) => void;

  /** Initial view when uncontrolled. Defaults to `"bubbles"`. */
  defaultView?: ChartView;
  /** Controls the view externally. Omit to let the component manage its own view state (uncontrolled). */
  view?: ChartView;
  onViewChange?: (view: ChartView) => void;
  /** Set to `false` to hide the built-in Bubbles/Bars/Pie toggle (e.g. if the host page drives `view` itself). */
  showViewToggle?: boolean;

  /** Formats each item's value for display under its label. Defaults to `String(value)`. */
  formatValue?: (value: number) => string;
  /** Color palette cycled for items without an explicit `color`. */
  palette?: string[];

  /** Baseline bubble diameter / minimum bar height contribution, in pixels, before `value` is added in. */
  minSize?: number;
  /** Minimum bar height, in pixels, before `value` is added in (bars view only). */
  barMinHeight?: number;
  /** Pixels added per unit of `value` to a bubble's diameter or a bar's height. */
  valueScale?: number;
  /** Gap between bubbles, in pixels (bubbles view only). */
  gap?: number;
  /** Gap between bars, in pixels (bars view only). */
  barGap?: number;
  /** Maximum bar width, in pixels (bars view only). */
  barMaxWidth?: number;
  /** Maximum pie radius, in pixels (pie view only). */
  pieMaxRadius?: number;

  theme?: Theme;
  defaultTheme?: Theme;
  onThemeChange?: (theme: Theme) => void;
  themeStorageKey?: string;
  /** Set to `false` to hide the built-in theme toggle. */
  showThemeToggle?: boolean;
}

/**
 * MorphCharts
 *
 * Displays a list of items as a bubble chart, bar chart, or pie chart,
 * with animated morphing transitions between views, on hover, and on
 * resize.
 */
export default function MorphCharts({
  data,
  disabled = false,
  className = "",
  onItemClick,
  defaultView = "bubbles",
  view,
  onViewChange,
  showViewToggle = true,
  formatValue = (value) => String(value),
  palette = DEFAULT_PALETTE,
  minSize = DEFAULT_MIN_SIZE,
  barMinHeight = DEFAULT_BAR_MIN_HEIGHT,
  valueScale = DEFAULT_VALUE_SCALE,
  gap = DEFAULT_GAP,
  barGap = DEFAULT_BAR_GAP,
  barMaxWidth = DEFAULT_BAR_MAX_WIDTH,
  pieMaxRadius = DEFAULT_PIE_MAX_RADIUS,
  theme,
  defaultTheme,
  onThemeChange,
  themeStorageKey,
  showThemeToggle = true,
}: MorphChartsProps) {
  const [internalView, setInternalView] = useState<ChartView>(defaultView);
  const isViewControlled = view !== undefined;
  const currentView = isViewControlled ? (view as ChartView) : internalView;

  const [currentTheme, setTheme] = useThemeState({
    theme,
    defaultTheme,
    onThemeChange,
    storageKey: themeStorageKey,
  });
  const [activeKey, setActiveKey] = useState<ItemKey | null>(null);
  const [ready, setReady] = useState(false);
  const [sortField, setSortField] = useState<SortField>("value");
  const [sortDirection, setSortDirection] = useState(-1);

  const sortedData = useMemo(() => {
    const copy = [...data];
    if (sortField === "value") {
      copy.sort((a, b) => sortDirection * (a.value - b.value));
    } else {
      copy.sort((a, b) => sortDirection * a.label.localeCompare(b.label));
    }
    return copy;
  }, [data, sortField, sortDirection]);

  const vizRef = useRef<HTMLDivElement | null>(null);
  const itemElsRef = useRef<Map<ItemKey, HTMLDivElement>>(new Map());
  const labelElsRef = useRef<Map<ItemKey, HTMLDivElement>>(new Map());
  const lastPosRef = useRef<Map<ItemKey, Placement>>(new Map());
  const layoutRef = useRef<() => void>(() => {});

  function runLayout() {
    const viz = vizRef.current;
    if (!viz) return;
    const width = viz.clientWidth;
    const opts: LayoutOptions = {
      minSize,
      barMinHeight,
      valueScale,
      gap,
      barGap,
      barMaxWidth,
      pieMaxRadius,
    };
    const entries: Entry[] = sortedData.map((item) => ({
      key: itemKey(item),
      value: item.value,
    }));

    let result: LayoutResult;
    if (currentView === "bars") result = layoutBars(width, entries, opts);
    else if (currentView === "pie") result = layoutPie(width, entries, opts);
    else result = layoutBubbles(width, entries, opts);

    let maxBottom = 0;
    entries.forEach((entry) => {
      const p = result.positions.get(entry.key);
      const el = itemElsRef.current.get(entry.key);
      if (!p || !el) return;
      lastPosRef.current.set(entry.key, p);
      maxBottom = Math.max(maxBottom, p.y + p.h);

      el.style.width = `${p.w}px`;
      el.style.height = `${p.h}px`;
      el.style.transform = restTransform(p);

      const shape: Shape = currentView === "bars" ? "rect" : "circle";
      const start = p.startAngle ?? 0;
      const end = p.endAngle ?? 360;
      el.style.clipPath = clipPathFor(shape, start, end, currentView === "pie");

      const label = labelElsRef.current.get(entry.key);
      if (label) {
        if (currentView === "pie" && p.startAngle !== undefined) {
          const mid = (p.startAngle + (p.endAngle ?? 0)) / 2;
          const rad = (mid * Math.PI) / 180;
          const r = p.w / 2;
          const dx = Math.sin(rad) * r * 0.62;
          const dy = -Math.cos(rad) * r * 0.62;
          label.style.transform = `translate(${dx}px, ${dy}px)`;
        } else {
          label.style.transform = "translate(0px, 0px)";
        }
      }
    });

    viz.style.height = `${maxBottom}px`;
  }

  layoutRef.current = runLayout;

  useLayoutEffect(() => {
    runLayout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    sortedData,
    currentView,
    minSize,
    barMinHeight,
    valueScale,
    gap,
    barGap,
    barMaxWidth,
    pieMaxRadius,
  ]);

  useEffect(() => {
    const viz = vizRef.current;
    if (!viz) return undefined;
    const observer = new ResizeObserver(() => layoutRef.current());
    observer.observe(viz);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  function handleEnter(key: ItemKey) {
    if (disabled) return;
    const el = itemElsRef.current.get(key);
    const p = lastPosRef.current.get(key);
    if (!el || !p) return;
    if (currentView === "bubbles") {
      el.style.transform = `translate(${p.x}px, ${p.y}px) scale(1.35)`;
      el.style.zIndex = "5";
    } else if (currentView === "bars") {
      const scale = 1.4;
      const yOffset = (p.h * (scale - 1)) / 2;
      el.style.transform = `translate(${p.x}px, ${p.y - yOffset}px) scale(${scale})`;
      el.style.zIndex = "5";
    } else if (currentView === "pie" && p.startAngle !== undefined) {
      const { dx, dy } = pieCenterOffset(p, 20);
      el.style.transform = `translate(${p.x + dx}px, ${p.y + dy}px)`;
      el.style.zIndex = "5";
    }
  }

  function handleLeave(key: ItemKey) {
    const el = itemElsRef.current.get(key);
    const p = lastPosRef.current.get(key);
    if (!el || !p) return;
    el.style.transform = restTransform(p);
    el.style.zIndex = "";
  }

  function selectView(next: ChartView) {
    if (disabled || next === currentView) return;
    if (!isViewControlled) setInternalView(next);
    onViewChange?.(next);
  }

  function handleSort(field: SortField) {
    if (disabled) return;
    setSortDirection(field === sortField ? -sortDirection : 1);
    setSortField(field);
  }

  function sortCaret(field: SortField) {
    if (sortField !== field) return null;
    return (
      <svg
        className="rmc-sort-caret"
        viewBox="0 0 10 6"
        width="8"
        height="8"
        aria-hidden="true"
        style={
          sortDirection === -1 ? { transform: "rotate(180deg)" } : undefined
        }
      >
        <path d="M5 0L10 6H0Z" fill="currentColor" />
      </svg>
    );
  }

  const canClickItems = !disabled && typeof onItemClick === "function";

  function toggleActive(item: ChartItem) {
    const key = itemKey(item);
    setActiveKey((prev) => (prev === key ? null : key));
  }

  function handleItemClick(
    item: ChartItem,
    event: ReactMouseEvent<HTMLDivElement>,
  ) {
    if (disabled) return;
    toggleActive(item);
    onItemClick?.(item, event);
  }

  function handleItemKeyDown(
    item: ChartItem,
    event: ReactKeyboardEvent<HTMLDivElement>,
  ) {
    if (disabled) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleActive(item);
      onItemClick?.(item, event);
    }
  }

  const rootClassName = [
    "rmc",
    ready ? "rmc--ready" : "",
    disabled ? "rmc--disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClassName} data-theme={currentTheme}>
      <div className="rmc-toolbar">
        <div className="rmc-controls">
          <div className="rmc-sort" role="group" aria-label="Sort by">
            <span className="rmc-toolbar-label">Sort:</span>
            <button
              type="button"
              disabled={disabled}
              aria-pressed={sortField === "label"}
              onClick={() => handleSort("label")}
            >
              Label
              {sortCaret("label")}
            </button>
            <button
              type="button"
              disabled={disabled}
              aria-pressed={sortField === "value"}
              onClick={() => handleSort("value")}
            >
              Value
              {sortCaret("value")}
            </button>
          </div>
          {showViewToggle && (
            <div className="rmc-view-toggle" role="group" aria-label="Chart view">
              <button
                type="button"
                disabled={disabled}
                aria-pressed={currentView === "bubbles"}
                onClick={() => selectView("bubbles")}
              >
                {VIEW_ICONS.bubbles} Bubbles
              </button>
              <button
                type="button"
                disabled={disabled}
                aria-pressed={currentView === "bars"}
                onClick={() => selectView("bars")}
              >
                {VIEW_ICONS.bars} Bars
              </button>
              <button
                type="button"
                disabled={disabled}
                aria-pressed={currentView === "pie"}
                onClick={() => selectView("pie")}
              >
                {VIEW_ICONS.pie} Pie
              </button>
            </div>
          )}
        </div>
        {showThemeToggle && (
          <ThemeToggle theme={currentTheme} onChange={setTheme} disabled={disabled} />
        )}
      </div>

      <div className="rmc-viz" data-view={currentView} ref={vizRef}>
        {data.map((item, index) => {
          const key = itemKey(item);
          const color = item.color ?? palette[index % palette.length];
          return (
            <div
              key={key}
              ref={(el) => {
                if (el) itemElsRef.current.set(key, el);
                else itemElsRef.current.delete(key);
              }}
              className={`rmc-item${key === activeKey ? " rmc-item--active" : ""}`}
              style={{ "--rmc-accent": color } as CustomCSSProperties}
              onMouseEnter={() => handleEnter(key)}
              onMouseLeave={() => handleLeave(key)}
              onClick={(event) => handleItemClick(item, event)}
              onKeyDown={(event) => handleItemKeyDown(item, event)}
              role={canClickItems ? "button" : undefined}
              tabIndex={canClickItems ? 0 : undefined}
              aria-disabled={disabled || undefined}
              aria-pressed={canClickItems ? key === activeKey : undefined}
            >
              <div
                className="rmc-label"
                ref={(el) => {
                  if (el) labelElsRef.current.set(key, el);
                  else labelElsRef.current.delete(key);
                }}
              >
                <span className="rmc-name">
                  <span className="rmc-name-text">{item.label}</span>
                </span>
                <span className="rmc-value">{formatValue(item.value)}</span>
                {item.sublabel && (
                  <span className="rmc-sublabel">{item.sublabel}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
