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


export type WindowsTheme = "dark" | "light";
export type Wallpaper = string;


export interface IWidget {}
