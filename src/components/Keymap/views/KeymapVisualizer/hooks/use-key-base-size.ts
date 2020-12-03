import { useBreakpointValue } from '@chakra-ui/react'
import { clamp } from 'lodash'
import { useMemo } from 'react'

/**
 * The size of a key on the screen is very important,
 * to properly size spacings and fonts of the key.
 *
 * This hook determines a font size from which every of these values will be inherited.
 *
 *  This value is based on:
 * -> the current breakpoint (on a smaller screen, keys will be smaller)
 * -> the width of the current keyboard (a 30-keys keyboard will have comparatively larger keys).
 *
 * We compute a score between 0 and 1 based on these values,
 * then map the result to a base fontSize.
 */
const useKeyBaseSize = ({ width }: { width: number }) => {
  const breakpointSizeScore =
    useBreakpointValue({
      base: 0.4,
      sm: 0.6,
      md: 0.8,
      lg: 0.9,
      xl: 1,
    }) ?? 0

  return useMemo(() => {
    /**
     * A keyboard of 12 keys wide (ex: a planck) has the minimum value.
     * The last number is a constant to prevent large boards from having invisible fonts.
     */
    const arbitraryWidthValue = clamp(width - 12, 0, 1) / 5

    /**
     * We inverse this value : `1 / value`, to get the width score.
     */
    const widthScore = clamp(1 / arbitraryWidthValue, 0, 1)

    /**
     * A representation of the size of a key on the screen, between 0 and 1.
     */
    const score = widthScore * breakpointSizeScore

    const MAX_KEY_SIZE = 35 // the maximum fontSize keys can inherit from.

    return score * MAX_KEY_SIZE
  }, [breakpointSizeScore, width])
}

export default useKeyBaseSize
