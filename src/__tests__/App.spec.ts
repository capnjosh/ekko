import { nextTick } from "vue";
import { assert, afterEach, describe, expect, it, vi } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { createPinia } from "pinia";

import { PATTERN_CONFIG, type Pattern } from "@/lib/game";
import { AUTO_START_DELAY } from "@/composables/useGame";
import { useStatsStore } from "@/stores/stats";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import WelcomeModal from "@/components/WelcomeModal.vue";
import PatternAnswers from "@/components/PatternAnswers.vue";
import PatternView, { REVEAL_INTERVAL, REVEAL_HOLD } from "@/components/PatternView.vue";
import UserPad from "@/components/UserPad.vue";

import App, { preventWelcomeModalKey } from "@/App.vue";

enableAutoUnmount(afterEach);

afterEach(() => {
  vi.useRealTimers();
  localStorage.clear();
});

async function mountApp({ skipWelcomeModal = false }: { skipWelcomeModal?: boolean } = {}) {
  if (skipWelcomeModal) {
    localStorage.setItem(preventWelcomeModalKey, "true");
  }

  const pinia = createPinia();
  const wrapper = mount(App, {
    global: {
      plugins: [pinia],
    },
  });
  await nextTick();

  const welcomeModal = () => wrapper.findComponent(WelcomeModal);
  const userPad = () => wrapper.findComponent(UserPad);
  const clickPatterns = async (patterns: Pattern[]) => {
    for (const pattern of patterns) {
      const button = userPad().get(`[aria-label="${pattern.name}"]`);
      await button.trigger("click");
    }
  };

  return {
    wrapper,
    welcomeModal,
    patternAnswer: () => wrapper.findComponent(PatternAnswers),
    patternView: () => wrapper.findComponent(PatternView),
    userPad,
    userPadButtonsDisabled: () =>
      userPad()
        .findAll("button")
        .map((button) => button.element.disabled),
    clickPatterns,
    stats: useStatsStore(pinia),
  };
}

const allLocked = PATTERN_CONFIG.map(() => true);
const allUnlocked = PATTERN_CONFIG.map(() => false);

describe("App", () => {
  it("shows the welcome modal", async () => {
    const { welcomeModal } = await mountApp();

    expect(welcomeModal().props("open")).toBe(true);
  });

  it("sets localStorage's prevent-welcome-modal when opted out", async () => {
    const { welcomeModal } = await mountApp();

    await welcomeModal().findComponent(Checkbox).trigger("click");
    await welcomeModal().findComponent(Button).trigger("click");

    expect(localStorage.getItem(preventWelcomeModalKey)).toBe("true");
  });

  it("does not show the welcome modal when localStorage's prevent-welcome-modal is true", async () => {
    const { welcomeModal, patternView } = await mountApp({ skipWelcomeModal: true });

    expect(welcomeModal().props("open")).toBe(false);
    expect(patternView().props("patterns").length).toBeGreaterThan(0);
  });

  it("starts the game when the start button is clicked", async () => {
    const { welcomeModal, userPad } = await mountApp();

    await welcomeModal().findComponent(Button).trigger("click");

    expect(welcomeModal().props("open")).toBe(false);
    expect(userPad().exists()).toBe(true);
  });
});

describe("Game start", () => {
  it("locks the user pad initially", async () => {
    const { userPadButtonsDisabled } = await mountApp({ skipWelcomeModal: true });

    expect(userPadButtonsDisabled()).toEqual(allLocked);
  });

  it("unlocks the pad once the pattern has been revealed", async () => {
    vi.useFakeTimers();
    const { patternView, userPadButtonsDisabled } = await mountApp({ skipWelcomeModal: true });
    const patternsLength = patternView().props("patterns").length;
    const totalTime = patternsLength * REVEAL_INTERVAL + REVEAL_HOLD;
    const offsetTime = 1;

    await vi.advanceTimersByTimeAsync(totalTime - offsetTime);
    expect(userPadButtonsDisabled()).toEqual(allLocked);

    await vi.advanceTimersByTimeAsync(offsetTime);
    expect(userPadButtonsDisabled()).toEqual(allUnlocked);
  });
});

describe("Game stats", () => {
  it("updates the stats", async () => {
    vi.useFakeTimers();
    const { patternView, clickPatterns, stats } = await mountApp({
      skipWelcomeModal: true,
    });
    const patterns = patternView().props("patterns");
    const totalTime = patterns.length * REVEAL_INTERVAL + REVEAL_HOLD;

    await vi.advanceTimersByTimeAsync(totalTime);
    expect(stats.rounds).toBe(1);

    await clickPatterns(patterns);
    expect(stats.successes).toBe(1);
    expect(stats.failures).toBe(0);

    await vi.advanceTimersByTimeAsync(AUTO_START_DELAY);
    expect(stats.rounds).toBe(2);

    const newPatterns = patternView().props("patterns");
    const firstPattern = newPatterns[0];
    assert(firstPattern);
    const failedPattern = PATTERN_CONFIG.find((pattern) => pattern.id !== firstPattern.id);
    assert(failedPattern);
    await vi.advanceTimersByTimeAsync(totalTime);

    await clickPatterns([failedPattern]);
    expect(stats.successes).toBe(1);
    expect(stats.failures).toBe(1);
  });
});
