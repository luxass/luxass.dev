import { WindowsApp } from "./types";

/**
 * Returns a list of all installed windows apps
 */
export function getApps(): WindowsApp[] {
  return [
    {
      appId: "trash",
      name: "Trash",
      icon: "/apps/trash.png",
      taskbar: false,
    },
  ];
}
