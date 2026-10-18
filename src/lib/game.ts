type GameConfig = {
  patternLength: number;
};

export type Pattern = {
  id: number;
  name: string;
  className: string;
};

const DEFAULT_PATTERN_LENGTH = 3;

export const PATTERN_CONFIG = [
  {
    id: 1,
    name: "Sky",
    className: "bg-sky-500",
  },
  {
    id: 2,
    name: "Pink",
    className: "bg-pink-500",
  },
  {
    id: 3,
    name: "Purple",
    className: "bg-purple-500",
  },
] as const satisfies readonly Pattern[];

export function generatePattern(
  config: GameConfig = {
    patternLength: DEFAULT_PATTERN_LENGTH,
  },
): Pattern[] {
  const pattern: Pattern[] = [];

  for (let i = 0; i < config.patternLength; i++) {
    const color = PATTERN_CONFIG[Math.floor(Math.random() * PATTERN_CONFIG.length)];

    if (!color) {
      throw new Error(`Failed to generate a color for the index ${i}.`);
    }

    pattern.push(color);
  }

  return pattern;
}
