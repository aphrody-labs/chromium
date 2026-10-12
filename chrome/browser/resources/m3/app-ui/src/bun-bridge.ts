// SPDX-License-Identifier: Apache-2.0
/** Bun/Web platform bridge. No Tauri globals or plugins are used. */

export function pickDirectory(): Promise<string | null> {
  return Promise.resolve(null);
}

export function pickFile(): Promise<string | null> {
  return Promise.resolve(null);
}
