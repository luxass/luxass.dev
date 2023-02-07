import { useCallback, useEffect, useState } from "preact/hooks";

export interface UseClipboardOptions {
  timeout: number;
}

export function useClipboard(
  { timeout }: UseClipboardOptions = { timeout: 3000 }
) {
  const [copied, setCopied] = useState(false);
  const [copiedText, setCopiedText] = useState("");

  const copy = useCallback((text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setCopiedText(text);
    }
  }, []);

  useEffect(() => {
    if (copied) {
      const _timeout = setTimeout(() => {
        setCopied(false);
      }, timeout);
      return () => clearTimeout(_timeout);
    }
  }, [copied]);

  return { copied, copiedText, copy };
}
