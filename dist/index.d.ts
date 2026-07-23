import { JSX as JSX_2 } from 'react';
import { KeyboardEvent as KeyboardEvent_2 } from 'react';
import { MouseEvent as MouseEvent_2 } from 'react';

export declare interface ChartItem {
    id?: string | number;
    label: string;
    value: number;
    color?: string;
    sublabel?: string;
}

export declare type ChartView = "bubbles" | "bars" | "pie";

/**
 * MorphCharts
 *
 * Displays a list of items as a bubble chart, bar chart, or pie chart,
 * with animated morphing transitions between views, on hover, and on
 * resize.
 */
declare function MorphCharts({ data, disabled, className, onItemClick, defaultView, view, onViewChange, showViewToggle, formatValue, palette, minSize, barMinHeight, valueScale, gap, barGap, barMaxWidth, pieMaxRadius, theme, defaultTheme, onThemeChange, themeStorageKey, showThemeToggle, }: MorphChartsProps): JSX_2.Element;
export { MorphCharts }
export default MorphCharts;

export declare interface MorphChartsProps {
    /** Items to display. `id` is optional; when omitted, `label` is used as the item's identity, so `label` should be unique. */
    data: ChartItem[];
    disabled?: boolean;
    className?: string;
    onItemClick?: (item: ChartItem, event: MouseEvent_2 | KeyboardEvent_2) => void;
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

export declare type Theme = (typeof THEMES)[number];

export declare const THEMES: readonly ["light", "dark", "omg"];

export declare function ThemeToggle({ theme, onChange, disabled }: ThemeToggleProps): JSX_2.Element;

export declare interface ThemeToggleProps {
    theme: Theme;
    onChange: (theme: Theme) => void;
    disabled?: boolean;
}

/**
 * Manages the light/dark/omg theme state for MorphCharts.
 * Uncontrolled by default (persists to localStorage under `storageKey`
 * when provided); pass `theme` to control it externally instead.
 */
export declare function useThemeState({ theme, defaultTheme, onThemeChange, storageKey, }: UseThemeStateOptions): [Theme, (next: Theme) => void];

export declare interface UseThemeStateOptions {
    theme?: Theme;
    defaultTheme?: Theme;
    onThemeChange?: (theme: Theme) => void;
    storageKey?: string;
}

export { }
