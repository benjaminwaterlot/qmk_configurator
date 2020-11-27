import KEYCODES_DATA from 'content/keycodes/keycodes-data'
import Keycode from 'content/keycodes/keycodes.enum'
import { KeycodeData } from 'content/keycodes/keycodes.types'

/**
 * WORK IN PROGRESS CLASS
 */
class KeyData {
  /**
   * The key code (ex: KC_A, MO)
   */
  keycode: Keycode

  /**
   * If it has variables, it is a command.
   * Example for MO(5), which toggles the layer 5 when held:
   * The keycode is "MO", the variables are [5], and the keystring is "MO(5)".
   */
  variables?: (string | number)[]

  metadata: KeycodeData

  constructor(keystring: string) {
    const openingParenthesesIndex = keystring.indexOf('(')
    const isCommand = openingParenthesesIndex !== -1

    /**
     * Parse the raw keycode
     */
    const keycode = isCommand
      ? keystring.slice(0, openingParenthesesIndex)
      : keystring

    // if (!(keycode in Keycode)) console.error(`Unknown keycode : ${keycode}`)

    this.keycode = keycode as Keycode
    this.metadata = KEYCODES_DATA[this.keycode]

    /**
     * If this keystring represents a command, parse and save its variables.
     */
    if (isCommand)
      this.variables = keystring
        .slice(openingParenthesesIndex + 1, keystring.indexOf(')'))
        .split(',')
        .map((variable) =>
          /^-? ?\d+$/.test(variable) ? Number(variable) : variable,
        )
  }

  /**
   * The keystring is computed from the keycode "MO" and the variables [5]
   * The result here would be "MO(5)"
   */
  get keystring() {
    return this.variables
      ? `${this.keycode}(${this.variables.join(',')})`
      : this.keycode
  }
}

console.log(
  '🌈  ~ file: index.ts ~ line 28 ~ new KeyData(KC_NO)',
  new KeyData('MO(5, 12)'),
)

export default KeyData
