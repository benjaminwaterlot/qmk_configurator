import { KeyboardLayout } from 'store/keyboards/dto/get-keyboard.dto'

export const getWidthHeightFromLayout = (layout: KeyboardLayout) =>
  layout.reduce(
    ({ width, height }, { x, y }) => ({
      width: x + 1 > width ? x + 1 : width,
      height: y + 1 > height ? y + 1 : height,
    }),
    { width: 0, height: 0 }
  )
