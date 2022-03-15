import { WindowsApp } from "@lib/types";
import { createContext, useState } from "react";
import { getApps } from "@lib/windows-apps";
import { Widgets } from "@lib/widgets";

interface WindowsContext {
  locked: boolean;
  apps: WindowsApp[];
  opened: WindowsApp[];
  widget: Widgets | null;
  setWidget: (widget: Widgets | null) => void;
}

const defaultWindowsContext: WindowsContext = {
  locked: false,
  apps: getApps(),
  opened: [],
  widget: null,
  setWidget: (widget: Widgets | null) => {},
};

export const WindowsContext = createContext(defaultWindowsContext);

export const WindowsProvider: React.FC = ({ children }) => {
  const [widget, setWidget] = useState<Widgets | null>(null);

  return (
    <WindowsContext.Provider
      value={{
        ...defaultWindowsContext,
        widget,
        setWidget,
      }}
    >
      {children}
    </WindowsContext.Provider>
  );
};
