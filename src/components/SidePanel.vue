<script setup lang="ts">
import { useStatsStore } from "@/stores/stats";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import GameLogo from "@/components/GameLogo.vue";

defineProps<{ open: boolean }>();

const stats = useStatsStore();
</script>

<template>
  <Sheet :open="open" :modal="false">
    <SheetContent
      class="[&>button]:hidden w-[300px] bg-gray-900 outline-none border-none flex flex-col"
    >
      <SheetHeader>
        <SheetTitle class="flex justify-center text-sm">
          <GameLogo class="scale-50" />
        </SheetTitle>
        <SheetDescription>
          <!-- Stats -->
          <div class="py-4 border-t border-gray-500">
            <p class="uppercase font-bold text-gray-500">Stats:</p>
            <div class="mt-4 grid grid-cols-[max-content_1fr] gap-x-4 text-gray-300">
              <div>Round:</div>
              <div>{{ stats.rounds }}</div>
              <div>Successes:</div>
              <div>{{ stats.successes }}</div>
              <div>Failures:</div>
              <div>{{ stats.failures }}</div>
            </div>
          </div>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>
