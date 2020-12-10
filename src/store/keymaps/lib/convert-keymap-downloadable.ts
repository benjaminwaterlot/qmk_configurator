import { v4 as uuid } from 'uuid'
import { KeymapEntity } from '../keymaps.adapter'
import { defaulted, size, create, object, string, array } from 'superstruct'

export const convertKeymapToDownloadable = (keymap: KeymapEntity) => {
  const version = process.env.REACT_APP_VERSION

  const result = {
    version,
    notes: '',
    documentation: `Warning: this is a keymap created using a fan-made QMK Configurator (v${version}). This is a *pre-alpha* website, so use at your own risk!`,
    keyboard: keymap.keyboard,
    keymap: keymap.name,
    layout: keymap.layout,
    layers: keymap.layers,
    author: '',
  }

  console.log(`[LOG]   result`, result)

  return JSON.stringify(result)
}

const KeymapEntityRuntime = object({
  version: string(),
  notes: defaulted(string(), ''),
  documentation: string(),
  keyboard: string(),
  keymap: defaulted(string(), 'imported-keymap'),
  layout: string(),
  layers: size(array(size(array(string()), 1, Infinity)), 1, 32),
  author: defaulted(string(), ''),
})

export const convertDownloadableToKeymap = (downloadable: string) => {
  const input = JSON.parse(downloadable)

  const parsedInput = create(input, KeymapEntityRuntime)

  const result = {
    id: uuid(),
    name: parsedInput.keymap,
    keyboard: parsedInput.keyboard,
    layout: parsedInput.layout,
    layers: parsedInput.layers,
  }

  return result
}

window.dev = { ...window.dev, convertDownloadableToKeymap }
