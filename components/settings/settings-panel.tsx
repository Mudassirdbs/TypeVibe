"use client";

import { CaretRight, Check, Command, Sliders, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, useEffect, useState } from "react";
import {
  FONT_OPTIONS,
  THEME_OPTIONS,
  useSettings,
} from "@/components/settings/settings-provider";
import { NextThemeSwitcher } from "@/components/theme/next-theme-switcher";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { FontList } from "./font-picker";
import { ThemeGrid } from "./theme-picker";

interface SettingsPanelProps {
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

export function SettingsPanel({ open, onOpenChange }: SettingsPanelProps) {
  const {
    accent,
    setAccent,
    font,
    setFont,
    showKeyboard,
    setShowKeyboard,
    soundEnabled,
    setSoundEnabled,
    soundVolume,
    setSoundVolume,
    liveStats,
    setLiveStats,
    faahMode,
    setFaahMode,
    ghostMode,
    setGhostMode,
  } = useSettings();

  const [activeSubView, setActiveSubView] = useState<"themes" | "fonts" | null>(
    null
  );

  const selectedFont = FONT_OPTIONS.find((f) => f.id === font);
  const selectedTheme = THEME_OPTIONS.find((c) => c.id === accent);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (open && e.key === "Escape") {
        if (activeSubView) {
          setActiveSubView(null);
        } else {
          onOpenChange(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, activeSubView, onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            transition={{ duration: 0.2 }}
          />

          {/* Modal Container — Image 2 Super Dynamic Island style */}
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative z-10 flex flex-col w-full max-w-[580px] max-h-[85dvh] rounded-[28px] glass-card bg-background/95 dark:bg-[oklch(0.20_0.005_286)] border border-foreground/15 shadow-2xl overflow-hidden"
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-foreground/10 bg-foreground/[0.02]">
              <div>
                <h2 className="text-xl font-bold font-mono text-foreground tracking-tight flex items-center gap-2">
                  <Sliders className="text-primary" size={20} weight="duotone" />
                  Settings
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Customize theme, sound, and typing options
                </p>
              </div>
              <button
                className="flex items-center gap-1.5 rounded-full bg-foreground/[0.06] hover:bg-foreground/10 px-3 py-1 text-xs font-mono text-muted-foreground hover:text-foreground transition-all border border-foreground/10 cursor-pointer"
                onClick={() => onOpenChange(false)}
                type="button"
              >
                <span>Esc</span>
                <span className="opacity-60">Close</span>
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {activeSubView === "themes" ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-foreground/10">
                    <button
                      className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                      onClick={() => setActiveSubView(null)}
                      type="button"
                    >
                      ← Back to Settings
                    </button>
                    <span className="text-xs font-mono font-medium text-muted-foreground">Select Theme</span>
                  </div>
                  <ThemeGrid active={accent} onSelect={setAccent} />
                </div>
              ) : activeSubView === "fonts" ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-foreground/10">
                    <button
                      className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                      onClick={() => setActiveSubView(null)}
                      type="button"
                    >
                      ← Back to Settings
                    </button>
                    <span className="text-xs font-mono font-medium text-muted-foreground">Select Font</span>
                  </div>
                  <FontList active={font} onSelect={setFont} />
                </div>
              ) : (
                <>
                  {/* APPEARANCE */}
                  <Section title="APPEARANCE">
                    <CardRow label="Mode" description="Light or Dark mode">
                      <NextThemeSwitcher />
                    </CardRow>

                    <CardRow
                      description="Custom keyboard accent color"
                      label="Themes"
                      onClick={() => setActiveSubView("themes")}
                      preview={
                        <span className="flex items-center gap-2">
                          <span className="flex h-3.5 w-8 overflow-hidden rounded-full ring-1 ring-foreground/10">
                            {selectedTheme?.colors.map((c) => (
                              <span
                                className="flex-1"
                                key={c}
                                style={{ backgroundColor: c }}
                              />
                            ))}
                          </span>
                          <span className="text-xs font-medium text-foreground">
                            {selectedTheme?.label}
                          </span>
                        </span>
                      }
                    />

                    <CardRow
                      description="Typeface for test words"
                      label="Font"
                      onClick={() => setActiveSubView("fonts")}
                      preview={
                        <span
                          className="text-xs font-medium text-foreground"
                          style={{ fontFamily: selectedFont?.cssFamily }}
                        >
                          {selectedFont?.label ?? font}
                        </span>
                      }
                    />
                  </Section>

                  {/* KEYBOARD */}
                  <Section title="KEYBOARD">
                    <ToggleCard
                      description="Virtual keyboard below the test"
                      enabled={showKeyboard}
                      label="Show keyboard"
                      onToggle={() => setShowKeyboard(!showKeyboard)}
                    />
                    <ToggleCard
                      description="Mechanical key sound effects"
                      enabled={soundEnabled}
                      label="Sound"
                      onToggle={() => setSoundEnabled(!soundEnabled)}
                    />
                    {soundEnabled && (
                      <VolumeCard
                        onChange={setSoundVolume}
                        value={soundVolume}
                      />
                    )}
                  </Section>

                  {/* GAMEPLAY */}
                  <Section title="GAMEPLAY">
                    <ToggleCard
                      description="Show WPM and accuracy while typing"
                      enabled={liveStats}
                      label="Live stats"
                      onToggle={() => setLiveStats(!liveStats)}
                    />
                    <ToggleCard
                      description="Dim upcoming words for focus"
                      enabled={ghostMode}
                      label="Ghost mode"
                      onToggle={() => setGhostMode(!ghostMode)}
                    />
                    <ToggleCard
                      description="Sound on wrong keystrokes"
                      enabled={faahMode}
                      label="Faah mode"
                      onToggle={() => setFaahMode(!faahMode)}
                    />
                  </Section>
                </>
              )}
            </div>

            {/* Bottom Shortcut Footer Bar */}
            <div className="px-6 py-3.5 border-t border-foreground/10 bg-foreground/[0.02] flex items-center justify-between text-xs font-mono text-muted-foreground/70">
              <div className="flex items-center gap-1.5">
                <kbd className="inline-flex items-center gap-0.5 rounded border border-foreground/10 bg-foreground/[0.06] px-1.5 py-0.5 text-[10px]">
                  <Command size={10} />
                  <span>K</span>
                </kbd>
                <span>Toggle Settings</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="rounded border border-foreground/10 bg-foreground/[0.06] px-1.5 py-0.5 text-[10px]">
                  Esc
                </kbd>
                <span>Close</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ─── Helper Components ───────────────────────────────────── */

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-2">
      <p className="px-1 font-bold text-[11px] text-muted-foreground/60 uppercase tracking-widest font-mono">
        {title}
      </p>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function CardRow({
  label,
  description,
  preview,
  onClick,
  children,
}: {
  label: string;
  description?: string;
  preview?: ReactNode;
  onClick?: () => void;
  children?: ReactNode;
}) {
  const content = (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold text-foreground">{label}</span>
        {description && (
          <span className="text-xs text-muted-foreground">{description}</span>
        )}
      </div>
      {preview && (
        <div className="flex items-center gap-2">
          {preview}
          <CaretRight className="text-muted-foreground/40" size={14} />
        </div>
      )}
      {children}
    </div>
  );

  if (onClick) {
    return (
      <button
        className="flex w-full items-center justify-between rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-4 text-left transition-all duration-150 hover:bg-foreground/[0.05] hover:border-foreground/20 cursor-pointer shadow-xs"
        onClick={onClick}
        type="button"
      >
        {content}
      </button>
    );
  }

  return (
    <div className="flex w-full items-center justify-between rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-4 transition-all duration-150 shadow-xs">
      {content}
    </div>
  );
}

function ToggleCard({
  label,
  description,
  enabled,
  onToggle,
}: {
  label: string;
  description?: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      className="flex w-full items-center justify-between rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-4 text-left transition-all duration-150 hover:bg-foreground/[0.05] hover:border-foreground/20 cursor-pointer shadow-xs"
      onClick={onToggle}
      type="button"
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold text-foreground">{label}</span>
        {description && (
          <span className="text-xs text-muted-foreground">{description}</span>
        )}
      </div>
      <div
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 p-0.5",
          enabled ? "bg-primary" : "bg-foreground/15"
        )}
      >
        <span
          className={cn(
            "block h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200",
            enabled && "translate-x-5"
          )}
        />
      </div>
    </button>
  );
}

function VolumeCard({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-4 shadow-xs">
      <span className="text-xs font-semibold text-foreground shrink-0">Volume</span>
      <div className="flex items-center gap-3 flex-1">
        <Slider
          max={100}
          min={0}
          onValueChange={(v) => {
            const arr = Array.isArray(v) ? v : [v];
            onChange(arr[0] / 100);
          }}
          step={5}
          value={[value * 100]}
        />
        <span className="w-9 text-right font-mono text-xs text-foreground font-semibold tabular-nums">
          {Math.round(value * 100)}%
        </span>
      </div>
    </div>
  );
}
