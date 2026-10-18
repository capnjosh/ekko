import { computed, ref, readonly } from "vue";

import { generatePattern, type Pattern } from "@/lib/game";

export type Phase = "start" | "answering" | "success" | "failed";

export function useGame() {
  const patterns = ref<Pattern[]>([]);
  const userPattern = ref<Pattern[]>([]);
  const validateAtIndex = ref(0);
  const phase = ref<Phase>("start");

  const startRound = () => {
    patterns.value = generatePattern();
    userPattern.value = [];
    validateAtIndex.value = 0;
    phase.value = "start";
  };

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
      return;
    }

    validateAtIndex.value++;

    if (validateAtIndex.value === patterns.value.length) {
      phase.value = "success";
    }
  };

  startRound();

  return {
    patterns,
    userPattern,
    phase: readonly(phase),
    userPadEnabled,
    enableUserPad,
    validateUserAnswer,
  };
}
