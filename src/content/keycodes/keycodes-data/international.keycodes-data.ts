import { KeycodeCategory } from '../keycodes-categories'

const internationalKeycodesData = {
  KC_RO: {
    Aliases: 'KC_INT1',
    Description: 'JIS \\ and _',
    Windows: '✔',
    macOS: '',
    'Linux<sup>1</sup>': '✔',
    category: KeycodeCategory.INTERNATIONAL,
  },
  KC_KANA: {
    Aliases: 'KC_INT2',
    Description: 'JIS Katakana/Hiragana',
    Windows: '✔',
    macOS: '',
    'Linux<sup>1</sup>': '✔',
    category: KeycodeCategory.INTERNATIONAL,
  },
  KC_JYEN: {
    Aliases: 'KC_INT3',
    Description: 'JIS ¥ and \\|',
    Windows: '✔',
    macOS: '',
    'Linux<sup>1</sup>': '✔',
    category: KeycodeCategory.INTERNATIONAL,
  },
  KC_HENK: {
    Aliases: 'KC_INT4',
    Description: 'JIS Henkan',
    Windows: '✔',
    macOS: '',
    'Linux<sup>1</sup>': '✔',
    category: KeycodeCategory.INTERNATIONAL,
  },
  KC_MHEN: {
    Aliases: 'KC_INT5',
    Description: 'JIS Muhenkan',
    Windows: '✔',
    macOS: '',
    'Linux<sup>1</sup>': '✔',
    category: KeycodeCategory.INTERNATIONAL,
  },
  KC_INT6: {
    Aliases: '',
    Description: 'JIS Numpad ,',
    Windows: '',
    macOS: '',
    'Linux<sup>1</sup>': '✔',
    category: KeycodeCategory.INTERNATIONAL,
  },
  KC_INT7: {
    Aliases: '',
    Description: 'International 7',
    Windows: '',
    macOS: '',
    'Linux<sup>1</sup>': '',
    category: KeycodeCategory.INTERNATIONAL,
  },
  KC_INT8: {
    Aliases: '',
    Description: 'International 8',
    Windows: '',
    macOS: '',
    'Linux<sup>1</sup>': '',
    category: KeycodeCategory.INTERNATIONAL,
  },
  KC_INT9: {
    Aliases: '',
    Description: 'International 9',
    Windows: '',
    macOS: '',
    'Linux<sup>1</sup>': '',
    category: KeycodeCategory.INTERNATIONAL,
  },
  KC_HAEN: {
    Aliases: 'KC_LANG1',
    Description: 'Hangul/English',
    Windows: '',
    macOS: '',
    'Linux<sup>1</sup>': '✔',
    category: KeycodeCategory.INTERNATIONAL,
  },
  KC_HANJ: {
    Aliases: 'KC_LANG2',
    Description: 'Hanja',
    Windows: '',
    macOS: '',
    'Linux<sup>1</sup>': '✔',
    category: KeycodeCategory.INTERNATIONAL,
  },
  KC_LANG3: {
    Aliases: '',
    Description: 'JIS Katakana',
    Windows: '',
    macOS: '',
    'Linux<sup>1</sup>': '✔',
    category: KeycodeCategory.INTERNATIONAL,
  },
  KC_LANG4: {
    Aliases: '',
    Description: 'JIS Hiragana',
    Windows: '',
    macOS: '',
    'Linux<sup>1</sup>': '✔',
    category: KeycodeCategory.INTERNATIONAL,
  },
  KC_LANG5: {
    Aliases: '',
    Description: 'JIS Zenkaku/Hankaku',
    Windows: '',
    macOS: '',
    'Linux<sup>1</sup>': '✔',
    category: KeycodeCategory.INTERNATIONAL,
  },
  KC_LANG6: {
    Aliases: '',
    Description: 'Language 6',
    Windows: '',
    macOS: '',
    'Linux<sup>1</sup>': '',
    category: KeycodeCategory.INTERNATIONAL,
  },
  KC_LANG7: {
    Aliases: '',
    Description: 'Language 7',
    Windows: '',
    macOS: '',
    'Linux<sup>1</sup>': '',
    category: KeycodeCategory.INTERNATIONAL,
  },
  KC_LANG8: {
    Aliases: '',
    Description: 'Language 8',
    Windows: '',
    macOS: '',
    'Linux<sup>1</sup>': '',
    category: KeycodeCategory.INTERNATIONAL,
  },
  KC_LANG9: {
    Aliases: '',
    Description: 'Language 9',
    Windows: '',
    macOS: '',
    'Linux<sup>1</sup>': '',
    category: KeycodeCategory.INTERNATIONAL,
  },
} as const

export default internationalKeycodesData