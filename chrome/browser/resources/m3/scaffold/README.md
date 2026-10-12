<!-- SPDX-License-Identifier: Apache-2.0 -->

# @aphrody/scaffold

The single scaffolder of the UI stack: Tauri 3 shell, `web`, `app`, `spa` and `example` templates and a
writer that never overwrites. Guide: [`docs/guides/ui/SCAFFOLD.md`](../../docs/guides/SCAFFOLD.md).

`spa` is a React single-page app on TanStack Router (code-based route tree, a loader, `notFound()`), run by
`m3-bun dev|build|serve`; `m3-bun serve` answers client routes with `index.html`.

```sh
bunx aphrody-scaffold list
bunx aphrody-scaffold example ../aphrody-example
bunx aphrody-scaffold new spa ../my-spa
```
