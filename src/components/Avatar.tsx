import Image from "next/image";

export interface AvatarProps {
  variant: "lock" | "user";
}

export function Avatar({ variant }: AvatarProps) {
  return (
    <section className="rounded-full w-52 h-52 bg-gray-600">
      
    </section>
  );
}
