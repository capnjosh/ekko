import { nextTick } from "vue";
import { describe, expect, it } from "vitest";
import { mount, type ComponentMountingOptions } from "@vue/test-utils";
import { createPinia } from "pinia";

import { useStatsStore } from "@/stores/stats";

import SidePanel from "@/components/SidePanel.vue";

type SidePanelProps = ComponentMountingOptions<typeof SidePanel>["props"];

async function mountComponent(props: SidePanelProps) {
  const pinia = createPinia();
  const wrapper = mount(SidePanel, {
    props,
    global: {
      plugins: [pinia],
      stubs: {
        teleport: true,
      },
      renderStubDefaultSlot: true,
    },
  });
  await nextTick();

  return {
    wrapper,
    stats: useStatsStore(pinia),
  };
}

describe("SidePanel", () => {
  it("renders the content", async () => {
    const { wrapper } = await mountComponent({ open: true });
    const content = wrapper.text();

    expect(content).toContain("EKKO");
    expect(content).toContain("Stats:");
    expect(content).toContain("Round:0");
    expect(content).toContain("Successes:0");
    expect(content).toContain("Failures:0");
  });

  it("updates the stats", async () => {
    const { wrapper, stats } = await mountComponent({ open: true });

    stats.$patch({
      rounds: 3,
      successes: 2,
      failures: 1,
    });
    await nextTick();

    const content = wrapper.text();
    expect(content).toContain("Round:3");
    expect(content).toContain("Successes:2");
    expect(content).toContain("Failures:1");
  });
});
