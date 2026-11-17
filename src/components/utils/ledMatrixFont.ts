/**
 * 5x7 Multi-Brightness LED Dot-Matrix Font & Telemetry Pipeline Engine
 *
 * Each glyph is represented as 7 rows of 5 columns.
 * Brightness levels correspond to the commit graph's palette:
 *   0: Inactive / dark diode socket (level-0)
 *   1: Low intensity / anti-aliasing ambient phosphor (level-1)
 *   2: Medium intensity / terminals, edges, curves (level-2)
 *   3: High intensity / crossbars, secondary strokes (level-3)
 *   4: Peak brightness / core vertical stems (level-4)
 */

export type LedAnimationType =
  | "blink-shimmer"
  | "sonar-pulse"
  | "decryption"
  | "3d-mesh"
  | "matrix-rain"
  | "audio-eq";

export interface PipelineMessage {
  word: string;
  cmdLabel: string;
  fxType: LedAnimationType;
}

export const createPipelineSequence = (totalCommits: number = 1736): PipelineMessage[] => [
  { word: "GIT PUSH", cmdLabel: "git push", fxType: "blink-shimmer" },
  { word: "ALL GREEN", cmdLabel: "git status", fxType: "sonar-pulse" },
  { word: "ANTRANG", cmdLabel: "git blame", fxType: "decryption" },
  { word: `+${totalCommits} -0`, cmdLabel: "git diff", fxType: "3d-mesh" },
  { word: "MAINLINE", cmdLabel: "git merge", fxType: "matrix-rain" },
  { word: "VELOCITY", cmdLabel: "git stats", fxType: "audio-eq" },
];

export const PIPELINE_SEQUENCE: PipelineMessage[] = createPipelineSequence(1736);

export const FONT_5X7: Record<string, string[]> = {
  A: [
    "02420",
    "23032",
    "40004",
    "43334",
    "40004",
    "40004",
    "40004",
  ],
  B: [
    "43330",
    "40003",
    "40003",
    "43332",
    "40003",
    "40003",
    "43330",
  ],
  C: [
    "02332",
    "23003",
    "40000",
    "40000",
    "40000",
    "23003",
    "02332",
  ],
  D: [
    "43320",
    "40023",
    "40004",
    "40004",
    "40004",
    "40023",
    "43320",
  ],
  E: [
    "43333",
    "40000",
    "40000",
    "43330",
    "40000",
    "40000",
    "43333",
  ],
  F: [
    "43333",
    "40000",
    "40000",
    "43330",
    "40000",
    "40000",
    "40000",
  ],
  G: [
    "02332",
    "23003",
    "40000",
    "40334",
    "40004",
    "23004",
    "02334",
  ],
  H: [
    "40004",
    "40004",
    "40004",
    "43334",
    "40004",
    "40004",
    "40004",
  ],
  I: [
    "23432",
    "00400",
    "00400",
    "00400",
    "00400",
    "00400",
    "23432",
  ],
  J: [
    "00034",
    "00004",
    "00004",
    "00004",
    "40004",
    "40004",
    "03330",
  ],
  K: [
    "40024",
    "40030",
    "40300",
    "44000",
    "40300",
    "40030",
    "40024",
  ],
  L: [
    "40000",
    "40000",
    "40000",
    "40000",
    "40000",
    "40000",
    "43333",
  ],
  M: [
    "40004",
    "43034",
    "40404",
    "40004",
    "40004",
    "40004",
    "40004",
  ],
  N: [
    "40004",
    "43004",
    "40304",
    "40034",
    "40004",
    "40004",
    "40004",
  ],
  O: [
    "02320",
    "23032",
    "40004",
    "40004",
    "40004",
    "23032",
    "02320",
  ],
  P: [
    "43330",
    "40003",
    "40004",
    "43330",
    "40000",
    "40000",
    "40000",
  ],
  Q: [
    "02320",
    "23032",
    "40004",
    "40004",
    "40304",
    "23032",
    "02324",
  ],
  R: [
    "43330",
    "40003",
    "40004",
    "43330",
    "40300",
    "40030",
    "40004",
  ],
  S: [
    "03332",
    "30003",
    "30000",
    "03330",
    "00003",
    "30003",
    "23330",
  ],
  T: [
    "33433",
    "00400",
    "00400",
    "00400",
    "00400",
    "00400",
    "00400",
  ],
  U: [
    "40004",
    "40004",
    "40004",
    "40004",
    "40004",
    "23032",
    "02320",
  ],
  V: [
    "40004",
    "40004",
    "40004",
    "20002",
    "03030",
    "00400",
    "00400",
  ],
  W: [
    "40004",
    "40004",
    "40004",
    "40404",
    "40404",
    "23032",
    "02020",
  ],
  X: [
    "40004",
    "23032",
    "00400",
    "00400",
    "00400",
    "23032",
    "40004",
  ],
  Y: [
    "40004",
    "23032",
    "00400",
    "00400",
    "00400",
    "00400",
    "00400",
  ],
  Z: [
    "33333",
    "00023",
    "00300",
    "03000",
    "30000",
    "32000",
    "33333",
  ],
  "0": [
    "02320",
    "23032",
    "40024",
    "40304",
    "42004",
    "23032",
    "02320",
  ],
  "1": [
    "00400",
    "03400",
    "00400",
    "00400",
    "00400",
    "00400",
    "23432",
  ],
  "2": [
    "02320",
    "20003",
    "00003",
    "00330",
    "03000",
    "30000",
    "33333",
  ],
  "3": [
    "02320",
    "20003",
    "00003",
    "00330",
    "00003",
    "20003",
    "02320",
  ],
  "4": [
    "00030",
    "00330",
    "03030",
    "30030",
    "33333",
    "00030",
    "00030",
  ],
  "5": [
    "33333",
    "30000",
    "33330",
    "00003",
    "00003",
    "20003",
    "02320",
  ],
  "6": [
    "02320",
    "20000",
    "30000",
    "33330",
    "40004",
    "40004",
    "02320",
  ],
  "7": [
    "33333",
    "00003",
    "00030",
    "00300",
    "03000",
    "03000",
    "03000",
  ],
  "8": [
    "02320",
    "20003",
    "20003",
    "02320",
    "40004",
    "40004",
    "02320",
  ],
  "9": [
    "02320",
    "40004",
    "40004",
    "03334",
    "00003",
    "00003",
    "02320",
  ],
  " ": [
    "00000",
    "00000",
    "00000",
    "00000",
    "00000",
    "00000",
    "00000",
  ],
  "-": [
    "00000",
    "00000",
    "00000",
    "33333",
    "00000",
    "00000",
    "00000",
  ],
  _: [
    "00000",
    "00000",
    "00000",
    "00000",
    "00000",
    "00000",
    "33333",
  ],
  "!": [
    "00400",
    "00400",
    "00400",
    "00400",
    "00000",
    "00400",
    "00000",
  ],
  "/": [
    "00003",
    "00030",
    "00030",
    "00300",
    "03000",
    "03000",
    "30000",
  ],
  ">": [
    "30000",
    "03000",
    "00300",
    "00030",
    "00300",
    "03000",
    "30000",
  ],
  ".": [
    "00000",
    "00000",
    "00000",
    "00000",
    "00000",
    "00400",
    "00000",
  ],
  "+": [
    "00000",
    "00400",
    "00400",
    "44444",
    "00400",
    "00400",
    "00000",
  ],
};

/**
 * Converts a text string into a 2D column-major array of brightness levels (0-4).
 * Returns number[colIndex][rowIndex] where rowIndex is 0..6 (top to bottom).
 */
export function textToMultiLevelMatrix(text: string): number[][] {
  const upper = text.toUpperCase();
  const columns: number[][] = [];

  for (let i = 0; i < upper.length; i++) {
    const char = upper[i];
    const glyphRows = FONT_5X7[char] || FONT_5X7[" "];

    // Read 5 columns for this character
    for (let c = 0; c < 5; c++) {
      const col: number[] = [];
      for (let r = 0; r < 7; r++) {
        const val = parseInt(glyphRows[r][c], 10);
        col.push(isNaN(val) ? 0 : val);
      }
      columns.push(col);
    }

    // Insert 1 spacer column between letters if not the last character
    if (i < upper.length - 1) {
      columns.push([0, 0, 0, 0, 0, 0, 0]);
    }
  }

  return columns;
}
