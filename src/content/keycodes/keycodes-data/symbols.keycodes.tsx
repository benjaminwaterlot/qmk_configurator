import { KeycodeCategory } from '../keycodes.categories'

const symbolsKeycodesData = {
  KC_MINS: {
    aliases: 'KC_MINUS',
    description: '[kbd]-[/] and [kbd]_[/]',
    display: ['_', '-'],
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.SYMBOLS,
  },
  KC_EQL: {
    aliases: 'KC_EQUAL',
    description: '[kbd]=[/] and [kbd]+[/]',
    display: ['+', '='],
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.SYMBOLS,
  },
  KC_LBRC: {
    aliases: 'KC_LBRACKET',
    description: '[ and [kbd]{[/]',
    display: ['[', '{'],
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.SYMBOLS,
  },
  KC_RBRC: {
    aliases: 'KC_RBRACKET',
    description: '[kbd]][/] and [kbd]}[/]',
    display: [']', '}'],
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.SYMBOLS,
  },
  KC_BSLS: {
    aliases: 'KC_BSLASH',
    description: '[kbd]\\[/] and [kbd]|[/]',
    display: ['\\', '|'],
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.SYMBOLS,
  },
  KC_NUHS: {
    aliases: 'KC_NONUS_HASH',
    description: 'Non-US [kbd]#[/] and [kbd]~[/]',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.SYMBOLS,
  },
  KC_SCLN: {
    aliases: 'KC_SCOLON',
    description: '[kbd];[/] and [kbd]:[/]',
    display: [':', ';'],
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.SYMBOLS,
  },
  KC_QUOT: {
    aliases: 'KC_QUOTE',
    description: '[kbd]\'[/] and [kbd]"[/]',
    display: ['"', "'"],
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.SYMBOLS,
  },
  KC_COMM: {
    aliases: 'KC_COMMA',
    display: ['<', ','],
    description: '[kbd],[/] and [kbd]<[/]',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.SYMBOLS,
  },
  KC_DOT: {
    aliases: '',
    display: ['>', '.'],
    description: '[kbd].[/] and [kbd]>[/]',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.SYMBOLS,
  },
  KC_SLSH: {
    aliases: 'KC_SLASH',
    description: '[kbd]/[/] and [kbd]?[/]',
    display: ['?', '/'],
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.SYMBOLS,
  },
  KC_PSLS: {
    aliases: 'KC_KP_SLASH',
    description: 'Keypad [kbd]/[/]',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.SYMBOLS,
  },
  KC_PAST: {
    aliases: 'KC_KP_ASTERISK',
    description: 'Keypad [kbd]*[/]',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.SYMBOLS,
  },
  KC_PMNS: {
    aliases: 'KC_KP_MINUS',
    description: 'Keypad [kbd]-[/]',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.SYMBOLS,
  },
  KC_PPLS: {
    aliases: 'KC_KP_PLUS',
    description: 'Keypad [kbd]+[/]',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.SYMBOLS,
  },
  KC_PDOT: {
    aliases: 'KC_KP_DOT',
    description: 'Keypad [kbd].[/] and [kbd]Delete[/]',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.SYMBOLS,
  },
  KC_NUBS: {
    aliases: 'KC_NONUS_BSLASH',
    description: 'Non-US [kbd]\\[/] and [kbd]|[/]',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.SYMBOLS,
  },
  KC_PEQL: {
    aliases: 'KC_KP_EQUAL',
    description: 'Keypad [kbd]=[/]',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.SYMBOLS,
  },
  KC_PCMM: {
    aliases: 'KC_KP_COMMA',
    description: 'Keypad [kbd],[/]',
    Windows: false,
    macOS: false,
    Linux: true,
    category: KeycodeCategory.SYMBOLS,
  },
  KC_KP_EQUAL_AS400: {
    aliases: '',
    description: 'Keypad [kbd]=[/] on [code]AS/400[/] keyboards',
    Windows: false,
    macOS: false,
    Linux: false,
    category: KeycodeCategory.SYMBOLS,
  },
} as const

export default symbolsKeycodesData
