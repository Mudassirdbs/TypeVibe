"use client";

import { ArrowCounterClockwise, Cursor } from "@phosphor-icons/react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSettings } from "@/components/settings/settings-provider";
import { ResultsScreen } from "@/components/typing/results";
import { TestControls } from "@/components/typing/test-controls";
import { WordItem } from "@/components/typing/word-item";
import { useTypingTest } from "@/hooks/use-typing-test";
import { cn } from "@/lib/utils";

interface TypingTestProps {
  onFinished?: (finished: boolean) => void;
  onFocusChange?: (focused: boolean) => void;
  onKeyHighlight?: (key: string | null) => void;
  onTypingActiveChange?: (active: boolean) => void;
  pauseTypingInputRefocus?: boolean;
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: orchestrator component
export function TypingTest(props: TypingTestProps) {
  const { liveStats, faahMode, ghostMode } = useSettings();
  const faahAudioRef = useRef<HTMLAudioElement | null>(null);

  const onWrongKey = useCallback(() => {
    if (!faahMode) {
      return;
    }
    if (!faahAudioRef.current) {
      faahAudioRef.current = new Audio("/sounds/fahhhhh.mp3");
    }
    faahAudioRef.current.currentTime = 0;
    // biome-ignore lint/complexity/noVoid: fire-and-forget promise
    void faahAudioRef.current.play();
  }, [faahMode]);

  const {
    mode,
    timeOption,
    wordOption,
    quoteLength,
    punctuation,
    numbers,
    difficulty,
    words,
    typed,
    wordIndex,
    started,
    rowOffset,
    timeLeft,
    wordInputs,
    isFocused,
    resetting,
    isActivelyTyping,
    screenFade,
    wpm,
    accuracy,
    controlsVisible,
    showResults,
    frozenStats,
    inputRef,
    wordsContainerRef,
    activeWordRef,
    handleKeyDown,
    handleFocus,
    handleInputBlur,
    handleInputFocus,
    handleMouseMove,
    handleResultsRestart,
    handleResultsNext,
    onModeChange,
    onTimeOptionChange,
    onWordOptionChange,
    onQuoteLengthChange,
    onPunctuationToggle,
    onNumbersToggle,
    onDifficultyToggle,
    onRestart,
  } = useTypingTest({ ...props, onWrongKey });

  // Re-focus the hidden input on any keypress when it's blurred
  useEffect(() => {
    const handleGlobalKeyDown = () => {
      if (!isFocused && inputRef.current) {
        inputRef.current.focus();
      }
    };
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isFocused, inputRef]);

  if (showResults) {
    return (
      <div
        className="w-full transition-all duration-150 ease-out"
        style={{
          opacity: screenFade,
          filter: screenFade < 1 ? "blur(4px)" : "none",
        }}
      >
        <ResultsScreen
          onNext={handleResultsNext}
          onRestart={handleResultsRestart}
          stats={frozenStats!}
        />
      </div>
    );
  }

  let wordsOpacity = 0.15;
  if (resetting) {
    wordsOpacity = 0;
  } else if (isFocused) {
    wordsOpacity = 1;
  }

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: keyboard focus handled via global keydown listener
    // biome-ignore lint/a11y/noStaticElementInteractions: intentional click-to-focus area
    // biome-ignore lint/a11y/noNoninteractiveElementInteractions: intentional click-to-focus area
    <div
      className="flex w-full max-w-5xl flex-col items-center gap-3 transition-all duration-150 ease-out"
      onClick={handleFocus}
      onMouseMove={handleMouseMove}
      style={{
        opacity: screenFade,
        filter: screenFade < 1 ? "blur(4px)" : "none",
      }}
    >
      {/* Controls toolbar */}
      <TestControls
        controlsVisible={controlsVisible}
        difficulty={difficulty}
        mode={mode}
        numbers={numbers}
        onDifficultyToggle={onDifficultyToggle}
        onModeChange={onModeChange}
        onNumbersToggle={onNumbersToggle}
        onPunctuationToggle={onPunctuationToggle}
        onQuoteLengthChange={onQuoteLengthChange}
        onRestart={onRestart}
        onTimeOptionChange={onTimeOptionChange}
        onWordOptionChange={onWordOptionChange}
        punctuation={punctuation}
        quoteLength={quoteLength}
        timeOption={timeOption}
        wordOption={wordOption}
      />

      {/* Words display & Glass Arena */}
      <div className="relative w-full">
        {/* Live stats HUD bar */}
        <motion.div
          animate={{ opacity: resetting ? 0 : 1 }}
          className="mb-4 flex min-h-10 items-center justify-between"
          transition={{ duration: 0.15 }}
        >
          <div className="flex-1" />
          <div
            className={cn(
              "flex items-center gap-3 transition-all duration-300",
              started ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            )}
          >
            {/* Timer / progress HUD Pill */}
            {mode === "time" && (
              <div className="flex items-center gap-1.5 rounded-full glass-pill px-3.5 py-1 text-xs font-semibold text-foreground shadow-xs border border-primary/20">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="tabular-nums font-mono text-sm">{timeLeft}</span>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">sec</span>
              </div>
            )}
            {mode === "words" && (
              <div className="flex items-center gap-1.5 rounded-full glass-pill px-3.5 py-1 text-xs font-semibold text-foreground shadow-xs border border-primary/20">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="tabular-nums font-mono text-sm">{wordIndex}</span>
                <span className="text-[10px] text-muted-foreground font-medium">/{wordOption}</span>
              </div>
            )}

            {/* WPM + Accuracy HUD Pills */}
            {liveStats && (
              <>
                <div className="flex items-center gap-1.5 rounded-full glass-pill px-3.5 py-1 text-xs font-semibold text-foreground shadow-xs">
                  <span className="text-[10px] text-primary uppercase font-bold tracking-wider">WPM</span>
                  <span className="tabular-nums font-mono text-sm font-bold text-primary">{wpm}</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full glass-pill px-3.5 py-1 text-xs font-semibold text-foreground shadow-xs">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">ACC</span>
                  <span className="tabular-nums font-mono text-sm">{accuracy}%</span>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Elevated Glass Arena Card */}
        <div
          className={cn(
            "relative h-[7.8rem] w-full overflow-hidden text-2xl leading-relaxed",
            isActivelyTyping && "is-typing"
          )}
          ref={wordsContainerRef}
          style={{ fontFamily: "var(--typing-font)" }}
        >
          <input
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            autoFocus
            className="absolute opacity-0"
            onBlur={handleInputBlur}
            onChange={() => {
              /* controlled input */
            }}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            spellCheck={false}
            value={typed}
          />

          <LayoutGroup id="words">
            <motion.div
              animate={{
                y: -rowOffset,
                opacity: wordsOpacity,
                filter: resetting ? "blur(4px)" : "blur(0px)",
              }}
              className="flex flex-wrap gap-x-3 gap-y-1.5"
              transition={
                resetting
                  ? { duration: 0.15, ease: "easeOut" }
                  : { type: "spring", stiffness: 300, damping: 30, mass: 0.8 }
              }
            >
              {words.map((word, wIdx) => {
                const isActive = wIdx === wordIndex;
                const isPast = wIdx < wordIndex;
                const isFuture = !(isActive || isPast);
                let displayInput = "";
                if (isActive) {
                  displayInput = typed;
                } else if (isPast) {
                  displayInput = wordInputs[wIdx] ?? "";
                }
                const hasError = isPast && wordInputs[wIdx] !== word;
                const currentWordDone =
                  typed.length >= (words[wordIndex]?.length ?? 0);
                const isNextWord = wIdx === wordIndex + 1;
                const dimmed =
                  ghostMode &&
                  isFocused &&
                  isFuture &&
                  !(currentWordDone && isNextWord);

                return (
                  // biome-ignore lint/suspicious/noArrayIndexKey: word+index combo ensures uniqueness for duplicate words
                  <WordItem
                    dimmed={dimmed}
                    displayInput={displayInput}
                    elemRef={isActive ? activeWordRef : undefined}
                    hasError={hasError}
                    isActive={isActive}
                    isPast={isPast}
                    key={`${word}-${wIdx}`}
                    word={word}
                  />
                );
              })}
            </motion.div>
          </LayoutGroup>

          {/* Unfocused: blur overlay with prompt */}
          <AnimatePresence>
            {!isFocused && (
              <motion.div
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-20 flex cursor-pointer flex-col items-center justify-center gap-3 backdrop-blur-[3px]"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                key="focus-overlay"
                onClick={() => inputRef.current?.focus()}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-2 text-muted-foreground text-xs backdrop-blur-sm">
                  <Cursor
                    className="text-muted-foreground/60"
                    size={14}
                    weight="duotone"
                  />
                  <span>Click or press any key to focus</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Restart button */}
      <RestartButton controlsVisible={controlsVisible} onRestart={onRestart} />

      {/* Keyboard shortcuts hint */}
      <motion.div
        animate={{
          // biome-ignore lint/style/noNestedTernary: readable conditional
          opacity: mode === "zen" && started ? 1 : controlsVisible ? 1 : 0,
        }}
        className="flex items-center gap-1.5 text-[11px] text-muted-foreground/50"
        transition={{ duration: 0.4 }}
      >
        {mode === "zen" && started ? (
          <>
            <kbd className="rounded-[4px] bg-foreground/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
              shift
            </kbd>
            <span className="text-muted-foreground/30">+</span>
            <kbd className="rounded-[4px] bg-foreground/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
              enter
            </kbd>
            <span className="ml-0.5">end test</span>
          </>
        ) : (
          <>
            <kbd className="rounded-[4px] bg-foreground/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
              tab
            </kbd>
            <span className="text-muted-foreground/30">+</span>
            <kbd className="rounded-[4px] bg-foreground/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
              enter
            </kbd>
            <span className="ml-0.5">restart</span>
          </>
        )}
      </motion.div>
    </div>
  );
}

function RestartButton({
  controlsVisible,
  onRestart,
}: {
  controlsVisible: boolean;
  onRestart: () => void;
}) {
  const [spinning, setSpinning] = useState(false);

  function handleClick() {
    setSpinning(true);
    setTimeout(() => setSpinning(false), 600);
    onRestart();
  }

  return (
    <motion.button
      animate={{ opacity: controlsVisible ? 1 : 0.15 }}
      className={cn(
        "rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground",
        !controlsVisible && "pointer-events-none"
      )}
      onClick={handleClick}
      title="Restart test"
      transition={{ duration: 0.4 }}
    >
      <span
        style={{
          display: "inline-flex",
          transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)",
          transform: spinning ? "rotate(360deg)" : "rotate(0deg)",
        }}
      >
        <ArrowCounterClockwise size={18} />
      </span>
    </motion.button>
  );
}

