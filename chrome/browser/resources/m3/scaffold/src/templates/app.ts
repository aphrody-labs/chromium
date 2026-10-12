// SPDX-License-Identifier: Apache-2.0
/** Native Bun + React app with the Next shims; the legacy vite target names the web host. */
import type { FileMap } from "../files.ts";

export interface AppTemplateOptions {
  name: string;
  target?: "bun";
  modernizeM3?: boolean;
  appTsx?: string;
  /** Dependencies qualified by the private source owner before app creation. */
  dependencies?: Record<string, string>;
}

const DEFAULT_APP = `// SPDX-License-Identifier: Apache-2.0
export default function App() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Aphrody M3 App</h1>
      <p className="mt-2 text-on-surface-variant">Migrated Next.js application</p>
    </main>
  );
}
`;

export function appFiles(options: AppTemplateOptions): FileMap {
  const { name, target = "bun", modernizeM3 = false } = options;
  const pkg = {
    name,
    version: "1.0.0",
    private: true,
    type: "module",
    scripts: {
      dev: "m3-bun dev",
      build: "m3-bun build",
      preview: "m3-bun serve",
      serve: "m3-bun serve",
      "dev:bun": "m3-bun dev",
      "start:bun": "m3-bun serve",
      typecheck: "tsc -p tsconfig.json --noEmit",
    },
    dependencies: {
      ...options.dependencies,
      react: "catalog:",
      "react-dom": "catalog:",
      "@aphrody/m3": "workspace:*",
      "@aphrody/m3-bun": "workspace:*",
      "@aphrody/m3-next-migrate": "workspace:*",
      ...(modernizeM3
        ? {
            "@aphrody/m3-primitives": "workspace:*",
            "@aphrody/m3-theme": "workspace:*",
            "@aphrody/m3-tokens": "workspace:*",
          }
        : {}),
    },
    devDependencies: {
      "@types/bun": "catalog:",
      "@types/react": "catalog:",
      "@types/react-dom": "catalog:",
      "@aphrody/m3-config": "workspace:*",
      typescript: "catalog:",
    },
    engines: { bun: ">=1.4.2" },
  };
  const main = `// SPDX-License-Identifier: Apache-2.0
import { createRoot } from 'react-dom/client';
import { NextMigrateProvider } from '@aphrody/m3-next-migrate/shims/provider';
import "m3:theme.css";
import "m3:fonts.css";
import App from './App';

const container = document.getElementById('root');
if (!container) throw new Error("Missing application root");
createRoot(container).render(
  <NextMigrateProvider mode="${target}"><App /></NextMigrateProvider>
);
`;
  const files: FileMap = {
    "package.json": JSON.stringify(pkg, null, 2) + "\n",
    "bunfig.toml": '[serve.static]\nplugins = ["@aphrody/m3/plugin"]\n',
    "m3.config.ts":
      'import { defineM3Config } from "@aphrody/m3/config";\nexport default defineM3Config({ entry: "src/index.html", port: 1420 });\n',
    "tsconfig.json":
      JSON.stringify(
        {
          extends: "@aphrody/m3-config/tsconfig.json",
          compilerOptions: { types: ["bun"] },
          include: ["src/**/*", "m3.config.ts"],
        },
        null,
        2,
      ) + "\n",
    "src/index.html": `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${name.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</title></head>
<body><div id="root"></div><script type="module" src="./main.tsx"></script></body></html>
`,
    "src/main.tsx": main,
    "src/App.tsx": options.appTsx ?? DEFAULT_APP,
    ".gitignore": "node_modules/\ndist/\nbin/\n",
  };
  return files;
}
