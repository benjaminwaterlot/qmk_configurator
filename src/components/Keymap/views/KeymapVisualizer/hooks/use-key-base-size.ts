import { useBreakpointValue } from '@chakra-ui/react'
import { clamp } from 'lodash'
import { useMemo } from 'react'
import { AppTheme } from 'theme'

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
 * then map the result to a fontSize of our theme.
 */
const useKeyBaseSize = ({ width }: { width: number }) => {
  const breakpointSizeScore =
    useBreakpointValue({
      base: 0,
      sm: 0.3,
      md: 0.6,
      lg: 1,
    }) ?? 0

  return useMemo(() => {
    /**
     * A keyboard of 12 keys wide (ex: a planck) has the minimum value.
     */
    const arbitraryWidthValue = (width - 12) / 3

    /**
     * We inverse this value : `1 / value`, to get the width score.
     */
    const widthScore = clamp(1 / arbitraryWidthValue, 0, 1)

    /**
     * A representation of the size of a key on the screen, between 0 and 1.
     */
    const score = widthScore * breakpointSizeScore

    /**
     * We map this score to a theme fontSize.
     */
    const fontSizes: {
      scoreCeil: number
      size: keyof AppTheme['fontSizes']
    }[] = [
      { scoreCeil: 0.2, size: '2xs' },
      { scoreCeil: 0.4, size: 'xs' },
      { scoreCeil: 0.6, size: 'md' },
      { scoreCeil: 0.8, size: 'lg' },
      { scoreCeil: 1, size: 'xl' },
    ]

    return fontSizes.find(({ scoreCeil }) => score <= scoreCeil)?.size ?? '2xs'
  }, [breakpointSizeScore, width])
}

export default useKeyBaseSize
