import { ref } from "vue";

import { generatePattern } from "@/lib/game";

export function useGame() {
  const patterns = ref(generatePattern());
  const userPadEnabled = ref(false);

  const enableUserPad = () => {
    userPadEnabled.value = true;
  };

  const validateUserAnswer = (patternId: number) => {
    console.log("=>", patternId);
  };

  return {
    patterns,
    userPadEnabled,
    enableUserPad,
    validateUserAnswer,
  };
}
