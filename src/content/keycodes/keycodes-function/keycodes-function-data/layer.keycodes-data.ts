import { KeycodeCategory } from '../../keycodes-categories'

const layerKeycodesData = {
  MO: {
    description:
      'Momentarily activates layer. As soon as you let go of the key, the layer is deactivated.',
    variables: [{ name: 'layer', description: 'The layer to activate' }],
    category: KeycodeCategory.QMK,
  },
}

export default layerKeycodesData
