import { createSignal, onCleanup } from 'solid-js'

type CopyFn = (text: string) => Promise<boolean>

interface CopyToClipboardProps {
  id: string
}

export function CopyToClipboard(props: CopyToClipboardProps) {
  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported')
      return false
    }

    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (error) {
      console.warn('Copy failed', error)
      return false
    }
  }

  const [isCopied, setIsCopied] = createSignal(false)

  let timeout: NodeJS.Timeout
  onCleanup(() => {
    if (timeout) clearTimeout(timeout)
  })

  const handleClick = async () => {
    // get the text from the dom element with the id
    const text = document.querySelectorAll(`#${props.id} > code`)[0].textContent
    if (!text) {
      console.warn('No text to copy')
      throw new Error('No text to copy')
    }
    const isCopiedValue = await copy(text)
    setIsCopied(isCopiedValue)
    if (isCopiedValue) {
      timeout = setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    }
  }

  return (
    <button
      aria-label="Copy to clipboard"
      class="copy absolute right-2 top-2 flex items-center justify-center border border-gray-400/20 rounded bg-[#ffffff] p-2 opacity-0 dark:bg-[#121212] group-hover:opacity-100"
      onClick={handleClick}
    >
      {isCopied() ? <span class="i-lucide-clipboard-check" /> : <span class="i-lucide-clipboard" />}
    </button>
  )
}
