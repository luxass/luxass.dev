import { signal } from "@preact/signals";
import { useClipboard } from "~/hooks/useClipboard";

const pkgManager = signal("npm");

export function PackageManager() {
  const args = getArgs(pkgManager.value);
  const cmd = `${pkgManager.value} ${args.join(" ")} esbuild`;
  const { copy, copied } = useClipboard();
  return (
    <div className="b border-gray-700 p-2 rounded mt-8">
      <div className="flex gap-2 mb-4">
        {["npm", "pnpm", "yarn"].map((manager) => (
          <>
            <button
              onClick={() => (pkgManager.value = manager)}
              className="b border-gray-700 p-2 rounded"
            >
              {manager}
            </button>
          </>
        ))}
      </div>

      <div class="b border-gray-700 p-2 relative group">
        <p>{cmd}</p>
        <button
          class="absolute top-2 right-2 rounded w-6 h-6 hidden group-hover:flex b border-gray-500 items-center justify-center"
          onClick={() => copy(cmd)}
        >
          {copied ? <ClipboardIcon color="#3178c6" /> : <ClipboardIcon />}
        </button>
      </div>
    </div>
  );
}

function ClipboardIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
      />
    </svg>
  );
}

function getArgs(pm: string) {
  if (pm === "yarn") {
    return ["global", "add"];
  }
  return ["install", "-g"];
}
