<script setup lang="ts">
import { ref } from "vue";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import GameLogo from "@/components/GameLogo.vue";

defineProps<{ open: boolean }>();

const emit = defineEmits<{
  start: [skipNextTime: boolean];
}>();

const skipNextTime = ref(false);

const startGame = () => {
  emit("start", skipNextTime.value);
};
</script>

<template>
  <Dialog :open="open">
    <DialogContent
      :show-close-button="false"
      class="p-8 bg-gray-900 text-gray-300 outline-none border-none flex flex-col items-center"
    >
      <DialogTitle class="sr-only">Welcome to EKKO</DialogTitle>
      <GameLogo autoplay />
      <DialogDescription class="text-lg text-inherit">
        A memory-based pattern game. Try to remember and replicate the patterns you see.
      </DialogDescription>
      <Button
        class="mt-8 p-6 text-xl outline-none border border-green-500 text-green-500 focus-visible:border-green-500 focus-visible:ring-green-500/50"
        @click="startGame"
        >Start</Button
      >
      <DialogFooter class="mt-8 self-start">
        <label class="flex items-center gap-2 text-sm">
          <Checkbox v-model="skipNextTime" />
          Do not show this again
        </label>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
