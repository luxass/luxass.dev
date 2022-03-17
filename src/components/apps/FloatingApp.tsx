import { ActiveWindow } from "@lib/types";
import { FC, memo, useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";

export interface FloatingAppProps {
  window: ActiveWindow;
}

const FloatingApp: FC<FloatingAppProps> = memo(({ window: appWindow }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const windowRef = useRef<Rnd>();

  const {
    app: {
      sizes: { width, height, minWidth, minHeight, resizable },
    },
    zIndex,
    component: Component,
  } = appWindow;

  const focusWindow = () => {
    console.log("damn");
  };

  useEffect(() => {
    const { innerWidth, innerHeight } = window;

    windowRef.current?.updatePosition({
      x: Math.round((innerWidth || 0) / 2 - width / 2),
      y: Math.round((innerHeight || 0) / 2 - height / 2),
    });
  }, [height, width]);

  return (
    <Rnd
      ref={(c) => {
        if (c) windowRef.current = c;
      }}
      style={{
        cursor: "auto !important",
        zIndex: zIndex ?? 0,
      }}
      bounds=".desktop-bounds"
      dragHandleClassName="app-drag-handle"
      minHeight={minHeight ?? 300}
      minWidth={minWidth ?? 300}
      default={{
        x: 0,
        y: 0,
        width: `${width}px`,
        height: `${height}px`,
      }}
      enableResizing={resizable}
      onDragStop={(_, d) => {
        if (windowRef.current?.resizableElement.current) {
          windowRef.current.resizableElement.current.style.transform = `translate(${Math.round(
            d.x
          )}px, ${Math.round(d.y)}px)`;
        }
      }}
      onDragStart={focusWindow}
      onResizeStart={focusWindow}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 11px 13px rgba(0,0,0,0.23)",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            borderRadius: "inherit",
            boxShadow:
              "inset 0 0 0 0.9px hsla(240, 24%, 100%, 0.3), 0 0 0 1px hsla(240, 3%, 11%, 0.5)",
          }}
        >
          <div
            ref={ref}
            style={{
              height: "100%",
              margin: "1px",
              borderRadius: "inherit",
              overflow: "hidden",
            }}
          >
            <Component />
          </div>
        </div>
      </div>
    </Rnd>
  );
});

FloatingApp.displayName = "FloatingApp";

export { FloatingApp };
