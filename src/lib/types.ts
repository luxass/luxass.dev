export interface WindowsApp {
  /**
   * Id of the app
   */
  appId: string;
  /**
   * Name of the app
   */
  name: string;
  /**
   * The icon of the app
   */
  icon: string;
  /**
   * Pinned to taskbar
   */
  taskbar: boolean;
}

export interface WindowsQuickSettings {
  /**
   * The current theme
   */
  theme: WindowsTheme;
  /**
   * Wifi
   */
  wifi: boolean;
}


export type WindowsTheme = "dark" | "light";

export interface IWidget {}
