import { m3Package } from "@aphrody/m3-config/bun-build";

export default m3Package({
  entry: ["src/index.ts", "src/react.tsx", "src/bun.tsx"],
  useClient: ["react.js", "bun.js"],
});
