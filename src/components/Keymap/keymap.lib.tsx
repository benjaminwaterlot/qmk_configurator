import { useMemo } from 'react'
import { KeyboardLayout } from 'store/keyboards/dto/get-keyboard.dto'

/**
 * This extracts the dimensions of a layout
 * (in relative units where a regular key has 1 width and 1 height)
 */
export const useDimensionsFromLayout = (layout: KeyboardLayout) =>
  useMemo(
    () =>
      layout.reduce(
        ({ width, height }, key) => {
          const localWidth = key.x + (key.w ?? 1)
          const localHeight = key.y + (key.h ?? 1)

          return {
            width: localWidth > width ? localWidth : width,
            height: localHeight > height ? localHeight : height,
          }
        },
        { width: 0, height: 0 },
      ),
    [layout],
  )
