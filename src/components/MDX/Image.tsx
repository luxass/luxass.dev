import Image, { ImageProps } from 'next/future/image';

export default function CustomImage({ alt, ...props }: ImageProps) {
  return <Image alt={alt} {...props} priority />;
}
