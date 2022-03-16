import { useEventListener } from "@hooks/use-eventlistener";
import { useState } from "react";
import Image from "next/image";
import { windowsState } from "@recoil";
import { useRecoilState } from "recoil";
import { LockTime } from "./LockTime";

export interface LockScreenProps {}

export function LockScreen({}: LockScreenProps) {
  const [login, setLogin] = useState<boolean>(false);
  const [windows, setWindows] = useRecoilState(windowsState);

  useEventListener("click", () => {
    if (login) return;
    setLogin(true);
  });

  useEventListener("keypress", () => {
    if (login) return;
    setLogin(true);
  });

  return (
    <section
      className="h-screen w-full flex flex-col select-none"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
    url(/wallpaper-${windows.theme}.jpg) center/cover no-repeat
      fixed`,
      }}
    >
      {!login ? (
        <section className="flex flex-col items-center mt-40">
          <LockTime />
        </section>
      ) : (
        <section className="flex flex-col items-center mt-40">
          <Image
            src="/me.jpg"
            width="200px"
            height="200px"
            alt="Lucas Nørgård"
            className="rounded-full overflow-hidden"
          />
          <div className="mt-2 text-2xl font-medium text-gray-200">
            Lucas Nørgård
          </div>
          <button
            className="flex items-center mt-6 text-[13px] bg-[#ffffff33] text-white pt-1 pb-1.5 px-9 rounded-[4px] border-2 border-transparent hover:border-[#ffffff54] active:border-transparent active:bg-[#ffffff54]"
            onClick={() => {
              setWindows({
                ...windows,
                locked: false,
              });
            }}
          >
            Sign in
          </button>
        </section>
      )}
    </section>
  );
}
