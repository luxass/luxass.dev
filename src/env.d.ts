/// <reference types="astro/client" />

declare module 'emoji-name-map' {
  const map: Record<string, string>;
  export function get(name: string): string;
}