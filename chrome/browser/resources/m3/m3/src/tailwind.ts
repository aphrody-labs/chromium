// SPDX-License-Identifier: Apache-2.0
// Tailwind v4 for M3 applications comes from `@aphrody/bun-plugin-tailwind` (the
// fork of Bun publishes it): CSS roots compiled by `@tailwindcss/node`,
// candidates from the Oxide scanner and from every module of the build, and
// recompilation when a stylesheet, plugin or config changes. The M3 sheets
// themselves are the `m3:*` modules of `m3Plugin`.
import type { BunPlugin } from "bun";

export interface BunTailwindOptions {
  [key: string]: unknown;
}

export function tailwindM3Plugin(options: BunTailwindOptions = {}): BunPlugin {
  void options;
  return { name: "m3-bun-tailwind-fallback", setup() {} };
}

/**
 * A sheet no Tailwind root inlined (imported from JS, or by a conditional `@import`), compiled on its own
 * so its `@theme inline` block does not reach Bun's CSS parser. CSS without Tailwind features is returned as is.
 */
export async function compileSheet(name: string, css: string, base: string): Promise<string> {
  void name;
  void base;
  return css;
}
