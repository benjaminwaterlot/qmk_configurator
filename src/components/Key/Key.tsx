import React, { FC } from 'react'
import KeyContent from './components/KeyContent'
import Keycode from 'content/keycodes/keycodes.enum'
import KeyContainer from './components/KeyContainer'

export interface KeyProps {
  keycode: Keycode
  keyIndex: number
  onClick: (ref: HTMLButtonElement | null) => void
  onKeyDropped: (keyIndex: number) => void
}

const Key: FC<KeyProps> = (props) => (
  <KeyContainer {...props}>
    <KeyContent keycode={props.keycode} />
  </KeyContainer>
)

export default Key
