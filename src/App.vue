<script setup lang="ts">
import GameLogo from "@/components/GameLogo.vue";
import PatternView from "@/components/PatternView.vue";
import UserPad from "@/components/UserPad.vue";

import { useGame } from "@/composables/useGame";

const { patterns, userPadEnabled, enableUserPad, validateUserAnswer } = useGame();
</script>

<template>
  <main class="bg-black text-white h-dvh flex flex-col items-center justify-center">
    <GameLogo />
    <PatternView class="my-12" :patterns="patterns" @revealed="enableUserPad()" />
    <UserPad :enabled="userPadEnabled" @user-answered="validateUserAnswer" />
  </main>
</template>
