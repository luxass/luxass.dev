import { ScreenLock } from "@components/ScreenLock";
import { Taskbar } from "@components/Taskbar";
import { useState } from "react";

export default function Home() {
  const [locked, setLocked] = useState<boolean>(true);

  if (locked) {
    return <ScreenLock />;
  }

  return (
    <div
      className="h-screen"
      style={{
        background: "linear-gradient(to right, #00c6fb 0%, #005bea 100%)",
      }}
    >
      <Taskbar />
    </div>
  );
}
