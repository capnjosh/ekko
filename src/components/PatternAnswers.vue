<script setup lang="ts">
import type { Phase } from "@/composables/useGame";
import type { Pattern } from "@/lib/game";

defineProps<{
  phase: Phase;
  patterns: Pattern[];
}>();
</script>

<template>
  <div class="flex gap-4 h-16">
    <div
      v-for="(pattern, index) in patterns"
      :key="index"
      :class="pattern.className"
      class="flex justify-center items-center w-16 h-full rounded-full"
    >
      <span v-if="phase === 'failed' && index === patterns.length - 1" role="img" aria-label="Wrong"
        >😭</span
      >
      <span v-else role="img" aria-label="Correct">😊</span>
    </div>
  </div>
</template>
