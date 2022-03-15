import Image from "next/image";
import { useState } from "react";
import { LockTime } from "./LockTime";
import { ScreenLockLogin } from "./ScreenLockLogin";
import clsx from "clsx";
import { useEventListener } from "src/hooks/use-eventlistener";

export function ScreenLock() {
  const [login, setLogin] = useState<boolean>(false);

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
      className={clsx("h-screen w-full text-white", {
        "flex items-end": !login,
      })}
    >
      <div className="-z-[1] fixed overflow-hidden w-screen h-screen">
        <Image
          alt="travel"
          src="/windows-lockscreen.jpg"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      {login ? <ScreenLockLogin /> : <LockTime />}
    </section>
  );
}
