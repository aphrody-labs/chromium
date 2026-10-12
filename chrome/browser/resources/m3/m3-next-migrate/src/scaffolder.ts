// SPDX-License-Identifier: Apache-2.0
import {
  appFiles,
  assertNativeShellOwner,
  assertPrivateOwnerWorkspace,
  writeFiles,
} from "@aphrody/scaffold";
import { generateAppRouterCode, type RouteHierarchy } from "./layout";

export interface ScaffoldOptions {
  projectName?: string;
  target?: "bun";
  outDir: string;
  modernizeM3?: boolean;
  hierarchy?: RouteHierarchy;
  dependencies?: Record<string, string>;
}

/** Writes the migrated project: the `app` template of `@aphrody/scaffold` with the migrated route tree as `src/App.tsx`. */
export async function scaffoldTargetProject(options: ScaffoldOptions): Promise<void> {
  const {
    projectName = "migrated-app",
    target = "bun",
    outDir,
    modernizeM3 = false,
    hierarchy,
  } = options;
  assertPrivateOwnerWorkspace(outDir);
  assertNativeShellOwner(target);
  const files = appFiles({
    name: projectName,
    target,
    modernizeM3,
    dependencies: options.dependencies,
    appTsx: hierarchy ? generateAppRouterCode(hierarchy, { modernizeM3, target }) : undefined,
  });
  await writeFiles(outDir, files, "empty");
}
