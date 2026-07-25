"use client";

import {
  Command,
  GearSix,
  GithubLogo,
  SpeakerHigh,
  SpeakerSlash,
} from "@phosphor-icons/react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import type React from "react";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { TypevibeLogo } from "@/components/layout/typevibe-logo";
import { SettingsPanel } from "@/components/settings/settings-panel";
import { useSettings } from "@/components/settings/settings-provider";
import { DynamicFavicon } from "@/components/theme/dynamic-favicon";
import { SoundVisualizer } from "@/components/ui/sound-visualizer";
import { VisitCount } from "@/components/visit-count";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

interface AppChromeContextValue {
  homeLogoHandlerRef: React.MutableRefObject<(() => void) | null>;
  setSettingsOpen: (open: boolean) => void;
  setTypingActive: (active: boolean) => void;
  settingsOpen: boolean;
  typingActive: boolean;
}

const AppChromeContext = createContext<AppChromeContextValue | null>(null);

export function useAppChrome() {
  const ctx = useContext(AppChromeContext);
  if (!ctx) {
    throw new Error("useAppChrome must be used within AppChrome");
  }
  return ctx;
}

export function AppChrome({ children }: { children: ReactNode }) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [typingActive, setTypingActive] = useState(false);
  const homeLogoHandlerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* ignore */
      });
    }
  }, []);

  // âŒ˜K to toggle settings
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSettingsOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const value = useMemo(
    () => ({
      settingsOpen,
      setSettingsOpen,
      typingActive,
      setTypingActive,
      homeLogoHandlerRef,
    }),
    [settingsOpen, typingActive]
  );

  return (
    <AppChromeContext.Provider value={value}>
      <DynamicFavicon />
      <div className="flex min-h-dvh w-full flex-col">
        <SiteHeader />
        {children}
      </div>
      <SettingsPanel onOpenChange={setSettingsOpen} open={settingsOpen} />
    </AppChromeContext.Provider>
  );
}

function SiteHeader() {
  const router = useRouter();
  const { setSettingsOpen, typingActive, homeLogoHandlerRef } = useAppChrome();
  const { soundEnabled, setSoundEnabled } = useSettings();

  const dimHeader = typingActive;

  const [mouseHeaderVisible, setMouseHeaderVisible] = useState(false);
  const headerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const headerVisible = !typingActive || mouseHeaderVisible;

  useEffect(
    () => () => {
      if (headerTimerRef.current) {
        clearTimeout(headerTimerRef.current);
      }
    },
    []
  );

  const handleHeaderMouseMove = useCallback(() => {
    if (!typingActive) {
      return;
    }
    setMouseHeaderVisible(true);
    if (headerTimerRef.current) {
      clearTimeout(headerTimerRef.current);
    }
    headerTimerRef.current = setTimeout(
      () => setMouseHeaderVisible(false),
      2500
    );
  }, [typingActive]);

  function handleLogoClick() {
    if (homeLogoHandlerRef.current) {
      homeLogoHandlerRef.current();
      return;
    }
    router.push("/");
  }

  const headerOpacity = dimHeader ? (headerVisible ? 1 : 0.1) : 1;

  return (
    <motion.header
      animate={{ opacity: headerOpacity }}
      className="sticky top-0 z-50 flex shrink-0 justify-center px-4 py-3 md:px-8 md:py-4"
      onMouseMove={handleHeaderMouseMove}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="relative flex w-full max-w-5xl items-center justify-between rounded-full glass-card px-5 py-2.5 shadow-lg border border-foreground/10 transition-all duration-300">
        {/* Left - Logo */}
        <button
          className="group flex cursor-pointer items-center gap-2 font-bold text-xl tracking-tight text-foreground transition-all duration-200 hover:opacity-90"
          onClick={handleLogoClick}
          type="button"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary shadow-xs transition-transform duration-200 group-hover:scale-105">
            <TypevibeLogo size={18} />
          </div>
          <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent font-extrabold tracking-tight">
            Typevibe
          </span>
        </button>

        {/* Center - Visit counter (loads async, hidden until ready) */}
        <div className="pointer-events-none absolute inset-x-0 hidden justify-center md:flex">
          <VisitCount />
        </div>

        {/* Right - Audio, Settings, GitHub */}
        <div className="flex items-center gap-2">
          {/* Audio toggle with live sound wave visualizer */}
          <motion.button
            aria-label={soundEnabled ? "Mute audio" : "Unmute audio"}
            className={cn(
              "flex h-[34px] shrink-0 items-center gap-2 rounded-full px-3 text-[13px] font-medium transition-all duration-200 glass-pill",
              soundEnabled
                ? "text-foreground border-primary/30 bg-primary/10 shadow-xs"
                : "text-muted-foreground/40 hover:text-muted-foreground"
            )}
            onClick={() => setSoundEnabled(!soundEnabled)}
            type="button"
            whileTap={{ scale: 0.96 }}
          >
            <motion.span
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-1.5"
              initial={{ scale: 0.6, opacity: 0 }}
              key={String(soundEnabled)}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {soundEnabled ? (
                <SpeakerHigh className="text-primary" size={15} weight="duotone" />
              ) : (
                <SpeakerSlash size={15} weight="duotone" />
              )}
            </motion.span>
            <span className="hidden sm:inline font-medium">Audio</span>
            <SoundVisualizer active={soundEnabled && typingActive} barCount={4} />
          </motion.button>

          {/* Settings */}
          <motion.button
            aria-label="Settings"
            className="flex h-[34px] items-center gap-1.5 rounded-full px-3 text-[13px] font-medium text-muted-foreground transition-all duration-150 glass-pill hover:text-foreground"
            onClick={() => setSettingsOpen(true)}
            type="button"
            whileTap={{ scale: 0.96 }}
          >
            <GearSix size={15} weight="duotone" />
            <span className="hidden sm:inline">Settings</span>
            <kbd className="hidden items-center gap-px rounded border border-foreground/10 bg-foreground/[0.06] px-1.5 py-0.5 text-[10px] text-muted-foreground/50 leading-none sm:inline-flex">
              <Command size={10} weight="duotone" />
              <span>K</span>
            </kbd>
          </motion.button>

          {/* GitHub - primary pill */}
          <motion.a
            className="flex h-[34px] items-center gap-2 rounded-full bg-foreground px-4 text-[13px] font-semibold text-background shadow-md transition-transform hover:scale-105 active:scale-95"
            href={siteConfig.github}
            rel="noopener noreferrer"
            target="_blank"
            whileTap={{ scale: 0.96 }}
          >
            <GithubLogo size={15} weight="duotone" />
            <span className="hidden sm:inline">GitHub</span>
          </motion.a>
        </div>
      </div>
    </motion.header>
  );
}

