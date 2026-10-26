import { ref } from "vue";
import { defineStore } from "pinia";

export const useStatsStore = defineStore("stats", () => {
  const rounds = ref(0);
  const successes = ref(0);
  const failures = ref(0);

  const reset = () => {
    rounds.value = 0;
    successes.value = 0;
    failures.value = 0;
  };

  return {
    rounds,
    successes,
    failures,
    reset,
  };
});
