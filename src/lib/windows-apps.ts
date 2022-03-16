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
    {
      appId: "explorer",
      name: "Explorer",
      icon: "/apps/explorer.png",
      taskbar: true,
    },
    {
      appId: "edge-beta",
      name: "Microsoft Edge Beta",
      icon: "/apps/edge-beta.png",
      taskbar: true,
    },
    {
      appId: "notion",
      name: "Notion",
      icon: "/apps/notion.png",
      taskbar: true,
    },
    {
      appId: "slack",
      name: "Slack",
      icon: "/apps/slack.ico",
      taskbar: true,
    },
    {
      appId: "vscode",
      name: "VSCode",
      icon: "/apps/vscode.ico",
      taskbar: true,
    },
    {
      appId: "intellij",
      name: "IntelliJ",
      icon: "/apps/intellij.png",
      taskbar: true,
    },
  ];
}
