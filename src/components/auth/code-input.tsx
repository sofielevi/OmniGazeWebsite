"use client";

import { useRef, useState, useEffect, KeyboardEvent, ClipboardEvent } from "react";
import { cn } from "@/lib/utils";

interface CodeInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  autoFocus?: boolean;
}

export function CodeInput({
  length = 6,
  value,
  onChange,
  error,
  disabled = false,
  autoFocus = true,
}: CodeInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // Split value into individual characters
  const chars = value.split("").slice(0, length);
  while (chars.length < length) {
    chars.push("");
  }

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const handleChange = (index: number, char: string) => {
    // Only accept alphanumeric characters
    const sanitized = char.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    if (!sanitized) return;

    const newChars = [...chars];
    newChars[index] = sanitized[0];
    const newValue = newChars.join("");
    onChange(newValue);

    // Move to next input
    if (index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newChars = [...chars];

      if (chars[index]) {
        // Clear current field
        newChars[index] = "";
        onChange(newChars.join(""));
      } else if (index > 0) {
        // Move to previous field and clear it
        newChars[index - 1] = "";
        onChange(newChars.join(""));
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData
      .getData("text")
      .replace(/[^a-zA-Z0-9]/g, "")
      .toUpperCase()
      .slice(0, length);

    if (pastedText) {
      onChange(pastedText);
      // Focus the next empty field or the last field
      const nextIndex = Math.min(pastedText.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2 justify-center">
        {chars.map((char, index) => (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el; }}
            type="text"
            inputMode="text"
            maxLength={1}
            value={char}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
            disabled={disabled}
            autoComplete="off"
            className={cn(
              "w-12 h-14 text-center text-2xl font-mono font-bold rounded-lg",
              "bg-[var(--bg-elevated)] border-2",
              "text-[var(--text-primary)] uppercase",
              "focus:outline-none transition-all duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error
                ? "border-red-500"
                : focusedIndex === index
                ? "border-[var(--amber-400)] ring-2 ring-[var(--amber-400)]/30"
                : char
                ? "border-[var(--amber-400)]/50"
                : "border-[var(--border-subtle)]"
            )}
          />
        ))}
      </div>
      {error && (
        <p className="text-sm text-red-400 text-center">{error}</p>
      )}
    </div>
  );
}
