<script lang="ts">
export const preventWelcomeModalKey = "prevent-welcome-modal";
</script>

<script setup lang="ts">
import { ref } from "vue";
import { useLocalStorage } from "@vueuse/core";

import { useGame } from "@/composables/useGame";

import WelcomeModal from "@/components/WelcomeModal.vue";
import PatternView from "@/components/PatternView.vue";
import PatternAnswers from "@/components/PatternAnswers.vue";
import UserPad from "@/components/UserPad.vue";

const {
  patterns,
  userPattern,
  phase,
  userPadEnabled,
  enableUserPad,
  validateUserAnswer,
  startRound,
} = useGame();

const skipWelcome = useLocalStorage(preventWelcomeModalKey, false);
const welcomeOpen = ref(!skipWelcome.value);

const startGame = (skipNextTime?: boolean) => {
  if (skipNextTime) {
    skipWelcome.value = true;
  }

  welcomeOpen.value = false;
  startRound();
};

if (!welcomeOpen.value) {
  startRound();
}
</script>

<template>
  <main class="bg-black text-white h-dvh flex flex-col items-center justify-center">
    <WelcomeModal :open="welcomeOpen" @start="startGame" />
    <div v-if="!welcomeOpen">
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
    </div>
  </main>
</template>
