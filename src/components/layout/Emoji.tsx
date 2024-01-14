import { createSignal } from "solid-js";

export function EmojiCycle() {
  const emojis = [
    "🇩🇰",
    "📦",
    "🎨",
    "👨‍💻",
    "🌍",
    "🏥",
  ];
  const [index, setIndex] = createSignal(0);

  const cycle = () => {
    setIndex((current) => (current + 1) % emojis.length);
  };

  return (
    <button onClick={cycle}>
      {emojis[index()]}
    </button>
  );
}
