import { nextTick } from "vue";
import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";

import { useStatsStore } from "@/stores/stats";

import QuickStats from "@/components/QuickStats.vue";

async function mountComponent() {
  const pinia = createPinia();
  const wrapper = mount(QuickStats, {
    global: {
      plugins: [pinia],
    },
  });
  await nextTick();

  return {
    wrapper,
    stats: useStatsStore(pinia),
  };
}

describe("QuickStats", () => {
  it("renders the content", async () => {
    const { wrapper } = await mountComponent();
    const content = wrapper.text();

    expect(content).toContain("Rounds: 0");
    expect(content).toContain("Correct: 0");
    expect(content).toContain("Incorrect: 0");
  });

  it("updates the stats", async () => {
    const { wrapper, stats } = await mountComponent();

    stats.$patch({
      rounds: 3,
      successes: 2,
      failures: 1,
    });
    await nextTick();

    const content = wrapper.text();
    expect(content).toContain("Rounds: 3");
    expect(content).toContain("Correct: 2");
    expect(content).toContain("Incorrect: 1");
  });
});
