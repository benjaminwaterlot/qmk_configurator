import React from 'react'
import { Icon } from '@chakra-ui/react'
import {
  BsChevronBarDown,
  BsChevronBarUp,
  BsEject,
  BsBrightnessAltHigh,
  BsBrightnessAltLow,
  BsFolder,
  BsPause,
  BsPlay,
  BsSkipBackward,
  BsSkipForward,
  BsStop,
  BsVolumeDown,
  BsVolumeMute,
  BsVolumeUp,
  BsHouseDoor,
} from 'react-icons/bs'
import { SiVlcmediaplayer } from 'react-icons/si'
import { KeycodeCategory } from '../keycodes.categories'

const functionKeycodesData = {
  KC_PAUS: {
    aliases: 'KC_PAUSE, KC_BRK, KC_BRMU',
    description: 'Pause, Brightness Up (macOS)',
    display: <Icon as={BsPause} />,
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_INS: {
    aliases: 'KC_INSERT',
    description: 'Insert',
    display: 'ins',
    Windows: true,
    macOS: false,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_HOME: {
    aliases: '',
    description: 'Home',
    display: <Icon as={BsHouseDoor} />,
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_PGUP: {
    aliases: '',
    description: 'Page Up',
    display: <Icon as={BsChevronBarUp} />,
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_END: {
    aliases: '',
    description: 'End',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_PGDN: {
    aliases: 'KC_PGDOWN',
    description: 'Page Down',
    display: <Icon as={BsChevronBarDown} />,
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_NLCK: {
    aliases: 'KC_NUMLOCK',
    description: 'Keypad Num Lock and Clear',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_MUTE: {
    aliases: 'KC_AUDIO_MUTE',
    description: 'Mute',
    display: <Icon as={BsVolumeMute} />,
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_VOLU: {
    aliases: 'KC_AUDIO_VOL_UP',
    description: 'Volume Up',
    display: <Icon as={BsVolumeUp} />,
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_VOLD: {
    aliases: 'KC_AUDIO_VOL_DOWN',
    description: 'Volume Down',
    display: <Icon as={BsVolumeDown} />,
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_MNXT: {
    aliases: 'KC_MEDIA_NEXT_TRACK',
    description: 'Next Track',
    display: <Icon as={BsSkipForward} />,
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_MPRV: {
    aliases: 'KC_MEDIA_PREV_TRACK',
    description: 'Previous Track',
    display: <Icon as={BsSkipBackward} />,
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_MSTP: {
    aliases: 'KC_MEDIA_STOP',
    description: 'Stop Track',
    display: <Icon as={BsStop} />,
    Windows: true,
    macOS: false,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_MPLY: {
    aliases: 'KC_MEDIA_PLAY_PAUSE',
    description: 'Play/Pause Track',
    display: <Icon as={BsPlay} />,
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_MSEL: {
    aliases: 'KC_MEDIA_SELECT',
    description: 'Launch Media Player',
    display: <Icon as={SiVlcmediaplayer} />,
    Windows: true,
    macOS: false,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_EJCT: {
    aliases: 'KC_MEDIA_EJECT',
    description: 'Eject',
    display: <Icon as={BsEject} />,
    Windows: false,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_MAIL: {
    aliases: '',
    description: 'Launch Mail',
    Windows: true,
    macOS: false,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_CALC: {
    aliases: 'KC_CALCULATOR',
    description: 'Launch Calculator',
    Windows: true,
    macOS: false,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_MYCM: {
    aliases: 'KC_MY_COMPUTER',
    description: 'Launch My Computer',
    Windows: true,
    macOS: false,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_WSCH: {
    aliases: 'KC_WWW_SEARCH',
    description: 'Browser Search',
    Windows: true,
    macOS: false,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_WHOM: {
    aliases: 'KC_WWW_HOME',
    description: 'Browser Home',
    Windows: true,
    macOS: false,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_WBAK: {
    aliases: 'KC_WWW_BACK',
    description: 'Browser Back',
    Windows: true,
    macOS: false,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_WFWD: {
    aliases: 'KC_WWW_FORWARD',
    description: 'Browser Forward',
    Windows: true,
    macOS: false,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_WSTP: {
    aliases: 'KC_WWW_STOP',
    description: 'Browser Stop',
    Windows: true,
    macOS: false,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_WREF: {
    aliases: 'KC_WWW_REFRESH',
    description: 'Browser Refresh',
    Windows: true,
    macOS: false,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_WFAV: {
    aliases: 'KC_WWW_FAVORITES',
    description: 'Browser Favorites',
    Windows: true,
    macOS: false,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_MFFD: {
    aliases: 'KC_MEDIA_FAST_FORWARD',
    description: 'Next Track',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_MRWD: {
    aliases: 'KC_MEDIA_REWIND',
    description: 'Previous Track',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_BRIU: {
    aliases: 'KC_BRIGHTNESS_UP',
    description: 'Brightness Up',
    display: <Icon as={BsBrightnessAltHigh} />,
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_BRID: {
    aliases: 'KC_BRIGHTNESS_DOWN',
    description: 'Brightness Down',
    display: <Icon as={BsBrightnessAltLow} />,
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_F1: {
    aliases: '',
    description: '[kbd]F1[/]',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_F2: {
    aliases: '',
    description: '[kbd]F2[/]',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_F3: {
    aliases: '',
    description: '[kbd]F3[/]',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_F4: {
    aliases: '',
    description: '[kbd]F4[/]',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_F5: {
    aliases: '',
    description: '[kbd]F5[/]',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_F6: {
    aliases: '',
    description: '[kbd]F6[/]',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_F7: {
    aliases: '',
    description: '[kbd]F7[/]',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_F8: {
    aliases: '',
    description: '[kbd]F8[/]',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_F9: {
    aliases: '',
    description: '[kbd]F9[/]',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_F10: {
    aliases: '',
    description: '[kbd]F10[/]',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_F11: {
    aliases: '',
    description: '[kbd]F11[/]',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_F12: {
    aliases: '',
    description: '[kbd]F12[/]',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_F13: {
    aliases: '',
    description: '[kbd]F13[/]',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_F14: {
    aliases: '',
    description: '[kbd]F14[/]',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_F15: {
    aliases: '',
    description: '[kbd]F15[/]',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_F16: {
    aliases: '',
    description: '[kbd]F16[/]',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_F17: {
    aliases: '',
    description: '[kbd]F17[/]',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_F18: {
    aliases: '',
    description: '[kbd]F18[/]',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_F19: {
    aliases: '',
    description: '[kbd]F19[/]',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_F20: {
    aliases: '',
    description: '[kbd]F20[/]',
    Windows: true,
    macOS: false,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_F21: {
    aliases: '',
    description: '[kbd]F21[/]',
    Windows: true,
    macOS: false,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_F22: {
    aliases: '',
    description: '[kbd]F22[/]',
    Windows: true,
    macOS: false,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_F23: {
    aliases: '',
    description: '[kbd]F23[/]',
    Windows: true,
    macOS: false,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_F24: {
    aliases: '',
    description: '[kbd]F24[/]',
    Windows: true,
    macOS: false,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_PSCR: {
    aliases: 'KC_PSCREEN',
    description: 'Print Screen',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_SLCK: {
    aliases: 'KC_SCROLLLOCK, KC_BRMD',
    description: 'Scroll Lock, Brightness Down (macOS)',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_APP: {
    aliases: 'KC_APPLICATION',
    description: 'Application ([code]Windows Context Menu Key[/])',
    Windows: true,
    macOS: false,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_POWER: {
    aliases: '',
    description: 'System Power',
    Windows: false,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_EXEC: {
    aliases: 'KC_EXECUTE',
    description: 'Execute',
    Windows: false,
    macOS: false,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_HELP: {
    aliases: '',
    description: 'Help',
    Windows: false,
    macOS: false,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_MENU: {
    aliases: '',
    description: 'Menu',
    Windows: false,
    macOS: false,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_SLCT: {
    aliases: 'KC_SELECT',
    description: 'Select',
    Windows: false,
    macOS: false,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_STOP: {
    aliases: '',
    description: 'Stop',
    Windows: false,
    macOS: false,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_AGIN: {
    aliases: 'KC_AGAIN',
    description: 'Again',
    Windows: false,
    macOS: false,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_UNDO: {
    aliases: '',
    description: 'Undo',
    Windows: false,
    macOS: false,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_CUT: {
    aliases: '',
    description: 'Cut',
    Windows: false,
    macOS: false,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_COPY: {
    aliases: '',
    description: 'Copy',
    Windows: false,
    macOS: false,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_PSTE: {
    aliases: 'KC_PASTE',
    description: 'Paste',
    Windows: false,
    macOS: false,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_FIND: {
    aliases: '',
    description: 'Find',
    Windows: false,
    macOS: false,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC__MUTE: {
    aliases: '',
    description: 'Mute',
    Windows: false,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC__VOLUP: {
    aliases: '',
    description: 'Volume Up',
    Windows: false,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC__VOLDOWN: {
    aliases: '',
    description: 'Volume Down',
    Windows: false,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_LCAP: {
    aliases: 'KC_LOCKING_CAPS',
    description: 'Locking Caps Lock',
    Windows: true,
    macOS: true,
    Linux: false,
    category: KeycodeCategory.FUNCTION,
  },
  KC_LNUM: {
    aliases: 'KC_LOCKING_NUM',
    description: 'Locking Num Lock',
    Windows: true,
    macOS: true,
    Linux: false,
    category: KeycodeCategory.FUNCTION,
  },
  KC_LSCR: {
    aliases: 'KC_LOCKING_SCROLL',
    description: 'Locking Scroll Lock',
    Windows: true,
    macOS: true,
    Linux: false,
    category: KeycodeCategory.FUNCTION,
  },
  KC_ERAS: {
    aliases: 'KC_ALT_ERASE',
    description: 'Alternate Erase',
    Windows: false,
    macOS: false,
    Linux: false,
    category: KeycodeCategory.FUNCTION,
  },
  KC_SYSREQ: {
    aliases: '',
    description: 'SysReq/Attention',
    Windows: false,
    macOS: false,
    Linux: false,
    category: KeycodeCategory.FUNCTION,
  },
  KC_CANCEL: {
    aliases: '',
    description: 'Cancel',
    Windows: false,
    macOS: false,
    Linux: false,
    category: KeycodeCategory.FUNCTION,
  },
  KC_CLR: {
    aliases: 'KC_CLEAR',
    description: 'Clear',
    Windows: false,
    macOS: false,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_PRIOR: {
    aliases: '',
    description: 'Prior',
    Windows: false,
    macOS: false,
    Linux: false,
    category: KeycodeCategory.FUNCTION,
  },
  KC_RETURN: {
    aliases: '',
    description: 'Return',
    Windows: false,
    macOS: false,
    Linux: false,
    category: KeycodeCategory.FUNCTION,
  },
  KC_SEPARATOR: {
    aliases: '',
    description: 'Separator',
    Windows: false,
    macOS: false,
    Linux: false,
    category: KeycodeCategory.FUNCTION,
  },
  KC_OUT: {
    aliases: '',
    description: 'Out',
    Windows: false,
    macOS: false,
    Linux: false,
    category: KeycodeCategory.FUNCTION,
  },
  KC_OPER: {
    aliases: '',
    description: 'Oper',
    Windows: false,
    macOS: false,
    Linux: false,
    category: KeycodeCategory.FUNCTION,
  },
  KC_CLEAR_AGAIN: {
    aliases: '',
    description: 'Clear/Again',
    Windows: false,
    macOS: false,
    Linux: false,
    category: KeycodeCategory.FUNCTION,
  },
  KC_CRSEL: {
    aliases: '',
    description: 'CrSel/Props',
    Windows: false,
    macOS: false,
    Linux: false,
    category: KeycodeCategory.FUNCTION,
  },
  KC_EXSEL: {
    aliases: '',
    description: 'ExSel',
    Windows: false,
    macOS: false,
    Linux: false,
    category: KeycodeCategory.FUNCTION,
  },
  KC_PWR: {
    aliases: 'KC_SYSTEM_POWER',
    description: 'System Power Down',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_SLEP: {
    aliases: 'KC_SYSTEM_SLEEP',
    description: 'System Sleep',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
  KC_WAKE: {
    aliases: 'KC_SYSTEM_WAKE',
    description: 'System Wake',
    Windows: false,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.FUNCTION,
  },
} as const

export default functionKeycodesData
