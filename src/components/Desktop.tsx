import { useRecoilValue } from "recoil";
import { desktopState } from "src/recoil";

export interface DesktopProps {
  children: React.ReactNode;
}

export function Desktop({ children }: DesktopProps) {
  const { theme } = useRecoilValue(desktopState);
  return (
    <section
      className="h-screen w-full flex flex-col"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
    url(/wallpaper-${theme}.jpg) center/cover no-repeat
      fixed`,
      }}
    >
      {children}
    </section>
  );
}
