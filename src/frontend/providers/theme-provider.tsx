"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";

export type ColorTheme =
  | "default"
  | "blue"
  | "green"
  | "orange"
  | "purple"
  | "teal"
  | "red"
  | "pink"
  | "indigo"
  | "yellow"
  | "cyan"
  | "rose";

export const COLOR_THEMES: readonly ColorTheme[] = [
  "default",
  "blue",
  "green",
  "orange",
  "purple",
  "teal",
  "red",
  "pink",
  "indigo",
  "yellow",
  "cyan",
  "rose",
] as const;

const STORAGE_KEY = "color-theme";
const CHANGE_EVENT = "color-theme-change";

function isColorTheme(value: string | null): value is ColorTheme {
  return value !== null && COLOR_THEMES.includes(value as ColorTheme);
}

function readStoredTheme(): ColorTheme {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (isColorTheme(stored)) {
      return stored;
    }
  } catch (err) {
    console.error(err);
  }

  return "default";
}

function subscribe(callback: () => void) {
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) {
      callback();
    }
  };

  const handleThemeChange = () => {
    callback();
  };

  window.addEventListener("storage", handleStorageChange);
  window.addEventListener(CHANGE_EVENT, handleThemeChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
    window.removeEventListener(CHANGE_EVENT, handleThemeChange);
  };
}

function getServerSnapshot(): ColorTheme {
  return "default";
}

const ColorThemeContext = createContext<{
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
} | null>(null);

export function ColorThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const colorTheme = useSyncExternalStore(
    subscribe,
    readStoredTheme,
    getServerSnapshot,
  );

  useEffect(() => {
    if (colorTheme === "default") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", colorTheme);
    }
  }, [colorTheme]);

  const setColorTheme = useCallback((theme: ColorTheme) => {
    const safeTheme = isColorTheme(theme) ? theme : "default";

    try {
      if (safeTheme === "default") {
        window.localStorage.removeItem(STORAGE_KEY);
      } else {
        window.localStorage.setItem(STORAGE_KEY, safeTheme);
      }
    } catch (err) {
      console.error(err);
    }

    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return (
    <ColorThemeContext.Provider
      value={{
        colorTheme,
        setColorTheme,
      }}
    >
      {children}
    </ColorThemeContext.Provider>
  );
}

export function useColorTheme() {
  const context = useContext(ColorThemeContext);

  if (!context) {
    throw new Error("useColorTheme must be used within ColorThemeProvider");
  }

  return context;
}
