import Link from 'next/link';
import { HTMLProps } from 'react';

export default function CustomLink({
  href,
  children,
  ...props
}: HTMLProps<HTMLAnchorElement>) {
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link href={href} legacyBehavior>
        <a {...props}>{children}</a>
      </Link>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}
