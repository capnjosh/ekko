<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  autoplay?: boolean;
}>();

const classes = computed(() => ({
  container: {
    autoplay: props.autoplay,
  },
}));
</script>

<template>
  <div :class="['relative ekko', classes.container]">
    <h1 class="sr-only">EKKO</h1>
    <span class="logo text-sky-500" aria-hidden="true"></span>
    <span
      class="logo text-pink-500 absolute left-[5px] top-[5px] [--step:1]"
      aria-hidden="true"
    ></span>
    <span
      class="logo text-purple-500 absolute left-[10px] top-[10px] [--step:2]"
      aria-hidden="true"
    ></span>
  </div>
</template>

<style scoped lang="scss">
$step-duration: 1s;

@keyframes color-cycle {
  0%,
  100% {
    color: var(--color-sky-500);
  }
  33.333% {
    color: var(--color-pink-500);
  }
  66.667% {
    color: var(--color-purple-500);
  }
}

.logo {
  &::before {
    content: "EKKO";
    font-size: 5rem;
    font-weight: bold;
    letter-spacing: 0.2em;
  }
}

.ekko.autoplay,
.ekko:hover {
  .logo::before {
    animation: color-cycle $step-duration * 3 linear infinite;
    animation-delay: calc(var(--step, 0) * -#{$step-duration});
  }
}
</style>
