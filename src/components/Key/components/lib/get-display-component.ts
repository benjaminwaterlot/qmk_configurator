import { KeycodeData } from 'content/keycodes/keycodes.types'
import { FunctionComponent } from 'react'
import { KeyContentDisplayProps } from '../KeyDisplay/key-content-display-props'
import KeyContentIcon from '../KeyDisplay/KeyIcon'
import KeyContentString from '../KeyDisplay/KeyString'
import KeyContentStrings from '../KeyDisplay/KeyStrings'

const CONTENT_COMPONENTS = [
  {
    component: KeyContentString,
    condition: (content) => typeof content === 'string',
  },
  {
    component: KeyContentStrings,
    condition: (content) => Array.isArray(content),
  },
  {
    component: KeyContentIcon,
    condition: () => true,
  },
] as {
  component: FunctionComponent<KeyContentDisplayProps<KeycodeData['display']>>
  condition: (content: KeycodeData['display']) => boolean
}[]

/**
 * This function takes a content (a string, array of strings, or React component which is an icon)
 * and returns the appropriate component to display this type of content.
 */
const getComponent = (content: KeycodeData['display']) =>
  CONTENT_COMPONENTS.find(({ condition }) => condition(content))!.component

export default getComponent
