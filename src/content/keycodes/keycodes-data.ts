import { KeycodeCategory } from './keycodes-categories'
import alphabetKeycodesData from './keycodes-data/alphabet.keycodes-data'
import functionKeycodesData from './keycodes-data/function.keycodes-data'
import internationalKeycodesData from './keycodes-data/international.keycodes-data'
import modifiersKeycodesData from './keycodes-data/modifiers.keycodes-data'
import navigationKeycodesData from './keycodes-data/navigation.keycodes-data'
import numericKeycodesData from './keycodes-data/numeric.keycodes-data'
import qmkKeycodesData from './keycodes-data/qmk.keycodes-data'
import symbolsKeycodesData from './keycodes-data/symbols.keycodes-data'
import Keycode from './keycodes-enum'

export interface KeycodeData {
  Aliases: string
  Description: string
  Windows: string
  macOS: string
  'Linux<sup>1</sup>': string
  category: KeycodeCategory
}

const KEYCODES_DATA: Record<Keycode, KeycodeData> = {
  ...alphabetKeycodesData,
  ...numericKeycodesData,
  ...navigationKeycodesData,
  ...modifiersKeycodesData,
  ...functionKeycodesData,
  ...internationalKeycodesData,
  ...qmkKeycodesData,
  ...symbolsKeycodesData,
}

export default KEYCODES_DATA
