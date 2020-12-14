import { FC } from 'react'
import {
  Button,
  Wrap,
  WrapItem,
  ButtonGroup,
  IconButton,
  Tooltip,
  Editable,
  EditablePreview,
  EditableInput,
  useDisclosure,
} from '@chakra-ui/react'
import { AddIcon, CopyIcon, LockIcon, SettingsIcon } from '@chakra-ui/icons'
import { KeymapEntity } from 'store/keymaps/keymaps.adapter'
import store, { useAppDispatch } from 'store'
import { v4 } from 'uuid'

interface KeyboardPageKeymapSelectProps {
  modal: ReturnType<typeof useDisclosure>
  keymaps: KeymapEntity[]
  currentLayout: string
  currentKeymap: string
  keyboard: string
  setCurrentKeymap: (keymap: string) => Promise<void>
}

const KeyboardPageKeymapSelect: FC<KeyboardPageKeymapSelectProps> = ({
  modal,
  currentLayout,
  currentKeymap,
  setCurrentKeymap,
  keymaps,
  keyboard,
}) => {
  const dispatch = useAppDispatch()

  return (
    <Wrap>
      {keymaps.map((keymap, keymapIndex) => {
        const isReadonly = keymap.isDefault
        const isActive = keymap.id === currentKeymap

        return (
          <WrapItem key={keymap.id} fontFamily="mono">
            <ButtonGroup
              size="sm"
              isAttached
              variant="outline"
              borderColor="primary.400"
            >
              {/* The "layout" button, which allows to select another layout for this keymap. */}
              {isActive && !isReadonly && (
                <IconButton
                  isActive={isActive}
                  aria-label=""
                  icon={<SettingsIcon />}
                  onClick={modal.onOpen}
                />
              )}

              {/* The keymap name. */}
              {/* If this keymap is not selected, it's a button allowing to select it. */}
              {/* If this keymap is selected, it is editable on click to edit its name. */}
              {isActive && !isReadonly ? (
                <Editable
                  onSubmit={(name) => {
                    dispatch(
                      store.keymaps.actions.editName({ id: keymap.id, name }),
                    )
                  }}
                  fontWeight="semibold"
                  fontSize="sm"
                  defaultValue={keymap.name}
                  variant="outline"
                >
                  <EditablePreview
                    as={Button}
                    isActive={isActive}
                    borderRadius={
                      isReadonly
                        ? '4px 0 0 4px' // keep the left border-radius for the locked keymap name
                        : 'none' // scrap it for others
                    }
                    mx="-px"
                  />
                  <EditableInput size={keymap.name.length} py="3px" px="12px" />
                </Editable>
              ) : (
                <Button
                  cursor={isActive && isReadonly ? 'unset' : 'pointer'}
                  isActive={isActive}
                  onClick={() => setCurrentKeymap(keymap.id)}
                  leftIcon={
                    isReadonly ? (
                      <Tooltip hasArrow label="This keymap is readonly.">
                        <LockIcon mb="1px" />
                      </Tooltip>
                    ) : undefined
                  }
                >
                  {keymap.name}
                </Button>
              )}

              {/* A button allowing to duplicate the current keymap to a new keymap. */}
              {isActive && (
                <Tooltip label="Duplicate">
                  <IconButton
                    isActive={isActive}
                    aria-label=""
                    {...(keymapIndex === 0 && {
                      borderLeftRadius: 'none',
                    })}
                    onClick={() => {
                      const id = v4()

                      dispatch(
                        store.keymaps.actions.duplicate({
                          fromId: keymap.id,
                          toId: id,
                          newKeymap: `${keymap.name} [copy]`,
                        }),
                      )

                      setCurrentKeymap(id)
                    }}
                    icon={<CopyIcon />}
                  />
                </Tooltip>
              )}
            </ButtonGroup>
          </WrapItem>
        )
      })}

      {/* A button allowing to create a new keymap from scratch. */}
      <WrapItem>
        <IconButton
          size="sm"
          aria-label="Create a keymap"
          variant="outline"
          icon={<AddIcon />}
          onClick={() => {
            const id = dispatch(
              store.keymaps.thunks.createKeymap({
                keyboardId: keyboard,
                keymapName: `New`,
                layoutId: currentLayout,
              }),
            )

            setCurrentKeymap(id)
          }}
        />
      </WrapItem>
    </Wrap>
  )
}

export default KeyboardPageKeymapSelect
