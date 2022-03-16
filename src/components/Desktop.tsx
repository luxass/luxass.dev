import { useWindows } from "@hooks/use-windows";
import { LockScreen } from "./LockScreen";

export interface DesktopProps {
  children: React.ReactNode;
  bg: "dark" | "light";
}

export function Desktop({ children, bg = "dark" }: DesktopProps) {
  const { locked } = useWindows();
  return (
    <>
      {locked ? (
        <LockScreen />
      ) : (
        <section
          className="h-screen w-full flex flex-col"
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
    url(/wallpaper-${bg ? "dark" : "light"}.jpg) center/cover no-repeat
      fixed`,
          }}
        >
          {children}
        </section>
      )}
    </>
  );
}
