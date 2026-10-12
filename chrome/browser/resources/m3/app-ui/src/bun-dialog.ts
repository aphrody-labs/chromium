// SPDX-License-Identifier: Apache-2.0
// Bun/Web dialog surface. Chromium owns the document; no desktop shell plugin.

export async function open(options: { directory?: boolean; multiple?: boolean } = {}) {
  if (typeof document === "undefined") return null;
  const input = document.createElement("input");
  input.type = "file";
  input.multiple = options.multiple === true;
  if (options.directory) input.setAttribute("webkitdirectory", "");
  return new Promise<string | string[] | null>((resolve) => {
    input.onchange = () => {
      const files = Array.from(input.files ?? []).map((file) => file.name);
      resolve(options.multiple ? files : (files[0] ?? null));
    };
    input.click();
  });
}

export async function save(): Promise<string | null> {
  return null;
}

export async function confirm(message: string): Promise<boolean> {
  return typeof window === "undefined" ? false : window.confirm(message);
}

export async function message(message: string): Promise<void> {
  if (typeof window !== "undefined") window.alert(message);
}
