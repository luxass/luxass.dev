export interface LockScreenProps {}

export function LockScreen({}: LockScreenProps) {
  return (
    <section
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
    url(/wallpaper-dark.jpg) center/cover no-repeat
      fixed`,
      }}
    ></section>
  );
}
