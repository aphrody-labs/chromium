// SPDX-License-Identifier: Apache-2.0
/**
 * Bun-native IPC bridge for Next.js Server Actions and API Routes.
 */

export interface BunInvokeOptions {
  headers?: Record<string, string>;
}

export async function bunInvoke<T = unknown>(
  cmd: string,
  args?: Record<string, unknown>,
): Promise<T> {
  if (typeof window !== "undefined") {
    const runtime = (window as any).bunmium;
    if (runtime?.invoke) {
      return await runtime.invoke(cmd, args);
    }
  }
  throw new Error(
    `Bun invoke not available for command "${cmd}". Ensure Bunmium runtime is initialized.`,
  );
}

/**
 * Creates a client-side wrapper for a Next.js Server Action that delegates
 * to a Tauri native command when in desktop mode, or to a fallback / fetch endpoint in Vite.
 */
export function createServerActionBridge<TArgs = any, TResult = any>(
  actionName: string,
  options?: {
    bunCommand?: string;
    endpoint?: string;
    localFallback?: (args: TArgs) => Promise<TResult>;
  },
): (args: TArgs) => Promise<TResult> {
  const bunCmd = options?.bunCommand || `action_${actionName.replace(/[^a-zA-Z0-9_]/g, "_")}`;
  const endpoint = options?.endpoint || `/api/actions/${actionName}`;

  return async (args: TArgs): Promise<TResult> => {
    // 1. Try Bun-native invoke
    if (typeof window !== "undefined" && (window as any).bunmium) {
      try {
        return await bunInvoke<TResult>(bunCmd, { payload: args });
      } catch (err: any) {
        if (!options?.localFallback && !options?.endpoint) {
          throw err;
        }
      }
    }

    // 2. Try HTTP fetch if endpoint provided
    if (options?.endpoint && typeof fetch !== "undefined") {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(args),
      });
      if (!res.ok) {
        throw new Error(`Action ${actionName} failed with HTTP ${res.status}`);
      }
      return await res.json();
    }

    // 3. Try local fallback if available
    if (options?.localFallback) {
      return await options.localFallback(args);
    }

    throw new Error(
      `Unable to execute Server Action "${actionName}". Neither Bun IPC nor HTTP endpoint is available.`,
    );
  };
}
