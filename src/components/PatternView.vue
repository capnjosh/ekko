<script lang="ts">
export const REVEAL_INTERVAL = 500;
export const REVEAL_HOLD = 2000;
</script>

<script setup lang="ts">
import { computed, ref, onWatcherCleanup, watch } from "vue";

import type { Pattern } from "@/lib/game";

const props = defineProps<{
  patterns: Pattern[];
}>();

const emit = defineEmits<{
  revealed: [];
}>();

const step = ref(-1);

const revealedPatterns = computed(() => {
  return props.patterns.slice(0, step.value + 1);
});

const reveal = (pattern: Pattern[]) => {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  step.value = -1;

  const interval = setInterval(() => {
    step.value++;

    if (step.value >= pattern.length - 1) {
      clearInterval(interval);

      timeout = setTimeout(() => {
        emit("revealed");
      }, REVEAL_HOLD);
    }
  }, REVEAL_INTERVAL);

  onWatcherCleanup(() => {
    if (interval) {
      clearInterval(interval);
    }

    if (timeout) {
      clearTimeout(timeout);
    }
  });
};

watch(() => props.patterns, reveal, {
  immediate: true,
});
</script>

<template>
  <TransitionGroup
    tag="div"
    class="flex gap-4 h-16"
    enter-active-class="transition-opacity duration-500 ease-out"
    enter-from-class="opacity-0"
  >
    <div
      v-for="(pattern, index) in revealedPatterns"
      :key="index"
      :class="pattern.className"
      class="w-16 h-full rounded-full"
    ></div>
  </TransitionGroup>
</template>
