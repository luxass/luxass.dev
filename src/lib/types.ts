import { ComponentType } from "react";

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
  /**
   * The sizes of the app
   */
  sizes: AppSize;
}

export interface AppSize {
  minWidth?: number;
  minHeight?: number;
  height: number;
  width: number;
  resizable: boolean;
}

export interface ActiveWindow {
  app: WindowsApp;
  component: ComponentType<any>;
  zIndex: number;
  focused: boolean;
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
