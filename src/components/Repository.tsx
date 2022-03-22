import { RepositoryNode } from "@lib/types";
import Link from "next/link";

interface RepositoryProps {
  repo: RepositoryNode;
}

export function Repository({ repo }: RepositoryProps) {
  return (
    <div className="py-6 w-full border-b border-b-[#444c56]">
      <h2 className="mb-1 break-all font-semibold text-[20px]">
        <Link href={`https://github.com/${repo.nameWithOwner}`} passHref>
          <a className="text-[#539bf5] hover:underline">{repo.nameWithOwner}</a>
        </Link>
      </h2>
      <p className="pr-6 text-[14px] mb-2 text-[#a5b2c0]">{repo.description}</p>

    </div>
  );
}
