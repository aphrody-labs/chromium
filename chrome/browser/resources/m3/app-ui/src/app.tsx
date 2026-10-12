// SPDX-License-Identifier: Apache-2.0
// Unified Aphrody OS Application Shell - Based directly on Spacedrive M3 Navigation & Layout.
// Public Aphrody workspace: chat, files, models and settings.

// oxlint-disable-next-line import/no-unassigned-import
import "m3:symbols.css";
import { type ReactNode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { SpacedriveClient, HttpTransport } from "@aphrody/drive-client";
import { PlatformProvider, type Platform } from "./contexts/PlatformContext";
import { Shell } from "./Shell";
import { explorerRoutes } from "./router";
import { DesktopPet, DesktopWidget, SplashScreen } from "./desktop-surfaces";
import { PetGuide } from "./pet-guide-view";
import { QuickBar } from "./quickbar";
import { pickDirectory, pickFile } from "./bun-bridge";
import { wantsHttpBackend, webOsTransport } from "./webos-backend";

/**
 * Native platform adapter providing OS capabilities (dialogs, window control, links).
 */
const nativePlatform: Platform = {
	platform: "bun",
  openLink(url: string) {
	    window.open(url, "_blank", "noopener,noreferrer");
  },
  confirm(message: string, callback: (result: boolean) => void) {
    callback(window.confirm(message));
  },
  async openDirectoryPickerDialog(opts?: { title?: string; multiple?: boolean }) {
    const res = await pickDirectory(opts?.title ?? "Sélectionner un dossier");
    return res;
  },
  async openFilePickerDialog(opts?: { title?: string; multiple?: boolean }) {
    const res = await pickFile(opts?.title ?? "Sélectionner un fichier");
    return res;
  },
  async getDaemonStatus() {
    return {
      is_running: false,
      socket_path: "",
      server_url: null,
      started_by_us: false,
    };
  },
  async getCurrentLibraryId() {
    return null;
  },
  getCurrentWindowLabel() {
    return "main";
  },
};

/**
 * Real Spacedrive client connected to the aphrody-drive plugin supervisor.
 */
const client = new SpacedriveClient(
  wantsHttpBackend(window.location.search) ? new HttpTransport() : webOsTransport(),
);

function App() {
  useEffect(() => {
    document.documentElement.dataset.runtime = "bun";
  }, []);

  return (
    <PlatformProvider platform={nativePlatform}>
      <Shell client={client} routes={explorerRoutes} />
      <PetGuide />
    </PlatformProvider>
  );
}

const view = new URLSearchParams(window.location.search).get("view");
const views: Record<string, () => ReactNode> = {
  quickbar: () => <QuickBar />,
  splash: () => <SplashScreen />,
  pet: () => <DesktopPet />,
  widget: () => <DesktopWidget />,
};

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render((view && views[view]?.()) ?? <App />);
}
