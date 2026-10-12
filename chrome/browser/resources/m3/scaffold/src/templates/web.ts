// SPDX-License-Identifier: Apache-2.0
import type { FileMap } from "../files.ts";

export interface WebTemplateOptions {
  name: string;
  m3Version?: string;
}

export function ownerM3Version(): string {
  return "1.4.4";
}

export function webFiles({ name, m3Version = ownerM3Version() }: WebTemplateOptions): FileMap {
  const escaped = name.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  return {
    "package.json": `${JSON.stringify({
      name,
      version: "1.0.0",
      private: true,
      type: "module",
      scripts: { dev: "m3 dev", build: "m3 build", serve: "m3 serve" },
      dependencies: { "@aphrody/m3": `^${m3Version}`, react: "catalog:", "react-dom": "catalog:" },
      engines: { bun: ">=1.4.4" },
    }, null, 2)}\n`,
    "m3.config.ts": 'import { defineM3Config } from "@aphrody/m3/config";\nexport default defineM3Config({ entry: "src/index.html" });\n',
    "src/index.html": `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escaped}</title></head><body><div id="root"></div><script type="module" src="./main.tsx"></script></body></html>\n`,
    "src/main.tsx": 'import { createRoot } from "react-dom/client";\nimport "m3:theme.css";\nconst root = document.getElementById("root");\nif (!root) throw new Error("Missing application root");\ncreateRoot(root).render(<main className="p-8"><h1 className="text-2xl">Aphrody M3</h1></main>);\n',
    ".gitignore": "node_modules/\ndist/\n",
  };
}
