import { useEffect } from 'react'

/**
 * Hook that will call <cb> when Escape is pressed.
 */
const useCbOnEscape = (cb: Function) =>
  useEffect(() => {
    const handleKey = ({ key }: KeyboardEvent) => {
      if (key === 'Escape') cb()
    }

    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [cb])

export default useCbOnEscape
