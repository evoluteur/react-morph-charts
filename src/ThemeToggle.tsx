"use client";

import { useState } from "react";
import type { ReactElement } from "react";

export const THEMES = ["light", "dark", "omg"] as const;
export type Theme = (typeof THEMES)[number];

const ICONS: Record<Theme, ReactElement> = {
  light: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z" />
    </svg>
  ),
  dark: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z" />
    </svg>
  ),
  omg: (
    <svg
      viewBox="0 0 20 20"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M10 10 10.18 10.07 10.28 10.25 10.26 10.5 10.09 10.74 9.78 10.91 9.37 10.93 8.93 10.75 8.55 10.37 8.32 9.81 8.33 9.15 8.61 8.47 9.17 7.91 9.96 7.56 10.89 7.53 11.83 7.86 12.63 8.55 13.16 9.55 13.29 10.74 12.98 11.96 12.2 13.03 11.04 13.8 9.61 14.11 8.1 13.87 6.72 13.08 5.67 11.79 5.13 10.15 5.21 8.36 5.95 6.65 7.31 5.28 9.12 4.44 11.18 4.31 13.21 4.93 14.95 6.28 16.12 8.22 16.54 10.51 16.11 12.87 14.83 14.98 12.83 16.54 10.34 17.3 7.68 17.13" />
    </svg>
  ),
};

// localStorage can throw (Safari private mode, blocked storage, sandboxed iframes).
function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
}

let toggleCounter = 0;

function getSystemTheme(): Theme {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export interface UseThemeStateOptions {
  theme?: Theme;
  defaultTheme?: Theme;
  onThemeChange?: (theme: Theme) => void;
  storageKey?: string;
}

/**
 * Manages the light/dark/omg theme state for MorphCharts.
 * Uncontrolled by default (persists to localStorage under `storageKey`
 * when provided); pass `theme` to control it externally instead.
 */
export function useThemeState({
  theme,
  defaultTheme,
  onThemeChange,
  storageKey,
}: UseThemeStateOptions): [Theme, (next: Theme) => void] {
  const isControlled = theme !== undefined;

  const [internalTheme, setInternalTheme] = useState<Theme>(() => {
    if (isControlled) return theme;
    if (storageKey) {
      const stored = readStorage(storageKey);
      if (stored && (THEMES as readonly string[]).includes(stored)) {
        return stored as Theme;
      }
    }
    return defaultTheme ?? getSystemTheme();
  });

  const currentTheme = isControlled ? theme : internalTheme;

  const setTheme = (next: Theme) => {
    if (!isControlled) {
      setInternalTheme(next);
      if (storageKey) writeStorage(storageKey, next);
    }
    onThemeChange?.(next);
  };

  return [currentTheme, setTheme];
}

export interface ThemeToggleProps {
  theme: Theme;
  onChange: (theme: Theme) => void;
  disabled?: boolean;
}

export default function ThemeToggle({ theme, onChange, disabled }: ThemeToggleProps) {
  // Each toggle needs its own radio group name; a shared name links the
  // radios of every instance on the page (checked state + arrow keys).
  const [groupName] = useState(() => `rmc-theme-toggle-${++toggleCounter}`);
  return (
    <div className="rmc-theme-toggle" role="radiogroup" aria-label="Theme">
      {THEMES.map((t) => (
        <label
          key={t}
          className={t === theme ? "rmc-theme-checked" : ""}
          title={`Use ${t} theme`}
        >
          {ICONS[t]}
          <input
            type="radio"
            name={groupName}
            checked={t === theme}
            value={t}
            disabled={disabled}
            aria-label={`Use ${t} theme`}
            onChange={() => onChange(t)}
          />
        </label>
      ))}
    </div>
  );
}
