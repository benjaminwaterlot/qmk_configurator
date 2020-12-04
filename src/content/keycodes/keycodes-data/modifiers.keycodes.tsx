import React from 'react'
import { KeycodeCategory } from '../keycodes.categories'
import { BsCommand, BsOption, BsShift } from 'react-icons/bs'
import { Icon } from '@chakra-ui/react'
import { MdKeyboardArrowUp } from 'react-icons/md'

const modifiersKeycodesData = {
  KC_LCTL: {
    aliases: 'KC_LCTRL',
    description: 'Left [kbd]Control[/]',
    display: <Icon as={MdKeyboardArrowUp} />,
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.MODIFIERS,
  },
  KC_LSFT: {
    aliases: 'KC_LSHIFT',
    display: <Icon as={BsShift} />,
    description: 'Left [kbd]Control[/]',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.MODIFIERS,
  },
  KC_LALT: {
    aliases: 'KC_LOPT',
    description: 'Left [kbd]Alt[/] ([code]Option[/])',
    display: <Icon as={BsOption} />,
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.MODIFIERS,
  },
  KC_LGUI: {
    aliases: 'KC_LCMD, KC_LWIN',
    description:
      'Left [kbd]GUI[/] ([code]Windows[/] / [code]Command[/] / [code]Meta[/])',
    display: <Icon as={BsCommand} />,
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.MODIFIERS,
  },
  KC_RCTL: {
    aliases: 'KC_RCTRL',
    description: 'Right [kbd]Control[/]',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.MODIFIERS,
  },
  KC_RSFT: {
    aliases: 'KC_RSHIFT',
    description: 'Right [kbd]Shift[/]',
    display: <Icon as={BsShift} />,
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.MODIFIERS,
  },
  KC_RALT: {
    aliases: 'KC_ROPT, KC_ALGR',
    description: 'Right [kbd]Alt[/] ([code]Option[/] / [code]AltGr[/])',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.MODIFIERS,
  },
  KC_RGUI: {
    aliases: 'KC_RCMD, KC_RWIN',
    description:
      'Right [kbd]GUI[/] ([code]Windows[/] / [code]Command[/] / [code]Meta key[/])',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.MODIFIERS,
  },
} as const

export default modifiersKeycodesData
