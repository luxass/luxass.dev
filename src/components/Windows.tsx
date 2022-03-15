import { Taskbar } from "./Taskbar";
import Image from "next/image";
import { useMediaQuery } from "@hooks/use-mediaquery";
import { Apps } from "./Apps";
import { Desktop } from "./Desktop";

export function Windows() {
  const dark = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <Desktop bg={dark ? "dark" : "light"}>
      <Apps />
      <Taskbar />
    </Desktop>
  );
}
