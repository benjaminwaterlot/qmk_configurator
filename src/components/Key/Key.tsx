import { FC, memo } from 'react'
import KeyContent from './components/KeyContent'
import KeyContainer from './components/KeyContainer'

export interface KeyProps {
  keycode: string
  keyIndex: number
  onClick: (keyIndex: number, ref: HTMLButtonElement | null) => void
  onKeySwap: (payload: {
    sourceKeyIndex: number
    destinationKeyIndex: number
  }) => void
}

const Key: FC<KeyProps> = (props) => (
  <KeyContainer {...props}>
    <KeyContent keycode={props.keycode} />
  </KeyContainer>
)

export default memo(Key)
