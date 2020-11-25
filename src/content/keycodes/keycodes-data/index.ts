import alphabetKeycodesData from './alphabet.keycodes'
import functionKeycodesData from './function.keycodes'
import internationalKeycodesData from './international.keycodes'
import modifiersKeycodesData from './modifiers.keycodes'
import navigationKeycodesData from './navigation.keycodes'
import numericKeycodesData from './numeric.keycodes'
import qmkKeycodesData from './qmk.keycodes'
import symbolsKeycodesData from './symbols.keycodes'
import Keycode from '../keycodes.enum'
import { KeycodeData } from '../keycodes.types'

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
