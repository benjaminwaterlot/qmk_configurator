import { KeycodeCategory } from '../../keycodes-categories'
import layerKeycodesData from './layer.keycodes-data'
import KeycodeFunction from '../keycodes-function.enum'

export interface KeycodeFunctionData {
  aliases: string
  description: string
  Windows?: string
  macOS?: string
  Linux?: string
  category: KeycodeCategory
}

const KEYCODES_DATA: Record<KeycodeFunction, KeycodeFunctionData> = {
  ...layerKeycodesData,
}

export default KEYCODES_DATA
