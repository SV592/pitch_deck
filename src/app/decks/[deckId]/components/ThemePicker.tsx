"use client";

import React from "react";
import { DECK_THEME_PRESETS } from "./deck-themes";

interface ThemePickerProps {
  value: string;
  onChange: (id: string) => void;
}

const ThemePicker: React.FC<ThemePickerProps> = ({ value, onChange }) => (
  <div className="flex items-center gap-2">
    <span className="text-sm font-medium text-gray-400 hidden sm:inline">
      Theme:
    </span>
    <div className="flex items-center gap-1.5">
      {DECK_THEME_PRESETS.map((preset) => {
        const active = preset.id === value;
        return (
          <button
            key={preset.id}
            type="button"
            onClick={() => onChange(preset.id)}
            title={preset.name}
            aria-label={`${preset.name} theme`}
            aria-pressed={active}
            className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-transform duration-150 ${
              active
                ? "border-white scale-110"
                : "border-transparent hover:scale-105"
            }`}
            style={{ backgroundColor: preset.theme.colorPalette.background }}
          >
            <span
              className="block w-2 h-2 rounded-full"
              style={{ backgroundColor: preset.theme.colorPalette.accent }}
            />
          </button>
        );
      })}
    </div>
  </div>
);

export default ThemePicker;
