import { WindowsApp } from "./types";

/**
 * Returns a list of all installed windows apps
 */
export function getApps(): WindowsApp[] {
  return [
    {
      appId: "explorer",
      name: "Explorer",
      icon: "/apps/explorer.png",
      taskbar: true,
      sizes: {
        minWidth: 730,
        width: 800,
        height: 400,
        resizable: true,
      },
    },
    {
      appId: "trash",
      name: "Trash",
      icon: "/apps/trash.png",
      taskbar: false,
      sizes: {
        minWidth: 730,
        width: 800,
        height: 400,
        resizable: true,
      },
    },
    {
      appId: "notion",
      name: "Notion",
      icon: "/apps/notion.png",
      taskbar: true,
      sizes: {
        minWidth: 730,
        width: 800,
        height: 400,
        resizable: true,
      },
    },
    {
      appId: "slack",
      name: "Slack",
      icon: "/apps/slack.ico",
      taskbar: true,
      sizes: {
        minWidth: 730,
        width: 800,
        height: 400,
        resizable: true,
      },
    },
    {
      appId: "vscode",
      name: "VSCode",
      icon: "/apps/vscode.ico",
      taskbar: true,
      sizes: {
        minWidth: 730,
        width: 800,
        height: 400,
        resizable: true,
      },
    },
    {
      appId: "intellij",
      name: "IntelliJ",
      icon: "/apps/intellij.png",
      taskbar: true,
      sizes: {
        minWidth: 730,
        width: 800,
        height: 400,
        resizable: true,
      },
    },
  ];
}
