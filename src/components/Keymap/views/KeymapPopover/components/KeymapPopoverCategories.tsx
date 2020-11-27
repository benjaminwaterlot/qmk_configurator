import React, { FC, memo } from 'react'
import KEYCODE_CATEGORIES, {
  KeycodeCategory,
} from 'content/keycodes/keycodes.categories'
import { map } from 'lodash'
import { Button, Wrap, WrapItem } from '@chakra-ui/react'

interface KeymapPopoverCategoriesProps {
  categories: typeof KEYCODE_CATEGORIES
  currentCategory: KeycodeCategory | null
  onCategorySelect: (category: KeycodeCategory | null) => void
}

const KeymapPopoverCategories: FC<KeymapPopoverCategoriesProps> = ({
  categories,
  currentCategory,
  onCategorySelect,
}) => (
  <Wrap m={3} spacing={2}>
    {map(categories, (categoryData, category: KeycodeCategory) => (
      <WrapItem key={category}>
        <Button
          onClick={() =>
            onCategorySelect(category === currentCategory ? null : category)
          }
          size="xs"
          title={KEYCODE_CATEGORIES[category].label}
          colorScheme={
            currentCategory === category ? categoryData.color : 'gray'
          }
        >
          {KEYCODE_CATEGORIES[category].icon}
        </Button>
      </WrapItem>
    ))}
  </Wrap>
)

export default memo(KeymapPopoverCategories)
