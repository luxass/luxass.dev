import { signal } from "@preact/signals";

export interface Props {
  pkg: string;
}

const pkgManager = signal("npm");

export function PackageManager({ pkg }: Props) {
  const args = getArgs(pkgManager.value);
  const cmd = `${pkgManager.value} ${args.join(" ")} ${pkg}`;
  return (
    <div className="b border-gray-700 p-2 rounded">
      <div className="flex gap-2 mb-4">
        {["pnpm", "yarn", "npm"].map((manager) => (
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
      <pre>
        <code>{cmd}</code>
      </pre>
    </div>
  );
}

function getArgs(pm: string) {
  if (pm === "yarn") {
    return ["global", "add"];
  }
  if (pm === "pnpm") {
    return ["-g", "install"];
  }
  return ["--location=global", "install"];
}
