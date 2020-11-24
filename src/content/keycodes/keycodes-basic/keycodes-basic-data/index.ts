import { KeycodeCategory } from '../../keycodes-categories'
import alphabetKeycodesData from './alphabet.keycodes-data'
import functionKeycodesData from './function.keycodes-data'
import internationalKeycodesData from './international.keycodes-data'
import modifiersKeycodesData from './modifiers.keycodes-data'
import navigationKeycodesData from './navigation.keycodes-data'
import numericKeycodesData from './numeric.keycodes-data'
import qmkKeycodesData from './qmk.keycodes-data'
import symbolsKeycodesData from './symbols.keycodes-data'
import KeycodeBasic from '../keycodes-basic.enum'

export interface KeycodeBasicData {
  aliases: string
  description: string
  Windows: string
  macOS: string
  Linux: string
  category: KeycodeCategory
}

const KEYCODES_DATA: Record<KeycodeBasic, KeycodeBasicData> = {
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
