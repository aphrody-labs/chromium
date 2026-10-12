// SPDX-License-Identifier: Apache-2.0
import { describe, expect, it } from "bun:test";
import { appFiles, exampleFiles, renderTemplate } from "../src/index.ts";

describe("Bun-native scaffold", () => {
  it("generates an app without a native shell", () => {
    const files = appFiles({ name: "Demo", target: "bun" });
    expect(files["package.json"]).toContain('"@aphrody/m3-bun"');
    expect(files["src/main.tsx"]).toContain('mode="bun"');
    expect(Object.keys(files).some((path) => path.startsWith("src-tauri/"))).toBe(false);
  });

  it("keeps the canonical example Bun-native", () => {
    const files = exampleFiles();
    expect(files["README.md"]).toContain("Bun-native");
    expect(Object.keys(files).some((path) => path.startsWith("src-tauri/"))).toBe(false);
    expect(renderTemplate({ template: "app", name: "Demo", target: "bun" })["src/main.tsx"]).toContain(
      'mode="bun"',
    );
  });
});
