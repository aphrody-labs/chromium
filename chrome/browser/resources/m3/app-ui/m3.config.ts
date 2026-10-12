// SPDX-License-Identifier: Apache-2.0
// Bun-native Chromium WebUI surface.
//   m3 dev   -> http://localhost:1421
//   m3 build -> Bun output consumed by Chromium resources.
import { defineM3Config } from "@aphrody/m3/config";

import { appServerProxy } from "./backend";

export default defineM3Config({
  proxy: appServerProxy(),
  entry: "src/index.html",
  port: 1421,
  drop: ["debugger"],
  optimizeImports: [
    "@phosphor-icons/react",
    "@tanstack/react-query",
    "@tanstack/react-table",
    "@tanstack/react-virtual",
  ],
});
