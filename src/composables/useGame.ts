import { computed, ref, readonly, onScopeDispose } from "vue";

import { generatePattern, type Pattern } from "@/lib/game";
import { useStatsStore } from "@/stores/stats";

export type Phase = "start" | "answering" | "success" | "failed";

export const AUTO_START_DELAY = 3000;

export function useGame() {
  const patterns = ref<Pattern[]>([]);
  const userPattern = ref<Pattern[]>([]);
  const validateAtIndex = ref(0);
  const phase = ref<Phase>("start");

  const stats = useStatsStore();

  const startRound = () => {
    patterns.value = generatePattern();
    userPattern.value = [];
    validateAtIndex.value = 0;
    phase.value = "start";

    stats.rounds++;
  };

  let autoStartTimeout: ReturnType<typeof setTimeout> | undefined;

  const autoStartRound = () => {
    if (autoStartTimeout) {
      clearTimeout(autoStartTimeout);
    }

    autoStartTimeout = setTimeout(startRound, AUTO_START_DELAY);
  };

  onScopeDispose(() => {
    if (autoStartTimeout) {
      clearTimeout(autoStartTimeout);
    }
  });

  const enableUserPad = () => {
    phase.value = "answering";
  };

  const userPadEnabled = computed(() => {
    return phase.value === "answering";
  });

  const validateUserAnswer = (pattern: Pattern) => {
    if (phase.value !== "answering") {
      return;
    }

    userPattern.value.push(pattern);

    const expected = patterns.value[validateAtIndex.value];

    if (!expected || pattern.id !== expected.id) {
      phase.value = "failed";
      stats.failures++;
      autoStartRound();
      return;
    }

    validateAtIndex.value++;

    if (validateAtIndex.value === patterns.value.length) {
      phase.value = "success";
      stats.successes++;
      autoStartRound();
    }
  };

  return {
    patterns,
    userPattern,
    phase: readonly(phase),
    userPadEnabled,
    enableUserPad,
    validateUserAnswer,
    startRound,
  };
}
