<script setup lang="ts">
import GameLogo from "@/components/GameLogo.vue";
import PatternView from "@/components/PatternView.vue";
import PatternAnswers from "@/components/PatternAnswers.vue";
import UserPad from "@/components/UserPad.vue";

import { useGame } from "@/composables/useGame";

const { patterns, phase, userPadEnabled, enableUserPad, userPattern, validateUserAnswer } =
  useGame();
</script>

<template>
  <main class="bg-black text-white h-dvh flex flex-col items-center justify-center">
    <GameLogo />
    <div class="my-12">
      <Transition
        mode="out-in"
        enter-active-class="transition-opacity duration-500 ease-out"
        enter-from-class="opacity-0"
        leave-active-class="transition-opacity duration-500 ease-in"
        leave-to-class="opacity-0"
      >
        <PatternView v-if="phase === 'start'" :patterns="patterns" @revealed="enableUserPad()" />
        <PatternAnswers v-else :phase="phase" :patterns="userPattern" />
      </Transition>
    </div>
    <UserPad :enabled="userPadEnabled" @user-answered="validateUserAnswer" />
  </main>
</template>
