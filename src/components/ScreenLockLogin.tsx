import { Avatar } from "./Avatar";
import { ScreenLoginButtons } from "./ScreenLoginButtons";

export function ScreenLockLogin() {
  return (
    <section className="backdrop-blur-lg w-full h-screen flex flex-col">
      <section className="flex-1 mt-32 flex flex-col justify-top items-center">
        <Avatar variant="lock" />
        <h2 className="text-6xl font-extralight my-4">Lucas</h2>
        <section>

        </section>
      </section>
      <ScreenLoginButtons />
    </section>
  );
}
