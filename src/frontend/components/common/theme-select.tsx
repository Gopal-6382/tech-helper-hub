"use client";

import { Check, Palette } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/frontend/components/ui/select";

import {
  COLOR_THEMES,
  type ColorTheme,
  useColorTheme,
} from "@/frontend/providers/theme-provider";

const THEME_LABELS: Record<ColorTheme, string> = {
  default: "Default",
  blue: "Blue",
  green: "Green",
  orange: "Orange",
  purple: "Purple",
  teal: "Teal",
  red: "Red",
  pink: "Pink",
  indigo: "Indigo",
  yellow: "Yellow",
  cyan: "Cyan",
  rose: "Rose",
};

const THEME_COLORS: Record<ColorTheme, string> = {
  default: "bg-neutral-900",
  blue: "bg-blue-600",
  green: "bg-emerald-600",
  orange: "bg-orange-500",
  purple: "bg-purple-600",
  teal: "bg-teal-600",
  red: "bg-red-600",
  pink: "bg-pink-500",
  indigo: "bg-indigo-500",
  yellow: "bg-yellow-500",
  cyan: "bg-cyan-500",
  rose: "bg-rose-600",
};

export function ThemeSelect() {
  const { colorTheme, setColorTheme } = useColorTheme();

  return (
    <Select
      value={colorTheme}
      onValueChange={(value) => {
        setColorTheme(value as ColorTheme);
      }}
    >
      <SelectTrigger className="w-full">
        <div className="flex items-center gap-2">
          <Palette className="size-4 text-muted-foreground" />

          <SelectValue placeholder="Select theme" />
        </div>
      </SelectTrigger>

      <SelectContent>
        {COLOR_THEMES.map((theme) => (
          <SelectItem key={theme} value={theme}>
            <div className="flex items-center gap-2">
              <span className={`size-3 rounded-full ${THEME_COLORS[theme]}`} />

              <span>{THEME_LABELS[theme]}</span>

              {colorTheme === theme && <Check className="ml-auto size-4" />}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
