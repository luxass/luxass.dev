import { WindowsContext } from "@contexts/windows-provider";
import { useContext } from "react";

export function useWindows() {
  const context = useContext(WindowsContext);
  if (!context) {
    throw new Error("useWindows must be used within a WindowsProvider");
  }
  return context;
}
