<script setup lang="ts">
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import GameLogo from "@/components/GameLogo.vue";

defineProps<{ open: boolean }>();
</script>

<template>
  <Sheet :open="open" :modal="false">
    <SheetContent class="w-[300px] bg-gray-900 outline-none border-none flex flex-col">
      <SheetHeader>
        <SheetTitle class="flex justify-center text-sm">
          <GameLogo class="scale-50" />
        </SheetTitle>
        <SheetDescription> </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>
