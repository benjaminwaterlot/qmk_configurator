import { KeycodeCategory } from '../../keycodes-categories'
import layerKeycodesData from './layer.keycodes-data'
import KeycodeFunction from '../keycodes-function.enum'

export interface KeycodeFunctionData {
  description: string
  variables: { name: string; description?: string }[]
  category: KeycodeCategory
}

const KEYCODES_DATA: Record<KeycodeFunction, KeycodeFunctionData> = {
  ...layerKeycodesData,
}

export default KEYCODES_DATA
