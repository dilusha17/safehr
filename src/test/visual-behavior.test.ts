import { describe, expect, it } from "vitest";
import { bundledIcons, iconNames } from "@/lib/icons";
import { stagger } from "@/components/Reveal";

describe("requested reveal timing", () => {
  it("staggers siblings by 80 milliseconds", () => {
    expect(stagger(1)).toBe(80);
    expect(stagger(2)).toBe(160);
  });
  it("caps sibling delay at 400 milliseconds", () => {
    expect(stagger(9)).toBe(400);
  });
});

describe("offline decorative icons", () => {
  it("has actual bundled drawing data for every semantic icon", () => {
    for (const name of Object.keys(iconNames) as Array<keyof typeof iconNames>) {
      expect(bundledIcons[name]?.body.length).toBeGreaterThan(20);
    }
  });
});