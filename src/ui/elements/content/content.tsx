import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useEffect } from 'preact/hooks'

import { useCallbackRef } from '~/tools/hooks'
import { Slide } from '~/ui/elements/slide'
import { processFileForUpload } from '~/tools/handle-file'

import styles from './content.styl'

type Props = {
  name: string
  dropAvailable?: boolean
  onClose?: () => void
  onAddFiles?: (fileKeys: string[]) => void
  onAddMessage?: (text: string) => void
}

export const Content: FC<Props> = memo(({
  children,
  name,
  dropAvailable,
  onClose,
  onAddFiles,
  onAddMessage
}) => {
  const handleDrag = useCallback(ev => {
    if (!dropAvailable) return

    ev.stopPropagation()
    ev.preventDefault()
  }, [dropAvailable])

  const handleDrop = useCallback(async (ev: DragEvent) => {
    if (!dropAvailable) return

    ev.stopPropagation()
    ev.preventDefault()

    const fileList = ev.dataTransfer?.files
    if (!fileList?.length) return;
    
    const files = Array.from(fileList);
    const fileKeysPromises = files.map(file => processFileForUpload(file));
    const fileKeysArrays = await Promise.all(fileKeysPromises);
    const fileKeys = fileKeysArrays.flat();

    if (fileKeys.length) {
      onAddFiles?.(fileKeys)
    }
  }, [dropAvailable, onAddFiles])

  const [_handlePaste, handlePasteRef] = useCallbackRef(async (ev: ClipboardEvent) => {
    if (!dropAvailable) return

    const fileList = ev.clipboardData?.files
    const text = fileList?.length ? '' : ev.clipboardData?.getData('text')

    if (fileList?.length) {  
      const files = Array.from(fileList);
      const fileKeysPromises = files.map(file => processFileForUpload(file));
      const fileKeysArrays = await Promise.all(fileKeysPromises);
      const fileKeys = fileKeysArrays.flat();

      if (fileKeys.length) {
        onAddFiles?.(fileKeys)
      }
    } else if (text) {
      onAddMessage?.(text)
    }
  }, [dropAvailable, onAddFiles, onAddMessage])

  useEffect(() => {
    const handlePaste = (ev) => handlePasteRef.current(ev)

    self.document.addEventListener('paste', handlePaste, { passive: true })
    return () => self.document.removeEventListener('paste', handlePaste)
  }, [])

  return (
    <Slide
      class={styles.root}
      name={name}
      onClose={onClose}
    >
      <div
        class={styles.content}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {children}
      </div>
    </Slide>
  )
})
