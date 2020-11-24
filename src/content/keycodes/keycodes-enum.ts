/**
 * All basic keycodes.
 * @see https://docs.qmk.fm/#/keycodes
 */
enum Keycode {
  KC_NO = 'KC_NO',
  KC_TRNS = 'KC_TRNS',
  KC_A = 'KC_A',
  KC_B = 'KC_B',
  KC_C = 'KC_C',
  KC_D = 'KC_D',
  KC_E = 'KC_E',
  KC_F = 'KC_F',
  KC_G = 'KC_G',
  KC_H = 'KC_H',
  KC_I = 'KC_I',
  KC_J = 'KC_J',
  KC_K = 'KC_K',
  KC_L = 'KC_L',
  KC_M = 'KC_M',
  KC_N = 'KC_N',
  KC_O = 'KC_O',
  KC_P = 'KC_P',
  KC_Q = 'KC_Q',
  KC_R = 'KC_R',
  KC_S = 'KC_S',
  KC_T = 'KC_T',
  KC_U = 'KC_U',
  KC_V = 'KC_V',
  KC_W = 'KC_W',
  KC_X = 'KC_X',
  KC_Y = 'KC_Y',
  KC_Z = 'KC_Z',
  KC_1 = 'KC_1',
  KC_2 = 'KC_2',
  KC_3 = 'KC_3',
  KC_4 = 'KC_4',
  KC_5 = 'KC_5',
  KC_6 = 'KC_6',
  KC_7 = 'KC_7',
  KC_8 = 'KC_8',
  KC_9 = 'KC_9',
  KC_0 = 'KC_0',
  KC_ENT = 'KC_ENT',
  KC_ESC = 'KC_ESC',
  KC_BSPC = 'KC_BSPC',
  KC_TAB = 'KC_TAB',
  KC_SPC = 'KC_SPC',
  KC_MINS = 'KC_MINS',
  KC_EQL = 'KC_EQL',
  KC_LBRC = 'KC_LBRC',
  KC_RBRC = 'KC_RBRC',
  KC_BSLS = 'KC_BSLS',
  KC_NUHS = 'KC_NUHS',
  KC_SCLN = 'KC_SCLN',
  KC_QUOT = 'KC_QUOT',
  KC_GRV = 'KC_GRV',
  KC_COMM = 'KC_COMM',
  KC_DOT = 'KC_DOT',
  KC_SLSH = 'KC_SLSH',
  KC_CAPS = 'KC_CAPS',
  KC_F1 = 'KC_F1',
  KC_F2 = 'KC_F2',
  KC_F3 = 'KC_F3',
  KC_F4 = 'KC_F4',
  KC_F5 = 'KC_F5',
  KC_F6 = 'KC_F6',
  KC_F7 = 'KC_F7',
  KC_F8 = 'KC_F8',
  KC_F9 = 'KC_F9',
  KC_F10 = 'KC_F10',
  KC_F11 = 'KC_F11',
  KC_F12 = 'KC_F12',
  KC_PSCR = 'KC_PSCR',
  KC_SLCK = 'KC_SLCK',
  KC_PAUS = 'KC_PAUS',
  KC_INS = 'KC_INS',
  KC_HOME = 'KC_HOME',
  KC_PGUP = 'KC_PGUP',
  KC_DEL = 'KC_DEL',
  KC_END = 'KC_END',
  KC_PGDN = 'KC_PGDN',
  KC_RGHT = 'KC_RGHT',
  KC_LEFT = 'KC_LEFT',
  KC_DOWN = 'KC_DOWN',
  KC_UP = 'KC_UP',
  KC_NLCK = 'KC_NLCK',
  KC_PSLS = 'KC_PSLS',
  KC_PAST = 'KC_PAST',
  KC_PMNS = 'KC_PMNS',
  KC_PPLS = 'KC_PPLS',
  KC_PENT = 'KC_PENT',
  KC_P1 = 'KC_P1',
  KC_P2 = 'KC_P2',
  KC_P3 = 'KC_P3',
  KC_P4 = 'KC_P4',
  KC_P5 = 'KC_P5',
  KC_P6 = 'KC_P6',
  KC_P7 = 'KC_P7',
  KC_P8 = 'KC_P8',
  KC_P9 = 'KC_P9',
  KC_P0 = 'KC_P0',
  KC_PDOT = 'KC_PDOT',
  KC_NUBS = 'KC_NUBS',
  KC_APP = 'KC_APP',
  KC_POWER = 'KC_POWER',
  KC_PEQL = 'KC_PEQL',
  KC_F13 = 'KC_F13',
  KC_F14 = 'KC_F14',
  KC_F15 = 'KC_F15',
  KC_F16 = 'KC_F16',
  KC_F17 = 'KC_F17',
  KC_F18 = 'KC_F18',
  KC_F19 = 'KC_F19',
  KC_F20 = 'KC_F20',
  KC_F21 = 'KC_F21',
  KC_F22 = 'KC_F22',
  KC_F23 = 'KC_F23',
  KC_F24 = 'KC_F24',
  KC_EXEC = 'KC_EXEC',
  KC_HELP = 'KC_HELP',
  KC_MENU = 'KC_MENU',
  KC_SLCT = 'KC_SLCT',
  KC_STOP = 'KC_STOP',
  KC_AGIN = 'KC_AGIN',
  KC_UNDO = 'KC_UNDO',
  KC_CUT = 'KC_CUT',
  KC_COPY = 'KC_COPY',
  KC_PSTE = 'KC_PSTE',
  KC_FIND = 'KC_FIND',
  KC__MUTE = 'KC__MUTE',
  KC__VOLUP = 'KC__VOLUP',
  KC__VOLDOWN = 'KC__VOLDOWN',
  KC_LCAP = 'KC_LCAP',
  KC_LNUM = 'KC_LNUM',
  KC_LSCR = 'KC_LSCR',
  KC_PCMM = 'KC_PCMM',
  KC_KP_EQUAL_AS400 = 'KC_KP_EQUAL_AS400',
  KC_RO = 'KC_RO',
  KC_KANA = 'KC_KANA',
  KC_JYEN = 'KC_JYEN',
  KC_HENK = 'KC_HENK',
  KC_MHEN = 'KC_MHEN',
  KC_INT6 = 'KC_INT6',
  KC_INT7 = 'KC_INT7',
  KC_INT8 = 'KC_INT8',
  KC_INT9 = 'KC_INT9',
  KC_HAEN = 'KC_HAEN',
  KC_HANJ = 'KC_HANJ',
  KC_LANG3 = 'KC_LANG3',
  KC_LANG4 = 'KC_LANG4',
  KC_LANG5 = 'KC_LANG5',
  KC_LANG6 = 'KC_LANG6',
  KC_LANG7 = 'KC_LANG7',
  KC_LANG8 = 'KC_LANG8',
  KC_LANG9 = 'KC_LANG9',
  KC_ERAS = 'KC_ERAS',
  KC_SYSREQ = 'KC_SYSREQ',
  KC_CANCEL = 'KC_CANCEL',
  KC_CLR = 'KC_CLR',
  KC_PRIOR = 'KC_PRIOR',
  KC_RETURN = 'KC_RETURN',
  KC_SEPARATOR = 'KC_SEPARATOR',
  KC_OUT = 'KC_OUT',
  KC_OPER = 'KC_OPER',
  KC_CLEAR_AGAIN = 'KC_CLEAR_AGAIN',
  KC_CRSEL = 'KC_CRSEL',
  KC_EXSEL = 'KC_EXSEL',
  KC_LCTL = 'KC_LCTL',
  KC_LSFT = 'KC_LSFT',
  KC_LALT = 'KC_LALT',
  KC_LGUI = 'KC_LGUI',
  KC_RCTL = 'KC_RCTL',
  KC_RSFT = 'KC_RSFT',
  KC_RALT = 'KC_RALT',
  KC_RGUI = 'KC_RGUI',
  KC_PWR = 'KC_PWR',
  KC_SLEP = 'KC_SLEP',
  KC_WAKE = 'KC_WAKE',
  KC_MUTE = 'KC_MUTE',
  KC_VOLU = 'KC_VOLU',
  KC_VOLD = 'KC_VOLD',
  KC_MNXT = 'KC_MNXT',
  KC_MPRV = 'KC_MPRV',
  KC_MSTP = 'KC_MSTP',
  KC_MPLY = 'KC_MPLY',
  KC_MSEL = 'KC_MSEL',
  KC_EJCT = 'KC_EJCT',
  KC_MAIL = 'KC_MAIL',
  KC_CALC = 'KC_CALC',
  KC_MYCM = 'KC_MYCM',
  KC_WSCH = 'KC_WSCH',
  KC_WHOM = 'KC_WHOM',
  KC_WBAK = 'KC_WBAK',
  KC_WFWD = 'KC_WFWD',
  KC_WSTP = 'KC_WSTP',
  KC_WREF = 'KC_WREF',
  KC_WFAV = 'KC_WFAV',
  KC_MFFD = 'KC_MFFD',
  KC_MRWD = 'KC_MRWD',
  KC_BRIU = 'KC_BRIU',
  KC_BRID = 'KC_BRID',
}

export default Keycode
