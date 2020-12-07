import { FC, memo } from 'react'
import KEYCODE_CATEGORIES, {
  KeycodeCategory,
} from 'content/keycodes/keycodes.categories'
import { map } from 'lodash'
import { Button, Wrap, WrapItem, WrapProps } from '@chakra-ui/react'

interface KeymapPopoverCategoriesProps extends WrapProps {
  categories: typeof KEYCODE_CATEGORIES
  currentCategory: KeycodeCategory | null
  onCategorySelect: (category: KeycodeCategory | null) => void
}

const KeymapPopoverCategories: FC<KeymapPopoverCategoriesProps> = ({
  categories,
  currentCategory,
  onCategorySelect,
  ...rest
}) => (
  <Wrap m={3} spacing={2} {...rest}>
    {map(categories, (categoryData, category: KeycodeCategory) => (
      <WrapItem key={category}>
        <Button
          onClick={() =>
            onCategorySelect(category === currentCategory ? null : category)
          }
          fontWeight="bold"
          size="xs"
          title={KEYCODE_CATEGORIES[category].label}
          {...(currentCategory !== category && {
            _hover: {
              color: `${categoryData.color}.300`,
            },
          })}
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
