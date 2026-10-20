import { afterEach, describe, expect, it, vi } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

import { PATTERN_CONFIG } from "@/lib/game";

import App from "@/App.vue";
import GameLogo from "@/components/GameLogo.vue";
import PatternAnswers from "@/components/PatternAnswers.vue";
import PatternView, { REVEAL_INTERVAL, REVEAL_HOLD } from "@/components/PatternView.vue";
import UserPad from "@/components/UserPad.vue";

enableAutoUnmount(afterEach);
afterEach(() => vi.useRealTimers());

function mountApp() {
  const wrapper = mount(App);
  const userPad = () => wrapper.findComponent(UserPad);

  return {
    wrapper,
    gameLogo: () => wrapper.findComponent(GameLogo),
    patternAnswer: () => wrapper.findComponent(PatternAnswers),
    patternView: () => wrapper.findComponent(PatternView),
    userPad,
    userPadButtonsDisabled: () =>
      userPad()
        .findAll("button")
        .map((button) => button.element.disabled),
  };
}

const allLocked = PATTERN_CONFIG.map(() => true);
const allUnlocked = PATTERN_CONFIG.map(() => false);

describe("Game start", () => {
  it("shows the logo and locks the pad", () => {
    const { gameLogo, userPadButtonsDisabled } = mountApp();
    const buttonsDisabled = userPadButtonsDisabled();

    expect(gameLogo().text()).toContain("Ekko");
    expect(buttonsDisabled).toEqual(allLocked);
  });

  it("unlocks the pad once the pattern has been revealed", async () => {
    vi.useFakeTimers();
    const { patternView, userPadButtonsDisabled } = mountApp();
    const patternsLength = patternView().props("patterns").length;
    const totalTime = patternsLength * REVEAL_INTERVAL + REVEAL_HOLD;
    const offsetTime = 1;

    await vi.advanceTimersByTimeAsync(totalTime - offsetTime);
    expect(userPadButtonsDisabled()).toEqual(allLocked);

    await vi.advanceTimersByTimeAsync(offsetTime);
    expect(userPadButtonsDisabled()).toEqual(allUnlocked);
  });
});
