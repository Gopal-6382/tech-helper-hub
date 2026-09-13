// src/frontend/providers/theme-provider.tsx
"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useSyncExternalStore,
} from "react";

type ColorTheme =
  "default" | "blue" | "green" | "orange" | "purple" | "teal" | "red";
const COLOR_THEMES: ColorTheme[] = [
  "default",
  "blue",
  "green",
  "orange",
  "purple",
  "teal",
  "red",
];
const STORAGE_KEY = "color-theme";
const CHANGE_EVENT = "color-theme-change";

function readStoredTheme(): ColorTheme {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && COLOR_THEMES.includes(stored as ColorTheme)) {
      return stored as ColorTheme;
    }
  } catch {
    // localStorage blocked/unavailable — fall back to default
  }
  return "default";
}

// useSyncExternalStore needs a subscribe fn: called once, must return an unsubscribe fn.
// "storage" only fires in OTHER tabs, so we dispatch a custom event for same-tab updates too.
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

// Server has no window/localStorage — always render the safe default (black/white) on the server
// and on the client's very first paint, before hydration reconciles the real value. No mismatch warning.
function getServerSnapshot(): ColorTheme {
  return "default";
}

const ColorThemeContext = createContext<{
  colorTheme: ColorTheme;
  setColorTheme: (t: ColorTheme) => void;
} | null>(null);

export function ColorThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // No setState anywhere here — useSyncExternalStore owns the read + re-render subscription itself.
  const colorTheme = useSyncExternalStore(
    subscribe,
    readStoredTheme,
    getServerSnapshot,
  );

  // This effect only WRITES to an external system (the DOM attribute) from current React state —
  // it never calls setState, so it doesn't trigger the lint warning.
  useEffect(() => {
    if (colorTheme === "default") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", colorTheme);
    }
  }, [colorTheme]);

  const setColorTheme = useCallback((t: ColorTheme) => {
    const safe = COLOR_THEMES.includes(t) ? t : "default";
    try {
      window.localStorage.setItem(STORAGE_KEY, safe);
    } catch {
      // storage write blocked — still notify this tab so the session-only change applies
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return (
    <ColorThemeContext.Provider value={{ colorTheme, setColorTheme }}>
      {children}
    </ColorThemeContext.Provider>
  );
}

export function useColorTheme() {
  const ctx = useContext(ColorThemeContext);
  if (!ctx)
    throw new Error("useColorTheme must be used within ColorThemeProvider");
  return ctx;
}
