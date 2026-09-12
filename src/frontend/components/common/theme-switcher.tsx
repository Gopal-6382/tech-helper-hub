"use client";
import { useTheme } from "next-themes";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className="border border-border bg-background text-foreground rounded px-2 py-1 text-sm"
    >
      <option value="light">Default</option>
      <option value="blue">Blue</option>
      <option value="dark">Dark</option>
    </select>
  );
}