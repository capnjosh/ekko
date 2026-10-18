<script setup lang="ts">
import { PATTERN_CONFIG, type Pattern } from "@/lib/game";

defineProps<{
  enabled: boolean;
}>();

const emit = defineEmits<{
  userAnswered: [pattern: Pattern];
}>();
</script>

<template>
  <div class="flex gap-4 h-16">
    <button
      v-for="pattern in PATTERN_CONFIG"
      :key="pattern.id"
      :disabled="!enabled"
      :class="pattern.className"
      :aria-label="pattern.name"
      type="button"
      class="w-16 h-full rounded-full disabled:opacity-50 enabled:cursor-pointer"
      @click="emit('userAnswered', pattern)"
    ></button>
  </div>
</template>
