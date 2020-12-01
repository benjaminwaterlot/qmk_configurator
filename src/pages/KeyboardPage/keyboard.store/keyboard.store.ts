import setInitialState from './keyboard.store.init'
import { MyStateCreator } from './keyboard.store.type'
import keymaps from './keymaps'
import layouts from './layouts'

/**
 * The store
 */
const store: MyStateCreator = (set, get) => ({
  init: setInitialState(set, get),
  /**
   * Layouts
   */
  layouts: layouts(set, get),
  /**
   * Keymaps
   */
  keymaps: keymaps(set, get),
  // /**
  //  * Layers
  //  */
  // layers: layers(set, get),
})

export default store
