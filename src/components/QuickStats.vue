<script setup lang="ts">
import { CircleCheck, CircleX, Repeat } from "@lucide/vue";

import { useStatsStore } from "@/stores/stats";

const stats = useStatsStore();
</script>

<template>
  <div
    class="fixed bottom-4 px-4 py-2 bg-gray-900 text-gray-300 rounded-full flex gap-4 tabular-nums"
  >
    <span class="flex items-center gap-1.5">
      <Repeat class="size-4 text-blue-400" />
      <span class="sr-only">Rounds:</span>
      {{ stats.rounds }}
    </span>
    <span class="flex items-center gap-1.5">
      <CircleCheck class="size-4 text-green-400" />
      <span class="sr-only">Correct:</span>
      {{ stats.successes }}
    </span>
    <span class="flex items-center gap-1.5">
      <CircleX class="size-4 text-red-400" />
      <span class="sr-only">Incorrect:</span>
      {{ stats.failures }}
    </span>
  </div>
</template>
