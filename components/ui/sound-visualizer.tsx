"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface SoundVisualizerProps {
  active?: boolean;
  barCount?: number;
  className?: string;
}

export function SoundVisualizer({
  active = false,
  barCount = 4,
  className = "",
}: SoundVisualizerProps) {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setPulse((p) => (p + 1) % 100);
    }, 120);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div
      className={`flex h-3.5 items-center justify-center gap-0.5 shrink-0 ${className}`}
      title={active ? "Sound Active" : "Sound Idle"}
    >
      {Array.from({ length: barCount }).map((_, i) => {
        const scaleY = active ? (Math.sin(pulse + i * 1.5) * 0.45 + 0.55) : 0.25;

        return (
          <motion.span
            key={i}
            animate={{ scaleY }}
            className={`h-3.5 w-0.5 rounded-full origin-center transition-colors duration-150 ${
              active
                ? i % 2 === 0
                  ? "bg-primary"
                  : "bg-foreground/80"
                : "bg-muted-foreground/30"
            }`}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          />
        );
      })}
    </div>
  );
}
