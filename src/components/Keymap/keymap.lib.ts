import { useMemo } from 'react'
import { KeyboardLayout } from 'store/keyboards/dto/get-keyboard.dto'
import { KeyCoordinates } from './Keymap'

export const useDimensionsFromLayout = (layout: KeyboardLayout) =>
  useMemo(
    () =>
      layout.reduce(
        ({ width, height }, { x, y }) => ({
          width: x + 1 > width ? x + 1 : width,
          height: y + 1 > height ? y + 1 : height,
        }),
        { width: 0, height: 0 }
      ),
    [layout]
  )

/**
 * Generate an array (the keyboard) of arrays (the keyboard rows) containing the keys.
 */
export const groupKeysByRow = (layout: KeyboardLayout) =>
  layout.reduce((rows, { x, y, w = 1 }) => {
    rows[y] = [...(rows[y] ?? []), { x, y, w }]

    return rows
  }, [] as KeyCoordinates[][])

/**
 * Generate a string to use with grid-template-columns.
 * Takes into account the width of each key.
 */
export const getCSSColumnsFromRow = (row: KeyCoordinates[]) =>
  row.map((key) => `${key.w}fr`).join(' ')
