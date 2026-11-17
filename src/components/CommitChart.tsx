import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { FaGithub, FaCodeBranch } from "react-icons/fa";
import { MdLocalFireDepartment, MdHistory, MdInfoOutline, MdTrendingUp } from "react-icons/md";
import gitData from "../data/gitCommits.json";
import { createPipelineSequence, textToMultiLevelMatrix, PipelineMessage } from "./utils/ledMatrixFont";
import "./styles/CommitChart.css";

const CountUp: React.FC<{ end: number; duration?: number; format?: boolean }> = ({
  end,
  duration = 1000,
  format = true,
}) => {
  const [val, setVal] = useState(end);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(end);
      return;
    }

    let rafId: number;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          setVal(0);
          const startTime = performance.now();
          const step = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setVal(Math.round(eased * end));
            if (progress < 1) {
              rafId = requestAnimationFrame(step);
            } else {
              setVal(end);
            }
          };
          rafId = requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [end, duration]);

  return <span ref={ref}>{format ? val.toLocaleString() : val}</span>;
};

interface DayData {
  date: string;
  dayOfWeek: number;
  count: number;
  level: number;
}

interface HoveredCell {
  date: string;
  count: number;
  level: number;
}

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const WEEKDAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

const CommitChart: React.FC = () => {
  const [hoveredCell, setHoveredCell] = useState<HoveredCell | null>(null);
  const [pipelineIdx, setPipelineIdx] = useState(0);
  const [isLedAnimating, setIsLedAnimating] = useState(false);

  const heatmapCardRef = useRef<HTMLDivElement>(null);
  const weeksContainerRef = useRef<HTMLDivElement>(null);
  const hasLedAnimatedRef = useRef(false);
  const activeAnimRef = useRef<{ cancel: () => void } | null>(null);

  const { summary, calendarDays } = gitData;
  const pipelineSequence = useMemo(
    () => createPipelineSequence(summary.totalCommits),
    [summary.totalCommits]
  );

  // Group into 53 weeks
  const { weeks, monthLabels, dayByDate } = useMemo(() => {
    const rawDays = calendarDays as DayData[];
    const weekCols: (DayData | null)[][] = [];
    let currentWeek: (DayData | null)[] = [];

    // Pad first week with nulls until its dayOfWeek
    if (rawDays.length > 0) {
      const firstDayOfWeek = rawDays[0].dayOfWeek;
      for (let i = 0; i < firstDayOfWeek; i++) {
        currentWeek.push(null);
      }
    }

    for (const d of rawDays) {
      currentWeek.push(d);
      if (currentWeek.length === 7) {
        weekCols.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      const lastValidDay = currentWeek[currentWeek.length - 1];
      const lastDate = lastValidDay ? new Date(lastValidDay.date + "T00:00:00") : new Date();

      while (currentWeek.length < 7) {
        lastDate.setDate(lastDate.getDate() + 1);
        const y = lastDate.getFullYear();
        const m = String(lastDate.getMonth() + 1).padStart(2, "0");
        const d = String(lastDate.getDate()).padStart(2, "0");
        currentWeek.push({
          date: `${y}-${m}-${d}`,
          dayOfWeek: currentWeek.length,
          count: 0,
          level: 0,
        });
      }
      weekCols.push(currentWeek);
    }

    // Determine month labels per column
    const labels: { text: string; weekIndex: number }[] = [];
    let lastLabeledMonth = -1;
    let lastLabeledWeek = -10;

    weekCols.forEach((col, wIdx) => {
      const firstValidDay = col.find((d) => d !== null);
      if (!firstValidDay) return;

      const dateObj = new Date(firstValidDay.date + "T00:00:00");
      const m = dateObj.getMonth();

      // Check if any day in this week is early in the month (days 1-7)
      const hasMonthStart = col.some((d) => {
        if (!d) return false;
        const dayNum = parseInt(d.date.split("-")[2], 10);
        return dayNum >= 1 && dayNum <= 7;
      });

      if (hasMonthStart && m !== lastLabeledMonth && wIdx - lastLabeledWeek >= 3) {
        labels.push({ text: MONTH_NAMES[m], weekIndex: wIdx });
        lastLabeledMonth = m;
        lastLabeledWeek = wIdx;
      }
    });

    const dayMap = new Map<string, DayData>();
    for (const d of rawDays) {
      dayMap.set(d.date, d);
    }
    weekCols.forEach((col) => {
      col.forEach((d) => {
        if (d && !dayMap.has(d.date)) {
          dayMap.set(d.date, d);
        }
      });
    });

    return { weeks: weekCols, monthLabels: labels, dayByDate: dayMap };
  }, [calendarDays]);

  const handleGridMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isLedAnimating) return;
    const target = (e.target as HTMLElement).closest("[data-date]") as HTMLElement | null;
    if (!target) {
      setHoveredCell((prev) => (prev ? null : prev));
      return;
    }

    const date = target.dataset.date;
    const day = date ? dayByDate.get(date) : undefined;
    if (!day) {
      setHoveredCell((prev) => (prev ? null : prev));
      return;
    }

    setHoveredCell((prev) => {
      if (prev?.date === day.date) return prev;
      return {
        date: day.date,
        count: day.count,
        level: day.level,
      };
    });
  };

  const handleGridMouseLeave = () => {
    setHoveredCell((prev) => (prev ? null : prev));
  };

  const formatDisplayDate = (dStr: string) => {
    try {
      const parts = dStr.split("-");
      const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      return d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dStr;
    }
  };

  const runLedAnimation = useCallback(
    (msg: PipelineMessage, onFinish?: () => void) => {
      if (!weeksContainerRef.current) return;
      if (typeof window === "undefined") return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        if (onFinish) onFinish();
        return;
      }

      if (activeAnimRef.current) {
        activeAnimRef.current.cancel();
        activeAnimRef.current = null;
      }

      setIsLedAnimating(true);
      const container = weeksContainerRef.current;
      container.classList.add("led-animating");

      const colElements = Array.from(container.children) as HTMLElement[];
      const numCols = colElements.length;
      const textMatrix = textToMultiLevelMatrix(msg.word);
      const textWidth = textMatrix.length;
      const targetX = Math.max(0, Math.floor((numCols - textWidth) / 2));

      let animLoopRafId: number | null = null;
      let timeoutId: ReturnType<typeof setTimeout> | null = null;
      let cancelled = false;

      const SHIMMER_CLASSES = [
        "led-shimmer-cyan",
        "led-shimmer-amber",
        "led-shimmer-emerald",
        "led-shimmer-white",
        "led-shimmer-violet",
      ];

      // Helper to render static text at targetX with visibility toggle
      const renderTextFrame = (visible: boolean) => {
        for (let c = 0; c < numCols; c++) {
          const colEl = colElements[c];
          if (!colEl) continue;
          const cellEls = colEl.children;
          const textCol = c - targetX;

          for (let r = 0; r < 7; r++) {
            const cell = cellEls[r] as HTMLElement | undefined;
            if (!cell || cell.classList.contains("empty")) continue;

            let lvl = 0;
            if (visible && textCol >= 0 && textCol < textWidth) {
              lvl = textMatrix[textCol][r] || 0;
            }
            cell.className = `calendar-cell led-lvl-${lvl}`;
          }
        }
      };

      // Helper to render sweep wavefront at column s (0 to numCols)
      const renderSweepFrame = (sweepCol: number) => {
        for (let c = 0; c < numCols; c++) {
          const colEl = colElements[c];
          if (!colEl) continue;
          const cellEls = colEl.children;

          for (let r = 0; r < 7; r++) {
            const cell = cellEls[r] as HTMLElement | undefined;
            if (!cell || cell.classList.contains("empty")) continue;

            if (c === sweepCol) {
              cell.className = "calendar-cell led-sweep";
            } else if (c < sweepCol) {
              const actualLvl = weeks[c]?.[r]?.level ?? 0;
              cell.className = `calendar-cell level-${actualLvl}`;
            } else {
              const textCol = c - targetX;
              let lvl = 0;
              if (textCol >= 0 && textCol < textWidth) {
                lvl = textMatrix[textCol][r] || 0;
              }
              cell.className = `calendar-cell led-lvl-${lvl}`;
            }
          }
        }
      };

      const startSweep = () => {
        let sweepCol = 0;
        let lastSweepTime = performance.now();
        const sweepIntervalMs = 15;

        const sweepLoop = (now: number) => {
          if (cancelled) return;

          if (now - lastSweepTime >= sweepIntervalMs) {
            lastSweepTime = now;
            renderSweepFrame(sweepCol);
            sweepCol++;

            if (sweepCol > numCols + 1) {
              // Completed! Restore all actual levels
              for (let c = 0; c < numCols; c++) {
                const colEl = colElements[c];
                if (!colEl) continue;
                const cellEls = colEl.children;
                for (let r = 0; r < 7; r++) {
                  const cell = cellEls[r] as HTMLElement | undefined;
                  if (!cell || cell.classList.contains("empty")) continue;
                  const actualLvl = weeks[c]?.[r]?.level ?? 0;
                  cell.className = `calendar-cell level-${actualLvl}`;
                }
              }

              container.classList.remove("led-animating");
              setIsLedAnimating(false);
              activeAnimRef.current = null;
              if (onFinish) onFinish();
              return;
            }
          }

          animLoopRafId = requestAnimationFrame(sweepLoop);
        };

        animLoopRafId = requestAnimationFrame(sweepLoop);
      };

      // Helper to lock the final word for holdMs, then sweep
      const lockAndSweep = (holdMs = 650) => {
        if (cancelled) return;
        renderTextFrame(true);
        timeoutId = setTimeout(() => {
          if (cancelled) return;
          startSweep();
        }, holdMs);
      };

      // --- 1. BLINK & SHIMMER FX (for $ git push ➔ GIT PUSH) ---
      const runBlinkShimmer = () => {
        const renderShimmerFrame = () => {
          for (let c = 0; c < numCols; c++) {
            const colEl = colElements[c];
            if (!colEl) continue;
            const cellEls = colEl.children;
            const textCol = c - targetX;

            for (let r = 0; r < 7; r++) {
              const cell = cellEls[r] as HTMLElement | undefined;
              if (!cell || cell.classList.contains("empty")) continue;

              let lvl = 0;
              if (textCol >= 0 && textCol < textWidth) {
                lvl = textMatrix[textCol][r] || 0;
              }

              if (lvl > 0) {
                if (Math.random() < 0.18) {
                  const randColor = SHIMMER_CLASSES[Math.floor(Math.random() * SHIMMER_CLASSES.length)];
                  cell.className = `calendar-cell ${randColor}`;
                } else {
                  cell.className = `calendar-cell led-lvl-${lvl}`;
                }
              } else {
                if (Math.random() < 0.015) {
                  cell.className = "calendar-cell led-ambient-spark";
                } else {
                  cell.className = "calendar-cell led-lvl-0";
                }
              }
            }
          }
        };

        let lastShimmerTime = performance.now();
        const shimmerIntervalMs = 55;
        let isShimmering = false;

        const shimmerLoop = (now: number) => {
          if (cancelled) return;
          if (isShimmering && now - lastShimmerTime >= shimmerIntervalMs) {
            lastShimmerTime = now;
            renderShimmerFrame();
          }
          if (isShimmering) {
            animLoopRafId = requestAnimationFrame(shimmerLoop);
          }
        };

        const blinkSteps: [{ mode: "shimmer" | "off" }, number][] = [
          [{ mode: "shimmer" }, 500],
          [{ mode: "off" }, 450],
          [{ mode: "shimmer" }, 500],
          [{ mode: "off" }, 450],
        ];

        let stepIdx = 0;
        const nextBlink = () => {
          if (cancelled) return;
          if (stepIdx < blinkSteps.length) {
            const [cfg, dur] = blinkSteps[stepIdx++];
            if (cfg.mode === "shimmer") {
              isShimmering = true;
              renderShimmerFrame();
              animLoopRafId = requestAnimationFrame(shimmerLoop);
            } else {
              isShimmering = false;
              renderTextFrame(false);
            }
            timeoutId = setTimeout(nextBlink, dur);
          } else {
            isShimmering = false;
            lockAndSweep(700);
          }
        };

        nextBlink();
      };

      // --- 2. SONAR RADAR PULSE FX (for $ git status ➔ ALL GREEN) ---
      const runSonarPulse = () => {
        const startTime = performance.now();
        const duration = 1500; // 1.5s sweep
        const centerX = 26;
        const centerY = 3;
        const maxRadius = 38;

        const radarLoop = (now: number) => {
          if (cancelled) return;
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const currentRadius = progress * maxRadius;

          for (let c = 0; c < numCols; c++) {
            const colEl = colElements[c];
            if (!colEl) continue;
            const cellEls = colEl.children;
            const textCol = c - targetX;

            for (let r = 0; r < 7; r++) {
              const cell = cellEls[r] as HTMLElement | undefined;
              if (!cell || cell.classList.contains("empty")) continue;

              const dist = Math.sqrt(Math.pow(c - centerX, 2) + Math.pow((r - centerY) * 2.2, 2));
              const onWave = Math.abs(dist - currentRadius) < 1.8;

              let targetLvl = 0;
              if (textCol >= 0 && textCol < textWidth) {
                targetLvl = textMatrix[textCol][r] || 0;
              }

              if (onWave) {
                cell.className = "calendar-cell radar-ping";
              } else if (dist < currentRadius) {
                // Wave has swept past this cell: if it belongs to ALL GREEN, stay lit in emerald!
                if (targetLvl > 0) {
                  cell.className = "calendar-cell led-shimmer-emerald";
                } else if (dist > currentRadius - 3.5) {
                  // Soft trailing phosphor falloff
                  cell.className = "calendar-cell led-lvl-1";
                } else {
                  cell.className = "calendar-cell led-lvl-0";
                }
              } else {
                cell.className = "calendar-cell led-lvl-0";
              }
            }
          }

          if (progress < 1) {
            animLoopRafId = requestAnimationFrame(radarLoop);
          } else {
            lockAndSweep(650);
          }
        };

        animLoopRafId = requestAnimationFrame(radarLoop);
      };

      // --- 3. QUANTUM DECRYPTION SCRAMBLE FX (for $ git blame ➔ ANTRANG) ---
      const runDecryption = () => {
        const startTime = performance.now();
        const duration = 1500;
        let lastScramble = performance.now();
        const scrambleInterval = 45;

        const decryptLoop = (now: number) => {
          if (cancelled) return;
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Columns lock in sequentially
          const lockedColumnsCount = Math.floor(progress * (textWidth + 2));

          if (now - lastScramble >= scrambleInterval) {
            lastScramble = now;

            for (let c = 0; c < numCols; c++) {
              const colEl = colElements[c];
              if (!colEl) continue;
              const cellEls = colEl.children;
              const textCol = c - targetX;

              for (let r = 0; r < 7; r++) {
                const cell = cellEls[r] as HTMLElement | undefined;
                if (!cell || cell.classList.contains("empty")) continue;

                if (textCol >= 0 && textCol < textWidth) {
                  const targetLvl = textMatrix[textCol][r] || 0;
                  if (textCol < lockedColumnsCount) {
                    if (targetLvl > 0) {
                      cell.className = textCol === lockedColumnsCount - 1
                        ? "calendar-cell decrypt-locked"
                        : `calendar-cell led-lvl-${targetLvl}`;
                    } else {
                      cell.className = "calendar-cell led-lvl-0";
                    }
                  } else {
                    if (Math.random() < 0.45) {
                      cell.className = "calendar-cell decrypt-scramble";
                    } else {
                      cell.className = "calendar-cell led-lvl-0";
                    }
                  }
                } else {
                  if (Math.random() < 0.02) {
                    cell.className = "calendar-cell led-ambient-spark";
                  } else {
                    cell.className = "calendar-cell led-lvl-0";
                  }
                }
              }
            }
          }

          if (progress < 1) {
            animLoopRafId = requestAnimationFrame(decryptLoop);
          } else {
            lockAndSweep(650);
          }
        };

        animLoopRafId = requestAnimationFrame(decryptLoop);
      };

      // --- 4. 3D ISOMETRIC MESH WAVE FX (for $ git diff ➔ +count -0) ---
      const run3dMesh = () => {
        const startTime = performance.now();
        const duration = 1600;

        const meshLoop = (now: number) => {
          if (cancelled) return;
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const t = elapsed * 0.007;

          // Convergence morph factor: starts at 900ms, completes by 1400ms
          const morphProgress = Math.max(0, Math.min(1, (elapsed - 900) / 500));
          const waveAmplitude = 1 - morphProgress;

          for (let c = 0; c < numCols; c++) {
            const colEl = colElements[c];
            if (!colEl) continue;
            const cellEls = colEl.children;
            const textCol = c - targetX;

            for (let r = 0; r < 7; r++) {
              const cell = cellEls[r] as HTMLElement | undefined;
              if (!cell || cell.classList.contains("empty")) continue;

              let targetLvl = 0;
              if (textCol >= 0 && textCol < textWidth) {
                targetLvl = textMatrix[textCol][r] || 0;
              }

              if (morphProgress >= 0.95 && targetLvl > 0) {
                // Fully morphed into crisp text
                cell.className = `calendar-cell led-lvl-${targetLvl}`;
              } else if (morphProgress > 0 && targetLvl > 0 && Math.random() < morphProgress * 1.1) {
                // Elevating text diode out of the wave
                cell.className = "calendar-cell mesh-crest";
              } else {
                // Continuous 3D wave field with dampening amplitude
                const z = (Math.sin(c * 0.18 - t * 3.5) * Math.cos(r * 0.55 - t * 1.8) +
                  0.35 * Math.sin((c + r) * 0.25 - t * 2.8)) * waveAmplitude;

                if (z > 0.5) {
                  cell.className = "calendar-cell mesh-crest";
                } else if (z > 0.15) {
                  cell.className = "calendar-cell led-lvl-3";
                } else if (z > -0.15) {
                  cell.className = "calendar-cell led-lvl-2";
                } else if (z > -0.45) {
                  cell.className = "calendar-cell led-lvl-1";
                } else {
                  cell.className = "calendar-cell mesh-trough";
                }
              }
            }
          }

          if (progress < 1) {
            animLoopRafId = requestAnimationFrame(meshLoop);
          } else {
            lockAndSweep(700);
          }
        };

        animLoopRafId = requestAnimationFrame(meshLoop);
      };

      // --- 5. MATRIX DIGITAL RAIN FX (for $ git merge ➔ MAINLINE) ---
      const runMatrixRain = () => {
        const startTime = performance.now();
        const duration = 1600;
        const rainCols = Array.from({ length: 18 }, () => ({
          col: Math.floor(Math.random() * numCols),
          head: Math.random() * -6,
          speed: 0.16 + Math.random() * 0.14,
        }));

        let lastTick = performance.now();
        const rainInterval = 32;

        const rainLoop = (now: number) => {
          if (cancelled) return;
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Progressive crystallization factor: from t=750ms to 1350ms
          const crystalProgress = Math.max(0, Math.min(1, (elapsed - 750) / 600));

          if (now - lastTick >= rainInterval) {
            lastTick = now;

            for (const drop of rainCols) {
              drop.head += drop.speed;
              if (drop.head > 12) {
                drop.head = Math.random() * -4;
                drop.col = Math.floor(Math.random() * numCols);
              }
            }

            for (let c = 0; c < numCols; c++) {
              const colEl = colElements[c];
              if (!colEl) continue;
              const cellEls = colEl.children;
              const activeDrop = rainCols.find((d) => d.col === c);
              const textCol = c - targetX;

              for (let r = 0; r < 7; r++) {
                const cell = cellEls[r] as HTMLElement | undefined;
                if (!cell || cell.classList.contains("empty")) continue;

                let targetLvl = 0;
                if (textCol >= 0 && textCol < textWidth) {
                  targetLvl = textMatrix[textCol][r] || 0;
                }

                // If in crystallization phase and cell is a letter diode
                const isCrystallized = targetLvl > 0 && Math.random() < crystalProgress * 1.2;

                if (isCrystallized) {
                  cell.className = "calendar-cell led-shimmer-emerald";
                } else if (activeDrop && crystalProgress < 0.95) {
                  const distFromHead = Math.floor(activeDrop.head) - r;
                  if (distFromHead === 0) {
                    cell.className = "calendar-cell matrix-drop-head";
                  } else if (distFromHead === 1) {
                    cell.className = "calendar-cell matrix-drop-trail";
                  } else if (distFromHead === 2) {
                    cell.className = "calendar-cell led-lvl-2";
                  } else if (distFromHead === 3) {
                    cell.className = "calendar-cell led-lvl-1";
                  } else {
                    cell.className = "calendar-cell led-lvl-0";
                  }
                } else if (targetLvl > 0 && crystalProgress >= 0.9) {
                  cell.className = "calendar-cell led-shimmer-emerald";
                } else {
                  cell.className = "calendar-cell led-lvl-0";
                }
              }
            }
          }

          if (progress < 1) {
            animLoopRafId = requestAnimationFrame(rainLoop);
          } else {
            lockAndSweep(650);
          }
        };

        animLoopRafId = requestAnimationFrame(rainLoop);
      };

      // --- 6. AUDIO DSP SPECTRUM EQUALIZER FX (for $ git stats ➔ VELOCITY) ---
      const runAudioEq = () => {
        const startTime = performance.now();
        const duration = 1600;
        let lastEqTick = performance.now();
        const eqInterval = 35;

        // Compute row span for each column of target word
        const colTargetSpans: number[] = [];
        for (let c = 0; c < numCols; c++) {
          const textCol = c - targetX;
          let maxRowFromBottom = 0;
          if (textCol >= 0 && textCol < textWidth) {
            for (let r = 0; r < 7; r++) {
              if ((textMatrix[textCol][r] || 0) > 0) {
                maxRowFromBottom = Math.max(maxRowFromBottom, 7 - r);
              }
            }
          }
          colTargetSpans.push(maxRowFromBottom);
        }

        const eqLoop = (now: number) => {
          if (cancelled) return;
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const t = elapsed * 0.007;

          // Convergence morph factor from t=950ms to 1400ms
          const morphProgress = Math.max(0, Math.min(1, (elapsed - 950) / 450));

          if (now - lastEqTick >= eqInterval) {
            lastEqTick = now;

            for (let c = 0; c < numCols; c++) {
              const colEl = colElements[c];
              if (!colEl) continue;
              const cellEls = colEl.children;
              const textCol = c - targetX;

              const rawEqHeight = 3.8 +
                2.6 * Math.sin(c * 0.35 + t * 4.2) * Math.cos(t * 2.8) +
                (Math.random() - 0.5) * 1.2;
              const targetH = colTargetSpans[c] || 0;
              const blendedHeight = Math.round(
                rawEqHeight * (1 - morphProgress) + targetH * morphProgress
              );
              const h = Math.max(0, Math.min(7, blendedHeight));

              for (let r = 0; r < 7; r++) {
                const cell = cellEls[r] as HTMLElement | undefined;
                if (!cell || cell.classList.contains("empty")) continue;

                let targetLvl = 0;
                if (textCol >= 0 && textCol < textWidth) {
                  targetLvl = textMatrix[textCol][r] || 0;
                }

                if (morphProgress > 0.85 && targetLvl > 0) {
                  cell.className = `calendar-cell led-lvl-${targetLvl}`;
                } else if (morphProgress > 0.85) {
                  cell.className = "calendar-cell led-lvl-0";
                } else {
                  const rowFromBottom = 6 - r;
                  if (rowFromBottom < h) {
                    if (rowFromBottom === h - 1 && h >= 5) {
                      cell.className = "calendar-cell eq-peak";
                    } else if (rowFromBottom >= 4) {
                      cell.className = "calendar-cell eq-high";
                    } else if (rowFromBottom >= 2) {
                      cell.className = "calendar-cell eq-mid";
                    } else {
                      cell.className = "calendar-cell eq-low";
                    }
                  } else {
                    cell.className = "calendar-cell led-lvl-0";
                  }
                }
              }
            }
          }

          if (progress < 1) {
            animLoopRafId = requestAnimationFrame(eqLoop);
          } else {
            lockAndSweep(650);
          }
        };

        animLoopRafId = requestAnimationFrame(eqLoop);
      };

      // Dispatch the assigned FX
      switch (msg.fxType) {
        case "sonar-pulse":
          runSonarPulse();
          break;
        case "decryption":
          runDecryption();
          break;
        case "3d-mesh":
          run3dMesh();
          break;
        case "matrix-rain":
          runMatrixRain();
          break;
        case "audio-eq":
          runAudioEq();
          break;
        case "blink-shimmer":
        default:
          runBlinkShimmer();
          break;
      }

      activeAnimRef.current = {
        cancel: () => {
          cancelled = true;
          if (animLoopRafId) cancelAnimationFrame(animLoopRafId);
          if (timeoutId) clearTimeout(timeoutId);
          container.classList.remove("led-animating");
          for (let c = 0; c < numCols; c++) {
            const colEl = colElements[c];
            if (!colEl) continue;
            const cellEls = colEl.children;
            for (let r = 0; r < 7; r++) {
              const cell = cellEls[r] as HTMLElement | undefined;
              if (!cell || cell.classList.contains("empty")) continue;
              const actualLvl = weeks[c]?.[r]?.level ?? 0;
              cell.className = `calendar-cell level-${actualLvl}`;
            }
          }
          setIsLedAnimating(false);
        },
      };
    },
    [weeks]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const card = heatmapCardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLedAnimatedRef.current) {
          hasLedAnimatedRef.current = true;
          // Trigger initial "GIT PUSH"
          runLedAnimation(pipelineSequence[0], () => {
            setPipelineIdx(1);
          });
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(card);

    return () => {
      observer.disconnect();
      if (activeAnimRef.current) {
        activeAnimRef.current.cancel();
      }
    };
  }, [runLedAnimation, pipelineSequence]);

  const handleDispatchNext = () => {
    if (isLedAnimating) return;
    const currentMsg = pipelineSequence[pipelineIdx];
    const nextIdx = (pipelineIdx + 1) % pipelineSequence.length;
    runLedAnimation(currentMsg, () => {
      setPipelineIdx(nextIdx);
    });
  };

  const content = (
    <>
      <div className="commit-header">
        <div className="commit-header-left">
          <h2 className="commit-title">
            Engineering Velocity &amp; <span className="text-accent">Commit Graph</span>
          </h2>
          <p className="commit-subtitle">
            Aggregated git activity and contribution velocity across production projects, capturing <strong>{summary.totalCommits.toLocaleString()} commits</strong>.
          </p>
        </div>

        <div className="github-profile-link">
          <a
            href="https://github.com/antrang"
            target="_blank"
            rel="noreferrer"
            className="github-btn"
            data-cursor="disable"
          >
            <FaGithub />
            <span>github.com/antrang</span>
          </a>
        </div>
      </div>

        {/* Telemetry Metric KPI Cards */}
        <div className="commit-kpi-grid">
          <div className="commit-kpi-card">
            <div className="kpi-icon-wrap">
              <FaCodeBranch />
            </div>
            <div className="kpi-data">
              <span className="kpi-number"><CountUp end={summary.totalCommits} /></span>
              <span className="kpi-label">Total Commits (Deduplicated)</span>
            </div>
          </div>

          <div className="commit-kpi-card">
            <div className="kpi-icon-wrap kpi-emerald">
              <MdLocalFireDepartment />
            </div>
            <div className="kpi-data">
              <span className="kpi-number"><CountUp end={summary.activeDays} /></span>
              <span className="kpi-label">Active Days in 2026</span>
            </div>
          </div>

          <div className="commit-kpi-card">
            <div className="kpi-icon-wrap kpi-amber">
              <MdTrendingUp />
            </div>
            <div className="kpi-data">
              <span className="kpi-number"><CountUp end={summary.longestStreak} /> days</span>
              <span className="kpi-label">Longest Streak</span>
            </div>
          </div>

          <div className="commit-kpi-card">
            <div className="kpi-icon-wrap kpi-accent">
              <MdHistory />
            </div>
            <div className="kpi-data">
              <span className="kpi-number"><CountUp end={summary.totalRepos || 21} /></span>
              <span className="kpi-label">Tracked Projects</span>
            </div>
          </div>
        </div>

        {/* GitHub 52-Week Contribution Calendar Box */}
        <div className="commit-heatmap-card" ref={heatmapCardRef}>
          <div className="heatmap-header">
            <div className="heatmap-summary">
              <span><strong>{summary.totalCommits.toLocaleString()} commits</strong> in the last 12 months</span>
              <span className="heatmap-summary-sep">·</span>
              <span className="heatmap-peak-badge">
                Peak: <strong>{summary.busiestDay.count}/day</strong> ({summary.busiestDay.date})
              </span>
              <span className="heatmap-summary-sep">·</span>
              <button
                type="button"
                className="terminal-trigger-btn"
                onClick={handleDispatchNext}
                disabled={isLedAnimating}
                title="Dispatch next pipeline command to LED matrix"
                aria-label={`Dispatch next engineering message: ${pipelineSequence[pipelineIdx].word}`}
                data-cursor="disable"
              >
                <span className="terminal-prefix">$</span>
                <span className="terminal-cmd">{pipelineSequence[pipelineIdx].cmdLabel}</span>
                <span className="terminal-cursor">_</span>
              </button>
            </div>

            {/* Static Telemetry Inspector Badge */}
            <div
              className={`heatmap-status-badge ${hoveredCell ? "active" : "idle"}`}
              aria-live="polite"
            >
              {hoveredCell ? (
                <>
                  <span className={`status-indicator level-${hoveredCell.level}`} />
                  <span className="status-commits">
                    <strong>{hoveredCell.count}</strong> {hoveredCell.count === 1 ? "commit" : "commits"}
                  </span>
                  <span className="status-divider">·</span>
                  <span className="status-date">{formatDisplayDate(hoveredCell.date)}</span>
                </>
              ) : (
                <>
                  <span className="status-indicator idle-dot" />
                  <span className="status-idle-text">Hover a day to inspect activity</span>
                </>
              )}
            </div>
          </div>

          <div className="heatmap-scroll-wrapper">
            <div className="heatmap-grid-container">
              {/* Month Header Row */}
              <div className="heatmap-months-row">
                <div className="weekday-spacer"></div>
                <div className="months-track">
                  {monthLabels.map((lbl, idx) => (
                    <span
                      key={idx}
                      className="month-tag"
                      style={{
                        left: `${lbl.weekIndex * 15}px`,
                      }}
                    >
                      {lbl.text}
                    </span>
                  ))}
                </div>
              </div>

              {/* Main Grid with Days of Week + 53 Week Columns */}
              <div className="heatmap-body">
                {/* Weekday indicators */}
                <div className="weekday-labels">
                  {WEEKDAY_LABELS.map((label, idx) => (
                    <span key={idx} className="weekday-tag">
                      {label}
                    </span>
                  ))}
                </div>

                {/* 53 Columns */}
                <div
                  ref={weeksContainerRef}
                  className="weeks-container"
                  onMouseMove={handleGridMouseMove}
                  onMouseLeave={handleGridMouseLeave}
                >
                  {weeks.map((week, wIdx) => (
                    <div className="week-column" key={wIdx}>
                      {week.map((day, dIdx) => {
                        if (!day) {
                          return <div key={dIdx} className="calendar-cell empty" />;
                        }
                        return (
                          <div
                            key={dIdx}
                            role="gridcell"
                            aria-label={`${day.count} commits on ${day.date}`}
                            className={`calendar-cell level-${day.level}`}
                            data-date={day.date}
                            data-count={day.count}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Heatmap Footer Legend Bar */}
          <div className="heatmap-grid-footer">
            <div className="heatmap-legend">
              <span className="legend-label">Less</span>
              <span className="legend-cell level-0"></span>
              <span className="legend-cell level-1"></span>
              <span className="legend-cell level-2"></span>
              <span className="legend-cell level-3"></span>
              <span className="legend-cell level-4"></span>
              <span className="legend-label">More</span>
            </div>
          </div>

          {/* Multi-Profile Distribution Disclaimer Note */}
          <div className="heatmap-footer-note">
            <MdInfoOutline className="note-icon" />
            <span className="note-text">
              <strong>Multi-Entity Distribution:</strong> This graph aggregates deduplicated engineering contributions across multiple private client codebases, company organizations, and distinct development profiles. The public <code>github.com/antrang</code> profile reflects only open-source personal repositories.
            </span>
          </div>
        </div>
    </>
  );

  return (
    <section className="commit-section" id="telemetry">
      <div className="section-container">
        <span id="commits" className="sr-only" aria-hidden="true" />
        {content}
      </div>
    </section>
  );
};

export default CommitChart;
