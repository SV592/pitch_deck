"use client";

import { useEffect } from "react";

export interface ShortcutHandlers {
  onSave: () => void;
  onPrevSlide: () => void;
  onNextSlide: () => void;
  onAddSlide: () => void;
  onDeleteSlide: () => void;
  onRegenerate: () => void;
}

// Is the user currently typing into an editable element? Navigation and
// single-key shortcuts must not fire mid-edit; only Save is allowed through.
const isEditableTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target.isContentEditable ||
    !!target.closest('[contenteditable="true"]')
  );
};

// Editor-essential keyboard shortcuts, centralized so every binding lives in one
// place. Save works anywhere; the rest are suppressed while editing text.
export const useKeyboardShortcuts = (handlers: ShortcutHandlers): void => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const mod = event.ctrlKey || event.metaKey;

      // Save — Ctrl/Cmd+S, available even while editing.
      if (mod && event.key.toLowerCase() === "s") {
        event.preventDefault();
        handlers.onSave();
        return;
      }

      const editing = isEditableTarget(event.target);

      // Slide navigation — arrows, with or without the modifier.
      if (event.key === "ArrowLeft" && (mod || !editing)) {
        event.preventDefault();
        handlers.onPrevSlide();
        return;
      }
      if (event.key === "ArrowRight" && (mod || !editing)) {
        event.preventDefault();
        handlers.onNextSlide();
        return;
      }

      // Single-key shortcuts only when not typing.
      if (editing) return;

      switch (event.key.toLowerCase()) {
        case "n":
          event.preventDefault();
          handlers.onAddSlide();
          break;
        case "delete":
          event.preventDefault();
          handlers.onDeleteSlide();
          break;
        case "r":
          event.preventDefault();
          handlers.onRegenerate();
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handlers]);
};
