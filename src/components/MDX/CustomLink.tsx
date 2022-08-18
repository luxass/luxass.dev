import Link from "next/link";
import { HTMLProps } from "react";

export default function CustomLink(props: HTMLProps<HTMLAnchorElement>) {
  const href = props.href;
  const isInternalLink = href && href.startsWith("/");

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props}>{props.children}</a>
      </Link>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}
