import KeyboardPageKeymapSelect from 'pages/KeyboardPage/KeyboardPageKeymaps/KeyboardPageKeymapSelect'
import { KeymapEntity } from '../keymaps.adapter'

const convertKeymapToDownloadable = (keymap: KeymapEntity) => {
  const version = process.env.REACT_APP_VERSION

  const result = {
    version,
    notes: '',
    documentation: `Warning: this is a keymap created using a fan-made QMK Configurator (v${version}). This is a *pre-alpha* website, so use at your own risk!`,
    keyboard: keymap.keyboard,
    keymap: keymap.name,
    layout: keymap.layout,
    layers: keymap.layers,
    // @todo: add the author here,
    author: '',
  }

  console.log(`[LOG]   result`, result)

  return JSON.stringify(result)
}

export default convertKeymapToDownloadable
